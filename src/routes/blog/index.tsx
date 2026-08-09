import { createFileRoute, Link } from '@tanstack/react-router'
import { allBlogs } from 'content-collections'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar } from 'lucide-react'

export const Route = createFileRoute('/blog/')({
  component: BlogIndex,
})

function BlogIndex() {
  const posts = [...allBlogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-display text-4xl md:text-5xl font-semibold mb-3">
        Writing
      </h1>
      <p className="text-muted-foreground mb-12">
        Thoughts on building software, exploring AI, and the lessons learned along the way.      </p>

      <div className="space-y-5">
        {posts.map((post) => (
          <Link
            key={post._meta.path}
            to="/blog/$slug"
            params={{ slug: post._meta.path }}
            className="block"
          >
            <Card className="cursor-pointer border-border/80 hover:border-primary/60 hover:glow-border transition-all">
              <CardHeader>
                <CardTitle className="font-display text-xl font-medium">
                  {post.title}
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar size={14} />
                  <time>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <span>·</span>
                  <span>{post.author}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 mb-4">{post.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
