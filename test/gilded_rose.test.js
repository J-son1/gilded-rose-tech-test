const Shop = require("../src/gilded_rose");

let item;
let shop;
beforeEach(() => {
  item = { name: 'foo', sellIn: 0, quality: 0 }
  agedBrie = { name: 'Aged Brie', sellIn: 0, quality: 10 }
  sulfuras = { name: 'Sulfuras', sellIn: 0, quality: 10 }

  shop = new Shop([item]);
})

describe("Gilded Rose", function() {
  it("should foo", function() {
    const gildedRose = new Shop([item]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  describe("updateQuality", () => {
    it("does not lower an item's quality value below 0", () => {
      const items = shop.updateQuality();
      expect(items[0].quality).toBe(0);
    });
  });
});
