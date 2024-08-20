Ext.define('Cashier.view.postingstepsatu.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.postingstepsatuformsearch',
    uniquename: '_fspostingstepsatu',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'hiddenfield',
                    id: 'hideparam' + me.uniquename,
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    id: 'prefix_id' + me.uniquename,
                    name: 'prefix_id',
                },
                {
                    xtype: 'ptusercombobox',
                    fieldLabel: 'Pt / Company',
                    itemId: 'pt_id' + me.uniquename,
                    id: 'pt_id' + me.uniquename,
                    name: 'pt_id',
                    emptyText: '',
                    width: 200,
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    border: false,
                    bodyStyle: 'background-color:#dfe8f5;',
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Periode Date',
                            defaultType: 'datefield',
                            bodyBorder: false,
                            defaults: {
                                flex: 3
                            },
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'datefield',
                                    itemId: 'fromdate' + me.uniquename,
                                    id: 'fromdate' + me.uniquename,
                                    name: 'fromdate',
                                    emptyText: 'From Date',
                                    enforceMaxLength: true,
                                    maxLength: 10,
                                    enableKeyEvents: true,
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    width: 150,
                                },
                                {
                                    xtype: 'label',
                                    forId: 'myFieldId',
                                    text: ' to',
                                    margin: '0 40 0 30'
                                },
                                {
                                    xtype: 'datefield',
                                    itemId: 'untildate' + me.uniquename,
                                    id: 'untildate' + me.uniquename,
                                    name: 'untildate',
                                    emptyText: 'Until Date',
                                    enforceMaxLength: true,
                                    maxLength: 10,
                                    enableKeyEvents: true,
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    width: 150,
                                }

                            ]

                        },
                    ]

                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'vbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    padding: '0 0 0 100px',
                    items: [
                        {
                            xtype: 'voucherprefixcombobox',
                            fieldLabel: 'Prefix',
                            itemId: 'fd_voucherprefix_id' + me.uniquename,
                            id: 'voucherprefix_id' + me.uniquename,
                            name: 'voucherprefix_id',
                            emptyText: '',
                            width: 200,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                    ]
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
