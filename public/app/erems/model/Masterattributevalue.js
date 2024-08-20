Ext.define('Erems.model.Masterattributevalue', {
    extend: 'Ext.data.Model',
    alias: 'model.masterattributevaluemodel',

    idProperty: 'attributevalue_id',

    fields: [
        {
            name: 'attributevalue_id',
            type: 'int'
        },
        {
            name: 'code',
            type: 'string'
        },{
            name: 'attributevalue',
            type: 'string'
        },{
            name: 'description',
            type: 'string'
        },{
            name: 'attribute_id',
            type: 'int'
        },{
            name: 'is_default',
            type: 'int'
        }
        
    ]
});