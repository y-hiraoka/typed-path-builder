import { createRouteBuilder } from "../createRouteBuilder";

const routeConfig = {
  users: {
    ":userId": {
      tweets: {
        ":tweetId": {
          likes: {},
          retweets: {},
        },
      },
      likes: {},
    },
  },
  settings: {
    security: {},
    privacies: {},
  },
  1: { 2: { 3: { 4: { 5: {} } } } },
};

test("createRouteBuilder", () => {
  const route = createRouteBuilder(routeConfig);

  expect(route._build()).toBe("/");
  expect(route.users._build()).toBe("/users");
  expect(route.users.userId("user000")._build()).toBe("/users/user000");
  expect(route.users.userId("user000").tweets._build()).toBe("/users/user000/tweets");
  expect(route.users.userId("user000").tweets.tweetId("tweet111")._build()).toBe(
    "/users/user000/tweets/tweet111",
  );
  expect(route.users.userId("user000").tweets.tweetId("tweet111").likes._build()).toBe(
    "/users/user000/tweets/tweet111/likes",
  );
  expect(route.users.userId("user000").tweets.tweetId("tweet111").retweets._build()).toBe(
    "/users/user000/tweets/tweet111/retweets",
  );
  expect(route.users.userId("user000").likes._build()).toBe("/users/user000/likes");
  expect(route.settings._build()).toBe("/settings");
  expect(route.settings.security._build()).toBe("/settings/security");
  expect(route.settings.privacies._build()).toBe("/settings/privacies");
  expect(route[1][2][3][4][5]._build()).toBe("/1/2/3/4/5");
});
