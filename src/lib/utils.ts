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
    'Food & Nutrition': 'bg-orange-100 dark:bg-orange-800/30 text-orange-800 dark:text-orange-200',
    'Education': 'bg-blue-100 dark:bg-blue-800/30 text-blue-800 dark:text-blue-200',
    'Environment': 'bg-green-100 dark:bg-green-800/30 text-green-800 dark:text-green-200',
    'Social Services': 'bg-purple-100 dark:bg-purple-800/30 text-purple-800 dark:text-purple-200',
    'Animal Welfare': 'bg-pink-100 dark:bg-pink-800/30 text-pink-800 dark:text-pink-200',
    'Healthcare': 'bg-red-100 dark:bg-red-800/30 text-red-800 dark:text-red-200',
    'Community Development': 'bg-indigo-100 dark:bg-indigo-800/30 text-indigo-800 dark:text-indigo-200',
    'Arts & Culture': 'bg-yellow-100 dark:bg-yellow-800/30 text-yellow-800 dark:text-yellow-200'
  }

  return colors[category] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
}
