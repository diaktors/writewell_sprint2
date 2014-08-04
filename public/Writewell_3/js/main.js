// Require.js allows us to configure shortcut alias
require.config({
	waitSeconds: 600,
	appDir: "../",
	baseUrl: "js",
	urlArgs: "bust=v1", //TODO: change to build not time
	paths: {
		jquery: 'libs/require-2.1.14_jquery-2.1.0',
		jqueryui: 'libs/jquery/jquery-ui-1.10.4.custom',
		underscore: 'libs/underscore/underscore-1.6.0',
		backbone: 'libs/backbone/backbone-1.1.2',
		//bbsafesync: 'libs/backbone/backbone-safesync',
		//bootstrap: 'libs/bootstrap/bootstrap-3.1.1',
        bootstrap: 'libs/bootstrap/bootstrap',
		text: 'libs/require/text',
		templates: '../templates',
		googleAnalytics: 'libs/googleAnalytics', //uncomment to use
		moment: 'libs/moment/moment-2.2.1',
		//parsleyBase: 'libs/parsley/parsley-1.1.18',
		//parsley: 'libs/parsley/parsley.extend-1.1.18',
		accounting: 'libs/accounting/accounting-0.3.2',
		jcolor: 'libs/jquery/jquery.color',
		// jDraggable: 'libs/jquery/jquery.draggable',
		// jCoords: 'libs/jquery/jquery.coords',
		// jCollision: 'libs/jquery/jquery.collision',
		//gridster: 'libs/gridster/jquery.gridster-0.5.1',
		//dropzone: 'libs/dropzone/dropzone-3.7.1',
		twix: 'libs/moment/twix'
		//spectrum: 'libs/spectrum/spectrum',
	},
	shim: {
		underscore: {
			deps: ['jquery'],
			exports: '_'
		},
		backbone: {
			deps: ['underscore'], //and underscore deps on jquery
			exports: 'Backbone'
		},
		bootstrap: {
			deps: ['jquery']
		},
		jqueryui : {
			deps: ['jquery']
		},
		// parsleyBase: {
		// 	deps: ['jquery']
		// },
		// parsley: {
		// 	deps: ['parsleyBase']
		// },
		// jCoords: {
		// 	deps: ['jquery']
		// },
		// jCollision: {
		// 	deps: ['jquery']
		// },
		// jDraggable: {
		// 	deps: ['jquery']
		// },
		// gridster1: {
		// 	deps: ['jquery', 'throttle', 'jDraggable', 'jCollision', 'jCoords']
		// },
		// twix: {
		// 	deps: ['moment']
		// }
		//parsley: { deps: ['parsleyExtend'] } //for custom extenstions
	},
	map: {},
	modules: [{
		name: "main",
		exclude: ["jquery"]
	}, ]
});

require([

	// Load our app module and pass it to our definition function
	'../js/app'
	// Some plugins have to be loaded in order due to their non AMD compliance
	// Because these scripts are not "modules" they do not pass any values to the definition function below
], function (App) {
	// The "app" dependency is passed in as "App"
	// Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
	App.initialize();
    $( document ).tooltip({
        position: {
            my: "center bottom-5",
            at: "center top",
            using: function( position, feedback ) {
                $( this ).css( position );
                $( "<div>" )
                    .addClass( "arrow" )
                    .addClass( feedback.vertical )
                    .addClass( feedback.horizontal )
                    .appendTo( this );
            }
        }
    });
	require.onError = function (err) {
		console.log(err.requireType);
		if (err.requireType === 'timeout') {
			console.log('modules: ' + err.requireModules);
		}

		throw err;
	};
});