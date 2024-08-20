Ext.define('Gl.model.Generateshl', {
    extend: 'Ext.data.Model',
    alias: 'model.generateshlmodel',
    idProperty: 'processdate',
    fields: [
        {name: 'processdate', type: 'date',format:'Y-m-d'},
       
    ]
});