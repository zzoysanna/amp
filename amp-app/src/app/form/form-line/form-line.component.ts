import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'amp-form-line',
  templateUrl: './form-line.component.html',
  styleUrls: ['./form-line.component.scss']
})
export class FormLineComponent implements OnInit {

  @Input() group: FormGroup;
  @Output() onDelete = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
