Ext.define('Gl.model.Offset', {
    extend: 'Ext.data.Model',
    alias: 'model.offsetmodel',
    idProperty: 'coa_id',
    fields: [             
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},         
        {name: 'coa_id_debet', type: 'int'},
        {name: 'coa_id_credit', type: 'int'},  
        {name: 'kelsub_id_debet', type: 'int'}, 
        {name: 'kelsub_id_credit', type: 'int'},
        {name: 'from_month', type: 'int'},    
        {name: 'until_month', type: 'int'},
        
        {name: 'coa_debet', type: 'string'},
        {name: 'coa_credit', type: 'string'},
        {name: 'namecoa_debet', type: 'string'},
        {name: 'namecoa_credit', type: 'string'},         
        {name: 'kelsub_debet', type: 'string'},        
        {name: 'kelsub_credit', type: 'string'},    
            
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
    ]
});