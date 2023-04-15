import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { User } from '../service/user.model';
import { UserService } from '../service/user.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';




@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit,OnDestroy{

  users: User[];
  isSearch:boolean;
  instance:string;
  editMode:boolean;
  searchInstance = '';

  constructor(private userService:UserService,private route:ActivatedRoute,private router:Router){}


  ngOnInit(): void {
    this.isSearch=this.userService.getIsSearch();
    this.searchInstance=this.userService.getSearchInstance();
    this.userService.findAll().subscribe(data => {
      this.users = data;
    });
    if (this.isSearch) {
      this.instance = this.userService.getSearchInstance();

      this.userService.search(this.instance).subscribe(data => {
        this.users = data;
      });
    }

    // if(this.isSearch){
    //   this.instance=this.userService.getSearchInstance();
    //   this.userService.search(this.instance).subscribe(data=>{
    //     this.users=data;
    //   })
    // }
    // else{
    //   this.userService.findAll().subscribe(data=>{
    //     this.users=data;
    //   });
    // }

  }

  // ngOnChanges(changes: SimpleChanges): void {

  // }

  onAdd(){
    this.editMode=false;
    this.userService.setEditMode(this.editMode);
    this.router.navigate(['add'],{relativeTo:this.route});
  }

  backToContacts(){
    this.router.navigate(['/users']);
    window.location.reload();

  }
  ngOnDestroy(): void {
    this.isSearch=false;
    this.userService.setIsSearch(this.isSearch);
  }
  onEnter(){
    this.isSearch=true;

    this.userService.setIsSearch(this.isSearch);
    this.userService.setSearchInstance(this.searchInstance);
    // window.location.reload();
    this.router.navigate(['/users']);//{ queryParams: { isSearch:'true'}}
    this.searchInstance='';

  }
}
