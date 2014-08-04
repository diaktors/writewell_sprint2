define([
	'backbone',
	'shared',
	'data',
	'util',
	'views/main/sectionsView',
	'views/main/fullView',
	'views/main/sourcesAndNotesView',
	'collections/sources',
	'collections/notes',
	'text!templates/home.htm'
], function (Backbone, shared, data, util, SectionsView, FullView, SourcesAndNotesView, SourcesCollection,NotesCollection, homeTemplate) {
	var mainHomeView = Backbone.View.extend({
		initialize: function () {
			this.homeTemplate = _.template(homeTemplate);
		},
		events: {
			'click #hideModalBtn': 'hideModal',
			'click #addSectionBtn':'addSection'
		},

		render: function () {

            $(".help-icon > .dropdown-menu").css({
                'padding':'0px'
            });
            $(".help-icon > .dropdown-menu li").css({
                'display':'none'
            }); // edited by sairam


       // $(".help-icon").hover( function(){ event.preventDefault(); return false; });
		window.onresize = function(event) {
			util.handleHeightShit();
		}

			var self = this;
			data.ensureDemoDataLoaded(function () {
				$(self.el).html(self.homeTemplate());
				self.hideModal();
				self.addSectionsView();
				self.addFullView();
				self.addSourcesAndNotesView();
				util.handleHeightShit();
			});
		},
		addSectionsView: function () {
			var sectionsView = new SectionsView({el: $('#sectionsViewContainer')});
			sectionsView.render();
		},
		addFullView: function() {
			var fullView = new FullView({ el: $('#fullViewContainer') });
			fullView.render();
		},
		addSourcesAndNotesView: function () {
			var sourcesAndNotesView = new SourcesAndNotesView({ el: $('#sourcesAndNotesContainer') });
			sourcesAndNotesView.render();
		},
		hideModal: function(e) {
			$('.modal-container').hide();
		},
		addSection: function () {
			console.log('addSection');
			data.currentProject.get('sections').sort();
			var	length = data.currentProject.get('sections').length;
			var nextOrderId = length > 0 ? data.currentProject.get('sections').at(length-1).get('orderId') + 1 : 1;
			var model = data.currentProject.get('sections').create({
				id: null,//util.generateUniqueCollectionId(data.currentProject.get('sections')),
                isBlank:true,
				title:'new section',
                templatePlaceholderText: 'Start writing here',
                sectionPlaceholderText: 'Open section to start writing',
				orderId: nextOrderId,
				sources: new SourcesCollection(),
				notes: new NotesCollection()

			}/*,{
                wait: true,
                success: function(model, resp, options) {
                    // what can I do here??
                    //console.log(options);
                    console.log("success");
                    console.log(resp);
                },
                error: function(model, resp, options) {
                    // what can I do here??
                    console.log(options);
                    console.log("error");
                    console.log(resp);
                }
            }*/);
			data.currentProject.trigger('change');
			
			util.handleHeightShit();
		},
		beforeClose: function () {
            $(".help-icon > .dropdown-menu li").css({
                'display':'block'
            });

            $(".help-icon > .dropdown-menu").css({
                'padding':'10px 7px'
            });

        }

	});
	return mainHomeView;
});