Ext.define('Cashier.view.tloan.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.tloanformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 500,
    bodyBorder: true,
    bodyPadding: 10,
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
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'loan_id',
                    id: 'loan_id_qasdf',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'coa_id',
                    id: 'coa_id_waqdd',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'coa',
                    id: 'coa_waqdd',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'coa_desc',
                    id: 'coa_desc_waqdd',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'prefix_id',
                    id: 'loan_id_qwdf',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'status',
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
                            itemId: 'fd_pt_id_zxcc',
                            id: 'pt_id_ccc',
                            name: 'pt_id',
                            width: 500,
                            emptyText: 'Pt / Company',
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'label',
                            forId: 'lblstatus',
                            text: 'Status',
                            width: 100,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'label',
                            forId: 'lblstatus',
                            text: '',
                            style: {
                                color: '#ff0000'
                            },
                            itemId: 'fd_lblstatus_az',
                            id: 'lblstatus_zx',
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
                            itemId: 'fd_voucherprefix_5678',
                            id: 'voucherprefix_id_5678',
                            name: 'voucherprefix_id',
                            emptyText: '',
                            width: 300,
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '',
                            itemId: 'fd_loan_no_5678',
                            id: 'loan_no_5678',
                            name: 'loan_no',
                            emptyText: 'Voucher No',
                            width: 190,
                            readOnly: true,
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
                            xtype: 'datefield',
                            fieldLabel: 'Loan Date',
                            itemId: 'fd_loan_date_22',
                            id: 'loan_date_22',
                            name: 'loan_date',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 300,
                            emptyText: 'Manual Input',
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
                            xtype: 'typeloancombobox',
                            fieldLabel: 'Type Loan',
                            itemId: 'fd_loantype_id',
                            id: 'loantype_id_qaz',
                            name: 'loantype_id',
                            emptyText: '',
                            width: 300,
                            readOnly: false,
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
                            xtype: 'deptprefixcombobox',
                            fieldLabel: 'Departement',
                            itemId: 'fd_department_id_wwxc',
                            id: 'department_id_wwxc',
                            name: 'department_id',
                            emptyText: '',
                            width: 500,
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
                            xtype: 'loanercombobox',
                            fieldLabel: 'Loaner',
                            itemId: 'fd_loaner_id_wwxc',
                            id: 'loaner_id_wwxc',
                            name: 'loaner_id',
                            emptyText: '',
                            width: 500,
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
                            xtype: 'xmoneyfield',
                            minValue: 0,
                            itemId: 'fs_amount_sddf',
                            name: 'amount',
                            id: 'amount_sddf',
                            fieldLabel: 'Amount',
                            emptyText: 'Manual Input',
                            width: 250,
                            // Remove spinner buttons, and arrow key and mouse wheel listeners
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            readOnly: false,
                            allowBlank: true,
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maxLength: 20,
                        },
                        {
                            xtype: 'splitter',
                            width: '15'
                        },
                        {
                            xtype: 'xmoneyfield',
                            minValue: 0,
                            itemId: 'fs_paid_sddf',
                            name: 'paid',
                            id: 'paid_sddf',
                            fieldLabel: 'Total Payment',
                            emptyText: 'Manual Input',
                            width: 250,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            readOnly: true,
                            allowBlank: true,
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maxLength: 20,
                        },
                        {
                            xtype: 'splitter',
                            width: '15'
                        },
                        {
                            xtype: 'xmoneyfield',
                            minValue: 0,
                            itemId: 'fs_remaining_sddf',
                            name: 'remaining',
                            id: 'remaining_sddf',
                            fieldLabel: 'Remaining',
                            emptyText: 'Manual Input',
                            width: 250,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            readOnly: true,
                            allowBlank: true,
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maxLength: 20,
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
                            itemId: 'fdms_description_wcv',
                            id: 'description_wcv',
                            name: 'description',
                            fieldLabel: 'Description',
                            allowBlank: true,
                            enforceMaxLength: true,
                            grow: true,
                            width: 784,
                        },
                    ]
                },
                {
                    // Fieldset in Column 1
                    xtype: 'fieldset',
                    title: 'LOAN PAYMENT',
                    collapsible: false,
                    defaults: {anchor: '100%'},
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'tloangriddetail',
                            itemId: 'fd_tloangriddetail',
                            id: 'tloangriddetail',
                            name: 'tloangriddetail',
                            title: 'LOAN PAYMENT',
                            width: '98%',
                            height: 200,
                            padding: '20px 0 0 20px',
                        },
                    ]
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

