import { Injectable } from '@angular/core';
import {
  Plugins,FilesystemDirectory
} from '@capacitor/core';
const {Filesystem,Storage} = Plugins

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  public videos  = [];
    private VIDEOS_KEY:string ='videos';
    async loadVideos(){
      const videoList = await Storage.get({key: this.VIDEOS_KEY});
      this.videos = JSON.parse(videoList.value) || [];
      return this.videos;

    }

    async storeVideo(blob){
      const fileName = new Date().getTime()+'.mp4';
      
    }
  constructor() { }
}
