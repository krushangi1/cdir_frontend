import { DatePipe } from "@angular/common";
import { Timestamp } from "rxjs";
import { Address } from "./address.model";
import { Contact } from "./contact.model";
import { Email } from "./email.model";

export class User{

  directoryId: number ;
  fullName: string ;
  createsAt:string;
  updatedAt:string;
  emails:Email[];
  contacts:Contact[];
  addresses:Address[];
  // addresses:string;
  // contacts:string;

}
