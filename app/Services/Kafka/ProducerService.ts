import Producer from 'App/Services/kafka/KafkaService'

export default class ProducerService {
  public async produceTopicForgotPassword(user: any) {
    this.sendToTopic('forgot_password', { user })
  }

  public async produceTopicTransferMade(transfer: any) {
    this.sendToTopic('transfer_made', { transfer })
  }

  public async produceTopicCustomerRegistration(user: any) {
    this.sendToTopic('customer_registration', { user })
  }

  private async sendToTopic(topic: string, content: {}) {
    const message = { content }
    await new Producer().send(topic.toString(), [{ value: JSON.stringify(message) }])
  }
}
