Ext.define('Erems.view.discountcollection.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.discountcollectiongrid',
    store: 'Discountcollection',
    bindPrefixName: 'Discountcollection',
    newButtonLabel: 'New',
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
                    itemId: 'colms_cluster',
                    width: 100,
                    align: 'right',
                    dataIndex: 'cluster',
                    text: 'Cluster'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_block',
                    width: 60,
                    dataIndex: 'block',
                    hideable: false,
                    text: 'Block'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_unit_number',
                    width: 60,
                    dataIndex: 'unit_number',
                    hideable: false,
                    text: 'Unit'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_customer_name',
                    width: 150,
                    dataIndex: 'customer_name',
                    hideable: false,
                    text: 'Customer Name'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_purchaseletter_no',
                    width: 150,
                    dataIndex: 'purchaseletter_no',
                    hideable: false,
                    text: 'Purchase Letter No.'
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
                    xtype: 'numbercolumn',
                    itemId: 'colms_harga_jual',
                    width: 150,
                    dataIndex: 'harga_jual',
					align: 'right',
                    hideable: false,
                    text: 'Sales Price'
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
                    xtype: 'numbercolumn',
                    itemId: 'colms_disc_collection',
                    width: 150,
                    dataIndex: 'disc_collection',
					align: 'right',
                    hideable: false,
                    text: 'Total Disc. Collection'
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
                        action: 'pencairan',
						disabled: true,
                        hidden: true,
                        itemId: 'btnPencairan',
                        margin: '0 5 0 0',
                        bindAction: me.bindPrefixName+'pencairanCreate',
                        iconCls: 'icon-new',
                        text: 'Pencairan'
                    },
                    {
                        xtype: 'button',
                        action: 'create',
                        hidden: true,
                        itemId: 'btnNew',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName+'Create',
                        text: me.newButtonLabel
                    },
                    {
                        xtype: 'button',
                        action: 'update',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit',
                        bindAction: me.bindPrefixName+'Update'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnDelete',
                        bindAction: me.bindPrefixName+'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    },
                    {
                        xtype: 'button',
                        action: 'print',
                        hidden: true,
                        itemId: 'btnPrint',
                        margin: '0 5 0 0',
                        bindAction: me.bindPrefixName+'Print',
                        iconCls: 'icon-print',
                        text: 'Print / Save'
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
//                    text: 'Edit',
//                    iconCls: 'icon-edit',
//                    bindAction: me.bindPrefixName+'Update',
//                    altText: 'Edit',
//                    tooltip: 'Edit',
                },
                {
                    text: 'Delete',
                    iconCls: 'icon-delete',
                    bindAction: me.bindPrefixName+'Delete',
                    altText: 'Delete',
                    tooltip: 'Delete'
                },
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