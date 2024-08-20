Ext.define('Hrd.controller.Overtimevariables', {
    extend: 'Hrd.template.ControllerJustPanel',
    alias: 'controller.Overtimevariables',
    controllerName: 'overtimevariables',
    fieldName: 'name',
    bindPrefixName: 'Overtimevariables',
    refs: [
        {
            ref: 'panel',
            selector: 'overtimevariablespanel'
        }
    ],
    tools:null,
    localStore:{
        variables:null
    },
    init: function() {
        this.callParent(arguments);
        var me = this;
        me.myConfig = new Hrd.library.box.Config();
        me.tools = new Hrd.library.box.tools.Tools({config:me.myConfig});
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.timeInput('overtimevariablespanel',me.tools.inputHoursObjects('after')));
        var newEvs = {};

        //lookup_employee
       /* newEvs['sanctionformdata button[action=lookup_employee]'] = {
            click: function() {
                me.lookupEmployee();
            }

        };
        */
       newEvs['overtimevariablespanel button[action=save]'] = {
            click: function(el) {
                me.mainSave(el);
            }

        };
        this.control(newEvs);

    },
    mainSave:function(el){
        var me = this;
        var f= el.up("form");
        var s = me.localStore["variables"];
        s.loadData([],false);
        me.tools.insSave({
            form:f,
            modeCreate:'updatevariable',
            urlCreate:'hrd/overtimevariables/create',
            finalData:function(data){
               
                data["test_data"] = 2424;
                return data;
            },
            success:function(){
                //me.getController().getGrid().getStore().loadPage(1);
            }
        });
    },
    panelAfterRender: function(el) {
         el.up("window").setWidth(600);
         el.setLoading("Please wait...");
         var me = this;
         me.localStore.variables = me.instantStore({
            id: me.controllerName + 'VariablesStore',
            extraParams: {
                mode_read: 'all'
            },
            idProperty: 'generalparameter_id'
        });
        me.localStore.variables.load({
            params: {},
            callback: function(rec, op) {
            
                me.attachModel(op, me.localStore.variables, true);
                el.loadRecord(me.localStore.variables.getAt(0));
              
                el.setLoading(false);
            }
        });
    }
});