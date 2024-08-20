Ext.define('Erems.view.permintaankomisi.GridDetail', {
//    extend: 'Ext.grid.Panel',	
	extend: 'Erems.library.template.view.Grid',
	alias: 'widget.permintaankomisigriddetail',
	itemId: 'permintaankomisigriddetail',
	store: 'Permintaankomisidetail',
	bindPrefixName: 'Permintaankomisi',
	height: 150,
	initComponent: function () {
		var me = this;
		Ext.applyIf(me, {
			contextMenu: me.generateContextMenu(),
			dockedItems: me.generateDockedItems(),
			enableColumnHide: false,
			enableColumnMove: false,
			defaultSortable: false,
			viewConfig: {markDirty: false},
			columnLines: true,
			selModel: Ext.create('Ext.selection.CheckboxModel', {}),
			columns: [
//				{xtype: 'rownumberer'},
//				{
//					xtype: 'gridcolumn',
//					text: 'komisi_permintaan_detail_id',
//					dataIndex: 'komisi_permintaan_detail_id',
//					width: '10',
//					hidden: true,
//				},
				{
					xtype: 'gridcolumn',
					text: 'Penerima Komisi',
					dataIndex: 'penerima_komisi',
					width: '130',
					sortable: false,
				},
				{
					xtype: 'gridcolumn',
					text: 'Nama Karyawan',
					dataIndex: 'reff_name',
					width: '150',
					sortable: false,
				},
				{
					xtype: 'booleancolumn',
					dataIndex: 'is_progresif',
					text: 'Progresif',
					falseText: ' ',
					trueText: '&#10003;',
					align: 'center',
				},
				{
					xtype: 'numbercolumn',
					text: 'Persentase<br/>Komisi',
					dataIndex: 'persentase_komisi',
					align: 'right',
					renderer: Ext.util.Format.numberRenderer('0,000.0000'),
					width: '80',
					sortable: false,
				},
				{
					xtype: 'numbercolumn',
					text: 'Nilai Komisi',
					dataIndex: 'nilai_komisi',
					align: 'right',
					width: '100',
					sortable: false,
				},
				{
					xtype: 'numbercolumn',
					text: 'PPN',
					dataIndex: 'nilai_ppn',
					align: 'right',
					width: '100',
					sortable: false,
				},
				{
					xtype: 'numbercolumn',
					text: 'PPH PT',
					dataIndex: 'nilai_pph_pt',
					align: 'right',
					width: '80',
					sortable: false,
				},
				{
					xtype: 'numbercolumn',
					text: 'PPH Perorangan',
					dataIndex: 'nilai_pph_perorangan',
					align: 'right',
					width: '80',
					sortable: false,
				},
				{
					xtype: 'numbercolumn',
					text: 'Pengurang Komisi',
					dataIndex: 'pengurang_komisi',
					align: 'right',
					width: '80',
					sortable: false,
				},
				{
					xtype: 'numbercolumn',
					text: 'Nilai Komisi Diterima',
					dataIndex: 'total_komisi',
					align: 'right',
					width: '130',
					sortable: false,
				},
				{
					xtype: 'actioncolumn',
					hidden: false,
					itemId: 'actioncolumn',
					width: 50,
					resizable: false,
//					align: 'right',
					hideable: false,
					renderer: function (value, metadata, record) {
						if (record.get('flag_delete') == 0) {
							this.items[0].disabled = true;
//							this.items[1].disabled = true;
						} else {
							this.items[0].disabled = false;
//							this.items[1].disabled = false;
						}
					},
					items: [
						{
							text: 'Edit',
							iconCls: 'icon-edit ux-actioncolumn',
							itemCls: 'editDetail',
							icon: document.URL + 'app/main/images/icons/edit.png',
							action: 'editDetail',
							bindAction: me.bindPrefixName + 'Update',
							altText: 'Edit',
							tooltip: 'Edit',
//							handler: function (view, rowIndex, colIndex, item, e, record, row) {
//								if (record.get('flag_delete') == 1) {
//									this.fireEvent('detailUpdate', arguments);
//								}
//							},
						},
						{
							text: 'View',
							iconCls: 'icon-search ux-actioncolumn',
//							bindAction: me.bindPrefixName + 'Read',
							altText: 'View',
							tooltip: 'View',
							handler: function (view, rowIndex, colIndex, item, e, record, row) {
								this.fireEvent('detailView', arguments);
							},

						}
					]
				}
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
						action: 'update',
						disabled: true,
//						hidden: true,
						itemId: 'btnEdit',
						margin: '0 5 0 0',
						iconCls: 'icon-edit',
						text: 'Edit',
//						bindAction: me.bindPrefixName + 'Update'
					},
					{
						xtype: 'button',
						action: 'view',
						itemId: 'btnView',
						margin: '0 5 0 0',
						//padding:5,
						iconCls: 'icon-search',
						text: 'View',
//						bindAction: me.bindPrefixName + 'Read',
						disabled: true,
//						hidden:true
					}
				]
			}
		];
		return dockedItems;
	},
});