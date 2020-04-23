//用于渲染绘制地图的模块

//引入地图依赖模块
import * as map from "./map.js";

/**
 * 最外层div
 */
const oDiv = document.getElementById("game");

/**
 * 小盒子的宽
 */
const boxWidth = 45;

/**
 * 小盒子的高
 */
const boxHeight = 45;

/**
 *  渲染外层div样式
 */
function showDiv () {
    oDiv.style.width = map.colNumber * boxWidth + "px";
    oDiv.style.height = map.rowNumber * boxHeight + "px";
}

/**
 * 判断当前位置是否为正确位置，返回boolean值
 * @param {*} row 
 * @param {*} col 
 */
function ifCorrect (row, col) {
    for (const iterator of map.correct) {
        if(iterator.row === row && iterator.col === col){
            return true;
        }
    }
    return false;
}

/**
 *  判断小方格应该显示为什么类型（空白、墙、玩家、盒子、对的位置、对的位置上的盒子）
 * @param row  坐标x
 * @param col  坐标y
 * @returns 返回相应的css class类名
 */
function ifBoxType (row, col) {
    //小方格类型标记
    const flag = map.content[row][col];
    //是否是在正确位置上的标记
    const boxFlag = ifCorrect(row, col);
    if(flag === map.SPACE){
        if(boxFlag){
            return "item correct";
        }else{
            return "item";
        }
    }
    else if(flag === map.PLAYER){
        return "item player";
    }
    else if(flag === map.WALL){
        return  "item wall";
    }
    else if(flag === map.BOX){
        if(boxFlag){
            return "item correct-box";
        }else{
            return "item box";
        }
    }
}

/**
 * 计算小盒子的定位信息并返回
 * @param row 小盒子所在的行
 * @param col 小盒子所在的列
 * @return object : {left, top}
 */
function calcWidthAndHeightOfBox (row, col) {
    const left = col * boxWidth;
    const top = row * boxHeight;
    return {
        left,
        top
    }
}


/**
 * 渲染地图
 */
export function showMap () {
    //清空容器
    oDiv.innerHTML = "";
    //渲染
    for(let row = 0; row < map.rowNumber; row++){
        for(let col = 0; col < map.colNumber; col++){
            const box = document.createElement("div");
            const classStr = ifBoxType(row, col);
            const boxSet = calcWidthAndHeightOfBox(row, col);
            box.className = classStr;
            box.style.left = boxSet.left + "px";
            box.style.top = boxSet.top + "px";
            oDiv.appendChild(box);
        }
    }
}

/**
 * 绘制地图界面
 */
export function showUI () {
    showDiv();
    showMap();
}