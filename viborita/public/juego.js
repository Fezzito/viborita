import {
  actualizar as actualizarSnake,
  dibujar as dibujarSnake,
  SNAKE_SPEED,
  getSnakeHead,
  snakeIntersection,
} from "./snake.js";
import { actualizar as updateFood, dibujar as drawFood } from "./food.js";
import { outsideGrid } from "./grid.js";

let ultimoRender = 0;
let gameOver = false;
const gameBoard = document.getElementById("gameBoard");

function main(tiempoActual) {
  if (gameOver) {
    if (confirm("Perdiste amigue, click en Cancelar y volves a intentar")) {
      window.location = "/";
    }
  }

  window.requestAnimationFrame(main);
  const segundosDesdeUltimoRender = (tiempoActual - ultimoRender) / 1000;
  if (segundosDesdeUltimoRender < 1 / SNAKE_SPEED) return;

  ultimoRender = tiempoActual;

  actualizar();
  dibujar();
}

window.requestAnimationFrame(main);

function actualizar() {
  actualizarSnake();
  updateFood();
  checkDeath();
}

function dibujar() {
  gameBoard.innerHTML = "";
  dibujarSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}
