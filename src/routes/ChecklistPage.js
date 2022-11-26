import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
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
            await fetch(`/221119_save/data.php?data=checklist`)//php data 호출
        ).json();
       
          setjson_data(json);//변수에 저장
          
    };
    getDetail();
    
    console.log(loading);
    setLoading(false);
    console.log(json_data);
  },[loading]);
  


  const [bChecked, setChecked] = useState(false);//랜더링 시간 로딩용
  //체크리스트 값 바뀔 것들 선언
  const [checkedItems_ischecked, setCheckedItems_ischecked] = useState(new Set());//ischecked 변수
  const [changedItems_main_dept,setchangedItems_main_dept]=useState({});//main_dept 변수
  const [changedItems_related_dept,setchangedItems_related_dept]=useState({});//main_dept 변수
  const [result,setresult]=useState({});//result 변수
  const [reminder,setreminder]=useState({});//reminder 변수
  //체크리스트 값 
  const checkedItemHandler = (id, isChecked) => {
    if (isChecked) { //체크 표시이면 리스트에 넣음
      checkedItems_ischecked.add(id);
      setCheckedItems_ischecked(checkedItems_ischecked); 
    } else if (!isChecked && checkedItems_ischecked.has(id)) {
      checkedItems_ischecked.delete(id);
      setCheckedItems_ischecked(checkedItems_ischecked);
    }
    // console.log(checkedItems_ischecked);
    // console.log(checkedItems_ischecked.has('1'));
  };



  const checkHandler = (id,{ target }) => {
    setChecked(!bChecked);//render로 로딩타임
    checkedItemHandler(id, target.checked);
  };

  //메인부서 바꾸기 
  const check_main=(id,{target})=>{
      setChecked(!bChecked);//render로 로딩타임
      changedItems_main_dept[id]=target.value;
      setchangedItems_main_dept(changedItems_main_dept);
    }
  //메인부서 바꾸기 
  const check_related=(id,{target})=>{
    setChecked(!bChecked);//render로 로딩타임
    changedItems_related_dept[id]=target.value;
    setchangedItems_related_dept(changedItems_related_dept);
  }


  //db값 가져와 초기화 해두는 파트
  useEffect(() => {  
    json_data.map(
      function(e){
        if (e.is_checked=='1')//ischecked
          checkedItems_ischecked.add(e.checklist_id);
        if (e.main_dept!=null){//main_dept
          changedItems_main_dept[e.checklist_id]=e.main_dept;
          setchangedItems_main_dept(changedItems_main_dept);

        }
        if (e.related_dept!=null){//related_dept
          changedItems_related_dept[e.checklist_id]=e.related_dept;
          setchangedItems_related_dept(changedItems_related_dept);

        }
        if(e.result!=null){
          result[e.checklist_id]=e.result;
          setresult(result);
        }
        if(e.reminder_cnt!=0){
          reminder[e.checklist_id]=e.reminder_cnt;
          setresult(reminder);
        }

      }
    )
    setCheckedItems_ischecked(checkedItems_ischecked);
    console.log(checkedItems_ischecked);
    console.log(changedItems_main_dept);
  },[json_data,checkedItems_ischecked,loading]);
  
  useEffect(() => {  

    
    
},[]);

  //체크리스트 파트

  //json data 출력  
  const Reminder_check=(info)=>{
    <div>
          <div className="radio">
              <label>
                <input 
                type="radio" 
                name={info.checklist_id} 
                value="good"
                checked={result[info.checklist_id]=="good"?'checked':""}
                onClick={(e) =>
                 { 
                  setChecked(!bChecked)
                  if(result[info.checklist_id]=='good')
                    delete result[info.checklist_id];
                  else
                    result[info.checklist_id]='good';
                  setresult(result)
                  // console.log(e)
                  console.log(result)
                
                }
                }/>
                양호
              </label>
        </div>
        <div className="radio">
              <label>
                <input 
                type="radio" 
                name={info.checklist_id}  
                value="observe" 
                checked={result[info.checklist_id]=="observe"?'checked':null}
                onClick={(e) =>
                  { 
                    setChecked(!bChecked)
                    if(result[info.checklist_id]=='observe')
                      delete result[info.checklist_id];
                    else
                      result[info.checklist_id]='observe';
                    setresult(result)
                    // console.log(e)
                    console.log(result)
                  
                  }
                }/>
                관찰
              </label>
            </div>
            <div className="radio">
              <label>
                <input 
                type="radio" 
                name={info.checklist_id}  
                value="bad" 
                checked={result[info.checklist_id]=="bad"?'checked':null}
                onClick={(e) =>
                  { 
                    setChecked(!bChecked)
                    if(result[info.checklist_id]=='bad')
                      delete result[info.checklist_id];
                    else
                      result[info.checklist_id]='bad';
                    
                    setresult(result)
                    // console.log(e)
                    console.log(result)
                  
                  }
                }/>
                부적합
              </label>
          </div>
      </div>
  }

  const data= (json_data.map(
    (info)=>{                
      return(
        <tr id={info.checklist_id} key={info.checklist_id}>
          <td>{info.checklist_id}</td>
          <td>{info.contents}</td>          
          <td>{info.viewpoint}</td>

          <td><input type="text" 
          id={info.checklist_id} 
          name="main_dept" 
          autocomplete="off"
          value={changedItems_main_dept[info.checklist_id]?changedItems_main_dept[info.checklist_id]:""}
          onChange={(e) => {check_main(info.checklist_id,e);}} />
          </td>
          
          <td><input type="text" 
          id={info.checklist_id} 
          name="related_dept" 
          autocomplete="off"
          value={changedItems_related_dept[info.checklist_id]?changedItems_related_dept[info.checklist_id]:""}
          onChange={(e) => {check_related(info.checklist_id,e);}} />
          </td>
          <td>        
            <div className="radio">
              <label>
                <input 
                type="radio" 
                name={info.checklist_id} 
                value="good"
                checked={result[info.checklist_id]=="good"?'checked':""}
                onClick={(e) =>
                 { 
                  setChecked(!bChecked)
                  if(result[info.checklist_id]=='good')
                    delete result[info.checklist_id];
                  else
                    result[info.checklist_id]='good';
                  setresult(result)
                  // console.log(e)
                  console.log(result)
                
                }
                }/>
                양호
              </label>
            </div>
            <div className="radio">
              <label>
                <input 
                type="radio" 
                name={info.checklist_id}  
                value="observe" 
                checked={result[info.checklist_id]=="observe"?'checked':null}
                onClick={(e) =>
                  { 
                    setChecked(!bChecked)
                    if(result[info.checklist_id]=='observe')
                      delete result[info.checklist_id];
                    else
                      result[info.checklist_id]='observe';
                    setresult(result)
                    // console.log(e)
                    console.log(result)
                  
                  }
                }/>
                관찰
              </label>
            </div>
            <div className="radio">
              <label>
                <input 
                type="radio" 
                name={info.checklist_id}  
                value="bad" 
                checked={result[info.checklist_id]=="bad"?'checked':null}
                onClick={(e) =>
                  { 
                    setChecked(!bChecked)
                    if(result[info.checklist_id]=='bad')
                      delete result[info.checklist_id];
                    else
                      result[info.checklist_id]='bad';
                    
                    setresult(result)
                    // console.log(e)
                    console.log(result)
                  
                  }
                }/>
                부적합
              </label>
          </div>
          
          </td>
          <td
          style={{color:info.updated_date?'black':'red'}}
          >{info.updated_date?info.updated_date:'Not Updated'}</td>
          <td><input type="checkbox" 
          checked={checkedItems_ischecked.has(info.checklist_id)
          } //checkedItems_ischecked 안에 id가 있어야 가능
          onChange={(e) => checkHandler(info.checklist_id,e)} //체크버튼 바뀔 때마다 함수 수행
          /></td>

          <td> {info.is_reminder>0? (<div>
          <div className="radio">
              <label>
                <input 
                type="radio" 
                name={info.checklist_id} 
                value="2"
                checked={reminder[info.checklist_id]=="2"?'checked':""}
                onClick={(e) =>
                 { 
                  setChecked(!bChecked)
                  if(reminder[info.checklist_id]=='2')
                    delete reminder[info.checklist_id];
                  else
                    reminder[info.checklist_id]='2';
                  setreminder(reminder)
                  // console.log(e)
                  console.log(reminder)
                
                }
                }/>
                2
              </label>
        </div>
        <div className="radio">
              <label>
                <input 
                type="radio" 
                name={info.checklist_id}  
                value="1" 
                checked={reminder[info.checklist_id]=="1"?'checked':null}
                onClick={(e) =>
                  { 
                    setChecked(!bChecked)
                    if(reminder[info.checklist_id]=='1')
                      delete reminder[info.checklist_id];
                    else
                      reminder[info.checklist_id]='1';
                    setreminder(reminder)
                    // console.log(e)
                    console.log(reminder)
                  
                  }
                }/>
                1
              </label>
            </div>
            <div className="radio">
              <label>
                <input 
                type="radio" 
                name={info.checklist_id}  
                value="0" 
                checked={reminder[info.checklist_id]=="0"?'checked':null}
                onClick={(e) =>
                  { 
                    setChecked(!bChecked)
                    if(reminder[info.checklist_id]=='0')
                      delete reminder[info.checklist_id];
                    else
                      reminder[info.checklist_id]='0';
                    
                    setresult(reminder)
                    // console.log(e)
                    console.log(reminder)
                  
                  }
                }/>
                0
              </label>
          </div>
      </div>):null}</td>   
          
          <td > 
            <form action={`/221119_save/filesLogic.php?type=rule&id=${info.checklist_id}`} method="post" enctype="multipart/form-data"  >

              <input type="file" name="myfile"/>
              <button type="submit" name="save">upload</button>
              <div><a href={`/document/${info.checklist_id}`}>history</a></div>
            </form>
          </td>          
          <td>
            <form action={`/221119_save/filesLogic.php?type=evid&id=${info.checklist_id}`} method="post" enctype="multipart/form-data"  >

              <input type="file" name="myfile"/>
              <button type="submit" name="save">upload</button>
              <div><a href={`/document/${info.checklist_id}`}>history</a></div>
            </form>
          </td>          
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
            data:{
              action:'save', 
              isChecked_list:Array.from(checkedItems_ischecked),
              main_dept_list:changedItems_main_dept,
              related_dept_list:changedItems_related_dept,
              result:result,
              reminder:reminder
          },
      
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
          <th>checklist_id</th>
          <th>contents</th>
          <th>viewpoint</th>
          <th>main dept</th>
          <th>related dept</th>
          <th>test_result</th>
          <th>updated_date</th>
          <th>is_checked</th>
          <th>reminder_cnt</th>
          <th>rule_doc_id</th>
          <th>evid_doc_id</th>
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