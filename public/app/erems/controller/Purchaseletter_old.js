var xyz = null;
Ext.define('Erems.controller.Purchaseletter', {
    extend: 'Erems.library.template.controller.Controllerwb',
    alias: 'controller.Purchaseletter',
    requires: ['Erems.library.Unitformula', 'Erems.library.Schedulegenerator'],
    views: ['purchaseletter.Panel', 'purchaseletter.Grid', 'purchaseletter.FormSearch', 'purchaseletter.FormData'],
    stores: ['Purchaseletter', 'Purchaseletterdetail', 'Unit', 'Marketingstockprice', 'Schedule', 'Sourcemoney', 'Masterdata.store.Bank', 'Mastercustomer'],
    models: ['Purchaseletter', 'Purchaseletterdetail', 'Unit', 'Marketingstockprice', 'Mastercustomer'],
    refs: [
        {
            ref: 'grid',
            selector: 'purchaselettergrid'
        },
        {
            ref: 'formsearch',
            selector: 'purchaseletterformsearch'
        },
        {
            ref: 'formdata',
            selector: 'purchaseletterformdata'
        }
    ],
    comboBoxIdEl: ['fd_clustercb', 'fd_blockcb', 'mediapromotion_cb', 'saleslocation_cb', 'bank_cb', 'citraclub_cb', 'salesman_cb', 'collector_cb'],
    controllerName: 'purchaseletter',
    fieldName: 'purchaseletter_no',
    bindPrefixName: 'Purchaseletter',
    validationItems: [{name: 'customer_name', msg: 'Customer is empty'},
        {name: 'pricetype_id', msg: 'Price type is empty'}
        //  pricetype_id
    ],
    formWidth: 800,
    countLoadProcess: 0,
    unitFormula: {}, /// unitFormula object,
    scheduleGen: {}, //// schedule generator object
    priceData: {KPR: {}, CASH: {}, INHOUSE: {}}, // for store price data  (KPR,CASH, INHOUSE)
    init: function(application) {
        var me = this;
        /// seting unitformula object
        me.unitFormula = new Erems.library.Unitformula();
        
        
        me.unitFormula.changeFieldName('long', 'unit_long');
        me.unitFormula.changeFieldName('width', 'unit_width');
        me.unitFormula.changeFieldName('kelebihan', 'unit_kelebihan');
        me.unitFormula.funcTotalJual = function() {


            me.scheduleGen.process();
            me.changeFormulaReceiptFields();
            me._genSchedule();
        };
        //  end seting unitformula object
        me.scheduleGen = new Erems.library.Schedulegenerator();


        this.control({
            'purchaseletterpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'purchaselettergrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'purchaseletterformsearch': {
                afterrender: this.formSearchAfterRender

            },
            purchaseletterschedulegrid: {
                afterrender: this.schedulegridAfterRender
            },
            'purchaseletterschedulegrid #colms_sourcemoney': {
                click: this.schedulegridItemClick
            },
            'purchaselettergrid toolbar button[action=create]': {
                click: function() {
                    //this.formDataShow('create');
                }
            },
            'purchaselettergrid toolbar button[action=update]': {
                click: function() {
                    // this.formDataShow('update');
                }
            },
            'purchaselettergrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'purchaselettergrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'purchaselettergrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'purchaseletterformsearch button[action=search]': {
                click: this.dataSearch
            },
            'purchaseletterformsearch button[action=reset]': {
                click: this.dataReset
            },
            'purchaseletterformdata': {
                afterrender: this.formDataAfterRender
            },
            'purchaseletterformdata button[action=save]': {
                click: this.dataSave
            },
            'purchaseletterformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'purchaseletterformdata button[action=browse_customer]': {
                click: me.selectCustomerGridShow
            },
            'purchaseletterformdata button[action=create_new_customer]': {
                click: me.createNewCustomerButtonOnClick
            },
            'purchaseletterformdata button[action=browse_unit]': {
                click: me.selectUnitGridShow
            },
            'purchaseletterformdata textfield[name=pricetype_id]': {
                select: me.pricetypeIdSelect
            },
            'purchaseletterformdata textfield[name=formula]': {
                select: me.formulaSelect
            },
            'purchaseletterformdata [name=j_tanda_jadi]': {
                keyup: me.jumlahCicilanOnKeyUp
            },
            'purchaseletterformdata [name=j_uang_muka]': {
                keyup: me.jumlahCicilanOnKeyUp
            },
            'purchaseletterformdata [name=j_sisa]': {
                keyup: me.jumlahCicilanOnKeyUp
            },
            'purchaseletterformdata [name=n_tanda_jadi]': {
                keyup: me.nilaiCicilanOnKeyUp
            },
            'purchaseletterformdata [name=n_uang_muka]': {
                keyup: me.nilaiCicilanOnKeyUp
            },
            /* MATH CONTROL */
            //
            'purchaseletterformdata [name=_harga_tanah_a]': {
                blur: function(el) {
                    me.unitFormula.changeHargaTanah(el);
                }
            },
            'purchaseletterformdata [name=_harga_kelebihan_a]': {
                blur: function(el) {
                    me.unitFormula.changeHargaKelebihan(el);
                }
            },
            'purchaseletterformdata [name=_harga_bangunan]': {
                blur: function(el) {
                    me.unitFormula.changeHargaBangunan(el);
                }
            },
            'purchaseletterformdata [name=_disc_harga_dasar]': {
                blur: function(el) {
                    me.unitFormula.changeDiscHargaDasar(el);
                }
            },
            'purchaseletterformdata [name=_tot_disc_harga_dasar]': {
                blur: function(el) {
                    me.unitFormula.changeRevDiscHargaDasar(el);
                }
            },
            'purchaseletterformdata [name=_disc_harga_tanah]': {
                blur: function(el) {
                    me.unitFormula.changeDiscTanah(el);
                }
            },
            'purchaseletterformdata [name=_tot_disc_harga_tanah]': {
                blur: function(el) {
                    me.unitFormula.changeRevDiscTanah(el);
                }
            },
            'purchaseletterformdata [name=_disc_harga_bangunan]': {
                blur: function(el) {
                    me.unitFormula.changeDiscBangunan(el);
                }
            },
            'purchaseletterformdata [name=_tot_disc_harga_bangunan]': {
                blur: function(el) {
                    me.unitFormula.changeRevDiscBangunan(el);
                }
            },
            'purchaseletterformdata [name=_ppn_tanah]': {
                blur: function(el) {
                    me.unitFormula.changePPNTanah(el);
                }
            },
            'purchaseletterformdata [name=_tot_ppn_tanah]': {
                blur: function(el) {
                    me.unitFormula.reversePPNTanah(el);
                }
            },
            'purchaseletterformdata [name=_ppn_bangunan]': {
                blur: function(el) {
                    me.unitFormula.changePPNBangunan(el);
                }
            },
            'purchaseletterformdata [name=_tot_ppn_bangunan]': {
                blur: function(el) {
                    me.unitFormula.reversePPNBangunan(el);
                }
            },
            'purchaseletterformdata [name=_harga_balik_nama]': {
                blur: function(el) {
                    me.unitFormula.changeTotal(el);
                }
            },
            'purchaseletterformdata [name=_harga_bphtb]': {
                blur: function(el) {
                    me.unitFormula.changeTotal(el);
                }
            },
            'purchaseletterformdata [name=_harga_bajtb]': {
                blur: function(el) {
                    me.unitFormula.changeTotal(el);
                }
            },
            'purchaseletterformdata [name=_biaya_administrasi]': {
                blur: function(el) {
                    me.unitFormula.changeTotal(el);
                }
            },
            'purchaseletterformdata [name=_biaya_administrasi_subsidi]': {
                blur: function(el) {
                    me.unitFormula.changeTotal(el);
                }
            },
            'purchaseletterformdata [name=_biaya_p_mutu]': {
                blur: function(el) {
                    me.unitFormula.changeTotal(el);
                }
            },
            'purchaseletterformdata [name=_biaya_paket_tambahan]': {
                blur: function(el) {
                    me.unitFormula.changeTotal(el);
                }
            },
            'purchaseletterformdata [name=_disc_sales]': {
                blur: function(el) {
                    me.unitFormula.changeDiscSales(el);
                }
            },
            'purchaseletterformdata [name=_tot_disc_sales]': {
                blur: function(el) {
                    me.unitFormula.changeRevDiscSales(el);
                }
            },
            /* END MATH CONTROL*/
            'purchaseletterformdata [name=saleslocation_id]': {
                select: function(el, val) {
                    me.seFi.cb('saleslocation_code', el, 'code', val);
                }
            },
            'purchaseletterformdata [name=saleslocation_code]': {
                keyup: function(el) {
                    me.seFi.tf('saleslocation_id', el, {name: 'code', tipe: 'string'}, 'saleslocation_id');

                }
            },
            'purchaseletterformdata [name=mediapromotion_id]': {
                select: function(el, val) {
                    me.seFi.cb('mediapromotion_code', el, 'code', val);
                }
            },
            'purchaseletterformdata [name=mediapromotion_code]': {
                keyup: function(el) {

                    me.seFi.tf('mediapromotion_id', el, {name: 'code', tipe: 'string'}, 'mediapromotion_id');
                }
            },
            'purchaseletterformdata [name=bank_id]': {
                select: function(el, val) {
                    me.seFi.cb('bank_bank_id', el, 'bank_id', val);
                }
            },
            'purchaseletterformdata [name=bank_bank_id]': {
                keyup: function(el) {

                    me.seFi.tf('bank_id', el, {name: 'bank_id', tipe: 'int'}, 'bank_id');
                }
            },
            'purchaseletterformdata [name=citraclub_id]': {
                select: function(el, val) {
                    me.seFi.cb('citraclub_code', el, 'code', val);
                }
            },
            'purchaseletterformdata [name=citraclub_code]': {
                keyup: function(el) {

                    me.seFi.tf('citraclub_id', el, {name: 'code', tipe: 'string'}, 'citraclub_id');
                }
            },
            'purchaseletterformdata [name=salesman_id]': {
                select: function(el, val) {
                    me.seFi.cb('salesman_code', el, 'code', val);
                }
            },
            'purchaseletterformdata [name=salesman_code]': {
                keyup: function(el) {

                    me.seFi.tf('salesman_id', el, {name: 'code', tipe: 'string'}, 'salesman_id');
                }
            },
            '[isEditor]': {
                select: me.editorSourcMoneyGridOnChange
            },
            /* BROWSE CONTROL */
            'purchaseletterbrowsepanel': {
                beforerender: me.browsepanelBeforeRender
            },
            'purchaseletterbrowsepanel button[action=select]': {
                click: me.browsegridSelection
            },
            'purchaseletterbrowsegrid': {
                afterrender: me.browsegridAfterRender
            },
            'purchaseletterbrowseformsearch button[action=search]': {
                click:me.browseSearch
            }
            /* END BROWSE CONTROL */

        });
    },
    browseSearch:function(el,val){
        xyz = el;
    },
    execAction: function(el, action, me) {
        if (!action) {
            action = '';
        }
        if (!me) {
            me = this;
        }

        switch (action) {

            case me.bindPrefixName + 'Create':
                me.selectUnitGridShow();
                break;
            case me.bindPrefixName + 'Update':
                me.formDataShow(el, acts[action], action);
                break;
            case 'show':
                me.formDataShow(el, action);
                break;
            case me.bindPrefixName + 'Delete':
                me.dataDestroy(el);
                break;
            case me.bindPrefixName + 'Print':
                loadReport(el, 'tms/building/print');
                break;
        }
    },
    schedulegridItemClick: function(view, cell, row, col, e) {

    },
    schedulegridAfterRender: function() {
        var me = this;
        var s = me.getSourcemoneyStore();
        s.load();
    },
    pricetypeIdSelect: function(el, val) {
        var priceType = val[0].data.pricetype;
        var me = this;
        var flagJsisa = false;
        me.getPriceData(priceType);
        me.getFormdata().down('[name=kprstatus_id]').setVisible(priceType == 'KPR' ? true : false);
        me.getFormdata().down('[name=bank_id]').setReadOnly(priceType == 'KPR' ? false : true);
        me.getFormdata().down('[name=bank_bank_id]').setReadOnly(priceType == 'KPR' ? false : true);
        me.scheduleGen.setTypePrice(val[0].data.pricetype_id);
        var pSp = me.getFormdata().down('[name=purchase_date]').getValue();  /// purchase sp
        
        pSp = Ext.Date.format(pSp, "d m Y").split(" ");
        me.scheduleGen.setSpDate(pSp);
        var formulastore = me.getFormdata().down('[name=formula]').getStore();
        flagJsisa = val[0].get('pricetype_id')==3?false:true;
        me.getFormdata().down('[name=j_sisa]').setReadOnly(flagJsisa);
        formulastore.load(
                {
                    params: {pricetype_id: val[0].data.pricetype_id, active: 1},
                    callback: function(records) {
                        me.scheduleGen.reset();


                        if (records.length > 0) {
                            var fcb = me.getFormdata().down('[name=formula]');
                            fcb.setReadOnly(false);

                            fcb.setValue(records[0].data.billingrules_id);
                            me.setDataFormula();
                            me.scheduleGen.setValFromCombobox(true);
                            me.scheduleGen.process();
                            me.scheduleGen.getDataFormula();
                            me._genSchedule();
                        }


                    }
                }
        );

    },
    setDataFormula: function() {
        var me = this;
        var store = me.getFormdata().down('[name=formula]').getStore();
        var fv = me.getFormdata().down('[name=formula]').getValue();
        if (fv == null)
            return false;
        var idx = store.findExact('billingrules_id', fv);
        var record = store.getAt(idx);
        me.scheduleGen.setPersenTandaJadi(record.data.persen_tandajadi);
        me.scheduleGen.setPersenUangMuka(record.data.persen_uangmuka);
        me.scheduleGen.setTandaJadi(record.data.tandajadi);
        me.scheduleGen.setUangMuka(record.data.uangmuka);
        me.scheduleGen.setJumlahTandaJadi(1);
        me.scheduleGen.setJumlahUangMuka(record.data.periode_uangmuka);
        me.scheduleGen.setJumlahSisa(record.data.periode_angsuran);

    },
    getPriceData: function(priceType) {
        var me = this;

        var filledFields = ['_disc_harga_bangunan', '_disc_harga_dasar', '_disc_harga_tanah',
            '_harga_bajtb', '_harga_balik_nama', '_harga_bangunan', '_harga_bphtb', '_harga_jual_dasar',
            '_harga_kelebihan_a', '_harga_kelebihan_b', '_harga_netto', '_harga_tanah_a',
            '_harga_tanah_b', '_ppn_bangunan', '_ppn_tanah', '_tot_disc_harga_bangunan',
            '_tot_disc_harga_dasar', '_tot_disc_harga_tanah', '_tot_ppn_bangunan', '_tot_ppn_tanah', '_total'];
        for (var x in filledFields) {
            if (me.getFormdata().down('[name=' + filledFields[x] + ']') != null) {
                me.getFormdata().down('[name=' + filledFields[x] + ']').setValue(me.unitFormula.fmb(me.priceData[priceType][filledFields[x]]));
            }

        }
        me.getFormdata().down('[name=_total_jual]').setValue(me.unitFormula.fmb(me.priceData[priceType]['_total']));


    },
    setPriceData: function(priceType) {
        var me = this;
        console.log(priceType);
        var filledFields = ['_disc_harga_bangunan', '_disc_harga_dasar', '_disc_harga_tanah',
            '_harga_bajtb', '_harga_balik_nama', '_harga_bangunan', '_harga_bphtb', '_harga_jual_dasar',
            '_harga_kelebihan_a', '_harga_kelebihan_b', '_harga_netto', '_harga_tanah_a',
            '_harga_tanah_b', '_ppn_bangunan', '_ppn_tanah', '_tot_disc_harga_bangunan',
            '_tot_disc_harga_dasar', '_tot_disc_harga_tanah', '_tot_ppn_bangunan', '_tot_ppn_tanah', '_total'];
        for (var x in filledFields) {
            if (me.getFormdata().down('[name=' + filledFields[x] + ']') != null) {
                me.getFormdata().down('[name=' + filledFields[x] + ']').setValue(me.unitFormula.fmb(me.priceData[priceType][filledFields[x]]));
            }

        }
        me.getFormdata().down('[name=_total_jual]').setValue(me.unitFormula.fmb(me.priceData[priceType]['_total']));


    },
    selectUnitGridShow: function() {
        var me = this;

        _Apps.getController('Marketingstock').browseItem('Purchaseletter');

    },
    processRowFromUnitSelection: function(row) {
        var me = this;
        me.instantWindow('FormData', 800, 'Add Purchase Letter', 'create', 'myPurchaseLetterFormData');
        me.loadUnitData(row[0].data.unit_id);
    },
    loadUnitData: function(unitId, callBackFunc) {

        var me = this;
        var unitStore = me.getUnitStore();

        unitStore.load({
            params: {unit_id: unitId},
            callback: function(records) {
                me.fillUnitDataToForm(records[0]);
                if (typeof callBackFunc === 'function') {
                    callBackFunc();
                }
            }
        }
        );

    },
    fillUnitDataToForm: function(data) {
        var me = this;
        var filledFields = ['unit_id', 'productcategory', 'type_name', 'land_size', 'long', 'building_size', 'width', 'kelebihan', 'floor', 'block_id', 'cluster_id', 'unit_number'];

        for (var x in filledFields) {
            if (me.getFormdata().down('[name=unit_' + filledFields[x] + ']') != null) {
                me.getFormdata().down('[name=unit_' + filledFields[x] + ']').setValue(data.data[filledFields[x]]);
            }

        }
    },
    fillUnitDataToForm_vread: function(data) {
        var me = this;
      
        var filledFields = ['unit_id', 'productcategory', 'type_name', 'land_size', 'long', 'building_size', 'width', 'kelebihan', 'floor', 'block_id', 'cluster_id', 'unit_number'];

        for (var x in filledFields) {
            if (me.getFormdata().down('[name=unit_' + filledFields[x] + ']') != null) {
                me.getFormdata().down('[name=unit_' + filledFields[x] + ']').setValue(data.data['unit_' + filledFields[x]]);
            }

        }
    },
    selectCustomerGridShow: function() {
        var me = this;
        _Apps.getController('Mastercustomer').browseItem('Purchaseletter');
    },
    processRowFromItemSelection: function(rows, modul) {
        var me = this;
        var winId = 'myPurchaseLetterFormData';
        if (!desktop.getWindow(winId)) {
            me.instantWindow('FormData', 800, 'Add Purchase Letter', 'create', winId);
        }

        switch (modul) {
            case 'marketingstock':
                me.fillMarketStockData(rows);
            case 'mastercustomer':
                me.fillMasterCustomerData(rows);
        }

    },
    fillMarketStockData: function(rows) {
        var me = this;
        me.loadUnitData(rows[0].data.unit_id);
        me.loadPrice(rows[0].data.unit_id);
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
    fillMasterCustomerData: function(records) {
        var me = this;
        console.log('data customer');
        console.log(records);
        var filledFields = ['customer_id', 'name', 'address', 'city_id', 'home_phone', 'office_phone',
            'zipcode', 'mobile_phone', 'fax', 'KTP_number', 'NPWP', 'email'];
        me.getFormdata().down('#photo_image').el.setStyle({backgroundImage: 'url(upload/' + records[0].get('photo') + ')', backgroundSize: '160px 200px'});
        for (var x in filledFields) {
            if (me.getFormdata().down('[name=customer_' + filledFields[x] + ']') != null) {
                me.getFormdata().down('[name=customer_' + filledFields[x] + ']').setValue(records[0].data[filledFields[x]]);
            }

        }
    },
    checkAllDetailLoadingProcess: function() {
        var me = this;
        if (me.countLoadProcess === 4) {
            me.getFormdata().up('window').body.unmask();
        }

    },
    formDataAfterRender: function(el) {
        var me = this;
        me.loadComboBoxStore(el);
        var state = el.up('window').state;
        
        var scgStore = me.getFormdata().down('#MyScheduleGrid').getStore();
        scgStore.loadData([],false);
        
        if (state == 'create') {
            // el.down('#active').setValue(1);
        } else if (state == 'update') {
            me.countLoadProcess = 0;
            me.getFormdata().up('window').body.mask('Loading data, please wait ...');
            var detailStore = me.getPurchaseletterdetailStore();
            var grid = me.getGrid();
            var store = grid.getStore();
            var form = me.getFormdata();

            var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));

            var purchaseletterId = record.internalId;
            detailStore.removeAll();

            detailStore.load(
                    {params: {mode_read: 'detail', purchaseletter_id: purchaseletterId},
                        callback: function(records) {
                            var rec = null;
                            try {
                                if (records != null) {

                                    rec = detailStore.getAt(0);
                                    el.loadRecord(rec);
                                    form.down('[name=salesman_code]').setValue(me.getValFromElStore(form.down('[name=salesman_id]'), rec.data.salesman_id, 'salesman_id', 'code'));
                                    form.down('[name=citraclub_id]').setValue(rec.data.clubcitra_id);
                                    form.down('[name=citraclub_code]').setValue(me.getValFromElStore(form.down('[name=citraclub_id]'), rec.data.clubcitra_id, 'citraclub_id', 'code'));
                                    form.down('[name=saleslocation_code]').setValue(me.getValFromElStore(form.down('[name=saleslocation_id]'), rec.data.saleslocation_id, 'saleslocation_id', 'code'));
                                    form.down('[name=mediapromotion_code]').setValue(me.getValFromElStore(form.down('[name=mediapromotion_id]'), rec.data.mediapromotion_id, 'mediapromotion_id', 'code'));
                                    form.down('[name=unit_status]').setValue(rec.get('unit_status'));
                                    //////// sales information
                                    form.down('[name=saleslocation_code]').setValue(rec.get('saleslocation_code'));
                                    form.down('[name=mediapromotion_code]').setValue(rec.get('mediapromotion_code'));
                                    form.down('[name=citraclub_code]').setValue(rec.get('citraclub_code'));

                                    me.fillUnitDataToForm_vread(rec);
                                    me.fillPriceDataToForm_vread(rec);
                                    me.fillScheduleInfoToForm_vread(rec);
                                    ///// disable button
                                    me.disableFieldForm();
                                    form.down('#fd_browse_unit_btn').setDisabled(true);
                                    form.down('#fd_browse_customer_btn').setDisabled(true);

                                    //// end disable button



                                }
                            } catch (err) {

                            }


                        }
                    });

        }
        me.unitFormula.setForm(me.getFormdata());
        me.unitFormula.addPrefixToAllFieldName('');
  
        var formulastore = me.getFormdata().down('[name=formula]').getStore();
        formulastore.load();
        me.scheduleGen.form = me.getFormdata();
        ////////

    },
    fillScheduleInfoToForm_vread: function(data) {
        var me = this;
        me.getFormdata().down('[name=j_tanda_jadi]').setValue(me.unitFormula.fmb(data.get('tandajadi_time')));
        me.getFormdata().down('[name=n_tanda_jadi]').setValue(me.unitFormula.fmb(data.get('tandajadi_value')));
        me.getFormdata().down('[name=j_uang_muka]').setValue(me.unitFormula.fmb(data.get('uangmuka_time')));
        me.getFormdata().down('[name=n_uang_muka]').setValue(me.unitFormula.fmb(data.get('uangmuka_value')));
        me.getFormdata().down('[name=j_sisa]').setValue(me.unitFormula.fmb(data.get('sisacicilan_time')));
        me.getFormdata().down('[name=n_sisa]').setValue(me.unitFormula.fmb(data.get('sisacicilan_value')));
        /// billing rules combo box
        me.getFormdata().down('[name=formula]').setValue(data.get('billingrules_id'));

        var scGrid = me.getFormdata().down('#MyScheduleGrid');
        var scGridStore = scGrid.getStore();
        scGrid.body.mask('Loading Schedule...');
        scGridStore.load({
            params: {mode_read:'schedule',purchaseletter_id:data.get('purchaseletter_id'),scheduletype_id:data.get('scheduletype_id')},
            callback: function(rec) {
                scGrid.body.unmask();  
               
                //scGrid.setDisabled(true);
            }
        }
        );


    },
    fillPriceDataToForm_vread: function(data) {
        var me = this;

        me.getFormdata().down('[name=_harga_tanah_a]').setValue(me.unitFormula.fmb(data.get('tanahpermeter')));
        me.getFormdata().down('[name=_harga_tanah_b]').setValue(me.unitFormula.fmb(data.get('harga_tanah')));
        me.getFormdata().down('[name=_harga_kelebihan_a]').setValue(me.unitFormula.fmb(data.get('kelebihantanah')));
        me.getFormdata().down('[name=_harga_kelebihan_b]').setValue(me.unitFormula.fmb(data.get('harga_kelebihantanah')));
        me.getFormdata().down('[name=_harga_bangunan]').setValue(me.unitFormula.fmb(data.get('harga_bangunan')));
        me.getFormdata().down('[name=_harga_jual_dasar]').setValue(me.unitFormula.fmb(data.get('harga_jualdasar')));
        me.getFormdata().down('[name=_disc_harga_dasar]').setValue(me.unitFormula.fmb(data.get('persen_dischargadasar')));
        me.getFormdata().down('[name=_tot_disc_harga_dasar]').setValue(me.unitFormula.fmb(data.get('harga_dischargadasar')));
        me.getFormdata().down('[name=_disc_harga_tanah]').setValue(me.unitFormula.fmb(data.get('persen_dischargatanah')));
        me.getFormdata().down('[name=_tot_disc_harga_tanah]').setValue(me.unitFormula.fmb(data.get('harga_dischargatanah')));
        me.getFormdata().down('[name=_disc_harga_bangunan]').setValue(me.unitFormula.fmb(data.get('persen_dischargabangunan')));
        me.getFormdata().down('[name=_tot_disc_harga_bangunan]').setValue(me.unitFormula.fmb(data.get('harga_dischargabangunan')));
        me.getFormdata().down('[name=_harga_netto]').setValue(me.unitFormula.fmb(data.get('harga_netto')));
        me.getFormdata().down('[name=_ppn_tanah]').setValue(me.unitFormula.fmb(data.get('persen_ppntanah')));
        me.getFormdata().down('[name=_tot_ppn_tanah]').setValue(me.unitFormula.fmb(data.get('harga_ppntanah')));
        me.getFormdata().down('[name=_ppn_bangunan]').setValue(me.unitFormula.fmb(data.get('persen_ppnbangunan')));
        me.getFormdata().down('[name=_tot_ppn_bangunan]').setValue(me.unitFormula.fmb(data.get('harga_ppnbangunan')));
        me.getFormdata().down('[name=_harga_balik_nama]').setValue(me.unitFormula.fmb(data.get('harga_bbnsertifikat')));
        me.getFormdata().down('[name=_harga_bphtb]').setValue(me.unitFormula.fmb(data.get('harga_bphtb')));
        me.getFormdata().down('[name=_harga_bajtb]').setValue(me.unitFormula.fmb(data.get('harga_bajb')));
        me.getFormdata().down('[name=_biaya_administrasi]').setValue(me.unitFormula.fmb(data.get('harga_administrasi')));
        me.getFormdata().down('[name=_biaya_administrasi_subsidi]').setValue(me.unitFormula.fmb(data.get('harga_admsubsidi')));
        me.getFormdata().down('[name=_biaya_p_mutu]').setValue(me.unitFormula.fmb(data.get('harga_pmutu')));
        me.getFormdata().down('[name=_biaya_paket_tambahan]').setValue(me.unitFormula.fmb(data.get('harga_paket_tambahan')));
        me.getFormdata().down('[name=_total]').setValue(me.unitFormula.fmb(data.get('harga_jual')));
        me.getFormdata().down('[name=_disc_sales]').setValue(me.unitFormula.fmb(data.get('persen_salesdisc')));
        me.getFormdata().down('[name=_tot_disc_sales]').setValue(me.unitFormula.fmb(data.get('harga_salesdisc')));
        me.getFormdata().down('[name=_total_jual]').setValue(me.unitFormula.fmb(data.get('harga_total_jual')));

        //unit_status
    },
    formulaSelect: function(el, val) {
        console.log(val);
        this._genSchedule();

    },
    jumlahCicilanOnKeyUp: function() {
        var me = this;
        me.scheduleGen.setJumlahTandaJadi(me.getFormdata().down('[name=j_tanda_jadi]').getValue());
        me.scheduleGen.setJumlahUangMuka(toFloat(me.getFormdata().down('[name=j_uang_muka]').getValue()));
        me.scheduleGen.setJumlahSisa(toFloat(me.getFormdata().down('[name=j_sisa]').getValue()));
        me.scheduleGen.setValFromCombobox(false);

        me.scheduleGen.process();
        me._genSchedule();
    },
    nilaiCicilanOnKeyUp: function() {
        var me = this;
        me.scheduleGen.setTandaJadi(me.getFormdata().down('[name=n_tanda_jadi]').getValue());
        me.scheduleGen.setUangMuka(toFloat(me.getFormdata().down('[name=n_uang_muka]').getValue()));
        me.scheduleGen.setValFromCombobox(false);
        me.scheduleGen.process();
        me._genSchedule();
    },
    _genSchedule: function() {
        var me = this;

        var scgrid = me.getFormdata().down('#MyScheduleGrid').getStore();
        scgrid.loadData([], false);

        var dataFromSG = me.scheduleGen.getDataGrid();
        scgrid.loadData(dataFromSG);

    },
    changeFormulaReceiptFields: function() {
        var me = this;
        me.getFormdata().down('[name=n_tanda_jadi]').setValue(me.unitFormula.fmb(me.scheduleGen.getTandaJadi()));
        me.getFormdata().down('[name=n_uang_muka]').setValue(me.unitFormula.fmb(me.scheduleGen.getUangMuka()));
        me.getFormdata().down('[name=n_sisa]').setValue(me.unitFormula.fmb(me.scheduleGen.getSisa()));
    },
    /* PROCESS FORM INPUT TO SERVER*/
    getFinalData: function(formGetValues) {
        var me = this;
        var finalData = formGetValues;

        var pNo = '';// nomor purchase;
        var pDate = finalData.purchase_date; /// tanggal purchase;

        pDate = pDate.split("-");
        if (pDate.length > 2) {
            pNo = '/' + pDate[0] + '/' + pDate[1] + '/' + pDate[2];
        }
        finalData['purchaseletter_no'] = pNo;

        finalData['purchase_date'] = pDate[2] + '-' + pDate[1] + '-' + pDate[0];

        finalData['unit_id'] = finalData.unit_unit_id;
        finalData['customer_id'] = finalData.customer_customer_id;
        finalData['clubcitra_id'] = finalData.citraclub_id;
        finalData['saleslocation'] = finalData.saleslocation_id;
        finalData['bankkpr_id'] = finalData.bank_id;
        finalData['billingrules_id'] = finalData.formula;
        finalData['tandajadi_time'] = toFloat(finalData.j_tanda_jadi);
        finalData['tandajadi_value'] = toFloat(finalData.n_tanda_jadi);
        finalData['uangmuka_time'] = toFloat(finalData.j_uang_muka);
        finalData['uangmuka_value'] = toFloat(finalData.n_uang_muka);
        finalData['sisacicilan_time'] = toFloat(finalData.j_sisa);
        finalData['sisacicilan_value'] = toFloat(finalData.n_sisa);
        finalData['total_payment'] = toFloat(finalData._total_jual);
        finalData['corporate'] = finalData.kprstatus_id;
        pDate = finalData.rencana_serahterima_date; /// tanggal purchase;
        pDate = pDate.split("-");
        if (pDate.length > 2) {
            finalData['rencana_serahterima_date'] = pDate[2] + '-' + pDate[1] + '-' + pDate[0];
        }

        /// added 15 Agustus 2013

        finalData['customer_name'] = finalData.customer_name;
        finalData['customer_address'] = finalData.customer_address;
        finalData['customer_city_id'] = finalData.customer_city;
        finalData['customer_zipcode'] = finalData.customer_zipcode;
        finalData['customer_homephone'] = finalData.customer_home_phone;
        finalData['customer_mobilephone'] = finalData.customer_mobile_phone;
        finalData['customer_officephone'] = finalData.customer_office_phone;
        finalData['customer_fax'] = finalData.customer_fax;
        finalData['customer_ktp'] = finalData.customer_KTP_number;
        finalData['customer_npwp'] = finalData.customer_NPWP;
        finalData['customer_email'] = finalData.customer_email;
        finalData['tanahpermeter'] = toFloat(finalData._harga_tanah_a);
        finalData['kelebihantanah'] = toFloat(finalData._harga_kelebihan_a);
        finalData['harga_tanah'] = toFloat(finalData._harga_tanah_b);
        finalData['harga_kelebihantanah'] = toFloat(finalData._harga_kelebihan_b);
        finalData['harga_bangunan'] = toFloat(finalData._harga_bangunan);
        finalData['harga_jualdasar'] = toFloat(finalData._harga_jual_dasar);
        finalData['persen_dischargadasar'] = toFloat(finalData._disc_harga_dasar);
        finalData['harga_dischargadasar'] = toFloat(finalData._tot_disc_harga_dasar);
        finalData['persen_dischargatanah'] = toFloat(finalData._disc_harga_tanah);
        finalData['harga_dischargatanah'] = toFloat(finalData._tot_disc_harga_tanah);
        finalData['persen_dischargabangunan'] = toFloat(finalData._disc_harga_bangunan);
        finalData['harga_dischargabangunan'] = toFloat(finalData._tot_disc_harga_bangunan);
        finalData['harga_netto'] = toFloat(finalData._harga_netto);
        finalData['persen_ppntanah'] = toFloat(finalData._ppn_tanah);
        finalData['harga_ppntanah'] = toFloat(finalData._tot_ppn_tanah);
        finalData['persen_ppnbangunan'] = toFloat(finalData._ppn_bangunan);
        finalData['harga_ppnbangunan'] = toFloat(finalData._tot_ppn_bangunan);
        finalData['harga_bbnsertifikat'] = toFloat(finalData._harga_balik_nama);
        finalData['harga_bphtb'] = toFloat(finalData._harga_bphtb);
        finalData['harga_bajb'] = toFloat(finalData._harga_bajtb);
        finalData['harga_jual'] = toFloat(finalData._total);
        finalData['persen_salesdisc'] = toFloat(finalData._disc_sales);
        finalData['harga_salesdisc'] = toFloat(finalData._tot_disc_sales);
        finalData['harga_admsubsidi'] = toFloat(finalData._biaya_administrasi_subsidi);
        finalData['harga_pmutu'] = toFloat(finalData._biaya_p_mutu);
        finalData['harga_administrasi'] = toFloat(finalData._biaya_administrasi);
        finalData['harga_paket_tambahan'] = toFloat(finalData._biaya_paket_tambahan);
        finalData['harga_total_jual'] = toFloat(finalData._total_jual);
        /// end added 15 Agustus 2013

        //// cek grid schedule
        finalData['detail'] = {};
        var detailParams = {schedule_id: '', scheduletype_id: '', purchaseletter_id: '', duedate: '', amount: '', sourcemoney_id: '', remaining_balance: '', intersetflag: '',
            interset: '', remaining_interest: '', recomendationdate: '', termin: '', description: ''};
        var delimeter = '';
        var schStore = me.getFormdata().down('#MyScheduleGrid').getStore();

        var countRow = 0;
        schStore.each(function(rec) {
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

        });
       
        /// end cek grid schedule
        finalData['detail'] = detailParams;
        
        return finalData;
    },
    /* END PROCESS FORM INPUT TO SERVER*/
    toSqlSRVDateFormat: function(dateVar) {
        var hsl = ' ';
        var charDst = '-';
      
        //dateVar = dateVar.split('/');
        dateVar = Ext.Date.format(dateVar, "d m Y").split(" ");
 
        hsl = dateVar[2] + '' + charDst + '' + dateVar[1] + '' + charDst + '' + dateVar[0];
        return hsl;

    },
    disableFieldForm: function() {
        var me = this;

        var dF = ['pricetype_id', 'purchase_date', 'formula', 'j_tanda_jadi', 'j_uang_muka', 'j_sisa', 'n_tanda_jadi', 'n_uang_muka', 'n_sisa',
            '_harga_tanah_a', '_harga_tanah_b', '_harga_kelebihan_a', '_harga_kelebihan_b', '_harga_bangunan', '_disc_harga_dasar',
            '_tot_disc_harga_dasar', '_disc_harga_tanah', '_tot_disc_harga_tanah', '_disc_harga_bangunan', '_tot_disc_harga_bangunan',
            '_ppn_tanah', '_tot_ppn_tanah', '_ppn_bangunan', '_tot_ppn_bangunan', '_harga_balik_nama', '_harga_bphtb', '_harga_bajtb',
            '_biaya_administrasi', '_biaya_administrasi_subsidi', '_biaya_p_mutu', '_biaya_paket_tambahan', '_disc_sales', '_tot_disc_sales'];
        var f = me.getFormdata();
        for (var i = 0; i < dF.length; i++) {
            f.down('[name=' + dF[i] + ']').setReadOnly(true);
        }


    },
    editorSourcMoneyGridOnChange: function(el, val) {
        var me = this;

        var idSourceMoney = val[0].internalId;
        var grid = me.getFormdata().down('purchaseletterschedulegrid');
        console.log(grid);
        console.log(idSourceMoney);
    },
    createNewCustomerButtonOnClick: function() {
        _Apps.getController('Mastercustomer').instantCreate('Purchaseletter');
    },
    getInstanCreateStorex: function(controllerName) {
        if (controllerName === 'mastercustomer') {
            return this.getMastercustomerStore();
        }
        return null;

    }



});