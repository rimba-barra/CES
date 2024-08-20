Ext.define('Hrd.model.Masterdisckaryawangp', {
    extend: 'Ext.data.Model',
    alias: 'model.masterdisckaryawangpmodel',
    idProperty: 'generalparameter_id',
    fields: [
        {name: 'generalparameter_id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'name_form', type: 'string'},
        {name: 'value', type: 'string'},
        {name: 'employee_value', type: 'string'},
        {name: 'is_approve', type: 'string'},
        {name: 'approveon', type: 'string'},
        {name: 'approveby', type: 'string'},
        {name: 'approveby_name', type: 'string'},
        {name: 'is_reject', type: 'string'},
        {name: 'rejecton', type: 'string'},
        {name: 'rejectby', type: 'string'},
        {name: 'rejectby_name', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
        {name: 'mode_read', type: 'string'},
    ]
});