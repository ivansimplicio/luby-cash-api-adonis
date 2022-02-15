import User from 'App/Models/User'
import Bouncer from '@ioc:Adonis/Addons/Bouncer'

export const { actions } = Bouncer.define(
  'userHasAccess',
  (authenticatedUser: User, user: User) => {
    return authenticatedUser.id === user.id
  }
)

export const { policies } = Bouncer.registerPolicies({})
