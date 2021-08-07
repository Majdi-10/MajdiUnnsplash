import React, { useState } from 'react';
import { Image } from 'cloudinary-react';
import axios from 'axios';

import "./Style.css"

const url = "https://api.cloudinary.com/v1_1/majdi10/image/upload";
const preset = "unsplash10"

const App = () => {

    const [Name, setName] = useState("");
    const [urlImage, setUrl] = useState("");


    const uploading = () => {
        // const ImageData = new FormData();
        // ImageData.append('file', ChossenImage);
        // ImageData.append("upload_preset", "unsplash10");
         console.log("front", Name)
         console.log("front", urlImage)


        axios.post('/uploading', { Name, urlImage }
        ).then((res) => {
            console.log(res)
        })

    }

    // getting the 

    const GetImageUrl = (e) => {
        var readfiles = new FileReader();
        

        readfiles.onload = function () {
            var output4 = document.getElementById('output');
            output4.src = readfiles.result;
        }
        readfiles.readAsDataURL(e.target.files[0]);
        var formData = new FormData()
        var file = e.target.files[0]
        formData.append('file', file)
        formData.append('upload_preset', preset)

        axios({
            url: url,
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: formData
        }).then((res) => {
            console.log('answer for post request:', res.data.secure_url)
            setUrl(res.data.secure_url)
            console.log("state imge:", urlImage);
        })
            .catch((err) => {
                console.error(err)
            })
    }

    return (


        <div>
            <h1>helllooo</h1>
            <br />
            <div className="search-container">
                <div className="input-container">
                    <input type="text" placeholder="Search herer" onChange={(e) => (e.target.value)} />
                </div>
                <button type="submit" ><i className="fa fa-search">Search</i></button>
            </div>
            <br />

            <input type="file" id="fileupload" onChange={GetImageUrl} ></input>
            <br />
            <h1>Put Here Your Image Name :</h1>
            <input type="text" placeholder="image name" onChange={(e) => setName(e.target.value)}></input>
            <button style={{ color: 'green' }} onClick={uploading}>Add Image</button>
            <br />
            <div>
                <Image style={{ width: 150, height: 220, margin: 10, margintop: 15 }} cloudName="majdi10" id="output" />
            </div>
        </div>
    )

}

export default App;
