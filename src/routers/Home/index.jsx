import { FileOutlined, PieChartOutlined, UserOutlined,DesktopOutlined,TeamOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import { useState,useEffect } from 'react';
import {authApi} from '@/service/webApi';
import HeaderModule from '@/components/Header';

const { Content, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];
const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  useEffect(()=>{
    getAuth();
  },[])
  const getAuth=async ()=>{
    const res=await authApi.getuserinfo();
    if(res.status===0&&res.data){
      setUserInfo(res.data)
    }
  }
  
  return (
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <HeaderModule data={userInfo}/>
        <Layout>
          <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <Menu defaultSelectedKeys={['1']} mode="inline" items={items} />
          </Sider>
          <Content
            style={{
              margin: '0 16px',
            }}
          >
            <Breadcrumb
              style={{
                margin: '16px 0',
              }}
              items={[
                {
                  title: 'Home',
                },
                {
                  title: <a href="">Application Center</a>,
                },
                {
                  title: <a href="">Application List</a>,
                },
                {
                  title: 'An Application',
                },
              ]}
            />
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: '#fff',
              }}
            >
              Bill is a cat.
            </div>
          </Content>
        </Layout>
      </Layout>
  );
};
export default Home;