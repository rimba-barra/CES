Ext.define('Cashier.view.cashfloweditor.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.cashfloweditorgrid',
    store: 'Cashfloweditor',
    bindPrefixName: 'Cashfloweditor',
    itemId: 'CashfloweditorGrid',
    title: 'Cash Flow Editor',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            // dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_jid',
                    width: 130,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'jid',
                    hideable: false,
                    text: 'JID'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_voucher_date',
                    dataIndex: 'voucher_date',
                    titleAlign: 'center',
                    align: 'center',
                    width: 130,
                    hideable: false,
                    text: 'Voucher Date',
                    renderer: Ext.util.Format.dateRenderer('d/m/Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_voucher_no',
                    dataIndex: 'voucher_no',
                    titleAlign: 'center',
                    align: 'center',
                    width: 100,
                    hideable: false,
                    text: 'Voucher No'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coa',
                    dataIndex: 'coa',
                    titleAlign: 'center',
                    align: 'center',
                    width: 80,
                    hideable: false,
                    text: 'COA'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_type',
                    dataIndex: 'type',
                    titleAlign: 'center',
                    align: 'center',
                    width: 50,
                    hideable: false,
                    text: 'Type'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_kelsub',
                    dataIndex: 'kelsub',
                    titleAlign: 'left',
                    align: 'center',
                    width: 50,
                    hideable: false,
                    text: 'Kelsub'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_cashflowtype',
                    dataIndex: 'cashflowtype',
                    titleAlign: 'center',
                    align: 'center',
                    width: 200,
                    hideable: false,
                    text: 'Cashflow'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    dataIndex: 'description',
                    titleAlign: 'center',
                    align: 'left',
                    width: 180,
                    hideable: false,
                    text: 'Description'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_keterangan',
                    dataIndex: 'keterangan',
                    titleAlign: 'center',
                    align: 'left',
                    width: 180,
                    hideable: false,
                    text: 'Keterangan'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amount',
                    dataIndex: 'amount',
                    titleAlign: 'center',
                    align: 'right',
                    width: 140,
                    hideable: false,
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    text: 'Amount'
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
                        text: 'Edit',
                        itemId: 'btnEdit',
                        action: 'update',
                        iconCls: 'icon-edit',
                        disabled: true,
                        bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        text: 'Fill Cashflow',
                        itemId: 'btnFillcashflow',
                        iconCls: 'icon-add',
                        action: 'fillcashflow',
                    },
                    {
                        xtype: 'tbspacer',
                        flex: 1
                    },
                    {
                        xtype: 'tbseparator'
                    },
                    {
                        xtext: 'button',
                        itemId: 'btnHelp',
                        name: 'btnHelp',
                        icon: 'app/main/images/icons/help-book.png',
                        title: 'Cashflow Editor',
                        tooltip : "Help?",  
                        
                    },
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                id: 'pagingcashfloweditor',
                width: 360,
                displayInfo: true,
                store:'Cashfloweditor'
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
            hideable: true,
            items: [
                {
                    text: 'Edit',
                    iconCls: 'icon-edit',
                    bindAction: me.bindPrefixName + 'Update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },

            ]
        };
        return ac;
    }
});


