Ext.define('Cashier.view.pemutihan.PemutihanGrid', {
    extend: 'Cashier.library.template.view.GridDS2',
    alias: 'widget.pemutihangrid',
    bindPrefixName: 'Pemutihan',
    storeConfig: {
        id: 'PemutihanGridStore',
        idProperty: 'schedule_id',
        extraParams: {module: 'pemutihanunpaid'},
    },
    // itemId:'',
    newButtonLabel: 'New Budget Coa ',
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
                    hidden: true,
                    dataIndex: 'project_id'
                },
                {
                    xtype: 'gridcolumn',
                    hidden: true,
                    dataIndex: 'pt_id'
                },
                {
                    xtype: 'gridcolumn',
                    width: 150,
                    dataIndex: 'cluster',
                    hideable: false,
                    text: 'Cluster',
                    flex: 1,
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'code',
                    hideable: false,
                    text: 'Unit Number',
                    flex: 1,
                },
                {
                    xtype: 'gridcolumn',
                    width: 150,
                    dataIndex: 'customer_name',
                    hideable: false,
                    text: 'Customer Name',
                    flex: 1,
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'schedule',
                    hideable: false,
                    text: 'Installment',
                    flex: 1,
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'schedule_amount',
                    hideable: false,
                    text: 'Amount',
                    flex: 1,
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'remaining_balance',
                    hideable: false,
                    text: 'Remaining Amount',
                    flex: 1,
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
                        action: 'prosesp',
                        disabled: true,
                        itemId: 'btnProsesp',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Proses Pemutihan'
                    },
                ]
            },
            {
                xtype: 'toolbar',
                dock: 'bottom',
                height: 28,
                items: [
                    {
                        xtype: 'pagingtoolbar',
                        dock: 'bottom',
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
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
            items: [
                

            ]
        };
        return ac;
    },
});


