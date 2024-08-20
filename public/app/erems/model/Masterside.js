Ext.define('Erems.model.Masterside', {
    extend: 'Ext.data.Model',
    alias: 'model.mastersidemodel',

    idProperty: 'side_id',

    fields: [
        {
            name: 'side_id',
            type: 'int'
        },
        {
            name: 'code',
            type: 'string'
        },{
            name: 'side',
            type: 'string'
        },{
            name: 'description',
            type: 'string'
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
            name:'modi_user_name'
        }
    ]
});