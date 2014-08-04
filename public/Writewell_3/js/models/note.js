define([
  'backbone',
   'serverApiUtil'



], function (Backbone,serverapi) {

    var model = Backbone.Model.extend({
        urlRoot:  null,

        defaults: {
            id: null,
            title: '',
            text: '',
            sections: null, //backbone collection
            unassigned: true,
            sectionIdAssigned: 0
        },
        sync:function(method, model, options){
            options || (options = {});



            options.url = serverapi.getUrl()+'note/index/'+serverapi.getCurrentproject();

            if(method!='create')
              options.url = serverapi.getUrl()+'note/index/'+serverapi.getCurrentproject()+'/'+model.id;

            Backbone.sync(method, model, options);

        },
        initialize: function () {
        },
        parse: function (resp) {


            if (resp.response === undefined) return resp;
            else return resp.response;
        },

        validate: function (attrs) {

            return null;
        }
    });
    return model;
});