import React, {useEffect, useState } from "react";
import './Progress.css';
import { TfiMenu } from "react-icons/tfi";
import { IoIosAlert } from "react-icons/io";
import Graph from "../components/graph";


function ProgressPage(){
    const [isOpen, setMenu] = useState(false);
    const toggleMenu = () => {
        setMenu(isOpen => !isOpen);
    }

    const [loading,setLoading]=useState(true);
    const [json_data,setjson_data]=useState([]); //변수 선언
    //const [data,setData]=useState([]);
    useEffect(() => {
      
      const getDetail = async () => {
          const json = await (
              await fetch(`/221119_save/data.php?data=checklist`)//php data 호출
          ).json();
         
            setjson_data(json);//변수에 저장
            console.log(json_data);
      };
      getDetail();
      
      console.log(loading);
      setLoading(false);
      console.log(json_data);
    },[loading]);


    return <div id='wrap_p'>
         <div id="title"> <TfiMenu id="menu" onClick={()=>toggleMenu()}/> TITLE <IoIosAlert id='notice'/></div>
         <div id={isOpen ? 'menu-bar' : 'hide-bar'}>
            <a href="/page1">
            <li >페이지1</li>
            </a>
            <a href="/page2">
            <li >페이지2</li>
            </a>
            <a href="/page3">
            <li >페이지3</li>
            </a>
        </div>
        <div id='G_main'>메인그래프<Graph json={json_data} loading={loading} id='main'></Graph></div>
        <div id='G_1'> 1번그래프 <Graph json={json_data} loading={loading} id='g_1'></Graph> </div>
        <div id='G_2'>2번그래프 <Graph json={json_data} loading={loading} id='g_2'></Graph> </div>
        <div id='G_3'>3번그래프 <Graph json={json_data} loading={loading} id='g_3'></Graph> </div>
        <div id='G_4'>4번그래프 <Graph json={json_data} loading={loading} id='g_4'></Graph> </div>
        <div id='G_5'>5번그래프 <Graph json={json_data} loading={loading} id='g_5'></Graph> </div>
        <div id='G_1'>6번그래프 <Graph json={json_data} loading={loading} id='g_6'></Graph> </div>
        <div id='G_2'>7번그래프 <Graph json={json_data} loading={loading} id='g_7'></Graph> </div>
        
         </div>
}

export default ProgressPage