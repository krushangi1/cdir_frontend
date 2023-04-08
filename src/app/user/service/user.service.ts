import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/internal/Observable";
import { User } from "./user.model";
import { Email } from "./email.model";
import { Address } from "./address.model";
import { Contact } from "./contact.model";


@Injectable({providedIn:'root'})
export class UserService{

  constructor(private http:HttpClient){}


  private baseUrl='http://localhost:8080/directory/all';
  private emailUrl='http://localhost:8080/emails/all';
  private addUrl='http://localhost:8080/add/all';
  private contactUrl='http://localhost:8080/contacts/all';

  // to find all directories
  public findAll():Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  // to find one directory using id
  public getDirectory(directoryId:number):Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${directoryId}`);
  }

  // to find emails using directoryId
  public getEmails(directoryId:number):Observable<Email[]>{
    return this.http.get<Email[]>(`${this.emailUrl}/user/${directoryId}`);
  }

  //to find addresses using directoryId
  public getAddresses(directoryId:number):Observable<Address[]>{
    return this.http.get<Address[]>(`${this.addUrl}/user/${directoryId}`);
  }

  //to find contacts using directoryId
  public getContacts(directoryId:number):Observable<Contact[]>{
    return this.http.get<Contact[]>(`${this.contactUrl}/user/${directoryId}`);
  }

}
