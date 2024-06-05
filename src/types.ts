// Types

export type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R ? (...args: P) => R : never;

export type Point = { readonly x: number, readonly y: number };

export type Shape<Kind extends string = string> = Point & {
  readonly kind: Kind;
  readonly id: string;
};

export type ShapeOperations<S extends Shape = Shape> = {
  readonly render: (shape: S) => void;
  readonly move: (shape: S, dx: number, dy: number) => S;
  readonly scale: (shape: S, factor: number) => S;
};

export type Layer = Shape & {
  readonly shapes: Shape[];
  readonly visible: boolean;
};

export type Drawing = {
  readonly layers: Layer[];
};
