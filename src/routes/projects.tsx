import { createFileRoute } from '@tanstack/react-router'
import { allProjects } from 'content-collections'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Github } from 'lucide-react'

export const Route = createFileRoute('/projects')({
  component: Projects,
})

function Projects() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="font-display text-4xl md:text-5xl font-semibold mb-3">
        Projects
      </h1>
      <p className="text-muted-foreground mb-12">
        A selection of things I've built, broken, and rebuilt better.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allProjects.map((project) => (
          <Card
            key={project._meta.path}
            className="flex flex-col border-border/80 hover:border-primary/60 hover:glow-border transition-all"
          >
            <CardHeader>
              <CardTitle className="font-display text-xl font-medium">
                {project.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <p className="text-foreground/80 mb-4 flex-1">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-5">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github size={16} />
                    Source
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <ExternalLink size={16} />
                    Live demo
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
