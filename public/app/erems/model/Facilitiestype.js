Ext.define('Erems.model.Facilitiestype', {
    extend: 'Ext.data.Model',
    alias: 'model.facilitiestypemodel',

    idProperty: 'facilitiestype_id',

    fields: [
        {
            name: 'facilitiestype_id',
            type: 'int'
        },
        {
            name: 'code',
            type: 'string'
        },
		{
            name: 'facilitiestype',
            type: 'string'
        },
        {
            name: 'description',
            type: 'string'
        },
        {
            name: 'icon',
            type: 'string'
        },
        {
            name:'active',
            type:'int'
        }
    ]
});