Ext.define('Erems.controller.Purchaseletter', {
    extend: 'Erems.library.template.controller.Controller2',
    alias: 'controller.Purchaseletter',
    requires: ['Erems.library.Unitformula', 'Erems.library.Schedulegenerator', 'Erems.library.Browse', 'Erems.library.Purchaseletter', 'Erems.library.PurchaseletterCGCibubur',
        'Erems.library.box.Config', 'Erems.library.box.tools.Tools', 'Erems.template.ComboBoxFields', 'Erems.library.box.tools.EventSelector'
                , 'Erems.library.Calculator', 'Erems.library.CalculatorFields', 'Erems.library.box.tools.CryptoJs', 'Erems.library.box.tools.Date'],
    views: ['purchaseletter.Panel', 'purchaseletter.Grid', 'purchaseletter.FormSearch', 'purchaseletter.FormData'],
    stores: ['Sourcemoney'],
    models: ['Sourcemoney'],
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
        },
        {
            ref: 'formauth',
            selector: 'purchaseletterauthrozieform'
        },
        {
            ref: 'formrschlist',
            selector: 'purchaseletterrschlistform'
        },
        {
            ref: 'formrschform',
            selector: 'purchaseletterrschformdata'
        },
        {
            ref: 'unitgrid',
            selector: 'purchaseletterunitgrid'
        },
        {
            ref: 'rschlistgrid',
            selector: 'purchaseletterreschedulegrid'
        },
        {
            ref: 'rschmaingrid',
            selector: 'purchaseletterreschmaingrid'
        },
        //
        {
            ref: 'schedulegrid',
            selector: 'purchaseletterschedulegrid'
        },
        {
            ref: 'panel',
            selector: 'purchaseletterpanel'
        },
        {
            ref: 'formprintout',
            selector: 'purchaseletterformprintout'
        },
        {
            ref: 'formprintoutpayscheme',
            selector: 'purchaseletterformprintoutpayscheme'
        }
    ],
    controllerName: 'purchaseletter',
    fieldName: 'purchaseletter_no',
    bindPrefixName: 'Purchaseletter',
    formWidth: 800,
    countLoadProcess: 0,
    browseHandler: null,
    browseHandlerMulti: {},
    unitFormula: {}, /// unitFormula object,
    scheduleGen: {}, //// schedule generator object
    localStore: {
        selectedUnit: null,
        customer: null,
        price: null,
        detail: null,
        schType: null
    },
    processor: null,
    tools: null,
    myConfig: null,
    cbf: null,
    mt: null,
    calculator: null,
    sourceMoneyList: null,
    currentPriceType: 0,
    globalParams: null,
    sourceMoneyDefault: {
        id: 0,
        text: ''
    },
    prolibs: null,
    prolibsFile: null,
    calculatorJs: null,
    purchaseletterJs: null,
    isRSCHApproveUser: false,
    templatePrint: null,
    templatePrintPayScheme: null,
    verifikasiDiskonInfo:null,
    constructor: function(configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Erems.library.box.Config({
            _controllerName: me.controllerName
        });

        me.cbf = new Erems.template.ComboBoxFields();


    },
    init: function(application) {
        var me = this;



        me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
        var events = new Erems.library.box.tools.EventSelector();

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
            'purchaseletterreschedulegrid': {
                itemdblclick: this.rschgridItemDblClick,
            },
            'purchaseletterformsearch': {
                afterrender: this.formSearchAfterRender

            },
            'purchaseletterschedulegrid': {
                afterrender: function() {
                    me.getSchedulegrid().on('edit', function(editor, e) {
                        // commit the changes right after editing finished
                        me.schedulGridOnEdit(editor, e, me.getFormdata(), me.getSchedulegrid());
                        e.record.commit();
                    });

                },
                cellclick: function(el, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                    me.schGridCellClick(el, record, rowIndex); // gak dipakai
                }
            },
            'purchaseletterreschmaingrid': {
                afterrender: function() {
                    me.getRschmaingrid().on('edit', function(editor, e) {
                        // commit the changes right after editing finished
                        var rec = e.record;
                        //  if (rec.get('amount') === rec.get('remaining_balance')) {
                        me.schedulGridOnEdit(editor, e, me.getFormrschform(), me.getRschmaingrid());
                        e.record.commit();
                        //  }
                    });


                },
                cellclick: function(el, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                    me.schGridCellClick(el, record, rowIndex); // gak dipakai
                },
                beforeselect: function(sm, record) {
                    /* GAK DIPAKAI
                     console.log(me.tools.floatval(record.get('remaining_balance')));
                     
                     if ( me.tools.floatval(record.get('remaining_balance')) <= 0 ){
                     
                     return false;
                     }
                     */

                },
                selectionchange: function(sm, selected) {

                    if (selected.length > 0) {
                        Ext.Array.each(selected, function(record) {
                            // if (record.get('amount') > record.get('remaining_balance')) {
                            if ((record.get('amount') > record.get('remaining_balance')) && (record.get('remaining_balance') <= 0.0)) {
                                // deselect
                                sm.deselect(record, true);
                            }
                        });

                        var record = selected[0];

                        if ((record.get('amount') > record.get('remaining_balance')) && (record.get('remaining_balance') > 0.0)) {
                            me.getRschmaingrid().down("[action=split]").setDisabled(false);
                        } else {
                            me.getRschmaingrid().down("[action=split]").setDisabled(true);
                        }


                    }
                }
            },
            'purchaseletterschedulegrid #sourceMoneyColumnID': {
                beforerender: function(el) {
                    //   me.schGridColumnCBBeforRender(el);
                }
            },
            'purchaseletterschedulegrid #colms_sourcemoney': {
                //  click: this.schedulegridItemClick
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
            'purchaseletterschedulegrid toolbar button[action=create]': {
                click: function() {
                    me.addNewSchedule(me.getFormdata(), me.getSchedulegrid());
                }
            },
            'purchaseletterschedulegrid toolbar button[action=destroy]': {
                click: function() {
                    me.removeSchedule(me.getFormdata(), me.getSchedulegrid(), me.getGrid());
                }
            },
            'purchaseletterreschmaingrid toolbar button[action=create]': {
                click: function() {
                    me.addNewSchedule(me.getFormrschform(), me.getRschmaingrid());
                }
            },
            'purchaseletterreschmaingrid toolbar button[action=destroy]': {
                click: function() {
                    me.removeScheduleRsch(me.getFormrschform(), me.getRschmaingrid(), me.getRschlistgrid());
                }
            },
            'purchaseletterreschmaingrid toolbar button[action=split]': {
                click: function() {
                    me.splitScheduleRsch(me.getFormrschform(), me.getRschmaingrid(), me.getRschlistgrid());
                }
            },
            'purchaseletterschedulegrid toolbar button[action=reschedule]': {
                click: function() {
                    me.showRescheduleList();
                }
            },
            'purchaseletterreschedulegrid toolbar button[action=create]': {
                click: function() {
                    me.showRescheduleFormData();
                }
            },
            'purchaselettergrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'purchaseletterreschedulegrid toolbar button[action=destroy]': {
                click: this.dataDestroyRsch
            },
            'purchaseletterreschedulegrid toolbar button[action=approve]': {
                click: this.dataApproveRsch
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
            'purchaseletterformdata button[action=create_new_customer]': {
                click: this.addCustomer
            },
            'purchaseletterrschlistform': {
                afterrender: this.fdarReschList
            },
            'purchaseletterrschformdata': {
                afterrender: this.fdarReschForm
            },
            'purchaseletterformdata': {
                afterrender: this.formDataAfterRender
            },
            'purchaseletterformdata combobox': {
                change: function(el, val) {
                    me.comboBoxOnChange(el, val);
                }
            },
            'purchaseletterrschformdata button[action=save]': {
                click: this.mainDataSaveRsch
            },
            'purchaseletterformdata button[action=save]': {
                click: this.mainDataSave
            },
            'purchaseletterformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'purchaseletterformdata button[action=printout]': {
                click: this.printoutdoc
            },
            'purchaseletterformdata button[action=printsch]': {
                click: this.printPaymentScheme
            },
            'purchaseletterformdata button[action=browse_unit]': {
                click: this.browseStockedUnit
            },
            'purchaseletterunitgrid button[action=select]': {
                click: this.unitSelect
            },
            'purchaseletterformdata button[action=browse_customer]': {
                click: this.browseCustomer
            },
            'purchaselettercustomergrid button[action=select]': {
                click: this.customerSelect
            },
            'purchaseletterformdata textfield[name=pricetype_pricetype_id]': {
                select: this.priceTypeOnSelect
            },
            'purchaseletterformdata textfield[name=billingrules_billingrules_id]': {
                select: this.billingRulesOnSelect
            },
            'purchaseletterformdata [name=upline_upline_id]': {
                select: function() {
                    me.uplineOnSelect();
                }
            },
            'purchaseletterformdata [name=cac_cac_id]': {
                select: function() {
                    me.cacOnSelect();
                }
            },
            'purchaseletterformdata textfield[name=persen_salesdisc]': {
                keyup: function(el) {
                    me.processor.calculate();
                }
            },
            // added 1/3/2015
            'purchaseletterformdata textfield[name=rencana_serahterima]': {
                keyup: function() {
                    me.rencanaSerahTerimaOnKeyUp();
                }
            },
            'purchaseletterformdata [name=rencana_serahterima_date]': {
                select: function() {
                    me.rencanaSerahTerimaDateOnSelect();
                }
            },
            'purchaseletterformdata button[action=genschedule]': {
                click: function() {
                    //  me.schGridRemoveEditor();
                    me.processor.plDate = me.getFormdata().down("[name=purchase_date]").getValue();
                    me.processor.generateSchedule();
                    me.generateSchedule();
                }
            },
            'purchaseletterformdata button[action=authorize]': {
                click: function() {
                    me.showAuthorizeForm();
                }
            },
            'purchaseletterauthrozieform button[action=login]': {
                click: function() {
                    me.authLogin();
                }
            },
            'purchaseletterformprintout button[action=print]': {
                click: function() {
                    me.formTemplatePrint();
                }
            },
            'purchaseletterformprintoutpayscheme button[action=print]': {
                click: function() {
                    me.formTemplatePrintPayScheme();
                }
            },
        });

        var cc = ["billingrules_uangmuka", "billingrules_tandajadi", "billingrules_term_angsuran"];
        for (var x in cc) {
            this.control('purchaseletterformdata textfield[name=' + cc[x] + ']', {
                keyup: function() {
                    me.processor.calculate();
                    me.getSchedulegrid().getStore().loadData([], false);
                }
            });
        }

        var arF = ['unit_land_size', 'unit_kelebihan', 'price_tanahpermeter', 'price_kelebihantanah', 'price_harga_bangunan',
            'price_persen_dischargadasar', 'price_persen_dischargatanah', 'price_persen_dischargabangunan',
            'price_persen_ppntanah', 'price_persen_ppnbangunan', 'price_persen_ppnbm', 'price_persen_pph22', 'price_harga_bbnsertifikat', 'price_harga_bphtb', 'price_harga_bajb',
            'harga_administrasi', 'harga_admsubsidi', 'harga_pmutu', 'harga_paket_tambahan', 'persen_salesdisc',
            'price_harga_dischargadasar', 'price_harga_dischargatanah', 'price_harga_dischargabangunan'];
        for (var i in arF) {
            this.control('purchaseletterformdata textfield[name=' + arF[i] + ']', {
                blur: function(el) {
                    me.calculator.calculate(el);
                    me.billingRulesOnSelect();
                    me.getSchedulegrid().getStore().loadData([], false);
                }
            });
        }

        if (typeof moment !== 'function') {


            Ext.Loader.injectScriptElement(document.URL + 'app/erems/library/moment.min.js', function() {
            }, function() {
            });
        }



        this.control(events.comboBox('purchaseletterformdata', me.tools.inputComboCode('salesman_' + me.cbf.employee.v, me.cbf.employee, 'salesman', 'purchaseletterformdata')));
    },
    formTemplatePrintPayScheme: function() {
        var me = this;
        var f = me.getFormprintoutpayscheme();
        var vs = f.getValues();
        var tpl = vs.template;
        if (!tpl) {
            me.tools.alert.warning("Invalid template printout.");
            return;
        }
        f.up("window").close();
        // console.log(vs);
        var p = me.getFormdata();
        p.setLoading("Please wait...");
        me.tools.ajax({
            params: {
                purchaseletter_id: p.down("[name=purchaseletter_id]").getValue(),
                template: tpl
            },
            success: function(data, model) {
                p.setLoading(false);
                var url = data['others'][0][0]['URL'];
                if (url) {
                    Ext.Msg.show({
                        title: 'Info',
                        msg: '<a href="' + url + '" target="blank">Download file</a>',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function() {

                        }
                    });
                }


            }
        }).read('paymentscheme');

    },
    formTemplatePrint: function() {
        var me = this;
        var f = me.getFormprintout();
        var vs = f.getValues();
        var tpl = vs.template;
        if (!tpl) {
            me.tools.alert.warning("Invalid template printout.");
            return;
        }
        f.up("window").close();
        // console.log(vs);
        var me = this;
        var p = me.getFormdata();
        p.setLoading("Please wait...");
        me.tools.ajax({
            params: {
                purchaseletter_id: p.down("[name=purchaseletter_id]").getValue(),
                template: tpl
            },
            success: function(data, model) {
                p.setLoading(false);
                var url = data['others'][0][0]['URL'];
                if (url) {
                    Ext.Msg.show({
                        title: 'Info',
                        msg: '<a href="' + url + '" target="blank">Download file</a>',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function() {

                        }
                    });
                } else {
                    me.tools.alert.warning(data['others'][0][0]['MSG']);
                }


            }
        }).read('printout');

    },
    uplineOnSelect: function() {
        var me = this;
        var f = me.getFormdata();
        f.down("[name=upline_employee_name]").setValue(me.tools.comboHelper(f.down("[name=upline_upline_id]")).getField('employee_id', 'employee_name'));
    },
    cacOnSelect: function() {
        var me = this;
        var f = me.getFormdata();
        f.down("[name=cac_cac_code]").setValue(me.tools.comboHelper(f.down("[name=cac_cac_id]")).getField('cac_id', 'cac_code'));
    },
    dataApproveRsch: function() {
        var me = this;
        var g = me.getRschlistgrid();

        if (g.getSelectionModel().hasSelection()) {
            var f = me.getFormrschlist();
            var recs = g.getSelectionModel().getSelection();
            recs = recs[0];

            Ext.Msg.show({
                title: 'Approve?',
                msg: 'Are you sure to approve this reschedule?',
                buttons: Ext.Msg.YESNOCANCEL,
                icon: Ext.Msg.QUESTION,
                fn: function(clicked) {
                    //   that.confirmClicked(clicked, buttonForm.up("form"));
                    //     buttonForm.up("window").destroy();
                    if (clicked === "yes") {
                        f.setLoading("Please wait.. replace old schedule with the new one");
                        me.tools.ajax({
                            params: {
                                reschedule_id: recs.get('reschedule_id')
                            },
                            success: function(schdata, schmodel) {

                                var hasil = schdata['others'][0][0]['STATUS'];
                                if (hasil) {
                                    me.tools.alert.info("Success");
                                    me.getFormdata().down("[name=rencana_serahterima]").setValue(recs.get('rencanaserahterima_month'));
                                    me.getFormdata().down("[name=rencana_serahterima_date]").setValue(recs.get('rencanaserahterima_date'));
                                    g.getStore().loadPage(1);

                                } else {
                                    me.tools.alert.warning("Error when processing your request");
                                }
                                f.setLoading(false);
                            }
                        }).read('approvereschedule');
                    }
                }
            });
        }
    },
    dataDestroyRsch: function() {
        var me = this;
        var g = me.getRschlistgrid();

        if (g.getSelectionModel().hasSelection()) {
            var f = me.getFormrschlist();
            var recs = g.getSelectionModel().getSelection();
            var ids = '';
            for (var i in recs) {
                ids += recs[i].get('reschedule_id') + '~';
            }
            f.setLoading("Please wait...");
            me.tools.ajax({
                params: {
                    data: ids
                },
                success: function(schdata, schmodel) {

                    var hasil = schdata['others'][0][0]['DATA'];
                    if (hasil) {
                        me.tools.alert.info("Deleted");

                        g.getStore().loadPage(1);

                    } else {
                        me.tools.alert.warning("Something error when deleting your data");
                    }
                    f.setLoading(false);
                }
            }).read('deletereschedule');

        }

    },
    rschgridItemDblClick: function() {
        var me = this;
        var g = me.getRschlistgrid();
        var rec = g.getSelectedRecord();
        if (rec) {
            me.showRescheduleFormData('update');
        }
    },
    //
    fdarReschForm: function() {
        var me = this;
        var f = me.getFormrschform();
        var g = me.getRschmaingrid();
        var s = f.up('window').state;

        g.doInit();
        f.down("[name=harga_total_jual]").setValue(accounting.unformat(me.getFormdata().down("[name=harga_total_jual]").getValue()));
        f.setLoading("Please wait...");

        /// khusus untuk yang sudah terbayar tidak bisa edit row
        g.addListener('beforeedit', function(a, b) {
            if (me.tools.floatval(b.record.data.amount) > me.tools.floatval(b.record.data.remaining_balance)) {

                return false;
            }

        });

        if (s === 'update') {
           
            var pg = me.getRschlistgrid();
            var rec = pg.getSelectedRecord();
            var id = rec.get('reschedule_id');
            f.loadRecord(rec);
            f.editedRow = pg.getSelectedRow();
            f.down("[name=reschedule_id]").setValue(id);

            if(rec.get("is_approve")){
                f.down("[action=save]").hide();
            }

            g.getStore().load({
                params: {
                    data_type: 'reschedule',
                    reschedule_id: id
                },
                callback: function(rec, op) {

                    g.attachModel(op);
                    g.getStore().getProxy().setExtraParam('reschedule_id', id);
                    g.getStore().getProxy().setExtraParam('data_type', 'reschedule');
                    f.setLoading(false);

                    /// add is_pay flag
                    g.getStore().each(function(rec) {

                        if (rec != null) {
                            if (rec.data.amount > rec.data.remaining_balance) {
                                rec.beginEdit();
                                rec.set({
                                    is_pay: 1
                                });
                            }

                        }

                    });

                }
            });

        } else {


            g.getStore().load({
                params: {
                    data_type: 'purchaseletter',
                    purchaseletter_id: me.getFormdata().down("[name=purchaseletter_id]").getValue()
                },
                callback: function(rec, op) {

                    g.attachModel(op);
                    g.getStore().getProxy().setExtraParam('purchaseletter_id', me.getFormdata().down("[name=purchaseletter_id]").getValue());
                    g.getStore().getProxy().setExtraParam('data_type', 'purchaseletter');
                    f.setLoading(false);

                    /// add is_pay flag
                    g.getStore().each(function(rec) {

                        if (rec != null) {

                            if (accounting.unformat(rec.data.amount) > accounting.unformat(rec.data.remaining_balance)) {


                                rec.beginEdit();
                                rec.set({
                                    is_pay: 1
                                });

                            }

                        }

                    });

                }
            });
        }

    },
    fdarReschList: function() {
        var me = this;
        var f = me.getFormrschlist();
        var g = me.getRschlistgrid();
        var plId = me.getFormdata().down("[name=purchaseletter_id]").getValue();
        f.down("[name=purchaseletter_purchaseletter_id]").setValue(plId);
        g.doInit();
        f.setLoading("Please wait...");
        g.getStore().load({
            params: {
                purchaseletter_id: plId
            },
            callback: function(rec, op) {

                g.attachModel(op);
                f.setLoading(false);
                g.getStore().getProxy().setExtraParam('purchaseletter_id', plId);
            }
        });
        /* me.tools.ajax({
         params: {purchaseletter_id: plId},
         success: function(schdata, schmodel) {
         
         
         
         me.tools.wesea({
         data: schdata,
         model: schmodel
         }, g).grid();
         
         var s = me.getRschlistgrid().getStore();
         console.log(s);
         s.getProxy().setExtraParam('purchaseletter_id', plId);
         
         f.setLoading(false);
         }
         }).read('reschedule');
         */
    },
    showRescheduleFormData: function(state) {
        var me = this;
        var s = state ? state : 'create';
        me.instantWindow('RescheduleFormData', 700, 'Reschedule', s, 'myReschFdWindow');



    },
    showRescheduleList: function() {
        var me = this;
        var s = 'create';
        me.instantWindow('RescheduleListForm', 700, 'Reschedule List', s, 'myReschWindow');
        if (me.isRSCHApproveUser) {
            var g = me.getRschlistgrid();
            g.down("[action=approve]").show();
        }
    },
    /* added 13 Maret 2015*/
    addNewSchedule: function(f, g) {
        var me = this;

        var s = g.getStore();
        var totalRecord = s.getCount();
        var lastRec = s.getAt(totalRecord - 1);
        ///////// count date
        var myDate = new Erems.library.box.tools.Date({
            date: lastRec ? lastRec.get('duedate') : me.getFormdata().down("[name=purchase_date]").getValue()
        });
        var newDate = myDate.addMonth(1);
        ////////// end count date
        s.add({
            duedate: newDate,
            scheduletype_scheduletype: lastRec ? lastRec.get('scheduletype_scheduletype') : null,
            termin: lastRec ? (me.tools.intval(lastRec.get('termin')) + 1) : 1,
            remaining_balance: 0,
            sourcemoney_sourcemoney: lastRec ? lastRec.get('sourcemoney_sourcemoney') : null,
            amount: 0
        });
        g.getSelectionModel().select((s.getCount()) - 1);
        me.balanceCalculate(f, g);

    },
    removeSchedule: function(f, g, mainGrid) {
        var me = this;
        //  var g = me.getSchedulegrid();
        var sm = g.getSelectionModel();
        if (sm.hasSelection()) {
            var selc = sm.getSelection();
            for (var i in selc) {
                var id = me.tools.intval(selc[i].get("schedule_id"));
                if (id > 0) {
                    me.tools.gridHelper(mainGrid).maindetailUpdateDeletedRows(f, selc[i].get("schedule_id"));
                }
                g.getStore().remove(selc[i]);
                me.balanceCalculate(f, g);
                // var s = me.getGriddetail().getStore();

            }
        }



    },
    splitScheduleRsch: function(f, g, mainGrid) {
        var me = this;
        //  var g = me.getSchedulegrid();
        var sm = g.getSelectionModel();

      
        
        //

        if (sm.hasSelection()) {
            var selc = sm.getSelection();
            // hanya 1 record saja
            selc = selc[0];
            if (selc.get("remaining_balance") > 0.0 && (selc.get("amount") > selc.get("remaining_balance"))) {


                var s = g.getStore();
                var totalRecord = s.getCount();
                var lastRec = selc;
                
                var tempAmount = lastRec.get('amount');
                var tempRb = lastRec.get('remaining_balance');
                
                s.insert(g.getStore().indexOf(selc)+1,{
                    duedate: lastRec.get('duedate'),
                    scheduletype_scheduletype: lastRec.get('scheduletype_scheduletype'),
                    termin: lastRec.get('termin'),
                    remaining_balance: tempRb,
                    sourcemoney_sourcemoney: lastRec.get('sourcemoney_sourcemoney'),
                    amount: tempRb
                });

                
                selc.beginEdit();
                selc.set({
                    amount:tempAmount - tempRb,
                    remaining_balance: 0.0
                });
                selc.endEdit();

                


                g.getSelectionModel().select((s.getCount()) - 1);
                me.balanceCalculate(f, g);


            }

        }



    },
    removeScheduleRsch: function(f, g, mainGrid) {
        var me = this;
        //  var g = me.getSchedulegrid();
        var sm = g.getSelectionModel();
        if (sm.hasSelection()) {
            var selc = sm.getSelection();
            for (var i in selc) {
                var id = me.tools.intval(selc[i].get("schedule_id"));
                if(me.tools.intval(selc[i].get("is_pay"))===0){
                if (id > 0 && f.editedRow > -1) {
                    me.tools.gridHelper(mainGrid).maindetailUpdateDeletedRows(f, selc[i].get("schedule_id"));
                }
                g.getStore().remove(selc[i]);
                me.balanceCalculate(f, g);
                }
                
                
                // var s = me.getGriddetail().getStore();

            }
        }



    },
    deleteUnitFromGrid: function(row) {
        var me = this;
        var id = 0;
        var s = me.getGriddetail().getStore();
        id = me.tools.intval(s.getAt(row).get("clusterimages_id"));
        if (id > 0) {
            me.tools.gridHelper(me.getGrid()).maindetailUpdateDeletedRows(me.getFormdata(), s.getAt(row).get("clusterimages_id"));
        }
        s.removeAt(row);
    },
    generateSchedule: function() {
        var me = this;
        var g = me.getSchedulegrid();
        var s = g.getStore();
        var totalSch = 0;
        s.each(function(rec) {
            rec.beginEdit();
            rec.set({
                sourcemoney_sourcemoney: 'CUSTOMER'
            });
            rec.endEdit();
        });
    },
    panelAfterRender: function() {

        var me = this;
        me.prolibs = null;
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                var prolibsFile = data.others[0][0]['PROLIBFILE'];
                me.calculatorJs = data.others[0][0]['CALCULATORJS'];
                me.purchaseletterJs = data.others[0][0]['PURCHASELETTERJS'];
                me.isRSCHApproveUser = data.others[0][0]['RESCHEDULEAPPROVEUSER'];
                var errorFile = "";

                if (prolibsFile) {

                    Ext.Loader.injectScriptElement(document.URL + 'app/erems/projectlibs/Prolibs.js', function() {

                        Ext.Loader.injectScriptElement(document.URL + 'app/erems/projectlibs/' + prolibsFile + '.js', function() {

                            me.prolibs = window[prolibsFile];
                            me.prolibsFile = prolibsFile;
                        }, function() {
                            me.tools.alert.warning("Error load prolibs file.");
                        });


                    }, function() {
                        me.tools.alert.warning("Error load Prolibs.js file.");
                    });


                } else {
                    errorFile += "[JSERR01] File perhitungan purchaseletter tidak ditemukan.";
                    //me.tools.alert.error("File perhitungan purchaseletter tidak ditemukan.");
                }
                if (!me.calculatorJs) {
                    errorFile += "[JSERR02] File kalkulasi harga untuk purchaseletter tidak ditemukan.";
                }
                if (!me.purchaseletterJs) {
                    errorFile += "[JSERR03] File purchaseletter tidak ditemukan.";
                }
                if (errorFile.length > 0) {
                    me.tools.alert.error(errorFile);
                }

            }
        }).read('init');

    },
    rencanaSerahTerimaDateOnSelect: function() {

    },
    balanceCalculate: function(f, g) {
        var me = this;
        console.log(f);
        console.log();
        var totalJual = accounting.unformat(f.down("[name=harga_total_jual]").getValue());
        var s = g.getStore();
        var totalSch = 0;
        s.each(function(rec) {
            var x = me.tools.floatval(rec.get("amount")).toFixed(2);
            totalSch += me.tools.floatval(x);

        });


        var balance = (me.tools.floatval(totalJual).toFixed(2) - me.tools.floatval(totalSch).toFixed(2));
        f.down("[name=balance_value]").setValue(balance);
    },
    schedulGridOnEdit: function(editor, e, f, g) {
        var me = this;

        // console.log(editor);
        // console.log(e.grid.up("form"));
        f = e.grid.up("form");
        g = e.grid;


        var currentRec = e.record;
        // for field amount
        if (e.field === 'amount') {


            if (me.tools.intval(currentRec.get('is_pay')) == 1) {
                return;
            }


            var totalJual = me.tools.money(f).removeKomaTitik(f.down("[name=harga_total_jual]").getValue());
            var s = g.getStore();
            var totalSch = 0;
            s.each(function(rec) {

                totalSch += me.tools.floatval(rec.get("amount"));
            });
            var balance = (totalJual - totalSch);

            if (f.down("[name=balance_value]")) {
                f.down("[name=balance_value]").setValue(balance);
            }




            currentRec.beginEdit();
            currentRec.set({
                remaining_balance: e.value
            });
            currentRec.endEdit();




            /// added 4 Maret 2015
            /// update billing rules
            var currentScheduleType = currentRec.get("scheduletype_scheduletype");
            var totalAmountByST = 0;

            var totalAmountByTandaJadi = 0;
            s.each(function(rec) {
                if (rec.get("scheduletype_scheduletype") === currentScheduleType) {
                    totalAmountByST += me.tools.floatval(rec.get("amount"));
                }

                if (rec.get("scheduletype_scheduletype") === "TJ") {
                    totalAmountByTandaJadi += me.tools.floatval(rec.get("amount"));
                }


            });

            //  console.log(g);
            if (g.xtype === 'purchaseletterschedulegrid') {
                switch (currentScheduleType) {
                    case 'UM':
                        var temp = window[me.prolibsFile].getUangMukaSchGridToBilRules(totalAmountByST, totalAmountByTandaJadi);
                        // f.down("[name=billingrules_uangmuka]").setValue(accounting.formatMoney(totalAmountByST));
                        f.down("[name=billingrules_uangmuka]").setValue(accounting.formatMoney(temp));
                        break;
                    case 'TJ':
                        f.down("[name=billingrules_tandajadi]").setValue(accounting.formatMoney(totalAmountByST));
                        break;
                    default:
                        f.down("[name=billingrules_angsuran]").setValue(accounting.formatMoney(totalAmountByST));
                        break;
                }
            }



            // add balance to last record in schedule
            var lastRec = s.getAt(s.getCount() - 1);
            var lastRecValue = lastRec.get('amount');
            lastRecValue = me.tools.floatval(lastRecValue) + me.tools.floatval(balance);
            if (lastRec) {
                lastRec.beginEdit();
                lastRec.set({
                    amount: lastRecValue,
                    remaining_balance: lastRecValue
                });
                lastRec.endEdit();
            }


        } else if (e.field === 'sourcemoney_sourcemoney') {

            var c = editor.editors.items[0].items.items[0];

            if (!c) {
                return;
            }



            var idx = c.getStore().findExact('sourcemoney', c.getValue());

            if (idx < 0) {
                return;
            }

            var rec = c.getStore().getAt(idx);
            if (rec) {
                currentRec.beginEdit();
                currentRec.set({
                    sourcemoney_sourcemoney_id: rec.get('sourcemoney_id')
                });
                currentRec.endEdit();
            }

        }

    },
    rencanaSerahTerimaOnKeyUp: function() {
        var me = this;
        var f = me.getFormdata();
        var bulan = me.tools.intval(f.down("[name=rencana_serahterima]").getValue());
        if (bulan <= 0) {
            f.down("[name=rencana_serahterima_date]").setValue(null);
            return;
        }
        var date = new Date();
        var m = me.tools.intval(date.getMonth());
        var y = date.getFullYear();
        m = (m + bulan) + 1;
        var newYear = Math.floor(m / 12);
        var newMonth = m % 12;

        date.setFullYear(y + newYear);
        date.setMonth(newMonth - 1);

        f.down("[name=rencana_serahterima_date]").setValue(date);
    },
    printPaymentScheme: function() {
        var me = this;
        me.instantWindow('FormPrintoutPayScheme', 500, 'Select Template', "mysuperstate", 'myPrintoutPaySchemeWindow');
        var f = me.getFormprintoutpayscheme();
        var el = f.down("[name=template_name]");

        for (var i in me.templatePrintPayScheme) {
            el.add({
                xtype: 'radiofield',
                boxLabel: me.templatePrintPayScheme[i].text,
                name: 'template',
                inputValue: me.templatePrintPayScheme[i].value,
                checked: i == 0 ? true : false
            });
        }
    },
    printPaymentScheme_20170606: function() {
        var me = this;
        var p = me.getFormdata();
        p.setLoading("Please wait...");
        me.tools.ajax({
            params: {
                purchaseletter_id: p.down("[name=purchaseletter_id]").getValue()
            },
            success: function(data, model) {
                p.setLoading(false);
                var url = data['others'][0][0]['URL'];
                if (url) {
                    Ext.Msg.show({
                        title: 'Info',
                        msg: '<a href="' + url + '" target="blank">Download file</a>',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function() {

                        }
                    });
                }


            }
        }).read('paymentscheme');
    },
    printoutdoc: function() {
        //purchaseletterformprintout

        var me = this;
        me.instantWindow('FormPrintout', 500, 'Select Template', "mysuperstate", 'myPrintoutWindow');
        var f = me.getFormprintout();
        var el = f.down("[name=template_name]");
        console.log(me.templatePrint);
        for (var i in me.templatePrint) {
            el.add({
                xtype: 'radiofield',
                boxLabel: me.templatePrint[i].text,
                name: 'template',
                inputValue: me.templatePrint[i].value,
                checked: i == 0 ? true : false
            });
        }



    },
    printoutdoc_20170307: function() {

        var me = this;
        var p = me.getFormdata();
        p.setLoading("Please wait...");
        me.tools.ajax({
            params: {
                purchaseletter_id: p.down("[name=purchaseletter_id]").getValue()
            },
            success: function(data, model) {
                p.setLoading(false);
                var url = data['others'][0][0]['URL'];
                if (url) {
                    Ext.Msg.show({
                        title: 'Info',
                        msg: '<a href="' + url + '" target="blank">Download file</a>',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function() {

                        }
                    });
                } else {
                    me.tools.alert.warning(data['others'][0][0]['MSG']);
                }


            }
        }).read('printout');
    },
    addCustomer: function() {

        var me = this;
        this.tools.iNeedYou(this).showWindow('Mastercustomer', {title: 'Add New Customer'});
    },
    afterAddNewFromOutside: function(controllerId, info) {
        var me = this;
        var f = me.getFormdata();

        /* get inserted id*/
        if (info) {

            if (info.others) { // check jika inserted id ada
                /// load customer information
                var insertedId = info.others;
                var f = me.getFormdata();
                f.setLoading("Loading customer information...");
                me.tools.ajax({
                    params: {
                        customer_id: insertedId
                    },
                    success: function(data, model) {
                        var data = data[0];
                        if (data) {

                            for (var group in data) {

                                for (var field in data[group]) {

                                    var el = f.down("[name=" + group + "_" + field + "]");
                                    if (el) {
                                        el.setValue(""); ///reset
                                        el.setValue(data[group][field]);
                                    }

                                }
                            }
                            me.getFormdata().down("[name=city_city_name]").setValue(data.city.city_name);
                            me.mt.customerPhoto(me.getFormdata().down("#photo_image"), data.customer.photo, me.myConfig.IMG_FOLDER);

                        }
                        f.setLoading(false);

                    }
                }).read('selectedcustomer');
            }
        }

        var win = Ext.getCmp(_Apps.getController(controllerId).formxWinId);
        if (win) {
            win.close();
        }


    },
    schGridCellClick: function(el, record, rowIndex) {
    },
    schGridColumnCBBeforRender: function(el) {

        var me = this;
    },
    attachSourceMoneyCb: function() {
        var me = this;
        var g = me.getSchedulegrid();
        console.log(g.getView().getHeaderCt().child('#sourceMoneyColumnID'));
    },
    authLogin: function() {
        var me = this;
        var f = me.getFormauth();

        f.setLoading("Log in...");





        me.tools.ajax({
            params: {
                a: f.down("[name=username]").getValue(),
                b: f.down("[name=password]").getValue()
                        //  a: cryptoJs.obj.SHA256(f.down("[name=username]").getValue()).toString(cryptoJs.obj.enc.Base64),
                        //  b: cryptoJs.obj.SHA256(f.down("[name=password]").getValue()).toString(cryptoJs.obj.enc.Base64)
            },
            success: function(data, model) {
                var loginObj = data['others'][0][0];
                var loginStatus = loginObj['LOGINSUCCESS'];
                me.afterDoAuth(loginStatus, f.up("window").state, loginObj['LOGINMSG']);


            }
        }).read('authlogin');


    },
    afterDoAuth: function(loginStatus, state, msg) {
        var me = this;
        var f = me.getFormauth();
        switch (state) {
            case 'edit':
                if (!loginStatus) {
                    f.setLoading(false);
                    me.tools.alert.error(msg);

                } else {
                    f.up("window").close();
                    me.getFormdata().down("button[action=authorize]").hide();
                    me.getFormdata().down("#btnSave").setDisabled(false);
                    f.setLoading(false);
                }

                break;
            case 'delete':
                if (!loginStatus) {
                    f.setLoading(false);
                    me.tools.alert.error(msg);

                } else {
                    f.setLoading(false);
                    f.up("window").close();
                    me.dataDestroyIntern();
                }
                break;
        }
    },
    comboBoxOnChange: function(el, val) {
        var me = this;
        me.tools.comboHelper(el).setCodeValue(me.cbf);
    },
    showAuthorizeForm: function(state) {
        var me = this;
        var s = state ? state : 'edit';
        me.instantWindow('AuthorizeForm', 500, 'Authorize User Login', s, 'myAuthWindow');
    },
    mainDataSaveRsch: function() {
        var me = this;
        /// added 4 maret 2015
        // check nilai total editan di grid sama dengan total harga jual
        var f = me.getFormrschform();
        var g = me.getRschmaingrid();
        var balanceValue = accounting.unformat(f.down("[name=balance_value]").getValue());

        if (balanceValue < 0 || balanceValue > 0) {
            me.tools.alert.warning("Sale price total must be equal to schedule amount total");
            return;
        }

        if (g.getStore().getCount() < 1) {
            me.tools.alert.warning("Please create schedule first");
            return;
        }

        me.tools.insSave({
            form: f,
            urlCreate: 'erems/purchaseletter/create',
            finalData: function(values) {
                values['purchaseletter_purchaseletter_id'] = me.getFormdata().down("[name=purchaseletter_id]").getValue();
                values['detail'] = me.tools.gridHelper(g).getJson();
                if (f.editedRow > -1) {
                    values["deletedRows"] = me.getRschlistgrid().getStore().getAt(f.editedRow).get("deletedRows");
                }
                return values;
            },
            modeCreate: me.tools.intval(f.down("[name=reschedule_id]").getValue()) > 0 ? 'updatereschedule' : 'reschedule',
            success: function() {
                me.getRschlistgrid().getStore().loadPage(1);
                f.up("window").close();
            }
        });



    },
    mainDataSave: function() {
        var me = this;
        /// added 4 maret 2015
        // check nilai total editan di grid sama dengan total harga jual
        var f = me.getFormdata();
        var balanceValue = me.tools.money(f).removeKomaTitik(f.down("[name=balance_value]").getValue());

        if (balanceValue < 0 || balanceValue > 0) {
            me.tools.alert.warning("Sale price total must be equal to schedule amount total");
            return;
        }

        if (me.getSchedulegrid().getStore().getCount() < 1) {
            me.tools.alert.warning("Please generate schedule first");
            return;
        }



        me.insSave({
            form: me.getFormdata(),
            grid: me.getGrid(),
            store: me.localStore.detail,
            finalData: function(data) {
                data["detail"] = me.tools.gridHelper(me.getSchedulegrid()).getJson();
                data["pricetype_id"] = data["pricetype_pricetype_id"];
                if (me.getFormdata().editedRow > -1) {
                    data["deletedRows"] = me.getGrid().getStore().getAt(me.getFormdata().editedRow).get("deletedRows");
                }

                me.tools.money(me.getFormdata()).clearFields(data);
                return data;
            },
            sync: true,
            callback: {
                create: function(store, form, grid) {

                }
            }
        });

    },
    billingRulesOnSelect: function() {
        var me = this;
        var f = me.getFormdata();
        var e = f.down("[name=billingrules_billingrules_id]");
        var rec = e.getStore().findRecord("billingrules_id", e.getValue());
        if (!me.prolibs) {
            console.log("[BILLINGRULESONSELECT] PROBLIBS NULL");
            return;
        }
        if (rec) {


            /// check for percent
            var pum = me.tools.floatval(rec.get("persen_uangmuka"));
            var ptj = me.tools.floatval(rec.get("persen_tandajadi"));
            var htj = f.down("[name=harga_total_jual]").getValuem();
            var um = pum > 0 ? ((pum / 100) * htj) : me.tools.floatval(rec.get("uangmuka"));
            var tj = ptj > 0 ? ((ptj / 100) * htj) : me.tools.floatval(rec.get("tandajadi"));

            console.log(me.prolibs);

            me.prolibs.setDataBillingRules({
                um: um,
                tj: tj
            });


            // versi CEDAR
            // um = um-tj;
            um = me.prolibs.getUangMukaBillingRules();

            // var a = htj - um;
            var a = htj - um;



            var ttj = me.tools.intval(rec.get('term_tandajadi'));
            ttj = ttj > 240 ? 240 : ttj;
            var tum = me.tools.intval(rec.get('term_uangmuka'));
            tum = tum > 240 ? 240 : tum;
            var ta = me.tools.intval(rec.get('term_angsuran'));
            ta = ta > 240 ? 240 : ta;
            ta = me.tools.intval(f.down("[name=pricetype_pricetype_id]").getValue()) == 2 ? 1 : ta;
            if (ttj == 0 && tj > 0)
                ttj = 1;
            if (tum == 0 && um > 0)
                tum = 1;
            f.down("[name=billingrules_term_tandajadi]").setValue(ttj);
            f.down("[name=billingrules_tandajadi]").setValuem(tj);
            f.down("[name=billingrules_term_uangmuka]").setValue(tum);
            f.down("[name=billingrules_uangmuka]").setValuem(um);
            f.down("[name=billingrules_term_angsuran]").setValue(ta);
            f.down("[name=billingrules_angsuran]").setValuem(a);
        }



        //billingrules_tandajadi
    },
    priceTypeOnSelect: function() {
        var me = this;
        var f = me.getFormdata();
        var pEl = f.down("[name=pricetype_pricetype_id]");
        var p = pEl.getValue();


        // reset field
        me.tools.resetPanel('priceInformationBoxId', me.getFormdata());
        me.tools.resetPanel('billingInformationBoxId', me.getFormdata());
        me.getSchedulegrid().getStore().loadData([], false);

        pEl.setValue(p);


        var s = me.localStore.price;
        var r = s.findRecord("pricetype_id", p);

        var e = null;
        for (var i in r.data) {
            e = f.down("[name=price_" + i + "]");
            if (e) {

                e.setValue(accounting.formatMoney(r.data[i]));
            }
        }


        f.down("[name=price_persen_dischargadasar]").setValue(accounting.formatMoney(r.data['persen_dischargedasar']));
        f.down("[name=price_harga_dischargadasar]").setValue(accounting.formatMoney(r.data['harga_dischargedasar']));
        f.down("[name=price_persen_dischargatanah]").setValue(accounting.formatMoney(r.data['persen_dischargetanah']));
        f.down("[name=price_harga_dischargatanah]").setValue(accounting.formatMoney(r.data['harga_dischargetanah']));
        f.down("[name=price_persen_dischargabangunan]").setValue(accounting.formatMoney(r.data['persen_dischargebangunan']));
        f.down("[name=price_harga_dischargabangunan]").setValue(accounting.formatMoney(r.data['harga_dischargebangunan']));
        
        console.log(me.verifikasiDiskonInfo);
        // added 09/06/2017
        if(me.verifikasiDiskonInfo){
            var vdi = me.verifikasiDiskonInfo;
            if(vdi.diskonhargadasar_jenis===2){
                //me.calculator.calculate(el);
                f.down("[name=price_harga_dischargadasar]").setValue(accounting.formatMoney(vdi.diskonhargadasar_nilai));
                me.calculator.calculate(f.down("[name=price_harga_dischargadasar]"));
            }else{
                f.down("[name=price_persen_dischargadasar]").setValue(accounting.formatMoney(vdi.diskonhargadasar_nilai));
                me.calculator.calculate(f.down("[name=price_persen_dischargadasar]"));
            }
            if(vdi.diskonhargatanah_jenis===2){
                f.down("[name=price_harga_dischargatanah]").setValue(accounting.formatMoney(vdi.diskonhargatanah_nilai));
                me.calculator.calculate(f.down("[name=price_harga_dischargatanah]"));
            }else{
                f.down("[name=price_persen_dischargatanah]").setValue(accounting.formatMoney(vdi.diskonhargatanah_nilai));
                me.calculator.calculate(f.down("[name=price_persen_dischargatanah]"));
            }
            if(vdi.diskonhargabangunan_jenis===2){
                f.down("[name=price_harga_dischargabangunan]").setValue(accounting.formatMoney(vdi.diskonhargabangunan_nilai));
                me.calculator.calculate(f.down("[name=price_harga_dischargabangunan]"));
            }else{
                f.down("[name=price_persen_dischargabangunan]").setValue(accounting.formatMoney(vdi.diskonhargabangunan_nilai));
                me.calculator.calculate(f.down("[name=price_persen_dischargabangunan]"));
            }
        }
        
        


        me.processor.priceTypeId = p;
        me.processor.calculate();
        
        // trigger salah satu field
        me.calculator.calculate(f.down("[name=harga_administrasi]"));
        
        f.down("#btnSave").setDisabled(false);

        /// added 1/3/2015
        // p = 2 --> KPR
        f.down("[name=bank_bank_id]").setReadOnly(p === 2 ? false : true);
        var angsuranEl = f.down("[name=billingrules_term_angsuran]");
        angsuranEl.setReadOnly(p === 2 ? true : false);
        angsuranEl.setValue(p === 2 ? 1 : 0);
        me.currentPriceType = p;
        /// added 2/3/2015
        if (me.globalParams) {
            var descText = '';
            switch (p) {
                case 1:
                    descText = me.globalParams.PURCHASELETTER_CASH_DESC;
                    break;
                case 2:
                    descText = me.globalParams.PURCHASELETTER_KPR_DESC;
                    break;
                case 3:
                    descText = me.globalParams.PURCHASELETTER_INHOUSE_DESC;
                    break;


            }
            f.down("[name=notes]").setValue(descText);
        }
        f.down("[name=kpp]").setVisible(p === 2 ? true : false);
        f.down("[name=kpp]").setValue(1);
        
       

    },
    unitSelect: function() {
        var me = this;
        if (me.browseHandler) {
            me.browseHandler.selectItem(function() {
                var f = me.getFormdata();
                var unitId = f.down("[name=unit_unit_id]").getValue();
                me.localStore.price = me.instantStore({
                    id: me.controllerName + 'UnitPriceStore',
                    extraParams: {
                        mode_read: 'price'
                    },
                    idProperty: 'price_id'
                });
                me.localStore.price.load({
                    params: {
                        unit_id: unitId
                    },
                    callback: function(rec, op) {
                        var f = me.getFormdata();
                        me.attachModel(op, me.localStore.price, true);
                        f.down("[name=pricetype_pricetype_id]").setDisabled(false);

                        // reset price information
                        me.tools.resetPanel('priceInformationBoxId', me.getFormdata());
                        me.tools.resetPanel('billingInformationBoxId', me.getFormdata());
                        me.getSchedulegrid().getStore().loadData([], false);
                        //billingInformationBoxId

                    }
                });

                // added 2 Maret 2015

                if (me.globalParams) {
                    var gp = me.globalParams;


                    f.down("[name=price_harga_bajb]").setValue(me.tools.floatval(gp['PURCHASELETTER_BIAYA_AKTAJUALBELI']));
                    f.down("[name=price_harga_bbnsertifikat]").setValue(me.tools.floatval(gp['PURCHASELETTER_BIAYA_BALIKNAMA']));
                    f.down("[name=price_harga_bphtb]").setValue(me.tools.floatval(gp['PURCHASELETTER_BIAYA_PEROLEHANHAK']));


                }

                // added 2 February 2017
                me.verifikasiDiskonInfo = null;
                if (me.globalParams) {
                    var gp = me.globalParams;

                    me.tools.ajax({
                        params: {
                            unit_id: unitId
                        },
                        success: function(avdata, avmodel) {
                            console.log(avdata);
                            if (avdata.others[0][0]['DISCOUNT_VERIFIED']) {
                                me.verifikasiDiskonInfo = avdata.others[0][0]['DATA'];
                            }
                            
                            
                           

                            me.discountInput().enable({
                                globalParams: gp,
                                isReadOnly: !avdata.others[0][0]['DISCOUNT_VERIFIED']
                            });

                        }
                    }).read('cekapprovalverification');


                }

            });
        }

    },
    customerSelect: function() {
        var me = this;
        if (me.browseHandler) {
            me.browseHandler.selectItem(function(rec) {

                me.attachCustomerInfo(rec);
            });
        }

    },
    attachCustomerInfo: function(rec) {
        var me = this;
        me.getFormdata().down("[name=city_city_name]").setValue(rec.get("city_city_name"));
        me.mt.customerPhoto(me.getFormdata().down("#photo_image"), rec.get("photo"), me.myConfig.IMG_FOLDER);

    },
    browseStockedUnit: function(el) {
        var me = this;
        var browse = new Erems.library.Browse();
        browse.init({
            controller: me,
            view: 'UnitGrid',
            el: el,
            localStore: "selectedUnit",
            mode_read: "selectedunit",
            specialPrefix: 'unit'
        });
        browse.showWindow();
    },
    browseCustomer: function(el) {
        var me = this;
        var browse = new Erems.library.Browse();
        browse.init({
            controller: me,
            view: 'CustomerGrid',
            el: el,
            localStore: "customer",
            mode_read: "selectedcustomer",
            loadRecordPrefix: "customer",
            browseId: 'unitpl'
        });
        browse.showWindow();
    },
    discountInput: function() {
        var me = this;
        var f = me.getFormdata();
        var x = {
            getFields: function() {
                var fields = ["price_persen_dischargadasar", "price_harga_dischargadasar",
                    "price_persen_dischargatanah", "price_harga_dischargatanah",
                    "price_persen_dischargabangunan", "price_harga_dischargabangunan"];
                return fields;
            },
            enable: function(params) {

                var isEnable = me.tools.intval(params.globalParams.PURCHASELETTER_ENABLE_DISCOUNT_APPROVAL);
                var fields = this.getFields();
                if (isEnable) {
                    /// disable first
                    for (var i in fields) {
                        f.down("[name=" + fields[i] + "]").setReadOnly(params.isReadOnly);
                    }
                }
            }
        };

        return x;



    },
    fdar: function() {



        var me = this;
        var f = me.getFormdata();
        var sg = me.getSchedulegrid();

        me.mt = new Erems.library.ModuleTools();
        var isAuthorizedUser = false;



        var x = {
            init: function() {
                me.setActiveForm(me.getFormdata());

                var myStrFunc = 'me.processor = new Erems.library.' + me.purchaseletterJs + '()';
                eval(myStrFunc);
                //me.processor = new Erems.library.Purchaseletter();


                me.processor.prolibsFile = me.prolibsFile;
                me.processor.setForm(me.getFormdata());
                me.processor.setC(me);
                me.processor.setScheduleGrid(me.getSchedulegrid());

                // TAMBAH FIELD DI SINI
                me.processor.fields.total = 'harga_total_jual';
                me.processor.fields.jual = 'price_harga_jual';
                me.processor.fields.salesDiscountPercent = 'persen_salesdisc';
                me.processor.fields.salesDiscountAmount = 'harga_salesdisc';
                me.processor.fields.biayaAdmin = "harga_administrasi";
                me.processor.fields.biayaPaketTambahan = "harga_paket_tambahan";
                me.processor.fields.biayaAdminSubsidi = "harga_admsubsidi";


                /* added 2 Oct 2014*/

                var cf = new Erems.library.CalculatorFields();
                cf.fields = {
                    width: 'unit_width',
                    long: 'unit_long',
                    land_size: 'unit_land_size',
                    kelebihan: 'unit_kelebihan',
                    _harga_tanah_a: 'price_tanahpermeter',
                    _harga_tanah_b: 'price_harga_tanah',
                    _harga_kelebihan_a: 'price_kelebihantanah',
                    _harga_kelebihan_b: 'price_harga_kelebihantanah',
                    _harga_bangunan: 'price_harga_bangunan',
                    _harga_jual_dasar: 'price_harga_jualdasar',
                    _disc_harga_dasar: 'price_persen_dischargadasar',
                    _tot_disc_harga_dasar: 'price_harga_dischargadasar',
                    _disc_harga_tanah: 'price_persen_dischargatanah',
                    _tot_disc_harga_tanah: 'price_harga_dischargatanah',
                    _disc_harga_bangunan: 'price_persen_dischargabangunan',
                    _tot_disc_harga_bangunan: 'price_harga_dischargabangunan',
                    _harga_netto: 'price_harga_neto',
                    _ppn_tanah: 'price_persen_ppntanah',
                    _tot_ppn_tanah: 'price_harga_ppntanah',
                    _ppn_bangunan: 'price_persen_ppnbangunan',
                    _ppn_ppnbm: 'price_persen_ppnbm',
                    _ppn_pph22: 'price_persen_pph22',
                    _tot_ppn_bangunan: 'price_harga_ppnbangunan',
                    _tot_ppn_ppnbm: 'price_harga_ppnbm',
                    _tot_ppn_pph22: 'price_harga_pph22',
                    _harga_balik_nama: 'price_harga_bbnsertifikat',
                    _harga_bphtb: 'price_harga_bphtb',
                    _harga_bajtb: 'price_harga_bajb',
                    _biaya_administrasi: 'harga_administrasi',
                    _biaya_administrasi_subsidi: 'harga_admsubsidi',
                    _biaya_p_mutu: 'harga_pmutu',
                    _biaya_paket_tambahan: 'harga_paket_tambahan',
                    _disc_sales: 'persen_salesdisc',
                    _tot_disc_sales: 'harga_salesdisc',
                    _total: 'price_harga_jual',
                    _total_jual: 'harga_total_jual'
                };

                //


                var myStrFunc = 'me.calculator = new Erems.library.' + me.calculatorJs + '({ fields: cf.fields, form: me.getFormdata() });';
                eval(myStrFunc);
                /*
                 me.calculator = new Erems.library.Calculator({
                 fields: cf.fields,
                 form: me.getFormdata()
                 });
                 */

                // set schedule Process
                me.calculator.setSP(me.processor);


                /**/


                sg.doInit();
                f.setLoading(true, true);


                me.localStore.detail = me.instantStore({
                    id: me.controllerName + 'PLDetailStore',
                    extraParams: {
                        mode_read: 'maindetail'
                    },
                    idProperty: 'purchaseletter_id'
                });

                me.tools.money(f).addCurrencyEvent();

                me.localStore.schType = me.instantStore({
                    id: me.controllerName + 'SchTypeStore',
                    extraParams: {
                        mode_read: 'schtype'
                    },
                    idProperty: 'scheduletype_id'
                });


            },
            create: function() {

                f.down("[action=printsch]").setDisabled(true);
                f.down("[action=printout]").setDisabled(true);

                me.localStore.detail.load({
                    params: {
                        purchaseletter_id: 0
                    },
                    callback: function(rec, op) {

                        me.attachModel(op, me.localStore.detail, false);

                    }
                });
                /*   me.localStore.schType.load({callback: function(rec, op) {
                 me.attachModel(op, me.localStore.schType, false);
                 }
                 });*/

                f.down("[action=save]").setDisabled(false);
                me.tools.ajax({
                    params: {
                        // purchaseletter_id: plId
                    },
                    success: function(data, model) {



                        me.fillFormComponents(data, f);


                        var gp = data['others'][0][0]['GLOBALPARAMSPARAMS'];
                        if (gp) {
                            me.globalParams = gp;
                        }
                        f.down("[name=pt_name]").setValue(data['others'][0][0]['PT_NAME']);



                        /// get source money default text
                        for (var i in data.sourcemoney.data) {
                            if (me.tools.intval(data.sourcemoney.data[i].sourcemoney_id) == me.tools.intval(data['others'][0][0]['SOURCEMONEY_DEFAULT'])) {
                                me.sourceMoneyDefault.id = data.sourcemoney.data[i].sourcemoney_id;
                                me.sourceMoneyDefault.name = data.sourcemoney.data[i].sourcemoney;
                            }

                        }

                        //  console.log(me.sourceMoneyDefault);

                        me.processor.sourceMoney = me.sourceMoneyDefault;

                        // me.tools.wesea(data.schedule, me.getSchedulegrid()).grid();
                        me.tools.ajax({
                            params: {
                                purchaseletter_id: 0
                            },
                            success: function(schdata, schmodel) {



                                me.tools.wesea({
                                    data: schdata,
                                    model: schmodel
                                }, sg).grid();
                                f.setLoading(false);
                            }
                        }).read('schedule');

                        me.sourceMoneyList = data.sourcemoney;

                        f.down("[name=purchaseletter_no]").setReadOnly(true);

                        me.discountInput().enable({
                            globalParams: gp,
                            isReadOnly: true
                        });

                    }
                }).read('detail');
            },
            update: function() {
                var plId = me.getGrid().getSelectedRecord().get("purchaseletter_id");
                f.editedRow = me.getGrid().getSelectedRow();
                var paymentAmount = 0;

                me.localStore.schType.load({callback: function(rec, op) {
                        me.attachModel(op, me.localStore.schType, false);

                    }
                });



                me.tools.ajax({
                    params: {
                        purchaseletter_id: plId
                    },
                    success: function(data, model) {

                        /// added 15 Maret 2015;
                        var schG = me.getSchedulegrid();
                        console.log(schG.editingPlugin);

                        var gp = data['others'][0][0]['GLOBALPARAMSPARAMS'];
                        if (gp) {
                            me.globalParams = gp;
                        }

                        me.templatePrint = data['others'][0][0]['TEMPLATEPRINTOUT'];

                        me.templatePrintPayScheme = data['others'][0][0]['TEMPLATEPRINTOUTPAYSCHEME'];





                        f.down("[name=pt_name]").setValue(data['others'][0][0]['PT_NAME']);

                        me.sourceMoneyList = data.sourcemoney;
                        me.fillFormComponents(data, f);
                        isAuthorizedUser = data.others[0][0]['ISAUTHORIZEDUSER'];
                        f.down("button[action=browse_unit]").setDisabled(true);
                        f.down("button[action=browse_customer]").setDisabled(true);
                        f.down("button[action=genschedule]").setDisabled(true);
                        //
                        f.setLoading("Request purchase letter information...");
                        me.localStore.detail.load({
                            params: {
                                purchaseletter_id: plId
                            },
                            callback: function(rec, op) {
                                me.attachModel(op, me.localStore.detail, false);
                                var rec = me.localStore.detail.getAt(0);

                                f.loadRecord(rec);


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

                                paymentAmount = me.tools.floatval(rec.get("payment_payment"));

                                var el = null;
                                for (var i in rec.data) {

                                    el = f.down("[name=" + i + "]");

                                    if (el) {


                                        el.setReadOnly(true);


                                    }
                                    el = null;
                                }



                                f.down("[name=customer_customer_id]").setValue(rec.get("customer_id"));
                                f.down("[name=pricetype_pricetype_id]").setDisabled(false);
                                f.down("[name=pricetype_pricetype_id]").setReadOnly(true);
                                f.down("[name=kpp]").setVisible(me.tools.intval(f.down("[name=pricetype_pricetype_id]").getValue()) === 2 ? true : false);
                                f.down("[name=kpp]").setReadOnly(false);
                                me.tools.fillComboCode(f, me.cbf.employee, "salesman");
                                me.tools.fillComboCode(f, me.cbf.clubcitra, "citraclub");
                                me.tools.fillComboCode(f, me.cbf.mediapromotion, "mediapromotion");
                                me.tools.fillComboCode(f, me.cbf.saleslocation, "saleslocation");
                                me.tools.fillComboCode(f, me.cbf.bank, "bank");

                                me.mt.customerPhoto(f.down("#photo_image"), rec.get("customer_photo"), me.myConfig.IMG_FOLDER);



                                f.setLoading("Request schedule information...");
                                me.tools.ajax({
                                    params: {
                                        purchaseletter_id: plId
                                    },
                                    success: function(schdata, schmodel) {



                                        me.tools.wesea({
                                            data: schdata,
                                            model: schmodel
                                        }, sg).grid();

                                        me.disableElements();
                                     
                                        if (me.getTotalPayment() > 0) {
                                            if (!isAuthorizedUser) {
                                                f.down("button[action=authorize]").show();
                                                f.down("#btnSave").setDisabled(true);
                                            } else {
                                                f.down("#btnSave").setDisabled(false);
                                                f.down("button[action=authorize]").hide();
                                            }
                                        } else {
                                            f.down("#btnSave").setDisabled(false);
                                            f.down("button[action=authorize]").hide();
                                        }
                                     
                                        
                                       
                                        /* authroize button*/



                                        /// added 13 November 2014
                                        // jika payment == 0 , maka bisa edit sebagian informasi
                                        if (paymentAmount === 0) {
                                            f.down("#btnSave").setDisabled(false);
                                            var ar = ['salesman_employee_id', 'clubcitra_member',
                                                'citraclub_citraclub_id', 'saleslocation_saleslocation_id',
                                                'mediapromotion_mediapromotion_id', 'upline_upline_id', 'cac_cac_id', 'is_upline_referall', 'is_cac_referall'];
                                            var si = f.down("#salesInformationID");
                                            for (var i in ar) {
                                                f.down("[name=" + ar[i] + "]").setReadOnly(false);
                                            }

                                        }


                                        me.balanceCalculate(me.getFormdata(), me.getSchedulegrid());



                                        //f.setLoading("CANCEL");
                                        f.setLoading(false);

                                        /// masking jika statusnya cancel
                                        var isCancel = me.tools.intval(rec.get("is_cancel"));
                                        if (isCancel > 0) {
                                            f.down("[action=save]").setDisabled(true);
                                            f.down("[action=printout]").setDisabled(true);
                                            f.down("[action=printsch]").setDisabled(true);
                                            f.down("[name=unitstatus_status]").setValue("CANCEL");
                                            //f.mask();
                                            /*
                                             Ext.MessageBox.alert('Alert', "STATUS : CANCEL", function() {
                                             f.up("window").close();
                                             
                                             });
                                             */
                                        }

                                        /// enable edit number jika param = 1

                                        f.down("[name=purchaseletter_no]").setReadOnly(me.tools.intval(me.globalParams.PURCHASELETTER_ENABLE_EDITNUMBER) === 1 ? false : true);


                                        var useLunasTandaJadi = me.tools.intval(me.globalParams.PURCHASELETTER_PRINT_LUNASTANDAJADI);
                                        if (useLunasTandaJadi === 1) {
                                            /// tanda jadi lunas atau belum
                                            var gs = me.getSchedulegrid();

                                            for (var i = 0; i < gs.getStore().getCount(); i++) {
                                                if (gs.getStore().getAt(i).get("scheduletype_scheduletype") === "TJ") {
                                                    if (me.tools.floatval(gs.getStore().getAt(i).get("remaining_balance")) === 0) {
                                                        f.down("[action=printout]").setDisabled(false);

                                                        break;
                                                    }
                                                }
                                            }


                                        } else {
                                            f.down("[action=printout]").setDisabled(false);
                                        }

                                        /// kalau supervisor, maka bisa edit sales information dan note -- addon 2017-03-09
                                        var isSupervisor = data['others'][0][0]['ISSUPERVISOR'];
                                        if (isSupervisor) {
                                            f.down("[name=salesman_employee_id]").setReadOnly(false);
                                            f.down("[name=clubcitra_member]").setReadOnly(false);
                                            f.down("[name=citraclub_citraclub_id]").setReadOnly(false);
                                            f.down("[name=upline_upline_id]").setReadOnly(false);
                                            f.down("[name=is_cac_referall]").setReadOnly(false);
                                            f.down("[name=cac_cac_id]").setReadOnly(false);
                                            f.down("[name=is_upline_referall]").setReadOnly(false);
                                            f.down("[name=saleslocation_saleslocation_id]").setReadOnly(false);
                                            f.down("[name=mediapromotion_mediapromotion_id]").setReadOnly(false);
                                            f.down("[name=notes]").setReadOnly(false);
                                        }

                                        // addon 2017 -04- 10
                                        me.getSchedulegrid().addListener('beforeedit', function() {
                                            return false;
                                        });

                                        
                                        // addon 20170608
                                        f.down("[name=customer_address]").setReadOnly(false);
                                        f.down("[name=city_city_name]").setReadOnly(false);
                                        f.down("[name=customer_zipcode]").setReadOnly(false);
                                        f.down("[name=customer_home_phone]").setReadOnly(false);
                                        f.down("[name=customer_mobile_phone]").setReadOnly(false);
                                        f.down("[name=customer_office_phone]").setReadOnly(false);
                                        f.down("[name=customer_fax]").setReadOnly(false);
                                        f.down("[name=customer_KTP_number]").setReadOnly(false);
                                        f.down("[name=customer_NPWP]").setReadOnly(false);
                                        f.down("[name=customer_NPWP_address]").setReadOnly(false);
                                        f.down("[name=customer_email]").setReadOnly(false);


                                    }
                                }).read('schedule');

                            }}
                        );

                        me.discountInput().enable({
                            globalParams: gp,
                            isReadOnly: true
                        });







                    }
                }).read('detail');
            }
        };
        return x;
    },
    getTotalPayment: function() {
        var pay = 0;
        var me = this;
        var plRec = me.getGrid().getSelectedRecord();
        var t = me.tools;
        if (plRec) {
            pay = t.floatval(plRec.get("total_payment"));

        }
        return pay;
    },
    disableElements: function() {
        var me = this;
        var f = me.getFormdata();


    },
    fillFormComponents: function(data, form) {
        var me = this;
        me.tools.wesea(data.bank, form.down("[name=bank_bank_id]")).comboBox();
        me.tools.wesea(data.billingrules, form.down("[name=billingrules_billingrules_id]")).comboBox();
        me.tools.wesea(data.collector, form.down("[name=collector_employee_id]")).comboBox();
        me.tools.wesea(data.mediapromotion, form.down("[name=mediapromotion_mediapromotion_id]")).comboBox();
        me.tools.wesea(data.saleslocation, form.down("[name=saleslocation_saleslocation_id]")).comboBox();
        me.tools.wesea(data.salesman, form.down("[name=salesman_employee_id]")).comboBox();
        me.tools.wesea(data.citraclub, form.down("[name=citraclub_citraclub_id]")).comboBox();
        me.tools.wesea(data.employee, form.down("[name=upline_upline_id]")).comboBox();
        me.tools.wesea(data.cac, form.down("[name=cac_cac_id]")).comboBox();
        me.tools.wesea(data.city, form.down("[name=city_city_name]")).comboBox();
        //citraclub_id

    },
    process: function() {
        var me = this;
        var f = me.getFormdata();

        var ptId = f.down("[name=pricetype_pricetype_id]").getValue();


    },
    /* overrider 11 Oct 2014 */
    dataDestroy: function() {
        var me = this;
        var g = me.getGrid();
        g.setLoading("Please wait...");
        me.tools.ajax({
            params: {
                //purchaseletter_id: plId
            },
            success: function(data, model) {
                g.setLoading(false);
                var authorized = data['others'][0][0]['ISAUTHORIZEDUSER'];

                if (authorized) {
                    me.dataDestroyIntern();
                } else {
                    var pay = me.getTotalPayment();
                    if (pay === 0) {
                        me.dataDestroyIntern();
                    } else {
                        me.showAuthorizeForm('delete');
                    }
                }

            }
        }).read('checkauthorize');





    },
    dataDestroyIntern: function() {

        var me = this;
        var rows = me.getGrid().getSelectionModel().getSelection();




        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            var confirmmsg, successmsg, failmsg;
            var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            var store = me.getGrid().getStore();
            if (rows.length == 1) {
                var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(me.fieldName) + ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }
            Ext.Msg.confirm('Delete Data', confirmmsg, function(btn) {
                if (btn == 'yes') {
                    resetTimer();



                    var msg = function() {
                        me.getGrid().up('window').mask('Deleting data, please wait ...');
                    };

                    var selectedRecord = '';

                    if (rows.length == 1) {
                        selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(me.fieldName) + ']';
                    }

                    var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');

                    for (var i = 0; i < rows.length; i++) {

                        store.remove(rows[i]);
                    }


                    store.on('beforesync', msg);
                    store.sync({
                        success: function(s) {
                            me.getGrid().up('window').unmask();
                            var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
                            var successmsg = (rows.length == 1 ? selectedRecord : (successcount != rows.length ? successcount + ' of ' : '') + recordcounttext) + ' deleted successfully.';
                            store.un('beforesync', msg);
                            store.reload();
                            /*  if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
                             Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 0}});
                             }*/
                            Ext.Msg.show({
                                title: 'Success',
                                msg: successmsg,
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK
                            });
                        },
                        failure: function() {
                            me.getGrid().up('window').unmask();
                            store.un('beforesync', msg);
                            store.reload();
                            Ext.Msg.show({
                                title: 'Failure',
                                msg: failmsg + ' The data may have been used.',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    });



                }
            });
        }
    }
});