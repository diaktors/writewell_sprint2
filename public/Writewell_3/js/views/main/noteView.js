define([
	'backbone',
	'data',
	'shared',
	'util',
	'text!templates/main/noteView.htm'
], function (Backbone, data, shared, util, txtTemplate) {
	var view = Backbone.View.extend({
		initialize: function (options) {
			this.sectionId = options.sectionId;
			this.template = _.template(txtTemplate);
		},
		events: {
			'dragstart article.noteView': 'startDrag',
			'click .delete': 'deleteNote'
		},
		render: function (e) {
			var self = this;
			self.doRender();
		},
		doRender: function () {
			this.$el.html(this.template({ id: this.model.id, text: '', sectionId: this.sectionId  }));
			this.updateNoteDescription();

			return this;
		},
		startDrag: function (e) {
		 	var id = this.model.id;
		 	console.log('start drag with id: ' + id);
			e.originalEvent.dataTransfer.setData('sectionId', this.model.attributes.sectionIdAssigned); //edited by sairam
			e.originalEvent.dataTransfer.setData('id', id);
			e.originalEvent.dataTransfer.setData('type', 'notes');
		},
		deleteNote: function (e) {
			console.log('deleteNote');
			var target = $(e.currentTarget);
			var sectionId = target.attr('section-id');
			if (sectionId === 'all') {
				this.model.destroy();
			} else {
				data.handleCollectionRemoveFromSection('notes',sectionId,this.model);
			}
		},
		updateNoteDescription: function () {
			this.$el.html(this.template({ id: this.model.id, text: this.model.get('title'), sectionId: this.sectionId }));
		},
		beforeClose: function () {}
	});
	return view;
});