Ext.define('Erems.model.Notifikasimodule', {
    extend: 'Ext.data.Model',
    alias: 'model.notifikasimodule',
        
    idProperty: 'notifikasi_module_id',

    fields: [
        {name: 'notifikasi_module_id',type: 'int'},
        {name: 'module_name',type: 'string'},
        {name: 'description',type: 'string'},
    ]
});