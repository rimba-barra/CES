Ext.define('Erems.model.Masterkoefisienformdatadetail', {
    extend: 'Ext.data.Model',
    alias: 'model.masterkoefisienformdatadetailmodel',
    idProperty: 'koefisien_detail_id',
    fields: [
        {name: 'koefisien_detail_id', type: 'int'},
        {name: 'koefisien_id', type: 'int'},
        {name: 'scheduletype_id', type: 'int'},
        {name: 'type_name', type: 'string'},
        {name: 'termin', type: 'int'},
        {name: 'um_inh_persen', type: 'desimal'},
        {name: 'npv', type: 'desimal'}
    ]
});