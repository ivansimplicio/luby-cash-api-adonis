const getOnlyAdminInfo = (data: any) => {
  const { id, name, email, roles } = data
  const createdAt = data['created_at']
  const updatedAt = data['updated_at']
  return { id, name, email, roles, createdAt, updatedAt }
}

export { getOnlyAdminInfo }
