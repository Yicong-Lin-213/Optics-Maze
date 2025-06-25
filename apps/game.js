// --- Configuration and Constants ---
const CANVAS_WIDTH = 800; // The width of the canvas in pixels
const CANVAS_HEIGHT = 600; // The height of the canvas in pixels
const CELL_SIZE = 50; // The size of each cell in pixels

const MIRROR_TYPE = Object.freeze({ /** @type {{[key: string]: number}} */
  REFLECTOR_UNKNOWN: -1,
  REFLECTOR_90: 0,
  REFLECTOR_45: 1,
});

const LIGHT_COLORS = Object.freeze({ /** @type {{[key: string]: number}} */
  RED: 0xFF0000,
  GREEN: 0x00FF00,
  BLUE: 0x0000FF,
  YELLOW: 0xFFFF00,
  PURPLE: 0xFF00FF,
  CYAN: 0x00FFFF,
  WHITE: 0xFFFFFF,
  BLACK: 0x000000,
});

/**
 * Converts a color to a string.
 * 
 * @param {number} color 
 * @returns {string}
 */
function colorString(color) {
  switch (color) {
    case LIGHT_COLORS.WHITE:
      return 'white';
    case LIGHT_COLORS.BLACK:
      return 'black';
    case LIGHT_COLORS.RED:
      return 'red';
    case LIGHT_COLORS.GREEN:
      return 'green';
    case LIGHT_COLORS.BLUE:
      return 'blue';
    case LIGHT_COLORS.YELLOW:
      return 'yellow';
    case LIGHT_COLORS.PURPLE:
      return 'purple';
    case LIGHT_COLORS.CYAN:
      return 'cyan';
    default:
      return 'white';
  }
}

