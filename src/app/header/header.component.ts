import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements  OnInit{

  searchInstance = '';
  isSearch=false;

  constructor(private route:ActivatedRoute,private router:Router,private userService:UserService){}

  onEnter(){
    this.isSearch=true;

    this.userService.setIsSearch(this.isSearch);
    this.userService.setSearchInstance(this.searchInstance);
    // window.location.reload();
    this.router.navigate(['/users']);//{ queryParams: { isSearch:'true'}}
    this.searchInstance='';

  }

  ngOnInit(): void { this.userService.setIsSearch(this.isSearch);
    this.userService.setSearchInstance(this.searchInstance); }
}
