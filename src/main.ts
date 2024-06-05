import { createShape, performOperation, registerShape } from './core';
import { Circle, circleOperations } from './shapes/circle';
import { Group, groupOperations } from './shapes/group';
import { Rectangle, rectangleOperations } from './shapes/recangle';

// Shape Registration
registerShape('circle', circleOperations);
registerShape('rectangle', rectangleOperations);
registerShape('group', groupOperations);

// Usage
const circle = createShape<Circle>('circle', {
  id: 'circle1',
  x: 20,
  y: 20,
  radius: 10
});

const rect = createShape<Rectangle>('rectangle', {
  id: 'rect1',
  x: 50,
  y: 50,
  width: 100,
  height: 100
});

const group = createShape<Group>('group', {
  id: 'group1',
  x: 0,
  y: 0,
  children: [
    circle,
    rect
  ]
});

const updatedGroup = performOperation(performOperation(group, 'move', 50, 50), 'scale', 2);
performOperation(updatedGroup, 'render');
