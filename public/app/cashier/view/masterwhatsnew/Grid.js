Ext.define('Cashier.view.masterwhatsnew.Grid', {
    extend: 'Ext.grid.Panel',
    
	alias: 'widget.MasterwhatsnewGrid',
	itemId: 'MasterwhatsnewGrid',	   
		
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
							bindAction: 'MasterwhatsnewCreate'   
                        },
                        {
                            text: 'Edit',
                            itemId: 'btnEdit',
							iconCls: 'icon-edit',
							bindAction: 'MasterwhatsnewUpdate',
							disabled: true                            
                        },
                        {
                            text: 'Delete Selected',
                            itemId: 'btnDelete',
							iconCls: 'icon-delete',
							bindAction: 'MasterwhatsnewDelete',
							disabled: true                            
                        },
                        {
                            text: 'Preview',
                            itemId: 'btnView',
                            name: 'btnView',
                            iconCls: 'icon-search',
                            disabled: false                            
                        },
						{
                            text: 'Print / Save',
                            itemId: 'btnPrint',
							iconCls: 'icon-print',
							bindAction: 'MasterwhatsnewPrint'                            
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
					dataIndex: 'whatsnew_id',                                                                               
					hidden: true,
					hideable: false,
					width: 40,
					align: 'right'
                },
                {
                    xtype: 'gridcolumn',
                    text: 'App Name',
                    dataIndex: 'app_name',                                    
                    hideable: false,
                    width: 100                  
                },
                {
                    xtype: 'gridcolumn',
					text: 'Title',
                    dataIndex: 'title',					                   
                    hideable: false,
					width: 200					
                },
                {
                    xtype: 'gridcolumn',
					text: 'Description',
                    dataIndex: 'description',					                   
                    hideable: false,
					width: 300					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Image',
                    dataIndex: 'image',                                      
                    hideable: false,
                    width: 100                  
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Start Date',
                    dataIndex: 'publish_start_date',                                      
                    hideable: false,
                    width: 60                  
                },
                {
                    xtype: 'gridcolumn',
                    text: 'End Date',
                    dataIndex: 'publish_end_date',                                      
                    hideable: false,
                    width: 60                  
                },
                {
                    xtype: 'booleancolumn',
                    width: 60,
                    resizable: false,
                    dataIndex: 'active',
                    text: 'Active',
                    align: 'center',
                    falseText: ' ',
                    trueText: '&#10003;'
                },
                /*
                {
                    xtype: 'gridcolumn',
					text: 'Reg. Date',
                    dataIndex: 'registration_date',					                   
                    hideable: false,
					width: 300					
                },
                */
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
							bindAction: 'MasterwhatsnewUpdate',
							altText: 'Edit',
							tooltip: 'Edit'
						},
						{
							text: 'Delete',
							iconCls: 'icon-delete',
							bindAction: 'MasterwhatsnewDelete',													
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