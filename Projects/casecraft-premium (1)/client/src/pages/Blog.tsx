import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@shared/blog-data";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function Blog() {
  const [, navigate] = useLocation();

  const featuredPost = blogPosts.find((p) => p.featured) || blogPosts[0];
  const otherPosts = blogPosts.filter((p) => p.id !== featuredPost?.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white via-light-gray to-off-white pt-24 text-charcoal-gray">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-navy-blue to-dark-blue text-white py-16 md:py-24">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: "Blog" }
            ]}
          />
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Steve's Corner</h1>
          <p className="text-lg md:text-xl text-light-gray max-w-2xl">
            Legal insights, case analysis, and updates on criminal law from Steve Griffiths.
          </p>
        </div>
      </div>

      {/* Featured Article */}
      <div className="container py-16">
        {featuredPost && (
          <div className="glass-panel-lg p-8 md:p-12 mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-sm font-bold text-steel-blue uppercase tracking-widest">
                  {featuredPost.category}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-navy-blue my-4">
                  {featuredPost.title}
                </h2>
                <div className="flex flex-wrap items-center gap-6 text-charcoal-gray text-sm mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(featuredPost.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{featuredPost.readTime} min read</span>
                  </div>
                </div>
                <p className="text-lg text-charcoal-gray mb-8 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <Button
                  onClick={() => navigate(`/blog/${featuredPost.slug}`)}
                  className="glass-button-primary"
                >
                  Read Full Article <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <div className="glass-panel p-8">
                <div className="bg-gradient-to-br from-navy-blue/10 to-steel-blue/10 rounded-lg p-8 h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-4">📋</div>
                    <p className="text-charcoal-gray font-semibold">Featured Legal Analysis</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-navy-blue mb-12 text-center">All Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherPosts.map((post) => (
              <div
                key={post.id}
                className="glass-panel p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/blog/${post.slug}`)}
              >
                <span className="text-xs font-bold text-steel-blue uppercase tracking-widest">
                  {post.category}
                </span>
                <h3 className="text-lg font-bold text-navy-blue my-3 line-clamp-2">
                  {post.title}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-charcoal-gray text-xs mb-4">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime} min</span>
                  </div>
                </div>
                <p className="text-charcoal-gray text-sm line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                <div className="text-sm text-steel-blue font-semibold hover:text-navy-blue transition-colors">
                  Read More →
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Author Bio */}
        <div className="glass-panel-lg p-8 md:p-12 mb-16">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div>
              <img
                src="/steve.jpg"
                alt="Steve Griffiths"
                className="w-full h-auto rounded-lg object-cover shadow-lg"
              />
            </div>
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold text-navy-blue mb-4">About Steve Griffiths</h2>
              <p className="text-charcoal-gray mb-4 leading-relaxed">
                Steve Griffiths is a dedicated criminal defense attorney serving Montgomery and Chester Counties, Pennsylvania. With extensive experience in DUI defense, ARD cases, and constitutional rights representation, he provides expert legal guidance for clients facing criminal charges.
              </p>
              <p className="text-charcoal-gray mb-6 leading-relaxed">
                Steve's approach combines aggressive advocacy with deep knowledge of Pennsylvania criminal law. He stays current on the latest legal developments and uses that knowledge to protect his clients' rights and achieve favorable outcomes.
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-charcoal-gray">
                  <span className="font-semibold text-navy-blue">Practice Areas:</span> Criminal Defense, DUI Defense, Constitutional Rights, Family Law
                </p>
                <p className="text-charcoal-gray">
                  <span className="font-semibold text-navy-blue">Service Areas:</span> Montgomery County & Chester County, PA
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="glass-panel-lg bg-gradient-to-r from-navy-blue/10 to-steel-blue/10 p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-navy-blue mb-4">Need Legal Representation?</h2>
          <p className="text-charcoal-gray mb-8 max-w-2xl mx-auto">
            Contact us today for a confidential consultation about your legal matter.
          </p>
          <Button onClick={() => navigate("/contact")} className="glass-button-primary">
            Schedule Consultation
          </Button>
        </div>
      </div>
    </div>
  );
}
