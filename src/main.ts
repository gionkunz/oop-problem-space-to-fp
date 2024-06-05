// Types

type Point = { x: number, y: number };

type Shape =
  | { type: 'circle', center: Point, radius: number }
  | { type: 'rectangle', topLeft: Point, width: number, height: number }
  | { type: 'group', shapes: Shape[] };

type Layer = {
  id: string;
  shapes: Shape[];
  visible: boolean;
};

type Drawing = {
  layers: Layer[];
};

// Operations

const createCircle = (center: Point, radius: number): Shape => ({
  type: 'circle',
  center,
  radius
});

const createRectangle = (topLeft: Point, width: number, height: number): Shape => ({
  type: 'rectangle',
  topLeft,
  width,
  height
});

const createGroup = (shapes: Shape[]): Shape => ({
  type: 'group',
  shapes
});

const renderShape = (shape: Shape): void => {
  switch (shape.type) {
    case 'circle':
      console.log(`Rendering circle at (${shape.center.x}, ${shape.center.y}) with radius ${shape.radius}`);
      break;
    case 'rectangle':
      console.log(`Rendering rectangle at (${shape.topLeft.x}, ${shape.topLeft.y}) with width ${shape.width} and height ${shape.height}`);
      break;
    case 'group':
      shape.shapes.forEach(renderShape);
      break;
  }
};

const renderLayer = (layer: Layer): void => {
  if (layer.visible) {
    layer.shapes.forEach(renderShape);
  }
};

const renderDrawing = (drawing: Drawing): void => {
  drawing.layers.forEach(renderLayer);
};

const moveShape = (shape: Shape, dx: number, dy: number): Shape => {
  switch (shape.type) {
    case 'circle':
      return { ...shape, center: { x: shape.center.x + dx, y: shape.center.y + dy } };
    case 'rectangle':
      return { ...shape, topLeft: { x: shape.topLeft.x + dx, y: shape.topLeft.y + dy } };
    case 'group':
      return { ...shape, shapes: shape.shapes.map(s => moveShape(s, dx, dy)) };
  }
};

const scaleShape = (shape: Shape, factor: number): Shape => {
  switch (shape.type) {
    case 'circle':
      return { ...shape, radius: shape.radius * factor };
    case 'rectangle':
      return { ...shape, width: shape.width * factor, height: shape.height * factor };
    case 'group':
      return { ...shape, shapes: shape.shapes.map(s => scaleShape(s, factor)) };
  }
};



// Usage

// Create a drawing with layers and shapes
const layer1: Layer = {
  id: 'layer1',
  shapes: [
    createCircle({ x: 50, y: 50 }, 20),
    createRectangle({ x: 10, y: 10 }, 30, 40)
  ],
  visible: true
};

const layer2: Layer = {
  id: 'layer2',
  shapes: [
    createGroup([
      createCircle({ x: 100, y: 100 }, 10),
      createRectangle({ x: 120, y: 120 }, 20, 30)
    ])
  ],
  visible: true
};

const drawing: Drawing = {
  layers: [layer1, layer2]
};

// Render the drawing
renderDrawing(drawing);

// Apply transformations
const movedDrawing: Drawing = {
  layers: drawing.layers.map(layer => ({
    ...layer,
    shapes: layer.shapes.map(shape => moveShape(shape, 10, 10))
  }))
};

const scaledDrawing: Drawing = {
  layers: movedDrawing.layers.map(layer => ({
    ...layer,
    shapes: layer.shapes.map(shape => scaleShape(shape, 2))
  }))
};

// Render the transformed drawing
renderDrawing(scaledDrawing);