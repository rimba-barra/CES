Ext.define('Erems.model.Serahterima', {
    extend: 'Ext.data.Model',
    alias: 'model.serahterimamodel',
    idProperty: 'serahterima_id',
    fields: [
        {name: 'serahterima_id', type: 'int'},
        {name: 'purchaseletter_id', type: 'string'},
        {name: 'serahterima_date', type:'string'},
        {name: 'rencana_serahterima_date', type:'string'}

        
    ]
});