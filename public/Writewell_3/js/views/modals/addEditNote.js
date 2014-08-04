define([
	'backbone',
	'data',
	'shared',
	'util',
	'text!templates/modals/addEditNote.htm',
	'collections/sections',

], function (Backbone, data, shared, util, txtTemplate, SectionCollection) {
	var view = Backbone.View.extend({
		initialize: function (options) {
			this.isEdit = options.isEdit;
			this.isNew = options.isNew ? options.isNew : false;
			this.editAdd = options.editAdd;
			this.template = _.template(txtTemplate);
		},
		events: {
			'click .closeBtn':'close',
			'click #addNoteBtn':'addNote',
			'click #editNoteBtn': 'editNote',
			'click #updateNoteBtn': 'updateNote',
			'click #deleteNoteBtn': 'deleteNote'
		},
		render: function (e) {
			var self = this;
			//ensure any needed data is loaded...
			self.doRender();
		},
		doRender: function () {
			console.log('isEdit: ' + this.isEdit);
			console.log('isNew: ' + this.isNew);

			this.$el.html(this.template({
				isEdit: this.isEdit, 
				isNew: this.isNew, 
				editAdd: this.editAdd, 
				note: this.noteJSON() }));

			return this;
		},
		noteJSON: function() {
			var note = { title: '', text: '' };
			if (this.model !== null) {
				note = this.model.toJSON();
			}
			return note;
		},
		addNote: function () {
			var title = $('#noteTitle').val();
			var text = $('#noteTextarea').val();
			var sections = new SectionCollection();
			var note1=data.currentProject.get('notes').create({
				id: null,
				title: title, 
				text: text, 
				sections: sections});




			this.close();
		},
		editNote: function (e) {
			console.log('edit note click');
			//TODO load model content for saving
			this.$el.html(this.template({ 
				isEdit: true, 
				isNew: false,
				editAdd:'Edit', 
				note: this.noteJSON() 
			}));
		},
		updateNote: function (e) {
			console.log('updateNote');
			var title = $('#noteTitle').val();
			var text = $('#noteTextarea').val();
			this.model.set({title: title, text: text});
            this.model.save();
			this.close();
		},
		deleteNote: function () {
			this.unbind();
			this.undelegateEvents();
			this.stopListening();
			this.model.destroy();
			this.close();
		},
 		close: function () {
 			shared.closeModal(this);
 		}
	});
	return view;
});