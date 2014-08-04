define([
	'backbone',
	'data',
	'shared',
	'util',
	'text!templates/main/notesView.htm',
	'views/main/noteView',
	'views/main/noteSectionView'
], function (Backbone, data, shared, util, txtTemplate, NoteView, NoteSectionView) {
	var view = Backbone.View.extend({
		initialize: function (options) {
			this.template = _.template(txtTemplate);
		},
		events: {
			'dragenter #allNotes': 'preventDefault',
            'dragover #allNotes': 'preventDefault',
            'drop #allNotes': 'dropped'
		},
		render: function (e) {
			var self = this;
			self.doRender();
		},
		listening: false,
		bindToUpdateNotes: function () {
			this.listening = true;
			var self = this;
			this.listenTo(data.currentProject, 'all', function () {
				self.updateSectionNotes();
				util.handleHeightShit();
			});
		},
		doRender: function () {
			this.$el.html(this.template());
			this.addAllNotes();
			this.updateSectionNotes();
			if (!this.listening) this.bindToUpdateNotes();
			
			return this;
		},
		allNotes: [],
		addAllNotes: function () {
			if (this.allNotes.length > 0) {
				_.each(this.allNotes, function (noteView) {
					noteView.close();
				});
				this.allNotes.length = 0;
			}

			data.currentProject.get('notes').each( function(note) {
				if (note.get('unassigned')) {
					var id = note.id;
					var el = 'div[note-id="'+id+'"]';
					$('#allNotes').append('<div note-id="' + id + '"></div>');
					var noteView = new NoteView({ el: $(el), model: note, sectionId:'all' });
					noteView.render();
				}
			});
		},
		sectionNotes: [],
		updateSectionNotes: function () {
			if (this.sectionNotes.length > 0) {
				_.each(this.sectionNotes, function (noteView) {
					noteView.close();
				});
				this.sectionNotes.length = 0;
			}

			$('#sectionNotes').html('');
			data.currentProject.get('sections').sort();

			data.currentProject.get('sections').each(function (section) {
				var sectionContainer = '<div note-section-id='+section.id+'></div>';
				$('#sectionNotes').append(sectionContainer);
				var el = 'div[note-section-id="' + section.id + '"]';
				var noteSectionView = new NoteSectionView({ el: $(el), model: section })
				noteSectionView.render();
			});
		},
		dropped: function (e) {


            var sectionId = e.originalEvent.dataTransfer.getData('sectionId');
            var type = e.originalEvent.dataTransfer.getData('type');
            var id= e.originalEvent.dataTransfer.getData('id');
            var model= data.currentProject.get('notes').get(id);
            data.handleCollectionRemoveFromSection(type, sectionId,model);       
        },
        preventDefault: function (e) {
           
            e.preventDefault();
        },
		beforeClose: function () {}
		
	});
	return view;
});