Ext.define('Cashier.view.rcashadvance.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.rcashadvanceformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 370,
    bodyBorder: true,
    bodyPadding: 10,
    uniquename: "_rcashadvance",
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    id: 'default' + me.uniquename,
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'status',
                    id: 'status' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'statusdata',
                    id: 'statusdata' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'project_id',
                    id: 'project_id' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'kasbon_id',
                    id: 'kasbon_id' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'prefix_id',
                    id: 'prefix_id' + me.uniquename,
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'ptusercombobox',
                            fieldLabel: 'Pt/Company',
                            itemId: 'fd_pt_id' + me.uniquename,
                            id: 'pt_id' + me.uniquename,
                            name: 'pt_id',
                            width: 400,
                            emptyText: 'Pt / Company',
                            readOnly: true,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '30'
                        },
                        {
                            xtype: 'label',
                            forId: 'textstatus',
                            name: 'textstatus',
                            text: 'Cash Advance Status',
                            width: 200,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'label',
                            forId: 'lblstatus',
                            text: 'OPEN',
                            style: {
                                color: '#ff0000'
                            },
                            itemId: 'lblstatus' + me.uniquename,
                            id: 'lblstatus' + me.uniquename,
                            name: 'lblstatus',
                            width: 100,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'voucherprefixcombobox',
                            fieldLabel: 'Prefix - Voucher No.',
                            itemId: 'fd_voucherprefix_id',
                            id: 'voucherprefix_id' + me.uniquename,
                            name: 'voucherprefix_id',
                            emptyText: '',
                            width: 300,
                            readOnly: true,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '50'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Voucher No.',
                            itemId: 'fd_voucher_no',
                            id: 'voucher_no' + me.uniquename,
                            name: 'voucher_no',
                            emptyText: 'Input manual',
                            width: 250,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Revision Date',
                            itemId: 'fd_revision_date',
                            id: 'revision_date' + me.uniquename,
                            name: 'revision_date',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 260,
                            emptyText: 'Manual Input',
                            hidden: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'xmoneyfield',
                            anchor: '100%',
                            itemId: 'fd_amount_revision',
                            id: 'amount_revision' + me.uniquename,
                            name: 'amount_revision',
                            fieldLabel: 'New Amount',
                            emptyText: 'Manual Input',
                            value: 0,
                            width: 300,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: true,
                            readOnly: false,
                            allowBlank: false,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '50'
                        },
                        {
                            xtype: 'xmoneyfield',
                            anchor: '100%',
                            itemId: 'fd_amount',
                            id: 'amount' + me.uniquename,
                            name: 'amount',
                            fieldLabel: 'Old Amount',
                            emptyText: 'Manual Input',
                            value: 0,
                            width: 300,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: true,
                            readOnly: true,
                            allowBlank: false,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'xmoneyfield',
                            anchor: '100%',
                            itemId: 'fd_paid_revision',
                            id: 'paid_revision' + me.uniquename,
                            name: 'paid_revision',
                            fieldLabel: 'New Realization',
                            emptyText: 'Manual Input',
                            value: 0,
                            width: 300,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: true,
                            readOnly: true,
                            allowBlank: false,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '50'
                        },
                        {
                            xtype: 'xmoneyfield',
                            anchor: '100%',
                            itemId: 'fd_paid',
                            id: 'paid' + me.uniquename,
                            name: 'paid',
                            fieldLabel: 'Old Realization',
                            emptyText: 'Manual Input',
                            value: 0,
                            width: 300,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: true,
                            readOnly: true,
                            allowBlank: false,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'xmoneyfield',
                            anchor: '100%',
                            itemId: 'fd_remaining_balance_revision',
                            id: 'remaining_balance_revision' + me.uniquename,
                            name: 'remaining_balance_revision',
                            fieldLabel: 'New Balance',
                            emptyText: 'Manual Input',
                            value: 0,
                            width: 300,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: true,
                            readOnly: true,
                            allowBlank: false,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '50'
                        },
                        {
                            xtype: 'xmoneyfield',
                            anchor: '100%',
                            itemId: 'fd_balance',
                            id: 'balance' + me.uniquename,
                            name: 'balance',
                            fieldLabel: 'Old Balance',
                            emptyText: 'Manual Input',
                            value: 0,
                            width: 300,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: true,
                            readOnly: true,
                            allowBlank: false,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'textareafield',
                            itemId: 'fdms_description',
                            id: 'revision_note' + me.uniquename,
                            name: 'revision_note',
                            fieldLabel: 'Description',
                            allowBlank: false,
                            enforceMaxLength: true,
                            grow: true,
                            width: 645,
                        },
                    ]
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

