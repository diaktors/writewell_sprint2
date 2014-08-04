define([
	'backbone',
	'text!templates/footer.htm'
], function (Backbone, footerTemplate) {
	var view = Backbone.View.extend({
		initialize: function () {
			this.footerTemplate = _.template(footerTemplate);
		},
		events: {
			//'.merged input  
		},
		render: function () {
			$(this.el).html(this.footerTemplate());

			//apply after adding to screen
			$(".merged input").on("focus blur", function () {
				$(this).prev().toggleClass("focusedInput")
			});
		}
	});
	return view;
});