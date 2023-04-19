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
  directoryid:number;

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
  getDirectoryid(){
    return this.directoryid;
  }
  setDirectoryid(id:number){
    this.directoryid=id;
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
  public getDirectory(directoryid:number) {
    return this.http.get<any>(`${this.baseUrl}/${directoryid}`);
  }

  // to find emails using directoryid
  public getEmails(directoryid:number){
    return this.http.get<Email[]>(`${this.emailUrl}/user/${directoryid}`);
  }

  //to find addresses using directoryid
  public getAddresses(directoryid:number){
    return this.http.get<Address[]>(`${this.addUrl}/user/${directoryid}`);
  }

  //to find contacts using directoryid
  public getContacts(directoryid:number){
    return this.http.get<Contact[]>(`${this.contactUrl}/user/${directoryid}`);
  }

  //to delete directory of person
  public deleteDirectory(directoryid:number){
        return this.http.delete(`${this.baseUrl}/${directoryid}`)

  }

  //to   save directory
  public saveDirectory(user:any){
    return this.http.post(this.baseUrl,user);
  }

  //to update directory
  public updateDirectory(postData:Object,directoryid:number){
    return this.http.put<User>(`${this.baseUrl}/put/${directoryid}`,postData);
  }

  //search
  public search(instance:string){
    return this.http.get<User[]>(`${this.searchUrl}/${instance}`)
  }
}
