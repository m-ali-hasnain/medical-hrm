import React, { useState, useEffect } from "react";
import "./style.css";
import Waveform from "./WaveForm";
import axios from "axios";
import { useLocation } from "react-router-dom";
// const url = "https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3";
export default function Player() {
  const { state } = useLocation();
  const { id } = state;
  const [tracks, setTracks] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [current, setCurrent]  = useState("./assets/aud_2.wav");

  const fetchRecordings = async () => {
    try{
      const { data } = await axios.get(`http://localhost:5000/patients/recordings/${id}`);
      setTracks(data.recordings);
      setCurrent(data.recordings[0].blobUrl);
      setIsLoading(false);
    }
    catch(error){
      console.log(error);
    }
  }

  const changeTrack = (track) => {
    setCurrent(track.blobUrl);

  }
  React.useEffect(()=>{
    setIsLoading(true);
    fetchRecordings();
    setIsLoading(false);
  },[])


  return (
    <div className="main">
      {loading ? "Loading Recordings..." : <>

      <h3 style={{color: 'white'}}>Selected Track: {current} </h3>
      <Waveform url={current} />
      {tracks.map((track)=>{
       
        return <div className="container d-flex justify-content-between border mb-2">
          <p className="text-white">{track.blobUrl}</p>
          <button className="btn btn-danger" onClick={()=>changeTrack(track)}>Play</button>
        </div>
      })}
      </>}
    </div>
  );
}

