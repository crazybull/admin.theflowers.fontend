import instance from './request'

export const authApi={
  login(params){
    //登录
    return instance({url:'api/login',data:params})
  },
  getuserinfo(params){
    //通过token获取用户信息
    return instance({url:'admin/userinfo',data:params,method:'GET'})
  }
}

export const user={
  //用户相关
  getUserList(params){
    //用户列表
    return instance({url:'admin/user/list',data:params})
  },
  getUserById(params){
    //用户列表
    return instance({url:'admin/get_user_byid',data:params})
  },
  updateuserinfo(params){
    //更新用户信息
    return instance({url:'admin/updateuserinfo',data:params})
  },
  updateAvatar(params){
    //更新用户头像
    return instance({url:'admin/updateAvatar',data:params})
  }
}

export const article_cate={
  //文章分类相关
  getArticleCate(params){
    //文章分类
    return instance({url:'admin/article_cate/list',data:params})
  },
  getArticleCateById(params){
    //文章分类通过ID
    return instance({url:'admin/article_cate/get_cate_byid',data:params})
  },
  updateArticleCate(params){
    //更新分类信息
    return instance({url:'admin/article_cate/update',data:params})
  },
  addArticleCate(params){
    //新增用户信息
    return instance({url:'admin/article_cate/add',data:params})
  },
  delCateById(params){
    //删除分类信息
    return instance({url:'admin/article_cate/del',data:params})
  }
}

export const article={
  getArticles(params){
    //文章分类
    return instance({url:'admin/article/list',data:params})
  },
  getArticleById(params){
    //文章分类通过ID
    return instance({url:'admin/article/get_article_byid',data:params})
  },
  updateArticle(params){
    //更新分类信息
    return instance({url:'admin/article/update',data:params})
  },
  addArticle(params){
    //新增用户信息
    return instance({url:'admin/article/add',data:params})
  },
  delArticleById(params){
    //删除分类信息
    return instance({url:'admin/article/del',data:params})
  }
}