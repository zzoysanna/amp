import { ICourse } from "./course";

export class Course implements ICourse {
  constructor(
    public id: string,
    public title: string,
    public creationDate: string,
    public duration: number,
    public description: string
  ) {
    this.id = id;
    this.title = title;
    this.creationDate = creationDate;
    this.duration = duration;
    this.description = description;
  }
}
