Ext.define('Erems.model.Masterformulaballoon', {
    extend: 'Ext.data.Model',
    alias: 'model.masterformulaballoonmodel',
    idProperty: 'billingrulesballoon_id',
    fields: [
        {
            name: 'billingrulesballoon_id',
            type: 'int'
        },        
        {
            name: 'schedule_type_balloon',
            type: 'int'
        },
        {
            name: 'term_angsuran',
            type: 'int'
        },
        {
            name: 'persen',
            type: 'string'
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
            name: 'billingrules_id',
            type: 'int'
        },
        {
            name:'deleted',
            type:'boolean'
        }
    ]
});