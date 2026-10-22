# ITZFIZZ Hero

A responsive landing page featuring an ITZFIZZ branded car and a scroll driven statistics reveal.

## Stack and features

- Next.js App Router and React
- Tailwind CSS 4 with page layout styles in `src/app/globals.css`
- GSAP and ScrollTrigger for the pinned, scroll linked hero animation
- Four data driven statistic cards and a reduced motion fallback

## Project structure

```text
public/images/                 Hero car and brand assets
src/app/                       App Router page, layout, and global styles
src/components/hero/           Hero presentation components
src/data/heroStats.js          Statistic content
src/lib/animations/            GSAP animation setup
```

## Local development

Install the dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Run the project checks and production server with:

```bash
npm run lint
npm run build
npm run start
```

The development and build scripts use Next.js with Webpack.

## Scroll animation

`Hero` scopes one GSAP context to the hero section and reverts it when the component unmounts. The animation helper creates one pinned ScrollTrigger timeline: it moves the car and green trail across the road while revealing the four statistic cards in sequence. Scrubbing ties progress to scroll position, so scrolling upward reverses the animation. The timeline recalculates its car travel distance on refresh, and the car image triggers a refresh after loading. Users who prefer reduced motion see the complete static hero without the scroll animation.

## Deployment

Build and run the production server with `npm run build` and `npm run start`. The project uses standard Next.js server output and can be deployed to a Node.js hosting provider or Vercel. Static images are served from `public/images`.
