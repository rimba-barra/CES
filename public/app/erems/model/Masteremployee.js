Ext.define('Erems.model.Masteremployee', {
    extend: 'Ext.data.Model',
    alias: 'model.masteremployeemodel',
        
    idProperty: 'employee_id',

    fields: [
        {name: 'employee_id',type: 'int'},
		{name: 'employee_nik',type: 'string'},
		{name: 'employee_name',type: 'string'},
		{name: 'jabatan_code',type: 'string'},
		{name: 'project_id',type: 'int'},
		{name: 'pt_id',type: 'int'},
		{name: 'description',type: 'string'},
		{name: 'jabatan_name',type: 'string'},
		{name: 'position',type: 'string'}
    ]
});