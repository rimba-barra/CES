Ext.define('Erems.model.Masterpricelistdetail', {
    extend: 'Ext.data.Model',
    alias: 'model.masterpricelistdetailmodel',
    idProperty: 'pricelist_detail_id',
    fields: [
        {name: 'pricelist_detail_id', type: 'int'},
        {name: 'pricelist_id', type: 'int'},
        {name: 'keterangan', type: 'string'},
        {name: 'pricelist_date', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'deleted', type: 'boolean'},

        {name: 'unit_id', type: 'int'},
        {name: 'cluster', type: 'string'},
        {name: 'cluster_code', type: 'string'},
        {name: 'unit_number', type: 'string'},
        {name: 'type_name', type: 'string'},
        {name: 'land_size', type: 'desimal'},
        {name: 'building_size', type: 'desimal'},
        {name: 'harga_tanahpermeter', type: 'desimal'},
        {name: 'harga_bangunanpermeter', type: 'desimal'},
        {name: 'total_hargatanah', type: 'desimal'},
        {name: 'total_hargabangunan', type: 'desimal'},
        {name: 'harga_tanah_margin', type: 'desimal'},
        {name: 'harga_tanah_margin_persen', type: 'desimal'},
        {name: 'harga_bangunan_margin', type: 'desimal'},
        {name: 'harga_bangunan_margin_persen', type: 'desimal'},
        {name: 'harga_netto', type: 'desimal'},
        
        {name: 'is_grossup', type: 'int'},
        {name: 'harga_netto_grossup', type: 'desimal'},
        {name: 'is_bphtb', type: 'int'},
        {name: 'is_ajb', type: 'int'},
        {name: 'is_bbn', type: 'int'},


        {name: 'harga_tanahdevcostpermeter', type: 'desimal'},
        {name: 'harga_tanahmentahpermeter', type: 'desimal'},
        {name: 'harga_tanahhpp', type: 'desimal'},
        {name: 'harga_bangunanhpp', type: 'desimal'},
        {name: 'total_tanah_hpp', type: 'desimal'},
        {name: 'total_bangunan_hpp', type: 'desimal'},
        {name: 'total_hpptanahbangunan', type: 'desimal'},
        {name: 'total_margin', type: 'desimal'},
        {name: 'persentase_margin', type: 'desimal'},
        {name: 'keterangan_unit', type: 'string'},

        {name: 'list_koefisien_id', type: 'string'},
        // added by rico 
        {name: 'grossup_persen', type: 'desimal'},
        {name: 'markup', type: 'desimal'},
        {name: 'margin_persen_tanah', type: 'desimal'},
        {name: 'margin_persen_bangunan', type: 'desimal'},
        
        {name: 'spare', type: 'decimal'},
        {name: 'total_harga_jual', type: 'decimal'},
    ]
});