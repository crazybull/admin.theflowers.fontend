import instance from './request'

export const authApi={
  login(params){
    return instance({url:'api/login',data:params})
  },
  getuserinfo(params){
    return instance({url:'admin/userinfo',data:params,method:'GET'})
  }
}

export const user={
  getUserList(params){
    return instance({url:'admin/user/list',data:params})
  }
}