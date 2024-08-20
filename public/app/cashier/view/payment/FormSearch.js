Ext.define('Cashier.view.payment.FormSearch', {
    extend: 'Ext.form.Panel',
    alias: 'widget.paymentformsearch',
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
                    xtype: 'fieldset',
                    title: 'FILTER DATA',
                    collapsible: false,
                    defaults: {anchor: '100%'},
                    layout: 'vbox',
                    border: false,
                    items: [                        
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
                                    xtype: 'ptusercombobox',
                                    itemId: 'fd_pt_id_11111',
                                    id: 'pt_id_111111',
                                    name: 'pt_id',
                                    fieldLabel: 'PT / Company',
                                    emptyText: 'Select PT / Company',
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                    
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
                                    fieldLabel: 'Periode Date',
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
                            xtype: 'panel',
                            layout: 'vbox',
                            border: false,
                            bodyStyle: 'background-color:#dfe8f5;',
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    fieldLabel: 'Prefix Voucher',
                                    bodyBorder: false,
                                    defaults: {
                                        flex: 1
                                    },
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'voucherprefixcombobox',
                                            itemId: 'fs_voucherprefix_qaz',
                                            id: 'voucherprefix_id_qaz',
                                            name: 'voucherprefix_id',
                                            fieldLabel: '',
                                            width: 385,
                                            emptyText: 'Select Prefix Voucher',
                                            enforceMaxLength: true,
                                            enableKeyEvents: true
                                        },
                                    ]

                                },
                            ]

                        },
                    ]

                },
            ],
        });

        me.callParent(arguments);
    },
});
