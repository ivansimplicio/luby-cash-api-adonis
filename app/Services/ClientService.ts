import User from 'App/Models/User'
import axios from 'axios'

const completeClientRegistration = async (client: any) => {
  const user = await User.findByOrFail('cpf', client.cpf)
  await user.merge(client).save()
}

const findClientByCPF = async (cpf: string) => {
  const result = await axios.get(`${process.env.MS_HOST}/ms/clients/${cpf}`)
  return result.data.client
}

export { findClientByCPF }
export { completeClientRegistration }
