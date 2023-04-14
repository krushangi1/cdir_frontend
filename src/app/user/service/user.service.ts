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
  searchInstance:string;
  isSearch:boolean;
  editMode:boolean;
  updateUserId:number;

  //methods to set and get search instance and bool
  setSearchInstance(data:string){
    this.searchInstance=data;
  }
  setIsSearch(is:boolean){
    this.isSearch=is;
  }
  getSearchInstance(){
    return this.searchInstance;
  }
  getIsSearch(){
    return this.isSearch;
  }
  setEditMode(is:boolean){
    this.editMode=is;
  }
  getEditMode(){
    return this.editMode;
  }
  setUpdateId(id:number){
    this.updateUserId=id;
  }
  getUpdateId(){
    return this.updateUserId;
  }

  private baseUrl='http://localhost:8080/directory/all';
  private emailUrl='http://localhost:8080/emails/all';
  private addUrl='http://localhost:8080/add/all';
  private contactUrl='http://localhost:8080/contacts/all';
  private searchUrl='http://localhost:8080/directory/all/search'

  // to find all directories
  public findAll() {
    return this.http.get<User[]>(this.baseUrl);
  }

  // to find one directory using id
  public getDirectory(directoryId:number) {
    return this.http.get<User>(`${this.baseUrl}/${directoryId}`);
  }

  // to find emails using directoryId
  public getEmails(directoryId:number){
    return this.http.get<Email[]>(`${this.emailUrl}/user/${directoryId}`);
  }

  //to find addresses using directoryId
  public getAddresses(directoryId:number){
    return this.http.get<Address[]>(`${this.addUrl}/user/${directoryId}`);
  }

  //to find contacts using directoryId
  public getContacts(directoryId:number){
    return this.http.get<Contact[]>(`${this.contactUrl}/user/${directoryId}`);
  }

  //to delete directory of person
  public deleteDirectory(directoryId:number){
        return this.http.delete(`${this.baseUrl}/${directoryId}`)

  }

  //to   save directory
  public saveDirectory(user:any){
    return this.http.post(this.baseUrl,user);
  }

  //to update directory
  public updateDirectory(directoryId:number,postData:Object){
    return this.http.put<User>(`${this.baseUrl}/${directoryId}`,postData);
  }

  //search
  public search(instance:string){
    return this.http.get<User[]>(`${this.searchUrl}/${instance}`)
  }
}
