define([
	'backbone',
	'data',
	'shared',
	'util',
	'text!templates/main/sourceView.htm'
], function (Backbone, data, shared, util, txtTemplate) {
	var view = Backbone.View.extend({
		initialize: function (options) {
			this.sectionId = options.sectionId;
			this.template = _.template(txtTemplate);
		},
		events: {
			'dragstart article.sourceView': 'startDrag',
			'click .delete': 'deleteSource'
		},
		render: function (e) {
			var self = this;
			self.doRender();
		},
		doRender: function () {
			this.$el.html(this.template({ id: this.model.id, text: '', sectionId: this.sectionId, type: this.model.get('type') }));
			this.updateSourceDescription();

			return this;
		},
		startDrag: function (e) {
			var id = this.model.id;
			console.log('start drag with id: ' + id);
			e.originalEvent.dataTransfer.setData('id', id);
			e.originalEvent.dataTransfer.setData('type', 'sources');
			e.originalEvent.dataTransfer.setData('sectionId', this.model.attributes.sectionIdAssigned); // edited by sairam
		},
		deleteSource: function (e) {
			console.log('deleteSource');
			var target = $(e.currentTarget);
			var sectionId = target.attr('section-id');
			if (sectionId === 'all') {
				this.model.destroy();
			} else {	
				data.handleCollectionRemoveFromSection('sources',sectionId,this.model);
			}
		},
		updateSourceDescription: function () {
			this.$el.html(this.template({ id: this.model.id, text: this.model.get('title'), sectionId: this.sectionId, type: this.model.get('type')  }));
		},
		beforeClose: function () {}
	});
	return view;
});