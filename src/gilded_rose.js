class Shop {
  constructor(items=[]) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      let itemName = this.items[i].name;
      let itemQuality = this.items[i].quality;
      
      if (itemName == "Sulfuras, Hand of Ragnaros") {
        break;
      }
      
      this.items[i].sellIn -= 1;
      let itemSellIn = this.items[i].sellIn;

      switch (itemName) {
        case "Aged Brie":
          if (itemQuality < 50) {
            this.items[i].quality += 1;
            
            if (itemSellIn < 0) {
              this.items[i].quality += 1;
            }
            
            this.items[i].sellIn -= 1;
            break;
          }
        case "Backstage passes to a TAFKAL80ETC concert":
          if (itemQuality < 50) {
            if (this.items[i].sellIn >= 0) {
              if (this.items[i].sellIn < 11) {
                this.items[i].quality += 1;
              }
              
              if (this.items[i].sellIn < 6) {
                this.items[i].quality += 1;
              }

              this.items[i].quality += 1
            } else {
              this.items[i].quality = 0;
            }
            
            this.items[i].sellIn -= 1;
            break;
          }
        default:
          if (itemQuality > 0) {
            if (this.items[i].sellIn > 0) {
              this.items[i].quality -= 1;
            } else {
              this.items[i].quality -= 2;
            }
          }
      }
    }

    return this.items;
  }
}

module.exports = Shop;
