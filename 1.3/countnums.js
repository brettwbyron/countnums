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
	var defaultOptions = {
		container: '',
		selector: '.counting',
		delay: 10,
		time: 1000,
		opacity: false,
		onlyOnce: false,
		direction: 'up',
		date: false
	};
	var options, animated = false;
	var nodes = [];

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
	function countUp( options=defaultOptions, elem ) {
		var nums = [];
		var divisions = options.time / options.delay;
		var num = elem.target.dataset.count == 'date' ? new Date().getFullYear() : elem.target.dataset.count;
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

	function getStart( elem ) {
		if ( elem.target.dataset.start.toString().toLowerCase() == 'date' || elem.target.dataset.countStart.toString().toLowerCase() == 'date' ) {
			return new Date().getFullYear()
		} else if ( elem.target.dataset.start || elem.target.dataset.countStart ) {
			return elem.target.dataset.start ?? elem.target.dataset.countStart;
		} else {
			let start='';
			for ( let i = 0; i < elem.target.dataset.count.toString().length; i++ ) {
				start = start + '9'
			};
			return start
		}
	}

	function countDown( options=defaultOptions, elem ) {
		var nums = [];
		var divisions = options.time / options.delay;
		var start =  getStart( elem );
		var end = elem.target.dataset.count ?? elem.target.dataset.end ?? elem.target.dataset.countEnd;
		var isComma = /[0-9]+,[0-9]+/.test( start );
		var isInt = /^[0-9]+$/.test( start );
		var isFloat = /^[0-9]+\.[0-9]+$/.test( start );
		var decimalPlaces = isFloat ? ( start.split( '.' )[ 1 ] || [] ).length : 0;
		var newNum;


		// Log for testing
		// console.group( '~ scrolling down ~' );
		// console.log('elem ~>', elem);
		// console.log('options.time ~>', options.time);
		// console.log('options.delay ~>', options.delay);
		// console.log('divisions ~>', divisions);
		// console.log('isComma ~>', isComma);
		// console.log('isInt ~>', isInt);
		// console.log('isFloat ~>', isFloat);
		// console.log( 'start ~>', start );
		// console.log( 'end ~>', end );
		// console.groupEnd();

		/*  Example
		count down from current date to target date
		2021 -> 1960
		2021 - 1960 = 61
		2021 - 61 * iteration / divisions
		*/


		// Generate list of decremental numbers to display
		for ( var i = divisions; i >= 1; i-- ) {
			// Preserve as int if input was int
			if ( isInt ) {
				// newNum = parseInt( num / divisions * i );
				newNum = parseInt( start - ( start - end ) * i / divisions );
			}
			// Preserve float if input was float
			if ( isFloat ) {
				newNum = parseFloat( start - ( start - end ) * i / divisions ).toFixed( decimalPlaces );
			}
			// Preserve commas if input had commas
			if ( isComma ) {
				newNum = parseInt( parseInt( start.replace( ',', '' ) ) - ( start - end ) * i / divisions );
				while ( /(\d+)(\d{3})/.test( newNum.toString() ) && newNum.length > 3 ) {
					newNum = newNum.toString().replace( /(\d+)(\d{3})/, '$1' + ',' + '$2' );
				}
			}
			nums.unshift( newNum );
		}

		elem.target.nums = nums;
		elem.target.innerText = start;
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

	// * CountNums constructor * //
	function CountNums( opts ) {
		// console.groupCollapsed( '~ Constructor ~' );
		// console.log( "defaultOptions ~>", defaultOptions );

		for ( var i = 0; i < opts.length; i++ ) {
			options = merge( defaultOptions, !!opts[ i ] ? opts[ i ] : defaultOptions );
			// console.log('options ~>', options);

			nodes.push( {
				...options
			} );
		}

		// console.log('options ~>', options);
		// console.log( "nodes ~>", nodes );
		// console.groupEnd();


		for ( let i = 0; i < nodes.length; i++ ) {
			const node = nodes[ i ];
			// console.groupCollapsed('~ node[' + i + '] ~');
			// console.log('node ~>', node);
			// Get number elements
			// console.log('node.container + \' \' + node.selector ~>', node.container + ' ' + node.selector);
			let counters = document.querySelectorAll( node.container + ' ' + node.selector );
			// console.log( "counters ~>", counters );
			// Apply IntersectionObserver
			let observer = new IntersectionObserver( function ( entries ) {
				for ( let i = 0; i < entries.length; i++ ) {
					const entry = entries[ i ];
					if ( entry.intersectionRatio >= 0 && entry.intersectionRatio <= 1 ) {
						// console.log( 'entry.target.dataset ~>', entry.target.dataset );

						if ( entry.target.dataset.onlyOnce == 'true' && entry.target.dataset.animated == 'true' ) {
							// console.log( '~~~ onlyonce and animated ~~~' );
							return;
						}

						entry.target.dataset.direction == 'down' ? countDown( node, entry ) : countUp( node, entry );
					}

					if ( entry.intersectionRatio > 0 ) {
						if ( entry.target.dataset.onlyOnce == 'true' ) {
							observer.unobserve( entry.target );
						}
					}
				}
			} );

			// console.groupEnd();

			for ( let j = 0; j < counters.length; j++ ) {
				const counter = counters[ j ];
				counter.dataset.onlyOnce = node.onlyOnce;
				counter.dataset.animated = false;
				counter.dataset.direction = node.direction;
				// console.log( "counter #" + j + " ~>", { counter } );
				observer.observe( counter, observer );

				// console.log( 'counter.dataset ~>', counter.dataset );

				// if ( counter.dataset.animated ) {
				// 	observer.unobserve( counter );
				// }
			}
		}
	}

	window.CountNums = CountNums;
}() );