import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {
  player = "x";

  constructor() { }

  ngOnInit() {
  }

  changePlayer(player: any) {
    this.player = player;
  }
}
