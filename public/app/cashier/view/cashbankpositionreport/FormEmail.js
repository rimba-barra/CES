Ext.define('Cashier.view.cashbankpositionreport.FormEmail', {
    extend: 'Ext.form.Panel',
    alias: 'widget.cashbankpositionreportformemail',
    layout: 'vbox',
    padding: '0 10 0 10',
    bodyStyle: 'background-color:transparent;',
    border: false,
    uniquename:'_fcashbankpositionreportformemail',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'tbspacer',
                    height: 10
                },
                // {
                //     xtype: 'hiddenfield',
                //     id: 'hideparam',
                //     name: 'hideparam',
                //     value: 'sendemail'
                // },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    width: '100%',
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Subject',
                            name: 'subject',
                            allowBlank: false,
                            width: '100%',
                            // readOnly: true
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    width: '100%',
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'From',
                            name: 'from',
                            allowBlank: false,
                            width: '100%',
                            readOnly: true
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    width: '100%',
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'To',
                            name: 'to',
                            allowBlank: false,
                            width: '100%',
                            readOnly: true
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    width: '100%',
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'CC',
                            name: 'cc',
                            allowBlank: false,
                            width: '100%',
                            readOnly: true
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    width: '100%',
                    items: [
                        {
                            fieldLabel: 'Content',
                            xtype: 'htmleditor',
                            readOnly: true,
                            name: 'content',
                            enableSourceEdit: false,
                            width: '100%',
                            height: 500
                        },
                    ]
                },                
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    ui: 'footer',
                    padding: '0 0 0 0',
                    layout: {
                        padding: 6,
                        type: 'hbox',
                    },
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            width: '100%',
                            margin: '10 0 0 0',
                            items: [
                                {
                                    xtype: 'button',
                                    action: 'send',
                                    itemId: 'btnSend',
                                    iconCls: 'icon-add',
                                    text: 'Send Email',
                                    padding: 5,
                                },
                                {
                                    xtype: 'button',
                                    action: 'cancel',
                                    itemId: 'btnCancel',
                                    iconCls: 'icon-cancel',
                                    padding: 5,
                                    text: 'Cancel',
                                    margin: '0 0 0 5',
                                    handler: function () {
                                        this.up('window').close();
                                    }
                                }
                            ]
                        }
                    ]
                } 
            ],
        });
        me.callParent(arguments);
    },
});
