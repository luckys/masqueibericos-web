import { DateTime } from 'luxon'

export function dateTimeNow() {
  return DateTime.local().setZone('Atlantic/Canary').setLocale('es-ES').toFormat('yyyy-MM-dd HH:mm:ss')
}

export function fromDateTime(currentDate: string) {
  return DateTime.fromISO(currentDate).toFormat('dd/MM/yyyy HH:mm')
}
