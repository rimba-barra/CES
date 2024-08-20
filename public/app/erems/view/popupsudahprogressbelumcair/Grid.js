Ext.define('Erems.view.popupsudahprogressbelumcair.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.popupsudahprogressbelumcairgrid',
    store: 'Popupsudahprogressbelumcair',
    bindPrefixName: '',
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
                    width: 100,
                    dataIndex: 'block',
                    hideable: false,
                    text: 'Block'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_unit_number',
                    width: 100,
                    dataIndex: 'unit_number',
                    hideable: false,
                    text: 'Unit'
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
                    xtype: 'gridcolumn',
                    itemId: 'colms_customer_name',
                    width: 150,
                    dataIndex: 'customer_name',
                    hideable: false,
                    text: 'Customer Name'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_plafon',
                    width: 150,
                    dataIndex: 'plafon',
                    hideable: false,
					text: 'Schema'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_duedate_escrow',
                    width: 150,
                    dataIndex: 'duedate_escrow',
                    hideable: false,
                    text: 'Target (Due Date Escrow)',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_realisation_date',
                    width: 150,
                    dataIndex: 'realisation_date',
                    hideable: false,
                    text: 'Realisation Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_persen_pencairan',
                    width: 75,
                    dataIndex: 'persen_pencairan',
                    hideable: false,
                    text: '% Pencairan'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_pencairan_amount',
                    width: 150,
                    dataIndex: 'pencairan_amount',
                    hideable: false,
					align: 'right',
                    text: 'Amount'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_bank_name',
                    width: 150,
                    dataIndex: 'bank_name',
                    hideable: false,
                    text: 'Bank Name'
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
    }
	
});
