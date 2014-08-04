define([
  'backbone'
], function (Backbone) {
    var model = Backbone.Model.extend({
        urlRoot: null,
        defaults: {
            id: null,
            title: '',
            description: '',
            sections: null, //backbonecollection
            type: null, //text, photo, video, link, document, audio
            data: null,
            unassigned: true,
            sectionIdAssigned: null
        },
        initialize: function () {
        },
        parse: function (resp) {
            if (resp.response === undefined) return resp;
            else return resp.response;
        },
        sync: function () {
            return false;
        },
        validate: function (attrs) {

            return null;
        }
    });
    return model;
});