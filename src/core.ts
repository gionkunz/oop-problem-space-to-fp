import {OmitFirstArg, Shape, ShapeOperations} from './types';

export const shapeRegistry: Record<string, ShapeOperations> = {};
export const createShape = <S extends Shape = Shape>(kind: S['kind'], data: Omit<S, 'kind'>): S => ({ kind, ...data } as S);
export const registerShape = <S extends Shape = Shape>(kind: S['kind'], operations: ShapeOperations<S>) => {
  shapeRegistry[kind] = operations as unknown as ShapeOperations;
};
export const performOperation = <
  OperationKey extends keyof ShapeOperations,
  OperationParams extends Parameters<OmitFirstArg<ShapeOperations[OperationKey]>>,
  Return extends ReturnType<ShapeOperations[OperationKey]>
>(
  shape: Shape,
  operation: OperationKey,
  ...params: OperationParams) => (shapeRegistry[shape.kind][operation] as Function)(shape, ...params) as Return;

// Common operations
export const genericMoveShape = <S extends Shape = Shape>(shape: S, dx: number, dy: number) => ({
  ...shape,
  x: shape.x + dx,
  y: shape.y + dy
}) as S;
