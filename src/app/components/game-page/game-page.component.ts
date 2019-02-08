import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {
  board = [
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"]
  ];
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


  ARRAY_LENGHT = 3;

  constructor(
    private route: ActivatedRoute,
    @Inject(DOCUMENT) document
  ) { }

  ngOnInit() {
    this.user = this.route.snapshot.paramMap.get('player');
    console.log("board", this.board);
    this.player = this.user;
    this.computer = (this.user == "x") ? "o" : "x";
  }

  onClick(sqrName, event) {
    this.sqrId = event.target.attributes.id.value;
    this.userMove(sqrName);
    var score = this.checkWinner(this.board);
    if (score === -10) {
      alert("You Won!!!");
    } else if (this.checkDraw(this.board)) {
      alert("It's a Draw!!!");
      this.onReset();
    } else {
      setTimeout(() => {
        this.computerMove();
      }, 200);
    }
  }

  userMove(spotValue) {
    if (this.boardValues[spotValue] === "") {
      this.boardValues[spotValue] = this.user;
      this.row = this.getRows(this.sqrId);
      this.col = this.getCol(this.sqrId);
      this.board[this.row][this.col] = this.user;
    }
  }

  computerMove() {
    var bestMove = this.getBestMove(this.board);
    let store = this.board[bestMove.row][bestMove.col];
    this.board[bestMove.row][bestMove.col] = this.computer;
    this.boardValues[this.returnNumberName(store)] = this.computer;
    var score = this.checkWinner(this.board);
    setTimeout(() => {
      if (score === +10) {
        alert("You loose!!!");
      }
    }, 100);
  }

  onReset() {
    this.boardValues = {
      "zero": "", "one": "", "two": "", "three": "", "four": "", "five": "", "six": "", "seven": "", "eight": ""
    };
    this.board = [
      ["0", "1", "2"],
      ["3", "4", "5"],
      ["6", "7", "8"]
    ];
  }

  getRows(id) {
    return Math.floor(id / this.ARRAY_LENGHT);
  }

  getCol(id) {
    return id % this.ARRAY_LENGHT;
  }

  checkWinner(board) {
    for (var i = 0; i < this.ARRAY_LENGHT; i++) {
      if ((board[i][0] === "x" || board[i][0] === "o") && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {    //for rows
        if (board[i][0] === this.computer) {
          return +10;
        } else if (board[i][0] === this.user) {
          return -10;
        }
      } else if ((board[0][i] === "x" || board[0][i] === "o") && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {   //for coloms
        if (board[0][i] === this.computer) {
          return +10;
        } else if (board[0][i] === this.user) {
          return -10;
        }
      }
    }

    if ((board[0][0] === "x" || board[0][0] === "o") && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      if (board[0][0] === this.computer) {
        return +10;
      } else if (board[0][0] === this.user) {
        return -10;
      }
    } else if ((board[0][2] === "x" || board[0][2] === "o") && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      if (board[0][2] === this.computer) {
        return +10;
      } else if (board[0][2] === this.user) {
        return -10;
      }
    }

    return 0;
  }

  checkDraw(board) {
    for (var i = 0; i < this.ARRAY_LENGHT; i++) {
      for (var j = 0; j < board[i].length; j++) {
        if (board[i][j] !== "x" && board[i][j] !== "o") {
          return false;
        }
      }
    }
    return true;
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

  hasMoveLeft(board) {
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (board[i][j] !== "x" && board[i][j] !== "o")
          return true;
      }
    }
    return false;
  }

  minimax(board, depth, isComp: boolean) {
    var score = this.checkWinner(board);

    if (score === 10)
      return score;

    if (score === -10)
      return score;

    if (!this.hasMoveLeft(board))
      return 0;

    if (isComp) {
      let best = -1000;

      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          if (board[i][j] !== "x" && board[i][j] !== "o") {
            let store = board[i][j];
            board[i][j] = this.computer;
            var minmaxValue = this.minimax(board, depth + 1, !isComp);
            best = (best < minmaxValue) ? minmaxValue : best;

            board[i][j] = store;
          }
        }
      }
      return best;
    } else {
      let best = 1000;
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          if (board[i][j] !== "x" && board[i][j] !== "o") {
            let store = board[i][j];
            board[i][j] = this.user;
            var minmaxValue = this.minimax(board, depth + 1, !isComp);
            best = (minmaxValue < best) ? minmaxValue : best;

            board[i][j] = store;
          }
        }
      }
      return best;

    }
  }

  getBestMove(board) {
    var bestValue = -1000;
    var bestMove = {
      row: -1,
      col: -1
    }
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (board[i][j] !== "x" && board[i][j] !== "o") {
          let store = board[i][j];
          board[i][j] = this.computer;

          var moveValue = this.minimax(board, 0, false);

          board[i][j] = store;

          if (moveValue > bestValue) {
            bestMove.row = i;
            bestMove.col = j;
            bestValue = moveValue;
          }
        }
      }
    }
    return bestMove;
  }
}
