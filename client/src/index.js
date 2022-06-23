import './style.css';
import axios from 'axios';

let myDiv = document.createElement('div');
let myVid = document.createElement('video');
let source = document.createElement('source');

myDiv.appendChild(myVid);
document.body.appendChild(myDiv);
myVid.appendChild(source);

source.setAttribute('src', 'http://localhost:8000/video');
source.setAttribute('type', 'video/mp4');

myVid.onended = () => {
    // Optionally the request above could also be done as
    axios.get('http://localhost:8000/next').then(function (response) {
        //console.log(response);
        if (response.status === 200) {
            myVid.pause();
            source.setAttribute('src', 'http://localhost:8000/video');
            source.setAttribute('type', 'video/mp4');
            myVid.play();
        }
    });
};

myVid.controls = true;
myVid.autoplay = true;
myVid.muted = true;
