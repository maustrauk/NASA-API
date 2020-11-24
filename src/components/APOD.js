import '../styles/APOD.css';

import React, {useState, useEffect} from "react";
import axios from "axios";
import moment from "moment";

import {APOD_API_URL, API_KEY} from "../mic/mic";

const initDate = moment();

export const loader = (callback, date) => {
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


const APODForm = props => {

  const {date, setAPODdate} = props;

  const onChange = event => {
    setAPODdate(moment(event.target.value));
  }


  return (
    <div className="APODForm">
      <form >
        <p>Choose your's date</p>
        <div className="input">
          <input type="date"
          value={date.format('YYYY-MM-DD').toString()}
          onChange={onChange}
          max={moment().format('YYYY-MM-DD').toString()}
          min={moment().subtract(5, "year").format('YYYY-MM-DD').toString()}/>
        </div>
      </form>
    </div>
  )
}

const APODImg = props => {

  const {APODobj} = props;

  return (
    <div className="APODImg">
      <h1>{APODobj.title}</h1>
      <p>Date: {APODobj.date}</p>
      <img src={APODobj.url} alt="APOD"/>
      <div className="explanation">
        <p>{APODobj.explanation}</p>
      </div>
    </div>
  )
}



function APOD() {

  // APOD objects
  const [APODImgObj, setAPODImgObj] = useState({});

  const [APODdate, setAPODdate] = useState(initDate);

  
  useEffect(() => {

    const date = APODdate.format('YYYY-MM-DD').toString();

    loader(setAPODImgObj, date);


  },[APODdate]);

  

  return (
    <div className="APOD-container">
      <APODImg APODobj={APODImgObj}/>
      <APODForm date={APODdate} setAPODdate={setAPODdate} />
    </div>
  );
}

export default APOD;