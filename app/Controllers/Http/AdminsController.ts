import UserRoles from 'App/Models/UserRoles'
import Roles from 'App/Enums/Roles'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { getOnlyAdminInfo } from 'App/Services/AdminService'
import CreateAdmin from 'App/Validators/CreateAdminValidator'
import UpdateAdmin from 'App/Validators/UpdateAdminValidator'
import { loadUserRoles } from 'App/Services/UserService'

export default class AdminsController {
  public async index({ response }: HttpContextContract) {
    const queryResult = await User.query().whereHas('roles', (query) => {
      query.where('roleId', '=', Roles.ADMIN)
    })
    const admins = queryResult.map((elem) => getOnlyAdminInfo(elem))
    return response.ok({ admins })
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateAdmin)
    const admin = await User.create(payload)
    await UserRoles.create({ userId: admin.id, roleId: Roles.ADMIN })
    return response.created()
  }

  public async show({ response, params }: HttpContextContract) {
    const admin = await User.query()
      .where('id', '=', params.id)
      .whereHas('roles', (query) => {
        query.where('roleId', '=', Roles.ADMIN)
      })
      .first()
    if (!admin) {
      return response.notFound()
    }
    const result = await loadUserRoles(admin)
    return response.ok(getOnlyAdminInfo(result))
  }

  public async update({ request, response, params, bouncer }: HttpContextContract) {
    const admin = await User.find(params.id)
    if (!admin) {
      return response.notFound()
    }
    await bouncer.authorize('userHasAccess', admin)
    const payload = await request.validate(UpdateAdmin)
    const updatedAdmin = await admin.merge(payload).save()
    const result = await loadUserRoles(updatedAdmin)
    return response.ok(getOnlyAdminInfo(result))
  }

  public async destroy({ response, params, bouncer }: HttpContextContract) {
    const admin = await User.find(params.id)
    if (!admin) {
      return response.notFound()
    }
    await bouncer.authorize('userHasAccess', admin)
    await admin.delete()
    return response.noContent()
  }
}
