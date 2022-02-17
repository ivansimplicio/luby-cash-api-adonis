import User from 'App/Models/User'

const completeClientRegistration = async (client: any) => {
  const user = await User.findByOrFail('cpf', client.cpf)
  await user.merge(client).save()
}

export { completeClientRegistration }
