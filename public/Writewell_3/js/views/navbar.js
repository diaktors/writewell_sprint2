define([
	'backbone',
	'data',
	'shared',
	'util',
	'text!templates/navbar.htm',
], function (Backbone, data, shared, util, txtNavTemplate) {
	var view = Backbone.View.extend({
		navView: null, //which buttons to show. Set in router
		initialize: function (options) {
			this.template = _.template(txtNavTemplate);
		},
		events: {
			'click #settings': 'settings',
			'click .help-icon': 'toggleHelp',
			'click .nav-links li': 'toggleActive'
		},
		render: function (e) {
			var self = this;
			self.doRender();
			//data.loadMany(['locations'], function () { self.doRender(); });
		},
		doRender: function () {
			$(this.el).html(this.template());
           /*console.log("sairam -------------"+  $(".projectTitle"));*/
			return this;
		},
		settings: function () {
			shared.router.navigate('settings', true);
		},
		toggleHelp: function () {
			$('#sectionViewHeader').toggleClass('help');
			$('.sections-explanation').toggleClass('help');
			$('section[section-id] .move').toggleClass('help');
			$('section[section-id] .delete').toggleClass('help');
			$('section[section-id] .controls').toggleClass('help');
			$('section[section-id] .expand').toggleClass('help');
			$($('.sourceView .move').toArray()[0]).toggleClass('help');
			$($('.noteView .move').toArray()[0]).toggleClass('help');
			$($('.sourceView .controls').toArray()[0]).toggleClass('help');
			$($('.noteView .controls').toArray()[0]).toggleClass('help');
		},

		toggleActive: function (e) {
			var isActive = $(e.currentTarget).hasClass('active');

			$('.nav-links li').removeClass('active');
			if (isActive) {
			} else {
				$(e.currentTarget).addClass('active');
			}
		},
		beforeClose: function () {


        }
	});
	return view;
});