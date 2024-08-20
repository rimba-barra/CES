Ext.define('Masterdata.view.documentnumbering.Grid', {
    extend: 'Ext.grid.Panel',
	
    alias: 'widget.DocumentnumberingGrid',
	itemId: 'DocumentnumberingGrid',    

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
							text: 'Add Documentnumbering',
                            itemId: 'btnAdd',
							iconCls: 'icon-add',
							bindAction: 'DocumentnumberingCreate'   
                        },
                        {
                            text: 'Edit',
                            itemId: 'btnEdit',
							iconCls: 'icon-edit',
							bindAction: 'DocumentnumberingUpdate',
							disabled: true                            
                        },
                        {
                            text: 'Delete Selected',
                            itemId: 'btnDelete',
							iconCls: 'icon-delete',
							bindAction: 'DocumentnumberingDelete',
							disabled: true                            
                        },
						{
                            text: 'Print / Save',
                            itemId: 'btnPrint',
							iconCls: 'icon-print',
							bindAction: 'DocumentnumberingPrint'                            
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
					dataIndex: 'documentnumber_id',                                                                               
					hidden: true,
					hideable: false,
					width: 40,
					align: 'right'
                },
                {
                    xtype: 'gridcolumn',
					text: 'Project Name',
                    dataIndex: 'project_name',					                   
                    hideable: false,
					width: 100					
                },
                {
                    xtype: 'gridcolumn',
					text: 'Pt Name',
                    dataIndex: 'pt_name',					                   
                    hideable: false,
					width: 100					
                },
                {
                    xtype: 'gridcolumn',
					text: 'Application Name',
                    dataIndex: 'application_name',					                   
                    hideable: false,
					width: 100					
                },   
                {
                    xtype: 'gridcolumn',
					text: 'Module Name',
                    dataIndex: 'module_name',					                   
                    hideable: false,
					width: 100					
                },
                {
                    xtype: 'gridcolumn',
					text: 'Reset Type',
                    dataIndex: 'reset_type',					                   
                    hideable: false,
					width: 80					
                }, 
                {
                    xtype: 'gridcolumn',
					text: 'Format',
                    dataIndex: 'format',					                   
                    hideable: false,
					width: 170					
                },                 
                {
                    xtype: 'gridcolumn',
					text: 'Year',
                    dataIndex: 'year',					                   
                    hideable: false,
					width: 40					
                }, 
                {
                    xtype: 'gridcolumn',
					text: 'Month',
                    dataIndex: 'month',					                   
                    hideable: false,
					width: 40					
                },   
                {
                    xtype: 'gridcolumn',
					text: 'Day',
                    dataIndex: 'day',					                   
                    hideable: false,
					width: 40					
                }, 
                {
                    xtype: 'gridcolumn',
					text: 'Counter',
                    dataIndex: 'counter',					                   
                    hideable: false,
					width: 60					
                },                  
                /*{
                    xtype: 'booleancolumn',
					text: 'Default',
                    dataIndex: 'is_default',
					trueText: '&#10003;',
					falseText: ' ',                    
                    resizable: false,
					width: 50,
					align: 'center'
                },*/
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
							bindAction: 'DocumentnumberingUpdate',
							altText: 'Edit',
							tooltip: 'Edit'
						},
						{
							text: 'Delete',
							iconCls: 'icon-delete',
							bindAction: 'DocumentnumberingDelete',													
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