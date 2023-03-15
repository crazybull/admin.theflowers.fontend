import instance from './request'

export const authApi={
  login(params){
    return instance({url:'api/login',data:params})
  },
  getuserinfo(params){
    return instance({url:'admin/userinfo',data:params,method:'GET'})
  }
}