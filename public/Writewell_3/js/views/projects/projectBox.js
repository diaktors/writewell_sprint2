define([
	'backbone',
	'shared',
	'data',
	'text!templates/projects/projectBox.htm',
	'views/projects/deleteProject'
], function (Backbone, shared, data, txtTemplate, DeleteProject) {
	var mainHomeView = Backbone.View.extend({
		initialize: function () {
			this.template = _.template(txtTemplate);
		},
		events: {
			'click .promptProjectDeleteBtn': 'promptProjectDelete',
			'click .deleteProjectBtn': 'deleteProject'
		},
		render: function () {
			var self = this;
			data.ensureDemoDataLoaded(function () {
				self.doRender();
			});
		},
		doRender: function () {
			wrapper =  {
				createdAt: this.model.get('createdAt').format('YYYY-MM-DD HH:MM A'),
				title: this.model.get('title'),
				color: this.model.get('color')
			};
			this.$el.html(this.template(wrapper));
			var self = this;
			this.$el.click(function (e) {
				self.selectThisProject(e);
			});
		},
		promptProjectDelete: function (e) {
			console.log('clicked promptProjectDelete');
			var container = '<div id="deleteProjectContainer"></div>';
			$('.modal-container').html(container);
			var deleteProject = new DeleteProject({el :$('#deleteProjectContainer'), model: this.model});
			deleteProject.render();

			$('.modal-container').show();
			$('body').addClass('modal-open');
		},
		selectThisProject: function (e) {
			if ($('body').hasClass('modal-open')) { return; }; //override selection
			console.log('selectThisProject');
			data.currentProject = this.model;
			$('.nav-links li').removeClass('active');
			shared.router.navigate('home',true);
		}
	});
	return mainHomeView;
});