import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DurationPipe } from './duration-pipe/duration.pipe';


@NgModule({
  declarations: [
    DurationPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DurationPipe,
  ]
})
export class SharedModule { }
