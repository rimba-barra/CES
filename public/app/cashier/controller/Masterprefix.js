Ext.define('Cashier.controller.Masterprefix', {
    extend: 'Cashier.library.template.controller.Controller2',
    alias: 'controller.Masterprefix',
    requires: [
        'Cashier.view.masterprefix.DetailGrid',
    ],
    refs: [
        {
            ref: 'panel',
            selector: 'masterprefixpanel'
        },
        {
            ref: 'grid',
            selector: 'masterprefixgrid'
        },
        {
            ref: 'detailgrid',
            selector: 'masterprefixdetailgrid'
        },
        {
            ref: 'formdata',
            selector: 'masterprefixformdata'
        },
        {
            ref: 'formsearch',
            selector: 'masterprefixformsearch'
        },
    ],
    controllerName: 'masterprefix',
    fieldName: 'prefix',
    bindPrefixName: 'Masterprefix',
    formxWinId: 'win-masterprefixwinId',
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
            'masterprefixformsearch [name=project_id]': {
                change: function (v) {
                    var f = me.getFormsearch();
                    if (v.value) {
                        me.project_id = v.value;
                        var pt = f.down("[name=pt_id]").getStore();
                        pt.clearFilter();
                        pt.filter('project_project_id', v.value, true, false);
                        if(v.value==apps.project){
                            f.down("[name=pt_id]").setValue(parseInt(apps.pt));
                        }else{
                            f.down("[name=pt_id]").setValue('');
                        }
                    }
                }
            },
            'masterprefixformsearch [name=pt_id]': {
                change: function (el) {
                    var value = el.value;
                    var g = me.getGrid();
                    me.pt_id = value;
//                    me.setprojectpt(el.name, el.ownerCt, 'project_id');
                }
            },
            'masterprefixformdata [name=project_project_id]': {
                change: function (el) {
                    var f = me.getFormdata();
                    if (el.value) {
                        var pt = f.down("[name=pt_pt_id]").getStore();
                        pt.clearFilter();
                        pt.filter('project_project_id', el.value, true, false);
                        if(el.value==me.project_id){
                            f.down("[name=pt_pt_id]").setValue(me.pt_id);
                        }else{
                            f.down("[name=pt_pt_id]").setValue('');
                        }
                    }
//                    me.setprojectpt(el.name, el.ownerCt, 'project_project_id');
                }
            },
            'masterprefixformdata [name=pt_pt_id]': {
                change: function (el) {
                    var f = me.getFormdata();
//                    if (el.value) {
//                        me.pt_id = el.value;
//                    }
//                    me.setprojectpt(el.name, el.ownerCt, 'project_project_id');
                }
            },
            'masterprefixdetailgrid ': {
                selectionchange: function (v) {
                    me.detailgridselectionchange();
                }
            },
            'masterprefixgrid toolbar button[action=export]': {
                click: function() {
                    var me = this;
                    me.processexport();
                }
            }
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
                    me.tools.weseav2(data.project, f.down("[name=project_id]")).comboBox('', function () {
                        f.down("[name=project_id]").setValue(parseInt(apps.project));
                    });
                    me.tools.weseav2(data.pt, f.down("[name=pt_id]")).comboBox('', function () {
                        var combostore = f.down('[name=pt_id]').getStore();
                        var record = combostore.findRecord('pt_id', parseInt(apps.pt),0,false,true,true);
                        if (record) {
                            combostore.filter('project_project_id', apps.project, true, false);
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
//            me.project_id = 0;

            me.fdar().create();
            me.setActiveForm(f);
            me.getCustomRequestComboboxv2('detailproject', '', '', '', 'project_project_id', 'pt', 'project', f, '', function () {
                f.down("[name=project_project_id]").setValue(me.project_id);
            });
            me.getCustomRequestComboboxv2('detailpt', '', '', '', 'pt_pt_id', 'pt', 'project', f, '', function () {
                f.down("[name=pt_pt_id]").setValue(me.pt_id);
            });

        } else if (state == 'update') {
            me.setActiveForm(f);
            f.editedRow = g.getSelectedRow();
            me.getCustomRequestComboboxv2('detailproject', '', '', '', 'project_project_id', 'pt', 'project', f, '', function () {
                f.loadRecord(rec);
            });
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
    processexport: function() {
        var me = this;
        var fs = me.getFormsearch();
        var grid = me.getGrid();

        var project_id = fs.down("[name=project_id]").getValue();
        var pt_id      = fs.down("[name=pt_id]").getValue();

        grid.setLoading("Exporting Data...");
        Ext.Ajax.request({
            url: 'cashier/masterprefix/export',
            params: {
                data: Ext.encode({
                    project_id: project_id,
                    pt_id: pt_id,
                    hideparam: 'exportdata',
                    userprint: apps.username
                })
            },
            success: function(response) {
                grid.setLoading(false);
                var res = Ext.JSON.decode(response.responseText);
                var me = this;
                var file_path = res['url'];  
                var a = document.createElement('A');
                a.href = file_path;
                a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        })
    }
});
