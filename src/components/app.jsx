import React, { useState } from 'react';
import { Image } from 'cloudinary-react';
import axios from 'axios';

import "./Style.css"

// const url = "https://api.cloudinary.com/v1_1/majdi10/image/upload"

const App = () => {

    const [ChossenImage, setImage] = useState("");
    const [url, setUrl] = useState("");


    const uploading = () => {
        const ImageData = new FormData();
        ImageData.append('file', ChossenImage);
        ImageData.append("upload_preset", "unsplash10");

        axios.post("https://api.cloudinary.com/v1_1/majdi10/image/upload",
            ImageData).then((res) => {
                console.log(res)
            })

        // axios({
        //     url: url,
        //     method: 'post',
        //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        //     data: ImageData
        // }).then((res) => {
            
        //     setUrl({ url: res.data.secure_url })
            
        // })
        //     .catch((err) => {
        //         console.error(err)
        //     })

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




    return (


        <div>
            <h1>helllooo</h1>
            <br />
            <div className="search-container">
                <div className="input-container">
                    <input type="text" placeholder="Search herer" onChange={(e)=>(e.target.value)}/>
                </div>
                <button type="submit" ><i className="fa fa-search">Search</i></button>
            </div>
            <br />

            <input type="file" onChange={(e) =>
                setImage(e.target.files[0])}></input>
            <button style={{ color: 'green' }} onClick={uploading}>Add Image</button>
            <br />
            <div>
                <Image style={{ width: 150, height: 220, margin: 10, margintop: 15 }} cloudName="majdi10" publicId="" />
            </div>
        </div>
    )

}

export default App;
