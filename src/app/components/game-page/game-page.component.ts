import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  spotId: any;
  user: any;
  AI: any;
  row: any;
  col: any;

  //For display 
  boardValues = {
    "zero": "", "one": "", "two": "", "three": "", "four": "", "five": "", "six": "", "seven": "", "eight": ""
  }; 

  ARRAY_LENGHT = 3; // lenght of each array in board

  constructor(
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.user = this.route.snapshot.paramMap.get('player');
    this.AI = (this.user == "x") ? "o" : "x";
  }

  //triggered when user click their move
  userClick(sqrName, event) {
    this.spotId = event.target.attributes.id.value; //take id from id attribute
    this.userMove(sqrName);
    var score = this.checkWinner(this.board);
    if (score === -10) {
      alert("You Won!!!");
    } else if (!this.hasMoveLeft(this.board)) {
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
      this.row = this.getRows(this.spotId);
      this.col = this.getCol(this.spotId);
      this.board[this.row][this.col] = this.user;
    }
  }

  getRows(id) {
    return Math.floor(id / this.ARRAY_LENGHT);  //returns the row of the clicked square
  }

  getCol(id) {
    return id % this.ARRAY_LENGHT;   //returns the coloumn of the clicked square
  }

  computerMove() {
    var bestMove = this.getBestMove(this.board);
    let store = this.board[bestMove.row][bestMove.col];
    this.board[bestMove.row][bestMove.col] = this.AI;
    this.boardValues[this.numberToString(store)] = this.AI;
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

  //Checks if there are any winner at current state of board
  checkWinner(board) {
    for (var i = 0; i < this.ARRAY_LENGHT; i++) {
      if ((board[i][0] === "x" || board[i][0] === "o") && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {    //for rows
        if (board[i][0] === this.AI) {
          return +10;
        } else if (board[i][0] === this.user) {
          return -10;
        }
      } else if ((board[0][i] === "x" || board[0][i] === "o") && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {   //for coloms
        if (board[0][i] === this.AI) {
          return +10;
        } else if (board[0][i] === this.user) {
          return -10;
        }
      }
    }

    if ((board[0][0] === "x" || board[0][0] === "o") && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      if (board[0][0] === this.AI) {
        return +10;
      } else if (board[0][0] === this.user) {
        return -10;
      }
    } else if ((board[0][2] === "x" || board[0][2] === "o") && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      if (board[0][2] === this.AI) {
        return +10;
      } else if (board[0][2] === this.user) {
        return -10;
      }
    }
    return 0;
  }

  numberToString(num) {
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

  //Check if there ae any empty boxes left
  hasMoveLeft(board) {
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (board[i][j] !== "x" && board[i][j] !== "o")
          return true;
      }
    }
    return false;
  }

  //minimax funtion
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
            board[i][j] = this.AI;
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
            var minmaxValue = this.minimax(board, depth + 1, !isComp); // recursive function
            best = (minmaxValue < best) ? minmaxValue : best;

            board[i][j] = store;
          }
        }
      }
      return best;

    }
  }

  //to choose the best possible move
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
          board[i][j] = this.AI;

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
