import { Pipe, PipeTransform } from '@angular/core';
import { Course } from "../../models/course.model";

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  public transform(array: Course[], fieldName: string, query?: string): Course[] {
    switch(fieldName){
      case 'creationDate':
        return array.slice().sort((item1, item2) => this.compareDates(item1[fieldName], item2[fieldName]));
      case 'title':
        return array.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
      default:
        return array;
    }
}

  public compareDates(dateString1: string, dateString2: string): number {
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);
    if(date1 === date2) {
      return 0;
    }
    return date1 > date2 ? 1 : -1;
  }

}
