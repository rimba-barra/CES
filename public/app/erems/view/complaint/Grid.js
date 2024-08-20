Ext.define('Erems.view.complaint.Grid', {
	extend         : 'Erems.library.template.view.Grid',
	alias          : 'widget.complaintgrid',
	store          : 'Complaint',
	bindPrefixName : 'Complaint',
	newButtonLabel : 'New',
	initComponent  : function () {
		var me = this;

		Ext.applyIf(me, {
			contextMenu : me.generateContextMenu(),
			dockedItems : me.generateDockedItems(),
			viewConfig  : {},
			selModel    : Ext.create('Ext.selection.CheckboxModel', {}),
			columns     : [
				{
					xtype : 'rownumberer'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_productcategory',
					width     : 100,
					align     : 'right',
					dataIndex : 'productcategory',
					text      : 'Product Category'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_cluster',
					width     : 100,
					align     : 'right',
					dataIndex : 'cluster',
					text      : 'Cluster'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_block',
					width     : 60,
					dataIndex : 'block',
					hideable  : false,
					text      : 'Block'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_unit_number',
					width     : 60,
					dataIndex : 'unit_number',
					hideable  : false,
					text      : 'Unit'
				},
				{
					xtype     : 'booleancolumn',
					itemId    : 'colms_is_nonppn',
					width     : 100,
					dataIndex : 'is_nonppn',
					text      : 'Insentive Pajak',
					align     : 'center',
					renderer  : me.renderIconDefault,
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_customer_name',
					width     : 150,
					dataIndex : 'customer_name',
					hideable  : false,
					text      : 'Customer Name'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_homephone',
					width     : 100,
					hideable  : false,
					dataIndex : 'customer_homephone',
					text      : 'Home Phone'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_officephone',
					width     : 100,
					hideable  : false,
					dataIndex : 'customer_officephone',
					text      : 'Office Phone'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_customer_mobilephone',
					width     : 100,
					hideable  : false,
					dataIndex : 'customer_mobilephone',
					text      : 'Mobile Phone'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_pricetype',
					width     : 100,
					hideable  : false,
					dataIndex : 'pricetype',
					text      : 'Price Type'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_purchaseletter_no',
					width     : 150,
					dataIndex : 'purchaseletter_no',
					hideable  : false,
					text      : 'Purchase Letter No.'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_purchase_date',
					width     : 100,
					dataIndex : 'purchase_date',
					hideable  : false,
					text      : 'Purchase Date',
					renderer  : Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_renc_serahterima_date',
					width     : 100,
					dataIndex : 'rencana_serahterima_date',
					hideable  : false,
					text      : 'Rencana Serah Terima Date',
					renderer  : Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_clubname',
					width     : 150,
					dataIndex : 'clubname',
					hideable  : false,
					text      : 'Club Citra'
				},
				{
					xtype     : 'numbercolumn',
					itemId    : 'colms_kpr_value_approve',
					width     : 150,
					dataIndex : 'kpr_value_approve',
					align     : 'right',
					hideable  : false,
					text      : 'KPR Approve Amount'
				},
				{
					xtype     : 'numbercolumn',
					itemId    : 'colms_progress_pembayaran',
					width     : 150,
					dataIndex : 'progress_pembayaran',
					align     : 'right',
					hideable  : false,
					text      : 'Progress Pembayaran (%)'
				},
				{
					xtype     : 'numbercolumn',
					itemId    : 'colms_total_remaining_denda',
					width     : 150,
					dataIndex : 'total_remaining_denda',
					align     : 'right',
					hideable  : false,
					text      : 'Remaining Denda'
				},
				{
					xtype     : 'numbercolumn',
					itemId    : 'colms_progress_contruction',
					width     : 150,
					dataIndex : 'progress_contruction',
					align     : 'right',
					hideable  : false,
					text      : 'Construction Progress (%)'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_serahterima_date',
					width     : 120,
					dataIndex : 'serahterima_date',
					hideable  : false,
					text      : 'Serah Terima Date',
					renderer  : Ext.util.Format.dateRenderer('d-m-Y')
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
				xtype  : 'toolbar',
				dock   : 'top',
				height : 28,
				items  : [
					{
						xtype      : 'button',
						action     : 'create',
						hidden     : true,
						itemId     : 'btnNew',
						margin     : '0 5 0 0',
						iconCls    : 'icon-new',
						bindAction : me.bindPrefixName + 'Create',
						text       : me.newButtonLabel
					},
					{
						xtype      : 'button',
						action     : 'update',
						disabled   : true,
						hidden     : true,
						itemId     : 'btnEdit',
						margin     : '0 5 0 0',
						iconCls    : 'icon-edit',
						text       : 'Edit',
						bindAction : me.bindPrefixName + 'Update'
					},
					{
						xtype      : 'button',
						action     : 'destroy',
						disabled   : true,
						hidden     : true,
						itemId     : 'btnDelete',
						bindAction : me.bindPrefixName + 'Delete',
						iconCls    : 'icon-delete',
						text       : 'Delete Selected'
					},
					{
						xtype    : 'button',
						action   : 'print_bast',
						disabled : true,
						itemId   : 'btnPrint',
						margin   : '0 5 0 0',
						iconCls  : 'icon-print',
						text     : 'Print BAST'
					},
					{
						xtype    : 'button',
						action   : 'print_pinjam',
						disabled : true,
						itemId   : 'btnPrintPinjam',
						margin   : '0 5 0 0',
						iconCls  : 'icon-print',
						text     : 'Print Pinjam Pakai'
					},
					{
						xtype    : 'button',
						action   : 'add_survey',
						disabled : true,
						itemId   : 'btnSurvey',
						margin   : '0 5 0 0',
						text     : 'Isi Hasil Survey'
					},
					{
						xtype  : 'button',
						action : 'use_sales_force',
						itemId : 'use_sales_force',
						text   : 'Use Sales Force : On',
						hidden : true,
					},
					{
						xtype  : 'button',
						action : 'send_sf_sh1',
						itemId : 'send_sf_sh1',
						text   : 'Send Sales Force SH1 Server : On',
						hidden : true,
					},
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
	},
	generateActionColumn: function () {
		var me = this;
		var ac = {
			xtype     : 'actioncolumn',
			hidden    : true,
			itemId    : 'actioncolumn',
			width     : 50,
			resizable : false,
			align     : 'right',
			hideable  : false,
			items     : [
				{
					text       : 'Edit',
					iconCls    : 'icon-edit',
					bindAction : me.bindPrefixName + 'Update',
					altText    : 'Edit',
					tooltip    : 'Edit'
				},
				{
					text       : 'Delete',
					iconCls    : 'icon-delete',
					bindAction : me.bindPrefixName + 'Delete',
					altText    : 'Delete',
					tooltip    : 'Delete'
				},
				{
					text       : 'View',
					iconCls    : 'icon-search',
					className  : 'view',
					bindAction : me.bindPrefixName + 'Read',
					altText    : 'View',
					tooltip    : 'View'
				}
			]
		};
		return ac;
	},
	renderIconDefault: function (val) {
		var me = this;
		if (val == '1') {
			return '✓';
		} else {
			return '-';
		}
	},

});
