Ext.define('Hrd.controller.Penghargaan', {
    extend: 'Hrd.library.box.controller.ControllerByData',
    alias: 'controller.Penghargaan',
    requires: ['Hrd.library.box.tools.DefaultConfig', 'Hrd.library.box.tools.EventSelector',
        'Hrd.minic.lookup.Employee', 'Hrd.library.box.tools.ComboLoader', 'Hrd.library.box.tools.InstaView',
        'Hrd.library.box.tools.Hour'],
    views: [],
    comboBoxIdEl: [],
    controllerName: 'penghargaan',
    formWidth: 600,
    refs: [
        {
            ref: 'formdetail',
            selector: 'penghargaanformdatadetail'
        },
        {
            ref: 'griddetail',
            selector: 'penghargaangriddetail'
        },
        {
            ref:'gridbrowse',
            selector:'lookupemployeegrid'
        }
    ],
    //unitFormula: null,
    //storeProcess: 'Otherspaymentdatadetail',
    bindPrefixName: 'Penghargaan',
    browseHandler: null,
    localStore: {
        selectedUnit: null,
    },
    textCombos: [],
    comboLoader: null,
    fieldName: 'penghargaan_id',
    overtimeParameters: null,
    myParams: {
    },
    moneyFields: [],
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



        //lookupemployee
       /* 
        newEvs['penghargaanformdata button[action=browse]'] = {
            click: function() {
                me.lookupEmployee();
            }

        };
        */

        
        

        //

        this.control(newEvs);

    },
    
    
    panelAfterRender: function(el) {
        var me = this;

        if (me.isMaximize) {
         //   el.up("window").maximize();
        }
        me.getGrid().getSelectionModel().setSelectionMode('SINGLE');
        var f = me.getFormdata();


        me.getPanel().setLoading("Loading...");
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                 me.tools.wesea(data.employee, f.down("[name=employee_employee_id]")).comboBox();
                 me.tools.wesea(data.jenispenghargaan, f.down("[name=jenispenghargaan_jenispenghargaan_id]")).comboBox();
                me.getPanel().setLoading(false);
               
            }

        }).read('parameter');




    },
    validateData: function() {
        var data = {"status": false, "msg": "Sedang diproses..."};
        data.status = true;
        data.msg = "Sep";
        return data;
    },
    afterClick: function() {
        var me = this;
        var f = me.getFormdata();
        var x = {
            cancel: function() {
                f.getForm().reset();
            },
            save: function() {

            },
            edit: function() {
                f.getForm().reset();
                me.fillForm();

            },
            delete: function() {

            },
            new : function() {
                f.getForm().reset();
             //   f.down("[name=penghargaan_date]").setValue(new Date());
            }
        }
        return x;
    },
    finalData: function(data) {
        var me = this;
      
        return data;
    },
    afterSC: function(rec) {
        var me = this;
        //  me.fillForm();


    },
    fillForm: function() {
        var me = this;
    
        var rec = me.getGrid().getSelectedRecord();
        if (!rec) {
            return;

        }

        me.getFormdata().loadRecord(rec);
        
       

    }



});