Ext.define('Hrd.model.Employeeptkp', {
    extend: 'Ext.data.Model',
    alias: 'model.employeeptkpmodel',
    idProperty: 'employeeptkp_id',
    fields: [
        {name: 'employeeptkp_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'projectname', type: 'string'},
        {name: 'pt_id', type: 'int'},
        {name: 'ptname', type: 'string'},
        {name: 'periode', type: 'string'},
        {name: 'effective_date', type: 'date'},
        {name: 'claim_effective_date', type: 'date'},
        {name: 'is_checked', type: 'int'},
        {name: 'is_applied', type: 'int'},
        {name: 'ptkp', type: 'string'},
        {name: 'ptkp_id', type: 'int'},
        {name: 'ptkp_claim', type: 'string'},
        {name: 'ptkp_claim_id', type: 'int'},
        {name: 'employee_name', type: 'string'},
        {name: 'department', type: 'string'},
        {name: 'note', type: 'string'},
        {name: 'sex', type: 'string'},
        {name: 'child_count', type: 'int'},
        {name: 'marriagestatus', type: 'string'},
        {name: 'employee_nik', type: 'string'}
    ]
});