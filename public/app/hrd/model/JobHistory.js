Ext.define('Hrd.model.JobHistory', {
    extend: 'Ext.data.Model',
    alias: 'model.jobhistorymodel',
    idProperty: 'jobhistory_id',
    fields: [
        {name: 'jobhistory_id', type: 'int'},
        {name: 'employee_id', type: 'int'},
        {name: 'company_name', type: 'string'},
        {name: 'line_of_business', type: 'string'},
        {name: 'division', type: 'string'},
        {name: 'position', type: 'string'},
        {name: 'lamakerja', type: 'string'},
        {name: 'start_date', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'end_date', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'mode_read', type: 'string'},
    ]
});