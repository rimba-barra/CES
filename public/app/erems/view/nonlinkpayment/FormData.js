Ext.define('Erems.view.nonlinkpayment.FormData', {
    alias: 'widget.nonlinkpaymentformdata',
    extend: 'Erems.library.template.view.FormData',
    requires: [
        'Erems.library.template.view.FdNonLinkCustomerInformation',
        'Erems.library.template.component.Pricetypecombobox',
        'Erems.library.template.component.Kprstatuscombobox',
        'Erems.library.template.view.combobox.Paymentmethod',
        'Erems.library.template.view.combobox.City',
        'Erems.template.ComboBoxFields',
        'Erems.library.template.view.MoneyField'
                // 'Erems.view.installmentpayment.PaymentDetailGrid'
    ],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 600,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'padding:5px 5px 0',
    editedRow:-1,
    defaults: {
        border: false,
        xtype: 'panel',
        flex: 1,
        layout: ''

    },
    initComponent: function() {
        var me = this;
        
        var cbf = new Erems.template.ComboBoxFields();

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
                                                    xtype      : 'xnamefieldEST',
                                                    fieldLabel : 'Customer Name',
                                                    anchor     : '-5',
                                                    name       : 'customer_name',
                                                    flex       : 1,
                                                    minLength  : 5,
                                                }]
                                        },
                                        {
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            items     : [{
                                                    xtype      : 'xaddressfieldEST',
                                                    fieldLabel : 'Address',
                                                    anchor     : '-5',
                                                    name       : 'customer_address',
                                                    flex       : 1,
                                                    allowBlank :true,
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
                                                    flex: 1,
                                                    allowBlank:false,
                                                    //edited by Rizal 27022019
                                                    queryMode:'local',
                                                    //endedited
                                                    listeners:{
                                                        blur:function(el){
                                                            if(el.value == '' ||el.value == null){
                                                                el.setValue('');
                                                                Ext.Msg.show({
                                                                    title: 'Failure',
                                                                    msg: 'Kota yang dicari tidak ada.',
                                                                    icon: Ext.Msg.ERROR,
                                                                    buttons: Ext.Msg.OK
                                                                });
                                                            }
                                                        }
                                                    }
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype      : 'xphonenumberfieldEST',
                                                    fieldLabel : 'Office phone',
                                                    anchor     : '-5',
                                                    name       : 'customer_office_phone',
                                                    allowBlank :false,
                                                    flex       : 1
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype      : 'xphonenumberfieldEST',
                                                    fieldLabel : 'Home phone',
                                                    anchor     : '-5',
                                                    name       : 'customer_home_phone',
                                                    flex       : 1,
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype      : 'xphonenumberfieldEST',
                                                    fieldLabel : 'Mobile phone',
                                                    name       : 'customer_mobile_phone',
                                                    flex       : 1,
                                                    anchor     : '-5',
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
                                                    flex: 2,
                                                    allowBlank:false,
                                                    //edited by Rizal 27022019
                                                    queryMode:'local',
                                                    //endedited
                                                    listeners:{
                                                        blur:function(el){
                                                            if(el.value == '' ||el.value == null){
                                                                el.setValue('');
                                                                Ext.Msg.show({
                                                                    title: 'Failure',
                                                                    msg: 'Payment Method yang dicari tidak ada.',
                                                                    icon: Ext.Msg.ERROR,
                                                                    buttons: Ext.Msg.OK
                                                                });
                                                            }
                                                        }
                                                    }
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
                                                    allowBlank:false,
                                                    maskRe:/[A-Za-z0-9]/,
                                                    enforceMaxLength:true,
                                                    maxLength:50
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
                                                    allowBlank:false,
                                                    maskRe:/[A-Za-z0-9]/,
                                                    enforceMaxLength:true,
                                                    maxLength:50
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
                                                    maskRe:/[0-9-]/,
                                                    enforceMaxLength:true,
                                                    maxLength:10,
                                                    allowBlank:false,
                                                    listeners: {
                                                        blur: function(field) {
                                                            var today = new Date();
                                                            if(!field.isValid()) {
                                                                Ext.Msg.alert('Info', 'Date is invalid!');
                                                                field.setValue(today);
                                                            }
                                                        }
                                                    }
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
                                                    maskRe:/[0-9-]/,
                                                    enforceMaxLength:true,
                                                    maxLength:10,
                                                    allowBlank:false,
                                                    listeners: {
                                                        blur: function(field) {
                                                            var today = new Date();
                                                            if(!field.isValid()) {
                                                                Ext.Msg.alert('Info', 'Date is invalid!');
                                                                field.setValue(today);
                                                            }
                                                        }
                                                    }
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
                                                    maskRe:/[0-9-]/,
                                                    enforceMaxLength:true,
                                                    maxLength:10,
                                                    allowBlank:false,
                                                    listeners: {
                                                        blur: function(field) {
                                                            var today = new Date();
                                                            if(!field.isValid()) {
                                                                Ext.Msg.alert('Info', 'Date is invalid!');
                                                                field.setValue(today);
                                                            }
                                                        }
                                                    }
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
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            width     : '100%',
                                            items     : [{
                                                    xtype      : 'xnotefieldEST',
                                                    fieldLabel : 'Notes',
                                                    name       : 'note',
                                                    height     : 120,
                                                    labelWidth : 50,
                                                    flex       : 1
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
                }

            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});