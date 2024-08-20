Ext.define('Hrd.controller.Generalparameter', {
    extend: 'Hrd.template.ControllerForMaster',
    alias: 'controller.Generalparameter',
    controllerName: 'generalparameter',
    fieldName: 'generalparameter',
    bindPrefixName: 'Generalparameter',
    
    
    init: function() {
        var me = this;
        
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        var newEvs = {};
        newEvs['generalparameterformdata button[action=switch]'] = {
            click:function(el){
                me.switchClick(el);
            }
        };
        newEvs['generalparametergrid button[action=copy]'] = {
            click:function(el){
                me.showModuleCopyList(el);
            }
        };
        this.control(newEvs);
        
    },
    showModuleCopyList:function(){
        var me = this;
        
    },
    switchClick:function(el){
        var f = el.up("form");
        var open = parseInt(el.currentOpen);
        el.currentOpen = open===1?0:1;
        f.down("#textNameGP").setVisible(open);
        f.down("#textNameGP").setDisabled(!open);
        f.down("#comboNameGP").setVisible(!open);
        f.down("#comboNameGP").setDisabled(open);
        f.down("[action=switch]").setText(open?"Choose from old data":"Create new One");
    },
    /*@return void */
    fdarInit:function(){
        var me = this;
        var f = me.getFormdata();
        me.switchClick(f.down("[action=switch]"));
        f.setLoading("Please wait...");
        Ext.Ajax.request({
            url: 'hrd/generalparameter/read',
            params:{
                mode_read:'modulelist'
            },
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
                var data = info.data;
                var moduleList = [];
                for(var x in data){
                    var str = data[x]['generalparameter']['module_name'];
                    moduleList.push({module_name:str,
                                     module_text:str});
                }
                var el = f.down("#comboNameGP");
                el.getStore().loadData(moduleList);
                var recGrid = me.getGrid().getSelectedRecord();
                if(recGrid){
                    el.setValue(recGrid.get("module_name"));
                }
                
                f.setLoading(false);

            }

        });
    }
});