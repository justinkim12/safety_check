import React, {useEffect, useState } from "react";
import './Home.css';
import Graph from "../components/graph";
import { TfiMenu } from "react-icons/tfi";
import { IoIosAlert } from "react-icons/io";
import Cal from '../components/Cal';
function Home(){
    //loading state
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

    const [isOpen, setMenu] = useState(false);
    const toggleMenu = () => {
        setMenu(isOpen => !isOpen);
    }

    const data_reminder= (json_data.map(
        (info)=>{
            if(info.reminder_cnt!=0){
                // console.log(info);
                return(
                    <div>
                        <div id="remainder">
                        {info.checklist_id} {info.contents}
                        </div>
                    </div>
                )
            }


        }))
        const data_check= (json_data.map(
            (info)=>{
                if(info.is_checked!=0){
                    console.log(info);
                    return(
                        <div>
                            <div id="checked">
                            {info.checklist_id} {info.contents}
                            </div>
                        </div>
                    )
                }
    
    
            }))

    return <div id="wrap">
        <div id="title"> <TfiMenu id="menu" onClick={()=>toggleMenu()}/> TITLE <IoIosAlert id='notice'/></div>

        <div id="sidebar">
            <a href="/progress">
            <div>
            <Graph json={json_data} loading={loading} id='main'></Graph>
            </div>
            </a>

            <a href="/checklist?type=check" style={{'text-decoration': 'none'}}>
            <div id="check">
                {data_check}
            </div>
            </a>
        </div>

        <a href="/checklist?type=reminder">
        <div id="contents1">Reminder
        <div id="reminder">
            {data_reminder}
        </div>
        </div>
        </a>
        <div id="contents2"><Cal></Cal></div>
        
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
        
    </div>
}

export default Home;