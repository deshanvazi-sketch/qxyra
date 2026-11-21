import * as THREE from 'three';

export interface PhoneColorConfig {
  name: string;
  bodyColor: string;
  frameColor: string;
  accentColor?: string;
  roughness?: number;
  metalness?: number;
}

// Color palette mapping for Sri Lanka smartphones
export const PHONE_COLORS: Record<string, PhoneColorConfig> = {
  // Vivo Colors
  'Voyage Black': { name: 'Voyage Black', bodyColor: '#14161B', frameColor: '#282C35', roughness: 0.25, metalness: 0.35 },
  'Haze Blue': { name: 'Haze Blue', bodyColor: '#8EADC7', frameColor: '#B0C8DD', roughness: 0.18, metalness: 0.4 },
  'Summit Platinum': { name: 'Summit Platinum', bodyColor: '#E4EAF2', frameColor: '#FFFFFF', roughness: 0.12, metalness: 0.6 },
  'Sunrise Gold': { name: 'Sunrise Gold', bodyColor: '#F2D59D', frameColor: '#FDE4B4', roughness: 0.15, metalness: 0.55 },
  'Feather Gold': { name: 'Feather Gold', bodyColor: '#ECD6AF', frameColor: '#FBE8C8', roughness: 0.2, metalness: 0.45 },
  'Starlight Grey': { name: 'Starlight Grey', bodyColor: '#434852', frameColor: '#636A78', roughness: 0.3, metalness: 0.4 },

  // Infinix Colors
  'Silver Dancer': { name: 'Silver Dancer', bodyColor: '#CDD0D8', frameColor: '#ECEFF6', roughness: 0.15, metalness: 0.6 },
  'Thermo Orange': { name: 'Thermo Orange', bodyColor: '#E85D04', frameColor: '#FF8833', roughness: 0.2, metalness: 0.35 },
  'Quiet Violet': { name: 'Quiet Violet', bodyColor: '#584C6E', frameColor: '#75678F', roughness: 0.25, metalness: 0.35 },
  'Green Texture': { name: 'Green Texture', bodyColor: '#2B4E30', frameColor: '#3F6E45', roughness: 0.35, metalness: 0.25 },
  'Dive Blue': { name: 'Dive Blue', bodyColor: '#1052B3', frameColor: '#2A6FD6', roughness: 0.18, metalness: 0.45 },
  'Polaris Titanium': { name: 'Polaris Titanium', bodyColor: '#888B94', frameColor: '#ACAFB8', roughness: 0.2, metalness: 0.55 },
  'Shadow Black': { name: 'Shadow Black', bodyColor: '#111215', frameColor: '#25272E', roughness: 0.3, metalness: 0.3 },
  'Cloudline Blue': { name: 'Cloudline Blue', bodyColor: '#749DC9', frameColor: '#96BAE0', roughness: 0.2, metalness: 0.4 },
  'Sunlike Orange': { name: 'Sunlike Orange', bodyColor: '#EE791E', frameColor: '#FFA14A', roughness: 0.2, metalness: 0.35 },
  'Solar Orange': { name: 'Solar Orange', bodyColor: '#E65100', frameColor: '#FF7D30', roughness: 0.18, metalness: 0.45 },
  'Deep Ocean Blue': { name: 'Deep Ocean Blue', bodyColor: '#0A253D', frameColor: '#173D62', roughness: 0.2, metalness: 0.4 },
  'Mocha Brown': { name: 'Mocha Brown', bodyColor: '#473225', frameColor: '#634938', roughness: 0.3, metalness: 0.3 },
  'Mist Titanium': { name: 'Mist Titanium', bodyColor: '#8E9096', frameColor: '#B6B8BF', roughness: 0.2, metalness: 0.55 },
  'Frost Silver': { name: 'Frost Silver', bodyColor: '#D8DCE3', frameColor: '#F5F7FA', roughness: 0.15, metalness: 0.6 },
  'Torino Black': { name: 'Torino Black', bodyColor: '#0A0B0E', frameColor: '#1C1D23', roughness: 0.25, metalness: 0.4 },

  // Tecno Colors
  'Malachite Green': { name: 'Malachite Green', bodyColor: '#0E6649', frameColor: '#198762', roughness: 0.15, metalness: 0.5 },
  'Nebula Titanium': { name: 'Nebula Titanium', bodyColor: '#9FA1A6', frameColor: '#C8CAD0', roughness: 0.18, metalness: 0.6 },
  'Moonshadow Black': { name: 'Moonshadow Black', bodyColor: '#121316', frameColor: '#24252B', roughness: 0.25, metalness: 0.35 },
  'Fir Green': { name: 'Fir Green', bodyColor: '#1C3F27', frameColor: '#2B5E3A', roughness: 0.3, metalness: 0.3 },
  'Lavender Mist': { name: 'Lavender Mist', bodyColor: '#A897BC', frameColor: '#CBBDE0', roughness: 0.2, metalness: 0.4 },
  'Ethereal Blue': { name: 'Ethereal Blue', bodyColor: '#448AA9', frameColor: '#65ADC9', roughness: 0.18, metalness: 0.45 },
};

