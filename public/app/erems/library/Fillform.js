Ext.define('Erems.library.Fillform', {
    unitData: function(data,form,formTailPrefix,dataHeadPrefix) {
        
        var filledFields = ['unit_id', 'productcategory', 'type_name', 'land_size', 'long', 'building_size', 'width', 'kelebihan', 'floor', 'block_id', 'cluster_id', 'unit_number','status'];
        var ftp = '',dhp = '';
        if(typeof formTailPrefix =='string'){
            ftp = formTailPrefix;
        }else{
            ftp = '';
        }
        if(typeof dataHeadPrefix =='string'){
            dhp = dataHeadPrefix;
        }else{
            dhp = '';
        }
        for (var x in filledFields) {
            if (form.down('[name=unit_' + filledFields[x]+''+ftp+ ']') != null) {
                form.down('[name=unit_' + filledFields[x]+''+ftp+ ']').setValue(data.data[dhp+'unit_' + filledFields[x]]);
            }

        }
        
    },
    priceData: function(data,form,unitFormula,prefix) {
        var me = this;
        var addPrefix = '';
        if(prefix != undefined){
            addPrefix = prefix;
        }
        form.down('[name='+addPrefix+'_harga_tanah_a]').setValue(unitFormula.fmb(data.get('tanahpermeter')));
        form.down('[name='+addPrefix+'_harga_tanah_b]').setValue(unitFormula.fmb(data.get('harga_tanah')));
        form.down('[name='+addPrefix+'_harga_kelebihan_a]').setValue(unitFormula.fmb(data.get('kelebihantanah')));
        form.down('[name='+addPrefix+'_harga_kelebihan_b]').setValue(unitFormula.fmb(data.get('harga_kelebihantanah')));
        form.down('[name='+addPrefix+'_harga_bangunan]').setValue(unitFormula.fmb(data.get('harga_bangunan')));
        form.down('[name='+addPrefix+'_harga_jual_dasar]').setValue(unitFormula.fmb(data.get('harga_jualdasar')));
        form.down('[name='+addPrefix+'_disc_harga_dasar]').setValue(unitFormula.fmb(data.get('persen_dischargadasar')));
        form.down('[name='+addPrefix+'_tot_disc_harga_dasar]').setValue(unitFormula.fmb(data.get('harga_dischargadasar')));
        form.down('[name='+addPrefix+'_disc_harga_tanah]').setValue(unitFormula.fmb(data.get('persen_dischargatanah')));
        form.down('[name='+addPrefix+'_tot_disc_harga_tanah]').setValue(unitFormula.fmb(data.get('harga_dischargatanah')));
        form.down('[name='+addPrefix+'_disc_harga_bangunan]').setValue(unitFormula.fmb(data.get('persen_dischargabangunan')));
        form.down('[name='+addPrefix+'_tot_disc_harga_bangunan]').setValue(unitFormula.fmb(data.get('harga_dischargabangunan')));
        form.down('[name='+addPrefix+'_harga_netto]').setValue(unitFormula.fmb(data.get('harga_netto')));
        form.down('[name='+addPrefix+'_ppn_tanah]').setValue(unitFormula.fmb(data.get('persen_ppntanah')));
        form.down('[name='+addPrefix+'_tot_ppn_tanah]').setValue(unitFormula.fmb(data.get('harga_ppntanah')));
        form.down('[name='+addPrefix+'_ppn_bangunan]').setValue(unitFormula.fmb(data.get('persen_ppnbangunan')));
        form.down('[name='+addPrefix+'_tot_ppn_bangunan]').setValue(unitFormula.fmb(data.get('harga_ppnbangunan')));
        form.down('[name='+addPrefix+'_harga_balik_nama]').setValue(unitFormula.fmb(data.get('harga_bbnsertifikat')));
        form.down('[name='+addPrefix+'_harga_bphtb]').setValue(unitFormula.fmb(data.get('harga_bphtb')));
        form.down('[name='+addPrefix+'_harga_bajtb]').setValue(unitFormula.fmb(data.get('harga_bajb')));
        form.down('[name='+addPrefix+'_biaya_administrasi]').setValue(unitFormula.fmb(data.get('harga_administrasi')));
        form.down('[name='+addPrefix+'_biaya_administrasi_subsidi]').setValue(unitFormula.fmb(data.get('harga_admsubsidi')));
        form.down('[name='+addPrefix+'_biaya_p_mutu]').setValue(unitFormula.fmb(data.get('harga_pmutu')));
        form.down('[name='+addPrefix+'_biaya_paket_tambahan]').setValue(unitFormula.fmb(data.get('harga_paket_tambahan')));
        form.down('[name='+addPrefix+'_total]').setValue(unitFormula.fmb(data.get('harga_jual')));
        form.down('[name='+addPrefix+'_disc_sales]').setValue(unitFormula.fmb(data.get('persen_salesdisc')));
        form.down('[name='+addPrefix+'_tot_disc_sales]').setValue(unitFormula.fmb(data.get('harga_salesdisc')));
        form.down('[name='+addPrefix+'_total_jual]').setValue(unitFormula.fmb(data.get('harga_total_jual')));

        //unit_status
    },
    scheduleInfo: function(data,form,unitFormula,successCallback) {
        var me = this;
        form.down('[name=j_tanda_jadi]').setValue(unitFormula.fmb(data.get('tandajadi_time')));
        form.down('[name=n_tanda_jadi]').setValue(unitFormula.fmb(data.get('tandajadi_value')));
        form.down('[name=j_uang_muka]').setValue(unitFormula.fmb(data.get('uangmuka_time')));
        form.down('[name=n_uang_muka]').setValue(unitFormula.fmb(data.get('uangmuka_value')));
        form.down('[name=j_sisa]').setValue(unitFormula.fmb(data.get('sisacicilan_time')));
        form.down('[name=n_sisa]').setValue(unitFormula.fmb(data.get('sisacicilan_value')));
        /// billing rules combo box
        form.down('[name=formula]').setValue(data.get('billingrules_id'));

        var scGrid = form.down('#MyScheduleGrid');
        var scGridStore = scGrid.getStore();
        scGrid.body.mask('Loading Schedule...');
        scGridStore.load({
            params: {mode_read:'schedule',purchaseletter_id:data.get('purchaseletter_id'),scheduletype_id:data.get('scheduletype_id')},
            callback: function(rec) {
                scGrid.body.unmask();  
              
             
                if(typeof successCallback == 'function'){
                    sucessCallback();
                }
            }
        }
        );


    }
});