const TARGET_SOURCE = `<svg fill="none" width="256px" height="256px" viewBox="0 0 256 256" id="AllRedFlower" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root {
      --petal-fill-color: grey;
      --center-fill-color: white;
      --stroke-color: #666666;
      --stroke-width: 2px;
    }

    .flower-stroke {
      stroke: var(--stroke-color);
      stroke-width: var(--stroke-width);
    }
  </style>
  <!-- skeleton -->
  <path
    class="flower-stroke" 
    d="M206.354,136.28711
      c-6.01123-3.4707-15.002-6.24023-26.83154-8.28711,11.82959-2.04688,20.82031-4.81641,26.83154-8.28711
      a32.00007,32.00007,0,0,0-32-55.42578
      c-6.01123,3.47021-12.90478,9.87158-20.59179,19.0918
      C157.90332,72.11182,160,62.94141,160,56
      a32,32,0,0,0-64,0
      c0,6.94141,2.09668,16.11182,6.23779,27.37891-7.687-9.21973-14.58056-15.6211-20.59179-19.0918
      a32.00007,32.00007,0,0,0-32,55.42578
      C55.65723,123.18359,64.648,125.95312,76.47754,128
      c-11.82959,2.04688-20.82031,4.81641-26.83154,8.28711
      a32.00007,32.00007,0,0,0,32,55.42578
      c6.01123-3.47021,12.90478-9.87158,20.59179-19.0918
      C98.09668,183.88818,96,193.05859,96,200
      a32,32,0,0,0,64,0
      c0-6.94141-2.09668-16.11182-6.23779-27.37891,7.687,9.21973,14.58056,15.6211,20.59179,19.0918
      a32.00007,32.00007,0,0,0,32-55.42578
      Z"
    fill="lightyellow"/>

  <!-- central part -->
  <path 
    class="flower-stroke" 
    d="M128,152
      a24,24,0,1,1,24-24
      A24.0275,24.0275,0,0,1,128,152
      Z" 
    fill="var(--center-fill-color)"/>

  <!-- petals -->
  <path 
    class="flower-stroke" 
    d="M128,152
      m50.35352-80.78516
      A24.0006,24.0006,0,0,1,202.354,112.78516
      c-7.82568,4.51709-22.59179,7.86132-42.83593,9.72021
      a32.003,32.003,0,0,0-11.00733-19.04394
      C160.24463,86.85352,170.52637,75.73389,178.35352,71.21484
      Z" 
    fill="var(--petal-fill-color)"/>

  <!-- petals -->
  <path 
    class="flower-stroke" 
    d="M128,32
      a24.0275,24.0275,0,0,1,24,24
      c0,9.03516-4.48584,23.49268-12.99561,41.9502
      a32.02233,32.02233,0,0,0-22.00878,0
      C108.48584,79.49268,104,65.03516,104,56
      A24.0275,24.0275,0,0,1,128,32
      Z"
    fill="var(--petal-fill-color)"/>

  <!--petals -->
  <path 
    class="flower-stroke" 
    d="M44.86133,80
      A24.02775,24.02775,0,0,1,77.646,71.21484
      c7.82812,4.51905,18.10937,15.63965,29.84326,32.24659
      a32.003,32.003,0,0,0-11.00733,19.04394
      c-20.24414-1.85889-35.01025-5.20312-42.83545-9.72021
      A24.02833,24.02833,0,0,1,44.86133,80
      Z"
    fill="var(--petal-fill-color)"/>

  <!--petals -->
  <path 
    class="flower-stroke" 
    d="M77.64648,184.78516
      A24.0006,24.0006,0,0,1,53.646,143.21484
      c7.82568-4.51709,22.59179-7.86132,42.83593-9.72021
      a32.003,32.003,0,0,0,11.00733,19.04394
      C95.75537,169.14648,85.47363,180.26611,77.64648,184.78516
      Z"
    fill="var(--petal-fill-color)"/>

  <!--petals -->
  <path 
    class="flower-stroke" 
    d="M128,224
      a24.0275,24.0275,0,0,1-24-24
      c0-9.03516,4.48584-23.49268,12.99561-41.9502
      a32.02233,32.02233,0,0,0,22.00878,0
      C147.51416,176.50732,152,190.96484,152,200
      A24.0275,24.0275,0,0,1,128,224
      Z"
    fill="var(--petal-fill-color)"/>

  <!--petals -->
  <path 
    class="flower-stroke" 
    d="M128,224
      m83.13867-48
      a24.0269,24.0269,0,0,1-32.78467,8.78516
      c-7.82812-4.519-18.10937-15.63965-29.84326-32.24659
      a32.003,32.003,0,0,0,11.00733-19.04394
      c20.24414,1.85889,35.01025,5.20312,42.83545,9.72021
      A24.02833,24.02833,0,0,1,211.13867,176
      Z"
    fill="var(--petal-fill-color)"/>

</svg>`;

// --- Classes ---
class Tile {
    #_rowIndex;
    #_colIndex;
    #_size = {width: 0, height: 0};
    #_origin = {x: 0, y: 0};
    #_center = {x: 0, y: 0};
    #_lineColor = '#aaa';

