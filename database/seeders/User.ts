import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Database from '@ioc:Adonis/Lucid/Database'
import Hash from '@ioc:Adonis/Core/Hash'
import Env from '@ioc:Adonis/Core/Env'
import { v4 as uuidv4 } from 'uuid'
import { dateTimeNow } from '../../app/Services/Luxon'

export default class extends BaseSeeder {
  public async run () {
    await Database.table('users').insert({
      id: uuidv4(),
      email: 'masqueibericos@outlook.es',
      password: await Hash.make(Env.get('ADMIN_PASSWORD')),
      created_at: dateTimeNow(),
      updated_at: dateTimeNow(),
    })
  }
}
