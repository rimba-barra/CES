Ext.define('Erems.model.Masterformula', {
    extend: 'Ext.data.Model',
    alias: 'model.masterformulamodel',
    idProperty: 'billingrules_id',
    fields: [
        {
            name: 'billingrules_id',
            type: 'int'
        },
        {
            name: 'code',
            type: 'string'
        },
        {
            name: 'description',
            type: 'string'
        },
        {
            name: 'pricetype_id',
            type: 'int'
        },
        {
            name: 'persen_tandajadi',
            type: 'string'
        },
        {
            name: 'tandajadi',
            type: 'string'
        },
        {
            name: 'persen_uangmuka',
            type: 'string'
        },
        {
            name: 'uangmuka',
            type: 'string'
        },
        {
            name: 'periode_uangmuka',
            type: 'int'
        },
        {
            name: 'type_periode_uangmuka',
            type: 'string'
        },
        {
            name: 'term_uangmuka',
            type: 'int'
        },
        {
            name: 'periode_angsuran',
            type: 'int'
        },
        {
            name: 'type_periode_angsuran',
            type: 'string'
        },
        {
            name: 'term_angsuran',
            type: 'int'
        },
        {
            name:'Active',
            type:'int'
        },
        {
            name:'is_balloon',
            type:'int'
        },  
        {
            name:'details',
            type:'array'
        },  
        {
            name:'is_jeda',
            type:'int'
        },  
        {
            name:'periode_jeda',
            type:'int'
        },  
        {
            name:'type_periode_jeda',
            type:'int'
        }
    ]
});