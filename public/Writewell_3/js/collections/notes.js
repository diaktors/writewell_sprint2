define([
  'util',
  'models/note'
], function (util, Note) {
    var collection = Backbone.Collection.extend({
        model: Note,
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