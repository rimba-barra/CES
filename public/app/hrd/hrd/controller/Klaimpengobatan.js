Ext.define('Hrd.controller.Klaimpengobatan', {
    extend: 'Hrd.library.box.controller.Controller',
    alias: 'controller.Klaimpengobatan',
    controllerName: 'klaimpengobatan',
    fieldName: 'klaimpengobatan_id',
    bindPrefixName: 'Klaimpengobatan',
    requires: ['Hrd.template.ComboBoxFields', 'Hrd.library.box.tools.DefaultConfigfdv',
        'Hrd.library.jofa.System', 'Hrd.library.box.tools.EventSelector2',
        'Hrd.library.box.tools.Tools','Hrd.library.box.tools.Report'],
    formWidth: 500,
    isMaximize: true,
    refs: [
        {
            ref: 'gridclaim',
            selector: 'klaimpengobatanclaimgrid'
        },
        {
            ref:'formreport',
            selector:'klaimpengobatanformprint'
        }
    ],
    localStore: {
        plafon: null
    },
    fieldDisabled: false,
    gridLoaded: false,
    mySystem: null,
    plafonKaryawanList: null,
    plafonMap: null,
    report:null,
    constructor: function(configs) {
        this.callParent(arguments);
        var me = this;
        me.mySystem = new Hrd.library.jofa.System({
            cName: me.bindPrefixName,
            hasDetail: true,
            detailGridId: 'klaimpengobatanclaimgridID',
            comboBoxList: [{cbf: 'jenispengobatan', name: 'jenispengobatan_jenispengobatan_id'}],
            idProperty: 'klaimpengobatan_id'
        });
        var config = new Hrd.library.box.tools.DefaultConfigfdv({
            moduleName: me.controllerName
        });
        config.run(this);
        this.callParent(arguments);
        me.comboBoxFields = new Hrd.template.ComboBoxFields();

    },
    init: function(config) {
        this.callParent(arguments);
        var me = this;
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        var newEvs = {};
        var me = this;
        me.gridLoaded = false;
        me.report = new Hrd.library.box.tools.Report({
            cName:me.bindPrefixName
        });
        newEvs['klaimpengobatanformsearch [name=year]'] = {
            change: function(el, val) {
                me.getFormdata().down("[name=year]").setValue(val);
            }
        };
        newEvs['klaimpengobatanformdata [name=jenispengobatan_jenispengobatan_id]'] = {
            change: function(el, val) {
                me.jenispengobatanOnChange(el, val);
            }
        };
        newEvs['klaimpengobatanformdata [name=claim_date]'] = {
            change: function(el, val) {
                me.claimDateOnChange(el, val);
            }
        };
        newEvs['klaimpengobatanformdata [name=total]'] = {
            blur: function(el, val) {
                me.totalOnBlur(el, val);
            }
        };
        newEvs['klaimpengobatanformprint [action=print]'] = {
            click: function(el, val) {
                me.printOnClick();
            }
        };
        //
        this.control(newEvs);

        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});

    },
    printOnClick:function(){
        var me =this;
        me.report.processReport(me.getFormreport());
    },
    dataPrint:function(){
        
        var me = this;
        me.instantWindow("FormPrint", 600, "Print Report", "create", "printreport");
        return false;
    },
    totalOnBlur: function(el) {
        var me = this;

        var f = me.getFormdata();
        var selectedPlafon = f.down("[name=jenispengobatan_jenispengobatan_id]").getValue();
        var v = me.tools.floatval(el.getValue());
        var plafon = me.tools.floatval(f.down("[name=plafon]").getValue());
        var totalKlaimBefore = 0;
        var saldo = 0;
        var s = me.getGridclaim().getStore();
        console.log(f.editedRow);
        if (s.getCount() > 0) {
            s.each(function(rec) {
                if (rec.get("jenispengobatan_jenispengobatan_id") == selectedPlafon) {
                    totalKlaimBefore += me.tools.floatval(rec.get("total"));
                }

            });
        }
        saldo = plafon - totalKlaimBefore;
        /// total klaim tidak termasuk jika pada saat edit
        if (me.getFormdata().editedRow > -1) {
            var rec = me.getGridclaim().getSelectedRecord();
            saldo = saldo + me.tools.floatval(rec.get("total"));
        }

        if (v > saldo) {
            me.tools.alert.warning("Claim total must be lower than plafon value");
            v = 0;
        }
        saldo = saldo - v;
        el.setValue(v);
        f.down("[name=saldo_claim]").setValue(saldo);
        f.down("[name=total_claim]").setValue(plafon - saldo);
    },
    jenispengobatanOnChange: function(el) {
        var me = this;
        var f = me.getFormdata();
        if (el.getValue()) {
            f.down("[name=jenispengobatan_jenispengobatan]").setValue(me.tools.comboHelper(el).getText(me.comboBoxFields.jenispengobatan));
            /// load plafon value by employee and type
            var rec = me.getGrid().getSelectedRecord();
            var emId = rec.get("employee_id");
            if (me.plafonKaryawanList) {
                var plafons = me.plafonKaryawanList.data;

                for (var i in plafons) {
                    if (plafons[i]['employee_employee_id'] === emId) {
                        var plafonName = me.plafonMap[el.getValue()];

                        f.down("[name=plafon]").setValue(plafons[i][plafonName]);
                    }
                }
            }



        }
    },
    claimDateOnChange: function(el) {
        var me = this;
        var v = el.getValue();
        if (v) {
            var y = v.getFullYear();
            me.getFormdata().down("[name=year]").setValue(y);
        }

    },
    /*@override 06 Jan 2015*/
    loadPage: function(store) {
        var me = this;
        store.loadPage(1, {
            callback: function(rec, operation, success) {
                if (!me.getGrid().getStore().modelExist) {
                    me.getGrid().attachModel(operation);
                    me.getPanel().setLoading(false);
                    me.mySystem.afterGridLoad();
                }

            }
        });


    },
    formDataAfterRender: function(el) {
        return false;
    },
    panelAfterRender: function(el) {
    
        this.callParent(arguments);

        this.mySystem.panelAfterRender(el);
        this.getPanel().setLoading(false);
        

    },
    // override 7 jan 2015        
    gridSelectionChange: function() {
        return false;
    },
    execAction: function(el, action, me) {
        return false;
    },
    disabledFields: function(isDisable) {
        var me = this;
        var f = me.getFormdata();
        if (me.fieldDisabled !== isDisable) {
            var vs = f.getForm().getValues();
            for (var i in vs) {
                var el = f.down("[name=" + i + "]");

                if (el && !el.stayReadOnly) {
                    el.setReadOnly(isDisable);
                }
            }
            me.fieldDisabled = isDisable;
        }
    },
    // added 7 Jan 2015
    // add this menthod if use Jofa system
    sysfunc: function() {
        var me = this;
        var x = {
            gridSelectionChange: function() {
                if (!me.gridLoaded) {
                    return false;
                }

                var rec = me.getGrid().getSelectedRecord();
                if (rec) {
                    me.getFormdata().down("[name=employee_employee_id]").setValue(rec.get("employee_id"));
                }
                var p = me.getPanel();
                p.setLoading("Loading Claim");
                var gc = me.getGridclaim();
                var s = gc.getStore();
                var f = me.getFormdata();
                s.loadData([], false);
                s.loadPage(1, {
                    params: {
                        employee_employee_id: f.down("[name=employee_employee_id]").getValue(),
                        year: f.down("[name=year]").getValue()
                    },
                    callback: function(rec, operation, success) {
                        if (!s.modelExist) {
                            gc.attachModel(operation);
                        }

                        /// select one record
                        if (me.getGridclaim().getStore().getCount() > 0) {
                            me.getGridclaim().getSelectionModel().select(0);
                        }

                        p.setLoading(false);

                    }
                });

                /// disable form fields
                me.disabledFields(true);

            },
            clickNew: function(rec) {
                var f = me.getFormdata();
                f.down("[name=employee_employee_id]").setValue(rec.get('employee_id'));
                f.down("[name=claim_date]").setValue(new Date());
                f.down("[name=kwitansi_date]").setValue(new Date());

                /// disable form fields
                me.disabledFields(false);
                me.getGridclaim().getSelectionModel().deselectAll();

            },
            clickEdit: function() {
                me.disabledFields(false);
                return false;
            },
            gridDetailSelectionChange: function() {
                return false;
            },
            clickCancel: function() {
                me.disabledFields(true);
            },
            detailReadLoaded: function(data) {

                me.plafonKaryawanList = data.plafonkaryawan;
                me.plafonMap = data['others'][0][0]['PLAFONMAP'];

            },
            getParams: function(modeRead) {
                var params = {};
                switch (modeRead) {
                    case 'detailRead':
                        params = {
                            year: 2015
                        };
                        break;
                }
                return params;
            }
        };
        return x;
    },
    formDataShow: function(el, act, action) {
        return false;
    }
});