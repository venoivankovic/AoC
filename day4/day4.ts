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

function getBingoBoards(fileArr: string[]){
  let boards:{ number: Number; matched: Boolean; }[][][] = [[]];
  for (let i = 0; i < fileArr.length; i++) {
    let board: {number: Number; matched: Boolean} [][] = [[]];
    let stringArr = fileArr[i].split('\n');
    for (let j = 0; j < stringArr.length; j++) {
        let numArr = stringArr[j].split(/\s+/).filter(Boolean).map((n) => ({
        number: Number(n),
        matched: false
      }))
        board[j] = numArr;
    }
    boards[i] = board;
  }
  return boards;
}

function markBoard(bingoNumber: number, bingoBoard: {number: Number; matched: Boolean} [][]){
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

function checkIfMatched(bingoValue: {number: Number; matched: Boolean}){
  return bingoValue.matched == true;
}

function checkIfBingo(bingoBoard: {number: Number; matched: Boolean} [][]){
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

function calculateWinningNumber(bingoNumber: number, bingoBoard: {number: Number; matched: Boolean} [][]){
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

function findWinningBingo(bingoNumbers: number [], bingoBoards: {number: Number; matched: Boolean} [][][]){
  for (let i = 0; i < bingoNumbers.length; i++) {
      for (let j = 0; j < bingoBoards.length; j++) {
          bingoBoards[j]=markBoard(bingoNumbers[i], bingoBoards[j]);
          if(checkIfBingo(bingoBoards[j])){
            //console.log("Bingo board "+j+" is a bingo");
            //console.log("The number called was "+bingoNumbers[i])
            //console.log(bingoBoards[j]);
            console.log("Part 1:")
            calculateWinningNumber(bingoNumbers[i], bingoBoards[j]);
            return;
          }
      }
  }
}

function findLosingBingo(bingoNumbers: number [], bingoBoards: {number: Number; matched: Boolean} [][][]){
  for (let i = 0; i < bingoNumbers.length; i++) {
      for (let j = 0; j < bingoBoards.length; j++) {
          bingoBoards[j]=markBoard(bingoNumbers[i], bingoBoards[j]);
          if(checkIfBingo(bingoBoards[j])){
            if(bingoBoards.length != 1){
              bingoBoards.splice(j, 1);
              findLosingBingo(bingoNumbers,bingoBoards)
            }else{
              //console.log("Bingo board "+j+" is a bingo");
              //console.log("The number called was "+bingoNumbers[i])
              //console.log(bingoBoards[j]);
              console.log("Part 2:")
              calculateWinningNumber(bingoNumbers[i], bingoBoards[j]);
              process.exit();
            }
          }
      }
  }
}


//get file
let fileString: string = syncReadFile('./input2.txt');
fileString = fileString.replace(/\r?\n?[^\r\n]*$/, ""); //removes annoying last line
var fileArr = fileString.split('\n\n');

// get bingo numbers
let firstLine = fileArr.splice(0, 1);
let bingoNumbers = getBingoNumbers(firstLine[0]);
let bingoBoards = getBingoBoards(fileArr);
//part1
findWinningBingo(bingoNumbers, bingoBoards);
//part2
findLosingBingo(bingoNumbers, bingoBoards);
