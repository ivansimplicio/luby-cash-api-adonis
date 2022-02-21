const getOnlyAdminInfo = (data: any) => {
  const { id, email, roles } = data
  const fullName = data['full_name'] || data['fullName']
  const createdAt = data['created_at']
  const updatedAt = data['updated_at']
  return { roles, id, fullName, email, createdAt, updatedAt }
}

export { getOnlyAdminInfo }
