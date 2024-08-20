Ext.define('Hrd.controller.Overtimevp', {
    extend: 'Hrd.library.box.controller.template.Masterdata',
    alias: 'controller.Overtimevp',
    views: [],
    controllerName: 'overtimevp',
    formWidth: 400,
    refs: [
        {
            ref:'panel',
            selector:'overtimevppanel'
        }
    ],
    bindPrefixName: 'Overtimevp',
    sizew:{w:500,h:500},
    paramList:null,
    init: function() {
        this.callParent(arguments);
        var me = this;
        var newEvents = {};
        newEvents['#formOvertimevpID [name=status]'] = {
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
    pafCallback: function() {
        var me = this;
        var form = me.getFormdata();
        /* loading components */
        var p = me.getPanel();
        p.setLoading();
        me.tools.ajax({
            params: {},
            success: function(data, model) {
               // me.pafCallback(recs,f);
              // me.tools.wesea(data.group, form.down("[name=group_group_id]")).comboBox();
               me.gridLoad();

            }
        }).read('detail');
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
    }

});