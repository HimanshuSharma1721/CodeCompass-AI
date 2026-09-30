import { Star } from "lucide-react"

interface SkillBadgeProps {
  skill: string
  variant?: "primary" | "accent" | "secondary"
}

export function SkillBadge({ skill, variant = "primary" }: SkillBadgeProps) {
  const variants = {
    primary: "bg-primary/20 text-primary border-primary/30",
    accent: "bg-accent/20 text-accent border-accent/30",
    secondary: "bg-secondary/20 text-secondary border-secondary/30"
  }

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${variants[variant]}`}>
      {skill}
    </span>
  )
}

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
}

export function StarRating({ rating, maxRating = 5, size = "md" }: StarRatingProps) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  }

  return (
    <div className="flex gap-1">
      {Array.from({ length: maxRating }).map((_, index) => (
        <Star
          key={index}
          className={`${sizes[size]} ${
            index < rating 
              ? "text-secondary fill-secondary" 
              : "text-muted-foreground"
          }`}
        />
      ))}
    </div>
  )
}

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({ children, className = "", hover = true }: GlassCardProps) {
  return (
    <div className={`glass rounded-2xl p-6 ${hover ? "hover:border-primary/30 transition-all duration-300" : ""} ${className}`}>
      {children}
    </div>
  )
}
