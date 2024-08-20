Ext.define('Gl.view.accountvssub.FormSearch', {
    extend: 'Ext.form.Panel',
    alias: 'widget.accountvssubformsearch',
    autoScroll: false,
    bodyBorder: false,
    bodyPadding: 0,
    bodyStyle: 'background-color:#dfe8f5;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'search'
                },
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    border: false,
                    bodyStyle: 'background-color:#dfe8f5;',
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
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Data Status',
                    defaultType: 'radiofield',
                    name: 'is_post',
                    itemId: 'is_post',
                    defaults: {
                        flex: 1
                    },
                    layout: 'vbox',
                    items: [
                        {
                            boxLabel: 'Before Posting',
                            name: 'is_post',
                            inputValue: '0',
                            id: 'radio1',
                            itemId: 'radio1',
                        },
                        {
                            boxLabel: 'After Posting',
                            name: 'is_post',
                            inputValue: '1',
                            checked:true,
                            id: 'radio2',
                            itemId: 'radio2',
                        },
                    ]
                },
            ],
        });

        me.callParent(arguments);
    },
 
});
