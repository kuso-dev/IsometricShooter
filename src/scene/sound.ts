export const Sound = {
  context: new window.AudioContext(),
  hit() {
    // ノイズを生成
    const sampleRate = this.context.sampleRate;
    const hitSound = this.context.createBuffer(1, sampleRate / 10, sampleRate); // 0.1秒のバッファ
    const output = hitSound.getChannelData(0);
    // ホワイトノイズを生成
    for (let i = 0; i < output.length; i++) {
      output[i] = Math.random() * 2 - 1; // -1から1の間のランダムな値
    }
    // ノイズを再生
    const noiseSource = this.context.createBufferSource();
    noiseSource.buffer = hitSound;
    // エンベロープを追加
    const gainNode = this.context.createGain();
    gainNode.gain.setValueAtTime(0.8, this.context.currentTime); // 初期音量
    gainNode.gain.linearRampToValueAtTime(0, this.context.currentTime + 0.1); // 短時間で減衰
    // ノイズソースをゲインに接続
    noiseSource.connect(gainNode);
    gainNode.connect(this.context.destination);
    // 再生
    noiseSource.start();
    noiseSource.stop(this.context.currentTime + 0.1); // 0.1秒間再生
  },
  explosion() {
    // ノイズを生成
    const sampleRate = this.context.sampleRate;
    const noise = this.context.createBuffer(1, sampleRate, sampleRate);
    const output = noise.getChannelData(0);
    // ホワイトノイズを生成
    for (let i = 0; i < output.length; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    // ノイズを再生
    const noiseSource = this.context.createBufferSource();
    noiseSource.buffer = noise;
    // 音をフィルタリングして爆発音のように加工
    const filter = this.context.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(800, this.context.currentTime); // 中音域を強調
    filter.Q.setValueAtTime(5, this.context.currentTime); // Q値を調整
    // エンベロープを追加
    const gainNode = this.context.createGain();
    gainNode.gain.setValueAtTime(0.8, this.context.currentTime); // 初期音量
    gainNode.gain.linearRampToValueAtTime(0.1, this.context.currentTime + 0.2); // 減衰
    // リバーブを追加
    const convolver = this.context.createConvolver();
    // リバーブのインパルス応答を生成
    const reverbBuffer = this.context.createBuffer(
      2,
      sampleRate * 2,
      sampleRate,
    );
    const leftChannel = reverbBuffer.getChannelData(0);
    const rightChannel = reverbBuffer.getChannelData(1);
    for (let i = 0; i < leftChannel.length; i++) {
      leftChannel[i] = (Math.random() * 2 - 1) * (1 - i / leftChannel.length);
      rightChannel[i] = (Math.random() * 2 - 1) * (1 - i / rightChannel.length);
    }
    convolver.buffer = reverbBuffer;

    // ノイズソースをフィルタ、ゲイン、リバーブに接続
    noiseSource.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(convolver);
    convolver.connect(this.context.destination);

    // 再生
    noiseSource.start();
    noiseSource.stop(this.context.currentTime + 0.5); // 0.5秒間再生
  },
  singleLaser() {
    const frequencyArray = [1174.659, 440.0, 195.998, 27.5];
    let currentFrequencyIndex = 0;

    const oscillator = this.context.createOscillator();
    oscillator.type = "triangle";

    oscillator.frequency.setValueAtTime(
      frequencyArray[currentFrequencyIndex],
      this.context.currentTime,
    );
    const gainNode = this.context.createGain();
    gainNode.gain.setValueAtTime(0.05, this.context.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(this.context.destination);

    oscillator.start();

    const frequencyChangeInterval = 50; //ms
    const frequencyChangeDuration = 0.05; //sec
    const changeFrequency = () => {
      const id = setInterval(() => {
        const currentTime = this.context.currentTime;
        oscillator.frequency.linearRampToValueAtTime(
          frequencyArray[currentFrequencyIndex],
          currentTime + frequencyChangeDuration,
        );

        if (currentFrequencyIndex === frequencyArray.length - 1) {
          clearInterval(id);
          oscillator.stop(this.context.currentTime + 0.1);
        } else {
          currentFrequencyIndex++;
        }
      }, frequencyChangeInterval);
    };

    changeFrequency();
  },
  chargeLaser() {
    const frequencyArray = [246.942, 311.127, 349.228, 1396.913];
    let currentFrequencyIndex = 0;

    const oscillator = this.context.createOscillator();
    oscillator.type = "sine";

    oscillator.frequency.setValueAtTime(
      frequencyArray[currentFrequencyIndex],
      this.context.currentTime,
    );
    const gainNode = this.context.createGain();
    gainNode.gain.setValueAtTime(0.1, this.context.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(this.context.destination);

    oscillator.start();

    const frequencyChangeInterval = 50; //ms
    const frequencyChangeDuration = 0.075; //sec
    const changeFrequency = () => {
      const id = setInterval(() => {
        const currentTime = this.context.currentTime;
        oscillator.frequency.linearRampToValueAtTime(
          frequencyArray[currentFrequencyIndex],
          currentTime + frequencyChangeDuration,
        );

        if (currentFrequencyIndex === frequencyArray.length - 1) {
          clearInterval(id);
          oscillator.stop(this.context.currentTime + 1);
        } else {
          currentFrequencyIndex++;
        }
      }, frequencyChangeInterval);
    };

    changeFrequency();
  },
  superChargeLaser() {
    const frequencyArray = [127.5, 127.5, 1975.533, 2093.005];

    let currentFrequencyIndex = 0;

    const oscillator = this.context.createOscillator();
    oscillator.type = "square";

    oscillator.frequency.setValueAtTime(
      frequencyArray[currentFrequencyIndex],
      this.context.currentTime,
    );
    const gainNode = this.context.createGain();
    gainNode.gain.setValueAtTime(0.01, this.context.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(this.context.destination);

    oscillator.start();

    const frequencyChangeInterval = 100; //ms
    const frequencyChangeDuration = 0.1; //sec
    const changeFrequency = () => {
      const id = setInterval(() => {
        const currentTime = this.context.currentTime;
        oscillator.frequency.linearRampToValueAtTime(
          frequencyArray[currentFrequencyIndex],
          currentTime + frequencyChangeDuration,
        );

        if (currentFrequencyIndex === frequencyArray.length - 1) {
          clearInterval(id);
          oscillator.stop(this.context.currentTime + 1.5);
        } else {
          currentFrequencyIndex++;
        }
      }, frequencyChangeInterval);
    };

    changeFrequency();
  },
};
