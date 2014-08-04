define([
	'backbone',
	'data',
	'shared',
	'util',
	'views/main/noteView',
	'text!templates/main/noteSectionView.htm'
], function (Backbone, data, shared, util, NoteView, txtTemplate) {
	var view = Backbone.View.extend({
		initialize: function (options) {
			this.template = _.template(txtTemplate);
		},
		events: {
			'dragenter .section-side-container': 'preventDefault',
			'dragover .section-side-container': 'preventDefault',
			'drop .section-side-container': 'dropped'
		},
		render: function (e) {
			var self = this;
			self.doRender();
		},
		doRender: function () {
			this.updateAllNotes();

			var self = this;
			this.listenTo(this.model.get('notes'),'all',function() {
				self.updateAllNotes();
				util.handleHeightShit();
			});

			return this;
		},
		updateAllNotes: function () {
			this.$el.html('');

			var wrapper = {	id:this.model.id, 
							color: this.model.get('color'),
							orderId:this.model.get('orderId'), 
							title: this.model.get('title')};
			this.$el.append(this.template(wrapper));

			var self = this;
			this.model.get('notes').each( function (note) {
				var id = note.id;
				var el = 'div[section-id="'+self.model.id+'"][section-note-id="'+id+'"]';
				self.$el.append('<div section-id="'+self.model.id+'" section-note-id="' + id + '"></div>');
				var noteView = new NoteView({ el: $(el), model: note, sectionId: self.model.id });
				noteView.render();
			});
		},
		dropped: function (e) {
			var id = e.originalEvent.dataTransfer.getData('id');
			var type = e.originalEvent.dataTransfer.getData('type');
			data.handleCollectionAdd(type, id, this.model);	
		},
		preventDefault: function (e) {
			e.preventDefault();
		},
		beforeClose: function () {
			this.unbind();
			this.undelegateEvents();
			this.stopListening();
			this.destroy();
		}
	});
	return view;
});

