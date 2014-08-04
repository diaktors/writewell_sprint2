define([
    'backbone',
    'data',
    'shared',
    'util',
    'moment',
    'text!templates/projects/createProject.htm',
    'serverApiUtil'
], function (Backbone, data, shared, util, moment, txtTemplate, serverAPI) {
    var view = Backbone.View.extend({
        initialize: function (options) {
            this.template = _.template(txtTemplate);
            this.utils = serverAPI;
        },
        events: {
            'click #createProjectBtn': 'createProject',
            'click .closeBtn': 'close',
            'click .templateDropdown': 'setTemplate'
        },
        render: function (e) {
            var self = this;
            //ensure any needed data is loaded...
            self.doRender();
        },
        doRender: function () {

            this.$el.html(this.template({templates: data.templates }));

            return this;
        },
        selectedTemplateId: 0,
        setTemplate: function (e) {
            this.selectedTemplateId = $(e.currentTarget).attr('value');
            console.log('template id: ' + this.selectedTemplateId);
            $('#templatePlaceholder').html($(e.currentTarget).html());
        },
        createProject: function () {
            //TODO get template id
            var template = data.templates.get(this.selectedTemplateId).clone();
            var title = $('#projectTitle').val();
            if (title.length === 0) title = template.get('title');
            var id = data.projects.length + 1;
            template.set({ id: id, title: title, createdAt: moment() }); //increment
            data.projects.add(template);
            console.log('template added to projects');
            this.close();

            console.log('selectThisProject');
            data.currentProject = data.projects.get(id);
            if (this.selectedTemplateId == 1) {
                data.currentProject.isBlank = true;
            }

            this.utils.createProject({ title: title }, function (result) {
                template.id=result.id;
                console.log(template);
                $('.nav-links li').removeClass('active');
                shared.router.navigate('home', true);
            }, function (error) {
                  console.log(error);
            });


        },
        close: function () {
            shared.closeModal(this);
        }
    });
    return view;
});