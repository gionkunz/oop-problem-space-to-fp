import { createShape, genericMoveShape as move } from '../core';
import { Shape, ShapeOperations } from '../types';

export type Rectangle = Shape<'rectangle'> & {
  readonly width: number;
  readonly height: number;
};

export const rectangleOperations: ShapeOperations<Rectangle> = {
  render: (shape) => console.log(`Rendering rectangle with topLeft point (${shape.x}, ${shape.y}), width ${shape.width} and height ${shape.height}`),
  move,
  scale: (shape, factor) => createShape('rectangle', { 
    ...shape,
    width: shape.width * factor,
    height: shape.height * factor
  })
};