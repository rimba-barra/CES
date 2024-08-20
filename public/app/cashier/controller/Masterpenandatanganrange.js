Ext.define('Cashier.controller.Masterpenandatanganrange', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Masterpenandatanganrange',
    views: ['masterpenandatanganrange.Panel', 
        'masterpenandatanganrange.Grid'
        , 'masterpenandatanganrange.FormSearch'
        , 'masterpenandatanganrange.FormData'
    ],
     requires: [
        'Cashier.library.template.combobox.Prefixcombobox',
        'Cashier.library.template.component.Ptbyusercombobox'
    ],
    stores: ['Masterpenandatanganrange','Masterpenandatangan','Rangeapprove', 'Prefixcombo','Ptbyusermulti'],
    models: ['Masterpenandatanganrange','Masterpenandatangan','Rangeapprove'],
    refs: [
        {
            ref: 'panel',
            selector: 'masterpenandatanganrangepanel'
        },
        {
            ref: 'grid',
            selector: 'masterpenandatanganrangegrid'
        },
        {
            ref: 'formdata',
            selector: 'masterpenandatanganrangeformdata'
        },
        {
            ref: 'formsearch',
            selector: 'masterpenandatanganrangeformsearch'
        },
    ],
    controllerName: 'masterpenandatanganrange',
    fieldName: 'range_penandatangan_id',
    bindPrefixName: 'Masterpenandatanganrange',
    rowproject: null, storept: null, state: null, rowcompanyform: null,
    init: function(application) {
        var me = this;
        this.control({
            'masterpenandatanganrangepanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'masterpenandatanganrangegrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'masterpenandatanganrangegrid toolbar button[action=create]': {
                click: function() {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'masterpenandatanganrangegrid toolbar button[action=update]': {
                click: function() {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'masterpenandatanganrangegrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'masterpenandatanganrangegrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'masterpenandatanganrangeformsearch': {
                    afterrender: this.formSearchAfterRender
            },
            'masterpenandatanganrangeformsearch button[action=search]': {
                click: this.dataSearch
            },
            'masterpenandatanganrangeformsearch button[action=reset]': {
                click: this.dataReset
            },
            'masterpenandatanganrangeformdata': {
                afterrender: this.formDataAfterRender
            },
            'masterpenandatanganrangeformdata button[action=save]': {
                click: this.dataSave
            },
            'masterpenandatanganrangeformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'masterpenandatanganrangeformdata [name=penandatangan_id]': {
                change: function (field, newValue, oldValue, desc) {
                    me.getPenandatanganValue(newValue);
                }
            },
            'masterpenandatanganrangeformdata [name=rangeapprove_id]': {
                change: function (field, newValue, oldValue, desc) {
                    me.getRangeValue(newValue);
                }
            },
            'masterpenandatanganrangeformdata [name=projectpt_id]': {
                change: function (field, newValue, oldValue, desc) {
                    me.filterbyCompany(newValue);
                    var record = field.valueModels;
                    if (record != undefined && record.length != 0){
                        me.rowcompanyform = record[0]['data'];
                        me.getPrefix();
                    }
                },
                 'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata;
                    me = this;
                    me.rowcompanyform = record[0]['data'];
                    me.getPrefix();
                    me.getFormdata().down("[name=rangeapprove_id]").setValue('');
                     me.getFormdata().down("[name=penandatangan_id]").setValue('');
                     me.getFormdata().down("[name=prefix_id]").setRawValue('');
                       me.getFormdata().down("[name=prefix_id]").setValue('');

                    //me.filterbyCompany(record[0]['data'].projectpt_id);
                },
            },
        });
    },
    panelAfterRender: function () {
        var me = this;
        var f = me.getFormsearch();
        var projectpt_id = 0;
        me.getFormsearch().down("[name=projectpt_id]").getStore().load();
        
        Ext.Ajax.request({
            url: 'cashier/common/read',
            method: 'POST',
            timeout:100000000,	
            params: {
                hideparam :'getptbyuserid',
                project_project_id: apps.project,
                pt_pt_id: apps.pt,
                user_id: apps.uid,
                start: 0,
                limit: 1000,
            },
            success: function (response) {
                response = Ext.JSON.decode(response.responseText);
                //console.log(response.data[0]['projectpt_id']);
                projectpt_id = response.data[0]['projectpt_id'];
                f.down("[name=projectpt_id]").setValue(parseInt(projectpt_id));
                me.dataSearch();
                var grid = me.getGrid();
                grid.setLoading('Please wait');
                var storear = grid.getStore();
                storear.load({
                    callback: function () {
                        grid.setLoading(false);
                    }
                });
            },
            failure: function (response) {
                
            }
        });
        
    },

    fdar: function () {
        var me = this;
        var f = me.getFormdata();
        var x = {
            init: function () {
                /// init here
            },
            create: function () {
                /// create here  
            },
            update: function () {

                me.getcompany();
                var formvalue = me.getFormdata().getForm().getValues();
                for (var i in formvalue) {
                    var el = me.getFormdata().down("[name=" + i + "]");
                    if (el) {
                        if (el.absoluteReadOnly) {
                            el.setReadOnly(true);
                        }
                    }
                }

                // me.getFormdata().down("[name=coacode]").setReadOnly(true);
                var grid = me.getGrid();
                var store = grid.getStore();
                var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                me.getFormdata().loadRecord(record);
                /// update here
            },
        };
        return x;
    },
     formDataAfterRender: function(el) {

        var me = this;
        me.storeProcess = me.createSpProcessObj(me.storeProcess);
        me.fdar().init();

        me.loadComboBoxStore(el);
        var state = el.up('window').state;

        if (state == 'create') {
            me.fdar().create();
        } else if (state == 'update') {
            me.getFormdata().down("[name=projectpt_id]").setReadOnly(true);
            me.fdar().update();


        }
    },
     getcompany: function(){
            var me = this;
           
            store = me.getStore('Ptbyusermulti');
            store.load({
            params: {
                "hideparam": 'getptbyuserid',
                 "project_id": apps.project,
                "user_id": apps.uid,
                "start": 0,
                "limit": 1000,
            },
            sync: false,
            callback: function (recordscode, operationcode, successcode) {
                if (successcode) {
                    if (recordscode[0]) {
                        var firstdatacode = recordscode[0]['data'];
                        
                       
                        me.setValue(me, 'projectpt_id', firstdatacode.projectpt_id);
                       
                    }
                }
                }
            });

    },
    getPenandatanganValue: function (newValue) {
        var me = this;
        var f = me.getFormdata();
        var e = f.down("[name=penandatangan_id]");
        var x = e.getStore().findRecord("penandatangan_id", newValue,0,false,true,true);
        if(x == null){
             f.down("#penandatangan_inisial").setValue('');
            f.down("#penandatangan_name").setValue('');
            f.down("#penandatangan_jabatan").setValue('');
            f.down("#penandatangan_departemen").setValue('');
        }else{
            f.down("#penandatangan_inisial").setValue(x.data['inisial']);
            f.down("#penandatangan_name").setValue(x.data['name']);
            f.down("#penandatangan_jabatan").setValue(x.data['jabatan']);
            f.down("#penandatangan_departemen").setValue(x.data['departemen']); 
        }
       
    },
    getRangeValue: function (newValue) {
        var me = this;
        var f = me.getFormdata();
        var e = f.down("[name=rangeapprove_id]");
        var x = e.getStore().findRecord("rangeapprove_id", newValue,0,false,true,true);
        if(x == null){
            f.down("#range_min_amount").setValue('');
            f.down("#range_max_amount").setValue('');

        }else{
            f.down("#range_min_amount").setValue(x.data['fromamount']);
            f.down("#range_max_amount").setValue(x.data['untilamount']);
        }
        
    },
    filterbyCompany: function (value){
        var me = this;
        var f = me.getFormdata();
        var rec = f.down("[name=projectpt_id]").getStore().findRecord("projectpt_id", value,0,false,true,true);
        var penandatangan = f.down("[name=penandatangan_id]").getStore();
        var range = f.down("[name=rangeapprove_id]").getStore();
        penandatangan.clearFilter();
        penandatangan.filter('pt_id', rec.data['pt_id'], true, false);
        penandatangan.filter('project_id', rec.data['project_id'], true, false);
        range.clearFilter();
        range.filter('pt_id', rec.data['pt_id'], true, false);
        range.filter('project_id', rec.data['project_id'], true, false);
    },
     getPrefix: function () {
        var me, store, form, state;
        me = this;
        store = me.getStore('Prefixcombo');
        form = me.getFormdata();
        store.reload({
            params: {
                "hideparam": 'getprefixbyprojectpt',
                "project_id": me.rowcompanyform.project_id,
                "pt_id": me.rowcompanyform.pt_id,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {

            }
        });
    },
     dataSave: function() {
        var me = this;
        var form = me.getFormdata().getForm();
        var addingRecord = false;
        if (!me.finalValidation()) {
            return false;
        }
       
        // added 12 Nov 2013 
        var vp = me.validationProcess();
        var vps = false; // validation prosess status
        if (typeof vp === 'object') {
            vps = vp.status;
            if (!vps) {

                Ext.MessageBox.alert('Alert', vp.msg, function() {
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
        // end added 12 Nov 2013

        if (form.isValid() && vps) {
            
            resetTimer();
            //var store = me.getGrid().getStore();
            var store = null;

            var fida = me.getFinalData(form.getValues());

            if (me.instantCreateMode) {

                store = _Apps.getController(me.callerId).getInstanCreateStorex(me.controllerName);
            } else {
                /* Mendefinisikan store sendiri pada saat proses simpan/edit 
                 * yang ada di me.storeProcess
                 * */
                if (!me.storeProcess) {
                   
                    store = me.getGrid().getStore();
                    console.log(store);

                } else {

                    store = me.storeProcess;

                }

            }

            



            var msg = function() {
                me.getFormdata().up('window').body.mask('Saving data, please wait ...');
            };
            switch (me.getFormdata().up('window').state.toLowerCase()) {
                case 'create':

                    store.add(fida);
                    addingRecord = true;
                    break;
                case 'update':
              
                    var idProperty = store.getProxy().getReader().getIdProperty();
                    var rec = store.getById(parseInt(form.findField(idProperty).getValue(), 10));
                    rec.beginEdit();
                    rec.set(fida);
                    rec.endEdit();
                    break;
                default:
                    return;
            }

            store.on('beforesync', msg);
            store.sync({
                success: function() {
                    me.getFormdata().up('window').body.unmask();
                    store.un('beforesync', msg);
                    store.reload();

                    if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
                        Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 0}});
                    }
                    Ext.Msg.show({
                        title: 'Success',
                        msg: 'Data saved successfully.',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function() {
                            me.formDataClose();
                        }
                    });
                },
                failure: function() {
                    me.getFormdata().up('window').body.unmask();
                    store.un('beforesync', msg);
                    if (store.getCount() > 0 && addingRecord) {
                        store.removeAt(store.getCount() - 1);
                    }
                    store.reload();
                    Ext.Msg.show({
                        title: 'Failure',
                        msg: 'Error: Data Already Exist',
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            });
        }
    },
});