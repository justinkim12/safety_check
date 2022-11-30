import React from 'react';
import { ResponsiveSunburst } from '@nivo/sunburst'
import { useCallback, useEffect, useState,useMemo } from "react";
function Graph(props){

  const json_data=props.json;
  console.log(json_data);
  console.log(props.loading);
  console.log(props.isOpen);
  const [total,settotal]=useState([0,0,0,0,0,0,0]);
  const [check,setcheck]=useState([0,0,0,0,0,0,0]);
  var total_array=[0,0,0,0,0,0,0];
  var result_array=[0,0,0,0,0,0,0];
console.log(result_array);

useEffect(() => {  
const data_= json_data.map((info)=>{
    if(info.checklist_id[0]==4){
      if(info.result=='good'){
        result_array[0]=result_array[0]+1;
      }
      total_array[0]=total_array[0]+1;
    }
    if(info.checklist_id[0]==5){
      if(info.result=='good'){
        result_array[1]=result_array[1]+1;
      }
      total_array[1]=total_array[1]+1;
    }
    if(info.checklist_id[0]==6){
      if(info.result=='good'){
        result_array[2]=result_array[2]+1;
      }
      total_array[2]=total_array[2]+1;
    }
    if(info.checklist_id[0]==7){
      if(info.result=='good'){
        result_array[3]=result_array[3]+1;
      }
      total_array[3]=total_array[3]+1;
    }
    if(info.checklist_id[0]==8){
      if(info.result=='good'){
        result_array[4]=result_array[4]+1;
      }
      total_array[4]=total_array[4]+1;
    }
    if(info.checklist_id[0]==9){
      if(info.result=='good'){
        result_array[5]=result_array[5]+1;
      }
      total_array[5]=total_array[5]+1;
    }
    if(info.checklist_id[0]==1){
      if(info.result=='good'){
        result_array[6]=result_array[6]+1;
      }
      total_array[6]=total_array[6]+1;
    }


})
// console.log(result_array);
settotal(total_array);
setcheck(result_array);
  },[props]);
  console.log(total);
  console.log(check);
  var f = 0;
  if(props.id=='main'){
    f=1;
  var data = {
    "name": "nivo",
    "color": "hsl(288, 70%, 50%)",
    "children": [

          {
            "name": "4항_",
            "color": "hsl(245, 70%, 50%)",
            "loc": check[0]/total[0]
          },
          {
            "name": "5항_",
            "color": "hsl(86, 70%, 50%)",
            "loc": check[1]/total[1]
          },
          {
            "name": "6항_",
            "color": "hsl(1, 70%, 50%)",
            "loc": check[2]/total[2]
          },
          {
            "name": "7항_",
            "color": "hsl(271, 70%, 50%)",
            "loc": check[3]/total[3]
          },
          {
            "name": "8항_",
            "color": "hsl(95, 70%, 50%)",
            "loc": check[4]/total[4]
          },
          {
            "name": "9항_",
            "color": "hsl(68, 70%, 50%)",
            "loc": check[5]/total[5]
          },
          {
            "name": "10항_",
            "color": "hsl(211, 70%, 50%)",
            "loc": check[6]/total[6]
          }
        
      ,
      {
        "name": "Not Checked",
        "color": "hsl(83, 70%, 50%)",
        "loc": 1-check[0]/total[0] + 1-check[1]/total[1] + 1-check[2]/total[2] + 1-check[3]/total[3] + 1-check[4]/total[4] + 1-check[5]/total[5] +1-check[6]/total[6]
      }

       
       
    ]
  };}
  if(props.id=='g_1'){
    var data = {
      "name": "4항",
      "color": "hsl(288, 70%, 50%)",
      "children": [
            {
              "name": "4항_Checked",
              "color": "hsl(245, 70%, 50%)",
              "loc": check[0]
            }
          
        ,
            {
              "name": "4항_NotChecked",
              "color": "hsl(331, 70%, 50%)",
              "loc": total[0]-check[0]
            }
      ]
    };}
  if(props.id=='g_2'){
      var data = {
        "name": "5항",
        "color": "hsl(288, 70%, 50%)",
        "children": [
              {
                "name": "5항_Checked",
                "color": "hsl(245, 70%, 50%)",
                "loc": check[1]
              }
            
          ,
              {
                "name": "5항_NotChecked",
                "color": "hsl(331, 70%, 50%)",
                "loc": total[1]-check[1]
              }
        ]
      };}
  if(props.id=='g_3'){
        var data = {
          "name": "6항",
          "color": "hsl(288, 70%, 50%)",
          "children": [
                {
                  "name": "6항_Checked",
                  "color": "hsl(245, 70%, 50%)",
                  "loc": check[2]
                }
              
            ,
                {
                  "name": "6항_NotChecked",
                  "color": "hsl(331, 70%, 50%)",
                  "loc": total[2]-check[2]
                }
          ]
        };}
  if(props.id=='g_4'){
          var data = {
            "name": "7항",
            "color": "hsl(288, 70%, 50%)",
            "children": [
                  {
                    "name": "7항_Checked",
                    "color": "hsl(245, 70%, 50%)",
                    "loc": check[3]
                  }
                
              ,
                  {
                    "name": "7항_NotChecked",
                    "color": "hsl(331, 70%, 50%)",
                    "loc": total[3]-check[3]
                  }
            ]
          };}
  if(props.id=='g_5'){
            var data = {
              "name": "8항",
              "color": "hsl(288, 70%, 50%)",
              "children": [
                    {
                      "name": "8항_Checked",
                      "color": "hsl(245, 70%, 50%)",
                      "loc": check[4]
                    }
                  
                ,
                    {
                      "name": "8항_NotChecked",
                      "color": "hsl(331, 70%, 50%)",
                      "loc": total[4]-check[4]
                    }
              ]
            };}
  if(props.id=='g_6'){
              var data = {
                "name": "9항",
                "color": "hsl(288, 70%, 50%)",
                "children": [
                      {
                        "name": "9항_Checked",
                        "color": "hsl(245, 70%, 50%)",
                        "loc": check[5]
                      }
                    
                  ,
                      {
                        "name": "9항_NotChecked",
                        "color": "hsl(331, 70%, 50%)",
                        "loc": total[5]-check[5]
                      }
                ]
              };}
  if(props.id=='g_7'){
                var data = {
                  "name": "10항",
                  "color": "hsl(288, 70%, 50%)",
                  "children": [
                        {
                          "name": "10항_Checked",
                          "color": "hsl(245, 70%, 50%)",
                          "loc": check[6]
                        }
                      
                    ,
                        {
                          "name": "10항_NotChecked",
                          "color": "hsl(331, 70%, 50%)",
                          "loc": total[6]-check[6]
                        }
                  ]
                };}


    return (
      <div style= {(props.id=='main') ? { width: 'auto', height: '310px', margin: '0 auto' } : { width: 'auto', height: '150px', margin: '0 auto' }}>    
        <ResponsiveSunburst
          data={data}
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          id="name"
          value="loc"
          cornerRadius={2}
          borderColor={{ theme: 'background' }}
          colors={{ scheme: 'paired' }}
          childColor={{
              from: 'color',
              modifiers: [
                  [
                      'brighter',
                      0.1
                  ]
              ]
          }}
          enableArcLabels={true}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
              from: 'color',
              modifiers: [
                  [
                      'darker',
                      1.4
                  ]
              ]
          }}
        />
      </div>
    );
  }


export default Graph;