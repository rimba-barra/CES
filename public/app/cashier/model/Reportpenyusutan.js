Ext.define('Cashier.model.Reportpenyusutan', {
    extend: 'Ext.data.Model',
    alias: 'model.reportpenyusutanmodel',
    idProperty: 'from_coa_id',
    fields: [
        {name: 'from_coa_id', type: 'int'},
        {name: 'until_coa_id', type: 'int'},      
        // {name: 'year_tr', type: 'string'},
        // ############ SEFTIAN ALFREDO 19-08-2021
        {name: 'fromdate', type: 'date', dateformat:'Y-m-d'},
        {name: 'untildate', type: 'date', dateformat:'Y-m-d'},
        // ##############
        {name: 'type_report', type: 'string'},
    ]
});