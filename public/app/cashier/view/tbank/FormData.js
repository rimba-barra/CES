Ext.define('Cashier.view.tbank.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.tbankformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 600,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    uniquename: '_tbtrans',
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
                    id: 'hideparam_ww',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'kasbank_id',
                    id: 'kasbank_id_ww',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'is_posting',
                    id: 'is_posting' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'project_id_qas',
                    id: 'project_id_cvb',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'chequegiro_status',
                    id: 'chequegiro_status_ww',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'prefix_id',
                    id: 'prefix_id_ww',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'coa_id',
                    id: 'coa_id_ww',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'chequegiro_reject_date',
                    id: 'chequegiro_reject_date_qqq',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'chequegiro_reject_by',
                    id: 'chequegiro_reject_by_qqq',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'tmp_prefix',
                    id: 'tmp_prefix_ww',
                },

                {xtype: 'tbspacer', height: 10},
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
                            xtype: 'button',
                            action: 'unpaid',
                            itemId: 'btnUnpaid',
                            padding: 5,
                            width: 50,
                            iconCls: '',
                            text: 'Unpaid',
                            hidden:true,
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
                            xtype: 'ptusercombobox',
                            fieldLabel: 'Pt/Company',
                            itemId: 'fd_pt_id',
                            id: 'pt_id_xcv',
                            name: 'pt_id',
                            width: 450,
                            emptyText: 'Pt / Company',
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
                            name: 'lblstatus',
                            text: 'Cheque / Giro status',
                            width: 190,
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
                            xtype: 'deptprefixcombobox',
                            fieldLabel: 'Departement',
                            itemId: 'fd_department_id',
                            id: 'department_id_c',
                            name: 'department_id',
                            emptyText: '',
                            width: 400,
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
                            id: 'transno_ww',
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
                            xtype: 'inoutcombobox',
                            fieldLabel: 'Data flow',
                            itemId: 'fd_dataflow',
                            id: 'dataflow_ww',
                            name: 'dataflow',
                            width: 200,
                            emptyText: 'Select flow',
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
                            id: 'voucherprefix_id_ww',
                            name: 'voucherprefix_id',
                            emptyText: '',
                            width: 300,
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            mode:"local",
                            forceSelection: true,
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '',
                            itemId: 'fd_voucher_no',
                            id: 'voucher_no_ww',
                            name: 'voucher_no',
                            emptyText: 'Voucher No',
                            width: 168,
                            readOnly: true,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '',
                            itemId: 'fd_voucher_no_tmp',
                            id: 'voucher_no_tmp_ww',
                            name: 'voucher_no_tmp',
                            emptyText: 'Temporary No',
                            width: 168,
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
                            xtype: 'textfield',
                            fieldLabel: 'Cheque / Giro No.',
                            itemId: 'fd_chequegiro_no',
                            id: 'chequegiro_no_ww',
                            name: 'chequegiro_no',
                            emptyText: 'Manual Input',
                            readOnly: false,
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
                            xtype: 'accuredcombobox',
                            fieldLabel: 'Accrued',
                            itemId: 'fd_chequegiro_accured',
                            id: 'chequegiro_accured_ww',
                            name: 'chequegiro_accured',
                            emptyText: 'Select Accured',
                            width: 280,
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
                            itemId: 'fd_chequegiro_date',
                            id: 'chequegiro_date_ww',
                            name: 'chequegiro_date',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 260,
                            emptyText: 'Manual Input',
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
                            itemId: 'fd_chequegiro_payment_date',
                            id: 'chequegiro_payment_date_ww',
                            name: 'chequegiro_payment_date',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            emptyText: '',
                            width: 260,
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
                            itemId: 'fd_chequegiro_receive_date',
                            id: 'chequegiro_receive_date_ww',
                            name: 'chequegiro_receive_date',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            emptyText: 'Manual Input',
                            width: 260,
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
                            itemId: 'chequegiro_release_date',
                            id: 'chequegiro_release_date_ww',
                            name: 'chequegiro_release_date',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            emptyText: 'Manual Input',
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
                            xtype: 'xmoneyfield',
                            minValue: 0,
                            itemId: 'fd_amount',
                            name: 'amount',
                            id: 'amount_ww',
                            fieldLabel: 'Amount',
                            emptyText: 'Manual Input',
                            width: 260,
                            // Remove spinner buttons, and arrow key and mouse wheel listeners
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            readOnly: false,
                            allowBlank: false,
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maxLength: 20,
                        },
                        {
                            xtype: 'splitter',
                            width: '50'
                        },
                        {
                            xtype: 'groupcombobox',
                            fieldLabel: 'Group Trans',
                            itemId: 'fd_grouptrans_id',
                            id: 'grouptrans_id_ww',
                            name: 'grouptrans_id',
                            emptyText: '',
                            width: 400,
                            readOnly: false,
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
                            itemId: 'fd_coa',
                            id: 'coa_ww',
                            name: 'coa',
                            emptyText: 'Auto Value',
                            width: 260,
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
                            xtype: 'textfield',
                            fieldLabel: '',
                            itemId: 'fd_coaname',
                            id: 'coaname_ww',
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
                    layout: 'vbox',
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
                            xtype: 'textareafield',
                            itemId: 'fdms_description',
                            id: 'description_c',
                            name: 'description',
                            fieldLabel: 'Description',
                            allowBlank: true,
                            enforceMaxLength: true,
                            grow: true,
                            width: 730,
                        },
                    ]
                },

                {
                    // Fieldset in Column 1
                    xtype: 'fieldset',
                    title: 'FOR COA DETAIL',
                    collapsible: false,
                    defaults: {anchor: '100%'},
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'tbankcoadetailgrid',
                            itemId: 'fd_tbankcoadetailgrid',
                            id: 'tbankcoadetailgrid_ww',
                            name: 'tbankcoadetailgrid',
                            title: 'Coa Detail',
                            width: '98%',
                            height: 170,
                            padding: '20px 0 0 20px',
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
                                        xtype: 'textfield',
                                        fieldLabel: 'Total Header',
                                        itemId: 'fd_totalheader_ww',
                                        id: 'totalheader',
                                        name: 'totalheader',
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
                                        xtype: 'textfield',
                                        fieldLabel: 'Total Detail Coa',
                                        itemId: 'fd_totaldetail_ww',
                                        id: 'totaldetail',
                                        name: 'totaldetail',
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
                                        xtype: 'textfield',
                                        fieldLabel: 'Balance',
                                        itemId: 'fd_balance_ww',
                                        id: 'balance',
                                        name: 'balance',
                                        emptyText: 'Auto Value',
                                        width: 200,
                                        readOnly: true,
                                        allowBlank: true,
                                        enforceMaxLength: true,
                                        enableKeyEvents: true,
                                        rowdata: null
                                    },
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
                                        action: 'createvendor',
                                        itemId: 'btnCreateVendor',
                                        padding: 5,
                                        width: 100,
                                        iconCls: 'icon-plus',
                                        text: 'Input Vendor'
                                    },
                                    {
                                        xtype: 'splitter',
                                        width: '340'
                                    },
                                    {
                                        xtype: 'button',
                                        action: 'rejectgiro',
                                        itemId: 'btnRejectgiro',
                                        padding: 5,
                                        width: 75,
                                        iconCls: '',
                                        text: 'Reject Giro'
                                    },
                                    {
                                        xtype: 'button',
                                        action: 'unrejectgiro',
                                        itemId: 'btnunRejectgiro',
                                        padding: 5,
                                        width: 100,
                                        iconCls: '',
                                        text: 'Un Reject Giro'
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
                    },
                ]
            }
        ];
        return x;
    }
});

