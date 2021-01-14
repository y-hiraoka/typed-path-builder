export type RouteConfig = { [path in string | number]: RouteConfig };

type Builder<T extends string = string> = { _build: () => T };

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
  Config extends RouteConfig,
  Key extends keyof Config = keyof Config,
  Path extends string = ""
> = Key extends `:${infer N}`
  ? {
      readonly [M in N]: {
        [K in keyof (Builder<`${Path}/${Key}`> &
          UnionToIntersection<
            _PathBuilder<Config[Key], keyof Config[Key], `${Path}/${Key}`>
          >)]: (Builder<`${Path}/${Key}`> &
          UnionToIntersection<
            _PathBuilder<Config[Key], keyof Config[Key], `${Path}/${Key}`>
          >)[K];
      };
    }
  : Key extends string | number
  ? {
      readonly [M in Key]: {
        [K in keyof (Builder<`${Path}/${Key}`> &
          UnionToIntersection<
            _PathBuilder<Config[Key], keyof Config[Key], `${Path}/${Key}`>
          >)]: (Builder<`${Path}/${Key}`> &
          UnionToIntersection<
            _PathBuilder<Config[Key], keyof Config[Key], `${Path}/${Key}`>
          >)[K];
      };
    }
  : never;

export type PathBuilder<Config extends RouteConfig> = Builder<"/"> &
  UnionToIntersection<_PathBuilder<Config>>;
