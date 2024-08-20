Ext.define('Cashier.view.installmentpayment.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.installmentpaymentformdata',
    requires: [
        // 'Cashier.library.template.component.Paymentmethodcombobox',
        // 'Cashier.library.template.component.Pricetypecombobox',
        // 'Cashier.library.template.component.Kprstatuscombobox',
        'Cashier.view.installmentpayment.PaymentDetailGrid',
        'Cashier.view.installmentpayment.Gridcoadetail',
        //  'Cashier.library.template.view.combobox.Paymentmethod',
        'Cashier.library.template.view.MoneyField'
    ],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 600,
    bodyBorder: true,
    bodyPadding: 10,
    deletedCoa:[],
    bodyStyle: 'padding:5px 5px 0',
    fieldNamePrefix: 'customer_',
    editedRow: -1,
    deletedRows: [],
    
    defaults: {
        border: false,
        xtype: 'panel',
        flex: 1,
        layout: ''

    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                    xtype: 'hiddenfield',
                    name: 'payment_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'purchaseletter_id'
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
                {xtype: 'panel',
                    bodyPadding: '10px',
                    items: [
                        {layout: 'hbox', bodyStyle: 'border:0px',
                            items: [{xtype: 'label',
                                    flex: 3
                                }, {
                                    flex: 2,
                                    bodyPadding: 10,
                                    layout: 'hbox',
                                    bodyStyle: 'background-color:#FFFF99;border:0px',
                                    items: [{
                                            xtype: 'textfield',
                                            fieldLabel: 'State',
                                            labelWidth: 35,
                                            name: 'unitstatus_status',
                                            value: '',
                                            readOnly: true,
                                            flex: 1,
                                            fieldStyle: 'background-color:#FFCC00;background-image: none;'

                                        }, {
                                            xtype: 'splitter', width: 5,
                                        }, {
                                            xtype: 'textfield',
                                            fieldLabel: 'Const. Progress',
                                            name: 'email',
                                            value: '0%',
                                            flex: 1,
                                            readOnly: true,
                                            fieldStyle: 'background-color:#FFCC00;background-image: none;'
                                        }]
                                }]},
                        {
                            layout: 'hbox',
                            padding: '10px 0 0 0',
                            bodyStyle: 'border:0px',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'panel', flex: 8,
                                    layout: {
                                        type: 'vbox',
                                        defaultMargins: {top: 0, right: 0, bottom: 10, left: 0}
                                    },
                                    bodyStyle: 'border:0px',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            name: 'pt_name',
                                            width: 368,
                                            fieldLabel: 'PT',
                                            keepRO: true,
                                            readOnly: true,
                                            defaultMargins: {top: 0, right: 0, bottom: 5, left: 0}

                                        },
                                        {
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Kawasan / Cluster',
                                                    anchor: '-5',
                                                    name: 'cluster_code',
                                                    flex: 5,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'splitter', width: 5,
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: '',
                                                    anchor: '-5',
                                                    name: 'cluster_cluster',
                                                    flex: 6,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }
                                            ]
                                        },
                                        {
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Block name',
                                                    anchor: '-5',
                                                    name: 'block_code',
                                                    flex: 5,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'splitter', width: 5,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: '',
                                                    anchor: '-5',
                                                    name: 'block_block',
                                                    flex: 6,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }]
                                        },
                                        {
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'combobox',
                                                    queryMode:'local',
                                                    fieldLabel: 'Kavling / Unit No. ',
                                                    anchor: '-5',
                                                    name: 'unit_unit_number',
                                                    flex: 6,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'splitter', width: 5,
                                                }, {
                                                    xtype: 'button',
                                                    text: 'Browse Unit',
                                                    itemId: 'fd_browse_unit_btn',
                                                    padding: '2px 5px',
                                                    action: 'browse_unit',
                                                    iconCls: 'icon-search',
                                                    style: 'background-color:#FFC000;'
                                                },
                                                {xtype: 'label', text: '', flex: 2}]
                                        }
                                    ]
                                },
                                {xtype: 'splitter', width: 30},
                                {
                                    xtype: 'panel', flex: 7,
                                    layout: {
                                        type: 'vbox',
                                        defaultMargins: {top: 0, right: 0, bottom: 10, left: 0}
                                    },
                                    bodyStyle: 'border:0px',
                                    items: [
                                        {
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Product Category',
                                                    anchor: '-5',
                                                    name: 'productcategory_productcategory',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }]
                                        },
                                        {
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Type',
                                                    anchor: '-5',
                                                    name: 'type_name',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }]
                                        },
                                        {
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Land Size',
                                                    anchor: '-5',
                                                    name: 'unit_land_size',
                                                    flex: 12,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                },
                                                {xtype: 'label', text: 'm2', flex: 1, margin: '0 0 0 10px'},
                                                {
                                                    xtype: 'splitter', width: 30,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Long',
                                                    anchor: '-5',
                                                    name: 'unit_long',
                                                    flex: 6,
                                                    labelWidth: 30,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                },
                                                {xtype: 'label', text: 'm', flex: 1, margin: '0 0 0 10px'}
                                            ]
                                        },
                                        {
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Building Size',
                                                    anchor: '-5',
                                                    name: 'unit_building_size',
                                                    flex: 12,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                },
                                                {xtype: 'label', text: 'm2', flex: 1, margin: '0 0 0 10px'},
                                                {
                                                    xtype: 'splitter', width: 30,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Width',
                                                    anchor: '-5',
                                                    name: 'unit_width',
                                                    flex: 6,
                                                    labelWidth: 30,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                },
                                                {xtype: 'label', text: 'm', flex: 1, margin: '0 0 0 10px'}
                                            ]
                                        },
                                        {
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Kelebihan Tanah',
                                                    anchor: '-5',
                                                    name: 'unit_kelebihan',
                                                    flex: 12,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                },
                                                {xtype: 'label', text: 'm2', flex: 1, margin: '0 0 0 10px'},
                                                {
                                                    xtype: 'splitter', width: 30,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Floor',
                                                    anchor: '-5',
                                                    name: 'unit_floor',
                                                    flex: 6,
                                                    labelWidth: 30,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                },
                                                {xtype: 'label', text: '', flex: 1, margin: '0 0 0 10px'}
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }

                    ]},
                {xtype: 'panel', bodyPadding: 10, title: 'PURCHASE LETTER INFORMATION', collapsible: true,
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
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Purchase Letter No.',
                                                            anchor: '-5',
                                                            name: 'purchaseletter_no',
                                                            flex: 1,
                                                            readOnly: true,
                                                            fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
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
                                                            fieldLabel: 'Price Type',
                                                            anchor: '-5',
                                                            name: 'pricetype_pricetype',
                                                            flex: 1,
                                                            readOnly: true,
                                                            fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                        }, {xtype: 'label', text: '', flex: 1}]
                                                },
                                                {
                                                    //  bodyPadding: 10,
                                                    padding: '10px 0 0 0',
                                                    layout: 'hbox',
                                                    width: '100%',
                                                    bodyStyle: 'border:0px',
                                                    items: [{
                                                            xtype: 'xmoneyfield',
                                                            fieldLabel: 'Total Price',
                                                            anchor: '-5',
                                                            name: 'harga_total_jual',
                                                            flex: 1,
                                                            readOnly: true,
                                                            fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                        }]
                                                }

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
                                                            xtype: 'datefield',
                                                            fieldLabel: 'Purchase Letter Date',
                                                            anchor: '-5',
                                                            name: 'purchase_date',
                                                            flex: 1,
                                                            readOnly: true,
                                                            fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
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
                                                            fieldLabel: 'Serah Terima',
                                                            anchor: '-5',
                                                            name: 'rencana_serahterima_date',
                                                            flex: 1,
                                                            readOnly: true,
                                                            fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                        }]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                //////// bagian bawah ///

                            ]
                        }
                    ]
                },
                /* CUSTOMER INFORMATION */
                {xtype: 'panel', bodyPadding: 10, title: 'CUSTOMER INFORMATION', collapsible: true,
                    width: '100%',
                    items: [
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
                                                    fieldLabel: 'Customer ID',
                                                    anchor: '-5',
                                                    name: me.fieldNamePrefix + 'customer_id',
                                                    flex: 3,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2;'
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                },
                                                {
                                                    xtype: 'label', flex: 5
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Customer Name',
                                                    anchor: '-5',
                                                    name: me.fieldNamePrefix + 'name',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2;'
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
                                                    name: me.fieldNamePrefix + 'address',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2;'
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'City',
                                                    anchor: '-5',
                                                    name: 'city_city_name',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2;'
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Zip Code',
                                                    anchor: '-5',
                                                    name: me.fieldNamePrefix + 'zipcode',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2;'
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
                                                    name: me.fieldNamePrefix + 'home_phone',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2;'
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Mobile phone',
                                                    anchor: '-5',
                                                    name: me.fieldNamePrefix + 'mobile_phone',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2;'
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Office phone',
                                                    anchor: '-5',
                                                    name: me.fieldNamePrefix + 'office_phone',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2;'
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'FAX',
                                                    anchor: '-5',
                                                    name: me.fieldNamePrefix + 'fax',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2;'
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'KTP Number',
                                                    anchor: '-5',
                                                    name: me.fieldNamePrefix + 'KTP_number',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2;'
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'NPWP Number',
                                                    anchor: '-5',
                                                    name: me.fieldNamePrefix + 'NPWP',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2;'
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Email Address',
                                                    anchor: '-5',
                                                    name: me.fieldNamePrefix + 'email',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2;'
                                                }]
                                        }



                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    flex: 1,
                                    width: '100%',
                                    padding: '10px 0 0 10px',
                                    bodyStyle: 'border:0px',
                                    items: [
                                        /*  {
                                         xtype: 'panel', flex: 1, height: 200, bodyStyle: 'background-color:#F2F2F2;',
                                         padding: '0 0 10px 0'},*/
                                        {xtype: 'panel',
                                            height: 200,
                                            bodyStyle: 'background:none',
                                            itemId: 'photo_image',
                                            html: '',
                                            // flex: 1,
                                            width: 160
                                        },
                                        {xtype: 'button', text: 'Create New Customer', flex: 1}
                                    ]
                                }
                            ]
                        }
                    ]},
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
                                                     queryMode:'local',
                                                    displayField: 'paymentmethod',
                                                    fieldLabel: 'Payment Method',
                                                    valueField: 'paymentmethod_id',
                                                    name: 'paymentmethod_paymentmethod_id',
                                                    flex: 2
                                                }, {
                                                    xtype: 'splitter', width: 30
                                                }, {
                                                    xtype: 'checkboxfield',
                                                    fieldLabel: 'Reference Rejected',
                                                    name: 'is_referencerejected',
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
                                        {
                                            xtype: 'radiogroup',
                                            fieldLabel: '',
                                            // Arrange radio buttons into two columns, distributed vertically
                                            itemId: 'cdnID',
                                            labelWidth: 1,
                                            width: '100%',
                                            layout: 'hbox',
                                            defaults: {
                                                margin: '0 20 0 0'
                                            },
                                            flex: 3,
                                            items: [
                                                {boxLabel: 'Credit Note', name: 'cdn', inputValue: 1},
                                                {boxLabel: 'Debit Note', name: 'cdn', inputValue: 2},
                                                {boxLabel: 'None', name: 'cdn', inputValue: 3, checked: true}
                                            ]
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
                                                    xtype: 'textfield',
                                                    fieldLabel: 'No. Voucher Finance',
                                                    name: 'voucher_no',
                                                    id:'voucher_erems',
                                                    keepRO: true,
                                                    readOnly: true,
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
                                    xtype: 'installmentpaymentpaymentdetailgrid',
                                    width: '100%',
                                    itemId: 'MyScheduleGrid',
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
                                                    fieldLabel: 'TOTAL DENDA',
                                                    name: 'denda',
                                                    maskRe: /[0-9\.]/,
                                                    currencyFormat: true,
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
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    action: 'fullpayment',
                                                    text: 'Full',
                                                    width: 35,
                                                    margin: '0 10px 0 0'
                                                }
                                                , {
                                                    xtype: 'xmoneyfield',
                                                    fieldLabel: 'PAYMENT',
                                                    name: 'payment',
                                                    labelWidth: 55,
                                                    //  currencyFormat: true,
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
                                                    fieldLabel: 'ADM FEE',
                                                    name: 'admin_fee',
                                                    enableKeyEvents: true,
                                                    maskRe: /[0-9\.]/,
                                                    //  currencyFormat: true,
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
                                                    fieldLabel: 'CN / DN VALUE',
                                                    name: 'cdn_value',
                                                    readOnly: true,
                                                    maskRe: /[0-9\.]/,
                                                    //  currencyFormat: true,
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
                            xtype: 'installmentpaymentcoadetailgrid',
                            name: 'installmentpaymentcoadetailgrid',
                            title: 'Coa Detail',
                            width: '100%',
                            height: 200,
                            padding: '10px 0 0 0px',
                            enableKeyEvents: true,
                        },
                    ]
                },
               
             
                                                
                                    
                          
                
                    ]
                },
                
                
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