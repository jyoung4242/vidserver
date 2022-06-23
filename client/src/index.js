import './style.css';
import axios from 'axios';

let myDiv = document.createElement('div');
let myVid = document.createElement('video');
let source = document.createElement('source');

myDiv.appendChild(myVid);
document.body.appendChild(myDiv);
myVid.appendChild(source);

const playNextVideo = () => {
    // Optionally the request above could also be done as
    axios.get('http://localhost:8000/next').then(function (response) {
        //console.log(response);
        const { path } = response.data;

        console.log(response.status, path)

        if (response.status === 200) {
            myVid.pause();
            source.setAttribute('src', `http://localhost:8000/video/${path}`);
            source.setAttribute('type', 'video/mp4');
            myVid.load();
            myVid.play();
        }
    });
}

myVid.onended = () => {
    playNextVideo();   
};
playNextVideo();

myVid.controls = true;
myVid.autoplay = true;
myVid.muted = true;
