import { Consumer, Kafka } from 'kafkajs'
import { completeClientRegistration } from '../ClientService'

class ConsumerService {
  private consumer: Consumer

  constructor() {
    const kafka = new Kafka({
      clientId: 'luby-cash-api-consumer',
      brokers: ['kafka:29092'],
    })
    this.consumer = kafka.consumer({ groupId: 'luby-cash-api' })
  }

  public async consume(topic: string) {
    await this.consumer.connect()
    await this.consumer.subscribe({ topic, fromBeginning: false })
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        if (message.value) {
          await completeClientRegistration(JSON.parse(message.value.toString()).content.user)
        }
      },
    })
  }
}

export default ConsumerService
