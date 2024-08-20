Ext.define('Erems.model.Gantinama', {
    extend: 'Ext.data.Model',
    alias: 'model.gantinamamodel',
    idProperty: 'changename_id',
    fields: [
        {name: 'changename_id', type: 'int'},
        {name: 'purchaseletter_id', type: 'string'},
        {name: 'reasonchgname_id', type: 'string'},
        {name: 'customer01_id', type: 'string'},
        {name: 'changename_date', type: 'string'},
        {name: 'customer_new_name', type: 'string'},
        {name: 'customer_new_address', type: 'string'},
        {name: 'customer_new_city_id', type: 'string'},
        {name: 'customer_new_zipcode', type: 'string'},
        {name: 'customer_new_home_phone', type: 'string'},
        {name: 'customer_new_mobile_phone', type: 'string'},
        {name: 'customer_new_office_phone', type: 'string'},
        {name: 'customer_new_fax', type: 'string'},
        {name: 'customer_new_KTP_number', type: 'string'},
        {name: 'customer_new_NPWP', type: 'string'},
        {name: 'customer_new_email', type: 'string'},
        {name: 'admistration_fee', type: 'string'},
        {name: 'changename_note', type: 'string'},
        {name: 'cluster', type: 'string'},
        {name: 'unit_number', type: 'string'},
        {name: 'purchase_date', type: 'string'},
        {name: 'customer_name', type: 'string'},
        {name: 'new_purchase_date', type: 'string'},
        {name: 'reason', type: 'string'},
        {name: 'changename_date', type: 'string'}
        
    ]
});