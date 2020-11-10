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
    "month": "",
    "episode": null
  }
  audioFile;
  htmlHide = false
  broadcastNum: number;
  messages: any = [];


  constructor(private _api: ApiService, public _authService: AuthService) { }

  ngOnInit(): void {
    this.getepisode()
  }

  getepisode() {
    this._api.getConfig().subscribe(data => {
      // the json file Name filled is the name of the audio file
      //it is used as the src in the audio tag
      //the title, is the data that will be displayed above each audio tag.
      this.messages = data;
    })

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
      err => {
        console.log(err.error.text)
        if (err.error.text === "Success") {
          this.htmlHide = false
        } else {
          alert("ERROR")
        }
      }
    )
    this.getepisode()
  }
  // Grab the file from the input box and assign to variable on change event
  fileEvent(fileInput) {
    this.fileJSON.name = fileInput.target.files[0].name
    this.audioFile = fileInput.target.files[0]
  }
}
