import { Layout } from 'antd';
const { Header} = Layout;
import logo from '@/assets/images/logo.png'
import {Link} from 'react-router-dom';
import './header.less';

function HeaderModule({data}){
    return (
        <Header className='header-module'>
            <div className='header-logo'>
                <Link to={"/home"}><img src={logo} height={42} /></Link>
            </div>
            <div className='header-userinfo'>
                <span>{data.username}</span>
            </div>
        </Header>
    )
};
export default HeaderModule;