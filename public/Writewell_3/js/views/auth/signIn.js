define([
	'backbone',
	'shared',
	'data',
    'serverApiUtil',
	'text!templates/auth/signIn.htm'
], function (Backbone, shared, data,serverapi, txtTemplate) {
	var mainHomeView = Backbone.View.extend({
		initialize: function () {
			this.template = _.template(txtTemplate);
		},
		events: {
			'click #signInBtn': 'signIn',
			'click #forgotPasswordBtn': 'forgotPassword'
		},
		render: function () {
			var self = this;
			data.ensureDemoDataLoaded(function () {
				$(self.el).html(self.template());
			});
		},
		signIn: function () {
			console.log('clicked sign in');
            var details={username: $("#email").val(),password:$("#password").val()};
            serverapi.signIn(details,function(result){

                if(result.status==1)
                {

                    shared.router.navigate('projects',true);
                }
                else
                {
                   alert(result.msg);
                }

            },function(error){


            });

			//nav to signup
		},
		forgotPassword: function () {
			console.log('clicked forgot password');
		}
	});
	return mainHomeView;
});