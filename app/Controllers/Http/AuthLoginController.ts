import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthLoginController {
  public async store({ request, response, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const remember = request.input('rememberme')

    try {
      await auth.use('web').attempt(email, password, remember)
      response.redirect('/admin/dashboard')
    } catch {
      return response.badRequest('El email o la contraseña son incorrectos.')
    }
  }
}
