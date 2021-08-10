// updating moving item
// if the item lies fully in the old quad
//   if quad has children && item doesnt lies on central lines
//     remove from current qt
//     find the child which fully contains it and add to it
// else if parent exists
//   remove from curr qt
//   qt = curr.parent
//   canUnsubdivide = true
//   while true
//     if it fully contains element
//       find child n insert into it or insert in the parent itself
//       break
//     else if canUnsubdivide
//       if any child is subdivided, canUnsubdivide = false
//       else check item count and unsubdivide
//     if !qt.parent
//       qt.items.push(item) (no need to check children)
//       break
//     qt = qt.parent

// removing the element from the current tree can unsubdivide the tree

// if any of the siblings is subdivided excluding the current qt, no need to unsubdivide

// unsubdividing not subdivided cells
// parent.items = concat child's items
// parent.children.length = 0

import Box from './Box.js';

export default class QuadtreeItem extends Box {
 
	constructor( minX, minY, maxX, maxY, data ) {

		super( minX, minY, maxX, maxY );

		this.data = data;

		this.quadtree = null;

	}

	update() {

		let current = this.quadtree;

		if ( current.contains( this ) ) {

			if ( current.children.length > 0 ) {

				if ( ! this.liesOnMidLinesOf( current ) ) {

					current.items.splice( current.items.indexOf( this ), 1 );

					for ( let child of current.children ) {

						if ( child.contains( this ) ) {

							child.add( this );

							break;

						}

					}

				}

			}

		} else if ( current.parent ) {

			current.items.splice( current.items.indexOf( this ), 1 );

			let canUnsubdivide = true;

			if ( current.children.length > 0 ) {

				checkAndUnsubdivide();

			}

			let previous = current;
			current = current.parent

			while ( true ) {

				if ( current.contains( this ) || ! current.parent ) {

					for ( let child of current.children ) {

						if ( child !== previous && child.contains( this ) ) {

							child.add( this );

							return;

						}

					}

					this.quadtree = current;

					current.items.push( this );

					break;

				} else if ( canUnsubdivide ) {

					checkAndUnsubdivide();

				}

				previous = current;
				current = current.parent;

			}

			function checkAndUnsubdivide() {

				let itemCount = current.items.length;

				for ( let child of current.children ) {

					itemCount += child.items.length;

					if ( child.children.length > 0 ) {

						canUnsubdivide = false;
						break;

					}

				}

				if ( canUnsubdivide && itemCount <= 4 ) {

					for ( let child of current.children ) {

						for ( let item of child.items ) {

							item.quadtree = current;
							current.items.push( item );

						}

					}

					current.children.length = 0;

				}

			}

		}

	}

}