//游戏规则玩法控制模块

//引入地图模块
import * as map from "./map.js";
import {showMap} from "./ui.js"


/**
 * 传入当前坐标位置和要移动的方向，判断下一个位置的类型和坐标系
 * @param {*} row 
 * @param {*} col 
 * @param {*} direction
 * @return 返回一个含有下一个类型和坐标位置的对象
 */
function ifNextType (row, col, direction) {
    /**
     * 下一个位置的类型
     */
    let type = 0;
    /**
     * 下一个位置的行坐标
     */
    let x = "";
    /**
     * 下一个位置的纵坐标
     */
    let y = "";
    if(direction === "up"){
        x = row - 1;
        y = col;
        type = map.content[x][y];
    }
    else if(direction === "down"){
        x = row + 1;
        y = col;
        type = map.content[x][y];
    }
    else if(direction === "left"){
        x = row;
        y = col - 1;
        type = map.content[x][y];
    }
    else {
        x = row;
        y = col + 1;
        type = map.content[x][y];
    }
    return {
        type,
        x,
        y
    };
}

/**
 * 传入当前和目标位置，移动交换
 * @param {*} selfRow 
 * @param {*} selfCol 
 * @param {*} targetRow 
 * @param {*} targetCol 
 */
function moveIndex (selfRow, selfCol, targetRow, targetCol) {
    const temp = map.content[selfRow][selfCol];
    map.content[selfRow][selfCol] = map.content[targetRow][targetCol];
    map.content[targetRow][targetCol] = temp;
}

/**
 * 获取当前玩家坐标，返回坐标系对象
 */
function getCurrent () {
    for(let row = 0; row < map.rowNumber; row++){
        for(let col = 0;col < map.colNumber; col++){
            if(map.content[row][col] === 1){
                return {
                    row,
                    col
                }
            }
        }
    }
}

/**
 * 判断游戏是否结束
 */
function ifGameOver () {
    const flagArr = [];
    let flag = false;
    //遍历正确位置对象，看对应坐标上是否为盒子
    map.correct.forEach((ele,index)=>{
        flagArr.push(map.content[ele.row][ele.col] === 3);
    })
    flag = flagArr.indexOf(false) === -1 ? true : false;
    if(flag){
        setTimeout(()=>{
            window.alert("闯关成功，牛逼呀！！！");
        },200)
    }
}


/**
 * 玩家移动函数，返回移动的结果，boolean值
 * @param {*} direction 要移动的方向 up、down、left、right
 */
export function playerMove (direction) {
    //获取玩家当前位置
    const box = getCurrent();
    //获取下一步的信息
    const nextBox = ifNextType(box.row, box.col, direction);
    //先做不能移动的判断,直接返回
    if(nextBox.type === map.WALL){
        return false;
    }
    //下一步为空白的直接移动
    if(nextBox.type === map.SPACE){
        moveIndex(box.row, box.col, nextBox.x, nextBox.y);
    }
    //下一步为箱子的移动处理
    else {
        const nextNextBox = ifNextType(nextBox.x, nextBox.y ,direction);
        if(nextNextBox.type === map.SPACE){
            moveIndex(nextBox.x, nextBox.y, nextNextBox.x, nextNextBox.y);
            moveIndex(box.row, box.col, nextBox.x, nextBox.y);
        }else{
            return false;
        }
    }
    ifGameOver();
    showMap();
    return true;
}