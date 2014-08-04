define([
	'backbone',
	'data',
	'shared',
	'util',
	'text!templates/modals/addSource.htm',
	'collections/sections'
], function (Backbone, data, shared, util, txtTemplate, SectionCollection) {
	var view = Backbone.View.extend({
		initialize: function (options) {
			this.template = _.template(txtTemplate);
		},
		events: {
			'keyup .sectionTextArea': 'updateSectionWordCount',	
			'click .expand': 'expandToEditSeciton',
			'click .closeBtn':'close',
			'click .addSourceOptionBtn': 'toggleAddSourceView',
			'click .fileUpload': 'promptUpload',
			'change .fileUploader': 'addSourceAndUpload',
			'click .addSourceBtn': 'addSourceAndUpload'

		},
		render: function (e) {
			var self = this;
			//ensure any needed data is loaded...
			self.doRender();
		},
		doRender: function () {
			this.$el.html(this.template());

			return this;
		},
		toggleAddSourceView: function (e) {
			$('.addSourceOptionBtn').removeClass('active');
			$('.addSourceView').removeClass('active');
			$(e.currentTarget).addClass('active');

			function capFirstLetter (string) {
				return string.charAt(0).toUpperCase() + string.slice(1);
			}

			var type = $(e.currentTarget).attr('data-source-type');
			var selector = '#source' + capFirstLetter(type) + 'Input';
			$(selector).addClass('active');

		},
		dataType: null,
		promptUpload: function (e) {
			var self = this;
			this.dataType = $(e.currentTarget).attr('data-type');
			$('#fileUploader').click();
			document.getElementById('fileUploader').onchange = function () {
				self.addSourceAndUpload();
			};
		},
		addSourceAndUpload: function (e) {
			var file = $('#fileUploader').val();
			console.log(file);
			var fileName = file.split('\\')[2];
			var dataVal;
			var type;
			if (e) {
				switch ($(e.currentTarget).attr('data-type')) {
					case 'text':
						dataVal = $('#sourceTextInput textarea').val();
						fileName = dataVal;
						type = 'text';
						break;
					case 'link':
						dataVal = $('#sourceLinkInput input').val();
						fileName = dataVal;
						type = 'link';
						break;
					default:
						break;
				}
			} else {
				dataVal = file;
				type = this.dataType;
			}
			console.log('type: ' + type);
			data.currentProject.get('sources').create({
				id: util.generateUniqueCollectionId(data.currentProject.get('sources')),
				title:fileName,
				description: 'source description',
				sections: new SectionCollection(),
				type: type,
				data: data
			});
			this.close();
		},
 		close: function () {
 			shared.closeModal(this);
 		}
	});
	return view;
});