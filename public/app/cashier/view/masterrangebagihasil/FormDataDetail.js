Ext.define('Cashier.view.masterrangebagihasil.FormDataDetail', {
    extend  : 'Cashier.library.template.view.FormData',
    alias   : 'widget.masterrangebagihasilformdatadetail',
    requires: [
    ],
    autoScroll   : true,
    anchorSize   : 100,
    height       : 450,
    bodyBorder   : true,
    bodyPadding  : 10,
    bodyStyle    : 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' ',
                labelClsExtra : 'small',
                fieldStyle    : 'margin-bottom:3px;',
                anchor        : '100%'
            },
            items: [
                {
                    xtype : 'hiddenfield',
                    itemId: 'fdms_id',
                    name  : 'rangebagihasil_detail_id'
                },
                {
                    xtype      : 'fieldset',
                    columnWidth: 0.5,
                    title      : 'Harga Tanah/m2',
                    defaultType: 'textfield',
                    defaults   : { anchor: '40%', labelSeparator: ' ' },
                    layout     : 'anchor',
                    items      : [
                        {
                            xtype           : 'xmoneyfield',
                            fieldLabel      : 'Start',
                            fieldStyle      : 'background:none;background-color:#FFFFFF !important;text-align:right;',
                            maskRe          : /[0-9\.]/,
                            name            : 'hargatanah_permeter_start',
                            allowBlank      : false,
                            hideTrigger     : true,
                            decimalPrecision: 2,
                            flex            : 2
                        },
                        {
                            xtype           : 'xmoneyfield',
                            fieldLabel      : 'End',
                            fieldStyle      : 'background:none;background-color:#FFFFFF !important;text-align:right;',
                            maskRe          : /[0-9\.]/,
                            name            : 'hargatanah_permeter_end',
                            allowBlank      : false,
                            hideTrigger     : true,
                            decimalPrecision: 2,
                            flex            : 2
                        }]
                },
                {
                    xtype      : 'fieldset',
                    columnWidth: 0.5,
                    title      : 'Komposisi Tanah',
                    defaultType: 'textfield',
                    defaults   : { anchor: '50%', labelSeparator: ' ' },
                    layout     : 'anchor',
                    items      : [
                        {
                            xtype   : 'container',
                            layout  : 'hbox',
                            margin  : '0 0 5px 0',
                            defaults: {
                                margin: '0 20px 0 0', labelSeparator: ' '
                            },
                            items: [
                                {
                                    xtype           : 'xmoneyfield',
                                    fieldLabel      : 'Partner',
                                    fieldStyle      : 'background:none;background-color:#FFFFFF !important;text-align:right;',
                                    maskRe          : /[0-9\.]/,
                                    name            : 'komposisi_tanah_partner',
                                    allowBlank      : false,
                                    hideTrigger     : true,
                                    decimalPrecision: 2,
                                    flex            : 2
                                },
                                {
                                    xtype : 'label',
                                    text  : '%',
                                    width : 20,
                                    margin: '5px 0 0 -15px',
                                    flex  : 1
                                }
                            ]
                        },
                        {
                            xtype   : 'container',
                            layout  : 'hbox',
                            margin  : '0 0 5px 0',
                            defaults: {
                                margin: '0 20px 0 0', labelSeparator: ' '
                            },
                            items: [
                                {
                                    xtype           : 'xmoneyfield',
                                    fieldLabel      : 'Ciputra',
                                    fieldStyle      : 'background:none;background-color:#FFFFFF !important;text-align:right;',
                                    maskRe          : /[0-9\.]/,
                                    name            : 'komposisi_tanah_ciputra',
                                    allowBlank      : false,
                                    hideTrigger     : true,
                                    decimalPrecision: 2,
                                    flex            : 2
                                },
                                {
                                    xtype : 'label',
                                    text  : '%',
                                    width : 20,
                                    margin: '5px 0 0 -15px',
                                    flex  : 1
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype      : 'fieldset',
                    columnWidth: 0.5,
                    title      : 'Komposisi Bangunan',
                        //					collapsible: true,
                    defaultType: 'textfield',
                    defaults   : { anchor: '50%', labelSeparator: ' ' },
                    layout     : 'anchor',
                    items      : [
                        {
                            xtype   : 'container',
                            layout  : 'hbox',
                            margin  : '0 0 5px 0',
                            defaults: {
                                margin: '0 20px 0 0', labelSeparator: ' '
                            },
                            items: [
                                {
                                    xtype     : 'xmoneyfield',
                                    fieldLabel: 'Partner',
                                    fieldStyle: 'background:none;background-color:#FFFFFF !important;text-align:right;',
                                    maskRe    : /[0-9\.]/,
                                        //value: 0.00,
                                        //									labelWidth: '120px',
                                    name            : 'komposisi_bangunan_partner',
                                    allowBlank      : false,
                                    hideTrigger     : true,
                                    decimalPrecision: 2,
                                    flex            : 2
                                },
                                {
                                    xtype : 'label',
                                    text  : '%',
                                    width : 20,
                                    margin: '5px 0 0 -15px',
                                    flex  : 1
                                }
                            ]
                        },
                        {
                            xtype   : 'container',
                            layout  : 'hbox',
                            margin  : '0 0 5px 0',
                            defaults: {
                                margin: '0 20px 0 0', labelSeparator: ' '
                            },
                            items: [
                                {
                                    xtype     : 'xmoneyfield',
                                    fieldLabel: 'Ciputra',
                                    fieldStyle: 'background:none;background-color:#FFFFFF !important;text-align:right;',
                                    maskRe    : /[0-9\.]/,
                                        //value: 0.00,
                                        //									labelWidth: '120px',
                                    name            : 'komposisi_bangunan_ciputra',
                                    allowBlank      : false,
                                    hideTrigger     : true,
                                    decimalPrecision: 2,
                                    flex            : 2
                                },
                                {
                                    xtype : 'label',
                                    text  : '%',
                                    width : 20,
                                    margin: '5px 0 0 -15px',
                                    flex  : 1
                                }
                            ]
                        }
                    ]
                },
            ],
            dockedItems: me.generateDockedItem()
        });
        me.callParent(arguments);
    }
});

