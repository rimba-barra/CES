Ext.define('Cashier.model.Kartupiutangaccppn', {
    extend: 'Ext.data.Model',
    alias: 'model.kartupiutangaccppnmodel',
    idProperty: 'kartupiutang_id',
    fields: [
        {name: 'subgl_id', type: 'int'},
        {name: 'kartupiutang_id', type: 'int'},
        {name: 'kartupiutang_id_reff_ppn', type: 'int'},
        {name: 'kartupiutang_id_reff_pph', type: 'int'},
        {name: 'voucher_date', type: 'date'},
        {name: 'voucher_no', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'ppn_rate', type: 'float'},
        {name: 'mutasi', type: 'string'},
        {name: 'dpp', type: 'string'},
        {name: 'ppn', type: 'string'},
        {name: 'voucher_date_ppn', type: 'date'},
        {name: 'nomor_bukti_ppn', type: 'string'},
        {name: 'sort', type: 'int'},
        {name: 'coa', type: 'string'},
        {name: 'coa_id', type: 'int'},
    ]
});