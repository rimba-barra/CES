Ext.define('Erems.model.Masterposisi', {
    extend: 'Ext.data.Model',
    alias: 'model.masterposisimodel',

    idProperty: 'position_id',

    fields: [
        {
            name: 'position_id',
            type: 'int'
        },
        {
            name: 'code',
            type: 'string'
        },{
            name: 'position',
            type: 'string'
        },{
            name: 'description',
            type: 'string'
        },
        {
            name: 'cluster_id',
            type: 'int'
        },
        {
            name: 'addby',
            type: 'string'
        },{
            name: 'Addon',
            type: 'string'
        },{
            name: 'Modion',
            type: 'string'
        },
        {
            name:'Modiby',
            type:'string'
        },
        {
            name:'user_name',
            type:'string'
        },
        {
            name:'cluster'
        },
        {
            name:'modi_user_name'
        }
    ]
});