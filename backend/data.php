


<?php
// MySQL에서 테이블 데이터를 가져오는 PHP 파일


$dbConn = mysqli_connect("127.0.0.1", "root", "password",
"esgmanagement") or die("실패 시 출력할 문구");

if($_GET['data']=='checklist'){
    $sql = "select * from Checklist where checklist_id<10
    union
    select * from checklist where checklist_id>10;";

}

if($_GET['data']=='document'){
    $id=$_GET['id'];
    // echo 'HI';
    $sql="select * from document where doc_id='$id';";
}

if($_GET['data']=='calender'){

    $sql="select * from calender; ";
}
// ResultSet에 $dbConn과 $sql을 인자값으로 전달
$rs = mysqli_query($dbConn, $sql);


// 데이터를 담을 배열을 생성
$articles = array();

while (true) {
	$article = mysqli_fetch_assoc($rs);
    
    // 더 이상 불러올 row가 없을 때 break
    if ($article == null) {
    	break;
    }
    $articles[] = $article;
}
$result_array = json_encode($articles, JSON_UNESCAPED_UNICODE);
    
echo $result_array;
?>