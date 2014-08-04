define([
	'backbone',
	'data',
	'shared',
	'util',
	'text!templates/modals/sectionEditModal.htm',
], function (Backbone, data, shared, util, txtTemplate) {
	var view = Backbone.View.extend({
		initialize: function (options) {
			this.template = _.template(txtTemplate);
		},
		events: {
			'keyup .sectionTextArea': 'updateSectionWordCount',	
			'click .expand': 'expandToEditSeciton',
			'click .closeBtn':'close',
			'keyup .sectionViewBoxFooterSectionTitle':'saveSectionTitle'
		},
		render: function (e) {
			var self = this;
			//ensure any needed data is loaded...
			self.doRender();
		},
		doRender: function () {
			this.$el.html(this.template({ 	id: this.model.id, 
											color: this.model.get('color'),
											placeholder: this.model.get('templatePlaceholderText'),
											footerNumber: this.model.get('orderId'),
											sectionTitle: this.model.get('title')}));
			this.updateSectionWordCount();
			util.handleHeightShit();

			return this;
		},
		updateSectionWordCount: function (e) {
			$text = this.$el.find('.sectionTextArea')
			var text, target;
			if (!e) {
				target = $text[0];
				text = this.model.get('text');
				$text.html(text);
			} else {
				target = e.target;
				text = $(e.target).val();
			}
			var self = this;
			var $footer = this.$el.find('.sectionViewBoxFooterWordCount');
			var $title = this.$el.find('.sectionViewBoxFooterSectionTitle');
			
			var count = util.countText(text);
			$footer.html( count.words + ' words');

			$text.html(text);
		},
		saveWordCount: function () {
			$text = this.$el.find('.sectionTextArea');
			var text = $text.val();
			
			var count = util.countText(text);
			this.model.set({ count: count, text: text});
		},
		saveSectionTitle: function (e) {
			var title = $(e.currentTarget).val();
			this.model.set({title:title});
			console.log('section title: ' + title);
		},
 		close: function () {
 			this.saveWordCount();
            this.model.save();
			$('#formatBar').removeClass('section-edit-modal-open');
 			shared.closeModal(this);
 		}
	});
	return view;
});