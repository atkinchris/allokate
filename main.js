var game = new Phaser.Game( 500, 600, Phaser.AUTO, 'game_div', null, true );

var main_state = {
	preload: function() {
		game.load.image( 'circle', 'assets/circle.png' );
	},
	create: function() {
		var width = 5;
		var spacing = 60;
		var scale = 0.5;
		var circles = game.add.group();

		function onDown( sprite, pointer ) {
			game.add.tween( sprite ).to( {
				alpha: 1
			}, 800, Phaser.Easing.Linear.None, true, 0, 0, true );
		}

		for ( var y = 0; y < width; y++ ) {
			for ( var x = 0; x < width; x++ ) {
				var circle = circles.create( x * spacing, y * spacing, 'circle' );
				circle.inputEnabled = true;
				circle.events.onInputDown.add( onDown, this );
				circle.scale.x = scale;
				circle.scale.y = scale;		
				circle.alpha = 0.1;		
			};
		};

		circles.x = Math.round( ( game.width - circles.width ) / 2 );
		circles.y = Math.round( ( game.height - circles.height ) / 2 );
	},
	update: function() {

	}
}

// And finally we tell Phaser to add and start our 'main' state
game.state.add( 'main', main_state );
game.state.start( 'main' );