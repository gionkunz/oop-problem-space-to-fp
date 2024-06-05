abstract class Shape {
  abstract render(): void;
  abstract move(dx: number, dy: number): void;
  abstract scale(factor: number): void;
}

class Point {
  constructor(public x: number, public y: number) {}
}

class Circle extends Shape {
  constructor(private center: Point, private radius: number) {
    super();
  }

  render(): void {
    console.log(`Rendering circle at (${this.center.x}, ${this.center.y}) with radius ${this.radius}`);
  }

  move(dx: number, dy: number): void {
    this.center = { x: this.center.x + dx, y: this.center.y + dy };
  }

  scale(factor: number): void {
    this.radius *= factor;
  }
}

class Rectangle extends Shape {
  constructor(private topLeft: Point, private width: number, private height: number) {
    super();
  }

  render(): void {
    console.log(`Rendering rectangle at (${this.topLeft.x}, ${this.topLeft.y}) with width ${this.width} and height ${this.height}`);
  }

  move(dx: number, dy: number): void {
    this.topLeft = { x: this.topLeft.x + dx, y: this.topLeft.y + dy };
  }

  scale(factor: number): void {
    this.width *= factor;
    this.height *= factor;
  }
}

class Group extends Shape {
  private shapes: Shape[] = [];

  addShape(shape: Shape): void {
    this.shapes.push(shape);
  }

  render(): void {
    this.shapes.forEach(shape => shape.render());
  }

  move(dx: number, dy: number): void {
    this.shapes.forEach(shape => shape.move(dx, dy));
  }

  scale(factor: number): void {
    this.shapes.forEach(shape => shape.scale(factor));
  }
}

class Layer {
  private shapes: Shape[] = [];
  public visible: boolean = true;

  addShape(shape: Shape): void {
    this.shapes.push(shape);
  }

  render(): void {
    if (this.visible) {
      this.shapes.forEach(shape => shape.render());
    }
  }

  move(dx: number, dy: number): void {
    this.shapes.forEach(shape => shape.move(dx, dy));
  }

  scale(factor: number): void {
    this.shapes.forEach(shape => shape.scale(factor));
  }
}

class Drawing {
  private layers: Layer[] = [];

  addLayer(layer: Layer): void {
    this.layers.push(layer);
  }

  render(): void {
    this.layers.forEach(layer => layer.render());
  }

  moveLayer(layerIndex: number, dx: number, dy: number): void {
    const layer = this.layers[layerIndex];
    if (layer) {
      layer.move(dx, dy);
    }
  }

  scaleLayer(layerIndex: number, factor: number): void {
    const layer = this.layers[layerIndex];
    if (layer) {
      layer.scale(factor);
    }
  }
}

// Using the Graphics Classes

const drawing = new Drawing();

const layer1 = new Layer();
const circle = new Circle({ x: 50, y: 50 }, 20);
const rectangle = new Rectangle({ x: 10, y: 10 }, 30, 40);

layer1.addShape(circle);
layer1.addShape(rectangle);

const layer2 = new Layer();
const group = new Group();
group.addShape(new Circle({ x: 100, y: 100 }, 10));
group.addShape(new Rectangle({ x: 120, y: 120 }, 20, 30));

layer2.addShape(group);

drawing.addLayer(layer1);
drawing.addLayer(layer2);

drawing.render();

drawing.moveLayer(0, 10, 10);
drawing.scaleLayer(1, 2);

drawing.render();