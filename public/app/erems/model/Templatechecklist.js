Ext.define('Erems.model.Templatechecklist', {
    extend: 'Ext.data.Model',
    alias: 'model.templatechecklistmodel',

    idProperty: 'checklist_bangunan_id',

    fields: [
        {
            name: 'checklist_bangunan_id',
            type: 'int'
        },
        {
            name: 'type_id',
            type: 'int'
        },{
            name: 'type',
            type: 'string'
        },{
            name: 'description',
            type: 'string'
        },
        {
            name: 'filename',
            type: 'string'
        },
        {
            name: 'addby',
            type: 'string'
        },
        {
            name: 'Addon',
            type: 'string'
        },
        {
            name: 'Modion',
            type: 'string'
        },
        {
            name:'Modiby',
            type:'string'
        }
    ]
});