import React, { Component, useState, useEffect } from 'react';
import { Image, Transformation, CloudinaryContext } from 'cloudinary-react';
import axios from 'axios';
import "./App.scss"

const url = "https://api.cloudinary.com/v1_1/majdi10/image/upload";

const preset = "unsplash10"

const App = () => {

    const [Name, setName] = useState("");
    const [urlImage, setUrl] = useState("");
    const [arr, setArr] = useState([]);

    // get imagesRequest

    const getimages = () => {
        axios.get('/images').then((res) => {
            setArr(res.data)

        })
    }

    useEffect(() => {
        getimages()
    })

    // uploading the image and save it in database

    const uploading = () => {


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
            var fileoutput = document.getElementById('output');
            fileoutput = readfiles.result;
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

    // delete an image

    const handleDelete = (id) => {
        axios.delete('/delimage/' + id).then((res) => {
            console.log(res)
        })

    }

    // search for an imagename

    const handleSearch = (Name)=>{
        axios.get('/searchimg/'+ Name).then((res)=>{
            console.log(Name)
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
                <button type="submit"  onClick={handleSearch}><i className="fa fa-search">Search</i></button>
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
                            <div>
                                <Image style={{ width: 150 ,  height: 220 ,  margin: 10 , borderRadius:8, boxshadow:8 }} publicId={element.urlImage}  >
                                    <Transformation width="100" height="100" gravity="faces" crop="thumb" />
                                </Image>
                                <p>{element.Name}</p>
                            </div>
                            <button id="delbtn" onClick={()=>handleDelete(element.id)}>remove</button>
                        </CloudinaryContext>
                    ))
                }
            </div>

        </div>
    )
}

export default App;
