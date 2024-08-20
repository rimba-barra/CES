Ext.define('Erems.model.Masterattribute', {
    extend: 'Ext.data.Model',
    alias: 'model.masterattributemodel',

    idProperty: 'attribute_id',

    fields: [
        {
            name: 'attribute_id',
            type: 'int'
        },
        {
            name: 'code',
            type: 'string'
        },{
            name: 'attribute',
            type: 'string'
        },{
            name: 'description',
            type: 'string'
        },{
            name: 'is_freetext',
            type: 'int'
        },{
            name: 'datatype',
            type: 'string'
        },{
            name: 'is_default',
            type: 'int'
        },{
            name: 'atttype_id',
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
            name:'detail'
        },
        {
            name:'modi_user_name'
        },

        //added by anas 28042021
        {
            name: 'urut',
            type: 'int'
        }
    ]
});