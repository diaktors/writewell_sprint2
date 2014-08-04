// Filename: app.js
define([
  'jquery',
  'underscore',
  'backbone',
  //'cookie',
  'googleAnalytics',
  'router', // Request router.js
  'bootstrap', //put last
  //'clickover',
  //'highcharts',
  //'parsley'
], function($, _, Backbone, googleAnalytics, Router, bootstrap) {
	var initialize = function() {
		window.jQuery = $;
		window.googleAnalytics = googleAnalytics;
		// Pass in our Router module and call it's initialize function
		Router.initialize();
	}

	return {
		initialize: initialize
	};
});