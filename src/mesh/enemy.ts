import * as THREE from "three";
import { PlayerMesh } from "./player";

export type EnemyBullet = THREE.Mesh & {
  velocity: THREE.Vector3;
};

export type EnemyFragment = THREE.Mesh & {
  velocity: THREE.Vector3;
  birthTime: number;
  lifetime: 1;
};

export class EnemyMesh extends THREE.Mesh {
  static readonly speed: number = 0.01;
  static readonly bulletSpeed: number = 0.1;

  constructor() {
    const geometry = new THREE.BoxGeometry(0.5, 1, 0.5);
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true,
    });

    super(geometry, material);
  }

  makeBullet(character: PlayerMesh): EnemyBullet {
    const bulletGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const bulletMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0000,
    });
    const mesh = new THREE.Mesh(bulletGeometry, bulletMaterial);
    mesh.position.copy(this.position);

    const bullet = Object.assign(mesh, {
      velocity: new THREE.Vector3(),
    });
    const direction = new THREE.Vector3(
      character.position.x - this.position.x,
      0,
      character.position.z - this.position.z,
    );
    direction.normalize().multiplyScalar(EnemyMesh.bulletSpeed);
    bullet.velocity.copy(direction);

    return bullet;
  }

  makeFragments(): EnemyFragment[] {
    const explosionCount = 30;
    const explosionRadius = 0.5;
    const fragments: EnemyFragment[] = [];

    for (let i = 0; i < explosionCount; i++) {
      const fragmentGeometry = new THREE.BoxGeometry(0.25, 0.25, 0.25);
      const fragmentMaterial = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.25 ? 0xffffff : Math.random() * 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
      });
      const mesh = new THREE.Mesh(fragmentGeometry, fragmentMaterial);
      mesh.position.copy(this.position);

      const fragment = Object.assign(mesh, {
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * explosionRadius,
          (Math.random() - 0.5) * explosionRadius,
          (Math.random() - 0.5) * explosionRadius,
        ),
        birthTime: performance.now(),
        lifetime: 1 as const,
      });
      fragments.push(fragment);
    }

    return fragments;
  }
}
