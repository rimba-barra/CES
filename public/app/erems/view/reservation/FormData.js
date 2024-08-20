Ext.define('Erems.view.reservation.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.reservationformdata',
    requires: [
        'Erems.library.box.Config', 
        'Erems.template.ComboBoxFields',
        'Erems.library.template.view.combobox.Salesman',
    ],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 510,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'padding:5px 5px 0',
    defaults: {
        border: false,
        xtype: 'panel',
        flex: 1,
        layout: ''

    },
    editedRow: -1,
    initComponent: function() {
        var me = this;

        var cfg = new Erems.library.box.Config();

        var cbf = new Erems.template.ComboBoxFields();
        
        var bookingfeeStore = Ext.create('Ext.data.Store', {
            fields: ['name', 'value'],
            data: [
                {"name": "TUNAI", "value": "TUNAI"},
                {"name": "CREDIT/DEBIT", "value": "CREDIT/DEBIT"},
                {"name": "TRANSFER", "value": "TRANSFER"}
            ]
        });

        Ext.applyIf(me, {
            items: [{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_id',
                    name: 'side_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'unit_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'reservation_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'is_approve'
                }, {
                    xtype: 'hiddenfield',
                    name: 'is_reject'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'approvemode'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'sales_name'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'cluster'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'productcategory'
                },
                
                {xtype: 'panel', bodyPadding: 10, title: 'UNIT INFORMATION', collapsible: true,
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                flex: 1
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: ''
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    bodyStyle: 'background-color:#FFFF99;border:0px;padding:10px 20px',
                                    defaults: {
                                        xtype: 'textfield',
                                        margin: '0 10px 0 0',
                                        fieldStyle: 'background:none;background-color:#F2F2F2;',
                                        labelWidth: 45,
                                        readOnly: true
                                    },
                                    items: [
                                        {
                                            name: 'unitstatus_status',
                                            fieldLabel: 'Status',
                                            flex: 1

                                        },
                                        {
                                            name: 'progress',
                                            fieldLabel: 'Progress',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'label',
                                            text: '%',
                                            width: 20
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '10px 0 0 0',
                            defaults: {
                                xtype: 'container',
                                layout: 'vbox',
                                flex: 1,
                                width: '100%'
                            },
                            items: [
                                {
                                    margin: '0 20px 0 0',
                                    defaults: {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        width: '100%',
                                        margin: '0 0 10px 0'
                                    },
                                    items: [
                                        {
                                            defaults: {
                                                xtype: 'textfield',
                                                width: '100%'
                                            },
                                            items: [
                                                {
                                                    name: 'cluster_code',
                                                    fieldLabel: 'Kawasan / Cluster',
                                                    flex: 1,
                                                    readOnly: true,
                                                    margin: '0 5px 0 0'
                                                },
                                                {
                                                    name: 'cluster_cluster',
                                                    fieldLabel: '',
                                                    readOnly: true,
                                                    flex: 1
                                                }
                                            ]

                                        },
                                        {
                                            defaults: {
                                                xtype: 'textfield',
                                                width: '100%'
                                            },
                                            items: [
                                                {
                                                    name: 'block_code',
                                                    fieldLabel: 'Block',
                                                    flex: 1,
                                                    readOnly: true,
                                                    margin: '0 5px 0 0'
                                                },
                                                {
                                                    name: 'block_block',
                                                    fieldLabel: '',
                                                    readOnly: true,
                                                    flex: 1
                                                }
                                            ]

                                        },
                                        {
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    width: '100%',
                                                    name: 'unit_number',
                                                    fieldLabel: 'Unit Number',
                                                    margin: '0 5px 0 0',
                                                    readOnly: true,
                                                    flex: 2
                                                },
                                                {
                                                    xtype: 'button',
                                                    text: 'Browse Unit',
                                                    action: 'browse_unit',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'label',
                                                    text: '',
                                                    width: 50
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    margin: '0 20px 0 0',
                                    defaults: {
                                        xtype: 'container',
                                        width: '100%'
                                    },
                                    items: [
                                        {
                                            layout: 'vbox',
                                            defaults: {
                                                xtype: 'textfield',
                                                width: '100%'
                                            },
                                            items: [
                                                {
                                                    name: 'productcategory_productcategory',
                                                    fieldLabel: 'Product Category',
                                                    readOnly: true,
                                                    margin: '0 0 10px 0'
                                                },
                                                {
                                                    name: 'type_name',
                                                    readOnly: true,
                                                    fieldLabel: 'Type',
                                                }
                                            ]

                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'vbox',
                                            defaults: {
                                                xtype: 'container',
                                                layout: 'hbox',
                                                width: '100%',
                                                margin: '0 0 10px 0'
                                            },
                                            items: [
                                                {
                                                    defaults: {
                                                        margin: '0 10px 0 0'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            name: 'land_size',
                                                            readOnly: true,
                                                            fieldLabel: 'Land Size',
                                                            flex: 3
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'm2',
                                                            width: 30
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            name: 'long',
                                                            fieldLabel: 'Long',
                                                            labelWidth: 45,
                                                            readOnly: true,
                                                            flex: 2
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'm',
                                                            width: 20,
                                                            margin: '0 0 0 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    defaults: {
                                                        margin: '0 10px 0 0'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            name: 'building_size',
                                                            readOnly: true,
                                                            fieldLabel: 'Building Size',
                                                            flex: 3
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'm2',
                                                            width: 30
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            name: 'width',
                                                            readOnly: true,
                                                            fieldLabel: 'Width',
                                                            labelWidth: 45,
                                                            flex: 2
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'm',
                                                            width: 20,
                                                            margin: '0 0 0 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    defaults: {
                                                        margin: '0 10px 0 0'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            name: 'kelebihan',
                                                            readOnly: true,
                                                            fieldLabel: 'Kelebihan Tanah',
                                                            flex: 3
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'm2',
                                                            width: 30
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            name: 'floor',
                                                            readOnly: true,
                                                            fieldLabel: 'Floor',
                                                            labelWidth: 45,
                                                            flex: 2
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: '',
                                                            width: 20,
                                                            margin: '0 0 0 0'
                                                        }
                                                    ]
                                                }

                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                /* CUSTOMER INFORMATION */
                {
                    xtype: 'panel',
                    bodyPadding: 10,
                    title: 'CUSTOMER BOOKING INFORMATION',
                    collapsible: true,
                    width: '100%',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    xtype: 'panel',
                                    flex: 2,
                                    width: '100%',
                                    //padding: '10px 0 0 10px',
                                    bodyStyle: 'border:0px',
                                    items: [
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 20px 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Booking Date',
                                                    format: cfg.DATE_FORMAT,
                                                    submitFormat: cfg.DATE_SUBMITFORMAT,
                                                    name: 'reservation_date',
                                                    value: new Date(),
                                                    flex: 1
                                                }]
                                        },
                                        {
                                            padding   : '10px 20px 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            width     : '100%',
                                            items     : [
                                                {
                                                    xtype           : 'xnumericfieldEST',
                                                    fieldLabel      : 'Booking Days',
                                                    anchor          : '-5',
                                                    name            : 'reservation_days',
                                                    enableKeyEvents : true,
                                                    value           : 0,
                                                    flex            : 1,
                                                }
                                            ]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 20px 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Booking Until',
                                                    format: cfg.DATE_FORMAT,
                                                    submitFormat: cfg.DATE_SUBMITFORMAT,
                                                    name: 'reservation_date_until',
                                                    value: new Date(),
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2;'
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 20px 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [

                                            {
                                                    xtype: 'combobox',
                                                    fieldLabel: 'Cara bayar',
                                                    queryMode:'local',
                                                    displayField: cbf.pricetype.d,
                                                    valueField: cbf.pricetype.v,
                                                    anchor: '-5',
                                                    name: 'pricetype_id',
                                                    flex: 1,
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 20px 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'combobox',
                                                    fieldLabel: 'Booking Fee',
                                                    queryMode:'local',
                                                    displayField: 'name',
                                                    valueField: 'value',
                                                    store: bookingfeeStore,
                                                    anchor: '-5',
                                                    name: 'booking_fee',
                                                    flex: 1,
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 20px 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'combobox',
                                                    fieldLabel: 'Informasi',
                                                    queryMode:'local',
                                                    displayField: cbf.mediapromotion.d,
                                                    valueField: cbf.mediapromotion.v,
                                                    anchor: '-5',
                                                    name: 'mediapromotion_id',
                                                    flex: 1,
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 20px 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Uang Titipan',
                                                    anchor: '-5',
                                                    name: 'uang_titipan',
                                                    flex: 1,
                                                    maskRe:/[0-9]/,
                                                    enforceMaxLength:true,
                                                    maxLength:10,
                                                    decimalPrecision:2,
                                                    validator: function(v) {
                                                        var commaPos = v.indexOf(',')+1;
                                                        var strLen = v.length;
                                                        if(commaPos > 0 && commaPos < strLen-2) return "Maximum allowed precision: two digits!";
                                                        return true;
                                                    }
                                                }]
                                        },
                                        // added by rico 14022023
                                        {
                                            padding: '10px 20px 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [
                                                {
                                                    xtype      : 'cbsalesman',
                                                    fieldLabel : 'Salesman',
                                                    anchor     : '-5',
                                                    name       : 'salesman_id',
                                                    flex       : 2,
                                                    editable   : false
                                                }
                                            ]
                                        },
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    width: '100%',
                                    flex: 2,
                                    bodyStyle: 'border:0px',
                                    items: [
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Booking No.',
                                                    anchor: '-5',
                                                    name: 'reservation_no',
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
                                                    xtype      : 'xnamefieldEST',
                                                    fieldLabel : 'Customer Name',
                                                    anchor     : '-5',
                                                    name       : 'customer_name',
                                                    flex       : 1,
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype      : 'xphonenumberfieldEST',
                                                    fieldLabel : 'Customer Phone',
                                                    anchor     : '-5',
                                                    name       : 'customer_phone',
                                                    flex       : 1,
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Customer Email',
                                                    anchor: '-5',
                                                    name: 'customer_email',
                                                    flex: 1,
                                                    enforceMaxLength:true,
                                                    maxLength:100,
                                                    vtype:'email',
                                                    listeners: {
                                                        'blur': function (thisField) {
                                                            if (!thisField.isValid()) {
                                                                this.setValue("");
                                                            }
                                                        }
                                                    }
                                                }
                                            ]
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
                                                }]
                                        },
                                        {
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            items     : [{
                                                    xtype      : 'xnotefieldEST',
                                                    fieldLabel : 'Notes',
                                                    anchor     : '-5',
                                                    name       : 'notes',
                                                    flex       : 1,
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
    },
    generateDockedItem: function() {
        var x = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                layout: {
                    padding: 6,
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'save',
                        itemId: 'btnSave',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Save'
                    },
                    {
                        xtype: 'button',
                        action: 'approve',
                        itemId: 'btnApprove',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-approve',
                        text: 'Approve'
                    },
                    {
                        xtype: 'button',
                        action: 'reject',
                        itemId: 'btnReject',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-unapprove',
                        text: 'Reject'
                    },
                    {
                        xtype: 'button',
                        action: 'release',
                        itemId: 'btnRelease',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-unapprove',
                        text: 'Release'
                    },
                    {
                        xtype: 'button',
                        action: 'print',
                        itemId: 'btnPrint',
                        hidden: true,
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-print',
                        text: 'Print'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Cancel',
                        handler: function() {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    }
});