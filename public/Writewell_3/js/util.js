define([
	'accounting',
	'moment',
	'jcolor'
], function (accounting, moment) {
	var util = {
		nullable: function (object, propertyName, defaultValue) {
			if (object == null || object[propertyName] == null) return defaultValue;
			else return object[propertyName];
		},
		nullableString: function (object, propertyName, preValue, postValue) {
			if (preValue === undefined) preValue = '';
			if (postValue === undefined) postValue = '';
			if (object == null || object[propertyName] == null) return '';
			else return preValue + object[propertyName] + postValue;
		},
		ifNotNull: function (test, result) {
			if (test != null) return result;
			else return '';
		},
		//options{showEmpty, showCurrency, prevText} 
		formatMoney: function (number, options) {
			if (options == null || options === undefined) options = {};

			if (number === undefined || number == null || number == '') {
				if (options.showEmpty) return '';
				else number = 0;
			}
			var prevText = options.prevText;
			if (options.prevText === undefined || options.prevText == null) prevText = '';

			if (!options.showCurrency) return prevText + accounting.formatMoney(number, '').toString();
			else return prevText + accounting.formatMoney(number).toString();
		},

		isChecked: function (test) {
			if (test) return "checked=checked";
			else return "";
		},
		getNumber: function (text) {
			if (text === undefined || text == null) return null;
			if ((text + '').trim() == '') return null;
			else return parseFloat(text);
		},
		animateForUpdate: function (target, options) {
			var originalStyle = target.attr('style') ? target.attr('style') : null;
			var options = options || {};
			if (options.auto) {
				options.targetBackgroundColor = options.targetBackgroundColor || 'green';
				options.targetFontColor = options.targetFontColor || 'white';
				options.originalBackgroundColor = options.originalBackgroundColor || this.rgbToHex(target.css('background-color'));
				options.originalFontColor = options.originalFontColor || 'black';
			} else {
				options.targetBackgroundColor = options.targetBackgroundColor;
				options.targetFontColor = options.targetFontColor;
				options.originalBackgroundColor = options.originalBackgroundColor || this.rgbToHex(target.css('background-color'));
				options.originalFontColor = options.originalFontColor;
			}
			var cellOriginalStyle;
			if (options.checkCellStyle) {
				var cells = target.children('td');
				cellOriginalStyle = cells.attr('style') ? cells.attr('style') : null; //= this.rgbToHex(target.children('td').eq(0).css('background-color'));
				cells.css('background-color', 'inherit');
			}


			options.targetSpeedMs = options.targetSpeedMs || 300;
			options.restoreSpeedMs = options.restoreSpeedMs || 700;
			if (options.pauseSpeedMs != 0) {
				options.pauseSpeedMs = options.pauseSpeedMs || 300;
			}
			target.animate({
				backgroundColor: options.targetBackgroundColor,
				color: options.targetFontColor
			}, {
				duration: options.targetSpeedMs,
				complete: function () {
					var afterTimeOut = function () {
						target.animate({
							backgroundColor: options.originalBackgroundColor,
							color: options.originalFontColor
						}, {
							duration: options.restoreSpeedMs,
							complete: function () {
								if (options.checkCellStyle) {
									target.children('td').attr('style', cellOriginalStyle);
									target.attr('style', originalStyle);
								}
								if (options.callback) options.callback();
							}
						});
					};
					if (options.pauseSpeedMs > 0) {
						setTimeout(afterTimeOut, options.pauseSpeedMs);
					} else {
						afterTimeOut();
					}
				}
			});
		},
		animateForSave: function (target, callback, options) {
			var settings = {
				targetBackgroundColor: '#B2D1B2',
				callback: callback
			};
			jQuery.extend(settings, options);
			if (settings.auto === undefined) {
				settings.auto = true;
			}
			this.animateForUpdate(target, settings);
		},
		animateForDelete: function (target, callback, options) {
			var settings = {
				targetBackgroundColor: 'pink',
				targetSpeedMs: 300,
				callback: callback
			};
			jQuery.extend(settings, options);
			if (settings.auto === undefined) {
				settings.auto = true;
			}
			this.animateForUpdate(target, settings);
		},
		animateForFail: function (target, callback, options) {
			var settings = {
				targetBackgroundColor: 'red',
				targetSpeedMs: 400,
				restoreSpeedMs: 600,
				callback: callback
			};
			jQuery.extend(settings, options);
			if (settings.auto === undefined) {
				settings.auto = true;
			}
			this.animateForUpdate(target, settings);
		},
		animateRemoveFromList: function (target, callback) {
			target.css('background-color', 'pink');
			target.fadeOut(500, 'linear', function () {
				target.css('visibility', 'hidden');
				target.show();
				target.slideUp(300, 'linear', function () {
					target.remove();
					if (callback) callback();
				});
			});
		},
		animateOpenClose: function (targetContainer, message, callback) {
			var container = targetContainer;
			container.fadeOut(250, 'linear', function () {
				container.css('visibility', 'hidden');
				container.show();
				container.slideUp(150, 'linear', function () {
					container.html('');
					container.css('visibility', 'visible');
					container.html(message);
					container.addClass('alert alert-success');
					container.slideDown(250, 'linear', function () {
						setTimeout(function () {
							container.slideUp(300, 'linear', function () {
								container.removeClass('alert alert-success');
								targetContainer.html('');
								if (callback) callback();
							});
						}, 400);
					});
				});
			});
		},
		rgbToHex: function (rgb) {
			//var rgb = $(this).css('background-color');
			if (!rgb) {
				return null; //default color
			}
			var hex_rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

			function hex(x) {
				return ("0" + parseInt(x).toString(16)).slice(-2);
			}
			if (hex_rgb) {
				return "#" + hex(hex_rgb[1]) + hex(hex_rgb[2]) + hex(hex_rgb[3]);
			} else {
				return rgb;
			}
		},
		toISO8601: function (datetime) {
			return moment(datetime).toISOString();
		},
		sumCollectionAttribute: function (collection, attribute, money) {
			var self = this;
			var total = 0;
			collection.each(function (item) {
				var value = self.attributeDrillDown(item, attribute);
				total += parseFloat(value);
			});
			if (money) return util.formatMoney(total);
			else return total;
		},
		averageCollectionAttribute: function (collection, attribute, money) {
			var total = this.sumCollectionAttribute(collection, attribute);
			var avg = total / collection.length;

			if (money) return util.formatMoney(avg);
			else return avg;
		},
		countUniqueAttribute: function (collection, attribute) {
			var toUnique = _.uniq(collection.pluck(attribute));

			return (this.countUniqueList(toUnique));
		},
		countUniqueList: function (list) {
			var toUnique = _.uniq(list);

			var nullPresent = _.contains(toUnique, null);

			if (nullPresent) return toUnique.length - 1;
			else return toUnique.length;
		},
		sortCollectionByAttribute: function (collection, attribute, reverse) {
			var self = this;
			collection.comparator = function (model1, model2) {
				return self.modelComparator(model1, model2, attribute, reverse);
			};

			collection.sort({
				silent: true
			});
		},
		sortArrayByAttribute: function (array, attribute, reverse) {
			var self = this;
			array.sort(function (model1, model2) {
				return self.modelComparator(model1, model2, attribute, reverse);
			});
		},
		attributeDrillDown: function (model, attribute) {
			var attributes = attribute.split('.');
			var attr = model;
			if (model.toJSON) attr = model.toJSON();
			//drills down any attribute depth
			if (attributes.length > 0) {
				for (var x = 0; x < attributes.length; x++) {
					if (attr.toJSON) attr = attr.toJSON();
					attr = attr[attributes[x]];
				}
			}
			return attr;
		},
		modelComparator: function (model1, model2, attribute, reverse) {
			var a = this.attributeDrillDown(model1, attribute);
			var b = this.attributeDrillDown(model2, attribute);

			function is_string(input) {
				return typeof (input) == 'string';
			}

			if (is_string(a) && is_string(b)) {
				a = a.toLowerCase();
				b = b.toLowerCase();
			} else if (b == null) {
				b = 'a';
			} else if (a == null) {
				a = 'a';
			} else if (a == null && b == null) {
				b = 'a';
				a = 'a';
			}

			function comp() {
				if (a > b) return 1;
				else if (a < b) return -1;
				else return 0;
			}

			if (reverse) {
				return -comp();
			} else return comp();
		},
		filterCollectionByAttribute: function (collection, attribute, val) {
			var filteredArray = [];
			collection.each(function (model) {
				var attr = model.get(attribute); //ie size list
				var valPresent;
				if (attr instanceof Array) {
					valPresent = _.find(attr, function (value) {
						return val == value;
					});
				} else {
					if (attr == val) valPresent = true;
				}
				if (valPresent !== undefined) filteredArray.push(model);
			});
			return new Backbone.Collection(filteredArray); //handle zero case?
		},
		today: function () {
			var today = new Date();

			return moment(today).format('YYYY-MM-DD');
		},
		changeDateBy: function (date, days) {
			//this.dateFormat(date);
			return moment(date).add('days', days).format('YYYY-MM-DD');
		},
		plusOneDay: function (date) {
			return this.changeDateBy(date, 1);
		},
		minusOneDay: function (date) {
			return this.changeDateBy(date, -1);
		},
		daysDifference: function (currentDate, newDate) {
			var momentCurrentDate = moment(currentDate, 'YYYY-MM-DD');
			var momentNewDate = moment(newDate, 'YYYY-MM-DD');

			return momentNewDate.diff(momentCurrentDate, 'days');
		},
		_dateTimeFormat: function (time, format, add, interval) {
			add = typeof add !== 'undefined' ? add : 0;
			interval = typeof interval !== 'undefined' ? interval : 'days';
			return moment(time).add(interval, add).format(format);
		},
		shortDateTimeFormat: function (time, add, interval) {
			return this._dateTimeFormat(time, 'MM/DD/YYYY h:mm A', add, interval);
		},
		shortDateTimeFormatSeconds: function (time, add, interval) {
			return this._dateTimeFormat(time, 'MM/DD/YYYY h:mm:ss A', add, interval);
		},
		shortTimeFormat: function (time, add, interval) {
			return this._dateTimeFormat(time, 'h:mm A', add, interval);
		},
		dayDateFormat: function (time, add, interval) {
			return this._dateTimeFormat(time, 'dddd, MM/DD/YYYY', add, interval);
		},
		dateFormat: function (time, add, interval) {
			return this._dateTimeFormat(time, 'MM/DD/YYYY', add, interval);
		},
		longDateTimeFormat: function (time, add, interval) {
			return this._dateTimeFormat(time, 'dddd, MMMM Do YYYY, h:mm A', add, interval);
		},
		longDateFormat: function (time, add, interval) {
			return this._dateTimeFormat(time, 'dddd, MMMM Do, YYYY', add, interval);
		},
		removeClickLock: function (target) {
			target.removeClass('disabled');
			target.css('pointer-events', 'all')
		},
		addClickLock: function (target) {
			target.addClass('disabled');
			target.css('pointer-events', 'none')
		},
		makeUnselectable: function(selector) {
			$target = $(selector);
			$target
				.addClass('unselectable') // All these attributes are inheritable
			.attr('unselectable', 'on') // For IE9 - This property is not inherited, needs to be placed onto everything
			.attr('draggable', 'false') // For moz and webkit, although Firefox 16 ignores this when -moz-user-select: none; is set, it's like these properties are mutually exclusive, seems to be a bug.
			.on('dragstart', function () {
				return false;
			}); // Needed since Firefox 16 seems to ingore the 'draggable' attribute we just applied above when '-moz-user-select: none' is applied to the CSS 

			$target // Apply non-inheritable properties to the child elements
			.find('*')
				.attr('draggable', 'false')
				.attr('unselectable', 'on');
		},
		generateUniqueCollectionId: function (collection) {
			for (var x = 1; x <= collection.length + 1; x++) {
				if (collection.get(x) === undefined) {
					return x; //returns unused "id"
				}
			}
		},
		getRandomColorString: function () {
			var colors = ['green','blue','pink','orange', 'yellow'];
			var rand = parseInt((Math.random() * 10));
			rand += parseInt(moment().milliseconds());
			rand %= colors.length;
			var color = colors[rand];
			//console.log('color: ' +color);
			return color;
		},
		getColorStringForIndex: function (index) {
			if (!index) index = 0;
			var colors = ['green','blue','pink','orange', 'yellow'];
			index %= colors.length;
			var color = colors[index];
			//console.log('color: ' +color);
			return color;
		},
		countText: function (text) {
			  function _decode (string) {
			    var output = [],
			        counter = 0,
			        length = string.length,
			        value, extra;
			    while (counter < length) {
			      value = string.charCodeAt(counter++);
			      if ((value & 0xF800) == 0xD800 && counter < length) {
			        // High surrogate, and there is a next character.
			        extra = string.charCodeAt(counter++);
			        if ((extra & 0xFC00) == 0xDC00) {
			          // Low surrogate.
			          output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
			        } else {
			          output.push(value, extra);
			        }
			      } else {
			        output.push(value);
			      }
			    }
			    return output;
			  }


		    var trimmed = text.trim();
		    return {
		      paragraphs: trimmed ? (trimmed.match(/\n+/g) || []).length + 1 : 0,
		      words: trimmed ? (trimmed.replace(/['";:,.?¿\-!¡]+/g, '').match(/\S+/g) || []).length : 0,
		      characters: trimmed ? _decode(trimmed.replace(/\s/g, '')).length : 0,
		      all: _decode(text).length
		    }
		},
		handleHeightShit: function () {	
			var height = $(window).height() - 200;
			if ($('#sectionsViewContainer').hasClass('down')) {
				$('#sectionsViewContainer').css('height', height);
				$('#fullViewContainer').css('height', 32);
			} else {
				$('#sectionsViewContainer').removeAttr('style');
				 var otherH = $('#fullViewMain').height() + 110;
				 height = Math.max(height, otherH);
				$('#fullViewContainer').css('height', height + 40);
			}

			//adjust sources/notes view
			height = $(window).height() - 200;
			height = Math.max(height, 400);
			$('#sourcesAndNotesContainer').height(height + 12);
			$('#sourcesInner').height(height-148);
			$('#notesInner').height(height-148);

			//adjust edit section modal
			var top = 160;
			var modelHeight = Math.max(450, (height - top - 20));
			$('.sectionViewBoxContainer').height(modelHeight);
			$('.modal .sectionViewBoxFooter').css('top',modelHeight + top -60);
		}
	};
	return util;
});
String.prototype.capitalize = function () {
	return this[0].toUpperCase() + this.slice(1); //use charAt(0) if worried about < ie8
}