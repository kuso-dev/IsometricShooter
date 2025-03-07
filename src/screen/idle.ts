import * as THREE from "three";

export class IdleScreen {
  private static domId = "idle";

  static create() {
    const canvas = document.createElement("canvas");
    canvas.id = this.domId;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const titleFontSize = 60;
    const descriptionFontSize = 40;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const topMargin = 40;
    const descriptionTopMargin = 240;
    const leftMargin = window.innerWidth * 0.1;
    const lineSpacing = 8;

    const fontFamily = "monospace";
    ctx.textAlign = "left";
    ctx.textBaseline = "hanging";
    ctx.fillStyle = "rgba(255, 255, 255, 1.0)";

    {
      ctx.font = `bold ${titleFontSize}px '${fontFamily}'`;
      ctx.fillText("Isometric Shooter", leftMargin, topMargin);
    }

    {
      ctx.font = `bold ${descriptionFontSize}px '${fontFamily}'`;
      ctx.fillText(
        "↑ : move forward",
        leftMargin,
        topMargin +
          descriptionTopMargin +
          descriptionFontSize * 1 +
          lineSpacing * 0,
      );
      ctx.fillText(
        "←,→ : rotate",
        leftMargin,
        topMargin +
          descriptionTopMargin +
          descriptionFontSize * 2 +
          lineSpacing * 1,
      );
      ctx.fillText(
        "a,d : move left and right",
        leftMargin,
        topMargin +
          descriptionTopMargin +
          descriptionFontSize * 3 +
          lineSpacing * 2,
      );
      ctx.fillText(
        "Space : shoot",
        leftMargin,
        topMargin +
          descriptionTopMargin +
          descriptionFontSize * 4 +
          lineSpacing * 3,
      );
      ctx.fillText(
        "Shift : boost",
        leftMargin,
        topMargin +
          descriptionTopMargin +
          descriptionFontSize * 5 +
          lineSpacing * 4,
      );
      ctx.fillText(
        "press any key to start",
        leftMargin,
        topMargin +
          descriptionTopMargin +
          descriptionFontSize * 8 +
          lineSpacing * 5,
      );
    }

    document.body.appendChild(canvas);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = false;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBAFormat;
  }

  static destroy() {
    document.getElementById(this.domId)?.remove();
  }
}
