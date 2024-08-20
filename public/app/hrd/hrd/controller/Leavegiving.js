Ext.define('Hrd.controller.Leavegiving', {
    extend: 'Hrd.library.box.controller.ControllerByEmployee2',
    alias: 'controller.Leavegiving',
    requires: ['Hrd.minic.leavegiving.GenerateYearly'],
    views: [],
    comboBoxIdEl: [],
    controllerName: 'leavegiving',
    fieldName: 'leaveentitlements_id',
    formWidth: 500,
    refs: [
        {
            ref: 'gridleave',
            selector: 'leavegivingleavegrid'
        }
    ],
    //unitFormula: null,
    //storeProcess: 'Otherspaymentdatadetail',
    bindPrefixName: 'Leavegiving',
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
            controllerName: 'Leavegiving'
        }));
        me.registerMiniCtrlAlt('generateyearly', new Hrd.minic.leavegiving.GenerateYearly({
            controllerName: 'Leavegiving'
        }));
        this.callParent(arguments);
        Ext.tip.QuickTipManager.init();


        //  me.reason = new Hrd.model.absentrecord.Reason();
    },
    init: function() {
        var me = this;
        this.callParent(arguments);
        var newEvs = {};
        newEvs['leavegivingleavegrid'] = {
            selectionchange: me.mainGridSelectionChange
        };
        newEvs['leavegivingformdata [name=start_use]'] = {
            blur: function() {
                me.startUseKeyUp();
            }
        };
        newEvs['leavegivingformdata [name=leavegroup]'] = {
            blur: function() {
                me.leaveGroupOnBlur();
            }
        };
        newEvs['leavegivingpanel toolbar [action=generate]'] = {
            blur: function() {
                me.showFormYearGen();
            }
        };
        newEvs['leavegivingpanel toolbar [action=habis]'] = {
            blur: function() {
                me.habisCuti();
            }
        };
        newEvs['leavegivingpanel toolbar [action=proses]'] = {
            blur: function() {
                me.proses();
            }
        };
        newEvs['leavegivingpanel toolbar [action=refresh]'] = {
            blur: function() {
                me.refreshDataHakCuti();
            }
        };
        //
        this.control(newEvs);

    },
    refreshDataHakCuti: function() {
        var me = this;
        var p = me.getPanel();
        var gl = me.getGridleave();


        p.setLoading("Loading...");
        gl.getStore().load({
            params: {
                limit: 9999
            },
            callback: function(rec, op) {

                me.getGrid().getSelectionModel().select(0);
                var rec = me.getGrid().getSelectedRecord();
                me.doGridLeaveFilter(rec.get("employee_id"));
                p.setLoading(false);
            }
        });
    },
    proses: function() {
        var me = this;
        me.prosesPanggilAjax('proses');
    },
    habisCuti: function() {
        var me = this;
        me.prosesPanggilAjax('habiscuti');
    },
    prosesPanggilAjax: function(modeRead) {
        var me = this;
        var p = me.getPanel();
        p.setLoading("Processing...");
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                console.log(data['others']);
                if (data['others'][0][0]['HASIL']) {
                    me.tools.alert.info('Success');
                    me.loadGridLeave(false);
                } else {
                    me.tools.alert.warning(data['others'][0][0]['MSG']);
                }
                p.setLoading(false);
            }
        }).read(modeRead);
    },
    leaveGroupOnBlur: function() {
        var me = this;
        var f = me.getFormdata();
        var g = me.tools.intval(f.down("[name=leavegroup]").getGroupValue());
        var jatahCuti = g == 1 ? me.globalParams.P_nleave_quota : me.globalParams.P_bleave_quota;
        f.down("[name=amount]").setValue(jatahCuti);
        f.down("[name=rest]").setValue(jatahCuti);

    },
    startUseKeyUp: function() {

        var me = this;
        var f = me.getFormdata();
        var y = me.tools.intval(f.down("[name=start_use]").getValue());
        var ed = new Date(); // expire date
        ed.setFullYear(y + 1);
        ed.setMonth(11);
        ed.setDate(31);
        f.down("[name=end_use]").setValue(y);
        f.down("[name=expired_date]").setValue(ed);
        f.down("[name=extension_date]").setValue(ed);
    },
    getMainGrid: function() {
        var me = this;
        return me.getGridleave();
    },
    showFormYearGen: function() {
        var me = this;
        me.instantWindow("GenerateYearly", 600, "Generate Yearly Leave", "create", "generateyearly");
    },
    lookupEmployee: function() {
        var me = this;
        me.instantWindow("Panel", 600, "Employe List", "create", "employeewindow", "lookup.employee");

    },
    loadGridLeave: function(isInit) {
        var me = this;
        var gl = me.getGridleave();
        gl.getStore().load({
            params: {
                limit: 9999
            },
            callback: function(rec, op) {
                if (isInit) {
                    gl.attachModel(op);
                }

                var rec = me.getGrid().getSelectedRecord();
                me.doGridLeaveFilter(rec.get("employee_id"));
            }
        });
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



                //leave grid load
                var gl = me.getGridleave();
                gl.getSelectionModel().setSelectionMode('SINGLE');
                gl.doInit();
                //gl.getStore().getProxy().extraParams.limit = 9999;
                me.loadGridLeave(true);

                me.globalParams = data['others'][0][0]['GLOBALPARAMSPARAMS'];
                me.expireDuration = data['others'][0][0]['EXPIRE_DURATION'];

                console.log(me.globalParams);
                p.setLoading(false);
            }
        }).read('detail');
        me.callParent(arguments);





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