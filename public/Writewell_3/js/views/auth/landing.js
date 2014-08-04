define([
	'backbone',
	'shared',
	'data',
    'serverApiUtil',
	'text!templates/auth/landing.htm'
], function (Backbone, shared, data, serverApi ,txtTemplate) {
	var mainHomeView = Backbone.View.extend({
		initialize: function () {
			this.template = _.template(txtTemplate);
		},
		events: {
			'click #googleSignInBtn': 'googleSign',
			'click #signUpBtn': 'signUp'
		},
		render: function () {
			var self = this;
			data.ensureDemoDataLoaded(function () {
				$(self.el).html(self.template());
			});
		},
		googleSign: function () {

            serverApi.googleSignin(
                function(url){
                    window.location.href=url;
            },
            function(error)
            {
                console.log(error);
            });

		},
		signUp: function () {
			console.log('clicked sign up');
			shared.router.navigate('signUp',true);
		}
	});
	return mainHomeView;
});