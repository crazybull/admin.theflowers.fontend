import { Layout,Menu } from 'antd';
import { useState } from 'react';
import { NavItems } from '@/config/nav'

const { Sider} = Layout;
function LeftNav(){
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <Menu defaultSelectedKeys={['1']} mode="inline" items={NavItems} />
        </Sider>
    )
};
export default LeftNav;