import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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
          {/* <td>download</td> */}
               
        </tr>
      )
    }
  ))
    return (

        <div>

            <table className="table table-striped">
                <thead>
                    <tr>
                    <th>Updated Date</th>
                    <th>ID</th>
                    <th>DOC NAME</th>
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