"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { GlassCard, SkillBadge, StarRating } from "@/components/ui-elements"
import { Check, X, Clock, MapPin, ArrowRightLeft, Calendar, MessageSquare } from "lucide-react"

// Mock data for swap requests
const initialRequests = [
  {
    id: 1,
    user: {
      name: "Emma Wilson",
      avatar: "EW",
      location: "Chicago, IL",
      rating: 4.8
    },
    theyOffer: "Python",
    theyWant: "JavaScript",
    message: "Hey! I noticed you're great at JavaScript. I can teach you Python in exchange. Would love to connect!",
    timestamp: "2 hours ago",
    status: "pending"
  },
  {
    id: 2,
    user: {
      name: "Liam Brown",
      avatar: "LB",
      location: "Miami, FL",
      rating: 4.6
    },
    theyOffer: "Graphic Design",
    theyWant: "React",
    message: "I've been wanting to learn React for my portfolio projects. I can help you with any graphic design work!",
    timestamp: "5 hours ago",
    status: "pending"
  },
  {
    id: 3,
    user: {
      name: "Zoe Davis",
      avatar: "ZD",
      location: "Denver, CO",
      rating: 4.9
    },
    theyOffer: "Data Analysis",
    theyWant: "TypeScript",
    message: "Looking for a TypeScript mentor! I'm experienced in data analysis with Python and Excel.",
    timestamp: "1 day ago",
    status: "pending"
  },
  {
    id: 4,
    user: {
      name: "Noah Martinez",
      avatar: "NM",
      location: "Portland, OR",
      rating: 4.7
    },
    theyOffer: "Motion Graphics",
    theyWant: "UI/UX",
    message: "Your UI work is amazing! I'd love to learn from you. I can teach you motion graphics with After Effects.",
    timestamp: "2 days ago",
    status: "pending"
  }
]

export default function SwapRequestsPage() {
  const [requests, setRequests] = useState(initialRequests)
  const [filter, setFilter] = useState<"all" | "pending" | "accepted" | "rejected">("all")

  const handleAccept = (id: number) => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: "accepted" } : req
    ))
  }

  const handleReject = (id: number) => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: "rejected" } : req
    ))
  }

  const filteredRequests = requests.filter(req => 
    filter === "all" ? true : req.status === filter
  )

  const pendingCount = requests.filter(r => r.status === "pending").length
  const acceptedCount = requests.filter(r => r.status === "accepted").length

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-24 pb-12 px-4">
        {/* Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute top-40 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Swap <span className="text-primary">Requests</span>
            </h1>
            <p className="text-white/60">Manage incoming skill swap requests from other users</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <GlassCard className="text-center py-4" hover={false}>
              <div className="text-3xl font-bold text-secondary mb-1">{pendingCount}</div>
              <div className="text-sm text-white/60">Pending</div>
            </GlassCard>
            <GlassCard className="text-center py-4" hover={false}>
              <div className="text-3xl font-bold text-accent mb-1">{acceptedCount}</div>
              <div className="text-sm text-white/60">Accepted</div>
            </GlassCard>
            <GlassCard className="text-center py-4" hover={false}>
              <div className="text-3xl font-bold text-primary mb-1">{requests.length}</div>
              <div className="text-sm text-white/60">Total</div>
            </GlassCard>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {(["all", "pending", "accepted", "rejected"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 rounded-lg font-medium capitalize transition-all whitespace-nowrap ${
                  filter === tab 
                    ? "gradient-primary text-white" 
                    : "glass text-white/60 hover:text-white"
                }`}
              >
                {tab} {tab === "pending" && pendingCount > 0 && `(${pendingCount})`}
              </button>
            ))}
          </div>

          {/* Requests List */}
          <div className="space-y-4">
            {filteredRequests.length === 0 ? (
              <GlassCard className="text-center py-12" hover={false}>
                <Clock className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white/60">No {filter} requests</h3>
                <p className="text-white/40 text-sm">Check back later for new swap requests!</p>
              </GlassCard>
            ) : (
              filteredRequests.map(request => (
                <GlassCard 
                  key={request.id}
                  className={`${
                    request.status === "accepted" ? "border-accent/30" :
                    request.status === "rejected" ? "border-destructive/30 opacity-60" : ""
                  }`}
                  hover={request.status === "pending"}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    {/* User Info */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="w-14 h-14 rounded-full gradient-accent flex items-center justify-center text-lg font-bold text-background">
                        {request.user.avatar}
                      </div>
                      <div className="sm:hidden">
                        <h3 className="font-semibold text-white">{request.user.name}</h3>
                        <div className="flex items-center gap-2 text-white/50 text-sm">
                          <MapPin className="w-3 h-3" />
                          {request.user.location}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="hidden sm:block mb-2">
                        <h3 className="font-semibold text-white">{request.user.name}</h3>
                        <div className="flex items-center gap-3 text-white/50 text-sm">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {request.user.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <StarRating rating={Math.floor(request.user.rating)} size="sm" />
                            {request.user.rating}
                          </span>
                        </div>
                      </div>

                      {/* Skill Exchange */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <SkillBadge skill={request.theyOffer} variant="accent" />
                        <ArrowRightLeft className="w-4 h-4 text-white/40" />
                        <SkillBadge skill={request.theyWant} variant="primary" />
                      </div>

                      {/* Message */}
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-background/30 mb-3">
                        <MessageSquare className="w-4 h-4 text-white/40 flex-shrink-0 mt-0.5" />
                        <p className="text-white/70 text-sm">{request.message}</p>
                      </div>

                      {/* Footer */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-white/40 text-sm">
                          <Calendar className="w-4 h-4" />
                          {request.timestamp}
                        </div>

                        {request.status === "pending" ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleReject(request.id)}
                              className="flex-1 sm:flex-none px-4 py-2 rounded-lg font-medium text-destructive border border-destructive/30 hover:bg-destructive/10 transition-all flex items-center justify-center gap-2"
                            >
                              <X className="w-4 h-4" />
                              Decline
                            </button>
                            <button
                              onClick={() => handleAccept(request.id)}
                              className="flex-1 sm:flex-none px-4 py-2 rounded-lg font-medium gradient-accent text-background hover:opacity-90 transition-all flex items-center justify-center gap-2"
                            >
                              <Check className="w-4 h-4" />
                              Accept
                            </button>
                          </div>
                        ) : (
                          <span className={`px-4 py-2 rounded-lg font-medium capitalize ${
                            request.status === "accepted" 
                              ? "bg-accent/20 text-accent" 
                              : "bg-destructive/20 text-destructive"
                          }`}>
                            {request.status}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
