Ext.define('Erems.model.Email', {
    extend: 'Ext.data.Model',
    alias: 'model.email',
        
    idProperty: 'user_id',

    fields: [
        {name: 'user_id',type: 'int'},
        {name: 'user_email',type: 'string'}
    ]
});