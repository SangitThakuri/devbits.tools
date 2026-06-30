export interface RegexState {
  pattern: string
  flags: string
  testText: string
}

export interface MatchResult {
  full: string
  groups: string[]
  index: number
}
