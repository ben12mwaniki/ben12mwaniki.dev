import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Mail, Send } from 'lucide-react'

export const Route = createFileRoute('/contact')({
  component: Contact,
})

function Contact() {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-16 h-16 bg-primary/15 border border-primary/40 rounded-full flex items-center justify-center mx-auto mb-5 glow-border">
            <Mail className="w-7 h-7 text-primary" />
          </div>
          <h2 className="font-display text-2xl font-semibold mb-2">
            Message sent!
          </h2>
          <p className="text-muted-foreground mb-6">
            Thanks for reaching out — I'll get back to you within a couple of
            days.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full font-medium hover:brightness-110 transition-all"
          >
            Send another message
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="font-display text-4xl md:text-5xl font-semibold mb-3">
        Contact
      </h1>
      <p className="text-muted-foreground mb-10">
        Have a project, a question, or just want to talk shop? Send a message.
      </p>

      <form
        name="contact"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        onSubmit={(e) => {
          e.preventDefault()
          const form = e.currentTarget
          const formData = new FormData(form)
          fetch('/contact.html', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(
              formData as unknown as Record<string, string>,
            ).toString(),
          }).then(() => setSubmitted(true))
        }}
        className="space-y-6"
      >
        <input type="hidden" name="form-name" value="contact" />
        <p hidden>
          <label>
            Don't fill this out: <input name="bot-field" />
          </label>
        </p>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-foreground/90 mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-2.5 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors placeholder:text-muted-foreground"
            placeholder="Your name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground/90 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-2.5 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors placeholder:text-muted-foreground"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-foreground/90 mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            className="w-full px-4 py-2.5 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors resize-none placeholder:text-muted-foreground"
            placeholder="Your message..."
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:brightness-110 transition-all font-medium glow-border"
        >
          <Send size={16} />
          Send message
        </button>
      </form>
    </div>
  )
}
