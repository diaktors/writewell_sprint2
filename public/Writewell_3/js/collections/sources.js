define([
  'util',
  'models/source'
], function (util, Source) {
    var collection = Backbone.Collection.extend({
        model: Source,
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