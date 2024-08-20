Ext.define('Cashier.controller.Mastercoaconfig', {
    extend: 'Cashier.library.template.controller.Controller2',
    alias: 'controller.Mastercoaconfig',
    requires: [
        'Cashier.library.BrowseCashier',
    ],
    refs: [
        {
            ref: 'panel',
            selector: 'mastercoaconfigpanel'
        },
        {
            ref: 'grid',
            selector: 'mastercoaconfiggrid'
        },
        {
            ref: 'formdata',
            selector: 'mastercoaconfigformdata'
        },
        {
            ref: 'formsearch',
            selector: 'mastercoaconfigformsearch'
        },
        {
            ref: 'detailgrid',
            selector: 'mastercoaconfigvaluegrid'
        },
        {
            ref: 'subcodegrid',
            selector: 'subcodegrid'
        },
        {
            ref: 'formdatadetail',
            selector: 'mastercoaconfigformaddvalue'
        }
    ],
    controllerName: 'mastercoaconfig',
    fieldName: 'name',
    bindPrefixName: 'Mastercoaconfig',
    formxWinId: 'win-mastercoaconfigwinId',
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
            'mastercoaconfigvaluegrid toolbar button[action=create]': {
                click: function (el, act) {
                    me.formDataDetail('create');
                }
            },
            'mastercoaconfigvaluegrid toolbar button[action=update]': {
                click: function (el, act) {
                    me.formDataDetail('update');
                }
            },
            'mastercoaconfigvaluegrid toolbar button[action=destroy]': {
                click: function (el, act) {
                    me.destroydetail();
                }
            },
            'mastercoaconfigformaddvalue button[action=save]': {
                click: function (el, act) {
                    me.savedetail();
                }
            },
            'mastercoaconfigformaddvalue [name=coa_id]': {
                select: function () {
                    me.coaChange();
                }
            },
            'mastercoaconfigformaddvalue [name=cashflow_setupcashflow_id]': {
                select: function (val) {
                    me.cashflowChange(val);
                }
            },
            'mastercoaconfigformaddvalue [name=status]': {
                select: function (val) {
                    me.statusChange(val.value);
                }
            },
            'mastercoaconfigformaddvalue [name=cluster_id]': {
                select: function (val) {
                    var me = this;
                    var f = me.getFormdatadetail();
                    var cluster = f.down("[name=cluster_id]").getStore().findRecord("cluster_id", val.value);
                    f.down("[name=cluster_cluster]").setValue(cluster.data['cluster']);
                }
            },
            
            'mastercoaconfigformaddvalue [action=browsesubcode]': {
                click: function (val) {
                    me.browseSubcode(me);
                }
            },
            'subcodegrid [action=select]': {
                click: function (v) {
                    me.loadSubcode(v);
                }
            },
//            'mastercoaconfigformsearch [name=project_id]': {
//                select: function (val) {
//                    var f = me.getFormsearch();
//                    if (val.value) {
//                        f.down('[name=pt_id]').setReadOnly(false);
//                        f.down('[name=pt_id]').setValue('');
//                        me.getCustomRequestComboboxv2('getptfromproject', val.value, '', '', 'pt_id', 'pt', '', f, '', function () {
//
//                        });
//                    }
//
//                }
//            },
            'mastercoaconfigformsearch [name=pt_projectpt_id]': {
                change: function (el) {
                    var value = el.value;
                    var me = this;
                    var f = me.getFormsearch();
                    if (el.valueModels[0] !== "undefined") {
                        var data_pt_id = el.valueModels[0].data.pt_id;
                        var data_project_id = el.valueModels[0].data.project_project_id;
                        f.down("[name=pt_id]").setValue(parseInt(data_pt_id));
                        f.down("[name=project_id]").setValue(parseInt(data_project_id));    
                    }
                    
                    // me.setprojectpt(el.name, el.ownerCt, 'project_id');
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

                    me.tools.weseav2(data.pt, f.down("[name=pt_projectpt_id]")).comboBox('', function () {
                        var combostore = f.down('[name=pt_projectpt_id]').getStore();
                        var record = combostore.findRecord('pt_projectpt_id', parseInt(apps.projectpt),0,false,true,true);
                        if (record) {
                            f.down("[name=pt_projectpt_id]").setValue(parseInt(apps.projectpt));
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
//    fdar: function () {
//        var me = this;
//        var f = me.getFormdata();
//        var g = me.getGrid();
//        me.setActiveForm(f);
//        g.down("[itemId=btnNew]").setDisabled(true);
//        var x = {
//            init: function () {
//                me.fdarInit();
//            },
//            create: function () {
//                me.unMask(1);
//
//                var g = me.getDetailgrid();
//                g.doInit();
//                g.getStore().load({
//                    params: {
//                        coa_config_id: f.down("[name=coa_config_id]").getValue()
//                    },
//                    callback: function (rec, op) {
//                        g.attachModel(op);
//                    }
//                });
//                f.deletedRows = [];
//            },
//            update: function () {
//                var rec = g.getSelectedRecord();
//                f.editedRow = g.getSelectedRow();
//                f.deletedRows = [];
//                f.loadRecord(rec);
//                f.down("[name=name]").setReadOnly(true);
//                f.down("[name=name]").setDisabled(false);
//                // me.fdarUpdate(rec);
//                me.unMask(1);
//                //BEGIN CODE
//                var gd = me.getDetailgrid();
//                gd.doInit();
//                gd.getStore().load({
//                    params: {
//                        coa_config_id: f.down("[name=coa_config_id]").getValue()
//                    },
//                    callback: function (rec, op) {
//                        gd.attachModel(op);
//                    }
//                });
//                //END BEGIN CODE
//            }
//        };
//        return x;
//    },

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
            var g = me.getDetailgrid();
            g.doInit();
            g.getStore().load({
                params: {
                    coa_config_id: f.down("[name=coa_config_id]").getValue()
                },
                callback: function (rec, op) {
                    g.attachModel(op);
                }
            });
            f.deletedRows = [];

        } else if (state == 'update') {
            me.setActiveForm(f);
            f.editedRow = g.getSelectedRow();
            var rec = g.getSelectedRecord();
            f.deletedRows = [];
            f.loadRecord(rec);
            f.down("[name=name]").setReadOnly(true);
            f.down("[name=name]").setDisabled(false);
            // me.fdarUpdate(rec);

            //BEGIN CODE
            var gd = me.getDetailgrid();
            gd.doInit();
            gd.getStore().load({
                params: {
                    coa_config_id: f.down("[name=coa_config_id]").getValue()
                },
                callback: function (rec, op) {
                    gd.attachModel(op);
                }
            });
        }


    },
//    mainDataSave: function (mode) {
//        var me = this;
//        var m = typeof mode !== "undefined" ? mode : "";
//        var f = me.getFormdatadetail();
//        var fa = me.getFormdata();
//        me.tools.iNeedYou(me).save(false, function (data)
//        {
//            data.detail = me.getDetailgrid().getJson();
//            data.deletedRows = fa.deletedRows;
//            return data;
//        }
//        );
//
//
//    },
    mainDataSave: function (mode) {
        var me = this;
        var m = typeof mode !== "undefined" ? mode : "";
        var fa = me.getFormdata();

        if (fa.getForm().isValid()) {
            me.insSave({
                form: fa,
                grid: me.getGrid(),
                finalData: function (data) {
                    data.detail = me.getDetailgrid().getJson();
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
    formDataDetail: function (param) {
        var me = this;
        var w = me.instantWindow('FormAddValue', 700, 'Add detail Coa Account ', param, 'coadetailaccwin');
        var f = me.getFormdatadetail();
        var fs = me.getFormsearch();
        me.pt_id = fs.down("[name=pt_id]").getValue();
        me.project_id = fs.down("[name=project_id]").getValue();
        
        f.setLoading("Please wait");
        me.tools.ajax({
            params: {
                pt_id : me.pt_id,
                project_id : me.project_id
            },
            success: function (data, model) {

                me.tools.wesea(data.glcoa, f.down("[name=coa_id]")).comboBox(false);
                me.tools.wesea(data.cluster, f.down("[name=cluster_id]")).comboBox(false);
                me.afterDataDetailInit(param, f);
                f.setLoading(false);
            }
        }).read('inits');
    },
    afterDataDetailInit: function (param, f) {
        var me = this;
        if (param == 'update') {
            var g = me.getDetailgrid();
            f.kosongGa = g.getSelectedRow(); //getSelectedRow untuk ambil row yang di klik user ,hanya 1
            f.loadRecord(g.getSelectedRecord()); //getSelectedRecord fungsi extjs
        }
    },
    savedetail: function () {
        var me = this;
        var f = me.getFormdatadetail();
        var value = f.getValues();
        var g = me.getDetailgrid();
        var persen = value["persen"];
        if (f.kosongGa > -1) {
            var rec = g.getStore().getAt(f.kosongGa);
            if (isNaN(parseFloat(persen))) {
                me.tools.alert.warning("Persen Harus angka.");
                return true;
            } else {
                rec.beginEdit();
                rec.set(value);
                rec.endEdit();
            }
        } else {
            if (isNaN(parseFloat(persen))) {
                me.tools.alert.warning("Persen Harus angka.");
                return true;
            } else {
                g.getStore().add(value);
            }

        }
        f.up('window').close();
    },
    destroydetail: function () {
        var me = this;
        var f = me.getFormdatadetail();
        var fa = me.getFormdata();
        var g = me.getDetailgrid();
        var records = g.getSelectionModel().getSelection();
        for (var i = records.length - 1; i >= 0; i--) {
            //console.log(g.getStore().getAt(i));
            var row = g.getStore().indexOf(records[i]);

            var id = records[i]['data']["coa_config_detail_id"];
            if (id) {
                fa.deletedRows.push(id);
            }

            g.getStore().removeAt(row);
        }
        //return store.indexOf(this.getSelectionModel().getSelection()[0]);
    },
    coaChange: function () {
        var me = this;
        var f = me.getFormdatadetail();
        var coa = f.down("[name=coa_id]").getValue();
        var selected = me.tools.comboHelper(f.down("[name=coa_id]")).getField('coa_id', 'coa');
        var selectedName = me.tools.comboHelper(f.down("[name=coa_id]")).getField('coa_id', 'name');
        var selectedType = me.tools.comboHelper(f.down("[name=coa_id]")).getField('coa_id', 'type');
        f.down("[name=coa_name]").setValue(selectedName);
        f.down("[name=code]").setValue(selected);

        var selectedKelsubId = me.tools.comboHelper(f.down("[name=coa_id]")).getField('coa_id', 'kelsub_kelsub_id');
        var selectedKelsub = me.tools.comboHelper(f.down("[name=coa_id]")).getField('coa_id', 'kelsub_kelsub');
        var selectedKelsubDesc = me.tools.comboHelper(f.down("[name=coa_id]")).getField('coa_id', 'kelsub_description');

        f.down("[name=kelsub_kelsub]").setValue(selectedKelsub);
        f.down("[name=kelsub_description]").setValue(selectedKelsubDesc);
        f.down("[name=kelsub_kelsub_id]").setValue(selectedKelsubId);

        me.getCustomRequestComboboxModule('voucher', 'getcashflow', coa, '', '', 'cashflow_setupcashflow_id', 'cashflow', ['cashflowtype', 'grouptype'], f);
        //f.down("[name=type]").setValue(selectedType);
    },
    cashflowChange: function (val) {
        var me = this;
        var f = me.getFormdatadetail();
        var selectedCF = me.tools.comboHelper(f.down("[name=cashflow_setupcashflow_id]")).getField('setupcashflow_id', 'cashflowtype_cashflowtype');
        var selectedCFType = me.tools.comboHelper(f.down("[name=cashflow_setupcashflow_id]")).getField('setupcashflow_id', 'cashflowtype_cashflowtype_id');
        //  console.log(selectedCF);
        // console.log(selectedCFType);
        f.down("[name=cashflowtype_cashflowtype]").setValue(selectedCF);
        f.down("[name=cashflowtype_cashflowtype_id]").setValue(selectedCFType);

    },
    statusChange: function(val) {
        var me = this;
        var f = me.getFormdatadetail();
        //console.log(val);
        if(val === "targetroundup") {
            f.down('[name=persen]').setValue(0);
            f.down('[name=persen]').setReadOnly(true);
        } else {
            f.down('[name=persen]').setReadOnly(false);
        }
    }
    ,
    browseSubcode: function (el, ar) {
        var ps;
        var me = this;
        var browse = new Cashier.library.BrowseCashier();
        var localstore = 'selectedSubcode';
        var f = me.getFormdatadetail();
        var fs = me.getFormsearch();
        var kelsub = f.down('[name=kelsub_kelsub_id]').getValue();
        browse.init({
            controller: me,
            view: 'SubcodeGrid',
            el: el,
            localStore: localstore,
            mode_read: "selectedsubcode",
            bukaFormSearch: true,
        });
        browse.showWindow(function () {
            Ext.getCmp('kelsubIdSubcode').setValue(kelsub);
            Ext.getCmp('ptVoucherIdSubcode').setValue(me.pt_id);
            Ext.getCmp('projectVoucherIdSubcode').setValue(me.project_id);
        }, function () {
            if (me.pt_id) {
                Ext.getCmp('ptVoucherIdSubcode').setValue(me.pt_id);
                Ext.getCmp('kelsubIdSubcode').setValue(kelsub);
                Ext.getCmp('projectVoucherIdSubcode').setValue(me.project_id);
            }
            
            var gc = me.getSubcodegrid();
            var storear = gc.getStore();
            var fields = Ext.getCmp('MySuperBrowseWindow').getForm().getFieldValues();
            for (var x in fields) {
                storear.getProxy().setExtraParam(x, fields[x]);
            }
            storear.load({
                callback: function (records, options, success) {
                    gc.down("pagingtoolbar").doRefresh();
                    Ext.getCmp('ptVoucherIdSubcode').setValue(me.pt_id);
                    Ext.getCmp('kelsubIdSubcode').setValue(kelsub);
                }
            });
        });
    },
     
    loadSubcode: function (el) {
        var me = this;
        var g = me.getSubcodegrid();
        var f = me.getFormdatadetail();
        var rec = g.getSelectedRecord();
        f.down('[name=subgl_code]').setValue(rec.get('code'));
        f.down('[name=subgl_id]').setValue(rec.get("subgl_id"));
        f.down('[name=subgl_code1]').setValue(rec.get("code1"));
        f.down('[name=subgl_code2]').setValue(rec.get("code2"));
        f.down('[name=subgl_code3]').setValue(rec.get("code3"));
        f.down('[name=subgl_code4]').setValue(rec.get("code4"));
        f.down('[name=subgl_description]').setValue(rec.get("description"));
        el.up('window').destroy();
    }, 
});