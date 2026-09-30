"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { GlassCard, SkillBadge, StarRating } from "@/components/ui-elements"
import { Star, ThumbsUp, Calendar, ArrowRightLeft, TrendingUp, Award, User } from "lucide-react"

// Mock data for the current user's ratings
const userRatings = {
  averageRating: 4.8,
  totalReviews: 24,
  totalSwaps: 32,
  ratingBreakdown: {
    5: 18,
    4: 4,
    3: 2,
    2: 0,
    1: 0
  }
}

// Mock reviews data
const reviews = [
  {
    id: 1,
    reviewer: {
      name: "Maya Rodriguez",
      avatar: "MR"
    },
    rating: 5,
    skillSwapped: { taught: "JavaScript", learned: "Music Production" },
    comment: "Alex is an amazing teacher! Super patient and explained JavaScript concepts in a way that finally made sense. Would definitely swap again!",
    date: "1 week ago",
    helpful: 12
  },
  {
    id: 2,
    reviewer: {
      name: "Jordan Kim",
      avatar: "JK"
    },
    rating: 5,
    skillSwapped: { taught: "React", learned: "Video Editing" },
    comment: "Best skill swap experience I've had! Alex really knows their stuff and made learning React enjoyable. The sessions were well-structured too.",
    date: "2 weeks ago",
    helpful: 8
  },
  {
    id: 3,
    reviewer: {
      name: "Sam Taylor",
      avatar: "ST"
    },
    rating: 4,
    skillSwapped: { taught: "TypeScript", learned: "3D Modeling" },
    comment: "Great teacher with solid knowledge. Sometimes sessions ran a bit long but the content was valuable. Recommended!",
    date: "3 weeks ago",
    helpful: 5
  },
  {
    id: 4,
    reviewer: {
      name: "Riley Johnson",
      avatar: "RJ"
    },
    rating: 5,
    skillSwapped: { taught: "UI/UX", learned: "Photography" },
    comment: "Incredibly helpful and responsive. Alex went above and beyond to help me understand UI design principles. 10/10 would recommend!",
    date: "1 month ago",
    helpful: 15
  },
  {
    id: 5,
    reviewer: {
      name: "Casey Miller",
      avatar: "CM"
    },
    rating: 4,
    skillSwapped: { taught: "JavaScript", learned: "Marketing" },
    comment: "Really good at breaking down complex topics. Learned a lot in just a few sessions. Thanks Alex!",
    date: "1 month ago",
    helpful: 3
  }
]

export default function RatingsPage() {
  const [helpfulReviews, setHelpfulReviews] = useState<number[]>([])
  const [sortBy, setSortBy] = useState<"recent" | "highest" | "helpful">("recent")

  const toggleHelpful = (reviewId: number) => {
    setHelpfulReviews(prev => 
      prev.includes(reviewId) 
        ? prev.filter(id => id !== reviewId)
        : [...prev, reviewId]
    )
  }

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "highest") return b.rating - a.rating
    if (sortBy === "helpful") return b.helpful - a.helpful
    return 0 // recent is default order
  })

  const maxRatingCount = Math.max(...Object.values(userRatings.ratingBreakdown))

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-24 pb-12 px-4">
        {/* Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-40 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Ratings & <span className="text-secondary">Reviews</span>
            </h1>
            <p className="text-white/60">See what others are saying about your skill swaps</p>
          </div>

          {/* Rating Overview */}
          <GlassCard className="mb-8" hover={false}>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Average Rating */}
              <div className="text-center md:border-r md:border-white/10">
                <div className="text-6xl font-bold text-secondary mb-2">{userRatings.averageRating}</div>
                <StarRating rating={Math.round(userRatings.averageRating)} size="lg" />
                <p className="text-white/60 mt-2">{userRatings.totalReviews} reviews</p>
              </div>

              {/* Rating Breakdown */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map(rating => (
                  <div key={rating} className="flex items-center gap-3">
                    <span className="text-sm text-white/60 w-3">{rating}</span>
                    <Star className="w-4 h-4 text-secondary fill-secondary" />
                    <div className="flex-1 h-2 rounded-full bg-background/50 overflow-hidden">
                      <div 
                        className="h-full gradient-secondary rounded-full transition-all"
                        style={{ 
                          width: `${(userRatings.ratingBreakdown[rating as keyof typeof userRatings.ratingBreakdown] / maxRatingCount) * 100}%` 
                        }}
                      />
                    </div>
                    <span className="text-sm text-white/60 w-6">
                      {userRatings.ratingBreakdown[rating as keyof typeof userRatings.ratingBreakdown]}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-xl bg-background/30">
                  <TrendingUp className="w-6 h-6 text-accent mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{userRatings.totalSwaps}</div>
                  <div className="text-xs text-white/60">Total Swaps</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-background/30">
                  <Award className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">Top 10%</div>
                  <div className="text-xs text-white/60">Skill Swapper</div>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Sort Options */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">All Reviews</h2>
            <div className="flex gap-2">
              {(["recent", "highest", "helpful"] as const).map(option => (
                <button
                  key={option}
                  onClick={() => setSortBy(option)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${
                    sortBy === option 
                      ? "gradient-primary text-white" 
                      : "glass text-white/60 hover:text-white"
                  }`}
                >
                  {option === "recent" ? "Most Recent" : option === "highest" ? "Highest Rated" : "Most Helpful"}
                </button>
              ))}
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {sortedReviews.map(review => (
              <GlassCard key={review.id}>
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full gradient-accent flex items-center justify-center text-sm font-bold text-background flex-shrink-0">
                    {review.reviewer.avatar}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-semibold text-white">{review.reviewer.name}</h3>
                        <div className="flex items-center gap-2">
                          <StarRating rating={review.rating} size="sm" />
                          <span className="text-sm text-white/40">{review.date}</span>
                        </div>
                      </div>
                      
                      {/* Skill Swapped */}
                      <div className="flex items-center gap-2 text-sm">
                        <SkillBadge skill={review.skillSwapped.taught} variant="accent" />
                        <ArrowRightLeft className="w-3 h-3 text-white/40" />
                        <SkillBadge skill={review.skillSwapped.learned} variant="primary" />
                      </div>
                    </div>

                    <p className="text-white/70 mb-4">{review.comment}</p>

                    {/* Helpful Button */}
                    <button
                      onClick={() => toggleHelpful(review.id)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ${
                        helpfulReviews.includes(review.id)
                          ? "bg-accent/20 text-accent"
                          : "bg-background/30 text-white/50 hover:text-white"
                      }`}
                    >
                      <ThumbsUp className={`w-4 h-4 ${helpfulReviews.includes(review.id) ? "fill-current" : ""}`} />
                      Helpful ({review.helpful + (helpfulReviews.includes(review.id) ? 1 : 0)})
                    </button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <button className="px-6 py-3 rounded-xl font-medium glass text-white/70 hover:text-white hover:border-primary/50 transition-all">
              Load More Reviews
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
