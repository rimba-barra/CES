Ext.define('Hrd.model.EducationFormal', {
    extend: 'Ext.data.Model',
    alias: 'model.educationformalmodel',
    idProperty: 'educationhistory_id',
    fields: [
        {name: 'educationhistory_id', type: 'int'},
        {name: 'employee_id', type: 'int'},
        {name: 'stage', type: 'string'},
        {name: 'start_year',  type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'end_year',  type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'school', type: 'string'},
        {name: 'subjected', type: 'string'},
        {name: 'ijasah', type: 'string'},      
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'mode_read', type: 'string'},       
    ]
});