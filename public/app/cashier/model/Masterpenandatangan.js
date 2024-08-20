Ext.define('Cashier.model.Masterpenandatangan', {
    extend: 'Ext.data.Model',
    alias: 'model.masterpenandatanganmodel',
    idProperty: 'penandatangan_id',
    fields: [
        {name: 'penandatangan_id', type: 'int'},
        {name: 'projectpt_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'pt_name', type: 'string'},
        {name: 'inisial', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'jabatan', type: 'string'},
        {name: 'departemen', type: 'string'},
        {name: 'sort',type: 'string'},
    ]
});