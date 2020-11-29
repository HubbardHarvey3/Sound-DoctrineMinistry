import { Component, OnInit } from '@angular/core';
//import the service
import { ApiService } from "../services/api.service";
import { SortService } from "../services/sort.service"



@Component({
  selector: 'app-manage-stream',
  templateUrl: './manage-stream.component.html',
  styleUrls: ['./manage-stream.component.css']
})
export class ManageStreamComponent implements OnInit {
  messages: any = [];
  result: object = {};
  fileName: object = {}
  htmlHide = false;


  constructor(private _api: ApiService, private sort: SortService) { }

  ngOnInit(): void {
    this._api.getConfig().subscribe(data => {
      // the json file Name filed is the name of the audio file
      //it is used as the src in the audio tag
      //the title, is the data that will be displayed above each audio tag.
      this.messages = data;
    })

  }

  // Function grabs the item.name from the front end and filters out to the this.messages array all elements NOT
  // equal to the item.name in question
  updateItem(itemName) {
    this.htmlHide = true
    this.messages = this.messages.filter(function (JSON) {
      return JSON.name !== itemName
    })
    // now we need to send the updated messages array to the backend:
    this._api.overWriteBroadcast(this.messages).subscribe(
      res => console.log(res),
      err => {
        console.log(err.error.text)
        if (err.error.text === "Broadcast Deleted") {
          this.htmlHide = false

        } else {
          alert("ERROR")
        }
      }
    )
    // turn the file name into an object to be sent to the backend
    this.fileName = { itemName }
    // Send file name which is now an object to node.js
    this._api.deleteActualFile(this.fileName).subscribe(
      res => console.log(res),
      err => {
        console.log(err)
        if (err.error.text === "File Removed") {
          this.htmlHide = false
          alert("The Broadcast was deleted")
        } else if (err.error === 'No File Found') {
          alert("File Not Found")
          this.htmlHide = false
        } else {
          alert("Error")
          this.htmlHide = false
        }
      }
    )
  }

}
