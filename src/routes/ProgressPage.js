import React, {useEffect, useState } from "react";
import './Progress.css';
import { TfiMenu } from "react-icons/tfi";
import { IoIosAlert } from "react-icons/io";
import Graph from "../components/graph";
import { MdOutlineFactCheck } from "react-icons/md";

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


    return <div id='wrap_p'>
        <div id="title"> 
        <a href="/">
        <MdOutlineFactCheck style={{'padding-left':'30px',color:'white', width:'45px', height:'45px'}}/>
        </a>
        <a href="/"><div id='title_text'>ESG {'\n'} Manager</div>
        </a>
        <div id='menubar'>
            <ul>
                <li><a href="/" style={{'text-decoration': 'none'}}>HOME</a></li>
                <li><a href="/progress" style={{'text-decoration': 'none'}}>PROGRESS</a></li>
                <li><a href="/checklist" style={{'text-decoration': 'none'}}>CHECKLIST</a></li>
            </ul>
        </div>
        </div>
         

        <a href="/checklist">
            <div id='G_main'>
                <div id="graphBox">메인 그래프</div>
                {/* <Graph json={json_data} loading={loading} id='main'></Graph> */}
                </div>
        </a>
        <a href="/checklist?id=5.1.1.">
            <div id='G_2'> 
                <div id="graphBox_s">5. 리더십과 노동자 참여</div> 
                <Graph json={json_data} loading={loading} id='g_2'></Graph> 
                </div>
            </a>
        <a href="/checklist?id=4.1.1.">
            <div id='G_1'>
                <div id="graphBox_s">4. 조직의 상황</div> 
                <Graph json={json_data} loading={loading} id='g_1'></Graph>
                </div>
            </a>
        <a href="/checklist?id=8.1.1.1.">
            <div id='G_5'>
                <div id="graphBox_s">8. 운영</div> 
                <Graph json={json_data} loading={loading} id='g_5'></Graph> 
                </div>
            </a>
        <a href="/checklist?id=7.1.1.">
            <div id='G_4'>
                <div id="graphBox_s">7. 지원</div> 
                <Graph json={json_data} loading={loading} id='g_4'></Graph> 
                </div>
                </a>
        <a href="/checklist?id=6.1.1.1.">
            <div id='G_3'>
                <div id="graphBox_s">6. 기획</div> 
                <Graph json={json_data} loading={loading} id='g_3'></Graph> 
                </div>
            </a>
        <a href="/checklist?id=10.1.1.">
            <div id='G_7'>
                <div id="graphBox_s">10. 개선</div> 
                <Graph json={json_data} loading={loading} id='g_7'></Graph> 
                </div>
            </a>
        <a href="/checklist?id=9.1.1.1.">
            <div id='G_6'>
                <div id="graphBox_s">9. 성과평가</div> 
                <Graph json={json_data} loading={loading} id='g_6'></Graph> 
                </div>
            </a>



            <div id="graph_s">
        </div>

        <a href="/checklist">
        <div id="main_graph">
        <Graph json={json_data} loading={loading} id='main'></Graph></div></a>
         </div>

}

export default ProgressPage