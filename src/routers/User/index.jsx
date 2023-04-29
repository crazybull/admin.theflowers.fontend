/**
 * 用户列表
 */
import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { Table,Button } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import {user} from '@/service/webApi';
import {role,status} from '@/config'
const { Search } = Input;

function User(){
    const [list,setList]=useState([]);//列表数据
    const [total,setTotal]=useState([]);//列表总数
    const [pageNo,setPageNo]=useState(0);//列表页码
    const [keyword,setKeyword]=useState("");//关键词
    const navigate = useNavigate();
    const columns= [
        {
            title: '姓名',
            dataIndex: 'username',
            width:200,
        },
        {
            title: '昵称',
            dataIndex: 'nickname',
            width:200,
        },
        {
            title: '邮箱',
            dataIndex: 'email',
        },
        {
            title: '角色',
            dataIndex: 'role',
            width:150,
            render:(text,record)=>role[text]
        },
        {
            title: '状态',
            dataIndex: 'status',
            width:100,
            render:(text,record)=>status[text]
        },
        {
            title: '操作',
            dataIndex: 'id',
            width:240,
            render: (text,record)=>{
                return (
                    <div className="btn-operation">
                        <Button onClick={()=>{showUserDetail(record.id)}} type="primary" size={'small'}>查看</Button>
                        <Button onClick={()=>{shutupuser(record.id)}} type="primary" size={'small'} danger>禁言</Button>
                        <Button onClick={()=>{deluser(record.id)}} type="primary" size={'small'} danger>删除</Button>
                    </div>
                )
            }
        }
    ];
    const showUserDetail=(id)=>{
        if(id&&parseInt(id)){
            navigate('/home/user/'+id)
        }else{
            message.error("id不合法")
        }
    }
    const shutupuser=()=>{
    
    }
    const deluser=()=>{
    
    }
    const onSearch=(value)=>{
        //关键词搜索
        setKeyword(value);
        setPageNo(0);
    }
    const onChange=(e)=>{
        //翻页函数
        const pageno=parseInt(e)?parseInt(e)-1:0
        setPageNo(pageno)
    }
    useEffect(() =>{
        getData();//请求数据
    },[pageNo,keyword])
    const getData= async ()=>{
        const params={
            pageNo,
            pageSize:10,
            keyword
        }
        const res=await user.getUserList(params);
        if(res.status===0&&res.data){
            setTotal(res.data.total);
            setList(res.data.list);
        }
    }
    return (
        <>
            <div className="filter-tab">
            <Search
                style={{
                    width: 300,
                }}
                placeholder="输入用户名"
                allowClear
                enterButton="搜索"
                size="small"
                onSearch={onSearch}
            />
            </div>
            <Table dataSource={list} rowKey={'id'} columns={columns} pagination={{total:total,onChange}} />
        </>
    )
};
export default User;