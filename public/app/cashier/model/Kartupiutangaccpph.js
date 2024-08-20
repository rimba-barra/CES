Ext.define('Cashier.model.Kartupiutangaccpph', {
    extend: 'Ext.data.Model',
    alias: 'model.kartupiutangaccpphmodel',
    idProperty: 'kartupiutang_id',
    fields: [
        {name: 'subgl_id', type: 'int'},
        {name: 'kartupiutang_id', type: 'int'},
        {name: 'kartupiutang_id_reff_ppn', type: 'int'},
        {name: 'kartupiutang_id_reff_pph', type: 'int'},
        {name: 'voucher_date', type: 'date'},
        {name: 'voucher_no', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'pph_rate', type: 'float'},
        {name: 'mutasi', type: 'string'},
        {name: 'dpp', type: 'string'},
        {name: 'pph', type: 'string'},
        {name: 'voucher_date_pph', type: 'date'},
        {name: 'nomor_bukti_pph', type: 'string'},
        {name: 'sort', type: 'int'},
        {name: 'coa', type: 'string'},
        {name: 'coa_id', type: 'int'},
    ]
});