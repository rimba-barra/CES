Ext.define('Cashier.view.vdapprove.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.vdapproveformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 500,
    bodyBorder: true,
    bodyPadding: 10,
    uniquename: '_voucherapprove',
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
                    id: 'hideparam' + me.uniquename,
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    id: 'voucher_id' + me.uniquename,
                    name: 'voucher_id',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'hod_approve_status' + me.uniquename,
                    name: 'hod_approve_status',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'vendorcode' + me.uniquename,
                    name: 'vendorcode',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'kasbank_id' + me.uniquename,
                    name: 'kasbank_id',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'status' + me.uniquename,
                    name: 'status',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'prefixdept' + me.uniquename,
                    name: 'prefixdept',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'approvename' + me.uniquename,
                    name: 'approvename',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'projectname' + me.uniquename,
                    name: 'projectname',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'ptname' + me.uniquename,
                    name: 'ptname',
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
                            width: 350,
                            emptyText: 'Pt / Company',
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '80'
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
                            xtype: 'departmentcombobox',
                            fieldLabel: 'Department',
                            itemId: 'fd_department' + me.uniquename,
                            id: 'department_id' + me.uniquename,
                            name: 'department_id',
                            width: 350,
                            emptyText: 'Department',
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '80'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Reg Date',
                            itemId: 'fd_voucher_date' + me.uniquename,
                            id: 'voucher_date' + me.uniquename,
                            name: 'voucher_date',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 250,
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
                            xtype: 'employeehrdcombobox',
                            fieldLabel: 'Approve By',
                            itemId: 'fd_approveby_id' + me.uniquename,
                            id: 'approveby_id' + me.uniquename,
                            name: 'approveby_id',
                            width: 350,
                            emptyText: 'Approve By',
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            hidden: true
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Reg No',
                            itemId: 'fd_voucher_no' + me.uniquename,
                            id: 'voucher_no' + me.uniquename,
                            name: 'voucher_no',
                            emptyText: 'Auto Value',
                            width: 250,
                            readOnly: true,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                    ]
                },
