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

const loader = (callback, date) => {
//Loading APOD's objects
  axios
      .get(`${APOD_API_URL}?api_key=${API_KEY}&date=${date}`)
        .then(res => {
          callback(res.data);
        })
        .catch(err => {
          console.log("Error: ",err);
        });

}


const Carousel = props => {

  const {obj1, obj2, obj3, obj4, obj5} = props;

  return (
    <div className="Carousel">
      <img src={obj1.url} alt="Carousel 1"/>
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
  

  // APOD objects
  const [APODImgObj, setAPODImgObj] = useState({});
  const [carouselObj1, setCarouselObj1] = useState({});
  const [carouselObj2, setCarouselObj2] = useState({});
  const [carouselObj3, setCarouselObj3] = useState({});
  const [carouselObj4, setCarouselObj4] = useState({});
  const [carouselObj5, setCarouselObj5] = useState({});


  useEffect (() => {
    // Using moment library to get dates for Carousel
    const dates = carouselDateArray;

    for (let i = 0; i < 6; i++) {
      dates.push(moment().subtract(i, 'day').format('YYYY-MM-DD').toString());
    }
    
    setCarouselDateArray(dates);
  }, []);
  
  
  useEffect(() => {

    loader(setAPODImgObj, carouselDateArray[0]);
    loader(setCarouselObj1,carouselDateArray[1]);
    loader(setCarouselObj2,carouselDateArray[2]);
    loader(setCarouselObj3,carouselDateArray[3]);
    loader(setCarouselObj4,carouselDateArray[4]);
    loader(setCarouselObj5,carouselDateArray[5]);


  },[]);

  

  return (
    <div className="APOD-container">
      <Carousel obj1={carouselObj1} obj2={carouselObj2} obj3={carouselObj3} obj4={carouselObj4} obj5={carouselObj5}/>
      <div className="under-carousel">
        <APODForm />
        <APODImg APODobj={APODImgObj}/>
      </div>
    </div>
  );
}

export default APOD;