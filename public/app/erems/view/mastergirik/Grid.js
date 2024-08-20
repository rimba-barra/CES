Ext.define('Erems.view.mastergirik.Grid', {
    extend: 'Ext.grid.Panel',
    
	alias: 'widget.MastergirikGrid',
	itemId: 'MastergirikGrid',	   
		
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
							bindAction: 'MastergirikCreate'   
                        },
                        {
                            text: 'Edit',
                            itemId: 'btnEdit',
							iconCls: 'icon-edit',
							bindAction: 'MastergirikUpdate',
							disabled: true                            
                        },
                        {
                            text: 'Delete Selected',
                            itemId: 'btnDelete',
							iconCls: 'icon-delete',
							bindAction: 'MastergirikDelete',
							disabled: true                            
                        },
						{
                            text: 'Print / Save',
                            itemId: 'btnPrint',
							iconCls: 'icon-print',
							bindAction: 'MastergirikPrint'                            
                        }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    displayInfo: true,
                    store: me.getStore(),
					plugins: Ext.create('PagingToolbarPageSize')
                }
            ],
			viewConfig: { markDirty: false },
			columnLines: true,
            selModel: Ext.create('Ext.selection.CheckboxModel', {}),
            columns: [
                {xtype: 'rownumberer'},
				{
                    xtype: 'gridcolumn',
					text: 'ID',
					dataIndex: 'girik_id',                                                                               
					hidden: true,
					hideable: false,
					width: 40,
					align: 'right'
                },
                {
                    xtype: 'gridcolumn',
					text: 'Kode',
                    dataIndex: 'code',					                   
                    hideable: false,
					width: 50					
                },
				{
                    xtype: 'gridcolumn',
					text: 'No. Girik',
                    dataIndex: 'girik_no',					                   
                    hideable: false,
					width: 100					
                },
				{
                    xtype: 'gridcolumn',
                    text: 'Tgl. Girik',                    
                    dataIndex: 'girik_date',
                    hideable: false,
					width: 100,
					renderer: Ext.util.Format.dateRenderer('d-m-Y')				
                },
				{
                    xtype: 'gridcolumn',
					text: 'Panjang',
                    dataIndex: 'panjang',					                   
                    hideable: false,
					width: 100					
                },
				{
                    xtype: 'gridcolumn',
					text: 'Lebar',
                    dataIndex: 'lebar',					                   
                    hideable: false,
					width: 100					
                },
				{
                    xtype: 'gridcolumn',
					text: 'Luas',
                    dataIndex: 'luas',					                   
                    hideable: false,
					width: 100					
                },
				{
                    xtype: 'gridcolumn',
					text: 'Alamat Girik',
                    dataIndex: 'alamat',					                   
                    hideable: false,
					width: 300					
                },
				{
                    xtype: 'gridcolumn',
					text: 'Kelurahan',
                    dataIndex: 'kelurahan',					                   
                    hideable: false,
					width: 150					
                },
				{
                    xtype: 'gridcolumn',
					text: 'Kecamatan',
                    dataIndex: 'kecamatan',					                   
                    hideable: false,
					width: 150					
                },
				{
                    xtype: 'gridcolumn',
					text: 'Kota',
                    dataIndex: 'kota',					                   
                    hideable: false,
					width: 150					
                },
				{
                    xtype: 'gridcolumn',
					text: 'Pemilik',
                    dataIndex: 'pemilik',					                   
                    hideable: false,
					width: 150					
                },
				{
                    xtype: 'gridcolumn',
					text: 'No. KTP',
                    dataIndex: 'ktp_no',					                   
                    hideable: false,
					width: 150					
                },
				{
                    xtype: 'gridcolumn',
					text: 'Alamat Pemilik',
                    dataIndex: 'alamat_pemilik',					                   
                    hideable: false,
					width: 300					
                },
				
				{
                    xtype: 'actioncolumn',                 
					hideable: false,
                    resizable: false,
					width: 50,
                    align: 'right',                    
                    items: [
						{
							text: 'Edit',							
							iconCls: 'icon-edit',
							bindAction: 'MastergirikUpdate',
							altText: 'Edit',
							tooltip: 'Edit'
						},
						{
							text: 'Delete',
							iconCls: 'icon-delete',
							bindAction: 'MastergirikDelete',													
							altText: 'Delete',
							tooltip: 'Delete'
						}
					]
				}
			]
		});		
		me.callParent(arguments);
    }
});