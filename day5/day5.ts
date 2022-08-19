import { readFileSync, promises as fsPromises } from 'fs';
import { join } from 'path';

function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), 'utf-8');
  return result;
}

function getAllNumbersBetweenXYAddToMapVertical(smaller: number, bigger: number, constant: number) {
  for (var i = smaller; i <= bigger; i++) {
    addPointToMap({ x: constant, y: i });
  }
}

function getAllNumbersBetweenXYAddToMapHorizontal(smaller: number, bigger: number, constant: number) {
  for (var i = smaller; i <= bigger; i++) {
    addPointToMap({ x: i, y: constant });
  }
}

function incXincY(smallX: number, bigX: number, smallY: number, bigY: number) {
  var j = smallY;
  for (var i = smallX; i <= bigX; i++) {
    addPointToMap({ x: i, y: j });
    j++;
  }
}

function incXdecY(smallX: number, bigX: number, smallY: number, bigY: number) {
  var j = bigY;
  for (var i = smallX; i <= bigX; i++) {
    addPointToMap({ x: i, y: j });
    j--;
  }
}

function getPointsFromLine(line: { startX: Number, startY: Number, endX: Number, endY: Number }, lineType: string) {
  if (lineType == "vertical") {
    if (Number(line.startY) > Number(line.endY)) {
      getAllNumbersBetweenXYAddToMapVertical(Number(line.endY), Number(line.startY), Number(line.startX));
    } else {
      getAllNumbersBetweenXYAddToMapVertical(Number(line.startY), Number(line.endY), Number(line.startX));
    }
  } else if (lineType == "horizontal") {
    if (Number(line.startX) > Number(line.endX)) {
      getAllNumbersBetweenXYAddToMapHorizontal(Number(line.endX), Number(line.startX), Number(line.startY));
    } else {
      getAllNumbersBetweenXYAddToMapHorizontal(Number(line.startX), Number(line.endX), Number(line.startY));
    }
  } //part 2
  else {
    if ((Number(line.startX) > Number(line.endX)) && (Number(line.startY) > Number(line.endY))) {
      incXincY(Number(line.endX), Number(line.startX), Number(line.endY), Number(line.startY))
    } else if ((Number(line.startX) > Number(line.endX)) && (Number(line.startY) < Number(line.endY))) {
      incXdecY(Number(line.endX), Number(line.startX), Number(line.startY), Number(line.endY))
    } else if ((Number(line.startX) < Number(line.endX)) && (Number(line.startY) > Number(line.endY))) {
      incXdecY(Number(line.startX), Number(line.endX), Number(line.endY), Number(line.startY))
    } else {
      incXincY(Number(line.startX), Number(line.endX), Number(line.startY), Number(line.endY))
    }
  }
}

function addPointToMap(point: { x: number, y: number }) {
  var pointStr = JSON.stringify(point);
  if (allPoints.has(pointStr)) {
    var n = allPoints.get(pointStr);
    if (n) {
      if (n == 1) {
        allPoints.set(pointStr, n + 1);
        answer += 1;
      } else {
        allPoints.set(pointStr, n + 1);
      }
    }
  } else {
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
  if (line.startX == line.endX) {
    getPointsFromLine(line, "vertical");
  } else if (line.startY == line.endY) {
    getPointsFromLine(line, "horizontal");
  } else {
    getPointsFromLine(line, "diagonal");
  }
}
console.log(answer);
