Ext.define('Erems.view.mastergirik.MastergirikDetailGrid', {
    extend: 'Ext.grid.Panel',
	
    alias: 'widget.MastergirikDetailGrid',
	itemId: 'MastergirikDetailGrid',
	
	store: 'Mastergirikdetail',
	
	initComponent: function() {
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
							bindAction: 'MastergirikDetailCreate'
						},
						{
							text: 'Edit',
							itemId: 'btnEdit',
							iconCls: 'icon-edit',
							bindAction: 'MastergirikDetailUpdate'            
						},
						{
							text: 'Delete Selected',
							itemId: 'btnDelete',
							iconCls: 'icon-delete',
							bindAction: 'MastergirikDetailDelete'                          
						},
					]
				}				
			],
			enableColumnHide: false,
			enableColumnMove: false,
			sortableColumns: false,
			viewConfig: { markDirty: false },
			columnLines: true,
			selModel: Ext.create('Ext.selection.CheckboxModel', {}),
			columns: [
				{xtype: 'rownumberer'},
				{
					xtype: 'gridcolumn',
					text: 'ID',
					dataIndex: 'girik_detail_id',                                                                               
					hidden: true,
					hideable: false,
					width: 40,
					align: 'right'
				},
				{
					xtype: 'gridcolumn',
					text: 'Girik ID',
					dataIndex: 'girik_id',                                                                               
					hidden: true,
					hideable: false,
					width: 40,
					align: 'right'
				},
				{
					xtype: 'gridcolumn',
					text: 'No. Girik',
					dataIndex: 'girik_detail_no',
					width: 100
				},
				{
					xtype: 'gridcolumn',
					text: 'Tgl. Girik',                    
					dataIndex: 'girik_detail_date',
					hideable: false,
					width: 100,
					renderer: Ext.util.Format.dateRenderer('d-m-Y')	
				},
				{
					xtype: 'gridcolumn',
					text: 'Jenis Surat',
					dataIndex: 'jenis_surat',
					width: 100
				},
				{
					xtype: 'gridcolumn',
					text: 'Pemilik Pertama',
					dataIndex: 'pemilik_1',
					width: 150
				},
				{
					xtype: 'gridcolumn',
					text: 'Alamat Pemilik Pertama',
					dataIndex: 'alamat_pemilik_1',
					width: 250
				},
				{
					xtype: 'gridcolumn',
					text: 'No. KTP Pertama',
					dataIndex: 'ktp_no_1',
					width: 100
				},
				{
					xtype: 'gridcolumn',
					text: 'Pemilik Kedua',
					dataIndex: 'pemilik_2',
					width: 150
				},
				{
					xtype: 'gridcolumn',
					text: 'Alamat Pemilik Kedua',
					dataIndex: 'alamat_pemilik_2',
					width: 250
				},
				{
					xtype: 'gridcolumn',
					text: 'No. KTP Kedua',
					dataIndex: 'ktp_no_2',
					width: 100
				},
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
							bindAction: 'MastergirikFixrateUpdate',
							altText: 'Edit',
							tooltip: 'Edit'											
						},
						{
							text: 'Delete',
							iconCls: 'icon-delete',												
							bindAction: 'MastergirikFixrateDelete',
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