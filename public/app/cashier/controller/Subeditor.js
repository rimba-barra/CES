Ext.define('Cashier.controller.Subeditor', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.subeditor',
    requires: [
        'Ext.EventObject',
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.view.MoneyField',
        'Cashier.library.template.combobox.Ptprojectcombobox',
        'Cashier.library.template.combobox.SubaccountcodeComboboxgrid',
        'Cashier.library.template.combobox.Coacomboboxgrid',
        'Cashier.library.template.combobox.Coagrid',
        'Cashier.library.template.combobox.Subglcombobox',
        'Cashier.library.template.combobox.Projectcombobox',
        'Cashier.library.template.combobox.Coasubeditorcombobox',
        'Cashier.library.template.combobox.Subglcombobox',
    ],
    views: [
        'subeditor.Panel',
        'subeditor.Grid',
        'subeditor.FormSearch',
        'subeditor.FormData',
        'subeditor.FormConvert',
        'subeditor.FormNonSubList',
    ],
    stores: [
        'Subeditor',
        'Project',
        'Subaccountcode',
        'Coacombo',
        'Subgl',
        'Pt',
        'Coasubeditorcombobox',
        'Ptbyuser',
        'Subgl',
    ],
    models: [
        'Subeditor',
        'Project',
        'Subaccountcode',
        'Coa',
        'Pt',
        'Coasubeditorcombobox',
        'Projectpt',
    ],
    refs: [
        {
            ref: 'panel',
            selector: 'subeditorpanel'
        },
        {
            ref: 'grid',
            selector: 'subeditorgrid'
        },
        {
            ref: 'formsearch',
            selector: 'subeditorformsearch'
        },
        {
            ref: 'formdata',
            selector: 'subeditorformdata'
        },
        {
            ref: 'formconvert',
            selector: 'subeditorformconvert'
        },
        {
            ref: 'formnonsublist',
            selector: 'subeditorformnonsublist'
        }
    ],
    controllerName: 'subeditor',
    fieldName: 'journalsubdetail_id',
    bindPrefixName: 'Subeditor',
    formWidth: 500,
    win: null,
    winId: null,
    getMe: function(){
       var me = this;
       return _Apps.getController(me.bindPrefixName);
    },
    init: function (application) {
        var me = this;
        this.control({
            'subeditorpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: me.panelAfterRender
            },
            'subeditorgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: me.gridSelectionChange
            },
            'subeditorformsearch': {
                afterrender: function() {
                    var me = this;
                    me.loadProject(me.getFormsearch());
                }
            },
            'subeditorformsearch [name=project_id]': {
                change: function() {
                    var me = this;
                    me.loadPtbyProject(me.getFormsearch());
                }
            },
            'subeditorformsearch [action=search]': {
                click: me.dataSearch
            },
            'mastercoagrid toolbar [action=destroy]': {
                click: me.dataDestroy
            },
            'subeditorformsearch [action=reset]': {
                click: me.dataReset
            },
            'subeditorformdata': {
                afterrender: function() {
                    var me = this;
                    var f = me.getFormdata();

                    me.formDataAfterRender(f);
                    
                    var money = f.down('[name=amount]').getValue();

                    f.down('[name=amount]').setValue(accounting.formatMoney(money));
                    me.filterSub();
                }
            },
            'subeditorformdata [name=subgl_id]': {
                change:function() {
                    me.filterSub();
                },
                'keyup': function () {
                me.filterSub();  
                },
                select: function(combo, records) {
                    var me = this;
                    var f = me.getFormdata();
                    if (combo.valueModels != null ) {
                        if ( combo.valueModels[0] != undefined ) {
                            var valueModels = combo.valueModels[0].data;
                            f.down("[name=code]").setValue(valueModels.code);
                            f.down("[name=code1]").setValue(valueModels.code1);
                            f.down("[name=code2]").setValue(valueModels.code2);
                            f.down("[name=code3]").setValue(valueModels.code3);
                            f.down("[name=code4]").setValue(valueModels.code4);
                            f.down("[name=description]").setValue(valueModels.description);
                        }
                    }
                },
            },
            'subeditorformdata [action=save]': {
                click: function() {
                    var f  = me.getFormdata();
                    var subgl_code = f.down("[name=ceksubglempty]").getValue();

                    if (subgl_code ==1 ) {
                        me.dataSave();
                    }else{
                        Ext.Msg.show({
                             title:'Gagal Update',
                             msg: 'Subgl Tidak sesuai / Tidak terdaftar silahkan pilih kembali.',
                             buttons: Ext.Msg.OK,
                             icon: Ext.Msg.WARNING
                        });
                    }
                }
            },
            'subeditorgrid [action=convertcoanonsubtosub]': {
                click: function () {
                    me.formConvertShow('update');
                }
            },
            'subeditorformconvert': {
                afterrender: function() {
                    me.formConvertShowAfterRender();
                }
            },
            'subeditorformconvert [action=checkdata]': {
                click: function() {
                    me.validateCheckData();
                }
            },
            'subeditorformnonsublist': {
                afterrender: function() {
                    me.formNonSubListAfterRender();
                }
            },
            'subeditorformnonsublist [action=generatesubtrans]': {
                click: function() {
                    me.actionGenerateSubTrans();
                }
            },
            'subeditorgrid [name=btnHelp]': {
                click: function(el, act) {
                    Ext.create("Ext.Window",{
                        title : 'User Manual : Sub Editor',
                        width : 700,                            
                        height: 500,
                        closable : true,
                        items: [{
                            xtype: 'component',
                            html: '<iframe src="attachments/manualmodule/User-Manual-Module-Sub-Editor.pdf" width="100%" height="100%"></iframe>',
                        }],  
                        autoScroll: true,                       
                        modal : true
                    }).show();  
                }
            },
        });
    },
    formSearchAfterRenderCustom: function() {
        var me, storeproject;
        me = this;

        var f = me.getFormsearch();

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
                    if (projectid == apps.project) {
                        f.down("[name=pt_id]").setValue(parseInt(apps.pt));
                    }else{
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
    subglChange: function () {
        var me = this;

        var form = me.getFormdata();
        var store = form.down("[name=subgl_id]").getStore();

        var pt_id = form.down("[name=pt_id]").getValue();
        var project_id = form.down("[name=project_id]").getValue();
        var kelsub = form.down("[name=kelsub_id]").getValue();

        store.getProxy().setExtraParam('hideparam', 'getsubglbykelsub');
        store.getProxy().setExtraParam('project_id', parseInt(project_id));
        store.getProxy().setExtraParam('kelsub_id', parseInt(kelsub));
        store.getProxy().setExtraParam('pt_id', parseInt(pt_id));
        store.load();

    },
    loadDataSubgl: function() {
        var me = this;
        var form  = me.getFormdata();
        var kelsub_id = form.down("[name=kelsub_id]").getValue();
        var pt_id = form.down("[name=pt_id]").getValue();
        var project_id = form.down("[name=project_id]").getValue();
        var code = form.down("[name=code]").getValue();
        var subglstore = form.down("[name=subgl_id]").getStore();

        // subglstore.removeAll();
        subglstore.clearFilter();
            subglstore.load({
                params: {
                    "hideparam": "getsubglbykelsub",
                    "project_id": project_id,
                    "pt_id": pt_id,
                    "kelsub_id": kelsub_id

                },
                callback: function(record) {
                    
                }
            })
    },
    loadDataSubglWithQuery: function(query) {
        var me = this;
        var f  = me.getFormdata();
        var kelsub_id = f.down("[name=kelsub_id]").getValue();
        var pt_id = f.down("[name=pt_id]").getValue();
        var project_id = f.down("[name=project_id]").getValue();
        // var subglstore = f.down("[name=subgl_id]").getStore();
        var subglstore = me.getStore('Subgl');

        Ext.getBody().mask("Please wait...");

        subglstore.removeAll();
        subglstore.clearFilter();
        subglstore.load({
            params: {
                "hideparam": "getsubglbykelsub",
                "project_id": project_id,
                "pt_id": pt_id,
                "kelsub_id": kelsub_id,
                "query": query
            },
            callback: function(record) {
                f.down("[name=subgl_id]").setValue(query);
                console.log(query);
                if (record.length == 0 ) {
                    f.down("[name=ceksubglempty]").setValue(0);
                }else{
                    f.down("[name=ceksubglempty]").setValue(1);
                }
            }
        });
        Ext.getBody().unmask();
    },
    filterSub: function () {
        var me,storesubcode,ptid,kelsubid;

        me = this;
        ptid = me.getFormdata().down("[name=pt_id]").getValue();
        projectid = me.getFormdata().down("[name=project_id]").getValue();
        kelsubid = me.getFormdata().down("[name=kelsub_id]").getValue();

        if(ptid != null){
            ptid = me.getFormdata().down("[name=pt_id]").getValue();
        }else{
            ptid = apps.pt;
        }

        if(projectid != null){
            projectid = me.getFormdata().down("[name=project_id]").getValue();
        }else{
            projectid = apps.project;
        }

        var customCode = me.getFormdata().down("[name=subgl_id]").getRawValue();

        Ext.getBody().mask("Please wait...");
        storesubcode = me.getStore('Subaccountcode');
        storesubcode.load({
            params: {
                "hideparam": 'filterbysub',
                "fromkelsub": 0,
                "untilkelsub": 0,
                "fromcoa": 0,
                "untilcoa": 0,
                "start": 0,
                "pt_id_owner": ptid,
                "project_id": projectid,
                "kelsub_id" : kelsubid,
                "checkallsub" :0,
                "customCode" : customCode,
                "type" : 0,
                "limit": 10,
            },
            callback: function (recordscode, operationcode, successcode) {
                storesubcode.sort('code', 'ASC');
                var f = me.getFormdata();
                if (successcode) {
                    if (successcode) {
                        var store = f.down("[name=subgl_id]").getStore();
                        store.removeAll();
                        store.clearFilter();
                        
                        var last = recordscode.length - 1;
                        // console.log(recordscode);
                        for (let i = 0; i < recordscode.length; i++) {
                            var firstdatacode = recordscode[i]['raw'];
                            store.add({
                            subgl_id: firstdatacode.subgl_id, 
                            code: firstdatacode.code, 
                            code1: firstdatacode.code1,
                            code2: firstdatacode.code2,
                            code3: firstdatacode.code3,
                            code4: firstdatacode.code4,
                            kelsub_id : firstdatacode.kelsub_id,
                            kelsub : firstdatacode.kelsub,
                            description : firstdatacode.description
                            });
                        }
                    }
                }
                Ext.getBody().unmask();
            }

        });

    },
    filterSubNonSubListForm: function () {
        var me,storesubcode,ptid,kelsubid;

        me = this;
        ptid = me.getFormnonsublist().down("[name=pt_id]").getValue();
        projectid = me.getFormnonsublist().down("[name=project_id]").getValue();
        kelsubid = me.getFormconvert().down("[name=coa_id]").valueModels[0].data.kelsub_id;

        if(ptid != null){
            ptid = me.getFormnonsublist().down("[name=pt_id]").getValue();
        }else{
            ptid = apps.pt;
        }

        if(projectid != null){
            projectid = me.getFormnonsublist().down("[name=project_id]").getValue();
        }else{
            projectid = apps.project;
        }

        var customCode = me.getFormnonsublist().down("[name=subgl_id]").getRawValue();

        storesubcode = me.getStore("Subgl");
        storesubcode.proxy.extraParams = {
            "hideparam": 'getsubglbykelsub',
            "project_id": projectid,
            "pt_id": ptid,
            "kelsub_id": kelsubid,
        }

    },
    formConvertShow: function (el, act, action) {
        var me = this;
        var formtitle, formicon;

        var gfp = me.getFormProperties(action);
        var state = gfp.state;
        formtitle = gfp.formtitle;
        formicon = gfp.formicon;

        var winId = 'win-formconvert';
        var win = desktop.getWindow(winId);
        if (!win) {
            win = desktop.createWindow({
                id: winId,
                title: 'Convert COA Non-Sub to Sub',
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
                            win.add(Ext.create('Cashier.view.' + me.controllerName + '.FormConvert'));
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
    formNonSubListShow: function (el, act, action, coacode) {
        var me = this;
        var formtitle, formicon;

        var gfp = me.getFormProperties(action);
        var state = gfp.state;
        formtitle = gfp.formtitle;
        formicon = gfp.formicon;

        var winId = 'win-formnonsublist';
        var win = desktop.getWindow(winId);
        if (!win) {
            win = desktop.createWindow({
                id: winId,
                title: 'Non-Sub List ' + coacode,
                iconCls: formicon,
                resizable: false,
                minimizable: false,
                maximizable: false,
                width: 500,
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
                            win.add(Ext.create('Cashier.view.' + me.controllerName + '.FormNonSubList'));
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
    validateCheckData: function () {
        var me = this;
        var form = me.getFormconvert();
        var pt_id = form.down('[name=pt_id]').getValue();
        var coa_id = form.down('[name=coa_id]').getValue();

        if (pt_id == null || coa_id == null) {
            Ext.Msg.alert('Error', 'Silahkan lengkapi data!');
            return false;
        }

        var coacode = form.down('[name=coa_id]').valueModels[0].data.coacode;
        me.formNonSubListShow('', '', '', coacode);
    },
    formConvertShowAfterRender: function () {
        var me = this;

        var store_pt = me.getStore('Pt');
        var store_coa = me.getStore('Coasubeditorcombobox');

        store_pt.load({
            params: {
                "hideparam": 'getptbyuser',
                "project_id": me.project_id,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                
            }
        });

        store_coa.load({
            params: {
                "hideparam": 'coasubeditorcombobox',
                "project_id": me.project_id,
                "pt_id": me.pt_id,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                
            }
        });

        me.getFormconvert().down("[name=pt_id]").setValue(parseInt(apps.pt));
    },
    formNonSubListAfterRender: function() {
        var me = this;
        var form = me.getFormconvert();
        var form_nonsublist = me.getFormnonsublist();
        var pt_id = form.down('[name=pt_id]').getValue();
        var project_id = form.down('[name=pt_id]').valueModels[0].data.project_id;
        var coa = form.down('[name=coa_id]').valueModels[0].data.coa;
        var kelsub_id = form.down('[name=coa_id]').valueModels[0].data.kelsub_id;

        form_nonsublist.down('[name=project_id]').setValue(project_id);
        form_nonsublist.down('[name=pt_id]').setValue(pt_id);
        form_nonsublist.down('[name=coa]').setValue(coa);
        form_nonsublist.down('[name=kelsub_id]').setValue(kelsub_id);

        Ext.Ajax.request({
            url: 'cashier/subeditor/read',
            timeout: 45000000,
            method: 'POST',
            params: {
                'hideparam': 'nonsublist',
                'project_id': project_id,
                'pt_id': pt_id,
                'src_coa': coa,
            },
            success: function(response) {
                var result = Ext.JSON.decode(response.responseText);
                var record = '';
                var count = result.data.length;
                Ext.Array.each(result.data, function(description, index) {
                    if (index <= 99) {
                        record += description.keterangan_detail + '\n';
                    } else {
                        var item_remaining = count - 100;
                        record += 'And ' + item_remaining + ' others data.';
                        return false;
                    }
                });
                form_nonsublist.down('[name=keterangan]').setValue(record);
            },
            failure: function(response) {

            }
        });

        me.filterSubNonSubListForm();
    },
    actionGenerateSubTrans: function() {
        var me = this;
        var f = me.getFormnonsublist();
        f.down("[name=hideparam]").setValue('generatesubtrans');

        // Form valiadation
        if (f.down('[name=subgl_id]').getValue() == null || f.down('[name=keterangan]').getValue() == '') {
            Ext.Msg.alert('Error', 'Silahkan lengkapi data!');
            return false;
        }

        // Preparing form data
        var send_data = me.getFinalData(f.getValues());
        send_data['code'] = f.down('[name=subgl_id]').valueModels[0].data.code;

        // Send data
        f.up('window').body.mask('Saving data, please wait ...');
        Ext.Ajax.request({
            url: 'cashier/subeditor/create',
            method: 'POST',
            params: {
                data: Ext.encode(send_data),
            },
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);
                me.messagedata = info.msg;

                if (info.x != 'false') {
                    me.alertFormdataSuccess();
                } else {
                    me.alertFormdataFailed();
                }
            }
        });
    },
    alertFormdataSuccess: function() {
        var me, form, store;
        me = this;
        form = me.getFormnonsublist();
        form.up('window').body.unmask();
        Ext.Msg.show({
            title: 'Success',
            msg: me.messagedata,
            icon: Ext.Msg.INFO,
            buttons: Ext.Msg.OK,
            fn: function() {
                me.getFormnonsublist().up('window').close();
                me.getFormconvert().up('window').close();
                me.getGrid().getStore().reload();
            }
        });
    },
    alertFormdataFailed: function() {
        var me, form, store;
        me = this;
        me.getGrid().getStore().reload();
        form = me.getFormnonsublist();
        form.up('window').body.unmask();
        Ext.Msg.show({
            title: 'Failure',
            msg: 'Error: ' + me.messagedata,
            icon: Ext.Msg.ERROR,
            buttons: Ext.Msg.OK
        });
    },
})