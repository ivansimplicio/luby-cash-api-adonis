import { validator } from '@ioc:Adonis/Core/Validator'

validator.rule('cpfIsValid', (value, _, options) => {
  const cpfFormat = /^(?:\d{3}).(?:\d{3}).(?:\d{3})-(?:\d{2})$/

  if (!cpfFormat.test(value)) {
    options.errorReporter.report(
      options.pointer,
      'cpfFormat',
      'CPF with invalid format. Follow the xxx.xxx.xxx-xx pattern.',
      options.arrayExpressionPointer
    )
  }
})
