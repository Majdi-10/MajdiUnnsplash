import React, { Component, useState, useEffect } from 'react';
import { Image, Transformation, CloudinaryContext } from 'cloudinary-react';
import axios from 'axios';

import "./App.scss"

const url = "https://api.cloudinary.com/v1_1/majdi10/image/upload";
const preset = "unsplash10"

const App = () => {

    const [Name, setName] = useState("");
    const [urlImage, setUrl] = useState("");
    const [arr, setArr] = useState([])
   
    // get imagesRequest
    const getimages = () => {
        axios.get('/images').then((res) => {
            setArr(res.data)
            //   console.log(arr)
        })
    }

    useEffect(() => {
        getimages()
    })

 // uploading the image and save it in database
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

    // getting the uplaoded image and save it to cloudinary

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
            // console.log('answer for post request:', res.data.secure_url)
            setUrl(res.data.secure_url)
            // console.log("state url:", urlImage);
        })
            .catch((err) => {
                console.error(err)
            })
    }

    return (

        <div>
            <h1>Hellooo</h1>
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
            <label>Tape you image name:</label>
            <input type="text" placeholder="image name" onChange={(e) => setName(e.target.value)}></input>
            <div className="bttn">
                <button id="btn" onClick={uploading}>Add Image</button>
            </div>
            <br />

            <div>
                {
                    arr.map((element, index) => (

                        <CloudinaryContext cloudName="majdi10" key={index}>
                            <Image publicId={element.urlImage}  >
                                <Transformation width="100" height="100" gravity="faces" crop="thumb" />
                            </Image>
                        </CloudinaryContext>
                    ))
                }
            </div>

        </div>
    )
}

export default App;
