Ext.define('Hrd.controller.Medicalparameter', {
    extend: 'Hrd.library.box.controller.Controller',
    alias: 'controller.Medicalparameter',
    requires: ['Hrd.library.box.tools.DefaultConfig', 'Hrd.library.box.tools.EventSelector',
        'Hrd.library.box.tools.Tools', 'Hrd.library.box.Config', 'Hrd.minic.lookup.Employee',
        'Hrd.library.box.tools.CRUDButtonHandler'],
    views: [],
    comboBoxIdEl: [],
    controllerName: 'medicalparameter',
    formWidth: 600,
    refs: [
        {
            ref: 'gridemployee',
            selector: 'lookupemployeegrid'
        },
        {
            ref:'panel',
            selector:'medicalparameterpanel'
        }
    ],
    //unitFormula: null,
    //storeProcess: 'Otherspaymentdatadetail',
    bindPrefixName: 'Medicalparameter',
    browseHandler: null,
    localStore: {
        selectedUnit: null
    },
    textCombos: [],
    tools: null,
    myConfig: null,
    crudh: null, // crud toolbox handler
    constructor: function(configs) {
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfig({
            moduleName: me.controllerName
        });
        config.run(this);

        

        this.callParent(arguments);
        Ext.tip.QuickTipManager.init();


        //  me.reason = new Hrd.model.absentrecord.Reason();
    },
    init: function() {
        this.callParent(arguments);
        var me = this;
        
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        this.control(events.rangedDateEvents('medicalparameterformdata', me.tools.rangedDateEventsObjects('start_date', 'end_date')));
        var newEvs = {};

        //lookup_employee
        newEvs['medicalparameterformdata button[action=lookup_employee]'] = {
            click: function() {
                me.lookupEmployee();
            }

        };

        this.control(newEvs);

    },
    lookupEmployee: function() {
        var me = this;
        me.instantWindow("Panel", 600, "Employe List", "create", "employeewindow", "lookup.employee", {
            itemId: me.controllerName + 'employee'
        });


    },
    panelAfterRender: function(el) {

        var me = this;
        me.crudh = new Hrd.library.box.tools.CRUDButtonHandler({
            formId: 'formMedicalParameterID',
            toolboxId: 'toolbarMedicalParameterID',
            cName: me.bindPrefixName
        });
        me.crudh.init();
        
        /// resize window
        var p = me.getPanel();
        p.up("window").setSize(100,100);
        var f = p.down("form");
        p.setLoading("Loading...");
        me.tools.ajax({
            params: {},
            success: function(recs, model) {
                if(recs){
                    for(var i in recs){
                       var name =  recs[i]['generalparameter']['name'];
                       var el  = f.down("[name="+name+"]");
                       if(el){
                           el.setValue(recs[i]['generalparameter']['value']);
                       }
                    }
                }
                p.setLoading(false);
                
            }
        }).read('all');
        
        
        
    },
    crudbrFunc: function() {
        var me = this;
        var x = {
            save: function(form) {
                form.setLoading("Please wait...");
                me.tools.ajax({
                    params:form.getForm().getValues(),
                    success: function(data) {
                        if(data.success){
                            me.tools.alert.info("Saved");
                        }else{
                            me.tools.alert.warning(data.msg);
                        }
                        form.setLoading(false);
                        
                        
                    }
                }).save();
            }
        };
        return x;
    },
    mainDataSave: function() {
        var me = this;

        var f = me.getFormdata();
        var g = me.getGrid();
        var s = g.getStore();


       

        me.insSave({
            form: me.getFormdata(),
            grid: me.getGrid(),
            // store: me.localStore["detail"].store,
            finalData: function(data) {

                data["unit_unit_id"] = data["unit_id"];

                return data;
            },
            sync: true,
            callback: {
                create: function(store, form, grid) {

                }
            }
        });





    },
    fdar: function() {



        var me = this;
        var f = me.getFormdata();

        var g = me.getGrid();
        me.setActiveForm(f);





        var x = {
            init: function() {
                me.tools.dateFieldInit(me.getFormdata(), me.myConfig);
                me.comboboxLoad(['medicalparametertype_medicalparametertype_id'], function() {

                });
            },
            create: function() {

                me.unMask(1);
            },
            update: function() {
                f.editedRow = g.getSelectedRow();
                var rec = g.getSelectedRecord();

                if (rec) {
                    f.loadRecord(rec);
                    f.myLoadRecord(rec, "group");
                }

                //shifttype_shifttype_id

                me.unMask(1);

            }
        };
        return x;
    },
    minicProc: function() {
        var me = this;
        var x = {
            lookupEmployee: {
                selectOnClick: function(rec) {

                    var f = me.getFormdata();
                    var d = rec.get("hire_date");
                    d = new Date(d);
                    f.myLoadRecord(rec, "employee");
                    f.myLoadRecord(rec, "group");
                    // f.loadRecord(rec.data);
                }
            }
        };
        return x;

    }


});