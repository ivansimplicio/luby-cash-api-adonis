import { Kafka, Producer, Message } from 'kafkajs'

export default class KafkaService {
  private producer: Producer

  constructor() {
    this.producer = new Kafka({
      clientId: 'luby-cash-ms-producer',
      brokers: ['kafka:29092'],
    }).producer()
  }

  public async send(topic: string, messages: Message[]) {
    await this.producer.connect()
    await this.producer.send({
      topic,
      messages,
    })
    await this.producer.disconnect()
  }
}
