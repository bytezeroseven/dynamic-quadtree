import Box from './Box.js';

export default class Quadtree extends Box {

	static maxItems = 4;
	
	constructor( minX, minY, maxX, maxY, parent ) {

		super( minX, minY, maxX, maxY );

		this.parent = parent;

		this.children = [];
		this.items = [];

	}

	query( range, callback ) {

		for ( let i = 0; i < this.items.length; i ++ ) {

			if ( range.intersects( this.items[ i ] ) ) {

				callback( this.items[ i ] );

			}

		}

		if ( this.children.length > 0 ) {

			for ( let i = 0; i < this.children.length; i ++ ) {

				if ( this.children[ i ].intersects( range ) ) {

					this.children[ i ].query( range, callback );

				}

			}

		}

	}

	add( item ) {

		if ( this.children.length > 0 ) {

			for ( let i = 0; i < this.children.length; i ++ ) {

				if ( this.children[ i ].contains( item ) ) {

					this.children[ i ].add( item );

					return;

				}

			}

		} else if ( this.items.length >= 4 ) {

			this.subdivide();

			this.add( item );

			return;

		}

		item.quadtree = this;

		this.items.push( item );

	}

	subdivide() {

		const centerX = ( this.maxX + this.minX ) / 2;
		const centerY = ( this.maxY + this.minY ) / 2;

		this.children = [
			new Quadtree( this.minX, this.minY, centerX, centerY, this ), 
			new Quadtree( centerX, this.minY, this.maxX, centerY, this ), 
			new Quadtree( this.minX, centerY, centerX, this.maxY, this ), 
			new Quadtree( centerX, centerY, this.maxX, this.maxY, this )
		];

		const items = this.items;

		this.items = [];

		for ( let item of items ) {

			this.add( item );

		}

	}

	draw( ctx, isRoot = true ) {

		if ( isRoot ) {

			ctx.beginPath();

			rect( ctx, this );

		}

		if ( this.children.length > 0 ) {

			const centerX = ( this.minX + this.maxX ) / 2;
			const centerY = ( this.minY + this.maxY ) / 2;

			ctx.moveTo( centerX, this.minY );
			ctx.lineTo( centerX, this.maxY );

			ctx.moveTo( this.minX, centerY );
			ctx.lineTo( this.maxX, centerY );

			for ( let i = 0; i < this.children.length; i ++ ) {

				this.children[ i ].draw( ctx, false );

			}

		}

		for ( let i = 0; i < this.items.length; i ++ ) {

			rect( ctx, this.items[ i ] );

		}

		if ( isRoot ) {

			ctx.stroke();

		}

	}

}

function rect( ctx, { minX, minY, maxX, maxY } ) {

	ctx.moveTo( minX, minY );
	ctx.lineTo( maxX, minY );
	ctx.lineTo( maxX, maxY );
	ctx.lineTo( minX, maxY );
	ctx.lineTo( minX, minY );

}