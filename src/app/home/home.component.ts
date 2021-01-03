import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  closeBool: boolean = true
  messages: any = [];
  previewArray: any = [];
  episodeNum: number;
  count: number = 5;
  constructor(private svc: ApiService) { }


  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }

  // For the footer to close
  close() {
    this.closeBool = false
  }

  // retrieves JSON list
  getJson() {
    this.svc.getConfig().subscribe(data => {
      this.messages = data;
      for (let i = 4; i >= 0; i--) {
        this.previewArray.push(this.messages[i])
      }
    })
  }
  ngOnInit(): void {
    this.getJson()
  }
}