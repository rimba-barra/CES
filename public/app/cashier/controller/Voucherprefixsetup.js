Ext.define('Cashier.controller.Voucherprefixsetup', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    requires: [
        'Ext.EventObject',
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptusercombobox',
        'Cashier.library.template.combobox.Projectptallcombobox',
        'Cashier.library.template.combobox.Prefixcombobox',
        'Cashier.library.template.combobox.Coacombobox',
        'Cashier.library.template.combobox.Statuscombobox',
        // 'Cashier.library.template.combobox.Departmentcombobox',
        'Cashier.library.template.combobox.Deptprefixcombobox',
        'Cashier.library.template.checkbox.CheckColumn',
        'Cashier.library.template.combobox.Vendorcombobox',
        'Cashier.library.template.combobox.Groupcombobox',
        'Cashier.library.template.combobox.Cashbonstatuscombobox',
        'Cashier.library.template.combobox.Employeecombobox',
        'Cashier.library.template.combobox.Coadeptcombobox',
        'Cashier.library.template.combobox.Inoutcombobox',
        'Cashier.library.template.combobox.Paymentviacombobox',
        'Cashier.library.template.combobox.Bankcombobox',
        'Cashier.library.template.combobox.Projectptbyvoucherprefixcombobox',
        'Cashier.library.template.combobox.Usermodulecashiercombobox',
        'Cashier.library.template.combobox.Voucherprefixsetupcombobox',
        'Cashier.library.template.combobox.Subglcombobox',
        'Cashier.library.template.combobox.Banktypecombobox',
        'Cashier.library.template.combobox.Accounttypecombobox'
    ],
    alias: 'controller.Voucherprefixsetup',
    views: [
        'voucherprefixsetup.Panel',
        'voucherprefixsetup.Grid',
        'voucherprefixsetup.FormSearch',
        'voucherprefixsetup.FormData',
    ],
    stores: [
        'Voucherprefixsetup',
        'Prefixcombo',
        'Coa',
        'Statuscombo',
        'Voucherprefixsetupcombo',
        'Paymentvia',
        'Projectptall',
        'Bank',
        'Subgl',
        'Masterbanktype',
        'Accounttype'
    ],
    models: [
        'Voucherprefixsetup',
        'Masterbanktype',
        'Accounttype'
    ],
    refs: [
        {ref: 'grid', selector: 'voucherprefixsetupgrid'},
        {ref: 'formsearch', selector: 'voucherprefixsetupformsearch'},
        {ref: 'formdata', selector: 'voucherprefixsetupformdata'},
    ],
    controllerName: 'voucherprefixsetup',
    fieldName: 'coa',
    bindPrefixName: 'Voucherprefixsetup',
    formWidth: 900,
    rowproject: null, rowpt: null, storept: null, state: null,
    urlcommon: 'cashier/common/create',
    urlrequest: 'cashier/voucherprefixsetup/create', senddata: null, info: null,
    arraycoa: null, countercoa: 0, rowcompanyform: null, rowcompanysearch: null,
    project_id: 0, pt_id: 0, fixed_coa: null,
    kelsub_id: 0,
    init: function (application) {
        var me = this;
        this.control({
            'voucherprefixsetuppanel': {
                beforerender: me.mainPanelBeforeRender,
//                afterrender: this.panelAfterRender,
                afterrender: function () {
                    me.getFormsearch().down("[name=projectpt_id]").getStore().load();
                    me.panelAfterRender();
                }
            },
            'voucherprefixsetupgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            // 'voucherprefixsetupgrid toolbar button[action=create]': {
            //     click: function (el) {
            //         me.state = 'create';
            //         this.formDataShow(el, '', 'create');
            //     }
            // },
            // 'voucherprefixsetupgrid toolbar button[action=update]': {
            //     click: function () {
            //         me.state = 'create';
            //         this.formDataShow('update');
            //     }
            // },
            'voucherprefixsetupgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'voucherprefixsetupgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'voucherprefixsetupgrid toolbar button[action=export]': {
                click: this.dataExport
            },
            'voucherprefixsetupgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'voucherprefixsetupformsearch': {
                click: function () {
                    me.formSearchAfterRender();
                },
                afterrender: function () {
                    me.getStore('Projectpt').load({
                        callback: function() {
                            var fs = me.getFormsearch();
                            fs.down("[name=projectpt_id]").setValue(parseInt(apps.projectpt));
                        }
                    });
                    me.getStore('Coa').load();
                    me.getStore('Prefixcombo').load();
                }
            },
            'voucherprefixsetupformsearch button[action=search]': {
                click: this.dataSearchCustome
            },
            'voucherprefixsetupformsearch button[action=reset]': {
                click: this.dataReset
            },
            'voucherprefixsetupformdata': {
                afterrender: this.formDataAfterRender,
                boxready: function () {

                    if (me.getFormdata().up().state == 'update') {
                        this.setupStoreforUpdate();
                    }
                }
            },
            'voucherprefixsetupformsearch [name=projectpt_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata;
                    me = this;
                    me.rowcompanysearch = record[0]['data'];
                    me.clearprefixcoasearch();
                    me.getPrefixsearch();
                    me.getCoasearch();
                },
                change: function(el, newValue, oldValue, eOpts) {
                    var rec = el.valueModels[0].data;
                    me.rowcompanysearch = rec;
                    me.clearprefixcoasearch();
                    me.getPrefixsearch();
                    me.getCoasearch();
                }
            },
            'voucherprefixsetupformsearch [name=prefix_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata;
                    me = this;
                    rowdata = record[0]['data'];
                    me.getFormsearch().down('[name=prefixdesc]').setValue(rowdata.description);
                },
            },
            'voucherprefixsetupformsearch [name=coa_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata;
                    me = this;
                    rowdata = record[0]['data'];
                    me.getFormsearch().down('[name=coaname]').setValue(rowdata.coaname);
                    me.kelsub_id = rowdata.kelsub_id;
                },
            },
            'voucherprefixsetupformdata [name=projectpt_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata;
                    me = this;
                    me.rowcompanyform = record[0]['data'];
                    me.project_id =   me.rowcompanyform.project_id;
                    me.pt_id =   me.rowcompanyform.pt_id;
                    me.clearprefixcoa();
                    me.getPrefix();
                    me.getCoa();
                },
            },
            'voucherprefixsetupformdata [name=prefix_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata;
                    me = this;
                    rowdata = record[0]['data'];
                    me.getFormdata().down('[name=prefixdesc]').setValue(rowdata.description);
                },
            },
            'voucherprefixsetupformdata [name=coa_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata;
                    me = this;
                    rowdata = record[0]['data'];
                    me.getFormdata().down('[name=coaname]').setValue(rowdata.coaname);
                },
            },
            'voucherprefixsetupformdata [name=fixed_coa_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata;
                    me = this;
                    rowdata = record[0]['data'];
                    me.fixed_coa = me.getFormdata().down('[name=fixed_coa_id]').getRawValue();
                    me.getFormdata().down('[name=fixed_account_desc]').setValue(rowdata.coaname);
                },
                'blur': function (g, record, item, index, e, eOpts) {
                    var me, rowdata;
                    me = this;
                    me.fixed_coa = me.getFormdata().down('[name=fixed_coa_id]').getRawValue();

                }
            },
            'voucherprefixsetupformdata [name=is_fixed] ': {
                'change': function (me, newValue, oldValue, eOpts) {
                    var that = this;
                    that.setFixedaccount(newValue);
                },
            },
            'voucherprefixsetupformdata [name=is_limitdate] ': {
                'change': function (me, newValue, oldValue, eOpts) {
                    var that = this;
                    that.setLimitdate(newValue);
                },
            },
            'voucherprefixsetupformdata [name=is_limitamount] ': {
                'change': function (me, newValue, oldValue, eOpts) {
                    var that = this;
                    that.setLimitamount(newValue);
                },
            },
            'voucherprefixsetupformdata button[action=save]': {
                click: function () {
                    var me = this;
                    var form = me.getFormdata().getForm().getValues();
                    var f = me.getFormdata();

                    if(f.down('[name=projectpt_id]').getValue()==null || 
                        f.down('[name=projectpt_id]').getRawValue()=='' || 
                        f.down('[name=coa_id]').getValue()==null || 
                        f.down('[name=coa_id]').getRawValue()=='' || 
                        f.down('[name=prefix_id]').getValue()==null || 
                        (Ext.getCmp("is_liquid1").getValue()==false && Ext.getCmp("is_liquid0").getValue() == false) ||
                        f.down('[name=prefix_id]').getRawValue()==''|| 
                        f.down('[name=in_out]').getValue()==null || 
                        f.down('[name=in_out]').getRawValue()=='' || 
                        f.down('[name=cash_bank]').getValue()==null || 
                         f.down('[name=cash_bank]').getRawValue()=='' || 
                        (f.down('[name=cash_bank]').getValue()=='B' && f.down('[name=bank_id]').getValue()==null) || 
                        (f.down('[name=cash_bank]').getValue()=='B' && f.down('[name=bank_id]').getRawValue()=='') ){
                        Ext.Msg.show({
                        title: 'Failure',
                        msg: 'Error: Form Input Berbintang (*) Wajib diisi',
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                        });
                    }else{

                         me.dataSave();
                        /* Ext.Msg.show({
                        title: 'Failure',
                        msg: 'Error: Form Input Berbintang (*) Wajib diisi',
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                        });*/


                    }

                    /*if(f.down('[name=coa_id]').getValue()==null){
                        alert('Account code harus diisi');
                        return false;
                    }
                    if(f.down('[name=prefix_id]').getValue()==null){
                        alert('Prefix harus diisi');
                         return false;
                    }
                    if(f.down('[name=in_out]').getValue()==null){
                        alert('Dataflow I/O harus diisi');
                         return false;
                    }
                    if(f.down('[name=cash_bank]').getValue()==null){
                        alert('Payment Type harus diisi');
                         return false;
                    }*/
                   // me.dataSave();
                }
            },
             'voucherprefixsetupformdata [name=cash_bank] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, form;
                    me = this;
                    form = me.getFormdata();
                    if(g.value == 'B'){
                        form.down("[name=payment_via_id]").setVisible(true); 
                          form.down("[name=bank_id]").setVisible(true); 
                          form.down("[name=banktype_id]").setVisible(true); 
                          form.down("[name=containerAccounttype]").setVisible(true);

                    }else{
                         form.down("[name=payment_via_id]").setValue(null); 
                         form.down("[name=payment_via_id]").setVisible(false); 
                          form.down("[name=bank_id]").setValue(null); 
                         form.down("[name=bank_id]").setVisible(false); 
                         form.down("[name=banktype_id]").setVisible(false); 
                         form.down("[name=containerAccounttype]").setVisible(false);
                         form.down("[name=account_type_id]").setValue("");
                    }
                  
                },
                  'change': function (me, newValue, oldValue, eOpts) {
                   var me, form;
                    me = this;
                    form = me.getFormdata();
                    if(newValue == 'B'){
                        form.down("[name=payment_via_id]").setVisible(true); 
                         form.down("[name=bank_id]").setVisible(true); 
                         form.down("[name=banktype_id]").setVisible(true); 
                         form.down("[name=containerAccounttype]").setVisible(true);

                    }else{
                         form.down("[name=payment_via_id]").setValue(null); 
                         form.down("[name=payment_via_id]").setVisible(false); 
                           form.down("[name=bank_id]").setValue(null); 
                         form.down("[name=bank_id]").setVisible(false); 
                         form.down("[name=banktype_id]").setVisible(false); 
                         form.down("[name=containerAccounttype]").setVisible(false);
                         form.down("[name=account_type_id]").setValue("");
                    }
                    
                },
            },
            'voucherprefixsetupformdata button[action=cancel]': {
                click: this.formDataClose
            },
        });
    },
    formDataAfterRender: function (el) {
        var me, state;
        me = this;
        me.storeProcess = me.createSpProcessObj(me.storeProcess);
        me.fdar().init();
        me.loadComboBoxStore(el);
        me.state = el.up('window').state; console.log(me.state);
        var f = me.getFormdata();
        var inout = f.down("[name=in_out]").getStore();
        me.setData();

        var formd  = f;
        var form = f;

        store = me.getStore("Subgl");
        storesubgl = me.getStore("Subgl");
        //onrender
        store.proxy.extraParams = {
            "hideparam": 'getsubglbykelsub',
            "project_id": me.project_id,
            "pt_id": me.pt_id,
            "kelsub_id": me.kelsub_id
        }

        //onkeyup
        form.down("[name=subgl_id]").on('keyup' , function(e, t, eOpts){
          store.proxy.extraParams = {
                "hideparam": 'getsubglbykelsub',
                "project_id": me.project_id,
                "pt_id": me.pt_id,
                "kelsub_id": me.kelsub_id
            }
        });

        switch (me.state) {
            case 'create':
                me.fdar().create();

                var fs = me.getFormsearch();
                var fs_projectpt_id = fs.down("[name=projectpt_id]").getValue();
                var fd = me.getFormdata();

                if (fs_projectpt_id == null || fs_projectpt_id == 0) {
                    fs_projectpt_id = parseInt(apps.projectpt);
                }

                fd.down("[name=projectpt_id]").setValue(fs_projectpt_id);

                me.setFixedaccount(false);
                break;
            case 'update':
                 inout.clearFilter();
                 inout.filterBy(function (record){
                    if (record.get('status') == 'I' || record.get('status') == 'O') {
                        return true;
                    }
                    return false;

                });
                me.fdar().update();

                me.project_id = me.getVal(form, 'project_id', 'value');
                me.pt_id = me.getVal(form, 'pt_id', 'value');
                me.kelsub_id = me.getVal(form, 'kelsub_id', 'value');

                storesubgl.load({
                    params: {
                        "hideparam": 'getsubglbykelsub',
                        "project_id": me.project_id,
                        "pt_id": me.pt_id,
                        "kelsub_id": me.kelsub_id,
                        "query": me.getVal(form, 'subgl_code', 'value')
                    },
                    callback: function (records, operation, success) {
                        me.setVal(form, 'subgl_id', records.get('subgl_id'));
                        form.setLoading(false);
                    }
                });

                break;
            case 'read':
                // me.fdar().read();
                break;
        }
    },
    setData: function () {
        var me, form, formvalue, storeprojectpt, storeaccounttype;
        me = this;
        form = me.getFormdata();
        formvalue = form.getForm().getValues();

        storeprojectpt = me.getStore("Projectpt");
        storeprojectpt.load({
            params: {
                "hideparam": 'getprojectptbyuser',
                "start": 0,
                "limit": 100,
            },
            callback: function (records, operation, success) {
            }
        });

        storeaccounttype = me.getStore('Accounttype');
        storeaccounttype.load({
            params: {
                'hideparam': 'getaccounttype',
                'start': 0,
                'limit': 100000
            },
            callback: function (records, operation, success) {}
        });
        
        form.down("[name=containerAccounttype]").setVisible(false);
    },
    setupStoreforUpdate: function () {
        var me, grid, store, record, storeprefix, storecoa, fixed_desc, trim_fixed_desc,
                lower_fixed_desc, row, form, state;
        me = this;
        form = me.getFormdata();
        state = form.up('window').state.toLowerCase();
        if (state == 'update' || state == 'read') {
            grid = me.getGrid();
            store = grid.getStore();
            record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
            row = record['data'];

            storeprefix = me.getStore('Prefixcombo');
            storeprefix.reload({
                params: {
                    "hideparam": 'getprefixbyprojectpt',
                    "project_id": row.project_id,
                    "pt_id": row.pt_id,
                    "start": 0,
                    "limit": 1000,
                },
                callback: function (records, operation, success) {

                }
            });
            storecoa = me.getStore('Coa');
            storecoa.reload({
                params: {
                    "hideparam": 'getcoabyprojectpt',
                    "project_id": row.project_id,
                    "pt_id": row.pt_id,
                    "start": 0,
                    "limit": 1000,
                },
                callback: function (records, operation, success) {

                }
            });

            if (state == 'update') {
                fixed_desc = row.fixed_account_desc;
                trim_fixed_desc = fixed_desc.trim();
                lower_fixed_desc = trim_fixed_desc.toLowerCase();
                if (lower_fixed_desc == 'coa tampungan sementara') {
                    me.fixed_coa = row.fixed_coa;
                    form.down("[name=fixed_coa_id]").setRawValue(me.fixed_coa);
                    form.down("[name=fixed_coa_id]").setValue(me.fixed_coa);
                }
            }

        }
    },
    dataSave: function () {
        var me = this;
        me.getFormdata().down("[name=hideparam]").setValue('default'); // added on april 2016, ahmad riadi     
        var form = me.getFormdata().getForm();

        var addingRecord = false;
        if (!me.finalValidation()) {
            return false;
        }

        var vp = me.validationProcess();
        var vps = false; // validation prosess status
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


        if (vps) {
            resetTimer();
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
                    //console.log(store);
                } else {
                    store = me.storeProcess;
                }
            }

            var msg = function () {
                me.getFormdata().up('window').body.mask('Saving data, please wait ...');
            };
            var state_submit = me.getFormdata().up('window').state.toLowerCase();
            fida['fixed_coa'] = me.fixed_coa;
            var f = me.getFormdata();
            var project = f.down('[name=project_id]').getValue();
            var pt = f.down('[name=pt_id]').getValue();
            if (me.rowcompanyform) {
                fida['project_id'] = me.rowcompanyform.project_id,
                        fida['pt_id'] = me.rowcompanyform.pt_id;
            } else {
                fida['project_id'] = project;
                fida['pt_id'] =pt;
            }


            switch (state_submit) {
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
                success: function (batch, options) {
                    me.getFormdata().up('window').body.unmask();
                    store.un('beforesync', msg);
                    store.reload();
                    if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
                        Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 0}});
                    }
                    Ext.Msg.show({
                        title: 'Success',
                        msg: batch.proxy.getReader().jsonData.msg,
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function () {
                            me.formDataClose();

                        }
                    });

                },
                failure: function (batch, options) {
                    var errMsg = (batch.proxy.getReader().jsonData.msg ? batch.proxy.getReader().jsonData.msg : 'Data Already Exist!');

                    me.getFormdata().up('window').body.unmask();
                    store.un('beforesync', msg);
                    if (store.getCount() > 0 && addingRecord) {
                        store.removeAt(store.getCount() - 1);
                    }
                    store.reload();
                    Ext.Msg.show({
                        title: 'Failure',
                        msg: 'Error: ' + errMsg,
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });


                }
            });


        }

    },
    setFixedaccount: function (value) {
        var me, form;
        me = this;
        form = me.getFormdata();
        if (value == false) {
            form.down("[name=fixed_coa_id]").setReadOnly(true);
            form.down("[name=fixed_coa_id]").allowBlank = true;
            form.down("[name=fixed_coa_id]").setValue('');
            form.down("[name=fixed_coa_id]").setRawValue('');
            form.down("[name=fixed_account_desc]").setReadOnly(true);
            form.down("[name=fixed_coa_id]").allowBlank = true;
            form.down("[name=fixed_account_desc]").setValue('');
            form.down("[name=fixed_account_desc]").allowBlank = true;
            me.fixed_coa = '';
        } else {
            form.down("[name=fixed_coa_id]").setReadOnly(false);
            form.down("[name=fixed_coa_id]").allowBlank = false;
            form.down("[name=fixed_account_desc]").setReadOnly(false);
            form.down("[name=fixed_account_desc]").allowBlank = true;
        }
    },
    setLimitdate: function (value) {
        var me, form;
        me = this;
        form = me.getFormdata();
        if (value == false) {
            form.down("[name=limitdate]").setReadOnly(true);
            form.down("[name=limitdate]").allowBlank = true;
            form.down("[name=limitdate]").setValue('');
        } else {
            form.down("[name=limitdate]").setReadOnly(false);
            form.down("[name=limitdate]").allowBlank = false;
        }
    },
    setLimitamount: function (value) {
        var me, form;
        me = this;
        form = me.getFormdata();
        if (value == false) {
            form.down("[name=limit_min]").setReadOnly(true);
            form.down("[name=limit_min]").allowBlank = true;
            form.down("[name=limit_min]").setValue('');
            form.down("[name=limit_max]").setReadOnly(true);
            form.down("[name=limit_max]").allowBlank = true;
            form.down("[name=limit_max]").setValue('');
        } else {
            form.down("[name=limit_min]").setReadOnly(false);
            form.down("[name=limit_min]").allowBlank = false;
            form.down("[name=limit_max]").setReadOnly(false);
            form.down("[name=limit_max]").allowBlank = false;
        }
    },
    clearprefixcoa: function () {
        var me, formvalue;
        me = this;
        me.getFormdata().down("[name=prefix_id]").setValue('');
        me.getFormdata().down("[name=prefix_id]").setRawValue('');
        me.getFormdata().down("[name=coa_id]").setValue('');
        me.getFormdata().down("[name=coa_id]").setRawValue('');
        me.getFormdata().down("[name=prefixdesc]").setValue('');
        me.getFormdata().down("[name=coaname]").setValue('');
        me.getFormdata().down("[name=fixed_coa_id]").setRawValue('');
        me.getFormdata().down("[name=fixed_account_desc]").setValue('');
    },
    dataSearchCustome: function () {
        resetTimer();
        var me = this;
        var form = me.getFormsearch().getForm();
        var store = me.getGrid().getStore();

        me.getFormsearch().down("[name=hideparam]").setValue('search');
        var fields = me.getFormsearch().getValues();
        for (var x in fields)
        {
            store.getProxy().setExtraParam(x, fields[x]);
        }
        me.loadPage(store);
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
    getCoa: function () {
        var me, store, form, state;
        me = this;
        store = me.getStore('Coa');
        form = me.getFormdata();

        store.reload({
            params: {
                "hideparam": 'getcoabyprojectptvoucher',
                //"hideparam": 'getcoabyprojectpt',
                "project_id": me.rowcompanyform.project_id,
                "pt_id": me.rowcompanyform.pt_id,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                console.log(store);
            }
        });

    },
    clearprefixcoasearch: function () {
        var me, form;
        me = this;
        form = me.getFormsearch();
        form.down("[name=prefix_id]").setValue('');
        form.down("[name=prefix_id]").setRawValue('');
        form.down("[name=coa_id]").setValue('');
        form.down("[name=coa_id]").setRawValue('');
        form.down("[name=prefixdesc]").setValue('');
        form.down("[name=coaname]").setValue('');
    },
    getPrefixsearch: function () {
        var me, store, form;
        me = this;
        store = me.getStore('Prefixcombo');
        form = me.getFormsearch();

        store.getProxy().setExtraParam('hideparam', 'getprefixbyprojectpt');
        store.getProxy().setExtraParam('project_id', me.rowcompanysearch.project_id);
        store.getProxy().setExtraParam('pt_id', me.rowcompanysearch.pt_id);
        store.getProxy().setExtraParam('start', 0);
        store.getProxy().setExtraParam('limit', 1000);
        store.load();
    },
    getCoasearch: function () {
        var me, store, form;
        me = this;
        store = me.getStore('Coa');
        form = me.getFormsearch();
        store.getProxy().setExtraParam('hideparam', 'getcoabyprojectpt');
        store.getProxy().setExtraParam('project_id', me.rowcompanysearch.project_id);
        store.getProxy().setExtraParam('pt_id', me.rowcompanysearch.pt_id);
        store.getProxy().setExtraParam('start', 0);
        store.getProxy().setExtraParam('limit', 1000);
        store.load();

    },
    AjaxRequest: function () {
        var me;
        me = this;
        Ext.Ajax.request({
            url: me.urlrequest,
            timeout: 45000000,
            method: 'POST',
            params: {
                data: Ext.encode(me.senddata)
            },
            success: function (response) {
                me.info = Ext.JSON.decode(response.responseText);
                me.setSuccessEvent();
            },
            failure: function (response) {
                me.getFormdata().up('window').close();
            }
        });
    },
    setSuccessEvent: function () {
        var me = this;
        var data = me.info.data;
        switch (me.info.parameter) {
            case 'default':
                break;
            case 'importdata':
                me.getFormdata().up('window').close();
                break;
        }
    },
    dataExport: function() {
        var me = this;
        var fs = me.getFormsearch();
        var grid = me.getGrid();

        var project_id = fs.down("[name=project_id]").getValue();
        var pt_id = fs.down("[name=pt_id]").getValue();

        if (project_id == null || project_id == 0) {
            project_id = parseInt(apps.project);
        }

        if (pt_id == null || pt_id == 0) {
            pt_id = parseInt(apps.pt);
        }

        grid.setLoading("Exporting data...");
        Ext.Ajax.request({
            url: 'cashier/voucherprefixsetup/create',
            params: {
                data: Ext.encode({
                    project_id: project_id,
                    pt_id: pt_id,
                    hideparam: 'exportdata',
                    userprint: apps.username
                })
            },
            success: function(response) {
                grid.setLoading(false);
                var res = Ext.JSON.decode(response.responseText);
                var file_path = res['data']['url']; 
                var a = document.createElement('A');
                a.href = file_path;
                a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        })
    }
});