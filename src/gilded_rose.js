class Shop {
constructor(items=[]) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach(item => {
      if (item.name == "Sulfuras, Hand of Ragnaros") { return }

      item.sellIn -= 1;

      if (item.quality < 50) {
        switch (item.name) {
          case "Aged Brie":
            this._updateAgedBrie(item);
            break;
          case "Backstage passes to a TAFKAL80ETC concert":
            this._updateBackstagePasses(item);
            break;
          default:
            this._updateItem(item);
        }
      }
    });

    return this.items;
  }

  _updateAgedBrie(item) {
    item.quality += 1;
    if (item.sellIn < 0) {
      item.quality += 1;
    }
  }

  _updateBackstagePasses(item) {
    if (item.sellIn >= 0) {
      item.quality += 1
      if (item.sellIn < 11) {
        item.quality += 1;
      }
      if (item.sellIn < 6) {
        item.quality += 1;
      }
    } else {
      item.quality = 0;
    }
  }

  _updateItem(item) {
    if (item.quality > 0) {
      if (item.sellIn > 0) {
        item.quality -= 1;
      } else {
        item.quality -= 2;
      }
    }
  }
}

module.exports = Shop;
