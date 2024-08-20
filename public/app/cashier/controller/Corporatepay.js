Ext.define('Cashier.controller.Corporatepay', {
    extend: 'Cashier.library.template.controller.Controller2',
    alias: 'controller.Corporatepay',
    views: ['corporatepay.Grid', 'corporatepay.ListvoucherGrid', 'corporatepay.VoucherGrid'],
    requires: [
        'Cashier.view.corporatepay.Grid',
        'Cashier.view.corporatepay.ListvoucherGrid',
        'Cashier.library.BrowseCashier',
        'Cashier.library.XyReportB',
        'Cashier.library.box.Config',
        'Cashier.library.box.tools.EventSelector',
        'Cashier.library.box.tools.Tools'
    ],
    stores: [],
    refs: [{
        ref: 'panel',
        selector: 'corporatepaypanel'
    }, {
        ref: 'listvouchergrid',
        selector: 'listvouchergrid'
    }, {
        ref: 'vouchergrid',
        selector: 'vouchergrid'
    }, {
        ref: 'formdata',
        selector: 'corporatepayformdata'
    }, {
        ref: 'grid',
        selector: 'corporatepaygrid'
    }, {
        ref: 'formsearch',
        selector: 'corporatepayformsearch'
    }, ],
    controllerName: 'corporatepay',
    fieldName: 'filename',
    bindPrefixName: 'Corporatepay',
    formxWinId: 'win-corporatepaywinId',
    browseHandler: null,
    userrole_id: 0,
    ptId: 0,
    grid: null,
    formdatatype: 'in',
    pt_id: 0,
    project_id: 0,
    corporatepay_id: 0,
    iwField: {
        title: 'Corporate Payable List'
    },
    localStore: {
        selectedvoucher: null,
        detail: null,
    },
    xyReport: null,
    reportFileName: null,
    constructor: function(configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Cashier.library.box.Config({
            _controllerName: me.controllerName
        });
    },
    init: function() {
        var me = this;
        var events = new Cashier.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools = new Cashier.library.box.tools.Tools({
            config: me.myConfig
        });
        this.control({

            'corporatepayformsearch [name=project_id]': {
                change: function(v) {
                    var f = me.getFormsearch();
                    if (v.value) {
                        me.project_id = v.value;
                        var pt = f.down("[name=pt_id]").getStore();
                        pt.clearFilter();
                        pt.filter('project_project_id', v.value, true, false);
                        if (v.value == apps.project) {
                            f.down("[name=pt_id]").setValue(parseInt(apps.pt));
                        } else {
                            f.down("[name=pt_id]").setValue('');
                        }
                    }
                }
            },
            'corporatepayformdata [action=savenew]': {
                click: function(val) {
                    var me = this;
                    me.mainSave();
                }
            },
            'corporatepayformdata [name=project_project_id]': {
                change: function(val) {
                    var me = this;
                    var state = val.up('window').state;
                    var f = me.getFormdata();
                    if (val.value) {
                        f.down("[name=pt_pt_id]").setValue('');
                        me.getCustomRequestComboboxV2('detailptfilter', val.value, '', '', 'pt_pt_id', 'pt', '', f, '',
                            function() {

                            });
                    }
                }
            },
            'corporatepayformdata [name=pt_pt_id]': {
                change: function(val) {
                    var me = this;
                    var state = val.up('window').state;
                    var grid = me.getGrid();
                    var rec = grid.getSelectedRecord();
                    var f = me.getFormdata();
                    if (val.value) {
                        me.getCustomRequestComboboxV2('debitsource', val.value, f.down('[name=project_project_id]').getValue(), '', 'debitsource_id', 'debitsource', '', f, '',
                            function() {
                                if (state == "update") {
                                    f.down("[name=debitsource_id]").setValue(rec.get("debitsource_id"));
                                }
                            });
                    }
                }
            },
            'corporatepayformsearch [name=pt_id]': {
                change: function(el) {
                    var value = el.value;
                    var g = me.getGrid();
                    //                    me.setprojectpt(el.name, el.ownerCt, 'project_id');
                    me.pt_id = value;


                }
            },
            'listvouchergrid toolbar [action=create]': {
                click: function() {
                    me.browseVoucher(me);
                }
            },
            'listvouchergrid toolbar [action=destroy]': {
                click: function(el) {
                    me.dataDestroyVcr(el);
                }
            },
            'listvouchergrid ': {
                selectionchange: function() {
                    var me = this;
                    var grid = me.getListvouchergrid();
                    var store = grid.getStore();
                    var row = grid.getSelectionModel().getSelection();
                    console.log(row);
                    grid.down('[action=destroy]').setDisabled(true);
                    row.forEach(function(rec) {
                        grid.down('[action=destroy]').setDisabled(false);
                    });
                },
            },
            'corporatepaypanel [name=panel]': {
                tabchange: function(tabPanel, tab) {
                    me.grid = me.getGrid();
                    var f = me.getFormsearch();
                },
            },
            'corporatepaygrid  ': {
                afterrender: this.gridAfterRender,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: function(el) {
                    var me = this;
                    var grid = me.getGrid();
                    me.gridSelectionChangeDefault(grid);
                },
            },
            'vouchergrid [action=pickvoucher]': {
                click: function(el) {
                    me.vcrSelect(el);
                }
            },
            // SEFTIAN ALFREDO 03/11/21
            'corporatepaygrid button[action=export]': {
                click: me.exportData
            },
            'corporatepaygrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'corporatepaygrid toolbar button[action=close]': {
                click: me.closeData
            },
        });
    },

    gridSelectionChangeDefault: function(grid) {
        var me = this;
        if (grid) {
            var rec = grid.getSelectedRecord(),
                row = grid.getSelectionModel().getSelection();

            // if (row.length > 0) {
            grid.down('[action=destroy]').setDisabled(row.length < 1);
            for (var i = 0; i < row.length; i++) {
                if (row[i].data.status == 2) {
                    grid.down('[action=destroy]').setDisabled(true);
                }
            }

            if (grid.down('[action=update]')) {
                grid.down('[action=update]').setDisabled(row.length != 1 || row[0].data.status == 2);
            }
            if (grid.down('[action=export]')) {
                grid.down('[action=export]').setDisabled(row.length != 1);
            }
            if (grid.down('[action=close]')) {
                grid.down('[action=close]').setDisabled(row.length != 1 || row[0].data.status == 2);
            }
            // }
        }
    },
    mainPanelBeforeRender: function(el) {
        var me = this;
        setupObject(el, me.execAction, me);
    },
    formDataAfterRender: function(el) { //fdar
        var state = el.up('window').state;
        var wid = el.up('window').id;
        var me = this;
        var f = me.getFormdata();
        var fs = me.getFormsearch();
        me.fdar().init();
        me.detailFdar(el);
        if (state == 'create') {
            me.fdar().create();
            me.setActiveForm(f);
            f.down('[name=filedate]').setValue(me.dateNow);
        } else if (state == 'update') {
            var state = 'update';
            me.fdar().update();
            me.setActiveForm(f);
            f.deletedRows = [];
        }
    },
    fdar: function() {
        var me = this;
        var state = 'update';
        var f = me.getFormdata();
        var fs = me.getFormsearch();
        var grid = me.getGrid();
        var rec = grid.getSelectedRecord();
        var x = {
            init: function() {

            },
            create: function() {

                f.down('[name=filedate]').setValue(me.dateNow);
                $("#win-corporatepaywinId_header-targetEl .x-tool-maximize").click();
                f.deletedListVcr = [];
            },
            update: function() {
                var grid = me.getGrid();
                var store = grid.getStore();

                f.deletedListVcr = [];
                $("#win-corporatepaywinId_header-targetEl .x-tool-maximize").click();
                var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                me.getFormdata().loadRecord(record);
            }
        };
        return x;

        if (state == 'update') {
            f.down("[name=project_project_id]").setReadOnly(true);
            f.down("[name=pt_pt_id]").setReadOnly(true);
            f.getForm().loadRecord(rec);
        }
        me.setActiveForm(f);
    },
    panelAfterRender: function() {
        var me = this;
        var p = me.getPanel();
        var f = me.getFormsearch();


        p.setLoading("Please wait");
        me.tools.ajax({
            params: {
                module: me.controllerName
            },
            form: p,
            success: function(data, model) {

                try {
                    me.tools.weseav2(data.project, f.down("[name=project_id]")).comboBox('', function() {
                        f.down("[name=project_id]").setValue(parseInt(apps.project));
                    });
                    me.tools.weseav2(data.pt, f.down("[name=pt_id]")).comboBox('', function() {
                        var combostore = f.down('[name=pt_id]').getStore();
                        var record = combostore.findRecord('pt_id', parseInt(apps.pt), 0, false, true, true);
                        if (record) {
                            combostore.filter('project_project_id', apps.project, true, false);
                            f.down("[name=pt_id]").setValue(parseInt(apps.pt));
                            var grid = me.getGrid();
                            var storear = grid.getStore();
                            var fields = f.getForm().getFieldValues();
                            for (var x in fields) {
                                storear.getProxy().setExtraParam(x, fields[x]);
                            }
                            storear.loadPage(1);
                        }
                    });

                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to generate init.");
                }

                p.setLoading(false);
            }
        }).read('detail');
    },
    detailFdar: function(el) {
        var me = this;
        var p = me.getPanel();
        var grid = me.getGrid();
        var rec = grid.getSelectedRecord();
        var g = me.getListvouchergrid();
        var f = me.getFormdata();
        var states = el.up('window').state;
        me.tools.ajax({
            params: {
                module: me.controllerName
            },
            form: p,
            success: function(data, model) {

                try {
                    me.tools.wesea(data.project, f.down("[name=project_project_id]")).comboBox('', function() {
                        me.tools.wesea(data.pt, f.down("[name=pt_pt_id]")).comboBox('', function() {
                            if (states == "update") {
                                f.down("[name=project_project_id]").setValue(rec.get("project_project_id"));
                                f.down("[name=pt_pt_id]").setValue(rec.get("pt_pt_id"));
                            } else {
                                f.down("[name=project_project_id]").setValue(parseInt(apps.project));
                                f.down("[name=pt_pt_id]").setValue(parseInt(apps.pt));
                            }
                        });
                    });

                    if (states == "update") {


                        if ( rec.get('status') == 2 ) {
                            var gridVcr = me.getListvouchergrid();
                            me.tools.alert.warning('Data Telah di close, anda tidak dapat melaukan update atau delete');
                            f.down('#btnSavenew').setDisabled(rec.get('status') == 2);
                            f.down("[name=transferdate]").setReadOnly(true);
                            f.down("[name=debitsource_id]").setReadOnly(true);
                            f.down("#panelDetailVoucher").setDisabled(true);
                        }

                        f.editedRow = grid.getSelectedRow();
                        f.down("[name=project_project_id]").setReadOnly(true);
                        f.down("[name=pt_pt_id]").setReadOnly(true);
                        f.down("[name=transferdate]").setValue(moment(rec.get("transferdate")).format("DD-MM-YYYY"));
                        f.down("[name=filedate]").setValue(moment(rec.get("filedate")).format("DD-MM-YYYY"));
                        g.getStore().clearFilter(true);
                        g.doInit();
                        g.getStore().load({
                            params: {
                                corporatepay_id: rec.get("corporatepay_id")
                            },
                            callback: function(rec, op) {
                                if (op) {
                                    g.attachModel(op);
                                } else {
                                    console.log('error attach model list voucher');
                                }


                            }

                        });
                    }
                    if (states == "create") {

                        g.getStore().clearFilter(true);
                        g.doInit();
                        g.getStore().load({
                            params: {
                                corporatepay_id: 0
                            },
                            callback: function(rec, op) {
                                if (op) {
                                    g.attachModel(op);
                                } else {
                                    console.log('error attach model list voucher');
                                }


                            }

                        });
                        f.down('[name=filedate]').setValue(me.dateNow);
                    }

                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to generate init.");
                }

                p.setLoading(false);
            }
        }).read('detail');
    },
    afterDataDetailInit: function(param, f) { //after
        var me = this;
        var fid = f.ownerCt.id;
        var g = me.getGrid();
    },
    gridSelectionDetail: function() {
        var me = this;
        var f = me.getFormdetail();
        var grid = me.getDetailgrid();
        var row = grid.getSelectionModel().getSelection();
        var deleted = f.down('#btnDelete');
        var updated = f.down('#btnUpdate');
        if (deleted !== null) {
            deleted.setDisabled(row.length < 1);
        }
    },
    dataSearch: function() {
        resetTimer();
        var me = this;
        var grid;
        var form = me.getFormsearch().getForm();
        var fields = me.getFormsearch().getValues();

        grid = me.getGrid();
        grid.doInit();
        var store = grid.getStore();
        for (var x in fields) {
            store.getProxy().setExtraParam(x, fields[x]);
        }
        me.loadPage(store);
    },
    getCustomRequestCombobox: function(paramname, val, val2, val3, field, model, submodel, form, param, callback, loading, displayall) {
        var me = this;
        var f = form;
        f.setLoading('Please wait, load option box.');
        var d = null;
        var sm = [];
        if (submodel) {
            sm = Ext.encode(submodel);
        }
        me.tools.ajax({
            params: {
                module: me.controllerName,
                paramname: paramname,
                value: val,
                value2: val2,
                value3: val3,
                model: model,
                submodel: sm
            },
            form: form,
            success: function(data, model, v) {
                try {
                    var obj = [];
                    for (var key in data) {
                        obj = data[key];
                    }
                    if (field) {
                        me.tools.wesea(obj, form.down("[name=" + field + "]")).comboBox(displayall, function() {
                            if (typeof callback === "function") {
                                callback();
                            }
                        });
                    } else {
                        if (typeof callback === "function") {
                            callback();
                        }
                    }
                    if (param) {
                        me.afterDataDetailInit(param, f);
                    }


                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to load ini, please try re-open menu.");
                    f.setLoading(false);
                }
                if (!loading) {
                    f.setLoading(false);
                }

            }
        }).read('customrequest');
    },

    fillFormComponents: function(data, form) {
        var me = this;
        //        me.tools.wesea(data.debitsource, form.down("[name=debitsource_id]")).comboBox();
        me.tools.wesea(data.pt, form.down("[name=pt_pt_id]")).comboBox('', function() {

        });
        me.tools.wesea(data.project, form.down("[name=project_project_id]")).comboBox('', function() {

        });
    },

    getCustomRequestComboboxV2: function(paramname, val, val2, val3, field, model, submodel, form, param, callback, loading, displayall, val4) {
        var me = this;
        var f = form;
        f.setLoading('Please wait, load option box.');
        var d = null;
        var sm = [];
        if (submodel) {
            sm = Ext.encode(submodel);
        }
        me.tools.ajax({
            params: {
                module: me.controllerName,
                paramname: paramname,
                value: val,
                value2: val2,
                value3: val3,
                value4: val4,
                model: model,
                submodel: sm
            },
            form: form,
            success: function(data, model, v) {
                try {
                    var obj = [];
                    for (var key in data) {
                        obj = data[key];
                    }
                    if (field) {
                        me.tools.wesea(obj, form.down("[name=" + field + "]")).comboBox(displayall, function() {
                            if (typeof callback === "function") {
                                callback();
                            }
                        });
                    } else {
                        if (typeof callback === "function") {
                            callback();
                        }
                    }
                    if (param) {
                        me.afterDataDetailInit(param, f);
                    }


                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to load ini, please try re-open menu.");
                    f.setLoading(false);
                }
                if (!loading) {
                    f.setLoading(false);
                }

            }
        }).read('customrequest');
    },

    browseVoucher: function(el, ar) {
        var ps;
        var me = this;
        var browse = new Cashier.library.BrowseCashier();
        var localstore = 'selectedvoucher';
        var f = me.getFormdata();
        var project_id = f.down('[name=project_project_id]').getValue();
        var pt_id = f.down('[name=pt_pt_id]').getValue();
        var grid = me.getListvouchergrid();
        var storegrid = grid.getStore();
        var choosenkasbankid = '';
        storegrid.each(function(rec) {
            choosenkasbankid = choosenkasbankid + rec.get("kasbank_id") + ',';
        });
        browse.init({
            controller: me,
            view: 'VoucherGrid',
            el: el,
            localStore: localstore,
            mode_read: "kasbanklist",
            bukaFormSearch: true,
        });
        browse.showWindow(function() {
            Ext.getCmp('projectVoucherId').setValue(project_id);
            Ext.getCmp('ptVoucherId').setValue(pt_id);
            Ext.getCmp('choosenkasbankid').setValue(choosenkasbankid);
        }, function() {
            if (pt_id) {
                Ext.getCmp('projectVoucherId').setValue(project_id);
                Ext.getCmp('ptVoucherId').setValue(pt_id);
            }
            var gc = me.getVouchergrid();
            var storear = gc.getStore();
            var fields = Ext.getCmp('MySuperBrowseWindow').getForm().getFieldValues();
            for (var x in fields) {
                storear.getProxy().setExtraParam(x, fields[x]);
            }
            storear.load({
                callback: function(records, options, success) {
                    gc.down("pagingtoolbar").doRefresh();
                    Ext.getCmp('projectVoucherId').setValue(project_id);
                    Ext.getCmp('ptVoucherId').setValue(pt_id);
                    Ext.getCmp('choosenkasbankid').setValue(choosenkasbankid);
                }
            });
        });
    },

    vcrSelect: function(el) {
        var me = this;
        var f = me.getFormdata();
        var gridvcr = me.getVouchergrid();
        var grid = me.getListvouchergrid();
        var storegrid = grid.getStore();
        var row = gridvcr.getSelectionModel().getSelection();

        row.forEach(function(rec) {
            storegrid.add(rec);
            storegrid.commitChanges();
        });
        console.log(storegrid);
        el.up('window').destroy();
    },
    dataDestroyVcr: function(c, v) {
        var me = this;
        var grid = me.getListvouchergrid();
        var store = grid.getStore();
        var fa = me.getFormdata();
        var rows = grid.getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            var sum = 0;
            for (var i = 0; i < rows.length; i++) {
                var id = rows[i]['data']["corporatepaydetail_id"];
                if (id) {
                    fa.deletedListVcr.push(id);
                }
                store.remove(rows[i]);
            }

        }
    },

    mainSave: function(call) {
        var me = this;
        var f = me.getFormdata();
        var grid = me.getGrid();
        var griddetail = me.getListvouchergrid();
        var jsonDataEncode = [];
        var detailgridstore = griddetail.getStore();
        var state = f.up("window").state;
        var currentDate = Ext.Date.format(new Date(), 'Y-m-d');
        var isallow = true;
        var msg = '';
        if (f.down("[name=project_project_id]").getValue() == "" || f.down("[name=project_project_id]").getValue() == null) {
            isallow = false;
            msg = msg + "Silahkan pilih Project<br>";
        }
        if (f.down("[name=pt_pt_id]").getValue() == "" || f.down("[name=pt_pt_id]").getValue() == null) {
            isallow = false;
            msg = msg + "Silahkan pilih PT<br>";
        }
        if (currentDate > Ext.Date.format(f.down("[name=transferdate]").getValue(), 'Y-m-d')) {
            isallow = false;
            msg = msg + "Tanggal transfer tidak boleh kurang dari hari ini<br>";
        }
        if (f.down("[name=debitsource_id]").getValue() == "" || f.down("[name=debitsource_id]").getValue() == null) {
            isallow = false;
            msg = msg + "Silahkan pilih rekening sumber<br>";
        }
        if (detailgridstore.getCount() < 1) {
            isallow = false;
            msg = msg + "Silahkan pilih voucher<br>";
        }
        if (isallow == true) {
            me.insSave({
                form: f,
                grid: grid,
                finalData: function(data) {
                    data["corporatepaydetail"] = griddetail.getJson();
                    return data;
                },
                sync: true,
                callback: function(a, b, c) {},
                cb: function() { //ini baru jaalan callbacknya, di atas gajalan
                    if (typeof call === "function") {
                        call();
                    }
                }
            });
        } else {
            me.tools.alert.warning(msg);
        }
    },

    // SEFTIAN ALFREDO 03/11/21
    exportData: function() {
        var me = this;
        var rows = me.getGrid().getSelectionModel().getSelection();
        var fs = me.getFormsearch();
        var project_id = fs.down("[name=pt_id]").valueModels[0].data.project_project_id;
        var pt_id = fs.down("[name=pt_id]").valueModels[0].data.pt_id;
        var pt_name = fs.down("[name=pt_id]").valueModels[0].data.name;

        Ext.getBody().mask("Please wait...");
        me.tools.ajax({
            params: {
                corporatepay_id: rows[0].data.corporatepay_id,
                module: me.controllerName
            },
            form: fs,
            success: function(response) {
                me.info = response;
                me.setSuccessEventExport();
                Ext.getBody().unmask();
            }
        }).read('export');
    },
    closeData: function() {
        var me = this;
        var grid = me.getGrid();
        var rows = me.getGrid().getSelectionModel().getSelection();
        var corporatepay_id = rows[0].data.corporatepay_id;
        var filename = rows[0].data.filename;
        Ext.MessageBox.show({
            title: 'Close data?',
            msg: 'Data dengan nama ' + filename + ' akan diclose, apakah anda yakin?',
            buttons: Ext.MessageBox.OKCANCEL,
            icon: Ext.MessageBox.WARNING,
            fn: function(btn) {
                if (btn == 'ok') {
                    Ext.getBody().mask("Please wait...");
                    me.tools.ajax({
                        params: {
                            corporatepay_id: corporatepay_id,
                            module: me.controllerName
                        },
                        success: function(response) {
                            Ext.getBody().unmask();
                            me.tools.alert.info("Data berhasil diclose.");
                            me.getGrid().getStore().reload();
                        }
                    }).read('close');
                } else {
                    return;
                }
            }
        });
    },
    setSuccessEventExport: function() {

        var me = this;
        Ext.getBody().unmask();
        var file_path = me.info.url;
        var a = document.createElement('A');
        a.href = file_path;
        a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        Ext.getBody().unmask();
        me.getGrid().getStore().reload();
    },
    gridActionColumnClick: function(view, cell, row, col, e, grid) {
        var me, record, m, grid, store;
        me = this;
        grid = me.getGrid();
        store = grid.getStore();
        record = store.getAt(row);
        m = e.getTarget().className.match(/\bact-(\w+)\b/);
        grid.getSelectionModel().select(row);
        row = record['data'];

        if (m) {
            switch (m[1]) {
                case me.bindPrefixName + 'Export':
                    me.exportData();
                    break;

            }
        }
    },

});