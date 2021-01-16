# typed-path-builder

This allow you to generate a statically typed paths from a simple object. For example, if you specify `path` with `react-router`, you can pass the predefined URL info without typo.

[日本語](./README-ja.md)

## Usage

### Define config object

We define URLs as an object.

For example, if URLs in your app are as below:

```
/foo
/foo/:fooId
/foo/:fooId/bar
/fizz
/fizz/buzz/
/100
```

Prepare an object like the following and pass it to `createTypedPathBuilder` function.

```ts
import createTypedPathBuilder from "typed-path-builder";

const routeConfig = {
  foo: {
    ":fooId": {
      bar: {},
    },
  },
  fizz: {
    buzz: {},
  },
  100: {},
};

const [path, route] = createTypedPathBuilder(routeConfig);
```

The end of the URL puts an empty object (`{}`). Also, if you want to deal with path parameters, the property names in that hierarchy should start with `":"`.

### path builder

The `path` object received above is an object that generates path information based on `config`.

```ts
path.foo.fooId.bar._build() // => "/foo/:fooId/bar"
```

### route builder

The `route` object received above is an object that generates route information based on `config`.
Properties that start with `":"`, such as `":fooId"`, are functions in the route builder.

```ts
route.foo.fooId("id")._build() // => "/foo/id"
```

## query parameters

If you want to include query parameters, put a property called `_queries`.

```ts
const withQueries = {
  foo: {
    ":fooId": {
      _queries: {
        param1: {},
        param2: {},
        param3: {},
      },
    },
  },
};

const [, route] = createTypedPathBuilder(withQueries);

route.foo.fooId("id")._queries({ param1: "value1", param3: "value3" })._build(); // => "/foo/id?param1=value1&param3=value3"
```

`_queries` becomes a function in the route builder and accepts a query parameter object as an argument type-safely.
