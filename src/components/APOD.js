import '../styles/APOD.css';

import React, {useState, useEffect} from "react";
import axios from "axios";

import {APOD_API_URL, API_KEY} from "../const/const.js";


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
  return (
    <div className="APODImg">
      <img src="" alt="APOD" />
    </div>
  )
}



function APOD() {

  const [apodObj, setApodObj] = useState({});
  const [apodDate, setApodDate] = useState('2020-10-04');


  
  useEffect(() => {
    axios
    .get(`${APOD_API_URL}?api_key=${API_KEY}`)
    .then(res => {
        setApodObj(res.data);
    })
    .catch(err => {
        console.log("Error: ",err);
        setApodObj(errorObj);
    })
  },[]);

  useEffect(() => {
    axios
    .get(`${APOD_API_URL}?api_key=${API_KEY}&date=${apodDate}`)
    .then(res => {
        setUserApodObj(res.data);
    })
    .catch(err => {
        console.log("Error: ",err);
        setApodObj(errorObj);
    })
},[apodDate]);

  const changeDate = date => {
    setApodDate(date);
  }

  return (
    <div className="APOD-container">
      <Carousel />
      <div className="under-carousel">
        <APODForm />
        <APODImg />
      </div>
    </div>
  );
}

export default APOD;