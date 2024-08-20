Ext.define('Gl.model.Subaccounttransaction', {
    extend: 'Ext.data.Model',
    alias: 'model.subaccounttransactionmodel',
    idProperty: 'sat_reportby',
    fields: [
        {name: 'sat_reportby', type: 'int'},
        {name: 'paramfromcoa_id', type: 'int'},
        {name: 'paramuntilcoa_id', type: 'int'},
        {name: 'paramfromcoa', type: 'string'},
        {name: 'paramuntilcoa', type: 'string'},
        {name: 'voucherdata', type: 'int'},
        {name: 'subdata', type: 'int'},
        {name: 'detaildatasub', type: 'int'},      
        {name: 'sub_coa_from_id', type: 'int'},      
        {name: 'sub_coa_until_id', type: 'int'},      
        {name: 'sub_kelsub_id', type: 'int'},     
        {name: 'sub_fromsubgl_id', type: 'int'},     
        {name: 'sub_untilsubgl_id', type: 'int'},     
        {name: 'subfromdate', type: 'date', dateformat:'Y-m-d'},
        {name: 'subuntildate', type: 'date', dateformat:'Y-m-d'}
    ]
});