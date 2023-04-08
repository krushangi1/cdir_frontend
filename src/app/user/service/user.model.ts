import { DatePipe } from "@angular/common";
import { Timestamp } from "rxjs";
import { Email } from "./email.model";

export class User{

  directoryId: number ;
  fullName: string ;
  createdAt:string;
  updatedAt:string;
  emails:Email[];
  // addresses:string;
  // contacts:string;

}
