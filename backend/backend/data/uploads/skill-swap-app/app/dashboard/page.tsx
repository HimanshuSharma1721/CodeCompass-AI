"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { GlassCard, SkillBadge, StarRating } from "@/components/ui-elements"
import { Edit3, MapPin, Calendar, MessageCircle, ArrowRightLeft, Sparkles } from "lucide-react"

// Mock data for current user
const currentUser = {
  name: "Alex Chen",
  email: "alex@example.com",
  avatar: "AC",
  location: "San Francisco, CA",
  joinedDate: "March 2024",
  bio: "Frontend dev by day, music producer by night. Always learning something new!",
  skillsOffered: ["JavaScript", "React", "TypeScript", "UI/UX"],
  skillsWanted: ["Music Production", "Video Editing", "3D Modeling"],
  totalSwaps: 12,
  rating: 4.8
}

// Mock data for matched users
const matchedUsers = [
  {
    id: 1,
    name: "Maya Rodriguez",
    avatar: "MR",
    location: "Los Angeles, CA",
    skillsOffered: ["Music Production", "Sound Design", "Ableton"],
    skillsWanted: ["JavaScript", "Web Development"],
    rating: 4.9,
    matchPercent: 95
  },
  {
    id: 2,
    name: "Jordan Kim",
    avatar: "JK",
    location: "New York, NY",
    skillsOffered: ["Video Editing", "Premiere Pro", "After Effects"],
    skillsWanted: ["React", "TypeScript"],
    rating: 4.7,
    matchPercent: 88
  },
  {
    id: 3,
    name: "Sam Taylor",
    avatar: "ST",
    location: "Austin, TX",
    skillsOffered: ["3D Modeling", "Blender", "Unity"],
    skillsWanted: ["UI/UX Design", "Frontend Dev"],
    rating: 4.5,
    matchPercent: 82
  },
  {
    id: 4,
    name: "Riley Johnson",
    avatar: "RJ",
    location: "Seattle, WA",
    skillsOffered: ["Photography", "Lightroom", "Color Grading"],
    skillsWanted: ["JavaScript", "React Native"],
    rating: 4.8,
    matchPercent: 75
  }
]

export default function DashboardPage() {
  const [selectedUser, setSelectedUser] = useState<number | null>(null)

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-24 pb-12 px-4">
        {/* Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-40 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Section */}
            <div className="lg:col-span-1">
              <GlassCard className="sticky top-24">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center text-3xl font-bold text-white mx-auto mb-4 glow-primary">
                    {currentUser.avatar}
                  </div>
                  <h1 className="text-2xl font-bold text-white">{currentUser.name}</h1>
                  <div className="flex items-center justify-center gap-2 text-white/60 mt-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{currentUser.location}</span>
                  </div>
                </div>

                <p className="text-white/70 text-center mb-6">{currentUser.bio}</p>

                <div className="flex justify-center gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{currentUser.totalSwaps}</div>
                    <div className="text-sm text-white/60">Swaps</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1">
                      <span className="text-2xl font-bold text-secondary">{currentUser.rating}</span>
                    </div>
                    <div className="text-sm text-white/60">Rating</div>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6 mb-6">
                  <h3 className="text-sm font-medium text-accent mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Skills I Teach
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {currentUser.skillsOffered.map(skill => (
                      <SkillBadge key={skill} skill={skill} variant="accent" />
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6 mb-6">
                  <h3 className="text-sm font-medium text-primary mb-3 flex items-center gap-2">
                    <ArrowRightLeft className="w-4 h-4" />
                    Skills I Want
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {currentUser.skillsWanted.map(skill => (
                      <SkillBadge key={skill} skill={skill} variant="primary" />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-white/40 text-sm">
                  <Calendar className="w-4 h-4" />
                  Joined {currentUser.joinedDate}
                </div>

                <button className="w-full mt-6 py-3 rounded-xl font-medium text-white/70 border border-white/10 hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center gap-2">
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </button>
              </GlassCard>
            </div>

            {/* Matches Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Your Matches</h2>
                  <p className="text-white/60">People who want what you have, and have what you want</p>
                </div>
                <div className="px-4 py-2 rounded-full glass text-sm text-white/80">
                  {matchedUsers.length} matches found
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {matchedUsers.map(user => (
                  <GlassCard 
                    key={user.id}
                    className={`cursor-pointer ${selectedUser === user.id ? "border-primary/50 glow-primary" : ""}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-full gradient-accent flex items-center justify-center text-lg font-bold text-background">
                          {user.avatar}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{user.name}</h3>
                          <div className="flex items-center gap-1 text-white/50 text-sm">
                            <MapPin className="w-3 h-3" />
                            {user.location}
                          </div>
                        </div>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-secondary/20 text-secondary text-sm font-medium">
                        {user.matchPercent}% match
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs text-accent mb-2 font-medium">They teach:</p>
                      <div className="flex flex-wrap gap-1">
                        {user.skillsOffered.map(skill => (
                          <SkillBadge key={skill} skill={skill} variant="accent" />
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs text-primary mb-2 font-medium">They want:</p>
                      <div className="flex flex-wrap gap-1">
                        {user.skillsWanted.map(skill => (
                          <SkillBadge key={skill} skill={skill} variant="primary" />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2">
                        <StarRating rating={Math.floor(user.rating)} size="sm" />
                        <span className="text-sm text-white/60">{user.rating}</span>
                      </div>
                      <button 
                        onClick={() => setSelectedUser(user.id)}
                        className="px-4 py-2 rounded-lg gradient-primary text-white text-sm font-medium hover:opacity-90 transition-all flex items-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Request Swap
                      </button>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
