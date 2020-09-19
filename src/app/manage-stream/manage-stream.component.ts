import { Component, OnInit } from '@angular/core';
//import the service
import { ApiService } from "../api.service";
import { SortService } from "../sort.service"



@Component({
  selector: 'app-manage-stream',
  templateUrl: './manage-stream.component.html',
  styleUrls: ['./manage-stream.component.css']
})
export class ManageStreamComponent implements OnInit {
  messages: any = [];
  result: object = {};
  htmlHide = false;
  //stuck on trying to sort the JSON messages after someone edits the messages file.
  // num = [{ 'title': "9-1-2020", 'file': 'thisone.wav' }, { 'title': "9-11-2020", 'file': 'blank' }, { 'title': "9-2-2020", 'file': 'None' }]

  constructor(private _api: ApiService, private sort: SortService) { }

  ngOnInit(): void {
    this._api.getConfig().subscribe(data => {
      // the json file Name filed is the name of the audio file
      //it is used as the src in the audio tag
      //the title, is the data that will be displayed above each audio tag.
      this.messages = data;
      // console.log(this.num.sort())
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
      err => console.log(err)
    )
    console.log(itemName)
    setTimeout(() => this.htmlHide = false, 5000)
  }

}
