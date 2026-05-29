import { useState, useEffect, useRef } from 'react';
import logoSrc from './assets/logo.png';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowUpRight, ArrowRight, ShoppingCart, Plus, Minus, X,
  ChevronLeft, ChevronRight, Star, CheckCircle, AlertCircle, XCircle,
  Search, Bell, Cpu, Activity, Database, Globe, Monitor, Smartphone,
  Settings, Mail, Users, FileText, BarChart2, Rocket, Code2,
  Layers, MessageCircle, ExternalLink, Scale, Leaf, ShieldCheck,
  Palette, Truck, Gift, PawPrint, ChevronDown, Server,
  AlertTriangle, Zap, Phone,
} from 'lucide-react';

// ─── Tokens ─────────────────────────────────────────────────────────────────
const GOLD   = '#C9A34E';
const GOLD_G = 'linear-gradient(90deg,#D4AF37 0%,#C09820 55%,#C5A028 100%)';
const BG     = '#0C0D10';
const TEXT   = '#E5E5E5';
const TEXT_M = 'rgba(229,229,229,0.52)';
const TEXT_D = 'rgba(229,229,229,0.24)';
const BORDER = 'rgba(255,255,255,0.06)';

let pendingScroll = null;

// ─── AELogo — реальный PNG через mix-blend-mode:screen ────────────────────
// mix-blend-mode:screen делает чёрный фон прозрачным, оставляя только золото
function AELogo({ height = 38 }) {
  const w = Math.round(height * 1.72);
  return (
    <img
      src="/portfo/ae-logo.png"
      alt="AE"
      style={{
        width: w,
        height: height,
        objectFit: 'contain',
        mixBlendMode: 'screen',
        display: 'block',
        flexShrink: 0,
      }}
    />
  );
}

// ─── Ambient orb helper ───────────────────────────────────────────────────
function Orb({ top, left, right, bottom, size = 400, color = 'rgba(201,163,78,0.06)', blur = 60 }) {
  return (
    <div style={{
      position:'absolute', borderRadius:'50%', pointerEvents:'none',
      width: size, height: size,
      top, left, right, bottom,
      background: `radial-gradient(circle, ${color} 0%, transparent 65%)`,
      filter: `blur(${blur}px)`,
    }}/>
  );
}

// ─── Privacy helpers ──────────────────────────────────────────────────────
const openPrivacy = (e) => { if(e) e.preventDefault(); window.dispatchEvent(new CustomEvent('openPrivacy')); };

