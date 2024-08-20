Ext.define('Erems.model.Mastergirik', {
    extend: 'Ext.data.Model',
    alias: 'model.MastergirikModel',

    idProperty: 'girik_id',

    fields: [
        {name: 'girik_id', type: 'int'},
		{name: 'project_id', type: 'int'},
		{name: 'pt_id', type: 'int'},
        {name: 'code', type: 'string'},
        {name: 'girik_no', type: 'string'},
		{name: 'girik_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'panjang', type: 'decimal'},
		{name: 'lebar', type: 'decimal'},
		{name: 'luas', type: 'decimal'},
		{name: 'alamat', type: 'string'},
		{name: 'kelurahan', type: 'string'},
		{name: 'kecamatan', type: 'string'},
		{name: 'kota', type: 'string'},
		{name: 'pemilik', type: 'string'},
		{name: 'alamat_pemilik', type: 'string'},
		{name: 'ktp_no', type: 'string'},
		{name: 'tgl_girik_format', type: 'string'}
    ]
});