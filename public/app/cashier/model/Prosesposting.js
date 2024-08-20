Ext.define('Cashier.model.Prosesposting', {
    extend: 'Ext.data.Model',
    alias: 'model.prosespostingmodel',
    idProperty: 'month_id',
    fields: [
        {name: 'month_id', type: 'int'},
        {name: 'year', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'projectpt_id', type: 'int'},
        {name: 'firstdate', type: 'date',format:'d'},
        {name: 'lastdate', type: 'date',format:'d'}
       
    ]
});