import { RouteConfig, RouteBuilder } from "./types";
import * as lib from "./lib";

export function createRouteBuilder<T extends RouteConfig>(config: T): RouteBuilder<T> {
  return new RouteBuilderImpl("/", config) as any;
}

class RouteBuilderImpl {
  constructor(private path: string, config: RouteConfig) {
    const entries = Object.entries(config);

    entries.forEach(([key, value]) => {
      if (lib.isParameter(key)) {
        // @ts-ignore
        this[lib.trimColon(key)] = function (parameter: string) {
          return new RouteBuilderImpl(
            `${this.path}${this.path === "/" ? "" : "/"}${parameter}`,
            value,
          );
        };
      } else {
        // @ts-ignore
        this[key] = new RouteBuilderImpl(
          `${this.path}${this.path === "/" ? "" : "/"}${key}`,
          value,
        );
      }
    });
  }

  _build(): string {
    return this.path;
  }
}
