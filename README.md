# Dynamic Quadtree
Quadtree implementation that can handle moving rectangles. 

## Examples
1. [Intersection/Querying](https://bytezeroseven.github.io/dynamic-quadtree/examples/index.html)

2. [Updating](https://bytezeroseven.github.io/dynamic-quadtree/examples/updating.html)

## How to use?
```js
import Quadtree from './src/Quadtree.js';
import QuadtreeItem from './src/QuadtreeItem.js';
import Box from './src/Box.js';

const qt = new Quadtree( 0, 0, 500, 500 );

const item = new QuadtreeItem( 0, 0, 10, 10 );
qt.add( item );

item.minX += 10;
item.maxX += 10;

item.update();

const range = new Box( 0, 0, 100, 100 );

qt.query( range, function ( item ) {

	console.log( range );

} );
```