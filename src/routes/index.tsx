import { createFileRoute, Link } from '@tanstack/react-router'
import { allJobs, allEducations } from 'content-collections'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export const Route = createFileRoute('/')({
  component: Home,
})

const SKILLS = [
  {
    category: 'Frontend',
    items: ['React', 'TypeScript', 'TanStack Start', 'Tailwind CSS', 'Vite'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'PostgreSQL', 'GraphQL', 'Serverless Functions'],
  },
  {
    category: 'Tooling & Practice',
    items: ['CI/CD', 'Playwright', 'Design Systems', 'Accessibility (WCAG)'],
  },
  {
    category: 'Currently learning',
    items: ['WebGPU', 'Rust'],
  },
]

function Home() {
  const latestJob = [...allJobs].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  )[0]
  const latestEducation = [...allEducations].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  )[0]

  return (
    <div>
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-12 items-end">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-primary mb-6">
              <Sparkles size={14} />
              Available for select engagements
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[1.02] mb-6">
              I build interfaces that feel
              <span className="text-primary glow-text"> alive.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Software engineer focused on frontend architecture, developer
              tooling, and the small interaction details most teams skip.
              Currently based between remote-first product teams.
            </p>
            <div className="flex flex-wrap gap-4 mt-9">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:brightness-110 transition-all glow-border"
              >
                Start a conversation
                <ArrowUpRight size={16} />
              </Link>
              <Link
                to="/resume"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-medium hover:border-primary hover:text-primary transition-colors"
              >
                View resume
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="aspect-square rounded-3xl border border-border bg-card/60 p-1 glow-border">
              <img
                src="/portrait-image.png"
                alt="Portrait of Ben Mwaniki"
                className="w-full h-full object-cover rounded-[calc(1.5rem-2px)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-display text-3xl font-semibold">Skills</h2>
          <span className="text-sm text-muted-foreground font-mono">
            04 areas
          </span>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {SKILLS.map((group) => (
            <Card key={group.category} className="border-border/80">
              <CardContent className="pt-0">
                <h3 className="font-display text-lg font-medium mb-4 text-primary">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge key={item} variant="outline" className="border-border/80">
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Snapshot: latest role + education */}
      <section className="max-w-5xl mx-auto px-6 pb-28">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-display text-3xl font-semibold">
            Experience & Education
          </h2>
          <Link
            to="/resume"
            className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
          >
            Full history
            <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {latestJob && (
            <Card className="border-border/80">
              <CardContent className="pt-0">
                <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
                  Most recent role
                </p>
                <h3 className="font-display text-xl font-medium mb-1">
                  {latestJob.jobTitle}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {latestJob.company} · {latestJob.location}
                </p>
                <p className="text-sm leading-relaxed text-foreground/90">
                  {latestJob.summary}
                </p>
              </CardContent>
            </Card>
          )}
          {latestEducation && (
            <Card className="border-border/80">
              <CardContent className="pt-0">
                <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
                  Education
                </p>
                <h3 className="font-display text-xl font-medium mb-1">
                  {latestEducation.school}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {latestEducation.startDate.slice(0, 4)}
                  {latestEducation.endDate
                    ? ` – ${latestEducation.endDate.slice(0, 4)}`
                    : ''}
                </p>
                <p className="text-sm leading-relaxed text-foreground/90">
                  {latestEducation.summary}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  )
}
