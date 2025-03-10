import * as THREE from "three";

import { StageMesh } from "./mesh/stage";
import { PlayerMesh, PlayerBullet, MAX_SHOT_CHARGE_COUNT } from "./mesh/player";
import { EnemyMesh, EnemyBullet, EnemyFragment } from "./mesh/enemy";
import { TrailMesh } from "./mesh/trail";
import { MainCamera } from "./scene/camera";
import { Sound as sound } from "./scene/sound";

const MAX_ENEMY_COUNT = 10;

export class Controller {
  scene: THREE.Scene = new THREE.Scene();
  camera: MainCamera = new MainCamera();
  gameSpeedRatio = 1;
  stage: StageMesh = new StageMesh();
  character: PlayerMesh = new PlayerMesh();
  trails: TrailMesh[] = TrailMesh.makeTrails();
  enemies: EnemyMesh[] = [];
  enemyFragments: EnemyFragment[] = [];
  bullets: PlayerBullet[] = [];
  enemyBullets: EnemyBullet[] = [];
  keys: Record<string, boolean> = {};

  constructor() {
    this.fireEnemyBullet = this.fireEnemyBullet.bind(this);
    this.takeDamage = this.takeDamage.bind(this);
    this.addEnemy = this.addEnemy.bind(this);
  }

  init() {
    this.scene.add(...this.stage.tiles);
    this.scene.add(this.character);
    this.scene.add(...this.trails);

    // 敵を追加する間隔を設定
    setInterval(this.addEnemy, 1000);
    // 敵が弾を発射する間隔を設定
    setInterval(() => {
      this.enemies.forEach(this.fireEnemyBullet);
    }, 3000);
  }

  fireBullet() {
    if (this.character.shotChargeCount < 100) {
      sound.singleLaser();
    } else if (this.character.shotChargeCount < 200) {
      sound.chargeLaser();
    } else {
      sound.superChargeLaser();
    }

    const _loop = () => {
      setTimeout(() => {
        const bullet = this.character.makeBullet();
        this.bullets.push(bullet);
        this.scene.add(bullet);
        this.character.decrementCharge();
        if (this.character.shotChargeCount > 0) _loop();
      }, 2);
    };
    _loop();
  }

  fireEnemyBullet(enemy: EnemyMesh) {
    const bullet = enemy.makeBullet(this.character);
    this.enemyBullets.push(bullet);
    this.scene.add(bullet);
  }

  takeDamage(damage: number) {
    this.character.decrementHitPoint(damage);
    this.camera.shake();
    this.character.blink();
  }

  evalKeys() {
    if (this.keys["ArrowUp".toLowerCase()]) {
      this.character.incrementForwardVelocity();
    }
    if (this.keys["ArrowLeft".toLowerCase()]) {
      this.character.rotation.z += 0.075;
    }
    if (this.keys["ArrowRight".toLowerCase()]) {
      this.character.rotation.z -= 0.075;
    }
    if (this.keys[" "]) {
      this.character.incrementCharge();
    }
    if (this.keys["a"]) {
      this.character.incrementSideVelocity("left");
    }
    if (this.keys["d"]) {
      this.character.incrementSideVelocity("right");
    }

    this.character.switchBoost(Boolean(this.keys["Shift".toLowerCase()]));
  }

  moveCharacter() {
    const isColliding = this.stage.collisionDetection(
      this.character.position.clone().add(this.character.velocity),
      this.character.scale.clone(),
    );
    if (isColliding) {
      this.character.velocity.multiplyScalar(0);
      return;
    }

    this.character.position.x += this.character.velocity.x;
    this.character.position.z += this.character.velocity.z;
    this.character.velocity.multiplyScalar(0.9); // 慣性処理
  }

