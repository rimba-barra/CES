Ext.define('Erems.model.Mastercitraclub', {
    extend: 'Ext.data.Model',
    alias: 'model.mastercitraclubmodel',
    idProperty: 'citraclub_id',
    fields: [
        {
            name: 'citraclub_id',
            type: 'int'
        },
        {
            name: 'code',
            type: 'string'
        },
        {
            name: 'clubname',
            type: 'string'
        },
        {
            name: 'description',
            type: 'string'
        }
    ]
});