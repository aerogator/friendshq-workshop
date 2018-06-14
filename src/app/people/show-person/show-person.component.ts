import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Friend } from '../../../shared/friend.model';

@Component({
  selector: 'app-show-person',
  templateUrl: './show-person.component.html',
  styleUrls: ['./show-person.component.css']
})
export class ShowPersonComponent implements OnInit {
  @Input() friend: Friend;
  @Output() notify: EventEmitter<Friend> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  like() {
    console.log("like was clicked");
    this.friend.fav = !this.friend.fav;
    this.notify.emit(this.friend);

  }
}
