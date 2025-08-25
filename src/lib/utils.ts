import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function formatDuration(hours: number): string {
  if (hours < 1) {
    return `${Math.round(hours * 60)} minutes`
  }
  if (hours === 1) {
    return '1 hour'
  }
  return `${hours} hours`
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text
  }
  return text.slice(0, maxLength) + '...'
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function calculateRating(rating: number): string {
  return rating.toFixed(1)
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'Food & Nutrition': 'bg-orange-100 text-orange-800',
    'Education': 'bg-blue-100 text-blue-800',
    'Environment': 'bg-green-100 text-green-800',
    'Social Services': 'bg-purple-100 text-purple-800',
    'Animal Welfare': 'bg-pink-100 text-pink-800',
    'Healthcare': 'bg-red-100 text-red-800',
    'Community Development': 'bg-indigo-100 text-indigo-800',
    'Arts & Culture': 'bg-yellow-100 text-yellow-800'
  }
  
  return colors[category] || 'bg-gray-100 text-gray-800'
}
