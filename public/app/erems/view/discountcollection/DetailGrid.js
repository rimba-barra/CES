Ext.define('Erems.view.discountcollection.DetailGrid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.discountcollectiondetailgrid',
    store: 'Discountcollectionschedule',
   	bindPrefixName: 'Discountcollectionschedule',
    newButtonLabel: 'New Detail',
    height: 200,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
			contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
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
                    width: 75,
                    dataIndex: 'scheduletype',
                    hideable: false,
                    text: 'Type'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_queue',
                    width: 75,
                    align: 'right',
                    dataIndex: 'queue',
					hideable: false,
                    text: 'Queue'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_amount',
                    width: 150,
					align: 'right',
                    dataIndex: 'amount',
                    hideable: false,
                    text: 'Amount'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_remaining_balance',
                    width: 150,
					align: 'right',
                    dataIndex: 'remaining_balance',
                    hideable: false,
                    text: 'Remaining Balance'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_interset',
                    width: 100,
					align: 'right',
                    dataIndex: 'interset',
                    hideable: false,
                    text: 'Interst'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_remaining_interest',
                    width: 150,
					align: 'right',
                    dataIndex: 'remaining_interest',
                    hideable: false,
                    text: 'Remaining Balance Interest'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_discount_persen',
                    width: 75,
					align: 'right',
                    dataIndex: 'discount_persen',
                    hideable: false,
                    text: 'Discount %'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_discount',
                    width: 150,
					align: 'right',
                    dataIndex: 'discount',
                    hideable: false,
                    text: 'Disc. Amount'
                },
				{
                    xtype: 'booleancolumn',
                    itemId: 'colms_is_approve',
                    width: 75,
                    resizable: false,
                    align: 'center',
                    dataIndex: 'is_approve',
					//hideable: false,
					text: 'Approve',
                    falseText: ' ',
                    trueText: '&#10003;',
					hidden: true
                },
				
				me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
	
	generateDockedItems: function() {
		
        var me = this;

        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'create',
                        hidden: true,
                        itemId: 'btnNew',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName+'Create',
                        text: me.newButtonLabel
                    }
                ]
            },
            /*{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }*/
        ];
        return dockedItems;
    },
    generateActionColumn: function() {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            hidden: true,
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
			renderer: function (value, metadata, record) {
				if (record.get('remaining_balance') == 0) {
					this.items[0].disabled = true;
				} else {
					if(record.get('discount')){
						this.items[0].disabled = true;
					} else {
						this.items[0].disabled = false;
					}	
				}
			},
            items: [
                {
                    text: 'Edit',
                    iconCls: 'icon-edit',
                    bindAction: me.bindPrefixName+'Update',
                    altText: 'Edit',
                    tooltip: 'Update Disc.'
                },
                {
                    text: 'Delete',
                    iconCls: 'icon-delete',
                    bindAction: me.bindPrefixName+'Delete',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }
            ]
        };
        return ac;
    }
	
});