import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];
  player: any;
  sqrId: any;
  user: any;
  computer: any;
  row: any;
  col: any;
  boardValues = {
    "zero": "", "one": "", "two": "", "three": "", "four": "", "five": "", "six": "", "seven": "", "eight": "", "nine": "",
  }
  isDraw = false;

  ARRAY_LENGHT = 3;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.user = this.route.snapshot.paramMap.get('player');
    console.log("user", this.user);
    this.player = this.user;
    this.computer = (this.user == "x") ? "o" : "x";
  }

  onClick(sqrName, event) {
    this.sqrId = event.target.attributes.id.value;
    if (this.boardValues[sqrName] === "") {
      this.boardValues[sqrName] = this.player;
      this.row = this.getRows(this.sqrId);
      this.col = this.getCol(this.sqrId);
      console.log("player", this.player);
      this.board[this.row][this.col] = this.player;
      console.log(this.board);
      this.computerMove();

      if (!this.checkWinner()) {
        this.checkDraw();
      }
      // this.turn = (this.turn == this.user) ? this.computer : this.user; for 2 players
    }
  }

  onReset() {
    this.boardValues = {
      "zero": "", "one": "", "two": "", "three": "", "four": "", "five": "", "six": "", "seven": "", "eight": "", "nine": "",
    };
    this.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ];
  }

  getRows(id) {
    return Math.floor(id / this.ARRAY_LENGHT);
  }

  getCol(id) {
    return id % this.ARRAY_LENGHT;
  }

  checkWinner() {
    for (var i = 0; i < this.ARRAY_LENGHT; i++) {
      if (this.board[i][0] !== "" && this.board[i][0] === this.board[i][1] && this.board[i][1] === this.board[i][2]) {    //for rows
        alert("Game Complete!!!");
        return true;
      } else if (this.board[0][i] !== "" && this.board[0][i] === this.board[1][i] && this.board[1][i] === this.board[2][i]) {   //for coloms
        alert("Game Complete!!!");
        return true;
      }
    }

    if (this.board[0][0] !== "" && this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2]) {
      alert("Game Complete!!!");
      return true;
    } else if (this.board[0][2] !== "" && this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0]) {
      alert("Game Complete!!!");
      return true;
    }
  }

  checkDraw() {
    for (var i = 0; i < this.ARRAY_LENGHT; i++) {
      for (var j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] === "") {
          return;
        }
      }
    }
    alert("It is a draw!!");
  }

  computerMove() {
    var random;
    do {
      var r = Math.floor(Math.random() * 8);
      random = this.returnNumberName(r);
    } while (this.boardValues[random] != "");
    this.boardValues[random] = this.computer;
    this.row = this.getRows(r);
    this.col = this.getCol(r);
    this.board[this.row][this.col] = this.computer;
  }

  returnNumberName(num) {
    switch (num) {
      case 0:
        return "zero";
      case 1:
        return "one";
      case 2:
        return "two";
      case 3:
        return "three";
      case 4:
        return "four";
      case 5:
        return "five";
      case 6:
        return "six";
      case 7:
        return "seven";
      case 8:
        return "eight";
      default:
        break;
    }
  }
}
