define([
	'backbone',
	'data',
	'shared',
	'util',
	'views/main/sourceView',
	'text!templates/main/sourceSectionView.htm'
], function (Backbone, data, shared, util, SourceView, txtTemplate) {
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
			this.updateAllSources();

			var self = this;
			this.listenTo(this.model.get('sources'),'all',function() {
				self.updateAllSources();
				util.handleHeightShit();
			});

			return this;
		},
		allSources: [],
		updateAllSources: function () {
			if (this.allSources.length > 0) {
				_.each(this.allSources, function (sourceView) {
					//sourceView.close();
				});
			}
			this.allSources.length = 0;

			this.$el.html('');

			var wrapper = {	id:this.model.id, 
							color: this.model.get('color'),
							orderId:this.model.get('orderId'), 
							title: this.model.get('title')};
			this.$el.append(this.template(wrapper));

			var self = this;
			this.model.get('sources').each( function (source) {
				var id = source.id;
				var el = 'div[section-id="'+self.model.id+'"][section-source-id="'+id+'"]';
				self.$el.append('<div section-id="'+self.model.id+'" section-source-id="' + id + '"></div>');
				var sourceView = new SourceView({ el: $(el), model: source, sectionId: self.model.id });
				self.allSources.push(sourceView);
				sourceView.render();
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
		}
	});
	return view;
});

