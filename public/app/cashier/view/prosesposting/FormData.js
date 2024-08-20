Ext.define('Cashier.view.prosesposting.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.prosespostingformdata',   
    height: 250,
    width: 1024,
    layout: 'vbox',
    bodyStyle: 'background-color:#dfe8f5;',
    requires: [
        'Cashier.library.template.component.Ptbyusercombobox',
    ],
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [   
                {
                    xtype: 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    bodyStyle: 'background-color:#dfe8f5;',
                    border: false,                  
                    items: [
                        
                        {
                            xtype: 'splitter',
                            width: '20'
                        },	
                        {
                            xtype: 'combobox',
                            name: 'tipeposting',
                            fieldLabel: 'Posting Type',
                            queryMode: 'local',
                            valueField: 'tipeposting',
                            allowBlank: false,
                            forceSelection: true,
                            msgTarget: "side",
                            blankText: 'This should not be blank!',
                            displayField: 'description',
                            value: '',
                            store: new Ext.data.JsonStore({
                                fields: ['tipeposting', 'description'],
                                data: [
                                    {status: 'voucher', description: 'Voucher'}
                                    //{status: 'journal', description: 'Journal'},
                                ]
                            }),
                        },  
                    ]
                },  
                {
                    xtype: 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    bodyStyle: 'background-color:#dfe8f5;',
                    border: false,                  
                    items: [
                        
                        {
                            xtype: 'splitter',
                            width: '20'
                        },	
                        {
                            xtype: 'ptbyusercombobox',
                            itemId: 'fs_pt_id',
                            name: 'projectpt_id',
                        },
                    ]
                },  
                {
                    xtype: 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    bodyStyle: 'background-color:#dfe8f5;',
                    border: false,                  
                    items: [
                        {
                            xtype: 'hiddenfield',
                            name: 'hideparam',
                            value: 'default'
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'From',
                            emptyText: 'From',
                            name: 'fromdate',
                            allowBlank: false,
                            enableKeyEvents: true,
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d'
                        },
                        {
                            xtype: 'label',
                            forId: 'myFieldId',
                            text: 'To',
                            margin: '2 30 0 30'
                        },
                        {   
                            xtype: 'datefield',
                            emptyText: 'Untildate',
                            name: 'untildate',
                            allowBlank: false,
                            enableKeyEvents: true,
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d'
                        },
                    ]
                },
                {
                    xtype: 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    padding: '0 0 0 350px',
                    items: [
                        {
                            xtype: 'button',
                            action: 'submit',
                            itemId: 'btnSubmit',
                            iconCls: 'icon-submit',
                            text: 'Submit',
                            padding: 5,
                        },
                        {
                            xtype: 'button',
                            action: 'cancel',
                            itemId: 'btnCancel',
                            iconCls: 'icon-cancel',
                             padding: 5,
                            text: 'Cancel',
                            handler: function () {
                                this.up('window').close();
                            }
                        }
                    ]
                }
            ],
        });
        me.callParent(arguments);
    },
});
