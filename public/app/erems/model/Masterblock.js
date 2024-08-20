Ext.define('Erems.model.Masterblock', {
    extend: 'Ext.data.Model',
    alias: 'model.masterblockmodel',

    idProperty: 'block_id',

    fields: [
        {
            name: 'block_id',
            type: 'int'
        },
        {
            name: 'code',
            type: 'string'
        },{
            name: 'block',
            type: 'string'
        },{
            name: 'description',
            type: 'string'
        },{
            name: 'cluster_id',
            type: 'int'
        },
        {
            name: 'cluster',
            type: 'string'
        },
        {
            name: 'Addby',
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
            name:'cluster'
        },
        {
            name:'user_name'
        },
        {
            name:'modi_user_name'
        }
    ]
});