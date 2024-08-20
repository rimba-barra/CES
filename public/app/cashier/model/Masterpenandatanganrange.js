Ext.define('Cashier.model.Masterpenandatanganrange', {
    extend: 'Ext.data.Model',
    alias: 'model.masterpenandatanganrangemodel',
    idProperty: 'range_penandatangan_id',
    fields: [
        {name: 'range_penandatangan_id', type: 'int'},
        {name: 'penandatangan_id', type: 'int'},
        {name: 'rangeapprove_id', type: 'int'},
        {name: 'projectpt_id', type: 'string'},
        {name: 'pt_name', type: 'string'},
        {name: 'penandatangan_inisial', type: 'string'},
        {name: 'penandatangan_name', type: 'string'},
        {name: 'penandatangan_jabatan', type: 'string'},
        {name: 'penandatangan_departemen', type: 'string'},
        {name: 'range_range', type: 'string'},
        {name: 'range_fromamount', type: 'number'},
        {name: 'range_untilamount', type: 'number'},
        {name: 'prefix_id', type: 'int'},
        {name: 'prefix', type: 'string'}
    ]
});