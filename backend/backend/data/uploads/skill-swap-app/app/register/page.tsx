"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { GlassCard } from "@/components/ui-elements"
import { Eye, EyeOff, Mail, Lock, User, Plus, X, Sparkles } from "lucide-react"

const suggestedSkills = [
  "JavaScript", "React", "Python", "UI/UX Design", "Figma", "Photography",
  "Video Editing", "Music Production", "Marketing", "Copywriting", "SEO",
  "Data Analysis", "Machine Learning", "Game Development", "3D Modeling"
]

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    skillsOffered: [] as string[],
    skillsWanted: [] as string[]
  })
  const [currentSkillOffered, setCurrentSkillOffered] = useState("")
  const [currentSkillWanted, setCurrentSkillWanted] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const addSkill = (type: "offered" | "wanted", skill: string) => {
    if (!skill.trim()) return
    const key = type === "offered" ? "skillsOffered" : "skillsWanted"
    if (!formData[key].includes(skill.trim())) {
      setFormData(prev => ({
        ...prev,
        [key]: [...prev[key], skill.trim()]
      }))
    }
    if (type === "offered") setCurrentSkillOffered("")
    else setCurrentSkillWanted("")
  }

  const removeSkill = (type: "offered" | "wanted", skill: string) => {
    const key = type === "offered" ? "skillsOffered" : "skillsWanted"
    setFormData(prev => ({
      ...prev,
      [key]: prev[key].filter(s => s !== skill)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    router.push("/dashboard")
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-24 pb-12 px-4">
        {/* Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-white/80">Join the Community</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Create Your <span className="text-primary">Account</span>
            </h1>
            <p className="text-white/60">Start swapping skills in minutes</p>
          </div>

          <GlassCard>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-background/50 border border-white/10 text-white placeholder:text-white/30 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-background/50 border border-white/10 text-white placeholder:text-white/30 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full pl-12 pr-12 py-3 rounded-xl bg-background/50 border border-white/10 text-white placeholder:text-white/30 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Skills Offered */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Skills You Can Teach <span className="text-accent">(What you know)</span>
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={currentSkillOffered}
                    onChange={e => setCurrentSkillOffered(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addSkill("offered", currentSkillOffered))}
                    className="flex-1 px-4 py-3 rounded-xl bg-background/50 border border-white/10 text-white placeholder:text-white/30 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                    placeholder="Type a skill and press Enter"
                  />
                  <button
                    type="button"
                    onClick={() => addSkill("offered", currentSkillOffered)}
                    className="px-4 py-3 rounded-xl gradient-accent text-background font-medium hover:opacity-90 transition-all"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                {formData.skillsOffered.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.skillsOffered.map(skill => (
                      <span 
                        key={skill} 
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent/20 text-accent text-sm border border-accent/30"
                      >
                        {skill}
                        <button type="button" onClick={() => removeSkill("offered", skill)}>
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {suggestedSkills.slice(0, 5).filter(s => !formData.skillsOffered.includes(s)).map(skill => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => addSkill("offered", skill)}
                      className="px-3 py-1 rounded-full text-sm text-white/50 border border-white/10 hover:border-accent/50 hover:text-accent transition-all"
                    >
                      + {skill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skills Wanted */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Skills You Want to Learn <span className="text-primary">(What you need)</span>
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={currentSkillWanted}
                    onChange={e => setCurrentSkillWanted(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addSkill("wanted", currentSkillWanted))}
                    className="flex-1 px-4 py-3 rounded-xl bg-background/50 border border-white/10 text-white placeholder:text-white/30 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="Type a skill and press Enter"
                  />
                  <button
                    type="button"
                    onClick={() => addSkill("wanted", currentSkillWanted)}
                    className="px-4 py-3 rounded-xl gradient-primary text-white font-medium hover:opacity-90 transition-all"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                {formData.skillsWanted.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.skillsWanted.map(skill => (
                      <span 
                        key={skill} 
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm border border-primary/30"
                      >
                        {skill}
                        <button type="button" onClick={() => removeSkill("wanted", skill)}>
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {suggestedSkills.slice(5, 10).filter(s => !formData.skillsWanted.includes(s)).map(skill => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => addSkill("wanted", skill)}
                      className="px-3 py-1 rounded-full text-sm text-white/50 border border-white/10 hover:border-primary/50 hover:text-primary transition-all"
                    >
                      + {skill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl font-semibold text-lg gradient-primary text-white glow-primary hover:opacity-90 transition-all disabled:opacity-50"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>

              <p className="text-center text-white/60">
                Already have an account?{" "}
                <Link href="/login" className="text-accent hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </form>
          </GlassCard>
        </div>
      </section>

      <Footer />
    </main>
  )
}
