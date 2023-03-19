import { Layout } from 'antd';
import { Dropdown, Space } from 'antd';
import logo from '@/assets/images/logo.png'
import {Link} from 'react-router-dom';
import {
    UserOutlined,SettingOutlined,LoginOutlined
  } from '@ant-design/icons';
import './header.less';
const { Header} = Layout;

const items = [
    {
      label: '个人中心',
      key: '1',
      icon: <UserOutlined />,
    },
    {
      label: '个人设置',
      key: '2',
      icon: <SettingOutlined />,
    },
    {
        type: 'divider',
    },
    {
      label: '退出登录',
      key: '3',
      icon: <LoginOutlined />,
    }
];

function HeaderModule({data}){
    return (
        <Header className='header-module'>
            <div className='header-logo'>
                <Link to={"/home"}><img src={logo} height={42} /></Link>
            </div>
            <div className='header-userinfo'>
                <Dropdown menu={{items}} overlayClassName={"header-userinfo-dropdown"}>
                    <a onClick={(e) => e.preventDefault()}>
                    <Space>
                       您好，{data.username}
                    </Space>
                    </a>
                </Dropdown>
            </div>
        </Header>
    )
};
export default HeaderModule;