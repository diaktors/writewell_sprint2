define([
	'backbone',
	'data',
	'shared',
	'util',
	'text!templates/main/sectionViewBox.htm',
	'views/modals/sectionEditModal',
    'views/main/deleteSection'
], function (Backbone, data, shared, util, txtTemplate, SectionEditModal,DeleteSection) {
	var view = Backbone.View.extend({
		initialize: function (options) {
			this.template = _.template(txtTemplate);
		},
		events: {
			'keyup .sectionTextArea': 'updateSection',	
			'dragenter .sectionViewBoxContainer': 'preventDefault',
			'dragover .sectionViewBoxContainer': 'preventDefault',
			'drop .sectionViewBoxContainer': 'dropped',
			'click .disabledTextArea': 'expandToEditSeciton',//Changed by Pavan. Modified the class .expand to .disabledTextArea
            //'click .delete': 'deleteSection',
            'click .delete': 'promptProjectDelete'
		},
		render: function (e) {
			var self = this;
			//ensure any needed data is loaded...
			self.doRender();
		},
		bindModelToUpdateView: function () {
			console.log('bindModelToUpdateView');
			var self = this;
			this.listenTo(this.model, 'all', function() {
				data.currentProject.trigger('change');
				self.updateSectionOrderId();
				self.updateSection();
			});
		},
		firstIter: true,
		doRender: function () {
            var placeholder;
            if(data.currentProject.id == 1 || this.model.get('isBlank') || data.currentProject.isBlank){
                placeholder = this.model.get('sectionPlaceholderText');
            }else{
                placeholder = this.model.get('templatePlaceholderText');
            }

			this.$el.html(this.template({ 	id: this.model.id, 
											color: this.model.get('color'),
											placeholder: placeholder,
											footerNumber: this.model.get('orderId'),
											sectionTitle: this.model.get('title')}));

			this.updateSection();	
			this.bindModelToUpdateView();
			return this;
		},
		dropped: function (e) {
			var id = e.originalEvent.dataTransfer.getData('id');
			var type = e.originalEvent.dataTransfer.getData('type');
			var newAdd = true;
			this.model.get(type).each(function (sourceOrNote){
				if (sourceOrNote.id == id) {
					newAdd = false;
				}
			})

			if (newAdd) {
				data.handleCollectionAdd(type, id, this.model);	
			}
		},
		updateSectionWordCount: function (text) {
			var $footer = this.$el.find('.sectionViewBoxFooterWordCount');
			
			//update model
			var count = util.countText(text);
			this.model.set({ count: count });
			$footer.html( count.words + ' words');
		},
		updateSection: function (e) {
			var $text = this.$el.find('.sectionTextArea')
			var $title = this.$el.find('.sectionViewBoxFooterSectionTitle');
			if (!e) {
				text = this.model.get('text');
				$text.html(text);
			} else {
				text = $(e.target).val();
			}

			var title = this.model.get('title');
			this.model.set({ text: text, title:title });
			$title.html(title);
			$text.html(text);

			this.updateSectionWordCount(text);
		},
		updateSectionOrderId: function () {
			var $orderId = this.$el.find('.sectionViewBoxFooterNumber');
			var orderId = this.model.get('orderId');
			$orderId.html(orderId);
		},
		expandToEditSeciton: function (e) {
			var container = '<div id="editSection"></div>';
			$('.modal-container').html(container);console.log(this.model)
			var sectionEditModal = new SectionEditModal({el:$('#editSection'), model:this.model});
			sectionEditModal.render();
			var font = this.$el.find('.canChangeFormatting').attr('font');
			$('#editSection').find('.canChangeFormatting').attr('font',font);
			$('.modal-container').show();
			$('body').addClass('modal-open');

			$('#formatBar').addClass('section-edit-modal-open');
            $('#formatBar').show();
		},
		deleteSection: function (e) {
			var self = this;
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
			this.close();
		},
		preventDefault: function (e) {
			e.preventDefault();
		},
 		beforeClose: function () {
 		},
        promptProjectDelete: function (e) {
            console.log('clicked promptProjectSection');
            var container = '<div id="deleteProjectContainer"></div>';
            $('.modal-container').html(container);
            var deleteSection = new DeleteSection({el :$('#deleteProjectContainer'), model: this.model,li : e});
            deleteSection.render();

            $('.modal-container').show();
            $('body').addClass('modal-open');
        }

	});
	return view;
});