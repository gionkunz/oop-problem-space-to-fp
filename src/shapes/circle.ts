import { createShape, genericMoveShape as move } from '../core';
import { Shape, ShapeOperations } from '../types';

export type Circle = Shape<'circle'> & {
  readonly radius: number;
};

export const circleOperations: ShapeOperations<Circle> = {
  render: (shape) => console.log(`Rendering circle at center point (${shape.x}, ${shape.y}) with radius ${shape.radius}`),
  move,
  scale: (shape, factor) => createShape('circle', { 
    ...shape,
    radius: shape.radius * factor
  })
};