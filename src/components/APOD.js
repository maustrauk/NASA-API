import '../styles/APOD.css';

import React, {useState, useEffect} from "react";
import axios from "axios";
import moment from "moment";

import {APOD_API_URL, API_KEY} from "../mic/mic";


const errorObj ={
  date : "n/a",
  url : "https://cdn.dribbble.com/users/1449854/screenshots/4136663/no_data_found.png",
  title : "No Data found",
  explanation : "NASA didn't upload APOD yet! Wait for couple hours. ",
  hdurl : "n/a",
  copyright : "n/a",
};




const Carousel = props => {
  return (
    <div className="Carousel">
    </div>
  )
}

const APODForm = props => {
  return (
    <div className="APODForm">

    </div>
  )
}

const APODImg = props => {

  const {APODobj} = props;

  return (
    <div className="APODImg">
      <img src={APODobj.url} alt="APOD"/>
    </div>
  )
}



function APOD() {

  const [carouselDateArray, setCarouselDateArray] = useState([]);//dates array
  const [APODImgObj, setAPODImgObj] = useState({});// APOD objects
  
  useEffect (() => {
    // Using moment library to get dates for Carousel
    const dates = carouselDateArray;

    for (let i = 0; i < 6; i++) {
      dates.push(moment().subtract(i, 'day').format('YYYY-MM-DD').toString());
    }
    
    setCarouselDateArray(dates);
  }, []);
  
  
  useEffect(() => {

    axios
      .get(`${APOD_API_URL}?api_key=${API_KEY}&date=${carouselDateArray[0]}`)
        .then(res => {
          setAPODImgObj(res.data);
        })
        .catch(err => {
          console.log("Error: ",err);
        })
    


  },[]);

  

  return (
    <div className="APOD-container">
      <Carousel />
      <div className="under-carousel">
        <APODForm />
        <APODImg APODobj={APODImgObj}/>
      </div>
    </div>
  );
}

export default APOD;