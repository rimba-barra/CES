Ext.define('Erems.view.masterpricelist.KoefisienGridDetail', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.masterpricelistkoefisiengriddetail',
    store: 'Masterpricelistkoefisiengriddetail',
    bindPrefixName:'Masterpricelistkoefisiengriddetail',
    height: 250,
    // multiSelect : true,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                // enableTextSelection: true
            },
			// plugins: [
			// 	Ext.create('Ext.grid.plugin.CellEditing', {
			// 		ptype: 'cellediting',
			// 		clicksToEdit: 1
			// 	})
			// ],
            columns: [
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_koefisien_id',
                    dataIndex: 'koefisien_id',
                    hidden:true
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_pricetype',
                    width: 60,
                    dataIndex: 'pricetype',
					hideable: false,
                    text: 'Pricetype'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_pricelist',
                    // flex : 1,
                    width: 150,
                    dataIndex: 'pricelist',
                    hideable: false,
                    text: 'Price List'
                },
                {
                    xtype: 'numbercolumn',
                    align:'right',
                    itemId: 'colms_koefisien',
                    width: 55,
                    dataIndex: 'koefisien',
                    hideable: false,
                    text: 'Koefisien'
                },
                {
                    xtype: 'numbercolumn',
                    align:'right',
                    itemId: 'colms_asuransi',
                    width: 100,
                    dataIndex: 'biaya_asuransi',
                    hideable: false,
                    text: 'Asuransi'
                },
                {
                    xtype: 'numbercolumn',
                    align:'right',
                    itemId: 'colms_bphtb',
                    width: 100,
                    dataIndex: 'biaya_bphtb',
                    hideable: false,
                    text: 'BPHTB'
                },
                {
                    xtype: 'numbercolumn',
                    align:'right',
                    itemId: 'colms_bbn',
                    width: 110,
                    dataIndex: 'biaya_bbn',
                    hideable: false,
                    text: 'BBN'
                },
                {
                    xtype: 'numbercolumn',
                    align:'right',
                    itemId: 'colms_ajb',
                    width: 110,
                    dataIndex: 'biaya_ajb',
                    hideable: false,
                    text: 'AJB'
                },
                {
                    xtype: 'numbercolumn',
                    align:'right',
                    itemId: 'colms_administrasi',
                    width: 110,
                    dataIndex: 'biaya_administrasi',
                    hideable: false,
                    text: 'ADMINISTRASI'
                },
                {
                    xtype: 'numbercolumn',
                    align:'right',
                    itemId: 'colms_admsubsidi',
                    width: 110,
                    dataIndex: 'biaya_admsubsidi',
                    // hideable: false,
                    hidden:true,
                    text: 'BIAYA ADMSUBSIDI'
                },
                {
                    xtype: 'numbercolumn',
                    align:'right',
                    itemId: 'colms_pmutu',
                    width: 110,
                    dataIndex: 'biaya_pmutu',
                    // hideable: false,
                    hidden:true,
                    text: 'BIAYA PENGENDALI MUTU'
                },
                {
                    xtype: 'numbercolumn',
                    align:'right',
                    itemId: 'colms_paket_tambahan',
                    width: 110,
                    dataIndex: 'biaya_paket_tambahan',
                    // hideable: false,
                    hidden:true,
                    text: 'BIAYA PAKET TAMBAHAN'
                }
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {},
});