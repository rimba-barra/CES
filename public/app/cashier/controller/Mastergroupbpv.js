Ext.define('Cashier.controller.Mastergroupbpv', {
    extend: 'Cashier.library.template.controller.Controller2',
    alias: 'controller.Mastergroupbpv',
    requires: [
        'Cashier.view.mastergroupbpv.DetailGrid',
    ],
    refs: [
        {
            ref: 'panel',
            selector: 'mastergroupbpvpanel'
        },
        {
            ref: 'grid',
            selector: 'mastergroupbpvgrid'
        },
        {
            ref: 'detailgrid',
            selector: 'mastergroupbpvdetailgrid'
        },
        {
            ref: 'formdata',
            selector: 'mastergroupbpvformdata'
        },
        {
            ref: 'formsearch',
            selector: 'mastergroupbpvformsearch'
        },
    ],
    controllerName: 'mastergroupbpv',
    fieldName: 'prefix',
    bindPrefixName: 'Mastergroupbpv',
    formxWinId: 'win-mastergroupbpvwinId',
    project_id: 0,
    pt_arr: [],
    constructor: function (configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Cashier.library.box.Config({
            _controllerName: me.controllerName
        });
    },
    init: function () {
        var me = this;
        var events = new Cashier.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools = new Cashier.library.box.tools.Tools({config: me.myConfig});
        this.control({
            'mastergroupbpvformsearch [name=pt_id]': {
                change: function (el) {
                    me.setprojectpt(el.name, el.ownerCt, 'project_id');
                }
            },
            'mastergroupbpvformdata [name=pt_pt_id]': {
                change: function (el) {
                    me.setprojectpt(el.name, el.ownerCt, 'project_project_id');
                }
            },
            'mastergroupbpvdetailgrid ': {
                selectionchange: function (v) {
                    me.detailgridselectionchange();
                }
            },
        });
    },
    panelAfterRender: function () {
        var me = this;
        var p = me.getPanel();
        var f = me.getFormsearch();
        p.setLoading("Please wait");
        me.tools.ajax({
            params: {module: me.controllerName},
            form: p,
            success: function (data, model) {

                try {
                    me.tools.weseav2(data.pt, f.down("[name=pt_id]")).comboBox('', function () {
                        var combostore = f.down('[name=pt_id]').getStore();
                        var record = combostore.findRecord('pt_id', parseInt(apps.pt));
                        if (record) {
                            f.down("[name=pt_id]").setValue(parseInt(apps.pt));
                            var grid = me.getGrid();
                            grid.setLoading('Please wait');
                            var storear = grid.getStore();
                            var fields = f.getForm().getFieldValues();
                            for (var x in fields) {
                                storear.getProxy().setExtraParam(x, fields[x]);
                            }
                            storear.load({
                                callback: function () {
                                    grid.setLoading(false);
                                }
                            });
                        }
                    });

                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to generate init.");
                }

                p.setLoading(false);
            }
        }).read('init');
    },
    formDataAfterRender: function (el) {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        var rec = g.getSelectedRecord();
        var state = el.up('window').state;
        me.fdar().init();
        if (state == 'create') {
            me.project_id = 0;

            me.fdar().create();
            me.setActiveForm(f);
            me.getCustomRequestComboboxv2('detailpt', '', '', '', 'pt_pt_id', 'pt', 'project', f, '', function () {
                f.down("[name=pt_pt_id]").setValue(me.pt_id);
            });

        } else if (state == 'update') {
            me.setActiveForm(f);
            f.editedRow = g.getSelectedRow();
            me.getCustomRequestComboboxv2('detailpt', "", '', '', 'pt_pt_id', 'pt', 'project', f, '', function () {
                f.loadRecord(rec);
            });

        }
    },
    mainDataSave: function (mode) {
        var me = this;
        var m = typeof mode !== "undefined" ? mode : "";
        var fa = me.getFormdata();
        if (fa.getForm().isValid()) {
            me.insSave({
                form: fa,
                grid: me.getGrid(),
                finalData: function (data) {
                    data['deletedRows'] = fa.deletedRows;
                    return data;
                },
                sync: true,
                callback: function (a, b, c) {
                },
                cb: function () { //ini baru jaalan callbacknya, di atas gajalan
                    if (typeof call === "function") {
                        call();
                    }
                }
            });
        }


    },
});
