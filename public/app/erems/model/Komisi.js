Ext.define('Erems.model.Komisi', {
    extend: 'Ext.data.Model',
    alias: 'model.komisimodel',
    idProperty: 'komisi_pencairan_detail_id',
    fields: [
        {name: 'komisi_pencairan_detail_id', type: 'int'},
        {name:'penerima_komisi',type:'string'},
        {name:'employee_name',type:'string'},
        {name:'persentase',type:'string'}
    ]
});