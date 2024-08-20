Ext.define('Cashier.model.Typeloaninterest', {
    extend: 'Ext.data.Model',
    alias: 'model.typeloaninterestmodel',
    idProperty: 'typeloaninterest_id',
    fields: [
        {name: 'typeloaninterest_id', type: 'int'},
        {name: 'typeloan_id', type: 'int'},
        {name: 'interestdate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'value', type: 'number'},
        {name: 'flag_percentage', type: 'int'},
        {name: 'description', type: 'string'},
        {name: 'active', type: 'bit'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
    ]
});