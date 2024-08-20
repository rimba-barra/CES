Ext.define('Erems.model.Marketingstockprice', {
    extend: 'Ext.data.Model',
    alias: 'model.marketingstockpricemodel',

    idProperty: 'price_id',

    fields: [
		{ name : 'price_id',type: 'int' },
		{ name : 'unit_id',type: 'int' },
		{ name : 'pricetype_id',type: 'int' },
		{ name : '_harga_tanah_a',type: 'decimal' },
		{ name : '_harga_kelebihan_a',type: 'decimal' },
		{ name : '_harga_tanah_b',type: 'decimal' },
		{ name : '_harga_kelebihan_b',type: 'decimal' },
		{ name : '_harga_bangunan',type: 'decimal' },
		{ name : '_harga_jual_dasar',type: 'decimal' },
		{ name : '_disc_harga_dasar',type: 'decimal' },
		{ name : '_tot_disc_harga_dasar',type: 'decimal' },
		{ name : '_disc_harga_tanah',type: 'decimal' },
		{ name : '_tot_disc_harga_tanah',type: 'decimal' },
		{ name : '_disc_harga_bangunan',type: 'decimal' },
		{ name : '_tot_disc_harga_bangunan',type: 'decimal' },
		{ name : '_harga_netto',type: 'decimal' },
		{ name : '_ppn_tanah',type: 'decimal' },
		{ name : '_tot_ppn_tanah',type: 'decimal' },
		{ name : '_ppn_bangunan',type: 'decimal' },
		{ name : '_tot_ppn_bangunan',type: 'decimal' },
		{ name : '_harga_balik_nama',type: 'decimal' },
		{ name : '_harga_bphtb',type: 'decimal' },
		{ name : '_harga_bajtb',type: 'decimal' },
		{ name : '_total',type: 'decimal' },
        { name : "_subsidi_dp", type: "decimal" },
		{ name : "_harga_interior", type: "decimal" },
		{ name : "_persen_ppnsubsidi_dp", type: "decimal" },
		{ name : "_harga_ppnsubsidi_dp", type: "decimal" },
		{ name : "_persen_ppninterior", type: "decimal" },
		{ name : "_harga_ppninterior", type: "decimal" }
    ]
});

