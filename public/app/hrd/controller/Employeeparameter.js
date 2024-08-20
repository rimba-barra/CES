Ext.define('Hrd.controller.Employeeparameter', {
    extend: 'Hrd.library.box.controller.template.Parameters',
    alias: 'controller.Employeeparameter',
    views: [],
    controllerName: 'employeeparameter',
    formWidth: 400,
    refs: [
        {
            ref:'panel',
            selector:'employeeparameterpanel'
        }
    ],
    bindPrefixName: 'Employeeparameter',
    sizew:{w:500,h:500},
    paramList:null,
    init: function() {
        this.callParent(arguments);
        var me = this;
        var newEvents = {};
        newEvents['#formEmployeeparameterID [name=status]'] = {
            change:function(el,newVal){
                me.statusOnChange(el);
            }
        };
        this.control(newEvents);


    },
    statusOnChange:function(el){
         var me = this;
         var form = me.getPanel().down("form");
         var vs = form.getValues();
        var status = vs["status"];
       
        me.fillForm(form,status);
    },
    pafCallback: function(recs,form) {
        var me = this;
        var vs = form.getValues();
        var status = vs["status"];
        if (recs) {
            me.paramList = recs;
            me.fillForm(form,status);
        }
    },
    fillForm:function(form,status){
        var me = this;
        var recs = me.paramList;
        
        
        if (recs && typeof status==="string") {
            var vs = form.getValues();
            for(var i in vs){
                if(i !=="status"){
                    form.down("[name="+i+"]").setValue("");
                }
            }
            form.down("[name=status]");
       
           // form.down("#statusEmployee").down("[inputValue="+status+"]").checked = true;
            for (var i in recs) {
                var name = recs[i]['generalparameter']['name'];
                name = name.replace(status+"_","");
                
                var el = form.down("[name=" + name + "]");
                if (el) {
                    el.setValue(recs[i]['generalparameter']['value']);
                }
            }
        }
    },
    saveCallback: function(data) {
        var me = this;
        var x = {
            success: function() {
               me.crudh.run('CANCEL');
            }
        };
        return x;
    },

});