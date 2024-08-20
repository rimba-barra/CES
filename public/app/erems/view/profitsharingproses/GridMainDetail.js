Ext.define('Erems.view.profitsharingproses.GridMainDetail', {
    extend:'Erems.library.template.view.Grid',
    
    alias: 'widget.profitsharingprosesdetailgrid',
    store:'Profitsharingprosesdetail',
    bindPrefixName: 'Profitsharingprosesdetail',
    
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
                    dataIndex: 'cluster_code',
                    text: 'Cluster Code'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_type_name',
                    width: 100,
					hideable: false,
                    dataIndex: 'type_name',
                    text: 'Type'
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
                    itemId: 'colms_payment_date',
                    width: 80,
                    dataIndex: 'payment_date',
                    hideable: false,
                    text: 'Payment Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_payment',
                    width: 150,
                    dataIndex: 'total_payment',
                    align: 'right',
                    hideable: false,
                    text: 'Payment Value'
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_nilai_lahan_gross_awal',
                    width: 150,
                    dataIndex: 'nilai_lahan_gross_awal',
                    align: 'right',
                    hideable: false,
                    text: 'Nilai Lahan Awal Gross'
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_tanah_permeter_awal',
                    width: 150,
                    dataIndex: 'hj_kavling_awal',
                    align: 'right',
                    hideable: false,
                    text: 'Harga Tanah Awal'
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_kenaikan_harga_tanah_persen',
                    width: 150,
                    dataIndex: 'kenaikan_hj_kavling_persen',
                    align: 'right',
                    hideable: false,
                    text: 'Kenaikan Harga Tanah'
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_nilai_lahan_gross',
                    width: 150,
                    dataIndex: 'nilai_lahan_gross',
                    align: 'right',
                    hideable: false,
                    text: 'Nilai Lahan Gross'
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_efisiensi_lahan',
                    width: 150,
                    dataIndex: 'efisiensi_lahan',
                    align: 'right',
                    hideable: false,
                    text: 'Efisiensi Lahan'
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_netto_lahan',
                    width: 150,
                    dataIndex: 'nilai_netto_lahan',
                    align: 'right',
                    hideable: false,
                    text: 'Nilai Netto Lahan'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_luas_tanah_di_rs',
                    width: 150,
                    dataIndex: 'rs_land_size',
					align: 'right',
                    hideable: false,
                    text: 'Luas Tanah yg di RS'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_rs_payment',
                    width: 150,
                    dataIndex: 'rs_payment',
					align: 'right',
                    hideable: false,
                    text: 'Profit Sharing Value'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_rs_total_partner_dpp',
                    width: 150,
                    dataIndex: 'rs_total_partner_dpp',
					align: 'right',
                    hideable: false,
                    text: 'RS-Partner-DPP'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_rs_total_partner_ppn',
                    width: 150,
                    dataIndex: 'rs_total_partner_ppn',
					align: 'right',
                    hideable: false,
                    text: 'RS-Partner-PPN'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_rs_total_ciputra_dpp',
                    width: 150,
                    dataIndex: 'rs_total_ciputra_dpp',
					align: 'right',
                    hideable: false,
                    text: 'RS-Ciputra-DPP'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_rs_total_ciputra_ppn',
                    width: 150,
                    dataIndex: 'rs_total_ciputra_ppn',
					align: 'right',
                    hideable: false,
                    text: 'RS-Ciputra-PPN'
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
                    itemId: 'colms_royalty_dpp_dpp',
                    width: 150,
                    dataIndex: 'royalty_dpp',
                    align: 'right',
                    hideable: false,
                    text: 'Royalty DPP'
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
                    text: 'Royalty PPH'
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