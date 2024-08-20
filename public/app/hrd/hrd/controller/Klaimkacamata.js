Ext.define('Hrd.controller.Klaimkacamata', {
    extend: 'Hrd.library.box.controller.Controllerfdv',
    alias: 'controller.Klaimkacamata',
    requires: ['Hrd.library.box.tools.DefaultConfigfdv', 'Hrd.library.box.tools.StoreProcessor', 'Hrd.library.box.tools.EventSelector',
        'Hrd.library.box.tools.SimpleGridControl', 'Hrd.library.box.tools.Tools'],
    views: ['klaimkacamata.Panel', 'klaimkacamata.Grid', 'klaimkacamata.FormSearch', 'klaimkacamata.FormData'],
    comboBoxIdEl: [],
    controllerName: 'klaimkacamata',
    fieldName: 'klaimkacamata_id',
    fillForm: null,
    formWidth: 500,
    //unitFormula: null,
    //storeProcess: 'Otherspaymentdatadetail',
    bindPrefixName: 'Klaimkacamata',
    browseHandler: null,
    localStore: {
        newdetail: null
    },
    refs: [
        {
            ref: 'gridlens',
            selector: 'klaimkacamatarecordgrid'
        },
        {
            ref: 'gridframe',
            selector: 'klaimkacamatarecordframegrid'
        }
    ],
    isMaximize: true,
    saveStore: null,
    listYears: null,
    constructor: function(configs) {
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfigfdv({
            moduleName: me.controllerName
        });
        config.run(this);
        this.callParent(arguments);
    },
    init: function() {
        var me = this;
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        var newEvs = {};
        newEvs['klaimkacamataformsearch [name=department_department_id]'] = {
            select: function(fld, a) {
                me.filterMainGrid();
            }

        };
        newEvs['klaimkacamatagrid toolbar button[action=cancel]'] = {
            click: function(fld, a) {
                me.cancelOnClick();
            }

        };
        newEvs['klaimkacamatagrid toolbar button[action=save]'] = {
            click: function(fld, a) {
                me.saveOnClick();
            }

        };
        newEvs['klaimkacamatagrid toolbar button[action=edit]'] = {
            click: function(fld, a) {
                me.editOnClick();
            }

        };
        newEvs['klaimkacamatagrid toolbar button[action=delete]'] = {
            click: function(fld, a) {
                me.deleteOnClick();
            }

        };
        newEvs['klaimkacamatarecordgrid'] = {
            selectionchange: me.lensGridSelectionChange
        };
        newEvs['klaimkacamatarecordframegrid'] = {
            selectionchange: me.frameGridSelectionChange
        };


        //



        this.control(newEvs);

        // added 26 Agustus 2014
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});


    },
    lensGridSelectionChange: function(selection, recs) {

        var me = this;
        me.recordGridSc(selection, recs);
    },
    frameGridSelectionChange: function(selection, recs) {

        var me = this;
        me.recordGridSc(selection, recs);
    },
    recordGridSc: function(selection, recs) {
        var me = this;
        if (recs[0]) {
            var form = selection.view.up("form");
            form.loadRecord(recs[0]);
            me.getGrid().down("toolbar button[action=edit]").setDisabled(false);
        }
    },
    filterMainGrid: function() {
        var me = this;
        var fs = me.getFormsearch();
        var cb = fs.down("[name=department_department_id]");
        var s = me.getGrid().getStore();
        s.clearFilter(true);
        var val = cb.getValue();
        s.filterBy(function(rec, id) {

            if (rec.raw.department.department_id === val) {
                return true;
            }
            else {
                return false;
            }
        });
    },
    panelAfterRender: function(configs) {
        this.callParent(arguments);
        var me = this;
        var p = me.getPanel();
        var g = me.getGrid();
        g.getSelectionModel().setSelectionMode('SINGLE');
        me.getGridlens().getSelectionModel().setSelectionMode('SINGLE');
        me.getGridframe().getSelectionModel().setSelectionMode('SINGLE');
        p.setLoading("Loading components...");
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                var fs = me.getFormsearch();
                me.fillFormDataComponents(data, fs);

                /// setDefault value to department cb
                var cb = fs.down("[name=department_department_id]");
                var s = cb.getStore();
                if (s.getCount() > 0) {
                    var rec = s.getAt(0);
                    cb.setValue(rec.get("department_id"));
                }

                /// disable form data field
                me.disableForm();

                me.getGridlens().doInit();
                me.getGridframe().doInit();

                p.setLoading(false);
            }
        }).read('detail');
    },
    disableForm: function(disable) {
        var me = this;
        var status = typeof disable === 'undefined' ? true : disable;
        var f = me.getFormdata();
        var vs = f.getForm().getValues();
        for (var i in vs) {

            var el = f.down("[name=" + i + "]");
            if (el) {
                el.setReadOnly(status);
            }

        }
    },
    fillFormDataComponents: function(data, f) {
        var me = this;
        me.tools.wesea(data.department, f.down("[name=department_department_id]")).comboBox();
        //   me.tools.wesea(data.group, f.down("[name=group_group_id]")).comboBox();
    },
    mainDataSave: function() {
        var me = this;


        var f = me.getFormdata();




    },
    fdar: function() {



        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();


        var x = {
            init: function() {


            },
            create: function() {

            },
            update: function() {
                f.editedRow = g.getSelectedRow();
                var eId = me.getGrid().getSelectedRecord().get("klaimkacamata_id");


            },
            other: function(state) {

                me.getFormdata().up('window').getEl().unmask();
            }
        };
        return x;
    },
    resetForm: function() {
        var me = this;
        var fl = me.getGridlens().up("form");
        var ff = me.getGridframe().up("form");
        me.tools.formHelper(fl).readOnly(true);
        me.tools.formHelper(ff).readOnly(true);
     
        ff.getForm().reset();
        fl.getForm().reset();
    },
    afterDetailRequested: function(data, motherFunc) {
        // data from mode_read : 'detail'
        // motherFunc : fungsi yang dilewatkan dari method gridSelectionChange di Controllerfdv
        var me = this;
        var f = me.getFormdata();


        var g = me.getGrid();
        g.down("toolbar button[action=edit]").setDisabled(true);
        me.resetForm();
        // f.editedRow = g.getSelectedRow();
        var rec = g.getSelectedRecord();
        if (!rec) {
            motherFunc();
            return;
        }
        f.loadRecord(rec);

        // set lens and frame grid
        var p = me.getPanel();
        var gl = me.getGridlens();
        var gf = me.getGridframe();
        p.setLoading("Loading lens and frame claim...");
        gl.getStore().loadData([], false);
        gf.getStore().loadData([], false);
        gl.getStore().loadPage(1, {
            params: {
                employee_employee_id: rec.get("employee_id")
            },
            callback: function(recs, op) {


                gl.attachModel(op);

                gf.getStore().loadPage(1, {
                    params: {
                        employee_employee_id: rec.get("employee_id")
                    },
                    callback: function(recsf, opf) {


                        gf.attachModel(opf);


                        motherFunc();
                    }
                });
            }
        });



        return false;
    },
    afterCallNew: function() {
        var me = this;
        me.disableForm(false);
        var g = me.getGrid();
        me.getFormdata().editedRow = -1;
        me.disableTBButtonsOnGrid(true);
        me.newClaim();

    },
    newClaim: function() {
        var me = this;
        var f = me.getFormdata();

        var g = me.getGrid();
        var rec = g.getSelectedRecord();
        f.down("[name=employee_name]").setReadOnly(true);
        f.down("[name=employee_nik]").setReadOnly(true);
        if (rec) {
            f.loadRecord(rec);
            f.down("[name=tanggal_klaim]").setValue(new Date());
        } else {
            me.tools.alert.warning("Please select employee first");
            me.disableTBButtonsOnGrid(false);
        }

    },
    cancelOnClick: function() {
        var me = this;
        me.disableTBButtonsOnGrid(false);
    },
    disableTBButtonsOnGrid: function(isCreate) {
        var me = this;
        var g = me.getGrid();
        g.down("toolbar button[action=save]").setDisabled(!isCreate);
        g.down("toolbar button[action=cancel]").setDisabled(!isCreate);
        g.down("toolbar button[action=create]").setDisabled(isCreate);
        g.down("toolbar button[action=edit]").setDisabled(isCreate);
    },
    saveOnClick: function() {
        var me = this;
        var f = null;
        var fm = me.getFormdata();
        console.log("savee...");

        var g = null;

        var activeTab = fm.down("tabpanel").getActiveTab();

        if (activeTab) {
            g = activeTab.down("grid");
            f = activeTab.down("form");
        }

        me.insSave({
            form: f,
            grid: g,
            // store: me.localStore["detail"].store,
            store: g.getStore(),
            finalData: function(data) {
                data["tipe_klaim"] = activeTab.itemId === 'lensTabPanel' ? 'L' : 'F';
                data["employee_employee_id"] = fm.down("[name=employee_id]").getValue();
                return data;
            },
            sync: true,
            callback: {
                create: function(store, form, grid) {

                }
            }
        });
    },
    editOnClick: function() {
        var me = this;
        var at = me.getFormdata().down("tabpanel").getActiveTab();
        if (at) {
            var f = at.down("form");
            me.tools.formHelper(f).readOnly(false);
            me.disableTBButtonsOnGrid(true);


        }


    },
    deleteOnClick: function() {
        var me = this;
        var at = me.getFormdata().down("tabpanel").getActiveTab();
        if (at) {
            var g = at.down("grid");
            var rec = g.getSelectedRecord();
            if (rec) {
                Ext.Msg.show({
                    title: 'Confirm Delete',
                    msg: 'Are you sure you want to delete this record?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(clicked) {
                        if (clicked === "yes") {

                            me.confirmDeleteOnClick(g.getStore(), rec, me.getPanel().up("window"));
                        }
                    }
                });
            }
        }


    },
    confirmDeleteOnClick: function(store, rec, window) {
        var msg = function() {
            window.mask('Deleting data, please wait ...');
        };
        store.removeAt(rec.index);
        store.on('beforesync', msg);
        store.sync({
            success: function(s) {
                window.unmask();
                store.un('beforesync', msg);
                store.reload();

                Ext.Msg.show({
                    title: 'Success',
                    msg: "Record deleted",
                    icon: Ext.Msg.INFO,
                    buttons: Ext.Msg.OK
                });
            },
            failure: function() {
                window.unmask();
                store.un('beforesync', msg);
                store.reload();
                Ext.Msg.show({
                    title: 'Failure',
                    msg: 'Error',
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        });
    }

});