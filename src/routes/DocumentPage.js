import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdOutlineFactCheck } from "react-icons/md";
//
function DocumentPage() {
   const {id}=useParams();
   const [loading,setLoading]=useState(true);
   const [json_data,setjson_data]=useState([]); //변수 선언
   
   useEffect(() => {
    
    const getDetail = async () => {
        const json = await (
            await fetch(`/221119_save/data.php?data=document&id=${id}`)//php data 호출
        ).json();
       
          setjson_data(json);//변수에 저장
          
    };
    getDetail();
    
    setLoading(false);
    console.log(loading);
  },[loading]);
  console.log(json_data);
  const data= (json_data.map(
    (info)=>{                
      return(
        <tr id={info.doc_id} key={info.doc_id}>
          <td>{info.updated_date}</td>
          <td>{info.doc_id}</td>          
          <td>{info.doc_name}</td>
          <td>{info.doc_type}</td>
          {/* <td>download</td> */}
               
        </tr>
      )
    }
  ))
    return (

        <div>
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
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th>UPDATED DATE</th>
                    <th>ID</th>
                    <th>DOC NAME</th>
                    <th>DOC TYPE</th>
                    {/* <th>DOWNLOAD</th> */}

                    </tr>
                </thead>
                <tbody>
                    {data}
                </tbody>  
            </table>
        </div>
        
    );
};

export default DocumentPage;