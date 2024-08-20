Ext.define('Erems.view.purchaseletterpbb.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.purchaseletterpbbgrid',
    store: 'Purchaseletterpbb',
    bindPrefixName: 'Purchaseletterpbb',
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
                    width: 100,
                    dataIndex: 'purchase_date',
                    hideable: false,
                    text: 'Purchase Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_nop',
                    width: 150,
                    dataIndex: 'nop',
                    hideable: false,
                    text: 'NOP'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_land_size',
                    width: 100,
                    dataIndex: 'land_size',
					align: 'right',
                    hideable: false,
                    text: 'Luas Tanah'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_building_size',
                    width: 100,
                    dataIndex: 'building_size',
					align: 'right',
                    hideable: false,
                    text: 'Luas Bangunan'
                },
				
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
	
});