Ext.define('Hrd.view.disckaryawansisa.Grid', {
    extend: 'Ext.grid.Panel',    
    alias: 'widget.disckaryawansisagrid',
    itemId: 'disckaryawansisagrid',	   		
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
                            xtype: 'button',
                            action: 'export',
                            hidden: true,
                            itemId: 'btnExport',
                            margin: '0 5 0 0',
                            bindAction: 'DisckaryawansisaExport',
                            icon: 'app/main/images/icons/excel.png',
                            text: 'Export'
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
                    dataIndex: 'disc_id',                                                                               
                    hidden: true,
                    hideable: false,
                    width: 40,
                    align: 'right'
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Project',
                    dataIndex: 'project_name',					                   
                    hideable: false,
                    width: 150					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'PT',
                    dataIndex: 'pt_name',					                   
                    hideable: false,
                    width: 150					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Employee Name',
                    dataIndex: 'employee_name',					                   
                    hideable: false,
                    width: 150					
                },
                {
                    xtype: 'numbercolumn',
                    text: 'Sisa Amount',
                    dataIndex: 'amount',					                   
                    hideable: false,
                    width: 150					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Sisa Tanah (m2)',
                    dataIndex: 'tanah',					                   
                    hideable: false,
                    width: 120					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Sisa Bangunan (m2)',
                    dataIndex: 'bangunan',					                   
                    hideable: false,
                    width: 120					
                }
            ]
        });		
me.callParent(arguments);
    }
});