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
  isSearch=false;
  instance:string;

  constructor(private userService:UserService,private route:ActivatedRoute,private router:Router){}

  ngOnInit(): void {
    // this.route.queryParams
    //   .subscribe(params => {
    //     console.log(params);
    //     this.isSearch=params['isSearch'];
    //     console.log(this.isSearch);

    //   });


    this.isSearch=this.userService.getIsSearch();
    if(this.isSearch){
      this.instance=this.userService.getSearchInstance();
      this.userService.search(this.instance).subscribe(data=>{
        this.users=data;
      })
    }
    else{
      this.userService.findAll().subscribe(data=>{
        this.users=data;
      });

    }
  }

  onAdd(){
    this.router.navigate(['add'],{relativeTo:this.route});
  }

  backToContacts(){
    this.router.navigate(['/users']);
    window.location.reload();

  }
}
