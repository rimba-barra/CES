Ext.define('Gl.model.Dailytransaction', {
    extend: 'Ext.data.Model',
    alias: 'model.dailytransactionmodel',
    idProperty: 'from_coa_id',
    fields: [
        {name: 'datajournal', type: 'int'},
        {name: 'subdetaildata', type: 'int'},
        {name: 'baseondata', type: 'int'},
        {name: 'dailycoa_id', type: 'int'},
        {name: 'dailyprefix_id_from', type: 'int'},
        {name: 'dailyprefix_id_until', type: 'int'},
        {name: 'journal_id_from', type: 'int'},
        {name: 'journal_id_until', type: 'int'},
        {name: 'dailyinputfromdate', type: 'date', dateformat: 'Y-m-d'},
        {name: 'dailyinputuntildate', type: 'date', dateformat: 'Y-m-d'},
        {name: 'dailytrxfromdate', type: 'date', dateformat: 'Y-m-d'},
        {name: 'dailytrxuntildate', type: 'date', dateformat: 'Y-m-d'}
    ]
});