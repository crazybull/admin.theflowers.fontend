/**
 * 用户个人信息页
 */
import React,{useState,useEffect} from 'react';
import { Upload,Button,message,Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {user} from '@/service/webApi';
import {role,status} from '@/config'
const { Search } = Input;

const getBase64 = (img, callback) => {
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
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
    useEffect(() =>{
        getData();//请求数据
    },[])
    const getData= async ()=>{
        const params={
        }
        const res=await user.getUserList(params);
        if(res.status===0&&res.data){
            setTotal(res.data.total);
            setList(res.data.list);
        }
    }
    return (
        <div className="userInfo-con">
            <h3 className="title-h3">用户信息</h3>
            <div className="userInfo-avatar">
                <Upload
                    name="avatar"
                    listType="picture-circle"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                >
                    {imageUrl ? (
                    <img
                        src={imageUrl}
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

            </div>
        </div>
    )
};
export default UserInfo;