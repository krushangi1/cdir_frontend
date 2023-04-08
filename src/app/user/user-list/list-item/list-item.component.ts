import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../service/user.model';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit{

  @Input() user:User;

  constructor(private route:ActivatedRoute,private router:Router){}
  ngOnInit(): void {}


  onEdit(){
    console.log(this.user.directoryId);

    this.router.navigate([this.route,'edit',this.user.directoryId],{relativeTo:this.route})
  }

  }

