Ext.define('Erems.view.masterupline.Grid', {
    extend: 'Ext.grid.Panel',
    
	alias: 'widget.MasteruplineGrid',
	itemId: 'MasteruplineGrid',	   
		
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
							bindAction: 'MasteruplineCreate'   
                        },
                        {
                            text: 'Edit',
                            itemId: 'btnEdit',
							iconCls: 'icon-edit',
							bindAction: 'MasteruplineUpdate',
							disabled: true                            
                        },
                        {
                            text: 'Delete Selected',
                            itemId: 'btnDelete',
							iconCls: 'icon-delete',
							bindAction: 'MasteruplineDelete',
							disabled: true                            
                        },
						{
                            text: 'Print / Save',
                            itemId: 'btnPrint',
							iconCls: 'icon-print',
							bindAction: 'MasteruplinePrint'                            
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
					dataIndex: 'upline_id',                                                                               
					hidden: true,
					hideable: false,
					width: 40,
					align: 'right'
                },
                {
                    xtype: 'gridcolumn',
					text: 'Code',
                    dataIndex: 'code',					                   
                    hideable: false,
					width: 75					
                },
				{
                    xtype: 'gridcolumn',
					text: 'Name',
                    dataIndex: 'name',					                   
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
							bindAction: 'MasteruplineUpdate',
							altText: 'Edit',
							tooltip: 'Edit'
						},
						{
							text: 'Delete',
							iconCls: 'icon-delete',
							bindAction: 'MasteruplineDelete',
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