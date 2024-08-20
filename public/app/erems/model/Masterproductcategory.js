Ext.define('Erems.model.Masterproductcategory', {
    extend: 'Ext.data.Model',
    alias: 'model.masterproductcategorymodel',

    idProperty: 'productcategory_id',

    fields: [
        {
            name: 'productcategory_id',
            type: 'int'
        },
        {
            name: 'code',
            type: 'string'
        },{
            name: 'productcategory',
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