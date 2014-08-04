define([
	'backbone',
	'shared',
	'data',
	'text!templates/auth/settings.htm'
], function (Backbone, shared, data, txtTemplate) {
	var mainHomeView = Backbone.View.extend({
		initialize: function () {
			this.template = _.template(txtTemplate);
		},
		events: {
			'click #savePasswordBtn': 'savePassword',
		},
		render: function () {
			var self = this;
			data.ensureDemoDataLoaded(function () {
				$(self.el).html(self.template());
			});
		},
		savePassword: function (e) {
			console.log('clicked savePassword');
			$(e.currentTarget).html('Saved');
			$(e.currentTarget).addClass('gray');

			//nav to signup
			//shared.router.navigate('signIn',true);
		}
	});
	return mainHomeView;
});