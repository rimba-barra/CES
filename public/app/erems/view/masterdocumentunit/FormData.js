Ext.define('Erems.view.masterdocumentunit.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.masterdocumentunitformdata',
    requires: [
        'Erems.view.masterdocumentunit.GridDocument',
    ],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    height: 500,
    editedRow: -1,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
            {
                xtype: 'panel', bodyPadding: 10, title: 'UNIT INFORMATION', collapsible: true,
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
                                                xtype: 'hiddenfield',
                                                name: 'unit_id'
                                            }, 
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

            {
                xtype: 'panel', bodyPadding: 10, title: 'DOCUMENT UNIT', collapsible: true,
                width: '100%',
                items: [
                    {
                        layout: 'hbox',
                        bodyStyle: 'border:0px',
                        width: '100%',
                        items: [{
                            xtype: 'masterdocumentunitgriddocument',
                            width: '100%',
                            itemId: 'MyUnitDocGrid'

                        }]
                    },
                ]
            },

            {
                xtype: 'panel', bodyPadding: 10, title: 'DOWNLOAD DOCUMENT HISTORY', collapsible: true,
                width: '100%',
                items: [
                    {
                        layout: 'hbox',
                        bodyStyle: 'border:0px',
                        width: '100%',
                        items: [{
                            xtype: 'masterdocumentunitgriddocumenthistory',
                            width: '100%',
                            itemId: 'MyUnitDocGrid'

                        }]
                    },
                ]
            },

            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function () {
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
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Cancel',
                        handler: function () {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    }
});