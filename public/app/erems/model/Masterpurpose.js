Ext.define('Erems.model.Masterpurpose', {
    extend: 'Ext.data.Model',
    alias: 'model.masterpurposemodel',

    idProperty: 'purpose_id',

    fields: [
        {
            name: 'purpose_id',
            type: 'int'
        },
        {
            name: 'code',
            type: 'string'
        },{
            name: 'purpose',
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
        },
        {
            name: 'use_target_sales',
            type: 'int'
        },
    ]
});