import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //need to change once I go into PROD***************************************
  configURL = 'http://localhost:3000/audio/json'
  //"https://sound-doctrineministry.org/audio/json"  PROD
  //'http://localhost:3000/audio/json'              DEVELOPMENT
  uploadURL = 'http://localhost:3000/api/upload'
  uploadAudioFileURL = 'http://localhost:3000/api/uploadAudio'
  overwriteURL = 'http://localhost:3000/api/deleteBroadcasts'

  printToConsole(arg) {
    console.log(arg);
  }
  constructor(private http: HttpClient) { }

  getConfig() {
    return this.http.get(this.configURL);
  }

  uploadAudio(audioData) {
    return this.http.post<any>(this.uploadURL, audioData);
  }

  uploadAudioFile(file) {
    return this.http.post<any>(this.uploadAudioFileURL, file).pipe();
  }

  overWriteBroadcast(data) {
    return this.http.post<any>(this.overwriteURL, data).pipe()
  }
}