//                {
//                    xtype: 'fieldcontainer',
//                    layout: 'hbox',
//                    align: 'right',
//                    bodyBorder: false,
//                    defaults: {
//                        layout: 'fit'
//                    },
//                    items: [
//                        {
//                            xtype: 'combo',
//                            fieldLabel: 'Prefix cashier',
//                            itemId: 'fd_prefix_id_b123',
//                            id: 'prefix_id_b123',
//                            name: 'prefix_id',
//                            width: 200,
//                            emptyText: 'Belum Fix',
//                            readOnly: false,
//                            allowBlank: true,
//                            enforceMaxLength: true,
//                            enableKeyEvents: true,
//                            rowdata: null
//                        },
//                        {
//                            xtype: 'splitter',
//                            width: '10'
//                        },
//                        {
//                            xtype: 'textfield',
//                            fieldLabel: '',
//                            itemId: 'fd_coa_b123',
//                            id: 'coa_b123',
//                            name: 'coa',
//                            emptyText: 'Auto Value',
//                            width: 134,
//                            readOnly: true,
//                            allowBlank: true,
//                            enforceMaxLength: true,
//                            enableKeyEvents: true,
//                            rowdata: null
//                        },
//                    ]
//                },
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
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Data flow',
                            defaultType: 'radiofield',
                            defaults: {
                                flex: 2
                            },
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel: 'IN TRANS',
                                    name: 'dataflow',
                                    inputValue: 'I',
                                    id: 'radio1_b123',
                                    allowBlank: false,
                                    checked: false,
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    boxLabel: 'OUT TRANS',
                                    name: 'dataflow',
                                    inputValue: 'O',
                                    id: 'radio2_b123',
                                    allowBlank: false,
                                    checked: true,
                                }
                            ]
                        },
                        {
                            xtype: 'splitter',
                            width: '150'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Due Date',
                            itemId: 'fd_due_date' + me.uniquename,
                            id: 'due_date' + me.uniquename,
                            name: 'due_date',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
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
                            xtype: 'tipevendorvouchercombobox',
                            fieldLabel: 'Type Vendor',
                            itemId: 'fd_type_vendor' + me.uniquename,
                            id: 'type_vendor' + me.uniquename,
                            name: 'type_vendor',
                            width: 300,
                            emptyText: 'Select Type Data Vendor',
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            forceSelection: false,
                            typeAhead: false
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
                            xtype: 'vendorcombobox',
                            fieldLabel: 'Vendor',
                            itemId: 'fd_vendor_id' + me.uniquename,
                            id: 'vendor_id' + me.uniquename,
                            name: 'vendor_id',
                            width: 350,
                            emptyText: 'Select Vendor',
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
                    width: '100%',
                    name: 'vendor_bankacc_id_container1',
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            width: '55%',
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'vendor_bank_account_no',
                                    width: 300,
                                    fieldLabel: 'Bank Acc. No.',
                                    readOnly: true
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            width: '45%',
                            items: [
                                {
                                    xtype: 'textfield',
                                    readOnly: true,
                                    width: '300',
                                    name: 'vendor_bank_name',
                                    fieldLabel: 'Bank Name'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    width: '100%',
                    name: 'vendor_bankacc_id_container2',
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            width: '55%',
                            items: [
                                {
                                    xtype: 'textfield',
                                    readOnly: true,
                                    width: '300',
                                    fieldLabel: 'Bank Acc. Name',
                                    name: 'vendor_bank_account_name'
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            width: '45%',
                            items: [
                                {
                                    xtype: 'textfield',
                                    readOnly: true,
                                    width: '300',
                                    name: 'vendor_bank_currency',
                                    fieldLabel: 'Account Currency'
                                }
                            ]
                        }
                    ]
                },
                 {
                    xtype: 'currencycombobox',
                    fieldLabel: 'Currency',
                    itemId: 'fd_currency_word' + me.uniquename,
                    id: 'currency_word' + me.uniquename,
                    name: 'currency_word',
                    anchor: '50%',
                    width: 300,
                    emptyText: 'Select Currency',
                    readOnly: true,
                    allowBlank: true,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
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
                            itemId: 'fs_amount' + me.uniquename,
                            name: 'amount',
                            id: 'amount' + me.uniquename,
                            fieldLabel: 'Amount',
                            emptyText: 'Manual Input',
                            width: 350,
                            // Remove spinner buttons, and arrow key and mouse wheel listeners
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            readOnly: false,
                            allowBlank: false,
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maxLength: 30,
                             fieldStyle: 'background-color:#eee;background-image: none;text-align:right;align:right'
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
                    items: [
                        {
                            xtype: 'textfield',
                            minValue: 0,
                            itemId: 'fd_kasbondept_no' + me.uniquename,
                            name: 'kasbondept_no',
                            id: 'kasbondept_no' + me.uniquename,
                            fieldLabel: 'Kasbon No.',
                            //emptyText: 'Manual Input',
                            width: 350,
                            // Remove spinner buttons, and arrow key and mouse wheel listeners
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            readOnly: true,
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maxLength: 30,
                        },
                        {
                            xtype: 'textfield',
                            minValue: 0,
                            itemId: 'fd_kasbondept_id' + me.uniquename,
                            name: 'kasbondept_id',
                            id: 'kasbondept_id' + me.uniquename,
                            fieldLabel: 'Kasbon ID.',
                            //emptyText: 'Manual Input',
                            width: 150,
                            // Remove spinner buttons, and arrow key and mouse wheel listeners
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            hidden: true,
                            readOnly: true,
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maxLength: 30,
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
                            itemId: 'fdms_description' + me.uniquename,
                            id: 'description' + me.uniquename,
                            name: 'description',
                            fieldLabel: 'Description',
                            allowBlank: false,
                            enforceMaxLength: true,
                            grow: true,
                            width: 750,
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
                            itemId: 'fdms_approval_notes' + me.uniquename,
                            id: 'approval_notes' + me.uniquename,
                            name: 'approval_notes',
                            fieldLabel: 'Approval Notes',
                            allowBlank: true,
                            enforceMaxLength: true,
                            grow: true,
                            width: 750,
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
                            itemId: 'fdms_rejectreason' + me.uniquename,
                            id: 'rejectreason' + me.uniquename,
                            name: 'rejectreason',
                            fieldLabel: 'Reject Reason',
                            allowBlank: true,
                            enforceMaxLength: true,
                            grow: true,
                            hidden: true,
                            width: 750,
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
                            xtype: 'checkboxfield',
                            itemId: 'is_pajak',
                            name: 'is_pajak',
                            boxLabel: 'Pajak?',
                            inputValue: '1',
                            uncheckedValue: '0',
                            width: 300
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'tabpanel',
                            itemId: 'voucherrequesttab',
                            name: 'voucherrequesttab',
                            width: 750,
                            height: 200,
                            activeTab: 0,
                            defaults: {layout: 'fit'},
                            items: [
                                {
                                    title: 'DETAIL COA',
                                    xtype: 'vdapprovegriddetail',
                                    name: 'gridtabdetail',
                                    id: 'gridtabdetail',
                                    readOnly: false,
                                },
                                {
                                    title: 'DETAIL SUB COA',
                                    xtype: 'vdapprovegridsubdetail',
                                    name: 'gridtabsubdetail',
                                    id: 'gridtabsubdetail',
                                    readOnly: false,
                                },
                                {
                                    title: 'ATTACHMENTS',
                                    xtype: 'vdapprovegridattachmentdetail',
                                    name: 'gridtabattachmentdetail',
                                    id: 'gridtabattachmentdetail',
                                    readOnly: false,
                                    //hidden: false,
                                    width: 750,
                                    height: 300,
                                },
                                {
                                    title: 'APPROVAL',
                                    xtype: 'vdapprovegridapprovaldetail',
                                    name: 'gridapprovaldetail',
                                    id: 'gridapprovaldetail',
                                    readOnly: false,
                                    //hidden: false,
                                    width: 750,
                                    height: 300,
                                }
                            ],
                        }
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
                        xtype: 'fieldcontainer',
                        layout: 'vbox',
                        align: 'right',
                        bodyBorder: false,
                        defaults: {
                            layout: 'fit'
                        },
                        items: [
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
                                        xtype: 'splitter',
                                        width: '20'
                                    },
                                    {
                                        xtype: 'xmoneyfield',
                                        anchor: '100%',
                                        itemId: 'fd_totaldetail_1qwe',
                                        id: 'totaldetail_1qwe',
                                        name: 'totaldetail',
                                        fieldLabel: 'Total Detail',
                                        emptyText: 'Auto Value',
                                        width: 240,
                                        value: 0,
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
                                        width: '20'
                                    },
                                    {
                                        xtype: 'xmoneyfield',
                                        anchor: '100%',
                                        itemId: 'fd_balance_1qwe',
                                        id: 'balance_1qwe',
                                        name: 'balance',
                                        fieldLabel: 'Balance',
                                        emptyText: 'Auto Value',
                                        value: 0,
                                        width: 240,
                                        hideTrigger: true,
                                        keyNavEnabled: false,
                                        mouseWheelEnabled: false,
                                        enforceMaxLength: true,
                                        readOnly: true,
                                        allowBlank: false,
                                        enableKeyEvents: true,
                                        rowdata: null},
                                ]
                            },
                            {xtype: 'tbspacer', height: 5},
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
                                        action: 'detaildesc',
                                        itemId: 'btnDetailDesc',
                                        padding: 5,
                                        width: 150,
                                        iconCls: 'icon-plus',
                                        text: 'Detail Description',
                                        hidden: true
                                    },
                                    {
                                        xtype: 'button',
                                        action: 'approve',
                                        itemId: 'btnApprove',
                                        padding: 5,
                                        width: 75,
                                        iconCls: 'icon-approve',
                                        text: 'Approve'
                                    },
                                    {
                                        xtype: 'button',
                                        action: 'approvepajak',
                                        // hidden: true,
                                        itemId: 'btnApprovepajak',
                                        padding: 5,
                                        width: 100,
                                        iconCls: 'icon-approve2',
                                        text: 'Aprove Pajak'
                                    },
                                    {
                                        xtype: 'button',
                                        action: 'unapprove',
                                        hidden: true,
                                        itemId: 'btnUnapprove',
                                        padding: 5,
                                        width: 85,
                                        iconCls: 'icon-unapprove',
                                        text: 'Unaprove'
                                    },
                                    {
                                        xtype: 'button',
                                        action: 'openreject',
                                        itemId: 'btnOpenreject',
                                        hidden: true,
                                        padding: 5,
                                        width: 85,
                                        iconCls: 'icon-unapprove',
                                        text: 'Reject'
                                    },
                                    {
                                        xtype: 'button',
                                        action: 'openpending',
                                        itemId: 'btnOpenpending',
                                        hidden: true,
                                        padding: 5,
                                        width: 85,
                                        iconCls: 'icon-unapprove',
                                        text: 'Pending'
                                    },
                                    {
                                        xtype: 'button',
                                        action: 'revise',
                                        itemId: 'btnRevise',
                                        padding: 5,
                                        width: 95,
                                        iconCls: 'icon-reset',
                                        text: 'Need Revise'
                                    },
                                    {
                                        xtype: 'button',
                                        action: 'reject',
                                        itemId: 'btnReject',
                                        hidden: true,
                                        padding: 5,
                                        width: 120,
                                        iconCls: 'icon-unapprove',
                                        text: 'Confirm Reject'
                                    },
                                    {
                                        xtype: 'button',
                                        action: 'pending',
                                        itemId: 'btnPending',
                                        hidden: true,
                                        padding: 5,
                                        width: 120,
                                        iconCls: 'icon-unapprove',
                                        text: 'Confirm Pending'
                                    },
                                    {
                                        xtype: 'splitter',
                                        width: '300'
                                    },
                                    {
                                        xtype: 'button',
                                        action: 'save',
                                        itemId: 'btnSave',
                                        padding: 5,
                                        width: 75,
                                        iconCls: 'icon-save',
                                        text: 'Save',
                                        hidden: true
                                    },
//                                    {
//                                        xtype: 'button',
//                                        action: 'test',
//                                        itemId: 'btnTest',
//                                        padding: 5,
//                                        width: 75,
//                                        iconCls: 'icon-test',
//                                        text: 'Test'
//                                    },
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
                    },
                ]
            }
        ];
        return x;
    }
});

