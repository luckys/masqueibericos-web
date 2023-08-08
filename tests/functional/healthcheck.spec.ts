import { test } from '@japa/runner'

test('Home page loads ok', async ({ client }) => {
  const response = await client.get('/')

  response.assertStatus(200)
  response.assertTextIncludes('<h1 class="mb-5">Disfruta de nuestros servicios</h1>')
})
