import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditButtonComponent } from './edit-button.component';
import { MatIconModule } from "@angular/material";
import { TranslateModule } from "@ngx-translate/core";

describe('EditButtonComponent', () => {
  let component: EditButtonComponent;
  let fixture: ComponentFixture<EditButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditButtonComponent ],
      imports: [
        MatIconModule,
        TranslateModule.forRoot(),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
