Ext.define('Hrd.controller.Jobdesc', {
    extend: 'Hrd.library.box.controller.ControllerByData',
    alias: 'controller.Jobdesc',
    requires: ['Hrd.library.box.tools.DefaultConfig', 'Hrd.library.box.tools.EventSelector',
        'Hrd.minic.lookup.Employee', 'Hrd.library.box.tools.ComboLoader', 'Hrd.library.box.tools.InstaView',
        'Hrd.library.box.tools.Hour'],
    views: [],
    comboBoxIdEl: [],
    controllerName: 'jobdesc',
    formWidth: 600,
    refs: [
       
    ],
    //unitFormula: null,
    //storeProcess: 'Otherspaymentdatadetail',
    bindPrefixName: 'Jobdesc',
    browseHandler: null,
    localStore: {
        selectedUnit: null,
    },
    textCombos: [],
    comboLoader: null,
    fieldName: 'jobdesc_id',
    myParams: null,


    constructor: function(configs) {
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfig({
            moduleName: me.controllerName
        });
        config.run(this);

       

        this.callParent(arguments);
    },
    init: function() {
        var me = this;
        this.callParent(arguments);
        var newEvs = {};
        var events = new Hrd.library.box.tools.EventSelector();

        newEvs['jobdescformdata [name=position_position_id]'] = {
            select: function() {
                me.positionOnSelect();
            }

        };

        this.control(newEvs);

    },
    
    positionOnSelect:function(){
        var me = this;
        var f= me.getFormdata();
        f.down("[name=position_description]").setValue("");
        f.down("[name=position_description]").setValue(me.tools.comboHelper(f.down("[name=position_position_id]")).getField("position_id","description"));
    },
    
    
    panelAfterRender: function(el) {
        var me = this;

        if (me.isMaximize) {
            el.up("window").maximize();
        }
        me.getGrid().getSelectionModel().setSelectionMode('SINGLE');

        var f = me.getFormdata();
        me.tools.ajax({
            params: {},
            success: function(data, model) {
       
          
               me.tools.wesea(data.position, f.down("[name=position_position_id]")).comboBox();
            }
        }).read('parameter');

        me.getPanel().setLoading(false);

        // maximize panel window

    },
    
    validateData: function() {
        var me = this;
        var data = {"status": true, "msg": "Sedang diproses..."};

        return data;
    },

    
    afterClick: function() {
        var me = this;
        var f = me.getFormdata();
        var x = {
            cancel: function() {
                //  me.mainGridCheckRecord();
               // var rec = me.getGrid().getSelectedRecord();
               // if (rec) {
                //    f.loadRecord(rec);
                //}
            },
            save: function() {

            },
            edit: function() {

            },
            delete: function() {

            },
            new : function() {
               // me.validShift = false;
                f.getForm().reset();
              //  f.down("[name=date]").setValue(new Date());
            }
        }
        return x;
    }


});