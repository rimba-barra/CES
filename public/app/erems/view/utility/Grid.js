Ext.define('Erems.view.utility.Grid', {
	extend: 'Erems.library.template.view.Grid',
	alias: 'widget.utilitygrid',
	store: 'Utility',
	bindPrefixName: 'Utility',
	newButtonLabel: 'New Bukti Kepemilikan',
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
					itemId: 'colms_kawasan',
					width: 100,
					align: 'right',
					dataIndex: 'cluster_cluster',
					text: 'Cluster'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_block',
					width: 100,
					dataIndex: 'block_block',
					hideable: false,
					text: 'Block Name'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_unit_number',
					width: 100,
					dataIndex: 'unit_unit_number',
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
					itemId: 'colms_unit_type_name',
					width: 150,
					dataIndex: 'unit_type_name',
					hideable: false,
					text: 'Type'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_rencana_serahterima_date',
					width: 150,
					dataIndex: 'rencana_serahterima_date',
					hideable: false,
					text: 'Rencana ST Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_unit_progress',
					width: 110,
					dataIndex: 'unit_progress',
					hideable: false,
					text: 'Progress'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_clubcitra_member',
					width: 150,
					dataIndex: 'clubcitra_member',
					hideable: false,
					text: 'Member Name'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_saleslocation',
					width: 150,
					dataIndex: 'saleslocation',
					hideable: false,
					text: 'Sales Location'
				}
				/*{
				 xtype: 'gridcolumn',
				 itemId: 'colms_addon',
				 width: 150,
				 dataIndex: 'addon',
				 hideable: false,
				 text: 'Added Date',
				 renderer: Ext.util.Format.dateRenderer('d-m-Y')
				 },*/

				//me.generateActionColumn()
			]
		});

		me.callParent(arguments);
	},

	//===========================
	generateContextMenu: function () {
		var contextmenu = [
			{
				text: 'Coba',
				itemId: 'mnuEdit',
				iconCls: 'icon-form-add',
				action: 'update'
			},
			{
				text: 'Delete',
				itemId: 'mnuDelete',
				iconCls: 'icon-delete',
				action: 'destroy'
			}
		];
		return contextmenu;
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
						action: 'print',
						hidden: true,
						itemId: 'btnPrint',
						margin: '0 5 0 0',
						bindAction: me.bindPrefixName + 'Print',
						iconCls: 'icon-print',
						text: 'Print / Save'
					},
					{
						xtype: 'button',
						action: 'view',
						hidden: false,
						itemId: 'btnView',
						margin: '0 5 0 0',
						//padding:5,
						iconCls: 'icon-search',
						//bindAction: me.bindPrefixName+'SelectUnit',
						text: 'View',
						disabled: true
					},
					{
						xtype: 'button',
						action: 'import',
						itemId: 'btnImport',
						margin: '0 5 0 0',
						//padding:5,
						hidden: true,
						iconCls: 'icon-excel',
						bindAction: me.bindPrefixName + 'Upload',
						text: 'Upload',
//						disabled: true
					}
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
					//bindAction: me.bindPrefixName+'Update',
					altText: 'View',
					tooltip: 'View'
				}
				/*{
				 text: 'Delete',
				 iconCls: 'icon-delete',
				 bindAction: me.bindPrefixName+'Delete',
				 altText: 'Delete',
				 tooltip: 'Delete'
				 }*/
			]
		};
		return ac;
	}

});