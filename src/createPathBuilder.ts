import { PathBuilder, RouteConfig } from "./types";
import * as lib from "./lib";

export function createPathBuilder<T extends RouteConfig>(config: T): PathBuilder<T> {
  return new PathBuilderImpl("", config) as any;
}

export class PathBuilderImpl {
  constructor(private path: string, config: RouteConfig) {
    const entries = Object.entries(config);

    entries.forEach(([key, value]) => {
      // @ts-ignore
      this[lib.trimColon(key)] = new PathBuilderImpl(path + "/" + key, value);
    });
  }

  _build(): string {
    return this.path === "" ? "/" : this.path;
  }
}
