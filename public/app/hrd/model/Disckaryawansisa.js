Ext.define('Hrd.model.Disckaryawansisa', {
    extend: 'Ext.data.Model',
    alias: 'model.DisckaryawansisaModel',
    idProperty: 'employee_id',
    fields: [		
        {
            name: 'employee_id',
            type: 'int'
        },
	{
            name: 'project_id',
            type: 'int'
        },
	{
            name: 'pt_id',
            type: 'int'
        },
	{
            name: 'project_name',
            type: 'string'
        },
	{
            name: 'pt_name',
            type: 'string'
        },
        {
            name: 'employee_name',
            type: 'string'
        },
	{
            name: 'amount',
            type: 'string'
        },
	{
            name: 'tanah',
            type: 'string'
        },
	{
            name: 'bangunan',
            type: 'string'
        },
	{
            name: 'addon',
            type: 'string'
        }
    ]
});