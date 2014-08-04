define([
	'backbone',
	'data',
	'shared',
	'util',
	'text!templates/modals/export.htm',
], function (Backbone, data, shared, util, txtTemplate) {
	var view = Backbone.View.extend({
		initialize: function (options) {
			this.template = _.template(txtTemplate);
		},
		events: {
			'click #exportMicrosoftWordBtn': 'exportMicrosoftWord',
			'click #exportGoogleDocBtn': 'exportGoogleDoc',
			'click .closeBtn' : 'close'
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
		exportMicrosoftWord: function () {
			console.log('exportMicrosoftWord');
		},
		exportGoogleDoc: function () {
			console.log('exportGoogleDoc');
		},
 		close: function () {
 			shared.closeModal(this);
 		}
	});
	return view;
});