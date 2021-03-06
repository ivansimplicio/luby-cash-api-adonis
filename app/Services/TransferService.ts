import Transfer from 'App/Models/Transfer'
import Status from 'App/Enums/Status'
import User from 'App/Models/User'
import TransactionException from 'App/Exceptions/TransactionException'
import { convertToReal } from './Utils/Converter'
import { findClientByCPF } from './ClientService'
import ProducerService from './Kafka/ProducerService'
import ClientNotFoundException from 'App/Exceptions/ClientNotFoundException'

interface TransferInterface {
  cpfOrigin: string
  cpfDestination: string
  value: number
}

const searchClientTransfers = async (cpf: string, params: any) => {
  const client = await findClientByCPF(cpf)
  if (!client) {
    throw new ClientNotFoundException()
  }
  const transfers = await Transfer.query()
    .select('cpf_origin', 'cpf_destination', 'value', 'createdAt')
    .where((query) => {
      query.where('cpf_origin', '=', cpf)
      query.orWhere('cpf_destination', '=', cpf)
    })
    .andWhere((query) => {
      if (params.from) query.andWhere('createdAt', '>=', params.from)
      if (params.to) query.andWhere('createdAt', '<=', `${params.to}T23:59:59`)
    })
  return { extract: { transfers, currentBalance: client.currentBalance } }
}

const makePixTransfer = async (transfer: TransferInterface) => {
  await validateTransaction(transfer)
  await Transfer.create(transfer)
  new ProducerService().produceTopicTransferMade(transfer)
}

const validateTransaction = async (transfer: TransferInterface) => {
  if (transfer.cpfOrigin === transfer.cpfDestination) {
    throw new TransactionException('You cannot make a transfer to yourself.')
  }
  const beneficiary = await User.findByOrFail('cpfNumber', transfer.cpfDestination)
  if (!(beneficiary.status === Status.APPROVED)) {
    throw new TransactionException('It was not possible to transfer to this CPF.')
  }
  if (transfer.value === 0) {
    throw new TransactionException('the transfer amount must be greater than 0')
  }
  const client = await findClientByCPF(transfer.cpfOrigin)
  if (transfer.value > client.currentBalance) {
    throw new TransactionException(
      `Your current balance is insufficient to carry out this transaction. Current balance: ${convertToReal(
        client.currentBalance
      )}`
    )
  }
}

export { searchClientTransfers }
export { makePixTransfer }
