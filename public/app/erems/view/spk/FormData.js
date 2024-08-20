Ext.define('Erems.view.spk.FormData', {
    extend: 'Erems.library.template.view.FormData',
    requires: ['Erems.view.spk.GridUnit',
        'Erems.template.ComboBoxFields'],
    alias: 'widget.spkformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 450,
    bodyBorder: true,
    itemId: 'SpkFormData',
    bodyPadding: 10,
    bodyStyle: 'padding:5px 5px 0;background-color:#ffffff;',
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
            items: [
                {xtype: 'panel', bodyPadding: 10,
                    width: '100%',
                    defaults: {
                        bodyStyle: 'border:0px'
                    },
                    items: [
                        {
                            xtype: 'hiddenfield',
                            name: 'spk_id'
                        },
                        {
                            defaults: {
                                xtype: 'container',
                                layout: 'hbox'
                            },
                            items: [
                                {/* MAIN ROW */
                                    defaults: {
                                        xtype: 'container',
                                        flex: 1,
                                        layout: 'vbox',
                                        margin: '0 10 0 0'
                                    },
                                    items: [
                                        {
                                            flex: 4,
                                            defaults: me.textFieldDefault(true),
                                            items: [
                                                {
                                                    fieldLabel: 'SPK Code',
                                                    name: 'code',
                                                    readOnly: false,
                                                    hidden: true,
                                                    allowBlank: false,
                                                    fieldStyle: ""
                                                },
                                                {
                                                    fieldLabel: 'SPK Number',
                                                    readOnly: false,
                                                    fieldStyle: '',
                                                    name: 'spk_no'
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    defaults: {
                                                        xtype: 'textfield',
                                                        padding: '5px 0 0 0',
                                                        width: '100%'
                                                    },
                                                    items: [
                                                        {
                                                            fieldLabel: 'Contractor',
                                                            name: 'contractor_code',
                                                            readOnly: false,
                                                            allowBlank: false,
                                                            enableKeyEvents: true,
                                                            flex: 3
                                                        },
                                                        {
                                                            xtype: 'combobox',
                                                            queryMode:'local',
                                                            name: 'contractor_contractor_id',
                                                            fieldLabel: '',
                                                            flex: 3,
                                                            displayField: cbf.contractor.d,
                                                            valueField: cbf.contractor.v,
                                                            margin: '5 10 0 10'
                                                        }, {
                                                            xtype: 'button',
                                                            action: 'add_contractor',
                                                            text: 'Add New',
                                                            margin: '5 0 0 0',
                                                            flex: 1
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            flex: 3,
                                            margin: '0 10 0 10',
                                            defaults: {
                                                xtype: 'textfield',
                                                padding: '5px 0 0 0',
                                                width: '100%',
                                                flex: 1
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    defaults: {
                                                        xtype: 'textfield',
                                                        padding: '5px 0 0 0',
                                                        width: '100%'
                                                    },
                                                    items: [
                                                        {
                                                            fieldLabel: 'Progress',
                                                            name: 'progress',
                                                            fieldStyle: me.textfieldStyle(true, true),
                                                            readOnly: true,
                                                            flex: 3
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            margin: '0 0 0 10',
                                                            text: '%',
                                                            flex: 2
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'SPK Date',
                                                    name: 'spk_date',
                                                    value: new Date(),
                                                    format: 'd-m-Y',
                                                    submitFormat: 'Y-m-d H:i:s.u'
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    fieldLabel: 'SPK Tipe',
                                                    queryMode:'local',
                                                    allowBlank: false,
                                                    name: 'spktype_spktype_id',
                                                    displayField: cbf.spktype.d,
                                                    valueField: cbf.spktype.v,
                                                }

                                            ]
                                        }

                                    ]
                                },
                                {/* MAIN ROW*/
                                    layout : 'vbox',
                                    items  : [
                                        {
                                            xtype      : 'xaddressfieldEST',
                                            padding    : '5px 0 0 0',
                                            width      : '100%',
                                            fieldLabel : 'Cont. Address',
                                            readOnly   : true,
                                            name       : 'contractor_address',
                                            fieldStyle : me.textfieldStyle(true, true)
                                        },
                                    ]
                                },
                                {/* MAIN ROW*/
                                    defaults: {
                                        xtype: 'container',
                                        flex: 1,
                                        layout: 'vbox',
                                        margin: '0 10 0 0'
                                    },
                                    items: [
                                        {
                                            flex: 4,
                                            margin: '0 20 0 0',
                                            defaults: me.textFieldDefault(true),
                                            items: [
                                                {
                                                    xtype      : 'xphonenumberfieldEST',
                                                    fieldLabel : 'Contractor Phone',
                                                    name       : 'contractor_telp'
                                                },
                                                {
                                                    xtype      : 'xphonenumberfieldEST',
                                                    fieldLabel : 'Contractor Fax',
                                                    name       : 'contractor_fax'
                                                }
                                            ]
                                        },
                                        {
                                            flex: 3,
                                            defaults: me.textFieldDefault(true),
                                            items: [
                                                {
                                                    fieldLabel: 'PIC',
                                                    name: 'contractor_PIC'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {/* MAIN ROW*/
                                    defaults: {
                                        xtype: 'container',
                                        flex: 1,
                                        layout: 'vbox',
                                        margin: '0 10 0 0'
                                    },
                                    items: [
                                        {
                                            defaults: {
                                                xtype: 'textfield',
                                                padding: '5px 0 0 0',
                                                width: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    defaults: {
                                                        xtype: 'textfield',
                                                        padding: '5px 0 0 0',
                                                        width: '100%'
                                                    },
                                                    items: [
                                                        {
                                                            xtype:'numberfield',
                                                            fieldLabel: 'Implement Time',
                                                            name: 'time_duration',
                                                            allowBlank:true,
                                                            enforceMaxLength:true,
                                                            maxLength:5,
                                                            flex: 3
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            margin: '0 0 0 10',
                                                            text: 'month',
                                                            flex: 2
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    defaults: {
                                                        padding: '5px 0 0 0'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'datefield',
                                                            fieldLabel: 'Time frame',
                                                            name: 'started',
                                                            flex: 6,
                                                            value: new Date(),
                                                            format: 'd-m-Y',
                                                            submitFormat: 'Y-m-d H:i:s.u'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            margin: '0 0 0 10',
                                                            text: 'to',
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'datefield',
                                                            fieldLabel: '',
                                                            flex: 3,
                                                            name: 'ended',
                                                            value: new Date(),
                                                            submitFormat: 'Y-m-d H:i:s.u',
                                                            format: 'd-m-Y'
                                                        }
                                                    ]
                                                },
                                                {
                                                    fieldLabel: 'Job Fee',
                                                    name: 'job_fee',
                                                    allowBlank: false,
                                                    isUang:true,
                                                    anchor: '100%',
                                                    defaultAlign:'right',
                                                   // value:0,
                                                    // Remove spinner buttons, and arrow key and mouse wheel listeners
                                                  
                                                },
                                                {
                                                    fieldLabel: 'Job Title',
                                                    name: 'job_title',
                                                    allowBlank: false,
                                                    maskRe:/[A-Za-z0-9\s.-]/
                                                }

                                            ]
                                        },
                                        {
                                        }

                                    ]
                                },
                                {
                                    /* MAIN ROW*/
                                    layout: 'vbox',
                                    items: [
                                        {
                                            xtype      : 'xnotefieldEST',
                                            fieldLabel : 'Job Description',
                                            name       : 'description',
                                            width      : '100%',
                                        },
                                        {
                                            xtype      : 'xnotefieldEST',
                                            fieldLabel : 'Status Note',
                                            name       : 'status_note',
                                            width      : '100%',
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Total Unit',
                                            readOnly:true,
                                            name: 'jumlah_unit',
                                            width:150
                                        }
                                    ]
                                },
                                {
                                    /* MAIN ROW*/
                                    itemId: 'listUnitContainer',
                                    title: 'List Unit',
                                    layout: 'vbox',
                                    items: [
                                        {
                                            xtype: 'spkgridunit',
                                            width: '100%',
                                            height: 250
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