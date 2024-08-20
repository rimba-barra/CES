Ext.define('Hrd.controller.Klaimpengobatanold', {
    extend: 'Hrd.library.box.controller.Controller2B',
    alias: 'controller.Klaimpengobatan',
    controllerName: 'klaimpengobatan',
    fieldName: 'klaimpengobatan_id',
    bindPrefixName: 'Klaimpengobatan',
    requires: ['Hrd.template.ComboBoxFields'],
    formWidth: 500,
    refs: [
        {
            ref: 'gridstatus',
            selector: 'klaimpengobataninfogrid'
        }
    ],
    localStore: {
        plafon: null
    },
    init: function(config) {
        this.callParent(arguments);
        var newEvs = {};
        var me = this;
        newEvs['klaimpengobataninfogrid'] = {
            selectionchange: me.statusGridOnSelect
        };
        newEvs['klaimpengobatanformdata [name=jenispengobatan_jenispengobatan_id]'] = {
            change: function(el, val) {
                me.jenispengobatanOnChange(el, val);
            }
        };
        this.control(newEvs);

    },
    jenispengobatanOnChange: function(el) {
        var me = this;
        var f = me.getFormdata();
        if (el.getValue()) {
            f.down("[name=jenispengobatan_jenispengobatan]").setValue(me.tools.comboHelper(el).getText(me.comboBoxFields.jenispengobatan));

        }
    },
    panelAfterRender: function(config) {
        this.callParent(arguments);
        var me = this;
        me.localStore.plafon = me.instantStore({
            id: me.controllerName + 'PlafonStore',
            extraParams: {
                mode_read: 'klaimpengobatan'
            },
            idProperty: 'klaimpengobatan_id'
        });
        var p = me.getPanel();
        p.setLoading("Loading components...");
        me.localStore.plafon.loadPage(1, {
            callback: function(recs, op) {
                me.attachModel(op, me.localStore.plafon, true);
                p.setLoading(false);



            }
        });


    },
    addNewRecord: function() {
        var me = this;
        var f = me.getFormdata();
        var rec = me.getGrid().getSelectedRecord();
        if (rec) {
            me._fillEmployeeInfo();
            //f.down("[name=employee_employee_id]").setValue(rec.get("employee_id"));
           // me.tools.formHelper(f).readOnly(false);
           // f.down("[name=yearly]").setDisabled(false);
            return true;
        }
        return false;

    },
    editRecord: function(selectedRec) {
        var me = this;
        var f = me.getFormdata();
        f.down("[name=yearly]").setDisabled(false);
        f.down("[name=employee_employee_id]").setValue(selectedRec.get("employee_id"));
    },
    saveOnClick: function() {
        var me = this;


        me.insSave({
            form: me.getFormdata(),
            grid: me.getGrid(),
            // store: me.localStore["detail"].store,
            store: me.localStore.plafon,
            finalData: function(data) {
                data["klaimpengobatan_id"] = 0;
                return data;

            },
            sync: true,
            callback: {
                create: function(store, form, grid) {

                }
            }
        });
    },
    _fillEmployeeInfo: function() {
        // fill employee information
        var me = this;
        var rec = me.getGrid().getSelectedRecord();
        if (rec) {
            var emId = rec.get("employee_id");
            var f = me.getFormdata();
            f.getForm().reset();
            f.down("[name=employee_employee_id]").setValue(emId);
            f.loadRecord(rec);
        }

    },
    afterSelectionChange: function(rec) {
        var me = this;

        var emId = rec.get("employee_id");
        var f = me.getFormdata();

        me._fillEmployeeInfo();

        // load plafon
        var p = me.getPanel();
        p.setLoading("Loading information");

        me.localStore.plafon.loadPage(1, {
            params: {
                employee_employee_id: emId
            },
            callback: function(recs, op) {
                if (me.localStore.plafon.getCount() > 0) {
                    var prec = me.localStore.plafon.getAt(0);
                    f.loadRecord(prec);
                }
                p.setLoading(false);
            }
        });

    },
    afterMainGridLoadedFunc: function(rec) {
        var me = this;

        /// load components 
        var p = me.getPanel();
        p.setLoading("Loading components...");
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                p.setLoading(false);
                me.fillFormDataComponents(data, me.getFormdata());
                me.afterSelectionChange(rec);
            }
        }).read('detail');


    },
    fillFormDataComponents: function(data, f) {
        var me = this;
        me.tools.wesea(data.jenispengobatan, f.down("[name=jenispengobatan_jenispengobatan_id]")).comboBox();

    }



});