/*
	Count Nums
	A vanilla JS library for number counting animations.

	var countNums = new CountNums( {
		delay: 10,
		time: 2000,
		opacity: true,
		onlyOnce: false
	} );
*/
( function () {
	'use strict';

	var defaultSelector = '.counting';
	var defaultOptions = {
		delay: 10,
		time: 1000,
		opacity: false,
		onlyOnce: false
	};
	var animated = false;
	var options, observer;

	function merge( obj1, obj2 ) {
		const obj3 = {};
		obj1 = !!obj1 ? obj1 : {};
		obj2 = !!obj2 ? obj2 : {};
		Object.keys( obj1 ).forEach( function ( propertyName ) {
			if ( typeof obj3[ propertyName ] == "object" ) {
				Object.keys( obj3[ propertyName ] ).forEach( function ( prop ) {
					!!obj3[ propertyName ][ prop ] ? obj3[ propertyName ][ prop ] = obj1[ propertyName ][ prop ] : undefined;
				} )
			} else {
				obj3[ propertyName ] = obj1[ propertyName ];
			}
		} );

		Object.keys( obj2 ).forEach( function ( propertyName ) {
			if ( typeof obj3[ propertyName ] == "object" ) {
				Object.keys( obj3[ propertyName ] ).forEach( function ( prop ) {
					!!obj3[ propertyName ][ prop ] ? obj3[ propertyName ][ prop ] = obj2[ propertyName ][ prop ] : undefined;
				} )
			} else {
				obj3[ propertyName ] = obj2[ propertyName ];
			}
		} );
		return obj3;
	};

	// Number scroller
	function countUp( elem, options ) {
		var nums = [];
		var divisions = options.time / options.delay;
		var num = elem.target.dataset.count;
		var isComma = /[0-9]+,[0-9]+/.test( num );
		var isInt = /^[0-9]+$/.test( num );
		var isFloat = /^[0-9]+\.[0-9]+$/.test( num );
		var decimalPlaces = isFloat ? ( num.split( '.' )[ 1 ] || [] ).length : 0;
		var newNum;
		// Generate list of incremental numbers to display
		for ( var i = divisions; i >= 1; i-- ) {
			// Preserve as int if input was int
			if ( isInt ) {
				newNum = parseInt( num / divisions * i );
			}
			// Preserve float if input was float
			if ( isFloat ) {
				newNum = parseFloat( num / divisions * i ).toFixed( decimalPlaces );
			}
			// Preserve commas if input had commas
			if ( isComma ) {
				newNum = parseInt( parseInt( num.replace( ',', '' ) ) / divisions * i );
				while ( /(\d+)(\d{3})/.test( newNum.toString() ) ) {
					newNum = newNum.toString().replace( /(\d+)(\d{3})/, '$1' + ',' + '$2' );
				}
			}
			nums.unshift( newNum );
		}
		elem.target.nums = nums;
		elem.target.innerText = '0';
		// Updates the number until we're done
		var f = function () {
			if ( !!elem.target.nums && elem.target.nums.length ) {
				elem.target.innerText = elem.target.nums.shift();
				setTimeout( elem.target.func, options.delay );
			} else {
				delete elem.target.nums;
				elem.target.nums = null;
				elem.target.func = null;
			}
		};
		elem.target.func = f;
		// Start the count up
		setTimeout( elem.target.func, options.delay );
	}

	function intersectionCallback( entries ) {
		for ( let i = 0; i < entries.length; i++ ) {
			const entry = entries[ i ];

			if ( options.onlyOnce ) {
				if ( entry.intersectionRatio > 0 && !animated ) {
					countUp( entry, options );

					if ( i == entries.length - 1 ) {
						animated = true;
					}
				}
			} else {
				if ( entry.intersectionRatio >= 0 && entry.intersectionRatio <= 1 ) {
					countUp( entry, options );
				}
			}
		}
	}

	// * CountNums constructor * //
	function CountNums( selector, opts ) {
		selector = !!selector ? selector : defaultSelector;
		opts = !!opts ? opts : defaultOptions

		// Overwrite defaults
		options = merge( defaultOptions, opts );

		// Get number elements
		const counters = document.querySelectorAll( selector );
		// Apply IntersectionObserver
		observer = new IntersectionObserver( intersectionCallback );

		for ( let i = 0; i < counters.length; i++ ) {
			const counter = counters[ i ];
			observer.observe( counter );
		}
	}

	window.CountNums = CountNums;
}() );