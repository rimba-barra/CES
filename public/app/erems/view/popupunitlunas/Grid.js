/// Create by Erwin.S 15042021
Ext.define('Erems.view.popupunitlunas.Grid', {
	extend         : 'Erems.library.template.view.Grid',
	alias          : 'widget.popupunitlunasgrid',
	store          : 'Popupunitlunas',
	bindPrefixName : '',
	newButtonLabel : 'New',
	initComponent  : function () {
		var me = this;

		Ext.applyIf(me, {
			contextMenu : me.generateContextMenu(),
			dockedItems : me.generateDockedItems(),
			viewConfig  : {},
			selModel    : {},
			defaults    : {
				xtype : 'gridcolumn',
				width : 100,
			},
			columns: [
				{
					xtype: 'rownumberer'
				},
				{
					itemId    : 'colms_unit_number',
					dataIndex : 'unit_number',
					text      : 'Unit Number',
					width     : 80,
				},
				{
					itemId    : 'colms_cluster',
					dataIndex : 'cluster',
					text      : 'Cluster',
					width     : 80,
				},
				{
					itemId    : 'colms_purchaseletter_no',
					dataIndex : 'purchaseletter_no',
					text      : 'Purchaseletter Number',
					width     : 150,
				},
				{
					itemId    : 'colms_firstpurchase_date',
					dataIndex : 'firstpurchase_date',
					text      : 'First<br>Purchase Date',
					width     : 80,
					renderer  : Ext.util.Format.dateRenderer('d-m-Y'),
					align     : 'center'
				},
				{
					itemId    : 'colms_purchase_date',
					dataIndex : 'purchase_date',
					text      : 'Purchase Date',
					width     : 80,
					renderer  : Ext.util.Format.dateRenderer('d-m-Y'),
					align     : 'center'
				},
				{
					itemId    : 'colms_customer_name',
					dataIndex : 'customer_name',
					text      : 'Customer Name'
				},
				{
					itemId    : 'colms_pricetype',
					dataIndex : 'pricetype',
					text      : 'Price Type',
					width     : 70,
				},
				{
					xtype     : 'numbercolumn',
					itemId    : 'colms_harga_total_jual',
					dataIndex : 'harga_total_jual',
					text      : 'Harga Total Jual',
					width     : 120,
					align     : 'right'
				},
				{
					xtype     : 'numbercolumn',
					itemId    : 'colms_total_payment',
					dataIndex : 'total_payment',
					text      : 'Total Payment',
					width     : 120,
					align     : 'right'
				},
				{
					xtype     : 'numbercolumn',
					itemId    : 'colms_remaining_denda',
					dataIndex : 'remaining_denda',
					text      : 'Remaining Denda',
					width     : 120,
					align     : 'right'
				},
			]
		});

		me.callParent(arguments);
	},
	viewConfig: {
		listeners: {
			refresh: function (view) {
				var color, nodes, node, record, level, flag, cells, j, i;
				var jno, jid;
				// get all grid view nodes
				nodes = view.getNodes();
				for (i = 0; i < nodes.length; i++) {
					node = nodes[i];
					// get node record
					record = view.getRecord(node);
					// get level from record data    
					if (record.get("remaining_denda") > 0) {
						cells = Ext.get(node).query('td');
						// set bacground color to all row td elements
						for (j = 1; j < cells.length; j++) {
							Ext.fly(cells[j]).setStyle('background-color', '#ffc8c8');
						}
					}
				}
			}
		}
	},
	generateDockedItems: function() {
		var me = this;

		var dockedItems = [
			{
				xtype  : 'toolbar',
				dock   : 'top',
				height : 28,
				items  : [
					{
						xtype   : 'button',
						action  : 'export_excel',
						itemId  : 'btnExport',
						margin  : '0 5 0 0',
						iconCls : 'icon-print',
						text    : 'Export Excel'
					}
				]
			},
			{
				xtype       : 'pagingtoolbar',
				dock        : 'bottom',
				width       : 360,
				displayInfo : true,
				store       : this.getStore()
			}
		];
		return dockedItems;
	}
});
