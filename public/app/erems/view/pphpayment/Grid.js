Ext.define('Erems.view.pphpayment.Grid', {
    extend: 'Ext.grid.Panel',
    
	alias: 'widget.PphpaymentGrid',
	itemId: 'PphpaymentGrid',	   
		
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
							bindAction: 'PphpaymentCreate'   
                        },
                        {
                            text: 'Edit',
                            itemId: 'btnEdit',
							iconCls: 'icon-edit',
							bindAction: 'PphpaymentUpdate',
							disabled: true                            
                        },
                        {
                            text: 'Delete Selected',
                            itemId: 'btnDelete',
							iconCls: 'icon-delete',
							bindAction: 'PphpaymentDelete',
							disabled: true                            
                        },
						{
                            text: 'Print / Save',
                            itemId: 'btnPrint',
							iconCls: 'icon-print',
							bindAction: 'PphpaymentPrint'                            
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
					dataIndex: 'purchaseletter_id',                                                                               
					hidden: true,
					hideable: false,
					width: 40,
					align: 'right'
                },
				{
                    xtype: 'gridcolumn',
					text: 'Purchaseletter No',
                    dataIndex: 'purchaseletter_no',					                   
                    hideable: false,
					width: 150					
                },
				{
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'purchase_date',
                    hideable: false,
                    text: 'Purchase Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    width: 100,
                    align: 'right',
                    dataIndex: 'cluster',
                    text: 'Cluster'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_block',
                    width: 100,
                    dataIndex: 'block',
                    hideable: false,
                    text: 'Block Name'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_unit_number',
                    width: 100,
                    dataIndex: 'unit_number',
                    hideable: false,
                    text: 'Unit No.'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_type_name',
                    width: 150,
                    dataIndex: 'type_name',
                    hideable: false,
                    text: 'Type'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_productcategory',
                    width: 100,
                    dataIndex: 'productcategory',
                    hideable: false,
                    text: 'Category'
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
                    xtype: 'numbercolumn',
                    itemId: 'colms_total_payment',
                    width: 150,
                    dataIndex: 'total_payment',
					align: 'right',
                    hideable: false,
                    text: 'Total Payment'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_salesman_name',
                    width: 150,
                    dataIndex: 'salesman_name',
                    hideable: false,
                    text: 'Salesman Name'
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
							bindAction: 'PphpaymentUpdate',
							altText: 'Edit',
							tooltip: 'Edit'
						},
						{
							text: 'Delete',
							iconCls: 'icon-delete',
							bindAction: 'PphpaymentDelete',													
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