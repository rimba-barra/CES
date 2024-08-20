Ext.define('Erems.model.Pindahkavlingdetail', {
    extend: 'Ext.data.Model',
    alias: 'model.pindahkavlingdetailmodel',
    idProperty: 'changekavling_id',
    fields: [
        {name: 'changekavling_id', type: 'int'},
        {name: 'purchaseletter01_id', type: 'int'},
        {name: 'marketingstock_id', type: 'int'},
        {name: 'purchaseletter02_id', type: 'int'},
        {name: 'purchaseletter_no', type: 'string'},
        {name: 'purchase_date', type: 'date'},
        {name: 'remaining_balance', type: 'string'},
        {name: 'total_payment', type: 'string'},
        {name: 'total_interst', type: 'string'},
        {name: 'tanahpermeter', type: 'string'},
        {name: 'kelebihantanah', type: 'string'},
        {name: 'harga_tanah', type: 'string'},
        {name: 'harga_kelebihantanah', type: 'string'},
        {name: 'harga_bangunan', type: 'string'},
        {name: 'harga_jualdasar', type: 'string'},
        {name: 'persen_dischargedasar', type: 'string'},
        {name: 'harga_dischargedasar', type: 'string'},
        {name: 'persen_dischargetanah', type: 'string'},
        {name: 'harga_dischargetanah', type: 'string'},
        {name: 'persen_dischargebangunan', type: 'string'},
        {name: 'harga_dischargebangunan', type: 'string'},
        {name: 'harga_neto', type: 'string'},
        {name: 'persen_ppntanah', type: 'string'},
        {name: 'harga_ppntanah', type: 'string'},
        {name: 'persen_ppnbangunan', type: 'string'},
        {name: 'harga_ppnbangunan', type: 'string'},
        {name: 'harga_bbnsertifikat', type: 'string'},
        {name: 'harga_bphtb', type: 'string'},
        {name: 'harga_bajb', type: 'string'},
        {name: 'harga_jual', type: 'string'},
        {name: 'persen_salesdisc', type: 'string'},
        {name: 'harga_salesdisc', type: 'string'},
        {name: 'harga_admsubsidi', type: 'string'},
        {name: 'harga_pmutu', type: 'string'},
        {name: 'harga_administrasi', type: 'string'},
        {name: 'harga_paket_tambahan', type: 'string'},
        {name: 'harga_total_jual', type: 'string'},
        {name: 'detail', type: 'object'},
        {name: 'reason_id', type: 'string'},
        {name: 'notes', type: 'string'},
        {name: 'movereason_id', type: 'int'},
        {name: 'movereason_code', type: 'string'},
        /*aaaa*/
        {name: 'old_unit_id', type: 'int'},
        {name: 'unit_unit_id', type: 'int'},
        {name: 'unit_cluster_id', type: 'int'},
        {name: 'unit_unit_number', type: 'string'},
        {name: 'unit_block_id', type: 'int'},
        {name: 'unit_productcategory_id', type: 'int'},
        {name: 'unit_type_id', type: 'int'},
        {name: 'unit_land_size', type: 'string'},
        {name: 'unit_building_size', type: 'string'},
        {name: 'unit_kelebihan', type: 'string'},
        {name: 'unit_long', type: 'string'},
        {name: 'unit_width', type: 'string'},
        {name: 'unit_floor', type: 'string'},
        {name: 'state_admistrative', type: 'string'},
        {name: 'cluster_cluster', type: 'string'},
        {name: 'cluster_code', type: 'string'},
        {name: 'block_block', type: 'string'},
        {name: 'block_code', type: 'string'},
        {name: 'unit_productcategory', type: 'string'},
        {name: 'unit_type_name', type: 'string'},
        {name: 'unit_type_code', type: 'string'},
        {name: 'new_unit_unit_id', type: 'int'},
        {name: 'new_unit_cluster_id', type: 'int'},
        {name: 'new_unit_unit_number', type: 'string'},
        {name: 'new_unit_block_id', type: 'int'},
        {name: 'new_unit_productcategory_id', type: 'int'},
        {name: 'new_unit_type_id', type: 'int'},
        {name: 'new_unit_land_size', type: 'string'},
        {name: 'new_unit_building_size', type: 'string'},
        {name: 'new_unit_kelebihan', type: 'string'},
        {name: 'new_unit_long', type: 'string'},
        {name: 'new_unit_width', type: 'string'},
        {name: 'new_unit_floor', type: 'string'},
        {name: 'new_cluster_cluster', type: 'string'},
        {name: 'new_cluster_code', type: 'string'},
        {name: 'new_block_block', type: 'string'},
        {name: 'new_block_code', type: 'string'},
        {name: 'new_unit_productcategory', type: 'string'},
        {name: 'new_unit_type_name', type: 'string'},
        {name: 'new_unit_type_code', type: 'string'},
        {name: 'customer_photo', type: 'string'},
        {name: 'customer_address', type: 'string'},
        {name: 'customer_city_id', type: 'int'},
        {name: 'customer_email', type: 'string'},
        {name: 'customer_fax', type: 'string'},
        {name: 'customer_homephone', type: 'string'},
        {name: 'customer_ktp', type: 'string'},
        {name: 'customer_mobilephone', type: 'string'},
        {name: 'customer_name', type: 'string'},
        {name: 'customer_npwp', type: 'string'},
        {name: 'customer_officephone', type: 'string'},
        {name: 'customer_zipcode', type: 'string'},
        /*bb*/
        {name: 'new_tanahpermeter', type: 'string'},
        {name: 'new_kelebihantanah', type: 'string'},
        {name: 'new_harga_tanah', type: 'string'},
        {name: 'new_harga_kelebihantanah', type: 'string'},
        {name: 'new_harga_bangunan', type: 'string'},
        {name: 'new_harga_jualdasar', type: 'string'},
        {name: 'new_persen_dischargedasar', type: 'string'},
        {name: 'new_harga_dischargedasar', type: 'string'},
        {name: 'new_persen_dischargetanah', type: 'string'},
        {name: 'new_harga_dischargetanah', type: 'string'},
        {name: 'new_persen_dischargebangunan', type: 'string'},
        {name: 'new_harga_dischargebangunan', type: 'string'},
        {name: 'new_harga_neto', type: 'string'},
        {name: 'new_persen_ppntanah', type: 'string'},
        {name: 'new_harga_ppntanah', type: 'string'},
        {name: 'new_persen_ppnbangunan', type: 'string'},
        {name: 'new_harga_ppnbangunan', type: 'string'},
        {name: 'new_harga_bbnsertifikat', type: 'string'},
        {name: 'new_harga_bphtb', type: 'string'},
        {name: 'new_harga_bajb', type: 'string'},
        {name: 'new_harga_jual', type: 'string'},
        {name: 'new_persen_salesdisc', type: 'string'},
        {name: 'new_harga_salesdisc', type: 'string'},
        {name: 'new_harga_admsubsidi', type: 'string'},
        {name: 'new_harga_pmutu', type: 'string'},
        {name: 'new_harga_administrasi', type: 'string'},
        {name: 'new_harga_paket_tambahan', type: 'string'},
        {name: 'new_harga_total_jual', type: 'string'}


    ]
});