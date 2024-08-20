Ext.define('Cashier.controller.Masterreceipt', {
    extend: 'Cashier.library.template.controller.Controller2',
    alias: 'controller.Masterreceipt',
    views: ['masterreceipt.Grid'],
    requires: [
        'Cashier.view.masterreceipt.Grid',
        'Cashier.library.BrowseCashier',
        'Cashier.library.XyReportB',
        'Cashier.library.box.Config',
        'Cashier.library.box.tools.EventSelector',
        'Cashier.library.box.tools.Tools',
        'Cashier.library.template.combobox.Ptprojectcombobox',
        'Cashier.library.template.combobox.Projectcombobox'
    ],
    stores: [
        'Project',
        'Pt'
    ],
    models: [
        'Project',
        'Pt'
    ],
    refs: [
        {
            ref: 'panel',
            selector: 'masterreceiptpanel'
        },
        {
            ref: 'formdata',
            selector: 'masterreceiptformdata'
        },
        {
            ref: 'grid',
            selector: 'masterreceiptgrid'
        },
        {
            ref: 'formsearch',
            selector: 'masterreceiptformsearch'
        },
    ],
    controllerName: 'masterreceipt',
    fieldName: 'receipt_no',
    bindPrefixName: 'Masterreceipt',
    formxWinId: 'win-masterreceiptwinId',
    browseHandler: null,
    userrole_id: 0,
    ptId: 0,
    grid: null,
    formdatatype: 'in',
    pt_id:0,
    project_id:0,
    receipt_id:0,
    iwField: {
        title: 'Receipt List'
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
            'masterreceiptformsearch': {
                change: function(){
                    var me = this;
                    me.loadPtbyProject(me.getFormsearch());
                }
            },
            'masterreceiptformsearch [name=project_id]': {
                change: function(){
                    var me = this;
                    me.loadPtbyProject(me.getFormsearch());
                }
            },
            'masterreceiptformsearch [name=pt_id]': {
                change: function (el) {
                    // var value = el.value;
                    // var g = me.getGrid();
                    // // me.setprojectpt(el.name, el.ownerCt, 'project_id');
                    // me.pt_id = value;
                }
            },
            'masterreceiptformdata [name=project_id]': {
                change: function(){
                    var me = this;
                    me.loadPtbyProject(me.getFormdata());
                }
            },
            'masterreceiptformdata [action=savedata]': {
                click: function () {
                    var me = this;
                    me.mainSave(function () {
                        
                    });
                }
            },
            'masterreceiptpanel [name=panel]': {
                tabchange: function (tabPanel, tab) {
                    me.grid = me.getGrid();
                    var f = me.getFormsearch();
                },
            },
            'masterreceiptgrid  ': {
                afterrender: this.gridAfterRender,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange,
            },
            'masterreceiptgrid toolbar [action=edit]': {
                click: function () {
                    me.instantWindow('FormData', 800, 'Receipt', 'update', 'win-masterreceiptwin');
                },
            },
            'masterreceiptgrid toolbar [action=delete]': {
                click: function () {
                    me.dataDestroy();
                },
            },
            'masterreceiptgrid toolbar [action=void]': {
                click: function () {
                    me.dataVoid();
                },
            },
            'masterreceiptgrid toolbar [action=usereceipt]': {
                click: function () {
                    me.useReceipt();
                },
            },
        });
    },
    mainPanelBeforeRender: function (el) {
        var me = this;
        setupObject(el, me.execAction, me);
        me.loadProject(me.getFormsearch());
    },
    formDataAfterRender: function (el) { //fdar
        var state = el.up('window').state;
        var wid = el.up('window').id;
        var me = this;
        var f = me.getFormdata();
        var fs = me.getFormsearch();
        var grid = me.getGrid();
        var rec = grid.getSelectedRecord();
        
        
        if (state == 'create') {
            me.loadProject(me.getFormsearch());
            me.loadProject(me.getFormdata());
            me.fdar().create();
            me.setActiveForm(f);
        } else if (state == 'update') {
            me.fdar().update();
            me.receipt_id=rec.get("receipt_id");
            me.setActiveForm(f);
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

            },
            update: function() {
                var grid = me.getGrid();
                var store = grid.getStore();
                // $("#win-masterreceiptwinId_header-targetEl .x-tool-maximize").click();
                var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                f.editedRow = grid.getSelectedRow();
                me.getFormdata().loadRecord(record);
                f.down("[name=counter_no]").setVisible(false);
                f.down("[name=project_id]").setReadOnly(true);
                f.down("[name=pt_id]").setReadOnly(true);
                f.down("[name=prefix_no_bfr]").setValue(record.get("prefix_no"));
                f.down("[name=receipt_type_bfr]").setValue(record.get("receipt_type"));
                f.down("[name=receipt_no_bfr]").setValue(record.get("receipt_no"));

                if(rec.get("status")!='NEW'){
                    f.down("[name=receipt_no]").setReadOnly(true);
                    f.down("[name=receipt_type]").setReadOnly(true);
                    f.down("[name=prefix_no]").setReadOnly(true);
                }
            }
        };
        return x;
        
        if(state=='update'){
            f.down("[name=project_id]").setReadOnly(true);
            f.down("[name=note]").setReadOnly(true);
            f.down("[name=pt_id]").setReadOnly(true);
            f.getForm().loadRecord(rec);
        }
        me.setActiveForm(f);
    },
    afterDataDetailInit: function (param, f) { //after
        var me = this;
        var fid = f.ownerCt.id;
        var g = me.getGrid();
    },
    dataSearch: function () {
        resetTimer();
        var me = this;
        var grid;
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
    
    execAction: function (el, action, me) {
        if (!action) {
            action = '';
        }
        if (!me) {
            me = this;
        }
    },
    mainSave: function (call) {
        var me = this;
        var f = me.getFormdata();
        var grid = me.getGrid();
        var jsonDataEncode = [];
        me.insSave({
            form: f,
            grid: grid,
            finalData: function (data) {
                return data;
            },
            sync: true,
            callback: function (a, b, c) {
            },
            cb: function () {
                if (typeof call === "function") {
                    call();
                }
            }
        });
    },
    dataDestroy: function () {
        var me = this;
        var p = me.getPanel();
        var rows = me.getGrid().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            var confirmmsg, successmsg, failmsg;
            var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            var store = me.getGrid().getStore();
            if (rows.length == 1) {
                var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(me.fieldName) + ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }
            
            var dataEncode = [];
            var voidused = [];
            rows.forEach(function (rec) {
                if(rec.get("status")=="VOID" || rec.get("status")=="USED" || rec.get("status")=="EXTERNAL-USED"){
                    
                    voidused.push({
                        receipt_id: rec.get("receipt_id")
                    });
                }
            });
            if(voidused.length>0){
                me.tools.alert.warning('Gagal hapus. Pastikan tidak ada receipt no berstatus void/used.');
                return false;
            }
            Ext.Msg.confirm('Delete Data', 
                    'Reason <br>'
                    +'<textarea type="text" id="reasondelete" name="reasondelete"></textarea>', function (btn) {
                if (btn == 'yes') {
                    if($('#reasondelete').val().length < 5){
                        Ext.Msg.show({
                            title: 'Warning',
                            msg: 'Form Reason tidak boleh kosong atau kurang dari 5 karakter.',
                            icon: Ext.Msg.WARNING,
                            buttons: Ext.Msg.OK
                        });
                        return false;
                    }

                    resetTimer();
                    rows.forEach(function (rec) {
                        dataEncode.push({
                            receipt_id: rec.get("receipt_id"),
                            reason_delete:Ext.get('reasondelete').getValue()
                        });
                    });
                    if(dataEncode.length>0){
                        p.setLoading('Deleting data, please wait ...');
                        me.tools.ajax({
                            module: me.controllerName,
                            data: dataEncode,
                            params: {module: me.controllerName},
                            panel: p,
                            async: false,
                            success: function (info, total, msg) {
                                try {

                                    if (!total) {
                                        me.tools.alert.warning(msg);
                                        p.setLoading(false);
                                    } else {

                                        for (var i = 0; i < rows.length; i++) {
                                            store.remove(rows[i]);
                                        }
                                        var successmsg = recordcounttext + ' Data deleted successfully.';
                                        me.tools.alert.info(successmsg);
                                        me.getGrid().getStore().load();
                                        p.setLoading(false);
                                    }
                                } catch (err) {
                                    console.log(err.message);
                                    me.tools.alert.warning("Failed to delete.");
                                    me.getGrid().getStore().load();
                                    me.getGrid().up('window').unmask();
                                    p.setLoading(false);
                                }
                                p.setLoading(false);
                            }
                        }).destroy();
                    }else{

                    }
                }
            });
        }
    },
    dataVoid: function () {
        var me = this;
        var p = me.getPanel();
        var rows = me.getGrid().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            var confirmmsg, successmsg, failmsg;
            var f = me.getFormdata();
            var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            var store = me.getGrid().getStore();
            if (rows.length == 1) {
                var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(me.fieldName) + ']';
                confirmmsg = 'Void ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to void ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will void ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to void data.';
            }
            
            var dataEncode = [];
            var voidused = [];
            rows.forEach(function (rec) {
                if(rec.get("status")=="VOID" || rec.get("status")=="USED" || rec.get("status")=="EXTERNAL-USED" ){
                    
                    voidused.push({
                        receipt_id: rec.get("receipt_id")
                    });
                }
            });
            if(voidused.length>0){
                me.tools.alert.warning('Gagal void. Pastikan tidak ada receipt no berstatus void/used.');
                return false;
            }
            Ext.Msg.confirm('Void Data', 
                    'Reason : <br><br>'
                    +'<textarea type="text" id="reasondelete" name="reasondelete" style="width:200px;height:60px;"></textarea>', function (btn) {
                if (btn == 'yes') {
                    if($('#reasondelete').val().length < 5){
                        Ext.Msg.show({
                            title: 'Warning',
                            msg: 'Form Reason tidak boleh kosong atau kurang dari 5 karakter.',
                            icon: Ext.Msg.WARNING,
                            buttons: Ext.Msg.OK
                        });
                        return false;
                    }
                    resetTimer();
                    rows.forEach(function (rec) {
                        dataEncode.push({
                            receipt_id: rec.get("receipt_id"),
                            reason_delete:Ext.get('reasondelete').getValue(),
                            project_id: rec.get("project_id"),
                            pt_id: rec.get("pt_id")
                        });
                    });
                    if(dataEncode.length>0){
                        p.setLoading('Update data, please wait ...');
                        me.tools.ajax({
                            module: me.controllerName,
                            data: dataEncode,
                            params: {module: me.controllerName,data:Ext.encode(dataEncode)},
                            panel: p,
                            async: false,
                            success: function (info, total, msg) {
                                try {


                                    for (var i = 0; i < rows.length; i++) {
                                        store.remove(rows[i]);
                                    }
                                    var successmsg = recordcounttext + ' Data void successfully.';
                                    me.tools.alert.info(successmsg);
                                    me.getGrid().getStore().load();
                                    p.setLoading(false);
                                } catch (err) {
                                    console.log(err.message);
                                    me.tools.alert.warning("Failed to void.");
                                    me.getGrid().getStore().load();
                                    me.getGrid().up('window').unmask();
                                    p.setLoading(false);
                                }
                                p.setLoading(false);
                            }
                        }).read('void');
                    }else{

                    }
                }
            });
        }
    },
    loadPtbyProject: function(f){

        var me = this;
        projectid = f.down("[name=project_id]").getValue();
         
        if(projectid != null){
            projectid = f.down("[name=project_id]").getValue();
        }else{
            projectid = apps.project;
        }
 
        var f = f;
        storecoa = me.getStore('Pt');
        storecoa.load({
            params: {
                "hideparam": 'getptbyuserproject',
                "start": 0,
                "limit": 1000000,
                "project_id": projectid,
                "user_id": apps.uid
            },
            callback: function (records, operation, success) {
                if (records[0]) {
                    var row = records[0]['data'];
                    if (projectid == apps.project) {
                        // me.setValueCombobox(me, 'pt_id', row.pt_id,row.ptname);
                        f.down("[name=pt_id]").setValue(parseInt(apps.pt));
                    } else {
                        f.down("[name=pt_id]").setValue();
                    }
                }
            }
        });
    },
    loadProject: function(f) {

        var me = this;

        storeproject = me.getStore('Project');
        storeproject.load({
            params: {
                "hideparam": 'projectpt',
                "project_id": apps.project,
                "start": 0,
                "limit": 1000000,
            }, callback: function (recordscode, operationcode, successcode) {
                if (successcode) {
                    if (recordscode[0]) {
                        var firstdatacode = recordscode[0]['data'];
                        f.down("[name=project_id]").setValue(parseInt(apps.project));                       
                    }
                }
            }
        });  
    },

    gridSelectionChange: function () {
        var me = this;
        var grid = me.getGrid(),
        row = grid.getSelectionModel().getSelection();
        grid.down('#btnUsereceipt').setDisabled(row.length < 1);
        grid.down('#btnVoid').setDisabled(row.length < 1);
        grid.down('#btnDelete').setDisabled(row.length < 1);
        grid.down('#btnEdit').setDisabled(row.length < 1);
    },
    useReceipt: function () {
        var me = this;
        var p = me.getPanel();
        var rows = me.getGrid().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            var confirmmsg, successmsg, failmsg;
            var f = me.getFormdata();
            var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            var store = me.getGrid().getStore();
            if (rows.length == 1) {
                var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(me.fieldName) + ']';
                confirmmsg = 'Use Receipt ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to Use Receipt ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will Use Receipt ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to Use Receipt data.';
            }
            
            var dataEncode = [];
            var usereceipt = [];
            rows.forEach(function (rec) {
                if(rec.get("status")=="VOID" || rec.get("status")=="USED" || rec.get("status")=="EXTERNAL-USED"){
                    
                    usereceipt.push({
                        receipt_id: rec.get("receipt_id")
                    });
                }
            });
            if(usereceipt.length>0){
                me.tools.alert.warning('Gagal Use Receipt. Pastikan tidak ada receipt no berstatus void/used.');
                return false;
            }
            Ext.Msg.confirm('Use Receipt', 
                    'Reason : <br><br>'
                    +'<textarea type="text" id="reasondelete" name="reasondelete" style="width:200px;height:60px;"></textarea>', function (btn) {
                if (btn == 'yes') {
                    if($('#reasondelete').val().length < 5){
                        Ext.Msg.show({
                            title: 'Warning',
                            msg: 'Form Reason tidak boleh kosong atau kurang dari 5 karakter.',
                            icon: Ext.Msg.WARNING,
                            buttons: Ext.Msg.OK
                        });
                        return false;
                    }
                    resetTimer();
                    rows.forEach(function (rec) {
                        dataEncode.push({
                            receipt_id: rec.get("receipt_id"),
                            reason_delete:Ext.get('reasondelete').getValue(),
                            project_id: rec.get("project_id"),
                            pt_id: rec.get("pt_id")
                        });
                    });
                    if(dataEncode.length>0){
                        p.setLoading('Update data, please wait ...');
                        me.tools.ajax({
                            module: me.controllerName,
                            data: dataEncode,
                            params: {module: me.controllerName,data:Ext.encode(dataEncode)},
                            panel: p,
                            async: false,
                            success: function (info, total, msg) {
                                try {
                                    for (var i = 0; i < rows.length; i++) {
                                        store.remove(rows[i]);
                                    }
                                    var successmsg = recordcounttext + ' Use Receipt successfully.';
                                    me.tools.alert.info(successmsg);
                                    me.getGrid().getStore().load();
                                    p.setLoading(false);
                                } catch (err) {
                                    console.log(err.message);
                                    me.tools.alert.warning("Failed to Use Receipt.");
                                    me.getGrid().getStore().load();
                                    me.getGrid().up('window').unmask();
                                    p.setLoading(false);
                                }
                                p.setLoading(false);
                            }
                        }).read('usereceipt');
                    }else{

                    }
                }
            });
        }
    },

});
