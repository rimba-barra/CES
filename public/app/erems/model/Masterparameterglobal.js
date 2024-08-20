Ext.define('Erems.model.Masterparameterglobal', {
    extend: 'Ext.data.Model',
    alias: 'model.masterparameterglobalmodel',
        
    idProperty: 'parameter_id',

    fields: [
        {name: 'parameter_id',type: 'int'},{name: 'parametername',type: 'string'},{name: 'value',type: 'string'},{name: 'datatype',type: 'string'},{name: 'description',type: 'string'},
    ]
});