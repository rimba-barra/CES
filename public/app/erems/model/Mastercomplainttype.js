Ext.define('Erems.model.Mastercomplainttype', {
    extend: 'Ext.data.Model',
    alias: 'model.mastercomplainttypemodel',
        
    idProperty: 'complainttype_id',

    fields: [
        {name: 'complainttype_id',type: 'int'},{name: 'code',type: 'string'},{name: 'complainttype',type: 'string'},{name: 'description',type: 'string'},
    ]
});