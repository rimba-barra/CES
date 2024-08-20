Ext.define('Cashier.controller.MasterMultiProject', {
    extend: 'Cashier.template.ControllerForMaster',
    alias: 'controller.MasterMultiProject',
    requires: [
    'Cashier.view.mastermultiproject.DetailGrid',
    ],
    refs: [{
        ref: 'panel',
        selector: 'mastermultiprojectpanel'
    }, {
        ref: 'grid',
        selector: 'mastermultiprojectgrid'
    }, {
        ref: 'detailgrid',
        selector: 'mastermultiprojectdetailgrid'
    }, {
        ref: 'formdata',
        selector: 'mastermultiprojectformdata'
    }, {
        ref: 'formsearch',
        selector: 'mastermultiprojectformsearch'
    }, ],
    controllerName: 'mastermultiproject',
    fieldName: 'user_user_fullname',
    bindPrefixName: 'MasterMultiProject',
    formxWinId: 'win-mastermultiprojectwinId',
    project_id: 0,
    multiproject_id: 0,
    pt_arr: [],
    init: function() {
        var me = this;
        var events = new Cashier.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools = new Cashier.library.box.tools.Tools({
            config: me.myConfig
        });
        this.control({
            'mastermultiprojectformsearch [name=pt_pt_id]': {
                change: function(el) {
                    var value = el.value;
                    me.ptChange(value);
                }
            },
            'mastermultiprojectdetailgrid ': {
                selectionchange: function(v) {
                    me.detailgridselectionchange();
                }
            },
            'mastermultiprojectformdata [name=project_project_id]': {
                select: function(v) {
                    if (v.value) {
                        me.loadModelCompany(v.value, 'checked');
                    }
                }
            }
        });
    },
    fdar: function(el) {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        me.setActiveForm(f);
        var x = {
            init: function() {
                me.fdarInit();
                me.project_id = 0;
            },
            create: function() {
                me.project_id = 0;
                me.unMask(1);
                me.getCustomRequestCombobox('user', '', 'user_user_id', 'user', '', f, '');
                me.getCustomRequestCombobox('project', '', 'project_project_id', 'project', '', f, '');
                me.loadModelCompany();
            },
            update: function() {
                me.getCustomRequestCombobox('user', '', 'user_user_id', 'user', '', f, 'update');
                me.getCustomRequestCombobox('project', '', 'project_project_id', 'project', '', f, 'update', function() {
                    var pr = f.down('[name=project_project_id]').getValue();
                    var mp = f.down('[name=multiproject_id]').getValue();
                    me.project_id = pr;
                    me.multiproject_id = mp;
                    me.loadModelCompany();
                });

            }
        };
        return x;
    },
    ptChange: function(val) {
        var me = this;
        var f = me.getFormsearch();
        f.down("[name=pt_id]").setValue(val);
    },
    mainDataSave: function(mode) {
        var me = this;
        var m = typeof mode !== "undefined" ? mode : "";
        var fa = me.getFormdata();
        var gd = me.getDetailgrid();
        me.insSave({
            form: fa,
            grid: me.getGrid(),
            finalData: function(data) {
                data["detailpt"] = me.pt_arr;
                data['deletedRows'] = fa.deletedRows;

                return data;
            },
            sync: true,
            callback: function(a, b, c) {},
            cb: function() { //ini baru jaalan callbacknya, di atas tidak berjalan
                if (typeof call === "function") {
                    call();
                }
            }
        });

    },
    afterDataDetailInit: function(param, f) { //after
        var me = this;
        var fid = f.ownerCt.id;
        var g = me.getGrid();
        if (param == "update") {
            var rec = g.getSelectedRecord();
            f.editedRow = g.getSelectedRow();
            f.getForm().loadRecord(rec);
        }
    },
    loadModelCompany: function(project, cb) {
        var me = this;
        var g = me.getDetailgrid();
        g.getStore().clearFilter(true);
        g.doInit();
        g.getStore().load({
            params: {
                project_id: project ? project : me.project_id,
                multiproject_id: me.multiproject_id
            },
            callback: function(rec, op) {
                if (op) {
                    g.attachModel(op);
                    if (cb) {
                        //g.selModel.doSelect(g.store.data.items[0]);
                        var sm = g.getSelectionModel();
                        g.getStore().each(function(rec) {
                            var row = rec.index;
                            sm.select(row, true);
                        });
                    } else {
                        var sm = g.getSelectionModel();
                        g.getStore().each( function (rec, id) {
                            if ( rec.raw.multiprojectdetail.selected ) {
                                sm.select(id, true);
                            }
                        });
                    }
                } else {
                    console.log('error attach model ');
                }
            }
        });
    },
    detailgridselectionchange: function() {
        var me = this;
        var g = me.getDetailgrid();
        me.pt_arr = [];
        var mpdetail = '';
        var row = g.getSelectionModel().getSelection();
        row.forEach(function(rec) {

            me.pt_arr += rec.get("pt_id") + "~";
        });

    }
});