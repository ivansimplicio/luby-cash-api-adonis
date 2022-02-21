import Roles from 'App/Enums/Roles'
import User from 'App/Models/User'
import axios from 'axios'

const completeClientRegistration = async (client: any) => {
  const user = await User.findByOrFail('cpfNumber', client.cpfNumber)
  await user.merge(client).save()
}

const findClientByCPF = async (cpf: string) => {
  const result = await axios.get(`${process.env.MS_HOST}/ms/clients/${cpf}`)
  return result.data.client
}

const allClients = async (params: any) => {
  const clients = await User.query()
    .whereHas('roles', (query) => {
      query.where('roleId', '=', Roles.CLIENT)
    })
    .andWhere((query) => {
      if (params.status) query.where('status', '=', params.status)
      if (params.from) query.andWhere('createdAt', '>=', params.from)
      if (params.to) query.andWhere('createdAt', '<=', `${params.to}T23:59:59`)
    })
  return clients
}

export { allClients }
export { findClientByCPF }
export { completeClientRegistration }
