# Gilded Rose

This is the Gilded Rose kata in JavaScript with Jest

## Getting started

Install dependencies

```sh
npm install
```

## Running tests

To run all tests

```sh
npm test
```

To run all tests in watch mode

```sh
npm run test:watch
```

To generate test coverage report

```sh
npm run test:coverage
```

---

## Requirements

Hi and welcome to team Gilded Rose. As you know, we are a small inn with a prime location in a
prominent city ran by a friendly innkeeper named Allison. We also buy and sell only the finest goods.
Unfortunately, our goods are constantly degrading in quality as they approach their sell by date. We
have a system in place that updates our inventory for us. It was developed by a no-nonsense type named
Leeroy, who has moved on to new adventures. Your task is to add the new feature to our system so that
we can begin selling a new category of items. First an introduction to our system:

- All items have a SellIn value which denotes the number of days we have to sell the item
- All items have a Quality value which denotes how valuable the item is
- At the end of each day our system lowers both values for every item

Pretty simple, right? Well this is where it gets interesting:

- Once the sell by date has passed, Quality degrades twice as fast
- The Quality of an item is never negative
- "Aged Brie" actually increases in Quality the older it gets
- The Quality of an item is never more than 50
- "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
- "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches; Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but Quality drops to 0 after the concert

We have recently signed a supplier of conjured items. This requires an update to our system:

- "Conjured" items degrade in Quality twice as fast as normal items

Feel free to make any changes to the UpdateQuality method and add any new code as long as everything
still works correctly. However, do not alter the Item class or Items property as those belong to the
goblin in the corner who will insta-rage and one-shot you as he doesn't believe in shared code
ownership (you can make the UpdateQuality method and Items property static if you like, we'll cover
for you).

Just for clarification, an item can never have its Quality increase above 50, however "Sulfuras" is a
legendary item and as such its Quality is 80 and it never alters.

## Brief

Refactor the code in such a way that adding the new "conjured" functionality is easy.

---

## Approach

I started by looking at the specification and the file contents to understand what the code was supposed to do. The next thing was to write tests to cover all of the functionality of the code so that any changes I made while refactoring could then be found more easily if the code stopped producing the correct results. After making the necessary base tests, the code could then be refactored and tests could be added where appropriate. Then I would start refactoring the code by reducing the length of any bits of code that could be written in a more succinct way to make it more readable. I used comments to keep track of what the code was doing and to see if there was any repitition that could be reduced. I then thought that I could use a similar structure for updating items that the existing 'updateQuality' method used. However, I decided that separating conditions depending on the item would create clearer code. The conditions for each item could then be extracted out for better readablity, which I thought would make adding, modifying or removing item conditions easier.

### Decisions

#### Item quality

- The amount that an item's quality degraded by was not given and so
  I decide to go for a simple value of 1.
- The amount that 'Aged Brie' increased in quality
  was not given. I, again, decided to keep it simple and use a value of 1.

#### Conjured items
- There was no information about how to know if an item was a
  'conjured' item. Editing the item class was not allowed, which meant
  that I could not add a boolean field that indicated whether an item 
  was conjured. My work-around for this was to check if the item name
  included the word 'conjured'.

### Intentions

#### Readability

- I tried to reduce the amount of magic numbers
  in the tests and source code by creating variables
  that could be changed in one place.
  - Also, as the brief did not provide the value for
    how much an item decreases in quality, the aim
    was then to allow the amount to be set in one place and used
    depending on an items rate of degredation.
    This was also done in hopes that the code would be more
    readable. For instance, if an item degrades twice as
    fast as a normal item then you could ruduce its quality
    by the `standard_degredation_value * 2`.
- I opted for increasing the lines of code for better code readabilty
  and to make it easy to add, edit or remove parts of code where needed.

#### Code modification

- Including both 'if' and 'switch' statements to update different
  items would allow the code to be placed in either conditional 
  depending on which better suits an item's properties.
- If someone wanted to add an item, the idea was that the simplest
  way to do that would be to create a private method which held its
  required conditions and then easily add it to the 'updateQuality' method.
  - An issue with making individual private methods for certain items
    is that items that use the same conditional statements can't be
    shared, which could create unwanted repetition. If this occurs,
    further private method could be created and inserted into the
    private item methods in order to follow the DRY priciple.

#### Conjured items

- Not being able to add to the item class, I decided that
  an alternative way of distinguishing conjured items could
  be to look for the word 'conjured' in the item name. This
  made it possible to then add the 'conjured item functionality'.

### Challenges / areas to improve

- I would have liked to have created a way to refactor 'Backstage passes'
  so that the consert code could be easily changed if a different
  concert needed different conditions.
- It was difficult to reduce the lines of code while wanting it to
  be easily read and changed.
- Perhaps I could have come up with other ways to check if an item was
  'conjured' and maybe also added more tests for these types of items.

---

### Testing

To run the tests, change into the `js-jest` directory and run `npm test`. Or, to see test output with descriptions, execute the following in the root directory:

```terminal
> cd js-jest
> npm test -- gilded_rose.test.js
```