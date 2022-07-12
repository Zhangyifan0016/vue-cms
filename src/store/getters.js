const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  menuList: (state) => state.user.menuList,
  tagsView: (state) => state.tagsView.tagsView
}
export default getters
