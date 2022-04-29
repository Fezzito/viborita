import { onSnake, expandSnake } from "./snake.js";
import { randomGridPosition } from "./grid.js";

let food = getRandomFoodPosition();
const EXPANSION_RATE = 3;

export function actualizar() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE);
    food = getRandomFoodPosition();
  }
}

export function dibujar(gameBoard) {
  const elementoComida = document.createElement("div");
  elementoComida.style.gridRowStart = food.y;
  elementoComida.style.gridColumnStart = food.x;
  elementoComida.classList.add("food");
  gameBoard.appendChild(elementoComida);
}

function getRandomFoodPosition() {
  let newFoodPosition;
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }
  return newFoodPosition;
}
