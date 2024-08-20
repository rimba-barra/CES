/* 
 * Controllerpayment
 * Controller that used for non link payment and other payment modules.. ya that is
 * 
 */
Ext.define('Erems.library.template.controller.Controllerpayment', {
    extend: 'Erems.library.template.controller.Controller',
    formWidth: 800,
    unitFormula: null,
    addRefs: [{
                ref: 'grid',
                selector: 'grid'
            },
            {
                ref: 'formsearch',
                selector: 'formsearch'
            },
            {
                ref: 'formdata',
                selector: 'formdata'
            },
            {
                ref: 'formdatadetail',
                selector: 'formdatadetail'
            },
            {
                ref: 'griddetail',
                selector: 'paymentdetailgrid'
            },
            {
                ref: 'storedetail',
                selector: 'detailstore'
            }],
    refsFlag:{
      changed:false,
      temp:[]
    },
    refs: [
            
        ],
    constructor:function(configs){
      
        var me = this;
        /// fix refs based controllerName
    
        me.refs = [];
       
        for(var x in me.addRefs){
            me.refs.push({
                ref: me.addRefs[x]['ref'],
                selector: me.controllerName+''+me.addRefs[x]['selector']
            });
        }
          this.callParent(arguments);
    },
    init: function() {
        var me = this;
        /// fix refs based controllerName
       
        
        
        
        /// jangan lupa dibalikin lagi barang yang dipinjam


        // check storeProcess
        if (me.storeProcess.length > 0) {
            var sp = 'me.get' + me.storeProcess + 'Store()';
    
            me.storeProcess = eval(sp);
        }

        var listControl = {};
        listControl[me.controllerName + 'panel'] = {
            beforerender: me.mainPanelBeforeRender,
            afterrender: this.panelAfterRender
        };
        listControl[me.controllerName + 'grid'] = {
            afterrender: this.gridAfterRender,
            itemdblclick: this.gridItemDblClick,
            itemcontextmenu: this.gridItemContextMenu,
            selectionchange: this.gridSelectionChange
        };
        listControl[me.controllerName + 'grid toolbar button[action=create]'] = {
            click: function() {
                this.formDataShow('create');
            }
        };

        listControl[me.controllerName + 'grid toolbar button[action=update]'] = {
            click: function() {
                this.formDataShow('update');
            }
        };
        listControl[me.controllerName + 'grid toolbar button[action=destroy]'] = {
            click: this.dataDestroy
        };
        listControl[me.controllerName + 'grid toolbar button[action=print]'] = {
            click: this.dataPrint
        };
        listControl[me.controllerName + 'grid actioncolumn'] = {
            afterrender: this.gridActionColumnAfterRender,
            click: this.gridActionColumnClick
        };

        listControl[me.controllerName + 'formsearch button[action=search]'] = {
            click: this.dataSearch
        };
        listControl[me.controllerName + 'formsearch button[action=reset]'] = {
            click: this.dataReset
        };
        listControl[me.controllerName + 'formdata'] = {
            afterrender: this.formDataAfterRender
        };
        listControl[me.controllerName + 'formdata button[action=save]'] = {
            click: this.dataSave
        }
        listControl[me.controllerName + 'formdata button[action=cancel]'] = {
            click: this.formDataClose
        };
        //// specific function
        listControl[me.controllerName + 'formdata button[action=addNewDetail]'] = {
            click: function() {
                me.showDetailFormData('create');
            }

        };
        listControl[me.controllerName + 'formdata [name=adm_fee]'] = {
            keyup: me.hitungTotalPayment

        };
        listControl[me.controllerName + 'formdata [name=paymentmethod_id]'] = {
            change: me.paymentMethodOnChange

        };
        listControl[me.controllerName + 'formdata [name=is_reference_rejected]'] = {
            change: me.isReferenceRejectedOnChange

        };
        listControl[me.controllerName + 'formdatadetail'] = {
            afterrender: me.detailForm.afterRender
        };
        listControl[me.controllerName + 'formdatadetail button[action=save]'] = {
            click: me.detailForm.save
        };
        listControl[me.controllerName + 'paymentdetailgrid actioncolumn'] = {
            click: me.detailGrid.actionColumnClick
        };

        me.control(listControl);



    },
    showDetailFormData: function(state) {
        var st = state;
        var me = this;
        me.instantWindow('FormDataDetail', 400, 'Add New Detail', st, 'PaymentDetailForm');
    },
    hitungTotalPayment: function() {
        var me = this;
        var t = toFloat(me.getv('payment')) + toFloat(me.getv('adm_fee'));
        me.setv('total_payment', me.unitFormula.fmb(t));
    },
    paymentMethodOnChange: function() {

        var me = this;
        var pmId = parseInt(me.getFormdata().down('[name=paymentmethod_id]').getValue());
        // paymentmethod_id CASH = 4
        var val = 0;
        val = pmId == 4 ? 1 : 0;
        me.getFormdata().down('[name=is_reference_rejected]').setValue(val);

    },
    isReferenceRejectedOnChange: function() {
        var me = this;
        var pmId = me.getv('is_reference_rejected');

        var val = true;
        val = pmId == 1 ? true : false;

        me.getFormdata().down('[name=reference]').setReadOnly(val);
        me.setReadOnlyColor('reference', val);
    },
    detailForm: {
        that: this,
        editingIndexRow: 0,
        save: function() {
            var me = this;
            var formVal = me.getFormdatadetail().getForm().getValues();
            var payTyEl = me.getFormdatadetail().down('#paymenttype_cb');
            var payTyVal = payTyEl.getValue();

            var msg = '';
            var erR = 0;

            if (parseInt(payTyVal) <= 0 || payTyVal == null) {
                msg = 'No payment type selected';
                erR++;
            } else if (toFloat(formVal.amount) <= 0) {
                msg = 'Zero Amount';
                erR++;
            }
            if (erR++) {
                Ext.Msg.show({
                    title: 'Alert',
                    msg: msg,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK,
                    fn: function() {

                    }
                });
            } else {
                var dStore = null;
                var win = me.getFormdatadetail().up('window');
              
                dStore = me.getGriddetail().getStore();
               
                var val = {paymenttype_id: payTyVal, paymenttype: payTyEl.getSelectedVal('paymenttype', payTyVal), amount: toFloat(formVal.amount), description: formVal.description};
                if (win.state == 'create') {
                    dStore.add(val);
                } else {
                    var rec = dStore.getAt(me.detailForm.editingIndexRow);
                    rec.beginEdit();
                    rec.set(val);
                    rec.endEdit();
                }

                win.close();

                me.detailGrid.hitungPayment(me);
            }


        },
        afterRender: function() {
            var me = this;
            var ptcb = me.getFormdatadetail().down('#paymenttype_cb');
            var store = ptcb.getStore();
            store.load();
        }
    },
    detailGrid: {
        that: this,
        actionColumnClick: function(view, cell, row, col, e) {
            var me = this;
            var gr = me.getGriddetail();
            var record = gr.getStore().getAt(row);
            var m = e.getTarget().className.match(/\bact-(\w+)\b/);
            gr.getSelectionModel().select(row);
            if (m) {
                switch (m[1]) {
                    case 'update':
                        me.showDetailFormData('update');
                        me.detailForm.editingIndexRow = row;
                        me.getFormdatadetail().getForm().setValues({
                            paymenttype_id: record.get('paymenttype_id'),
                            amount: record.get('amount'),
                            description: record.get('description')
                        });
                        break;
                    case 'destroy':
                        gr.getStore().removeAt(row);
                        me.detailGrid.hitungPayment(me);
                        break;
                }
            }
        },
        hitungPayment: function(ctrl) {
            var me = ctrl;
            var dStore = me.getGriddetail().getStore();
            var total = 0;
            dStore.each(function(rec) {
                if (rec != null) {
                    total += toFloat(rec.get('amount'));
                }
            });
            me.setv('payment', me.unitFormula.fmb(total));
            me.hitungTotalPayment();

        },
		
        getDelimiterFase: function(me) {
            var detailParams = {paymentdetail_id: '', paymenttype_id: '', paymenttype: '', amount: '', description: '', detail_id: '', remaining_balance: '', payment: ''};
            var delimeter = '';

            // commented 9 Okt 5.20 pm

            var schStore = me.getGriddetail().getStore();

            var countRow = 0;
            schStore.each(function(rec) {
                countRow++;
                delimeter = countRow === schStore.data.items.length ? '' : '~';
                detailParams['paymenttype_id'] += rec.get('paymenttype_id') + '' + delimeter;
                detailParams['amount'] += rec.get('amount') + '' + delimeter;
                detailParams['description'] += rec.get('description') + '' + delimeter;
                detailParams['detail_id'] += '0' + delimeter;
                detailParams['remaining_balance'] += '0.0' + delimeter;
                detailParams['payment'] += rec.get('amount') + '' + delimeter;
            });
           
            return detailParams;

        }
    },
    formDataAfterRender: function(el) {

        var me = this;

        me.unitFormula = new Erems.library.Unitformula();
        me.getGriddetail().getStore().loadData([], false);
        me.fdar().init();
        /////// init function

        // me.fillForm = new Erems.library.Fillform();
        // me.unitFormula = new Erems.library.Unitformula();
        //me.getOtherspaymentdetailStore().loadData([], false);
        //me.getSchStore().loadData([], false);
        //me.storeProcess = me.getOtherspaymentdatadetailStore();
        // me.getGriddetail().getStore().loadData([], false);

        ////// end function 


        me.loadComboBoxStore(el);
        var state = el.up('window').state;

        if (state == 'create') {
            me.fdar().create();
        } else if (state == 'update') {
            
            me.getFormdata().up('window').body.mask('Loading data...');
            var grid = me.getGrid();
            var store = grid.getStore();

            var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));

            var rec = null;
            var detailStore = me.getInstallmentpaymentdetailStore();
            var detailModel = me.getInstallmentpaymentdetailModel();
            detailStore.model.setFields(detailModel.prototype.fields.getRange());
            detailStore.load({params: {mode_read: 'detail', payment_id: record.get('payment_id')},
                callback: function(record) {
                    rec = detailStore.getAt(0);
                    
                    me.loadPaymentDetail(rec.get('payment_id'));
                    me.fillOtherData(rec);
                    me.fdar().update(rec);
                    me.disableComponents();
                    me.getFormdata().up('window').body.unmask();
                }});
            
        }
    },
    fdar: function() {
        var me = this;
        var x = {
            init: function() {
                /// init here
            },
            create: function() {
                /// create here  

            },
            update: function(rec) {
                /// update here
            }
        };
        return x;
    },
    loadPaymentDetail: function(paymentId) {
        var me = this;
        me.getFormdata().down('#inpaGridfdHolder').removeAll();
        me.getFormdata().down('#inpaGridfdHolder').add({
            xtype: me.refs[4].selector, ///'otherspaymentpaymentdetailgrid',
            width: '100%',
            itemId: 'MyDetailGrid'

        });
        var detailStore = me.getFormdata().down('#MyDetailGrid').getStore();
        detailStore.load({params: {mode_read: 'paymentdetail', payment_id: paymentId},
            callback: function(record) {
                console.log(record);
            }});

    },
    disableComponents: function() {
        var me = this;
        var roC = ['paymentmethod_id', 'payment_date', 'cair_date', 'due_date', 'adm_fee', 'is_reference_rejected', 'reference', 'note']; /// component to readonly

        me.getFormdata().down('#btnSave').setDisabled(true);
        me.getFormdata().down('#btnAddNew').setDisabled(true);

        // me.getFormdata().down('#crebiNote').setDisabled(true);
        for (var i = 0; i < roC.length; i++) {
            me.getFormdata().down('[name=' + roC[i] + ']').setReadOnly(true);
            me.setReadOnlyColor(roC[i], true);
        }
        me.getGriddetail().setDisabled(true);

    },
    
    fillOtherData: function(rec) {
        var me = this;
       
        me.setv('payment_no', rec.get('payment_no'));
        me.setv('payment_date', rec.get('payment_date'));
        me.setv('cair_date', rec.get('cair_date'));
        me.setv('due_date', rec.get('due_date'));
        me.setv('paymentmethod_id', rec.get('paymentmethod_id'));
        me.setv('is_reference_rejected', rec.get('is_referencerejected'));
        me.setv('reference', rec.get('reference_no'));
        me.setv('note', rec.get('note'));

        me.setv('payment', me.unitFormula.fmb(rec.get('payment')));
        me.setv('adm_fee', me.unitFormula.fmb(rec.get('admin_fee')));
        me.setv('total_payment', me.unitFormula.fmb(rec.get('total_payment')));
    }



});