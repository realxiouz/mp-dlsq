export async function getWxAuthSetting(str) {
  let { authSetting } = await wx.getSetting()

  let isRequired = authSetting.hasOwnProperty(`scope.${str}`)

  if (isRequired) {
    return {
      isRequired,
      isAllowed: authSetting[`scope.${str}`]
    }
  }

  return {
    isRequired: false,
    isAllowed: false
  }
}