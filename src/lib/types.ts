import type { LucideIcon } from 'lucide-react'

export type DemoCategory = 'Security AI' | 'Voice AI' | 'Revenue AI' | 'Creative Systems'

export type Demo = {
  slug: string
  title: string
  url: string
  category: DemoCategory
  purpose: string
}

export type SkillGroup = {
  title: string
  description: string
  skills: string[]
}

export type SystemStep = {
  title: string
  body: string
}

export type EvidenceItem = {
  label: string
  method: string
  status: string
}

export type IconComponent = LucideIcon
