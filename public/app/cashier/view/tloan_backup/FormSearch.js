Ext.define('Cashier.view.tloan.FormSearch', {
    extend: 'Ext.form.Panel',
    alias: 'widget.tloanformsearch',
    autoScroll: false,
    bodyBorder: false,
    border: false,
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
                            layout: 'hbox',
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
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    fieldLabel: 'Loan Date',
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
                            layout: 'hbox',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            padding: '0 0 0 100px',
                            items: [
                                {
                                    xtype: 'combo',
                                    itemId: 'fd_department_id_11111',
                                    id: 'department_id_111111',
                                    name: 'department_id',
                                    fieldLabel: 'Department',
                                    emptyText: 'Select Department',
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null

                                },
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background-color:#dfe8f5;',
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',
                                            fieldLabel: 'Status',
                                            bodyBorder: false,
                                            defaults: {
                                                flex: 1
                                            },
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'combo',
                                                    itemId: 'fs_status_qaz',
                                                    id: 'status__qaz',
                                                    name: 'status__id',
                                                    fieldLabel: '',
                                                    emptyText: 'Select OPEN/CLOSE/ALL',
                                                    enforceMaxLength: true,
                                                    enableKeyEvents: true
                                                },
                                            ]

                                        },
                                    ]

                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            padding: '0 0 0 100px',
                            items: [
                                {
                                    xtype: 'combo',
                                    itemId: 'fd_loaner_id_11111',
                                    id: 'loaner_id_111111',
                                    name: 'loaner_id',
                                    fieldLabel: 'Loaner',
                                    emptyText: 'Select Loaner',
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null

                                },
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
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
                                                    emptyText: 'Select Prefix',
                                                    enforceMaxLength: true,
                                                    enableKeyEvents: true
                                                },
                                            ]

                                        },
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
                            padding: '0 0 0 0px',
                            items: [
                                {
                                    xtype: 'textfield',
                                    itemId: 'fdms_loan_no',
                                    name: 'loan_no',
                                    fieldLabel: 'Voucher No.',
                                    allowBlank: false,
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 20,
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            padding: '0 0 0 0px',
                            items: [
                                {
                                    xtype: 'button',
                                    action: 'search',
                                    itemId: 'btnSearch',
                                    padding: 5,
                                    width: 75,
                                    iconCls: 'icon-search',
                                    text: 'Search'
                                },
                                {
                                    xtype: 'button',
                                    action: 'reset',
                                    itemId: 'btnReset',
                                    padding: 5,
                                    width: 75,
                                    iconCls: 'icon-reset',
                                    text: 'Reset'
                                }
                            ]
                        },
                    ]
                },
            ],
        });

        me.callParent(arguments);
    },
});
