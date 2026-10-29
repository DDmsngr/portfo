import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Menu, Phone, Plus, X } from 'lucide-react';
import HeroCanvas from './HeroCanvas';
import { PROJECTS, DEMOS, FAQ, SHOTS, IMGS } from './data';
import { scrollState } from './scrollState';

const openContact = (e) => { if (e) e.preventDefault(); window.dispatchEvent(new CustomEvent('openContact')); };
const openPrivacy = (e) => { if (e) e.preventDefault(); window.dispatchEvent(new CustomEvent('openPrivacy')); };

const NAV = [['Проекты', '#cases'], ['Услуги', '#services'], ['Процесс', '#process'], ['FAQ', '#faq']];

const STACK = ['React', 'TypeScript', 'Tailwind', 'Flutter', 'Dart', 'Android', 'Supabase', 'Postgres', 'PWA', 'GitHub Actions', 'Лендинги', 'CRM', 'Дашборды'];

const AUDIENCE = [
  { label: 'Малый бизнес', title: 'Сайт, который принимает заявки', text: 'Отвечает на частые вопросы, показывает товар, собирает заявки. Вы в это время работаете.' },
  { label: 'Производство', title: 'Цех знаю не по картинкам', text: 'Восемь лет с ЧПУ. Учёт, отчёты, автоматизация: термины объяснять не нужно, сразу к делу.', dark: true },
  { label: 'Частные специалисты', title: 'Косметологи, юристы, тренеры', text: 'Визитка на одну-две страницы: кто вы, чем занимаетесь, как записаться. Без лишнего.' },
  { label: 'Стартапы и продукты', title: 'Беру техническую часть', text: 'MVP, веб-приложение или Android. Сначала выясняю, что нужно в первую очередь, потом делаю.' },
];

const SERVICES = [
  { n: '01', t: 'Лендинги', p: 'от 25 000 ₽', d: '2–3 дня. Одна страница, одна задача' },
  { n: '02', t: 'Корпоративные сайты', p: 'от 80 000 ₽', d: 'Несколько страниц, каталог, админка для контента' },
  { n: '03', t: 'Мобильные приложения', p: 'от 400 000 ₽', d: 'Android на Flutter, сборка и обновления через CI' },
  { n: '04', t: 'Веб-приложения', p: 'от 350 000 ₽', d: 'CRM, личные кабинеты, дашборды' },
];

const PROCESS = [
  { n: '01', t: 'Бриф', d: '1–2 дня. Созвон: выясняю, что должно получиться, и записываю.' },
  { n: '02', t: 'Прототип', d: '3–7 дней. Кликабельный макет, чтобы поправить всё до того, как написан код.' },
  { n: '03', t: 'Разработка', d: 'Каждую неделю видео с демо. Задачи в общем списке.' },
  { n: '04', t: 'Запуск', d: 'Проверка и выкладка. 30 дней после запуска правки бесплатно.' },
];

const Label = ({ children, className = '' }) => (
  <span className={`font-medium uppercase tracking-[0.14em] text-[11px] ${className}`}>({children})</span>
);

const H2 = ({ children, className = '' }) => (
  <h2 className={`font-display font-extrabold uppercase leading-[0.95] tracking-tight text-[clamp(30px,6vw,92px)] ${className}`}>{children}</h2>
);

// ─── шапка: белый текст с difference читается и на тёмном hero, и на светлых блоках
function Header({ onMenu, menuOpen }) {
  return (
    <header className="fixed inset-x-0 top-0 z-[80] flex items-center justify-between bg-ink/85 px-5 py-4 text-white backdrop-blur-md md:px-8">
      <a href="#" className="font-display text-sm font-extrabold tracking-wide">AE ◆</a>
      <nav aria-label="Основное меню" className="hidden gap-9 text-[11px] font-medium uppercase tracking-[0.14em] md:flex">
        {NAV.map(([n, h]) => <a key={n} href={h} className="transition-opacity hover:opacity-60">{n}</a>)}
      </nav>
      <button type="button" onClick={openContact} className="hidden text-[11px] font-medium uppercase tracking-[0.14em] transition-opacity hover:opacity-60 md:block">
        Обсудить проект
      </button>
      <button type="button" onClick={onMenu} aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={menuOpen} className="md:hidden">
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
    </header>
  );
}

