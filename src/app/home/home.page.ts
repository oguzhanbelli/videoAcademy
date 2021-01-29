import { Component, ElementRef, ViewChild } from "@angular/core";
import { PhotoService } from "../services/photo.service";
import { VideoService } from "../services/video.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
 
  videoPlayer: any;
  mediaRecorder: MediaRecorder;
  isRecording= true;
  videos = [];
  @ViewChild('video') captureElement:ElementRef;

  constructor(private videoService: VideoService,public photoService: PhotoService) {}

  async recordVideo() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'user',
      },
      audio: true,
    });
    this.captureElement.nativeElement.srcObject=stream;
    
    const options={mimeType:'video/webm'};
    this.mediaRecorder == new MediaRecorder(stream,options);
    let chunks = [];
    this.mediaRecorder.ondataavailable = (event) =>{
      if(event.data && event.data.size > 0){
        chunks.push(event.data)
      }
    }
    this.mediaRecorder.onstop = async (event) => {
      const videoBuffer = new Blob(chunks,{type:'video/webm'});
    }
    //Video ve listeyi yenileme
  }

  stopRecord() { 
    this.mediaRecorder.stop();
    this.mediaRecorder=null;
    this.captureElement.nativeElement.srcObject = null;
    this.isRecording= false;

  }

  async play(video) {}

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
  
}

