import React, {useEffect, useState } from "react";
import { MdOutlineFactCheck } from "react-icons/md";
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
              await fetch(`/backend/data.php?data=checklist`)//php data 호출
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
                        <div id="checked">
                            <span id="checked_number">{info.checklist_id}</span>
                             <span id="checked_value" style={{color:'green'}}> {info.reminder_cnt}회 더 필요</span>
                        </div>
                        <div id="checked_text">
                            {info.contents}
                        </div>
                    </div>
                )
            }


        }))

        const test_value={
            "bad":'부적합',
            "observe":'관찰',
            null:'미해결'
        }
        const test_color={
            "bad":'red',
            "observe":'orange',
            null:'black'
        }

        const data_result= (json_data.map(
            (dt)=>{
                if(dt.result!='good'){
                    console.log(dt);
                    return(
                        <div>
                        <div id="checked">
                            <span id="checked_number">{dt.checklist_id}</span> 
                            <span id="checked_value"
                            style={{color:test_color[dt.result]}}
                            >{test_value[dt.result]}</span>
                        </div>
                        <div id="checked_text">
                            {dt.contents}
                        </div>
                    </div>
                    )
                }
    
    
            }))

    return <div id="wrap">
    <div id="title"> 
        <a href="/">
        <MdOutlineFactCheck style={{'padding-left':'30px',color:'white', width:'45px', height:'45px'}}/>
        </a>
        <a href="/"><div id='title_text'>ESG {'\n'} Manager</div>
        </a>
        {/* 메뉴바 추가함 */}
        <div id='menubar'>
            <ul>
                <li><a href="/" style={{'text-decoration': 'none'}}>HOME</a></li>
                <li><a href="/progress" style={{'text-decoration': 'none'}}>PROGRESS</a></li>
                <li><a href="/checklist" style={{'text-decoration': 'none'}}>CHECKLIST</a></li>
            </ul>
        </div>
            
        
    </div>



        <div id="sidebar">
            <div id="sideBarBox"> 전체 진행률 </div>
            <a href="/progress">
            <div id="home_graph" >
            <Graph json={json_data} loading={loading} id='main'></Graph>
            </div>
            </a>

            <a href="/checklist?type=result" style={{'text-decoration': 'none'}}>
            <div id="check">
                {data_result}
            </div>
            </a>
        </div>

        <a href="/checklist?type=reminder">
        <div id="contents1">
            <div id="sideBarBox">
                리마인더
            </div>
        <div id="reminder">
            {data_reminder}
        </div>
        </div>
        </a>
        <div id="contents2"><Cal></Cal></div>
        

        
    </div>
}

export default Home;