import { Component, OnInit } from '@angular/core';
import { User } from './service/user.model';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  users:User[] | undefined;

  constructor(private userService:UserService){}

  ngOnInit(): void {
    this.userService.findAll().subscribe(data=>{
      this.users=data;
    });

  }
}
