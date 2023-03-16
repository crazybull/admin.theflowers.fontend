import { Layout } from 'antd';
const { Header} = Layout;
import './header.less';

function HeaderModule(props){
    return (
        <Header className='header-module'/>
    )
};
export default HeaderModule;