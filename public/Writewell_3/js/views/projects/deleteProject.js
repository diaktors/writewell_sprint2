define([
	'backbone',
	'data',
	'shared',
	'util',
	'text!templates/projects/deleteProject.htm',
], function (Backbone, data, shared, util, txtTemplate) {
	var view = Backbone.View.extend({
		initialize: function (options) {
			this.template = _.template(txtTemplate);
		},
		events: {	
			'click .deleteProjectBtn': 'deleteProject',
			'click .closeBtn':'close'
		},
		render: function (e) {
			var self = this;
			//ensure any needed data is loaded...
			self.doRender();
		},
		doRender: function () {
			this.$el.html(this.template());

			return this;
		},
		deleteProject: function () {
			console.log('deleteProject')
			this.model.destroy();
			console.log('remove project');
			this.close();
		},
 		close: function () {
 			shared.closeModal(this);
 		}
	});
	return view;
});