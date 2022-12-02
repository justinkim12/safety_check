import { Redirect,useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { ConsoleView } from "react-device-detect";
import jquery from 'jquery';
import $ from 'jquery';
import './checklist.css';
import './remote.css';
import { useLocation } from 'react-router';
import qs from "query-string"; 
import { MdOutlineFactCheck } from "react-icons/md";

function ChecklistPage() {
  //loading state
  const [loading,setLoading]=useState(true);


  //query string




   //리모콘 파트 
   var location = '';
   var [x,setX] = useState();
   function onTextChange(e){
     location = e.target.value+'.';
     setX(location);
   }

  
  //필터링 변수
  const [universal_set,setuniversal_set]=useState([]);
  const [filter_update,setfilter_update]=useState([]);
  const [filter_check,setfilter_check]=useState([]);
  const [check_bool,setcheck_bool]=useState(false);
  const [update_bool,setupdate_bool]=useState(false);
  const [reminder_bool,setreminder_bool]=useState(false);
  const [result_bool,setresult_bool]=useState(false);
  const [filter_reminder,setfilter_reminder]=useState([]);

  const [filter_result,setfilter_result]=useState([]);

//첫 화면 php 연동 및 데이터 처리
  const [json_data,setjson_data]=useState([]); //변수 선언

  //query string
  const searchParams = useLocation().search;
  const query = qs.parse(searchParams);

  useEffect(() => {
    
    const getDetail = async () => {
        const json = await (
            await fetch(`/backend/data.php?data=checklist`)//php data 호출
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
  const [updated_date,setupdated_date]=useState({});//update date 변수
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
    setuniversal_set(json_data.map((info)=>(info.checklist_id)));
    setfilter_check(universal_set);
    setfilter_reminder(universal_set);
    setfilter_result(universal_set);
    console.log(universal_set);
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
          setreminder(reminder);
        }
        if(e.updated_date!=null){
          updated_date[e.checklist_id]=1;
          setupdated_date(updated_date);
        }

      }
    )
    setCheckedItems_ischecked(checkedItems_ischecked);

  },[json_data,checkedItems_ischecked,loading]);
  




 
  const union = (first, second) => { // first: set, second: set
    const union = [...first]; 
    second.forEach((value) => { if (!union.includes(value)) union.push(value); }) 
    // 없을 때에만 추가 해준다. (합집합 중복 방지)
    return union;
  }
  
  const intersect = function(first, second) { // first: set, second: set
    return first.filter(value => second.includes(value)); // 둘 다 있으면 교집합
  }

  const complement = function(first, second) { // first: set, second: set
    return first.filter(value => !second.includes(value)); // 중복되는 것 제거하면 차집합
  }
  const difference = function(first,second){
    return complement(union(first,second),intersect(first,second));
  }

  const result_color={'good':'black','observe':'orange','bad':'red'};

  //체크리스트 파트
  //json data 출력  
  const data= (json_data.map(
    (info)=>{
      if(!filter_update.includes(info.checklist_id)){           
        if(filter_check.includes(info.checklist_id)){
          if(filter_reminder.includes(info.checklist_id)){ 
            if(filter_result.includes(info.checklist_id)){
      return(
        
        <tr id={info.checklist_id} 
        key={info.checklist_id}
        style={{textAlign:'center'}}>
          <td>{info.checklist_id}</td>
          <td>{info.contents}</td>          
          <td>{info.viewpoint}</td>

          <td><input type="text" 
          id={info.checklist_id} 
          style={{width:'85%'}}
          name="main_dept" 
          autocomplete="off"
          value={changedItems_main_dept[info.checklist_id]?changedItems_main_dept[info.checklist_id]:""}
          onChange={(e) => {check_main(info.checklist_id,e);}} />
          </td>
          
          <td><input type="text" 
          id={info.checklist_id} 
          style={{width:'80%'}}
          name="related_dept" 
          autocomplete="off"
          value={changedItems_related_dept[info.checklist_id]?changedItems_related_dept[info.checklist_id]:""}
          onChange={(e) => {check_related(info.checklist_id,e);}} />
          </td>
          <td 
            style={{color:result_color[result[info.checklist_id]]}}
          >        
            <div className="radio1">
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
            <div className="radio1">
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
            <div className="radio1">
              <label>
                <input 
                type="radio" 
                name={info.checklist_id}  
                value="bad" 
                checked={result[info.checklist_id]=="bad"?'checked':""}
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
          >{info.updated_date?info.updated_date:'Not Updated'}
          </td>
          <td><input type="checkbox" 
          checked={checkedItems_ischecked.has(info.checklist_id)
          } //checkedItems_ischecked 안에 id가 있어야 가능
          onChange={(e) => checkHandler(info.checklist_id,e)} //체크버튼 바뀔 때마다 함수 수행
          /></td>

          {/* reminder cnt 가 0보다 커야 리마인더 항목 노출 */}
          <td> {info.is_reminder>0? (<div>
          <div className="radio">
              <label>
                <input 
                type="radio" 
                name={"r"+info.checklist_id} 
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
                name={"r"+info.checklist_id}  
                value="1" 
                checked={reminder[info.checklist_id]=="1"?'checked':""}
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
                name={"r"+info.checklist_id}  
                value="0" 
                checked={reminder[info.checklist_id]=="0"?'checked':null}
                onClick={(e) =>
                  { 
                    setChecked(!bChecked)
                    if(reminder[info.checklist_id]=='0')
                      delete reminder[info.checklist_id];
                    else
                      reminder[info.checklist_id]='0';
                    
                    setreminder(reminder)
                    // console.log(e)
                    console.log(reminder)
                  
                  }
                }/>
                0
              </label>
          </div>
      </div>):null}</td>   
          
          <td > 
            <form action={`/backend/filesLogic.php?type=rule&id=${info.checklist_id}`} method="post" enctype="multipart/form-data"  >
                <div>
              <input style={{width:'79%'}}  type="file" name="myfile"/>
              </div>
              <button type="submit" name="save">upload</button>
              <div><a href={`/document/${info.checklist_id}`}>history</a></div>
            </form>
          </td>          
          <td>
            <form action={`/backend/filesLogic.php?type=evid&id=${info.checklist_id}`} method="post" enctype="multipart/form-data"  >

              <input style={{width:'79%'}} type="file" name="myfile"/>
              <button type="submit" name="save">upload</button>
              <div><a href={`/document/${info.checklist_id}`}>history</a></div>
            </form>
          </td>          
        </tr>
      )}}}}

    }
  ))
  
//프로그래스에서 그래프 클릭 후 링크 타고 오는 부분 처리
  useEffect(()=>{

    if(query.id)
      setX(query.id);
    if(document.getElementById(query.id)){

        document.getElementById('move').click();
        
     }
    //  window.location.href='./checklist';
 },[result,loading,universal_set]);

  
//체크리스트와 같은 변동 되는 데이터 처리 jquery
useEffect(() => {
  $(document).ready(function(){
         $('#save').click(function(){
          $.ajax({
            url:`/backend/parsing.php`,
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


// 상단 필터링 버튼 부분
    const filtering_update=(set,{target})=>{
      setupdate_bool(!update_bool);
      setfilter_update(difference(filter_update,set));
      console.log(filter_update);

    }

    const filtering_check=()=>{
      setcheck_bool(!check_bool);
      console.log(filter_check);
      setfilter_check(check_bool?universal_set:Array.from(checkedItems_ischecked));


    }
    const filtering_reminder=()=>{
      setreminder_bool(!reminder_bool);
      console.log(filter_reminder);
      setfilter_reminder(reminder_bool?universal_set:Object.keys(reminder));


    }
    const filtering_result=()=>{
      setresult_bool(!result_bool);
      console.log(result_bool);
      var filtered = Object.keys(result).reduce(function (filtered, key) {
        if (result[key]=='good') filtered[key] = result[key];
        return filtered;
      }, {});
      console.log(complement(universal_set,Object.keys(filtered)));

      setfilter_result(result_bool? universal_set:complement(universal_set,Object.keys(filtered)));


    }



  //query string part


    useEffect(() => {  
      if(query.type=='reminder'){
      setreminder_bool(!reminder_bool);
      console.log(filter_reminder);
      setfilter_reminder(reminder_bool?universal_set:Object.keys(reminder));}
      
      if(query.type=='check'){
        setcheck_bool(!check_bool);
        console.log(filter_check);
        setfilter_check(check_bool?universal_set:Array.from(checkedItems_ischecked));

      }
      if(query.type=='result'){
        filtering_result();

      }

    
  

    },[universal_set]);




 return (
  
  <div>  
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


    <div class="remote">
          <div class="h_area"> 리모컨 </div>
          <div class="remote_cont">
            <div class="pg_area">
              <input type="text" size="3" onChange={onTextChange} />
              <button> <a id='move' href={"#"+x} style={{color:'black', 'text-decoration':'none'}}>Move</a> </button>
              <button onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }) }}> Top </button>
              <button onClick={() => { window.scrollTo({ top: 99999999, behavior: "smooth" }) }}> Bottom </button>
              <br></br>
              <div>필터링</div>
              <div><button onClick={(e) => {filtering_result()}} ><span style={{color:result_bool?'blue':'black'}}>{result_bool?'Non Pass':'Result'}</span></button></div>
              <div><button onClick={(e) => {filtering_update(Object.keys(updated_date),e);}} ><span style={{color:update_bool?'blue':'black'}}>{update_bool?'Updated X':' Updated Date '}</span></button></div>
              <div><button onClick={(e) => {filtering_check()}} ><span style={{color:check_bool?'blue':'black'}}>{check_bool?'Checked O':'Check'}</span></button></div>
              <div><button onClick={(e) => {filtering_reminder()}} ><span style={{color:reminder_bool?'blue':'black'}}>{reminder_bool?'Reminder O':'Reminder'}</span></button></div>
            </div>
           
            <div>
              <button id="save"> Save </button>
            </div>
          </div>
        </div>
  <table className="table table-striped">
    <thead>
        <tr>
          <th>checklist_id</th>
          <th>contents</th>
          <th>viewpoint</th>
          <th> main_dept </th>
          <th>related_dept</th>
          <th style={{width:'10%'}}>result
            </th>
          


          <th>updated_date</th>
          <th>is_checked</th>
          <th>reminder</th>
          <th>rule_doc_id</th>
          <th>evid_doc_id</th>
        </tr>
    </thead>
  <tbody>
    {data}
    </tbody>  
    
  

  </table>

  </div>
 );

}
export default ChecklistPage;