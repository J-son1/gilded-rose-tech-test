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
            item = this._updateItem(item);
            break;
          case "Backstage passes to a TAFKAL80ETC concert":
            item = this._updateItem(item);
            break;
          default:
            item = this._updateItem(item);
        }
      }
    });

    return this.items;
  }

  _updateItem(item) {
    switch (item.name) {
      case "Aged Brie":
        item.quality += 1;

        if (item.sellIn < 0) {
          item.quality += 1;
        }

        break;
      case "Backstage passes to a TAFKAL80ETC concert":
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

        break;
      default:
        if (item.quality > 0) {
          if (item.sellIn > 0) {
            item.quality -= 1;
          } else {
            item.quality -= 2;
          }
        }
    }

    return item;
  }
}

module.exports = Shop;