function MobileMenu({ close }) {
  return (
    <div role="dialog" aria-modal="true" aria-label="Меню" className="fixed inset-0 z-[70] flex flex-col justify-center gap-1 bg-ink px-8 text-white md:hidden">
      {NAV.map(([n, h]) => (
        <a key={n} href={h} onClick={close} className="border-b border-white/10 py-3 font-display text-4xl font-extrabold uppercase">{n}</a>
      ))}
      <button type="button" onClick={() => { close(); openContact(); }} className="mt-8 bg-white py-4 text-sm font-bold uppercase tracking-wider text-ink">
        Обсудить проект
      </button>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 opacity-60"><HeroCanvas /></div>

      <div className="relative z-10 flex flex-1 items-center justify-center px-4 pt-20">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center font-display font-extrabold uppercase leading-[0.9] tracking-tight text-[clamp(34px,10.4vw,176px)]"
        >
          <span className="block">Алексей</span>
          <span className="block">Евтушенко</span>
        </motion.h1>
      </div>

      <div className="relative z-10 grid items-end gap-6 px-5 pb-7 md:grid-cols-[1fr_auto_1fr] md:px-8">
        <p className="max-w-xs text-[11px] font-medium uppercase leading-relaxed tracking-[0.14em] text-white/70">
          (Сайты и приложения без переделок. Работаю один, разговариваете сразу с тем, кто пишет код)
        </p>
        <button type="button" onClick={openContact} className="group inline-flex items-center justify-center gap-2 bg-white px-7 py-4 text-[12px] font-bold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-gold hover:text-white">
          Обсудить задачу бесплатно <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </button>
        <p className="hidden text-right text-[11px] font-medium uppercase tracking-[0.14em] text-white/70 md:block">(Санкт-Петербург · 8 лет в производстве)</p>
      </div>
    </section>
  );
}

