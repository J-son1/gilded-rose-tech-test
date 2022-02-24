const Item = require("../src/item");

let item;
beforeEach(() => {
  item = new Item("name", 3, 5);
});

describe("Item", () => {
  it("has a name", () => {
    expect(item.name).toBe("name");
  });

  it("has a SellIn value", () => {
    expect(item.sellIn).toBe(3);
  });

  it("has a Quality value", () => {
    expect(item.quality).toBe(5);
  });
});