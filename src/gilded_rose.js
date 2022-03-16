class Shop {
  
  constructor(items=[]) {
    this.items = items;
    this._decreaseQualityValue = 1;
    this._increaseQaulityValue = 1;
    this._conjuredItemPatt = new RegExp("conjured", "i");
  }

  updateQuality() {
    this.items.forEach(item => {
      if (item.name == "Sulfuras, Hand of Ragnaros") { return }

      item.sellIn -= 1;

      if (item.quality < 50) {
        if (this._conjuredItemPatt.test(item.name)) {
          this._updateConjuredItem(item);
        } else {
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
      }
    });

    return this.items;
  }

  _updateAgedBrie(item) {
    item.quality += this._increaseQaulityValue;
    if (item.sellIn < 0) {
      item.quality += this._increaseQaulityValue;
    }
  }

  _updateBackstagePasses(item) {
    if (item.sellIn >= 0) {
      item.quality += this._increaseQaulityValue;
      if (item.sellIn < 11) {
        item.quality += this._increaseQaulityValue;
      }
      if (item.sellIn < 6) {
        item.quality += this._increaseQaulityValue;
      }
    } else {
      item.quality = 0;
    }
  }

  _updateItem(item) {
    if (item.quality > 0) {
      if (item.sellIn > 0) {
        item.quality -= this._decreaseQualityValue;
      } else {
        item.quality -= this._decreaseQualityValue * 2;
      }
    }
  }

  _updateConjuredItem(item) {
    item.quality -= this._decreaseQualityValue * 2;
  }
}

module.exports = Shop;