function PrivacyModal() {
  const [open, setOpen] = useState(false);
  useEffect(()=>{
    const h=()=>setOpen(true);
    window.addEventListener('openPrivacy',h);
    return()=>window.removeEventListener('openPrivacy',h);
  },[]);
  if(!open) return null;
  const close=()=>setOpen(false);
  const st={fontSize:11,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:GOLD,marginTop:20,marginBottom:8};
  const pt={fontSize:13,color:'rgba(229,229,229,0.58)',lineHeight:1.82,margin:'0 0 6px'};
  const lt={fontSize:13,color:'rgba(229,229,229,0.58)',lineHeight:1.82,paddingLeft:14};
  return(
    <div style={{position:'fixed',inset:0,zIndex:2000,display:'flex',alignItems:'center',justifyContent:'center',padding:'16px'}}>
      <div onClick={close} style={{position:'absolute',inset:0,background:'rgba(0,0,0,0.72)',backdropFilter:'blur(10px)'}}/>
      <div style={{position:'relative',zIndex:1,width:'100%',maxWidth:640,maxHeight:'86vh',background:'rgba(9,8,6,0.97)',border:'1px solid rgba(201,163,78,0.22)',borderRadius:18,backdropFilter:'blur(24px)',boxShadow:'0 32px 80px rgba(0,0,0,0.7),inset 0 1px 0 rgba(201,163,78,0.12)',display:'flex',flexDirection:'column',overflow:'hidden'}}>
        <div style={{padding:'22px 26px 18px',borderBottom:'1px solid rgba(201,163,78,0.1)',display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexShrink:0}}>
          <div>
            <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.18em',color:GOLD,textTransform:'uppercase',marginBottom:6}}>Юридический документ · 152-ФЗ</div>
            <div style={{fontSize:19,fontWeight:500,color:'#F0EDE8',fontFamily:"'Cormorant Garamond',serif",lineHeight:1.2}}>Политика обработки<br/>персональных данных</div>
          </div>
          <button onClick={close} style={{width:34,height:34,borderRadius:'50%',border:'1px solid rgba(255,255,255,0.1)',background:'rgba(255,255,255,0.04)',color:'rgba(255,255,255,0.45)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:20,lineHeight:1,marginTop:2}}>×</button>
        </div>
        <div style={{overflowY:'auto',padding:'20px 26px 28px',flex:1}}>
          <p style={pt}>Настоящая Политика разработана в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».</p>
          <div style={{padding:'12px 16px',borderRadius:10,border:'1px solid rgba(201,163,78,0.15)',background:'rgba(201,163,78,0.04)',margin:'12px 0'}}>
            <div style={{fontSize:10,fontWeight:700,color:GOLD,letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:5}}>Оператор персональных данных</div>
            <div style={{fontSize:13,color:'rgba(229,229,229,0.72)',lineHeight:1.7}}>ИП Евтушенко Алексей Михайлович<br/>E-mail: 9254652@bk.ru</div>
          </div>
          <div style={st}>1. Состав обрабатываемых данных</div>
          <p style={pt}>Оператор обрабатывает данные, добровольно предоставленные через форму обратной связи:</p>
          {['Имя и фамилия','Номер телефона','Адрес электронной почты','Содержание обращения'].map(i=><div key={i} style={lt}>· {i}</div>)}
          <div style={st}>2. Цели обработки</div>
          {['Ответ на заявки и обращения пользователей','Заключение и исполнение договоров об оказании услуг','Информирование о статусе выполняемых работ'].map(i=><div key={i} style={lt}>· {i}</div>)}
          <div style={st}>3. Правовое основание</div>
          <p style={pt}>Обработка осуществляется на основании согласия субъекта (ст. 6, ч. 1, п. 1 Федерального закона № 152-ФЗ).</p>
          <div style={st}>4. Сроки хранения</div>
          <p style={pt}>Данные хранятся не дольше, чем требуется для целей обработки, но не более 3 лет, либо до отзыва согласия субъектом.</p>
          <div style={st}>5. Передача третьим лицам</div>
          <p style={pt}>Данные не передаются третьим лицам без согласия субъекта, за исключением случаев, предусмотренных законодательством РФ.</p>
          <div style={st}>6. Права субъекта</div>
          {['Получить информацию об обработке своих данных','Потребовать уточнения или удаления данных','Отозвать согласие на обработку','Обратиться с жалобой в Роскомнадзор (rkn.gov.ru)'].map(i=><div key={i} style={lt}>· {i}</div>)}
          <div style={st}>7. Файлы Cookie</div>
          <p style={pt}>Сайт использует файлы cookie для корректной работы. Cookie можно отключить в настройках браузера.</p>
          <div style={st}>8. Контакты оператора</div>
          <p style={pt}>По вопросам обработки персональных данных: 9254652@bk.ru</p>
          <button onClick={close} className="btn-gold" style={{marginTop:22,width:'100%',padding:'12px',borderRadius:10,fontSize:13,fontWeight:700,color:'#0C0D10',border:'none',cursor:'pointer'}}>Понятно, закрыть</button>
        </div>
      </div>
    </div>
  );
}

function CookieBanner() {
  const [visible, setVisible] = useState(false);
  useEffect(()=>{
    if(!localStorage.getItem('cookies_accepted')){
      const t=setTimeout(()=>setVisible(true),1400);
      return()=>clearTimeout(t);
    }
  },[]);
  const accept=()=>{ localStorage.setItem('cookies_accepted','1'); setVisible(false); };
  return(
    <div style={{position:'fixed',bottom:20,left:'50%',zIndex:900,width:'calc(100% - 32px)',maxWidth:540,transition:'opacity 380ms,transform 380ms',opacity:visible?1:0,transform:`translateX(-50%) translateY(${visible?'0':'72px'})`,pointerEvents:visible?'auto':'none'}}>
      <div style={{background:'rgba(13,11,7,0.96)',border:'1px solid rgba(201,163,78,0.18)',borderRadius:14,backdropFilter:'blur(20px)',padding:'14px 18px',display:'flex',alignItems:'center',gap:14,boxShadow:'0 8px 40px rgba(0,0,0,0.55),inset 0 1px 0 rgba(201,163,78,0.07)'}}>
        <div style={{flex:1,fontSize:12.5,color:'rgba(229,229,229,0.52)',lineHeight:1.55}}>
          Мы используем файлы cookie для повышения удобства работы с сайтом.{' '}
          <a href="#" onClick={openPrivacy} style={{color:'rgba(201,163,78,0.65)',textDecoration:'underline',textUnderlineOffset:'2px'}}>Подробнее</a>
        </div>
        <button onClick={accept} className="btn-gold" style={{padding:'8px 18px',borderRadius:8,fontSize:12,fontWeight:700,color:'#0C0D10',border:'none',cursor:'pointer',flexShrink:0,whiteSpace:'nowrap'}}>Принять</button>
      </div>
    </div>
  );
}

// ─── Contact form ────────────────────────────────────────────────────────────
// 1. Зарегистрируйтесь на emailjs.com
// 2. Создайте Email Service и Template (переменные: {{from_name}}, {{contact}}, {{subject}}, {{message}})
// 3. Замените три константы ниже на свои значения из дашборда EmailJS
const EMAILJS_KEY = 'wCDNR5ZVSZmWBHgnG';
const EMAILJS_SVC = 'service_5b68jmx';
const EMAILJS_TPL = 'template_uo1ifkb';

const openContact = (e) => { if(e) e.preventDefault(); window.dispatchEvent(new CustomEvent('openContact')); };

function ContactModal() {
  const [open,setOpen]=useState(false);
  const [form,setForm]=useState({name:'',contact:'',subject:'',message:''});
  const [status,setStatus]=useState('idle');
  const [errMsg,setErrMsg]=useState('');

  useEffect(()=>{
    const h=()=>{setOpen(true);setStatus('idle');setErrMsg('');};
    window.addEventListener('openContact',h);
    return()=>window.removeEventListener('openContact',h);
  },[]);

  const close=()=>{setOpen(false);setStatus('idle');setErrMsg('');};
  const upd=(e)=>setForm(f=>({...f,[e.target.name]:e.target.value}));

  const send=async(e)=>{
    e.preventDefault();
    if(!form.name.trim()||!form.contact.trim()||!form.message.trim()){
      setErrMsg('Пожалуйста, заполните обязательные поля (*)');
      return;
    }
    setStatus('sending');setErrMsg('');
    try{
      await window.emailjs.send(EMAILJS_SVC,EMAILJS_TPL,{
        from_name:form.name,
        contact:form.contact,
        subject:form.subject||'Новая заявка с сайта',
        message:form.message,
        reply_to:form.contact,
      },{publicKey:EMAILJS_KEY});
      setStatus('success');
      setForm({name:'',contact:'',subject:'',message:''});
    }catch{
      setStatus('error');
      setErrMsg('Ошибка отправки. Напишите напрямую: 9254652@bk.ru');
    }
  };

  if(!open) return null;

  const inp={
    display:'block',width:'100%',background:'rgba(255,255,255,0.04)',
    border:'1px solid rgba(201,163,78,0.18)',borderRadius:8,padding:'12px 14px',
    color:'#F0EDE8',fontSize:14,outline:'none',fontFamily:'Inter,sans-serif',
    boxSizing:'border-box',marginBottom:14,transition:'border-color 200ms',
  };
  const lbl={fontSize:10,fontWeight:700,letterSpacing:'0.14em',color:GOLD,textTransform:'uppercase',display:'block',marginBottom:6};
  const focusIn=e=>e.target.style.borderColor='rgba(201,163,78,0.55)';
  const focusOut=e=>e.target.style.borderColor='rgba(201,163,78,0.18)';

  return(
    <div style={{position:'fixed',inset:0,zIndex:2001,display:'flex',alignItems:'center',justifyContent:'center',padding:'16px'}}>
      <div onClick={close} style={{position:'absolute',inset:0,background:'rgba(0,0,0,0.72)',backdropFilter:'blur(10px)'}}/>
      <div style={{position:'relative',zIndex:1,width:'100%',maxWidth:500,background:'rgba(9,8,6,0.97)',border:'1px solid rgba(201,163,78,0.22)',borderRadius:18,backdropFilter:'blur(24px)',boxShadow:'0 32px 80px rgba(0,0,0,0.7),inset 0 1px 0 rgba(201,163,78,0.12)',overflow:'hidden'}}>

        {/* Header */}
        <div style={{padding:'22px 26px 18px',borderBottom:'1px solid rgba(201,163,78,0.1)',display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
          <div>
            <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.18em',color:GOLD,textTransform:'uppercase',marginBottom:5}}>Новый проект</div>
            <div style={{fontSize:22,fontWeight:500,color:'#F0EDE8',fontFamily:"'Cormorant Garamond',serif",lineHeight:1.2}}>Обсудить задачу</div>
          </div>
          <button onClick={close} style={{width:34,height:34,borderRadius:'50%',border:'1px solid rgba(255,255,255,0.1)',background:'rgba(255,255,255,0.04)',color:'rgba(255,255,255,0.45)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,lineHeight:1}}>×</button>
        </div>

        {/* Body */}
        <div style={{padding:'22px 26px 26px',maxHeight:'calc(90vh - 100px)',overflowY:'auto'}}>
          {status==='success'?(
            <div style={{textAlign:'center',padding:'28px 0'}}>
              <div style={{width:56,height:56,borderRadius:'50%',background:'rgba(201,163,78,0.1)',border:'1px solid rgba(201,163,78,0.3)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 18px'}}>
                <CheckCircle size={24} color={GOLD}/>
              </div>
              <div style={{fontSize:20,fontWeight:500,color:'#F0EDE8',fontFamily:"'Cormorant Garamond',serif",marginBottom:8}}>Заявка отправлена!</div>
              <div style={{fontSize:14,color:'rgba(229,229,229,0.5)',lineHeight:1.65,marginBottom:24}}>Отвечу в течение нескольких часов. Спасибо за обращение.</div>
              <button onClick={close} className="btn-gold" style={{padding:'12px 32px',borderRadius:10,fontSize:13,fontWeight:700,color:'#0C0D10',border:'none',cursor:'pointer'}}>Закрыть</button>
            </div>
          ):(
            <form onSubmit={send}>
              <label style={lbl}>Имя *</label>
              <input name="name" value={form.name} onChange={upd} placeholder="Как вас зовут?" style={inp} onFocus={focusIn} onBlur={focusOut}/>

              <label style={lbl}>Телефон или Email *</label>
              <input name="contact" value={form.contact} onChange={upd} placeholder="+7 900 000 00 00 или mail@example.ru" style={inp} onFocus={focusIn} onBlur={focusOut}/>

              <label style={lbl}>Тема обращения</label>
              <input name="subject" value={form.subject} onChange={upd} placeholder="Лендинг, приложение, CRM…" style={inp} onFocus={focusIn} onBlur={focusOut}/>

              <label style={lbl}>Расскажите о задаче *</label>
              <textarea name="message" value={form.message} onChange={upd} rows={4} placeholder="Что нужно сделать, сроки, бюджет, референсы…" style={{...inp,resize:'vertical',minHeight:96,marginBottom:8}} onFocus={focusIn} onBlur={focusOut}/>

              {errMsg&&<div style={{fontSize:12,color:status==='error'?'rgba(229,229,229,0.5)':'#F87171',marginBottom:12,lineHeight:1.55}}>{errMsg}{status==='error'&&<> → <a href="mailto:9254652@bk.ru" style={{color:GOLD}}>9254652@bk.ru</a></>}</div>}

              <button type="submit" className="btn-gold" disabled={status==='sending'} style={{width:'100%',padding:'14px',borderRadius:10,fontSize:14,fontWeight:700,color:'#0C0D10',border:'none',cursor:status==='sending'?'default':'pointer',opacity:status==='sending'?0.65:1,marginTop:4}}>
                {status==='sending'?'Отправляю…':'Отправить заявку →'}
              </button>
              <p style={{fontSize:11,color:'rgba(229,229,229,0.27)',marginTop:12,lineHeight:1.6,textAlign:'center'}}>
                Нажимая кнопку, вы соглашаетесь с{' '}
                <a href="#" onClick={openPrivacy} style={{color:'rgba(201,163,78,0.5)',textDecoration:'underline',textUnderlineOffset:'2px',cursor:'pointer'}}>Политикой конфиденциальности</a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────
const HERO_BG  = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920&q=85&fit=crop';
const CASES_BG = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80&fit=crop';
const IMGS = {
  lawyer:    'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=900&q=80&fit=crop',
  cats:      'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=900&q=80&fit=crop',
  dashboard: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&fit=crop',
  shop:      'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=900&q=80&fit=crop',
  iching:    'https://images.unsplash.com/photo-1547481887-a26e2cacb5b2?w=900&q=80&fit=crop',
  kott:      'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=900&q=80&fit=crop',
  ddchat:    'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&q=80&fit=crop',
  deepdrift: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&q=80&fit=crop',
  olga:      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80&fit=crop',
  capoeira:  'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=900&q=80&fit=crop',
};

const DEMOS = [
  { id:'lawyer',    tag:'Корпоративный сайт', title:'Визитка юриста',            img:IMGS.lawyer    },
  { id:'cats',      tag:'B2C Лендинг',        title:'Магазин для кошек',          img:IMGS.cats      },
  { id:'dashboard', tag:'SaaS · B2B',          title:'Панель мониторинга',         img:IMGS.dashboard },
  { id:'shop',      tag:'E-commerce',          title:'Магазин Невозможных Вещей',  img:IMGS.shop      },
];

const PROJECTS = [
  { id:'capoeira', tag:'Web · HTML · CSS · JS',   title:'FGR Capoeira',   subtitle:'Школа капоэйры в СПб',      desc:'SEO-оптимизированный лендинг для международной школы боевых искусств.', accent:'#009C3B', bg:'#020D05', url:'https://ddmsngr.github.io/FGR_Capoeira/',         metric:{value:'Live',label:'продакшен'}, stack:['HTML5','CSS3','JavaScript'],    description:'Лендинг для Familia Ginga e Raça — международной школы капоэйры в СПб с 30-летней историей. Бразильская эстетика, полная SEO-оптимизация, мобильная адаптация.', role:'Frontend Developer & UI/UX', featuresLabel:'Что реализовано', features:['Бразильская цветовая палитра с тематическим фоном','SEO: полный meta-пакет og:image, keywords, OpenGraph','Секции: герой, тренеры, расписание, контакты','Призыв к действию — первое занятие бесплатно','Mobile-first адаптация и touch-навигация','Деплой GitHub Pages + домен fgr-capoeira.ru'], tech:[['Frontend','HTML5, CSS3, Vanilla JS'],['SEO','OpenGraph, meta-keywords'],['Деплой','GitHub Pages']], challenges:[] },
  { id:'olga',     tag:'Web · HTML · Tailwind',    title:'Kitliash.cosmo', subtitle:'Сайт косметолога',          desc:'Премиальная визитка с фотографиями, lightbox-галереей и книгой автора.', accent:'#C9A34E', bg:'#0F0D09', url:'https://ddmsngr.github.io/olga-kosmetolog/',      metric:{value:'Live',label:'продакшен'}, stack:['HTML5','Tailwind CSS','Vanilla JS'], description:'Сайт-визитка для косметолога-эксперта Ольги Китляш (СПб). Тёплая крафтовая палитра, 10 реальных фотографий клиента, lightbox-галерея результатов, раздел для коллег.', role:'Frontend Developer & UI/UX', featuresLabel:'Что реализовано', features:['3 портрета расставлены по смысловым блокам','Lightbox: fullscreen по клику, закрытие по Esc','Превью книги «Скин-система»: обложка + 2 страницы','Оффер для коллег: консультация 10 000 ₽/час','Анимации через IntersectionObserver без библиотек','TG-канал вынесен отдельным баннером'], tech:[['Frontend','HTML5, Tailwind CSS'],['Анимации','CSS + IntersectionObserver'],['Деплой','GitHub Pages']], challenges:[] },
  { id:'iching',   tag:'Android · Flutter',        title:'И Цзин',         subtitle:'Книга Перемен',             desc:'Аутентичный ритуал монет, 64 гексаграммы и AI-интерпретатор.',             accent:'#D4AF37', bg:'#0A0908',                                                     metric:{value:'64', label:'гексаграммы'}, stack:['Flutter','Dart','OpenRouter API'],  description:'Нативное Android-приложение, воссоздающее ритуал гадания по Книге Перемен. Аутентичная механика трёх монет, полная база 64 гексаграмм и AI-интерпретатор.', role:'Solo Full-Stack Mobile Developer', featuresLabel:'Фишки приложения', features:['Анимированный ритуал броска монет с тактильной отдачей','Полный расклад: суждение, шесть черт, производная гексаграмма','AI: гексаграмма + вопрос + ситуация → ответ из 5 блоков','История с поиском и повторным вызовом AI','Гексаграмма дня, факт дня из 10 ротаций','Graceful Fallback при сбое API'], tech:[['UI','Flutter 3.x, Dart'],['State','Provider'],['AI','OpenRouter API'],['CI/CD','GitHub Actions']], challenges:['Интеллектуальная система выбора LLM с fallback','Поддержка кириллицы в HTTP-заголовках','Замена AI-провайдера без изменения кода клиента'] },
  { id:'ddchat',   tag:'Web · PWA · React',        title:'DDChat',         subtitle:'Защищённый мессенджер',     desc:'Zero-Data: ключи только на клиенте, сервер — слепой ретранслятор.',        accent:'#00C49A', bg:'#060C10',                                                     metric:{value:'E2E', label:'шифрование'}, stack:['React 18','TypeScript','WebSockets'], description:'Веб-приложение для безопасного обмена сообщениями. Ключи генерируются на клиенте — сервер является слепым ретранслятором.', role:'Solo Frontend & UI/UX Engineer', featuresLabel:'Фишки приложения', features:['Zero-Data: сервер не может раскрыть переписку','Нативные круглые видеосообщения на Android','Группы и каналы с полной логикой прав','PWA: установка из браузера без App Store','Гарантированный порядок сообщений при 3G/4G'], tech:[['Frontend','React 18, TypeScript'],['Протокол','WebSockets'],['Платформа','PWA']], challenges:['Видео-кружки: оптимизация CSS-композитинга','Клиентский алгоритм упорядочивания пакетов','Молниеносный рендер в групповых чатах'] },
  { id:'deepdrift',tag:'Python · PyTorch · R&D',   title:'DeepDrift',      subtitle:'Мониторинг ML-моделей',    desc:'Авторский метод детекции Model Drift через геометрию hidden states.',       accent:'#7C5CCC', bg:'#0D0B14', zenodoUrl:'https://zenodo.org/records/18622319', metric:{value:'Zenodo',label:'статья'},    stack:['Python 3.10+','PyTorch','CUDA'],   description:'Open-source инструмент мониторинга нейросетей. Автор разработал математический метод и опубликовал научную статью на Zenodo. Semantic Velocity решает Model Drift без дообучения.', role:'Автор метода, научной статьи и Solo Developer', featuresLabel:'Ключевые возможности', features:['Zero-Training: мониторинг без изменения весов','Semantic Velocity — авторская метрика дрейфа','OOD Detection: сигнал до ошибки на выходе','XAI: визуализация слой за слоем','Low-Overhead: параллельно с инференсом','Zenodo v5.2 — международный научный репозиторий'], tech:[['Стек','Python 3.10+, PyTorch'],['Математика','Линейная алгебра, геометрия тензоров'],['Интеграция','PyTorch hooks + HuggingFace'],['Дистрибуция','Zenodo v5.2']], challenges:['Расчёт метрик без задержки инференса','Универсальный интерфейс хуков для HuggingFace','Математическое обоснование Semantic Velocity'] },
  { id:'kott',     tag:'Android · Flutter',        title:'KOTT',           subtitle:'Реестр арт-коллекций',     desc:'Учёт произведений искусства с журналом перемещений и PDF-документами.',     accent:'#C8956C', bg:'#100C08', url:'https://ddmsngr.github.io/KOTT-site/',            metric:{value:'100%',label:'офлайн'},     stack:['Flutter','Isar','Riverpod'],       description:'Система учёта произведений искусства для художников. Полный цикл: от реестра до продажи и генерации юридически значимых документов. 100% локально.', role:'Solo Full-Stack Mobile Developer', featuresLabel:'Фишки приложения', features:['Реестр с цветовой кодировкой 7 статусов','Карточка: фото, размеры, серии, тираж, человеко-часы','Транзакционный журнал перемещений','PDF в 1 клик: сертификаты с QR, договоры, акты','Экспорт в Excel/CSV + JSON-бэкап','Уникальные ID без интернета'], tech:[['UI','Flutter 3.19, Material Design 3'],['State','Riverpod 2.x'],['БД','Isar 3.x'],['PDF','pdf, printing']], challenges:['Полная автономность без интернета','Генерация уникальных номеров без коллизий','Реактивный UI: изменения в БД → мгновенное отражение'] },
];

const TESTIMONIALS = [
  { name:'Игорь Смирнов',   role:'CEO, «ИнвестГрупп»',  text:'Запустили CRM за 6 недель вместо трёх месяцев. Окупилось в первый же квартал.' },
  { name:'Елена Васильева', role:'CMO, «ТехноРост»',     text:'Редкий случай, когда разработчик думает о метриках. Конверсия выросла на 42%.' },
  { name:'Дмитрий Орлов',   role:'Основатель, DDChat',   text:'Сложнейший проект по безопасности — без компромиссов. Прошли аудит с первой попытки.' },
];
const FAQ = [
  { q:'Сколько стоит?',             a:'Лендинг — от 5 000 ₽ (2–3 дня), сайт — от 80 000 ₽, приложение — от 350 000 ₽. Точную цену называю после брифа.' },
  { q:'Какие сроки?',               a:'Лендинг: от 2 дней. Сайт: 4–6 недель. Приложения: от 2 месяцев. Дедлайн фиксирую в договоре.' },
  { q:'Работаете по договору?',     a:'Да. ИП, фиксированная стоимость, оплата 30/40/30, закрывающие документы.' },
  { q:'Что после запуска?',         a:'30 дней бесплатных правок. Дальше — от 15 000 ₽/мес или разовые задачи.' },
  { q:'Можно видеть процесс?',      a:'Да. Еженедельные видеодемо и общий список задач — вы всегда видите прогресс.' },
];
const CAT_PRODUCTS=[{id:1,name:'Мятный Осьминог',desc:'Органическая мята + хрустящий наполнитель',price:490,img:'https://images.unsplash.com/photo-1535241749838-299277b6305f?w=300&q=80&fit=crop'},{id:2,name:'Пружинный Клубок',desc:'Устойчив к когтям, издаёт шелест',price:350,img:'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=300&q=80&fit=crop'},{id:3,name:'Перо Феникса',desc:'Натуральные перья + шуршащий хвост',price:280,img:'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300&q=80&fit=crop'},{id:4,name:'Туннель-Норка',desc:'Шуршащий материал, два входа',price:790,img:'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=300&q=80&fit=crop'}];
const SHOP_ITEMS=[{id:1,name:'Бутилированное время',desc:'1 час без встреч.',price:9900,img:'https://images.unsplash.com/photo-1501139083538-0139583c060f?w=400&q=80&fit=crop',rarity:'РЕДКИЙ',rc:'#00C49A'},{id:2,name:'Токен телепортации',desc:'Одноразовый. 500 км.',price:49000,img:'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&q=80&fit=crop',rarity:'ЭКСКЛЮЗИВ',rc:'#FF2D78'},{id:3,name:'Эссенция вдохновения',desc:'50 мл концентрата.',price:14500,img:'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=400&q=80&fit=crop',rarity:'ЛИМИТ',rc:'#FF9F1C'},{id:4,name:'Тихий понедельник',desc:'Без уведомлений.',price:7700,img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&fit=crop',rarity:'РЕДКИЙ',rc:'#00C49A'},{id:5,name:'Карта невидимости',desc:'Для офиса. 1 день.',price:21000,img:'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=400&q=80&fit=crop',rarity:'ЭКСКЛЮЗИВ',rc:'#FF2D78'},{id:6,name:'Удача в деталях',desc:'Флакон везения. 7 дней.',price:3300,img:'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?w=400&q=80&fit=crop',rarity:'БАЗОВЫЙ',rc:'#888'}];
const LOG_DATA=(()=>{const ops=['Синхронизация БД','Репликация данных','Обновление кэша','Запрос к API','Авторизация','Резервная копия'],srvs=['server-01','server-02','db-master','api-gw','cache-01'];return Array.from({length:48},(_,i)=>{const r=Math.random();return{id:`LOG-${String(i+1).padStart(4,'0')}`,time:`2026-05-${String(Math.floor(i/2)+1).padStart(2,'0')} ${String(i%24).padStart(2,'0')}:${String(Math.floor(Math.random()*60)).padStart(2,'0')}`,op:ops[i%ops.length],server:srvs[i%srvs.length],status:r<0.7?'success':r<0.9?'warning':'error',ms:Math.round(30+Math.random()*1500)};});})();
const SERVERS=[{name:'server-01',ip:'192.168.1.10',cpu:67,ram:45,status:'online',ping:12},{name:'server-02',ip:'192.168.1.11',cpu:34,ram:62,status:'online',ping:18},{name:'db-master',ip:'10.0.0.5',cpu:82,ram:78,status:'warning',ping:8},{name:'api-gw',ip:'10.0.0.1',cpu:21,ram:33,status:'online',ping:5},{name:'cache-01',ip:'192.168.1.20',cpu:15,ram:20,status:'online',ping:3}];
const AUSERS=[{name:'Анна К.',role:'Admin',last:'2 мин',avatar:'АК',status:'online'},{name:'Дмитрий В.',role:'Operator',last:'7 мин',avatar:'ДВ',status:'online'},{name:'Ирина М.',role:'Viewer',last:'15 мин',avatar:'ИМ',status:'away'},{name:'Павел С.',role:'Operator',last:'32 мин',avatar:'ПС',status:'away'},{name:'Елена Т.',role:'Admin',last:'1 ч',avatar:'ЕТ',status:'offline'}];
const ALERTS=[{level:'error',msg:'db-master: RAM превысила 80%',time:'2 мин'},{level:'warning',msg:'server-02: задержка >400 мс',time:'14 мин'},{level:'warning',msg:'cache-01: заполнен на 74%',time:'28 мин'},{level:'info',msg:'Резервная копия завершена',time:'1 ч'},{level:'error',msg:'api-gw: 3 неудачных авторизации',time:'5 ч'}];
const LAWYER_REV=[{name:'Игорь Смирнов',role:'Гендиректор, «ИнвестГрупп»',text:'Взялись за спор, когда другие отказывались. Победа в суде.'},{name:'Елена Васильева',role:'Партнёр, «ТехноРост»',text:'Сопровождение слияния прошло безупречно. Внимание к деталям.'},{name:'Дмитрий Орлов',role:'Частный клиент',text:'Семейное дело. Адвокат защитила интересы и сохранила достоинство.'}];

// ─── History-aware navigation ─────────────────────────────────────────────
const DEMO_IDS = new Set(['lawyer','cats','dashboard','shop']);
const HAS_URL  = new Set(['olga','capoeira','kott']);

function viewFromHash(hash) {
  if (hash.startsWith('#/project/')) return hash.slice(10);
  if (hash.startsWith('#/demo/'))    return hash.slice(7);
  return 'home';
}

// ─── BackBtn ──────────────────────────────────────────────────────────────
function BackBtn({ navigate, dark=true, returnTo='demos' }) {
  const handleBack = () => {
    if (returnTo) pendingScroll = returnTo;
    // Use browser history if available, else fallback
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate('home');
    }
  };
  return (
    <motion.button initial={{opacity:0,x:-14}} animate={{opacity:1,x:0}} transition={{delay:0.2}}
      onClick={handleBack}
      style={{position:'fixed',top:20,left:20,zIndex:200,display:'flex',alignItems:'center',gap:8,padding:'8px 18px',borderRadius:40,border:`1px solid ${dark?'rgba(255,255,255,0.12)':'rgba(0,0,0,0.1)'}`,background:dark?'rgba(12,13,16,0.8)':'rgba(255,255,255,0.8)',backdropFilter:'blur(16px)',color:dark?TEXT:'#191919',fontSize:13,fontWeight:500,cursor:'pointer',fontFamily:'Inter,sans-serif',transition:'opacity 200ms'}}>
      <ArrowLeft size={13}/> Портфолио
    </motion.button>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// HOME
// ═══════════════════════════════════════════════════════════════════════════
function HomeView({navigate}) {
  const [scrolled,setScrolled]=useState(false);
  const [hov,setHov]=useState(null);
  const [openFaq,setOpenFaq]=useState(null);
  const [tSlide,setTSlide]=useState(0);
  const videoRef=useRef(null);

  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>window.innerHeight*.85);
    window.addEventListener('scroll',fn,{passive:true});
    return()=>window.removeEventListener('scroll',fn);
  },[]);

  useEffect(()=>{
    const v=videoRef.current;
    if(!v)return;
    const FADE=0.5;
    let raf;
    const loop=()=>{
      if(!v.duration){raf=requestAnimationFrame(loop);return;}
      const t=v.currentTime,d=v.duration,rem=d-t;
      if(t<FADE)v.style.opacity=t/FADE;
      else if(rem<FADE)v.style.opacity=rem/FADE;
      else v.style.opacity=1;
      raf=requestAnimationFrame(loop);
    };
    const onEnded=()=>{v.style.opacity=0;setTimeout(()=>{v.currentTime=0;v.play().catch(()=>{});},100);};
    v.style.opacity=0;
    v.play().catch(()=>{});
    raf=requestAnimationFrame(loop);
    v.addEventListener('ended',onEnded);
    return()=>{cancelAnimationFrame(raf);v.removeEventListener('ended',onEnded);};
  },[]);
  useEffect(()=>{
    if(pendingScroll){const id=pendingScroll;pendingScroll=null;setTimeout(()=>document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'}),80);}
  },[]);

  const TICKER=['ВЕБ-РАЗРАБОТКА','PREMIUM UX/UI','REACT','МОБИЛЬНЫЕ ПРИЛОЖЕНИЯ','FLUTTER','ЧИСТЫЙ КОД','ANDROID','ВЫСОКАЯ КОНВЕРСИЯ','WEB SERVICES','PWA','СКОРОСТЬ & ОПТИМИЗАЦИЯ','МАСШТАБИРУЕМОСТЬ ИТ-РЕШЕНИЙ','ТЕХНОЛОГИЧНЫЙ ДИЗАЙН'];
  const SVCS=[
    {n:'01',t:'Лендинги',            p:'от 5 000 ₽',   d:'2–3 дня · высокая конверсия'},
    {n:'02',t:'Корпоративные сайты', p:'от 80 000 ₽',  d:'CMS, каталоги, мультистраничные'},
    {n:'03',t:'Мобильные приложения',p:'от 400 000 ₽', d:'Android · Flutter · CI/CD'},
    {n:'04',t:'Веб-приложения',      p:'от 350 000 ₽', d:'CRM · SaaS · дашборды'},
  ];
  const PROC=[
    {Icon:MessageCircle,t:'Бриф',      n:'01',d:'1–2 дня. Созвон, фиксирую задачи и метрики.'},
    {Icon:Layers,       t:'Прототип',  n:'02',d:'3–7 дней. Кликабельный прототип до старта.'},
    {Icon:Code2,        t:'Разработка',n:'03',d:'Еженедельные видеодемо, список задач открыт.'},
    {Icon:Rocket,       t:'Запуск',    n:'04',d:'Тесты, деплой, 30 дней бесплатных правок.'},
  ];
  const lbl={fontSize:11,fontWeight:600,letterSpacing:'0.18em',textTransform:'uppercase',color:GOLD,marginBottom:16};
  const h2={fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(36px,5vw,58px)',fontWeight:400,color:'#F0EDE8',letterSpacing:'-0.01em',lineHeight:1.06};

  return(
    <div style={{background:BG,color:TEXT,fontFamily:'Inter,sans-serif',overflowX:'hidden'}}>

      {/* HEADER — hidden until scrolled past hero */}
      <header style={{position:'fixed',top:0,left:0,right:0,zIndex:80,padding:'0 48px',height:70,display:'flex',alignItems:'center',justifyContent:'space-between',background:scrolled?'rgba(12,13,16,0.96)':'transparent',backdropFilter:scrolled?'blur(20px)':'none',borderBottom:scrolled?`1px solid ${BORDER}`:'none',opacity:scrolled?1:0,pointerEvents:scrolled?'auto':'none',transition:'background 350ms,border-color 350ms,backdrop-filter 350ms,opacity 350ms'}}>
        <a href="#" style={{display:'flex',alignItems:'center',gap:14,textDecoration:'none'}}>
          <AELogo height={30}/>
          <div>
            <div style={{fontWeight:700,fontSize:12.5,letterSpacing:'0.1em',color:TEXT,textTransform:'uppercase',lineHeight:1.2}}>Алексей Евтушенко</div>
            <div style={{fontSize:9,letterSpacing:'0.2em',color:TEXT_D,textTransform:'uppercase',marginTop:2}}>Разработка сайтов и приложений</div>
          </div>
        </a>
        <nav className="desktop-nav" style={{display:'flex',gap:36,alignItems:'center'}}>
          {[['Услуги','#services'],['Кейсы','#cases'],['Процесс','#process'],['FAQ','#faq']].map(([n,h])=>(
            <a key={n} href={h} style={{fontSize:13,fontWeight:500,color:TEXT_M,textDecoration:'none',transition:'color 200ms'}}
              onMouseEnter={e=>e.target.style.color=TEXT} onMouseLeave={e=>e.target.style.color=TEXT_M}>{n}</a>
          ))}
        </nav>
        <button onClick={openContact} className="btn-gold desktop-nav" style={{padding:'10px 24px',borderRadius:8,fontSize:13,fontWeight:700,color:'#0C0D10',border:'none',cursor:'pointer'}}>
          Обсудить проект
        </button>
      </header>

      {/* HERO — fullscreen video, black+gold palette */}
      <div style={{position:'relative',overflow:'hidden',minHeight:'100vh',background:'#060608'}}>
        {/* Background video — desaturated to kill purple cast */}
        <video
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_065045_c44942da-53c6-4804-b734-f9e07fc22e08.mp4"
          muted playsInline
          style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',opacity:0,pointerEvents:'none',filter:'saturate(0.28) brightness(0.82)'}}
        />
        {/* Warm dark overlay to shift tone from blue-purple to near-black */}
        <div style={{position:'absolute',inset:0,background:'rgba(8,5,2,0.52)',pointerEvents:'none',zIndex:1}}/>

        {/* Hero content */}
        <div style={{position:'relative',zIndex:10,minHeight:'100vh',display:'flex',flexDirection:'column',overflow:'visible'}}>

          {/* Dark warm core blur */}
          <div style={{position:'absolute',width:1020,height:560,top:'50%',left:'50%',transform:'translate(-50%,-50%)',background:'#070401',filter:'blur(90px)',opacity:0.94,pointerEvents:'none',zIndex:0}}/>
          {/* Gold ambient — top right */}
          <div style={{position:'absolute',width:680,height:680,top:'-10%',left:'50%',background:'radial-gradient(circle,rgba(201,163,78,0.09) 0%,transparent 65%)',filter:'blur(60px)',pointerEvents:'none',zIndex:0}}/>
          {/* Gold ambient — bottom left */}
          <div style={{position:'absolute',width:500,height:500,bottom:'0%',left:'-6%',background:'radial-gradient(circle,rgba(201,163,78,0.055) 0%,transparent 65%)',filter:'blur(80px)',pointerEvents:'none',zIndex:0}}/>

          {/* Navbar */}
          <nav style={{position:'relative',zIndex:1,padding:'20px 44px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <a href="#" style={{display:'flex',alignItems:'center',gap:12,textDecoration:'none'}}>
              <AELogo height={34}/>
              <div>
                <div style={{fontWeight:700,fontSize:11,letterSpacing:'0.14em',color:'rgba(245,240,232,0.88)',textTransform:'uppercase',lineHeight:1.2}}>Алексей Евтушенко</div>
                <div style={{fontSize:8.5,letterSpacing:'0.18em',color:'rgba(245,240,232,0.28)',textTransform:'uppercase',marginTop:2}}>Fullstack · Mobile · Web</div>
              </div>
            </a>
            <div className="hero-nav-links" style={{display:'flex',gap:32,alignItems:'center'}}>
              {[['Услуги','#services'],['Кейсы','#cases'],['Процесс','#process'],['FAQ','#faq']].map(([label,href])=>(
                <a key={label} href={href}
                  style={{color:'rgba(245,240,232,0.6)',fontSize:14,textDecoration:'none',transition:'color 200ms'}}
                  onMouseEnter={e=>e.currentTarget.style.color='rgba(245,240,232,1)'}
                  onMouseLeave={e=>e.currentTarget.style.color='rgba(245,240,232,0.6)'}>
                  {label}
                </a>
              ))}
            </div>
            <button onClick={openContact} className="btn-gold hero-nav-cta" style={{padding:'9px 22px',borderRadius:8,fontSize:13,fontWeight:700,color:'#0C0D10',border:'none',cursor:'pointer'}}>
              Обсудить проект
            </button>
          </nav>

          {/* Divider — gold tint */}
          <div style={{height:1,background:'linear-gradient(to right,transparent,rgba(201,163,78,0.2),transparent)',marginTop:3}}/>

          {/* Headline + subtitle + CTA */}
          <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'flex-start',position:'relative',zIndex:1,padding:'0 52px'}}>
            <div style={{maxWidth:820}}>

              {/* Status pill */}
              <div style={{display:'inline-flex',alignItems:'center',gap:8,marginBottom:30,padding:'5px 14px',borderRadius:40,border:'1px solid rgba(201,163,78,0.22)',background:'rgba(201,163,78,0.06)'}}>
                <div style={{width:6,height:6,borderRadius:'50%',background:GOLD,boxShadow:`0 0 8px ${GOLD}88`}}/>
                <span style={{fontSize:11,fontWeight:700,letterSpacing:'0.16em',color:GOLD,textTransform:'uppercase'}}>Fullstack-разработчик · Открыт для проектов</span>
              </div>

              {/* Name */}
              <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(68px,9vw,116px)',fontWeight:400,lineHeight:0.96,letterSpacing:'-0.02em',margin:'0 0 30px'}}>
                <span style={{color:'#F5F0E8',display:'block'}}>Алексей</span>
                <span style={{
                  background:'linear-gradient(135deg,#E8C94A 0%,#C9A34E 40%,#D4AF37 72%,#EDD060 100%)',
                  WebkitBackgroundClip:'text',
                  WebkitTextFillColor:'transparent',
                  backgroundClip:'text',
                  display:'block',
                }}>Евтушенко</span>
              </h1>

              {/* Subtitle */}
              <p style={{color:'rgba(245,240,232,0.72)',fontSize:18,lineHeight:'30px',maxWidth:530,margin:'0 0 14px',fontWeight:400}}>
                Разработка высококлассных сайтов, мобильных приложений и&nbsp;веб-сервисов премиум-уровня
              </p>
              {/* Description */}
              <p style={{color:'rgba(245,240,232,0.36)',fontSize:14,lineHeight:'25px',maxWidth:480,margin:'0 0 42px'}}>
                Создаю технологичные цифровые продукты с высокой конверсией и&nbsp;топовым дизайном — от&nbsp;идеи до&nbsp;продакшена.
              </p>

              {/* CTA buttons */}
              <div style={{display:'flex',gap:12,flexWrap:'wrap',alignItems:'center'}}>
                <button onClick={openContact} className="btn-gold" style={{display:'inline-flex',alignItems:'center',gap:8,padding:'14px 32px',borderRadius:10,fontSize:14,fontWeight:700,color:'#0C0D10',border:'none',cursor:'pointer'}}>
                  Обсудить проект <ArrowRight size={15}/>
                </button>
                <a href="#cases"
                  style={{display:'inline-flex',alignItems:'center',gap:8,padding:'13px 28px',borderRadius:10,fontSize:14,fontWeight:500,color:'rgba(245,240,232,0.78)',textDecoration:'none',border:'1px solid rgba(201,163,78,0.24)',background:'rgba(201,163,78,0.04)',transition:'border-color 200ms,background 200ms'}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(201,163,78,0.45)';e.currentTarget.style.background='rgba(201,163,78,0.09)'}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(201,163,78,0.24)';e.currentTarget.style.background='rgba(201,163,78,0.04)'}}>
                  Смотреть кейсы <ArrowUpRight size={14}/>
                </a>
              </div>
            </div>
          </div>

          {/* Logo marquee — pinned to bottom */}
          <div style={{paddingBottom:40,position:'relative',zIndex:1}}>
            <div style={{maxWidth:'64rem',margin:'0 auto',padding:'0 44px',display:'flex',alignItems:'center',gap:48}}>
              <div style={{fontSize:12,color:'rgba(245,240,232,0.3)',whiteSpace:'nowrap',lineHeight:1.7,flexShrink:0,letterSpacing:'0.02em'}}>
                Доверяют бренды<br/>по всей России
              </div>
              <div style={{overflow:'hidden',flex:1}}>
                <div style={{display:'flex',gap:56,animation:'marquee 20s linear infinite',width:'max-content'}}>
                  {['DDChat','KOTT','DeepDrift','Kitliash','ИнвестГрупп','ТехноРост','DDChat','KOTT','DeepDrift','Kitliash','ИнвестГрупп','ТехноРост'].map((name,i)=>(
                    <div key={i} style={{display:'flex',alignItems:'center',gap:8,flexShrink:0}}>
                      <div className="liquid-glass" style={{width:24,height:24,borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,color:'rgba(201,163,78,0.72)',flexShrink:0}}>
                        {name[0]}
                      </div>
                      <span style={{fontSize:15,fontWeight:600,color:'rgba(245,240,232,0.46)',whiteSpace:'nowrap'}}>{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* TICKER */}
      <div style={{borderTop:`1px solid ${BORDER}`,borderBottom:`1px solid ${BORDER}`,padding:'16px 0',overflow:'hidden'}}>
        <div className="marquee-inner">
          {[...TICKER,...TICKER].map((item,i)=>(
            <span key={i} style={{display:'inline-flex',alignItems:'center'}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:'0.2em',color:TEXT_D,textTransform:'uppercase',padding:'0 22px'}}>{item}</span>
              <span style={{color:GOLD,fontSize:8,opacity:0.45}}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" style={{maxWidth:1100,margin:'0 auto',padding:'120px 48px',scrollMarginTop:70}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:64,flexWrap:'wrap',gap:16}}>
          <div><div style={lbl}>Услуги</div><h2 style={h2}>Что я создаю</h2></div>
          <p style={{fontSize:15,color:TEXT_M,maxWidth:360,lineHeight:1.65,textAlign:'right'}}>Полный цикл — от брифа до деплоя и поддержки.</p>
        </div>
        {SVCS.map((s,i)=>(
          <motion.div key={i} initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.06}}
            className="service-row"
            style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'24px 20px',borderBottom:`1px solid ${BORDER}`,borderRadius:4,gap:16,cursor:'default'}}>
            <span style={{fontSize:12,fontWeight:700,color:GOLD,letterSpacing:'0.1em',minWidth:26,fontFamily:"'Cormorant Garamond',serif",lineHeight:1}}>{s.n}</span>
            <div style={{flex:1}}>
              <div style={{fontSize:19,fontWeight:600,color:TEXT,letterSpacing:'-0.01em',marginBottom:3}}>{s.t}</div>
              <div style={{fontSize:13,color:TEXT_M}}>{s.d}</div>
            </div>
            <div style={{fontSize:16,fontWeight:700,color:GOLD}}>{s.p}</div>
          </motion.div>
        ))}
      </section>

      {/* CASES — строго 3 колонки, 6 проектов = 2 ряда по 3 */}
      <section id="cases" style={{scrollMarginTop:70,position:'relative',overflow:'hidden'}}>
        {/* Section ambient */}
        <Orb top="10%"   left="2%"   size={700} color="rgba(201,163,78,0.04)" blur={100}/>
        <Orb bottom="5%" right="2%"  size={600} color="rgba(100,70,220,0.04)" blur={90}/>

        <div style={{position:'relative',height:240,overflow:'hidden',marginBottom:2}}>
          <img src={CASES_BG} alt="" style={{width:'100%',height:'100%',objectFit:'cover',filter:'brightness(0.32) saturate(0.7)'}}/>
          <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom,rgba(12,13,16,0.3),rgba(12,13,16,0.88))'}}/>
          <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',position:'relative',zIndex:1}}>
            <div style={lbl}>Кейсы</div>
            <h2 style={h2}>Избранные проекты</h2>
          </div>
        </div>

        {/* Mobile-only label above cases */}
        <div className="mobile-cases-label" style={{display:'none',alignItems:'center',gap:12,padding:'28px 20px 16px',borderTop:`1px solid ${BORDER}`}}>
          <div style={{width:3,height:28,background:`linear-gradient(to bottom,${GOLD},transparent)`,borderRadius:2,flexShrink:0}}/>
          <div>
            <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.18em',color:GOLD,textTransform:'uppercase',marginBottom:3}}>Портфолио</div>
            <div style={{fontSize:20,fontWeight:700,color:'#F0EDE8',letterSpacing:'-0.01em',lineHeight:1.1}}>Реализованные проекты</div>
          </div>
        </div>

        {/* 3-column grid → 1 column on mobile */}
        <div className="cases-grid" style={{
          display:'grid',
          gridTemplateColumns:'repeat(3,1fr)',
          gap:2,
          background:BG,
          position:'relative',
          zIndex:1,
        }}>
          {PROJECTS.map((p,i)=>(
            <motion.div key={p.id} initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{delay:(i%3)*0.07}}
              className="case-card"
              onClick={()=>{if(HAS_URL.has(p.id)&&p.url){window.open(p.url,'_blank');}else{navigate(p.id);}}}
              onMouseEnter={()=>setHov(p.id)} onMouseLeave={()=>setHov(null)}
              style={{position:'relative',height:360,overflow:'hidden',cursor:'pointer'}}>
              <img src={IMGS[p.id]||IMGS.olga} alt={p.title}
                style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',transition:'transform 500ms ease,filter 500ms ease',transform:hov===p.id?'scale(1.04)':'scale(1)',filter:hov===p.id?'brightness(0.45) saturate(0.8)':'brightness(0.32) saturate(0.6)'}}/>
              <div style={{position:'absolute',inset:0,background:`linear-gradient(to top,rgba(12,13,16,0.97) 0%,rgba(12,13,16,0.25) 65%,rgba(12,13,16,0.12) 100%)`}}/>
              <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',justifyContent:'flex-end',padding:'24px 26px'}}>
                <div style={{display:'flex',gap:7,marginBottom:10,flexWrap:'wrap'}}>
                  {p.stack.slice(0,2).map(t=><span key={t} style={{fontSize:10,fontWeight:700,padding:'3px 9px',borderRadius:40,background:p.accent+'18',border:`1px solid ${p.accent}22`,color:p.accent,letterSpacing:'0.06em'}}>{t}</span>)}
                </div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(22px,2.5vw,30px)',fontWeight:400,color:'#F0EDE8',letterSpacing:'-0.01em',lineHeight:1.1,marginBottom:6}}>{p.title}</div>
                <div style={{fontSize:12.5,color:TEXT_M,marginBottom:14}}>{p.subtitle}</div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div style={{fontSize:13,color:p.accent,fontWeight:600,display:'flex',alignItems:'center',gap:5}}>
                    {p.url?'Открыть сайт':'Читать кейс'} <ArrowUpRight size={13}/>
                  </div>
                  <div style={{background:'rgba(0,0,0,0.5)',borderRadius:7,padding:'4px 10px',backdropFilter:'blur(6px)'}}>
                    <div style={{fontSize:9,color:TEXT_D,textTransform:'uppercase',letterSpacing:'0.07em'}}>{p.metric.label}</div>
                    <div style={{fontWeight:800,fontSize:12,color:TEXT}}>{p.metric.value}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DEMOS */}
      <section id="demos" style={{maxWidth:1100,margin:'0 auto',padding:'120px 48px 80px',scrollMarginTop:70}}>
        <div style={{marginBottom:52}}>
          <div style={lbl}>Демо</div>
          <h2 style={h2}>Примеры интерфейсов</h2>
          <p style={{fontSize:14,color:TEXT_M,marginTop:12}}>Нажмите — откроется интерактивная демо-версия.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:14}}>
          {DEMOS.map(d=>(
            <div key={d.id} onClick={()=>navigate(d.id)}
              onMouseEnter={()=>setHov('d'+d.id)} onMouseLeave={()=>setHov(null)}
              style={{position:'relative',height:260,borderRadius:14,overflow:'hidden',cursor:'pointer',transition:'transform 280ms ease,box-shadow 280ms ease',transform:hov==='d'+d.id?'translateY(-4px)':'none',boxShadow:hov==='d'+d.id?'0 16px 48px rgba(0,0,0,0.5)':'none'}}>
              <img src={d.img} alt={d.title} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',filter:'brightness(0.38) saturate(0.7)',transition:'transform 400ms ease',transform:hov==='d'+d.id?'scale(1.07)':'scale(1)'}}/>
              <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(12,13,16,0.96) 0%,rgba(12,13,16,0.18) 100%)'}}/>
              <div style={{position:'absolute',top:14,left:14}}>
                <span style={{fontSize:10,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(255,255,255,0.7)',background:'rgba(12,13,16,0.6)',backdropFilter:'blur(8px)',padding:'4px 10px',borderRadius:40}}>{d.tag}</span>
              </div>
              {hov==='d'+d.id&&(
                <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}>
                  <div style={{background:'rgba(255,255,255,0.95)',color:BG,borderRadius:40,padding:'9px 20px',fontSize:12.5,fontWeight:700,display:'flex',alignItems:'center',gap:6,boxShadow:'0 4px 24px rgba(0,0,0,0.3)',whiteSpace:'nowrap'}}>Открыть <ArrowUpRight size={12}/></div>
                </motion.div>
              )}
              <div style={{position:'absolute',bottom:20,left:18,right:18}}>
                <div style={{fontSize:18,fontWeight:700,color:'#F0EDE8',letterSpacing:'-0.01em'}}>{d.title}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS — цифры крупные, золотые, видимые */}
      <section id="process" style={{borderTop:`1px solid ${BORDER}`,borderBottom:`1px solid ${BORDER}`,position:'relative',overflow:'hidden'}}>
        <Orb top="20%"  right="5%"  size={500} color="rgba(201,163,78,0.05)" blur={80}/>
        <div style={{maxWidth:1100,margin:'0 auto',padding:'96px 48px',scrollMarginTop:70,position:'relative',zIndex:1}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:64,flexWrap:'wrap',gap:16}}>
            <div><div style={lbl}>Процесс</div><h2 style={h2}>Как мы работаем</h2></div>
            <p style={{fontSize:15,color:TEXT_M,maxWidth:320,lineHeight:1.65}}>Еженедельные демо. Вы всегда видите прогресс.</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:0}}>
            {PROC.map((p,i)=>(
              <motion.div key={i} initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.09}}
                style={{paddingRight:32,paddingLeft:i>0?32:0,borderRight:i<3?`1px solid ${BORDER}`:'none',position:'relative'}}>
                {/* Большая видимая цифра — акцентная золотая */}
                <div style={{
                  fontFamily:"'Cormorant Garamond',serif",
                  fontSize:96,fontWeight:700,
                  color:'rgba(201,163,78,0.22)',
                  lineHeight:1,marginBottom:16,
                  letterSpacing:'-0.04em',
                  userSelect:'none',
                  textShadow:`0 0 40px rgba(201,163,78,0.15)`,
                }}>{p.n}</div>
                <div style={{width:36,height:36,borderRadius:9,background:'rgba(201,163,78,0.07)',border:`1px solid rgba(201,163,78,0.12)`,display:'flex',alignItems:'center',justifyContent:'center',color:GOLD,marginBottom:16}}><p.Icon size={17}/></div>
                <div style={{fontSize:18,fontWeight:700,color:TEXT,marginBottom:10,letterSpacing:'-0.01em'}}>{p.t}</div>
                <div style={{fontSize:13.5,color:TEXT_M,lineHeight:1.68}}>{p.d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{maxWidth:1100,margin:'0 auto',padding:'96px 48px'}}>
        <div style={{textAlign:'center',marginBottom:64}}>
          <div style={lbl}>Отзывы</div>
          <h2 style={{...h2,textAlign:'center'}}>Что говорят клиенты</h2>
        </div>
        <div style={{position:'relative',maxWidth:720,margin:'0 auto'}}>
          <AnimatePresence mode="wait">
            <motion.div key={tSlide} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:0.28}} style={{textAlign:'center'}}>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(22px,3vw,32px)',fontStyle:'italic',color:'#F0EDE8',lineHeight:1.6,marginBottom:36}}>
                «{TESTIMONIALS[tSlide].text}»
              </div>
              <div style={{display:'flex',gap:2,justifyContent:'center',marginBottom:14}}>{Array.from({length:5}).map((_,j)=><Star key={j} size={13} fill={GOLD} color={GOLD}/>)}</div>
              <div style={{fontWeight:700,fontSize:14,color:TEXT}}>{TESTIMONIALS[tSlide].name}</div>
              <div style={{fontSize:13,color:TEXT_M,marginTop:3}}>{TESTIMONIALS[tSlide].role}</div>
            </motion.div>
          </AnimatePresence>
          <div style={{display:'flex',justifyContent:'center',gap:10,marginTop:32}}>
            {TESTIMONIALS.map((_,i)=>(
              <button key={i} onClick={()=>setTSlide(i)}
                style={{width:i===tSlide?24:8,height:8,borderRadius:4,border:'none',background:i===tSlide?GOLD:'rgba(255,255,255,0.16)',cursor:'pointer',transition:'width 250ms,background 250ms',padding:0}}/>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{borderTop:`1px solid ${BORDER}`}}>
        <div style={{maxWidth:720,margin:'0 auto',padding:'96px 48px',scrollMarginTop:70}}>
          <div style={{marginBottom:52}}>
            <div style={lbl}>FAQ</div>
            <h2 style={h2}>Частые вопросы</h2>
          </div>
          {FAQ.map((f,i)=>(
            <div key={i} style={{borderBottom:`1px solid ${openFaq===i?'rgba(201,163,78,0.2)':BORDER}`,transition:'border-color 200ms'}}>
              <button onClick={()=>setOpenFaq(openFaq===i?null:i)}
                style={{width:'100%',padding:'22px 0',display:'flex',justifyContent:'space-between',alignItems:'center',background:'transparent',border:'none',cursor:'pointer',fontFamily:'Inter,sans-serif',textAlign:'left'}}>
                <span style={{fontSize:15.5,fontWeight:600,color:openFaq===i?TEXT:TEXT_M,paddingRight:20,transition:'color 200ms',lineHeight:1.4}}>{f.q}</span>
                <ChevronDown size={16} style={{color:GOLD,flexShrink:0,transform:openFaq===i?'rotate(180deg)':'none',transition:'transform 250ms'}}/>
              </button>
              <AnimatePresence>
                {openFaq===i&&(
                  <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.24}}>
                    <div style={{paddingBottom:22,fontSize:14.5,color:TEXT_M,lineHeight:1.75}}>{f.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" style={{borderTop:`1px solid ${BORDER}`,position:'relative',overflow:'hidden'}}>
        <Orb top="30%" left="30%" size={600} color="rgba(201,163,78,0.06)" blur={100}/>
        <Orb bottom="10%" right="10%" size={400} color="rgba(79,60,180,0.05)" blur={80}/>
        <div style={{maxWidth:1100,margin:'0 auto',padding:'112px 48px 128px',position:'relative',zIndex:1}}>
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.65}} style={{textAlign:'center'}}>
            <div style={{marginBottom:24,display:'flex',justifyContent:'center'}}><AELogo height={44}/></div>
            <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(52px,9vw,100px)',fontWeight:400,color:'#F0EDE8',letterSpacing:'-0.025em',lineHeight:1.0,marginBottom:24}}>Есть задача?</h2>
            <p style={{fontSize:18,color:TEXT_M,marginBottom:48,maxWidth:440,margin:'0 auto 48px',lineHeight:1.65}}>Бесплатная консультация: разберём задачу и назовём точную стоимость.</p>
            <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}>
              <a href="mailto:9254652@bk.ru" className="btn-gold" style={{display:'inline-flex',alignItems:'center',gap:9,padding:'15px 32px',borderRadius:10,fontSize:15,fontWeight:700,color:'#0C0D10',textDecoration:'none'}}>
                <Mail size={16}/> 9254652@bk.ru
              </a>
              <a href="tel:+79119254652" className="btn-outline" style={{display:'inline-flex',alignItems:'center',gap:9,padding:'15px 32px',background:'rgba(255,255,255,0.04)',color:TEXT,border:`1px solid rgba(255,255,255,0.12)`,borderRadius:10,fontSize:15,fontWeight:500,textDecoration:'none'}}>
                <Phone size={16}/> +7 911 925 46 52
              </a>
            </div>
            <p style={{fontSize:11,color:'rgba(229,229,229,0.28)',marginTop:18,textAlign:'center',lineHeight:1.65,maxWidth:420,margin:'18px auto 0'}}>
              Нажимая кнопку, вы даёте согласие на обработку персональных данных в&nbsp;соответствии с&nbsp;<a href="#" onClick={openPrivacy} style={{color:'rgba(201,163,78,0.5)',textDecoration:'underline',textUnderlineOffset:'2px',cursor:'pointer'}}>Политикой конфиденциальности</a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{borderTop:`1px solid ${BORDER}`,padding:'26px 0'}}>
        <div style={{maxWidth:1100,margin:'0 auto',padding:'0 48px',display:'flex',justifyContent:'space-between',alignItems:'center',gap:16,flexWrap:'wrap'}}>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <AELogo height={24}/>
            <span style={{fontSize:11.5,fontWeight:600,color:TEXT_D,letterSpacing:'0.08em',textTransform:'uppercase'}}>Алексей Евтушенко</span>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:20,flexWrap:'wrap'}}>
            <div style={{fontSize:13,color:TEXT_D}}>© 2026</div>
            <a href="#" onClick={openPrivacy} style={{fontSize:12,color:'rgba(229,229,229,0.2)',textDecoration:'none',borderBottom:'1px solid rgba(229,229,229,0.1)',paddingBottom:1,cursor:'pointer',transition:'color 200ms'}} onMouseEnter={e=>e.currentTarget.style.color='rgba(201,163,78,0.55)'} onMouseLeave={e=>e.currentTarget.style.color='rgba(229,229,229,0.2)'}>Политика конфиденциальности</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ═══════════════════ DEMO VIEWS (unchanged internals) ═══════════════════
function LawyerView({navigate}){
  const [slide,setSlide]=useState(0);
  return(<div style={{background:'#0A192F',color:'#fff',minHeight:'100vh',fontFamily:'Inter,sans-serif'}}><BackBtn navigate={navigate}/>
    <div style={{position:'relative',height:440,overflow:'hidden'}}><img src={IMGS.lawyer} alt="" style={{width:'100%',height:'100%',objectFit:'cover',filter:'brightness(0.28) saturate(0.55)'}}/><div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom,transparent 30%,#0A192F 100%)'}}/><div className="lawyer-nav" style={{position:'absolute',top:0,left:0,right:0,padding:'22px 56px 22px 100px',display:'flex',justifyContent:'space-between',alignItems:'center'}}><div><div style={{fontSize:17,fontWeight:700,color:'#D4AF37',letterSpacing:'0.06em',fontFamily:"'Cormorant Garamond',serif"}}>КОВАЛЁВ & ПАРТНЁРЫ</div><div style={{fontSize:10,color:'rgba(255,255,255,0.38)',letterSpacing:'0.2em',marginTop:2,textTransform:'uppercase'}}>Адвокатское бюро · с 2008</div></div><button style={{background:'transparent',border:'1px solid rgba(212,175,55,0.4)',color:'#D4AF37',padding:'9px 22px',fontSize:11.5,letterSpacing:'0.1em',cursor:'pointer',textTransform:'uppercase'}}>Записаться</button></div><div className="lawyer-hero-text" style={{position:'absolute',bottom:52,left:56,maxWidth:580}}><div style={{width:36,height:1,background:'#D4AF37',marginBottom:22}}/><h1 style={{fontSize:'clamp(30px,4.5vw,54px)',fontWeight:400,lineHeight:1.12,color:'#F0EAD6',marginBottom:20,fontFamily:"'Cormorant Garamond',serif"}}>Защита интересов <em style={{color:'#D4AF37'}}>на высшем уровне.</em></h1><p style={{fontSize:14,color:'rgba(255,255,255,0.52)',lineHeight:1.8,marginBottom:26}}>15 лет практики в арбитраже, семейном и корпоративном праве.</p><button style={{background:'#D4AF37',color:'#0A192F',padding:'12px 28px',fontSize:12,fontWeight:700,letterSpacing:'0.07em',border:'none',cursor:'pointer',textTransform:'uppercase'}}>Первичная консультация</button></div></div>
    <div className="lawyer-content" style={{maxWidth:1060,margin:'0 auto',padding:'52px 56px'}}><div style={{fontSize:11,letterSpacing:'0.14em',color:'#D4AF37',textTransform:'uppercase',marginBottom:28}}>Области практики</div><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:1,background:'rgba(212,175,55,0.1)',marginBottom:52}}>{[{Icon:Scale,t:'Арбитраж',d:'Представление интересов в арбитражных судах.'},{Icon:Users,t:'Семейное право',d:'Бракоразводные процессы, раздел имущества.'},{Icon:FileText,t:'Корпоративные споры',d:'Защита акционеров, оспаривание сделок.'}].map((s,i)=>(<div key={i} style={{background:'#0A192F',padding:'30px 26px'}}><s.Icon size={20} color="#D4AF37" style={{marginBottom:14}}/><div style={{fontSize:17,fontWeight:600,color:'#F0EAD6',marginBottom:8,fontFamily:"'Cormorant Garamond',serif"}}>{s.t}</div><div style={{fontSize:13,color:'rgba(255,255,255,0.48)',lineHeight:1.7}}>{s.d}</div></div>))}</div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:48,alignItems:'start',marginBottom:52}}><div><div style={{fontSize:11,letterSpacing:'0.14em',color:'#D4AF37',textTransform:'uppercase',marginBottom:16}}>Об адвокате</div><div style={{fontSize:24,color:'#F0EAD6',marginBottom:12,fontFamily:"'Cormorant Garamond',serif"}}>Александр Ковалёв</div><p style={{fontSize:13.5,color:'rgba(255,255,255,0.52)',lineHeight:1.8,marginBottom:22}}>Адвокат с 2008 года. Кандидат юридических наук.</p><div style={{display:'flex',gap:24}}>{[['500+','выигранных дел'],['15','лет практики'],['98%','успешных']].map(([v,l])=>(<div key={l}><div style={{fontSize:24,color:'#D4AF37',fontWeight:700,fontFamily:"'Cormorant Garamond',serif"}}>{v}</div><div style={{fontSize:10.5,color:'rgba(255,255,255,0.3)',textTransform:'uppercase',letterSpacing:'0.07em',marginTop:3}}>{l}</div></div>))}</div></div>
    <div style={{background:'rgba(15,37,64,0.9)',border:'1px solid rgba(212,175,55,0.15)',padding:28,borderRadius:4}}><div style={{fontSize:11,letterSpacing:'0.12em',color:'#D4AF37',textTransform:'uppercase',marginBottom:18}}>Записаться</div>{['Ваше имя','Телефон','Тема обращения'].map(ph=><input key={ph} placeholder={ph} style={{display:'block',width:'100%',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(212,175,55,0.15)',padding:'11px 14px',color:'#fff',marginBottom:10,fontSize:13.5,outline:'none',fontFamily:'Inter,sans-serif',boxSizing:'border-box'}}/>)}<textarea placeholder="Описание" rows={3} style={{display:'block',width:'100%',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(212,175,55,0.15)',padding:'11px 14px',color:'#fff',marginBottom:16,fontSize:13.5,resize:'none',outline:'none',fontFamily:'Inter,sans-serif',boxSizing:'border-box'}}/><button style={{width:'100%',background:'#D4AF37',color:'#0A192F',padding:12,fontSize:12,fontWeight:700,letterSpacing:'0.07em',border:'none',cursor:'pointer',textTransform:'uppercase'}}>Отправить заявку</button><p style={{fontSize:10.5,color:'rgba(255,255,255,0.28)',marginTop:10,lineHeight:1.65,fontFamily:'Inter,sans-serif'}}>Нажимая кнопку, вы даёте согласие на обработку персональных данных в&nbsp;соответствии с&nbsp;<a href="#" onClick={openPrivacy} style={{color:'rgba(212,175,55,0.5)',textDecoration:'underline',textUnderlineOffset:'2px',cursor:'pointer'}}>Политикой конфиденциальности</a></p></div></div>
    <div><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}><div style={{fontSize:11,letterSpacing:'0.14em',color:'#D4AF37',textTransform:'uppercase'}}>Отзывы</div><div style={{display:'flex',gap:8}}><button onClick={()=>setSlide(s=>(s-1+LAWYER_REV.length)%LAWYER_REV.length)} style={{width:34,height:34,borderRadius:'50%',border:'1px solid rgba(212,175,55,0.28)',background:'transparent',color:'#D4AF37',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}><ChevronLeft size={14}/></button><button onClick={()=>setSlide(s=>(s+1)%LAWYER_REV.length)} style={{width:34,height:34,borderRadius:'50%',border:'none',background:'#D4AF37',color:'#0A192F',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}><ChevronRight size={14}/></button></div></div>
    <AnimatePresence mode="wait"><motion.div key={slide} initial={{opacity:0,x:12}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-12}} transition={{duration:0.25}} style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(212,175,55,0.08)',borderRadius:4,padding:'28px 30px'}}><div style={{display:'flex',gap:3,marginBottom:14}}>{Array.from({length:5}).map((_,i)=><Star key={i} size={13} fill="#D4AF37" color="#D4AF37"/>)}</div><p style={{fontSize:17,color:'#F0EAD6',lineHeight:1.78,fontStyle:'italic',marginBottom:18,fontFamily:"'Cormorant Garamond',serif"}}>«{LAWYER_REV[slide].text}»</p><div style={{fontWeight:700,color:'#D4AF37',fontSize:13}}>{LAWYER_REV[slide].name}</div><div style={{fontSize:11.5,color:'rgba(255,255,255,0.3)',marginTop:3}}>{LAWYER_REV[slide].role}</div></motion.div></AnimatePresence></div></div>
  </div>);
}

function CatsView({navigate}){
  const [counts,setCounts]=useState({});
  const upd=(id,d)=>setCounts(c=>({...c,[id]:Math.max(0,(c[id]||0)+d)}));
  const total=CAT_PRODUCTS.reduce((s,p)=>s+(counts[p.id]||0)*p.price,0);
  const items=Object.values(counts).reduce((a,b)=>a+b,0);
  return(<div style={{background:'#FFF5EC',minHeight:'100vh',fontFamily:"'Nunito',sans-serif"}}><BackBtn navigate={navigate} dark={false}/>
    <div style={{position:'relative',height:280,overflow:'hidden'}}><img src={IMGS.cats} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/><div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom,rgba(255,245,236,0.05),#FFF5EC)'}}/><div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'flex-end',paddingBottom:28,textAlign:'center'}}><motion.h1 initial={{y:18,opacity:0}} animate={{y:0,opacity:1}} transition={{type:'spring',stiffness:200}} style={{fontSize:'clamp(28px,6vw,52px)',fontWeight:800,color:'#3D2314',marginBottom:8}}>Мурчащий Клубок</motion.h1><div style={{fontSize:13,color:'#A05A3A',background:'rgba(255,245,236,0.9)',backdropFilter:'blur(8px)',padding:'5px 16px',borderRadius:40,display:'inline-flex',alignItems:'center',gap:6}}><PawPrint size={13}/> Эко-игрушки для котиков</div></div></div>
    <div style={{maxWidth:860,margin:'0 auto',padding:'28px 24px'}}><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(185px,1fr))',gap:12,marginBottom:40}}>{[{Icon:Leaf,t:'100% Органика',d:'Мята с ферм'},{Icon:ShieldCheck,t:'Прочный',d:'Выдержит когти'},{Icon:Palette,t:'Авторский',d:'Каждая уникальна'},{Icon:Truck,t:'Быстро',d:'1–2 дня'}].map((f,i)=>(<motion.div key={i} initial={{y:16,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:i*0.08}} style={{background:'#fff',borderRadius:18,padding:'20px 16px',textAlign:'center',boxShadow:'0 4px 18px rgba(0,0,0,0.06)'}}><div style={{width:40,height:40,margin:'0 auto 10px',borderRadius:12,background:'#FFF5EC',display:'flex',alignItems:'center',justifyContent:'center',color:'#D4754A'}}><f.Icon size={19}/></div><div style={{fontWeight:800,fontSize:13,color:'#3D2314',marginBottom:4}}>{f.t}</div><div style={{fontSize:11,color:'#9A6A50'}}>{f.d}</div></motion.div>))}</div>
    <div style={{textAlign:'center',marginBottom:24}}><div style={{display:'inline-flex',alignItems:'center',gap:6,color:'#D4754A',fontSize:13,fontWeight:700,marginBottom:6}}><Gift size={15}/> Конструктор набора</div><h2 style={{fontWeight:800,fontSize:24,color:'#3D2314',marginBottom:4}}>Собери свой бокс</h2></div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(185px,1fr))',gap:12,marginBottom:20}}>{CAT_PRODUCTS.map(p=>(<div key={p.id} style={{background:'#fff',borderRadius:22,overflow:'hidden',boxShadow:'0 4px 18px rgba(0,0,0,0.07)'}}><img src={p.img} alt={p.name} style={{width:'100%',height:110,objectFit:'cover'}}/><div style={{padding:'14px 16px 18px',textAlign:'center'}}><div style={{fontWeight:800,fontSize:13,color:'#3D2314',marginBottom:4}}>{p.name}</div><div style={{fontSize:11,color:'#9A6A50',marginBottom:10,minHeight:30,lineHeight:1.5}}>{p.desc}</div><div style={{fontWeight:800,fontSize:17,color:'#D4754A',marginBottom:12}}>{p.price} ₽</div><div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:10}}><button onClick={()=>upd(p.id,-1)} style={{width:30,height:30,borderRadius:'50%',border:'2px solid #E8D0C4',background:'#FFF5EC',color:'#A05A3A',cursor:'pointer',fontSize:18,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center'}}>−</button><motion.span key={counts[p.id]||0} initial={{scale:1.3}} animate={{scale:1}} transition={{type:'spring',stiffness:400}} style={{fontWeight:800,fontSize:17,color:'#3D2314',minWidth:22,textAlign:'center'}}>{counts[p.id]||0}</motion.span><button onClick={()=>upd(p.id,1)} style={{width:30,height:30,borderRadius:'50%',border:'none',background:'#D4754A',color:'#fff',cursor:'pointer',fontSize:18,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center'}}>+</button></div></div></div>))}</div>
    <AnimatePresence>{items>0&&<motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} exit={{opacity:0,y:14}} style={{background:'#D4754A',borderRadius:18,padding:'20px 24px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}><div><div style={{fontSize:11,color:'rgba(255,255,255,0.7)',marginBottom:3}}>В боксе</div><div style={{fontWeight:800,fontSize:18,color:'#fff'}}>{items} {items===1?'игрушка':items<5?'игрушки':'игрушек'} · {total} ₽</div></div><button style={{background:'#fff',color:'#D4754A',border:'none',borderRadius:13,padding:'12px 24px',fontWeight:800,fontSize:14,cursor:'pointer',display:'flex',alignItems:'center',gap:6,fontFamily:"'Nunito',sans-serif"}}>Оформить <ArrowUpRight size={13}/></button></motion.div>}</AnimatePresence>
    </div></div>);
}

const PER=8;
function DashboardView({navigate}){
  const [page,setPage]=useState(1);
  const [cpu,setCpu]=useState(67);
  const [db,setDb]=useState(43);
  const [sessions,setSessions]=useState(128);
  const [active,setActive]=useState('logs');
  useEffect(()=>{const t=setInterval(()=>{setCpu(Math.round(45+Math.random()*45));setDb(d=>Math.min(90,Math.max(20,d+(Math.random()-.5)*8)));setSessions(s=>Math.max(80,Math.round(s+(Math.random()-.5)*20)));},2200);return()=>clearInterval(t);},[]);
  const pages=Math.ceil(LOG_DATA.length/PER),rows=LOG_DATA.slice((page-1)*PER,page*PER);
  const badge=s=>{const c={success:{l:'Успешно',bg:'#052E1E',col:'#4ADE80',I:CheckCircle},warning:{l:'Внимание',bg:'#2E1F05',col:'#FB923C',I:AlertCircle},error:{l:'Ошибка',bg:'#2E0505',col:'#F87171',I:XCircle}}[s];return <span style={{display:'inline-flex',alignItems:'center',gap:4,padding:'3px 9px',borderRadius:100,background:c.bg,color:c.col,fontSize:11,fontWeight:600,fontFamily:"'JetBrains Mono',monospace"}}><c.I size={10}/> {c.l}</span>;};
  const navItems=[{id:'overview',Icon:BarChart2,l:'Обзор'},{id:'logs',Icon:FileText,l:'Логи'},{id:'servers',Icon:Server,l:'Серверы'},{id:'users',Icon:Users,l:'Польз.'},{id:'alerts',Icon:Bell,l:'Алерты'},{id:'settings',Icon:Settings,l:'Настройки'}];
  const renderContent=()=>{
    if(active==='overview')return <div><h1 style={{fontWeight:800,fontSize:20,marginBottom:4,fontFamily:'Inter,sans-serif'}}>Обзор</h1><div style={{fontSize:12,color:'#71717A',marginBottom:18}}>{new Date().toLocaleDateString('ru-RU')}</div><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(120px,1fr))',gap:10,marginBottom:18}}>{[{l:'Серверов',v:'5',c:'#4ADE80',Icon:Server},{l:'Задач',v:'23',c:'#60A5FA',Icon:Activity},{l:'Ошибок',v:'4',c:'#F87171',Icon:XCircle},{l:'Uptime',v:'99.7%',c:'#34D399',Icon:Zap}].map(m=><div key={m.l} style={{background:'#111113',borderRadius:12,padding:14,border:'1px solid #27272A'}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}><m.Icon size={14} color={m.c}/><span style={{fontSize:10,color:'#71717A'}}>{m.l}</span></div><div style={{fontWeight:800,fontSize:20,color:m.c}}>{m.v}</div></div>)}</div><div style={{background:'#111113',borderRadius:12,padding:16,border:'1px solid #27272A'}}><div style={{fontSize:10,fontWeight:700,color:'#71717A',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:12}}>Загрузка серверов</div>{SERVERS.map(s=><div key={s.name} style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}><div style={{fontSize:11,color:'#71717A',width:72,fontFamily:"'JetBrains Mono',monospace"}}>{s.name}</div><div style={{flex:1,height:5,background:'#27272A',borderRadius:3}}><div style={{width:s.cpu+'%',height:'100%',borderRadius:3,background:s.cpu>80?'#F87171':'#4ADE80',transition:'width .4s'}}/></div><span style={{fontSize:11,color:'rgba(255,255,255,0.5)',width:32,textAlign:'right',fontFamily:"'JetBrains Mono',monospace"}}>{s.cpu}%</span></div>)}</div></div>;
    if(active==='logs')return <div><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}><div><h1 style={{fontWeight:800,fontSize:20,marginBottom:2,fontFamily:'Inter,sans-serif'}}>Журнал</h1><div style={{fontSize:12,color:'#71717A'}}>{LOG_DATA.length} записей · стр. {page}/{pages}</div></div></div><div style={{background:'#111113',borderRadius:12,border:'1px solid #27272A',overflowX:'auto'}}><table style={{width:'100%',borderCollapse:'collapse',minWidth:520}}><thead><tr>{['ID','Операция','Время','Статус','мс'].map(h=><th key={h} style={{padding:'10px 14px',textAlign:'left',fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:'#71717A',background:'#18181B',borderBottom:'1px solid #27272A',fontFamily:"'JetBrains Mono',monospace"}}>{h}</th>)}</tr></thead><tbody>{rows.map((log,i)=><tr key={log.id} style={{borderBottom:i<rows.length-1?'1px solid #1C1C1F':'none'}}><td style={{padding:'11px 14px',fontSize:11,color:'#34D399',fontFamily:"'JetBrains Mono',monospace"}}>{log.id}</td><td style={{padding:'11px 14px'}}><div style={{fontSize:13,fontWeight:500,color:'#E4E4E7',marginBottom:2}}>{log.op}</div><div style={{fontSize:11,color:'#71717A',fontFamily:"'JetBrains Mono',monospace"}}>{log.server}</div></td><td style={{padding:'11px 14px',fontSize:11,color:'#71717A',fontFamily:"'JetBrains Mono',monospace"}}>{log.time}</td><td style={{padding:'9px 11px'}}>{badge(log.status)}</td><td style={{padding:'11px 14px',fontSize:11,color:'#A1A1AA',fontFamily:"'JetBrains Mono',monospace"}}>{log.ms}</td></tr>)}</tbody></table></div><div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:8,marginTop:14}}><button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1} style={{padding:'7px 12px',fontSize:13,background:'#18181B',border:'1px solid #27272A',borderRadius:8,color:'#A1A1AA',cursor:page===1?'not-allowed':'pointer',opacity:page===1?0.4:1}}>← Пред.</button>{Array.from({length:pages},(_,i)=>i+1).map(p=><button key={p} onClick={()=>setPage(p)} style={{width:32,height:32,borderRadius:8,border:`1px solid ${p===page?'#34D399':'#27272A'}`,background:p===page?'rgba(52,211,153,0.12)':'#18181B',color:p===page?'#34D399':'#71717A',cursor:'pointer',fontSize:13,fontWeight:p===page?700:400}}>{p}</button>)}<button onClick={()=>setPage(p=>Math.min(pages,p+1))} disabled={page===pages} style={{padding:'7px 12px',fontSize:13,background:'#18181B',border:'1px solid #27272A',borderRadius:8,color:'#A1A1AA',cursor:page===pages?'not-allowed':'pointer',opacity:page===pages?0.4:1}}>След. →</button></div></div>;
    if(active==='servers')return <div><h1 style={{fontWeight:800,fontSize:20,marginBottom:12,fontFamily:'Inter,sans-serif'}}>Серверы</h1><div style={{background:'#111113',borderRadius:12,border:'1px solid #27272A',overflowX:'auto'}}><table style={{width:'100%',borderCollapse:'collapse',minWidth:480}}><thead><tr>{['Сервер','IP','ЦП','RAM','Пинг','Статус'].map(h=><th key={h} style={{padding:'10px 14px',textAlign:'left',fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:'#71717A',background:'#18181B',borderBottom:'1px solid #27272A'}}>{h}</th>)}</tr></thead><tbody>{SERVERS.map((s,i)=><tr key={s.name} style={{borderBottom:i<SERVERS.length-1?'1px solid #1C1C1F':'none'}}><td style={{padding:'11px 14px',fontSize:13,fontWeight:600,color:'#E4E4E7',fontFamily:"'JetBrains Mono',monospace"}}>{s.name}</td><td style={{padding:'11px 14px',fontSize:11,color:'#71717A',fontFamily:"'JetBrains Mono',monospace"}}>{s.ip}</td><td style={{padding:'11px 14px'}}><div style={{display:'flex',alignItems:'center',gap:8}}><div style={{width:44,height:5,background:'#27272A',borderRadius:3}}><div style={{width:s.cpu+'%',height:'100%',borderRadius:3,background:s.cpu>80?'#F87171':'#4ADE80'}}/></div><span style={{fontSize:11,color:'rgba(255,255,255,0.5)',fontFamily:"'JetBrains Mono',monospace"}}>{s.cpu}%</span></div></td><td style={{padding:'11px 14px',fontSize:11,color:'rgba(255,255,255,0.5)',fontFamily:"'JetBrains Mono',monospace"}}>{s.ram}%</td><td style={{padding:'11px 14px',fontSize:11,color:'#34D399',fontFamily:"'JetBrains Mono',monospace"}}>{s.ping}ms</td><td style={{padding:'11px 14px'}}><span style={{display:'inline-flex',alignItems:'center',gap:5,padding:'3px 9px',borderRadius:100,fontSize:11,fontWeight:600,background:s.status==='online'?'#052E1E':'#2E1F05',color:s.status==='online'?'#4ADE80':'#FB923C'}}><div style={{width:5,height:5,borderRadius:'50%',background:s.status==='online'?'#4ADE80':'#FB923C'}}/>{s.status==='online'?'В сети':'Внимание'}</span></td></tr>)}</tbody></table></div></div>;
    if(active==='users')return <div><h1 style={{fontWeight:800,fontSize:20,marginBottom:12,fontFamily:'Inter,sans-serif'}}>Пользователи</h1><div style={{display:'flex',flexDirection:'column',gap:8}}>{AUSERS.map((u,i)=>{const sc={online:'#4ADE80',away:'#FB923C',offline:'#3F3F46'}[u.status];return <div key={i} style={{background:'#111113',borderRadius:12,padding:14,border:'1px solid #27272A',display:'flex',alignItems:'center',gap:12}}><div style={{width:38,height:38,borderRadius:'50%',background:'rgba(201,163,78,0.18)',color:GOLD,display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:700}}>{u.avatar}</div><div style={{flex:1}}><div style={{fontWeight:600,fontSize:13,color:'#E4E4E7'}}>{u.name}</div><div style={{fontSize:11,color:'#71717A'}}>{u.role} · {u.last}</div></div><span style={{display:'inline-flex',alignItems:'center',gap:4,padding:'3px 9px',borderRadius:100,fontSize:11,fontWeight:600,background:u.status==='online'?'#052E1E':u.status==='away'?'#2E1F05':'#18181B',color:sc}}><div style={{width:5,height:5,borderRadius:'50%',background:sc}}/>{u.status==='online'?'Онлайн':u.status==='away'?'Отошёл':'Офлайн'}</span></div>;})}</div></div>;
    if(active==='alerts')return <div><h1 style={{fontWeight:800,fontSize:20,marginBottom:12,fontFamily:'Inter,sans-serif'}}>Алерты</h1><div style={{display:'flex',flexDirection:'column',gap:8}}>{ALERTS.map((a,i)=>{const cfg={error:{c:'#F87171',bg:'rgba(46,5,5,0.9)',I:XCircle,l:'Ошибка'},warning:{c:'#FB923C',bg:'rgba(46,31,5,0.9)',I:AlertTriangle,l:'Внимание'},info:{c:'#60A5FA',bg:'rgba(12,27,51,0.9)',I:CheckCircle,l:'Инфо'}}[a.level];return <div key={i} style={{borderRadius:12,padding:'13px 16px',border:`1px solid ${cfg.c}22`,background:cfg.bg,display:'flex',alignItems:'flex-start',gap:10}}><cfg.I size={14} color={cfg.c} style={{flexShrink:0,marginTop:1}}/><div><div style={{fontSize:12.5,color:'rgba(255,255,255,0.8)'}}>{a.msg}</div><div style={{fontSize:10,color:cfg.c+'AA',marginTop:2}}>{cfg.l} · {a.time}</div></div></div>;})} </div></div>;
    return <div><h1 style={{fontWeight:800,fontSize:20,marginBottom:16,fontFamily:'Inter,sans-serif'}}>Настройки</h1><div style={{display:'flex',flexDirection:'column',gap:8}}>{[['Уведомления',true],['Slack',false],['Автобэкап',true],['2FA',true],['Публичный API',false]].map(([l,val],i)=><div key={i} style={{background:'#111113',borderRadius:12,padding:'13px 16px',border:'1px solid #27272A',display:'flex',justifyContent:'space-between',alignItems:'center'}}><span style={{fontSize:13,color:'#E4E4E7'}}>{l}</span><div style={{width:38,height:20,borderRadius:100,background:val?'#34D399':'#3F3F46',display:'flex',alignItems:'center',padding:'2px 3px'}}><div style={{width:14,height:14,borderRadius:'50%',background:'#fff',transform:val?'translateX(18px)':'translateX(0)',transition:'transform .2s'}}/></div></div>)}</div></div>;
  };
  return(<div style={{background:'#09090B',color:'#fff',minHeight:'100vh',display:'flex',fontFamily:'Inter,sans-serif'}}><BackBtn navigate={navigate}/>
    <div style={{width:196,background:'#111113',borderRight:'1px solid #27272A',flexShrink:0,paddingTop:66,padding:'66px 8px 12px'}}><div style={{fontWeight:800,fontSize:11,color:'#34D399',letterSpacing:'0.1em',padding:'0 10px',marginBottom:16,textTransform:'uppercase'}}>Infra Monitor</div>{navItems.map(item=><button key={item.id} onClick={()=>setActive(item.id)} style={{display:'flex',alignItems:'center',gap:9,width:'100%',padding:'9px 10px',borderRadius:8,border:'none',cursor:'pointer',background:active===item.id?'rgba(52,211,153,0.1)':'transparent',color:active===item.id?'#34D399':'#71717A',fontSize:13,fontWeight:active===item.id?600:400,textAlign:'left',marginBottom:1,fontFamily:'Inter,sans-serif'}}><item.Icon size={14}/> {item.l}</button>)}</div>
    <div style={{flex:1,overflow:'auto'}}><div style={{position:'relative',height:88,overflow:'hidden'}}><img src={IMGS.dashboard} alt="" style={{width:'100%',height:'100%',objectFit:'cover',filter:'brightness(0.25)'}}/><div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom,transparent,#09090B)'}}/><div style={{position:'absolute',bottom:12,left:20,fontSize:13,fontWeight:800,color:'#34D399',fontFamily:'Inter,sans-serif'}}>Система мониторинга инфраструктуры</div></div>
    <div style={{background:'#111113',borderBottom:'1px solid #27272A',padding:'12px 20px',display:'flex',gap:10,flexWrap:'wrap',alignItems:'center'}}>{[{l:'ЦП',v:cpu+'%',Icon:Cpu,c:cpu>80?'#F87171':cpu>60?'#FB923C':'#4ADE80',bar:cpu},{l:'БД',v:Math.round(db)+'%',Icon:Database,c:db>80?'#F87171':db>60?'#FB923C':'#4ADE80',bar:db},{l:'Сессии',v:sessions,Icon:Activity,c:'#34D399',bar:null}].map(m=><div key={m.l} style={{display:'flex',alignItems:'center',gap:10,background:'#18181B',borderRadius:12,padding:'10px 13px',border:'1px solid #27272A'}}><m.Icon size={14} color={m.c}/><div><div style={{fontSize:10,color:'#71717A',marginBottom:2}}>{m.l}</div><motion.div key={m.v} initial={{opacity:0.5}} animate={{opacity:1}} style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:700,fontSize:15,color:m.c,lineHeight:1}}>{m.v}</motion.div>{m.bar!==null&&<div style={{width:60,height:4,background:'#27272A',borderRadius:2,marginTop:3}}><motion.div animate={{width:m.bar+'%'}} transition={{duration:0.8}} style={{height:'100%',borderRadius:2,background:m.c}}/></div>}</div></div>)}<div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:6,background:'#18181B',border:'1px solid #27272A',borderRadius:8,padding:'8px 12px'}}><Search size={12} color="#71717A"/><input placeholder="Поиск..." style={{background:'none',border:'none',color:'#A1A1AA',fontSize:12,outline:'none',width:90}}/></div></div>
    <div style={{padding:18}}>{renderContent()}</div></div>
  </div>);
}

function ShopView({navigate}){
  const [cart,setCart]=useState([]);const [open,setOpen]=useState(false);
  const add=item=>setCart(c=>{const e=c.find(x=>x.id===item.id);return e?c.map(x=>x.id===item.id?{...x,qty:x.qty+1}:x):[...c,{...item,qty:1}];});
  const rm=id=>setCart(c=>c.filter(x=>x.id!==id));
  const upd=(id,d)=>setCart(c=>c.map(x=>x.id===id?{...x,qty:Math.max(1,x.qty+d)}:x));
  const total=cart.reduce((s,x)=>s+x.price*x.qty,0),cnt=cart.reduce((s,x)=>s+x.qty,0);
  return(<div style={{background:'#000',color:'#fff',minHeight:'100vh',fontFamily:'Inter,sans-serif'}}><BackBtn navigate={navigate}/>
    <div style={{position:'relative',height:360,overflow:'hidden'}}><img src={IMGS.shop} alt="" style={{width:'100%',height:'100%',objectFit:'cover',filter:'brightness(0.38) saturate(1.3) hue-rotate(-15deg)'}}/><div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom,rgba(0,0,0,0.2),#000)'}}/><div style={{position:'absolute',top:0,left:0,right:0,padding:'20px 36px',display:'flex',justifyContent:'flex-end'}}><button onClick={()=>setOpen(true)} style={{display:'flex',alignItems:'center',gap:7,padding:'9px 16px',borderRadius:8,border:'1px solid #2A2A2A',background:cnt>0?'#FF2D78':'#111',color:'#fff',fontSize:13,fontWeight:600,cursor:'pointer'}}><ShoppingCart size={14}/> {cnt>0?`${cnt} · ${total.toLocaleString('ru-RU')} ₽`:'Корзина'}</button></div><div style={{position:'absolute',bottom:36,left:36}}><div style={{fontSize:10,fontWeight:700,letterSpacing:'0.2em',color:'#FF2D78',marginBottom:12,textTransform:'uppercase'}}>Магазин Невозможных Вещей</div><h1 style={{fontFamily:'Inter,sans-serif',fontWeight:900,fontSize:'clamp(34px,7vw,72px)',lineHeight:0.93,letterSpacing:'-0.04em',marginBottom:12}}>ВЕЩИ,<br/><span style={{color:'#FF2D78'}}>КОТОРЫХ</span><br/>НЕ БЫВАЕТ.</h1><p style={{fontSize:13,color:'#666',maxWidth:320}}>Редкие, лимитированные. Доставка — мысленно.</p></div></div>
    <div style={{padding:'0 36px 8px',borderBottom:'1px solid #1A1A1A'}}><div style={{fontFamily:'Inter,sans-serif',fontSize:13,fontWeight:800,letterSpacing:'0.1em',padding:'12px 0'}}>IMPOSSIBLE<span style={{color:'#FF2D78'}}>.</span>SHOP</div></div>
    <div style={{maxWidth:880,margin:'0 auto',padding:'20px 36px 60px'}}><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(250px,1fr))',gap:1,border:'1px solid #1A1A1A'}}>{SHOP_ITEMS.map(item=><div key={item.id} style={{background:'#000',borderRight:'1px solid #1A1A1A',borderBottom:'1px solid #1A1A1A',overflow:'hidden'}}><div style={{position:'relative',height:140,overflow:'hidden'}}><img src={item.img} alt={item.name} style={{width:'100%',height:'100%',objectFit:'cover',filter:'brightness(0.55) saturate(0.7)',transition:'transform .4s'}} onMouseEnter={e=>e.target.style.transform='scale(1.06)'} onMouseLeave={e=>e.target.style.transform='scale(1)'}/><div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom,transparent 50%,#000 100%)'}}/><span style={{position:'absolute',top:10,right:10,fontSize:10,fontWeight:800,letterSpacing:'0.12em',color:item.rc,border:`1px solid ${item.rc}50`,padding:'3px 8px',borderRadius:3,background:'rgba(0,0,0,0.7)',textTransform:'uppercase'}}>{item.rarity}</span></div><div style={{padding:'14px 20px 20px'}}><div style={{fontFamily:'Inter,sans-serif',fontWeight:800,fontSize:14,marginBottom:6}}>{item.name}</div><div style={{fontSize:12,color:'#555',lineHeight:1.6,marginBottom:14}}>{item.desc}</div><div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><div style={{fontFamily:'Inter,sans-serif',fontWeight:800,fontSize:17}}>{item.price.toLocaleString('ru-RU')} <span style={{fontSize:12,color:'#555',fontWeight:400}}>₽</span></div><motion.button whileHover={{scale:1.05}} whileTap={{scale:0.95}} onClick={()=>add(item)} style={{background:'#fff',color:'#000',border:'none',borderRadius:6,padding:'8px 16px',cursor:'pointer',fontSize:12,fontWeight:700}}>В корзину</motion.button></div></div></div>)}</div></div>
    <AnimatePresence>{open&&<><motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setOpen(false)} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.75)',zIndex:40}}/><motion.div initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'spring',stiffness:280,damping:28}} style={{position:'fixed',top:0,right:0,bottom:0,width:320,background:'#0A0A0A',borderLeft:'1px solid #222',zIndex:50,display:'flex',flexDirection:'column'}}><div style={{padding:'16px 20px',borderBottom:'1px solid #1A1A1A',display:'flex',justifyContent:'space-between',alignItems:'center'}}><div style={{fontFamily:'Inter,sans-serif',fontWeight:800,fontSize:14}}>КОРЗИНА ({cnt})</div><button onClick={()=>setOpen(false)} style={{background:'none',border:'none',color:'#666',cursor:'pointer',display:'flex'}}><X size={18}/></button></div><div style={{flex:1,overflow:'auto',padding:'12px 16px'}}>{cart.length===0?<div style={{textAlign:'center',color:'#555',marginTop:50}}><ShoppingCart size={34} style={{opacity:0.3,margin:'0 auto 10px'}}/><div style={{fontSize:13}}>Корзина пуста</div></div>:cart.map(item=><div key={item.id} style={{padding:'12px 0',borderBottom:'1px solid #1A1A1A'}}><div style={{display:'flex',gap:10,justifyContent:'space-between',marginBottom:8}}><div style={{display:'flex',gap:10,alignItems:'flex-start'}}><img src={item.img} alt={item.name} style={{width:38,height:38,borderRadius:6,objectFit:'cover',filter:'brightness(0.65)'}}/><div><div style={{fontWeight:700,fontSize:12,marginBottom:2}}>{item.name}</div><div style={{fontSize:11,color:'#666'}}>{(item.price*item.qty).toLocaleString('ru-RU')} ₽</div></div></div><button onClick={()=>rm(item.id)} style={{background:'none',border:'none',color:'#555',cursor:'pointer',display:'flex'}}><X size={12}/></button></div><div style={{display:'flex',alignItems:'center',gap:8}}><button onClick={()=>upd(item.id,-1)} style={{width:24,height:24,borderRadius:6,border:'1px solid #222',background:'#111',color:'#fff',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}><Minus size={9}/></button><span style={{fontSize:12,fontWeight:700,minWidth:18,textAlign:'center'}}>{item.qty}</span><button onClick={()=>upd(item.id,1)} style={{width:24,height:24,borderRadius:6,border:'none',background:'#fff',color:'#000',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}><Plus size={9}/></button></div></div>)}</div>{cart.length>0&&<div style={{padding:'16px 20px',borderTop:'1px solid #1A1A1A'}}><div style={{display:'flex',justifyContent:'space-between',marginBottom:12}}><span style={{fontSize:13,color:'#666'}}>Итого</span><span style={{fontFamily:'Inter,sans-serif',fontWeight:800,fontSize:18}}>{total.toLocaleString('ru-RU')} ₽</span></div><button style={{width:'100%',background:'#FF2D78',color:'#fff',border:'none',borderRadius:9,padding:12,fontWeight:700,fontSize:13,cursor:'pointer'}}>Оформить заказ</button></div>}</motion.div></>}</AnimatePresence>
  </div>);
}