  addEnemy() {
    if (this.enemies.length < MAX_ENEMY_COUNT) {
      const enemy = new EnemyMesh();
      const positionX =
        (Math.random() > 0.5 ? 1 : -1) *
        (StageMesh.gridSize / 2 - 2) *
        Math.random();
      const positionZ =
        (Math.random() > 0.5 ? 1 : -1) *
        (StageMesh.gridSize / 2 - 2) *
        Math.random();
      enemy.position.set(positionX, 0.5, positionZ);

      this.enemies.push(enemy);
      this.scene.add(enemy);
    }
  }

  moveEnemies() {
    const enemySpeed = EnemyMesh.speed * this.gameSpeedRatio;

    this.enemies.forEach((enemy) => {
      const minDistance = 5; // 敵とキャラクター間の最小距離
      const safeDistance = 2.5; // 敵同士の間の距離

      // 自機に向かって移動
      const direction = new THREE.Vector3(
        this.character.position.x - enemy.position.x,
        0,
        this.character.position.z - enemy.position.z,
      );

      // 自機に接近し過ぎた場合距離を取る
      direction
        .normalize()
        .multiplyScalar(
          direction.length() < minDistance ? enemySpeed : -enemySpeed,
        );

      enemy.position.x += direction.x;
      enemy.position.z += direction.z;

      // 敵同士も接近し過ぎた場合距離を取る
      this.enemies.forEach((otherEnemy) => {
        if (otherEnemy !== enemy) {
          const distance = enemy.position.distanceTo(otherEnemy.position);
          if (distance < safeDistance) {
            const avoidDirection = new THREE.Vector3()
              .subVectors(enemy.position, otherEnemy.position)
              .normalize()
              .multiplyScalar(enemySpeed);
            enemy.position.add(avoidDirection);
          }
        }
      });

      // 敵機の移動範囲制限
      const gridBoundary = StageMesh.gridSize - 2;
      if (
        Math.abs(enemy.position.x) > gridBoundary ||
        Math.abs(enemy.position.z) > gridBoundary
      ) {
        enemy.position.x = Math.max(
          -gridBoundary,
          Math.min(gridBoundary, enemy.position.x),
        );
        enemy.position.z = Math.max(
          -gridBoundary,
          Math.min(gridBoundary, enemy.position.z),
        );
      }
    });
  }

  moveBullets() {
    const gridBoundary = StageMesh.gridSize - 0.5;
    this.bullets.forEach((bullet, bulletIndex) => {
      const isColliding = this.stage.collisionDetection(
        bullet.position,
        bullet.scale.clone(),
      );
      if (isColliding) {
        bullet.velocity.multiplyScalar(0);
        this.scene.remove(bullet);
        this.bullets.splice(bulletIndex, 1);
        return;
      }
      bullet.position.x += bullet.velocity.x;
      bullet.position.z += bullet.velocity.z;

      // 領域の範囲外に出たら弾を削除
      if (
        Math.abs(bullet.position.x) > gridBoundary ||
        Math.abs(bullet.position.z) > gridBoundary
      ) {
        this.scene.remove(bullet);
        this.bullets.splice(bulletIndex, 1);
        return;
      }

      // 敵機への着弾処理
      this.enemies.forEach((enemy, enemyIndex) => {
        const distance = bullet.position.distanceTo(enemy.position);
        const combinedRadius =
          1.0 + this.character.shotChargeCount / MAX_SHOT_CHARGE_COUNT; // 衝突判定
        if (distance < combinedRadius) {
          this.scene.remove(enemy);
          this.enemies.splice(enemyIndex, 1);
          sound.explosion();
          this.explodeEnemy(enemy);
        }
      });
    });
  }

