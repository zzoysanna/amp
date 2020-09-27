import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLineComponent } from './form-line.component';

describe('FormLineComponent', () => {
  let component: FormLineComponent;
  let fixture: ComponentFixture<FormLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
