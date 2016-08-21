import * as React from "react";
import * as ReactDOM from "react-dom";

class BeeperClass extends React.Component {
    render() {
        return (
            <div className="canvas-container">
                <canvas id="beeper"></canvas>
            </div>
        )
    }
}

export function start() {
    ReactDOM.render(
        <BeeperClass />,
        document.getElementById('app')
    );

    var canvas = document.getElementById("beeper");
    var container = canvas.parentNode;
    var txt = window.localStorage.savedText;

    var cwidth = canvas.width = container.clientWidth;
    var cheight = canvas.height = container.clientHeight;

    var ctx = canvas.getContext("2d");

    ctx.fillStyle = "white";
    ctx.font = cheight + "px sans-serif";
    var textWidth = ctx.measureText(txt).width;
    var tick = 0;
    var holeWidth = 80;
    var startPosition = cwidth/2;
    var maxTick = textWidth/holeWidth/2;
    var textMargin = cheight/100*90;
    var windowPosition = startPosition - holeWidth/2;

    var animInterval = function(){
        //ctx.clearRect(0, 0, cwidth, cheight);
        //drawVoid = !drawVoid;
        //if (!drawVoid) {
        tick++;
        ctx.globalCompositeOperation='source-over';
        ctx.fillStyle = "green";
        ctx.fillRect(windowPosition, 0, holeWidth, cheight);
        ctx.globalCompositeOperation='source-in';
        ctx.fillStyle = "white";
        ctx.fillText(txt, startPosition - tick * holeWidth * 2, textMargin);
        //}
        if (tick >= maxTick) {
            tick = 0;
        }
        requestAnimationFrame(animInterval);
    };

    animInterval();
}