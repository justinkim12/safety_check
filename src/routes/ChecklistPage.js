import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ConsoleView } from "react-device-detect";
import jquery from 'jquery';
import $ from 'jquery';

import './checklist.css';
function ChecklistPage() {
  const [loading,setLoading]=useState(true);
  
  //체크된 id 담는 리스트

//첫 화면 php 연동 및 데이터 처리
  const [json_data,setjson_data]=useState([]); //변수 선언
  //const [data,setData]=useState([]);
  useEffect(() => {
    
    const getDetail = async () => {
        const json = await (
            await fetch(`/221119_save/data.php`)//php data 호출
        ).json();
       
          setjson_data(json);//변수에 저장
          
    };
    getDetail();
    
    console.log(loading);
    setLoading(false);

  },[loading]);
  
  console.log(json_data);
  const [checkedItems, setCheckedItems] = useState(new Set());

  const checkedItemHandler = (id, isChecked) => {
    if (isChecked) { //체크 표시이면 리스트에 넣음
      checkedItems.add(id);
      setCheckedItems(checkedItems); 
    } else if (!isChecked && checkedItems.has(id)) {
      checkedItems.delete(id);
      setCheckedItems(checkedItems);
    }
    console.log(checkedItems);
    // console.log(checkedItems.has('1'));
  };

  const [bChecked, setChecked] = useState(false);//이게 왜 있어야되는지 잘 모르겠음!

  
  const checkHandler = (id,{ target }) => {
    setChecked(!bChecked);//이것도.. 빼면 안 돌아감 중요한듯
    checkedItemHandler(id, target.checked);
  };


  useEffect(() => {  
    json_data.map(
      function(e){
        if (e.ischecked=='1')
          checkedItems.add(e.bookid);
      }
    )
    setCheckedItems(checkedItems);
    console.log(checkedItems);

  },[json_data,checkedItems,loading]);
  
  useEffect(() => {  

    
    
},[]);

  //체크리스트 파트

  //json data 출력  
  const data= (json_data.map(
    (info)=>{                
      return(
        <tr id={info.bookid} key={info.bookid}>

          <td>{info.bookname}</td>
          <td>{info.publisher}</td>
          <td>{info.price}</td>
          <td><input type="checkbox" 
          checked={checkedItems.has(info.bookid)
          } //checkedItems 안에 id가 있어야 가능
          onChange={(e) => checkHandler(info.bookid,e)} //체크버튼 바뀔 때마다 함수 수행
          /></td>

        </tr>
      )
    }
  ))

  
//체크리스트와 같은 변동 되는 데이터 처리 jquery
useEffect(() => {
  $(document).ready(function(){
         $('#save').click(function(){
          $.ajax({
            url:`/221119_save/parsing.php`,
            method:"POST",
            data:{action:'save', isChecked_list:Array.from(checkedItems)},
      
            success:function(data){
                alert(data);
            }
         })
        })
      });
    }, []);


 return (
  <div>   

  <table className="table table-striped">
    <thead>
        <tr>
          <th>bookname</th>
          <th>publisher</th>
          <th>price</th>
          <th>check</th>
        </tr>
    </thead>
  <tbody>
    {data}
    </tbody>  
    
  

  </table>
  <button id="save" >save</button>
  </div>
 );

}
export default ChecklistPage;