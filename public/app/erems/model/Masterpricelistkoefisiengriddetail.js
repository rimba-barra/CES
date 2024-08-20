Ext.define('Erems.model.Masterpricelistkoefisiengriddetail', {
    extend: 'Ext.data.Model',
    alias: 'model.masterpricelistkoefisiengriddetailmodel',
    idProperty: 'pricelist_detail_koefisien_id',
    fields: [
        {name: 'pricelist_detail_koefisien_id', type: 'int'},
        {name: 'pricelist_detail_id', type: 'int'},
        {name: 'pricelist_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'koefisien_id', type: 'int'},
        {name: 'pricetype_id', type: 'int'},
        {name: 'pricetype', type: 'string'},
        {name: 'pricelist', type: 'string'},
        {name: 'koefisien', type: 'decimal'},
        {name: 'biaya_asuransi', type: 'desimal'},
        {name: 'asuransi_nominal_persen', type: 'string'},
        {name: 'biaya_bphtb', type: 'desimal'},
        {name: 'bphtb_nominal_persen', type: 'string'},
        {name: 'biaya_bbn', type: 'desimal'},
        {name: 'bbn_nominal_persen', type: 'string'},
        {name: 'biaya_ajb', type: 'desimal'},
        {name: 'ajb_nominal_persen', type: 'string'},
        {name: 'biaya_administrasi', type: 'desimal'},
        {name: 'administrasi_nominal_persen', type: 'string'}

        ,{name: 'biaya_admsubsidi', type: 'desimal'},
        {name: 'admsubsidi_nominal_persen', type: 'string'},
        {name: 'biaya_pmutu', type: 'desimal'},
        {name: 'pmutu_nominal_persen', type: 'string'},
        {name: 'biaya_paket_tambahan', type: 'desimal'},
        {name: 'paket_tambahan_nominal_persen', type: 'string'},
    ]
});