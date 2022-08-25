const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.body.append(canvas);

let state = {players: [{x: 0,y: 0},{x: 0,y:0}]};

const sigmoid = (x) => {
    const c1 = 4;
    const c2 = 0;
    let y = 1 / (1 + Math.E ** (-c1 * (x - c2)));
    return y
}

const move = (points, xOffset, yOffset) => {
    let output = [];
    for (let i = 0; i < points.length; i++) {
        let point = points[i];
        output.push({ x: point.x + xOffset, y: point.y + yOffset });
    }
    return output;
}

const scale = (points, xScale, yScale) => {
    let output = [];
    for (let i = 0; i < points.length; i++) {
        let point = points[i];
        output.push({ x: point.x * xScale, y: point.y * yScale });
    }
    return output;
}

console.log("0: ", sigmoid(0));
console.log("-5: ", sigmoid(-5));
console.log("5: ", sigmoid(5));

let points = [{ x: 0, y: 10 }, { x: 10, y: 10 }, { x: 10, y: 100 }, { x: 100, y: 100 }]

const calculateFloorPoints = () => {
    const points = []
    for (let x = -10; x < 10; x += 0.05) {
        points.push({ x: x, y: sigmoid(x) });
    }
    return points;
}
const renderFloor = (ctx) => {
    let points = calculateFloorPoints();
    points = scale(points, 100, 100);
    points = move(points, canvas.width / 2, canvas.height - 250);
    // bottom right corner
    points.push({x: canvas.width, y: canvas.height});
    // bottom left corner
    points.push({x: 0, y: canvas.height})
    // 
    points.push({x: 0, y: canvas.height-300});
    drawPolygon(context, points);
    // draw circles
    // for (let i = 0; i < points.length; i += 1) {
    //     let point = points[i];
    //     ctx.beginPath();
    //     ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI, false)
    //     ctx.stroke();
    // }
}

const drawPolygon = (ctx, points) => {
    ctx.fillStyle = 'green';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 0; i < points.length; i += 1) {
        let point = points[i];
        ctx.lineTo(point.x, point.y);
    }
    ctx.fill();
}

const renderPlayers = (state, ctx) => {
    const players = state.players;
    players.forEach((player) => {
        ctx.beginPath();
        ctx.arc(player.x, player.y, 18, Math.PI, 2 * Math.PI, false)
        ctx.fillStyle = "black";
        ctx.fill();

    })

} 

const render = () => {
    context.fillStyle = "skyblue";
    context.fillRect(0, 0, canvas.width, canvas.height);

    renderFloor(context);
    renderPlayers(state, context);

}
const update = () => {

}

const tick = (ms) => {
    requestAnimationFrame(tick);
    render();
}

const positionPlayers = (state) => {
    const players = state.players
    players[0].x = canvas.width/4;
    players[0].y = canvas.height - 250;

    players[1].x = 3 * (canvas.width/4);
    players[1].y = canvas.height - 150;
};
positionPlayers(state);
tick(performance.now());