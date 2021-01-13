export type RouteConfig = { [path in string | number]: RouteConfig };

type Builder = { _build: () => string };

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

type _RouteBuilder<
  T extends RouteConfig,
  K extends keyof T = keyof T
> = K extends `:${infer N}`
  ? {
      readonly [M in N]: (
        parameter: string,
      ) => {
        [Key in keyof (Builder & UnionToIntersection<_RouteBuilder<T[K]>>)]: (Builder &
          UnionToIntersection<_RouteBuilder<T[K]>>)[Key];
      };
    }
  : {
      readonly [M in K]: {
        [Key in keyof (Builder & UnionToIntersection<_RouteBuilder<T[K]>>)]: (Builder &
          UnionToIntersection<_RouteBuilder<T[K]>>)[Key];
      };
    };

export type RouteBuilder<T extends RouteConfig> = Builder &
  UnionToIntersection<_RouteBuilder<T>>;

type _PathBuilder<
  T extends RouteConfig,
  K extends keyof T = keyof T
> = K extends `:${infer N}`
  ? {
      readonly [M in N]: {
        [Key in keyof (Builder & UnionToIntersection<_PathBuilder<T[K]>>)]: (Builder &
          UnionToIntersection<_PathBuilder<T[K]>>)[Key];
      };
    }
  : {
      readonly [M in K]: {
        [Key in keyof (Builder & UnionToIntersection<_PathBuilder<T[K]>>)]: (Builder &
          UnionToIntersection<_PathBuilder<T[K]>>)[Key];
      };
    };

export type PathBuilder<T extends RouteConfig> = Builder &
  UnionToIntersection<_PathBuilder<T>>;
