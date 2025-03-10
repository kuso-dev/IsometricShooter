import * as THREE from "three";
import { EffectComposer as THREE_EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { VignetteShader } from "three/examples/jsm/shaders/VignetteShader.js";

export class EffectComposer extends THREE_EffectComposer {
  private bloomPass: UnrealBloomPass;
  private vignettePass: ShaderPass;

  constructor(renderer: THREE.WebGLRenderer, renderPass: RenderPass) {
    super(renderer);
    const rendererSize = renderer.getSize(new THREE.Vector2(0, 0));

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(rendererSize.x, rendererSize.y),
      0.5,
      0.01,
      100,
    );
    this.bloomPass = bloomPass;

    const vignettePass = new ShaderPass(VignetteShader);
    vignettePass.uniforms["offset"].value = 1.0;
    vignettePass.uniforms["darkness"].value = 1.0;
    this.vignettePass = vignettePass;

    this.addPass(renderPass);
    this.addPass(bloomPass);
    this.addPass(vignettePass);
  }

  activateBloomPass() {
    this.bloomPass.threshold = 0.25;
  }

  deactivateBloomPass() {
    this.bloomPass.threshold = 100;
  }

  activateVignettePass() {
    this.vignettePass.uniforms["offset"].value = 0.9;
    this.vignettePass.uniforms["darkness"].value = 2.0;
  }

  deactivateVignettePass() {
    this.vignettePass.uniforms["offset"].value = 1.0;
    this.vignettePass.uniforms["darkness"].value = 1.0;
  }
}
