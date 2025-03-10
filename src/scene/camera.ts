import * as THREE from "three";

export class MainCamera extends THREE.OrthographicCamera {
  readonly initialPosition = new THREE.Vector3(8, 8, 8);
  constructor() {
    super(-14, 14, 14, -14, 1, 1000);
    this.position.copy(this.initialPosition);
    this.lookAt(0, 0, 0);
  }

  shake() {
    const duration = 500; // 揺れる時間（ミリ秒）
    const intensity = 0.5; // 揺れの強さ
    const startTime = performance.now();

    const _shake = () => {
      const elapsed = performance.now() - startTime;
      if (elapsed < duration) {
        const x = (Math.random() - 0.5) * intensity;
        const y = (Math.random() - 0.5) * intensity;
        this.position.set(
          this.initialPosition.x + x,
          this.initialPosition.y + y,
          this.initialPosition.z,
        );
        requestAnimationFrame(_shake);
      } else {
        this.position.copy(this.initialPosition);
      }
    };

    _shake();
  }

  zoomIn() {
    const zoomRatio = 1.2;

    if (this.zoom < zoomRatio) {
      this.zoom = Math.min(zoomRatio, this.zoom + 0.01);
      this.updateProjectionMatrix();
    }
  }

  zoomOut() {
    const zoomRatio = 1.0;

    if (this.zoom > zoomRatio) {
      this.zoom = Math.max(zoomRatio, this.zoom - 0.01);
      this.updateProjectionMatrix();
    }
  }
}
