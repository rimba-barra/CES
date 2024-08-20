Ext.define('Erems.model.Masterdiscountmarketing', {
    extend: 'Ext.data.Model',
    alias: 'model.MasterdiscountmarketingModel',

    idProperty: 'discountmarketing_id',

    fields: [
        {
            name: 'discountmarketing_id',
            type: 'int'
        },
        {
            name: 'project_id',
            type: 'int'
        },
        {
            name: 'project_id',
            type: 'int'
        },
        {
            name: 'code',
            type: 'string'
        },
        {
            name: 'name',
            type: 'string'
        },
		{
            name: 'disc_nilai',
            type: 'decimal'
        }
    ]
});