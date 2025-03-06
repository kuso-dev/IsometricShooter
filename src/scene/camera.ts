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
}