// ═══════════════════ PROJECT DETAIL ═══════════════════
function ProjectDetailView({navigate,project:p}){
  const isDD=p.id==='deepdrift';
  return(<div style={{background:p.bg,color:'#fff',minHeight:'100vh',fontFamily:'Inter,sans-serif',position:'relative',overflow:'hidden'}}>
    {/* Ambient orb for project detail */}
    <Orb top="10%" left="60%" size={500} color={p.accent+'15'} blur={120}/>
    <BackBtn navigate={navigate} returnTo="cases"/>
    <div style={{position:'relative',height:360,overflow:'hidden'}}>
      <img src={IMGS[p.id]||IMGS.olga} alt={p.title} style={{width:'100%',height:'100%',objectFit:'cover',filter:'brightness(0.28) saturate(0.5)'}}/>
      <div style={{position:'absolute',inset:0,background:`linear-gradient(to bottom,transparent 20%,${p.bg} 100%)`}}/>
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55}} style={{position:'absolute',bottom:36,left:40,right:40,maxWidth:840}}>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:p.accent,marginBottom:10}}>{p.tag}</div>
        <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:400,fontSize:'clamp(32px,6vw,66px)',letterSpacing:'-0.02em',marginBottom:8,lineHeight:1.0}}>{p.title}</h1>
        <div style={{fontSize:17,color:'rgba(255,255,255,0.48)',marginBottom:18}}>{p.subtitle}</div>
        <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
          {p.url&&<a href={p.url} target="_blank" rel="noopener" onClick={e=>e.stopPropagation()} style={{display:'inline-flex',alignItems:'center',gap:7,padding:'9px 18px',borderRadius:9,border:`1px solid ${p.accent}45`,background:p.accent+'12',color:p.accent,fontSize:13,fontWeight:600,textDecoration:'none'}}><ExternalLink size={13}/> Открыть сайт</a>}
          {p.zenodoUrl&&<a href={p.zenodoUrl} target="_blank" rel="noopener" onClick={e=>e.stopPropagation()} style={{display:'inline-flex',alignItems:'center',gap:7,padding:'9px 18px',borderRadius:9,border:`1px solid ${p.accent}45`,background:p.accent+'12',color:p.accent,fontSize:13,fontWeight:600,textDecoration:'none'}}><ExternalLink size={13}/> Статья на Zenodo</a>}
        </div>
      </motion.div>
    </div>
    <div style={{maxWidth:860,margin:'0 auto',padding:'48px 40px',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:40,position:'relative',zIndex:1}}>
      <div>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:p.accent,marginBottom:14}}>О проекте</div>
        <p style={{fontSize:14.5,color:'rgba(255,255,255,0.7)',lineHeight:1.85}}>{p.description}</p>
        <div style={{marginTop:20,padding:'14px 16px',borderRadius:10,border:`1px solid ${p.accent}16`,background:p.accent+'08'}}>
          <div style={{fontSize:10,fontWeight:700,color:p.accent,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:5}}>Моя роль</div>
          <div style={{fontSize:13.5,fontWeight:500,color:'rgba(255,255,255,0.72)'}}>{p.role}</div>
        </div>
      </div>
      <div>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:p.accent,marginBottom:14}}>{p.featuresLabel}</div>
        <ul style={{listStyle:'none',padding:0,margin:0}}>
          {p.features.map((f,i)=><li key={i} style={{display:'flex',gap:10,marginBottom:10,fontSize:13.5,color:'rgba(255,255,255,0.68)',lineHeight:1.68}}><CheckCircle size={14} color={p.accent} style={{flexShrink:0,marginTop:2}}/> {f}</li>)}
        </ul>
      </div>
    </div>
    <div style={{maxWidth:860,margin:'0 auto',padding:'0 40px 40px',position:'relative',zIndex:1}}>
      <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:p.accent,marginBottom:14}}>Технологический стек</div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(190px,1fr))',gap:10}}>
        {p.tech.map(([layer,tech])=><div key={layer} style={{borderRadius:10,padding:'13px 16px',border:`1px solid ${p.accent}14`,background:p.accent+'06'}}><div style={{fontSize:10,fontWeight:700,color:p.accent,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:6}}>{layer}</div><div style={{fontSize:12.5,color:'rgba(255,255,255,0.65)',lineHeight:1.5}}>{tech}</div></div>)}
      </div>
    </div>
    {p.challenges&&p.challenges.length>0&&<div style={{maxWidth:860,margin:'0 auto',padding:'0 40px 60px',position:'relative',zIndex:1}}>
      <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:p.accent,marginBottom:14}}>{isDD?'Решённые инженерные задачи':'Дополнительно'}</div>
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {p.challenges.map((c,i)=><div key={i} style={{display:'flex',gap:14,padding:'13px 16px',borderRadius:10,border:`1px solid ${p.accent}10`,background:p.accent+'06',alignItems:'flex-start'}}><div style={{width:24,height:24,borderRadius:'50%',border:`1px solid ${p.accent}30`,background:p.accent+'14',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:11,fontWeight:800,color:p.accent}}>{i+1}</div><div style={{fontSize:13.5,color:'rgba(255,255,255,0.65)',lineHeight:1.7}}>{c}</div></div>)}
      </div>
    </div>}
  </div>);
}

