import * as THREE from "three";

const makeGridVertices = (size: number) => {
  const gridStep = 1;
  const gridVertices = [];

  for (let i = -size; i <= size; i += gridStep) {
    gridVertices.push(-size, 0, i);
    gridVertices.push(size, 0, i);
    gridVertices.push(i, 0, -size);
    gridVertices.push(i, 0, size);
  }

  return gridVertices;
};

export class StageGrid extends THREE.LineSegments {
  static gridSize = 20;
  constructor() {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(makeGridVertices(StageGrid.gridSize), 3),
    );
    const material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
    });

    super(geometry, material);
  }
}
