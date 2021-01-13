import { createPathBuilder } from "../createPathBuilder";

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

test("createPathBuilder", () => {
  const path = createPathBuilder(routeConfig);

  expect(path._build()).toBe("/");
  expect(path.users._build()).toBe("/users");
  expect(path.users.userId._build()).toBe("/users/:userId");
  expect(path.users.userId.tweets._build()).toBe("/users/:userId/tweets");
  expect(path.users.userId.tweets.tweetId._build()).toBe(
    "/users/:userId/tweets/:tweetId",
  );
  expect(path.users.userId.tweets.tweetId.likes._build()).toBe(
    "/users/:userId/tweets/:tweetId/likes",
  );
  expect(path.users.userId.tweets.tweetId.retweets._build()).toBe(
    "/users/:userId/tweets/:tweetId/retweets",
  );
  expect(path.users.userId.likes._build()).toBe("/users/:userId/likes");
  expect(path.settings._build()).toBe("/settings");
  expect(path.settings.security._build()).toBe("/settings/security");
  expect(path.settings.privacies._build()).toBe("/settings/privacies");
  expect(path[1][2][3][4][5]._build()).toBe("/1/2/3/4/5");
});
