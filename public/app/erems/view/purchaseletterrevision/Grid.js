Ext.define('Erems.view.purchaseletterrevision.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.purchaseletterrevisiongrid',
    store: 'Purchaseletterrevision',
    bindPrefixName: 'Purchaseletterrevision',
    newButtonLabel: 'New Warning Jatuh Tempo',
	id: 'purchaseletterrevisiongrid_id',
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
                    itemId: 'colms_kawasan',
                    width: 150,
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
                    text: 'Kav. Number'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_unit_type_name',
                    width: 100,
                    dataIndex: 'unit_type_name',
                    hideable: false,
                    text: 'Type'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_purchase_date',
                    width: 150,
                    dataIndex: 'purchase_date',
                    hideable: false,
                    text: 'Purchase Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_purchaseletter_no',
                    width: 150,
					hideable: false,
                    dataIndex: 'purchaseletter_no',
                    text: 'Purchase Letter No'
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
					align: 'right',
                    dataIndex: 'total_payment',
                    hideable: false,
                    text: 'Total Payment'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_salesman_name',
                    width: 150,
                    dataIndex: 'salesman_name',
                    hideable: false,
                    text: 'Salesman'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_clubcitra_member',
                    width: 150,
                    dataIndex: 'clubcitra_member',
                    hideable: false,
                    text: 'Member Name'
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
                        action: 'view',
                        disabled: true,
                        itemId: 'btnView',
                        margin: '0 5 0 0',
                        iconCls: 'icon-search',
                        text: 'View',
                        bindAction: me.bindPrefixName+'Read'
                    }
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }
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
            items: [
               {
                    text: 'View',
                    iconCls: 'icon-search',
                    className:'view',
                    bindAction: me.bindPrefixName + 'Read',
                    altText: 'View',
                    tooltip: 'View'
                }
            ]
        };
        return ac;
    }
});