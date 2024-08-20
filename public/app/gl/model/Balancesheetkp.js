Ext.define('Gl.model.Balancesheetkp', {
    extend: 'Ext.data.Model',
    alias: 'model.balancesheetkpmodel',
    idProperty: 'from_coa_id',
    fields: [
        {name: 'detaildata', type: 'bit'},
        {name: 'headerdata', type: 'bit'},
        {name: 'from_coa_id', type: 'int'},
        {name: 'until_coa_id', type: 'int'},      
        {name: 'fromdate', type: 'date', dateformat:'Y-m-d'},
        {name: 'untildate', type: 'date', dateformat:'Y-m-d'}
    ]
});