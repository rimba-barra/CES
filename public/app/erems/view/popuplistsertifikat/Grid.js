Ext.define('Erems.view.popuplistsertifikat.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.popuplistsertifikatgrid',
    store: 'Popuplistsertifikat',
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
				// {
                    // xtype: 'gridcolumn',
                    // itemId: 'colms_purchaseletter_no',
                    // width: 150,
                    // dataIndex: 'purchaseletter_no',
                    // hideable: false,
                    // text: 'Purchase Letter No.'
                // },
				// {
                    // xtype: 'gridcolumn',
                    // itemId: 'colms_purchase_date',
                    // width: 150,
                    // dataIndex: 'purchase_date',
                    // hideable: false,
                    // text: 'Purchase Date',
					// renderer: Ext.util.Format.dateRenderer('d-m-Y')
                // },
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
                    itemId: 'colms_no_hgb_induk',
                    width: 150,
                    dataIndex: 'no_hgb_induk',
                    hideable: false,
                    text: 'No HGB Induk'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_no_splitz_an_PT',
                    width: 150,
                    dataIndex: 'no_splitz_an_PT',
                    hideable: false,
                    text: 'No Splitz an PT'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_tanggal_splitz_an_PT',
                    width: 150,
                    dataIndex: 'tanggal_splitz_an_PT',
                    hideable: false,
                    text: 'Tanggal Splitz an PT',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_tanggal_akhir_an_PT',
                    width: 150,
                    dataIndex: 'tanggal_akhir_an_PT',
                    hideable: false,
                    text: 'Tanggal Akhir an PT',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_pt_luas',
                    width: 50,
                    dataIndex: 'pt_luas',
                    hideable: false,
                    text: 'PT Luas'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_atasnama_PT',
                    width: 150,
                    dataIndex: 'atasnama_PT',
                    hideable: false,
                    text: 'Atas Nama PT'
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
                    itemId: 'colms_tgl_terima_pt',
                    width: 150,
                    dataIndex: 'tgl_terima_pt',
                    hideable: false,
                    text: 'Tanggal Terima an PT',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_tgl_keluar_pt',
                    width: 150,
                    dataIndex: 'tgl_keluar_pt',
                    hideable: false,
                    text: 'Tanggal Keluar an PT',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_kelurahan_pt',
                    width: 150,
                    dataIndex: 'kelurahan_pt',
                    hideable: false,
                    text: 'Kelurahan PT'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_no_splitz_an_customer',
                    width: 150,
                    dataIndex: 'no_splitz_an_customer',
                    hideable: false,
                    text: 'No Splitz an Customer'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_tanggal_splitz_an_customer',
                    width: 150,
                    dataIndex: 'tanggal_splitz_an_customer',
                    hideable: false,
                    text: 'Tanggal Splitz an Customer',
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
