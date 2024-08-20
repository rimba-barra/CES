Ext.define('Cashier.view.openingbalance.Grid', {
    extend: 'Cashier.library.template.view.GridDS2',
    alias: 'widget.journalgrid',
    bindPrefixName: 'Journal',
    storeConfig: {
        id: 'JournalGridStored',
        idProperty: 'journal_id',
        extraParams: {
			openingbalance: 1,
            yeardata: (new Date()).getFullYear() 
		}
    },
    // itemId:'',
    newButtonLabel: 'New Journal ',
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
                {
                    xtype: 'gridcolumn',
                    width: 30,
                    name: 'is_angsuran',
                    hideable: false,
                    text: '[*]',
                    renderer: function (value, metaData, record, row, col, store, gridView) {
                        var payment_paymentflag_id = record.get('payment_paymentflag_id');
                        if (payment_paymentflag_id=="1") {
                            return '<img width="16" height="16" src=' + document.URL + 'app/cashier/images/user.png' + '>';
                        }

                    },
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    dataIndex: 'jid',
                    hideable: false,
                    text: 'Journal ID'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'voucher_no',
                    hideable: false,
                    text: 'Journal No.',
                },
				{
                    xtype: 'gridcolumn',
                    width: 170,
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Description',
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    dataIndex: 'debit_total',
                    hideable: false,
                    text: 'Debet',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    emptyText: 0,
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    dataIndex: 'credit_total',
                    hideable: false,
                    text: 'Kredit',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    emptyText: 0,
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'journal_date',
                    hideable: false,
                    text: 'Journal Date',
                    renderer: Ext.util.Format.dateRenderer('d/m/Y')
                },

                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'kasbank_date',
                    hideable: false,
                    text: 'Addon',
                    renderer: Ext.util.Format.dateRenderer('d/m/Y')
                },
                {
                    xtype: 'gridcolumn',
                    width: 50,
                    dataIndex: 'is_memorialcashflow',
                    hideable: false,
                    hidden: true,
                    text: 'is_memorialcashflow.',
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    viewConfig: {
        listeners: {
            refresh: function (view) {

            }
        }
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
                        //disabled: true,
                        itemId: 'btnCreate',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Add new Opening Balance',
                        bindAction: me.bindPrefixName + 'Create'
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
                        margin: '0 5 0 0',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected',
                        bindAction: me.bindPrefixName + 'Delete'
                    }
                ]
            },
            {
                xtype: 'toolbar',
                dock: 'bottom',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'posting',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnPosting',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Posting',
                        bindAction: me.bindPrefixName + 'Posting'
                    },
                    {
                        xtype: 'button',
                        action: 'realization',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnRealization',
                        margin: '0 5 0 0',
                        iconCls: 'icon-print',
                        text: 'Realization',
                        bindAction: me.bindPrefixName + 'Realization'
                    },
                    {
                        xtype: 'tbspacer',
                        flex: 1
                    },
                    {
                        xtype: 'pagingtoolbar',
                        dock: 'bottom',
                        width: 360,
                        displayInfo: true,
                        store: this.getStore()
                    },
                ]
            },
        ];
        return dockedItems;
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            hidden: true,
            itemId: 'actioncolumn',
            width: 100,
            resizable: false,
            align: 'right',
            hideable: false,
            items: [
            ]
        };
        return ac;
    },
});


