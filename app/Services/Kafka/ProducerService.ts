import Producer from 'App/Services/kafka/KafkaService'

export default class ProducerService {
  public async produceTopicCustomerRegistration(user: any) {
    this.sendToTopic('customer_registration', { user })
  }

  private async sendToTopic(topic: string, content: {}) {
    const message = { content }
    await new Producer().send(topic.toString(), [{ value: JSON.stringify(message) }])
  }
}