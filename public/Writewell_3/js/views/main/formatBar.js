define([
	'backbone',
	'data',
	'shared',
	'util',
	'text!templates/main/formatBar.htm',
	'views/modals/export'
], function (Backbone, data, shared, util, txtFormatBarTemplate, ExportView) {
	var view = Backbone.View.extend({
		navView: null, //which buttons to show. Set in router
		initialize: function (options) {
			this.template = _.template(txtFormatBarTemplate);
		},
		events: {
			'click #exportPromptBtn': 'exportPrompt',
			'click #saveBtn': 'save',
			'click #fonts li a': 'changeFont',
			'keyup #projectTitle': 'saveProjectTitle'
		},
		render: function (e) {
			var self = this;
			data.ensureDemoDataLoaded( function (){
				self.doRender();
			});
		},
		doRender: function () {
			$(this.el).html(this.template({projectTitle: data.currentProject.get('title')}));
			return this;
		},
		exportPrompt: function () {
			var container = '<div id="exportModal"></div>';
			$('.modal-container').html(container);
			var exportView = new ExportView({el:$('#exportModal'), model:data.currentProject });
			exportView.render();
			$('.modal-container').show();
			$('body').addClass('modal-open');
			$('.section-edit-modal-open').removeClass('section-edit-modal-open');
		},
		saveProjectTitle: function (e) {
			var title = $(e.currentTarget).val();
			data.currentProject.set({title: title});
			console.log('saved title: '+ title);
		},
		save: function (e) {
			console.log('save click');
			$(e.currentTarget).html('Saved');
			$(e.currentTarget).addClass('gray');
		},
		changeFont: function (e) {
			var fontName =	$(e.currentTarget).attr('font');
			$('.canChangeFormatting').attr('font', fontName);
			var font = $(e.currentTarget).html();
			$('#fontBtn').html(font);

		},
		beforeClose: function () {}
	});
	return view;
});