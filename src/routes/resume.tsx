import { marked } from 'marked'

import { createFileRoute } from '@tanstack/react-router'
import { allJobs, allEducations } from 'content-collections'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

export const Route = createFileRoute('/resume')({
  component: App,
})

function App() {
  const jobs = [...allJobs].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  )
  const educations = [...allEducations].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  )

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
      <div className="text-center space-y-4">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-primary">
          Curriculum Vitae
        </p>
        <h1 className="font-display text-5xl font-semibold">Resume</h1>
        <p className="text-lg text-muted-foreground">
          Professional experience and education
        </p>
        <Separator className="mt-8" />
      </div>

      {/* Career Summary */}
      <Card className="border-border/80">
        <CardHeader>
          <CardTitle className="font-display text-2xl font-medium">
            Career Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col-reverse sm:flex-row items-center gap-8">
            <p className="flex-1 leading-relaxed text-foreground/90">
              I'm a software developer focused on backend engineering and AI-powered systems. I've worked across full-stack development and enterprise technology implementation, building APIs, integrating systems, working with data, and applying GenAI to automate complex workflows. I like taking messy, real-world problems and turning them into software that is reliable, useful, and built to work in practice.

            </p>
            <img
              src="/portrait-image.png"
              alt="Professional headshot of Ben Mwaniki"
              className="w-40 h-48 rounded-2xl object-cover border border-border glow-border"
            />
          </div>
        </CardContent>
      </Card>

      {/* Work Experience */}
      <section className="space-y-6">
        <h2 className="font-display text-3xl font-semibold">
          Work Experience
        </h2>
        <div className="space-y-6">
          {jobs.map((job) => (
            <Card key={job.jobTitle} className="border-border/80">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-3">
                  <div className="space-y-2">
                    <CardTitle className="font-display text-xl font-medium">
                      {job.jobTitle}
                    </CardTitle>
                    <p className="font-medium text-primary">
                      {job.company} — {job.location}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-sm w-fit">
                    {job.startDate.slice(0, 4)} –{' '}
                    {job.endDate ? job.endDate.slice(0, 4) : 'Present'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-6 leading-relaxed text-foreground/90">
                  {job.summary}
                </p>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <HoverCard key={tag}>
                      <HoverCardTrigger>
                        <Badge variant="outline" className="cursor-pointer border-border/80">
                          {tag}
                        </Badge>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-64">
                        <p className="text-sm">
                          Hands-on experience with {tag} in production
                          environments.
                        </p>
                      </HoverCardContent>
                    </HoverCard>
                  ))}
                </div>
                {job.content && (
                  <div
                    className="mt-6 prose prose-invert prose-sm max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: marked(job.content),
                    }}
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="space-y-6">
        <h2 className="font-display text-3xl font-semibold">Education</h2>
        <div className="space-y-6">
          {educations.map((education) => (
            <Card key={education.school} className="border-border/80">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-3">
                  <CardTitle className="font-display text-xl font-medium">
                    {education.school}
                  </CardTitle>
                  <Badge variant="secondary" className="text-sm w-fit">
                    {education.startDate.slice(0, 4)} –{' '}
                    {education.endDate ? education.endDate.slice(0, 4) : 'Present'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-foreground/90 mb-4">
                  {education.summary}
                </p>
                <div className="flex flex-wrap gap-2">
                  {education.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-border/80">
                      {tag}
                    </Badge>
                  ))}
                </div>
                {education.content && (
                  <div
                    className="mt-6 prose prose-invert prose-sm max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: marked(education.content),
                    }}
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
