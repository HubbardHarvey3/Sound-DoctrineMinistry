import { Component, OnInit, Injectable } from '@angular/core';



//import the service
import { ApiService } from "../api.service";




@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit {

  messages: any = [];
  audio = new Audio;
  monthVar = "";
  currentMonth: Date = new Date();
  monthArray: Array<string> = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Novemeber", 'December'];
  // pipeMessage = "TEST"


  //In order to bring in a service, you initialize as an argument in the constructor as shown below
  constructor(private svc: ApiService) { }

  filterSubmit(month) {
    this.svc.getConfig().subscribe(data => {
      // the json file Name filled is the name of the audio file
      //it is used as the src in the audio tag
      //the title, is the data that will be displayed above each audio tag.
      this.messages = data;
    })
  }


  ngOnInit(): void {
    this.filterSubmit(this.monthVar);
    this.setSelect()
  }

  setSelect(){
    console.log(this.currentMonth.getMonth())

    for (let i = 0; i <= this.monthArray.length; i++) {
      
      if (this.currentMonth.getMonth() - 1 === i) {
        console.log(this.monthArray[i])
      }  
      
    }
    

  }
}
