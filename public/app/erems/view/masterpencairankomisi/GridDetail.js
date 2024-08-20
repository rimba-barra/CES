Ext.define('Erems.view.masterpencairankomisi.GridDetail', {
//    extend: 'Ext.grid.Panel',	
	extend: 'Erems.library.template.view.Grid',
	alias: 'widget.masterpencairankomisigriddetail',
	itemId: 'masterpencairankomisigriddetail',
	store: 'Masterpencairankomisidetail',
	height: 150,
	initComponent: function () {
		var me = this;
		Ext.applyIf(me, {
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'top',
					height: 28,
					items: [
						{
							text: 'Add New',
							itemId: 'btnAdd',
							iconCls: 'icon-add',
							action: 'create',
//							bindAction: 'MasterpencairankomisiDetailCreate'
						},
						{
							text: 'Edit',
							itemId: 'btnEdit',
							iconCls: 'icon-edit',
							action: 'update',
//							bindAction: 'MasterpencairankomisiDetailUpdate'
						},
						{
							text: 'Delete Selected',
							itemId: 'btnDelete',
							iconCls: 'icon-delete',
							action: 'destroy',
//							bindAction: 'MasterpencairankomisiDetailDelete'
						},
					]
				}
			],
			enableColumnHide: false,
			enableColumnMove: false,
			sortableColumns: false,
			viewConfig: {markDirty: false},
			columnLines: true,
			selModel: Ext.create('Ext.selection.CheckboxModel', {}),
			columns: [
//				{xtype: 'rownumberer'},
				{
					xtype: 'gridcolumn',
					text: 'komisi_pencairan_detail_id',
					dataIndex: 'komisi_pencairan_detail_id',
					hidden: true,
				},
				{
					xtype: 'gridcolumn',
					text: 'Penerima Komisi Id',
					dataIndex: 'komisi_penerima_id',
					width: 'auto',
					hidden: true,
				},
				{
					xtype: 'gridcolumn',
					text: 'Populated Data',
					dataIndex: 'populated_data',
					width: 'auto',
					hidden: true,
				},
				{
					xtype: 'gridcolumn',
					text: 'Reff Id',
					dataIndex: 'reff_id',
					width: 'auto',
					hidden: true,
				},
				{
					xtype: 'gridcolumn',
					text: 'Penerima Komisi',
					dataIndex: 'penerima_komisi',
					width: '20%',
				},
				{
					xtype: 'gridcolumn',
					text: 'Komisi',
					dataIndex: 'komisi_persen_nominal',
					width: 'auto',
					width: '10%'
				},
				{
					xtype: 'numbercolumn',
					text: 'Nilai Komisi',
					dataIndex: 'komisi_value',
					align: 'right',
					width: '20%',
					renderer:  Ext.util.Format.numberRenderer('0,000.0000'),
				},
				{
					xtype: 'gridcolumn',
					text: 'Nama Penerima',
					dataIndex: 'reff_name',
					width: '25%',
				},
				{
					xtype: 'gridcolumn',
					text: 'NPWP',
					dataIndex: 'npwp',
					width: '25%',
				}
				/*{
				 xtype: 'actioncolumn',                 
				 hideable: false,
				 resizable: false,
				 width: 50,
				 align: 'right',                    
				 items: [
				 {
				 text: 'Edit',							
				 iconCls: 'icon-edit',
				 bindAction: 'MasterpencairankomisiFixrateUpdate',
				 altText: 'Edit',
				 tooltip: 'Edit'											
				 },
				 {
				 text: 'Delete',
				 iconCls: 'icon-delete',												
				 bindAction: 'MasterpencairankomisiFixrateDelete',
				 altText: 'Delete',
				 tooltip: 'Delete'											
				 }
				 ]
				 }*/
			]
		});
		me.callParent(arguments);
	}
});