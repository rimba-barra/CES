Ext.define('Hrd.library.box.tools.Minic', {
    formAlias:null,
    control:{},
    refs:[],
    controllerName:'', /// string
    constructor: function(options) {
        Ext.apply(this, options || {});
    },
    getController:function(){
        return _Apps.getController(this.controllerName);
    },
    controls:function(){
        var me = this;
        var control = {};
        return control;
    },
    getControl:function(){
        var newEvs = {};
        var me = this;
        if (me.formAlias) {
           
            newEvs[me.formAlias] = {
                afterrender:function(){
                    me.fdar();
                }
            };
            newEvs[me.formAlias+' button[action=save]'] = {
                click:function(){
                    me.mainDataSave();
                }
            };
        }
        var controls = me.controls();
        
        for(var i in controls){
            
            newEvs[i] = controls[i];
        }
        return newEvs;
    },
    init: function(controller) {
        var me = this;
      //  me._attachControl(controller);
    },
    fdar:function(){
        var me = this;
        
       
    },
    mainDataSave:function(){
        
    },
    getValidDateRange:function(startDate,endDate){
       
        
        var arDate = [];
        
        if(!startDate || !endDate){
            return arDate;
        }
       
        var sd = isNaN(parseInt(startDate.getDate()))?0:startDate.getDate();
        var ed = isNaN(parseInt(endDate.getDate()))?0:endDate.getDate();
        if ((sd <=ed) && (sd >= 1 && ed >= 1) ){
            for(var i=sd;i<=ed;i++){
                arDate.push(i);
            }    
        }
        return arDate;
    },
    // added 25 Juni 2014
    insSave:function(params){
        var f  = params.form;
        
        /* main grid for get proxy create url like
         * => 'hrd/absentrecord/create'
         * */
        var mainGrid = params.mainGrid; 
        var urlCreate = mainGrid.getStore().getProxy().api.create;
       var data = params.finalData(f.getValues());
       var paramsAjax = {
            mode_create: params.modeCreate,
            data: data,
           
        };
        f.setLoading("Please wait.... saving your data");
        
        Ext.Ajax.request({
            url: urlCreate,
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
                
                if (info.msg === "SUCCESS") {
                    if(typeof params.success==="function"){
                        params.success();
                    }
                    f.up("window").close();
                    
                }else{
                    Ext.Msg.alert('Status', info.msg);
                }
                f.setLoading(false);

            },
            params: {data: Ext.encode(paramsAjax)}

        });
    }
  
});