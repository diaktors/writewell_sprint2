 define([
'data',
'shared'
], function (data,shared) { //MenuCollection example

    var serverUtils={
        env: "local",

        getstatus : function(result)
        {
            if(result.status==1)
            {

                shared.router.navigate('projects',true);
            }
            else
            {
                alert(result.msg);
            }

        },
        getUrl: function () {
            if(this.env=="local")
                return "http://localhost/writewell/public/"
            else if(this.env=="test")
                return "http://ec2-54-204-117-51.compute-1.amazonaws.com/"
        },
        getCurrentproject: function () {

            if(data){return data.currentProject.id};
            return 1;
        },
        googleSignin: function(successcb,errorcb){
            Backbone.ajax(
                {url:this.getUrl()+"signin/createauthurl",
                    success:function(data, textStatus, response){

                                     successcb($.parseJSON(data).result.authurl);
                       /* window.location.href = $.parseJSON(data).result.authurl;*/
                        //alert($.parseJSON(result).authurl);
                    },
                    error:function(error)
                    {
                         errorcb("error:Getting url failed");

                    }
                });

        },
        signIn: function (details,successcb,errorcb) {


            Backbone.ajax({
                type: "POST",
                url: this.getUrl()+"signin/checklogin",
                data: JSON.stringify(details),
                success: function( result ) {
                    successcb(result);


                },
                error:function(){
                    errorcb('error :signin failed');
                },
                dataType: 'json'
            });

        },

        joinUser: function (details,success,error) {

            Backbone.ajax({
                type: "POST",
                url: this.getUrl()+"signup/index",
                data: JSON.stringify(details),
                success: function(result){
                    var user = JSON.parse(result);
                    if(user.status==1)
                    {
                        success(user.result);
                        //shared.router.navigate('projects',true);
                    }
                    else
                    {
                        error(user.message);
                        console.log($.parseJSON(result).msg);
                    }

                },
                error: function(error){ console.log('error :signup failed');}
            });



        },
        addsource:function(form,callback,title,type){
            Backbone.ajax( {
                url: this.getUrl()+'source/',
                type: 'POST',
                data: form,
                success: function(result){
                    callback(title,type);// console.log(result);
                },
                error:function(error){
                    console.log("error: source  upload failed");
                },
                processData: false,
                contentType: false
            } );
        },
        export:function(id,type){
            Backbone.ajax( {
                url: this.getUrl()+'createdoc/export?project_id='+id+'&type='+type,
                type: 'GET',
                success: function(result){
                    window.location.href = $.parseJSON(result).result;
                },
                error:function(error){
                    console.log("error: source not uploaded");
                }
            } );
        },
        save:function(id){
            Backbone.ajax( {
                url: this.getUrl()+'createdoc/save?project_id='+id,
                type: 'GET',
                success: function(result){
                    if($.parseJSON(result).status){
                        console.log("save success");
                    }
                },
                error:function(error){
                    console.log("error: save failed");
                }
            } );
        },
        createProject : function(project,success,error){
            Backbone.ajax( {
                url: this.getUrl()+'project?user_id='+170,
                data:JSON.stringify(project),
                type: 'POST',
                success: function(result){
                     result=$.parseJSON(result);
                    if(result.status==1)
                      success(result.result);
                    else
                      error(result.message)
                },
                error:function(error){
                    error(error.message)
                    console.log("error: save failed");
                }
            } );
        },
        createNote : function(note,success,error){
            Backbone.ajax( {
                url: this.getUrl()+'note?project_id='+data.currentProject.id,
                data:JSON.stringify(note),
                type: 'POST',
                success: function(result){
                    //alert(result.result);
                    success();
                },
                error:function(error){alert(error.message)
                    console.log("error: save failed");
                }
            } );
        }
    }
   return serverUtils;
});