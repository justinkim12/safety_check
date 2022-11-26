import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ConsoleView } from "react-device-detect";
import axios from 'axios';

function Home() {
  var id=11;
  const [file, setFile] = useState()

  function handleChange(event) {
    setFile(event.target.files[0])
  }
  
  function handleSubmit(event) {
    event.preventDefault()
    const url = '/uploadFile';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    });

  }


  return(
    <div>
      <div>
      <div><a href='./document'>document</a></div>
      <div><a href='./calender'>calender</a></div>
      <div><a href='./progress'>progress</a></div>
      <div><a href='./checklist'>checklist</a></div>
      </div>
      <div class="row">
        <form action={`/221119_save/filesLogic.php?id=${id}`} method="post" enctype="multipart/form-data" >
          <h3>Upload File</h3>
          <input type="file" name="myfile"/>
          <button type="submit" name="save">upload</button>
        </form>
      </div>


    </div>
  );
}
export default Home;