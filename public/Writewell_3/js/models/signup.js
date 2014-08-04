define([
    'backbone'
], function (Backbone) {
    var model = Backbone.Model.extend({
        urlRoot: null,
        defaults: {
            id: null,
            name: '',
            email:'',
            password: '',
            age: '', //backbone collection
           gender: '',
            occupation: ''
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

        validate: function (attrs,options) {
            var errors = [];

            if (!attrs.email) {
                errors.push({name: 'email', message: 'Please fill email .'});
            }
            if (!attrs.name) {
                errors.push({name: 'name', message: 'Please fill name.'});
            }
            if (!attrs.password) {
                errors.push({name: 'password', message: 'Please fill password.'});
            }


            return errors.length > 0 ? errors : false;

        }
    });
    return model;
});/**
 * Created by lenovo on 22/7/14.
 */
