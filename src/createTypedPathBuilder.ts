import { PathBuilder, RouteBuilder, RouteConfig } from "./types";
import { createPathBuilder } from "./createPathBuilder";
import { createRouteBuilder } from "./createRouteBuilder";

export function createTypedPathBuilder<T extends RouteConfig>(
  config: T,
): readonly [PathBuilder<T>, RouteBuilder<T>] {
  const pathBuilder = createPathBuilder(config);
  const routeBuilder = createRouteBuilder(config);

  return [pathBuilder, routeBuilder] as const;
}
