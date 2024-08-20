Ext.define('Hrd.model.Groupcode', {
    extend: 'Ext.data.Model',
    alias: 'model.groupcodemodel',
    idProperty: 'group_code',
    fields: [
        {name: 'hideparam', type: 'string'},
        {name: 'group_code', type: 'string'},
    ]
});

