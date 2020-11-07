import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamComponent } from './stream.component';

import { ApiService } from "../api.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from '@angular/router/testing';

import { By } from "@angular/platform-browser";

import { DebugElement } from '@angular/core';


describe('StreamComponent', () => {
  let component: StreamComponent;
  let fixture: ComponentFixture<StreamComponent>;
  let month = new Date()
  let monthArray: Array<string> = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", 'December'];


  fixture = TestBed.createComponent(StreamComponent);
  fixture.detectChanges();


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [StreamComponent],
      providers: [ApiService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    // we are accessing "h1"
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(title.innerHTML).toBe('Listen to Sound Doctrine');

  });

  it('Make sure <SPAN> mimics the correct src in the ngFor loop ', () => {
    fixture.detectChanges();
    const bannerDe: DebugElement = fixture.debugElement;
    const paragraphDe = bannerDe.query(By.css('span'));
    const span: HTMLElement = paragraphDe.nativeElement;
    expect(span.id).toEqual("https://sound-doctrineministry.org/audio/");
  });

  it('Check the current month selected is for the right month', () => {
    fixture.detectChanges();
    if (component.selector === "") {
      expect(monthArray[month.getMonth()] == component.selector)
    }

  })


});
