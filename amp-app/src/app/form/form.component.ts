import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'amp-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public form: FormArray;
  public nodes = [
    {
      id: 1,
      type: 'twitter',
      value: 'adsdasd',
    },
    {
      id: 2,
      type: 'vk',
      value: 'dsfsdf',
    },
    {
      id: 3,
      type: 'twitter',
      value: 'sdsdsd',
    },
    {
      id: 4,
      type: 'instagram',
      value: 'xcvxcvxcv',
    }
  ];

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.createForm();
  }

  addItem(): void {
    this.form.push(this.fb.group({
      id: [this.nodes[this.nodes.length - 1].id + 1 ],
      type: ['', [Validators.required]],
      value: ['', [Validators.required]]
    }));
  }

  deleteItem(index): void {
    this.form.removeAt(index);
  }

  createForm(): FormArray {
    const array = [];
    this.nodes.forEach(node => {
      const group = this.fb.group({
        id: [node.id],
        type: [node.type, [Validators.required]],
        value: [node.value, [Validators.required]]
      });
      array.push(group);
    })
    return this.fb.array(array);
  }

  printForm() {
    console.log(this.form.value);
  }

  printNodes() {
    console.log(this.nodes);
  }
  

}
