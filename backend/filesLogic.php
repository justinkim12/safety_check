<?php
// 한국 시간 
date_default_timezone_set('Asia/Seoul'); 
// connect to the database
$conn = mysqli_connect('localhost', 'root', 'password', 'esgmanagement');

$sql = "SELECT * FROM document";
$result = mysqli_query($conn, $sql);

$files = mysqli_fetch_all($result, MYSQLI_ASSOC);

// Uploads files
if (isset($_POST['save'])) { // if save button on the form is clicked
    // name of the uploaded file
    $filename = $_FILES['myfile']['name'];

    // destination of the file on the server
    $destination = 'uploads/' . $filename;

    // get the file extension
    $extension = pathinfo($filename, PATHINFO_EXTENSION);

    // the physical file on a temporary uploads directory on the server
    $file = $_FILES['myfile']['tmp_name'];
    $size = $_FILES['myfile']['size'];
    $checklist_id=$_GET['id'];
    $date=date("Y-m-d H:i:s");
    $type=$_GET['type'];
    if (!in_array($extension, ['zip', 'pdf', 'docx'])) {
        echo "You file extension must be .zip, .pdf or .docx";
    } elseif ($_FILES['myfile']['size'] > 1000000) { // file shouldn't be larger than 1Megabyte
        echo "File too large!";
    } else {

        // move the uploaded (temporary) file to the specified destination
        if (move_uploaded_file($file, $destination)) {
            $sql = "INSERT INTO document (updated_date, doc_id, doc_name, doc_link,doc_type) VALUES ('$date','$checklist_id','$filename', '/uploads','$type')";

            if (mysqli_query($conn, $sql)) {
                echo "File uploaded successfully";
                if($type=='evid'){
                    $sql="UPDATE checklist set updated_date='$date' where checklist_id='$checklist_id'";
                    // echo $sql;
                    mysqli_query($conn,$sql);
                }
            }
            else{
                echo 'Upload failre';
            }
        } 
        else {
            echo "Failed to upload file.";
        }
    }
}

// Downloads files
if (isset($_GET['file_id'])) {
    $id = $_GET['file_id'];

    // fetch file to download from database
    $sql = "SELECT * FROM document WHERE doc_id=$id";
    $result = mysqli_query($conn, $sql);

    $file = mysqli_fetch_assoc($result);
    $filepath = 'uploads/' . $file['doc_name'];

    if (file_exists($filepath)) {
        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename=' . basename($filepath));
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize('uploads/' . $file['doc_name']));
        
        //This part of code prevents files from being corrupted after download
        ob_clean();
        flush();
        
        readfile('uploads/' . $file['doc_name']);

        // Now update downloads count
        // $newCount = $file['downloads'] + 1;
        // $updateQuery = "UPDATE files SET downloads=$newCount WHERE id=$id";
        // mysqli_query($conn, $updateQuery);
        exit;
    }

}
?>
