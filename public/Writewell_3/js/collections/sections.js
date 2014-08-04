define([
  'util',
  'models/section',
    'serverApiUtil'
], function (util, Section,serverapi) {
    var collection = Backbone.Collection.extend({
        model: Section,
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