Ext.define('Erems.view.admincollection.FullPaymentGrid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.admincollectionfullpaymentgrid',
    store: 'Pencairanfullpayment',
   	bindPrefixName: 'Fullpayment',
    newButtonLabel: '',
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
                    itemId: 'colms_payment_no',
                    width: 130,
                    dataIndex: 'payment_no',
                    text: 'Payment No'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_receipt_no',
                    width: 130,
                    dataIndex: 'receipt_no',
                    text: 'Receipt No'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_payment_date',
                    width: 75,
                    dataIndex: 'payment_date',
                    hideable: false,
                    text: 'Escrow Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_duedate',
                    width: 75,
                    dataIndex: 'duedate',
                    hideable: false,
                    text: 'Due Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_payment',
                    width: 120,
                    dataIndex: 'payment',
                    hideable: false,
                    text: 'Payment',
					align: 'right'
                },
				
				//me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
	
	generateDockedItems: function() {
		
        var me = this;

        var dockedItems = [
            /*{
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
            },*/
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
            // xtype: 'actioncolumn',
            // hidden: true,
            // itemId: 'actioncolumn',
            // width: 50,
            // resizable: false,
            // align: 'right',
            // hideable: false,
            // items: [
                // {
                    // text: 'Edit',
                    // iconCls: 'icon-edit',
                    // bindAction: me.bindPrefixName+'Update',
                    // altText: 'Edit',
                    // tooltip: 'Edit'
                // },
                // {
                    // text: 'Delete',
                    // iconCls: 'icon-delete',
                    // bindAction: me.bindPrefixName+'Delete',
                    // altText: 'Delete',
                    // tooltip: 'Delete'
                // }
            // ]
        };
        return ac;
    }
	
});