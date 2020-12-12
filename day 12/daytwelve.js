import input from './input.js';

const commands = input.split('\n').map((command) => ({ action: command.slice(0, 1), value: Number(command.slice(1)) }));

const headings = { 0: { x: 0, y: -1 }, 90: { x: 1, y: 0 }, 180: { x: 0, y: 1 }, 270: { x: -1, y: 0 } };
const directions = { N: { x: 0, y: -1 }, E: { x: 1, y: 0 }, S: { x: 0, y: 1 }, W: { x: -1, y: 0 } };

//part one - move the ship
function moveShip(commands) {
    //ship starting position and direction
    let x = 0;
    let y = 0;
    let currentDirection = 90;

    commands.forEach(({ action, value }) => {
        switch (action) {
            case 'F':
                //move the ship in the direction it's heading
                x += value * headings[currentDirection].x;
                y += value * headings[currentDirection].y;
                break;
            case 'L':
                //rotate the ship to the left
                currentDirection -= value;
                if (currentDirection < 0) {
                    currentDirection += 360;
                }
                break;
            case 'R':
                //rotate the ship to the right
                currentDirection += value;
                if (currentDirection >= 360) {
                    currentDirection -= 360;
                }
                break;
            default:
                //move the ship
                x += value * directions[action].x;
                y += value * directions[action].y;
        }
    });
    //return Manhattan distance of the ship from the start
    return Math.abs(x) + Math.abs(y);
}

function rotateWaypoint(waypoint, command) {
    //rotate the waypoint in 90 degree segments
    for (let angle = command.value / 90; angle > 0; angle--) {
        if (command.action === 'L') {
            // -90degs: {x,y} = {y,-x}
            waypoint = { x: waypoint.y, y: -waypoint.x };
        } else {
            // 90degs: {x,y} = {-y,x}
            waypoint = { x: -waypoint.y, y: waypoint.x };
        }
    }
    return waypoint;
}

//part two - move the ship and waypoint
function moveWaypoint(commands) {
    //ship and waypoint starting position
    const ship = { x: 0, y: 0 };
    let waypoint = { x: 10, y: -1 };

    commands.forEach((command) => {
        switch (command.action) {
            //move the ship to the waypoint
            case 'F':
                ship.x += waypoint.x * command.value;
                ship.y += waypoint.y * command.value;
                break;
            //rotate the waypoint around the ship
            case 'L':
            case 'R':
                waypoint = rotateWaypoint(waypoint, command);
                break;
            //move the waypoint
            default:
                waypoint.x += command.value * directions[command.action].x;
                waypoint.y += command.value * directions[command.action].y;
        }
    });
    //return Manhattan distance of the ship from the start
    return Math.abs(ship.x) + Math.abs(ship.y);
}

console.log('the Manhattan distance for part one is: ', moveShip(commands));
console.log('the Manhattan distance for part two is: ', moveWaypoint(commands));
