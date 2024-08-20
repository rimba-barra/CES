Ext.define('Cashier.controller.Pemutihan', {
    extend: 'Cashier.library.template.controller.Controller2',
    alias: 'controller.Pemutihan',
    views: ['pemutihan.PemutihanGrid','pemutihan.PemutihanpaidGrid'],
    requires: [
        'Cashier.view.pemutihan.PemutihanGrid',
        'Cashier.view.pemutihan.PemutihanpaidGrid',
        'Cashier.library.XyReportB',
        'Cashier.library.box.Config',
        'Cashier.library.box.tools.EventSelector',
        'Cashier.library.box.tools.Tools'
    ],
    stores: [
        'Vendorcombo'
        ],
    refs: [
        {
            ref: 'panel',
            selector: 'pemutihanpanel'
        },
        {
            ref: 'grid',
            selector: 'pemutihangrid'
        },
        {
            ref: 'paidgrid',
            selector: 'pemutihanpaidgrid'
        },
        {
            ref: 'formsearch',
            selector: 'pemutihanformsearch'
        },
        {
            ref: 'formpemutihan',
            selector: 'pemutihanformpemutihan'
        },
    ],
    controllerName: 'pemutihan',
    fieldName: 'schedule',
    bindPrefixName: 'Pemutihan',
    formxWinId: 'win-pemutihanwinId',
    pemutihan_id: 0,
    is_pemutihanpaid:0,
    ptId: 0,
    grid: null,
    formdatatype: 'in',
    pt_id:0,
    project_id:0,
    iwField: {
        title: 'Pemutihan List'
    },
    xyReport: null,
    reportFileName: null,
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
            
            'pemutihanformsearch [name=project_id]': {
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
            'pemutihanformsearch [name=pt_id]': {
                change: function (el) {
                    var value = el.value;
                    var g = me.getGrid();
//                    me.setprojectpt(el.name, el.ownerCt, 'project_id');
                    me.pt_id = value;
                    if (me.pt_id && me.project_id) {
                        g.down('[action=prosesp]').setDisabled(false);
                    }
                    if (me.is_pemutihanpaid) {
                        var f = me.getFormsearch();
                        var pt = f.down('[name=pt_id]').getValue();
                    }


                }
            },
            'pemutihanpanel [name=panel]': {
                tabchange: function (tabPanel, tab) {
                    me.grid = me.getGrid();
                    if (tab.name === "pemutihanpaidgrid") {
                        me.is_pemutihanpaid = 1;
                        me.grid = me.getPaidgrid();
                        var f = me.getFormsearch();
                        var pt = f.down('[name=pt_id]').getValue();
                        me.loadModelPemutihanPaid(function () {
                            me.grid.setLoading('Please wait');
                            var storear = me.grid.getStore();
                            var fields = f.getForm().getFieldValues();
                            for (var x in fields) {
                                storear.getProxy().setExtraParam(x, fields[x]);
                            }
                            storear.load({
                                callback: function () {
                                    me.grid.setLoading(false);
                                }
                            });
                        });
                        //getCustomRequestComboboxv2: function (paramname, val, val2, val3, field, model, submodel, form, param, callback, loading) {
                        me.getCustomRequestComboboxv2('cluster', pt, f.down("[name=project_id]").getValue(), '', 'pemutihan_cluster_id', 'cluster', '', f, '', function () {
                            f.down('[name=pemutihan_cluster_id]').setValue('');
                        });
                    } else {
                        me.grid = me.getGrid();
                        me.is_pemutihanpaid = 0;
                        var f = me.getFormsearch();
                        //getCustomRequestComboboxv2: function (paramname, val, val2, val3, field, model, submodel, form, param, callback, loading) {
                        me.getCustomRequestComboboxv2('cluster', pt, f.down("[name=project_id]").getValue(), '', 'pemutihan_cluster_id', 'cluster', '', f, '', function () {
                            f.down('[name=pemutihan_cluster_id]').setValue('');
                        });
                    }
                },
            },
            'pemutihangrid  ': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.formdetail,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange,
            },
            ' pemutihanpaidgrid ': {
                itemdblclick: this.formdetail,
                selectionchange: me.gridSelectionChangeOut,
                itemcontextmenu: me.gridItemContextMenuOut,
            },
            'pemutihangrid' :{
                afterrender: function(){
                    this.formdatatype = 'in';
                }
            },
           'pemutihanpaidgrid' :{
                afterrender: function(){
                    this.formdatatype = 'out';
                }
            },
            'pemutihangrid toolbar button[action=prosesp]': {
                click: function (el) {
                    var me = this;
                    me.instantWindow('FormPemutihan', 600, 'Proses Pemutihan', 'create', 'win-formpemutihanx');
                }
            },
            'pemutihanpaidgrid toolbar button[action=destroy]': {
                click: function (el) {
                    me.destroyout();
                }
            },
            'pemutihanformpemutihan': {
                afterrender: function (v) {
                    var state = v.up('window').state;
                    me.fdarbook(me,state);
                }
            },
            'pemutihanformpemutihan button[action=save]': {
                click: function (v) {
                    me.dataSaveBook();
                }
            },
        });
    },
    mainPanelBeforeRender: function (el) {
        var me = this;
        me.is_pemutihanpaid = 0;
        setupObject(el, me.execAction, me);
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
                            var storear = grid.getStore();
                            var fields = f.getForm().getFieldValues();
                            for (var x in fields) {
                                storear.getProxy().setExtraParam(x, fields[x]);
                            }
                            storear.loadPage(1);
                        }
                    });
                    me.tools.wesea(data.cluster, f.down("[name=pemutihan_cluster_id]")).comboBox();

                    me.reportFileName = data.FILE_REPORT;
                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to generate init.");
                }

                p.setLoading(false);
            }
        }).read('detail');
    },
    mainDataSave: function (mode) {
        var me = this;
        var m = typeof mode !== "undefined" ? mode : "";
        var fa = me.getFormdata();
        var gd = me.getDetailgrid();
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
    afterDataDetailInit: function (param, f) { //after
        var me = this;
        var fid = f.ownerCt.id;
        var g = me.getGrid();
    },
    gridSelectionChange: function () {
        var me = this;
        var grid = me.getGrid();
        var row = grid.getSelectionModel().getSelection();
        var prosesp = grid.down('#btnProsesp');
        if (prosesp !== null) {
            prosesp.setDisabled(row.length != 1);
        }

    },
    gridSelectionChangeOut: function () {
        var me = this;
        var grid = me.getPaidgrid();
        var row = grid.getSelectionModel().getSelection();
        var deleted = grid.down('#btnDelete');
        if (deleted !== null) {
            deleted.setDisabled(row.length != 1);
        }

    },
    gridSelectionDetail: function () {
        var me = this;
        var f = me.getFormdetail();
        var grid = me.getDetailgrid();
        var row = grid.getSelectionModel().getSelection();
        var deleted = f.down('#btnDelete');
        if (deleted !== null) {
            deleted.setDisabled(row.length < 1);
        }
    },
    newActionColumnClick: function () {
        var me = this;
    },
    loadModelPemutihanPaid: function (callback) {
        var me = this;
        var grid = me.grid;
        grid.getStore().clearFilter(true);
        grid.doInit();
        grid.getStore().load({
            params: {
            },
            callback: function (rec, op) {
                if (op) {
                    grid.attachModel(op);
                    if (typeof callback === "function") {
                        callback();
                    }
                } else {
                    console.log('error attach model grid');
                }
            }
        });
    },
    fdarbook: function (me,state) {
        var f = me.getFormpemutihan();
        var grid = me.getGrid();
        var rec = grid.getSelectedRecord();
        f.getForm().loadRecord(rec);
        me.setActiveForm(f);
    },
    dataSaveBook: function (call) {
        var me = this;
        var f = me.getFormpemutihan();
        
        if (f.getForm().isValid()) {

            me.tools.ajax({
                params: {
                    'hideparam': 'checkcoaconfigpemutihan',
                    'project_id': f.down("[name=project_id]").getValue(),
                    'pt_id': f.down("[name=pt_id]").getValue() 
                },
                form: f,
                success: function(data, model) {
                    if (data[0][0]['result'] == 0) {
                        
                        Ext.Msg.confirm("Confirm","COA config untuk Pemutihan Angsuran belum di setting. Sistem tidak akan membuat jurnal pemutihan secara otomatis. <br>Lanjutkan Proses ?", function(a) {
                            if (a == 'yes') {
                                me.tools.ajax({
                                    params: {
                                        schedule_id: f.down("[name=schedule_id]").getValue(),
                                        fp_no: f.down("[name=fp_no]").getValue(),
                                        note: f.down("[name=note]").getValue(),
                                        createjurnal: 'no'
                                    },
                                    form: f,
                                    success: function (data, model) {
                                        try {
                                            me.tools.alert.info("Data Successfully Updated.");
                                            f.up('window').close();
                                            me.getGrid().getStore().reload();
                                        } catch (err) {
                                            console.log(err.message);
                                            me.tools.alert.warning("Failed to Processing.");
                                        }
                                    }
                                }).read('prosespemutihan');
                            }
                        });
                        return false;
                    } else {
                        Ext.MessageBox.confirm(
                            'Confirm', 'Are you sure?', callbackPemutihan);
                         function callbackPemutihan(btn) {
                            if(btn == 'yes') {
                                    me.tools.ajax({
                                        params: {
                                            schedule_id: f.down("[name=schedule_id]").getValue(),
                                            fp_no: f.down("[name=fp_no]").getValue(),
                                            note: f.down("[name=note]").getValue(),
                                            createjurnal: 'yes'
                                        },
                                        form: f,
                                        success: function (data, model) {
                                            try {
                                                me.tools.alert.info("Data Successfully Updated.");
                                                f.up('window').close();
                                                me.getGrid().getStore().reload();
                                            } catch (err) {
                                                console.log(err.message);
                                                me.tools.alert.warning("Failed to Processing.");
                                            }
                                        }
                                    }).read('prosespemutihan');
                            }
                         };
                    }
                }
            }).read('checkcoaconfig');

                
        }
    },
    dataSearch: function () {
        resetTimer();
        var me = this;
        var grid;
        var form = me.getFormsearch().getForm();
        var fields = me.getFormsearch().getValues();
        if (!me.is_pemutihanpaid) {
            grid = me.getGrid();
        } else {
            grid = me.getPaidgrid();
        }
        grid.doInit();
        var store = grid.getStore();
        for (var x in fields)
        {
            store.getProxy().setExtraParam(x, fields[x]);
        }
        me.loadPage(store);
    },
    destroyout: function () {
        var me = this;
        var rows = me.getPaidgrid().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            var confirmmsg, successmsg, failmsg;
            var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            var store = me.getPaidgrid().getStore();
            if (rows.length == 1) {
                var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(me.fieldName) + ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }
            Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
                if (btn == 'yes') {
                    resetTimer();
                    var msg = function () {
                        me.getGrid().up('window').mask('Deleting data, please wait ...');
                    };
                    for (var i = 0; i < rows.length; i++) {

                        store.remove(rows[i]);
                    }

                    store.on('beforesync', msg);
                    store.sync({
                        success: function (s) {
                            me.getGrid().up('window').unmask();
                            var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
                            var successmsg = (rows.length == 1 ? selectedRecord : 'Records') + ' deleted successfully.';
                          // var successmsg = (rows.length == 1 ? selectedRecord : (successcount != rows.length ? successcount + ' of ' : '') + recordcounttext) + ' deleted successfully.';
                            store.un('beforesync', msg);
                            store.reload();
                            Ext.Msg.show({
                                title: 'Success',
                                msg: successmsg,
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK
                            });
                        },
                        failure: function () {
                            me.getGrid().up('window').unmask();
                            store.un('beforesync', msg);
                            store.reload();
                            Ext.Msg.show({
                                title: 'Failure',
                                msg: failmsg + ' The data may have been used.',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        },
                        error: function () {
                            me.getGrid().up('window').unmask();
                            store.un('beforesync', msg);
                            store.reload();
                            Ext.Msg.show({
                                title: 'Error',
                                msg: failmsg + ' Delete request error.',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    });
                }
            });
        }
    },
    mainPrint: function () {
        var me = this;
        if (me.reportFileName) {
            if (!me.xyReport) {
                me.xyReport = new Cashier.library.XyReportB();
                me.xyReport.init(me);
            }
            me.xyReport.processReportJs();
        } else {
            me.tools.alert.warning("Template not found.");
        }
    },
    xyReportProcessParams: function (reportData) {
        var me = this;
        var fn = me.reportFileName;
        var f = me.getFormdetail();
        var pemutihan_id = f.down("[name=pemutihan_id]").getValue();
        var cheque_no = f.down("[name=cheque_no]").getValue();
        var issued_date = f.down("[name=issued_date]").getValue();

       	var g = me.getDetailgrid();
        var f = me.getFormdetail();
        var store = g.getStore();
        var ttl = 0;
        store.each(function (rec) {
        	if(rec.get("kasbank_dataflow") != rec.get("cheque_cheque_type")){
        		ttl += parseInt(rec.get("cheque_amount")) * parseInt(-1);
        	}else{
        		 ttl += accounting.unformat(rec.get("cheque_amount"));
        	}
           
        });
        reportData['file'] = fn;
        reportData.params["issued_date"] = issued_date;
        reportData.params["pemutihan_id"] = pemutihan_id;
        reportData.params["cheque_no"] = cheque_no;
        reportData.params["total_amount"] = ttl;
        return reportData;
    },
});
