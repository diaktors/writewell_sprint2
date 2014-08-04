define([
	'backbone',
	'data',
	'shared',
	'util',
	'text!templates/main/fullView.htm',
	'views/main/fullViewParagraph'
], function (Backbone, data, shared, util, txtTemplate, FullViewParagraph) {
	var view = Backbone.View.extend({
		initialize: function (options) {
			this.template = _.template(txtTemplate);
		},
		events: {
			 'click #expand-view-down': 'expandViewDown',
			 'click #collapse-view-up': 'collapseViewUp'
		},
		render: function (e) {
			var self = this;
			self.doRender();
		},
		doRender: function () {
			var self = this;
			$(this.el).html(this.template());
			this.updateCount();
			this.updateParagraphs();

			this.listenTo(data.currentProject, 'all', function() {
				$('#saveBtn').html('Note');
				$('#saveBtn').removeClass('gray');
				self.updateCount();
				self.updateParagraphs();
				//console.log('update fullV')
			});

			return this;
		},
		updateCount: function () {
			var counts = data.currentProject.wordCount() +' words <span class="count-separator">|</span> ' + 1234 + ' pages';
			$('#fullViewCounts').html(counts);
		},
		updateParagraphs: function () {
			$('#fullViewSections').html('');
			data.currentProject.get('sections').sort();
			data.currentProject.get('sections').each(function (section) {
				var id = section.id;
				var orderId = section.get('orderId');
				var el = 'div[fv-section-id="' + id + '"]';
				var container = '<div fv-section-id="' + id + '" order-id="' + orderId + '" class="fullViewSection"></div>';
				$('#fullViewSections').append(container);
				var paragraph = new FullViewParagraph({ el: $(el), model: section });
				paragraph.render();
			});
		},
		viewState: 'normal',//up, down
		expandViewDown: function () {
			$sect =  $('#sectionsViewContainer');
			$sectHeader =  $('.section-view-header-container');
			$fullView =  $('#fullViewContainer');
			$fullViewMain =  $('#fullViewMain');
			$fullViewTopBar =  $('#fullViewTopBar');
			$sect.removeClass();
			$fullViewMain.removeClass('down');
			$fullViewTopBar.removeClass('down');
			console.log('expand down');
			switch (this.viewState) {
				case 'up':
					this.viewState = 'normal';
					$sect.addClass('normal');
					$sectHeader.removeClass('up');
					$fullView.removeClass('up');
					break;
				default: 
					this.viewState = 'down';
					$sect.addClass('down');
					$fullViewMain.addClass('down');
					$fullViewTopBar.addClass('down');
					break;
			}
			util.handleHeightShit();
		},
		collapseViewUp: function () {
			$sect =  $('#sectionsViewContainer');
			$sectHeader =  $('.section-view-header-container');
			$fullView =  $('#fullViewContainer');
			$fullViewMain =  $('#fullViewMain');
			$fullViewTopBar =  $('#fullViewTopBar');
			$sect.removeClass();
			$sectHeader.removeClass('up');
			$fullView.removeClass('up');
			console.log('collapse up');
			switch (this.viewState) {
				case 'down':
					this.viewState = 'normal';
					$sect.addClass('normal');
					$sectHeader.removeClass('up');
					$fullView.removeClass('up');
					$fullViewMain.removeClass('down');
					$fullViewTopBar.removeClass('down');
					break;
				default:
					this.viewState = 'up';
					$sect.addClass('up');
					$sectHeader.addClass('up');
					$fullView.addClass('up');
					break;
			}
			util.handleHeightShit();
		},
		beforeClose: function () {}
	});
	return view;
});