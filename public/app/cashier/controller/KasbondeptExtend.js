Ext.define('Cashier.controller.KasbondeptExtend', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.KasbondeptExtend',
    requires: [
        'Cashier.library.template.combobox.Projectcombobox',
        'Cashier.library.template.combobox.Ptusercombobox',
        'Cashier.library.template.combobox.Ptcombobox',
        'Cashier.library.template.combobox.Automailmodulecombobox',
         'Cashier.library.template.combobox.Automailtypecombobox',
        'Cashier.view.ptforcashbon.Gridbrowsept',
    ],
    views: [
        'kasbondeptextend.Panel',
        'kasbondeptextend.Grid',
        'kasbondeptextend.FormSearch',
        'kasbondeptextend.FormData',
       'kasbondeptextend.FormApprove',
    ],
    stores: [
        'Kasbondeptextend',
        'Ptbyuser',
        'Employee',
        'Department',
        'Project',
        'Pt',
        'Automailmodule',
         'Automailtype'
    ],
    models: [
        'Kasbondeptextend',
        'Ptforcashbon',
        'Project',
        'Pt',
        'Automailmodule',
         'Automailtype',
    ],
    refs: [
        {ref: 'grid', selector: 'kasbondeptextendgrid'},
        {ref: 'formsearch', selector: 'kasbondeptextendformsearch'},
        {ref: 'formdata', selector: 'kasbondeptextendformdata'},
        {ref: 'formapprove', selector: 'kasbondeptextendformapprove'},
    ],
    controllerName: 'kasbondeptextend',
    fieldName: 'employee_name',
    bindPrefixName: 'KasbondeptExtend',
    rowproject: null, storept: null, state: null,
    urldata: 'cashier/kasbondeptextend/',
    loadingrequest: new Ext.LoadMask(Ext.getBody(), {msg: "Please wait..."}),
    init: function (application) {
        var me = this;
        this.control({
            'kasbondeptextendpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'kasbondeptextendgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'kasbondeptextendgrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'kasbondeptextendgrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
             'kasbondeptextendformapprove button[action=save]': {
                click: function () {
                    this.ApproveCashbon();
                }
            },
            'kasbondeptextendgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'kasbondeptextendgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'kasbondeptextendgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'kasbondeptextendformsearch button[action=search]': {
                click: this.dataSearch
            },
            'kasbondeptextendformsearch button[action=reset]': {
                click: this.dataReset
            },
            'kasbondeptextendformdata': {
                afterrender: this.formDataAfterRender
            },
            'kasbondeptextendformdata button[action=save]': {
                click: this.dataSave
            },
            'kasbondeptextendformdata button[action=cancel]': {
                click: this.formDataClose
            },
             'kasbondeptextendformsearch': {
                afterrender: function () {
                    me.setStoreFormsearch();
                },
            },

            'kasbondeptextendformdata [name=pt_id]': {
                change: function (el) {
                    var state = el.up('window').state;
                    if(state == 'create'){
                            me.setStoreDeptuserPt(el);
                            me.setprojectbypt(el);
                            me.setStoreReportto(el);
                    }
                }
            },
            'kasbondeptextendformsearch [name=pt_id]': {
                 'select': function (that, newValue, oldValue, eOpts) {
                    var me, form, rowdata;
                    me = this;
                    form = me.getFormsearch();
                    rowdata = form.down('[name=pt_id]').valueModels[0]['raw'];
                    if (form) {
                        form.down('[name=project_id]').setValue(rowdata.project_id);
                       
                    }
                }
            },
             'kasbondeptextendformapprove': {
                afterrender: this.formApproveAfterRender
            },
        });
    },
     panelAfterRender: function (el) {
        var me, store,f,store_second;
        me = this;
        f = me.getFormsearch();
        store = me.getStore("Automailmodule");
        store.load();
         store_second = me.getStore("Automailtype");
        store_second.load();


    },
     formDataAfterRender: function (el) {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        var rec = g.getSelectedRecord();
        var state = el.up('window').state;
        me.fdar().init();
        if (state == 'create') {

                var store = me.getStore("Ptbyuser");
                    store.load({
                        params: {
                            "hideparam": 'getptbyuser',
                            "project_id": apps.project,
                            "start": 0,
                            "limit": 1000,
                        },
                        callback: function (records, operation, success) {
                            store.each(function (record)
                            {
                                if (record.data['project_id'] == apps.project && record.data['pt_id'] == apps.pt) {
                                    me.setValue(me, 'pt_id', record.data['pt_id']);
                                }
                            });
                        }
                    });

      



        } else if (state == 'update' || state == 'read') {
            if(state == 'update'){
            me.fdar().update();
              me.setReadonly(f, 'pt_id', true);
                me.setReadonly(f, 'employee_name', false);
                  me.setReadonly(f, 'nik_group', false);
              }else if(state == 'read'){
                me.fdar().read();
              }
                   var g = me.getGrid();
                    var rec = g.getSelectedRecord();
                    var projectid = f.down("[name=project_id]").getValue();
                    var ptid = f.down("[name=pt_id]").getValue();

                     var store = me.getStore("Ptbyuser"); // load store project /pt to get selected value on combobox
                    store.load({
                        params: {
                            "hideparam": 'getptbyuser',
                            "project_id": projectid,
                            "start": 0,
                            "limit": 1000,
                        },
                        callback: function (records, operation, success) {
                            store.each(function (record)
                            {
                                if (record.data['project_id'] == projectid && record.data['pt_id'] == ptid) {
                                    me.setValue(me, 'pt_id', record.data['pt_id']);
                                }
                            });
                        }
                    });

                     storedept = me.getStore("Department"); // load store dept to get selected value on combobox
                        storedept.load({
                            params: {
                                "hideparam": 'getdepartmentbyprojectpt',
                                "pt_id" : ptid,
                                "project_id" : projectid
                            },
                            callback: function (records, operation, success) {
                               storedept.each(function (record)
                            {
                                if (record.data['department_id'] == rec.get('department_id')) {
                                    me.setValue(me, 'department_id', record.data['department_id']);
                                }
                            });
                               
                              
                            }
                        });

                         storeemployee = me.getStore('Employee'); // load store employee to get selected value on combobox
                        storeemployee.load({
                            params: {
                                "hideparam": 'getemployeebypt',
                                "start": 0,
                                "limit": 1000000,
                                "pt_id": ptid,
                                "project_id": projectid,
                            },callback: function (records, operation, success) {
                                   storeemployee.each(function (record)
                                        {

                                            if (record.data['employee_id'] == rec.get('reportto')) {
                                                me.setValue(me, 'reportto', record.data['employee_id']);
                                            }
                                        });
                                  
                                }




                        });






            
        }

    },
     formApproveAfterRender: function (el) {
        var me = this;
        var f = me.getFormapprove();
        var g = me.getGrid();
        var rec = g.getSelectedRecord();
        var row = rec.data;
        var max_extension = rec.data.max_extension;
        var state = el.up('window').state;
        //me.fdar().init();
        if (state == 'create') {



        } else  {

            f.down("[name=extension_days]").setValue(parseInt(max_extension));
            

            
        }

    },
    
    setStoreDeptuserPt: function (el) {
        var me, store, form, valueModels,state,projectid,ptid, valueModels;
        me = this;
        form = me.getFormdata();
        state = el.up('window').state;
        if(state == 'create'){
                valueModels = form.down("[name=pt_id]").valueModels[0];
                projectid = valueModels.data.project_id;
                ptid = form.down("[name=pt_id]").getValue();
        }

        store = me.getStore("Department");
        store.load({
            params: {
                "hideparam": 'getdepartmentbyprojectpt',
                "pt_id" : ptid,
                "project_id" : projectid
            },
            callback: function (records, operation, success) {
                  if (records[0]) {
                    var row = records[0]['data'];
                    me.setValue(me, 'department_id', row.department_id);
                    
                }
                //  store.clearFilter(true);
                 //   me.setValue(me, 'department_id', '');
              
            }
        });
    },
    setprojectbypt: function (el) {
        console.log(el);
        var me, store, form, valueModels;
        me = this;
        form = me.getFormdata();
        valueModels = form.down("[name=pt_id]").valueModels[0];
        projectid = valueModels.data.project_id;
        me.setValue(me, 'project_id', projectid);
              
        
        
    },
     getProjectidbyPtid: function (newValue) {

        var me = this;
        var f = me.getFormsearch();
        var e = f.down("[name=pt_id]");

        var x = e.getStore().findRecord("pt_id", newValue);
        f.down("[name=project_id]").setValue(x.data['project_id']);
      
       
    },
      gridItemDblClick: function () {
        var me, p;
        me = this;
       return false;
    },
    setStoreReportto: function (el) {
        var me, store, form, valueModels, project_id, pt_id, state, reportto;
        me = this;
        form = me.getFormdata();
        state = el.up('window').state;
        if(state == 'create'){
            valueModels = form.down("[name=pt_id]").valueModels[0];
            var pt_id = form.down("[name=pt_id]").getValue();
            var project_id = valueModels.data.project_id;
        }
        store = me.getStore('Employee');
        store.load({
            params: {
                "hideparam": 'getemployeebypt',
                "start": 0,
                "limit": 1000000,
                "pt_id": pt_id,
                "project_id": project_id,
            },callback: function (records, operation, success) {
                    if (records[0]) {
                    var row = records[0]['data'];
                    me.setValue(me, 'reportto', row.employee_id);
                    
                }
                   // store.clearFilter(true);
                   // me.setValue(me, 'report_to', '');
                  
                }




        });
    },
    gridActionColumnClick: function (view, cell, row, col, e, grid) {
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
                case me.bindPrefixName + 'Update':
                    me.formDataShow('update');
                    break;
                case me.bindPrefixName + 'Delete':
                    me.dataDestroy();
                    break;
                case me.bindPrefixName + 'Posting':
                    me.Approvedata(row);
                    break;
                case me.bindPrefixName + 'Unposting':
                    me.Unapprovedata(row);
                    break;
                 case me.bindPrefixName + 'Preview':
                    me.formDataShow('read');
                    break;
                 case me.bindPrefixName + 'Approve':
                    me.formApproveShow('approve');
                    break;
                case me.bindPrefixName + 'Decline':
                      me.DeclineExtension(row);
                    break;
                case me.bindPrefixName + 'Print':
                    me.printCashbon();
                    break;
              

            }
        }
    },
      formApproveShow: function (el, act, action) {
        var me = this;
        var formtitle, formicon;

        var gfp = me.getFormProperties(action);
        var state = gfp.state;
        formtitle = gfp.formtitle;
        formicon = gfp.formicon;

        var winId = 'win-holidayformdata';
        var win = desktop.getWindow(winId);
        if (!win) {
            win = desktop.createWindow({
                id: winId,
                title: 'Approve',
                iconCls: formicon,
                resizable: false,
                minimizable: false,
                maximizable: false,
                width: 320,
                renderTo: Ext.getBody(),
                constrain: true,
                constrainHeader: false,
                modal: true,
                layout: 'fit',
                shadow: 'frame',
                shadowOffset: 10,
                border: false,
                state: 'update',
                listeners: {
                    boxready: function () {
                        win.body.mask('Loading...');
                        var tm = setTimeout(function () {
                            win.add(Ext.create('Cashier.view.' + me.controllerName + '.FormApprove'));
                            win.center();
                            win.body.unmask();
                            clearTimeout(tm);
                        }, 1000);

                    }
                }

            });
        }
        win.show();
    },
    ApproveCashbon: function () {
        var me, form, state, extension_days, approval_notes, grid, voucherprefix_id, gridmain, storemain, max_extension, eff_date, extension_days_saved;
        me = this;
        gridmain = me.getGrid();
        storemain = gridmain.getStore();
        form = me.getFormapprove();
        extension_days = form.down("[name=extension_days]").getValue();
        approval_notes = form.down("[name=approval_notes]").getValue();
        //eff_date = form.down("[name=eff_date]").getValue();
        rec = gridmain.getSelectedRecord();
        row = rec.data;
        max_extension = rec.data.max_extension;
        extension_days_saved = rec.data.extension_days;
        sum_extend_days = extension_days_saved + extension_days;
        if(extension_days > max_extension){
           
                 Ext.Msg.show({
                            title: 'Failure',
                            msg: 'Extension Days melebihi batas yang ditentukan!<br/>Batas maksimal : '+max_extension+' hari',
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK,
                             fn: function () {
                            // me.getFormapprove().up('window').close();
                           
                        }
                        });
                 return false;

        }

        if (parseInt(extension_days) < 1 || extension_days == '') {
            Ext.Msg.show({
                title: 'Failure',
                msg: 'Extension Days tidak boleh kurang dari 0',
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK,
                 fn: function () {
                    // me.getFormapprove().up('window').close();
                }
            });
            return false;
        }
        
       
        row['hideparam'] = 'approveextend';
        row['extension_days'] = extension_days;
        row['approval_notes'] = approval_notes;
        form.up('window').body.mask('Saving data, please wait ...');


                   Ext.Ajax.request({
                        url: me.urldata + 'update',
                        timeout: 45000000,
                        method: 'POST',
                        params: {
                            data: Ext.encode(row)
                        },
                        success: function (response) {
                            info = Ext.JSON.decode(response.responseText);
                            var rowjsonheader = info.data;
                            var successmsg = info.msg;


                            storemain.reload();

                                 successmsg = successmsg;
                           
                       
                              Ext.Msg.show({
                                title: 'Warning',
                                msg: successmsg,
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK
                            });
                              form.up('window').body.unmask();
                              form.up('window').close();
                              storemain.reload();

                        },
                        failure: function (response) {
                             me.getGridnew().up('window').mask('Process Approving,failed..');
                            form.up('window').getEl().unmask();
                             form.up('window').close();
                            storemain.reload();
                        }
                     
                    });
    },
     DeclineExtension: function () {
        var me = this;
        var g = me.getGrid();
        var storeout = g.getStore();
       // var g = me.getPanel();
        var arr = [];
        var obj = [];
        var rows = me.getGrid().getSelectionModel().getSelection();
        var record = g.getSelectionModel().getSelection()[0];
        var allow = true;
      
      
            if(allow==true){
                

                Ext.Msg.prompt('Decline', 'Notes:', function(boolean, text) {
                 if(boolean == 'cancel'){
                    return false;
                 }else{
                    if(text == ''){

                           Ext.Msg.alert('Error', 'Notes must be filled!');
                            return 0;

                    }else{
                        me.loadingrequest.show();

                         me.senddata = {
                            "hideparam": 'decline_extension',
                            "project_id": record['data'].project_id,
                            "pt_id": record['data'].pt_id,
                            "kasbondept_id": record['data'].kasbondept_id,
                            "user_id": apps.uid,
                            "voucher_no": record['data'].voucher_no,
                            "amount" : record['data'].amount,
                            "kasbon_extension_id" : record['data'].kasbon_extension_id,
                            "approval_notes": text
                        }
                  
                        me.urlrequest = 'cashier/kasbondeptextend/update';
                        me.AjaxRequestV2();

                            



                    }
                  
                 }

                });
            }
           
    },
     AjaxRequestV2: function () {
        var me;
        me = this;
        Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
            timeout: 45000000,
           // async: false, 
            params: {
                data: Ext.encode(me.senddata)
            },
            success: function (response) {
                if(response) {
                    try {
                        me.info = Ext.JSON.decode(response.responseText);
                        me.setSuccessEventV2();
                    } catch(e) {
                        me.loadingrequest.hide();
                        Ext.Msg.alert('Warning', 'Request Failed');
                        return false;
                    }
                }
            },
            failure: function (response) {
                me.alertFormdataFailed();
                me.getFormdata().up('window').close();
                //me.messagedata = 'data error';
                //throw me.messagedata;
            }
        });
    },
    setSuccessEventV2: function () {
        var me, value, data, form, voucher_date, duedate, state;
        me = this;
            data = me.info.data;
            switch (me.info.parameter) {
                case 'decline_extension':
                    me.loadingrequest.hide();
                    Ext.Msg.alert('Copied Successfully', 'Data Save Successfully');
                    me.getGrid().getStore().reload();
                break;
            }
   

    },
      printCashbon: function () {
        var me, grid, store, record, row, data;
        me = this;
        grid = me.getGrid();
        store = grid.getStore();
        record = me.getGrid().getSelectionModel().getSelection()[0];
        row = record['data'];
        data = row;
        me.setforAjax(data,'report');
        me.loadingrequest.show();
           
       

    },
    setforAjax: function (data, parameter) {
        var me, info;
        me = this;
        data['hideparam'] = parameter;
        Ext.Ajax.request({
            url: 'cashier/kasbondeptextend/create',
            timeout: 45000000,
            method: 'POST',
            params: {
                data: Ext.encode(data)
            },
            success: function (response) {
                info = Ext.JSON.decode(response.responseText);
                me.createWindows();
                me.submitReport(info.data);
            },
            failure: function (response) {

            }
        });
    },
    createWindows: function () {
        var me = this;
        me.winId ='reportkasbondepartmentextendwindows';
        me.instantWindow('Panel', 800, 'Result ', 'state-report', me.winId, 'masterreport');
        me.win = desktop.getWindow(me.winId);
    },
    submitReport: function (value) {       
        var me, report, html, madeby;
        me = this;
        if(value.made_by_name == value.employee_name){
            madeby = value.employee_name;
        }else if (value.made_by_name == '') {
            madeby = value.employee_name;
        }else if (value.employee_name == ''){   
            madeby = value.made_by_name;
        }else{
            madeby = value.made_by_name+'/'+value.employee_name;
        }

        value.madeandemployee = madeby;
   
        if(value.cashbondept_tpl == 'default'){
            tpl = 'Kasbondeptv6_extend';
        }else{
            tpl = value.cashbondept_tpl;
        }
        report = 'report_kasbondept/'+tpl;
        html = me.Reportviewerjs(value, report);
        me.win.down("#MyReportPanel").body.setHTML(html);
        $("#Reportform").submit();
        me.loadingrequest.hide();
    },
    
});