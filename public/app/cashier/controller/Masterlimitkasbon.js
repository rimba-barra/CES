Ext.define('Cashier.controller.Masterlimitkasbon', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Masterlimitkasbon',
    views: ['masterlimitkasbon.Panel', 'masterlimitkasbon.Grid', 'masterlimitkasbon.FormSearch', 'masterlimitkasbon.FormData'],
    stores: ['Masterlimitkasbon','Ptbyusermulti','User','Cashbontype'],
    models: ['Masterlimitkasbon','Projectpt','User','Cashbontype'],
    refs: [
        {
            ref: 'panel',
            selector: 'masterlimitkasbonpanel'
        },
        {
            ref: 'grid',
            selector: 'masterlimitkasbongrid'
        },
        {
            ref: 'formdata',
            selector: 'masterlimitkasbonformdata'
        },
        {
            ref: 'formsearch',
            selector: 'masterlimitkasbonformsearch'
        },
    ],
    controllerName: 'masterlimitkasbon',
    fieldName: 'id_limitkasbon',
    bindPrefixName: 'Masterlimitkasbon',
    rowproject: null, storept: null, state: null,
    init: function(application) {
        var me = this;
        this.control({
            'masterlimitkasbonpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'masterlimitkasbongrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'masterlimitkasbongrid toolbar button[action=create]': {
                click: function() {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'masterlimitkasbongrid toolbar button[action=update]': {
                click: function() {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'masterlimitkasbongrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'masterlimitkasbongrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'masterlimitkasbonformsearch': {
                    afterrender: this.formSearchAfterRender
            },
            'masterlimitkasbonformsearch button[action=search]': {
                click: this.dataSearch
            },
            'masterlimitkasbonformsearch button[action=reset]': {
                click: this.dataReset
            },
            'masterlimitkasbonformdata': {
                afterrender: this.formDataAfterRender
            },
            'masterlimitkasbonformdata button[action=save]': {
                click: this.dataSave
            },
            'masterlimitkasbonformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'masterlimitkasbonformdata [name=limit_cashbon]': {
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
             'masterlimitkasbonformdata [name=limit_aging]': {
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
             'masterlimitkasbonformdata [name=projectpt_id]': {
               'change': function (that, newValue, oldValue, eOpts) {
              
                    var me, form, rowdata, project_id, pt_id;
                    me = this;
                    form = me.getFormdata();
                    rowdata = that.valueModels[0];
                    project_id = rowdata.data.project_id;
                    pt_id = rowdata.data.pt_id;

                    me.getCashbontype(project_id,pt_id);
                 
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
                if (projectpt_id == apps.projectpt){
                    f.down("[name=projectpt_id]").setValue(parseInt(projectpt_id));
                }
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
            var user =  me.getFormdata().down("[name=user_id]").getStore();
            user.clearFilter();
            me.fdar().create();
        } else if (state == 'update') {
            me.getFormdata().down("[name=projectpt_id]").setReadOnly(true);
            var grid = me.getGrid();
            var store = grid.getStore();
            var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
            var project_id = record.get('project_id');
            var pt_id = record.get('pt_id');
            me.fdar().update();
        } else if (state == 'read') { //========= added on march 15th 2016 by Tirtha
            me.fdar().read();
        }
    },
    dataSave: function() {
        var me = this;
        var form = me.getFormdata().getForm();
        var f = me.getFormdata();
        var sort = me.getFormdata().down("[name=limit_cashbon]").getValue();
         var aging = me.getFormdata().down("[name=limit_aging]").getValue();
        if(sort == 0 && sort.length == 1){
             Ext.Msg.show({
                            title: 'Failure',
                            msg: 'Error: 0 is not allowed!',
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                        });
             return false;

        }else if(aging == 0 && aging.length == 1){
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
                        msg: 'Error: User Already Exist !',
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            });
        }
    },
    dataDestroy: function () {
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
                confirmmsg = 'Delete this Record ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }
            Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
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
                            var successmsg = (rows.length == 1 ? 'Record' : (successcount != rows.length ? successcount + ' of ' : '') + recordcounttext) + ' deleted successfully.';
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
                        failure: function (batch, options) {
                            // added on april 2016, ahmad riadi
                            var parameter = (batch.proxy.getReader().jsonData.param ? batch.proxy.getReader().jsonData.param : 'no');
                            var pesan = (batch.proxy.getReader().jsonData.msg ? batch.proxy.getReader().jsonData.msg : 'Unable to save data.');
                            if (parameter == 'used') {
                                failmsg = pesan;
                            } else {
                                failmsg = failmsg + ' The data may have been used.';
                            }

                            me.getGrid().up('window').unmask();
                            store.un('beforesync', msg);
                            store.reload();
                            Ext.Msg.show({
                                title: 'Failure',
                                msg: failmsg,
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    });
                }
            });
        }
    },
    getCashbontype: function (project_id, pt_id) {
        var me, store, form;
        me = this;
        store = me.getStore("Cashbontype");
        store.load({
            params: {
                "hideparam": 'getcashbontype',
                "project_id": project_id,
                "pt_id": pt_id
            },
            callback: function (records, operation, success) {
               
            }
        });
    },

});