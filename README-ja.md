# typed-path-builder

シンプルなオブジェクトから静的に型付けがされた path を生成します。例えば `react-router` などで `path` を指定する場合に、事前に定義した URL 情報を typo することなく入力することが可能になります。

[Engilish](./README.md)
## 使い方

### config object の定義

URL を object として定義します。

例えばあなたのアプリで使用する URL 一覧が下のような場合:

```
/foo
/foo/:fooId
/foo/:fooId/bar
/fizz
/fizz/buzz/
/100
```

次のような object を用意して createTypedPathBuilder 関数に渡してください。

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

URL の終端は空のオブジェクト (`{}`) を置きます。また path parameter を扱う場合は、その階層のプロパティ名は `":"` から始まる名前にします。

### path builder

上で受け取った `path` オブジェクトは、`config` を基にパス情報を生成するオブジェクトです。

```ts
path.foo.fooId.bar._build() // => "/foo/:fooId/bar"
```

### route builder

上で受け取った `route` オブジェクトは `config` を基にルート情報を生成するオブジェクトです。
`":fooId"` のような `":"` から始まるプロパティは route builder では関数になります。

```ts
route.foo.fooId("id")._build() // => "/foo/id"
```

## クエリパラメータ

クエリパラメータを含める場合は、 `_queries` というプロパティを置きます。

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

`_queries` は route builder で関数となり、引数で型安全にクエリパラメータのオブジェクトを受け付けます。
