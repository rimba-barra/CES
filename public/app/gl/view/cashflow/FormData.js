Ext.define('Gl.view.cashflow.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.cashflowformdata',
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
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
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
                            fieldLabel: 'With Detail',
                            padding: '0 0 0 20px',
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel: 'Yes',
                                    xtype: 'radiofield',
                                    name: 'statusdetail',
                                    inputValue: '1',
                                    id: 'radiodetail1',
                                    checked: true,
                                },
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                {
                                    boxLabel: 'No',
                                    xtype: 'radiofield',
                                    name: 'statusdetail',
                                    inputValue: '2',
                                    id: 'radiodetail2'
                                },
                            ]
                        }
                    ]
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
                            fieldLabel: 'Account COA',
                            defaultType: 'datefield',
                            bodyBorder: false,
                            defaults: {
                                flex: 3
                            },
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'coacombogrid',
                                    itemId: 'fsms_fromcoa',
                                    name: 'fromcoa',
                                    emptyText: 'FROM COA',
                                    enforceMaxLength: true,
                                    maxLength: 20,
                                    enableKeyEvents: true
                                },
                                {
                                    xtype: 'label',
                                    forId: 'myFieldId',
                                    text: ' to',
                                    margin: '0 20 0 30'
                                },
                                {
                                    xtype: 'coacombogrid',
                                    itemId: 'fsms_untilcoa',
                                    name: 'untilcoa',
                                    emptyText: 'UNTIL COA',
                                    enforceMaxLength: true,
                                    maxLength: 20,
                                    enableKeyEvents: true
                                },
                            ]

                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            border: false,
                            bodyStyle: 'background-color:#dfe8f5;',
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    fieldLabel: 'Transaction Date',
                                    defaultType: 'datefield',
                                    bodyBorder: false,
                                    defaults: {
                                        flex: 3
                                    },
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            itemId: 'fsms_fromdate',
                                            name: 'fromdate',
                                            emptyText: 'From Date',
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            enableKeyEvents: true,
                                            format: 'd-m-Y',
                                            submitFormat: 'Y-m-d'
                                        },
                                        {
                                            xtype: 'label',
                                            forId: 'myFieldId',
                                            text: ' to',
                                            margin: '0 20 0 30'
                                        },
                                        {
                                            xtype: 'datefield',
                                            itemId: 'fsms_untildate',
                                            name: 'untildate',
                                            emptyText: 'Until Date',
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            enableKeyEvents: true,
                                            format: 'd-m-Y',
                                            submitFormat: 'Y-m-d'
                                        }

                                    ]

                                },
                            ]

                        },
                    ]
                }, 
               {
                    xtype: 'tbspacer',
                    height: 20
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    padding: '0 0 0 200px',
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
