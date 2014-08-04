define([
  'util',
  'models/template'
], function (util, Template) {
    var collection = Backbone.Collection.extend({
        model: Template,
        url: null,
        initialize: function (options) {
            //this.start = options.start;
        },
        parse: function (resp) {
            return resp.response;
        }
    });
    return collection;
});