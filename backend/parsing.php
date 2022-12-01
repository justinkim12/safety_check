<?php

//data.php

$connect = new PDO("mysql:host=localhost;dbname=esgmanagement", "root", "password");

if(isset($_POST["action"]))
{
    if($_POST["action"] == 'save_cal'){
            $events=$_POST['event'];
            $new_ev=$_POST['new_event'];

            $title=$new_ev['title'];
            $start=$new_ev['start'];
            $end=$new_ev['end'];
            $memo=$new_ev['description'];
            print_r($start);
            print_r('~');
            print_r($end);
            print_r(" ");
            print_r($title);
            $query="INSERT into calender (schedule_name,start_date,end_date,alert,memo) values('$title','$start','$end',0,'$memo');";
            $connect->query($query); 

    }

	if($_POST["action"] == 'save')
	{
		
		$check=$_POST["isChecked_list"]; //체크되어있는 리스트
        $main=$_POST['main_dept_list'];
        $related=$_POST['related_dept_list'];
        $result=$_POST['result'];
        $reminder=$_POST['reminder'];




        $query="UPDATE `esgmanagement`.`checklist` 
        SET `is_checked` = '0' "; // 0 초기화 후
        $connect->query($query);
        for($i=0;$i<count($check);$i++){
            $id=$check[$i];
            $query="UPDATE `esgmanagement`.`checklist` 
            SET `is_checked` = '1' WHERE (`checklist_id` = '$id');";
            $connect->query($query); //체크되어있는 것들 1로 바꾸기
        }
        // print_r($check);

        
        if($main){
            foreach($main as $key => $value){
                $query="UPDATE checklist set main_dept='$value' where checklist_id='$key'";
                $connect->query($query);
                // print_r($main);
            }
        }
        if($related){
            foreach($related as $key => $value){
                $query="UPDATE checklist set related_dept='$value' where checklist_id='$key'";
                $connect->query($query);
                // print_r($related);
            }
        }
        if($result){
            foreach($result as $key => $value){
                $query="UPDATE checklist set result='$value' where checklist_id='$key'";
                $connect->query($query);
                // print_r($result);
            }
        }
        if($reminder){
            foreach($reminder as $key => $value){
                $query="UPDATE checklist set reminder_cnt='$value' where checklist_id='$key'";
                $connect->query($query);
                // echo $query;
            }
        }
        print_r("Saved Successfully");
	}
}


?>