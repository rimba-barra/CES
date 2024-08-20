Ext.define('Gl.view.copyjournal.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.copyjournalformdata',
    layout: 'vbox',
    bodyStyle: 'background-color:#dfe8f5;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'combo',
                    padding: '0 0 0 20px',
                    fieldLabel: 'Voucher Year',
                    name: 'voucheryear',                  
                    allowBlank: false,
                },
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    bodyStyle: 'background-color:#dfe8f5;',
                    border: false,
                    padding: '0 0 0 20px',
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Voucher Status',
                            padding: '0 0 0 20px',
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel: 'Before Posting',
                                    xtype: 'radiofield',
                                    name: 'statusposting',
                                    inputValue: '0',
                                    id: 'radio1'
                                },
                                {
                                    xtype: 'splitter',
                                    width: '50'
                                },
                                {
                                    boxLabel: 'After Posting',
                                    xtype: 'radiofield',
                                    name: 'statusposting',
                                    inputValue: '1',
                                    id: 'radio2'
                                }
                            ]
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    bodyStyle: 'background-color:#dfe8f5;',
                    border: false,
                    padding: '0 0 0 20px',
                    items: [
                        {
                            xtype: 'hiddenfield',
                            name: 'hideparam',
                            value: 'default'
                        },
                        {
                            // Fieldset in Column 1
                            xtype: 'fieldset',
                            columnWidth: 0.5,
                            title: 'From Voucher',
                            collapsible: false,
                            defaults: {anchor: '100%'},
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'combo',
                                    fieldLabel: 'Prefix Voucher',
                                    emptyText: 'Select Prefix',
                                    name: 'fromprefix_id',
                                    allowBlank: false,
                                },
                                {
                                    xtype: 'combo',
                                    fieldLabel: 'Voucher No',
                                    emptyText: 'Select Voucher Number',
                                    name: 'fromvoucherno',
                                    allowBlank: false,
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Voucher Date',
                                    emptyText: 'Voucher Date',
                                    name: 'fromvoucherdate',
                                    allowBlank: false,
                                    enableKeyEvents: true,
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d'
                                }
                            ]
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            // Fieldset in Column 2
                            xtype: 'fieldset',
                            columnWidth: 0.5,
                            title: 'To Voucher',
                            collapsible: false,
                            defaults: {anchor: '100%'},
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'combo',
                                    fieldLabel: 'Prefix Voucher',
                                    emptyText: 'Select Prefix',
                                    name: 'untilprefix_id',
                                    allowBlank: false,
                                },
                                {
                                    xtype: 'combo',
                                    fieldLabel: 'Voucher No',
                                    emptyText: 'Select Voucher Number',
                                    name: 'untilvoucherno',
                                    allowBlank: false,
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Voucher Date',
                                    emptyText: 'Voucher Date',
                                    name: 'untilvoucherdate',
                                    allowBlank: false,
                                    enableKeyEvents: true,
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d'
                                }
                            ]
                        },
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    padding: '0 0 0 180px',
                    items: [
                        {
                            xtype: 'button',
                            action: 'process',
                            itemId: 'btnProcess',
                            iconCls: 'icon-submit',
                            text: 'Process',
                            padding: 5,
                        },
                        {
                            xtype: 'button',
                            action: 'view',
                            itemId: 'btnView',
                            iconCls: 'icon-submit',
                            text: 'View old voucher',
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
