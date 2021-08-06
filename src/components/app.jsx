import React, {useState} from 'react';
import {Image} from 'cloudinary-react'
import axios from 'axios';



const App = ()=>{

    const [ChossenImage, setImage] = useState("");
    // const [url, setUrl] = useState("");


    const uploading = ()=>{
        const ImageData = new FormData();
        ImageData.append('file',ChossenImage);
        ImageData.append("upload_preset","unsplash10");
         
        axios.post("https://api.cloudinary.com/v1_1/majdi10/image/upload",
        ImageData).then((res)=>{
            console.log(res)
        })
    
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
              setImage(e.target.files[0])}></input>

              <button onClick={uploading}>Add Image</button>
            
              <div>
              <Image  cloudName="majdi10" publicId ="https://res.cloudinary.com/majdi10/image/upload/v1628261932/sbdjnhxs4t8hsqrptxrb.jpg"/>
              </div>
       </div>
   )

}

export default App;
