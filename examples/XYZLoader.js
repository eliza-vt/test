import {
	BufferGeometry,
	FileLoader,
	Float32BufferAttribute,
	Loader
} from '../../../build/three.module.js';

class XYZLoader extends Loader {

	loadFile(file) {
		this.parse(file.data);
	}


	load( url, onLoad, onProgress, onError ) {

		const scope = this;

		const loader = new FileLoader( this.manager );
		loader.setPath( this.path );
		loader.setRequestHeader( this.requestHeader );
		loader.setWithCredentials( this.withCredentials );
		loader.load( url, function ( text ) {

			try {

				onLoad( scope.parse( text ) );

			} catch ( e ) {

				if ( onError ) {

					onError( e );

				} else {

					console.error( e );

				}

				scope.manager.itemError( url );

			}

		}, onProgress, onError );

	}

	parse( text ) {

		console.log(window.selectedGroups);
		// const lines = text.split( '\n' );
		const lines = window.globalResult.split( '\n' );
		// alert("FIle 2");
		// console.log("file 2");
		// console.log(window.globalResult);

		const vertices = [];
		const colors = [];

		for ( let line of lines ) {

			line = line.trim();

			if ( line.charAt( 0 ) === '#' ) continue; // skip comments

			const lineValues = line.split( /\s+/ );

			if ( lineValues.length === 4 ) {

				// console.log(window.selectedGroups.indexOf(+lineValues[0]))
				if (window.selectedGroups.indexOf(+lineValues[0]) === -1) continue;


				// XYZ

				vertices.push( parseFloat( lineValues[ 1 ] ) );
				vertices.push( parseFloat( lineValues[ 2 ] ) );
				vertices.push( parseFloat( lineValues[ 3 ] ) );

				let tempColors = new Array(3);


				// // земля - коричневый - беллый
				if (lineValues[0] == 2){
					tempColors[0] = 0.58;
					tempColors[1] = 0.2941;
					tempColors[2] = 0;
				}

				if (lineValues[0] == 6){
					tempColors[0] = 0.9;
					tempColors[1] = 0.0;
					tempColors[2] = 0.0;
				}

				//деревья - светло зеленый - работает
				if (lineValues[0] == 5){
					tempColors[0] = 0.0;
					tempColors[1] = 0.95;
					tempColors[2] = 0.0;
				}

				//трава - ярко зеленый - работает
				if (lineValues[0] == 4){
					tempColors[0] = 0.0;
					tempColors[1] = 0.75;
					tempColors[2] = 0.0;
				}

				//ложные - фиолетовые - работает
				if (lineValues[0] == 7){
					tempColors[0] = 0.5;
					tempColors[1] = 0.0;
					tempColors[2] = 0.5;
				}

				if (lineValues[0] == 3){
					tempColors[0] = 0.0;
					tempColors[1] = 0.45;
					tempColors[2] = 0.0;
				}

				colors.push( parseFloat( tempColors[0]));
				colors.push( parseFloat( tempColors[1]));
				colors.push( parseFloat( tempColors[2]));

			}

			if ( lineValues.length === 6 ) {

				// XYZRGB

				vertices.push( parseFloat( lineValues[ 0 ] ) );
				vertices.push( parseFloat( lineValues[ 1 ] ) );
				vertices.push( parseFloat( lineValues[ 2 ] ) );
				//
				// colors.push( parseFloat( lineValues[ 3 ] ) / 255 );
				// colors.push( parseFloat( lineValues[ 4 ] ) / 255 );
				// colors.push( parseFloat( lineValues[ 5 ] ) / 255 );

			}

		}

		const geometry = new BufferGeometry();
		geometry.setAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );

		if ( colors.length > 0 ) {

			geometry.setAttribute( 'color', new Float32BufferAttribute( colors, 3 ) );

		}

		return geometry;

	}

}

export { XYZLoader };