    constructor(rowIndex, colIndex, size = {width: CELL_SIZE, height: CELL_SIZE}, lineColor='#aaa') {
      this.#_rowIndex = rowIndex;
      this.#_colIndex = colIndex;
      this.#_size.width = size.width;
      this.#_size.height = size.height;
      this.#_origin.x = colIndex * size.width;
      this.#_origin.y = rowIndex * size.height;
      this.#_center.x = this.#_origin.x + this.#_size.width / 2;
      this.#_center.y = this.#_origin.y + this.#_size.height / 2;
      this.#_lineColor = lineColor;
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.rect(this.#_origin.x, this.#_origin.y, this.#_size.width, this.#_size.height);
      ctx.strokeStyle = this.#_lineColor;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    containsPoint(point) {
      return (
        point.x >= this.#_origin.x &&
        point.x <= this.#_origin.x + this.#_size.width &&
        point.y >= this.#_origin.y &&
        point.y <= this.#_origin.y + this.#_size.height
      );
    }

    get rowIndex() {
      return this.#_rowIndex;
    }

    get colIndex() {
      return this.#_colIndex;
    }

    get center() {
      return this.#_center;
    }

    get origin() {
      return this.#_origin;
    }

    getSideCenter(direction = 0) {
      switch (direction) {
        case 0: return {x: this.#_origin.x + this.#_size.width, y: this.#_center.y};
        case 1: return {x: this.#_origin.x + this.#_size.width, y: this.#_origin.y};
        case 2: return {x: this.#_center.x, y: this.#_origin.y};
        case 3: return {x: this.#_origin.x, y: this.#_origin.y};
        case 4: return {x: this.#_origin.x, y: this.#_center.y};
        case 5: return {x: this.#_origin.x, y: this.#_origin.y + this.#_size.height};
        case 6: return {x: this.#_center.x, y: this.#_origin.y + this.#_size.height};
        case 7: return {x: this.#_origin.x + this.#_size.width, y: this.#_origin.y + this.#_size.height};
        default: return {x: 0, y: 0};
      }
    }

    get size() {
      return this.#_size;
    }
}

class Item {
  _description = "";
  _tile = null;
  _rotateAngle = 0;
  _rotateIndex = 0;
  _movable = false;

  constructor(description) {
    this._description = description;
  }

  get description() {
    return this._description;
  }

  set tile(tile) {
    this._tile = tile;
  }

  get tile() {
    return this._tile;
  }

  set movable(movable) {
    this._movable = movable;
  }

  get movable() {
    return this._movable;
  }

  get rotateAngle() {
    return this._rotateAngle;
  }

  resetRotateAngle() {
    this._rotateAngle = 0;
  }

  get rotateIndex() {
    return this._rotateIndex;
  }

  rotate(clockwise = true) {
    this._rotateIndex += (clockwise?1:-1);
    this._rotateIndex %= 8;
    this._rotateAngle = Math.PI / 4 * this._rotateIndex;
    console.log(`rotateAngle: ${this._rotateAngle}, index: ${this._rotateIndex}`);
  }

  draw(ctx) {}
}

class Lighter extends Item {
  _image = null;
  #_color = LIGHT_COLORS.WHITE;

  #_direction = 0; // 0: east, 1: north-east, 2: north, 3: north-west, 4: west, 5: south-west, 6: south, 7: south-east

  constructor(direction = 0, color = LIGHT_COLORS.WHITE) {
    super("A fixed light source that emits a ray of light.");
    this._image = new Image();
    this._image.src = "../images/lighter.svg";
    this.movable = false; // Light source is not movable
    this.#_color = color;
    this.#_direction = direction;
  }

  get color() {
    return this.#_color;
  }

  get direction() {
    return this.#_direction;
  }

  draw(ctx) {
    ctx.drawImage(this._image, this.tile.origin.x, this.tile.origin.y, this.tile.size.width, this.tile.size.height);
  }
}

class Light extends Item {
  #_color = LIGHT_COLORS.WHITE;
  #_points = [];  // {x, y}

  constructor(color = LIGHT_COLORS.WHITE) {
    super("A light source that emits a ray of light.");
    this.#_color = color;
  }

  get color() {
    return this.#_color;
  }

  get points() {
    return this.#_points;
  }

  get lastPoint() {
    return this.#_points[this.#_points.length - 1];
  }

  addPoint(x, y) {
    this.#_points.push({x, y});
  }

  removePoint(x, y) {
    this.#_points = this.#_points.filter(point => point.x !== x || point.y !== y);
  }

  clearPoints() {
    this.#_points = [];
  }

  draw(ctx) {
    if (this.points.length < 2) return;
    ctx.beginPath();
    ctx.strokeStyle = colorString(this.color);
    ctx.lineWidth = 2;
    ctx.moveTo(this.points[0].x, this.points[0].y);
    for (let i = 1; i < this.points.length; i++) {
      ctx.lineTo(this.points[i].x, this.points[i].y);
    }
    ctx.stroke();
  }
}

class Mirror extends Item {
  _image = null;
  _type = MIRROR_TYPE.REFLECTOR_UNKNOWN;
  #_dPosition = {x: 0, y: 0}; // Delta position for dragging

  constructor() {
    super("A mirror that reflects light.");
    this._image = new Image();
    this._image.src = "../images/mirror.svg";
    this.movable = true; // Mirror is movable by default
  }

  draw(ctx) {
    ctx.save();

    ctx.translate(this.tile.origin.x + this.#_dPosition.x + this.tile.size.width / 2, this.tile.origin.y + this.#_dPosition.y + this.tile.size.height / 2);
    ctx.rotate(this.rotateAngle);
    ctx.drawImage(this._image, -this.tile.size.width / 2, -this.tile.size.height / 2, this.tile.size.width, this.tile.size.height);

    ctx.restore();
  }

  setDeltaPosition(dx, dy) {
    this.#_dPosition.x = dx;
    this.#_dPosition.y = dy;
  }

  reflectLight(direction) { return -1;}
}

class MirrorReflector90 extends Mirror {
  constructor() {
    super();
    this._type = MIRROR_TYPE.REFLECTOR_90;
  }

  reflectLight(direction) {
    switch (direction) {
      case 0:
        switch((this.rotateIndex + 8) % 8) {
          case 7: return 6;
          case 0: return 4;
          case 1: return 2;
          default: return -1;
        }
      case 1:
        switch((this.rotateIndex + 8) % 8) {
          case 6: return 7;
          case 7: return 5;
          case 0: return 3;
          default: return -1;
        }
      case 2:
        switch((this.rotateIndex + 8) % 8) {
          case 5: return 0;
          case 6: return 6;
          case 7: return 4;
          default: return -1;
        }
      case 3:
        switch((this.rotateIndex + 8) % 8) {
          case 4: return 1;
          case 5: return 7;
          case 6: return 5;
          default: return -1;
        }
      case 4:
        switch((this.rotateIndex + 8) % 8) {
          case 3: return 2;
          case 4: return 0;
          case 5: return 6;
          default: return -1;
        }
      case 5:
        switch((this.rotateIndex + 8) % 8) {
          case 2: return 3;
          case 3: return 1;
          case 4: return 7;
          default: return -1;
        }
      case 6:
        switch((this.rotateIndex + 8) % 8) {
          case 1: return 4;
          case 2: return 2;
          case 3: return 0;
          default: return -1;
        }
      case 7:
        switch((this.rotateIndex + 8) % 8) {
          case 0: return 5;
          case 1: return 3;
          case 2: return 1;
          default: return -1;
        }
      default:
        return -1;
    }
  }
}

class Target extends Item {
  _image = null;
  #_color = LIGHT_COLORS.WHITE;
  #_active = false;
  #_svgCode = TARGET_SOURCE;
  #_loaded = false;

  constructor(color = LIGHT_COLORS.WHITE) {
    super("A target flower that lights up when hit by the correct lights.");
    this.movable = false;
    this.#_color = color;
    this.#_active = false;
    this._image = new Image();
    this.updateSvgCode();
  }

  get active() {
    return this.#_active;
  }

  set active(value) {
    this.#_active = value;
    this.updateSvgCode();
  }

  hit(color) {
    if (color === this.#_color) {
      this.#_active = true;
      this.updateSvgCode();
    }
  }

  get color() {
    return this.#_color;
  }

  updateSvgCode() {
    this.#_svgCode = TARGET_SOURCE
      .replace('--center-fill-color: white;', `--center-fill-color: ${colorString(this.#_color)};`)
      .replace('--petal-fill-color: grey;', `--petal-fill-color: ${this.#_active?colorString(this.#_color):'grey'};`)
      .replace('--stroke-color: #666666;', `--stroke-color: ${this.#_active?(this.#_color === LIGHT_COLORS.WHITE ? "#cccccc":'#ffffff'):'#cccccc'};`);
    this._image.src = `data:image/svg+xml;base64,${btoa(this.#_svgCode)}`;
    this._image.onload = () => {
      this._image.onload = null; // Remove the onload event to prevent multiple calls
      this._image.onerror = null; // Remove the onerror event to prevent multiple calls
      this.#_loaded = true;
    };
  }

  draw(ctx) {
    if (this.#_loaded) {
      ctx.drawImage(this._image, this.tile.origin.x, this.tile.origin.y, this.tile.size.width, this.tile.size.height);
    } else {
      console.log("Target image not loaded yet.");
    }
  }
}

class Panel {
  #_canvas;
  #_context;
  #_tiles = []; // all tiles
  #_lighters = []; // lighters that emit light
  #_targets = []; // targets that light up when hit by the correct lights
  #_mirrors = []; // mirrors that reflect light
  #_blockers = [];  // blockers that block all items
  #_toolset = []; // pre-placed tools, mainly mirrors
  #_lights = [];  // light paths
  #_playgroundOrigin = {row:0, col:3}; // Origin of the playground
  #_draggedItem = undefined; // Item being dragged
  #_dragOrigin = {x: 0, y: 0}; // Origin of the drag

  constructor(canvasName = "gameCanvas", canvasWidth = CANVAS_WIDTH, canvasHeight = CANVAS_HEIGHT) {
    this.#_canvas = document.getElementById(canvasName);
    this.#_context = this.#_canvas.getContext('2d');
    this.#_canvas.width = canvasWidth;
    this.#_canvas.height = canvasHeight;
    this.initTiles();
    this.#_canvas.addEventListener("dblclick", this.onDoubleClick.bind(this));
    this.#_canvas.addEventListener("mousedown", this.onMouseDown.bind(this));
    this.#_canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
    this.#_canvas.addEventListener("mouseup", this.onMouseUp.bind(this));
    this.#_canvas.addEventListener("mouseout", this.onMouseUp.bind(this));
  }

  initTiles() {
    for (let row = 0; row < this.#_canvas.height / CELL_SIZE; row++) {
      for (let col = 0; col < this.#_canvas.width / CELL_SIZE; col++) {
        this.#_tiles.push(new Tile(row, col, {width:CELL_SIZE, height:CELL_SIZE}, '#aaa'));
      }
    }
  }

  draw() {
    this.#_context.clearRect(0, 0, this.#_canvas.width, this.#_canvas.height);
    this.#_tiles.forEach(tile => tile.draw(this.#_context));
    this.#_lights.forEach(light => light.draw(this.#_context)); // Draw the light paths
    this.#_toolset.forEach(item => item.draw(this.#_context));  // Draw mirrors into toolset area
    this.#_mirrors.forEach(item => item.draw(this.#_context));
    this.#_lighters.forEach(item => item.draw(this.#_context));
    this.#_targets.forEach(item => item.draw(this.#_context));
    this.#_blockers.forEach(item => item.draw(this.#_context));
    this.#drawPlaygroundBorder();
    if (this.#_toolset.length > 0) {
      this.#_context.font = "12px Arial";
      this.#_context.fillText(`${this.#_toolset.length}`, this.#_tiles[0].size.width - 10, this.#_tiles[0].size.height - 5);
    }
  }

  #drawPlaygroundBorder() {
    this.#_context.strokeStyle = '#000';
    this.#_context.lineWidth = 2;
    this.#_context.beginPath();
    this.#_context.moveTo(this.#_playgroundOrigin.col * CELL_SIZE, this.#_playgroundOrigin.row * CELL_SIZE);
    this.#_context.lineTo(this.#_playgroundOrigin.col * CELL_SIZE, this.#_canvas.height);
    this.#_context.lineTo(this.#_canvas.width, this.#_canvas.height);
    this.#_context.lineTo(this.#_canvas.width, this.#_playgroundOrigin.row * CELL_SIZE);
    this.#_context.lineTo(this.#_playgroundOrigin.col * CELL_SIZE, this.#_playgroundOrigin.row * CELL_SIZE);
    this.#_context.stroke();
  }

  /**
   * Move the mirror from the playground to the toolset.
   * 
   * @param {*Mirror} mirror 
   * @returns {boolean} true if the mirror is recycled from the playground, false otherwise
   */
  #recycleMirror(mirror) {
    // according to mirror's type, find the corresponding tool in the toolset
    // if not found, place it in the first unoccupied tile in the preparation area, and then push it to the toolset and remove it from the mirrors array.
    // if found and it doesn't exist in the toolset, place it in the same tile as the found tool (i.e. adding amount), and then push it to the toolset and remove it from the mirrors array.
    // if found but it exists in the toolset, do nothing.
    const found = this.#_toolset.find(tool => tool instanceof Mirror && tool._type === mirror._type && tool === mirror);
    if (!found) { // not found in the toolset
      mirror.tile = this.#_tiles[0];  //TODO: find the first unoccupied tile
      this.#_toolset.push(mirror);
      return true;
    } else {
      // the mirror is already in the toolset, do nothing
      return false;
    }
  }

  /**
   * Place the mirror on the playground.
   * 
   * @param {*Mirror} mirror 
   * @param {*} rowIndex 
   * @param {*} colIndex 
   * @returns {boolean} true if the mirror is placed from the toolset, false otherwise
   */
  layoutMirror(mirror, rowIndex, colIndex){
    const tile = this.#_tiles.find(tile => tile.rowIndex === rowIndex && tile.colIndex === colIndex);
    if (tile) {
      mirror.tile = tile;
    } else {
      mirror.tile = this.#_tiles[0];
    }

    const found = this.#_mirrors.find(tool => tool instanceof Mirror && tool._type === mirror._type && tool === mirror);
    if (!found) { // not found in the mirrors array 
      this.#_mirrors.push(mirror);
      return true;
    } else {
      // the mirror is already in the mirrors array, do nothing
      return false;
    }
  }

  addMirror(item, rowIndex, colIndex) {
    const tile = this.#_tiles.find(tile => tile.rowIndex === rowIndex && tile.colIndex === colIndex);
    if (tile) {
      item.tile = tile;
    } else {
      item.tile = this.#_tiles[0];
    }
    this.#_toolset.push(item);
  }

  layoutSingleTool(item, rowIndex, colIndex) {
    const tile = this.#_tiles.find(tile => tile.rowIndex === rowIndex && tile.colIndex === colIndex);
    if (tile) {
      item.tile = tile;
    } else {
      item.tile = this.#_tiles[0];
    }
    
    if (item instanceof Mirror) {
      this.#_mirrors.push(item);
    } else if (item instanceof Lighter) {
      this.#_lighters.push(item);
    } else if (item instanceof Target) {
      this.#_targets.push(item);
    } else if (item instanceof Blocker) {
      this.#_blockers.push(item);
    }
  }

  #findTile(x, y) {
    return this.#_tiles.find(tile => tile.containsPoint({x, y}));
  }

  #findTileByIndex({row:rowIndex, col:colIndex}) {
    return this.#_tiles.find(tile => tile.rowIndex === rowIndex && tile.colIndex === colIndex);
  }

  #findToolInToolset({row:rowIndex, col:colIndex}) {
    return this.#_toolset.find(tool => tool.tile.rowIndex === rowIndex && tool.tile.colIndex === colIndex);
  }

  #findMirror(x, y) {
    return this.#_mirrors.find(mirror => mirror.tile.containsPoint({x, y}));
  }

  #findToolInPlayground({row:rowIndex, col:colIndex}) {
    return this.#_targets.find(tool => tool.tile.rowIndex === rowIndex && tool.tile.colIndex === colIndex) ||
      this.#_mirrors.find(tool => tool.tile.rowIndex === rowIndex && tool.tile.colIndex === colIndex) ||
      this.#_blockers.find(tool => tool.tile.rowIndex === rowIndex && tool.tile.colIndex === colIndex) ||
      this.#_lighters.find(tool => tool.tile.rowIndex === rowIndex && tool.tile.colIndex === colIndex);
  }

  #getStep(direction) {
    switch (direction) {
      case 0: return {x: 1, y: 0};
      case 1: return {x: 1, y: -1};
      case 2: return {x: 0, y: -1};
      case 3: return {x: -1, y: -1};
      case 4: return {x: -1, y: 0};
      case 5: return {x: -1, y: 1};
      case 6: return {x: 0, y: 1};
      case 7: return {x: 1, y: 1};
      default: return {x: 0, y: 0};
    }
  }

  get lighters() {
    return this.#_lighters;
  }

  #resetTargets() {
    this.#_targets.forEach(tool => tool.active = false);
  }

  #points2Position({x:x, y:y}) {
    return {row: Math.floor(y / CELL_SIZE), col: Math.floor(x / CELL_SIZE)};
  }

