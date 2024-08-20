Ext.define('Erems.model.Mastergirikdetail', {
    extend: 'Ext.data.Model',
    alias: 'model.MastergirikdetailModel',

    idProperty: 'girik_detail_id',

    fields: [
        {name: 'girik_detail_id', type: 'int'},
		{name: 'girik_id', type: 'int'},
        {name: 'girik_detail_no', type: 'string'},
        {name: 'girik_detail_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'alamat_detail', type: 'string'},
		{name: 'kelurahan_detail', type: 'string'},
		{name: 'kecamatan_detail', type: 'string'},
		{name: 'kota_detail', type: 'string'},
		{name: 'panjang_detail', type: 'decimal'},
		{name: 'lebar_detail', type: 'decimal'},
		{name: 'luas_detail', type: 'decimal'},
		{name: 'jenis_surat', type: 'string'},
		{name: 'pemilik_1', type: 'string'},
		{name: 'ktp_no_1', type: 'string'},
		{name: 'alamat_pemilik_1', type: 'string'},
		{name: 'pemilik_2', type: 'string'},
		{name: 'ktp_no_2', type: 'string'},
		{name: 'alamat_pemilik_2', type: 'string'}
    ]
});