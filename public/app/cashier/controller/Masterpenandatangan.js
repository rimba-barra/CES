Ext.define('Cashier.controller.Masterpenandatangan', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Masterpenandatangan',
    views: ['masterpenandatangan.Panel', 'masterpenandatangan.Grid', 'masterpenandatangan.FormSearch', 'masterpenandatangan.FormData'],
    stores: ['Masterpenandatangan','Ptbyusermulti'],
    models: ['Masterpenandatangan','Projectpt'],
    refs: [
        {
            ref: 'panel',
            selector: 'masterpenandatanganpanel'
        },
        {
            ref: 'grid',
            selector: 'masterpenandatangangrid'
        },
        {
            ref: 'formdata',
            selector: 'masterpenandatanganformdata'
        },
        {
            ref: 'formsearch',
            selector: 'masterpenandatanganformsearch'
        },
    ],
    controllerName: 'masterpenandatangan',
    fieldName: 'penandatangan_id',
    bindPrefixName: 'Masterpenandatangan',
    rowproject: null, storept: null, state: null,
    init: function(application) {
        var me = this;
        this.control({
            'masterpenandatanganpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'masterpenandatangangrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'masterpenandatangangrid toolbar button[action=create]': {
                click: function() {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'masterpenandatangangrid toolbar button[action=update]': {
                click: function() {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'masterpenandatangangrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'masterpenandatangangrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'masterpenandatanganformsearch': {
                    afterrender: this.formSearchAfterRender
            },
            'masterpenandatanganformsearch button[action=search]': {
                click: this.dataSearch
            },
            'masterpenandatanganformsearch button[action=reset]': {
                click: this.dataReset
            },
            'masterpenandatanganformdata': {
                afterrender: this.formDataAfterRender
            },
            'masterpenandatanganformdata button[action=save]': {
                click: this.dataSave
            },
            'masterpenandatanganformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'masterpenandatanganformdata [name=sort]': {
                'keyup': function (cb, newValue, oldValue, options) {
                    var me, getvalue;
                    me = this;
                    getvalue = newValue.target.value;
                    if(getvalue == 0 && getvalue.length == 1 )
                             Ext.Msg.show({
                            title: 'Failure',
                            msg: 'Error: 0 is not allowed!',
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                        });
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
        } else if (state == 'read') { //========= added on march 15th 2016 by Tirtha
            me.fdar().read();
        }
    },
    dataSave: function() {
        var me = this;
        var form = me.getFormdata().getForm();
        var f = me.getFormdata();
        var sort = me.getFormdata().down("[name=sort]").getValue();
        if(sort == 0 && sort.length == 1){
             Ext.Msg.show({
                            title: 'Failure',
                            msg: 'Error: 0 is not allowed!',
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                        });
             return false;

        }
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
                        msg: 'Error: Sequence Number Already Exist',
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            });
        }
    },

});