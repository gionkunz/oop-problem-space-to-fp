import { performOperation } from '../core';
import { Shape, ShapeOperations } from '../types';

export type Group = Shape<'group'> & {
  readonly children: Shape[];
};

export const groupOperations: ShapeOperations<Group> = {
  render: (shape) => shape.children.forEach(child => performOperation(child, 'render')),
  move: (shape, dx, dy) => ({
    ...shape,
    children: shape.children.map(child => performOperation(child, 'move', dx, dy))
  }),
  scale: (shape, factor) => ({
    ...shape,
    children: shape.children.map(child => performOperation(child, 'scale', factor))
  })
};