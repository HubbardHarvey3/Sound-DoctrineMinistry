import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStreamComponent } from './manage-stream.component';

describe('ManageStreamComponent', () => {
  let component: ManageStreamComponent;
  let fixture: ComponentFixture<ManageStreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageStreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
