Ext.define('Hrd.controller.Leavesubmission', {
    extend: 'Hrd.library.box.controller.Controller',
    alias: 'controller.Leavesubmission',
    requires: ['Hrd.library.box.tools.DefaultConfig', 'Hrd.library.box.tools.EventSelector',
        'Hrd.minic.lookup.Employee', 'Hrd.library.box.tools.ComboLoader','Hrd.library.box.tools.InstaView'],
    views: [],
    comboBoxIdEl: [],
    controllerName: 'leavesubmission',
    formWidth: 600,
    refs: [],
    //unitFormula: null,
    //storeProcess: 'Otherspaymentdatadetail',
    bindPrefixName: 'Leavesubmission',
    browseHandler: null,
    localStore: {
        selectedUnit: null
    },
    textCombos: [],
    comboLoader: null,
    constructor: function(configs) {
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfig({
            moduleName: me.controllerName
        });
        config.run(this);

        
        me.registerMiniCtrlAlt('employee', new Hrd.minic.lookup.Employee({
            controllerName: 'Leavesubmission',
            panelId:me.controllerName+'employee' // make sure this value same as params that passed when calling instantwindow
        }));

        this.callParent(arguments);
        Ext.tip.QuickTipManager.init();


        //  me.reason = new Hrd.model.absentrecord.Reason();
    },
    init: function() {
        this.callParent(arguments);
        var me = this;
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        var newEvs = {};
        //lookup_employee
        newEvs['leavesubmissionformdata button[action=lookup_employee]'] = {
            click: function() {
                me.lookupEmployee();
            }

        };

        this.control(newEvs);

    },
    getEmployeeControl:function(){
        return this.miniControllers['employee'];
    },
    leaveTestShow:function(){
            alert("hello");
    },
    lookupEmployee: function() {
        var me = this;
        
        me.instantWindow("Panel", 600, "Employe List", "create", "employeewindow", "lookup.employee",{
            itemId:me.controllerName+'employee'
        });
       
        
      
    },
    panelAfterRender: function(el) {
        var me = this;



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
                me.comboLoader = new Hrd.library.box.tools.ComboLoader({
                    formData: me.getFormdata(),
                    mainPanel: me.getFormdata()
                });
                me.comboLoader.run(me.controllerName);
            },
            create: function() {

                me.unMask(1);
            },
            update: function() {
                f.editedRow = g.getSelectedRow();
                var rec = g.getSelectedRecord();

                if (rec) {
                    f.loadRecord(rec);

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
                    f.down("[name=employee_hire_date]").setValue(d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear());
                }
            }
        };
        return x;

    }


});