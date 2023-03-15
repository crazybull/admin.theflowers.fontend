import { Button, Checkbox, Form, Input, message } from 'antd';
import {useNavigate} from 'react-router-dom'
import {authApi} from '@/service/webApi';
import './login.less';

function Login(props){
    const navigate=useNavigate();
    const onFinish = async (values) => {
        console.log('Success:', values);
        const res=await authApi.login(values);
        if(res?.status===0&&res.token){
            localStorage.setItem("token",res.token);
            navigate('/home')
        }else{
            message.error("登录失败")
        }
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        message.error("登录失败")
    }
    return (
        <div className="login_module">
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                className="login_from"
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
            <Form.Item label="用户名" name="username" rules={[{required: true,message: '请输入用户名!'}]}>
                <Input />
            </Form.Item>

            <Form.Item label="密码" name="password" rules={[{required: true,message: '请输入密码!'}]}>
                <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{offset: 8,span: 16,}}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 8,span: 16,}}>
                <Button type="primary" htmlType="submit">提交</Button>
            </Form.Item>
            </Form>
        </div>
    )
};
export default Login;