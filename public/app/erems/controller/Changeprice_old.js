Ext.define('Erems.controller.Changeprice', {
    extend: 'Erems.library.template.controller.Controller',
    alias: 'controller.Changeprice',
    views: ['changeprice.Panel', 'changeprice.Grid', 'changeprice.FormSearch', 'changeprice.FormData'],
    stores: ['Changeprice', 'Purchaseletterdetail', 'Marketingstockprice', 'Changepricedetail'],
    models: ['Changeprice', 'Changepricedetail', 'Purchaseletterdetail', 'Purchaseletterdetailvb', 'Marketingstockprice'],
    requires: ['Erems.library.Fillform', 'Erems.library.Unitformula', 'Erems.library.Schedulegenerator'],
    refs: [
        {
            ref: 'grid',
            selector: 'changepricegrid'
        },
        {
            ref: 'formsearch',
            selector: 'changepriceformsearch'
        },
        {
            ref: 'formdata',
            selector: 'changepriceformdata'
        },
        {
            ref: 'mainpanel',
            selector: 'changepricepanel'
        }
    ],
    comboBoxIdEl: ['fd_clustercb', 'fd_blockcb', 'bank_cb', 'collector_cb', 'pricetype_cb', 'tipebaru_tipe_cb'],
    controllerName: 'changeprice',
    fieldName: 'changeprice_id',
    bindPrefixName: 'Changeprice',
    cpScheduleGen: null, /// scheduleGenerator object holder
    formWidth: 800,
    unitFormula: null,
    oldScheduleRecordCount: 0,
    addedRowSch: false,
    fillForm: null, //// object Fillform
    priceData: {KPR: {}, CASH: {}, INHOUSE: {}}, // for store price data  (KPR,CASH, INHOUSE),
    init: function(application) {
        var me = this;
        me.fillForm = new Erems.library.Fillform();
        me.unitFormula = new Erems.library.Unitformula();




        this.control({
            'changepricepanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'changepricegrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'changepricegrid toolbar button[action=create]': {
                click: function() {

                    this.formDataShow('create');
                }
            },
            'changepricegrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'changepricegrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'changepricegrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'changepricegrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'changepriceformsearch button[action=search]': {
                click: this.dataSearch
            },
            'changepriceformsearch button[action=reset]': {
                click: this.dataReset
            },
            'changepriceformdata': {
                afterrender: this.formDataAfterRender,
                beforerender: function() {
                    //  alert(me.getMainpanel().up('window'));

                    // me.getMainpanel().up('window').body.mask('Saving data, please wait ...');
                },
                afterlayout: function() {
                    // alert('After layout..');
                }
            },
            'changepriceformdata button[action=save]': {
                click: this.dataSave
            },
            'changepriceformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'changepriceformdata button[action=browse_unit]': {
                click: me.selectUnitGridShow
            },
            'changepriceformdata textfield[name=new_pricetype_id]': {
                select: me.pricetypeIdSelect
            },
            /* MATH CONTROL */
            //
            'changepriceformdata [name=new_harga_tanah_a]': {
                blur: function(el) {

                    me.unitFormula.changeHargaTanah(el);
                }
            },
            'changepriceformdata [name=new_harga_kelebihan_a]': {
                blur: function(el) {
                    me.unitFormula.changeHargaKelebihan(el);
                }
            },
            'changepriceformdata [name=new_harga_bangunan]': {
                blur: function(el) {
                    me.unitFormula.changeHargaBangunan(el);
                }
            },
            'changepriceformdata [name=new_disc_harga_dasar]': {
                blur: function(el) {
                    me.unitFormula.changeDiscHargaDasar(el);
                }
            },
            'changepriceformdata [name=new_tot_disc_harga_dasar]': {
                blur: function(el) {
                    me.unitFormula.changeRevDiscHargaDasar(el);
                }
            },
            'changepriceformdata [name=new_disc_harga_tanah]': {
                blur: function(el) {
                    me.unitFormula.changeDiscTanah(el);
                }
            },
            'changepriceformdata [name=new_tot_disc_harga_tanah]': {
                blur: function(el) {
                    me.unitFormula.changeRevDiscTanah(el);
                }
            },
            'changepriceformdata [name=new_disc_harga_bangunan]': {
                blur: function(el) {
                    me.unitFormula.changeDiscBangunan(el);
                }
            },
            'changepriceformdata [name=new_tot_disc_harga_bangunan]': {
                blur: function(el) {
                    me.unitFormula.changeRevDiscBangunan(el);
                }
            },
            'changepriceformdata [name=new_ppn_tanah]': {
                blur: function(el) {
                    me.unitFormula.changePPNTanah(el);
                }
            },
            'changepriceformdata [name=new_tot_ppn_tanah]': {
                blur: function(el) {
                    me.unitFormula.reversePPNTanah(el);
                }
            },
            'changepriceformdata [name=new_ppn_bangunan]': {
                blur: function(el) {
                    me.unitFormula.changePPNBangunan(el);
                }
            },
            'changepriceformdata [name=new_tot_ppn_bangunan]': {
                blur: function(el) {
                    me.unitFormula.reversePPNBangunan(el);
                }
            },
            'changepriceformdata [name=new_harga_balik_nama]': {
                blur: function(el) {
                    me.unitFormula.changeTotal(el);
                }
            },
            'changepriceformdata [name=new_harga_bphtb]': {
                blur: function(el) {
                    me.unitFormula.changeTotal(el);
                }
            },
            'changepriceformdata [name=new_harga_bajtb]': {
                blur: function(el) {
                    me.unitFormula.changeTotal(el);
                }
            },
            'changepriceformdata [name=new_biaya_administrasi]': {
                blur: function(el) {
                    me.unitFormula.changeTotal(el);
                }
            },
            'changepriceformdata [name=new_biaya_administrasi_subsidi]': {
                blur: function(el) {
                    me.unitFormula.changeTotal(el);
                }
            },
            'changepriceformdata [name=new_biaya_p_mutu]': {
                blur: function(el) {
                    me.unitFormula.changeTotal(el);
                }
            },
            'changepriceformdata [name=new_biaya_paket_tambahan]': {
                blur: function(el) {
                    me.unitFormula.changeTotal(el);
                }
            },
            'changepriceformdata [name=new_disc_sales]': {
                blur: function(el) {
                    me.unitFormula.changeDiscSales(el);
                }
            },
            'changepriceformdata [name=new_tot_disc_sales]': {
                blur: function(el) {
                    me.unitFormula.changeRevDiscSales(el);
                }
            },
            'changepriceformdata [name=tipebaru_land_size]': {
                keyup: function(el) {
                    me.unitFormula.changeFieldName('land_size', 'tipebaru_land_size');
                    me.unitFormula.changeHargaTanah(el);

                }
            },
            'changepriceformdata [name=tipebaru_kelebihan]': {
                keyup: function(el) {
                    me.unitFormula.changeFieldName('kelebihan', 'tipebaru_kelebihan');
                    me.unitFormula.changeHargaKelebihan(el);
                }
            },
            /* END MATH CONTROL*/
            'changepriceformdata [name=tipebaru_tipe_id]': {
                select: function(el, val) {
                    me.seFi.cb('tipebaru_tipe_code', el, 'code', val);
                    me.tipebaruTipeIdonSelect(val);


                }
            },
            'changepriceformdata [name=tipebaru_tipe_code]': {
                keyup: function(el) {

                    me.seFi.tf('tipebaru_tipe_id', el, {name: 'code', tipe: 'string'}, 'type_id');
                }
            },
            ///inhouse_term
            'changepriceformdata [name=inhouse_term]': {
                keyup: function(el) {
                    me.inhouseTermonKeyup(el);
                    me.unitFormula.changeTotalJual();
                }
            },
            'changepriceformdata [name=bank_id]': {
                select: function(el, val) {
                    me.seFi.cb('bank_bank_id', el, 'bank_id', val);

                }
            },
            'changepriceformdata [name=bank_bank_id]': {
                keyup: function(el) {

                    me.seFi.tf('bank_id', el, {name: 'bank_id', tipe: 'int'}, 'bank_id');
                }
            }




        });
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


        if (newPriceTotal > oldPriceTotal) {

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


                        schGridStore.add(me.cpScheduleGen.fillAr(me.cpScheduleGen.getFixDate(i + 1, spd), me.cpScheduleGen.localPT[selectedPriceTypeId].p, (i + 1), (addedAmount / terminInh), '', '', '', '', selectedPriceTypeId));

                    }
                }
            } else {
                //  schGridStore.add({amount: addedAmount, scheduletype: kodePriceType[selectedPriceTypeId]['p']});
                schGridStore.add(me.cpScheduleGen.fillAr(me.cpScheduleGen.getFixDate(i + 1, spd), me.cpScheduleGen.localPT[selectedPriceTypeId].p, 1, addedAmount, '', '', '', '', selectedPriceTypeId));
            }


        }

    },
    inhouseTermonKeyup: function(el) {
        var v = parseInt(el.getValue());
        var me = this;
        if (v > 99) {
            v = 99;
            me.setv('inhouse_term', v);
        }
    },
    tipebaruTipeIdonSelect: function(val) {
        var me = this;
        me.getFormdata().down('[name=tipebaru_land_size]').setValue(me.unitFormula.fmb(val[0].get('land_size')));
        me.getFormdata().down('[name=tipebaru_building_size]').setValue(me.unitFormula.fmb(val[0].get('building_size')));
        // check val tipe price
        var priceTypeVal = 0;
        priceTypeVal = parseInt(this.getv('new_pricetype_id'));
        if (isNaN(priceTypeVal))
            return false;
        this.updatePriceBaru();

    },
    updatePriceBaru: function() {
        var me = this;
        me.unitFormula.changeFieldName('land_size', 'tipebaru_land_size');
        me.unitFormula.changeHargaTanah(me.getFormdata('[name=new_harga_tanah_a]'));

    },
    selectUnitGridShow: function() {
        var me = this;
        _Apps.getController('Purchaseletter').browseItem('Changeprice');

    },
    processRowFromItemSelection: function(rows, modul) {
        var me = this;
        var plDetailStore = me.getPurchaseletterdetailStore();
        me.getFormdata().up('window').body.mask('Loading data...');
        plDetailStore.load({
            params: {mode_read: 'detailv2', purchaseletter_id: rows[0].get('purchaseletter_id')},
            callback: function(rec) {

                var detailModel = me.getPurchaseletterdetailvbModel();
                plDetailStore.model.setFields(detailModel.prototype.fields.getRange());


                me.setv('purchaseletter_id', rec[0].get('purchaseletter_id'));
                me.fillTipeBaru(rec[0]);
                me.fillForm.unitData(rec[0], me.getFormdata());
                me.fillForm.priceData(rec[0], me.getFormdata(), me.unitFormula);

                me.fillCustomerData(rec[0]);
                me.getFormdata().down('[name=purchaseletter_no]').setValue(rec[0].get('purchaseletter_no'));
                me.getFormdata().down('[name=pricetype_id]').setValue(rec[0].get('pricetype_id'));

                me.loadPrice(rec[0].get('unit_id'), function() {
                    me.fillForm.scheduleInfo(rec[0], me.getFormdata(), me.unitFormula);
                    me.getFormdata().up('window').body.unmask();
                    me.setDisabledTipeBaruFields(false);
                    /// check if price type selected
                    var prcTpVal = parseInt(me.getv('new_pricetype_id'));
                    if (!isNaN(prcTpVal)) {
                        var pricetypeStore = me.getFormdata().down('[name=new_pricetype_id]').getStore(), pricetype = null;

                        pricetype = pricetypeStore.findExact('pricetype_id', prcTpVal);
                        pricetype = pricetypeStore.getAt(pricetype).get('pricetype');
                        //me.pricetypeIdSelect(null,pricetype);
                        if (isNaN(pricetype)) {

                            me.getPriceData(pricetype);
                            me.sumTotal();
                        }

                    }
                });

            }
        });


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
    loadPrice: function(unitId, functCallback) {

        if (parseInt(unitId) == 0) {
            return false;
        }
        var me = this;
        var storePrice = me.getMarketingstockpriceStore();
        storePrice.load(
                {
                    params: {mode_read: 'price', unit_id: unitId},
                    callback: function(records, options, success) {

                        for (var i = 0; i < records.length; i++) {
                            if (records[i].data.pricetype_id == 1) {
                                me.priceData.CASH = records[i].data
                            } else if (records[i].data.pricetype_id == 2) {
                                me.priceData.KPR = records[i].data
                            } else {
                                me.priceData.INHOUSE = records[i].data
                            }
                        }

                        if (typeof functCallback === 'function') {
                            functCallback();
                        }


                    }
                }
        );
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
                me.getFormdata().down('[name=new' + filledFields[x] + ']').setValue(me.unitFormula.fmb(me.priceData[priceType][filledFields[x]]));
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
    setDisabledTipeBaruFields: function(val) {
        var me = this;

        me.getFormdata().down('[name=tipebaru_tipe_code]').setReadOnly(val);
        me.getFormdata().down('[name=tipebaru_tipe_id]').setReadOnly(val);
        me.getFormdata().down('[name=tipebaru_land_size]').setReadOnly(val);
        me.getFormdata().down('[name=tipebaru_building_size]').setReadOnly(val);
        me.getFormdata().down('[name=tipebaru_kelebihan]').setReadOnly(val);
    },
    fillTipeBaru: function(data) {
        var me = this;
        var form = me.getFormdata();
        var filledFields = ['land_size', 'building_size', 'kelebihan'];
        for (var x in filledFields) {
            if (form.down('[name=tipebaru_' + filledFields[x] + ']') != null) {
                form.down('[name=tipebaru_' + filledFields[x] + ']').setValue(data.data['unit_' + filledFields[x]]);
            }

        }

        me.getFormdata().down('[name=tipebaru_tipe_code]').setValue(data.get('unit_type_code'));
        me.getFormdata().down('[name=tipebaru_tipe_id]').setValue(data.get('unit_type_id'));
    },
    formDataAfterRender: function(el) {

        var me = this;
        me.setDisabledTipeBaruFields(true);
        me.loadComboBoxStore(el);
        var state = el.up('window').state;

        var scgStore = me.getFormdata().down('#MyScheduleGrid').getStore();
        scgStore.loadData([], false);

        if (state == 'create') {

            // el.down('#active').setValue(1);
        } else if (state == 'update') {
            
            me.getFormdata().down('#btnSave').setDisabled(true);
            
            var grid = me.getGrid();
            var store = grid.getStore();

            var detailStore = me.getChangepricedetailStore();
            var grid = me.getGrid();
            var store = grid.getStore();
            var form = me.getFormdata();

            var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));

            var changepriceId = record.internalId;
            detailStore.removeAll();

            detailStore.load(
                    {params: {mode_read: 'detail', changeprice_id: changepriceId},
                        callback: function(records) {
                            me.fillFormViaView(records);
                            me.fillScheduleInfoToForm_vread(records[0]);
                        }
                    }
            );

        }
        me.cpScheduleGen = new Erems.library.Schedulegenerator();

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
        var formulastore = me.getFormdata().down('[name=formula]').getStore();
        formulastore.load();
    },
    fillFormViaView: function(rec) {
        var me = this;
        //// unit data
        var filledFields = ['unit_id', 'productcategory', 'type_name', 'land_size', 'long', 'building_size', 'width', 'kelebihan', 'floor', 'block_id', 'cluster_id', 'unit_number', 'status'];

        for (var x in filledFields) {
            if (me.getFormdata().down('[name=unit_' + filledFields[x] + ']') !== null) {

                me.setv('unit_' + filledFields[x], rec[0].get('unit_' + filledFields[x]));
            }

        }
        //// end unit data
        me.fillPriceData('', rec[0], ''); /// fill old price 
        me.fillPriceData('new', rec[0], '_new'); /// fill new price 
        me.fillCustomerData(rec[0]);

    },
    fillScheduleInfoToForm_vread: function(data) {
        var me = this;
        

        var scGrid = me.getFormdata().down('#MyScheduleGrid');
        var scGridStore = scGrid.getStore();
        scGrid.body.mask('Loading Schedule...');
        scGridStore.load({
            params: {mode_read:'schedule',purchaseletter_id:data.get('purchaseletter_id')},
            callback: function(rec) {
                scGrid.body.unmask();  
               
                //scGrid.setDisabled(true);
            }
        }
        );


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
    validationProcess: function() {
        var me = this;
        var purchaseLetterId = parseInt(me.getv('purchaseletter_id'));
        var priceTypeIdNew = parseInt(me.getv('new_pricetype_id'));
        var newTotal = parseInt(me.getv('new_total_jual'));
        var oldTotal = parseInt(me.getv('_total_jual'));
        var totalValid = 4;
        var currentValid = 0;
        var msg = '';
        if (isNaN(purchaseLetterId)) {
            msg = 'No purchaseletter to process';
        } else if (purchaseLetterId < 1) {
            msg = 'Invalid purchasletter';
        } else if (oldTotal >= newTotal) {
            msg = 'Nilai total jual baru harus lebih dari nilai total jual lama';
        } else {

            return true;
        }
        Ext.Msg.show({
            title: 'Alert',
            msg: msg,
            icon: Ext.Msg.ERROR,
            buttons: Ext.Msg.OK,
            fn: function() {

            }
        });

        return false;
    },
    getFinalData: function(formGetValues) {
        var me = this;
        var detailModel = me.getChangepricedetailModel();
        var store = me.getChangepriceStore();
        store.model.setFields(detailModel.prototype.fields.getRange());

        var finalData = formGetValues;
        var newDate = finalData['changeprice_date'].split('-');
        newDate = newDate[2] + '-' + newDate[1] + '-' + newDate[0];
        finalData['changeprice_date'] = newDate;

        /////////


        finalData['tanahpermeter_new'] = toFloat(finalData['new_harga_tanah_a']);
        finalData['kelebihantanah_new'] = toFloat(finalData['new_harga_kelebihan_a']);
        finalData['harga_tanah_new'] = toFloat(finalData['new_harga_tanah_b']);
        finalData['harga_kelebihantanah_new'] = toFloat(finalData['new_harga_kelebihan_b']);
        finalData['harga_bangunan_new'] = toFloat(finalData['new_harga_bangunan']);
        finalData['harga_jualdasar_new'] = toFloat(finalData['new_harga_jual_dasar']);
        finalData['persen_dischargedasar_new'] = toFloat(finalData['new_disc_harga_dasar']);
        finalData['harga_dischargedasar_new'] = toFloat(finalData['new_tot_disc_harga_dasar']);
        finalData['persen_dischargetanah_new'] = toFloat(finalData['new_disc_harga_tanah']);
        finalData['harga_dischargetanah_new'] = toFloat(finalData['new_tot_disc_harga_tanah']);
        finalData['persen_dischargebangunan_new'] = toFloat(finalData['new_disc_harga_bangunan']);
        finalData['harga_dischargebangunan_new'] = toFloat(finalData['new_tot_disc_harga_bangunan']);
        finalData['harga_neto_new'] = toFloat(finalData['new_harga_netto']);
        finalData['persen_ppntanah_new'] = toFloat(finalData['new_ppn_tanah']);
        finalData['harga_ppntanah_new'] = toFloat(finalData['new_tot_ppn_tanah']);
        finalData['persen_ppnbangunan_new'] = toFloat(finalData['new_ppn_bangunan']);
        finalData['harga_ppnbangunan_new'] = toFloat(finalData['new_tot_ppn_bangunan']);
        finalData['harga_bbnsertifikat_new'] = toFloat(finalData['new_harga_balik_nama']);
        finalData['harga_bphtb_new'] = toFloat(finalData['new_harga_bphtb']);
        finalData['harga_bajb_new'] = toFloat(finalData['new_harga_bajtb']);
        finalData['harga_jual_new'] = toFloat(finalData['new_total']);
        finalData['persen_salesdisc_new'] = toFloat(finalData['new_disc_sales']);
        finalData['harga_salesdisc_new'] = toFloat(finalData['new_tot_disc_sales']);
        finalData['harga_admsubsidi_new'] = toFloat(finalData['new_biaya_administrasi_subsidi']);
        finalData['harga_pmutu_new'] = toFloat(finalData['new_biaya_p_mutu']);
        finalData['harga_paket_tambahan'] = toFloat(finalData['new_biaya_paket_tambahan']);
        finalData['type_id_new'] = finalData['tipebaru_tipe_id'];
        finalData['landsize_new'] = toFloat(finalData['tipebaru_land_size']);
        finalData['buildingsize_new'] = toFloat(finalData['tipebaru_building_size']);
        finalData['kelebihan_new'] = toFloat(finalData['tipebaru_kelebihan']);
        finalData['bank_id_new'] = finalData['bank_id_new'];
        finalData['corporate_new'] = finalData['kpr_status'];
        finalData['pricetype_id_new'] = finalData['new_pricetype_id'];
        finalData['harga_administrasi_new'] = toFloat(finalData['new_biaya_administrasi']);
        finalData['harga_total_jual_new'] = toFloat(finalData['new_total_jual']);
        finalData['inhouse_term'] = finalData['inhouse_term'];

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
      
        hsl = dateVar[2] + '' + charDst + '' + dateVar[1] + '' + charDst + '' + dateVar[0];
        return hsl;

    },
    fillPriceData: function(addPrefix, data, tailPrefixSrc) {
        var me = this;
        var form = me.getFormdata();
        var unitFormula = me.unitFormula;
        form.down('[name=' + addPrefix + '_harga_tanah_a]').setValue(unitFormula.fmb(data.get('tanahpermeter' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_harga_tanah_b]').setValue(unitFormula.fmb(data.get('harga_tanah' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_harga_kelebihan_a]').setValue(unitFormula.fmb(data.get('kelebihantanah' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_harga_kelebihan_b]').setValue(unitFormula.fmb(data.get('harga_kelebihantanah' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_harga_bangunan]').setValue(unitFormula.fmb(data.get('harga_bangunan' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_harga_jual_dasar]').setValue(unitFormula.fmb(data.get('harga_jualdasar' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_disc_harga_dasar]').setValue(unitFormula.fmb(data.get('persen_dischargedasar' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_tot_disc_harga_dasar]').setValue(unitFormula.fmb(data.get('harga_dischargedasar' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_disc_harga_tanah]').setValue(unitFormula.fmb(data.get('persen_dischargetanah' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_tot_disc_harga_tanah]').setValue(unitFormula.fmb(data.get('harga_dischargetanah' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_disc_harga_bangunan]').setValue(unitFormula.fmb(data.get('persen_dischargebangunan' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_tot_disc_harga_bangunan]').setValue(unitFormula.fmb(data.get('harga_dischargebangunan' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_harga_netto]').setValue(unitFormula.fmb(data.get('harga_neto' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_ppn_tanah]').setValue(unitFormula.fmb(data.get('persen_ppntanah' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_tot_ppn_tanah]').setValue(unitFormula.fmb(data.get('harga_ppntanah' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_ppn_bangunan]').setValue(unitFormula.fmb(data.get('persen_ppnbangunan' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_tot_ppn_bangunan]').setValue(unitFormula.fmb(data.get('harga_ppnbangunan' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_harga_balik_nama]').setValue(unitFormula.fmb(data.get('harga_bbnsertifikat' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_harga_bphtb]').setValue(unitFormula.fmb(data.get('harga_bphtb' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_harga_bajtb]').setValue(unitFormula.fmb(data.get('harga_bajb' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_biaya_administrasi]').setValue(unitFormula.fmb(data.get('harga_administrasi' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_biaya_administrasi_subsidi]').setValue(unitFormula.fmb(data.get('harga_admsubsidi' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_biaya_p_mutu]').setValue(unitFormula.fmb(data.get('harga_pmutu' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_biaya_paket_tambahan]').setValue(unitFormula.fmb(data.get('harga_paket_tambahan' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_total]').setValue(unitFormula.fmb(data.get('harga_jual' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_disc_sales]').setValue(unitFormula.fmb(data.get('persen_salesdisc' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_tot_disc_sales]').setValue(unitFormula.fmb(data.get('harga_salesdisc' + tailPrefixSrc)));
        form.down('[name=' + addPrefix + '_total_jual]').setValue(unitFormula.fmb(data.get('harga_total_jual' + tailPrefixSrc)));

    }





});