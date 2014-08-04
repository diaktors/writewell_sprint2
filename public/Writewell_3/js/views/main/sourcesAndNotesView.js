define([
	'backbone',
	'data',
	'shared',
	'util',
	'text!templates/main/sourcesAndNotesView.htm',
	'views/modals/addSource',
	'views/modals/addEditNote',
	'views/main/sourcesView',
	'views/main/notesView',
], function (Backbone, data, shared, util, txtTemplate, AddSourceView, AddEditNoteView, SourcesView, NotesView) {
	var view = Backbone.View.extend({
		initialize: function (options) {
			this.template = _.template(txtTemplate);
		},
		events: {
			'click #navTabs li': 'handleTabClick',
			'click #promptAddSourceBtn': 'promptAddSource',
			'click #promptAddNoteBtn': 'promptAddNote',
			'click .showNoteBtn': 'showNote',
            'click #showNoteBtnID':'showNote'
		},
		render: function (e) {
			var self = this;
			self.doRender();
		},
		bindToNoteAndSourceAdds: function () {
			var self = this;
			this.listenTo(data.currentProject.get('sources'), 'all', function () {
				self.updateSourcesView();
			});
			this.listenTo(data.currentProject.get('notes'), 'all', function () {
				self.updateNotesView();
			});
		},
		doRender: function () {
			this.$el.html(this.template());
			this.updateSourcesView();
			this.updateNotesView();
			this.bindToNoteAndSourceAdds();
			return this;
		},
		updateSourcesView: function () {
			if (!this.sourcesView) {
				this.sourcesView = new SourcesView({ el: $('#sourcesTab')});
			}
			this.sourcesView.render();
		},
		updateNotesView: function () {
			if (!this.notesView) {
				this.notesView = new NotesView({ el: $('#notesTab')});
			}
			this.notesView.render();
		},
		handleTabClick: function (e) {
			$('#navTabs li').removeClass('active');
			$('#sourcesAndNotesView div').removeClass('active');
			var target = $(e.currentTarget);
			var idRef = target.find('a').attr('href');

			target.addClass('active');
			$(idRef).addClass('active');
			return false;
		},
		promptAddSource: function () {
			console.log('add source click');
			var container = '<div id="addSourceContainer"></div>';
			$('.modal-container').html(container);
			var addSourceView = new AddSourceView({el :$('#addSourceContainer'), model: null});
			addSourceView.render();

			$('.modal-container').show();
			$('body').addClass('modal-open');
		},
		promptAddNote: function () {
			console.log('add note click');
			var container = '<div id="addEditNoteContainer"></div>';
			$('.modal-container').html(container);
			var addEditNoteView = new AddEditNoteView({el :$('#addEditNoteContainer'), model: null, isEdit: true, isNew: true });
			addEditNoteView.render();

			$('.modal-container').show();
			$('body').addClass('modal-open');
		},
		showNote: function (e) {
			console.log('show note click');
			var noteId = $(e.currentTarget).attr('note-id');
			var note = data.currentProject.get('notes').get(noteId);
			var container = '<div id="addEditNoteContainer"></div>';
			$('.modal-container').html(container);
			var addEditNoteView = new AddEditNoteView({el :$('#addEditNoteContainer'), model: note, isEdit: true, editAdd: 'Edit' });
			addEditNoteView.render();

			$('.modal-container').show();
			$('body').addClass('modal-open');
		},
		beforeClose: function () {}
	});
	return view;
});