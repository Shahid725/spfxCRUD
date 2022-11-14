import * as React from 'react';
import {useEffect } from 'react';
import { useState } from "react"

import { SPFI } from "@pnp/sp"
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { Web } from "sp-pnp-js";
import { Table } from "antd"
import "antd/dist/antd.css"
import type { ColumnsType } from 'antd/es/table'
import Space from 'antd/lib/space';

import styles from './Hellowebpart.module.sass';
import {
  SPHttpClient,
  SPHttpClientResponse,
  ISPHttpClientOptions,
} from "@microsoft/sp-http";

// import axios from 'axios';
import { IHellowebpartProps } from './IHellowebpartProps';
import { escape } from '@microsoft/sp-lodash-subset';

// import "./style.css";



// export interface same  {
//   firstname:string;
//   lastname: string;
//   username: string;
//   email: string;
//   phonenumber: string;

// }

// interface DataType {
//   key: string;
//   name: string;
//   age: number;
//   address: string;
//   tags: string[];
// }

// interface IHellowebpartProps
// extends FieldRenderProps<string,HTMLInputElement>,

const Hellowebpart :React.FC<IHellowebpartProps> =(props:any) => {
  // const {context} = IHell


  const [getData, setGetData] = useState([])
  // const [id, SetId] = useState(-1)
  
  // console.log("line No ==========> 39")
  const [data, setData] = useState <any>  ({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    phonenumber: ""
    
  });
  useEffect(() => {
    const {context} = props
    context.spHttpClient
    .get(
      `${context.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('Form10')/items`,
      SPHttpClient.configurations.v1
    )
    .then((res: SPHttpClientResponse) => {
      return res.json();
    })
    .then((res: any) => {
      // console.log("get", res)
      setGetData(res.value)
    });
    
  },[data])

  console.log("This is get Data ====>", getData)




  const handleInput = (e: any) => {
    const name: any = e.target.name;
    const value: any = e.target.value;
    console.log(name, value);

    setData({ ...data, [name]: value });
  };
  

  const updateB = (id : any, e: any) =>{
    e.preventDefault()
    // history.pushState(null, '', `${id.toString}`);  
  
    window.location.href = `${
      props.context.pageContext.web.absoluteUrl
   }/SitePages/Home.aspx?itemID=${id.toString()}`;
    
    const{context} = props;
   
      const headers: any = {
      "X-HTTP-Method": "MERGE",
      "If-Match": "*",
      "Content-Type": "application/json;odata=nometadata",
    };
    
    const spHttpClintOptions: ISPHttpClientOptions = {
      // headers,
      // body: JSON.stringify({
      //   Title: data.firstname,
      //   lastname: data.lastname,
      //   username: data.username,
      //   Email: data.email,
      //   PhoneNumber: data.phonenumber,
      // }), 

    }
   
    context.spHttpClient
    
    .get(`${context.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('Form10')/items(${id})`,
    SPHttpClient.configurations.v1,
    spHttpClintOptions
    )
    .then((res : any) => 
      res.json(),
      // console.log("newwww==============>",res )
      // console.log(res)
    )
    .then((neres : any) => {
      // console.log("Secondiiiii dot Than=========>",neres)
      // console.log("only one =>",neres.PhoneNumber)
      setData({
        firstname: neres.Title,
        lastname:neres.lastname,
        username:neres.username,
        email:neres.Email,
        phonenumber:neres.PhoneNumber  
      })
     
    }
    )
    .catch((err: any) => {
      console.log(err)
    })    

  }



//   const updateB = (id: any) =>{
//     // alert(id)
//     const {context} = props;
//     const headers: any = {
//       "X-HTTP-Method": "MERGE",
//       "If-Match": "*",
//       "Content-Type": "application/json;odata=nometadata",
//     };
//     const spHttpClintOptions: ISPHttpClientOptions = {
//       headers,
//       // body: JSON.stringify({
//       //   Title: data.firstname,
//       //   lastname: data.lastname,
//       //   username: data.username,
//       //   Email: data.email,
//       //   PhoneNumber: data.phonenumber,
//       // }),   
//     };
//     context.spHttpClient
//   .get(`${context.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('Form10')/items(${id})`,
//   SPHttpClient.configurations.v1,
//   spHttpClintOptions
    
//   )
//   .then((res: SPHttpClientResponse) => {
//     res.json()
//     console.log("This is resssss ======>",res)            
//   })
//   .then((res: any) => {
//     // alert("postedddd")
//     // SetNewPost(res)
//     console.log(res)
//     // setData({
//     // firstname: res.Title,
//     // lastname: res.lastname,
//     // username: res.username,
//     // email: res.Email,
//     // phonenumber: res.PhoneNumber
//     // })
    
//   });
//   // .catch((err: any) => console.log(err))
//   // .catch((res: any) => {})
//     // .catch(err => console.log(err))  
// }
  const deleteB = (actions:any,id: any) =>{
    alert(id)
    // console.log(id)
    const {context} = props;
    const headers: any = {
      "X-HTTP-Method": "DELETE",
      "If-Match": "*",
      "Content-Type": "application/json;odata=nometadata",
    };
    const spHttpClintOptions: ISPHttpClientOptions = {
      body: JSON.stringify({
        Status: actions
        
      }),  
      headers,        
    };
    context.spHttpClient
  .post(`${context.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('Form10')/items(${id})`,
  SPHttpClient.configurations.v1,
  spHttpClintOptions
  )
  .then((res: any) => {
    // console.log("Delete =====> ",res);
    const del = getData.filter((ite) => ite.Id !== id);
    setGetData(del)

    
  })
  .catch((err: any) => console.log("error", err))
    // 
    // setGetData(del)
    // alert("deleted")
  }

  const handleSubmit = (e: any) => {       
    const {context} = props

    e.preventDefault();
    const headers: any = {
      "X-HTTP-Method": "MERGE",
      "If-Match": "*",
      "Content-Type": "application/json;odata=nometadata",
    };
    // if(!data.id){console.log("newwpost")}
    // else {console.log("update")}
    const spHttpClintOptions: ISPHttpClientOptions =
        window.location.href.indexOf("?itemID") != -1
          ? {
              headers,
              body: JSON.stringify({
                    Title: data.firstname,
                    lastname: data.lastname,
                    username: data.username,
                    Email: data.email,
                    PhoneNumber: data.phonenumber,
               })
            }
          : {
              body: JSON.stringify({
                 Title: data.firstname,
                 lastname: data.lastname,
                username: data.username,
                Email: data.email,
                PhoneNumber: data.phonenumber,
             })
             
            };
    
 
  // console.log(`${context.pageContext.web.absoluteUrl}`)
  let data1 = window.location.href.split("=");
  let itemId = data1[data1.length -1];
  console.log("This is data1=========>", data1)
  console.log("This is iteemId=========>",itemId)
  console.log("afffterrrr")
  
  let url =
        window.location.href.indexOf("?itemID") != -1
          ? `/_api/web/lists/GetByTitle('Form10')/items('${itemId}')`
          : "/_api/web/lists/GetByTitle('Form10')/items";


  context.spHttpClient
  .post(`${context.pageContext.web.absoluteUrl}${url}`,
  SPHttpClient.configurations.v1,
  spHttpClintOptions
    
  )
  .then((res: any) => {
    console.log(res);
    // window.location.href ="https://resembleae.sharepoint.com/sites/isdb-intranet/services/services/_layouts/workbench.aspx"
    

  //   window.location.href = `${
  //     props.context.pageContext.web.absoluteUrl
  //  }/_api/web/lists/GetByTitle('Form10')/items`
    // console.log(res.id)
    // handleSubmit(e)
  })
  .catch((err: any) => console.log("error", err))
    setData({
      firstname:"",
      lastname: "",
      username: "",
      email: "",
      phonenumber: ""
    })

  }

  const columns: ColumnsType = [
    {
      title: 'FirstName',
      dataIndex: 'Title',
      key: 'FirstName',
      render: text => (<a>{text} </a>)
      
    },
    {
      title: 'LastName',
      dataIndex: 'lastname',
      key: 'LastName',
      render: text => <a>{text} </a>
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'Username',
      render: (text,) => <a>{text}</a>
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
      render: text => <a>{text}</a>
    },
    {
      title: 'PhoneNumber',
      dataIndex: 'PhoneNumber',
      key: 'PhoneNumber',
      render: text => <a>{text}</a>
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'Id',
      render: (data, record: any,index) => (
        <Space size="middle" style={{cursor:"pointer"}}>
          <div>
            <button onClick={(e) => updateB(record["Id"],e)}>Update</button>
          </div>
          <div>
            <button onClick={() =>deleteB(false, record["Id"])}>Delete</button>
          </div>
          
        </Space>
      ),
    },    
  ]

    // const dataSo = [
    //         {
    //     key: '1',
    //     FirstName: 'Mohammed',
    //     LastName: "shahid",
    //     Username: 'New York No. 1 Lake Park',
    //     Email:"tset@gmail.com",
    //     PhoneNumber:"23456789"        
    //   },    
    // ];
  
  

  return (
    <div className="container">
            
  <div className='body' style={{width:"100%"}}>
  <div style={{display:"flex",
                justifyContent:"center",
                alignItems:"center",
                padding:"10px",
                background: "linear-gradient(135deg, #71b7e6, #9b59b6 )"}} >
    <div style={{maxWidth:"700px",width:"75%",backgroundColor: "white",
    padding: "25px 30px",
    borderRadius: "5px"}}>
    <div className="title" style={{fontWeight:"bold",fontSize:"30px", textAlign:"center", justifyContent:"center", marginBottom:"20px"}}>
      User Registrationsb</div>
    <div>
    
      <form style={{justifyContent:"centser",alignItems:"center",marginLeft:"25%"}}>
        <div>
          <p >FirstName</p>
          <input type='text' value={data.firstname}
              onChange={handleInput}
              name="firstname"
              id="firstname" />
        </div>
        <div>
          <p>lastName</p>
          <input type='text' value={data.lastname}
              onChange={handleInput}
              name="lastname"
              id="lastname" />
        </div>
        <div>
          <p>userName</p>
          <input type='text' value={data.username}
              onChange={handleInput}
              name="username"
              id="username" />
        </div>
        <div>
          <p>Email</p>
          <input type='text' value={data.email}
              onChange={handleInput}
              name="email"
              id="email" />
        </div>
        <div>
          <p>Phone number</p>
          <input type='text'  value={data.phonenumber}
              onChange={handleInput}
              name="phonenumber"
              id="phonenumber"/>
        </div>

        <div className="button">
          <button type= "button" style={{marginTop:"20px"}} onClick={handleSubmit}>Add</button>
          
        </div>
      </form>
      
      
    </div>
    </div>
  </div>

  <Table dataSource={getData}
  columns ={columns}
  ></Table>

  </div>
  </div>
  
);
  
}


  


export default Hellowebpart;




