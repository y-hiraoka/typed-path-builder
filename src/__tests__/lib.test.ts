import * as lib from "../lib";

test("isParameter returns true.", () => {
  expect(lib.isParameter(":hogeId")).toBe(true);
});

test("isParameter returns false.", () => {
  expect(lib.isParameter("hogeId")).toBe(false);
});

test("trimColon trims a colon.", () => {
  expect(lib.trimColon(":hogeId")).toBe("hogeId");
});

test("trimColon trims nothing.", () => {
  expect(lib.trimColon("hogeId")).toBe("hogeId");
});
