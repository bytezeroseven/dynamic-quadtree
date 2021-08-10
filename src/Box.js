export default class Box {
	
	constructor( minX, minY, maxX, maxY ) {

		this.minX = minX;
		this.minY = minY;
		this.maxX = maxX;
		this.maxY = maxY;

	}

	contains( box ) {

		return box.minX >= this.minX && box.maxX <= this.maxX && box.minY >= this.minY && box.maxY <= this.maxY;

	}

	intersects( box ) {

		return box.minX <= this.maxX && box.maxX >= this.minX && box.minY <= this.maxY && box.maxY >= this.minY;

	}

	liesOnMidLinesOf( box ) {

		const centerX = ( box.minX + box.maxX ) / 2;
		const centerY = ( box.minY + box.maxY ) / 2;

		return ( this.minX < centerX && this.maxX > centerX ) || ( this.minY < centerY && this.maxY > centerY )

	}

}