import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../service/user.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { UserService } from '../service/user.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Email } from '../service/email.model';
import { Address } from '../service/address.model';
import { Contact } from '../service/contact.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit{
  directoryid:number;
  user:User;
  userName:String;
  // emails:Email[];
  // add:Address[];
  // contacts:Contact[];
  editMode=false;

  id=this.route.snapshot.params["directoryid"];
  @Output() mode = new EventEmitter();

  constructor(private route:ActivatedRoute,private router:Router,private userService:UserService){}

  backToContacts(){
    this.router.navigate(['users']);
  }


  ngOnInit(){
    this.userService.getDirectory(this.id).subscribe(data=>{
      this.user=data;
      this.directoryid=data.directoryId;
      this.userName=data.fullName;
    });

    // this.userService.getEmails(this.id).subscribe(data=>{
    //   this.emails=data;
    // });

    // this.userService.getAddresses(this.id).subscribe(data=>{
    //   this.add=data;
    // });

    // this.userService.getContacts(this.id).subscribe(data=>{
    //   this.contacts=data;
    // })
  }

  onDelete(id:number){
    if(confirm("Are you sure you want to Delete Contact?")) {
      this.userService.deleteDirectory(id).subscribe((data)=>{
        alert("deleted successfully")
        this.router.navigate(['users']);
      });
  } else {
      return;
    }
  }

  onUpdate(id:number){
    this.editMode=true;
    this.directoryid=this.id;
    this.userService.setEditMode(this.editMode);
    this.editMode=this.userService.getEditMode();
    this.userService.setDirectoryid(this.directoryid);
    this.router.navigate(['users/add'])

  }
}
