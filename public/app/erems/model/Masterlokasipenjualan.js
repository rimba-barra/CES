Ext.define('Erems.model.Masterlokasipenjualan', {
    extend: 'Ext.data.Model',
    alias: 'model.masterlokasipenjualanmodel',
    idProperty: 'saleslocation_id',
    fields: [
        {
            name: 'saleslocation_id',
            type: 'int'
        },
        {
            name: 'code',
            type: 'string'
        },
        {
            name: 'saleslocation',
            type: 'string'
        },
        {
            name: 'description',
            type: 'string'
        },
        {
            name: 'project_id',
            type: 'int'
        },
        {
            name: 'pt_id',
            type: 'int'
        },
    ]
});