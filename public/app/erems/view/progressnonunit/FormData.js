Ext.define('Erems.view.progressnonunit.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.progressnonunitformdata',
    requires:['Erems.view.progressnonunit.GridDetail'],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 450,
    bodyBorder: true,
    itemId: 'ProgressNonUnitFormData',
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

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'spk_spk_id'
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    width: '100%',
                    defaults: {
                        xtype: 'container',
                        layout: 'vbox',
                        width: '100%',
                        flex: 1
                    },
                    items: [
                        {
                            margin: '0 20px 0 0',
                            defaults: me.textFieldDefault(true),
                            items: [
                                {
                                    fieldLabel: 'SPK Code',
                                    name: 'code'
                                },
                                {
                                    fieldLabel: 'SPK Number',
                                    name: 'spk_no'
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        xtype: 'textfield',
                                        padding: '5px 0 0 0',
                                        width: '100%',
                                        flex: 1
                                    },
                                    items: [
                                        {
                                            fieldLabel: 'Contractor',
                                            name: 'contractor_code',
                                            readOnly:true,
                                            margin: '5px 10px 0 0'
                                        },
                                        {
                                            fieldLabel: '',
                                            readOnly:true,
                                            name: 'contractor_contractorname'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            defaults: me.textFieldDefault(true),
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: me.textFieldDefault(true),
                                    items: [
                                        {
                                            fieldLabel: 'Progress',
                                            name: 'progress',
                                            flex: 1,
                                            margin: '0 10px 0 0'
                                        },
                                        {
                                            xtype: 'label',
                                            text: '%',
                                            width: 200
                                        }
                                    ]
                                },
                                {
                                    fieldLabel: 'SPK Date',
                                    name: 'spk_date',
                                    xtype:'datefield',
                                    format:'Y-m-d'
                                },
                                {
                                    fieldLabel: 'SPK Type',
                                    name: 'spktype_spktype'
                                }

                            ]
                        }
                    ]
                },
                {
                    xtype      : 'xaddressfieldEST',
                    fieldLabel : 'Cont. Address',
                    labelWidth : '23px',
                    readOnly   : true,
                    padding    : '10px 0 0 0',
                    width      : "100%"
                },
                {
                    xtype: 'container',
                    width: '100%',
                    layout: 'hbox',
                    defaults: {
                        xtype: 'container',
                        layout: 'vbox',
                        width: '100%',
                        flex: 1
                    },
                    items: [
                        {
                            margin: '0 20px 0 110px',
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
                {
                    xtype: 'container',
                    layout: 'vbox',
                    width: '100%',
                    margin: '0 350px 0 0',
                    defaults: me.textFieldDefault(true),
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: me.textFieldDefault(true),
                            items: [
                                {
                                    fieldLabel: 'Implement Time',
                                    name: 'time_duration',
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
                                    fieldLabel: 'Time frame',
                                    name:'started',
                                    readOnly:true,
                                    flex: 6,
                                    xtype:'datefield',
                                    format:'d-m-Y',
                                },
                                {
                                    xtype: 'label',
                                    margin: '0 0 0 10',
                                    text: 'to',
                                    flex: 1
                                },
                                {
                                    
                                    xtype:'datefield',
                                    format:'d-m-Y',
                                    fieldLabel: '',
                                    readOnly:true,
                                    name:'ended',
                                    flex: 3
                                }
                            ]
                        },
                        {
                            fieldLabel: 'Job Fee',
                            name: 'job_fee'
                        },
                        {
                            fieldLabel: 'Job Title',
                            name: 'job_title'
                        }
                    ]
                },
                {
                    xtype      : 'xnotefieldEST',
                    fieldLabel : 'Job Description',
                    labelWidth : '23px',
                    readOnly   : true,
                    name       : 'description',
                    padding    : '10px 0 20px 0',
                    width      : "100%"
                },
                {xtype: 'panel', bodyPadding: 10, title: 'Detail Progress', collapsible: true,
                    width: '100%',
                    items: [
                        {
                            xtype:'progressnonunitgriddetail',
                            itemId:'ProgressGridDetail',
                            height:250,
                            width:'100%'
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
                action: 'cancel',
                itemId: 'btnCancel',
                padding: 5,
                width: 75,
                iconCls: 'icon-cancel',
                text: 'Close',
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