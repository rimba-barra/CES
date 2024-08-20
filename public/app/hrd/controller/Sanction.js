Ext.define('Hrd.controller.Sanction', {
    extend: 'Hrd.library.box.controller.Controller',
    alias: 'controller.Sanction',
    requires: ['Hrd.library.box.tools.DefaultConfig', 'Hrd.library.box.tools.EventSelector',
        'Hrd.library.box.tools.Tools','Hrd.library.box.Config','Hrd.minic.lookup.Employee'],
    views: [],
    comboBoxIdEl: [],
    controllerName: 'sanction',
    fieldName: 'employee_employee_name',
    formWidth: 600,
    refs: [
        {
            ref: 'gridemployee',
            selector: 'lookupemployeegrid'
        }
    ],
    //unitFormula: null,
    //storeProcess: 'Otherspaymentdatadetail',
    bindPrefixName: 'Sanction',
    browseHandler: null,
    localStore: {
        selectedUnit: null
    },
    textCombos: [],
    tools:null,
    myConfig:null,
    constructor: function(configs) {
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfig({
            moduleName: me.controllerName
        });
        config.run(this);
        
        me.registerMiniCtrlAlt('employeeSanction', new Hrd.minic.lookup.Employee({
            controllerName: 'Sanction',
            panelId:me.controllerName+'employee' // make sure this value same as params that passed when calling instantwindow
        }));

        this.callParent(arguments);
        Ext.tip.QuickTipManager.init();
        
        //  me.reason = new Hrd.model.absentrecord.Reason();
    },
    init: function() {
        this.callParent(arguments);
        var me = this;
        me.myConfig = new Hrd.library.box.Config();
        me.tools = new Hrd.library.box.tools.Tools();
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        this.control(events.rangedDateEvents('sanctionformdata',me.tools.rangedDateEventsObjects('start_date','end_date')));
        var newEvs = {};

        //lookup_employee
        newEvs['sanctionformdata button[action=lookup_employee]'] = {
            click: function() {
                me.lookupEmployee();
            }

        };

        this.control(newEvs);

    },
    lookupEmployee: function() {
        var me = this;
        me.instantWindow("Panel", 600, "Employe List", "create", "employeewindow", "lookup.employee",{
            itemId:me.controllerName+'employee'
        });
        

    },
    panelAfterRender: function(el) {


    },
    mainDataSave: function() {
        var me = this;

        var f = me.getFormdata();
        var g = me.getGrid();
        var s = g.getStore();
        

        /* rec.beginEdit();
         rec.set({
         in_7_14: me._convertTime().formToGrid("timein"),
         out_7_14: me._convertTime().formToGrid("timeout"),
         shifttype_code: selectedShift.get("code"),
         shifttype_shifttype_id: selectedShift.get("shifttype_id")
         });
         rec.endEdit();
         
         */

        sanctiontype_id = f.down("[name=sanctiontype_sanctiontype_id]").getValue();
        
        // edit by wulan sari 20190308
        var store = f.down("[name=sanctiontype_sanctiontype_id]").getStore();
        var index = store.findExact('sanctiontype_id', sanctiontype_id);
        var row = store.getAt(index);
        var sanctiontype = row.get('sanctiontype');
        if(sanctiontype == 'PRA_SP'){ // PRA_SP = Teguran Lisan, saat teguran Lisan maka end date boleh kosong
            f.down("[name=is_sanctiontype_lisan]").setValue(1);
        } else {
            f.down("[name=is_sanctiontype_lisan]").setValue(0);        
        }
        // end edit by wulan sari 20190308
        
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
        
        me.getGrid().getStore().reload();



    },
    fdar: function() {



        var me = this;
        var f = me.getFormdata();

        var g = me.getGrid();
        me.setActiveForm(f);





        var x = {
            init: function() {
                me.tools.dateFieldInit(me.getFormdata(),me.myConfig);
                me.comboboxLoad(['sanctiontype_sanctiontype_id'], function() {

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