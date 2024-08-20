Ext.define('Cashier.controller.Masteroffbalancesheet', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.masteroffbalancesheet',
    requires: [
    'Ext.EventObject',
    'Cashier.template.ComboBoxFields',
    'Cashier.library.template.view.MoneyField',
    'Cashier.library.template.combobox.Ptprojectcombobox',
    'Cashier.library.template.combobox.Banktypecombobox',
    'Cashier.library.template.combobox.Projectcombobox',
    'Cashier.library.template.combobox.Projectptcombobox'
    ],
    views: [
    'masteroffbalancesheet.Panel',
    'masteroffbalancesheet.Grid',
    'masteroffbalancesheet.FormSearch',
    'masteroffbalancesheet.FormData',
    'masteroffbalancesheet.FormDataCopy',
    ],
    stores: [
    'Masteroffbalancesheet',
    'Project',
    'Masterbanktype',
    'Pt',
    'Projectpt'
    ],
    models: [
    'Masteroffbalancesheet',
    'Project',
    'Masterbanktype',
    'Pt',
    'Projectpt'
    ],
    refs: [
    {
        ref: 'panel',
        selector: 'masteroffbalancesheetpanel'
    },
    {
        ref: 'grid',
        selector: 'masteroffbalancesheetgrid'
    },
    {
        ref: 'formsearch',
        selector: 'masteroffbalancesheetformsearch'
    },
    {
        ref: 'formdata',
        selector: 'masteroffbalancesheetformdata'
    },
    {
        ref: 'formdatacopy',
        selector: 'masteroffbalancesheetformdatacopy'
    }
    
    ],
    controllerName: 'masteroffbalancesheet',
    fieldName: 'off_balancesheet_id',
    bindPrefixName: 'Masteroffbalancesheet',
    formWidth: 500,
    win: null,
    winId: null,
    init: function (application) {
        var me = this;
        this.control({
            'masteroffbalancesheetpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: me.panelAfterRender
            },
            'masteroffbalancesheetgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: me.gridSelectionChange
            },
            'masteroffbalancesheetformsearch': {
                afterrender: function() {
                    var me = this;
                    var fd = me.getFormsearch();

                    var project_id = null;

                    var projectptstore = fd.down("[name=pt_id]").getStore();
                    
                    projectptstore.load({
                        callback: function() {
                            projectptstore.each( function (rec) {
                                var fs_project_id = rec.get('project_id');
                                var fs_pt_id = rec.get('pt_id');

                                if (fs_project_id == parseInt(apps.project) && fs_pt_id == parseInt(apps.pt)) {
                                    fd.down("[name=pt_id]").select(rec);
                                }
                            });
                        }
                    })

                    if (fd.down("[name=pt_id]").valueModels[0] !== undefined) {
                        project_id = fd.down("[name=pt_id]").valueModels[0].data.project_id;
                        fd.down("[name=project_id]").setValue(project_id);
                    }
                }
            },
            'masteroffbalancesheetformsearch [name=pt_id]': {
                change: function() {
                    var me = this;
                    var fd = me.getFormsearch();
                    var project_id = null;
                    
                    if (fd.down("[name=pt_id]").valueModels[0] !== undefined) {
                        project_id = fd.down("[name=pt_id]").valueModels[0].data.project_id;
                        fd.down("[name=project_id]").setValue(project_id);
                    }

                }
            },
            'masteroffbalancesheetformsearch [action=search]': {
                click: me.dataSearch
            },
            'masteroffbalancesheetformsearch [action=reset]': {
                click: me.dataReset
            },
            'masteroffbalancesheetformdata': {
                afterrender: function(e) {
                    var sec = e.ownerCt.title;
                    var me = this;
                    me.formDataAfterRender(me.getFormdata());
                    var f = me.getFormdata();
                    var state = f.up('window').state;
                    if (state == 'update') {
                        console.log('cek sini');
                        var grid = me.getGrid();
                        var seletionModel = grid.getSelectionModel().getSelection();
                        var rawTextProjectName = seletionModel[0].data.projectpt_name;
                        console.log(rawTextProjectName);
                        f.down("[name=pt_id_edit]").setVisible(true);
                        f.down("[name=pt_id_edit]").setValue(rawTextProjectName);
                        f.down("[name=pt_id_edit]").setReadOnly(true);
                        f.down("[name=pt_id]").setReadOnly(true);
                        f.down("[name=pt_id]").setVisible(false);
                        // me.loadProject(me.getFormdata());
                        // me.loadPtbyProject(me.getFormdata());
                    }else if (state == 'create'){
                        // me.loadProject(me.getFormdata());
                        // me.loadPtbyProject(me.getFormdata());
                        
                        var grid = me.getGrid();
                        var mygrid = grid.getStore();
                        var fd = me.getFormsearch();
                        if (mygrid.data.items[0] == undefined) {
                            var curr_project_id = fd.down("[name=pt_id]").valueModels[0].data.project_id;
                            var curr_pt_id      = fd.down("[name=pt_id]").getValue();
                        }else{
                            var curr_project_id = mygrid.data.items[0].data.project_id;
                            var curr_pt_id      = mygrid.data.items[0].data.pt_id;
                        }
                        var projectptstore = f.down("[name=pt_id]").getStore();

                        projectptstore.each( function (rec) {
                            var f_project_id = rec.get('project_id');
                            var f_pt_id = rec.get('pt_id');
                            if (f_project_id == curr_project_id && f_pt_id == curr_pt_id) {
                                f.down("[name=pt_id]").select(rec);
                                console.warn('pernah kesel', f_pt_id);

                                if (f.down("[name=pt_id]").valueModels[0] !== undefined) {
                                    project_id = f.down("[name=pt_id]").valueModels[0].data.project_id;
                                    console.log(project_id);
                                    f.down("[name=project_id]").setValue(project_id);
                                }
                            }
                        });
                    }
                    
                }
            },
            'masteroffbalancesheetformdata [name=pt_id]': {
                change: function() {
                    var me = this,
                        f = me.getFormdata();

                    if (f.down("[name=pt_id]").valueModels[0] !== undefined) {
                        project_id = f.down("[name=pt_id]").valueModels[0].data.project_id;
                        console.log(project_id);
                        f.down("[name=project_id]").setValue(project_id);
                    }
                    me.loadbanktype(1);
                }
            },
            'masteroffbalancesheetformdata [action=save]': {
                click: function() {

                    var me = this;
                    var f = me.getFormdata();
                    f.down("[name=project_id]").setValue(f.down("[name=pt_id]").valueModels[0].data.project_id);
                    var closingbalance = f.down("[name=closing_balance]").getValue();
                    f.down("[name=closing_balance]").setValue(closingbalance);

                    var grid = me.getGrid();
                    var mygrid = grid.getStore();
                    me.dataSave();
                    grid.refresh();
                    
                }
            },

            'masteroffbalancesheetformdata [xtype=xmoneyfield]': {
                'keyup': function (el) {
                    var value = el.value;
                    var name = el.name;
                    if (name != 'closing_balance') {
                        if (value.length > 0) {
                            me.sumVal();
                        }
                    }
                }
            },
            'masteroffbalancesheetformdata [name=banktype_id]': {
                keyup: function(){
                    me.loadbanktype(0);
                }
            },
            'masteroffbalancesheetgrid [action=showcopy]': {
                click: function () {
                    var grid = me.getGrid();
                    var seletionModel = grid.getSelectionModel();
                    var dataSelection= seletionModel.getSelection();
                    var allowed = true;
                    var pt_id_copy = app.pt;

                    var lastdateFrom = "";
                    var lastdateUntil = "";

                    for (var i = 0; i < dataSelection.length; i++) {
                        var dateFrom = dataSelection[i].raw.date_from.substring(0, 10);
                        var dateUntil = dataSelection[i].raw.date_until.substring(0, 10);
                        
                        if (i != 0) {
                            if (lastdateFrom !== dateFrom || dateUntil !== lastdateUntil) {
                                allowed = false;
                            }
                        }
                        
                        lastdateFrom = dateFrom;
                        lastdateUntil = dateUntil;
                        pt_id_copy = dataSelection[i].raw.pt_id;
                    }

                    if (dataSelection.length > 0 ) {
                        if (allowed) {
                            me.instantWindow('FormDataCopy', 500, 'Copy Off balance sheet', 'Copy', 'myInstantWindow', me.controllerName);   
                            var f = me.getFormdatacopy();
                            f.down("[name=pt_id_copy]").setValue(pt_id_copy);
                        }else{
                            Ext.MessageBox.show({
                                title: 'Informasi',
                                msg: 'Data yang dipilih harus memiliki Periode yang sama.',
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.INFO
                            });
                            return false;
                        }
                    }else{
                        Ext.MessageBox.show({
                            title: 'Informasi',
                            msg: 'Pilih terlebih dahulu data yang akan dicopy.',
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.INFO
                        });
                        return false;
                    }
                }
            },
            'masteroffbalancesheetformdatacopy [action=copy]': {
                'click': function () {
                    var fc = me.getFormdatacopy();
                    var date_from_copy = fc.down("[name=date_from_copy]").getValue();
                    var date_until_copy = fc.down("[name=date_until_copy]").getValue();
                    
                    if (date_from_copy != "" && date_until_copy !="" && date_from_copy != null && date_until_copy != null ) {
                        me.copyProccess();
                    }else{
                        Ext.MessageBox.show({
                            title: 'Informasi',
                            msg: 'Periode Kosong, silahkan isi terlebih dahulu.',
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.INFO
                        });
                    }

                }
            },

        });
    },
    sumVal: function () {
        var me = this;
        var f = me.getFormdata();
        var debit = (f.down("[name=debit]").getValue());
        var credit = (f.down("[name=credit]").getValue());
        var opening_balance = (f.down("[name=opening_balance]").getValue());
        var total = opening_balance + debit - credit;

        var summed = 0 ;

        summed = accounting.unformat(opening_balance) + accounting.unformat(debit) - accounting.unformat(credit);
        
        f.down('[name=closing_balance]').setValue(accounting.formatMoney(summed));

    },
    formSearchAfterRenderCustom: function() {
        var me, storeproject;
        me = this;

        var f = me.getFormsearch();

        var projectid = f.down("[name=project_id]").getValue();

        ptid = f.down("[name=pt_id]").getValue();

        if(projectid != null){
            projectid = f.down("[name=project_id]").getValue();
        }else{
            projectid = apps.project;
        }

        storeproject = me.getStore('Project');
        storeproject.load({
            params: {
                "hideparam": 'projectpt',
                "project_id": projectid,
                "start": 0,
                "limit": 1000000,
            }, callback: function (recordscode, operationcode, successcode) {
                if (successcode) {
                    if (recordscode[0]) {
                        if (apps.project == projectid) {
                            var firstdatacode = recordscode[0]['data'];
                            f.down("[name=project_id]").setValue(parseInt(projectid));
                        }else{
                            f.down("[name=pt_id]").setValue('');
                        }
                    }
                }
            }

        });   
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
                    f.down("[name=pt_id]").setValue(parseInt(apps.pt));                      
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
    copyProccess: function(){
        var me = this;
        var p = me.getPanel();
        var grid = me.getGrid();
        var fc = me.getFormdatacopy();
        var seletionModel = grid.getSelectionModel();
        var dataSelection= seletionModel.getSelection();
        var lastdateFrom = "";
        var lastdateUntil = "";
        var allowed = true;
        var arrId = "";
        var pt_id = apps.pt;
        var project_id = apps.project;

        for (var i = 0; i < dataSelection.length; i++) {
            var dateFrom = dataSelection[i].raw.date_from.substring(0, 10);
            var dateUntil = dataSelection[i].raw.date_until.substring(0, 10);
            
            if (i != 0) {
                if (lastdateFrom != dateFrom && dateUntil != lastdateUntil) {
                    allowed = false;
                }
                arrId += "|";
            }
            arrId += dataSelection[i].raw.off_balancesheet_id;
            
            lastdateFrom = dateFrom;
            lastdateUntil = dateUntil;
            pt_id = dataSelection[i].raw.pt_id;
            project_id = dataSelection[i].raw.project_id;
        }

        if (allowed) {
            var date_from_copy = fc.down("[name=date_from_copy]").getValue();
            var date_until_copy = fc.down("[name=date_until_copy]").getValue();
            var row = {
                "hideparam": 'copydate',
                "project_id": project_id,
                "pt_id": pt_id,
                "idcopy": arrId,
                "date_from_copy" : date_from_copy,
                "date_until_copy" : date_until_copy,
                "user_id": apps.uid
            }
            fc.setLoading("Please wait, data is being processed...");
            Ext.Ajax.request({
                url: 'cashier/masteroffbalancesheet/create',
                method: 'POST', 
                params: {
                    data: Ext.encode(row)
                },
                success: function (response) {
                    var data = response.responseText;
                    var obj = JSON.parse(data);

                    if (obj.success == "Success") {
                        Ext.MessageBox.show({
                            title: 'Informasi',
                            msg: 'Data Berhasil di Copy.',
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.INFO
                        });
                    }else{
                        Ext.MessageBox.show({
                            title: 'Informasi',
                            msg: 'Data Gagal di Copy.',
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.WARNING
                        });
                    }

                    var mygrid = grid.getStore();
                    mygrid.reload();
                    fc.setLoading(false);
                    fc.up('window').close();
                },
            });

        }else{
            Ext.MessageBox.show({
                title: 'Informasi',
                msg: 'Data yang dipilih harus memiliki Periode yang sama.',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO
            });
        }
        
    },
    loadbanktype: function(connd = 0) {

        var me = this;
        var f = me.getFormdata();
        var pt_id = f.down("[name=pt_id]").getValue();
        var banktype = f.down("[name=banktype_id]").getValue();
        var banktypeCaption = "";
        if (banktype != "") {
            var bank_type_id = f.down("[name=bank_type_id]").getValue();
            var banktypeCaption = f.down("[name=banktype]").getValue();
        }
        
        var project_id = f.down("[name=pt_id]").valueModels[0].data.project_id;
        
        if(project_id != null){
            project_id = f.down("[name=pt_id]").valueModels[0].data.project_id;
        }else{
            project_id = apps.project;
        }

        f.setLoading("Please wait, data is being processed...");
        Ext.Ajax.request({
            url: 'cashier/masterbanktype/read',
            method: 'POST', 
            params: {
                "hideparam": 'default',
                "project_id": project_id,
                "pt_id": pt_id,
                "banktype": banktype,
                "start":0,
                "limit":1000000000,
                "parametersql" : 'read'
            },
            success: function (response) {
                var data = response.responseText;
                var obj = JSON.parse(data);
                
                var store = f.down("[name=banktype_id]").getStore();
                    store.removeAll();
                    store.clearFilter();

                    var recordscode = obj.data;
                    for (let i = 0; i < recordscode.length; i++) {
                        var item = recordscode[i];
                        store.add({
                            banktype_id: item.banktype_id, 
                            banktype: item.banktype, 
                            description : item.description
                        });
                    }
                    
                    
                    // console.log(f.down("[name=banktype_id]").getValue());
                    // me.setValueCombobox(me, 'sub_coa_from_id', row.coa_id,row.coa);
                    f.setLoading(false);
                    if (connd == 1) {
                        me.setValueCombobox(me, 'banktype_id', bank_type_id,banktypeCaption);
                    }
            },
            
        });
    },
    
})