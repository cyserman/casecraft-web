import { useParams, useLocation } from "wouter";
import { blogPosts } from "@shared/blog-data";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Streamdown } from "streamdown";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const [, navigate] = useLocation();

  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-off-white via-light-gray to-off-white py-20 pt-32">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl font-serif font-bold text-navy-blue mb-4">Article Not Found</h1>
            <p className="text-charcoal-gray mb-8">The article you're looking for doesn't exist.</p>
            <Button onClick={() => navigate("/blog")} className="glass-button-primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white via-light-gray to-off-white pt-24 text-charcoal-gray">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy-blue to-dark-blue text-white py-12">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: "Blog", href: "/blog" },
              { label: post.title }
            ]}
          />
          <Button
            onClick={() => navigate("/blog")}
            variant="ghost"
            className="text-white hover:text-light-gray mb-6 p-0"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">{post.title}</h1>
          <div className="flex flex-wrap gap-6 text-light-gray">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-16">
        <div className="max-w-3xl mx-auto">
          {/* Article Content */}
          <article className="glass-panel-lg p-8 md:p-12 mb-12">
            <div className="prose prose-lg max-w-none">
              <Streamdown>{post.content}</Streamdown>
            </div>
          </article>

          {/* Author Info */}
          <div className="glass-panel p-8 mb-12">
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-navy-blue mb-2">About the Author</h3>
                <p className="text-charcoal-gray mb-4">
                  Steve Griffiths is a criminal defense attorney with extensive experience in DUI defense, ARD cases, and constitutional rights representation in Montgomery and Chester Counties, Pennsylvania.
                </p>
                <p className="text-charcoal-gray">
                  With a deep understanding of Pennsylvania criminal law and a commitment to protecting his clients' rights, Steve provides comprehensive legal guidance on complex criminal matters.
                </p>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-navy-blue mb-8">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <div
                    key={relatedPost.id}
                    className="glass-panel p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => navigate(`/blog/${relatedPost.slug}`)}
                  >
                    <div className="flex items-center gap-2 mb-3 text-sm text-steel-blue">
                      <Clock className="w-4 h-4" />
                      <span>{relatedPost.readTime} min read</span>
                    </div>
                    <h3 className="text-lg font-bold text-navy-blue mb-3 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-charcoal-gray text-sm line-clamp-3 mb-4">
                      {relatedPost.excerpt}
                    </p>
                    <div className="text-sm text-steel-blue font-semibold">Read More →</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="glass-panel-lg bg-gradient-to-r from-navy-blue/10 to-steel-blue/10 p-8 md:p-12 mt-12 text-center">
            <h3 className="text-2xl font-bold text-navy-blue mb-4">Need Legal Guidance?</h3>
            <p className="text-charcoal-gray mb-6 max-w-2xl mx-auto">
              If you're facing criminal charges or have questions about your legal rights, contact our office for a confidential consultation.
            </p>
            <Button onClick={() => navigate("/contact")} className="glass-button-primary">
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
