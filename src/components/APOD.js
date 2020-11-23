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
      <form>
        <div className="input">
          <input type="date"
          value={date.format('YYYY-MM-DD').toString()}
          onChange={onChange}/>
          <button>Submit</button>
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
      <p>{APODobj.date}</p>
      <img src={APODobj.url} alt="APOD"/>
      <div>
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


  },[]);

  

  return (
    <div className="APOD-container">
      <APODForm date={APODdate} setAPODdate={setAPODdate}/>
      <APODImg APODobj={APODImgObj}/>
    </div>
  );
}

export default APOD;