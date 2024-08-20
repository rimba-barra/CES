Ext.define('Hrd.model.EducationNonFormal', {
    extend: 'Ext.data.Model',
    alias: 'model.educationnonformalmodel',
    idProperty: 'traininghistory_id',
    fields: [
        {name: 'traininghistory_id', type: 'int'},
        {name: 'employee_id', type: 'int'},
        {name: 'training', type: 'string'},
        {name: 'organizer', type: 'string'},
        {name: 'city_name', type: 'string'},
        {name: 'years', type: 'int'},
        {name: 'sertifikat', type: 'int'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'mode_read', type: 'string'},
    ]
});