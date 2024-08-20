Ext.define('Erems.view.batallunas.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.batallunasgrid',
    store: 'Batallunas',
    bindPrefixName: 'Batallunas',
    newButtonLabel: 'New Batallunas',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
			plugins: [
				Ext.create('Ext.grid.plugin.CellEditing', {
					ptype: 'cellediting',
					clicksToEdit: 1
				})
			],
            columns: [
				{
                    xtype: 'rownumberer'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_kawasan',
                    width: 100,
                    align: 'right',
                    dataIndex: 'cluster',
                    text: 'Cluster'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_block',
                    width: 100,
                    dataIndex: 'block',
                    hideable: false,
                    text: 'Block Name'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_unit_number',
                    width: 100,
                    dataIndex: 'unit_number',
                    hideable: false,
                    text: 'Unit No.'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_cust_name',
                    width: 150,
                    dataIndex: 'customer_name',
                    hideable: false,
                    text: 'Customer Name'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_purchaseletter_no',
                    width: 150,
					hideable: false,
                    dataIndex: 'purchaseletter_no',
                    text: 'Purchase Letter No'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_purchase_date',
                    width: 150,
                    dataIndex: 'purchase_date',
                    hideable: false,
                    text: 'Purchase Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_harga_jual',
                    width: 150,
                    dataIndex: 'harga_jual',
					align: 'right',
                    hideable: false,
                    text: 'Sales Price'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_total_payment',
                    width: 150,
                    dataIndex: 'total_payment',
					align: 'right',
                    hideable: false,
                    text: 'Total Payment'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_remaining_balance_total',
                    width: 150,
                    dataIndex: 'remaining_balance_total',
					align: 'right',
                    hideable: false,
                    text: 'Remaining Balance'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_lunas_date',
                    width: 150,
                    dataIndex: 'lunas_date',
                    hideable: false,
                    text: 'Lunas Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				
                me.generateActionColumn()
            ],
			bbar: [
            '',
            {
                xtype: 'tbfill'
            },
            '',
            {
                xtype: 'tbfill'
            },
			{
                xtype: 'button',
                hidden: false,
                itemId: 'btnBatalLunasAll',
                margin: '0 5 0 0',
                action: 'setBatalLunasAll',
                iconCls: 'icon-edit',
                text: 'SET BATAL LUNAS ALL',
			},
			{
                xtype: 'button',
                hidden: false,
				disabled: true,
                itemId: 'btnBatalLunas',
                margin: '0 5 0 0',
                action: 'submitBatalLunas',
                iconCls: 'icon-save',
                text: 'APPLY',
			}
            ]
        });

        me.callParent(arguments);
    }
});