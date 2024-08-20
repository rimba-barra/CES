Ext.define('Cashier.view.tcashadvance.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.tcashadvanceformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 550,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    uniquename: "_fdtcashadvance",
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
                    id: 'hideparam' + me.uniquename,
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'chequegiro_status',
                    id: 'chequegiro_status' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'fixed_coa',
                    id: 'fixed_coa' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'kasbon_id',
                    id: 'kasbon_id' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'prefix',
                    id: 'prefix' + me.uniquename,
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
                    name: 'prefix_id',
                    id: 'prefix_id' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'coa_id',
                    id: 'coa_id' + me.uniquename,
                },
                {
                    xtype: 'tbspacer',
                    height: 10
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
                            forId: 'textstatus' + me.uniquename,
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
                            forId: 'lblstatus' + me.uniquename,
                            text: 'UNPROCESS',
                            style: {
                                color: '#ff0000'
                            },
                            itemId: 'fd_lblstatus' + me.uniquename,
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
                            xtype: 'typecashboncombobox',
                            fieldLabel: 'Type Trans',
                            itemId: 'fd_kasbongiro' + me.uniquename,
                            id: 'kasbongiro' + me.uniquename,
                            name: 'kasbongiro',
                            width: 300,
                            emptyText: 'Please Select',
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
                            xtype: 'inoutcombobox',
                            fieldLabel: 'Data Flow',
                            itemId: 'fd_dataflow' + me.uniquename,
                            id: 'dataflow' + me.uniquename,
                            name: 'dataflow',
                            width: 200,
                            emptyText: 'Please Select',
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
                            fieldLabel: 'Due Date',
                            itemId: 'fd_due_date' + me.uniquename,
                            id: 'due_date' + me.uniquename,
                            name: 'due_date',
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
                            xtype: 'datefield',
                            fieldLabel: 'Accept Date',
                            itemId: 'fd_accept_date' + me.uniquename,
                            id: 'accept_date' + me.uniquename,
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
                            itemId: 'fd_transno' + me.uniquename,
                            id: 'transno' + me.uniquename,
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
                            itemId: 'fd_claim_date' + me.uniquename,
                            id: 'claim_date' + me.uniquename,
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
                            itemId: 'fd_voucherprefix_id' + me.uniquename,
                            id: 'voucherprefix_id' + me.uniquename,
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
                            itemId: 'fd_voucher_no' + me.uniquename,
                            id: 'voucher_no' + me.uniquename,
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
                            xtype: 'kasbondeptapprovecombobox',
                            fieldLabel: 'Kasbon Department',
                            itemId: 'fd_kasbondept_id' + me.uniquename,
                            id: 'kasbondept_id' + me.uniquename,
                            name: 'kasbondept_id',
                            width: 400,
                            emptyText: 'Please Select',
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
                            xtype: 'textfield',
                            fieldLabel: 'Cheque / Giro No.',
                            itemId: 'fd_chequegiro_no' + me.uniquename,
                            id: 'chequegiro_no' + me.uniquename,
                            name: 'chequegiro_no',
                            emptyText: 'Manual Input',
                            width: 730,
                            readOnly: false,
                            hidden: true,
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
                            fieldLabel: 'Cheque Giro Date',
                            itemId: 'fd_chequegiro_date' + me.uniquename,
                            id: 'chequegiro_date' + me.uniquename,
                            name: 'chequegiro_date',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 260,
                            emptyText: 'Manual Input',
                            hidden: true,
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
                            xtype: 'datefield',
                            fieldLabel: 'Payment Date',
                            itemId: 'fd_chequegiro_payment_date' + me.uniquename,
                            id: 'chequegiro_payment_date' + me.uniquename,
                            name: 'chequegiro_payment_date',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            emptyText: '',
                            width: 260,
                            hidden: true,
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
                            fieldLabel: 'Receive Date',
                            itemId: 'fd_chequegiro_receive_date' + me.uniquename,
                            id: 'chequegiro_receive_date' + me.uniquename,
                            name: 'chequegiro_receive_date',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            emptyText: 'Manual Input',
                            width: 260,
                            hidden: true,
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
                            xtype: 'datefield',
                            fieldLabel: 'Release Date',
                            itemId: 'chequegiro_release_date' + me.uniquename,
                            id: 'chequegiro_release_date' + me.uniquename,
                            name: 'chequegiro_release_date',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            emptyText: 'Manual Input',
                            hidden: true,
                            width: 260,
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
                            xtype: 'textfield',
                            fieldLabel: 'Account Code',
                            itemId: 'fd_coa' + me.uniquename,
                            id: 'coa' + me.uniquename,
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
                            itemId: 'fd_coaname' + me.uniquename,
                            id: 'coaname' + me.uniquename,
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
                            itemId: 'fd_amount' + me.uniquename,
                            id: 'amount' + me.uniquename,
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
                            itemId: 'fd_cashback' + me.uniquename,
                            id: 'cashback' + me.uniquename,
                            name: 'cashback',
                            emptyText: 'Cashback',
                            width: 300,
                            readOnly: true,
                            hidden: false,
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
                            itemId: 'fd_paid' + me.uniquename,
                            id: 'paid' + me.uniquename,
                            name: 'paid',
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            emptyText: 'Paid',
                            width: 300,
                            hidden: false,
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
                            itemId: 'fd_balance' + me.uniquename,
                            id: 'balance' + me.uniquename,
                            name: 'balance',
                            emptyText: 'Balance',
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            width: 300,
                            readOnly: true,
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
                            xtype: 'deptprefixcombobox',
                            fieldLabel: 'Departement',
                            itemId: 'fd_department_id' + me.uniquename,
                            id: 'department_id' + me.uniquename,
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
                            itemId: 'fd_made_by' + me.uniquename,
                            id: 'made_by' + me.uniquename,
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
                    id: 'realisation_expence',
                    fieldLabel: 'Realisation Expense',
                    defaultType: 'radiofield',
                    hidden: false,
                    layout: 'hbox',
                    items: [
                        {
                            boxLabel: 'YES',
                            name: 'realisation_expence',
                            inputValue: '1',
                            id: 'radio1_cc',
                            allowBlank: false,
                            hidden: false,
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
                            allowBlank: false,
                            hidden: false,
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Monitoring',
                    defaultType: 'radiofield',
                    id: 'monitoring',
                    hidden: false,
                    layout: 'hbox',
                    items: [
                        {
                            boxLabel: 'YES',
                            name: 'monitoring',
                            inputValue: '1',
                            id: 'radio1_ca',
                            allowBlank: false,
                            hidden: false,
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
                            allowBlank: false,
                            hidden: false,
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
                            itemId: 'fdms_description' + me.uniquename,
                            id: 'description' + me.uniquename,
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
                    id: 'otherproject',
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
                                    xtype: 'projectptforcashboncombobox',
                                    fieldLabel: 'For Project',
                                    itemId: 'fd_cashbon_projectpt_id' + me.uniquename,
                                    id: 'cashbon_projectpt_id' + me.uniquename,
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
                                    itemId: 'fd_cashbon_create' + me.uniquename,
                                    id: 'cashbon_create_by' + me.uniquename,
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

