import { createFileRoute, Link } from '@tanstack/react-router'
import { allBlogs } from 'content-collections'
import { marked } from 'marked'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Calendar } from 'lucide-react'

export const Route = createFileRoute('/blog/$slug')({
  component: BlogPost,
})

function BlogPost() {
  const { slug } = Route.useParams()
  const post = allBlogs.find((p) => p._meta.path === slug)

  if (!post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-semibold mb-4">
            Post not found
          </h1>
          <Link to="/blog" className="text-primary hover:underline">
            Back to writing
          </Link>
        </div>
      </div>
    )
  }

  const html = marked(post.content)

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-10 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to writing
      </Link>

      <article>
        <header className="mb-10">
          <h1 className="font-display text-4xl font-semibold mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
            <Calendar size={16} />
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
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </header>

        <div
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
    </div>
  )
}
