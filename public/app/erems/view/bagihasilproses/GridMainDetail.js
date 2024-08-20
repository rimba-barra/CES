Ext.define('Erems.view.bagihasilproses.GridMainDetail', {
    extend:'Erems.library.template.view.Grid',
    
    alias: 'widget.bagihasilprosesdetailgrid',
    store:'Bagihasilprosesdetail',
    bindPrefixName: 'Bagihasilprosesdetail',
    
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: {},
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            defaults: {
                xtype: 'gridcolumn',
                width: 100,
                hidden: false
            },
            columns: [
                {
                    xtype: 'rownumberer'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_cluster',
                    width: 100,
					hideable: false,
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
                    itemId: 'colms_landsize',
                    width: 80,
                    dataIndex: 'land_size',
                    hideable: false,
                    text: 'Land Size'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_kelebihan',
                    width: 100,
                    dataIndex: 'kelebihan',
                    hideable: false,
                    text: 'Land Over size'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_building_size',
                    width: 80,
                    dataIndex: 'building_size',
                    hideable: false,
                    text: 'Building Size'
                },
				{
                    dataIndex: 'purchaseletter_no',
                    width: 150,
                    text: 'Purchaseletter No.'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_purchase_date',
                    width: 80,
                    dataIndex: 'purchase_date',
                    hideable: false,
                    text: 'Purchase Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    dataIndex: 'customer_name',
                    width: 150,
                    text: 'Customer Name'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_pricetype',
                    width: 80,
					hideable: false,
                    dataIndex: 'pricetype',
                    text: 'Price Type'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_harga_netto',
                    width: 150,
                    dataIndex: 'harga_netto',
					align: 'right',
                    hideable: false,
                    text: 'Harga Netto'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_harga_total_jual',
                    width: 150,
                    dataIndex: 'harga_total_jual',
					align: 'right',
                    hideable: false,
                    text: 'Harga Total Jual'
                },
				{
                    dataIndex: 'doc_no',
                    width: 100,
					hideable: false,
                    text: 'Doc No'
                },
                {
                    dataIndex: 'termin_lrp',
                    width: 60,
					align: 'right',
                    hideable: false,
                    text: 'No LRP'
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_nilai_lrp_payment',
                    width: 150,
                    dataIndex: 'nilai_lrp_payment',
					align: 'right',
                    hideable: false,
                    text: 'LRP Payment'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_total_payment',
                    width: 150,
                    dataIndex: 'total_payment',
					align: 'right',
                    hideable: false,
                    text: 'Total Payment (Cash In)'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_payment_percentage',
                    width: 130,
                    dataIndex: 'payment_percentage',
					align: 'right',
                    hideable: false,
                    text: 'Payment Percentage (%)'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_management_fee',
                    width: 150,
                    dataIndex: 'management_fee',
					align: 'right',
                    hideable: false,
                    text: 'Management Fee'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_management_fee_dpp',
                    width: 150,
                    dataIndex: 'management_fee_dpp',
					align: 'right',
                    hideable: false,
                    text: 'Management Fee DPP'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_management_fee_ppn',
                    width: 150,
                    dataIndex: 'management_fee_ppn',
					align: 'right',
                    hideable: false,
                    text: 'Management Fee PPN'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_management_fee_pph',
                    width: 150,
                    dataIndex: 'management_fee_pph',
					align: 'right',
                    hideable: false,
                    text: 'Management Fee PPH'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_royalty_fee',
                    width: 150,
                    dataIndex: 'royalty_fee',
					align: 'right',
                    hideable: false,
                    text: 'Royalty Fee'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_royalty_dpp',
                    width: 150,
                    dataIndex: 'royalty_dpp',
					align: 'right',
                    hideable: false,
                    text: 'Royalty Fee DPP'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_royalty_ppn',
                    width: 150,
                    dataIndex: 'royalty_ppn',
					align: 'right',
                    hideable: false,
                    text: 'Royalty PPN'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_royalty_pph',
                    width: 150,
                    dataIndex: 'royalty_pph',
					align: 'right',
                    hideable: false,
                    text: 'Royalty Fee PPH'
                },
            ]
        });

        me.callParent(arguments);
    },
	
	generateDockedItems: function() {
        var me = this;

        var dockedItems = [
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