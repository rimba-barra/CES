Ext.define('Hrd.view.disckaryawangolongan.Grid', {
    extend: 'Hrd.library.template.view.Grid',
    //extend: 'Ext.grid.Panel',    
    alias: 'widget.disckaryawangolongangrid',
    itemId: 'disckaryawangolongangrid',	   
    store: 'Disckaryawangolongan',
    bindPrefixName: 'Disckaryawangolongan',		
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
		dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    height: 28,
                    items: [
                        {
                            xtype: 'button',
                            action: 'update',
                            disabled: true,
                            hidden: true,
                            itemId: 'btnEdit',
                            margin: '0 5 0 0',
                            iconCls: 'icon-edit',
                            text: 'Edit',
                            bindAction: me.bindPrefixName + 'Update'
                        }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    displayInfo: true,
                    store: me.getStore(),
                    plugins: Ext.create('PagingToolbarPageSize')
                }
            ],
            viewConfig: { markDirty: false },
            columnLines: true,
            selModel: Ext.create('Ext.selection.CheckboxModel', {}),
            columns: [
                {xtype: 'rownumberer'},
		{
                    xtype: 'gridcolumn',
                    text: 'ID',
                    dataIndex: 'disc_id',                                                                               
                    hidden: true,
                    hideable: false,
                    width: 40,
                    align: 'right'
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Project',
                    dataIndex: 'employee_project_name',					                   
                    hideable: false,
                    width: 150					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'PT',
                    dataIndex: 'employee_pt_name',					                   
                    hideable: false,
                    width: 150					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Lokasi Project Pembelian',
                    dataIndex: 'lokasi_project_name',					                   
                    hideable: false,
                    width: 150					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Status Transaksi',
                    dataIndex: 'status_name',					                   
                    hideable: false,
                    width: 150					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'No Ref',
                    dataIndex: 'noref',					                   
                    hideable: false,
                    width: 120					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Employee Name',
                    dataIndex: 'employee_name',					                   
                    hideable: false,
                    width: 150					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Group (Golongan)',
                    dataIndex: 'group_code',					                   
                    hideable: false,
                    width: 120					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Department',
                    dataIndex: 'department',					                   
                    hideable: false,
                    width: 150					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Position',
                    dataIndex: 'position',					                   
                    hideable: false,
                    width: 150					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Hire Date',
                    dataIndex: 'hire_date',					                   
                    hideable: false,
                    width: 120					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Masa Kerja Tahun',
                    dataIndex: 'masa_kerja_tahun',					                   
                    hideable: false,
                    width: 120					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Masa Kerja Bulan',
                    dataIndex: 'masa_kerja_bulan',					                   
                    hideable: false,
                    width: 120					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Max Luas Tanah (m2)',
                    dataIndex: 'max_luastanah',					                   
                    hideable: false,
                    width: 130					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Max Luas Bangunan (m2)',
                    dataIndex: 'max_luasbangunan',					                   
                    hideable: false,
                    width: 150					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Max Disc (%)',
                    dataIndex: 'max_disc',					                   
                    hideable: false,
                    width: 150					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Max Disc dari masa kerja (%)',
                    dataIndex: 'max_disc_darimasakerja',					                   
                    hideable: false,
                    width: 150					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Tgl Pengajuan',
                    dataIndex: 'tgl_pengajuan',					                   
                    hideable: false,
                    width: 120					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Kawasan',
                    dataIndex: 'kawasan',					                   
                    hideable: false,
                    width: 150					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Blok',
                    dataIndex: 'blok',					                   
                    hideable: false,
                    width: 150					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Tipe',
                    dataIndex: 'tipe_rumah',					                   
                    hideable: false,
                    width: 150					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Jenis',
                    dataIndex: 'jenis',					                   
                    hideable: false,
                    width: 150					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Luas Tanah Total',
                    dataIndex: 'luas_tanah_total',					                   
                    hideable: false,
                    width: 120					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Luas Tanah Diskon',
                    dataIndex: 'luas_tanah_total_diskon',					                   
                    hideable: false,
                    width: 120					
                },
                {
                    xtype: 'numbercolumn',
                    text: 'Harga tanah /m2',
                    dataIndex: 'harga_jual_tanah_m',					                   
                    hideable: false,
                    width: 150					
                },
                {
                    xtype: 'numbercolumn',
                    text: 'Total Harga Tanah',
                    dataIndex: 'total_harga_tanah',					                   
                    hideable: false,
                    width: 150					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Luas Bangunan Total',
                    dataIndex: 'luas_bangunan_total',					                   
                    hideable: false,
                    width: 120					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Luas Bangunan Diskon',
                    dataIndex: 'luas_bangunan_total_diskon',					                   
                    hideable: false,
                    width: 120					
                },
                {
                    xtype: 'numbercolumn',
                    text: 'Harga Bangunan /m2',
                    dataIndex: 'harga_jual_bangunan_m',					                   
                    hideable: false,
                    width: 150					
                },
                {
                    xtype: 'numbercolumn',
                    text: 'Harga atcost Bangunan /m2',
                    dataIndex: 'harga_atcost_bangunan_m',					                   
                    hideable: false,
                    width: 150					
                },
                {
                    xtype: 'numbercolumn',
                    text: 'Total atcost Bangunan',
                    dataIndex: 'total_harga_bangunan_atcost',					                   
                    hideable: false,
                    width: 150					
                },
                {
                    xtype: 'numbercolumn',
                    text: 'Harga Price List',
                    dataIndex: 'harga_pricelist',					                   
                    hideable: false,
                    width: 150					
                },
                {
                    xtype: 'numbercolumn',
                    text: 'Total Diskon',
                    dataIndex: 'total_diskon_diberikan',					                   
                    hideable: false,
                    width: 150					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Kondisi Kavling',
                    dataIndex: 'kondisi_kavling',					                   
                    hideable: false,
                    width: 120					
                },
                {
                    xtype: 'numbercolumn',
                    text: 'Diskon Sudut ',
                    dataIndex: 'diskon_sudut',					                   
                    hideable: false,
                    width: 120					
                },
                {
                    xtype: 'numbercolumn',
                    text: 'Diskon Tusuk Sate',
                    dataIndex: 'diskon_tusuksate',					                   
                    hideable: false,
                    width: 120					
                },
                {
                    xtype: 'numbercolumn',
                    text: 'Total Diskon',
                    dataIndex: 'total_diskon_diberikan',					                   
                    hideable: false,
                    width: 120					
                },
                {
                    xtype: 'numbercolumn',
                    text: 'Persen Ditanggung Project',
                    dataIndex: 'persen_ditanggung_project',					                   
                    hideable: false,
                    width: 150					
                },
                {
                    xtype: 'numbercolumn',
                    text: 'Rp Ditanggung Project',
                    dataIndex: 'rp_ditanggung_project',					                   
                    hideable: false,
                    width: 150					
                },
                {
                    xtype: 'numbercolumn',
                    text: 'Rp Ditanggung Project Employee',
                    dataIndex: 'rp_ditanggung_projectemp',					                   
                    hideable: false,
                    width: 150					
                },                
                {
                    xtype: 'numbercolumn',
                    text: 'Harga Setelah Diskon',
                    dataIndex: 'harga_setelah_diskon',					                   
                    hideable: false,
                    width: 120					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'HC Project',
                    dataIndex: 'hcproject',					                   
                    hideable: false,
                    width: 120					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Approve HC Project',
                    dataIndex: 'approvedate_hcproject',					                   
                    hideable: false,
                    width: 150					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'GM Project',
                    dataIndex: 'gmproject',					                   
                    hideable: false,
                    width: 120					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Approve GM Project',
                    dataIndex: 'approvedate_hcproject',					                   
                    hideable: false,
                    width: 150					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Director Project',
                    dataIndex: 'directorproject',					                   
                    hideable: false,
                    width: 120					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Approve Dir Project',
                    dataIndex: 'approvedate_directorproject',					                   
                    hideable: false,
                    width: 150					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'HC Kantor Pusat Tahap 1',
                    dataIndex: 'hckp1',					                   
                    hideable: false,
                    width: 150					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Approve HC KP Tahap 1',
                    dataIndex: 'approvedate_hckp1',					                   
                    hideable: false,
                    width: 150					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'HC KP Tahap 2',
                    dataIndex: 'hckp2',					                   
                    hideable: false,
                    width: 150					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Approve HC KP Tahap 2',
                    dataIndex: 'approvedate_hckp2',					                   
                    hideable: false,
                    width: 150					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Director KP',
                    dataIndex: 'directorkp',					                   
                    hideable: false,
                    width: 150					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Approve HC Dir KP',
                    dataIndex: 'approvedate_directorkp',					                   
                    hideable: false,
                    width: 120					
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Surat Rekomendasi ditujukan kepada',
                    dataIndex: 'yth',					                   
                    hideable: false,
                    width: 150					
                },
                me.generateActionColumn()
                
                
            ]
        });
        
              
               
me.callParent(arguments);
    }
});