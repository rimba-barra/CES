Ext.define('Hrd.model.Levelcategory', {
    extend: 'Ext.data.Model',
    alias: 'model.levelcategorymodel',
        
    idProperty: 'level_category_id',

    fields: [
        {name: 'level_category_id', type: 'int'},
        {name: 'level_category', type: 'string'}
    ]
});