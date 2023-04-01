import { Layout } from 'antd';
import { useState,useEffect } from 'react';
import {authApi} from '@/service/webApi';
import {Outlet} from 'react-router-dom';
import HeaderModule from '@/components/Header';
import LeftNav from '@/components/LeftNav';
import './home.less'
const { Content, Sider } = Layout;

const Home = () => {
  const [userInfo, setUserInfo] = useState({});
  useEffect(()=>{
    getAuth();//获取用户信息
  },[])
  const getAuth=async ()=>{
    const res=await authApi.getuserinfo();
    if(res.status===0&&res.data){
      setUserInfo(res.data);
    }
  }
  
  return (
      <Layout
        style={{
          height: '100%',
        }}
      >
        <HeaderModule data={userInfo}/>
        <Layout>
          <LeftNav/>
          <Content style={{padding: '16px'}}>
            <div className="home-container">
              <Outlet/>
            </div>
          </Content>
        </Layout>
      </Layout>
  );
};
export default Home;