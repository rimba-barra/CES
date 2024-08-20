Ext.define('Cashier.view.tcashadvance.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.tcashadvanceformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 520,
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
                    id: 'hideparam_c',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'kasbon_id',
                    id: 'kasbon_id_c',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'status',
                    id: 'status_za',
                },
               {
                    xtype: 'hiddenfield',
                    name: 'prefix_id',
                    id: 'prefix_id_xs',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'coa_id',
                    id: 'coa_id_xc',
                },
                {xtype: 'tbspacer', height: 10},
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
                            itemId: 'fd_pt_id',
                            id: 'pt_id_hjkk',
                            name: 'pt_id',
                            width: 450,
                            emptyText: 'PT / Company',
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
                            forId: 'lblstatus',
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
                            text: 'UNPROCESS',
                            style: {
                                color: '#ff0000'
                            },
                            itemId: 'fd_lblstatus',
                            id: 'lblstatus_aa',
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
                            xtype: 'datefield',
                            fieldLabel: 'Accept Date',
                            itemId: 'fd_accept_date',
                            id: 'accept_date_cc',
                            name: 'accept_date',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 260,
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
                            xtype: 'textfield',
                            fieldLabel: 'Trans No.',
                            itemId: 'fd_transno',
                            id: 'transno_c',
                            name: 'transno',
                            emptyText: 'Auto Value',
                            width: 200,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Claim Date',
                            itemId: 'fd_claim_date',
                            id: 'claim_date_cc',
                            name: 'claim_date',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 260,
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
                            id: 'voucherprefix_id_cc',
                            name: 'voucherprefix_id',
                            emptyText: '',
                            width: 300,
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
                            fieldLabel: 'Voucher No.',
                            itemId: 'fd_voucher_no',
                            id: 'voucher_no_cc',
                            name: 'voucher_no',
                            emptyText: 'Input manual',
                            width: 445,
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
                            xtype: 'textfield',
                            fieldLabel: 'Account Code',
                            itemId: 'fd_coa',
                            id: 'coa_cc',
                            name: 'coa',
                            emptyText: 'Auto Value',
                            width: 300,
                            readOnly: true,
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
                            xtype: 'textfield',
                            fieldLabel: '',
                            itemId: 'fd_coaname',
                            id: 'coaname_cc',
                            name: 'coaname',
                            emptyText: 'Auto Value',
                            width: 434,
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
                            xtype: 'xmoneyfield',                         
                            anchor: '100%',
                            itemId: 'fd_amount',
                            id: 'amount_cc',
                            name: 'amount',
                            fieldLabel: 'Amount',   
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
                            fieldLabel: 'Cashback',
                            itemId: 'fd_cashback',
                            id: 'cashback_cc',
                            name: 'cashback',
                            emptyText: 'Cashback',
                            width: 300,
                            readOnly: true, 
                            allowBlank: false,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
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
                            fieldLabel: 'Paid',
                            itemId: 'fd_paid',
                            id: 'paid_cc',
                            name: 'paid',
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            emptyText: 'Paid',
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
                            xtype: 'xmoneyfield', 
                            fieldLabel: 'Balance',
                            itemId: 'fd_balance',
                            id: 'balance_cc',
                            name: 'balance',
                            emptyText: 'Balance',
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            width: 300,
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
                            xtype: 'deptprefixcombobox',
                            fieldLabel: 'Departement',
                            itemId: 'fd_department_id',
                            id: 'department_id_c',
                            name: 'department_id',
                            emptyText: '',
                            width: 300,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '50'
                        },
                        {
                            xtype: 'employeecombobox',
                            fieldLabel: 'Made By',
                            itemId: 'fd_made_by',
                            id: 'made_by_cc',
                            name: 'made_by',
                            emptyText: '',
                            width: 300,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },

                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Realisation Expense',
                    defaultType: 'radiofield',
                    layout: 'hbox',
                    items: [
                        {
                            boxLabel: 'YES',
                            name: 'realisation_expence',
                            inputValue: '1',
                            id: 'radio1_cc',
                            allowBlank: false
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            boxLabel: 'NO',
                            name: 'realisation_expence',
                            inputValue: '0',
                            id: 'radio2_cc',
                            allowBlank: false
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Monitoring',
                    defaultType: 'radiofield',
                    layout: 'hbox',
                    items: [
                        {
                            boxLabel: 'YES',
                            name: 'monitoring',
                            inputValue: '1',
                            id: 'radio1_ca',
                            allowBlank: false
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            boxLabel: 'NO',
                            name: 'monitoring',
                            inputValue: '0',
                            id: 'radio2_ca',
                            allowBlank: false
                        }
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
                            id: 'description_c',
                            name: 'description',
                            fieldLabel: 'Description',
                            allowBlank: true,
                            enforceMaxLength: true,
                            grow: true,
                            width: 780,
                        },
                    ]
                },
                {
                    // Fieldset in Column 1
                    xtype: 'fieldset',
                    title: '',
                    collapsible: false,
                    defaults: {anchor: '100%'},
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Special Cashbon',
                            defaultType: 'radiofield',
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel: 'YES',
                                    name: 'status_special',
                                    inputValue: 'Y',
                                    id: 'radio1_caa',
                                    allowBlank: false,
                                },
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                {
                                    boxLabel: 'NO',
                                    name: 'status_special',
                                    inputValue: 'N',
                                    id: 'radio2_caa',
                                    allowBlank: false,
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'vbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'projectptallcombobox',
                                    fieldLabel: 'For Project',
                                    itemId: 'fd_cashbon_projectpt_id',
                                    id: 'cashbon_projectpt_id_c',
                                    name: 'cashbon_projectpt_id',
                                    emptyText: 'Select Project Company',
                                    width: 300,
                                    allowBlank: true,
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null,
                                },
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                 {
                                    xtype: 'employeecashboncombobox',
                                    fieldLabel: 'Cashbon By',
                                    itemId: 'fd_cashbon_create_by',
                                    id: 'cashbon_create_by_cc',
                                    name: 'cashbon_create_by',                                    
                                    emptyText: '',
                                    width: 300,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                            ]
                        },
                    ]
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function () {
        var x = [
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
                        xtype: 'splitter',
                        width: '500'
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
                                xtype: 'button',
                                action: 'cashback',
                                itemId: 'btnCashback',
                                padding: 5,
                                width: 75,
                                iconCls: '',
                                text: 'Cashback'
                            },
                            {
                                xtype: 'button',
                                action: 'uncashback',
                                itemId: 'btnUncashback',
                                padding: 5,
                                width: 75,
                                iconCls: '',
                                text: 'UnCashback'
                            },
                            {
                                xtype: 'button',
                                action: 'save',
                                itemId: 'btnSave',
                                padding: 5,
                                width: 75,
                                iconCls: 'icon-save',
                                text: 'Save'
                            },
                            {
                                xtype: 'button',
                                action: 'cancel',
                                itemId: 'btnCancel',
                                padding: 5,
                                width: 75,
                                iconCls: 'icon-cancel',
                                text: 'Cancel',
                                handler: function () {
                                    this.up('window').close();
                                }
                            },
                        ]
                    },
                ]
            }
        ];
        return x;
    }
});

