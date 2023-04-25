import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { Grid } from "@mui/material";



function MemeMaker() {
    const [memeTemplates, setMemeTemplates] = useState([]) // array of images
    const [chosenTemplate, setChosenTemplate] = useState("")

    useEffect(()=>{

        if (!memeTemplates.length){
            console.log("hello")
            getMemes()
        }     
    },[])

    function getMemes(){
        axios.get(`https://api.imgflip.com/get_memes`)
      .then(res => {
        console.log(res.data.data.memes)
        setMemeTemplates(res.data.data.memes)})
    }

    function handleMemeSelect(e){
        console.log(e.currentTarget.id)
        setChosenTemplate(e.currentTarget.id)
    }

    function generateMeme(){
        const body = { 
            template_id: chosenTemplate,
            text0: "Test1",
            text1: "Test2",
            username: "paleksyeyev",
            password:"docitimgflip"
         };
        axios.post('https://api.imgflip.com/caption_image', body).then(res=>{
            console.log(res)
        })
    }
    return (
        <div>
            MemeMaker
            <button onClick={generateMeme}>Generate</button>
            <br/>
            {chosenTemplate}

            <Grid container 
            display="inline-flex"
            justifyContent="center"
            alignItems="center"
            >
                <Grid item xs={6}>
                {
                <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                {memeTemplates.map((item) => (
                  <ImageListItem key={item.id}>
                    
                    <img
                      id ={item.id}
                      onClick={handleMemeSelect}
                      src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.title}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            }

                </Grid>
                <Grid item xs={6}>
                    Hello
                </Grid>

            </Grid>
            
        </div>
    )
}

export default MemeMaker