import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffereditComponent } from './offeredit.component';

describe('OffereditComponent', () => {
  let component: OffereditComponent;
  let fixture: ComponentFixture<OffereditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffereditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
