export function generateEndHours(availableHours: string[], timeFrom: string) {
  const startIndex = availableHours.indexOf(timeFrom)

  if (startIndex === -1) return []

  const endHours: string[] = []

  for (let i = startIndex + 1; i < availableHours.length; i++) {
    if (
      timeToMinutes(availableHours[i]) !==
      timeToMinutes(availableHours[i - 1]) + 15
    ) {
      const lastAvailableHour = timeToMinutes(availableHours[i - 1]) + 15
      const lastAvailableHourFormat = minutesToTime(lastAvailableHour)
      endHours.push(lastAvailableHourFormat)
      break
    }
    endHours.push(availableHours[i])
  }

  return endHours
}

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
}
