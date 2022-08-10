import { readFileSync, promises as fsPromises } from 'fs';
import { join } from 'path';

function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), 'utf-8');
  return result;
}

function getPointsFromLine(line: {startX: Number, startY: Number, endX: Number, endY: Number}){
  var pointsFromLine = [];
  var xN = Math.abs(Number(line.startX) - Number(line.endX));
  var yN = Math.abs(Number(line.startY) - Number(line.endY));
  if(xN == 0){
    if(Number(line.startY) > Number(line.endY)){
      for (let i = Number(line.startY); i >= Number(line.endY); i--) {
          pointsFromLine.push({x: line.startX, y: i})
          addPointToMap({x: Number(line.startX), y: i});
      }
    } else {
      for (let i = Number(line.startY); i <= Number(line.endY); i++) {
          pointsFromLine.push({x: line.startX, y: i})
          addPointToMap({x: Number(line.startX), y: i});
      }
    }
  } else if (yN == 0){
    if(Number(line.startX) > Number(line.endX)){
      for (let i = Number(line.startX); i >= Number(line.endX); i--) {
          pointsFromLine.push({x: i, y: line.startY})
          addPointToMap({x: i, y: Number(line.startY)});
      }
    } else {
      for (let i = Number(line.startX); i <= Number(line.endX); i++) {
          pointsFromLine.push({x: i, y: line.startY})
          addPointToMap({x: i, y: Number(line.startY)});
      }
    }
  } //part 2
    else {
      if((Number(line.startX) > Number(line.endX))&&(Number(line.startY) > Number(line.endY))){
        var j = Number(line.startY)
        for (let i = Number(line.startX); i >= Number(line.endX); i--) {
            pointsFromLine.push({x: i, y: j})
            addPointToMap({x: i, y: j});
            j--;
        }
      } else if((Number(line.startX) > Number(line.endX))&&(Number(line.startY) < Number(line.endY))){
        var j = Number(line.startY)
        for (let i = Number(line.startX); i >= Number(line.endX); i--) {
            pointsFromLine.push({x: i, y: j})
            addPointToMap({x: i, y: j});
            j++;
        }
      } else if((Number(line.startX) < Number(line.endX))&&(Number(line.startY) > Number(line.endY))){
        var j = Number(line.startX)
        for (let i = Number(line.startY); i >= Number(line.endY); i--) {
            pointsFromLine.push({x: j, y: i})
            addPointToMap({x: j, y: i});
            j++;
        }
      }
       else {
        var j = Number(line.startY)
        for (let i = Number(line.startX); i <= Number(line.endX); i++) {
            pointsFromLine.push({x: i, y: j})
            addPointToMap({x: i, y: j});
            j++;
        }
      }
  }
  return pointsFromLine;
}

function addPointToMap(point: {x: number, y: number}){
  var pointStr = JSON.stringify(point);
  if(allPoints.has(pointStr)){
    var n = allPoints.get(pointStr);
    if(n){
      if(n==1){
        allPoints.set(pointStr, n+1);
        answer += 1;
      }else{
        allPoints.set(pointStr, n+1);
      }
    }
  }else{
    allPoints.set(pointStr, 1);
  }
}

//get file
var answer = 0;
let allPoints = new Map<string, number>();
let fileString: string = syncReadFile('./input2.txt');
fileString = fileString.replace(/\r?\n?[^\r\n]*$/, ""); //removes annoying last line
var fileArr = fileString.split('\n');
for (let i = 0; i < fileArr.length; i++) {
    var lineString = fileArr[i].split(' -> ');
    var startString = lineString[0].split(',');
    var endString = lineString[1].split(',');
    var line = {
      startX: Number(startString[0]),
      startY: Number(startString[1]),
      endX: Number(endString[0]),
      endY: Number(endString[1])
    }
    //part1: commented
    /*if (line.startX == line.endX || line.startY == line.endY) {
        var points = getPointsFromLine(line);
    }*/
    //part2: uncommented
    var points = getPointsFromLine(line);
}
console.log(answer);
