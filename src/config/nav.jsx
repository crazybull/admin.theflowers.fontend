import {UserOutlined,SettingOutlined,ClusterOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
export const NavItems = [
    {
    key: "/home",
    icon: <UserOutlined/>,
    label: <Link to="/home">概览</Link>
}, {
    key: "/home/user",
    icon: <UserOutlined/>,
    label: "用户管理",
    children: [{
        key: "/home/user/list",
        label: <Link to="/home/user/list">成员管理</Link>
    }]
}, {
    key: "/home/article",
    icon: <ClusterOutlined/>,
    label: "文章管理",
    children: [{
        key: "/home/article_cate/list",
        label: <Link to="/home/article_cate/list">文章类别</Link>
    },{
        key: "/home/article/list",
        label: <Link to="/home/article/list">文章列表</Link>
    }]
},{
    key: "/home/setting",
    icon: <SettingOutlined/>,
    label: <Link to="/home/setting">个人中心</Link>
}]