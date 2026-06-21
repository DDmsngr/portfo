import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Mobile detection
const isMobile = () =>
  typeof window !== 'undefined' &&
  (window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent));

export default function HeroCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // ── Renderer ────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile() ? 1 : 1.5));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // ── Scene / Camera ──────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 200);
    camera.position.set(0, 0, 28);

    // ── Colors ──────────────────────────────────────────────────────────────
    const GOLD_A = new THREE.Color('#C9A34E');
    const GOLD_B = new THREE.Color('#D4AF37');

    // ── Uniforms shared ─────────────────────────────────────────────────────
    const uTime    = { value: 0 };
    const uMouse   = { value: new THREE.Vector2(0, 0) };
    const uOpacity = { value: 0 };

    // ═══════════════════════════════════════════════════════════════════════
    // 1. WAVE GRID — gold wireframe plane that undulates
    // ═══════════════════════════════════════════════════════════════════════
    const mobile = isMobile();
    const SEG_X = mobile ? 40 : 90;
    const SEG_Y = mobile ? 22 : 50;

    const gridGeo = new THREE.PlaneGeometry(80, 44, SEG_X, SEG_Y);
    gridGeo.rotateX(-Math.PI * 0.38);

    const gridMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime:    uTime,
        uMouse:   uMouse,
        uOpacity: uOpacity,
        uGoldA:   { value: GOLD_A },
        uGoldB:   { value: GOLD_B },
      },
      vertexShader: /* glsl */`
        uniform float uTime;
        uniform vec2  uMouse;
        varying float vWave;
        varying float vDist;

        void main() {
          vec3 pos = position;

          float wave  = sin(pos.x * 0.22 + uTime * 0.55) * 1.8;
               wave  += sin(pos.z * 0.18 + uTime * 0.42) * 1.4;
               wave  += sin((pos.x + pos.z) * 0.12 + uTime * 0.33) * 1.0;

          float mx = uMouse.x * 18.0;
          float my = uMouse.y * 10.0;
          float dMouse = distance(pos.xz, vec2(mx, my));
          wave += sin(dMouse * 0.28 - uTime * 1.2) * exp(-dMouse * 0.06) * 2.4;

          pos.y += wave;
          vWave = clamp((wave + 4.0) / 8.0, 0.0, 1.0);
          vDist = 1.0 - smoothstep(18.0, 42.0, length(pos.xz));

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: /* glsl */`
        uniform vec3  uGoldA;
        uniform vec3  uGoldB;
        uniform float uOpacity;
        varying float vWave;
        varying float vDist;

        void main() {
          vec3  col   = mix(uGoldA * 0.55, uGoldB, vWave);
          float alpha = vDist * uOpacity * mix(0.18, 0.65, vWave);
          gl_FragColor = vec4(col, alpha);
        }
      `,
      transparent: true,
      wireframe:   true,
      depthWrite:  false,
    });

    const grid = new THREE.Mesh(gridGeo, gridMat);
    grid.name = 'heroGrid';
    grid.position.set(0, -8, 0);
    scene.add(grid);

    // ═══════════════════════════════════════════════════════════════════════
    // 2. FLOATING PARTICLES — gold dust field
    // ═══════════════════════════════════════════════════════════════════════
    const P_COUNT = mobile ? 280 : 700;
    const pGeo   = new THREE.BufferGeometry();
    const pPos   = new Float32Array(P_COUNT * 3);
    const pPhase = new Float32Array(P_COUNT);
    const pSpeed = new Float32Array(P_COUNT);
    const pSize  = new Float32Array(P_COUNT);

    for (let i = 0; i < P_COUNT; i++) {
      pPos[i * 3]     = (Math.random() - 0.5) * 70;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 4;
      pPhase[i] = Math.random() * Math.PI * 2;
      pSpeed[i] = 0.3 + Math.random() * 0.7;
      pSize[i]  = 0.5 + Math.random() * 1.8;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos,   3));
    pGeo.setAttribute('aPhase',   new THREE.BufferAttribute(pPhase, 1));
    pGeo.setAttribute('aSpeed',   new THREE.BufferAttribute(pSpeed, 1));
    pGeo.setAttribute('aSize',    new THREE.BufferAttribute(pSize,  1));

    const pMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime:    uTime,
        uMouse:   uMouse,
        uOpacity: uOpacity,
        uGoldA:   { value: GOLD_A },
        uGoldB:   { value: GOLD_B },
      },
      vertexShader: /* glsl */`
        attribute float aPhase;
        attribute float aSpeed;
        attribute float aSize;
        uniform   float uTime;
        uniform   vec2  uMouse;
        varying   float vBright;

        void main() {
          vec3 pos = position;
          pos.x += sin(uTime * aSpeed * 0.4 + aPhase) * 1.4;
          pos.y += cos(uTime * aSpeed * 0.3 + aPhase * 1.3) * 0.9
                 + uTime * aSpeed * 0.08;
          pos.y  = mod(pos.y + 22.0, 44.0) - 22.0;

          vec2 toMouse = uMouse * vec2(30.0, 18.0) - pos.xy;
          pos.xy += normalize(toMouse) * 0.012 * aSpeed;

          vBright = 0.4 + 0.6 * abs(sin(uTime * aSpeed + aPhase));

          vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = aSize * (280.0 / -mvPos.z) * vBright;
          gl_Position  = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: /* glsl */`
        uniform float uOpacity;
        uniform vec3  uGoldA;
        uniform vec3  uGoldB;
        varying float vBright;

        void main() {
          float d = length(gl_PointCoord - 0.5) * 2.0;
          if (d > 1.0) discard;
          float alpha = (1.0 - smoothstep(0.0, 1.0, d)) * uOpacity * vBright * 0.85;
          vec3  col   = mix(uGoldA, uGoldB, vBright);
          gl_FragColor = vec4(col, alpha);
        }
      `,
      transparent: true,
      depthWrite:  false,
      blending:    THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(pGeo, pMat);
    particles.name = 'heroParticles';
    scene.add(particles);

    // ═══════════════════════════════════════════════════════════════════════
    // 3. AURORA RIBBON — soft horizontal glow band
    // ═══════════════════════════════════════════════════════════════════════
    const RIBBON_SEG = mobile ? 60 : 140;
    const ribbonGeo  = new THREE.PlaneGeometry(80, 14, RIBBON_SEG, 12);

    const ribbonMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime:    uTime,
        uMouse:   uMouse,
        uOpacity: uOpacity,
      },
      vertexShader: /* glsl */`
        uniform float uTime;
        uniform vec2  uMouse;
        varying vec2  vUV;
        varying float vWave;

        void main() {
          vUV = uv;
          vec3 pos = position;
          float wave  = sin(pos.x * 0.14 + uTime * 0.5) * 2.2;
               wave  += sin(pos.x * 0.28 + uTime * 0.32) * 1.1;
               wave  += uMouse.y * 3.0 * (1.0 - abs(uv.y - 0.5) * 2.0);
          pos.y += wave;
          vWave = clamp((wave + 4.0) / 8.0, 0.0, 1.0);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: /* glsl */`
        uniform float uOpacity;
        varying vec2  vUV;
        varying float vWave;

        void main() {
          float edgeFade = 1.0 - abs(vUV.y - 0.5) * 2.2;
          edgeFade = clamp(edgeFade, 0.0, 1.0);
          float hFade = smoothstep(0.0, 0.12, vUV.x) * smoothstep(1.0, 0.88, vUV.x);

          vec3 goldHigh = vec3(0.855, 0.741, 0.306);
          vec3 goldLow  = vec3(0.788, 0.639, 0.306);
          vec3 col      = mix(goldLow, goldHigh, vWave);

          float alpha = edgeFade * hFade * uOpacity * 0.09;
          gl_FragColor = vec4(col, alpha);
        }
      `,
      transparent: true,
      depthWrite:  false,
      side:        THREE.DoubleSide,
      blending:    THREE.AdditiveBlending,
    });

    const ribbon = new THREE.Mesh(ribbonGeo, ribbonMat);
    ribbon.name = 'heroRibbon';
    ribbon.position.set(0, 2, -6);
    scene.add(ribbon);

    // ── Mouse tracking ──────────────────────────────────────────────────────
    let targetMouse = new THREE.Vector2(0, 0);
    const onMouseMove = (e) => {
      targetMouse.x =  (e.clientX / window.innerWidth  - 0.5) * 2;
      targetMouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    const onTouchMove = (e) => {
      if (!e.touches[0]) return;
      targetMouse.x =  (e.touches[0].clientX / window.innerWidth  - 0.5) * 2;
      targetMouse.y = -(e.touches[0].clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // ── Resize ──────────────────────────────────────────────────────────────
    const onResize = () => {
      if (!el) return;
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // ── Animation loop ──────────────────────────────────────────────────────
    let rafId;
    const startTime  = performance.now();
    const fadeStart  = performance.now();
    const FADE_MS    = 1800;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const now     = performance.now();
      const elapsed = (now - startTime) * 0.001;

      const fadeT    = Math.min((now - fadeStart) / FADE_MS, 1.0);
      uOpacity.value = fadeT * fadeT;
      uTime.value    = elapsed;

      uMouse.value.x += (targetMouse.x - uMouse.value.x) * 0.042;
      uMouse.value.y += (targetMouse.y - uMouse.value.y) * 0.042;

      camera.position.x += (uMouse.value.x * 1.8 - camera.position.x) * 0.028;
      camera.position.y += (uMouse.value.y * 0.9 - camera.position.y) * 0.028;
      camera.lookAt(0, -2, 0);

      renderer.render(scene, camera);
    };

    animate();

    // ── Cleanup ─────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', onResize);
      [gridGeo, gridMat, pGeo, pMat, ribbonGeo, ribbonMat].forEach(r => r.dispose());
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
