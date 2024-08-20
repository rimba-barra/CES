Ext.define('Erems.view.fakturtagihanreport.GridUnit', {
	extend: 'Erems.library.template.view.Grid',
	alias: 'widget.fakturtagihanreportgridunit',
	itemId: 'fakturtagihanreportgridunit',
	store: 'Fakturtagihanreportunit',
	bindPrefixName: 'Fakturtagihanreport',
	height: 150,
	initComponent: function () {
		var me = this;
		Ext.applyIf(me, {
			enableColumnHide: false,
			enableColumnMove: false,
			sortableColumns: false,
			viewConfig: {markDirty: false},
			columnLines: true,
			dockedItems: [
			// {
			// 	xtype: 'pagingtoolbar',
			// 	dock: 'bottom',
			// 	id: 'unitPaging',
			// 	width: 360,
			// 	hideRefresh: true,
			// 	displayInfo: true,
			// 	store: this.getStore()
			// }
			],
			selModel: Ext.create('Ext.selection.CheckboxModel', {
				// mode: 'MULTI',
			}),
			columns: [
			{
				xtype: 'rownumberer'
			},
			{
				xtype: 'gridcolumn',
				dataIndex: 'cluster_cluster',
				text: 'Cluster'
			},
			{
				xtype: 'gridcolumn',
				dataIndex: 'unit_unit_number',
				text: 'Unit Number'
			},
			// added by rico 23022023
			{
				xtype: 'gridcolumn',
				dataIndex: 'email',
				text: 'Email'
			},
			{
				xtype: 'gridcolumn',
				dataIndex: 'customer_name',
				text: 'Customer Name'
			},
			{
				xtype: 'gridcolumn',
				dataIndex: 'purchaseletter_no',
				text: 'Purchase Letter No.',
				width: 200
			},
			{
				xtype: 'datecolumn',
				dataIndex: 'purchase_date',
				text: 'Purchase Letter Date'
			},
			{
				xtype: 'gridcolumn',
				dataIndex: 'type_name',
				text: 'Type'
			},
			{
				xtype: 'numbercolumn',
				dataIndex: 'purchaseletter_harga_total_jual',
				text: 'Sales Price',
			},
			{
				xtype: 'gridcolumn',
				dataIndex: 'land_size',
				text: 'Land Size'
			},
			{
				xtype: 'gridcolumn',
				dataIndex: 'building_size',
				text: 'Building Size'
			},
			{
				xtype: 'gridcolumn',
				dataIndex: 'block_block',
				text: 'Block'
			},
			],
		});
		me.callParent(arguments);
	},
});