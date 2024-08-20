Ext.define('Erems.model.Mastertypeattribute', {
    extend: 'Ext.data.Model',
    alias: 'model.mastertypeattributemodel',

    idProperty: 'typeattribute_id',

    fields: [
        {
            name: 'typeattribute_id',
            type: 'int'
        },{
            name: 'type_id',
            type: 'int'
        },{
            name: 'attribute_id',
            type: 'int'
        },{
            name: 'attributevalue_id',
            type: 'int'
        },
        {
            name: 'attribute',
            type: 'string'
        },{
            name: 'attributevalue',
            type: 'string'
        },{
            name:'value',
            type:'string'
        }
        
    ]
});