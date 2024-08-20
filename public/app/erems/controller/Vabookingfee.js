Ext.define('Erems.controller.Vabookingfee', {
    extend: 'Erems.library.template.controller.Controlleralt',
    alias: 'controller.Vabookingfee',
    views: ['vabookingfee.Panel', 'vabookingfee.Grid', 'vabookingfee.FormSearch', 'vabookingfee.FormData'],
    requires: [
        'Erems.library.template.component.Bookingfeecombobox',
        'Erems.library.template.component.Paymentmethodcombobox'
    ],
    stores: ['Vabookingfee','Bookingfeeamount','Paymentmethod'],
    models: ['Vabookingfee','Bookingfeeamount','Paymentmethod'],
    refs: [
        {
            ref: 'grid',
            selector: 'vabookingfeegrid'
        },
        {
            ref: 'formsearch',
            selector: 'vabookingfeeformsearch'
        },
        {
            ref: 'formdata',
            selector: 'vabookingfeeformdata'
        },
    ],
    controllerName: 'vabookingfee',
    fieldName: 'bookingfee_id',
    bindPrefixName: 'Vabookingfee',

    formWidth: 500,
    countLoadProcess: 0,
    //added by anas 20052021
    myConfig: null,
    REPORT_FILE: null,
    constructor: function (configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Erems.library.box.Config({
            _controllerName: me.controllerName
        });
    },
    //end added by anas

    init: function (application) {
        var me = this;

        //added by anas 20052021
        me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
        //end added by anas

        this.control({
            test: me.eventMonthField,
            'vabookingfeepanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'vabookingfeegrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'vabookingfeegrid toolbar button[action=create]': {
                click: function () {
                    this.formDataShow('create');
                }
            },
            'vabookingfeegrid toolbar button[action=update]': {
                click: function () {
                    this.formDataShow('update');
                }
            },
            'vabookingfeegrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'vabookingfeegrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'vabookingfeeformsearch': {
                afterrender: this.formSearchAfterRender
            },
            'vabookingfeeformsearch button[action=search]': {
                click: this.dataSearch
            },
            'vabookingfeeformsearch button[action=reset]': {
                click: this.dataReset
            },
            'vabookingfeeformdata': {
                afterrender: this.formDataAfterRender
            },
            'vabookingfeeformdata button[action=save]': {
                click: this.dataSave
            },
            'vabookingfeeformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'vabookingfeeformdata [name=paymentmethod]': {
                select: function () {
                    me.paymentmethodOnChange();
                }
            }
        });
    },
    paymentmethodOnChange: function () {

        var me = this;
        var f = me.getFormdata();
        var selected = f.down("[name=paymentmethod]").getValue();
        // var pDate = f.down("[name=payment_date]").getValue();
        // var ad = null;
        // var bd = null;
        /*if (selected === me.myParams.cash) {
         ad = new Date();
         bd = new Date();
         } else {
         ad = '';
         bd = '';
         }
         */
        
        if (selected != 7 && selected != 12 && selected && 21) {
            me.tools.alert.warning("Not allowed to choose `Payment Method`. ");
            f.down("[name=paymentmethod]").setValue('');
        }

        // ad = pDate;
        // bd = pDate;

        // f.down("[name=cair_date]").setValue(ad);
        // f.down("[name=duedate]").setValue(bd);

    },

    gridSelectionChange: function () {
        var me = this;
        var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
        if(row[0]){
            var status = row[0].data.status;

            if(status && row.length == 1){
                grid.down('#btnNew').setDisabled(true);
            }else{
                grid.down('#btnNew').setDisabled(false);
            }
        }
        grid.down('#btnEdit').setDisabled(row.length != 1);
        // grid.down('#btnDelete').setDisabled(row.length < 1);
    },
    fdar: function () {
        var me = this;
        var x = {
            init: function() {
                /// init here
            },
            create: function() {
                /// create here  

                var grid = me.getGrid();
                var store = grid.getStore();

                var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                me.getFormdata().loadRecord(record);
                me.getFormdata().down('[name=paymentmethod]').setVisible(true);
                me.getFormdata().down('[name=payment_date]').setReadOnly(false);
            },
            update: function() {
                var grid = me.getGrid();
                var store = grid.getStore();

                var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                me.getFormdata().loadRecord(record);
                me.getFormdata().down('[name=paymentmethod]').setVisible(false);
                me.getFormdata().down('[name=payment_date]').setReadOnly(true);
                /// update here
            }
        };
        return x;
    },
    dataSave: function() {
        var me = this;
        var form = me.getFormdata().getForm();
        var grid = me.getGrid();
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
                store = _myAppGlobal.getController(me.callerId).getInstanCreateStorex(me.controllerName);
            } else {
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
                    // store.add(fida);
                    // addingRecord = true;

                    var idProperty = store.getProxy().getReader().getIdProperty();
                    var rec = store.getById(parseInt(form.findField(idProperty).getValue(), 10));
                    rec.beginEdit();
                    rec.set(fida);
                    rec.endEdit();

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
                        msg: 'Error: Unable to save data.',
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            });
        }
    },
});