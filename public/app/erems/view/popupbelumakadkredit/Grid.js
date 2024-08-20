Ext.define('Erems.view.popupbelumakadkredit.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.popupbelumakadkreditgrid',
    store: 'Popupbelumakadkredit',
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
                    itemId: 'colms_type_name',
                    width: 150,
                    dataIndex: 'type_name',
                    hideable: false,
                    text: 'Type'
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
                    itemId: 'colms_land_size',
                    width: 50,
                    dataIndex: 'land_size',
                    hideable: false,
                    text: 'LT'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_building_size',
                    width: 50,
                    dataIndex: 'building_size',
                    hideable: false,
                    text: 'LB'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_rencana_serahterima_date',
                    width: 150,
                    dataIndex: 'rencana_serahterima_date',
                    hideable: false,
                    text: 'Rencana Serah Terima',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_notes',
                    width: 200,
                    dataIndex: 'notes',
                    text: 'Keterangan'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_kpr_acc_date',
                    width: 150,
                    dataIndex: 'kpr_acc_date',
                    hideable: false,
                    text: 'Tgl. KPR Acc Bank',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
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
