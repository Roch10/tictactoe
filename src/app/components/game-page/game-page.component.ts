import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {
  board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  player: any;
  sqrId: any;
  user: any;
  computer: any;
  row: any;
  col: any;
  boardValues = {
    "zero": "", "one": "", "two": "", "three": "", "four": "", "five": "", "six": "", "seven": "", "eight": ""
  }
  isDraw = false;

  ARRAY_LENGHT = 9;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.user = this.route.snapshot.paramMap.get('player');
    this.player = this.user;
    this.computer = (this.user == "x") ? "o" : "x";
  }

  onClick(sqrName, event) {
    this.sqrId = event.target.attributes.id.value;
    this.playerMove(sqrName);
    if (this.checkWinner(this.board)) {
      alert("You Won");
      this.onReset();
    }else if (this.checkDraw(this.board)) {
      alert("It is a draw");
      this.onReset();
    } else{
      this.computerMove();
    }
  }

  onReset() {
    this.boardValues = {
      "zero": "", "one": "", "two": "", "three": "", "four": "", "five": "", "six": "", "seven": "", "eight": ""
    };
    this.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  }

  checkWinner(board) {
    if (
      (board[0] == this.player && board[1] == this.player && board[2] == this.player) ||
      (board[3] == this.player && board[4] == this.player && board[5] == this.player) ||
      (board[6] == this.player && board[7] == this.player && board[8] == this.player) ||
      (board[0] == this.player && board[3] == this.player && board[6] == this.player) ||
      (board[1] == this.player && board[4] == this.player && board[7] == this.player) ||
      (board[2] == this.player && board[5] == this.player && board[8] == this.player) ||
      (board[0] == this.player && board[4] == this.player && board[8] == this.player) ||
      (board[2] == this.player && board[4] == this.player && board[6] == this.player)) {
      return true;
    } else {
      return false;

    }
  }

  checkDraw(board) {
    for (var i = 0; i < board.length; i++) {
      if (board[i] !== 'x' && board[i] !== 'o')
        return false;
    }
    return true;
  }

  computerMove() {
    // var spot = this.minimax(this.board, this.computer).index;
    // var spotValue = this.returnNumberName(spot);
    // this.boardValues[spotValue] = this.computer;
    // this.board[spot] = this.computer;
    var random;
    do {
      var r = Math.floor(Math.random() * 8);
      random = this.returnNumberName(r);
    } while (this.boardValues[random] != "");
    this.boardValues[random] = this.computer;
    this.board[r] = this.computer;
    if(this.checkWinner(this.board)){
      alert("You Loose");
    }
  }

  playerMove(spotValue) {
    if (this.boardValues[spotValue] === "") {
      this.boardValues[spotValue] = this.player;
      this.board[this.sqrId] = this.player;
    }
  }

  minimax(newBoard, player) {

    var availableSpot = this.getAvailableSpots(newBoard);

    var moves = [];

    for (var i = 0; i < availableSpot.length; i++) {
      var spot = availableSpot[i];
      var move = {
        index: 0,
        score: 0
      };
      move.index = newBoard[spot];

      newBoard[spot] = player;

      if(player === this.computer){
        let result = this.minimax(newBoard, this.user);
        move.score = result.score;
      } else{
        let result = this.minimax(newBoard, this.computer);
        move.score = result.score;
      }

      newBoard[spot] = move.index;

      moves.push(move);

    }

    var bestMove;
    if(player === this.computer){
      let bestScore = -10000;
      moves.forEach(move => {
        if(move.score > bestScore){
          bestScore = move.score;
          bestMove = moves.indexOf(move);
        }
      });
    } else{
      let bestScore = 10000;
      moves.forEach(move => {
        if(move.score < bestScore){
          bestScore = move.score;
          bestMove = moves.indexOf(move);
        }
      });
    }

    return moves[bestMove];
  }

  getAvailableSpots(board) {
    return board.filter(x => x != "x" && x != "o");
  }

  returnNumberName(num) {
    num = +num;
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
