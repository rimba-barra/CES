Ext.define('Cashier.view.vdrequest.FormSearch', {
    extend       : 'Cashier.library.template.view.FormSearch',
    alias        : 'widget.vdrequestformsearch',
    uniquename   : '_vdreq',
    id           : 'vdrequestformsearchID',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items   : [
                {
                    xtype: 'hiddenfield',
                    name : 'hideparam',
                    value: 'default'
                },
                {
                    xtype           : 'ptusercombobox',
                    itemId          : 'fd_pt_id'+me.uniquename,
                    id              : 'pt_id'+me.uniquename,
                    name            : 'pt_id',
                    fieldLabel      : 'PT / Company',
                    emptyText       : 'Select PT / Company',
                    enforceMaxLength: true,
                    enableKeyEvents : true,
                    rowdata         : null
                },
                {
                    xtype : 'fieldcontainer',
                    layout: 'hbox',
                    items : [
                        {
                            xtype           : 'departmentcombobox',
                            itemId          : 'fd_department_id'+me.uniquename,
                            id              : 'department_id'+me.uniquename,
                            name            : 'department_id',
                            fieldLabel      : '',
                            emptyText       : 'Department',
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            rowdata         : null,
                            flex            : 1
                        },
                        {
                            xtype: 'splitter',
                        },
                        {
                            xtype           : 'statusvouchercombobox',
                            itemId          : 'fs_status'+me.uniquename,
                            id              : 'status'+me.uniquename,
                            name            : 'status',
                            fieldLabel      : '',
                            emptyText       : 'Status',
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            flex            : 1
                        }
                    ]
                },
                {
                    xtype     : 'combobox',
                    itemId    : 'fdms_dataflow'+me.uniquename,
                    id        : 'fdms_dataflow'+me.uniquename,
                    name      : 'dataflow',
                    fieldLabel: 'Voucher Type',
                    store     : {
                        fields: ['status', 'description'],
                        data  : [
                            {status: '', description: 'ALL'},
                            {status: 'I', description: 'VOUCHER IN'},
                            {status: 'O', description: 'VOUCHER OUT'},
                        ]
                    },
                    dvalue      : '',
                    emptyText   : 'ALL',
                    queryMode   : 'local',
                    displayField: 'description',
                    valueField  : 'status',
                },
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    fieldLabel: 'Voucher No.',
                    items     : [
                        {
                            xtype           : 'textfield',
                            itemId          : 'fdms_voucher_no'+me.uniquename,
                            id              : 'fdms_voucher_no'+me.uniquename,
                            name            : 'voucher_no',
                            fieldLabel      : '',
                            emptyText       : 'Voucher Dept No.',
                            allowBlank      : false,
                            enableKeyEvents : true,
                            enforceMaxLength: true,
                            maxLength       : 20,
                            flex            : 1
                        },
                        {
                            xtype: 'splitter',
                        },
                        {
                            xtype           : 'textfield',
                            itemId          : 'fdms_vid'+me.uniquename,
                            id              : 'fdms_vid'+me.uniquename,
                            name            : 'vid',
                            fieldLabel      : '',
                            emptyText       : 'Reg. No.',
                            allowBlank      : true,
                            enableKeyEvents : true,
                            enforceMaxLength: true,
                            maxLength       : 20,
                            flex            : 1
                        }
                    ]
                },
                {
                    xtype           : 'textfield',
                    itemId          : 'fdms_cashier_voucher_no'+me.uniquename,
                    id              : 'fdms_cashier_voucher_no'+me.uniquename,
                    name            : 'cashier_voucher_no',
                    fieldLabel      : 'Cashier Voucher No.',
                    allowBlank      : true,
                    enableKeyEvents : true,
                    enforceMaxLength: true,
                    maxLength       : 50,
                    flex            : 1
                },
                {
                    xtype           : 'textfield',
                    itemId          : 'fdms_description'+me.uniquename,
                    id              : 'fdms_description'+me.uniquename,
                    name            : 'description',
                    fieldLabel      : 'Description',
                    allowBlank      : true,
                    enableKeyEvents : true,
                    enforceMaxLength: true,
                    maxLength       : 50,
                },
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    fieldLabel: 'Reg Date',
                    items     : [
                        {
                            xtype           : 'datefield',
                            itemId          : 'fsms_fromdate'+me.uniquename,
                            id              : 'fromdate'+me.uniquename,
                            name            : 'fromdate',
                            emptyText       : 'From Date',
                            enforceMaxLength: true,
                            maxLength       : 10,
                            enableKeyEvents : true,
                            format          : 'd-m-Y',
                            submitFormat    : 'Y-m-d',
                            flex            : 1
                        },
                        {
                            xtype: 'splitter',
                        },
                        {
                            xtype           : 'datefield',
                            itemId          : 'fsms_untildate'+me.uniquename,
                            id              : 'untildate'+me.uniquename,
                            name            : 'untildate',
                            emptyText       : 'Until Date',
                            enforceMaxLength: true,
                            maxLength       : 10,
                            enableKeyEvents : true,
                            format          : 'd-m-Y',
                            submitFormat    : 'Y-m-d',
                            flex            : 1
                        }
                    ]
                },
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    fieldLabel: 'Realization Date',
                    items     : [
                        {
                            xtype           : 'datefield',
                            itemId          : 'fsms_fromrealizationdate'+me.uniquename,
                            id              : 'fromrealizationdate'+me.uniquename,
                            name            : 'fromrealizationdate',
                            emptyText       : 'From Date',
                            enforceMaxLength: true,
                            maxLength       : 10,
                            enableKeyEvents : true,
                            format          : 'd-m-Y',
                            submitFormat    : 'Y-m-d',
                            flex            : 1
                        },
                        {
                            xtype: 'splitter',
                        },
                        {
                            xtype           : 'datefield',
                            itemId          : 'fsms_untilrealizationdate'+me.uniquename,
                            id              : 'untilrealizationdate'+me.uniquename,
                            name            : 'untilrealizationdate',
                            emptyText       : 'Until Date',
                            enforceMaxLength: true,
                            maxLength       : 10,
                            enableKeyEvents : true,
                            format          : 'd-m-Y',
                            submitFormat    : 'Y-m-d',
                            flex            : 1
                        }
                    ]
                },
                {
                    xtype           : 'vendorcombobox',
                    itemId          : 'fd_vendor_id'+me.uniquename,
                    id              : 'fd_vendor_id'+me.uniquename,
                    name            : 'vendor_id',
                    fieldLabel      : 'Vendor/Partner',
                    minChars        : 1,
                    emptyText       : 'Ketik / Cari Vendor/Partner...',
                    queryMode       : 'remote',
                    enforceMaxLength: true,
                    enableKeyEvents : true,
                    rowdata         : null
                },
                {
                    xtype: 'splitter',
                },
                {
                    xtype   : 'fieldcontainer',
                    layout  : 'hbox',
                    defaults: {
                        layout: 'fit'
                    },
                    items : [
                        {
                            xtype : 'fieldcontainer',
                            layout: 'vbox',
                            width : 95,
                            items : [
                                {
                                    xtype: 'label',
                                    text : 'SPK / SOP No.',
                                },
                                {
                                    xtype           : 'textfield',
                                    itemId          : 'fdms_spk'+me.uniquename,
                                    id              : 'fdms_spk'+me.uniquename,
                                    name            : 'spk',
                                    allowBlank      : true,
                                    enableKeyEvents : true,
                                    enforceMaxLength: true,
                                    maxLength       : 50,
                                },
                            ],
                        },
                        {
                            xtype: 'splitter',
                        },
                        {
                            xtype : 'fieldcontainer',
                            layout: 'vbox',
                            flex  : 1,
                            items : [
                                {
                                    xtype: 'label',
                                    text : 'Amount',
                                },
                                {
                                    xtype           : 'xmoneyfield',
                                    itemId          : 'fdms_amount'+me.uniquename,
                                    id              : 'fdms_amount'+me.uniquename,
                                    name            : 'amount',
                                    allowBlank      : true,
                                    enableKeyEvents : true,
                                    enforceMaxLength: true,
                                    maxLength       : 20,
                                },
                            ],
                        },
                    ]
                },
                {
                   xtype         : 'combobox',
                   itemId        : 'fdms_owner'+me.uniquename,
                   id            : 'fdms_owner'+me.uniquename,
                   fieldLabel    : 'Voucher Owner',
                   name          : 'owner',
                   value         : 'My Vouchers',
                   valueField    : 'owner',
                   queryMode     : 'local',
                   store         : ['My Vouchers','Others'],
                   displayField  : 'owner',
                   autoSelect    : true,
                   forceSelection: true
                },
                {
                    xtype           : 'vouchermakercombobox',
                    itemId          : 'fd_vouchermaker_id'+me.uniquename,
                    id              : 'addby'+me.uniquename,
                    name            : 'addby',
                    fieldLabel      : 'Voucher Maker',
                    emptyText       : 'Voucher Maker',
                    enforceMaxLength: true,
                    enableKeyEvents : true,
                    rowdata         : null,
                    hidden          : true
                },
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    fieldLabel: 'Send To Finance Date',
                    items     : [
                        {
                            xtype           : 'datefield',
                            itemId          : 'fsms_fromsenddate'+me.uniquename,
                            id              : 'fromsenddate'+me.uniquename,
                            name            : 'fromsenddate',
                            emptyText       : 'From Date',
                            enforceMaxLength: true,
                            maxLength       : 10,
                            enableKeyEvents : true,
                            format          : 'd-m-Y',
                            submitFormat    : 'Y-m-d',
                            flex            : 1
                        },
                        {
                            xtype: 'splitter',
                        },
                        {
                            xtype           : 'datefield',
                            itemId          : 'fsms_untilsenddate'+me.uniquename,
                            id              : 'untilsenddate'+me.uniquename,
                            name            : 'untilsenddate',
                            emptyText       : 'Until Date',
                            enforceMaxLength: true,
                            maxLength       : 10,
                            enableKeyEvents : true,
                            format          : 'd-m-Y',
                            submitFormat    : 'Y-m-d',
                            flex            : 1
                        }
                    ]
                },
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    fieldLabel: 'Received By Finance Date',
                    items     : [
                        {
                            xtype           : 'datefield',
                            itemId          : 'fsms_fromreceivedate'+me.uniquename,
                            id              : 'fromreceivedate'+me.uniquename,
                            name            : 'fromreceivedate',
                            emptyText       : 'From Date',
                            enforceMaxLength: true,
                            maxLength       : 10,
                            enableKeyEvents : true,
                            format          : 'd-m-Y',
                            submitFormat    : 'Y-m-d',
                            flex            : 1
                        },
                        {
                            xtype: 'splitter',
                        },
                        {
                            xtype           : 'datefield',
                            itemId          : 'fsms_untilreceivedate'+me.uniquename,
                            id              : 'untilreceivedate'+me.uniquename,
                            name            : 'untilreceivedate',
                            emptyText       : 'Until Date',
                            enforceMaxLength: true,
                            maxLength       : 10,
                            enableKeyEvents : true,
                            format          : 'd-m-Y',
                            submitFormat    : 'Y-m-d',
                            flex            : 1
                        }
                    ]
                },
                {
                    xtype     : 'combobox',
                    itemId    : 'fdms_receive_status'+me.uniquename,
                    id        : 'fdms_receive_status'+me.uniquename,
                    name      : 'receive_status',
                    fieldLabel: '',
                    store     : {
                        fields: ['val', 'name'],
                        data  : [
                            { 'val': '0', 'name' : 'ALL' },
                            { 'val': '1', 'name' : 'UnReceived by Finance' },
                            { 'val': '2', 'name' : 'Received by Finance' },
                            { 'val': '7', 'name' : 'UnApproved by Tax' },
                            { 'val': '3', 'name' : 'Approved by Tax' },
                            { 'val': '8', 'name' : 'UnApproved by Treasury' },
                            { 'val': '4', 'name' : 'Approved by Treasury' },
                            { 'val': '9', 'name' : 'UnApproved by Collection' },
                            { 'val': '6', 'name' : 'Approved by Collection' },
                            { 'val': '12', 'name' : 'UnApproved by FC' },
                            { 'val': '11', 'name' : 'Approved by FC' },
                            { 'val': '10', 'name' : 'UnApproved by Head of Finance' },
                            { 'val': '5', 'name' : 'Approved by Head of Finance' },
                        ]
                    },
                    dvalue      : '',
                    emptyText   : 'ALL',
                    queryMode   : 'local',
                    displayField: 'name',
                    valueField  : 'val',
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
