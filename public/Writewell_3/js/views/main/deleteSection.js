define([
	'backbone',
	'data',
	'shared',
	'util',
	'text!templates/main/deleteSection.htm',
], function (Backbone, data, shared, util, txtTemplate) {
	var view = Backbone.View.extend({
		initialize: function (options) {
            console.log(options);
			this.template = _.template(txtTemplate);
            this.model = options.model;
            this.li = options.li;
		},
		events: {	
			'click .deleteProjectBtn': 'deleteProject',
			'click .closeBtn':'close'
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
		deleteProject: function () {
			console.log('deleteSection')
            var e = this.li;
            $(e.currentTarget).closest('li').remove();


            for (var i = this.model.get('sources').length - 1; i >= 0; i--) {
                var source = this.model.get('sources').at(i);
                data.handleCollectionRemoveFromSection('sources', self.model.id, source);
            }

            for (var i = this.model.get('notes').length - 1; i >= 0; i--) {
                var note = this.model.get('notes').at(i);
                data.handleCollectionRemoveFromSection('notes', self.model.id, note);
            }

            this.model.destroy();
			console.log('remove section');
            this.close();
		},
 		close: function () {
 			shared.closeModal(this);
 		}
	});
	return view;
});