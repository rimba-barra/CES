Ext.define('Erems.view.progressunit.FormDataDetail', {
    extend: 'Erems.library.template.view.FormData',
    requires: ['Erems.view.progressunit.GridImage'],
    alias: 'widget.progressunitformdatadetail',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 400,
    bodyBorder: true,
    itemId: 'ProgressunitFormdataDetail',
    bodyPadding: 10,
    bodyStyle: 'padding:5px 5px 0;background-color:#ffffff;',
    editedRow: -1,
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
                    name: 'construction_id'
                },
                {
                    xtype: 'container',
                    width: '100%',
                    layout: 'vbox',
                    
                    items: [
                        {
                            xtype: 'textfield',
                            width: 400,
                            name: 'spk_spk_no',
                            fieldLabel: 'SPK No.',
                            readOnly: true,
                        },
                        {
                            xtype: 'textfield',
                            width: 200,
                            name: 'unit_unit_number',
                            fieldLabel: 'Unit Number',
                            readOnly: true,
                        },
                        {
                            xtype: 'container',
                            width: '100%',
                            layout: 'hbox',
                            margin:'0 0 5px 0',
                            defaults: {
                                xtype: 'textfield',
                                width: '100%',
                                readOnly: true,
                            },
                            items: [
                                {
                                    name: 'cluster_code',
                                    fieldLabel: 'Kawasan / Cluster',
                                    flex: 1,
                                    margin: '0 5px 0 0'
                                },
                                {
                                    name: 'cluster_cluster',
                                    fieldLabel: '',
                                    flex: 1
                                }
                            ]

                        },
                        {
                            xtype: 'container',
                            width: '100%',
                            layout: 'hbox',
                            defaults: {
                                xtype: 'textfield',
                                width: '100%',
                                readOnly: true,
                            },
                            items: [
                                {
                                    name: 'block_code',
                                    fieldLabel: 'Block',
                                    flex: 1,
                                    margin: '0 5px 0 0'
                                },
                                {
                                    name: 'block_block',
                                    fieldLabel: '',
                                    flex: 1
                                }
                            ]

                        },
                        {
                            xtype: 'container',
                            width: '100%',
                            layout: 'hbox',
                            defaults: {
                                width: '100%',
                                margin: '5px 10px 0 0'
                            },
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Progress Date',
                                    name: 'progress_date',
                                    format: 'd-m-Y',
                                    value: new Date(),
                                    flex: 3,
                                    editable:false,
                                },
                                {
                                    xtype      : 'xnumericfieldEST',
                                    fieldLabel : 'Progress',
                                    allowBlank : false,
                                    name       : 'progress_persen',
                                    flex       : 2,
                                    maxLength  : 3,
                                    listeners  : {
                                        'change': function (thisField) {
                                            if(thisField.getValue() >= 100){
                                                thisField.setValue(100);
                                            }else if(thisField.getValue() < 0){
                                                thisField.setValue(0);
                                            }
                                        }
                                    },
                                },
                                {
                                    xtype: 'label',
                                    text: '%',
                                    width: 20,
                                    margin: '5px 0 0 10px'

                                }
                            ]
                        },
                        {
                            xtype      : 'xnotefieldEST',
                            fieldLabel : 'Note',
                            name       : 'notes',
                            width      : '100%',
                            margin     : '5px 0 0 0',
                        }
                    ]
                },
                {
                    xtype: 'progressgridimage',
                    width: '100%',
                    itemId: 'ProgressGridImage',
                    height: 200,
                    margin: '10px 5px'
                },
                {
                    xtype: 'checkbox',
                    name: 'send_mail',
                    inputValue: 1,
                    boxLabel: 'Send email progress to Customer'
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