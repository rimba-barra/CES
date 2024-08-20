Ext.define('Cashier.controller.Writeoff', {
    extend: 'Cashier.library.template.controller.Controller2',
    alias: 'controller.Writeoff',
    views: ['writeoff.Grid','writeoff.AngsuranGrid','writeoff.Writeoffdendagrid'],
    requires: [
        'Cashier.view.writeoff.Grid',
        'Cashier.library.BrowseCashier',
        'Cashier.library.XyReportB',
        'Cashier.library.box.Config',
        'Cashier.library.box.tools.EventSelector',
        'Cashier.library.box.tools.Tools'
    ],
    stores: [
        ],
    refs: [
        {
            ref: 'panel',
            selector: 'writeoffpanel'
        },
        {
            ref: 'grid',
            selector: 'writeoffgrid'
        },
        {
            ref: 'formdata',
            selector: 'writeoffformdata'
        },
        {
            ref: 'angsurangrid',
            selector: 'writeoffangsurangrid'
        },
        {
            ref: 'formsearch',
            selector: 'writeoffformsearch'
        },
        {
            ref: 'writeoffdenda',
            selector: 'writeoffdendagrid'
        },
    ],
    controllerName: 'writeoff',
    fieldName: 'writeoff_no',
    bindPrefixName: 'Writeoff',
    formxWinId: 'win-writeoffwinId',
    browseHandler: null,
    userrole_id: 0,
    ptId: 0,
    grid: null,
    formdatatype: 'in',
    pt_id:0,
    project_id:0,
    writeoff_id:0,
    is_special_wo:0,
    iwField: {
        title: 'Write Off List'
    },
    localStore: {
        selectedAngsuran: null,
        detail: null,
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
            
            'writeoffformsearch [name=project_id]': {
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
            'writeoffformsearch [name=pt_id]': {
                change: function (el) {
                    var value = el.value;
                    var g = me.getGrid();
//                    me.setprojectpt(el.name, el.ownerCt, 'project_id');
                    me.pt_id = value;


                }
            },
            'writeoffpanel [name=panel]': {
                tabchange: function (tabPanel, tab) {
                    me.grid = me.getGrid();
                    var f = me.getFormsearch();
                },
            },
            'writeoffpanel button[action=writeoff]': {
                click: function(){
                    var fs = me.getFormsearch();
                    var msg = me.checklimit(fs.down("[name=project_id]").getValue(),fs.down("[name=pt_id]").getValue());
                    if(msg!=''){
                        me.tools.alert.warning(msg);
                    }else{
                        me.selectUnitGridShow(0);
                    }
                }
            },
            'writeoffpanel button[action=writeoffspecial]': {
                click: function(){
                    var fs = me.getFormsearch();
                    var msg = me.checklimit(fs.down("[name=project_id]").getValue(),fs.down("[name=pt_id]").getValue());
                    if(msg!=''){
                        me.tools.alert.warning(msg);
                    }else{
                        me.selectUnitGridShow(1);
                    }
                }
            },
            'writeoffgrid  ': {
                afterrender: this.gridAfterRender,
//                itemdblclick: this.formdetail,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange,
            },
            'writeoffgrid toolbar button[action=create]': {
                click: function (el) {
                    var me = this;
//                    me.instantWindow('FormData', 800, 'Write Off User Role', 'create', 'win-formwriteoffx');
                }
            },
//            'writeoffgrid': {
//                itemdblclick: function () {
//                    me.instantWindow('FormData', 800, 'Write Off', 'update', 'win-formwriteoffx');
//                },
//            },
            'writeoffgrid toolbar [action=update]': {
                click: function () {
                    me.fdarbook(me, 'update');
                },
            },
            'writeoffgrid toolbar [action=deletes]': {
                click: function () {
                    me.writeoffdestroy();
                },
            },
            'writeoffangsurangrid ': {
                selectionchange: function () {
                    var me = this;
                    var grid = me.getAngsurangrid();
                    var store = grid.getStore();
                    var row = grid.getSelectionModel().getSelection();
                    var temp = false;
                    row.forEach(function (rec) {
                        if (rec.get("oppaid") <= 0) {
                            temp = true;
                        }
                    });
                    grid.down('[action=select]').setDisabled(temp);
                },
                itemdblclick: function (v, rec) {
                    var me = this;
                    var grid = me.getAngsurangrid();
                    if (parseFloat(rec.get("oppaid")) > 0) {
                        me.scheduleSelect(v,grid.store.proxy.extraParams['tipeangsuran']);
                    } else {
                        return false;
                    }

                }
            },
            'writeoffangsurangrid button[action=select]': {
                click: function (v) {
                    var me = this;
                    var grid = me.getAngsurangrid();
                    var rec = grid.getSelectedRecord();
                    me.scheduleSelect(v,grid.store.proxy.extraParams['tipeangsuran']);
                }
            },
            'writeoffformdata [action=savewoff]': {
                click: function () {
                    var me = this;
                    me.mainDataSave();
                }
            },
        });
    },
    mainPanelBeforeRender: function (el) {
        var me = this;
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

                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to generate init.");
                }

                p.setLoading(false);
            }
        }).read('detail');
    },
    afterDataDetailInit: function (param, f) { //after
        var me = this;
        var fid = f.ownerCt.id;
        var g = me.getGrid();
    },
    gridSelectionDetail: function () {
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
    fdar: function () {
        var me = this;
        var state='update';
        var f = me.getFormdata();
        var fs = me.getFormsearch();
        var grid = me.getGrid();
        var rec = grid.getSelectedRecord();
        var x = {
            init: function() {
                /// init here
            },
            create: function() {

                me.getCustomRequestCombobox('detailproject', '', '', '', 'project_project_id', 'multiproject', 'project', f, '', function () {

                    if(state=='create'){
                        f.down("[name=project_project_id]").setValue(parseInt(fs.down("[name=project_id]").getValue()));
                    }
                });
                me.getCustomRequestCombobox('detailpt', '', '', '', 'pt_pt_id', 'pt', '', f, '', function () {
                    if(state=='create'){
                        f.down("[name=pt_pt_id]").setValue(parseInt(fs.down("[name=pt_id]").getValue()));
                    }
                });
            },
            update: function() {
                var grid = me.getGrid();
                var store = grid.getStore();
                
                $("#win-writeoffwinId_header-targetEl .x-tool-maximize").click();
                var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                me.getFormdata().loadRecord(record);
                /// update here
                f.down("#btnSave").setVisible(false);
            }
        };
        return x;
        
        if(state=='update'){
            f.down("[name=project_project_id]").setReadOnly(true);
            f.down("[name=note]").setReadOnly(true);
            f.down("[name=pt_pt_id]").setReadOnly(true);
            f.getForm().loadRecord(rec);
        }
        me.setActiveForm(f);
    },
    dataSaveBook: function (call) {
        var me = this;
        var f = me.getFormdata();
        if (f.getForm().isValid()) {
            Ext.MessageBox.confirm(
                        'Confirm', 'Are you sure?', callbackWriteoff);
                     function callbackWriteoff(btn) {
                        if(btn == 'yes') {
                                me.tools.ajax({
                                    params: {
                                        userrole_id: f.down("[name=userrole_id]").getValue(),
                                        role_id: f.down("[name=role_id]").getValue(),
                                        user_id: f.down("[name=user_id]").getValue(),
                                        project_id: f.down("[name=project_project_id]").getValue(),
                                        pt_id: f.down("[name=pt_pt_id]").getValue()
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
                                }).read('proseswriteoff');
                        }
                     };
        }
    },
    dataSearch: function () {
        resetTimer();
        var me = this;
        var grid;
        var form = me.getFormsearch().getForm();
        var fields = me.getFormsearch().getValues();

        grid = me.getGrid();
        grid.doInit();
        var store = grid.getStore();
        for (var x in fields)
        {
            store.getProxy().setExtraParam(x, fields[x]);
        }
        me.loadPage(store);
    },
    writeoffdestroy: function () {
        var me = this;
        var rows = me.getGrid().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            var confirmmsg, successmsg, failmsg;
            var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            var store = me.getGrid().getStore();
            if (rows.length == 1) {
                var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get('writeoff_no')+ ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }
            Ext.Msg.confirm('Delete Data', confirmmsg +'<br>Reason <br><textarea type="text" id="reasondelete" name="reasondelete"></textarea>' , function (btn) {
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
    getCustomRequestCombobox: function (paramname, val, val2, val3, field, model, submodel, form, param, callback, loading, displayall) {
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
            success: function (data, model, v) {
                try {
                    var obj = [];
                    for (var key in data) {
                        obj = data[key];
                    }
                    if (field) {
                        me.tools.wesea(obj, form.down("[name=" + field + "]")).comboBox(displayall, function () {
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
    
    selectUnitGridShow: function (is_special_wo) {
        var ps;
        var me = this;
        var localstore = 'selectedAngsuran';
        me.kasbank_id = 0;
        me.is_erems = 0;
        me.is_special_wo = is_special_wo;
        var pt_id = me.getFormsearch().down("[name=pt_id]").getValue();
        var project_id = me.getFormsearch().down("[name=project_id]").getValue();
        var browse = new Cashier.library.BrowseCashier();
        var ar = 'AngsuranGridSearch';
        browse.init({
            controller: me,
            view: 'AngsuranGrid',
            localStore: localstore,
            mode_read: "selectedangsuran",
            bukaFormSearch: true,
        });
        browse.showWindow(function () {
            if (me.pt_id) {
                Ext.getCmp('ptArIdangsuran').setValue(pt_id);
                Ext.getCmp('ptArIdangsuran').setValue(pt_id);
            }
            Ext.getCmp('ptArIdangsuran').setValue(pt_id);
            Ext.getCmp('projectArId').setValue(project_id);
            Ext.getCmp('schedulePaymentflag_id').setValue(2);
            Ext.getCmp('tipeangsuran').setValue('nonkpr');
        });
        if (ar == 'AngsuranGridNoSearch') {
            var f = me.getFormdata();
            var ps = f.rowData;
            var gridar = me.getAngsurangrid();
            var storear = gridar.getStore();
            me.getSelectedSchedule();
            if (ps) {
                Ext.getCmp('unitNumberId').setValue(ps.get('unit_unit_number'));
                Ext.getCmp('purchaseletterNoId').setValue(ps.get('purchaseletter_purchaseletter_no'));
                Ext.getCmp('customerNameId').setValue(ps.get('customer_name'));
                Ext.getCmp('unitscheduleAngsuranId').setValue(ps.get('unit_unit_id'));
                Ext.getCmp('projectArId').setValue(ps.get('project_project_id'));
                Ext.getCmp('ptArIdangsuran').setValue(ps.get('pt_pt_id') ? ps.get('pt_pt_id') : me.pt_id);
                Ext.getCmp('scheduleAngsuranId').setValue(me.schedule_id);
                if (ps.get('payment_paymentflag_id') === 2) {
                    Ext.getCmp('schedulePaymentflag_id').setValue(2);
                } else {
                    Ext.getCmp('schedulePaymentflag_id').setValue(1);
                }
                Ext.getCmp('unitNumberId').setReadOnly(true);
                Ext.getCmp('purchaseletterNoId').setReadOnly(true);
                Ext.getCmp('customerNameId').setReadOnly(true);
                Ext.getCmp('ptArIdangsuran').setReadOnly(true);
                Ext.getCmp('projectArId').setReadOnly(true);
            }
            var fields = Ext.getCmp('MySuperBrowseWindow').getForm().getFieldValues();
            for (var x in fields) {
                storear.getProxy().setExtraParam(x, fields[x]);
            }
            storear.loadPage(1);
        }else{
            me.bukaform = 0;
        }
    },
    scheduleSelect: function (v,tipeangsuran) {
        var me = this;
        var cmpformdata = Ext.getCmp('formdatawriteoffID');
        if (!cmpformdata) {
            var w = me.instantWindow('FormData', 990, 'Add Writeoff', 'create', 'win-formwriteoffx');
        } else {
            v.up("window").close();
        }
        var f = me.getFormdata();
        me.writeoff_id = 0;
        var me = this;
        var grid = me.getAngsurangrid();
        var detailgrid = me.getWriteoffdenda();
        var row = grid.getSelectionModel().getSelection();
        var rec = grid.getSelectedRecord();
        me.projectId = rec.get("project_project_id");
        me.ptId = rec.get("pt_pt_id");
        me.paymentflag_id = 2; // 1 installment payment, 2 other payment
        f.setLoading('Please wait');
        me.getCustomRequestCombobox('detailproject', '', '', '', 'project_project_id', 'multiproject', 'project', f, '', function () {
            
            f.down("[name=project_project_id]").setValue(parseInt(rec.get("project_project_id")));
        });
        me.getCustomRequestCombobox('detailpt', '', '', '', 'pt_pt_id', 'pt', '', f, '', function () {
            f.down("[name=pt_pt_id]").setValue(parseInt(rec.get("pt_pt_id")));
            
        });
        f.down("[name=purchaseletter_id]").setValue(rec.get("purchaseletter_purchaseletter_id"));
        f.down("[name=purchaseletter_no]").setValue(rec.get("purchaseletter_purchaseletter_no"));
        f.down("[name=purchase_date]").setValue(rec.get("purchaseletter_purchase_date"));
        f.down("[name=unit_number]").setValue(rec.get("unit_unit_number"));
        f.down("[name=is_special_wo]").setValue(me.is_special_wo);
        f.down('[name=pt_pt_id]').setReadOnly(true);
        f.down('[name=project_project_id]').setReadOnly(true);
        f.down('[name=unit_number]').setReadOnly(true);
        f.down('[name=purchaseletter_no]').setReadOnly(true);
        f.down('[name=purchase_date]').setReadOnly(true);

        
        detailgrid.getStore().loadData([], false);
        detailgrid.getStore().clearFilter(true);
        detailgrid.doInit();
        detailgrid.getStore().load({
            params: {
                writeoff_id: me.writeoff_id
            },
            callback: function (rec, op) {
                if (op) {
                    detailgrid.attachModel(op);
                    me.GridDenda();
                    row.forEach(function (rec) {
                        rec.beginEdit();
                        rec.set({'writeoff':0});
                        rec.set({'after_writeoff':accounting.formatMoney(rec.get("remaining_balance"))});
                        rec.set({'persentase_writeoff':0});
                        rec.endEdit();
                        detailgrid.getStore().add(rec);
                        detailgrid.getStore().commitChanges();
                    });
                    
                    f.setLoading(false);
                } else {
                    console.log('error attach model');
                }
            }
        });
        Ext.getCmp('browseangsurangrid').up("window").close();
    },
    formDataAfterRender: function (el) { //fdar
        var state = el.up('window').state;
        var wid = el.up('window').id;
        var me = this;
        var f = me.getFormdata();
        var fs = me.getFormsearch();
        var grid = me.getGrid();
        var rec = grid.getSelectedRecord();
        me.fdar().init();
        me.getCustomRequestCombobox('detailproject', '', '', '', 'project_project_id', 'multiproject', 'project', f, '', function () {
            if(state=='update'){
                f.down("[name=project_project_id]").setValue(parseInt(rec.get("project_id")));
            }
        });
        me.getCustomRequestCombobox('detailpt', '', '', '', 'pt_pt_id', 'pt', '', f, '', function () {
            if(state=='update'){
                f.down("[name=pt_pt_id]").setValue(parseInt(rec.get("pt_id")));
            }
        });
        if (state == 'create') {
            me.fdar().create();
            me.setActiveForm(f);
        } else if (state == 'update') {
            me.fdar().update();
            me.writeoff_id=rec.get("writeoff_id");
            me.loadModelDenda();
            me.setActiveForm(f);
        }
    },
    loadModelDenda: function () {
        var me = this;
        var grid = me.getWriteoffdenda();
        grid.getStore().clearFilter(true);
        grid.doInit();
        grid.getStore().load({
            params: {
                writeoff_id: me.writeoff_id
            },
            callback: function (rec, op) {
                if (op) {
                    grid.attachModel(op);
                } else {
                    console.log('error attach model');
                }
            }
        });
    },
    GridDenda: function () {
        var indexdata, getindex, record, row;
        var me = this;
        me.final = 0;
        var g = me.getWriteoffdenda();
        var f = me.getFormdata();
        var store = g.getStore();
        var count = store.getCount();
        g.on({
            scope: this,
            edit: function (roweditor, event) {
                var count = store.getCount();
                var final = accounting.unformat(event.record.get('remaining_balance')) - accounting.unformat(event.value);
                var val = accounting.unformat(event.record.get("remaining_balance"));
                var persentase = (accounting.unformat(event.value)/accounting.unformat(event.record.get('remaining_balance')))*3;

                if (accounting.unformat(event.value) > val) {
                    me.tools.alert.warning("Nilai writeoff harus lebih kecil dari remaining");
                    event.record.set('writeoff', val);
                    event.record.set('after_writeoff', 0);
                    return false;
                } else {
                    event.record.set('after_writeoff', accounting.formatMoney(final));
                    event.record.set('persentase_writeoff', persentase.toFixed(2));
                    store.commitChanges();
                }
            },
            beforeedit: function (a, b) {
                
            }
        });
    },
    mainDataSave: function (call) {
        var me = this;
        var f = me.getFormdata();
        me.mainSave(call);
    },
    mainSave: function(call){
        var me = this;
        var f = me.getFormdata();
        var grid = me.getGrid();
        var griddenda = me.getWriteoffdenda();
        me.insSave({
            form: f,
            grid: grid,
            finalData: function (data) {
                data["writeoffdetail"] = griddenda.getJson();
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
    ,checklimit:function(project_id,pt_id){ 
        var msg = '';
        Ext.Ajax.request({
            url: 'cashier/writeoff/read',
            method: 'POST',	
            async: false ,
            params: {
                pt_id: pt_id,
                project_id: project_id,
                mode_read: 'checklimit'
            },
            success: function (response) {
                var data = Ext.JSON.decode(response.responseText);
                if(data.data['msg']!=''){
                    msg = data.data['msg'];
                }

            },
            failure: function (response) {

            }
        }); 
        return msg;
    }
});
