import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  fileJSON = {
    "name": "",
    "title": "",
    "month": ""
  }
  audioFile;
  htmlHide = false

  constructor(private _api: ApiService, public _authService: AuthService) { }

  ngOnInit(): void {
  }

  upload() {
    this.htmlHide = true
    this.fileJSON.name = this.fileJSON.name.replace(".mp3", "").replace(".MP3", "");
    const formData = new FormData();
    formData.append('audioFile', this.audioFile)

    // this service method updates the JSON
    this._api.uploadAudio(this.fileJSON).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
    // this service method actually sends the file to the server
    this._api.uploadAudioFile(formData).subscribe(
      res => alert(res),
      err => console.log(err)
    )
    setTimeout(() => this.htmlHide = false, 5000)

  }
  // Grab the file from the input box and assign to variable on change event
  fileEvent(fileInput) {
    this.fileJSON.name = fileInput.target.files[0].name
    this.audioFile = fileInput.target.files[0]
  }



}
