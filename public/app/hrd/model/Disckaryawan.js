Ext.define('Hrd.model.Disckaryawan', {
    extend: 'Ext.data.Model',
    alias: 'model.DisckaryawanModel',
    idProperty: 'disc_id',
    fields: [
        {
            name: 'disc_id',
            type: 'int'
        },
	{
            name: 'project_id',
            type: 'int'
        },
	{
            name: 'pt_id',
            type: 'int'
        },
        {
            name: 'employee_name',
            type: 'string'
        },
	{
            name: 'employee_project_name',
            type: 'string'
        },
	{
            name: 'employee_pt_name',
            type: 'string'
        },
	{
            name: 'department',
            type: 'string'
        },
	{
            name: 'position',
            type: 'string'
        },
	{
            name: 'hire_date',
            type: 'string'
        },
	{
            name: 'masa_kerja_tahun',
            type: 'string'
        },
	{
            name: 'masa_kerja_bulan',
            type: 'string'
        },
	{
            name: 'max_luastanah',
            type: 'string'
        },
	{
            name: 'max_luasbangunan',
            type: 'string'
        },
	{
            name: 'max_disc',
            type: 'string'
        },
	{
            name: 'max_disc_darimasakerja',
            type: 'string'
        },
	{
            name: 'max_rupiah',
            type: 'string'
        },
	{
            name: 'max_rupiah_darimasakerja',
            type: 'string'
        },
	{
            name: 'tgl_pengajuan',
            type: 'string'
        },
	{
            name: 'lokasi_project_name',
            type: 'string'
        },
	{
            name: 'kawasan',
            type: 'string'
        },
	{
            name: 'blok',
            type: 'string'
        },
	{
            name: 'tipe_rumah',
            type: 'string'
        },
	{
            name: 'jenis',
            type: 'string'
        },
	{
            name: 'luas_tanah_total',
            type: 'string'
        },
	{
            name: 'luas_tanah_total_diskon',
            type: 'string'
        },
	{
            name: 'harga_jual_tanah_m',
            type: 'string'
        },
	{
            name: 'total_harga_tanah',
            type: 'string'
        },
	{
            name: 'luas_bangunan_total',
            type: 'string'
        },
	{
            name: 'luas_bangunan_total_diskon',
            type: 'string'
        },
	{
            name: 'harga_jual_bangunan_m',
            type: 'string'
        },
	{
            name: 'harga_atcost_bangunan_m',
            type: 'string'
        },
	{
            name: 'total_harga_bangunan_atcost',
            type: 'string'
        },
	{
            name: 'harga_pricelist',
            type: 'string'
        },
	{
            name: 'kondisi_kavling',
            type: 'string'
        },
	{
            name: 'diskon_sudut',
            type: 'string'
        },
	{
            name: 'diskon_tusuksate',
            type: 'string'
        },
	{
            name: 'harga_setelah_diskon',
            type: 'string'
        },
	{
            name: 'hcproject',
            type: 'string'
        },
	{
            name: 'gmproject',
            type: 'string'
        },
	{
            name: 'directorproject',
            type: 'string'
        },
	{
            name: 'hckp1',
            type: 'string'
        },
	{
            name: 'hckp2',
            type: 'string'
        },
	{
            name: 'directorkp',
            type: 'string'
        },
	{
            name: 'status_name',
            type: 'string'
        },
	{
            name: 'approvedate_hcproject',
            type: 'string'
        },
	{
            name: 'approvedate_gmproject',
            type: 'string'
        },
	{
            name: 'approvedate_hckp1',
            type: 'string'
        },
	{
            name: 'approvedate_hckp2',
            type: 'string'
        },
	{
            name: 'approvedate_directorkp',
            type: 'string'
        },
	{
            name: 'approvedate_directorproject',
            type: 'string'
        },
	{
            name: 'noref',
            type: 'string'
        },
	{
            name: 'yth',
            type: 'string'
        },
	{
            name: 'total_diskon_diberikan',
            type: 'string'
        },
	{
            name: 'persen_ditanggung_project',
            type: 'string'
        },
	{
            name: 'rp_ditanggung_project',
            type: 'string'
        },
	{
            name: 'rp_ditanggung_projectemp',
            type: 'string'
        }
    ]
});