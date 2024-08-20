Ext.define('Erems.controller.Pindahkavling', {
    extend: 'Erems.library.template.controller.Controller',
    alias: 'controller.Pindahkavling',
    views: ['pindahkavling.Panel', 'pindahkavling.Grid', 'pindahkavling.FormSearch', 'pindahkavling.FormData'],
    stores: ['Pindahkavling','Pindahkavlingdetail', 'Purchaseletterdetail', 'Marketingstockprice', 'Unit'],
    models: ['Pindahkavling','Pindahkavlingdetail', 'Purchaseletterdetailvb', 'Marketingstockprice', 'Unit'],
    refs: [
        {
            ref: 'grid',
            selector: 'pindahkavlinggrid'
        },
        {
            ref: 'formsearch',
            selector: 'pindahkavlingformsearch'
        },
        {
            ref: 'formdata',
            selector: 'pindahkavlingformdata'
        }
    ],
    comboBoxIdEl: ['fd_clustercb', 'fd_blockcb', 'bank_cb', 'collector_cb', 'pricetype_cb','billingrules_id','movereason_cb'],
    controllerName: 'pindahkavling',
    fieldName: 'changekavling_id',
    bindPrefixName: 'Pindahkavling',
    pkScheduleGen: null, /// scheduleGenerator object holder
    formWidth: 800,
    unitFormula: null,
    fillForm: null,
    oldScheduleRecordCount: 0,
    addedRowSch: false,
    priceData: {KPR: {}, CASH: {}, INHOUSE: {}}, // for store price data  (KPR,CASH, INHOUSE),
    priceDataMS: {KPR: {}, CASH: {}, INHOUSE: {}},
    init: function(application) {
        var me = this;
        this.control({
            'pindahkavlingpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'pindahkavlinggrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'pindahkavlinggrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'pindahkavlinggrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'pindahkavlinggrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'pindahkavlinggrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'pindahkavlinggrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'pindahkavlingformsearch button[action=search]': {
                click: this.dataSearch
            },
            'pindahkavlingformsearch button[action=reset]': {
                click: this.dataReset
            },
            'pindahkavlingformdata': {
                afterrender: this.formDataAfterRender
            },
            'pindahkavlingformdata button[action=browse_unit_pl]': {
                click: function() {
                    me.selectUnitGridShow('Purchaseletter');
                }
            },
            'pindahkavlingformdata button[action=browse_unit_ms]': {
                click: function() {
                    me.selectUnitGridShow('Marketingstock');
                }
            },
            'pindahkavlingformdata button[action=save]': {
                click: this.dataSave
            },
            'pindahkavlingformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'pindahkavlingformdata textfield[name=new_pricetype_id]': {
                select: me.pricetypeIdSelect
            },
             /// MATH HERE
             'pindahkavlingformdata [name=new_harga_bangunan]': {
                blur: function(el) {
                    me.unitFormula.changeHargaBangunan(el);
                }
            },
             'pindahkavlingformdata [name=new_disc_harga_bangunan]': {
                blur: function(el) {
                    me.unitFormula.changeDiscBangunan(el);
                }
            },
            'pindahkavlingformdata [name=new_tot_disc_harga_bangunan]': {
                blur: function(el) {
                    me.unitFormula.changeRevDiscBangunan(el);
                }
            },
            'pindahkavlingformdata [name=new_ppn_bangunan]': {
                blur: function(el) {
                    me.unitFormula.changePPNBangunan(el);
                }
            },
            'pindahkavlingformdata [name=new_tot_ppn_bangunan]': {
                blur: function(el) {
                    me.unitFormula.reversePPNBangunan(el);
                }
            },
             'pindahkavlingformdata [name=new_biaya_administrasi]': {
                blur: function(el) {
                    me.unitFormula.changeTotal(el);
                }
            },
             'pindahkavlingformdata [name=new_biaya_paket_tambahan]': {
                blur: function(el) {
                    me.unitFormula.changeTotal(el);
                }
            },
             'pindahkavlingformdata [name=new_disc_sales]': {
                blur: function(el) {
                    me.unitFormula.changeDiscSales(el);
                }
            },
            'pindahkavlingformdata [name=new_tot_disc_sales]': {
                blur: function(el) {
                    me.unitFormula.changeRevDiscSales(el);
                }
            },
             /// END MATH HERE
            'pindahkavlingformdata [name=movereason_id]': {
                select: function(el, val) {
                    me.seFi.cb('movereason_code', el, 'code', val);
                }
            },
            'pindahkavlingformdata [name=movereason_code]': {
                keyup: function(el) {
                    me.seFi.tf('movereason_id', el, {name: 'code', tipe: 'id'}, 'movereason_id');

                }
            }

        });
    },
    selectUnitGridShow: function(controllerName) {
        var me = this;
        _Apps.getController(controllerName).browseItem('Pindahkavling');

    },
    processRowFromItemSelection: function(rows, modul) {
        var me = this;
        switch (modul) {
            case 'purchaseletter':
                me.processRowFromItemSelectionPurchaletter(rows, '');
                break;
            case 'marketingstock':
                me.processRowFromItemSelectionMarketingstock(rows, '');
                break;

        }

    },
    /* FILL FROM MARKETING STOCK DATA */
    processRowFromItemSelectionMarketingstock: function(rows) {
        var me = this;
        var unitStore = me.getUnitStore();
        console.log(rows[0]);
        
        me.setv('marketingstock_id',rows[0].get('marketstock_id'));
        me.getFormdata().up('window').body.mask('Loading data...');
        unitStore.load({
            params: {unit_id: rows[0].get('unit_id')},
            callback: function(records) {
              
                ///*** fill unitData/
                
                var filledFields = ['unit_id', 'productcategory', 'type_name', 'land_size', 'long', 'building_size', 'width', 'kelebihan', 'floor', 'block_id', 'cluster_id', 'unit_number'];

                for (var x in filledFields) {
                    if (me.getFormdata().down('[name=unit_' + filledFields[x] + '_ms]') != null) {
                        me.getFormdata().down('[name=unit_' + filledFields[x] + '_ms]').setValue(records[0].data[filledFields[x]]);
                    }

                }
                
                ///***/
                me.loadPrice(records[0].get('unit_id'), function() {
                    
                    var prcTpVal = parseInt(me.getv('new_pricetype_id'));
                    if (!isNaN(prcTpVal)) {
                        var pricetypeStore = me.getFormdata().down('[name=new_pricetype_id]').getStore(), pricetype = null;

                        pricetype = pricetypeStore.findExact('pricetype_id', prcTpVal);
                        pricetype = pricetypeStore.getAt(pricetype).get('pricetype');
                        //me.pricetypeIdSelect(null,pricetype);
                        if (isNaN(pricetype)) {

                            me.getPriceData(pricetype);
                            me.sumTotal();
                            me.unitFormula.changeTotalJual();
                        }

                    }
                    
                    
                    me.getFormdata().up('window').body.unmask();



                });
                
            }
        }
        );

    },
    processRowFromItemSelectionPurchaletter: function(rows, modul) {
        var me = this;
        var plDetailStore = me.getPurchaseletterdetailStore();
        me.getFormdata().up('window').body.mask('Loading data...');
        plDetailStore.load({
            params: {mode_read: 'detailv2', purchaseletter_id: rows[0].get('purchaseletter_id')},
            callback: function(rec) {

                var detailModel = me.getPurchaseletterdetailvbModel();
                plDetailStore.model.setFields(detailModel.prototype.fields.getRange());


                me.setv('purchaseletter_id_pl', rec[0].get('purchaseletter_id'));

                me.fillForm.unitData(rec[0], me.getFormdata(), '_pl');

                me.fillForm.priceData(rec[0], me.getFormdata(), me.unitFormula);

                me.fillCustomerData(rec[0]);
                me.getFormdata().down('[name=purchaseletter_no]').setValue(rec[0].get('purchaseletter_no'));
                me.getFormdata().down('[name=pricetype_id]').setValue(rec[0].get('pricetype_id'));


              
                me.fillForm.scheduleInfo(rec[0], me.getFormdata(), me.unitFormula);
                

                me.setv('new_pricetype_id',rec[0].get('pricetype_id'));
                
                
                me.getFormdata().up('window').body.unmask();

            }
        });


    },
    formDataAfterRender: function(el) {

        var me = this;

        /////// init function
        me.fillForm = new Erems.library.Fillform();
        me.unitFormula = new Erems.library.Unitformula();
        me.setReadOnlyFields();
        me.setReadOnlyNewPrice();
        ////// end function 
        
        
        

        me.loadComboBoxStore(el);
        var state = el.up('window').state;

        //var scgStore = me.getFormdata().down('#MyScheduleGrid').getStore();
        //scgStore.loadData([], false);
        
        

        if (state == 'create') {

            // el.down('#active').setValue(1);
        } else if (state == 'update') {

            me.getFormdata().down('#btnSave').setDisabled(true);
            
            me.setElemReadOnly(true);

            var detailStore = me.getPindahkavlingdetailStore();
            var grid = me.getGrid();
            var store = grid.getStore();
            var form = me.getFormdata();

            var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));

            var pkId = record.internalId;
            detailStore.removeAll();

            detailStore.load(
                    {params: {mode_read: 'detail', pindahkavling_id: pkId},
                        callback: function(records) {
                          
                            me.fillForm.unitData(records[0], me.getFormdata(), '_pl');
                            me.fillForm.unitData(records[0], me.getFormdata(), '_ms','new_');
                            me.fillCustomerData(records[0]);
                            me.fillPriceData('', records[0],'','');
                            me.fillPriceData('new', records[0],'','new_');
                            me.fillScheduleInfoToForm_vread(records[0].get('purchaseletter02_id'));
                            me.setv('notes',records[0].get('notes'));
                            me.setv('movereason_id',records[0].get('movereason_id'));
                            me.setv('movereason_code',records[0].get('movereason_code'));
                          //  me.fillFormViaView(records);
                            //me.fillScheduleInfoToForm_vread(records[0]);
                        }
                    }
            );

        }
        me.pkScheduleGen = new Erems.library.Schedulegenerator();

        me.unitFormula.addPrefixToAllFieldName('new');
        me.unitFormula.changeFieldName('land_size', 'unit_land_size');
        me.unitFormula.changeFieldName('long', 'unit_long');
        me.unitFormula.changeFieldName('long', 'unit_long');
        me.unitFormula.changeFieldName('width', 'unit_width');
        me.unitFormula.changeFieldName('kelebihan', 'unit_kelebihan');

        me.unitFormula.funcTotalJual = function() {

            me.prosesScheduleBaru();

        };
        me.unitFormula.setForm(me.getFormdata());
        // var formulastore = me.getFormdata().down('[name=formula]').getStore();
        //formulastore.load();
    },
    setElemReadOnly:function(flag){
       var me = this;
       var f = me.getFormdata();
       f.down('#fd_browse_unit_btn_pl').setDisabled(flag);
       f.down('#fd_browse_unit_btn_ms').setDisabled(flag);
    },
    setReadOnlyNewPrice:function(){
        var me = this;
        var fl = ['_harga_bangunan','_disc_harga_bangunan','_tot_disc_harga_bangunan','_ppn_bangunan','_tot_ppn_bangunan','_biaya_administrasi','_biaya_paket_tambahan','_disc_sales','_tot_disc_sales'];
        var el = null;
        for(var x in fl){
            el =  me.getFormdata().down('[name=new'+fl[x]+']');
            el.setReadOnly(false);
            el.setFieldStyle('background-color:#FFFFFF;background-image: none;');
            
        }
    },
    setReadOnlyFields:function(){
        var me = this;
        var fl = ['j_tanda_jadi','n_tanda_jadi','j_uang_muka','n_uang_muka','j_sisa','n_sisa','formula','bank_bank_id',
                  'bank_id','new_pricetype_id'
                  ];
        var pfl = ['_harga_tanah_a','_harga_kelebihan_a','_harga_tanah_b','_harga_kelebihan_b','_harga_bangunan','_harga_jual_dasar','_disc_harga_dasar','_tot_disc_harga_dasar','_disc_harga_tanah',
                  '_tot_disc_harga_tanah','_disc_harga_bangunan','_tot_disc_harga_bangunan','_harga_netto','_ppn_tanah','_tot_ppn_tanah','_ppn_bangunan','_tot_ppn_bangunan',
                  '_harga_balik_nama','_harga_bphtb','_harga_bajtb','_biaya_administrasi','_biaya_administrasi_subsidi','_biaya_p_mutu','_biaya_paket_tambahan','_total','_disc_sales','_tot_disc_sales','_total_jual'];
        var el = null;
        for(var x in fl){
            el =  me.getFormdata().down('[name='+fl[x]+']');
            el.setReadOnly(true);
            el.setFieldStyle('background-color:#F2F2F2;background-image: none;');
            
        }
        for(var x in pfl){
            el =  me.getFormdata().down('[name=new'+pfl[x]+']');
            el.setReadOnly(true);
            el.setFieldStyle('background-color:#F2F2F2;background-image: none;');
            
        }
    },
    fillCustomerData: function(data) {
        var me = this;
        var srcFl = ['customer_name', 'customer_address', 'customer_zipcode', 'customer_homephone',
            'customer_mobilephone', 'customer_officephone', 'customer_fax', 'customer_ktp', 'customer_npwp', 'customer_email']; /// data fields
        var dstFl = ['customer_name', 'customer_address', 'customer_zipcode', 'customer_home_phone',
            'customer_mobile_phone', 'customer_office_phone',
            'customer_fax', 'customer_KTP_number', 'customer_NPWP', 'customer_email'];

        for (var i = 0; i < srcFl.length; i++) {
            me.setv(dstFl[i], data.get(srcFl[i]));
        }
        me.getFormdata().down('#photo_image').el.setStyle({backgroundImage: 'url(upload/' + data.get('customer_photo') + ')', backgroundSize: '160px 200px'});
    },
    loadPrice: function(unitId, functCallback) {
        var me = this;
        if (parseInt(unitId) == 0) {
            return false;
        }

       


        var storePrice = me.getMarketingstockpriceStore();
        storePrice.load(
                {
                    params: {mode_read: 'price', unit_id: unitId},
                    callback: function(records, options, success) {

                        for (var i = 0; i < records.length; i++) {
                            if (records[i].data.pricetype_id == 1) {
                                me.priceDataMS.CASH = records[i].data
                            } else if (records[i].data.pricetype_id == 2) {
                                me.priceDataMS.KPR = records[i].data
                            } else {
                                me.priceDataMS.INHOUSE = records[i].data
                            }
                        }

                        if (typeof functCallback === 'function') {
                            functCallback();
                        }


                    }
                }
        );
    },
    
    pricetypeIdSelect: function(el, val) {
        var priceType = val[0].data.pricetype;
        var priceTypeId = val[0].get('pricetype_id');
        var me = this;
        me.getPriceData(priceType);
        me.sumTotal();
        var bankFlag = false, termVis = false, kprstVis = false;
        if (priceTypeId === 2) { /// KPR
            bankFlag = false;
            termVis = false;
            kprstVis = true;
        } else if (priceTypeId === 3) {  /// inhouse
            bankFlag = true;
            termVis = true;
            kprstVis = false;
        } else {
            termVis = false;
            bankFlag = true;
            kprstVis = false;
        }
        if (!bankFlag) {
            var bS = me.getFormdata().down('[name=bank_id]').getStore();
            me.setv('bank_id', bS.getAt(0).get('bank_id'));
            me.setv('bank_bank_id', bS.getAt(0).get('bank_id'));
        } else {
            me.setv('bank_id', null);
            me.setv('bank_bank_id', '');
        }
        me.getFormdata().down('[name=bank_id]').setReadOnly(bankFlag);
        me.getFormdata().down('[name=inhouse_term]').setVisible(termVis);
        me.getFormdata().down('[name=kpr_status]').setVisible(kprstVis);
        me.unitFormula.changeTotalJual();

    },
    getPriceData: function(priceType) {
        var me = this;

        var filledFields = ['_disc_harga_bangunan', '_disc_harga_dasar', '_disc_harga_tanah',
            '_harga_bajtb', '_harga_balik_nama', '_harga_bangunan', '_harga_bphtb', '_harga_jual_dasar',
            '_harga_kelebihan_a', '_harga_kelebihan_b', '_harga_netto', '_harga_tanah_a',
            '_harga_tanah_b', '_ppn_bangunan', '_ppn_tanah', '_tot_disc_harga_bangunan',
            '_tot_disc_harga_dasar', '_tot_disc_harga_tanah', '_tot_ppn_bangunan', '_tot_ppn_tanah', '_total'];
        for (var x in filledFields) {
            if (me.getFormdata().down('[name=new' + filledFields[x] + ']') != null) {
                me.getFormdata().down('[name=new' + filledFields[x] + ']').setValue(me.unitFormula.fmb(me.priceDataMS[priceType][filledFields[x]]));
            }

        }
        //   me.getFormdata().down('[name=_total_jual]').setValue(me.unitFormula.fmb(me.priceData[priceType]['_total']));


    },
    sumTotal: function() {
        var me = this;
        var hargaJual = 0, biayaAdm = 0, biayaAdmSub = 0, biayaPMutu = 0,
                biayaPTambah = 0, dcSales = 0, totDcSales = 0, totHargaJual = 0;
        hargaJual = toFloat(me.getFormdata().down('[name=new_total]').getValue());
        biayaAdm = toFloat(me.getFormdata().down('[name=new_biaya_administrasi]').getValue());
        biayaAdmSub = toFloat(me.getFormdata().down('[name=new_biaya_administrasi_subsidi]').getValue());
        biayaPMutu = toFloat(me.getFormdata().down('[name=new_biaya_p_mutu]').getValue());
        biayaPTambah = toFloat(me.getFormdata().down('[name=new_biaya_paket_tambahan]').getValue());
        dcSales = toFloat(me.getFormdata().down('[name=new_disc_sales]').getValue());
        totDcSales = toFloat(me.getFormdata().down('[name=new_tot_disc_sales]').getValue());

        hargaJual = hargaJual + biayaAdm + biayaAdmSub + biayaPMutu + biayaPTambah;
        totHargaJual = hargaJual - totDcSales;

        me.getFormdata().down('[name=new_total]').setValue(me.unitFormula.fmb(hargaJual));
        me.getFormdata().down('[name=new_total_jual]').setValue(me.unitFormula.fmb(totHargaJual));

    },
    prosesScheduleBaru: function() {
        var me = this;
        var newPriceTotal = 0, oldPriceTotal = 0, schGridStore = null, addedRow = me.addedRowSch, addedAmount = 0, selectedPriceTypeId = 0,
                terminInh = 0, currentSchRecordCount = 0;
        var kodePriceType = {1: {p: 'SIP'}, 2: {p: 'KPR'}, 3: {p: 'INH'}};
        oldPriceTotal = toFloat(me.getv('_total_jual'));
        newPriceTotal = toFloat(me.getv('new_total_jual'));
        schGridStore = me.getFormdata().down('#MyScheduleGrid').getStore();
        /// remove old added data
        currentSchRecordCount = schGridStore.getCount();
        if ((currentSchRecordCount > me.oldScheduleRecordCount) && me.addedRowSch) {

            for (var i = (currentSchRecordCount + 1); i > me.oldScheduleRecordCount; i--) {
                schGridStore.removeAt(i - 1);
                // alert(i);
            }
        }


        //if (newPriceTotal > oldPriceTotal) {

            selectedPriceTypeId = me.getv('new_pricetype_id');
            addedAmount = newPriceTotal - oldPriceTotal;
            var spd = null;
            var lastRecordDate = schGridStore.getAt((schGridStore.getCount() - 1)).get('duedate');

            spd = Ext.Date.format(lastRecordDate, "d m Y").split(" ");

            if (addedRow) {

                //schGridStore.removeAt(schGridStore.getCount()-1);  /// delete last record

            } else {
                me.oldScheduleRecordCount = schGridStore.getCount();
                me.addedRowSch = true;
            }
            if (selectedPriceTypeId === 3) { /// jika price type = inhouse
                terminInh = parseInt(me.getv('inhouse_term'));
                if (terminInh > 0) {
                    for (var i = 0; i < terminInh; i++) {
                        //  schGridStore.add({amount: (addedAmount / terminInh), scheduletype: 'INH'});


                        schGridStore.add(me.pkScheduleGen.fillAr(me.pkScheduleGen.getFixDate(i + 1, spd), me.pkScheduleGen.localPT[selectedPriceTypeId].p, (i + 1), (addedAmount / terminInh), '', '', '', '', selectedPriceTypeId));

                    }
                }
            } else {
                //  schGridStore.add({amount: addedAmount, scheduletype: kodePriceType[selectedPriceTypeId]['p']});
                schGridStore.add(me.pkScheduleGen.fillAr(me.pkScheduleGen.getFixDate(i + 1, spd), me.pkScheduleGen.localPT[selectedPriceTypeId].p, 1, addedAmount, '', '', '', '', selectedPriceTypeId));
            }


       // }

    },
    getFinalData: function(formGetValues) {
        var me = this;
      //  var detailModel = me.getChangepricedetailModel();
      // var store = me.getChangepriceStore();
       // store.model.setFields(detailModel.prototype.fields.getRange());

        var finalData = formGetValues;
        var newDate = finalData['changekavling_date'].split('-');
        newDate = newDate[2] + '-' + newDate[1] + '-' + newDate[0];
        finalData['purchase_date'] = newDate;

        /////////
        console.log(finalData);

        finalData['purchaseletter01_id'] = parseInt(finalData['purchaseletter_id_pl']);
        finalData['tanahpermeter'] = toFloat(finalData['new_harga_tanah_a']);
        finalData['kelebihantanah'] = toFloat(finalData['new_harga_kelebihan_a']);
        finalData['harga_tanah'] = toFloat(finalData['new_harga_tanah_b']);
        finalData['harga_kelebihantanah'] = toFloat(finalData['new_harga_kelebihan_b']);
        finalData['harga_bangunan'] = toFloat(finalData['new_harga_bangunan']);
        finalData['harga_jualdasar'] = toFloat(finalData['new_harga_jual_dasar']);
        finalData['persen_dischargedasar'] = toFloat(finalData['new_disc_harga_dasar']);
        finalData['harga_dischargedasar'] = toFloat(finalData['new_tot_disc_harga_dasar']);
        finalData['persen_dischargetanah'] = toFloat(finalData['new_disc_harga_tanah']);
        finalData['harga_dischargetanah'] = toFloat(finalData['new_tot_disc_harga_tanah']);
        finalData['persen_dischargebangunan'] = toFloat(finalData['new_disc_harga_bangunan']);
        finalData['harga_dischargebangunan'] = toFloat(finalData['new_tot_disc_harga_bangunan']);
        finalData['harga_neto'] = toFloat(finalData['new_harga_netto']);
        finalData['persen_ppntanah'] = toFloat(finalData['new_ppn_tanah']);
        finalData['harga_ppntanah'] = toFloat(finalData['new_tot_ppn_tanah']);
        finalData['persen_ppnbangunan'] = toFloat(finalData['new_ppn_bangunan']);
        finalData['harga_ppnbangunan'] = toFloat(finalData['new_tot_ppn_bangunan']);
        finalData['harga_bbnsertifikat'] = toFloat(finalData['new_harga_balik_nama']);
        finalData['harga_bphtb'] = toFloat(finalData['new_harga_bphtb']);
        finalData['harga_bajb'] = toFloat(finalData['new_harga_bajtb']);
        finalData['harga_jual'] = toFloat(finalData['new_total']);
        finalData['persen_salesdisc'] = toFloat(finalData['new_disc_sales']);
        finalData['harga_salesdisc'] = toFloat(finalData['new_tot_disc_sales']);
        finalData['harga_admsubsidi'] = toFloat(finalData['new_biaya_administrasi_subsidi']);
        finalData['harga_pmutu'] = toFloat(finalData['new_biaya_p_mutu']);
        finalData['harga_paket_tambahan'] = toFloat(finalData['new_biaya_paket_tambahan']);
        finalData['pricetype_id'] = finalData['new_pricetype_id'];
        finalData['harga_administrasi'] = toFloat(finalData['new_biaya_administrasi']);
        finalData['harga_total_jual'] = toFloat(finalData['new_total_jual']);
        //
        //// cek grid schedule
        finalData['detail'] = {};
        var detailParams = {schedule_id: '', scheduletype_id: '', purchaseletter_id: '', duedate: '', amount: '', sourcemoney_id: '', remaining_balance: '', intersetflag: '',
            interset: '', remaining_interest: '', recomendationdate: '', termin: '', description: ''};
        var delimeter = '';
        var schStore = me.getFormdata().down('#MyScheduleGrid').getStore();

        var countRow = 0;
        schStore.each(function(rec) {
            if (parseInt(rec.get('schedule_id')) == 0 && parseInt(rec.get('scheduletype_id')) > 0) {
                countRow++;
                delimeter = countRow === schStore.data.items.length ? '' : '~';
                
                detailParams['schedule_id'] += rec.data.schedule_id + '' + delimeter;
                detailParams['duedate'] += me.toSqlSRVDateFormat(rec.data.duedate) + '' + delimeter;
                detailParams['scheduletype_id'] += rec.data.scheduletype_id + '' + delimeter;
                detailParams['amount'] += rec.data.amount + '' + delimeter;
                detailParams['sourcemoney_id'] += rec.data.sourcemoney_id + '' + delimeter;
                detailParams['remaining_balance'] += rec.data.remaining_balance + '' + delimeter;
                detailParams['intersetflag'] += rec.data.intersetflag + '' + delimeter;
                detailParams['interset'] += rec.data.interset + '' + delimeter;
                detailParams['remaining_interest'] += rec.data.remaining_interest + '' + delimeter;
                detailParams['recomendationdate'] += rec.data.recomendationdate + '' + delimeter;
                detailParams['termin'] += rec.data.termin + '' + delimeter;
                detailParams['description'] += rec.data.description + '' + delimeter;
            }


        });

        /// end cek grid schedule
        finalData['detail'] = detailParams;
       
        
        ///////
        return finalData;
    },
    toSqlSRVDateFormat: function(dateVar) {
        var hsl = ' ';
        var charDst = '-';

        //dateVar = dateVar.split('/');
        dateVar = Ext.Date.format(dateVar, "d m Y").split(" ");
        if(typeof dateVar !='array'){
            return null;
        }
        hsl = dateVar[2] + '' + charDst + '' + dateVar[1] + '' + charDst + '' + dateVar[0];
        return hsl;

    },
    fillPriceData: function(addPrefix, data, tailPrefixSrc,headPrefixSrc) {
        var me = this;
        var form = me.getFormdata();
        var unitFormula = me.unitFormula;
      
      
        form.down('[name=' + addPrefix + '_harga_tanah_a]').setValue(unitFormula.fmb(data.get(headPrefixSrc+'tanahpermeter' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_harga_tanah_b]').setValue(unitFormula.fmb(data.get(headPrefixSrc+'harga_tanah' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_harga_kelebihan_a]').setValue(unitFormula.fmb(data.get(headPrefixSrc+'kelebihantanah' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_harga_kelebihan_b]').setValue(unitFormula.fmb(data.get(headPrefixSrc+'harga_kelebihantanah' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_harga_bangunan]').setValue(unitFormula.fmb(data.get(headPrefixSrc+'harga_bangunan' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_harga_jual_dasar]').setValue(unitFormula.fmb(data.get(headPrefixSrc+'harga_jualdasar' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_disc_harga_dasar]').setValue(unitFormula.fmb(data.get(headPrefixSrc+'persen_dischargedasar' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_tot_disc_harga_dasar]').setValue(unitFormula.fmb(data.get(headPrefixSrc+'harga_dischargedasar' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_disc_harga_tanah]').setValue(unitFormula.fmb(data.get(headPrefixSrc+'persen_dischargetanah' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_tot_disc_harga_tanah]').setValue(unitFormula.fmb(data.get(headPrefixSrc+'harga_dischargetanah' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_disc_harga_bangunan]').setValue(unitFormula.fmb(data.get(headPrefixSrc+'persen_dischargebangunan' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_tot_disc_harga_bangunan]').setValue(unitFormula.fmb(data.get(headPrefixSrc+'harga_dischargebangunan' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_harga_netto]').setValue(unitFormula.fmb(data.get(headPrefixSrc+'harga_neto' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_ppn_tanah]').setValue(unitFormula.fmb(data.get(headPrefixSrc+'persen_ppntanah' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_tot_ppn_tanah]').setValue(unitFormula.fmb(data.get(headPrefixSrc+'harga_ppntanah' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_ppn_bangunan]').setValue(unitFormula.fmb(data.get(headPrefixSrc+'persen_ppnbangunan' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_tot_ppn_bangunan]').setValue(unitFormula.fmb(data.get(headPrefixSrc+'harga_ppnbangunan' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_harga_balik_nama]').setValue(unitFormula.fmb(data.get(headPrefixSrc+'harga_bbnsertifikat' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_harga_bphtb]').setValue(unitFormula.fmb(data.get(headPrefixSrc+'harga_bphtb' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_harga_bajtb]').setValue(unitFormula.fmb(data.get(headPrefixSrc+'harga_bajb' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_biaya_administrasi]').setValue(unitFormula.fmb(data.get(headPrefixSrc+'harga_administrasi' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_biaya_administrasi_subsidi]').setValue(unitFormula.fmb(data.get(headPrefixSrc+'harga_admsubsidi' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_biaya_p_mutu]').setValue(unitFormula.fmb(data.get(headPrefixSrc+'harga_pmutu' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_biaya_paket_tambahan]').setValue(unitFormula.fmb(data.get(headPrefixSrc+'harga_paket_tambahan' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_total]').setValue(unitFormula.fmb(data.get(headPrefixSrc+'harga_jual' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_disc_sales]').setValue(unitFormula.fmb(data.get(headPrefixSrc+'persen_salesdisc' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_tot_disc_sales]').setValue(unitFormula.fmb(data.get(headPrefixSrc+'harga_salesdisc' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_total_jual]').setValue(unitFormula.fmb(data.get(headPrefixSrc+'harga_total_jual' + tailPrefixSrc)));

    },
    fillScheduleInfoToForm_vread: function(purchaseletterId) {
        var me = this;
        

        var scGrid = me.getFormdata().down('#MyScheduleGrid');
        var scGridStore = scGrid.getStore();
        scGrid.body.mask('Loading Schedule...');
        scGridStore.load({
            params: {mode_read:'schedule',purchaseletter_id:purchaseletterId},
            callback: function(rec) {
                scGrid.body.unmask();  
               
                //scGrid.setDisabled(true);
            }
        }
        );


    }



});