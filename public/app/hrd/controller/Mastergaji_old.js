Ext.define('Hrd.controller.Mastergaji', {
    extend: 'Hrd.library.box.controller.ControllerByEmployee2',
    alias: 'controller.Mastergaji',
    requires: [],
    views: [],
    comboBoxIdEl: [],
    controllerName: 'mastergaji',
    fieldName: 'gaji_id',
    formWidth: 500,
    refs: [
        {
            ref: 'gridleave',
            selector: 'mastergajileavegrid'
        }
    ],
    //unitFormula: null,
    //storeProcess: 'Otherspaymentdatadetail',
    bindPrefixName: 'Mastergaji',
    browseHandler: null,
    comboLoader: null,
    globalParams: null,
    localStore: {
        selectedUnit: null
    },
    tempSelectedEmployee: 0,
    textCombos: [],
    tools: null,
    expireDuration: 0,
    constructor: function(configs) {
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfig({
            moduleName: me.controllerName
        });
        config.run(this);
        me.registerMiniCtrlAlt('employee', new Hrd.minic.lookup.Employee({
            controllerName: 'Mastergaji'
        }));
   
        this.callParent(arguments);
        Ext.tip.QuickTipManager.init();


        //  me.reason = new Hrd.model.absentrecord.Reason();
    },
    init: function() {
        var me = this;
        this.callParent(arguments);
        var newEvs = {};
        newEvs['mastergajileavegrid'] = {
            selectionchange: me.mainGridSelectionChange
        };
        newEvs['mastergajiformdata [name=start_use]'] = {
            blur: function() {
                me.startUseKeyUp();
            }
        };
        newEvs['mastergajiformdata [name=leavegroup]'] = {
            blur: function() {
                me.leaveGroupOnBlur();
            }
        };
        newEvs['mastergajipanel toolbar [action=generate]'] = {
            blur: function() {
                me.showFormYearGen();
            }
        };
        newEvs['mastergajipanel toolbar [action=habis]'] = {
            blur: function() {
                me.habisCuti();
            }
        };
        newEvs['mastergajipanel toolbar [action=proses]'] = {
            blur: function() {
                me.proses();
            }
        };
        newEvs['mastergajipanel toolbar [action=refresh]'] = {
            blur: function() {
                me.refreshDataHakCuti();
            }
        };
        //
        this.control(newEvs);

    },
    
    getMainGrid: function() {
        var me = this;
        return me.getGrid();
       // return false;
    },
    doGridLeaveFilter:function(){
        return false;
    },
    lookupEmployee: function() {
        var me = this;
        me.instantWindow("Panel", 600, "Employe List", "create", "employeewindow", "lookup.employee");

    },
    panelAfterRender: function(el) {
        var me = this;


        var me = this;
        var p = me.getPanel();
        p.setLoading('Please wait...');
        me.tools.ajax({
            params: {},
            success: function(data, model) {


                // me.tools.wesea(data.absenttype, me.getFormdata().down("[name=absenttype_absenttype_id]")).comboBox();



               
                p.setLoading(false);
            }
        }).read('parameter');
        me.callParent(arguments);





    },
    mainDataSave: function() {
        var me = this;

        var f = me.getFormdata();
        var g = me.getGrid();
        var s = g.getStore();



        me.insSave({
            form: me.getFormdata(),
            grid: me.getGrid(),
            store: me.getGridleave().getStore(),
            finalData: function(data) {

                data["unit_unit_id"] = data["unit_id"];
                data["is_leave_end"] = f.down("[name=is_leave_end]").checked ? 1 : 0;

                return data;
            },
            sync: true,
            callback: {
                create: function(store, form, grid) {

                }
            }
        });





    },
    storeLoadedAfterSaveUpdate: function() {
        var me = this;
        var rec = me.getGrid().getSelectedRecord();
        me.doGridLeaveFilter(rec.get("employee_id"));
        me.mainGridCheckRecord();
    },
    afterClick: function() {
        var me = this;
        var x = {
            cancel: function() {
                me.mainGridCheckRecord();
            },
            save: function() {

            },
            edit: function() {

            },
            delete: function() {

            },
            new : function() {
                var f = me.getFormdata();
                var d = new Date();

                f.down("[name=start_use]").setValue(d.getFullYear());

                me.leaveGroupOnBlur();
                me.startUseKeyUp();

            }
        }
        return x;
    },
});