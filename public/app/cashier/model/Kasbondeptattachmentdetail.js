Ext.define('Cashier.model.Kasbondeptattachmentdetail', {
    extend: 'Ext.data.Model',
    alias: 'model.kasbondeptattachmentdetailmodel',
    idProperty: 'attachment_id',
    fields: [
        {name: 'attachment_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'transaction_id', type: 'int'},
        {name: 'title', type: 'string'},
        {name: 'module', type: 'string'},
        {name: 'filename', type: 'string'},
        {name: 'filesize', type: 'string'},
        {name: 'path', type: 'string'},
        {name: 'remarks', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'addby', type: 'int'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
        {name: 'link', type: 'string'},
        {name: 'addon', type: 'string'},
        {name: 'statedata', type: 'string'},
        {name : 'kasbondeptdetail_id', type: 'int'}
    ]
});