# Портфолио Алексея — деплой на GitHub Pages

## Структура

```
portfolio/
├── .github/workflows/deploy.yml   ← автодеплой при push в main
├── src/
│   ├── App.jsx                    ← всё приложение
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js                 ← ⚠️ поменяй base на своё имя репо
├── tailwind.config.js
└── postcss.config.js
```

---

## Деплой за 5 шагов

### Шаг 1 — Создай репозиторий на GitHub

- Название: `portfolio` (или любое другое — запомни его)
- Видимость: **Public**

### Шаг 2 — Поправь vite.config.js

Открой `vite.config.js` и замени `'/portfolio/'` на название своего репозитория:

```js
base: '/ИМЯ_РЕПОЗИТОРИЯ/',
```

Если репо называется `my-portfolio`, то:
```js
base: '/my-portfolio/',
```

### Шаг 3 — Загрузи файлы

```bash
# Установи зависимости и проверь что билдится
npm install
npm run build    # должна появиться папка dist/

# Инициализируй git
git init
git add .
git commit -m "initial portfolio"
git branch -M main
git remote add origin https://github.com/ВАШ_ЛОГИН/ИМЯ_РЕПО.git
git push -u origin main
```

### Шаг 4 — Включи GitHub Pages

1. Открой репозиторий → **Settings** → **Pages**
2. Source: **GitHub Actions** (не Branch!)
3. Сохрани

### Шаг 5 — Готово

Через 1–2 минуты после push сайт будет доступен:
```
https://ВАШ_ЛОГИН.github.io/ИМЯ_РЕПО/
```

---

## Обновление сайта

Любой `git push` в ветку `main` запускает автоматический деплой через GitHub Actions.

---

## Проекты в портфолио

| Проект | Тип | Живая ссылка |
|---|---|---|
| Kitliash.cosmo | Web · HTML · Tailwind | https://ddmsngr.github.io/olga-kosmetolog/ |
| И Цзин | Android · Flutter | — |
| KOTT | Android · Flutter | — |
| DDChat | Web · PWA · React | — |
| DeepDrift | Python · R&D | Zenodo |
