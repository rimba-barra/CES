Ext.define('Erems.view.paymentreturn.DetailGrid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.paymentreturndetailgrid',
    store: 'Paymentreturnschedule',
   	bindPrefixName: 'Paymentreturnschedule',
    newButtonLabel: 'New Detail',
    height: 150,
	id: 'paymentreturndetailschedulegrid',
	initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
			contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
			viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {mode: "SINGLE"
            }),
			//selModel: new Ext.selection.RowModel({mode: "SINGLE"}),
            columns: [
                {
                    xtype: 'rownumberer'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_duedate',
                    width: 100,
                    dataIndex: 'duedate',
                    hideable: false,
                    text: 'Due Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_scheduletype',
                    width: 70,
                    dataIndex: 'scheduletype',
                    hideable: false,
                    text: 'Type'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_scheduletype_description',
                    width: 100,
                    dataIndex: 'scheduletype_description',
                    hideable: false,
                    text: 'Description'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_queue',
                    width: 65,
                    align: 'right',
                    dataIndex: 'queue',
					hideable: false,
                    text: 'Queue'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_amount',
                    width: 130,
					align: 'right',
                    dataIndex: 'amount',
                    hideable: false,
                    text: 'Amount'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_remaining_balance',
                    width: 130,
					align: 'right',
                    dataIndex: 'remaining_balance',
                    hideable: false,
                    text: 'Remaining Balance'
                }
            ]
        });

        me.callParent(arguments);
    },
	
	generateDockedItems: function() {
		
        var me = this;

        var dockedItems = [
            
        ];
        return dockedItems;
    }
	
});