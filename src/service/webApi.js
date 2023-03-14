import instance from './request'

export const getuserinfo=(params)=>{
    return instance({
      url:'admin/userinfo',
      params
    })
}
