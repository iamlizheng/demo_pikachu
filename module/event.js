//事件绑定模块

import * as player from "./play.js";


document.body.onkeydown = function (e) {
    if(e.key === "ArrowUp"){
        player.playerMove("up");
    }
    else if (e.key === "ArrowDown") {
        player.playerMove("down");
    }
    else if (e.key === "ArrowLeft") {
        player.playerMove("left");
    }
    else if (e.key === "ArrowRight") {
        player.playerMove("right");
    }
}
document.getElementsByClassName('game_reload')[0].onclick = function (e) {
    const flag = window.confirm('确定要重新开始吗？')
    if (flag) {
        location.reload();
    }
}