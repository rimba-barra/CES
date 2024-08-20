Ext.define('Cashier.controller.Cashfloweditor', {
    extend  : 'Cashier.library.template.controller.Controllermodule',
    alias   : 'controller.cashfloweditor',
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
    'Cashier.library.template.combobox.Cashflowsetupcombobox',
    'Cashier.library.template.combobox.Projectptcombobox',
    'Cashier.library.template.combobox.Prefixcashflowcombobox'
    ],
    views: [
    'cashfloweditor.Panel',
    'cashfloweditor.Grid',
    'cashfloweditor.FormSearch',
    'cashfloweditor.FormData',
    'cashfloweditor.FormFillcashflow'
    ],
    stores: [
    'Cashfloweditor',
    'Project',
    'Subaccountcode',
    'Coacombo',
    'Subgl',
    'Pt',
    'Cashflowtype',
    'Prefixcombo',
    'Cashflowsetupcombobox',
    'Projectpt',
    'Prefixcashflowcombo'
    ],
    models: [
    'Cashfloweditor',
    'Project',
    'Subaccountcode',
    'Coa',
    'Pt',
    'Cashflowtype',
    'Cashflowsetupcombobox',
    'Projectpt',
    'Prefixcashflow'
    ],
    refs: [
    {
        ref     : 'panel',
        selector: 'cashfloweditorpanel'
    },
    {
        ref     : 'grid',
        selector: 'cashfloweditorgrid'
    },
    {
        ref     : 'formsearch',
        selector: 'cashfloweditorformsearch'
    },
    {
        ref     : 'formdata',
        selector: 'cashfloweditorformdata'
    },
    {
        ref     : 'fillcashflow',
        selector: 'cashfloweditorformfillcashflow'
    }
    ],
    controllerName: 'cashfloweditor',
    fieldName     : 'jid',
    bindPrefixName: 'Cashfloweditor',
    formWidth     : 500,
    win           : null,
    winId         : null,
    urldata       : 'cashier/cashfloweditor/',
    getMe         : function(){
     var me = this;
     return _Apps.getController(me.bindPrefixName);
 },
 init: function (application) {
    var me = this;
    this.control({
        'cashfloweditorpanel': {
            beforerender: me.mainPanelBeforeRender,
            afterrender : me.panelAfterRender
        },
        'cashfloweditorgrid': {
            afterrender    : this.gridAfterRender,
            itemdblclick   : this.gridItemDblClick,
            itemcontextmenu: this.gridItemContextMenu,
            selectionchange: function() {
                var me = this;
                me.gridSelectionChange();
            }
        },
        'cashfloweditorformsearch': {
            afterrender: function() {

                var me = this;

                me.loadProject(me.getFormsearch());
            }
        },
        'cashfloweditorformsearch [name=project_id]': {
            change: function() {

                var me = this;

                me.loadPtbyProject(me.getFormsearch());
            }
        },
        'cashfloweditorformsearch [action=search]': {
            click: me.dataSearch
        },
        'cashfloweditorformsearch [action=reset]': {
            click: me.dataReset
        },
        'cashfloweditorformdata': {
            afterrender: function() {
                var me = this;
                var f  = me.getFormdata();

                me.formDataAfterRenderCustome(f);

                var money = f.down('[name=amount]').getValue();

                f.down('[name=amount]').setValue(accounting.formatMoney(money));
                me.filterSub();
            }
        },
        'cashfloweditorformdata [name=subgl_id]': {
            change:function(){
                me.filterSub();
            },
            'keyup': function () {
             me.filterSub();  
         },
         select: function(combo, records) {
            var me = this;
            var f  = me.getFormdata();
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
    'cashfloweditorformdata [action=save]': {
                  // click: function() {
                  //     // var f  = me.getFormdata();
                  //     // var subgl_code = f.down("[name=ceksubglempty]").getValue();

                  //     // if (subgl_code ==1 ) {
                  //     //     me.dataSave();
                  //     // }else{
                  //     //     Ext.Msg.show({
                  //     //          title:'Gagal Update',
                  //     //          msg: 'Subgl Tidak sesuai / Tidak terdaftar silahkan pilih kembali.',
                  //     //          buttons: Ext.Msg.OK,
                  //     //          icon: Ext.Msg.WARNING
                  //     //     });
                  //     // }
                  //     this.dataSaveCustome;
                  //     console.log('save');
                  // }
                click: this.dataSaveCustome,
            },
            
            'cashfloweditorcoadetail [name=type_acc]': {
                change: function () {
                    me.cashfloweditorDetail.acctypeChange(me);
                }
            },
            'cashfloweditorformfillcashflow': {
                afterrender: function(el, act) {
                    me.getStorePtproject();
                }
            },
            'cashfloweditorgrid toolbar button[action=fillcashflow]': {
                click: function(el, act) {
                    me.instantWindow('FormFillcashflow', 600, 'Fill Cashflow', 'create', 'myInstantWindow', me.controllerName);
                }
            },
            'cashfloweditorformfillcashflow [name=projectpt_id]': {
                change: function(el) {
                    var f = me.getFillcashflow();
                    if (el.value != null) {
                        var ptid      = el.valueModels[0].data.pt_id;
                        var projectid = el.valueModels[0].data.project_id;
                        f.down("[name=pt_id]").setValue(parseInt(ptid));
                        f.down("[name=project_id]").setValue(parseInt(projectid));
                    }else{
                        var ptid      = apps.pt;
                        var projectid = apps.project;
                        f.down("[name=pt_id]").setValue(parseInt(ptid));
                        f.down("[name=project_id]").setValue(parseInt(projectid));
                    }
                    f.down("[name=coa]").setValue();
                    f.down("[name=setupcashflowtype_id_fill]").setValue();
                    f.down("button[action=fillcashflow]").setDisabled(false);
                    me.getStoreCoa(ptid,projectid);
                    me.getStoreCashflowtype(ptid,projectid);
                    me.getStorePrefixcashflow(ptid,projectid)
                }
            },
            'cashfloweditorformfillcashflow [action=fillcashflow]': {
                click: this.updatefillcashflow,
            },
            'cashfloweditorformfillcashflow [name=coa] ': {
                'keyup': function () {
                    var me, value;
                    me    = this;
                    value = me.getFillcashflow().down("[name=coa]").getRawValue();
                    this.autocompletecombo(value);
                },
                
            },
            'cashfloweditorgrid [name=btnHelp]': {
                click: function(el, act) {
                    Ext.create("Ext.Window",{
                        title   : 'User Manual : Cashflow Editor',
                        width   : 700,
                        height  : 500,
                        closable: true,
                        items   : [{
                            xtype: 'component',
                            html : '<iframe src="attachments/manualmodule/User-Manual-Module-Cashflow-Editor.pdf" width="100%" height="100%"></iframe>',
                        }],  
                        autoScroll: true,
                        modal     : true
                    }).show();  
                }
            },
        });
},
autocompletecombo: function (value) {
    var me, storecoa, value;
    me       = this;
    storecoa = me.getStore('Coacombo');
    storecoa.clearFilter();
    storecoa.filter('coa', value);
    var f = me.getFillcashflow();
    if (storecoa.data.items.length > 0) {
        f.down("button[action=fillcashflow]").setDisabled(false);
    }else{
        f.down("button[action=fillcashflow]").setDisabled(true);
    }
},
formSearchAfterRenderCustom: function() {
    var me, storeproject;
    me = this;

    var f = me.getFormsearch();

    storeproject = me.getStore('Project');
    storeproject.load({
        params: {
          "hideparam" : 'projectpt',
          "project_id": apps.project,
          "start"     : 0,
          "limit"     : 1000000,
        }, callback   : function (recordscode, operationcode, successcode) {
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

    var me        = this;
        projectid = f.down("[name=project_id]").getValue();

    if(projectid != null){
        projectid = f.down("[name=project_id]").getValue();
    }else{
        projectid = apps.project;
    }

    var f        = f;
        storecoa = me.getStore('Pt');
    storecoa.load({
        params: {
            "hideparam" : 'getptbyuserproject',
            "start"     : 0,
            "limit"     : 1000000,
            "project_id": projectid,
            "user_id"   : apps.uid
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
          "hideparam" : 'projectpt',
          "project_id": apps.project,
          "start"     : 0,
          "limit"     : 1000000,
        }, callback   : function (recordscode, operationcode, successcode) {
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

    var form  = me.getFormdata();
    var store = form.down("[name=subgl_id]").getStore();

    var pt_id      = form.down("[name=pt_id]").getValue();
    var project_id = form.down("[name=project_id]").getValue();
    var kelsub     = form.down("[name=kelsub_id]").getValue();

    store.getProxy().setExtraParam('hideparam', 'getsubglbykelsub');
    store.getProxy().setExtraParam('project_id', parseInt(project_id));
    store.getProxy().setExtraParam('kelsub_id', parseInt(kelsub));
    store.getProxy().setExtraParam('pt_id', parseInt(pt_id));
    store.load();

},
loadDataSubgl: function() {
    var me         = this;
    var form       = me.getFormdata();
    var kelsub_id  = form.down("[name=kelsub_id]").getValue();
    var pt_id      = form.down("[name=pt_id]").getValue();
    var project_id = form.down("[name=project_id]").getValue();
    var code       = form.down("[name=code]").getValue();
    var subglstore = form.down("[name=subgl_id]").getStore();

          // subglstore.removeAll();
        subglstore.clearFilter();
        subglstore.load({
            params: {
                "hideparam" : "getsubglbykelsub",
                "project_id": project_id,
                "pt_id"     : pt_id,
                "kelsub_id" : kelsub_id

            },
            callback: function(record) {

            }
        })
    },
    loadDataSubglWithQuery: function(query) {
        var me         = this;
        var f          = me.getFormdata();
        var kelsub_id  = f.down("[name=kelsub_id]").getValue();
        var pt_id      = f.down("[name=pt_id]").getValue();
        var project_id = f.down("[name=project_id]").getValue();
          // var subglstore = f.down("[name=subgl_id]").getStore();
        var subglstore = me.getStore('Subgl');

        Ext.getBody().mask("Please wait...");

        subglstore.removeAll();
        subglstore.clearFilter();
        subglstore.load({
            params: {
                "hideparam" : "getsubglbykelsub",
                "project_id": project_id,
                "pt_id"     : pt_id,
                "kelsub_id" : kelsub_id,
                "query"     : query
            },
            callback: function(record) {
                f.down("[name=subgl_id]").setValue(query);
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
        var me, storesubcode,ptid,kelsubid;
        me        = this;
        ptid      = me.getFormdata().down("[name=pt_id]").getValue();
        projectid = me.getFormdata().down("[name=project_id]").getValue();
        kelsubid  = me.getFormdata().down("[name=kelsub_id]").getValue();

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

          // var customCode = me.getFormdata().down("[name=subgl_id]").getRawValue();

          // Ext.getBody().mask("Please wait...");
          // storesubcode = me.getStore('Subaccountcode');
          // storesubcode.load({
          //     params: {
          //         "hideparam": 'filterbysub',
          //         "fromkelsub": 0,
          //         "untilkelsub": 0,
          //         "fromcoa": 0,
          //         "untilcoa": 0,
          //         "start": 0,
          //         "pt_id_owner": ptid,
          //         "project_id": projectid,
          //         "kelsub_id" : kelsubid,
          //         "checkallsub" :0,
          //         "customCode" : customCode,
          //         "type" : 0,
          //         "limit": 10,
          //     },
          //     callback: function (recordscode, operationcode, successcode) {
          //         storesubcode.sort('code', 'ASC');
          //         var f = me.getFormdata();
          //         if (successcode) {
          //             if (successcode) {
          //                 var store = f.down("[name=subgl_id]").getStore();
          //                 store.removeAll();
          //                 store.clearFilter();

          //                 var last = recordscode.length - 1;
          //                 // console.log(recordscode);
          //                 for (let i = 0; i < recordscode.length; i++) {
          //                     var firstdatacode = recordscode[i]['raw'];
          //                     store.add({
          //                     subgl_id: firstdatacode.subgl_id, 
          //                     code: firstdatacode.code, 
          //                     code1: firstdatacode.code1,
          //                     code2: firstdatacode.code2,
          //                     code3: firstdatacode.code3,
          //                     code4: firstdatacode.code4,
          //                     kelsub_id : firstdatacode.kelsub_id,
          //                     kelsub : firstdatacode.kelsub,
          //                     description : firstdatacode.description
          //                     });
          //                 }
          //             }
          //         }
          //         Ext.getBody().unmask();
          //     }

          // });

    },
    dataSaveCustome: function() {
        var me = this;
        var f  = me.getFormdata();
        f.down("[name=hideparam]").setValue('default');

        var form = f.getForm();

          //console.log(form.getValues());
        var addingRecord = false;
        if (!me.finalValidation()) {
            return false;
        }

        var vp  = me.validationProcess();
        var vps = false;                   // validation prosess status
        if (typeof vp === 'object') {
            vps = vp.status;
            if (!vps) {

                Ext.MessageBox.alert('Alert', vp.msg, function () {
                    var x = me.getFormdata().down('[name=' + vp.field + ']');
                    if (x !== null) {
                        x.markInvalid(vp.msg);
                        x.focus();
                    }

                });
            }
        } else if (typeof vp === 'boolean') {
            vps = vp;
        }

        if (form.isValid() && vps) {
            resetTimer();
            me.unformatCurrencyFormdata(me, f);
            var store               = null;
            var fida                = me.getFinalData(form.getValues());
            fida['cashflowtype_id'] = f.down("[name=setupcashflow_id]").valueModels[0].data.cashflowtype_id_real;
              // console.log(fida); return false;
            if (me.instantCreateMode) {
                store = _Apps.getController(me.callerId).getInstanCreateStorex(me.controllerName);
            } else {
                  /* Mendefinisikan store sendiri pada saat proses simpan/edit 
                 * yang ada di me.storeProcess
                 * */
                 if (!me.storeProcess) {
                    store = me.getGrid().getStore();
                      //console.log(store);
                } else {
                    store = me.storeProcess;
                }
            }

            var msg = function () {
                me.getFormdata().up('window').body.mask('Saving data, please wait ...');
            };
            var state_submit = me.getFormdata().up('window').state.toLowerCase();

            switch (state_submit) {
                case 'create': 
                store.add(fida);
                addingRecord = true;
                break;
                case 'update': 
                var idProperty = store.getProxy().getReader().getIdProperty();
                var rec        = store.getById(parseInt(form.findField(idProperty).getValue(), 10));
                rec.beginEdit();
                rec.set(fida);
                rec.endEdit();
                break;
                default: 
                return;
            }

            Ext.Ajax.request({
                url   : me.urldata + state_submit,
                method: 'POST',
                params: {
                    data: Ext.encode(fida),
                },
                success: function (response) {
                    var info           = Ext.JSON.decode(response.responseText);
                        me.messagedata = info.msg;
                    if (info.success != 'false') {
                        me.alertFormdataSuccess(f);
                    } else {
                        me.alertFormdataFailed(f);
                    }
                }
            });

        }
    },
    alertFormdataSuccess: function(f) {
        var me, form, store;
        me   = this;
        form = f;
        form.up('window').body.unmask();
        Ext.Msg.show({
            title  : 'Success',
            msg    : me.messagedata,
            icon   : Ext.Msg.INFO,
            buttons: Ext.Msg.OK,
            fn     : function() {
                form.up('window').close();
                me.getGrid().getStore().reload();
            }
        });
    },
    alertFormdataFailed: function(f) {
        var me, form, store;
        me = this;
        me.getGrid().getStore().reload();
        form = f;
        form.up('window').body.unmask();
        Ext.Msg.show({
            title  : 'Failure',
            msg    : 'Error: ' + me.messagedata,
            icon   : Ext.Msg.ERROR,
            buttons: Ext.Msg.OK
        });
    },
    formDataAfterRenderCustome: function() {
        var me, storecashfloweditor, grid, store, record, counter;
        me = this;

        var form         = me.getFormdata();
        var state_submit = form.up('window').state.toLowerCase();
        
        if ( state_submit == 'create' ) {

        } else {
            me.fdar().update();
            grid    = me.getGrid();
            store   = grid.getStore();
            record  = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
            counter = store.getCount();
            if (record == null || record==false || record.length < 1){
                Ext.Msg.alert('Warning', 'Please select data.');
                return 0;
            }

            if (counter > 0) {
                row                 = record['data'];
                storecashfloweditor = me.getStore('Cashflowsetupcombobox');
                storecashfloweditor.load({
                    params: {
                        "hideparam" : 'getsetupcashflowbypt',
                        "start"     : 0,
                        "limit"     : 1000000,
                        "project_id": apps.project,
                        "pt_id"     : apps.pt
                    },
                    callback: function (records, operation, success) {
                        storecashfloweditor.each(function(rec) {
                            if (rec.data.cashflowtype_id == row.setupcashflow_id) {
                                form.down("[name=setupcashflow_id]").setValue(parseInt(rec.data.cashflowtype_id));
                            }
                        });
                    }
                });
                
            }
        }
    },
    gridSelectionChange: function () {
        var me   = this;
        var grid = me.getGrid(),
            row  = grid.getSelectionModel().getSelection();
        grid.down('#btnEdit').setDisabled(row.length != 1);
    },

    getStorePtproject: function () {
        var me, store, form, project_id, pt_id;
            me    = this;
        var f     = me.getFillcashflow();
            store = me.getStore('Projectpt');
        store.load({
            params: {
                "hideparam": 'getptbyuseridv2',
                "start"    : 0,
                "limit"    : 1000000
            },
            callback: function (records, operation, success) {
                if (records[0]) {
                    var row = records[0]['data'];
                    f.down("[name=projectpt_id]").setValue(parseInt(apps.projectpt));
                    f.down("[name=pt_id]").setValue(parseInt(apps.pt));
                    f.down("[name=project_id]").setValue(parseInt(apps.project));
                }

            }
        });
    },
    getStoreCashflowtype: function (ptid,projectid) {
        var me, storecashfloweditor;
        me                  = this;
        storecashfloweditor = me.getStore('Cashflowsetupcombobox');
        storecashfloweditor.load({
            params: {
                "hideparam" : 'getsetupcashflowbypt',
                "start"     : 0,
                "limit"     : 1000000,
                "project_id": projectid,
                "pt_id"     : ptid
            },
            callback: function (records, operation, success) {
            }
        });
    },
    getStoreCoa: function (ptid,projectid) {
        var me,       storecoa = '';
            me       = this;
            storecoa = me.getStore('Coacombo');
        storecoa.clearFilter();
        storecoa.load({
            params: {
                "hideparam"  : 'coagridbyuserpt',
                "start"      : 0,
                "limit"      : 1000000,
                "pt_id_owner": ptid,
                "project_id" : projectid
            },
            callback: function (records, operation, success) {
                if (records[0]) {
                    var row = records[0]['data'];
                      // me.setValueCombobox(me, 'coa_id', row.coa_id,row.coa);
                }

            }
        });
    },
    getStorePrefixcashflow: function (ptid,projectid) {
        var me, storeprefixcashflow;
        me                  = this;
        storeprefixcashflow = me.getStore('Prefixcashflowcombo');
        storeprefixcashflow.load({
            params: {
                "hideparam" : 'getprefixcashflow',
                "start"     : 0,
                "limit"     : 1000000,
                "project_id": projectid,
                "pt_id"     : ptid
            },
            callback: function (records, operation, success) {
            }
        });
    },

    updatefillcashflow: function() {
        var me = this;
        var f  = me.getFillcashflow();
        f.down("[name=hideparam]").setValue('fillcashflow');

        var form = f.getForm();

        var addingRecord = false;
        if (!me.finalValidation()) {
            return false;
        }

        var vp  = me.validationProcess();
        var vps = false;                   // validation prosess status
        if (typeof vp === 'object') {
            vps = vp.status;
            if (!vps) {

                Ext.MessageBox.alert('Alert', vp.msg, function () {
                    var x = me.getFormdata().down('[name=' + vp.field + ']');
                    if (x !== null) {
                        x.markInvalid(vp.msg);
                        x.focus();
                    }

                });
            }
        } else if (typeof vp === 'boolean') {
            vps = vp;
        }

        if (form.isValid() && vps) {
            resetTimer();
            me.unformatCurrencyFormdata(me, f);
            var store            = null;
            var setupcashflow_id = f.down("[name=setupcashflowtype_id_fill]").valueModels[0].data.cashflowtype_id;
            var cashflowtype_id  = f.down("[name=setupcashflowtype_id_fill]").valueModels[0].data.cashflowtype_id_real;
            f.down("[name=setupcashflow_id]").setValue(setupcashflow_id);
            f.down("[name=cashflowtype_id]").setValue(cashflowtype_id);
            var fida = me.getFinalData(form.getValues());
            
            if (!fida.prefix_id) {
                fida.prefix_id = 0
            }
            
            f.setLoading("Please Wait...");
            Ext.Ajax.request({
                url   : me.urldata + 'update',
                method: 'POST',
                params: {
                    data: Ext.encode(fida),
                },
                success: function (response) {
                    f.setLoading(false);
                    var info           = Ext.JSON.decode(response.responseText);
                        me.messagedata = info.msg;
                    if (info.success != 'false') {
                        me.alertFormdataSuccess(f);
                    } else {
                        me.alertFormdataFailed(f);
                    }
                }
            });

        }
    }


})