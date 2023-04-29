/**
 * 文章列表
 */
import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { Table,Button,Popconfirm,message } from 'antd';
import { Input } from 'antd';
import {article} from '@/service/webApi';
const { Search } = Input;

function ArticleList(){
    const [list,setList]=useState([]);//列表数据
    const [total,setTotal]=useState([]);//列表总数
    const [pageNo,setPageNo]=useState(0);//列表页码
    const [keyword,setKeyword]=useState("");//关键词
    const navigate = useNavigate();
    const confirm = async (id) => {
        const res=await article.delArticleById({id});
        if(res.status===0&&res.data){
            message.success("删除成功")
        }else{
            message.error("删除失败,"+res.message);
        }
        //message.success('Click on Yes');
    };
    const cancel = (e) => {
     console.log(e);
    };

    const columns= [
        {
            title: 'ID',
            dataIndex: 'id',
            width:50,
        },
        {
            title: '名称',
            dataIndex: 'title',
            width:200,
        },
        {
            title: '作者',
            dataIndex: 'username',
            width:200,
        },
        {
            title: '操作',
            dataIndex: 'id',
            width:240,
            render: (text,record)=>{
                return (
                    <div className="btn-operation">
                        <Button onClick={()=>{showDetail(record.id)}} type="primary" size={'small'}>编辑</Button>
                        <Popconfirm
                            title="确认删除此分类吗"
                            //description="会一并删除子分类"
                            onConfirm={()=>confirm(record.id)}
                            onCancel={cancel}
                            okText="确认"
                            cancelText="取消"
                        >
                        <Button type="primary" size={'small'} danger>删除</Button>
                        </Popconfirm>
                    </div>
                )
            }
        }
    ];
    const showDetail=(id)=>{
        if(id&&parseInt(id)){
            navigate('/home/article/'+id)
        }else{
            message.error("id不合法")
        }
    }
    const onChange=(e)=>{
        //翻页函数
        const pageno=parseInt(e)?parseInt(e)-1:0
        setPageNo(pageno)
    }
    const addCate=()=>{
        navigate('/home/article/add',{state:{type:'add'}})
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
        const res=await article.getArticles(params);
        if(res.status===0&&res.data){
            setTotal(res.data.total);
            setList(res.data.list);
        }
    }
    return (
        <>
            <div className="filter-tab filter-tab-cate">
                <Button type="primary" onClick={addCate}>添加文章</Button>
            </div>
            <Table 
                tableLayout="fixed" 
                dataSource={list} 
                rowKey={'id'} 
                columns={columns} 
                pagination={{total:total,onChange}} 
            />
        </>
    )
};
export default ArticleList;