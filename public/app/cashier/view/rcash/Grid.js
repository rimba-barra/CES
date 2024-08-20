Ext.define('Cashier.view.rcash.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.rcashgrid',
    store: 'Rcash',
    bindPrefixName: 'Rcash',
    itemId: 'Rcash',
    newButtonLabel: 'Add New',
    uniquename: "_grcash",
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                me.generateActionColumn(),
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_projectname',
                    width: 120,
                    dataIndex: 'projectname',
                    hideable: false,
                    text: 'Project'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ptname',
                    width: 120,
                    dataIndex: 'ptname',
                    hideable: false,
                    text: 'PT (Company)'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_department',
                    width: 120,
                    dataIndex: 'department',
                    hideable: false,
                    text: 'Department'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ptname_revision',
                    width: 120,
                    dataIndex: 'ptname_revision',
                    hideable: false,
                    text: 'New PT (Company)'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_voucher_no',
                    width: 100,
                    dataIndex: 'voucher_no',
                    hideable: false,
                    text: 'Voucher No'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_voucher_no_revision',
                    width: 100,
                    dataIndex: 'voucher_no_revision',
                    hideable: false,
                    text: 'New Voucher No'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_kasbank_date',
                    width: 100,
                    dataIndex: 'kasbank_date',
                    hideable: false,
                    text: 'Voucher Date'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_kasbank_date_revision',
                    width: 100,
                    dataIndex: 'kasbank_date_revision',
                    hideable: false,
                    text: 'New Voucher Date'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_dataflow',
                    width: 90,
                    dataIndex: 'dataflow',
                    hideable: false,
                    text: 'Data Flow'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_dataflow_revision',
                    width: 90,
                    dataIndex: 'dataflow_revision',
                    hideable: false,
                    text: 'New Data Flow'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_revision_note',
                    width: 200,
                    dataIndex: 'revision_note',
                    hideable: false,
                    text: 'Revision Note'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_trxno',
                    width: 200,
                    dataIndex: 'Nomor',
                    hideable: false,
                    text: 'Description'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_seqno',
                    width: 80,
                    dataIndex: 'seqno',
                    hideable: false,
                    text: 'Seq No.'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_is_giro',
                    width: 80,
                    dataIndex: 'is_giro',
                    hideable: false,
                    text: 'Cheque / Giro'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coa',
                    width: 120,
                    dataIndex: 'coa',
                    hideable: false,
                    text: 'Coa Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_prefix',
                    width: 100,
                    dataIndex: 'prefix',
                    hideable: false,
                    text: 'Prefix'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_kasbank',
                    width: 100,
                    dataIndex: 'kasbank',
                    hideable: false,
                    text: 'Cash / Bank'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_chequegiro_no',
                    width: 150,
                    dataIndex: 'chequegiro_no',
                    hideable: false,
                    text: 'Cheque Giro No.'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_chequegiro_date',
                    width: 100,
                    dataIndex: 'chequegiro_date',
                    hideable: false,
                    text: 'Cheque Giro Date'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amount',
                    width: 100,
                    dataIndex: 'amount',
                    hideable: false,
                    text: 'Amount'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    width: 200,
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Description'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_flag',
                    width: 80,
                    dataIndex: 'flag',
                    hideable: false,
                    text: 'Flag'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_is_posting',
                    width: 80,
                    dataIndex: 'is_posting',
                    hideable: false,
                    text: 'Posting 1'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_is_posting_gl',
                    width: 80,
                    dataIndex: 'is_posting_gl',
                    hideable: false,
                    text: 'Posting 2'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_journal_voucher_no',
                    width: 80,
                    dataIndex: 'journal_voucher_no',
                    hideable: false,
                    text: 'Gl Voucher No.'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_journal_voucher_date',
                    width: 120,
                    dataIndex: 'journal_voucher_date',
                    hideable: false,
                    text: 'Gl Voucher Date'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_chequegiro_status',
                    width: 120,
                    dataIndex: 'chequegiro_status',
                    hideable: false,
                    text: 'Giro Status'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_payment',
                    width: 80,
                    dataIndex: 'payment',
                    hideable: false,
                    text: 'Payment'
                            /*default di cashier desktop ketika di buat
                             status bayar = y
                             */
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_kasbon_paid',
                    width: 80,
                    dataIndex: 'kasbon_paid',
                    hideable: false,
                    text: 'From Cash in Advance'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_made_by',
                    width: 80,
                    dataIndex: 'made_by',
                    hideable: false,
                    text: 'Create By'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_addon',
                    width: 100,
                    dataIndex: 'addon',
                    hideable: false,
                    text: 'Create Date'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_yearmonth_trx',
                    width: 100,
                    dataIndex: 'yearmonth_trx',
                    hideable: false,
                    text: 'Year month trans'
                },
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me = this;

        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 60,
                items: [
                    {
                        xtype: 'fieldcontainer',
                        layout: 'vbox',
                        bodyBorder: false,
                        defaults: {
                            layout: 'fit'
                        },
                        padding: '0 0 0 0',
                        items: [
                            {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                bodyBorder: false,
                                defaults: {
                                    layout: 'fit'
                                },
                                padding: '0 0 0 0',
                                items: [
                                    {
                                        xtype: 'splitter',
                                        width: '40'
                                    },
                                    {
                                        xtype: 'ptusercombobox',
                                        itemId: 'fd_pt_id' + me.uniquename,
                                        id: 'pt_id' + me.uniquename,
                                        name: 'pt_id',
                                        fieldLabel: 'PT / Company',
                                        emptyText: 'Select PT / Company',
                                        enforceMaxLength: true,
                                        enableKeyEvents: true,
                                        rowdata: null
                                    },
                                    {
                                        xtype: 'button',
                                        action: 'applyallpt',
                                        itemId: 'btnApplyallpt',
                                        padding: 5,
                                        width: 150,
                                        iconCls: '',
                                        text: 'Applly All PT /Company'
                                    },
                                    {
                                        xtype: 'splitter',
                                        width: '5'
                                    },
                                    {
                                        xtype: 'datefield',
                                        fieldLabel: 'Revision Date',
                                        itemId: 'fd_revision_date',
                                        id: 'revision_date' + me.uniquename,
                                        name: 'revision_date',
                                        format: 'd-m-Y',
                                        submitFormat: 'Y-m-d',
                                        width: 200,
                                        emptyText: 'Manual Input',
                                        hidden: false,
                                        allowBlank: false,
                                        enforceMaxLength: true,
                                        enableKeyEvents: true,
                                        rowdata: null
                                    },
                                    {
                                        xtype: 'button',
                                        action: 'applyalldate',
                                        itemId: 'btnApplyalldate',
                                        padding: 5,
                                        width: 150,
                                        iconCls: '',
                                        text: 'Applly All Date'
                                    },
                                    {
                                        xtype: 'splitter',
                                        width: '5'
                                    },
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Reason',
                                        itemId: 'fd_reason',
                                        id: 'reason' + me.uniquename,
                                        name: 'reason',
                                        emptyText: 'Manual Input',
                                        width: 250,
                                        readOnly: false,
                                        allowBlank: false,
                                        enforceMaxLength: true,
                                        enableKeyEvents: true,
                                        rowdata: null
                                    },
                                    {
                                        xtype: 'button',
                                        action: 'applyallreason',
                                        itemId: 'btnApplyallreason',
                                        padding: 5,
                                        width: 150,
                                        iconCls: '',
                                        text: 'Applly All Reason'
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
                                padding: '0 0 0 0',
                                items: [
                                    {
                                        xtype: 'splitter',
                                        width: '40'
                                    },
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Voucher No',
                                        itemId: 'fd_voucher_no',
                                        id: 'voucher_no' + me.uniquename,
                                        name: 'voucher_no',
                                        emptyText: 'Auto Input',
                                        width: 250,
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
                                        xtype: 'fieldcontainer',
                                        fieldLabel: '',
                                        defaultType: 'radiofield',
                                        defaults: {
                                            flex: 3
                                        },
                                        layout: 'hbox',
                                        items: [
                                            {
                                                boxLabel: '+ (Plus)',
                                                name: 'actionradio',
                                                inputValue: 'plus',
                                                id: 'radio1_grevcash',
                                                allowBlank: false
                                            },
                                            {
                                                boxLabel: '- (Minus)',
                                                name: 'actionradio',
                                                inputValue: 'minus',
                                                id: 'radio2_grevcash',
                                                allowBlank: false
                                            },
                                            {
                                                boxLabel: 'None',
                                                name: 'actionradio',
                                                inputValue: 'none',
                                                id: 'radio3_grevcash',
                                                allowBlank: false
                                            },
                                        ]
                                    },
                                    {
                                        xtype: 'splitter',
                                        width: '10'
                                    },
                                    {
                                        xtype: 'button',
                                        action: 'applyall',
                                        itemId: 'btnApplyall',
                                        padding: 5,
                                        width: 75,
                                        iconCls: '',
                                        text: 'Apply All'
                                    },
                                    {
                                        xtype: 'button',
                                        action: 'save',
                                        itemId: 'btnSave',
                                        padding: 5,
                                        width: 75,
                                        iconCls: 'icon-save',
                                        text: 'Save All'
                                    },
                                ]
                            },
                        ]
                    },
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }
        ];
        return dockedItems;
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            hidden: true,
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
            items: [
                {
                    text: 'Edit',
                    iconCls: 'icon-edit',
                    bindAction: me.bindPrefixName + 'Update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },
                {
                    text: 'View',
                    iconCls: 'icon-search',
                    className: 'view',
                    bindAction: me.bindPrefixName + 'Read',
                    altText: 'View',
                    tooltip: 'View'
                }
            ]
        };
        return ac;
    },
});


