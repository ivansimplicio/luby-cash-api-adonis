const getOnlyAdminInfo = (data: any) => {
  const { id, name, email, roles } = data
  const createdAt = data['created_at']
  const updatedAt = data['updated_at']
  return { roles, id, name, email, createdAt, updatedAt }
}

export { getOnlyAdminInfo }
