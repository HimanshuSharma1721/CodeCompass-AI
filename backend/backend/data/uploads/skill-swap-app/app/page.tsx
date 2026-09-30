import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { GlassCard, SkillBadge } from "@/components/ui-elements"
import { ArrowRight, Users, Repeat, Trophy, Sparkles, Code, Palette, Music, Camera, Gamepad2, BookOpen } from "lucide-react"

const popularSkills = [
  { name: "JavaScript", icon: Code },
  { name: "UI/UX Design", icon: Palette },
  { name: "Music Production", icon: Music },
  { name: "Photography", icon: Camera },
  { name: "Game Dev", icon: Gamepad2 },
  { name: "Marketing", icon: BookOpen },
]

const howItWorks = [
  {
    step: "01",
    title: "Create Your Profile",
    description: "Sign up and list the skills you can teach and the skills you want to learn.",
    icon: Users,
    color: "primary"
  },
  {
    step: "02",
    title: "Get Matched",
    description: "Our algorithm finds perfect skill-swap partners based on your interests.",
    icon: Repeat,
    color: "accent"
  },
  {
    step: "03",
    title: "Start Swapping",
    description: "Connect, learn, and grow together. Rate each other after successful swaps!",
    icon: Trophy,
    color: "secondary"
  }
]

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-white/80">The Gen Z Way to Learn</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight text-balance">
              Swap Skills,{" "}
              <span className="text-transparent bg-clip-text gradient-primary">
                Grow Together
              </span>
              {" "}🚀
            </h1>
            
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto text-pretty">
              Why pay for courses when you can trade skills? Connect with people who want 
              to learn what you know, and teach you what they know.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg gradient-primary text-white glow-primary hover:opacity-90 transition-all"
              >
                Start Swapping
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/login"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg glass text-white hover:bg-white/10 transition-all"
              >
                I Have an Account
              </Link>
            </div>
          </div>

          {/* Popular Skills */}
          <div className="mt-20">
            <p className="text-center text-white/60 mb-6 text-sm font-medium uppercase tracking-wider">
              Popular Skills Being Swapped
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {popularSkills.map((skill, index) => (
                <div 
                  key={skill.name}
                  className="glass px-5 py-3 rounded-xl flex items-center gap-3 hover:border-primary/50 transition-all cursor-default"
                >
                  <skill.icon className={`w-5 h-5 ${
                    index % 3 === 0 ? "text-primary" : 
                    index % 3 === 1 ? "text-accent" : "text-secondary"
                  }`} />
                  <span className="font-medium text-white">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How It <span className="text-accent">Works</span>
            </h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              Three simple steps to start your skill-swapping journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((item) => (
              <GlassCard key={item.step} className="relative group">
                <div className={`absolute -top-4 -right-4 text-6xl font-bold opacity-10 ${
                  item.color === "primary" ? "text-primary" :
                  item.color === "accent" ? "text-accent" : "text-secondary"
                }`}>
                  {item.step}
                </div>
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                  item.color === "primary" ? "gradient-primary glow-primary" :
                  item.color === "accent" ? "gradient-accent glow-accent" : "gradient-secondary"
                }`}>
                  <item.icon className={`w-7 h-7 ${item.color === "secondary" ? "text-background" : "text-white"}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/60">{item.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <GlassCard className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center" hover={false}>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">10K+</div>
              <div className="text-white/60">Active Users</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">50K+</div>
              <div className="text-white/60">Skills Swapped</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">200+</div>
              <div className="text-white/60">Skill Categories</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">4.9</div>
              <div className="text-white/60">Average Rating</div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <GlassCard className="relative overflow-hidden" hover={false}>
            <div className="absolute top-0 left-0 w-full h-1 gradient-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Join thousands of Gen Z learners who are already swapping skills and growing together.
            </p>
            <Link 
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg gradient-primary text-white glow-primary hover:opacity-90 transition-all"
            >
              Join Skill-Swap Today
              <ArrowRight className="w-5 h-5" />
            </Link>
          </GlassCard>
        </div>
      </section>

      <Footer />
    </main>
  )
}
