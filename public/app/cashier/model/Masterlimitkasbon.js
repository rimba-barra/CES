Ext.define('Cashier.model.Masterlimitkasbon', {
    extend: 'Ext.data.Model',
    alias: 'model.masterlimitkasbonmodel',
    idProperty: 'id_limitkasbon',
    fields: [
        {name: 'id_limitkasbon', type: 'int'},
        {name: 'projectpt_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'pt_name', type: 'string'},
        {name: 'user_id', type: 'int'},
        {name: 'username', type: 'string'},
        {name: 'limit_cashbon', type: 'int'},
        {name: 'limit_aging', type: 'int'},
        {name: 'addby_name', type: 'string'},
        {name: 'modiby_name', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'tipekasbondept_id', type: 'int'},
        {name: 'tipekasbondept', type: 'string'},
    ]
});