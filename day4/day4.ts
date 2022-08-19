import { readFileSync, promises as fsPromises } from 'fs';
import { join } from 'path';

function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), 'utf-8');
  return result;
}

function getBingoNumbers(line: string){
  let numbers = line.split(',').map(Number);
  return numbers;
}

function getBingoBoards(boardString: string[]){
  var markableBoards: MarkableBoard [] = [];
  for (let i = 0; i < boardString.length; i++) {
    let board: BoardTile [][] = [[]];
    let boardLines = boardString[i].split('\n');
    for (let j = 0; j < boardLines.length; j++) {
        let boardNumbers : BoardTile [] = boardLines[j].split(/\s+/).filter(Boolean).map((n) => ({
        number: Number(n),
        matched: false
      }))
        board[j] = boardNumbers;
    }
    var markableBoard : MarkableBoard = {
      board: board,
      winner: false
    }
    markableBoards.push(markableBoard);
  }
  return markableBoards;
}

function markBoard(bingoNumber: number, bingoBoard: BoardTile [][]){
    for (let i = 0; i < bingoBoard.length; i++) {
        var bingoLine = bingoBoard[i];
        for (let j = 0; j < bingoLine.length; j++) {
            if(bingoNumber == bingoLine[j].number){
              bingoBoard[i][j].matched = true;
            }
        }
    }
    return bingoBoard;
}

function checkIfMatched(bingoValue: BoardTile){
  return bingoValue.matched == true;
}

function checkIfBingo(bingoBoard: BoardTile [][]){
  for (let i = 0; i < bingoBoard.length; i++) {
    var bingoLine = bingoBoard[i];
    if(bingoLine.every(checkIfMatched)){
        return true;
    }
  }
  for (let i = 0; i < 5; i++) {
    var col = bingoBoard.map(d => d[i]);
    if(col.every(checkIfMatched)){
        return true;
    }
  }
  return false;
}

function calculateWinningNumber(bingoNumber: number, bingoBoard: BoardTile [][]){
  var unmatchedSum: Number = 0;
  for (let i = 0; i < bingoBoard.length; i++) {
      var bingoLine = bingoBoard[i];
      for (let j = 0; j < bingoLine.length; j++) {
          if(bingoLine[j].matched == false){
            unmatchedSum = Number(unmatchedSum) + Number(bingoLine[j].number);
          }
      }
  }
  console.log(Number(unmatchedSum)*bingoNumber);
}

function findWinningAndLosingBingo(bingoNumbers: number [], bingoBoards: MarkableBoard []){
  var nOfBoards = bingoBoards.length;
  var nOfMarks = 0;
  for (let i = 0; i < bingoNumbers.length; i++) {
      for (let j = 0; j < bingoBoards.length; j++) {
          bingoBoards[j].board=markBoard(bingoNumbers[i], bingoBoards[j].board);
          if(checkIfBingo(bingoBoards[j].board) && bingoBoards[j].winner == false){
            bingoBoards[j].winner = true;
            nOfMarks += 1;
            if(nOfMarks == 1){
              console.log("Part 1:")
              calculateWinningNumber(bingoNumbers[i], bingoBoards[j].board);
            }
            else if(nOfMarks == nOfBoards){
              console.log("Part 2:")
              calculateWinningNumber(bingoNumbers[i], bingoBoards[j].board);
            }
          }
      }
  }
}

interface BoardTile {
  number: Number,
  matched: Boolean
}

interface MarkableBoard {
  board: BoardTile [][],
  winner: Boolean
}

//get file
let fileString: string = syncReadFile('./input2.txt');
fileString = fileString.replace(/\r?\n?[^\r\n]*$/, ""); //removes annoying last line
var fileArr = fileString.split('\n\n');
// get bingo numbers
let firstLine = fileArr.splice(0, 1);
let bingoNumbers = getBingoNumbers(firstLine[0]);
let bingoBoards = getBingoBoards(fileArr);
findWinningAndLosingBingo(bingoNumbers, bingoBoards);
