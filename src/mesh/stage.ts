import * as THREE from "three";
import { STAGE_GRID, type StageTile } from "@/constant/stage";

const makeVertices = (stageSize: number, x: number, z: number) => {
  const halfSize = stageSize / 2;
  const lineGeometry = new THREE.BufferGeometry();
  const vertices = new Float32Array([
    x - halfSize,
    0,
    z - halfSize,

    x + 1 - halfSize,
    0,
    z - halfSize,

    x + 1 - halfSize,
    0,
    z - halfSize,

    x + 1 - halfSize,
    0,
    z + 1 - halfSize,

    x + 1 - halfSize,
    0,
    z + 1 - halfSize,

    x - halfSize,
    0,
    z + 1 - halfSize,

    x - halfSize,
    0,
    z + 1 - halfSize,

    x - halfSize,
    0,
    z - halfSize,
  ]);

  lineGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3),
  );

  return lineGeometry;
};
const makeTilesFromArray = (tilesArray: StageTile[][]) => {
  const tiles = [];
  const gridStep = 1;

  const stageSize = tilesArray.length;

  for (let row = 0; row < tilesArray.length; row++) {
    for (let column = 0; column < tilesArray[row].length; column++) {
      const value = tilesArray[row][column];

      switch (value) {
        case 0: {
          // 床
          const geometry = makeVertices(stageSize, column, row);
          const material = new THREE.LineBasicMaterial({
            color: 0xffffff,
            opacity: 0.5,
            transparent: true,
          });
          const lineSegments = new THREE.LineSegments(geometry, material);
          tiles.push(lineSegments);
          break;
        }
        case 1: {
          // 壁
          const geometry = new THREE.BoxGeometry(gridStep, gridStep, gridStep);
          const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.2,
          });
          const box = new THREE.Mesh(geometry, material);
          box.position.set(column - stageSize / 2, -gridStep / 2, row - stageSize / 2);
          tiles.push(box);
        }
      }
    }
  }

  return tiles;
};

export class StageMesh {
  static gridSize = STAGE_GRID[0].length;
  tiles: (THREE.Mesh | THREE.LineSegments)[];

  constructor() {
    this.tiles = makeTilesFromArray(STAGE_GRID);
  }

  collisionDetection(position: THREE.Vector3, scale: THREE.Vector3) {
    const box = new THREE.Box3().setFromCenterAndSize(
      position,
      scale.multiplyScalar(1.2),
    );

    for (const tile of this.tiles) {
      if (tile instanceof THREE.Mesh) {
        const wall = new THREE.Box3().setFromObject(tile);
        if (wall.intersectsBox(box)) {
          return true;
        }
      }
    }
    return false;
  }
}
