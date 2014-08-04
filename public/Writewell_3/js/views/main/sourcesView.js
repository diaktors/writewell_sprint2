define([
	'backbone',
	'data',
	'shared',
	'util',
	'text!templates/main/sourcesView.htm',
	'views/main/sourceView',
	'views/main/sourceSectionView'
], function (Backbone, data, shared, util, txtTemplate, SourceView, SourceSectionView) {
	var view = Backbone.View.extend({
		initialize: function (options) {
			this.template = _.template(txtTemplate);
		},
		events: {
		
			'dragenter #allSources': 'preventDefault',
            'dragover #allSources': 'preventDefault',
            'drop #allSources': 'dropped'

		},
		render: function (e) {
			var self = this;
			self.doRender();
		},
		listening: false,
		bindToUpdateSections: function () {
			this.listening = true;
			var self = this;
			this.listenTo(data.currentProject, 'all', function () {
				self.updateSectionSources();
				util.handleHeightShit();
			});
		},
		doRender: function () {
			this.$el.html(this.template());
			this.addAllSources();
			this.updateSectionSources();
			if (!this.listening) this.bindToUpdateSections();

			return this;
		},
		allSources: [],
		addAllSources: function () {
			if (this.allSources.length > 0) {
				_.each(this.allSources, function (sourceView) {
					sourceView.close();
				});
				this.allSources.length = 0;
			}

			var self = this;
			data.currentProject.get('sources').each( function(source) {
				if (source.get('unassigned')) {
                    this.model = source;
					var id = source.id;
					var el = 'div[source-id="'+id+'"]';
					$('#allSources').append('<div source-id="' + id + '"></div>');
					var sourceView = new SourceView({ el: $(el), model: source, sectionId:'all' });
					self.allSources.push(sourceView);
					sourceView.render();
				}
			});
		},
		sectionSources: [],
		updateSectionSources: function () {
			if (this.sectionSources.length > 0) {
				_.each(this.sectionSources, function (sectionSource) {
					sectionSource.close();
				});
				this.sectionSources.length = 0;
			}

			var self = this;
			$('#sectionSources').html('');
			data.currentProject.get('sections').sort();

			data.currentProject.get('sections').each(function (section) {
				var sectionContainer = '<div source-section-id='+section.id+'></div>';
				$('#sectionSources').append(sectionContainer);
				var el = 'div[source-section-id="' + section.id + '"]';
				var sourceSectionView = new SourceSectionView({ el: $(el), model: section });
				self.sectionSources.push(sourceSectionView);
				sourceSectionView.render();
			});
		},
		beforeClose: function () {
		},dropped: function (e) {
		
            var id = e.originalEvent.dataTransfer.getData('id');
            var type = e.originalEvent.dataTransfer.getData('type');
			var sectionId = e.originalEvent.dataTransfer.getData('sectionId');
			var model= data.currentProject.get('sources').get(id);
            //data.handleCollectionRemoveFromSection(type, id, this.model);
			data.handleCollectionRemoveFromSection(type, sectionId,model);  //edited by sairam
        },
        preventDefault: function (e) {
            e.preventDefault();
        }
	});
	return view;
});