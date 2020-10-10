import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //need to change once I go into PROD***************************************
  prod = "https://sound-doctrineministry.org/"
  dev = "http://localhost:3000/"

  configURL = this.dev + 'audio/json'
  //"https://sound-doctrineministry.org/json"  PROD
  //'http://localhost:3000/audio/json'              DEVELOPMENT
  uploadURL = this.dev + 'api/upload'
  uploadAudioFileURL = this.dev + 'api/uploadAudio'
  overwriteURL = this.dev + 'api/deleteBroadcasts'
  fileToDeleteURL = this.dev + 'api/deleteFile'

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

  deleteActualFile(fileName) {
    return this.http.post<any>(this.fileToDeleteURL, fileName).pipe()
  }
}
