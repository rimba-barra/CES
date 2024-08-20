Ext.define('Cashier.model.Slipsetoran', {
    extend: 'Ext.data.Model',
    alias: 'model.slipsetoranmodel',
    idProperty: 'slipsetoran_id',
    fields: [
        {name: 'slipsetoran_id', type: 'int'},
        {name: 'nama_bank', type: 'string'},
        {name: 'kurs', type: 'string'},
        {name: 'norek_customer', type: 'string'},
        {name: 'nama_customer', type: 'string'},
        {name: 'alamat_customer', type: 'string'},
        {name: 'nama_penyetor', type: 'string'},
        {name: 'alamat_penyetor', type: 'string'},
        {name: 'telp_penyetor', type: 'string'},
        {name: 'norek_penyetor', type: 'string'},
        {name: 'amount', type: 'money'},
        {name: 'terbilang', type: 'string'},
       
    ]
});