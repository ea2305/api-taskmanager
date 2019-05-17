'use strict'

const Logger = use('Logger')
const Mail = use('Mail')
const Env = use('Env')

const Auth = exports = module.exports = {}

Auth.restoreRequest = async (data) => {
  try {
    await Mail.send('restorepassword', data, (message) => {
      message.to(data.email)
      message.from(`${Env.get('MAIL_APP_NAME')} <${Env.get('MAIL_APP_EMAIL')}>`)
      message.subject('Restore password')
    })
  } catch (error) {
    Logger.info('[Password] can not send email')
  }
}
