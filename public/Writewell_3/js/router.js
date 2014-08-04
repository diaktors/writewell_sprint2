// Filename: router.js
define([
	'backbone',
	'shared',
	'data',
	'views/viewFactory',
	'views/navbar',
	'views/footer',
], function (Backbone, shared, data, View, Navbar, Footer) { //Item example
	Backbone.View.prototype.close = function () {
		//console.log('Closing view ' + this);
		if (this.beforeClose) {
			this.beforeClose();
		}

		this.unbind();
		this.undelegateEvents();
		this.stopListening();
		$(this.el).empty();
	};

	Backbone.View.prototype.destroy = Backbone.View.prototype.close;

	var AppRouter = Backbone.Router.extend({
		currentLocationId: null,
		initialize: function () {
			// this.setupErrorHandler();
			this.setupGoogleAnalytics();
			return this;
		},
		setupGoogleAnalytics: function () {
			var loadUrl = Backbone.History.prototype.loadUrl;

			Backbone.History.prototype.loadUrl = function (fragmentOverride) {
				var matched = loadUrl.apply(this, arguments);
				var fragment = this.fragment = this.getFragment(fragmentOverride);

				if (!/^\//.test(fragment)) fragment = '/' + fragment;
				if (window._gaq !== undefined) window._gaq.push(['_trackPageview', fragment]);

				return matched;
			}
		},
		routes: {
			// Define some URL routes
			'home': 'showHome',
			'signUp': 'showSignUp',
			'signIn': 'showSignIn',
			'resetPassword': 'showResetPassword',
			'settings': 'showSettings',
			'projects': 'showProjects',
			//'account/:subsection(/:modelId)(/:action)': 'showAccount', //complex example
			//'signout': 'signOut',
			// Default
			'*actions': 'showDefault'
		},
		showDefault: function (actions) {
			var showNav = false;
			var showFormat = false
			var showLanding = true;
			this.displayView(new View.Landing({el: $('#mainPage')}), showNav, showFormat, showLanding);
			$('body').addClass('body-landing');
		},
		showHome: function (actions) {
			console.log('showHome');
			this.displayView(new View.Home({el: $('#mainPage')}), true, true);
		},
		showSignUp: function (actions) {
			console.log('showSignUp');
			this.displayView(new View.SignUp({el: $('#mainPage')}), false, false, true);
		},
		showSignIn: function (actions) {
			console.log('showSignIn');
			this.displayView(new View.SignIn({el: $('#mainPage')}), false, false, true);
		},
		showResetPassword: function (actions) {
			console.log('showResetPassword');
			this.displayView(new View.ResetPassword({el: $('#mainPage')}), false, false, true);
		},
		showSettings: function (actions) {
			console.log('showSettings');
			this.displayView(new View.Settings({el: $('#mainPage')}), true, false);
		},
		showProjects: function (actions) {
			console.log('showProjects');
			this.displayView(new View.Projects({el: $('#mainPage')}), true, false);
		},
		displayListView: function (callback, ViewCtor, dataProperty, newUrl, qry) {
			var self = this;
			var func = function () {
				var listView = new ViewCtor({
					collection: data[dataProperty],
					el: $('#mainPage'),
					qry: qry
				});
				self.displayView(listView);
				if (listView.showAddNewButton) {
					self.showAddNewButton(newUrl);
				}
				if (callback) callback();
			};
			data.ensureLoaded(dataProperty, func);
		},
		displayModel: function (id, ModelView, dataProperty) {
			var self = this;

			//var func = function () {

			var self = this;
			data.ensureDemoDataLoaded(function () {
				var loadedModel = data[dataProperty].get(id);
				var view = new ModelView({
					model: loadedModel,
					el: $('#mainPage')
				});
				self.displayView(view);
			});
				
			//}
			//data.ensureLoaded(dataProperty, func);
		},
		displayView: function (view, showNav, showFormat, showLanding) {
			if (!this.navbar && showNav) {
				this.navbar = new Navbar({
					el: $('#mainNav')
				});
				this.navbar.render();
			}
			if (showNav == false && this.navbar) {
				this.navbar.close();
				this.navbar = null;
			}

			if (!this.formatBar && showFormat) {
				this.formatBar = new View.FormatBar({
					el: $('#formatBarContainer')
				});
				this.formatBar.render();
			}
			if (showFormat == false && this.formatBar) {
				this.formatBar.close();
				this.formatBar = null;
			}

			if (showLanding) $('body').addClass('body-landing');
			else $('body').removeClass('body-landing');

			if (this.currentView) this.currentView.close();

			if (!this.footer) {
				this.footer = new Footer({
					el: $('#mainFooter')
				});
				this.footer.render();
			}
			view.render();

			this.currentView = view;
			window.scrollTo(0, 0);
		},

	});

	var initialize = function () {
		var app = new AppRouter();

		shared.router = app;
		Backbone.history.start();
		Backbone.history.on('route', function () {
			//on each route event this function runs.

		}, this);
	};
	return {
		initialize: initialize
	};
});