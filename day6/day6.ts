import { readFileSync, promises as fsPromises } from 'fs';
import { join } from 'path';

function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), 'utf-8');
  return result;
}
/////Part1/////

function zeroTo6plus8(numArr: number[]){
  for (let i = 0; i < numArr.length; i++) {
    if(numArr[i] == 0){
      numArr[i] = 7;
      numArr.push(9);
      answer++;
    }
    numArr[i] = numArr[i]-1;
  }
  return numArr;
}

function getFishPart1(num: number, numArr: number []){
  for (let i = 0; i < num; i++) {
      numArr=zeroTo6plus8(numArr);
  }
  return answer;
}

//////end of part1//////

///part 2////

function getFishPart2(num: number, arr: number []){
  for (let i = 0; i < num; i++) {
    if(arr[0]==0){
      var el=arr.shift();
      arr.push(Number(el));
    } else{
      var el=arr.shift();
      arr.push(Number(el));
      arr[6] = arr[6] + Number(el);
    }
  }
  return arr;
}
/// end of part 2////


//var testArr = [2,3,2,0,1,0,0,0];

//get file
let fileString: string = syncReadFile('./input2.txt');
fileString = fileString.replace(/\r?\n?[^\r\n]*$/, ""); //removes annoying last line
var numArr = fileString.split(',').map((numberAsString) => (Number(numberAsString)));
var answer = numArr.length;
///p1
/*var num = 80;
console.log(getFishPart1(num, numArr));*/
///p1


///p2
var num = 256;
var arr = [];
for (let i = 0; i < 9; i++) {
    arr.push(numArr.filter(x => x===i).length);
}
arr=getFishPart2(num, arr);
const result = arr.reduce((accumulator, current) => {
  return accumulator + current;
}, 0);
console.log(result);
///p2
