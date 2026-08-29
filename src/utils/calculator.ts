import { WEEKLY_CAP, MONTHLY_BONUS, HALF_MONTHLY_BONUS } from '../data/shopItems'

export type DailySettings = {
  autoRecovery: number
  cafe: number
  gemSpending: number
  midDrink: number
  lowDrink: number
  circleEntry: boolean
  freePackage: boolean
  dailyMission: boolean
  weeklyMission: boolean
  stamPackageDays: 0 | 14 | 28 | 42 // 2weekスタミナパッケージ日数（0=なし）
  annivPackageDays: 0 | 7 | 14 | 21 | 28 | 35 // アニバーサリーAPパッケージ日数（0=なし）
  hasMonthlyBonus: boolean
  hasHalfMonthlyBonus: boolean
}

export const DEFAULT_DAILY_SETTINGS: DailySettings = {
  autoRecovery: 240,
  cafe: 739,
  gemSpending: 3,
  midDrink: 3,
  lowDrink: 3,
  circleEntry: true,
  freePackage: true,
  dailyMission: true,
  weeklyMission: true,
  stamPackageDays: 0,
  annivPackageDays: 0,
  hasMonthlyBonus: true,
  hasHalfMonthlyBonus: true,
}

export function calcDailyGain(s: DailySettings): number {
  return (
    s.autoRecovery +
    s.cafe +
    120 * s.gemSpending +
    60 * s.midDrink +
    30 * s.lowDrink +
    (s.circleEntry ? 10 : 0) +
    (s.freePackage ? 10 : 0) +
    (s.dailyMission ? 150 : 0)
  )
}

export type WeekPeriod = {
  start: Date
  end: Date
  days: number
  dailyGainTotal: number  // dailyGain × days のみ
  weeklyBonus: number     // ウィークリーミッション分
  rawGain: number         // 合計
  cap: number
  cappedGain: number
}

export type CalcResult = {
  weeks: WeekPeriod[]
  weekCap: number
  grandTotal: number
}

export function calcMonthlyAcquisition(
  year: number,
  month: number,
  resetDayOfWeek: number,
  settings: DailySettings,
  fromDate?: Date,
): CalcResult {
  const dailyGain = calcDailyGain(settings)
  const weekCap = WEEKLY_CAP
    + (settings.hasMonthlyBonus ? MONTHLY_BONUS : 0)
    + (settings.hasHalfMonthlyBonus ? HALF_MONTHLY_BONUS : 0)

  const monthStart = new Date(year, month - 1, 1)
  const monthEnd = new Date(year, month, 0)

  // 計算開始日（月途中指定時はそこから、そうでなければ月初）
  const calcStart = fromDate && fromDate > monthStart
    ? new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate())
    : new Date(monthStart)

  if (calcStart > monthEnd) return { weeks: [], weekCap, grandTotal: 0 }

  const dayOfWeek = calcStart.getDay()
  const daysToResetDay = (dayOfWeek - resetDayOfWeek + 7) % 7
  const firstPeriodStart = new Date(calcStart)
  firstPeriodStart.setDate(firstPeriodStart.getDate() - daysToResetDay)

  const weeks: WeekPeriod[] = []
  let cursor = new Date(firstPeriodStart)
  let remainingPackDays = settings.stamPackageDays
  let remainingAnnivDays = settings.annivPackageDays

  while (cursor <= monthEnd) {
    const periodEnd = new Date(cursor)
    periodEnd.setDate(periodEnd.getDate() + 6)

    const effectiveStart = cursor < calcStart ? new Date(calcStart) : new Date(cursor)
    const effectiveEnd = periodEnd > monthEnd ? new Date(monthEnd) : new Date(periodEnd)

    const days =
      Math.round((effectiveEnd.getTime() - effectiveStart.getTime()) / (1000 * 60 * 60 * 24)) + 1
    const weeklyBonus = settings.weeklyMission ? 200 : 0
    const packDaysThisWeek = Math.min(remainingPackDays, days)
    remainingPackDays -= packDaysThisWeek
    const annivDaysThisWeek = Math.min(remainingAnnivDays, days)
    remainingAnnivDays -= annivDaysThisWeek
    const dailyGainTotal = dailyGain * days + 150 * packDaysThisWeek + 160 * annivDaysThisWeek
    const rawGain = dailyGainTotal + weeklyBonus
    const cap = weekCap
    const cappedGain = Math.min(rawGain, cap)

    weeks.push({ start: effectiveStart, end: effectiveEnd, days, dailyGainTotal, weeklyBonus, rawGain, cap, cappedGain })

    cursor.setDate(cursor.getDate() + 7)
  }

  const grandTotal = weeks.reduce((sum, w) => sum + w.cappedGain, 0)
  return { weeks, weekCap, grandTotal }
}

export function formatNum(n: number): string {
  return n.toLocaleString('ja-JP')
}

export function formatDate(d: Date): string {
  return `${d.getMonth() + 1}/${d.getDate()}`
}
