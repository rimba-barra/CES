Ext.define('Erems.model.Pindahkavling', {
    extend: 'Ext.data.Model',
    alias: 'model.pindahkavlingmodel',
    idProperty: 'changekavling_id',
    fields: [
        {name: 'changekavling_id', type: 'int'},
        {name: 'purchaseletter02_id', type: 'int'},
        {name: 'purchaseletter01_id', type: 'int'},
        {name: 'unit_id', type: 'int'},
        {name: 'purchaseletter_no', type: 'string'},
        {name: 'purchaseletter_date', type: 'string'},
        {name: 'harga_total_jual', type: 'string'},
        {name: 'unit_number', type: 'string'},
        {name: 'cluster_code', type: 'string'},
        {name: 'cluster', type: 'string'},
        {name: 'new_unit_id', type: 'int'},
        {name: 'new_purchaseletter_no', type: 'string'},
        {name: 'new_purchaseletter_date', type: 'string'},
        {name: 'new_harga_total_jual', type: 'string'},
        {name: 'new_unit_number', type: 'string'},
        {name: 'new_cluster_code', type: 'string'},
        {name: 'new_cluster', type: 'string'}

    ]
});