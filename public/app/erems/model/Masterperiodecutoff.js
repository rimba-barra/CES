Ext.define('Erems.model.Masterperiodecutoff', {
    extend     : 'Ext.data.Model',
    alias      : 'model.masterperiodecutoffmodel',
    idProperty : 'audit_periode_cutoff_id',
    fields: [
        {name: 'audit_periode_cutoff_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'periode_cutoff', type: 'string'},
        {name: 'periode', type: 'string'},
        {name: 'addby', type: 'string'},
        {name: 'addby_name', type: 'string'},
        {name: 'addon', type: 'string'},
        {name: 'modiby', type: 'string'},
        {name: 'modiby_name', type: 'string'},
        {name: 'modion', type: 'string'},
    ]
});