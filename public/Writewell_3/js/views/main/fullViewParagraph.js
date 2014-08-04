define([
	'backbone',
	'data',
	'shared',
	'util',
	'text!templates/main/fullViewParagraph.htm',
], function (Backbone, data, shared, util, txtTemplate) {
	var view = Backbone.View.extend({
		initialize: function (options) {
			this.template = _.template(txtTemplate);
		},
		events: {
			// 'click li a': 'handleLinkSelected'
		},
		render: function (e) {
			var self = this;
				self.doRender();
		},
		bindModelToUpdateView: function () {
			var self = this;
			this.listenTo(this.model,'all', function() {
				self.updateSection();
				//console.log('update para ');
			});
		},
		doRender: function () {
			$(this.el).html(this.template({ id: this.model.id, 
											color: this.model.get('color'),
											orderId: this.model.get('orderId'), 
											title: this.model.get('title')}));
			this.updateSection();
			this.bindModelToUpdateView();

			return this;
		},
		updateSection: function () {
			var text = this.model.get('text');
			this.$el.find('.fullViewSectionText').html(text);
		},
		beforeClose: function () {}
	});
	return view;
});