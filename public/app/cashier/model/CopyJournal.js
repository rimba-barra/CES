Ext.define('Cashier.model.Copyjournal', {
    extend: 'Ext.data.Model',
    alias: 'model.copyjournalmodel',
    idProperty: 'statusposting',
    fields: [
        {name: 'statusposting', type: 'bit'},
        {name: 'fromprefix_id', type: 'int'},
        {name: 'untilprefix_id', type: 'int'},
        {name: 'fromvoucherno', type: 'string'},
        {name: 'untilvoucherno', type: 'string'},
        {name: 'voucheryear', type: 'date', dateformat:'Y'},
        {name: 'fromvoucherdate', type: 'date', dateformat:'Y-m-d'},
        {name: 'untilvoucherdate', type: 'date', dateformat:'Y-m-d'},
    ]
});