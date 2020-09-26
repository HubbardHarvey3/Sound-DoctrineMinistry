import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //need to change once I go into PROD***************************************
  prod = "https://sound-doctrineministry.org/"
  dev = "http://localhost:3000/"

  configURL = this.prod + 'audio/json'
  //"https://sound-doctrineministry.org/json"  PROD
  //'http://localhost:3000/audio/json'              DEVELOPMENT
  uploadURL = this.prod + 'api/upload'
  uploadAudioFileURL = this.prod + 'api/uploadAudio'

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

}
