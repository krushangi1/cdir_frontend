import { Component, Input, OnInit } from '@angular/core';
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

  user:User;
  emails:Email[];
  add:Address[];
  contacts:Contact[];

  id=this.route.snapshot.params["directoryId"];

  constructor(private route:ActivatedRoute,private router:Router,private userService:UserService){}

  backToContacts(){
    this.router.navigate(['users']);
  }


  ngOnInit(){

    this.userService.getDirectory(this.id).subscribe(data=>{
      this.user=data;
    });

    this.userService.getEmails(this.id).subscribe(data=>{
      this.emails=data;
    });

    this.userService.getAddresses(this.id).subscribe(data=>{
      this.add=data;
    });

    this.userService.getContacts(this.id).subscribe(data=>{
      this.contacts=data;
    })
  }

}
