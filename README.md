# Импров для своих

Обучающая платформа по импровизации — последовательный путь с нуля.
React + TypeScript + Vite, Tailwind CSS v4, react-router. Архитектура —
Feature-Sliced Design. Mobile-first. Шрифты (Unbounded, Instrument Sans)
раздаются локально из бандла, без обращения к Google Fonts.
Авто-деплой на GitHub Pages через GitHub Actions.

## Локальный запуск

```bash
npm install
npm run dev
```

Откроется на `http://localhost:5173`.

Сборка продакшена:

```bash
npm run build      # результат в ./dist
npm run preview    # локальный просмотр собранного
```

## Деплой на GitHub Pages (автоматический)

1. Создай репозиторий на GitHub и запушь туда этот проект:

   ```bash
   git init
   git add .
   git commit -m "init"
   git branch -M main
   git remote add origin https://github.com/<USERNAME>/<REPO>.git
   git push -u origin main
   ```

2. В репозитории открой **Settings → Pages** и в разделе
   **Build and deployment → Source** выбери **GitHub Actions**.

3. Готово. Каждый пуш в `main` автоматически собирает и публикует сайт.
   Адрес: `https://<USERNAME>.github.io/<REPO>/`

> Базовый путь (`base`) для Pages подставляется автоматически из имени
> репозитория — менять вручную ничего не нужно. Если позже подключишь
> кастомный домен, задеплой будет работать так же.

## Структура (Feature-Sliced Design)

```
src/
  app/        — точка входа, роутинг, провайдеры, глобальные стили и дизайн-токены
  pages/      — страницы: home, lesson
  widgets/    — составные блоки: lesson-content (шапка, hero, рендер блоков урока)
  entities/   — бизнес-сущности: section, lesson (модель, данные, UI)
  shared/     — переиспользуемое: ui-компоненты, утилиты, локальные шрифты
.github/workflows/deploy.yml — авто-деплой
```

Все цвета, шрифты, радиусы, тени и типографические роли заданы как
дизайн-токены и `type-*`-классы в `src/app/styles/index.css` — компоненты
ссылаются на канон, а не хардкодят значения.

## Как добавить новый раздел

1. Добавь объект в массив `SECTIONS` в `src/entities/section/model/sections.ts`
   (id, number, stage, title, subtitle, minutes, status: `"ready"`, accent,
   accentSoft).
2. Добавь контент урока в `LESSONS` в `src/entities/lesson/model/lessons.tsx`
   под тем же `id`, используя готовые типы блоков: `essence`, `paragraph`,
   `heading`, `dialogues`, `definitionHalves`, `callout`, `spine`, `example`,
   `comparison`, `traps`, `exercises`, `next`.
