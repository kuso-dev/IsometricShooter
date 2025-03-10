import * as THREE from "three";

const MAX_HP = 100;
export const MAX_SHOT_CHARGE_COUNT = 300;

export type PlayerBullet = THREE.Mesh & {
  velocity: THREE.Vector3;
  speed: number;
};

export class PlayerMesh extends THREE.Mesh {
  readonly speed: number = 0.01;
  private boost: boolean = false;

  velocity: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  invincible: boolean = false;
  hitPoint: number = MAX_HP;
  shotChargeCount: number = 0;
  shotChargeEffects: THREE.Line[] = [];

  constructor() {
    const geometry = new THREE.ConeGeometry(0.3, 1, 3);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
      transparent: true, // ダメージ時の点滅用に設定
      opacity: 1,
    });

    super(geometry, material);
    this.rotation.set(-Math.PI / 2, 0, 0);
  }

  // ダメージ表現
  blink() {
    const duration = 2000;
    const interval = 200;
    const count = duration / interval;

    this.invincible = true;

    const material = Array.isArray(this.material)
      ? this.material[0]
      : this.material;

    const blink = (_count: number) => {
      if (_count !== 0) {
        material.opacity = _count % 2 === 0 ? 0 : 1;
        setTimeout(() => blink(_count - 1), interval);
      } else {
        material.opacity = 1;
        this.invincible = false;
      }
    };

    blink(count);
  }

  makeBullet(): PlayerBullet {
    const bulletRadiusFactor =
      this.shotChargeCount / (MAX_SHOT_CHARGE_COUNT * 0.5);

    const length = 2; // レーザーの長さ
    const radius = Math.max(0.1, 1 * bulletRadiusFactor);
    const geometry = new THREE.CylinderGeometry(radius, radius, length, 8);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.25,
      wireframe: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.set(-Math.PI / 2, 0, 0);

    mesh.position.set(this.position.x, this.position.y, this.position.z);
    mesh.rotation.z = this.rotation.z;

    const offset = length / 2; // 中心位置に合わせ
    mesh.position.z -= offset * Math.cos(this.rotation.z);
    mesh.position.x -= offset * Math.sin(this.rotation.z);

    const bullet = Object.assign(mesh, {
      velocity: new THREE.Vector3(),
      speed: 1,
    });

    bullet.velocity.z = -bullet.speed * Math.cos(this.rotation.z);
    bullet.velocity.x = -bullet.speed * Math.sin(this.rotation.z);

    return bullet;
  }

  supplyChargeEffect() {
    for (let i = 0; i < 5; i++) {
      const line = this.makeLine();
      this.shotChargeEffects.push(line);
    }
  }

  private makeLine() {
    const segmentCount = 15;
    const points = Array(segmentCount).fill(new THREE.Vector3(0, 0, 0));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.5,
    });

    return new THREE.Line(geometry, lineMaterial);
  }

  // MARK: STATUS OPERATION

  decrementHitPoint(damage: number) {
    this.hitPoint = Math.max(0, this.hitPoint - damage);
  }

  incrementCharge() {
    this.shotChargeCount = Math.min(
      MAX_SHOT_CHARGE_COUNT,
      this.shotChargeCount + 1,
    );
  }

  decrementCharge() {
    this.shotChargeCount = Math.max(0, this.shotChargeCount - 1);
  }

  getStatusDescription() {
    return `HP: ${this.hitPoint}/${MAX_HP} CHARGE: ${this.shotChargeCount}/${MAX_SHOT_CHARGE_COUNT}`;
  }

  incrementForwardVelocity() {
    this.velocity.z -=
      this.speed * Math.cos(this.rotation.z) * (this.boost ? 3 : 1);
    this.velocity.x -=
      this.speed * Math.sin(this.rotation.z) * (this.boost ? 3 : 1);
  }

  incrementSideVelocity(direction: "left" | "right") {
    const coefficient = direction === "left" ? 1 : -1;
    this.velocity.z += this.speed * Math.sin(this.rotation.z) * coefficient;
    this.velocity.x -= this.speed * Math.cos(this.rotation.z) * coefficient;
  }

  switchBoost(isOn: boolean) {
    this.boost = isOn;
  }
}