// ═══════════════════════════════════════════════════════════
// APP — History API navigation
// ═══════════════════════════════════════════════════════════
export default function App(){
  const [currentView,setCurrentView]=useState(()=>viewFromHash(window.location.hash));

  // Listen to popstate (browser Back/Forward)
  useEffect(()=>{
    const handlePop=()=>{
      const v=viewFromHash(window.location.hash);
      if(pendingScroll===null&&v==='home') pendingScroll='demos';
      setCurrentView(v);
    };
    window.addEventListener('popstate',handlePop);
    return()=>window.removeEventListener('popstate',handlePop);
  },[]);

  useEffect(()=>{ window.scrollTo(0,0); },[currentView]);

  const navigate=(v)=>{
    // External URL projects — open in new tab, no history change
    if(HAS_URL.has(v)){
      const proj=PROJECTS.find(p=>p.id===v);
      if(proj?.url){ window.open(proj.url,'_blank'); return; }
    }
    if(v==='home'){
      window.history.pushState(null,'',window.location.pathname+'#');
      setCurrentView('home');
    } else if(DEMO_IDS.has(v)){
      window.history.pushState(null,'',`#/demo/${v}`);
      setCurrentView(v);
    } else {
      window.history.pushState(null,'',`#/project/${v}`);
      setCurrentView(v);
    }
  };

  const realProject=PROJECTS.find(p=>p.id===currentView);

  return(
    <>
    <AnimatePresence mode="wait">
      <motion.div key={currentView} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.22}}>
        {currentView==='home'      && <HomeView navigate={navigate}/>}
        {currentView==='lawyer'    && <LawyerView navigate={navigate}/>}
        {currentView==='cats'      && <CatsView navigate={navigate}/>}
        {currentView==='dashboard' && <DashboardView navigate={navigate}/>}
        {currentView==='shop'      && <ShopView navigate={navigate}/>}
        {realProject               && <ProjectDetailView navigate={navigate} project={realProject}/>}
      </motion.div>
    </AnimatePresence>
    <PrivacyModal/>
    <CookieBanner/>
    <ContactModal/>
    </>
  );
}
