Ext.define('Cashier.view.nonlinkpayment.FormData', {
    alias: 'widget.nonlinkpaymentformdata',
    extend: 'Cashier.library.template.view.FormData',
    requires: [
        'Cashier.library.template.view.FdNonLinkCustomerInformation',
        'Cashier.library.template.component.Pricetypecombobox',
        'Cashier.library.template.component.Kprstatuscombobox',
        'Cashier.library.template.view.combobox.Paymentmethod',
        'Cashier.library.template.view.combobox.City',
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.view.MoneyField',
        'Cashier.view.nonlinkpayment.Gridcoadetail'
                // 'Cashier.view.installmentpayment.PaymentDetailGrid'
    ],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 600,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'padding:5px 5px 0',
        editedRow: -1,
        editedCoa: -1,
    deletedRows: [],
    deletedCoa: [],
    defaults: {
        border: false,
        xtype: 'panel',
        flex: 1,
        layout: ''

    },
    initComponent: function() {
        var me = this;
        
        var cbf = new Cashier.template.ComboBoxFields();

        Ext.applyIf(me, {
            items: [{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_id',
                    name: 'side_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'purchaseletter_id'
                },{
                    xtype: 'hiddenfield',
                    name: 'payment_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'cd_amount'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'cdn_val'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'pt_pt_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'paymentcashier_thcoa_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'paymentcashier_voucherprefix_id'
                    
                },
                {
                    xtype: 'hiddenfield',
                    name: 'paymentcashier_th_kasbank_id'
                    
                },
                {
                    xtype: 'hiddenfield',
                    name: 'is_out'
                    
                },
                /* CUSTOMER INFORMATION */
                {xtype: 'panel',bodyPadding: 10, width: '100%', title: 'CUSTOMER INFORMATION', collapsible: true, items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: '100%',
                                    flex: 3,
                                    bodyStyle: 'border:0px',
                                    items: [
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Customer Name',
                                                    anchor: '-5',
                                                    name: 'customer_name',
                                                    flex: 1
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textareafield',
                                                    fieldLabel: 'Address',
                                                    anchor: '-5',
                                                    name: 'customer_address',
                                                    flex: 1
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'combobox',
                                                    fieldLabel: 'City',
                                                    anchor: '-5',
                                                    displayField: cbf.city.d,
                                                    valueField: cbf.city.v,
                                                    name:'customer_city_city_id',
                                                    flex: 1
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Office phone',
                                                    anchor: '-5',
                                                    name: 'customer_office_phone',
                                                    flex: 1
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Home phone',
                                                    anchor: '-5',
                                                    name: 'customer_home_phone',
                                                    flex: 1
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Mobile phone',
                                                    anchor: '-5',
                                                    name: 'customer_mobile_phone',
                                                    flex: 1

                                                }]
                                        }





                                    ]
                                }
                            ]
                        }
                    ]
                },
                {xtype: 'panel', bodyPadding: 10, title: 'PAYMENT INFORMATION', collapsible: true,
                    width: '100%',
                    items: [
                        {
                            layout: 'hbox', bodyStyle: 'border:0px',
                            items: [
                                {xtype: 'panel', flex: 2, layout: 'vbox', bodyStyle: 'border:0px',
                                    items: [
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Payment No',
                                                    name: 'payment_no',
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
                                                    flex: 1,
                                                }]
                                        },
                                   
                                       
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'combobox',
                                                    fieldLabel: 'Payment Method',
                                                    name: 'paymentmethod_paymentmethod_id',
                                                    displayField: cbf.paymentmethod.d,
                                                    valueField: cbf.paymentmethod.v,
                                                    flex: 2
                                                }, {
                                                    xtype: 'splitter', width: 30
                                                }, {
                                                    xtype: 'checkboxfield',
                                                    fieldLabel: 'Reference Rejected',
                                                    name: 'is_reference_rejected',
                                                    flex: 1,
                                                    hideLabel: true,
                                                    boxLabel: 'Reference Rejected'

                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    enableKeyEvents:true,
                                                    fieldLabel: 'Reference No',
                                                    name: 'reference_no',
                                                    flex: 1,
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    enableKeyEvents: true,
                                                    fieldLabel: 'Receipt No',
                                                    name: 'receipt_no',
                                                    flex: 1,
                                                }]
                                        },

                                    ]
                                }, {xtype: 'splitter', width: 20},
                                {xtype: 'panel', flex: 1, layout: 'vbox', bodyStyle: 'border:0px',
                                    items: [
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Payment Date',
                                                    name: 'payment_date',
                                                    value: new Date(),
                                                    format: 'd-m-Y',
                                                    submitFormat: 'Y-m-d H:i:s.u',
                                                    flex: 1,
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Tanggal Cair',
                                                    name: 'cair_date',
                                                    format: 'd-m-Y',
                                                    submitFormat: 'Y-m-d H:i:s.u',
                                                    flex: 1,
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Due date',
                                                    name: 'duedate',
                                                    format: 'd-m-Y',
                                                    submitFormat: 'Y-m-d H:i:s.u',
                                                    flex: 1,
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'No. Voucher Finance',
                                                    name: 'voucher_no',
                                                    keepRO:true,
                                                    readOnly:true,
                                                    itemId:'voucher_erems',
                                                    flex: 1,
                                                }]
                                        },
                                    ]
                                }

                            ]
                        },
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            itemId: 'inpaGridfdHolder',
                            width: '100%',
                            items: [{
                                    xtype: 'nonlinkpaymentdetailgrid',
                                    width: '100%',
                                    itemId: 'MyDetailGrid',
                                    plugins: null

                                }]
                        },
                        {
                            layout: 'hbox', bodyStyle: 'border:0px',
                            items: [
                                {xtype: 'panel', flex: 1, layout: 'vbox', bodyStyle: 'border:0px',
                                    items: [
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'textareafield',
                                                    fieldLabel: 'Notes',
                                                    name: 'note',
                                                    height: 120,
                                                    labelWidth: 50,
                                                    flex: 1
                                                }]
                                        }

                                    ]
                                }, {xtype: 'splitter', width: 20},
                                {xtype: 'panel', flex: 1, layout: 'vbox', bodyStyle: 'border:0px',
                                    items: [
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'xmoneyfield',
                                                    fieldLabel: 'PAYMENT',
                                                    name: 'payment',
                                                    maskRe: /[0-9\.]/,
                                                    currencyFormat: true,
                                                    fieldStyle: 'text-align:right',
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;text-align:right',
                                                            value: 0.00,
                                                    flex: 1,
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'xmoneyfield',
                                                    fieldLabel: 'ADM FEE',
                                                    name: 'admin_fee',
                                                    enableKeyEvents: true,
                                                    maskRe: /[0-9\.]/,
                                            
                                                    fieldStyle: 'text-align:right',
                                                    value: 0.00,
                                                    flex: 1,
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'xmoneyfield',
                                                    fieldLabel: 'TOTAL PAYMENT',
                                                    name: 'total_payment',
                                                    maskRe: /[0-9\.]/,
                                                    currencyFormat: true,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;text-align:right',
                                                    value: 0.00,
                                                    flex: 1,
                                                }]
                                        }
                                    ]
                                }

                            ]
                        }
                    ]
                },
                
                {xtype: 'panel', bodyPadding: 10, title: 'CASH/BANK INFORMATION', collapsible: true,
                    width: '100%',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    xtype: 'panel',
                                    flex: 2,
                                    width: '100%',
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            flex: 3,
                                            layout: 'vbox',
                                            bodyStyle: 'border:0px',
                                            items: [
                                                {
                                                    //  bodyPadding: 10,
                                                    padding: '10px 0 0 0',
                                                    layout: 'hbox',
                                                    width: '100%',
                                                    bodyStyle: 'border:0px',
                                                    items: [{
                                                            xtype: 'datefield',
                                            fieldLabel: 'Accept Date',
                                            itemId: 'fd_accept_date',
                                            id: 'accept_date_qq',
                                            name: 'paymentcashier_accept_date',
                                            format: 'd-m-Y',
                                            submitFormat: 'Y-m-d H:i:s.u',
                                            flex: 1,
                                            width: 300
                        }]
                                                },
                                                
                                                
                                                {
                                                    //  bodyPadding: 10,
                                                    padding: '10px 0 0 0',
                                                    layout: 'hbox',
                                                    width: '100%',
                                                    bodyStyle: 'border:0px',
                                                    items: [{
                        xtype: 'statuscombobox',
                            fieldLabel: 'Payment Type',
                            emptyText: 'Select Bank/Cash',
                            itemId: 'fdms_cash_bank',
                            name: 'paymentcashier_kasbank',
                            allowBlank: false,
                            enforceMaxLength: true,
                        }]
                                                },
                                                
                                                
                                                
                                                
                                             
                                                {
                                                    //  bodyPadding: 10,
                                                    padding: '10px 0 0 0',
                                                    layout: 'hbox',
                                                    width: '100%',
                                                    bodyStyle: 'border:0px',
                                                    items: [{
                                                             xtype: 'deptprefixcombobox',
                            fieldLabel: 'Departement',
                            itemId: 'fd_department_id',
                            id: 'department_id_c',
                            name: 'paymentcashier_department_id',
                            emptyText: '',
                            width: 400,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                                                        }, {xtype: 'label', text: '', flex: 1}]
                                                },
                                                {
                                                    //  bodyPadding: 10,
                                                    padding: '10px 0 0 0',
                                                    layout: 'hbox',
                                                    width: '100%',
                                                    bodyStyle: 'border:0px',
                                                    items: [{
                                                            xtype: 'voucherprefixcombobox',
                                                            fieldLabel: 'Prefix Cash',  
                                                            displayField: 'coa',
                                                            valueField:'prefix_id',
                                                            id: 'voucherprefix_cash',
                                                            name: 'paymentcashier_prefix_id',
                                                            width: 400,
                                                           readOnly: true,
                                                        }
                                                    ]
                                                },
                                                {
                                                    //  bodyPadding: 10,
                                                    padding: '10px 0 0 0',
                                                    layout: 'hbox',
                                                    width: '100%',
                                                    bodyStyle: 'border:0px',
                                                    items: [{
                                                            xtype: 'voucherprefixcombobox',
                                                            fieldLabel: 'Prefix Bank',     
                                                            id: 'voucherprefix_bank',
                                                            name: 'paymentcashier_prefix_id_bank',
                                                            width: 400,
                                                           readOnly: true,
                                                           hidden:true,
                                                        }]
                                                },
                                                {
                padding: '10px 0 0 0',
               layout: 'hbox',
               width: '100%',
               bodyStyle: 'border:0px',
               items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Cheque / Giro No.',
                    itemId: 'fd_chequegiro_no',
                    id: 'chequegiro_no_ww',
                    name: 'paymentcashier_chequegiro_no',
                    emptyText: 'Manual Input',
                    hidden:true,
                    allowBlank: true,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null,
                    width: 400
                    }]
                },

                                            ]
                                        },
                                        {xtype: 'splitter', width: 30},
                                        {
                                            xtype: 'panel',
                                            flex: 2,
                                            layout: 'vbox',
                                            bodyStyle: 'border:0px',
                                            items: [
                                                
                                                {
                                                    //  bodyPadding: 10,
                                                    padding: '10px 0 0 0',
                                                    layout: 'hbox',
                                                    width: '100%',
                                                    bodyStyle: 'border:0px',
                                                    items: [{
                                                            xtype: 'groupcombobox',
                            fieldLabel: 'Group Trans',
                            itemId: 'fd_grouptrans_id',
                            id: 'grouptrans_id_eeee',
                            name: 'paymentcashier_grouptrans_id',          
                            width: 200,
                            readOnly: true,

                                                        }]
                                                },
                                                {
                                                    //  bodyPadding: 10,
                                                    padding: '10px 0 0 0',
                                                    layout: 'hbox',
                                                    width: '100%',
                                                    bodyStyle: 'border:0px',
                                                    items: [{
                                                           
                            xtype: 'textfield',
                            fieldLabel: 'Transaction No.',
                            itemId: 'fd_transno',
                            id: 'transno_c',
                            name: 'paymentcashier_transno',
                            emptyText: 'Auto Value',
                            width: 200,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                                                        }]
                                                },
                                                {
                                                    //  bodyPadding: 10,
                                                    padding: '10px 0 0 0',
                                                    layout: 'hbox',
                                                    width: '100%',
                                                    bodyStyle: 'border:0px',
                                                    items: [{
                                                          
                            xtype: 'datefield',
                            fieldLabel: 'Cheque Giro Date',
                            itemId: 'fd_chequegiro_date',
                            id: 'chequegiro_date_ww',
                            name: 'paymentcashier_chequegiro_date',
                             format: 'd-m-Y',
                                            submitFormat: 'Y-m-d H:i:s.u',
                            width: 260,
                            hidden:true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                                                        }]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                //////// bagian bawah ///

                            ]
                        },
                        {
                    // Fieldset in Column 1
                    xtype: 'panel',
                    
                    collapsible: false,
                    defaults: {anchor: '100%'},
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'nonlinkpaymentcoadetailgrid',
                            name: 'nonlinkpaymentcoadetailgrid',
                            title: 'Coa Detail',
                            width: '100%',
                            height: 200,
                            padding: '10px 0 0 0px',
                            enableKeyEvents: true,
                        },
                    ]
                },
               
           
                                                
                
                
                    ]
                }, ///adada


                   
                            {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                align: 'left',
                                bodyBorder: false,
                                defaults: {
                                    layout: 'fit'
                                },
                                items: [
                                    {
                                        xtype: 'splitter',
                                        width: '10'
                                    },
                                    {
                                        xtype: 'xmoneyfield',                         
                                        anchor: '100%',
                                        itemId: 'fd_totalheader_eeee',
                                        id: 'totalheader',
                                        name: 'totalheader',
                                        fieldLabel: ' Header',   
                                        emptyText: 'Auto Value',
                                        width: 220,
                                        value: 0, 
                                        hideTrigger: true,
                                        keyNavEnabled: false,
                                        mouseWheelEnabled: false,
                                        enforceMaxLength: true,
                                        readOnly: true,
                                        allowBlank: false,                            
                                        enableKeyEvents: true,
                                        rowdata: null
                                    },
                                    {
                                        xtype: 'splitter',
                                        width: '10'
                                    },
                                     {
                                        xtype: 'xmoneyfield',                         
                                        anchor: '100%',
                                        itemId: 'fd_totaldetail_eeeee',
                                        id: 'totaldetail',
                                        name: 'totaldetail',
                                        fieldLabel: ' Detail ',   
                                        emptyText: 'Auto Value',
                                        value: 0, 
                                        width: 220,
                                        hideTrigger: true,
                                        keyNavEnabled: false,
                                        mouseWheelEnabled: false,
                                        enforceMaxLength: true,
                                        readOnly: true,
                                        allowBlank: false,                            
                                        enableKeyEvents: true,
                                        rowdata: null
                                    },  
                                    
                                    {
                                        xtype: 'splitter',
                                        width: '10'
                                    },
                                     {
                                        xtype: 'xmoneyfield',                         
                                        anchor: '100%',
                                        itemId: 'fd_balance_eeee',
                                        id: 'balance',
                                        name: 'balance',
                                        fieldLabel: 'Balance',   
                                        emptyText: 'Auto Value',
                                        value: 0, 
                                        width: 220,
                                        hideTrigger: true,
                                        keyNavEnabled: false,
                                        mouseWheelEnabled: false,
                                        enforceMaxLength: true,
                                        readOnly: true,
                                        allowBlank: false,                            
                                        enableKeyEvents: true,
                                        rowdata: null
                                    },  
                                    
                                ]
                            },
                            
                   
         

            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});