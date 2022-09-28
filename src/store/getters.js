const getters = {
    isCollapse: state => state.common.isCollapse,
    token: state => state.user.token,
    historyRoutes: state => state.routes.historyRoutes
  }
  export default getters