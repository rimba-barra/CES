Ext.define('Erems.model.Fakturtagihanreportunit', {
    extend: 'Ext.data.Model',
    alias: 'model.fakturtagihanreportunit',

    idProperty: 'unit_id',

    fields: [
        {name: 'unit_id', type: 'int'},
        {name: 'unit_number', type: 'string'},
        {name: 'land_size', type: 'decimal'},
        {name: 'long', type: 'decimal'},
        {name: 'building_size', type: 'decimal'},
        {name: 'width', type: 'decimal'},
        {name: 'kelebihan', type: 'decimal'},
        {name: 'floor', type: 'int'},
        {name: 'unit_unit_id', type: 'int'},
        {name: 'unit_unit_number', type: 'string'},
        {name: 'unit_land_size', type: 'string'},
        {name: 'unit_long', type: 'string'},
        {name: 'unit_building_size', type: 'string'},
        {name: 'unit_width', type: 'string'},
        {name: 'unit_kelebihan', type: 'string'},
        {name: 'unit_floor', type: 'string'},
        {name: 'cluster_cluster', type: 'string'},
        {name: 'cluster_code', type: 'string'},
        {name: 'block_block', type: 'string'},
        {name: 'block_code', type: 'string'},
        {name: 'productcategory_productcategory', type: 'string'},
        {name: 'type_name', type: 'string'},
        {name: 'purchaseletter_purchase_date', type: 'string'},
        {name: 'purchase_date', type: 'date'},
        {name: 'purchaseletter_purchaseletter_no', type: 'string'},
        {name: 'purchaseletter_no', type: 'string'},
        {name: 'purchaseletter_harga_total_jual', type: 'decimal'},
        {name: 'harga_total_jual', type: 'decimal'},
        {name: 'customer_name', type: 'string'},
        {name: 'purchaseletter_purchaseletter_id', type: 'int'},
        {name: 'purchaseletter_id', type: 'int'},
        {name: 'is_draft', type: 'string'},
        
        {name: 'flag_delete', type: 'int'},

        {name: 'email', type: 'string'}, // added by rico 23022023
    ]
});