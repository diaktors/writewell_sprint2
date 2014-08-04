define(function() {
	var shared = {
		router: null, //init on setup of router
		// promptModal: function (container, view) {
		// 	console.log('promptModal');
		// 	$('.modal-container').html(container);
		// 	view.render();
		// 	$('.modal-container').show();
		// 	$('body').addClass('modal-open');
		// }
 		closeModal: function (view) {
 			$('.modal-container').hide();
			$('body').removeClass('modal-open');
	 		view.unbind();
			view.undelegateEvents();
			view.remove();
 		}
	};

	return shared;
});