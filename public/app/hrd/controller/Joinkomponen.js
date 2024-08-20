Ext.define('Hrd.controller.Joinkomponen', {
    extend: 'Hrd.library.box.controller.ControllerByData',
    alias: 'controller.Joinkomponen',
    requires: ['Hrd.library.box.tools.DefaultConfig', 'Hrd.library.box.tools.EventSelector',
        'Hrd.minic.lookup.Employee', 'Hrd.library.box.tools.ComboLoader', 'Hrd.library.box.tools.InstaView',
        'Hrd.library.box.tools.Hour'],
    views: [],
    comboBoxIdEl: [],
    controllerName: 'joinkomponen',
    formWidth: 600,
    refs: [
    ],
    //unitFormula: null,
    //storeProcess: 'Otherspaymentdatadetail',
    bindPrefixName: 'Joinkomponen',
    browseHandler: null,
    localStore: {
        selectedUnit: null,
        indexLembur: null
    },
    textCombos: [],
    comboLoader: null,
    fieldName: 'joinkomponen_id',
    overtimeParameters: null,
    myParams: null,
    shiftInfo: null,
    validShift: false,
    currentStatusLembur: 0,
    validLembur: false,
    overtimeValue: 0,
    tempMatchIndeksLembur: null,
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

        newEvs['joinkomponenformdata [name=tipepinjaman_tipepinjaman_id]'] = {
            select: function() {
                //  me.tipeOnSelect();
            }

        };




        this.control(newEvs);

    },
    
    validateData: function() {
        var me = this;
        var data = {"status": true, "msg": "Sedang diproses..."};

        return data;
    },
    finalData: function(data) {
        var me = this;
        return data;
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
                me.tools.wesea(data.komponengaji, f.down("[name=master]")).comboBox();
                me.tools.wesea(data.komponengaji, f.down("[name=komponen1]")).comboBox();
                me.tools.wesea(data.komponengaji, f.down("[name=komponen2]")).comboBox();
                me.tools.wesea(data.komponengaji, f.down("[name=komponen3]")).comboBox();
                me.tools.wesea(data.komponengaji, f.down("[name=komponen4]")).comboBox();
                me.tools.wesea(data.komponengaji, f.down("[name=komponen5]")).comboBox();
                

            }
        }).read('parameter');






        me.getPanel().setLoading(false);

        // maximize panel window

    },
    afterSC: function(rec) {
        var me = this;
     
    },
    afterClick: function() {
        var me = this;
        var f = me.getFormdata();
        var x = {
            cancel: function() {
                //  me.mainGridCheckRecord();
                var rec = me.getGrid().getSelectedRecord();
                if (rec) {
                    f.loadRecord(rec);
                }
            },
            save: function() {

            },
            edit: function() {

            },
            delete: function() {

            },
            new : function() {
              //  me.validShift = false;
                f.getForm().reset();
              
            }
        }
        return x;
    }


});