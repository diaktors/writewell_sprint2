define([
  'util',
  'models/project'
], function (util, Project) {
    var collection = Backbone.Collection.extend({
        model: Project,
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