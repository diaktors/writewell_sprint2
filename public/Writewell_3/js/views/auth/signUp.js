define([
	'backbone',
	'shared',
	'data',
    'models/signup',
	'text!templates/auth/signUp.htm',
	'jqueryui',
    'serverApiUtil'
], function (Backbone, shared, data,signup, txtTemplate, jqueryui,serverAPI) {
	var mainHomeView = Backbone.View.extend({
		initialize: function () {
			this.template = _.template(txtTemplate);
            this.utils = serverAPI;
		},
		events: {
			'click #joinBtn': 'join',
			'click .button-gender': 'toggleActive',
			'click .templateDropdown':'setTemplate'
		},
		render: function () {
			var self = this;
			data.ensureDemoDataLoaded(function () {
				self.doRender();
			});
		},
		doRender: function () {
			this.$el.html(this.template());
			$('#slider-container').slider({min: 13, max: 100, step: 1, value: 20});
			$('#slider-container').slider({
				slide: function (event, ui) {
					var val = ui.value;
					$('#age').val(val);
				}
			})

		},
		join: function () {
			console.log('clicked join');
            var gender=null;
            if($("#signUpMale").hasClass('active'))
                gender='male';
            else if($("#signUpFemale").hasClass('active'))
                gender='female'

            var details={name: $("#signUpName").val(),email: $("#signUpEmail").val(),password:$("#signUpPassword").val(),age:$("#age").val(),occupation:this.selectedOccupation,gender:gender};
            var user=new signup();
            if (user.isValid()) {


                this.utils.joinUser(details,function(user){
                    if(user != null){
                        shared.router.navigate('projects',true);
                    }
                },function(errorMessage){
                    alert("error" +errorMessage )
                });


            }
            else
            {

                _.each( user.validationError,function(error){
                    console.log( error.message);
                }  )

            }
			//shared.router.navigate('projects',true);
		},
		toggleActive: function (e) {
			$('.button-gender').removeClass('active');
			$(e.currentTarget).addClass('active');
		},
		setTemplate: function (e) {
			this.selectedOccupation = $(e.currentTarget).attr('data-id');
			console.log('occupation: ' + this.selectedOccupation);
			$('#templatePlaceholder').html($(e.currentTarget).html());
		}
	});
	return mainHomeView;
});