define([
	'backbone',
	'shared',
	'data',
	'text!templates/projects/projects.htm',
	'text!templates/projects/createNewProjectBox.htm',
	'views/projects/projectBox',
	'views/projects/createProject'
], function (Backbone, shared, data, txtTemplate, txtCreateNewProjectBoxTemplate, ProjectBox, CreateProject, DeleteProject) {
	var mainHomeView = Backbone.View.extend({
		initialize: function () {
			this.template = _.template(txtTemplate);
			this.createNewProjectBoxTemplate = _.template(txtCreateNewProjectBoxTemplate);
		},
		events: {
			'click div[project-id="newProject"]': 'promptCreateNewProject'
		},
		render: function () {
			var self = this;
			data.ensureDemoDataLoaded(function () {
				self.doRender();
			});
		},
		bindProjectsToUpdate: function () {
			var self = this;
			this.listenTo(data.projects,'add remove', function () {
				console.log('add or remove project post trigger');
				self.updateProjects();
			});
		},
		doRender: function () {
			this.$el.html(this.template());
			this.updateProjects();
			this.bindProjectsToUpdate();
		},
		updateProjects: function () {
			$('#projectsContainer').html('');
			//loop through projects
			data.projects.each( function (project) {
				var container = '<div project-id=' + project.id + ' class="project-box"></div>';
				$('#projectsContainer').append(container);
				var el = 'div[project-id="' + project.id + '"]';
				var projectBox = new ProjectBox({ el: $(el), model: project });
				projectBox.render();
			});

			var clearfix = '<div class="clear-fix"></div>';
			this.addCreateNewProjectBox();
			$('#projectsContainer').append(clearfix);
		},
		addCreateNewProjectBox: function () {
			console.log('addCreateNewProjectBox');
			var container = '<div project-id="newProject" class="project-box project-new"></div>';
			$('#projectsContainer').append(container);
			var el = 'div[project-id="newProject"]';
			$(el).append(this.createNewProjectBoxTemplate());
		},
		promptCreateNewProject: function () {
			console.log('clicked promptCreateNewProject');
			var container = '<div id="createProjectContainer" class="modal"></div>';
			$('.modal-container').html(container);
			var createProject = new CreateProject({el :$('#createProjectContainer'), model: null});
			createProject.render();

			$('.modal-container').show();
			$('body').addClass('modal-open');
		}
	});
	return mainHomeView;
});