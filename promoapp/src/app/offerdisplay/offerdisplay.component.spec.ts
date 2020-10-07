import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferdisplayComponent } from './offerdisplay.component';

describe('OfferdisplayComponent', () => {
  let component: OfferdisplayComponent;
  let fixture: ComponentFixture<OfferdisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferdisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
