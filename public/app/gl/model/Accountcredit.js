Ext.define('Gl.model.Accountcredit', {
    extend: 'Ext.data.Model',
    alias: 'model.accountcreditmodel',
    idProperty: 'coa_id',
    fields: [             
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},         
        {name: 'coa_id_credit', type: 'int'},     
        {name: 'kelsub_id_credit', type: 'int'},   
        {name: 'coa_credit', type: 'string'},
        {name: 'name_credit', type: 'string'},
        {name: 'kelsub_credit', type: 'string'},        
        {name: 'type_credit', type: 'string'},        
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
    ]
});