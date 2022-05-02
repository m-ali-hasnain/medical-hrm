import React from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import './style.css'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const Player = () => {
  const { state } = useLocation();
  const { id } = state;
  const [isRecording, setIsRecording] = React.useState(false);
  const [isBlocked, setIsBlocked] = React.useState(false);
  const [blobURL, setBlobURL] = React.useState('');
  const start = () => {
    if (isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder
        .start()
        .then(() => {
          setIsRecording(true);
        }).catch((e) => console.error(e));
    }
  };

  const stop = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob)
        setBlobURL(blobURL);
        setIsRecording(false);
      }).catch((e) => console.log(e));
  };
  const save_recording = async () => {
    try {
      const bodyData = {
        blobUrl: blobURL,
        patientId: id
      }
      const {data} = await axios.post('http://localhost:5000/patients/create_recording/', bodyData);
      if(data){
        alert(`Recording ${data._id} sent successfully`);
      }
    } catch (error) {
        console.log(error);
    }
  }
  React.useEffect(()=>{
    navigator.getUserMedia({ audio: true },
      () => {
        console.log('Permission Granted');
        setIsBlocked(false);
      },
      () => {
        console.log('Permission Denied');
        setIsBlocked(true);
      },
    );
  },[])

  return (
    <div class="mainContainer">
        <div class="mb-2">
          <button class="btn btn-success" onClick={start} disabled={isRecording}>Record</button>
          <button class="btn btn-danger" onClick={stop} disabled={!isRecording}>Stop</button>
        </div>
          <div class="mb-2">
          <audio src={blobURL} controls="controls" />
        </div>
        <div>
          <button className="btn btn-danger" onClick={save_recording}>Send</button>
        </div>
    </div>
  );
}
export default Player;