function createRoundedRectShape(width: number, height: number, radius: number): THREE.Shape {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  return shape;
}

// Generate realistic AMOLED smartphone screen texture
function createScreenTexture(phoneName: string, themeColor: string): THREE.CanvasTexture {
  if (typeof document === 'undefined') return new THREE.CanvasTexture(null as unknown as HTMLCanvasElement);

  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 2340;
  const ctx = canvas.getContext('2d')!;

  // 1. Wallpaper background: Deep luxury gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 1080, 2340);
  bgGrad.addColorStop(0, '#030508');
  bgGrad.addColorStop(0.35, '#0B132B');
  bgGrad.addColorStop(0.65, themeColor || '#C9A84C');
  bgGrad.addColorStop(1, '#020305');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1080, 2340);

  // 2. Artistic flowing curves / glow waves
  ctx.save();
  ctx.globalAlpha = 0.35;
  ctx.beginPath();
  ctx.arc(540, 1400, 600, 0, Math.PI * 2);
  const glowGrad = ctx.createRadialGradient(540, 1400, 50, 540, 1400, 600);
  glowGrad.addColorStop(0, '#FFFFFF');
  glowGrad.addColorStop(0.4, themeColor || '#C9A84C');
  glowGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = glowGrad;
  ctx.fill();
  ctx.restore();

  // Subtle dark overlay for readability
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.fillRect(0, 0, 1080, 2340);

  // 3. Status Bar
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '600 38px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('09:41', 70, 95);

  // Status Icons (Right side)
  ctx.textAlign = 'right';
  ctx.font = '500 32px sans-serif';
  ctx.fillText('5G  📶  🔋 98%', 1010, 95);

  // 4. Punch Hole Camera
  ctx.beginPath();
  ctx.arc(540, 95, 24, 0, Math.PI * 2);
  ctx.fillStyle = '#000000';
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(255,255,255,0.2)';
  ctx.stroke();

  // Camera lens reflection
  ctx.beginPath();
  ctx.arc(536, 90, 6, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.fill();

  // 5. Clock Widget
  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '200 160px sans-serif';
  ctx.fillText('09:41', 540, 480);

  ctx.font = '400 42px sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.fillText('Friday, November 21', 540, 560);

  ctx.font = '500 32px sans-serif';
  ctx.fillStyle = '#C9A84C';
  ctx.fillText('☀️ 29°C Colombo • TRCSL 5G', 540, 620);

  // 6. Brand watermark in center-bottom
  ctx.font = '600 34px sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.fillText(phoneName.toUpperCase(), 540, 1850);

  ctx.font = '400 24px sans-serif';
  ctx.fillStyle = 'rgba(201, 168, 76, 0.85)';
  ctx.fillText('METHMI MOBILE • OFFICIAL 1-YEAR WARRANTY', 540, 1900);

  // 7. Lockscreen Bottom Navigation Bar
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.roundRect(400, 2280, 280, 10, 5);
  ctx.fill();

  // Flashlight & Camera shortcut circles
  ctx.beginPath();
  ctx.arc(120, 2180, 50, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '36px sans-serif';
  ctx.fillText('🔦', 120, 2192);

  ctx.beginPath();
  ctx.arc(960, 2180, 50, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('📷', 960, 2192);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export class Smartphone3D {
  public group: THREE.Group;
  private backMaterial: THREE.MeshStandardMaterial;
  private frameMaterial: THREE.MeshStandardMaterial;
  private screenMaterial: THREE.MeshStandardMaterial;
  private phoneName: string;
  private brand: string;

  constructor(phoneName: string, initialColor: string = 'Voyage Black') {
    this.phoneName = phoneName;
    this.group = new THREE.Group();

    // Identify brand
    const lower = phoneName.toLowerCase();
    if (lower.includes('vivo')) this.brand = 'vivo';
    else if (lower.includes('infinix')) this.brand = 'infinix';
    else if (lower.includes('tecno') || lower.includes('camon')) this.brand = 'tecno';
    else this.brand = 'smartphone';

    const colorConfig = PHONE_COLORS[initialColor] || PHONE_COLORS['Voyage Black'];

    // 1. Materials
    this.frameMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(colorConfig.frameColor),
      metalness: 0.85,
      roughness: 0.22,
    });

    this.backMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(colorConfig.bodyColor),
      metalness: colorConfig.metalness ?? 0.35,
      roughness: colorConfig.roughness ?? 0.22,
    });

    const screenTexture = createScreenTexture(phoneName, colorConfig.bodyColor);
    this.screenMaterial = new THREE.MeshStandardMaterial({
      map: screenTexture,
      roughness: 0.08,
      metalness: 0.05,
    });

    this.buildChassis();
    this.buildScreen();
    this.buildCameraModule();
    this.buildSideButtonsAndPorts();
  }

  private buildChassis() {
    const width = 3.0;
    const height = 6.4;
    const depth = 0.26;
    const radius = 0.38;

    // Outer Chassis Frame
    const shape = createRoundedRectShape(width, height, radius);
    const extrudeSettings = {
      depth: depth,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 1,
      bevelSize: 0.035,
      bevelThickness: 0.035,
    };
    const chassisGeom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    chassisGeom.center();
    const chassis = new THREE.Mesh(chassisGeom, this.frameMaterial);
    chassis.castShadow = true;
    chassis.receiveShadow = true;
    this.group.add(chassis);

    // Back Panel Glass Cover
    const backShape = createRoundedRectShape(width - 0.04, height - 0.04, radius - 0.02);
    const backGeom = new THREE.ShapeGeometry(backShape);
    const backMesh = new THREE.Mesh(backGeom, this.backMaterial);
    backMesh.position.z = -depth / 2 - 0.037;
    backMesh.rotation.y = Math.PI; // Face outwards to the back
    this.group.add(backMesh);
  }

  private buildScreen() {
    const width = 2.92;
    const height = 6.32;
    const radius = 0.35;
    const depth = 0.26;

    // Black Display Border / Bezel
    const bezelShape = createRoundedRectShape(width, height, radius);
    const bezelGeom = new THREE.ShapeGeometry(bezelShape);
    const bezelMat = new THREE.MeshBasicMaterial({ color: 0x050505 });
    const bezelMesh = new THREE.Mesh(bezelGeom, bezelMat);
    bezelMesh.position.z = depth / 2 + 0.036;
    this.group.add(bezelMesh);

    // Active AMOLED Display
    const screenShape = createRoundedRectShape(width - 0.1, height - 0.12, radius - 0.05);
    const screenGeom = new THREE.ShapeGeometry(screenShape);
    const screenMesh = new THREE.Mesh(screenGeom, this.screenMaterial);
    screenMesh.position.z = depth / 2 + 0.038;
    this.group.add(screenMesh);

    // Earpiece Speaker Slit
    const speakerGeom = new THREE.BoxGeometry(0.5, 0.02, 0.02);
    const speakerMat = new THREE.MeshBasicMaterial({ color: 0x222222 });
    const speaker = new THREE.Mesh(speakerGeom, speakerMat);
    speaker.position.set(0, 3.05, depth / 2 + 0.04);
    this.group.add(speaker);
  }

  private buildCameraModule() {
    const depth = 0.26;
    const backZ = -depth / 2 - 0.037;

    const cameraGroup = new THREE.Group();

    if (this.brand === 'vivo') {
      // Vivo Style: Vertical pill island with large lens rings & Aura Light Ring
      const islandShape = createRoundedRectShape(0.95, 2.1, 0.42);
      const islandGeom = new THREE.ExtrudeGeometry(islandShape, {
        depth: 0.065,
        bevelEnabled: true,
        bevelSegments: 3,
        bevelSize: 0.015,
        bevelThickness: 0.015,
      });
      islandGeom.center();
      const islandMat = new THREE.MeshStandardMaterial({
        color: 0x111317,
        metalness: 0.8,
        roughness: 0.2,
      });
      const island = new THREE.Mesh(islandGeom, islandMat);
      island.position.set(-0.78, 1.85, backZ - 0.04);
      island.rotation.y = Math.PI;
      cameraGroup.add(island);

      // Top Lens & Bottom Lens
      [-0.48, 0.48].forEach((offsetY) => {
        // Metallic Rim
        const rimGeom = new THREE.CylinderGeometry(0.32, 0.32, 0.04, 32);
        rimGeom.rotateX(Math.PI / 2);
        const rimMat = new THREE.MeshStandardMaterial({ color: 0xCCCCCC, metalness: 0.9, roughness: 0.15 });
        const rim = new THREE.Mesh(rimGeom, rimMat);
        rim.position.set(-0.78, 1.85 + offsetY, backZ - 0.08);
        cameraGroup.add(rim);

        // Glass Lens
        const lensGeom = new THREE.CylinderGeometry(0.24, 0.24, 0.045, 32);
        lensGeom.rotateX(Math.PI / 2);
        const lensMat = new THREE.MeshPhysicalMaterial({ color: 0x050510, roughness: 0.05, metalness: 0.1 });
        const lens = new THREE.Mesh(lensGeom, lensMat);
        lens.position.set(-0.78, 1.85 + offsetY, backZ - 0.082);
        cameraGroup.add(lens);
      });

      // Aura Light Glowing Ring
      const auraGeom = new THREE.RingGeometry(0.12, 0.18, 32);
      const auraMat = new THREE.MeshBasicMaterial({ color: 0xFFF3D1, side: THREE.DoubleSide });
      const aura = new THREE.Mesh(auraGeom, auraMat);
      aura.position.set(-0.78, 1.85, backZ - 0.075);
      cameraGroup.add(aura);

    } else if (this.brand === 'infinix') {
      // Infinix Note / Hot Series: Bold rectangular matrix camera module
      const islandShape = createRoundedRectShape(1.15, 2.3, 0.28);
      const islandGeom = new THREE.ExtrudeGeometry(islandShape, {
        depth: 0.07,
        bevelEnabled: true,
        bevelSegments: 3,
        bevelSize: 0.02,
        bevelThickness: 0.02,
      });
      islandGeom.center();
      const islandMat = new THREE.MeshStandardMaterial({
        color: 0x1A1B20,
        metalness: 0.85,
        roughness: 0.25,
      });
      const island = new THREE.Mesh(islandGeom, islandMat);
      island.position.set(-0.72, 1.75, backZ - 0.045);
      island.rotation.y = Math.PI;
      cameraGroup.add(island);

      // 3 Camera Lenses
      [-0.6, 0.0, 0.6].forEach((offsetY) => {
        const rimGeom = new THREE.CylinderGeometry(0.26, 0.26, 0.04, 32);
        rimGeom.rotateX(Math.PI / 2);
        const rimMat = new THREE.MeshStandardMaterial({ color: 0xE8A03E, metalness: 0.8, roughness: 0.2 });
        const rim = new THREE.Mesh(rimGeom, rimMat);
        rim.position.set(-0.72, 1.75 + offsetY, backZ - 0.085);
        cameraGroup.add(rim);

        const lensGeom = new THREE.CylinderGeometry(0.2, 0.2, 0.045, 32);
        lensGeom.rotateX(Math.PI / 2);
        const lensMat = new THREE.MeshPhysicalMaterial({ color: 0x020408, roughness: 0.05, metalness: 0.1 });
        const lens = new THREE.Mesh(lensGeom, lensMat);
        lens.position.set(-0.72, 1.75 + offsetY, backZ - 0.088);
        cameraGroup.add(lens);
      });

    } else {
      // Tecno Camon 50 Pro Style: Triple Lens with Red Accent Dot & Quad Flash
      const islandShape = createRoundedRectShape(0.9, 2.4, 0.4);
      const islandGeom = new THREE.ExtrudeGeometry(islandShape, {
        depth: 0.065,
        bevelEnabled: true,
        bevelSegments: 3,
        bevelSize: 0.015,
        bevelThickness: 0.015,
      });
      islandGeom.center();
      const islandMat = new THREE.MeshStandardMaterial({
        color: 0x0D0F14,
        metalness: 0.9,
        roughness: 0.18,
      });
      const island = new THREE.Mesh(islandGeom, islandMat);
      island.position.set(-0.8, 1.7, backZ - 0.04);
      island.rotation.y = Math.PI;
      cameraGroup.add(island);

      // 3 Vertical Lenses
      [-0.68, 0.0, 0.68].forEach((offsetY, i) => {
        const rimGeom = new THREE.CylinderGeometry(0.28, 0.28, 0.04, 32);
        rimGeom.rotateX(Math.PI / 2);
        const rimColor = i === 1 ? 0xDD2222 : 0xAAAAAA; // Red accent on center lens
        const rimMat = new THREE.MeshStandardMaterial({ color: rimColor, metalness: 0.85, roughness: 0.2 });
        const rim = new THREE.Mesh(rimGeom, rimMat);
        rim.position.set(-0.8, 1.7 + offsetY, backZ - 0.08);
        cameraGroup.add(rim);

        const lensGeom = new THREE.CylinderGeometry(0.22, 0.22, 0.045, 32);
        lensGeom.rotateX(Math.PI / 2);
        const lensMat = new THREE.MeshPhysicalMaterial({ color: 0x010205, roughness: 0.05, metalness: 0.1 });
        const lens = new THREE.Mesh(lensGeom, lensMat);
        lens.position.set(-0.8, 1.7 + offsetY, backZ - 0.083);
        cameraGroup.add(lens);
      });
    }

    this.group.add(cameraGroup);
  }

  private buildSideButtonsAndPorts() {
    // Power Button on Right side
    const pBtnGeom = new THREE.BoxGeometry(0.04, 0.65, 0.08);
    const btnMat = new THREE.MeshStandardMaterial({ color: 0x222226, metalness: 0.8, roughness: 0.3 });
    const pBtn = new THREE.Mesh(pBtnGeom, btnMat);
    pBtn.position.set(1.52, 0.4, 0);
    this.group.add(pBtn);

    // Volume Rocker on Right side
    const vBtnGeom = new THREE.BoxGeometry(0.04, 1.1, 0.08);
    const vBtn = new THREE.Mesh(vBtnGeom, btnMat);
    vBtn.position.set(1.52, 1.5, 0);
    this.group.add(vBtn);

    // USB Type-C Port on Bottom
    const usbGeom = new THREE.BoxGeometry(0.35, 0.04, 0.1);
    const usbMat = new THREE.MeshBasicMaterial({ color: 0x050505 });
    const usb = new THREE.Mesh(usbGeom, usbMat);
    usb.position.set(0, -3.22, 0);
    this.group.add(usb);

    // Speaker Grille Dots
    for (let i = 0; i < 4; i++) {
      const dotGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.04, 12);
      dotGeom.rotateZ(Math.PI / 2);
      const dot = new THREE.Mesh(dotGeom, usbMat);
      dot.position.set(0.45 + i * 0.1, -3.22, 0);
      this.group.add(dot);
    }
  }

  public setColor(colorName: string) {
    const config = PHONE_COLORS[colorName] || {
      name: colorName,
      bodyColor: '#181A20',
      frameColor: '#282C35',
      roughness: 0.25,
      metalness: 0.35,
    };

    this.backMaterial.color.set(config.bodyColor);
    this.backMaterial.roughness = config.roughness ?? 0.22;
    this.backMaterial.metalness = config.metalness ?? 0.35;
    this.frameMaterial.color.set(config.frameColor);

    // Re-generate wallpaper with matching color
    const newTexture = createScreenTexture(this.phoneName, config.bodyColor);
    this.screenMaterial.map = newTexture;
    this.screenMaterial.needsUpdate = true;
  }
}
