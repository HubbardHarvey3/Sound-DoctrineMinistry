import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  sentFlag = false;
  showH1 = 'none';
  showForm = ''
  constructor() { }

  submitEmail(event: Event) {
    // event.preventDefault();
    this.sentFlag = !this.sentFlag;

    if (this.sentFlag) {
      this.showH1 = '';
      this.showForm = 'none'

    }

  }

  ngOnInit(): void {
  }

}
