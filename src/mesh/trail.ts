import * as THREE from "three";
import { PlayerMesh } from "./player";

export class TrailMesh extends THREE.Mesh {
  private static readonly trailCount = 15;
  private static readonly updateInterval = 5;
  private frameCounter = 0;
  declare material: THREE.Material;

  private constructor() {
    const mesh = new PlayerMesh();
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
    });

    super(mesh.geometry, material);
    this.rotation.set(-Math.PI / 2, 0, 0);
  }

  static makeTrails() {
    const trails = [];
    for (let i = 0; i < TrailMesh.trailCount; i++) {
      const trailMesh = new TrailMesh();
      trails.push(trailMesh);
    }
    return trails;
  }

  update(args: { position: THREE.Vector3; rotation: THREE.Euler }) {
    this.frameCounter++;
    if (this.frameCounter % TrailMesh.updateInterval === 0) {
      this.position.copy(args.position);
      this.rotation.copy(args.rotation);
      this.frameCounter = 0;
    }
  }
}
