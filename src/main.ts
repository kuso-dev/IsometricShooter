import * as THREE from "three";

import { Controller } from "./controller";
import { IdleScreen } from "./screen/idle";

let isRunning = false;

const statusDisplay = document.createElement("div");
Object.assign(statusDisplay.style, {
  position: "absolute",
  top: "10px",
  left: "10px",
  color: "white",
  fontSize: "16px",
});
document.body.appendChild(statusDisplay);

function updateStatusDisplay() {
  statusDisplay.innerText = game.character.getStatusDescription();
}

const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 600);
Object.assign(renderer.domElement.style, {
  position: "absolute",
  top: "0",
  right: "0",
  bottom: "0",
  left: "0",
  margin: "auto",
});
document.body.appendChild(renderer.domElement);

const game = new Controller();
game.init();

document.addEventListener("keydown", (event) => {
  if (!isRunning) {
    isRunning = true;
    IdleScreen.destroy();
    animate();
  }
  game.keys[event.key] = true;
});

document.addEventListener("keyup", (event) => {
  if (event.key === " ") {
    game.fireBullet();
  }
  game.keys[event.key] = false;
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState !== "visible") {
    isRunning = false;
    return;
  }
});

window.addEventListener("focus", () => {
  isRunning = false;
});

window.addEventListener("blur", () => {
  isRunning = false;
});

function animate() {
  if (!isRunning) return;
  requestAnimationFrame(animate);
  // キー入力を反映
  game.evalKeys();
  // 自機の位置を更新
  game.moveCharacter();
  // 弾の位置を更新
  game.moveBullets();
  // 敵機の位置を更新
  game.moveEnemies();
  // 敵機の弾の位置を更新
  game.moveEnemyBullets();
  // 敵機との衝突判定
  game.collisionDetection();
  // 敵機の爆発処理
  game.moveFragments();
  // カメラの位置を更新
  game.moveCamera();
  // 表示を更新
  updateStatusDisplay();
  renderer.render(game.scene, game.camera);

  if (game.character.hitPoint <= 0) {
    isRunning = false;
    alert("Game Over");
    location.reload();
  }
}

IdleScreen.create();
