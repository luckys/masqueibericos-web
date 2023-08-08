/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import CreateBookingValidator from 'App/Validators/CreateBookingValidator'
import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
import { v4 as uuidv4 } from 'uuid'
import { dateTimeNow, fromDateTime } from '../../Services/Luxon'

export default class BookingsController {
  public async store({ request, response, session }: HttpContextContract) {
    const { full_name, email, booking_at, number_of_people, special_request } =
      await request.validate(CreateBookingValidator)

    const bookingAtFormated = fromDateTime(booking_at)

    const subject = `Reserva de mesa para el ${bookingAtFormated}`

    await Database.table('bookings').insert({
      id: uuidv4(),
      full_name,
      email,
      booking_at: bookingAtFormated,
      number_of_people,
      special_request,
      created_at: dateTimeNow(),
      updated_at: dateTimeNow(),
    })

    session.flash('booking_success', 'Se ha hecho la reservación correctamente.')

    await Mail.sendLater((message) => {
      message
        .from(Env.get('MAIL_FROM'))
        .to(Env.get('MAIL_TO'))
        .subject(subject)
        .htmlView('emails/booking_created', {
          full_name,
          booking_at: bookingAtFormated,
          number_of_people,
          special_request,
        })
    })

    response.redirect().toPath('/#booking')
  }
}
