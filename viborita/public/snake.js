import { getInputDirection } from "./input.js";

export const SNAKE_SPEED = 4;
const cuerpoSnake = [{ x: 11, y: 11 }];
let newSegments = 0;

export function actualizar() {
  addSegments();
  const inputDirection = getInputDirection();
  for (let i = cuerpoSnake.length - 2; i >= 0; i--) {
    cuerpoSnake[i + 1] = { ...cuerpoSnake[i] };
  }
  cuerpoSnake[0].x += inputDirection.x;
  cuerpoSnake[0].y += inputDirection.y;
}

export function dibujar(gameBoard) {
  cuerpoSnake.forEach((segment) => {
    const elementoSnake = document.createElement("div");
    elementoSnake.style.gridRowStart = segment.y;
    elementoSnake.style.gridColumnStart = segment.x;
    elementoSnake.classList.add("snake");
    gameBoard.appendChild(elementoSnake);
  });
}

export function expandSnake(amount) {
  newSegments += amount;
}

export function onSnake(position, { ignoreHead = false } = {}) {
  return cuerpoSnake.some((segment, index) => {
    if (ignoreHead && index === 0) return false;
    return equalPositions(segment, position);
  });
}

export function getSnakeHead() {
  return cuerpoSnake[0];
}

export function snakeIntersection() {
  return onSnake(cuerpoSnake[0], { ignoreHead: true });
}

function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    cuerpoSnake.push({
      ...cuerpoSnake[cuerpoSnake.length - 1],
    });
  }

  newSegments = 0;
}
