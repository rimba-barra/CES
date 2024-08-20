Ext.define('Erems.model.Sourcemoney', {
    extend: 'Ext.data.Model',
    alias: 'model.sourcemoneymodel',

    idProperty: 'sourcemoney_id',

    fields: [
        {
            name: 'sourcemoney_id',
            type: 'int'
        },
        {
            name: 'sourcemoney',
            type: 'string'
        }
    ]
});