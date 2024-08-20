Ext.define('Cashier.controller.Useraccessprefix', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Useraccessprefix',
    requires: [
       // 'Cashier.library.template.combobox.Projectptbyvoucherprefixcombobox',
        'Cashier.library.template.combobox.Usermodulecashiercombobox',
        'Cashier.library.template.combobox.VoucherprefixsetupcomboboxV2',
        'Cashier.library.template.combobox.Ptusercomboboxpersh',
    ],
    views: [
        'useraccessprefix.Panel',
        'useraccessprefix.Grid',
        'useraccessprefix.FormSearch',
        'useraccessprefix.FormData',
    ],
    stores: [
        'Useraccessprefix',
        'Projectptbyvoucherprefix',
        'Usermodulecashier',
        'VoucherprefixsetupcomboV2',
        'PtbyuserpershV2',
    ],
    models: [
        'Useraccessprefix',
        'Projectpt',
        'Usermodulecashier',
        'VoucherprefixsetupV2',
    ],
    refs: [
        {ref: 'grid', selector: 'useraccessprefixgrid'},
        {ref: 'formsearch', selector: 'useraccessprefixformsearch'},
        {ref: 'formdata', selector: 'useraccessprefixformdata'},
    ],
    controllerName: 'useraccessprefix',
    fieldName: 'useraccessprefix',
    bindPrefixName: 'Useraccessprefix',
    rowproject: null, storept: null, state: null,
    loadingrequesttop: new Ext.LoadMask(Ext.getBody(), {msg: "Please wait, loading Company..."}),
    init: function (application) {
        var me = this;
        this.control({
            'useraccessprefixpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'useraccessprefixgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'useraccessprefixgrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'useraccessprefixgrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'useraccessprefixgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'useraccessprefixgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'useraccessprefixgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'useraccessprefixformsearch button[action=search]': {
                click: this.dataSearch
            },
            'useraccessprefixformsearch button[action=reset]': {
                click: this.dataReset
            },
            'useraccessprefixformdata': {
                afterrender: this.formDataAfterRender,
                

            },
            'useraccessprefixformdata [name=useraccessprefix] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'useraccessprefixformdata [name=projectpt_id] ': {
                'select': function () {
                    var me, value, form;
                    me = this;
                    form = me.getFormdata();
                    form.down('[name=user_access_id]').setRawValue('');
                    form.down('[name=voucherprefix_id]').setRawValue('');
                     form.down('[name=user_access_id]').setValue('');
                      form.down('[name=voucherprefix_id]').setValue('');
                        var valueModels = form.down('[name=projectpt_id]').valueModels[0];
                        var project_id = valueModels.data['project_id'];
                        var pt_id = valueModels.data['pt_id'];
                    form.down('[name=project_id]').setValue(project_id);
                     form.down('[name=pt_id]').setValue(pt_id);

                    me.setStorePrefix();
                    me.setStoreUser();
                },
                 'change': function (that, newValue, oldValue, eOpts) {
                    var me, value, form;
                    me = this;
                    form = me.getFormdata();
                    var valueModels = form.down('[name=projectpt_id]').valueModels[0];
                    var project_id = valueModels.data['project_id'];
                    var pt_id = valueModels.data['pt_id'];
                    form.down('[name=project_id]').setValue(project_id);
                    form.down('[name=pt_id]').setValue(pt_id);

                    me.setStorePrefix();
                    me.setStoreUser();


                 }
            },
          
            'useraccessprefixformdata [name=objectname] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'useraccessprefixformdata button[action=save]': {
                click: this.dataSave
            },
            'useraccessprefixformdata button[action=cancel]': {
                click: this.formDataClose
            },
             'useraccessprefixformsearch': {
                afterrender: function () {
                    me.setStorePtuser('formsearch');
                },
            },
            'useraccessprefixformsearch [name=projectpt_id] ': {
                'select': function () {
                    var me, value, form;
                    me = this;
                    form = me.getFormsearch();
                        var valueModels = form.down('[name=projectpt_id]').valueModels[0];
                        var project_id = valueModels.data['project_id'];
                        var pt_id = valueModels.data['pt_id'];
                    form.down('[name=project_id]').setValue(project_id);
                     form.down('[name=pt_id]').setValue(pt_id);

                  
                },
                 'change': function (that, newValue, oldValue, eOpts) {
                    var me, value, form;
                    me = this;
                    form = me.getFormsearch();
                    var valueModels = form.down('[name=projectpt_id]').valueModels[0];
                    var project_id = valueModels.data['project_id'];
                    var pt_id = valueModels.data['pt_id'];
                    form.down('[name=project_id]').setValue(project_id);
                    form.down('[name=pt_id]').setValue(pt_id);

                 


                 }
            },
        });
    },
    getMe: function(){
       var me = this;
       return _Apps.getController(me.bindPrefixName);
    },
    setStorePrefix: function () {
        var me, store, form, grid;
        var me = this.getMe();
        me.loadingrequesttop.show();
        store = me.getStore("VoucherprefixsetupcomboV2");
        form = me.getFormdata();
        var valueModels = form.down('[name=projectpt_id]').valueModels[0];
        var project_id = valueModels.data['project_id'];
        var pt_id = valueModels.data['pt_id'];
       
       
        store.load({
            params: {
                "hideparam": 'getvoucherprefixsetupV3',
                "project_id": project_id,
                "pt_id": pt_id,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
              
               me.loadingrequesttop.hide();
             
            }
        });
    },
    fdar: function () {
        var me = this;
        var x = {
            init: function () {
                /// init here

            },
            create: function () {
                /// create here  
                me.formatCurrencyFormdata(me, me.getFormdata());
                  me.setStorePtuser('formdata');
            },
            update: function () {
                var grid = me.getGrid();
                var store = grid.getStore();
                var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                   console.log(record);
                
                me.getFormdata().loadRecord(record);

                //added by ahmad riadi 26-10-2016
                me.formatCurrencyFormdata(me, me.getFormdata());
                /// update here
            },
            read: function () { //========= added on march 15th 2016 by Tirtha
                var grid = me.getGrid();
                var store = grid.getStore();
                var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));

                me.getFormdata().loadRecord(record);
                me.getFormdata().getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
                me.formatCurrencyFormdata(me, me.getFormdata());
                me.getFormdata().down('#btnSave').setDisabled(true);
            }
        };
        return x;
    },
    setStorePtuser: function (form) {
        var me, store, form, grid;
        var me = this.getMe();
        me.is_ready = 0;
        me.loadingrequesttop.show();
        store = me.getStore("PtbyuserpershV2");
        if(form == 'formdata'){
             form = me.getFormdata();
         }else{
            form = me.getFormsearch();
         }
       
        store.load({
            params: {
                "hideparam": 'getptbyuserpersh',
                "project_id": apps.project,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                if(form == 'formdata'){
                    form.down('[name=projectpt_id]').setValue(parseInt(apps.projectpt));
                }else{
                    form.down('[name=projectpt_id]').setValue(parseInt(apps.projectpt));
                }
             //  me.setVal(form, 'pt_id', parseInt(apps.projectpt));
               me.loadingrequesttop.hide();
             
            }
        });
      
    },
     setStoreUser: function () {
        var me, store, form, grid;
        var me = this.getMe();
        me.loadingrequesttop.show();
        store = me.getStore("Usermodulecashier");
        form = me.getFormdata();
        var valueModels = form.down('[name=projectpt_id]').valueModels[0];
        var project_id = valueModels.data['project_id'];
        var pt_id = valueModels.data['pt_id'];
       
       
        store.load({
            params: {
                "hideparam": 'usermodulecashier',
                "project_id": project_id,
                "pt_id": pt_id,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
              
               me.loadingrequesttop.hide();
             
            }
        });
      
    },
    dataDestroy: function() {
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
                var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(me.fieldName) + ']';
                confirmmsg = 'Delete this data ?';
                failmsg = 'Error: Unable to delete this data.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }
            Ext.Msg.confirm('Delete Data', confirmmsg, function(btn) {
                if (btn == 'yes') {
                    resetTimer();
                    var msg = function() {
                        me.getGrid().up('window').mask('Deleting data, please wait ...');
                    };
                    for (var i = 0; i < rows.length; i++) {

                        store.remove(rows[i]);
                    }

                    store.on('beforesync', msg);
                    store.sync({
                        success: function(s) {
                            me.getGrid().up('window').unmask();
                            var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
                            var successmsg = (rows.length == 1 ? 'Data' : (successcount != rows.length ? successcount + ' of ' : '') + recordcounttext) + ' deleted successfully.';
                            store.un('beforesync', msg);
                            store.reload();
                            if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
                                Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 0}});
                            }
                            Ext.Msg.show({
                                title: 'Success',
                                msg: successmsg,
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK
                            });
                        },
                        failure: function() {
                            me.getGrid().up('window').unmask();
                            store.un('beforesync', msg);
                            store.reload();
                            Ext.Msg.show({
                                title: 'Failure',
                                msg: failmsg + ' The data may have been used.',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    });
                }
            });
        }
    },
});