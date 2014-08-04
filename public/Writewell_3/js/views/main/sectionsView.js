define([
	'backbone',
	'data',
	'shared',
	'util',
	//'gridster',
	'text!templates/main/sectionsView.htm',
	'text!templates/main/createNewBox.htm',
	'views/main/sectionViewBox'
], function (Backbone, data, shared, util, txtTemplate, txtCreateNewBoxTemplate, SectionViewBox) {
	var view = Backbone.View.extend({
		initialize: function (options) {
			this.template = _.template(txtTemplate);
			this.createNewBoxTemplate = _.template(txtCreateNewBoxTemplate);
		},
		events: {
		},
		render: function (e) {
			var self = this;
			self.doRender();
		},
		doRender: function () {
			console.log('doRender');
			this.$el.html(this.template());
			this.initializeGrid();
			this.addSectionBoxes();

			var self = this;
	
			this.listenTo(data.currentProject.get('sections'),'add remove', function () {
				console.log('add remove section');
			 	self.updateSectionOrderIds();
				$('.sortable').html('');
			 	self.addSectionBoxes();
			});

			return this;
		},
		initializeGrid: function () {
			console.log('initializeGridster');
			var self = this;
			//http://api.jqueryui.com/sortable/
		    this.sortable = $('.sortable').sortable({tolerance:'pointer'});
		    //this.sortable.sortable('option','forceHelperSize',true);
		    //this.sortable.sortable('option','grid',[360,135]);
		    //this.sortable.sortable('option','scroll',false);
		    this.sortable.sortable('option','tolerance','pointer');
		    $('.sortable').sortable({
		    	update: function (event, ui) {
		    		self.updateSectionOrderIds();
		    	}
		    });
			
		    $('.sortable').disableSelection();
		},
		updateSectionOrderIds: function () {
        	$('#sectionsView li[section-id]').each(function (index, section) {
        		console.log('index: ' + index);
        		var section = $(this);
            	var sectionId = section.attr('section-id');
            	console.log('sectionId: ' +sectionId);
            	data.currentProject.get('sections').get(sectionId).set({ orderId: index + 1 });
	            
        	});
		},
		addSectionBoxes: function (callback) {
			if (this.sectionBoxes.length > 0) {
				_.each(this.sectionBoxes, function (sectionBox) {
					sectionBox.close();
				});
				this.sectionBoxes.length = 0;
			}

			console.log('addSectionBoxes');
			var self = this;
			data.currentProject.get('sections').sort();
			data.currentProject.get('sections').each( function(section) {
				console.log('addWidget');
				self.addWidget(section);			
			});
			//this.addCreateSectionBox();
			if (callback) callback();
		},
		sectionBoxes: [],
		addWidget: function (section) {
			var id = section.id; 
			var el = 'li[section-id="' + id + '"]';
			var container = '<li section-id="' + id + '"></div>';
			$('#sectionsView').append(container);
			var sectionBox = new SectionViewBox({ el: $(el), model: section });
			this.sectionBoxes.push(sectionBox);
			sectionBox.render();
		},
		beforeClose: function () {
		}
	});
	return view;
});