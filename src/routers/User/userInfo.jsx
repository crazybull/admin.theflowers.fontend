/**
 * 用户个人信息页
 */
import React,{useState,useEffect,useMemo} from 'react';
import { Upload,Button,message,Input,Form,Radio,Select } from 'antd';
import {useParams } from "react-router";  
import { PlusOutlined,LoadingOutlined } from '@ant-design/icons';
import {user} from '@/service/webApi';
import provinces from "china-division/dist/provinces";
import cities from "china-division/dist/cities";
const { TextArea} = Input;
const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        span: 14,
        offset: 6,
    },
};

const getBase64 = (img, callback) => {
    console.log(img);
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

function UserInfo(){
    const paramsObj = useParams();
    const [loading, setLoading] = useState(false); 
    const [imageUrl, setImageUrl] = useState('');
    const [userInfoObj,setUserInfoObj]=useState({});//用户接口数据
    const [form] = Form.useForm();
    const [selProv, setSelProv] = useState("");//省份code
    const handleProvinceChange = (value) => {
        //省份改变时
        const selProArr=provinces.filter((item)=>item.name==value);
        if(selProArr&&selProArr.length===1){
            setSelProv(selProArr[0].code);
        }
    };
    const onCityChange = (value) => {
        console.log(value);
    };

    const onFinish = async(values) => {
         //提交表单
        const params=Object.assign({id:paramsObj.id}, values)
        const res=await user.updateuserinfo(params);
        if(res.status===0&&res.data){
            message.success("更新成功")
        }else{
            message.error("更新失败,"+res.message);
        }
    };
    const onChange = (e) => {
        console.log('Change:', e.target.value);
    };
    const uploadButton = (
    <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div
        style={{
            marginTop: 8,
        }}
        >
        上传头像
        </div>
    </div>
    );
    useEffect(() =>{
        getData();//请求数据
    },[paramsObj.id])
    const getData= async ()=>{
        if(paramsObj&&paramsObj.id&&parseInt(paramsObj.id)){
            const res=await user.getUserById(paramsObj);
            if(res.status===0&&res.data){
                form.setFieldsValue(res.data);//把数据通过form.item的name填到相关的表单字段里去
                if(res.data.province){
                    //拿到数据库的省份，转成code， 再拿下面城市的数组
                    const selProArr=provinces.filter((item)=>item.name==res.data.province);
                    if(selProArr&&selProArr.length===1){
                        setSelProv(selProArr[0].code);
                    }
                }
                setImageUrl(res.data.user_pic)
                setUserInfoObj(res.data);
            }else{
                setUserInfoObj({});
            }
        }else{
            message.info('请求出错')
        }
    }
    const onSuccess=async (value)=>{
        const params=Object.assign({id:paramsObj.id}, {user_pic:value})
        const res=await user.updateAvatar(params);
        if(res.status===0&&res.data){
            message.success("更新成功")
        }else{
            message.error("更新失败,"+res.message);
        }
    }
    const customRequest =  params => {
        const { file, onSuccess, onError } = params;
        const formData = new FormData();
        formData.append('upload_file', file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend =async function(e) {
            console.log(e.target.result);// 打印图片的base64
            if (e && e.target && e.target.result) {
                setImageUrl(e.target.result);
                onSuccess(e.target.result);
            }
        };
    }
    return (
        <div className="userInfo-con">
        <h3 className="title-h3">用户信息</h3>
        <div className="userinfo-main">
            <div className="userInfo-avatar">
                <Upload
                    customRequest={customRequest}
                    listType="picture-circle"
                    accept="*/*"
                    method='POST'
                    className="avatar-uploader"
                    showUploadList={false}
                    onSuccess={onSuccess}
                    beforeUpload={beforeUpload}
                >
                    {imageUrl ? (
                    <img
                        src={imageUrl}
                        className="avatar_pic"
                        alt="avatar"
                        style={{
                        width: '100%',
                        }}
                    />
                    ) : (
                    uploadButton
                    )}
                </Upload>
            </div>
            <div className="userinfo-info">
            <Form
                form={form}
                name="form-info"
                {...formItemLayout}
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                }}
            >
                <Form.Item label="账户名">
                    <span className="ant-form-text">{userInfoObj.username}</span>
                </Form.Item>
                <Form.Item label="昵称"  name="nickname" >
                    <Input/>
                </Form.Item>
                <Form.Item label="邮箱"  name="email" >
                    <Input/>
                </Form.Item>
                <Form.Item label="性别" name="sex"  >
                    <Radio.Group>
                        <Radio value={0}>男</Radio>
                        <Radio value={1}>女</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="个人简介" name="introduction"  >
                        <TextArea showCount maxLength={100} onChange={onChange} />
                </Form.Item>
                <Form.Item label="省份" name="province" >
                    <Select
                        style={{
                            width: 120,
                        }}
                        onChange={handleProvinceChange}
                        options={provinces.map((item) => ({
                            label: item.name,
                            value: item.name,
                        }))}
                    />
                </Form.Item>
                <Form.Item label="城市" name="city" >
                    <Select
                        style={{
                            width: 120,
                        }}
                        disabled={(userInfoObj.province||selProv)?false:true}
                        onChange={onCityChange}
                        options={cities.filter((item) => item.provinceCode===selProv).map((eachitem)=>({label: eachitem.name,value: eachitem.name}))}
                    />
                </Form.Item>
                <Form.Item label="地址"  name="addr" >
                    <Input/>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">提交</Button>
                </Form.Item>
            </Form>
            </div>
        </div>
    </div>
    )
};
export default UserInfo;