// ─── ChaWo: отдельный полноэкранный кадр
function ChaWoFrame({ navigate }) {
  const p = PROJECTS.find((x) => x.id === 'chawo');
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [90, -90]);
  const y2 = useTransform(scrollYProgress, [0, 1], [160, -160]);
  const y3 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const phones = [
    { src: '/projects/chawo-flow.jpg', alt: 'ChaWo: лента Flow', left: '0%', top: '12%', y: y1, rotate: -6 },
    { src: '/projects/chawo-chats.jpg', alt: 'ChaWo: чаты', left: '30%', top: '0%', y: y2, rotate: 0 },
    { src: '/projects/chawo-profile.jpg', alt: 'ChaWo: профиль', left: '60%', top: '16%', y: y3, rotate: 6 },
  ];
  return (
    <section ref={ref} id="chawo" className="relative overflow-hidden bg-[#E8467C] text-white">
      <div className="mx-auto grid min-h-screen max-w-[1500px] items-center gap-12 px-5 py-24 md:px-8 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <Label className="text-white/85">Флагманский проект</Label>
          <h2 className="mt-5 font-display font-extrabold leading-[0.85] tracking-tight text-[clamp(60px,11.5vw,210px)]">ChaWo</h2>
          <p className="mt-6 max-w-md font-display text-[clamp(18px,2vw,26px)] font-bold uppercase leading-tight">{p.subtitle}</p>
          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-ink">{p.desc}</p>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-ink/25 pt-6 text-ink">
            {[['Flutter', 'Supabase'], ['Сочи', 'пилот'], ['Всё моё', 'клиент, сервер, CI']].map(([a, b]) => (
              <div key={a}>
                <dt className="font-display text-[15px] font-extrabold uppercase leading-tight">{a}</dt>
                <dd className="mt-1 text-[12px] leading-snug opacity-75">{b}</dd>
              </div>
            ))}
          </dl>

          <button type="button" onClick={() => navigate('chawo')} className="group mt-10 inline-flex items-center gap-3 bg-ink px-8 py-5 text-[12px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-white hover:text-ink">
            Читать кейс <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="relative mx-auto h-[520px] w-full max-w-[640px] sm:h-[680px] lg:h-[780px]">
          {phones.map((ph) => (
            <motion.img
              key={ph.src}
              src={ph.src}
              alt={ph.alt}
              width="468"
              height="1013"
              loading="lazy"
              style={{ y: ph.y, left: ph.left, top: ph.top, rotate: ph.rotate }}
              className="absolute w-[38%] rounded-[26px] shadow-[0_30px_70px_-20px_rgba(60,0,25,0.55)] ring-1 ring-white/30"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Intro() {
  const stats = [['8', 'лет за ЧПУ-станками'], ['7', 'проектов ниже: от визитки до мессенджера'], ['2', 'дня до лендинга под ключ']];
  return (
    <section className="px-5 py-24 md:px-8 md:py-40">
      <div className="mx-auto max-w-[1500px]">
        <Label className="text-ink/60">Обо мне</Label>
        <p className="mt-8 max-w-6xl font-display font-bold leading-[1.18] tracking-tight text-[clamp(24px,4vw,60px)]">
          Восемь лет я работал с ЧПУ-станками: ошибка в программе там портит заготовку. Проверять дважды привык. Сайты и приложения делаю так же.
        </p>
        <dl className="mt-20 grid gap-8 border-t border-ink/20 pt-8 sm:grid-cols-3">
          {stats.map(([v, l]) => (
            <div key={v}>
              <dt className="font-display text-[clamp(56px,8vw,120px)] font-extrabold leading-none">{v}</dt>
              <dd className="mt-3 max-w-[16rem] text-[14px] text-ink/65">{l}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Ticker() {
  const row = [...STACK, ...STACK];
  return (
    <div className="overflow-hidden border-y border-ink bg-paper py-4" aria-hidden="true">
      <div className="flex w-max gap-10" style={{ animation: 'marquee 40s linear infinite' }}>
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-[clamp(18px,2.4vw,32px)] font-extrabold uppercase">
            {w} <span className="text-gold">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Projects({ navigate }) {
  const items = PROJECTS.filter((p) => !p.flagship);
  const open = (p) => { if (p.url) window.open(p.url, '_blank', 'noopener'); else navigate(p.id); };
  return (
    <section id="cases" className="px-5 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Label className="text-ink/60">02 · Работы</Label>
            <H2 className="mt-4">Проекты</H2>
          </div>
          <p className="max-w-xs text-[14px] text-ink/65">Клик по кадру открывает кейс или живой сайт.</p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {items.map((p, i) => {
            const real = Boolean(SHOTS[p.id]);
            return (
              <motion.button
                key={p.id}
                type="button"
                onClick={() => open(p)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: (i % 2) * 0.08 }}
                className="group relative aspect-[4/3] overflow-hidden bg-ink text-left text-white"
                aria-label={`${p.title}: ${p.subtitle}`}
              >
                <img
                  src={SHOTS[p.id] || IMGS[p.id] || IMGS.olga}
                  alt=""
                  loading="lazy"
                  className={`absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105 ${real ? 'object-top' : 'brightness-[.8] saturate-[.85]'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-ink/10" />
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink/70 to-transparent" />
                <div className="absolute inset-x-5 top-5 flex items-start justify-between gap-3 text-[11px] font-medium uppercase tracking-[0.14em]">
                  <span>({p.tag})</span>
                  <span className="shrink-0">({p.metric.value})</span>
                </div>
                <div className="absolute inset-x-5 bottom-5">
                  <h3 className="font-display text-[clamp(28px,3.6vw,56px)] font-extrabold uppercase leading-[0.95] tracking-tight">{p.title}</h3>
                  <p className="mt-2 max-w-md text-[14px] text-white/80">{p.subtitle}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em]">
                    {p.url ? 'Открыть сайт' : 'Читать кейс'} <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Audience() {
  return (
    <section className="px-5 pb-24 md:px-8 md:pb-36">
      <div className="mx-auto max-w-[1500px]">
        <Label className="text-ink/60">03 · Для кого</Label>
        <H2 className="mt-4">С кем работаю</H2>
        <p className="mt-5 max-w-md text-[15px] text-ink/65">Задачи у всех разные. Берусь, когда понимаю, что в итоге должно получиться.</p>
        <div className="mt-12 grid border border-ink/20 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCE.map((a, i) => (
            <div key={i} className={`p-7 ${a.dark ? 'bg-ink text-white' : ''} ${i ? 'border-t border-ink/20 sm:border-t-0 sm:border-l' : ''}`}>
              <Label className={a.dark ? 'text-gold' : 'text-ink/55'}>{a.label}</Label>
              <h3 className="mt-6 font-display text-[19px] font-bold uppercase leading-snug">{a.title}</h3>
              <p className={`mt-4 text-[14px] leading-relaxed ${a.dark ? 'text-white/70' : 'text-ink/65'}`}>{a.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="px-5 pb-24 md:px-8 md:pb-36">
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Label className="text-ink/60">04 · Услуги</Label>
            <H2 className="mt-4">Что делаю</H2>
          </div>
          <p className="max-w-xs text-[14px] text-ink/65">От первого разговора до выкладки в сеть. После запуска тоже на связи.</p>
        </div>
        <div className="mt-14 border-b border-ink/20">
          {SERVICES.map((s) => (
            <div key={s.n} className="group grid items-baseline gap-2 border-t border-ink/20 px-0 py-7 transition-colors hover:bg-ink hover:text-paper md:grid-cols-[90px_minmax(0,1.5fr)_minmax(0,1fr)_170px] md:gap-8 md:px-5">
              <Label className="opacity-60">{s.n}</Label>
              <h3 className="font-display text-[clamp(20px,2.5vw,38px)] font-bold uppercase leading-tight">{s.t}</h3>
              <p className="text-[15px] opacity-65">{s.d}</p>
              <span className="whitespace-nowrap font-display text-[17px] font-bold md:text-right">{s.p}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Demos({ navigate }) {
  return (
    <section id="demos" className="px-5 pb-24 md:px-8 md:pb-36">
      <div className="mx-auto max-w-[1500px]">
        <Label className="text-ink/60">05 · Демо</Label>
        <H2 className="mt-4">Примеры интерфейсов</H2>
        <p className="mt-5 text-[15px] text-ink/65">Клик открывает демо, по нему можно походить.</p>
        <div className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {DEMOS.map((d) => (
            <button key={d.id} type="button" onClick={() => navigate(d.id)} className="group relative aspect-[4/5] overflow-hidden bg-ink text-left text-white">
              <img src={d.img} alt="" loading="lazy" className="absolute inset-0 size-full object-cover brightness-[.7] transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 to-transparent" />
              <span className="absolute left-4 top-4 text-[10px] font-medium uppercase tracking-[0.14em]">({d.tag})</span>
              <span className="absolute inset-x-4 bottom-4 font-display text-[clamp(15px,1.6vw,22px)] font-bold uppercase leading-tight">{d.title}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="border-t border-ink bg-white px-5 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Label className="text-ink/60">06 · Процесс</Label>
            <H2 className="mt-4">Как я работаю</H2>
          </div>
          <p className="max-w-xs text-[14px] text-ink/65">Раз в неделю показываю, что получилось. Список задач у вас перед глазами.</p>
        </div>
        <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((s) => (
            <div key={s.n}>
              <div className="font-display text-[clamp(80px,10vw,150px)] font-extrabold leading-none text-transparent [-webkit-text-stroke:1.5px_#0E0E0E]">{s.n}</div>
              <h3 className="mt-5 font-display text-xl font-bold uppercase">{s.t}</h3>
              <p className="mt-3 max-w-[16rem] text-[14px] leading-relaxed text-ink/65">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" className="px-5 py-24 md:px-8 md:py-36">
      <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <Label className="text-ink/60">07 · FAQ</Label>
          <H2 className="mt-4">Частые вопросы</H2>
        </div>
        <div className="border-b border-ink/20">
          {FAQ.map((f, i) => (
            <div key={i} className="border-t border-ink/20">
              <button type="button" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-6 py-6 text-left">
                <span className="font-display text-[clamp(16px,1.6vw,22px)] font-bold uppercase leading-snug">{f.q}</span>
                <Plus size={22} className={`shrink-0 transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                    <p className="max-w-xl pb-6 text-[15px] leading-relaxed text-ink/70">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="bg-ink px-5 py-28 text-white md:px-8 md:py-40">
      <div className="mx-auto max-w-[1500px]">
        <Label className="text-white/60">08 · Контакты</Label>
        <h2 className="mt-6 font-display font-extrabold uppercase leading-[0.95] tracking-tight text-[clamp(32px,7.2vw,120px)]">
          Разберу вашу задачу<br />за 30 минут.<br /><span className="text-gold">Бесплатно.</span>
        </h2>
        <p className="mt-8 max-w-md text-[16px] leading-relaxed text-white/70">Задам вопросы, предложу решение и назову цену. Без шаблонных КП и трёх дней ожидания.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <button type="button" onClick={openContact} className="group inline-flex items-center gap-3 bg-white px-9 py-5 text-[12px] font-bold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-gold hover:text-white">
            Написать <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </button>
          <a href="tel:+79119254652" className="inline-flex items-center gap-3 border border-white/30 px-9 py-5 text-[12px] font-bold uppercase tracking-[0.12em] transition-colors hover:bg-white/10">
            <Phone size={15} /> +7 911 925 46 52
          </a>
        </div>
        <p className="mt-6 text-[12px] text-white/55">Обычно отвечаю в течение 2 часов. Работаю с малым бизнесом, частными специалистами и производственными компаниями.</p>
        <p className="mt-4 max-w-md text-[11px] leading-relaxed text-white/45">
          Нажимая кнопку, вы даёте согласие на обработку персональных данных в&nbsp;соответствии с&nbsp;
          <a href="#" onClick={openPrivacy} className="underline underline-offset-2">Политикой конфиденциальности</a>.
        </p>
      </div>
      <div className="mx-auto mt-24 flex max-w-[1500px] flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6 text-[11px] uppercase tracking-[0.14em] text-white/55">
        <span>© 2026 Алексей Евтушенко</span>
        <a href="#" onClick={openPrivacy} className="hover:text-white">Политика конфиденциальности</a>
      </div>
    </section>
  );
}

export default function HomeView({ navigate }) {
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (scrollState.id) {
      const id = scrollState.id;
      scrollState.id = null;
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
    }
  }, []);

  return (
    <div className="bg-paper font-sans text-ink">
      <a href="#main" className="skip-link">К содержимому</a>
      <Header onMenu={() => setMenu((v) => !v)} menuOpen={menu} />
      {menu && <MobileMenu close={() => setMenu(false)} />}
      <main id="main">
        <Hero />
        <ChaWoFrame navigate={navigate} />
        <Intro />
        <Ticker />
        <Projects navigate={navigate} />
        <Audience />
        <Services />
        <Demos navigate={navigate} />
        <Process />
        <Faq />
        <Contact />
      </main>
    </div>
  );
}