  #withinCanvas({row:rowIndex, col:colIndex}) {
    return rowIndex >= 0 && rowIndex < this.#_canvas.height / CELL_SIZE && colIndex >= 0 && colIndex < this.#_canvas.width / CELL_SIZE;
  }

  /**
   * Check if the position is within the playground.
   * 
   * @param {*{row:rowIndex, col:colIndex}} param0 
   * @returns 
   */
  #withinPlayground({row:rowIndex, col:colIndex}) {
    return this.#withinCanvas({row:rowIndex, col:colIndex}) &&
      rowIndex >= this.#_playgroundOrigin.row && colIndex >= this.#_playgroundOrigin.col;
  }

  /**
   * Check if the position is within the toolset area.
   * 
   * @param {*{row:rowIndex, col:colIndex}} param0 
   * @returns 
   */
  #withinToolsetArea({row:rowIndex, col:colIndex}) {
    return this.#withinCanvas({row:rowIndex, col:colIndex}) &&
      (rowIndex < this.#_playgroundOrigin.row || colIndex < this.#_playgroundOrigin.col);
  }

  updateLights() {
    this.#resetTargets();
    this.#_lights = [];
    this.lighters.forEach(lighter => {
      const light = new Light(lighter.color);
      let lightDirection = lighter.direction;
      let lightPosition = {row: lighter.tile.rowIndex, col: lighter.tile.colIndex};
      let step = this.#getStep(lightDirection);
      while (this.#withinPlayground(lightPosition)) {
        const tile = this.#findTileByIndex(lightPosition);
        if (tile) {
          light.addPoint(tile.center.x, tile.center.y); // add current position

          lightPosition.row += step.y;
          lightPosition.col += step.x;

          const nextTool = this.#findToolInPlayground(lightPosition);
          if (nextTool) {
            if (nextTool instanceof Target) {
              if (nextTool.color === lighter.color) {
                nextTool.active = true; // turn on the target and go through it
              }
            } else if (nextTool instanceof Mirror) {
              // reflect the light
              lightDirection = nextTool.reflectLight(lightDirection);
              if (lightDirection === -1) {
                // light is absorbed
                light.addPoint(nextTool.tile.center.x, nextTool.tile.center.y);
                break;
              }
              step = this.#getStep(lightDirection); // update the step
            } else {
              // stop the light
              light.addPoint(nextTool.tile.center.x, nextTool.tile.center.y);
              break;
            }
          } else {
            // do nothing.
          }
        } else {
          console.log("Tile not found. This should not happen.");
          break;
        }
      }

      if (!this.#withinPlayground(lightPosition)) {
        const getLastTile = (position, direction) => {
          switch (direction) {
            case 0: return this.#findTileByIndex({row: lightPosition.row, col: lightPosition.col - 1});
            case 1: return this.#findTileByIndex({row: lightPosition.row + 1, col: lightPosition.col - 1});
            case 2: return this.#findTileByIndex({row: lightPosition.row + 1, col: lightPosition.col});  
            case 3: return this.#findTileByIndex({row: lightPosition.row + 1, col: lightPosition.col + 1});
            case 4: return this.#findTileByIndex({row: lightPosition.row, col: lightPosition.col + 1});
            case 5: return this.#findTileByIndex({row: lightPosition.row - 1, col: lightPosition.col + 1});
            case 6: return this.#findTileByIndex({row: lightPosition.row - 1, col: lightPosition.col});
            case 7: return this.#findTileByIndex({row: lightPosition.row - 1, col: lightPosition.col - 1});
            default: return undefined;
          }
        };
        let lastTile = getLastTile(lightPosition, lightDirection);
        if (lastTile) {
          const lastPoint = lastTile.getSideCenter(lightDirection);
          light.addPoint(lastPoint.x, lastPoint.y);
        }
      }
  
      this.#_lights.push(light);
    });
  }
  
  onDoubleClick(event) {
    const tool = this.#findMirror(event.offsetX, event.offsetY);
    if (tool && tool instanceof Mirror) {
      tool.rotate(event.altKey);
    }
  }

  onMouseDown(event) {
    const tool = this.#withinPlayground(this.#points2Position({x: event.offsetX, y: event.offsetY})) ?
      this.#findMirror(event.offsetX, event.offsetY) :
      this.#findToolInToolset(this.#points2Position({x: event.offsetX, y: event.offsetY}));
    if (tool && tool.movable) {
      this.#_draggedItem = tool;
      this.#_dragOrigin.x = event.offsetX;
      this.#_dragOrigin.y = event.offsetY;
    }
  }

  onMouseMove(event) {
    if (this.#_draggedItem && this.#_draggedItem.movable) {
      const dx = event.offsetX - this.#_dragOrigin.x;
      const dy = event.offsetY - this.#_dragOrigin.y;
      this.#_draggedItem.setDeltaPosition(dx, dy);
    }
  }

  onMouseUp(event) {
    const tile = this.#findTile(event.offsetX, event.offsetY);

    if (this.#_draggedItem) { // Only proceed if there's an item being dragged
        if (tile) {
          if (this.#withinPlayground({row: tile.rowIndex, col: tile.colIndex})) {
            const existingToolOnTile = this.#findToolInPlayground({row: tile.rowIndex, col: tile.colIndex});
            if (existingToolOnTile && existingToolOnTile !== this.#_draggedItem) {
                // A different tool already occupies this tile
                console.log(`Another tool already exists in the tile.`);
            } else {
                // No other tool on this tile, or it's the same tool being dragged
                // this.#_draggedItem.tile = tile; // Assign the tile to the dragged item
                if (this.layoutMirror(this.#_draggedItem, tile.rowIndex, tile.colIndex)) {
                  this.#_toolset.splice(this.#_toolset.indexOf(this.#_draggedItem), 1); // Remove the item from the toolset if it's already in the playground
                }
            }
          } else if (this.#withinToolsetArea({row: tile.rowIndex, col: tile.colIndex})) {
            this.#_draggedItem.tile = this.#_tiles[0];
            this.#_draggedItem.resetRotateAngle();
            if (this.#recycleMirror(this.#_draggedItem)) {
              this.#_mirrors.splice(this.#_mirrors.indexOf(this.#_draggedItem), 1); // Remove the item from the tools if it's already in the toolset
            }
          }
        }
        this.#_draggedItem.setDeltaPosition(0, 0);
    }

    // Reset dragged item state after handling drop
    this.#_draggedItem = undefined;
  }
} 

// --- Game State ---
let panel;

// --- Initialization ---
function init() {
    panel = new Panel();
    panel.layoutSingleTool(new Lighter(), 0, 3);
    panel.layoutSingleTool(new Target(LIGHT_COLORS.WHITE), 5, 5);
    panel.layoutSingleTool(new Target(LIGHT_COLORS.WHITE), 8, 7);
    panel.layoutSingleTool(new Target(LIGHT_COLORS.WHITE), 2, 6);
    panel.layoutSingleTool(new Target(LIGHT_COLORS.WHITE), 7, 9);
    for (let i = 0; i < 4; i++) {
      panel.addMirror(new MirrorReflector90(), 0, 0);
    }

    gameLoop(); // Start the game loop
}

// --- Game Loop ---
function gameLoop() {
    panel.updateLights();
    panel.draw();
    requestAnimationFrame(gameLoop);
}

// Initialize the game when the window loads
window.onload = init;