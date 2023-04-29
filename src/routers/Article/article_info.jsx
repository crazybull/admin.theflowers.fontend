/**
 * 文章详细页和增加文章页
 */
import React,{useState,useEffect} from 'react';
import {Button,message,Input,Form,Radio,Select } from 'antd';
import {useParams,useLocation} from "react-router";  
import {article,article_cate} from '@/service/webApi';
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

function ArticleInfo(){
    let type="";
    const paramsObj = useParams();
    const location = useLocation();
    console.log(location);
    if(location?.state?.type){
        type="add"
    }
    const [list,setList]=useState([]);
    const [currentCateObj,setCurrentCateObj]=useState(null)
    const [form] = Form.useForm();
    const onFinish = async(values) => {
         //提交表单
        if(type!=='add'){
            const params=Object.assign({id:paramsObj.id}, values)
            const res=await article.updateArticle(params);
            if(res.status===0&&res.data){
                message.success("更新成功")
            }else{
                message.error("更新失败,"+res.message);
            }
        }else{
            const params=Object.assign(values)
            const res=await article.addArticle(params);
            if(res.status===0&&res.data){
                message.success("添加成功")
            }else{
                message.error("添加失败,"+res.message);
            }
        }
        
    };
    useEffect(() =>{
        getData();//请求数据
    },[paramsObj.id])
    const getData= async ()=>{
        const res=await article_cate.getArticleCate();
        if(res.status===0&&res.data){
            setList(res.data.list);
            if(paramsObj&&paramsObj.id&&parseInt(paramsObj.id)){
                //走更新路线
                const currentCateData=res.data.list.filter((item)=>item.id==paramsObj.id)
                if(currentCateData.length>0){
                    setCurrentCateObj(currentCateData[0])
                    form.setFieldsValue(currentCateData[0]);//把数据通过form.item的name填到相关的表单字段里去
                }
            }else{
                if(type!=='add') message.info('请求出错')
            }
        }else{
            message.info('请求出错')
        }
    }
    return (
        <div className="userInfo-con">
        <h3 className="title-h3">文章详情</h3>
        <div className="userinfo-main">
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
                {type!=='add'&&<Form.Item label="文章ID">
                    <span className="ant-form-text">{paramsObj.id}</span>
                </Form.Item>}
                <Form.Item label="标题"  name="title" >
                    <Input/>
                </Form.Item>
                <Form.Item label="一级分类" name="cate_first_id" >
                    <Select
                        style={{
                            width: 120,
                        }}
                        options={list.map((item) => ({
                            label: item.alias,
                            value: item.id,
                        }))}
                    />
                </Form.Item>
                <Form.Item label="二级分类" name="cate_second_id" >
                    <Select
                        style={{
                            width: 120,
                        }}
                        options={[{label:'无父类',value:'0'},...list.map((item) => ({
                            label: item.alias,
                            value: item.id,
                        }))]}
                    />
                </Form.Item>
                
                <Form.Item label="内容"  name="content" >
                    <Input/>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">{type==='add'?'新增分类':'更新分类'}提交</Button>
                </Form.Item>
            </Form>
            </div>
        </div>
    </div>
    )
};
export default ArticleInfo;