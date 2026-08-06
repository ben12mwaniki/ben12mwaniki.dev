import { HeadContent, Link, Scripts, createRootRoute } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Ben Mwaniki — Software Engineer',
      },
      {
        name: 'description',
        content:
          'Portfolio of Ben Mwaniki — software engineer specializing in resilient frontend systems, developer tooling, and interface design.',
      },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
})

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/resume', label: 'Resume' },
  { to: '/projects', label: 'Projects' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
] as const

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="noise-overlay" aria-hidden="true" />
        <SiteHeader />
        {children}
        <SiteFooter />
        <Scripts />
      </body>
    </html>
  )
}

function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="font-display text-lg font-semibold tracking-tight text-foreground"
        >
          ben<span className="text-primary glow-text">.dev</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors [&.active]:text-primary"
              activeOptions={{ exact: link.to === '/' }}
              activeProps={{ className: 'active' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-foreground"
          aria-label="Toggle navigation"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border/70 px-6 py-4 flex flex-col gap-4 bg-background/95">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors [&.active]:text-primary"
              activeProps={{ className: 'active' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}

function SiteFooter() {
  return (
    <footer className="border-t border-border/70 mt-24">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>&copy; {'2026'} Ben Mwaniki. Built with TanStack Start.</p>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/ben12mwaniki"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/ben-mwaniki"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            LinkedIn
          </a>
          <Link to="/contact" className="hover:text-primary transition-colors">
            Say hello
          </Link>
        </div>
      </div>
    </footer>
  )
}
