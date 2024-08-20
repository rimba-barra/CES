Ext.define('Cashier.view.tcash.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.tcashgrid',
    store: 'Tcash',
    bindPrefixName: 'Tcash',
    itemId: 'Tcash',
    newButtonLabel: 'Add New',
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
                    xtype: 'rownumberer',
                    text: 'No.',
                    width: 40,
                    titleAlign: 'center',
                    align: 'center',
                },
//                {
//                    xtype: 'gridcolumn',
//                    itemId: 'colms_projectcode',
//                    dataIndex: 'projectcode',
//                    width: 100,
//                    titleAlign: 'center',
//                    align: 'left',
//                    hideable: false,
//                    text: 'Project Code'
//                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_projectname',
                    dataIndex: 'projectname',
                    width: 150,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Project Name'
                },
//                {
//                    xtype: 'gridcolumn',
//                    itemId: 'colms_ptcode',
//                    dataIndex: 'ptcode',
//                    width: 100,
//                    titleAlign: 'center',
//                    align: 'left',
//                    hideable: false,
//                    text: 'Pt Code'
//                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_department',
                    dataIndex: 'deptcode',
                    width: 50,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Dept.'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ptname',
                    dataIndex: 'ptname',
                    width: 180,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Pt Name'
                },
//                {
//                    xtype: 'gridcolumn',
//                    itemId: 'colms_frommodule',
//                    dataIndex: 'frommodule',
//                    width: 180,
//                    titleAlign: 'center',
//                    align: 'left',
//                    hideable: false,
//                    text: 'Data Module'
//                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_is_posting',
                    dataIndex: 'is_posting',
                    width: 80,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Status',
                    renderer: function (value) {
                        if (value == '1') {
                            return 'OPEN';
                        } else if (value == '2') {
                            return 'APPROVE';
                        } else if (value == '3') {
                            return 'CLOSE';
                        }
                    }
                },
                {
                    xtype: 'booleancolumn',
                    itemId: 'colms_is_posting_gl',
                    dataIndex: 'is_posting_gl',
                    trueText: '&#10003;',
                    falseText: '&#9747;',
                    titleAlign: 'center',
                    align: 'center',
                    width: 40,
                    hideable: false,
                    text: 'GL'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_accept_date',
                    dataIndex: 'accept_date',
                    width: 110,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Accept Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_transno',
                    dataIndex: 'transno',
                    width: 40,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Sort'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_dataflow',
                    dataIndex: 'dataflow',
                    width: 40,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'I/O'
                },
//                {
//                    xtype: 'gridcolumn',
//                    itemId: 'colms_prefix',
//                    dataIndex: 'prefix',
//                    width: 120,
//                    titleAlign: 'center',
//                    align: 'left',
//                    hideable: false,
//                    text: 'Prefix'
//                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_voucher_no',
                    dataIndex: 'voucher_no',
                    width: 90,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Voucher No.'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_kasbank_date',
                    dataIndex: 'kasbank_date',
                    width: 110,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Voucher Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coa',
                    dataIndex: 'coa',
                    width: 100,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Acc. No.'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coaname',
                    dataIndex: 'coaname',
                    width: 100,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Acc. Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    dataIndex: 'description',
                    width: 200,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Description'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amount',
                    dataIndex: 'amount',
                    width: 150,
                    titleAlign: 'center',
                    align: 'right',
                    hideable: false,
                    text: 'Amount',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                me.generateActionColumn()
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
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'create',
                        hidden: true,
                        itemId: 'btnNew',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Create',
                        text: me.newButtonLabel
                    },
                    {
                        xtype: 'button',
                        action: 'update',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit',
                        bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnDelete',
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    },
                    {
                        xtype: 'button',
                        action: 'preview',
                        disabled: true,
                        hidden: false,
                        itemId: 'btnPreview',
                        iconCls: '',
                        text: 'Preview',
                        menu: [
                            {text: 'Format Paper', id: 'formatpaper'},
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
});


