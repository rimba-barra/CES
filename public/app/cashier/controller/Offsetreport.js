Ext.define('Cashier.controller.Offsetreport', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptprojectcombobox',
        'Cashier.library.template.combobox.Projectcombobox',
        'Cashier.library.template.combobox.Coacombobox',
        'Cashier.library.template.combobox.Coagrid',
    ],
    alias: 'controller.offsetreport',
    views: [
        'offsetreport.FormData',
        'offsetreport.Grid',
        'offsetreport.Panel',
        'offsetreport.GridSub'
    ],
    stores: [
        'Project',
        'Pt',
        'Coa',
        'Subaccountcode'
    ],
    models: [
        'Project',
        'Pt',
        'Coa',
        'Subaccountcode'
    ],
    refs: [
        { ref: 'grid', selector: 'offsetreportgrid' },
        { ref: 'formdata', selector: 'offsetreportformdata' },
        { ref: 'panel', selector: 'offsetreportpanel' },
        { ref: 'gridsub', selector: 'offsetreportgridsub' },
    ],
    controllerName: 'offsetreport',
    fieldName: 'group_user_id',
    bindPrefixName: 'Offsetreport',
    formWidth: 300,
    win: null,
    winId: null, project_id: null, pt_id: null, periodefrom: null, periodeto: null, coa_debet: null, coa_credit: null, subgl_id: null, journal_date: null,
    init: function(application) {
        var me = this;
        this.control({
            'offsetreportformdata': {
                afterrender: function() {
                    me.formSearchAfterRenderCustom();
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(700);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(550);

                    me.getFormdata().down("[name=journal_date]").setVisible(false);

                    me.getGrid().getStore().removeAll();
                }
            },
            'offsetreportformdata [name=project_id]': {
                change: function() {

                    var me = this;
                    var f  = me.getFormdata();
                    var project_id = f.down("[name=project_id]").getValue();

                    me.loadPtbyProject(project_id, f);
                }
            },
            'offsetreportformdata [name=pt_id]': {
                change: function() {

                    var me = this;
                    var grid = me.getGrid();
                    var store = grid.getStore();
                    var form = me.getFormdata();

                    me.loadDataCoa();                    
                    store.removeAll();

                    form.down("[name=account_type]").setValue("");
                }
            },
            'offsetreportformdata [action=submit]': {
                click: me.showpopupsub
            },
            'offsetreportformdata [name=addaccount]': {
                click: me.addAccountToGrid
            },
            'offsetreportformdata [name=coa_id]': {
                select: function() {

                    var me = this;
                    var form = me.getFormdata();

                    form.down("[name=account_type]").setValue("");
                }
            },
            'offsetreportformdata [name=output_type]': {
                change: function(el) {
                    if (el.value != 1) {
                        me.getFormdata().down("[name=journal_date]").setVisible(true);
                    } else {
                        me.getFormdata().down("[name=journal_date]").setVisible(false);
                    }
                }
            },
            'offsetreportgrid toolbar button[action=destroy]': {
                click: function() {

                    var me = this;
                    var grid = me.getGrid();
                    var data = grid.getSelectionModel().getSelection();

                    if (data.length <= 0) {
                        Ext.Msg.alert('No data selected');
                        return false;
                    } else {
                        grid.getStore().remove(data);
                    }
                }
            },
            'offsetreportgrid toolbar button[action=reset]': {
                click: function() {

                    var me = this;
                    var grid = me.getGrid();
                    var store = grid.getStore();
                    
                    store.removeAll();
                }
            },
            'offsetreportgridsub': {
                afterrender: me.loadDataSubAccount
            },
            'offsetreportgridsub toolbar button[action=process]': {
                click: me.preparingreport
            }
        })
    },
    formSearchAfterRenderCustom: function() {
        var me;
        me = this;

        var f = me.getFormdata();
        this.loadProject(f);        

        var date = new Date();
        var firstDay = new Date(date.getFullYear(), 0, 1);
        var lastmonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        f.down("[name=periodefrom]").setValue(firstDay);
        f.down("[name=periodeto]").setValue(lastmonth);
    },
    loadProject: function(f) {

        var me = this;
        var storeproject;

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
    loadPtbyProject: function(projectid, f){

        var me = this;

        var storecoa = me.getStore('Pt');
        storecoa.load({
            params: {
                "hideparam": 'getptbyuserproject',
                "start": 0,
                "limit": 1000000,
                "project_id": projectid,
                "user_id": apps.uid
            },
            callback: function (records, operation, success) {
                if (!records[0]) {
                    f.down("[name=pt_id]").setValue(parseInt(apps.pt));                      
                } else {
                    f.down("[name=pt_id]").setValue(records[0]);
                }       
            }
        });
    },
    loadDataCoa: function() {

        var me = this;
        var f  = me.getFormdata();
        var store = f.down("[name=coa_id]").getStore();
        store.storeId = me.controllerName + 'Coa';

        store.load({
            params: {
                project_id: f.down("[name=project_id]").getValue(),
                pt_id: f.down("[name=pt_id]").getValue(),
                hideparam: 'getallcoawithsubaccount'
            },
            callback: function(recordscode, operationcode, successcode) {
                if (successcode) {
                    if (recordscode[0]) {
                        var firstdatacode = recordscode[0]['data'];
                        f.down("[name=coa_id]").setValue(firstdatacode.coa_id);                       
                    }
                }
            }
        })
    },
    showpopupsub: function() {

        var me = this;
        var grid = me.getGrid();
        var form = me.getFormdata();
        var storecoa = grid.getStore();
        var output_type = form.down("[name=output_type]").getValue();
        var journal_date = Ext.Date.format(form.down("[name=journal_date]").getValue(), 'Y-m-d');

        if (storecoa.getCount() < 2) {
            Ext.Msg.alert('Info', 'Please Pick Min. 2 Account to Compared');
            return false;
        } 

        if (storecoa.find('type', 'D') == -1 || storecoa.find('type', 'C') == -1) {
            Ext.Msg.alert('Info', 'Please Pick Min. 1 Account for Each Account Type (Debit/Credit)');
            return false;
        }

        if (output_type != 1 && (journal_date == null || journal_date == '')) {
            Ext.Msg.alert("Alert", "Journal date must be filled.");
            return false;
        }

        me.instantWindow('GridSub', 850, 'Select Sub Account', 'read', me.controllerName + 'GridSub', me.controllerName);
    },
    addAccountToGrid: function() {

        var me = this;
        var f  = me.getFormdata();
        var data = null;
        var store = me.getGrid().getStore();
        var datacoa = f.down("[name=coa_id]").valueModels[0].data;
        var accounttype = f.down("[name=account_type]").getValue();

        if (datacoa == "" || datacoa == null) {
            Ext.Msg.alert("Info", "Please choose account code");
            return false;
        }

        if (accounttype == "" || accounttype == null) {
            Ext.Msg.alert("Info", "Please choose account type");
            return false;
        }

        if (store.find('coa_id', datacoa.coa_id) == -1) {
            store.add({
                type: accounttype,
                coa_id: datacoa.coa_id,
                coa: datacoa.coa,
                name: datacoa.name,
                kelsub: datacoa.kelsub,
                description: datacoa.kelsub_description
            });
            store.commitChanges();
        } else {
            Ext.Msg.alert('Info', 'COA already selected');
            return false;
        }
    },
    preparingreport: function() {

        var me = this;
        var grid = me.getGrid();
        var store = grid.getStore();
        var subacc_selected = me.getGridsub().getSelectionModel().getSelection();
        var form = me.getFormdata();
        var coa_d = [];
        var coa_c = [];
        var subacc = [];
        var output_type = form.down("[name=output_type]").getValue();
        var journal_date = Ext.Date.format(form.down("[name=journal_date]").getValue(), 'Y-m-d');
        me.project_id = form.down("[name=project_id]").getValue();
        me.pt_id = form.down("[name=pt_id]").getValue(); 
        me.periodefrom = Ext.Date.format(form.down("[name=periodefrom]").getValue(), 'Y-m-d');
        me.periodeto = Ext.Date.format(form.down("[name=periodeto]").getValue(), 'Y-m-d');
        me.journal_date = journal_date;

        for (var i = 0; i < store.getCount(); i++) {
            if (store.getAt(i).get('type') == 'D') {
                coa_d.push(store.getAt(i).get('coa_id'));
            } else {
                coa_c.push(store.getAt(i).get('coa_id'));
            }
        }

        me.coa_debet = coa_d.join(',');
        me.coa_credit = coa_c.join(',');

        for (var i = 0; i < subacc_selected.length; i++) {
            subacc.push(subacc_selected[i].data.subgl_id);
        }

        me.subgl_id = subacc.join(',');

        if (output_type == 1) {
            me.dataExport();
        } else if (output_type == 2) {
            Ext.Msg.confirm("Confirm", "Generate Journal Offset ?", function(answer) {
                if (answer == 'yes') {
                    me.generateoffsetjournal();
                }
            })
        } else if (output_type == 3) {
            me.createFileUpload();
        }
    },
    dataExport: function() {

        var me = this;
        var form = me.getFormdata();

        me.getGridsub().setLoading("Processing report...");

        Ext.Ajax.request({
            url: 'cashier/offsetreport/read',
            method: 'POST',
            timeout:100000000,  
            params: {
                project_id: me.project_id,
                pt_id: me.pt_id,
                hideparam: 'exportdata',
                periodefrom: me.periodefrom,
                periodeto: me.periodeto,
                coa_debet: me.coa_debet,
                coa_credit: me.coa_credit,
                subgl_id: me.subgl_id
            },
            success: function (response) {
                me.info = Ext.JSON.decode(response.responseText);
                me.setSuccessEventExport();
                me.getGridsub().setLoading(false);
            },
            failure: function (response) {
                me.getGridsub().setLoading(false);
            }
        });
    },
    setSuccessEventExport: function () {

        var me = this;
        Ext.getBody().unmask();
        var file_path = me.info.data.url;  
        var a = document.createElement('A');
        a.href = file_path;
        a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        Ext.getBody().unmask();
    },
    loadDataSubAccount: function() {

        var me = this;
        var store = me.getGridsub().getStore();
        var coa_ids = [];
        var selectedcoa = me.getGrid().getStore();
        
        for (var i = 0; i < selectedcoa.getCount(); i++) {
            coa_ids.push(selectedcoa.data.items[i].data.coa_id);
        }

        store.getProxy().setExtraParam('hideparam', 'filterbycoaid');
        store.getProxy().setExtraParam('limit', '10000');
        store.getProxy().setExtraParam('start', '0');
        store.getProxy().setExtraParam('project_id', me.getFormdata().down("[name=project_id]").getValue());
        store.getProxy().setExtraParam('pt_id', me.getFormdata().down("[name=pt_id]").getValue());
        store.getProxy().setExtraParam('coaid_in', coa_ids.join(','));
        store.load();
    },
    generateoffsetjournal: function() {

        var me = this;
        var grid = me.getGridsub();

        grid.setLoading("Generating Offset Journal...");
        Ext.Ajax.request({
            url: 'cashier/offsetreport/create',
            params: {
                data: Ext.encode({
                    project_id: me.project_id,
                    pt_id: me.pt_id,
                    hideparam: 'offsetjournal',
                    periodefrom: me.periodefrom,
                    periodeto: me.periodeto,
                    coa_debet: me.coa_debet,
                    coa_credit: me.coa_credit,
                    subgl_id: me.subgl_id,
                    journal_date: me.journal_date,
                    user_id: apps.uid
                })
            },
            success: function(response) {
                var result = Ext.JSON.decode(response.responseText);
                if (result.success == 'true') {
                    Ext.Msg.alert("Info", "Journal has been created. [Journal No: "+result.data.voucher_no+"]");
                } else {
                    Ext.Msg.alert("Error", "Process failed: " + result.msg);
                }
                grid.setLoading(false);
                grid.up('window').close();
            }
        })
    },
    createFileUpload: function() {

        var me = this;
        me.getGridsub().setLoading("Creating file...");

        Ext.Ajax.request({
            url: 'cashier/offsetreport/create',
            method: 'POST',
            timeout:100000000,  
            params: {
                data: Ext.encode({
                    project_id: me.project_id,
                    pt_id: me.pt_id,
                    hideparam: 'exportfileupload',
                    periodefrom: me.periodefrom,
                    periodeto: me.periodeto,
                    coa_debet: me.coa_debet,
                    coa_credit: me.coa_credit,
                    subgl_id: me.subgl_id,
                    journal_date: me.journal_date
                })
            },
            success: function (response) {
                me.info = Ext.JSON.decode(response.responseText);
                me.setSuccessEventExport();
                me.getGridsub().setLoading(false);
            },
            failure: function (response) {
                me.getGridsub().setLoading(false);
            }
        });
    }
})