# Trinity
This is nothing religious. I don't know what this is... can be used for comparing tings, it's up to you :)

It started with a "math problem" in my head. Would it be posible to make a "2D graph-ish with three attributes, but it's scale, displayed in a triangle"-ish (I'm actually confused myself).

And from there it evolved. You can now use as many attributes as you like, even though it's quite hard to read with more than four.

## Me trying to exaplain
*This section isn't going to be pretty*

**Without conversion mode**, (ie. you give each attribute a score between 1 and 0) the dot will move towards each corner depending on how high the score is. This means that if all three (will be using three as an example) is the same (like `(0.1, 0.1, 0.1)` or `(0.7, 0.7, 0.7)`), the dot will be in the middle. Since the "pull" is equaly strong on each side.

This is good for comparing balance between attributes. For example products. A tent can have the attributes price, weight, and durability. Then an optimal tent would be in the middle, then you have the perfect balance between the durability and price.

But it's hard rating a product's price on a scale from 1 to 0 so I added a "convertsion mode". Which takes the highest value for each attributes and then takes the fraction of that value for each value for the same attribute. Which means that the most expensive product will be a 1, and the one costing halft that will be 0.5 (please tell me if this whole part isn't mathimatically correct). This way the cheapest product is the furthest away from the "price corner".
