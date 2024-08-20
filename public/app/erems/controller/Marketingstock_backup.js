Ext.define('Erems.controller.Marketingstock', {
    extend: 'Erems.library.template.controller.Controller2',
    alias: 'controller.Marketingstock',
    requires: ['Erems.library.Browse', 'Erems.library.box.Config',
        'Erems.library.box.tools.Tools', 'Erems.template.ComboBoxFields',
        'Erems.library.box.tools.EventSelector',
        'Erems.library.ModuleTools'],
    views: ['marketingstock.Panel', 'marketingstock.Grid', 'marketingstock.FormSearch', 'marketingstock.FormData', 'marketingstock.SelectUnitGrid', 'marketingstock.SelectUnitFormSearch', 'marketingstock.SelectUnitPanel'],
    refs: [
        {
            ref: 'grid',
            selector: 'marketingstockgrid'
        },
        {
            ref: 'formsearch',
            selector: 'marketingstockformsearch'
        },
        {
            ref: 'formdata',
            selector: 'marketingstockformdata'
        },
        {
            ref: 'unitgrid',
            selector: 'selectunitgrid',
        },
        {
            ref: 'panel',
            selector: 'marketingstockpanel'
        },
        {
            ref: 'formsearchunit',
            selector: 'selectunitformsearch'
        }
    ],
    controllerName: 'marketingstock',
    fieldName: 'marketstock_id',
    bindPrefixName: 'Marketingstock',
    formWidth: 800,
    localStore: {
        detail: null,
        selectedUnit: null,
        customer: null
    },
    browseHandler: null,
    cbf: null,
    mt: null,
    priceTypeList: null,
    myMasterData: null,
    constructor: function(configs) {

        this.callParent(arguments);
        var me = this;
        this.myConfig = new Erems.library.box.Config({
            _controllerName: me.controllerName
        });

        me.cbf = new Erems.template.ComboBoxFields();

        /////// LOAD ACCOUNTING OBJECT
        if (typeof accounting === 'undefined') {

            Ext.Loader.injectScriptElement(document.URL + 'app/erems/library/accounting.min.js', function() {
                /// loaded
                // Settings object that controls default parameters for library methods:
                accounting.settings = {
                    currency: {
                        symbol: "", // default currency symbol is '$'
                        format: "%s%v", // controls output: %s = symbol, %v = value/number (can be object: see below)
                        decimal: ".", // decimal point separator
                        thousand: ",", // thousands separator
                        precision: 2   // decimal places
                    },
                    number: {
                        precision: 0, // default precision on numbers is 0
                        thousand: ",",
                        decimal: "."
                    }
                }
                
                EREMS_GLOBAL_PRECISION = 2;
                
                
            }, function() {
                /// error
            });
        }

    },
    init: function(application) {
        var me = this;

        me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
        var events = new Erems.library.box.tools.EventSelector();

        this.control({
            'marketingstockpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'marketingstockgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'marketingstockgrid toolbar button[action=create]': {
                click: function() {

                    //this.formDataShow('create');
                    // me.selectUnitGridShow();
                }
            },
            'marketingstockgrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'marketingstockgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'marketingstockgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'marketingstockgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'marketingstockformsearch button[action=search]': {
                click: this.dataSearch
            },
            'marketingstockformsearch button[action=reset]': {
                click: this.dataReset
            },
            'marketingstockformdata': {
                afterrender: this.formDataAfterRender
            },
            'marketingstockformdata button[action=save]': {
                click: this.mainDataSave
            },
            'marketingstockformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'marketingstockformsearch': {
                afterrender: me.formSearchAfterRender
            },
            'selectunitgrid': {
                afterrender: me.selectunitgridAfterRender
                        //itemdblclick: this.gridItemDblClick,
                        // itemcontextmenu: this.gridItemContextMenu,
                        //selectionchange: this.gridSelectionChange
            },
            'selectunitgrid toolbar button[action=select]': {
                click: me.selectunitgridSelection
            },
            'marketingstockformdata [name=t_harga_tanah_a]': {
                change: function(el) {
                    me.flagSection = 't';
                    me.changeHargaTanah(el);
                }
            },
            'marketingstockformdata [name=t_harga_kelebihan_a]': {
                change: function(el) {
                    me.flagSection = 't';
                    me.changeHargaKelebihan(el);
                }

            },
            'marketingstockformdata [name=t_harga_bangunan]': {
                keyup: function() {
                    me.flagSection = 't';
                    me.changeHargaBangunan();
                }
            },
            'marketingstockformdata [name=t_disc_harga_dasar]': {
                keyup: function() {
                    me.mkCalculate('t').hargaDasar();
                    // me.flagSection = 't';
                    //  me.discountFormula(me.flagSection + '_disc_harga_dasar', me.flagSection + '_harga_jual_dasar', me.flagSection + '_tot_disc_harga_dasar');
                }

            },
            'marketingstockformdata [name=t_disc_harga_tanah]': {
                keyup: function() {
                    me.mkCalculate('t').discHargaTanah();
                }

            },
            'marketingstockformdata [name=t_disc_harga_bangunan]': {
                keyup: function() {
                    me.mkCalculate('t').discHargaBangunan();
                }

            },
            'marketingstockformdata [name=t_ppn_tanah]': {
                keyup: function() {
                    me.flagSection = 't';
                    me.discountFormulaForPPNTanah(me.flagSection + '_ppn_tanah', me.flagSection + '_harga_tanah_b', me.flagSection + '_tot_ppn_tanah');
                }

            },
            'marketingstockformdata [name=t_ppn_bangunan]': {
                keyup: function() {
                    me.flagSection = 't';
                    me.discountFormula(me.flagSection + '_ppn_bangunan', me.flagSection + '_harga_bangunan', me.flagSection + '_tot_ppn_bangunan');
                }

            },
            'marketingstockformdata [name=t_ppnbm]': {
                keyup: function() {
                    me.flagSection = 't';
                    me.discountFormula(me.flagSection + '_ppnbm', me.flagSection + '_harga_netto', me.flagSection + '_tot_ppnbm');
                }

            },
            'marketingstockformdata [name=t_pph22]': {
                keyup: function() {
                    me.flagSection = 't';
                    me.discountFormula(me.flagSection + '_pph22', me.flagSection + '_harga_netto', me.flagSection + '_tot_pph22');
                }

            },
            'marketingstockformdata [name=t_harga_balik_nama]': {
                change: function() {
                    me.flagSection = 't';
                    me.changeHargaTotal();
                }
            },
            'marketingstockformdata [name=t_harga_bphtb]': {
                change: function() {
                    me.flagSection = 't';
                    me.changeHargaTotal();
                }
            },
            'marketingstockformdata [name=t_harga_bajtb]': {
                change: function() {
                    me.flagSection = 't';
                    me.changeHargaTotal();
                }

            },
            'marketingstockformdata [name=t_tot_disc_harga_dasar]': {
                keyup: function() {
                    me.flagSection = 't';
                    me.reverseDiscountFormula(me.flagSection + '_disc_harga_dasar', me.flagSection + '_harga_jual_dasar', me.flagSection + '_tot_disc_harga_dasar');
                }

            },
            'marketingstockformdata [name=t_tot_disc_harga_tanah]': {
                keyup: function() {
                    me.flagSection = 't';
                    me.reverseDiscountFormula(me.flagSection + '_disc_harga_tanah', me.flagSection + '_harga_tanah_b', me.flagSection + '_tot_disc_harga_tanah');
                }

            },
            'marketingstockformdata [name=t_tot_disc_harga_bangunan]': {
                keyup: function() {
                    me.flagSection = 't';
                    me.reverseDiscountFormula(me.flagSection + '_disc_harga_bangunan', me.flagSection + '_harga_bangunan', me.flagSection + '_tot_disc_harga_bangunan');
                }

            },
            'marketingstockformdata [name=t_tot_ppn_tanah]': {
                blur: function() {
                    me.flagSection = 't';
                    me.reverseDiscountFormulaForPPNTanah(me.flagSection + '_ppn_tanah', me.flagSection + '_harga_tanah_b', me.flagSection + '_tot_ppn_tanah');
                }

            },
            'marketingstockformdata [name=t_tot_ppn_bangunan]': {
                blur: function() {
                    me.flagSection = 't';
                    me.reverseDiscountFormulaForPPNBangunan(me.flagSection + '_ppn_bangunan', me.flagSection + '_harga_bangunan', me.flagSection + '_tot_ppn_bangunan');
                }

            },
            'marketingstockformdata [name=t_harga_jual_dasar]': {
                keyup: function() {
                    me.flagSection = 't';
                    me.changeHargaBangunanbyJualDasar();
                }


            },
            /* KPR */
            'marketingstockformdata [name=k_harga_tanah_a]': {
                change: function(el) {
                    me.flagSection = 'k';
                    me.changeHargaTanah(el);
                }
            },
            'marketingstockformdata [name=k_harga_kelebihan_a]': {
                change: function(el) {
                    me.flagSection = 'k';
                    me.changeHargaKelebihan(el);
                }

            },
            'marketingstockformdata [name=k_harga_bangunan]': {
                keyup: function() {
                    me.flagSection = 'k';
                    me.changeHargaBangunan();
                }
            },
            'marketingstockformdata [name=k_disc_harga_dasar]': {
                keyup: function() {
                    me.mkCalculate('k').hargaDasar();
                }

            },
            'marketingstockformdata [name=k_disc_harga_tanah]': {
                keyup: function() {
                    me.mkCalculate('k').discHargaTanah();
                }

            },
            'marketingstockformdata [name=k_disc_harga_bangunan]': {
                keyup: function() {
                    me.mkCalculate('k').discHargaBangunan();
                }

            },
            'marketingstockformdata [name=k_ppn_tanah]': {
                keyup: function() {
                    me.flagSection = 'k';
                    //      me.discountFormulaForPPNTanah(me.flagSection + '_ppn_tanah', me.flagSection + '_harga_tanah_b', me.flagSection + '_tot_ppn_tanah');
                    me.mkCalculate().ppnTanah();
                }

            },
            'marketingstockformdata [name=k_ppn_bangunan]': {
                keyup: function() {
                    me.flagSection = 'k';
                    //   me.discountFormula(me.flagSection + '_ppn_bangunan', me.flagSection + '_harga_bangunan', me.flagSection + '_tot_ppn_bangunan');
                    me.mkCalculate().ppnBangunan();
                }

            },
            'marketingstockformdata [name=k_ppnbm]': {
                keyup: function() {
                    me.flagSection = 'k';
                    me.discountFormula(me.flagSection + '_ppnbm', me.flagSection + '_harga_netto', me.flagSection + '_tot_ppnbm');
                }

            },
            'marketingstockformdata [name=k_pph22]': {
                keyup: function() {
                    me.flagSection = 'k';
                    me.discountFormula(me.flagSection + '_pph22', me.flagSection + '_harga_netto', me.flagSection + '_tot_pph22');
                }

            },
            'marketingstockformdata [name=k_harga_balik_nama]': {
                change: function() {
                    me.flagSection = 'k';
                    me.changeHargaTotal();
                }
            },
            'marketingstockformdata [name=k_harga_bphtb]': {
                change: function() {
                    me.flagSection = 'k';
                    me.changeHargaTotal();
                }
            },
            'marketingstockformdata [name=k_harga_bajtb]': {
                change: function() {
                    me.flagSection = 'k';
                    me.changeHargaTotal();
                }

            },
            'marketingstockformdata [name=k_tot_disc_harga_dasar]': {
                keyup: function() {
                    me.flagSection = 'k';
                    me.reverseDiscountFormula(me.flagSection + '_disc_harga_dasar', me.flagSection + '_harga_jual_dasar', me.flagSection + '_tot_disc_harga_dasar');
                }

            },
            'marketingstockformdata [name=k_tot_disc_harga_tanah]': {
                keyup: function() {
                    me.flagSection = 'k';
                    me.reverseDiscountFormula(me.flagSection + '_disc_harga_tanah', me.flagSection + '_harga_tanah_b', me.flagSection + '_tot_disc_harga_tanah');
                }

            },
            'marketingstockformdata [name=k_tot_disc_harga_bangunan]': {
                keyup: function() {
                    me.flagSection = 'k';
                    me.reverseDiscountFormula(me.flagSection + '_disc_harga_bangunan', me.flagSection + '_harga_bangunan', me.flagSection + '_tot_disc_harga_bangunan');
                }

            },
            'marketingstockformdata [name=k_tot_ppn_tanah]': {
                blur: function() {
                    me.flagSection = 'k';
                    me.reverseDiscountFormulaForPPNTanah(me.flagSection + '_ppn_tanah', me.flagSection + '_harga_tanah_b', me.flagSection + '_tot_ppn_tanah');
                }

            },
            'marketingstockformdata [name=k_tot_ppn_bangunan]': {
                blur: function() {
                    me.flagSection = 'k';
                    me.reverseDiscountFormulaForPPNBangunan(me.flagSection + '_ppn_bangunan', me.flagSection + '_harga_bangunan', me.flagSection + '_tot_ppn_bangunan');
                }

            },
            'marketingstockformdata [name=k_harga_jual_dasar]': {
                keyup: function() {
                    me.flagSection = 'k';
                    me.changeHargaBangunanbyJualDasar();
                }


            },
            /* INHOUSE */
            'marketingstockformdata [name=ih_harga_tanah_a]': {
                change: function(el) {
                    me.flagSection = 'ih';
                    me.changeHargaTanah(el);
                }
            },
            'marketingstockformdata [name=ih_harga_kelebihan_a]': {
                change: function(el) {
                    me.flagSection = 'ih';
                    me.changeHargaKelebihan(el);
                }

            },
            'marketingstockformdata [name=ih_harga_bangunan]': {
                keyup: function() {
                    me.flagSection = 'ih';
                    me.changeHargaBangunan();
                }
            },
            'marketingstockformdata [name=ih_disc_harga_dasar]': {
                keyup: function() {
                    me.mkCalculate('ih').hargaDasar();
                }

            },
            'marketingstockformdata [name=ih_disc_harga_tanah]': {
                keyup: function() {
                    me.mkCalculate('ih').discHargaTanah();
                }

            },
            'marketingstockformdata [name=ih_disc_harga_bangunan]': {
                keyup: function() {
                    me.mkCalculate('ih').discHargaBangunan();
                }

            },
            'marketingstockformdata [name=ih_ppn_tanah]': {
                keyup: function() {
                    me.flagSection = 'ih';
                    me.discountFormulaForPPNTanah(me.flagSection + '_ppn_tanah', me.flagSection + '_harga_tanah_b', me.flagSection + '_tot_ppn_tanah');
                }

            },
            'marketingstockformdata [name=ih_ppn_bangunan]': {
                keyup: function() {
                    me.flagSection = 'ih';
                    me.discountFormula(me.flagSection + '_ppn_bangunan', me.flagSection + '_harga_bangunan', me.flagSection + '_tot_ppn_bangunan');
                }

            },
            'marketingstockformdata [name=ih_ppnbm]': {
                keyup: function() {
                    me.flagSection = 'ih';
                    me.discountFormula(me.flagSection + '_ppnbm', me.flagSection + '_harga_netto', me.flagSection + '_tot_ppnbm');
                }

            },
            'marketingstockformdata [name=ih_pph22]': {
                keyup: function() {
                    me.flagSection = 'ih';
                    me.discountFormula(me.flagSection + '_pph22', me.flagSection + '_harga_netto', me.flagSection + '_tot_pph22');
                }

            },
            'marketingstockformdata [name=ih_harga_balik_nama]': {
                change: function() {
                    me.flagSection = 'ih';
                    me.changeHargaTotal();
                }
            },
            'marketingstockformdata [name=ih_harga_bphtb]': {
                change: function() {
                    me.flagSection = 'ih';
                    me.changeHargaTotal();
                }
            },
            'marketingstockformdata [name=ih_harga_bajtb]': {
                change: function() {
                    me.flagSection = 'ih';
                    me.changeHargaTotal();
                }

            },
            'marketingstockformdata [name=ih_tot_disc_harga_dasar]': {
                keyup: function() {
                    me.flagSection = 'ih';
                    me.reverseDiscountFormula(me.flagSection + '_disc_harga_dasar', me.flagSection + '_harga_jual_dasar', me.flagSection + '_tot_disc_harga_dasar');
                }

            },
            'marketingstockformdata [name=ih_tot_disc_harga_tanah]': {
                keyup: function() {
                    me.flagSection = 'ih';
                    me.reverseDiscountFormula(me.flagSection + '_disc_harga_tanah', me.flagSection + '_harga_tanah_b', me.flagSection + '_tot_disc_harga_tanah');
                }

            },
            'marketingstockformdata [name=ih_tot_disc_harga_bangunan]': {
                keyup: function() {
                    me.flagSection = 'ih';
                    me.reverseDiscountFormula(me.flagSection + '_disc_harga_bangunan', me.flagSection + '_harga_bangunan', me.flagSection + '_tot_disc_harga_bangunan');
                }

            },
            'marketingstockformdata [name=ih_tot_ppn_tanah]': {
                blur: function() {
                    me.flagSection = 'ih';
                    me.reverseDiscountFormulaForPPNTanah(me.flagSection + '_ppn_tanah', me.flagSection + '_harga_tanah_b', me.flagSection + '_tot_ppn_tanah');
                }

            },
            'marketingstockformdata [name=ih_tot_ppn_bangunan]': {
                blur: function() {
                    me.flagSection = 'ih';
                    me.reverseDiscountFormulaForPPNBangunan(me.flagSection + '_ppn_bangunan', me.flagSection + '_harga_bangunan', me.flagSection + '_tot_ppn_bangunan');
                }

            },
            'marketingstockformdata [name=ih_harga_jual_dasar]': {
                keyup: function() {
                    me.flagSection = 'ih';
                    me.changeHargaBangunanbyJualDasar();
                }


            },
            'marketingstockformdata [name=persen_copy]': {
                change: function() {
                    me.changePersenCopy();
                }
            },
            'marketingstockformdata button[action=copy_data]': {
                click: function() {
                    me.copyDataClick();
                }
            },
            'selectunitformsearch button[action=search]': {
                click: me.selectunitdataSearch
            },
            'selectunitformsearch button[action=reset]': {
                click: me.selectunitdataReset
            },
            /* BROWSE CONTROL */
            'marketingstockbrowsepanel': {
                beforerender: me.browsepanelBeforeRender
            },
            'marketingstockbrowsepanel button[action=select]': {
                click: me.browsegridSelection
            },
            'marketingstockbrowsegrid': {
                afterrender: me.browsegridAfterRender
            }
            /* END BROWSE CONTROL */

        });
    },
    mkCalculate: function(flagSection) {
        var me = this;
        var f = me.getFormdata();
        var fs = flagSection;
        var x = {
            // discount harga dasar
            hargaDasar: function() {
                me.flagSection = fs;
                f.down("[name=" + fs + "_disc_harga_tanah]").setValue(0);
                f.down("[name=" + fs + "_tot_disc_harga_tanah]").setValue(0);
                f.down("[name=" + fs + "_disc_harga_bangunan]").setValue(0);
                f.down("[name=" + fs + "_tot_disc_harga_bangunan]").setValue(0);
                me.discountFormula(fs + '_disc_harga_dasar', fs + '_harga_jual_dasar', fs + '_tot_disc_harga_dasar');


            },
            discHargaTanah: function() {
                me.flagSection = fs;
                f.down("[name=" + fs + "_disc_harga_dasar]").setValue(0);
                f.down("[name=" + fs + "_tot_disc_harga_dasar]").setValue(0);
                // me.discountFormula(fs + '_disc_harga_tanah', fs + '_harga_tanah_b', fs + '_tot_disc_harga_tanah');
                var val = accounting.unformat(f.down('[name=' + fs + '_disc_harga_tanah]').getValue());
                if (val > 100.00) {
                    val = 100.00;
                    me.getFormdata().down('[name=' + fs + '_disc_harga_tanah]').setValue(val);
                }

                var total = (accounting.unformat(me.getFormdata().down('[name=' + fs + '_harga_tanah_b]').getValue()) + accounting.unformat(me.getFormdata().down('[name=' + fs + '_harga_kelebihan_b]').getValue())) * (val / 100);
                me.getFormdata().down('[name=' + fs + '_tot_disc_harga_tanah]').setValue(accounting.formatMoney(total));
                me.changeHargaNetto();
            },
            discHargaBangunan: function() {
                me.flagSection = fs;
                f.down("[name=" + fs + "_disc_harga_dasar]").setValue(0);
                f.down("[name=" + fs + "_tot_disc_harga_dasar]").setValue(0);
                me.discountFormula(fs + '_disc_harga_bangunan', fs + '_harga_bangunan', fs + '_tot_disc_harga_bangunan');

            },
            ppnTanah: function() {
                fs = me.flagSection;
                var dEl = f.down('[name=' + fs + '_ppn_tanah]');
                var val = accounting.unformat(dEl.getValue());
                if (val > 100.00) {
                    val = 100.00;
                    dEl.setValue(val);
                }
                var baseValue = (accounting.unformat(f.down('[name=' + fs + '_harga_tanah_b]').getValue()) + accounting.unformat(me.getFormdata().down('[name=' + fs + '_harga_kelebihan_b]').getValue()));
                var pengurang = 0;
                var dDasar = accounting.unformat(f.down('[name=' + fs + '_disc_harga_dasar]').getValue()); // discount dasar
                pengurang = dDasar > 0 ? (accounting.unformat(f.down('[name=' + fs + '_tot_disc_harga_dasar]').getValue()) / 2) : accounting.unformat(f.down('[name=' + fs + '_tot_disc_harga_tanah]').getValue());

                baseValue = baseValue - pengurang;
                var total = baseValue * (val / 100);
                f.down('[name=' + fs + '_tot_ppn_tanah]').setValue(accounting.formatMoney(total));
            },
            ppnBangunan: function() {
                fs = me.flagSection;
                var dEl = f.down('[name=' + fs + '_ppn_bangunan]'); // discount element
                var val = accounting.unformat(dEl.getValue());
                if (val > 100.00) {
                    val = 100.00;
                    dEl.setValue(val);
                }
                var baseValue = accounting.unformat(f.down('[name=' + fs + '_harga_bangunan]').getValue());
                var pengurang = 0;
                var dDasar = accounting.unformat(f.down('[name=' + fs + '_disc_harga_dasar]').getValue()); // discount dasar
                pengurang = dDasar > 0 ? (accounting.unformat(f.down('[name=' + fs + '_tot_disc_harga_dasar]').getValue()) / 2) : accounting.unformat(f.down('[name=' + fs + '_tot_disc_harga_bangunan]').getValue());
                baseValue = baseValue - pengurang;
                var total = baseValue * (val / 100);
                f.down('[name=' + fs + '_tot_ppn_bangunan]').setValue(accounting.formatMoney(total));
            }
        };
        return x;
    },
    panelAfterRender: function(configs) {
        this.callParent(arguments);
        var me = this;
        var p = me.getPanel();
        p.setLoading("Please wait");
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                me.myMasterData = data;
                me.fillFormSearchComponents(data, me.getFormsearch());
                p.setLoading(false);

            }
        }).read('detail');

    },
    fillFormSearchComponents: function(data, f) {
        var me = this;
        me.tools.wesea(data.type, f.down("[name=type_id]")).comboBox(true);
        me.tools.wesea(data.unitstatus, f.down("[name=state_admistrative]")).comboBox(true);
    },
    realValue: {t_harga_tanah_b: 0, t_harga_kelebihan_b: 0},
    flagSection: 't',
    selectunitdataReset: function(btn) {
        var me = this;

        var el = btn.up('form');
        el.getForm().reset();

        /// added 2 Maret 2015
        var ar = ['cluster', 'block', 'type', 'position', 'productcategory', 'side'];
        var fs = el;
        for (var i in ar) {

            var el = fs.down("[name=" + ar[i] + '_' + me.cbf[ar[i]]['v'] + "]");
            if (el) {
                el.setValue('999');

            }

        }
        me.selectunitdataSearch(btn);
    },
    selectunitdataSearch: function(el, a, b) {

        resetTimer();
        var form = el.up('form').getForm();
        var grid = el.up('window').down('grid');
        var store = grid.getStore();
        var fields = form.getValues();
        for (var x in fields)
        {
            store.getProxy().setExtraParam(x, fields[x]);
        }
        store.loadPage(1);

    },
    copyDataClick: function() {
        var me = this;
        var jenisCopy = me.getFormdata().down('#copyRg').getValue();

        var srcData = 't';
        var dstData = 't';
        switch (jenisCopy.rb) {
            case 'kt':
                srcData = 'k';
                dstData = 't';
                break;
            case 'iht':
                srcData = 'ih';
                dstData = 't';
                break;
            case 'tk':
                srcData = 't';
                dstData = 'k';
                break;
            case 'ihk':
                srcData = 'ih';
                dstData = 'k';
                break;
            case 'tih':
                srcData = 't';
                dstData = 'ih';
                break;
            case 'kih':
                srcData = 'k';
                dstData = 'ih';
                break;
        }
        var fieldList = ['_harga_tanah_a', '_harga_kelebihan_a', '_harga_tanah_b', '_harga_kelebihan_b',
            '_harga_bangunan', '_harga_jual_dasar', '_disc_harga_dasar', '_tot_disc_harga_dasar',
            '_disc_harga_tanah', '_tot_disc_harga_tanah', '_disc_harga_bangunan', '_tot_disc_harga_bangunan',
            '_harga_netto', '_ppn_tanah', '_tot_ppn_tanah', '_ppn_bangunan', '_ppnbm', '_pph22',
            '_tot_ppn_bangunan', '_tot_ppnbm', '_tot_pph22', '_harga_balik_nama', '_harga_bphtb', '_harga_bajtb', '_total'];
        var notAddPersen = ['_disc_harga_dasar', '_disc_harga_tanah', '_disc_harga_bangunan', '_ppn_tanah', '_ppn_bangunan', '_ppnbm', '_pph22'];
        var total = 0;
        var addPersen = 0;
        for (var i = 0; i < fieldList.length; i++) {

            if (Ext.Array.indexOf(notAddPersen, fieldList[i]) == -1) {
                addPersen = (accounting.unformat(me.getFormdata().down('[name=' + srcData + '' + fieldList[i] + ']').getValue()) * (accounting.unformat(me.getFormdata().down('[name=persen_copy]').getValue()) / 100));
            }
            total = addPersen + accounting.unformat(me.getFormdata().down('[name=' + srcData + '' + fieldList[i] + ']').getValue());
            me.getFormdata().down('[name=' + dstData + '' + fieldList[i] + ']').setValue(accounting.formatMoney(total));
            total = 0;
            addPersen = 0;
        }

    },
    changePersenCopy: function() {
        /*
         var me = this;
         if(accounting.unformat(me.getFormdata().down('[name=persen_copy]').getValue()) > 100.00){
         me.getFormdata().down('[name=persen_copy]').setValue(100.00);
         }
         */
    },
    reverseDiscountFormula: function(discEl, srcEl, totEl) {
        var me = this;
        var total = (accounting.unformat(me.getFormdata().down('[name=' + totEl + ']').getValue()) * 100.00) / accounting.unformat(me.getFormdata().down('[name=' + srcEl + ']').getValue());
        if (total > 100.00) {
            total = 100.00;
            var val = 0;
            val = accounting.unformat(me.getFormdata().down('[name=' + srcEl + ']').getValue());
            me.getFormdata().down('[name=' + totEl + ']').setValue(accounting.formatMoney(val));
        }
        me.getFormdata().down('[name=' + discEl + ']').setValue(accounting.formatMoney(total));
        me.changeHargaNetto();
    },
    reverseDiscountFormulaForPPNTanah: function(discEl, srcEl, totEl) {
        var me = this;
        var f = me.getFormdata();
        var penjumlah = (
                accounting.unformat(f.down('[name=' + srcEl + ']').getValue()) +
                accounting.unformat(f.down('[name=' + me.flagSection + '_harga_kelebihan_b]').getValue()) -
                accounting.unformat(f.down('[name=' + me.flagSection + '_tot_disc_harga_tanah]').getValue())
                );
        var total = (accounting.unformat(f.down('[name=' + totEl + ']').getValue()) * 100.00) / penjumlah;
        if (total > 100.00) {
            total = 100.00;
            f.down('[name=' + totEl + ']').setValue(accounting.formatMoney(penjumlah));
        }
        f.down('[name=' + discEl + ']').setValue(accounting.formatMoney(total));
        me.changeHargaNetto();
    },
    reverseDiscountFormulaForPPNBangunan: function(discEl, srcEl, totEl) {
        var me = this;
        var f = me.getFormdata();
        var penjumlah = (
                accounting.unformat(f.down('[name=' + srcEl + ']').getValue()) -
                accounting.unformat(f.down('[name=' + me.flagSection + '_tot_disc_harga_bangunan]').getValue())
                );
        var total = (accounting.unformat(f.down('[name=' + totEl + ']').getValue()) * 100.00) / penjumlah;
        if (total > 100.00) {
            total = 100.00;
            
            me.getFormdata().down('[name=' + totEl + ']').setValue(accounting.formatMoney(penjumlah));
        }
        me.getFormdata().down('[name=' + discEl + ']').setValue(accounting.formatMoney(total));
        me.changeHargaNetto();
    },     
    discountFormula: function(discEl, srcEl, totEl) {
        var me = this;
        var val = accounting.unformat(me.getFormdata().down('[name=' + discEl + ']').getValue());
        if (val > 100.00) {
            val = 100.00;
            me.getFormdata().down('[name=' + discEl + ']').setValue(val);
        }

        var total = accounting.unformat(me.getFormdata().down('[name=' + srcEl + ']').getValue()) * (val / 100);
        me.getFormdata().down('[name=' + totEl + ']').setValue(accounting.formatMoney(total));
        me.changeHargaNetto();
    },
    discountFormulaForPPNTanah: function(discEl, srcEl, totEl) {
        var me = this;
        var val = accounting.unformat(me.getFormdata().down('[name=' + discEl + ']').getValue());
        if (val > 100.00) {
            val = 100.00;
            me.getFormdata().down('[name=' + discEl + ']').setValue(val);
        }

        var total = (accounting.unformat(me.getFormdata().down('[name=' + srcEl + ']').getValue()) + accounting.unformat(me.getFormdata().down('[name=' + me.flagSection + '_harga_kelebihan_b]').getValue())) * (val / 100);
        me.getFormdata().down('[name=' + totEl + ']').setValue(accounting.formatMoney(total));
        me.changeHargaNetto();
    },
    changeHargaTotal: function() {
        var me = this;
        var f = me.getFormdata();
        /// added 7 april 
        //  me.discountFormula(me.flagSection + '_ppnbm', me.flagSection + '_harga_netto', me.flagSection + '_tot_ppnbm');
        //  me.discountFormula(me.flagSection + '_pph22', me.flagSection + '_harga_netto', me.flagSection + '_tot_pph22');
        var totalppnbm = accounting.unformat(f.down('[name=' + me.flagSection + '_harga_netto]').getValue()) * (accounting.unformat(f.down('[name=' + me.flagSection + '_ppnbm]').getValue()) / 100);
        f.down('[name=' + me.flagSection + '_tot_ppnbm]').setValue(accounting.formatMoney(totalppnbm));
        var totalpph22 = accounting.unformat(f.down('[name=' + me.flagSection + '_harga_netto]').getValue()) * (accounting.unformat(f.down('[name=' + me.flagSection + '_pph22]').getValue()) / 100);
        f.down('[name=' + me.flagSection + '_tot_pph22]').setValue(accounting.formatMoney(totalpph22));

        // added 20 Mei 2015
        me.mkCalculate().ppnTanah();
        me.mkCalculate().ppnBangunan();
        // marked 29 Juni 2016
       // var total = accounting.unformat(me.getFormdata().down('[name=' + me.flagSection + '_harga_netto]').getValue()) + accounting.unformat(me.getFormdata().down('[name=' + me.flagSection + '_tot_ppn_tanah]').getValue()) + accounting.unformat(me.getFormdata().down('[name=' + me.flagSection + '_tot_ppn_bangunan]').getValue()) + accounting.unformat(me.getFormdata().down('[name=' + me.flagSection + '_tot_ppnbm]').getValue()) + accounting.unformat(me.getFormdata().down('[name=' + me.flagSection + '_harga_balik_nama]').getValue()) + accounting.unformat(me.getFormdata().down('[name=' + me.flagSection + '_harga_bphtb]').getValue()) + accounting.unformat(me.getFormdata().down('[name=' + me.flagSection + '_harga_bajtb]').getValue());
        // added 29 Juni 2016
        var total = accounting.unformat(me.getFormdata().down('[name=' + me.flagSection + '_harga_netto]').getValue()) + accounting.unformat(me.getFormdata().down('[name=' + me.flagSection + '_tot_ppn_tanah]').getValue()) + accounting.unformat(me.getFormdata().down('[name=' + me.flagSection + '_tot_ppn_bangunan]').getValue()) + accounting.unformat(me.getFormdata().down('[name=' + me.flagSection + '_tot_ppnbm]').getValue()) + accounting.unformat(me.getFormdata().down('[name=' + me.flagSection + '_harga_balik_nama]').getValue()) + accounting.unformat(me.getFormdata().down('[name=' + me.flagSection + '_harga_bphtb]').getValue()) + accounting.unformat(me.getFormdata().down('[name=' + me.flagSection + '_harga_bajtb]').getValue()) + totalpph22;
        
        me.getFormdata().down('[name=' + me.flagSection + '_total]').setValue(accounting.formatMoney(total));
    },
    changeHargaNetto: function() {
        var me = this;
        var total = accounting.unformat(me.getFormdata().down('[name=' + me.flagSection + '_harga_jual_dasar]').getValue()) - (accounting.unformat(me.getFormdata().down('[name=' + me.flagSection + '_tot_disc_harga_dasar]').getValue()) + accounting.unformat(me.getFormdata().down('[name=' + me.flagSection + '_tot_disc_harga_tanah]').getValue()) + accounting.unformat(me.getFormdata().down('[name=' + me.flagSection + '_tot_disc_harga_bangunan]').getValue()));
        me.getFormdata().down('[name=' + me.flagSection + '_harga_netto]').setValue(accounting.formatMoney(total));
        me.changeHargaTotal();
    },
    changeHargaJualDasar: function() {

        var me = this;
        var hargaBangunan = accounting.unformat(me.getFormdata().down('[name=' + me.flagSection + '_harga_bangunan]').getValue());
        var hasil = me.realValue[me.flagSection + '_harga_tanah_b'] + me.realValue[me.flagSection + '_harga_kelebihan_b'] + (isNaN(parseFloat(hargaBangunan)) ? 0 : parseFloat(hargaBangunan));
        me.getFormdata().down('[name=' + me.flagSection + '_harga_jual_dasar]').setValue(accounting.formatMoney(hasil));
        me.discountFormula(me.flagSection + '_disc_harga_dasar', me.flagSection + '_harga_jual_dasar', me.flagSection + '_tot_disc_harga_dasar');
    },
    changeHargaKelebihan: function(el) {
        var me = this;
        var hasil = 0;
        hasil = me.getFormdata().down('[name=kelebihan]').getValue() * accounting.unformat(el.getValue());
        me.realValue[me.flagSection + '_harga_kelebihan_b'] = hasil;
        me.getFormdata().down('[name=' + me.flagSection + '_harga_kelebihan_b]').setValue(accounting.formatMoney(hasil));
        me.changeHargaJualDasar();
        me.discountFormulaForPPNTanah(me.flagSection + '_ppn_tanah', me.flagSection + '_harga_tanah_b', me.flagSection + '_tot_ppn_tanah');
    },
    changeHargaTanah: function(el) {

        var me = this;
        var hasil = 0;
        var luasTanah = 0;
        /// edited by tommy 26 Agustus 2013 
        //luasTanah = me.getFormdata().down('[name=width]').getValue() * me.getFormdata().down('[name=long]').getValue();
        luasTanah = accounting.unformat(me.getFormdata().down('[name=land_size]').getValue());
        /// end edited by tommy 26 Agustus 2013
        hasil = luasTanah * accounting.unformat(el.getValue());
        me.realValue[me.flagSection + '_harga_tanah_b'] = hasil;
        me.getFormdata().down('[name=' + me.flagSection + '_harga_tanah_b]').setValue(accounting.formatMoney(hasil));
        me.changeHargaJualDasar();
        me.discountFormula('' + me.flagSection + '_disc_harga_tanah', '' + me.flagSection + '_harga_tanah_b', '' + me.flagSection + '_tot_disc_harga_tanah');
        me.discountFormulaForPPNTanah('' + me.flagSection + '_ppn_tanah', '' + me.flagSection + '_harga_tanah_b', '' + me.flagSection + '_tot_ppn_tanah');
    },
    changeHargaBangunan: function() {
        var me = this;
        me.changeHargaJualDasar();
        me.discountFormula('' + me.flagSection + '_disc_harga_bangunan', '' + me.flagSection + '_harga_bangunan', '' + me.flagSection + '_tot_disc_harga_bangunan');
        me.discountFormula('' + me.flagSection + '_ppn_bangunan', '' + me.flagSection + '_harga_bangunan', '' + me.flagSection + '_tot_ppn_bangunan');
    },
    changeHargaBangunanbyJualDasar: function() {
        var me = this;
        var total = accounting.unformat(me.getFormdata().down('[name=' + me.flagSection + '_harga_jual_dasar]').getValue()) - (accounting.unformat(me.getFormdata().down('[name=' + me.flagSection + '_harga_tanah_b]').getValue()) + accounting.unformat(me.getFormdata().down('[name=' + me.flagSection + '_harga_kelebihan_b]').getValue()));
        me.getFormdata().down('[name=' + me.flagSection + '_harga_bangunan]').setValue(accounting.formatMoney(total));
        me.discountFormula(me.flagSection + '_disc_harga_dasar', me.flagSection + '_harga_jual_dasar', me.flagSection + '_tot_disc_harga_dasar');
    },
    selectunitgridSelection: function(el) {
        var me = this;
        var unitGrid = el.up('grid');
        var unitStore = el.up('grid').getStore();
        var rows = unitGrid.getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No unit selected !');
            return;
        } else {
            var kavNumberAr = '';
            var unitIdAr = '';
            var count = 0;
            for (var x in rows) {
                count++;
                kavNumberAr += rows[x].data.unit_number;
                unitIdAr += rows[x].data.unit_id;
                if (count < rows.length) {
                    kavNumberAr += ',';
                    unitIdAr += '~';
                }
            }



            el.up('window').destroy();



            me.instantWindow('FormData', 800, 'Add Marketing Stock', 'create', 'myMarketingStockFormData');

            // var unitRecord = unitStore.getAt(unitStore.indexOf(rows[0]));

            // me.getFormdata().loadRecord(unitRecord);

            me.getFormdata().down('[name=unit_number]').setValue(kavNumberAr);
            me.getFormdata().down('[name=list_unit_id]').setValue(unitIdAr);

            me.loadUnitData(rows[0].data.unit_id);

            //// check selected record in main grid
            var grid = me.getGrid();
            var slcData = grid.getSelectionModel().getSelection()[0];
            if (slcData != undefined) {
                me.loadPrice(slcData.data.unit_id);
            }

        }
    },
    selectunitgridAfterRender: function(el, a, b) {
        var me = this;
        var p = el.up("panel");
        el.doInit();

        el.getStore().getProxy().setExtraParam('mode_read', 'unitlist');

        el.getStore().loadPage(1, {
            callback: function(rec, operation, success) {
                if (!el.getStore().modelExist) {

                    el.attachModel(operation);
                }

                var pg = el.down("pagingtoolbar");
                if (pg) {
                    pg.getStore().load();
                }





            }
        });


        return;

        me.tools.ajax({
            params: {},
            success: function(data, model) {
                me.tools.wesea({
                    data: data,
                    model: model
                }, el).grid();



                /* el.down("pagingtoolbar").bindStore(el.getStore());
                 el.down("pagingtoolbar").getStore().reload();
                 el.down("pagingtoolbar").updateLayout();
                 console.log(el.getStore().getProxy().getReader().totalProperty);
                 console.log(el.down("pagingtoolbar").getStore().getProxy().getReader().totalProperty);
                 */
                p.setLoading(false);
            }
        }).read('unitlist');

    },
    formDataShow: function(el, act, action) {
        var me = this;
        var formtitle, formicon;
        //me.setActiveForm(me.getFormdata());
        var state = action == me.bindPrefixName + 'Create' ? 'create' : 'update';
        switch (state) {
            case 'create':
                formtitle = 'Add New Complaint Category';
                formicon = 'icon-form-add';
                break;
            case 'update':
                formtitle = 'Edit Complaint Category';
                formicon = 'icon-form-edit';
                break;
        }
        var winId = 'win-holidayformdata';
        var win = desktop.getWindow(winId);
        if (!win) {
            win = desktop.createWindow({
                id: winId,
                title: formtitle,
                iconCls: formicon,
                resizable: false,
                minimizable: false,
                maximizable: false,
                width: 800,
                renderTo: Ext.getBody(),
                constrain: true,
                constrainHeader: false,
                modal: true,
                layout: 'fit',
                shadow: 'frame',
                shadowOffset: 10,
                border: false,
                items: Ext.create('Erems.view.' + me.controllerName + '.FormData'),
                state: state
            });
        }
        win.show();
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
    selectUnitGridShow: function() {
        var me = this;

        me.instantWindow('SelectUnitPanel', 800, 'Select Unit');

        // added 2 Maret 2015
        var fs = me.getFormsearchunit();
        var data = me.myMasterData;
        var ar = ['cluster', 'block', 'type', 'position', 'productcategory', 'side'];
        for (var i in ar) {

            var el = fs.down("[name=" + ar[i] + '_' + me.cbf[ar[i]]['v'] + "]");
            if (el) {
                me.tools.wesea(data[ar[i]], el).comboBox(true);
            }

        }


    },
    getFinalData: function(formGetValues) {
        /// 1 -> TUNAI , 2 -> KPR , 3 -> INHOUSE <==== ID PRICETYPE
        var finalData = formGetValues;



        finalData['harga_KPR'] = {};
        var jenisHarga = [{name: 'harga_TUNAI', prefix: 't'}, {name: 'harga_KPR', prefix: 'k'}, {name: 'harga_INHOUSE', prefix: 'ih'}];
        var dataKPR = {};

        var tempVar = {};
        var prefixName = '';
        var tempStr = '';
        var delimeter = '~';
        finalData['tanahpermeter'] = '';
        finalData['kelebihantanah'] = '';
        finalData['harga_tanah'] = '';
        finalData['harga_kelebihantanah'] = '';
        finalData['harga_bangunan'] = '';
        finalData['harga_jualdasar'] = '';
        finalData['persen_dischargedasar'] = '';
        finalData['harga_dischargedasar'] = '';
        finalData['persen_dischargetanah'] = '';
        finalData['harga_dischargetanah'] = '';
        finalData['persen_dischargebangunan'] = '';
        finalData['harga_dischargebangunan'] = '';
        finalData['harga_neto'] = '';
        finalData['persen_ppntanah'] = '';
        finalData['harga_ppntanah'] = '';
        finalData['persen_ppnbangunan'] = '';
        finalData['harga_ppnbangunan'] = '';
        finalData['persen_ppnbm'] = '';
        finalData['harga_ppnbm'] = '';
        finalData['persen_pph22'] = '';
        finalData['harga_pph22'] = '';
        finalData['harga_bbnsertifikat'] = '';
        finalData['harga_bphtb'] = '';
        finalData['harga_bajb'] = '';
        finalData['harga_jual'] = '';
        for (var x = 0; x < jenisHarga.length; x++) {

            delimeter = x < (jenisHarga.length - 1) ? '~' : '';
            finalData[jenisHarga[x]['name']] = {'total': accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_total'])};

            finalData['tanahpermeter'] += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_harga_tanah_a']) + '' + delimeter;
            finalData['kelebihantanah'] += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_harga_kelebihan_a']) + '' + delimeter;
            finalData['harga_tanah'] += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_harga_tanah_b']) + '' + delimeter;
            finalData['harga_kelebihantanah'] += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_harga_kelebihan_b']) + '' + delimeter;
            finalData['harga_bangunan'] += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_harga_bangunan']) + '' + delimeter;
            finalData['harga_jualdasar'] += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_harga_jual_dasar']) + '' + delimeter;
            finalData['persen_dischargedasar'] += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_disc_harga_dasar']) + '' + delimeter;
            finalData['harga_dischargedasar'] += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_tot_disc_harga_dasar']) + '' + delimeter;
            finalData['persen_dischargetanah'] += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_disc_harga_tanah']) + '' + delimeter;
            finalData['harga_dischargetanah'] += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_tot_disc_harga_tanah']) + '' + delimeter;
            finalData['persen_dischargebangunan'] += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_disc_harga_bangunan']) + '' + delimeter;
            finalData['harga_dischargebangunan'] += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_tot_disc_harga_bangunan']) + '' + delimeter;
            finalData['harga_neto'] += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_harga_netto']) + '' + delimeter;
            finalData['persen_ppntanah'] += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_ppn_tanah']) + '' + delimeter;
            finalData['harga_ppntanah'] += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_tot_ppn_tanah']) + '' + delimeter;
            finalData['persen_ppnbangunan'] += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_ppn_bangunan']) + '' + delimeter;
            finalData['harga_ppnbangunan'] += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_tot_ppn_bangunan']) + '' + delimeter;
            finalData['persen_ppnbm'] += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_ppnbm']) + '' + delimeter;
            finalData['harga_ppnbm'] += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_tot_ppnbm']) + '' + delimeter;
            finalData['persen_pph22'] += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_pph22']) + '' + delimeter;
            finalData['harga_pph22'] += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_tot_pph22']) + '' + delimeter;

            finalData['harga_bbnsertifikat'] += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_harga_balik_nama']) + '' + delimeter;
            finalData['harga_bphtb'] += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_harga_bphtb']) + '' + delimeter;
            finalData['harga_bajb'] += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_harga_bajtb']) + '' + delimeter;
            finalData['harga_jual'] += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_total']) + '' + delimeter;

        }



        return finalData;
    },
    formDataAfterRender: function(el) {
        var me = this;
        me.loadComboBoxStore(el);
        var state = el.up('window').state;
        var grid = me.getGrid();
        var store = grid.getStore();
        var f = me.getFormdata();

        me.setActiveForm(me.getFormdata());
        if (state == 'create') { /// USELESS
            f.editedRow = -1;
            f.setLoading("Please wait...");
            me.tools.ajax({
                params: {},
                success: function(data, model) {


                    me.priceTypeList = data['others'][0][0];
                    f.down("[name=t_ppnbm]").setValue(me.tools.floatval(data['others'][0][0]['GLOBALPARAMSPARAMS']['GLOBAL_PPNBM']));
                    f.down("[name=t_pph22]").setValue(me.tools.floatval(data['others'][0][0]['GLOBALPARAMSPARAMS']['GLOBAL_PPH22']));
              //      var d = new Date(f.down("[name=serahterima_plan]").getValue());
                   
                    f.down("[name=serahterima_plan]").setValue(new Date());
                    f.setLoading(false);
                }
            }).read('detail');
            // el.down('#active').setValue(1);

        } else if (state == 'update') {
            f.editedRow = me.getGrid().getSelectedRow();
            f.setLoading("Please wait...");
            me.tools.ajax({
                params: {},
                success: function(data, model) {

                    me.priceTypeList = data['others'][0][0];
                    f.setLoading(false);
                    var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));


                    el.loadRecord(record);



                    //Load data unit 

                    me.loadUnitData(record.get("unit_unit_id"));

                    //status_text
                    me.getFormdata().down('[name=status_text]').setValue(record.get("unitstatus_status"));

                    //** SET DATA TO FORM*/
                    me.loadPrice(record.get("unit_unit_id"));




                    //** END SET DATA TO FORM*///

                    // convert all money field
                    var vs = me.getFormdata().getForm().getValues();
                    for (var i in vs) {
                        var elx = me.getFormdata().down("[name=" + i + "]");

                        if (elx) {
                            if (elx.getXType() === 'xmoneyfield') {
                                elx.setRawValue(accounting.formatMoney(elx.getValue()));
                            }

                        }
                    }

                }
            }).read('detail');





        }
    },
    loadUnitData: function(unitId) {
        var me = this;
        var f = me.getFormdata();
        f.setLoading("Please wait...");
        me.tools.ajax({
            params: {unit_id: unitId},
            success: function(data, model) {
                data = data[0];
                var prefix = '';
                var el = null;
                for (var x in data) {
                    prefix = x === "unit" ? "" : x + "_";
                    for (var y in data[x]) {
                        if (y != "unit_number") {
                            el = f.down("[name=" + prefix + "" + y + "]");

                            if (el) {
                                el.setValue(data[x][y]);
                            }
                        }

                    }
                }
                var sp = data["unit"]["serahterima_plan"];
                console.log(sp);
                console.log(data);
                f.down("[name=serahterima_plan]").setValue(new Date());

                if (f.editedRow > -1) {
                    f.down("[name=unit_number]").setValue(data.unit.unit_number);
                }

                f.setLoading(false);
            }
        }).read('selectedunit');


        /*
         var me = this;
         var unitStore = me.getMarketingstockunitStore();
         unitStore.load({
         params: {unit_id: unitId},
         callback: function(records) {
         //   console.log(records);
         
         var filledFields = ['floor', 'floor_size', 'bedroom', 'bathroom', 'width', 'long', 'electricity', 'block_code', 'productcategory_code', 'type_code', 'cluster_code', 'type_name', 'productcategory', 'block', 'kelebihan', 'land_size', 'building_size'];
         
         for (var x in filledFields) {
         if (me.getFormdata().down('[name=' + filledFields[x] + ']') != null) {
         me.getFormdata().down('[name=' + filledFields[x] + ']').setValue(records[0].data[filledFields[x]]);
         }
         
         }
         }
         }
         );
         */

    },
    mainDataSave: function(mode) {
        var me = this;
        var m = typeof mode !== "undefined" ? mode : "";
        var f = me.getFormdata();
        me.insSave({
            form: f,
            grid: me.getGrid(),
            //  store: me.localStore.detail,
            finalData: function(data) {
                var temp = '';
                var tunai = {}, inhouse = {}, kpr = {};
                for (var i in data) {
                    temp = i;
                    temp = temp.split("_", 1);
                    if (temp[0]) {

                        if (temp[0] === "t") {
                            for (var x in me.exchangeFields) {
                                if (me.exchangeFields[x].b === i.substr(1)) {

                                    tunai[me.exchangeFields[x].a] = accounting.unformat(data[i]);
                                }
                            }

                        } else if (temp[0] === "ih") {
                            for (var x in me.exchangeFields) {
                                if (me.exchangeFields[x].b === i.substr(2)) {
                                    inhouse[me.exchangeFields[x].a] = accounting.unformat(data[i]);
                                }
                            }

                        } else if (temp[0] === "k") {
                            for (var x in me.exchangeFields) {
                                if (me.exchangeFields[x].b === i.substr(1)) {
                                    kpr[me.exchangeFields[x].a] = accounting.unformat(data[i]);
                                }
                            }

                        }
                    }

                }
                var detail = [];
                tunai['pricetype_id'] = me.priceTypeList['PT_TUNAI'];
                inhouse['pricetype_id'] = me.priceTypeList['PT_INH'];
                kpr['pricetype_id'] = me.priceTypeList['PT_KPR'];
                detail.push(tunai);
                detail.push(inhouse);
                detail.push(kpr);
                data["detail"] = detail;
                return data;
            },
            sync: true,
            callback: {
                create: function(store, form, grid) {

                }
            }
        });
    },
    loadPrice: function(unitId) {
        var me = this;
        var f = me.getFormdata();
        f.setLoading("Please wait...");
        me.tools.ajax({
            params: {unit_id: unitId},
            success: function(data, model) {
                var myData = null;
                var prefixName = '';
                var notIncField = ['price_id', 'pricetype_id', 'unit_id'];
                var x = null;
                me.getFormdata().down('[name=unit_id]').setValue(unitId);

                for (var i = 0; i < data.length; i++) {
                    myData = data[i].price;


                    if (myData['pricetype_id'] == me.priceTypeList.PT_TUNAI) {
                        prefixName = 't';
                    } else if (myData['pricetype_id'] == me.priceTypeList.PT_KPR) {
                        prefixName = 'k';
                    } else {
                        prefixName = 'ih';
                    }

                    var el = null;
                    for (var x in myData) {

                        el = f.down('[name=' + prefixName + '' + me.exchangeFields[x].b + ']');
                        if (el) {
                            el.setValue(accounting.formatMoney(myData[x]));
                        } else {
                            console.log(prefixName + '_' + x);
                        }

                    }





                }


                f.setLoading(false);
            }
        }).read('price');



    },
    exchangeFields: {
        'harga_bajb': {a: 'harga_bajb', b: '_harga_bajtb'},
        'harga_bangunan': {a: 'harga_bangunan', b: '_harga_bangunan'},
        'harga_bbnsertifikat': {a: 'harga_bbnsertifikat', b: '_harga_balik_nama'},
        'harga_bphtb': {a: 'harga_bphtb', b: '_harga_bphtb'},
        'harga_dischargebangunan': {a: 'harga_dischargebangunan', b: '_tot_disc_harga_bangunan'},
        'harga_dischargedasar': {a: 'harga_dischargedasar', b: '_tot_disc_harga_dasar'},
        'harga_dischargetanah': {a: 'harga_dischargetanah', b: '_tot_disc_harga_tanah'},
        'harga_jual': {a: 'harga_jual', b: '_total'},
        'harga_jualdasar': {a: 'harga_jualdasar', b: '_harga_jual_dasar'},
        'harga_kelebihantanah': {a: 'harga_kelebihantanah', b: '_harga_kelebihan_b'},
        'harga_neto': {a: 'harga_neto', b: '_harga_netto'},
        'harga_ppnbangunan': {a: 'harga_ppnbangunan', b: '_tot_ppn_bangunan'},
        'harga_ppnbm': {a: 'harga_ppnbm', b: '_tot_ppnbm'},
        'harga_pph22': {a: 'harga_pph22', b: '_tot_pph22'},
        'harga_ppntanah': {a: 'harga_ppntanah', b: '_tot_ppn_tanah'},
        'harga_tanah': {a: 'harga_tanah', b: '_harga_tanah_b'},
        'kelebihantanah': {a: 'kelebihantanah', b: '_harga_kelebihan_a'},
        'persen_dischargebangunan': {a: 'persen_dischargebangunan', b: '_disc_harga_bangunan'},
        'persen_dischargedasar': {a: 'persen_dischargedasar', b: '_disc_harga_dasar'},
        'persen_dischargetanah': {a: 'persen_dischargetanah', b: '_disc_harga_tanah'},
        'persen_ppnbangunan': {a: 'persen_ppnbangunan', b: '_ppn_bangunan'},
        'persen_ppnbm': {a: 'persen_ppnbm', b: '_ppnbm'},
        'persen_pph22': {a: 'persen_pph22', b: '_pph22'},
        'persen_ppntanah': {a: 'persen_ppntanah', b: '_ppn_tanah'},
        'price_id': {a: 'price_id', b: ''},
        'pricetype_id': {a: 'pricetype_id', b: ''},
        'tanahpermeter': {a: 'tanahpermeter', b: '_harga_tanah_a'},
        'unit_id': {a: 'unit_id', b: ''}
    }



});