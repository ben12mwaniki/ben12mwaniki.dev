# Ben Mwaniki — Portfolio

A personal portfolio site: home, resume (experience + education), projects,
blog, and a contact form, in a dark, luminous-green, sleek/modern theme. The live portfolio is available [here](https://ben12mwaniki.netlify.app/). 

## Tech stack

- [TanStack Start](https://tanstack.com/start) (React 19 + TanStack Router, file-based routing)
- Tailwind CSS 4
- [Content Collections](https://www.content-collections.dev/) for typed markdown content (jobs, education, projects, blog)
- Radix UI primitives (Card, Badge, HoverCard, Separator)
- Netlify Forms for the contact form
- Deployed on Netlify

## Project structure

- `content/` — markdown content for jobs, education, projects, and blog posts. Add a file here to add a new entry to the resume, portfolio, or blog.
- `src/routes/` — file-based routes (`/`, `/resume`, `/projects`, `/blog`, `/blog/$slug`, `/contact`)
- `src/components/ui/` — shared UI primitives
- `src/styles.css` — theme tokens and global styles

See `AGENTS.md` for a deeper architecture overview.

## Running locally

```bash
npm install
npm run dev
```

The dev server runs on `http://localhost:3000`.

> Note: Netlify Forms submissions only work on an actual Netlify deploy (or via `netlify dev`), not in a plain `vite dev` session.

## Building

```bash
npm run build
```

Outputs a production build to `dist/client`, matching the `netlify.toml` publish directory.
