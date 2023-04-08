import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { User } from '../service/user.model';
import { UserService } from '../service/user.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';




@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{

  users: User[];


  constructor(private userService:UserService,private route:ActivatedRoute,private router:Router){}

  ngOnInit(): void {
    this.userService.findAll().subscribe(data=>{
      this.users=data;
    });
  }

  onAdd(){
    this.router.navigate(['add'],{relativeTo:this.route});
  }
}
