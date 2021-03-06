const Shop = require("../src/gilded_rose");

const DECREASE_QUALITY_VALUE = 1;
const INCREASE_QUALITY_VALUE = 1;

let shop, item, foo, bar, agedBrie, sulfuras, items, conjuredItem;
beforeEach(() => {
  // Normal item
  item = { name: "item", sellIn: 5, quality: 7 };
  // Item with qulity = 0
  foo = { name: "foo", sellIn: 0, quality: 0 };
  // Item past the 'sell in' date
  bar = { name: "bar", sellIn: 0, quality: 9 };
  agedBrie = { name: "Aged Brie", sellIn: 0, quality: 10 };
  sulfuras = { name: "Sulfuras, Hand of Ragnaros", sellIn: 0, quality: 10 };
  conjuredItem = { name: "Conjured item", sellIn: 0, quality: 10 };

  shop = new Shop([item]);
  items = shop.updateQuality();
});

describe("Gilded Rose", function() {
  describe("updateQuality", () => {
    it("should foo", function() {
      const gildedRose = new Shop([foo]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe("foo");
    });

    it("does not lower an item's quality value below 0", () => {
      shop = new Shop([foo]);
      items = shop.updateQuality();
      expect(items[0].quality).toBe(0);
    });

    it("lowers the 'quality' value", () => {
      expect(items[0].quality).toBeLessThan(7);
    });

    it("lowers the 'sell in' value by 1", () => {
      expect(items[0].sellIn).toBe(4);
    });

    it("decreases in quality twice as fast if the item has passed the sell by date", () => {
      expected = bar.quality - DECREASE_QUALITY_VALUE * 2;
      shop = new Shop([bar]);
      items = shop.updateQuality();
      expect(items[0].quality).toBe(expected);
    });

    describe("receiving 'Aged Brie'", () => {
      it("increases the quality", () => {
        expected = agedBrie.quality + INCREASE_QUALITY_VALUE;
        shop = new Shop([agedBrie]);
        items = shop.updateQuality();
        expect(items[0].quality).toBeGreaterThan(expected);
      });

      it("lowers the 'sell in' value by 1", () => {
        shop = new Shop([agedBrie]);
        items = shop.updateQuality();
        expect(items[0].sellIn).toBe(-1);
      });
    });

    describe("receiving 'Backstage passes'", () => {
      it("increases the quality by 2 if the 'sell in' value is < 11", () => {
        backstagePasses = { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 10, quality: 7 };
        shop = new Shop([backstagePasses]);
        items = shop.updateQuality();
        expect(items[0].quality).toBe(9);
      });

      it("increases the quality by 3 if the 'sell in' value is < 6", () => {
        backstagePasses = { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 5, quality: 7 };
        shop = new Shop([backstagePasses]);
        items = shop.updateQuality();
        expect(items[0].quality).toBe(10);
      });

      it("drops the quality to 0 if the 'sell in' value is 0", () => {
        backstagePasses = { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 0, quality: 7 };
        shop = new Shop([backstagePasses]);
        items = shop.updateQuality();
        expect(items[0].quality).toBe(0);
      });

      it("lowers the 'sell in' value by 1", () => {
        backstagePasses = { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 10, quality: 7 };
        shop = new Shop([backstagePasses]);
        items = shop.updateQuality();
        expect(items[0].sellIn).toBe(9);
      });
    });

    describe("receiving 'Sulfuras'", () => {
      it("never has to be sold", () => {
        shop = new Shop([sulfuras]);
        items = shop.updateQuality();
        expect(items[0].sellIn).toBe(0);
      });

      it("never decreases in quality", () => {
        shop = new Shop([sulfuras]);
        items = shop.updateQuality();
        expect(items[0].quality).toBe(10);
      });
    });

    describe("receiving a 'conjured' item", () => {
      it("decreases in quality twice as fast as a normal item", () => {
        expected = conjuredItem.quality - DECREASE_QUALITY_VALUE * 2;
        shop = new Shop([conjuredItem]);
        items = shop.updateQuality();
        expect(items[0].quality).toBe(expected);
      });
    });
  });
});
