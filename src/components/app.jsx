import React, {useState} from 'react';
import axios from 'axios';



const App = ()=>{

    const [Image, setImage] = useState("");
    const [url, setUrl] = useState("");


    const uploading = (files)=>{
        const formData = new FormData();
        formData.append('file',files[0]);
        formData.append("upload_preset","unsplash10");

        axios.post('/upload',"https://api.cloudinary.com/v1_1/majdi10/image/upload",formData).then((res)=>{
            
        }); 
    }


    // const uploadImage = () =>{
    //     const data = new FormData()
    //     data.append("file", image)
    //     data.append("upload_preset", "tutorial")
    //     data.append("cloud_name", "majdi10")

    //     fetch("  https://api.cloudinary.com/v1_1/majdi10/image/upload",{
    //          method:"post",
    //          body: data
    //         })
    //         .then(resp => resp.json())
    //         .then(data =>{
    //             setUrl(data.url)
    //         })
    //         .catch(err => console.log(err))
    // }




   return(
    

       <div>
           <h1>helllooo</h1>
          
              <input type="file" onChange={(e)=>
              uploading(e.target.files[0])}></input>

              {/* <button onClick={uploading}>Add Image</button> */}
            

              {/* <Image  src={url}/> */}
       </div>
   )

}

export default App;
