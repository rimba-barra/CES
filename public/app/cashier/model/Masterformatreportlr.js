Ext.define('Cashier.model.Masterformatreportlr', {
    extend: 'Ext.data.Model',
    alias: 'model.masterformatreportlrmodel',
    idProperty: 'formatrpt_id',
    fields: [
        {name: 'rptformat_id', type: 'int'},
        {name: 'coa_id', type: 'int'},
        {name: 'coa', type: 'string'},
        {name: 'coa_name', type: 'string'},
        {name: 'flag', type: 'string'},
        {name: 'type', type: 'string'},
        {name: 'level', type: 'string'}
    ]
});