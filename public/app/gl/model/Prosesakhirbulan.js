Ext.define('Gl.model.Prosesakhirbulan', {
    extend: 'Ext.data.Model',
    alias: 'model.prosesakhirbulanmodel',
    idProperty: 'month_id',
    fields: [
        {name: 'month_id', type: 'int'},
        {name: 'year', type: 'int'},
        {name: 'firstdate', type: 'date',format:'d'},
        {name: 'lastdate', type: 'date',format:'d'}
       
    ]
});