Ext.define('Hrd.controller.Plafonkaryawan', {
    extend: 'Hrd.library.box.controller.Controller2B',
    alias: 'controller.Plafonkaryawan',
    controllerName: 'plafonkaryawan',
    fieldName: 'plafonkaryawan_id',
    bindPrefixName: 'Plafonkaryawan',
    formWidth: 500,
    listYears: null,
    refs: [
        {
            ref: 'gridstatus',
            selector: 'plafonkaryawaninfogrid'
        },
        {
            ref: 'formgen',
            selector: 'plafonkaryawanformgeneratesheet'
        }
    ],
    localStore: {
        plafon: null
    },
    constructor: function(configs) {
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfig({
            moduleName: me.controllerName
        });
        config.run(this);

        this.callParent(arguments);

    },
    init: function(config) {
        this.callParent(arguments);
        var newEvs = {};
        var me = this;
        newEvs['plafonkaryawaninfogrid'] = {
            selectionchange: me.statusGridOnSelect
        };
        newEvs['plafonkaryawanformsearch button[action=gen]'] = {
            click: function(el) {
                me.showWindowGen(el);
            }
        };
        newEvs['plafonkaryawanformgeneratesheet button[action=continue]'] = {
            click: function(el) {
                me.generateSheet(el);
            }
        };
        newEvs['plafonkaryawanformsearch [name=year]'] = {
            change: function(el) {

                me.refreshFormData(me.getGrid().getSelectedRecord());
            }
        };
        //
        this.control(newEvs);

    },
    generateSheet: function(el) {
        var me = this;
        var p = me.getPanel();
        me.getFormgen().up("window").close();
        p.setLoading("Processing... ");
        me.tools.ajax({
            params: {
                year: me.tools.intval(me.getFormsearch().down("[name=year]").getValue())
            },
            success: function(data, model) {

                p.setLoading(false);
            }
        }).read('generate');
    },
    showWindowGen: function(el) {
        var me = this;
        me.instantWindow("FormGenerateSheet", 600, "Genearate Plafon", "create", "generatewindow");
        var y = 0;
        var d = new Date();
        y = d.getFullYear();
        me.getFormgen().down("[name=date]").setValue(y);
    },
    panelAfterRender: function(config) {
        this.callParent(arguments);
        var me = this;
        me.localStore.plafon = me.instantStore({
            id: me.controllerName + 'PlafonStore',
            extraParams: {
                mode_read: 'plafonkaryawan'
            },
            idProperty: 'plafonkaryawan_id'
        });
        var p = me.getPanel();
        p.setLoading("Loading components...");
        me.localStore.plafon.loadPage(1, {
            callback: function(recs, op) {
                me.attachModel(op, me.localStore.plafon, true);

                // load list year of plafon pengobatan
                me.tools.ajax({
                    params: {},
                    success: function(data, model) {
                        me.listYears = data.others[0][0]['LISTYEARS'][1];
                        var ly = me.listYears;
                        if (ly) {
                            var ys = me.getFormsearch().down("[name=year]").getStore();
                            ys.removeAll();
                            for (var i in ly) {
                                ys.add({
                                    name: ly[i]["year"],
                                    number: ly[i]["year"]
                                });
                            }
                        }
                        p.setLoading(false);
                    }
                }).read('detail');


            }
        });
    },
    addNewRecord: function() {
        var me = this;
        var f = me.getFormdata();
        var rec = me.getGrid().getSelectedRecord();
        if (rec) {
            f.down("[name=employee_employee_id]").setValue(rec.get("employee_id"));
            me.tools.formHelper(f).readOnly(false);
            f.down("[name=yearly]").setDisabled(false);
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
        var p = me.getPanel();
        p.setLoading("Loading...");
        var params = me.getFormdata().getForm().getValues();
        params["year"] = me.getFormsearch().down("[name=year]").getValue();
        me.tools.ajax({
            params:params,
            success: function(data, model) {
                var result = data["others"][0];
                if(!result.RESULT){
                    me.tools.alert.warning(result.MSG);
                }
                console.log(data);
                p.setLoading(false);
            }
        }).read('save');
        /*
         me.insSave({
         form: me.getFormdata(),
         grid: me.getGrid(),
         // store: me.localStore["detail"].store,
         store: me.localStore.plafon,
         finalData: function(data) {
         data["plafonkaryawan_id"] = 0;
         return data;
         
         },
         sync: true,
         callback: {
         create: function(store, form, grid) {
         
         }
         }
         });
         */

    },
    refreshFormData: function(selectedRow) {
        var me = this;

        var emId = selectedRow.get("employee_id");
        var f = me.getFormdata();
        f.getForm().reset();
        f.down("[name=employee_employee_id]").setValue(emId);
        var p = me.getPanel();


        p.setLoading("Loading information");
        me.tools.ajax({
            params: {
                year: me.getFormsearch().down("[name=year]").getValue(),
                employee_employee_id: emId
            },
            success: function(data, model) {
                // me.listYears = data.others[0];
                var plafon = data.others[0]["PLAFONKARYAWAN"];

                if (plafon) {

                    for (var i in plafon) {
                        var el = f.down("[name=" + i + "]");
                        if (el) {
                            el.setValue(plafon[i]);
                        }
                    }
                }

                p.setLoading(false);
            }
        }).read('plafonkaryawan');
    },
    afterSelectionChange: function(rec) {
        var me = this;



        me.refreshFormData(rec);

        /*   me.localStore.plafon.loadPage(1, {
         params: {
         year: me.getFormsearch().down("[name=year]").getValue(),
         employee_employee_id: emId
         },
         callback: function(recs, op) {
         if (me.localStore.plafon.getCount() > 0) {
         var prec = me.localStore.plafon.getAt(0);
         f.loadRecord(prec);
         }
         p.setLoading(false);
         }
         });*/

    },
    cancelOnClick: function() {
        var me = this;
        var f = me.getFormdata();
        // reset jika dipanggil dari form baru
        if (f.editedRow < 0) {
            f.getForm().reset();
            me.getGrid().getView().getSelectionModel().deselectAll();
        }
        me.disableTBButtonsOnGrid(false);
        me.disableForm(true);

        me.isEditing = true;
        me.afterClick().cancel();
    },
});