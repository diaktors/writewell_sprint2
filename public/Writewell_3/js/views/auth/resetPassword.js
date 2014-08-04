define([
	'backbone',
	'shared',
	'data',
	'text!templates/auth/resetPassword.htm'
], function (Backbone, shared, data, txtTemplate) {
	var mainHomeView = Backbone.View.extend({
		initialize: function () {
			this.template = _.template(txtTemplate);
		},
		events: {
			'click #submitBtn': 'submit',
		},
		render: function () {
			var self = this;
			data.ensureDemoDataLoaded(function () {
				$(self.el).html(self.template());
			});
		},
		submit: function () {
			console.log('clicked submit, returning to sign in');
			//nav to signup
			shared.router.navigate('signIn',true);
		}
	});
	return mainHomeView;
});