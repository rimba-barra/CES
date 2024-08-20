Ext.define('Gl.model.Accountdebet', {
    extend: 'Ext.data.Model',
    alias: 'model.accountdebetmodel',
    idProperty: 'coa_id',
    fields: [             
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},         
        {name: 'coa_id_debet', type: 'int'},     
        {name: 'kelsub_id_debet', type: 'int'},   
        {name: 'coa_debet', type: 'string'},
        {name: 'name_debet', type: 'string'},
        {name: 'kelsub_debet', type: 'string'},        
        {name: 'type_debet', type: 'string'},        
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
    ]
});