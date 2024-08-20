Ext.define('Erems.view.pengalihanhak.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.pengalihanhakgrid',
    store: 'Pengalihanhak',
    bindPrefixName: 'Pengalihanhak',
    newButtonLabel: 'New Pengalihan Hak',
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
                //Rizal 6 Mei 2019
                {
                    xtype: 'gridcolumn',
                    header: 'Purchaseletter ID',
                    dataIndex: 'purchaseletter_id',
                    hidden: true
                },
                {
                    xtype: 'gridcolumn',
                    header: 'Changeownership ID',
                    dataIndex: 'changeownership_id',
                    hidden: true
                },
                //
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_changeownership_no',
                    width: 150,
                    dataIndex: 'changeownership_no',
                    hideable: false,
                    text: 'Pengalihan Hak No.'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_changeownership_date',
                    width: 150,
                    dataIndex: 'changeownership_date',
                    hideable: false,
                    text: 'Pengalihan Hak Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
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
                    itemId: 'colms_purchaseletter_no',
                    width: 150,
                    dataIndex: 'purchaseletter_no',
                    hideable: false,
                    text: 'Purchase Letter No.'
                },
				/*{
                    xtype: 'gridcolumn',
                    itemId: 'colms_purchase_date',
                    width: 150,
                    dataIndex: 'purchase_date',
                    hideable: false,
                    text: 'Purchase Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },*/
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_customer_name_1',
                    width: 150,
                    dataIndex: 'customer_name_1',
                    hideable: false,
                    text: 'Customer Name'
                },
				
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_name',
                    width: 150,
                    dataIndex: 'name',
                    text: 'New Ownership Name'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_changeownershipreason',
                    width: 150,
                    dataIndex: 'changeownershipreason',
                    text: 'Reason'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_biaya',
                    width: 150,
                    dataIndex: 'biaya',
                    text: 'Biaya'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_active',
                    width: 60,
					align: 'right',
                    dataIndex: 'active',
                    hideable: false,
                    text: 'Active',
					renderer: function(value, metaData, record, row, col, store, gridView){
						if(value == 0) {  
							return 'No';//this.renderMarca(value, record);
						}else{
							return 'Yes';
						}
					}
                },
				
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
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
                    text: 'Edit',
                    iconCls: 'icon-edit',
                    bindAction: me.bindPrefixName+'Update',
                    altText: 'Edit',
                    tooltip: 'Edit'
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
                        bindAction: me.bindPrefixName + 'Create',
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
                        bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnDelete',
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    },
                    {
                        xtype: 'button',
                        action: 'print',
                        hidden: true,
                        itemId: 'btnPrint',
                        margin: '0 5 0 0',
                        bindAction: me.bindPrefixName + 'Print',
                        iconCls: 'icon-print',
                        text: 'Print / Save'
                    },
                    {
                        xtype: 'button',
                        action: 'export_excel',
                        itemId: 'btnPrint',
                        margin: '0 5 0 0',
                        iconCls: 'icon-print',
                        text: 'Export Excel'
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
});