  moveEnemyBullets() {
    const gridBoundary = StageMesh.gridSize / 2 - 0.5;
    this.enemyBullets.forEach((enemyBullet, bulletIndex) => {
      enemyBullet.position.x += enemyBullet.velocity.x * this.gameSpeedRatio;
      enemyBullet.position.z += enemyBullet.velocity.z * this.gameSpeedRatio;

      // 領域の範囲外に出たら弾を削除
      if (
        Math.abs(enemyBullet.position.x) > gridBoundary ||
        Math.abs(enemyBullet.position.z) > gridBoundary
      ) {
        this.scene.remove(enemyBullet);
        this.enemyBullets.splice(bulletIndex, 1);
      }

      if (this.character.invincible) return; // 無敵時間中は衝突判定を無視

      // 自機への被弾処理
      const distance = enemyBullet.position.distanceTo(this.character.position);
      const combinedRadius = 0.6; // 衝突判定
      if (distance < combinedRadius) {
        sound.hit();
        this.takeDamage(10);
        this.character.velocity.set(0, 0, 0);
        this.scene.remove(enemyBullet);
        this.enemyBullets.splice(bulletIndex, 1);
      }
    });
  }

  collisionDetection() {
    if (this.character.invincible) return; // 無敵時間中は衝突判定を無視

    this.enemies.forEach((enemy) => {
      const distance = enemy.position.distanceTo(this.character.position);
      const combinedRadius = 0.6; // 衝突判定

      if (distance < combinedRadius) {
        sound.hit();
        this.takeDamage(10);
        this.character.velocity.set(0, 0, 0);
      }
    });
  }

  moveCamera() {
    this.camera.position.x = this.character.position.x + 5;
    this.camera.position.z = this.character.position.z + 5;
    this.camera.lookAt(this.character.position);
  }

  explodeEnemy(enemy: EnemyMesh) {
    const fragments = enemy.makeFragments();

    fragments.forEach((fragment) => {
      this.enemyFragments.push(fragment);
      this.scene.add(fragment);
    });
  }

  moveFragments() {
    this.enemyFragments.forEach((fragment, fragmentIndex) => {
      fragment.position.add(fragment.velocity.clone().multiplyScalar(0.1)); // 毎フレーム位置を更新
      fragment.velocity.multiplyScalar(0.95); // 徐々に減速

      const currentTime = performance.now();
      if (currentTime - fragment.birthTime > fragment.lifetime * 1000) {
        this.scene.remove(fragment);
        this.enemyFragments.splice(fragmentIndex, 1);
      }
    });
  }

  displayChargeEffect() {
    const factor =
      this.character.shotChargeCount / (MAX_SHOT_CHARGE_COUNT * 0.5);

    if (!this.character.shotChargeEffects.length) {
      this.character.supplyChargeEffect();
      this.scene.add(...this.character.shotChargeEffects);
    }

    this.character.shotChargeEffects.forEach((line) => {
      const { array: positions } = line.geometry.attributes.position;

      for (let i = 0; i < positions.length; i += 3) {
        // 自機の周囲にエフェクトを発生
        positions[i] =
          this.character.position.x -
          Math.sin(this.character.rotation.z) +
          Math.random() * factor;
        positions[i + 1] = this.character.position.y + Math.random() * factor;
        positions[i + 2] =
          this.character.position.z -
          Math.cos(this.character.rotation.z) +
          Math.random() * factor;
      }

      // 位置の更新を反映
      line.geometry.attributes.position.needsUpdate = true;
    });

    // ジオメトリキャッシュを回避するために定期的にエフェクトを再生成
    setTimeout(() => {
      this.character.shotChargeEffects.forEach((line) => {
        this.scene.remove(line);
        this.character.shotChargeEffects = [];
        line.geometry.dispose();
      });
    }, 500);
  }

  updateTrails() {
    const { trails } = this;
    trails.forEach((trail, i) => {
      const isNearTrail = i + 1 === trails.length;
      const args = {
        position: isNearTrail
          ? this.character.position
          : trails[i + 1].position,
        rotation: isNearTrail
          ? this.character.rotation
          : trails[i + 1].rotation,
      };
      trail.update(args);

      trails[i].material.opacity = Math.max(0, i / trails.length - 0.4);

      if (trail.position.distanceTo(this.character.position) < 0.25) {
        trail.material.opacity = 0;
      }
    });
  }
}
