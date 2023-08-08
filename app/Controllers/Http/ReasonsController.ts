/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import CreateReasonValidator from 'App/Validators/CreateReasonValidator'
import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
import { string } from '@ioc:Adonis/Core/Helpers'
import { v4 as uuidv4 } from 'uuid'
import { dateTimeNow } from '../../Services/Luxon'

export default class ReasonsController {
  public async store({ request, response, session }: HttpContextContract) {
    const { email, reason_type, reason_text } = await request.validate(CreateReasonValidator)
    const reasonType = this.getReasonType(reason_type)

    await Database.table('reasons').insert({
      id: uuidv4(),
      email,
      reason_type,
      reason_text,
      created_at: dateTimeNow(),
      updated_at: dateTimeNow(),
    })

    session.flash(
      'reason_success',
      `Su ${string.capitalCase(reasonType)} se ha enviado correctamente`
    )

    const subject = `${reasonType} de un cliente`

    await Mail.sendLater((message) => {
      message
        .from(Env.get('MAIL_FROM'))
        .to(Env.get('MAIL_TO'))
        .subject(subject)
        .htmlView('emails/reason_created', {
          email,
          reason_type: string.capitalCase(reasonType),
          reason_text,
        })
    })

    response.redirect().toPath('/#reason-form')
  }

  private getReasonType(reasonType: string): string {
    const reasonTypes = {
      suggestion: 'sugerencia',
      complaint: 'queja',
      other: 'otro',
    }

    return reasonTypes[reasonType]
  }
}
