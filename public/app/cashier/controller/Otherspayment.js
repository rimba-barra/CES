Ext.define('Cashier.controller.Otherspayment', {
    extend: 'Cashier.library.template.controller.Controller2',
    alias: 'controller.Otherspayment',
    requires: [
        'Cashier.library.Unitformula', 
        'Cashier.library.form.Paymentformfunc', 
        'Cashier.library.Browse',
        'Cashier.library.box.Config',
        'Cashier.library.box.tools.Tools',
        'Cashier.template.ComboBoxFields',
        'Cashier.library.box.tools.EventSelector',
        'Cashier.library.XyReport',
        'Cashier.library.template.combobox.Deptprefixcombobox',
        'Cashier.library.template.combobox.Ptusercombobox',
        'Cashier.library.template.combobox.Statuscombobox'
    ],
    views: ['otherspayment.Panel', 'otherspayment.Grid', 'otherspayment.FormSearch', 'otherspayment.FormData', 'otherspayment.PaymentDetailGrid'],
    comboBoxIdEl: [],
    stores: [
         'Deptprefixcombo',
         'Ptbyuser',
         'Grouptransaction'
        
    ],
    controllerName: 'otherspayment',
    fieldName: 'payment_id',
    fillForm: null,
    formWidth: 800,
    refs: [
        {
            ref: 'grid',
            selector: 'otherspaymentgrid'
        },
        {
            ref: 'formsearch',
            selector: 'otherspaymentformsearch'
        },
        {
            ref: 'formdata',
            selector: 'otherspaymentformdata'
        },
        {
            ref: 'formdetail',
            selector: 'otherspaymentformdatadetail'
        },
        {
            ref: 'griddetail',
            selector: 'otherspaymentpaymentdetailgrid'
        },
        {
            ref: 'panel',
            selector: 'otherspaymentpanel'
        },
        {
            ref: 'gridschedule',
            selector: 'otherspaymentschedulegrid'
        },
        {
            ref: 'formdos',
            selector: 'otherspaymentdospreviewformdata'
        },
         {
            ref: 'detailcoagrid',
            selector: 'otherspaymentcoadetailgrid'
            
        },
        {
            ref: 'formcoadetail',
            selector: 'otherspaymentformcoadetail'
        }
    ],
    //unitFormula: null,
    //storeProcess: 'Otherspaymentdatadetail',
    bindPrefixName: 'Otherspayment',
    templateCoa:'2', //1 others payment sesuai ID table mh_coa_config cashier
    templateModuleName:'Others Payment', 
    browseHandler: null,
    urlcommon: 'cashier/common/create',
    urlrequest: 'cashier/tcash/create',
    urlheader: 'cashier/tcash/',
    urldetail: 'cashier/tcash/coadetail',
    urlvendor: 'cashier/tcash/vendor',
    urlcia: 'cashier/tcash/outtransbon',
    dateNow: new Date(),
    is_out:0, //jika TRANSAKSI OUT 1. JIKA IN 0
    flaggeneratevoucherno: 0,
    prefix_voucher:null,
    state: null,
    accept_date: null,
    pt_id: 0,
    kasbank_id : 0,
    localStore: {
        selectedUnit: null,
        customer: null,
        price: null,
        detail: null
    },
    tools: null,
    myConfig: null,
    cbf: null,
    mt: null,
    paymentTypeList: null,
    xyReport: null,
    printOutData: null,
    globalParams: null,
    myParams: null,
    selectedPurchaseletter:null,
    constructor: function(configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Cashier.library.box.Config({
            _controllerName: me.controllerName
        });

        me.cbf = new Cashier.template.ComboBoxFields();
    },
    init: function() {
        var me = this;

        me.tools = new Cashier.library.box.tools.Tools({config: me.myConfig});

        this.control({
            'otherspaymentpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'otherspaymentformdatadetail': {
                afterrender: this.detailPanelAfterRender
            },
            'otherspaymentgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'otherspaymentformsearch': {
                afterrender: this.formSearchAfterRender

            },
            'otherspaymentgrid toolbar button[action=create]': {
                click: function() {
                     me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'otherspaymentgrid toolbar button[action=update]': {
                click: function() {
                     this.formDataShow('update');
                }
            },
            'otherspaymentgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'otherspaymentgrid toolbar button[action=print]': {
                click: this.mainPrint
            },
            'otherspaymentgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'otherspaymentformsearch button[action=search]': {
                click: this.dataSearch
            },
            'otherspaymentformsearch button[action=reset]': {
                click: this.dataReset
            },
            'otherspaymentformdata': {
                afterrender: this.formDataAfterRender
            },
            'otherspaymentformdata button[action=save]': {
                click: this.mainDataSave
            },
            'otherspaymentformdata textfield[name=admin_fee]': {
                keyup: function() {
                    me.hitungTotalPayment();
                }
            },
            'otherspaymentformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'otherspaymentformdata [name=paymentmethod_paymentmethod_id]': {
                select: function() {
                    me.generateNote();
                }
            },
            'otherspaymentformdata [name=payment_date]': {
                select: function() {
                    me.generateNote();
                }
            },
            'otherspaymentformdatadetail button[action=save]': {
                click: this.detailDataSave
            },
            'otherspaymentformdatadetail combobox[name=paymenttype_paymenttype_id]': {
                select: function() {
                    me.paymentTypeOnSelect();
                }
            },
            'otherspaymentformdata button[action=browse_unit]': {
                click: me.selectUnitGridShow
            },
            'otherspaymentunitgrid button[action=select]': {
                click: this.unitSelect
            },
            'otherspaymentpaymentdetailgrid button[action=addNewDetail]': {
                click: function() {
                    me.addNewDetail("create");
                }

            },
            'otherspaymentpaymentdetailgrid actioncolumn': {
                click: this.insActionColumnClick
            },
            'otherspaymentgrid button[action=printx]': {
                click: this.showPdf
            },
            'otherspaymentformdata textfield[name=reference_no]': {
                keyup: function() {
                    me.receiptNoOnKeyUp();
                }
            },
            'otherspaymentschedulegrid button[action=bayar]': {
                click:function(){
                    me.bayarDendaOnClick();
                }
            },
            'otherspaymentgrid button[action=printvoucher]': {
                click: this.showVoucherPdf
            },
            'otherspaymentformdata textfield[name=receipt_no]': {
                keyup: function() {
                    me.receiptNo2OnKeyUp();
                }
            },
            'otherspaymentformsearch [name=cluster_id]': {
                select: function() {
                    me.searchClusterOnSelect();
                }
            },
            'otherspaymentgrid button[action=printdos]': {
                click: this.showPrintDosPreview
            },
            'otherspaymentdospreviewformdata button[action=print]': {
                click: this.printDos
            },
            'otherspaymentformdata [name=paymentcashier_prefix_id] ': {
                'select': function (g, record, item, index, e, eOpts) {//console.log(rowdata.coa_id);
                    //me.tools.wesea(rowdata.coa_id, form.down("[name=thcoa_id]")).comboBox(true);
                    //me.tools.wesea(rowdata.voucherprefix_id, form.down("[name=voucherprefix_id]")).comboBox(true);
                   
                    var me, rowdata, form, countlength;
                    me = this;
                    form = me.getFormdata();
                    rowdata = record[0]['data'];
                    
                    form.down("[name=paymentcashier_thcoa_id]").setValue(rowdata.coa_id);
                    form.down("[name=paymentcashier_voucherprefix_id]").setValue(rowdata.prefix_id);
                     me.prefix_voucher = rowdata.prefix;
//                    console.log(rowdata.voucherprefix_id);
                    me.is_fixed = rowdata.is_fixed;
                    me.fixed_coa_id = rowdata.fixed_coa_id;
                    me.fixed_coa = rowdata.fixed_coa;
                    me.fixed_account_desc = rowdata.fixed_account_desc;
                    me.prefix = rowdata.prefix;
                    countlength = me.fixed_coa.length;
                    
                    
                    
                    
                    me.generateVoucherno();

                },
            },
            'otherspaymentformdata [name=paymentcashier_prefix_id_bank] ': {
                'select': function (g, record, item, index, e, eOpts) {
                   
                    var me, rowdata, form, countlength;
                    me = this;
                    form = me.getFormdata();
                    rowdata = record[0]['data'];
                    form.down("[name=paymentcashier_thcoa_id]").setValue(rowdata.coa_id);
                    form.down("[name=paymentcashier_voucherprefix_id]").setValue(rowdata.prefix_id);
                    me.is_fixed = rowdata.is_fixed;
                    me.fixed_coa_id = rowdata.fixed_coa_id;
                    me.fixed_coa = rowdata.fixed_coa;
                    me.fixed_account_desc = rowdata.fixed_account_desc;
                   me.prefix = rowdata.temp_prefix;
                    me.prefix_voucher = rowdata.temp_prefix;
                    countlength = me.fixed_coa.length;
                    me.generateVouchernoBank();

                },
            },
            'otherspaymentformdata [name=paymentcashier_accept_date] ': {
                'change': function (that, newValue, oldValue, eOpts) {
                    var form = me.getFormdata();
                    me.accept_date = me.formatDate(form.down('[name=paymentcashier_accept_date]').getValue());
                   // me.setValue(me, 'kasbank_date', me.accept_date);
                    me.generateTransno();
                },
            },//
            'otherspaymentformdata [name=pt_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this;
                    form = me.getFormdata();
                    rowdata = record[0]['data'];
                    me.pt_id = rowdata.pt_id;
                    me.accept_date = me.formatDate(form.down("[name=paymentcashier_accept_date]").getValue());
                    me.setStoreGroup();
                    //me.getEmployee();
                    me.generateTransno();
                    me.setStoreDepartment();
                },
            },
//            'otherspaymentformdata [name=paymentcashier_kasbank] ': {
//                'select': function (g, record, item, index, e, eOpts) {
//                    var me, rowdata, form;
//                    me = this;
//                    form = me.getFormdata();
//                    item = form.down("[name=paymentcashier_kasbank]").getValue();
//                        //jika payment selain cash
//                        if(item != 'K') { // jika tida pilih cash, ya bank munculin, hide cash
//                           me.setStorePrefixBank();
//                           me.fieldHide(me, 'paymentcashier_prefix_id', true);
//                           me.fieldShow(me, 'paymentcashier_prefix_id_bank', true); 
//                           me.fieldShow(me, 'paymentcashier_chequegiro_no', true); 
//                           me.fieldShow(me, 'paymentcashier_chequegiro_date', true); 
//                           form.down("[name=paymentcashier_prefix_id_bank]").setReadOnly(false);
//                           form.down("[name=paymentcashier_grouptrans_id]").setReadOnly(false);
//                           form.down("[name=voucher_no]").setValue('');
//                           form.down("[name=paymentcashier_prefix_id]").clearValue();
//                        }
//                        else { //jika klik bank /etc, bank hide. cash muncul
//                            me.setStorePrefix();
//                            me.fieldShow(me, 'paymentcashier_prefix_id', true);
//                            me.fieldHide(me, 'paymentcashier_prefix_id_bank', true);
//                            me.fieldHide(me, 'paymentcashier_chequegiro_no', true);
//                            me.fieldHide(me, 'paymentcashier_chequegiro_date', true);
//                            form.down("[name=paymentcashier_prefix_id]").setReadOnly(false);
//                            form.down("[name=paymentcashier_grouptrans_id]").setReadOnly(false);
//                            form.down("[name=paymentcashier_prefix_id_bank]").clearValue();
//                        }
//                       
//                    
//                },
//            },
            'otherspaymentformdata [name=paymentcashier_kasbank] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this;
                    form = me.getFormdata();
                    //if() {
                    if(me.state == 'create' && me.pt_id !== 0) {
                    item = form.down("[name=paymentcashier_kasbank]").getValue();
                        //jika payment selain cash
                        if(item != 'K') { // jika tida pilih cash, ya bank munculin, hide cash
                           me.setStorePrefixBank();
                           me.fieldHide(me, 'paymentcashier_prefix_id', true);
                           me.fieldShow(me, 'paymentcashier_prefix_id_bank', true); 
                           me.fieldShow(me, 'paymentcashier_chequegiro_no', true); 
                           me.fieldShow(me, 'paymentcashier_chequegiro_date', true); 
                           form.down("[name=paymentcashier_prefix_id_bank]").setReadOnly(false);
                           form.down("[name=paymentcashier_grouptrans_id]").setReadOnly(false);
                           form.down("[name=voucher_no]").setValue('');
                           form.down("[name=paymentcashier_prefix_id]").clearValue();
                        }
                        else { //jika klik bank /etc, bank hide. cash muncul
                            me.setStorePrefix();
                            me.fieldShow(me, 'paymentcashier_prefix_id', true);
                            me.fieldHide(me, 'paymentcashier_prefix_id_bank', true);
                            me.fieldHide(me, 'paymentcashier_chequegiro_no', true);
                            me.fieldHide(me, 'paymentcashier_chequegiro_date', true);
                            form.down("[name=paymentcashier_prefix_id]").setReadOnly(false);
                            form.down("[name=paymentcashier_grouptrans_id]").setReadOnly(false);
                            form.down("[name=paymentcashier_prefix_id_bank]").clearValue();
                        }
                    } else {
                         me.tools.alert.warning("Pilih unit terlebih dahulu");
                         form.down("[name=paymentcashier_kasbank]").reset();
                    }
                    
                },
            },
            'otherspaymentcoadetailgrid toolbar [action=generate]' : {
                click: function () {
                    me.generateCoa(me.templateCoa);
                }
                
            },
             'otherspaymentcoadetailgrid toolbar button[action=destroy]' : {
                click: function(el, act) {
                    me.destroydetail();
                }
                
            },
             'otherspaymentcoadetailgrid toolbar [action=create]' : {
               click: function(el, act) {
                    me.formDataDetail('create');
                }
                
            },
             'otherspaymentcoadetailgrid toolbar [action=update]' : {
               click: function(el, act) {
                    me.formDataDetail('update');
                }
                
            },
             'otherspaymentformcoadetail [name=coa_id]' : {
              select: function() {
                    me.coaChange();
                }
                
            },
            'otherspaymentformcoadetail button[action=save]': {
                click: function(el, act) {
                    me.savedetail();
                }
            },
            
            'otherspaymentformcoadetail textfield[name=persen]': {
                blur: function(el, act) {
                    me.hitungAmount();
                }
            },
        });

    },
    printDos: function() {
        var me = this;
        var f = me.getFormdos();
        var url = f.down("[name=url]").getValue();

        if (url) {

            window.open(url);

        }

    },
    showPrintDosPreview: function() {
        var me = this;


        var recs = me.getGrid().getSelectionModel().getSelection();

        if (recs.length == 0) {
            return;
        }


        var ids = "";
        for (var i in recs) {
            ids += recs[i].get("payment_id") + "~";
        }


        var w = me.instantWindow('DosPreviewFormData', 700, 'Print Preview', 'print', 'myDowPreviewWindow');
        var text = 'Hello test';
        var f = me.getFormdos();
        f.setLoading("Please wait...");
        me.tools.ajax({
            params: {
                payment_id: ids
            },
            success: function(data, model) {

                f.setLoading(false);
                //console.log(f.down("#textDosPreviewID"));
                //f.down("#textDosPreviewID").html = text;
                var text = data['others'][0][0]['PREVIEW'];
                f.down("[name=url]").setValue(data['others'][0][0]['URL']);
                f.down("#textDosPreviewID").update(text);


            }
        }).read('printdos');


    },
    searchClusterOnSelect: function() {
        var me = this;
        var f = me.getFormsearch();
        var clusterId = me.tools.intval(f.down("[name=cluster_id]").getValue());
        f.down("[name=block_id]").getStore().filterBy(function(rec, id) {
            return true;

        });
        f.down("[name=block_id]").setValue("");


        if (clusterId != 999) {
            f.down("[name=block_id]").getStore().filterBy(function(rec, id) {


                if (rec.raw.cluster_cluster_id === clusterId) {
                    return true;
                }
                else {
                    return false;
                }

            });
        }

    },
    showVoucherPdf: function() {
        var me = this;
        var p = me.getPanel();
        var recs = me.getGrid().getSelectionModel().getSelection();
        if(recs.length==0){
            return;
        }
        
        p.setLoading("Please wait..");
        
        var ids = "";
        
        for(var i in recs){
            ids += recs[i].get("payment_id")+"~";
        }

        me.tools.ajax({
            params: {
                payment_id: ids
            },
            success: function(data, model) {
                p.setLoading(false);
                var url = data['others'][0][0]['URL'];
             //   var display = data['others'][0][0]['DISPLAY'];
                if (url) {
                    window.open(url);
                   
                }
            }
        }).read('printvoucherpdf');

    },
    bayarDendaOnClick:function(){
        var me = this;
        var fd = me.getFormdetail();
        var gs = me.getGridschedule();
        var rec = gs.getSelectedRecord();
        if(rec){
            fd.down("[name=payment]").setValue(accounting.format(rec.get("remaining_denda")));
            fd.down("[name=payment]").setReadOnly(false);
            fd.down("[name=schedule_id]").setValue(rec.get("schedule_id"));
            gs.up("window").close();
        }
    },
    paymentTypeOnSelect: function() {
        
        var me = this;
        var f = me.getFormdetail();
        var val = f.down("[name=paymenttype_paymenttype_id]").getValue();
        var s = f.down("[name=paymenttype_paymenttype_id]").getStore();
        var isDenda = false;
        f.down("[name=payment]").setReadOnly(false);
        s.each(function(rec) {

            if (rec != null) {
                if (rec.get("paymenttype_id") === val && rec.get("paymenttype") === "DENDA") {
                    isDenda = true;
                }
            }

        });
        /// jika pembayaran denda
        if (isDenda) {
            me.instantWindow('Schedulegrid', 700, 'Denda', s, 'myDendaWindow');
            var gs = me.getGridschedule();
            gs.getSelectionModel().setSelectionMode('SINGLE');
            gs.doInit();

            gs.getStore().getProxy().setExtraParam('purchaseletter_id', me.getFormdata().down("[name=purchaseletter_id]").getValue());
            /* 
             gs.doLoad({},function(){
             
             });
             */

            gs.getStore().load({
                params: {},
                callback: function(rec, op) {
                    gs.attachModel(op);
                }
            });
            f.down("[name=payment]").setReadOnly(true);
        }
    },
    receiptNoOnKeyUp: function() {
        var me = this;
        var f = me.getFormdata();
        f.down("[name=payment_no]").setValue(f.down("[name=reference_no]").getValue());
    },
    receiptNo2OnKeyUp: function() {
        var me = this;
        var f = me.getFormdata();
        f.down("[name=payment_no]").setValue(f.down("[name=receipt_no]").getValue());
    },
    generateNote: function() {
        var me = this;

        var stText = '';
        /// get list schedule type yang dibayar
        var s = me.getGriddetail().getStore();
        for (var i = 0; i < s.getCount(); i++) {
            var rec = s.getAt(i);
            if (rec) {
                stText += rec.get("paymenttype_paymenttype") + ", ";
            }

        }

        var f = me.getFormdata();


        var str = ' ' + stText + ' ';
        // var str = '';
        str += ' ' + f.down("[name=type_name]").getValue();
        str += ' ' + me.tools.comboHelper(f.down("[name=paymentmethod_paymentmethod_id]")).getText(me.cbf.paymentmethod) + ' . ';

        str += ' ' + me.getDateString(f.down("[name=payment_date]").getValue()) + ' ';
        str += ' Rp. ' + accounting.formatMoney(f.down("[name=payment]").getValue()) + ',- ';
        str += ' ' + f.down("[name=cluster_cluster]").getValue();
        str += ' ' + f.down("[name=unit_unit_number]").getValue();
       // str += ' ' + me.myParams['ptname'];
        str += ' ' +me.selectedPurchaseletter.pt_name;


        f.down("[name=note]").setValue(str);

    },
    getDateString: function(date) {
        var d = new Date(date);
        var str = '';
        str += d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
        return str;
    },
    showPdf: function() {
        var me = this;
        var p = me.getPanel();



        var recs = me.getGrid().getSelectionModel().getSelection();



        if (recs.length == 0) {
            return;
        }

        p.setLoading("Please wait..");

        var ids = "";

        for (var i in recs) {
            ids += recs[i].get("payment_id") + "~";
        }




        me.tools.ajax({
            params: {
                payment_id: ids
            },
            success: function(data, model) {




                p.setLoading(false);
                var url = data['others'][0][0]['URL'];
                //   var display = data['others'][0][0]['DISPLAY'];
                if (url) {

                    var win = window.open(url, '_blank');
                    win.focus();

                    /*
                    Ext.Msg.show({
                        title: 'Info',
                        msg: '<a href="' + url + '" target="blank">Download file</a>',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function() {

                        }
                    });
                    */
                    
                    /*
                     var myWindow = window.open('', '', 'width=600,height=300');
                     
                     myWindow.document.write("<a href='"+url+"' target='blank'>Download file</a><br/>");
                     myWindow.focus();
                     */
                }


            }
        }).read('printpdf');

    },
    /*@implement this method for xyReport Class*/
    xyReportProcessParams: function(reportData) {
        var me = this;
        //var groupBy = reportData.params["Groupby"];
        var fn = "Payment";
        var plId = 0;
        /// added
        var g = me.getGrid();
        var rec = g.getSelectedRecord();


        // end added
        // reportData.params['con_string'] = "server=NB-MIS06\SQLEXPRESS;database=erems;user=sa;password=password12345";
        reportData['file'] = fn;
        reportData.params = me.printOutData;
        return reportData;
    },
    mainPrint: function() {
        var me = this;
        if (!me.xyReport) {
            me.xyReport = new Cashier.library.XyReport();
            me.xyReport.init(me);
        }

        //// 
        var rec = me.getGrid().getSelectedRecord();
        if (rec) {
            var p = me.getPanel();
            p.setLoading("Please wait...");
            me.tools.ajax({
                params: {
                    payment_id: rec.get("payment_id")
                },
                success: function(data, model) {
                    p.setLoading(false);

                    me.printOutData = data['others'][0][0]['DATA']
                    me.xyReport.processReport();

                }
            }).read('printout');

        }

    },
    panelAfterRender: function(configs) {
        this.callParent(arguments);
        var me = this;
        var p = me.getPanel();
        p.setLoading("Please wait");
        me.tools.ajax({
            params: {},
            success: function(data, model) {

                me.fillFormSearchComponents(data, me.getFormsearch());
                p.setLoading(false);
            }
        }).read('searchassets');

    },
    fillFormSearchComponents: function(data, f) {
        var me = this;
        me.tools.wesea(data.cluster, f.down("[name=cluster_id]")).comboBox(true);
        me.tools.wesea(data.paymentmethod, f.down("[name=paymentmethod_id]")).comboBox(true);
        me.tools.wesea(data.block, f.down("[name=block_id]")).comboBox(true);
    },
    mainDataSave: function() {
        var me = this;
        var g = me.getDetailcoagrid();
        var f = me.getFormdata();
        var balance = f.down("[name=balance]").getValue();
        
        if(g.getStore().getCount() == 0) {
                me.tools.alert.warning("Detail jurnal masih kosong, silahkan generate template atau isi detail jurnal");
           }
           else if(balance !== '0.00') {
                me.tools.alert.warning("Detail jurnal belum balance");
            }
            else {
        
        me.insSave({
            form: me.getFormdata(),
            grid: me.getGrid(),
            store: me.localStore.detail,
            finalData: function(data) {
                data["purchaseletter_purchaseletter_id"] = data["purchaseletter_id"];
                data["payment"] = toFloat(data["payment"]);
                data["admin_fee"] = toFloat(data["admin_fee"]);
                data["detail"] = me.getGriddetail().getJson();
                data["detailcoa"] = me.getDetailcoagrid().getJson();
                 data["deletedCoa"] = me.getFormdata().deletedCoa;
                 data["is_out"] = me.is_out;
                data["prefix_voucher"] = me.prefix_voucher;
                if (me.getFormdata().editedRow > -1) {
                    data["deletedRows"] = me.getGrid().getStore().getAt(me.getFormdata().editedRow).get("deletedRows");
                }

                return data;
            },
            sync: true,
            callback: {
                create: function(store, form, grid) {

                }
            }
        });
        
            }
        
        
    },
    insACC: function(view, action, row) {
        var me = this;
        var grid = view.up("grid");

        switch (grid.itemId) {
            case "PaymentDetailGridID":
                if (action == "destroy") {
                    me.deleteUnitFromGrid(row);
                } else if (action == "update") {
                    // me.editUnitFromGrid(row);
                    me.addNewDetail("update");
                    var f = me.getFormdetail();
                    f.editedRow = row;
                    f.loadRecord(grid.getStore().getAt(row));
                    f.down("[name=payment]").toCurrency();
                    ;
                }
                break;
        }
    },
    deleteUnitFromGrid: function(row) {
        var me = this;
        var id = 0;
        var s = me.getGriddetail().getStore();
        id = me.tools.intval(s.getAt(row).get("paymentdetail_id"));
        if (id > 0) {
            me.tools.gridHelper(me.getGrid()).maindetailUpdateDeletedRows(me.getFormdata(), s.getAt(row).get("paymentdetail_id"));
        }
        s.removeAt(row);


        me.hitungPayment();
        me.hitungTotalPayment();
        /* var id = parseInt(record.get("spkdetail_id"));
         var grid = me.getGrid();
         
         var rec = grid.getRecordById(me.getv("spk_id"));
         
         rec.beginEdit();
         rec.set({
         deletedRows: "" + id + "," + rec.get("deletedRows")
         });
         rec.endEdit();
         */
    },
    hitungPayment: function() {
        var me = this;
        var s = me.getGriddetail().getStore();
        var jumlah = s.getCount();
        var f = me.getFormdata();
        var adm = toFloat(f.down("[name=admin_fee]").getValuem());
        var total = 0;
        for (var i = 0; i < jumlah; i++) {
            total += toFloat(s.getAt(i).get("payment"));
        }

        f.down("[name=payment]").setValuem(total);


    },
    hitungTotalPayment: function() {
        var me = this;
        var f = me.getFormdata();
        var total = 0;
        var adminFee = me.tools.floatval(f.down("[name=admin_fee]").getValuem());
        var totalPay = me.tools.floatval(f.down("[name=payment]").getValuem());
        total = adminFee + totalPay;
        f.down("[name=total_payment]").setValuem(total);
        me.generateNote();
    },
    detailDataSave: function() {
        var me = this;
        var f = me.getFormdetail();
        var s = me.getGriddetail().getStore();
        var v = me.getFormdetail().getValues();
        var ptId = parseInt(v["paymenttype_paymenttype_id"]); /// paymenttype id
        if (ptId > 0) {
            var data = {
                paymenttype_paymenttype_id: ptId,
                paymenttype_paymenttype: me.tools.comboHelper(f.down("[name=paymenttype_paymenttype_id]")).getText(me.cbf.paymenttype),
                payment: toFloat(v["payment"]),
                description: v["description"],
                schedule_id:f.down("[name=schedule_id]").getValue()
            };
            if (f.editedRow > -1) {

                var rec = s.getAt(f.editedRow);
                rec.beginEdit();
                rec.set(data);
                rec.endEdit();
            } else {
                s.add(data);
            }
            me.hitungPayment();
            me.hitungTotalPayment();
            f.up("window").close();
        }

    },
    detailPanelAfterRender: function() {
        /* var me = this;
         var f = me.getFormdetail();
         var cb = ["paymenttype_paymenttype_id"];
         for (var c in cb) {
         f.down("[name=" + cb[c] + "]").bindPrefixName = me.controllerName;
         f.down("[name=" + cb[c] + "]").doInit(true, function() {
         f.setLoading(false);
         //console.log(me.getFormdata().down("[name="+cb[c]+"]").getStore());
         });
         }*/
    },
    addNewDetail: function(state) {
        var s = typeof state === "undefined" ? "create" : state;
        var me = this;
        me.instantWindow('FormDataDetail', 500, 'Add Detail', s, 'myWindow');
        var f = me.getFormdetail();
        f.editedRow = -1;
        me.tools.wesea(me.paymentTypeList, f.down("[name=paymenttype_paymenttype_id]")).comboBox();
        f.down("[name=schedule_id]").setValue(0);
    },
    unitSelect: function() {
        var me = this;
        var f = me.getFormdata();
        if (me.browseHandler) {
            me.selectedPurchaseletter = null;
            me.browseHandler.selectItem(function() {
                var ps = me.localStore.selectedUnit; // purchaseletter detail Store
                var psRec = ps.getAt(0);
                if (psRec) {
                    me.pt_id = f.down('[name=pt_pt_id]').getValue();
                    me.selectedPurchaseletter = psRec.data;
                    me.getFormdata().loadRecord(psRec);
                    me.mt.customerPhoto(f.down("#photo_image"), psRec.get("customer_photo"), me.myConfig.IMG_FOLDER);
                } else {
                    console.log("[Error] Tidak ada data purchaseletter");
                }


            });
        }
    },
    selectUnitGridShow: function(el) {
        var me = this;
        var browse = new Cashier.library.Browse();
        browse.init({
            controller: me,
            view: 'UnitGrid',
            el: el,
            localStore: "selectedUnit",
            mode_read: "selectedsoldunit"
        });
        browse.showWindow();

    },
    fdar: function() {

        var me = this;
        var f = me.getFormdata();
        var gds = me.getGriddetail();
        me.loadComboBoxStore();
        var x = {
            init: function() {

                me.mt = new Cashier.library.ModuleTools();

                me.setActiveForm(f);

                
                gds.doInit();

                me.localStore.detail = me.instantStore({
                    id: me.controllerName + 'OPDetailStore',
                    extraParams: {
                        mode_read: 'maindetail'
                    },
                    idProperty: 'payment_id'
                });
            },
            create: function() {
             var state = 'create';
                 f.down("[name=paymentcashier_accept_date]").setValue(me.dateNow);
                f.setLoading("Please wait...");
               f.deletedCoa = [];
                me.tools.ajax({
                    params: {
                    },
                    success: function(data, model) {

                        me.myParams = {
                            // 'cash': data['others'][0][0]['PAYMENTMETHOD_CASH'],
                            'ptname': data['others'][0][0]['PT_NAME']
                        };


                        me.globalParams = data['others'][0][0]['GLOBALPARAMSPARAMS'];
                        if (me.globalParams) {
                            f.down("[name=note]").setValue(me.globalParams['OTHERPAYMENT_DESC']);
                        }
                        me.fillFormComponents(data, f);
                        me.paymentTypeList = data.paymenttype;
                        me.localStore.detail.load({
                            params: {
                                payment_id: 0
                            },
                            callback: function(rec, op) {
                                me.attachModel(op, me.localStore.detail, false);

                            }
                        });
                        gds.getStore().load({
                            params: {
                                //state:"load_default_attribute"
                            },
                            callback: function(rec, op) {
                                gds.attachModel(op);
                            }
                        });

                        f.setLoading(false);


                    }
                }).read('detail');
                
                 me.setStoreDepartment();
                 me.setStorePrefix();
                 me.setStoreGroup();
                 
                 me.generateTransno();
                 
                 var gridCoaDetail = me.getDetailcoagrid();
                 gridCoaDetail.getStore().clearFilter(true);
                 gridCoaDetail.doInit();
                 gridCoaDetail.getStore().load({
                     params:{
                         template_id:0
                     },
                     callback: function(rec, op) {
                        gridCoaDetail.attachModel(op);
                     }
                 });

            },
            update: function() {

                f.setLoading("Please wait...");
                 f.deletedCoa = [];
                var state = 'update';
                var kasbank_id = 0;
                var paymentId = 0;
                var isBank = null;
                //console.log(me.getGrid().getSelectedRecord());
                if (me.getGrid()) {
                    paymentId = me.getGrid().getSelectedRecord().get("payment_id");
                    kasbank_id = me.getGrid().getSelectedRecord().get("paymentcashier_th_kasbank_id");
                    f.editedRow = me.getGrid().getSelectedRow();
                     isBank = me.getGrid().getSelectedRecord().get("paymentcashier_kasbank");
                } else {
                    paymentId = me.paymentId;
                    kasbank_id = me.kasbank_id;
                }
               
                //f.down("button[action=save]").setDisabled(true);
                f.deletedRows = [];
                
                me.tools.ajax({
                    params: {
                    },
                    success: function(data, model) {
                            
                        
                        
                        me.myParams = {
                            // 'cash': data['others'][0][0]['PAYMENTMETHOD_CASH'],
                            'ptname': data['others'][0][0]['PT_NAME']
                        };

                        me.globalParams = data['others'][0][0]['GLOBALPARAMSPARAMS'];
                        me.fillFormComponents(data, f);
                        me.paymentTypeList = data.paymenttype;
                      
                       

                        var paymentId = me.getGrid().getSelectedRecord().get("payment_id");
                        f.editedRow = me.getGrid().getSelectedRow();
                        f.setLoading("Loading payment detail...");
                        me.localStore.detail.load({
                            params: {
                                payment_id: paymentId
                            },
                            callback: function(rec, op) {
                                me.attachModel(op, me.localStore.detail, false);
                                var rec = me.localStore.detail.getAt(0);
                                me.getFormdata().loadRecord(rec);



                                f.down("[name=harga_total_jual]").setValue(me.tools.notnull(rec.get("purchaseletter_harga_total_jual")));
                                f.down("[name=purchase_date]").setValue(me.tools.notnull(rec.get("purchaseletter_purchase_date")));
                                f.down("[name=rencana_serahterima_date]").setValue(me.tools.notnull(rec.get("purchaseletter_rencana_serahterima_date")));
                                f.down("[name=purchaseletter_no]").setValue(me.tools.notnull(rec.get("purchaseletter_purchaseletter_no")));

                                me.mt.customerPhoto(f.down("#photo_image"), rec.get("customer_photo"), me.myConfig.IMG_FOLDER);
                                /* load payment detail*/
                                var sg = me.getGriddetail();
                                sg.getStore().load({
                                    params: {
                                        payment_id: paymentId
                                    },
                                    callback: function(rec, op) {
                                        sg.attachModel(op);
                                    }
                                });

                                //// convert to currency
                                var ar = ['payment', 'admin_fee', 'total_payment'];
                                for (var i in ar) {
                                    f.down("[name=" + ar[i] + "]").toCurrency();
                                }

                                me.selectedPurchaseletter = rec.data;

                            }
                        });
                        
                     var gridCoaDetail = me.getDetailcoagrid();
                    gridCoaDetail.down("[itemId=btnGenerate]").hide();
                         gridCoaDetail.down("[itemId=btnCreate]").hide();
                         gridCoaDetail.down("[itemId=btnEdit]").hide();
                         gridCoaDetail.down("[itemId=btnDelete]").hide();
                        gridCoaDetail.getStore().clearFilter(true);
                        gridCoaDetail.doInit();
                        gridCoaDetail.getStore().load({
                            params:{
                                template_id:0
                            },
                            callback: function(rec, op) {
                               gridCoaDetail.attachModel(op);
                            }
                        });
                        
               
                        me.setStoreDepartment();
                        me.setStoreGroup();   
                        //me.generateTransno();
                        var ff = me.getFormdata();
                        
                        var kasbank = ff.down("[name=paymentcashier_kasbank]").getValue();
                        f.down("[name=paymentcashier_prefix_id]").setDisabled(false);      
                        f.down("[name=paymentcashier_prefix_id_bank]").setDisabled(false);      
                        f.down("[name=paymentcashier_prefix_id]").setReadOnly(false);      
                        f.down("[name=paymentcashier_prefix_id_bank]").setReadOnly(false);      
                        f.down("[name=paymentcashier_grouptrans_id]").setReadOnly(false);      
                        if(kasbank == "KAS") {
                            me.setStorePrefix(kasbank);
                        }
                        else {
                            me.setStorePrefixBank();
                        }

                        if(isBank === 'BANK') {
                           me.fieldHide(me, 'paymentcashier_prefix_id', true);
                           me.fieldShow(me, 'paymentcashier_prefix_id_bank', true); 
                           me.fieldShow(me, 'paymentcashier_chequegiro_no', true); 
                           me.fieldShow(me, 'paymentcashier_chequegiro_date', true); 
                           f.down("[name=paymentcashier_prefix_id_bank]").setReadOnly(false);
                           f.down("[name=paymentcashier_grouptrans_id]").setReadOnly(false);
                           f.down("[name=voucher_no]").setValue('');
                           f.down("[name=paymentcashier_prefix_id]").clearValue();
                       } else {
                            me.fieldShow(me, 'paymentcashier_prefix_id', true);
                            me.fieldHide(me, 'paymentcashier_prefix_id_bank', true);
                            me.fieldHide(me, 'paymentcashier_chequegiro_no', true);
                            me.fieldHide(me, 'paymentcashier_chequegiro_date', true);
                            f.down("[name=paymentcashier_prefix_id]").setReadOnly(false);
                            f.down("[name=paymentcashier_grouptrans_id]").setReadOnly(false);
                            f.down("[name=paymentcashier_prefix_id_bank]").clearValue();
                       }
                       
                        
                       

                        
                        f.setLoading(false);
                         me.generateCoa(me.templateCoa,state,kasbank_id);

                    }
                }).read('detail');

                  
                         
            }
        };
        return x;
    },
    fillFormComponents: function(data, form) {
        var me = this;
        me.tools.wesea(data.paymentmethod, form.down("[name=paymentmethod_paymentmethod_id]")).comboBox();
        //citraclub_id

    },
     valueToRaw: function (value) {
        return value.toString().replace(/[^0-9.]/g, '');
    },
    setReadonly: function (form, selector, value) {
        var me,form;
        me = this;
        form = me.getFormdata();
        form.down("[name=" + selector + "]").setReadOnly(value);
    },
    fieldReadonly: function (controller, selector, value) {
        var me,form;
        me = this;
        form = me.getFormdata();
        controller.getFormdata().down("[name=" + selector + "]").setReadOnly(value);
    },
    fieldDisable: function (controller, selector, value) {
        controller.getFormdata().down("[name=" + selector + "]").setDisabled(value);
    },
    Fdisable: function (form, selector, value) {
        form.down("[name=" + selector + "]").setDisabled(value);
    },
    Fdisablebyid: function (form, selector, value) {
        form.down("[id=" + selector + "]").setDisabled(value);
    },
    fieldShow: function (form, selector) {
        var me,form;
        me = this;
        form = me.getFormdata();
        form.down("[name=" + selector + "]").setVisible(true);
    },
    fieldHide: function (form, selector) {
        var me,form;
        me = this;
        form = me.getFormdata();
        form.down("[name=" + selector + "]").setVisible(false);
    },
    containHide: function (form, selector) {
        form.down(selector).setVisible(false);
    },
    containShow: function (form, selector) {
        form.down(selector).setVisible(true);
    },
    setLabel: function (controller, selector, text, value) {
        controller.getFormdata().down("[name=" + selector + "]").setText(text, true);
    },
    btnDisable: function (controller, selector, value) {
        controller.getFormdata().down("[action=" + selector + "]").setDisabled(value);
    },
    disableBtn: function (form, selector, value) {
        form.down("[action=" + selector + "]").setDisabled(value);
    },
    getVal: function (form, selector, type) {
        var result;
        if (type == 'value') {
            result = form.down("[name=" + selector + "]").getValue();
        } else if (type == 'raw') {
            result = form.down("[name=" + selector + "]").getRawValue();
        }
        return  result;
    },
    formatDate: function (param) {
        param = new Date(param);
        var monthval = [
            "01", "02", "03",
            "04", "05", "06", "07",
            "08", "09", "10",
            "11", "12"
        ];

        var date = param.getFullYear() + "-" + monthval[param.getMonth()] + "-" + param.getDate();
        return date;
    },
     setStoreDepartment: function () {
        var me, store, form;
        me = this;
        form = me.getFormdata();
        store = me.getStore("Deptprefixcombo");
        store.load({
            params: {
                "hideparam": 'getdepartmentprefix',
                "project_id": apps.project,
                "pt_id": me.pt_id,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {

            }
        });
    },
    setStorePrefix: function (kasbank) {
        var me, store, form, in_out;
        me = this;
        form = me.getFormdata();
        in_out = me.in_out;
        store = me.getStore("Voucherprefixsetupcombo");
        store.load({
            params: {
                "hideparam": 'getvoucherprefixsetupv2',
                "project_id": apps.project,
                "pt_id": me.pt_id,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                store.clearFilter(true);
            if(kasbank) {
               
               me.tools.wesea(records, form.down("[name=paymentmethod_paymentmethod_id]")).comboBox();
        var prefixselected = me.tools.comboHelper(form.down("[name=paymentcashier_prefix_id]")).getField('prefix_id','coa');
     form.down("[name=paymentcashier_prefix_id]").setValue(prefixselected);
            }
              //form.down('[name=paymentcashier_prefix_id]').setValue();
            }
        });
    },
    setStorePrefixBank: function () {
        var me, store, form, in_out;
        me = this;
        form = me.getFormdata();
        in_out = me.in_out;
        store = me.getStore("Voucherprefixsetupcombo");
        store.load({
            params: {
                "hideparam": 'getvoucherprefixsetupv2bank',
                "project_id": apps.project,
                "pt_id": me.pt_id,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                store.clearFilter(true);
            }
        });
    },
    generateVoucherno: function () {
        var me, form, accept_date;
        me = this;
        form = me.getFormdata();
        accept_date = me.formatDate(me.getVal(form, 'paymentcashier_accept_date', 'value'));
        switch (me.state) {
            case 'create':
                me.senddata = {
                    "hideparam": 'generatevouchernocash',
                    "param_date": accept_date,
                    "project_id": apps.project,
                    "pt_id": me.pt_id,
                    "module": 'KAS',
                    "prefix": me.prefix,
                    "flag": me.flaggeneratevoucherno,
                }
                me.urlrequest = me.urlcommon;
                me.AjaxRequest();
                break;
        }
    },
    generateVouchernoBank: function () {
        var me, form, accept_date;
        me = this;
        form = me.getFormdata();
        accept_date = me.formatDate(me.getVal(form, 'paymentcashier_accept_date', 'value'));
        switch (me.state) {
            case 'create':
                me.senddata = {
                    "hideparam": 'generatevouchernobank',
                    "param_date": accept_date,
                    "project_id": apps.project,
                    "pt_id": me.pt_id,
                    "module": 'BANK',
                    "prefix": me.prefix,
                    "flag": me.flaggeneratevoucherno,
                }
                me.urlrequest = me.urlcommon;
                me.AjaxRequest();
                break;
        }
    },
     AjaxRequest: function () {
        var me;
        me = this;
        Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
            timeout:45000000,
            params: {
                data: Ext.encode(me.senddata)
            },
            success: function (response) {
                me.info = Ext.JSON.decode(response.responseText);
                me.setSuccessEvent();
            },
            failure: function (response) {
                me.getFormdata().up('window').close();
            }
        });
    },
    setStoreGroup: function () {
        var me, store, form;
        me = this;
//        store = me.getStore("Grouptransaction");
//        store.reload({
//            callback: function (records, operation, success) {
//                store.clearFilter(true);
//                store.filter('project_id', apps.project);
//                store.filter('pt_id', me.pt_id);
//                store.filter('status', 'K');
//            }
//        });
        store = me.getStore("Grouptransaction");
        store.load({
            params: {
                "hideparam": 'default',
                "project_id": apps.project,
                "pt_id": me.pt_id,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {

            }
        });
    },
    setSuccessEvent: function () {
        var me, data, form, tmp_prefix, countlength, flag_tmp, idheader, value;

        me = this;
        data = me.info.data;
        form = me.getFormdata();
        //console.log(me.info.parameter);
        switch (me.info.parameter) {
            case 'gettransnocash':
                form.down("[name=paymentcashier_transno]").setValue(me.info.total);
                break;
            case 'generatevouchernocash':
                //form.down("[id=voucher_no_c]").setValue(data);
                form.down("[id=voucher_erems]").setValue(data);
                break;
            case 'generatevouchernobank':
                //form.down("[id=voucher_no_c]").setValue(data);
                form.down("[id=voucher_erems]").setValue(data);
                break;
                case 'getptbyuser':
                form.down("[name=pt_pt_id]").setValue(data[0]['pt_id']);
              
                break;
            case 'create':
                if (me.info.total == '0') {
                    idheader = data.idheader;
                    me.idheadervalue = idheader;
                    me.dataSaveDetaildb(idheader);
                    me.dataSaveVendordb(idheader);
                    me.dataSaveCIAdb(idheader);
                    me.messagedata = me.info.msg;
                    me.alertFormdataSuccess();
                } else {
                    me.messagedata = me.info.msg;
                    me.alertFormdataFailed();
                }
                break;
            case 'update':
                if (me.info.total == '0') {
                    idheader = data.idheader;
                    me.idheadervalue = idheader;
                    me.dataSaveDetaildb(idheader);
                    me.dataSaveVendordb(idheader);
                    me.dataSaveCIAdb(idheader);
                    me.messagedata = me.info.msg;
                    me.alertFormdataSuccess();
                } else {
                    me.messagedata = me.info.msg;
                    me.alertFormdataFailed();
                }
                break;
            case 'report':
                value = me.info.data;
                value["tgl_sekarang"] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
                me.createWindows();
                me.submitReport(value);
                break;

        }
    },
    generateTransno: function () {
        var me, form, accept_date;
        me = this;
        form = me.getFormdata();
        
        accept_date = me.formatDate(me.getVal(form, 'paymentcashier_accept_date', 'value'));
        switch (me.state) {
            case 'create':
                me.senddata = {
                    "hideparam": 'gettransnocash',
                    "project_id": apps.project,
                    "pt_id": me.pt_id,
                    "accept_date": accept_date,
                }
                me.urlrequest = me.urlcommon;
                me.AjaxRequest();
                break;
        }
    },
    setStorePtuser: function () {
        var me, store, form;
        me = this;
        form = me.getFormdata();
        store = me.getStore("Ptbyuser");
        store.reload({
            params: {
                "hideparam": 'getptbyuser',
                "project_id": apps.project,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                  me.setSuccessEvent();
                store.each(function (record)
                {
//                    if (record.data['project_id'] == apps.project && record.data['pt_id'] == apps.pt) {
//                        me.setVal(form, 'pt_id', record.data['pt_id']);
//                    }
                });
            }
        });
    },
    
    
    
    generateCoa: function (template,state,kasbank_id) {
        var me = this;
        var f = me.getFormdata();
        var g = me.getDetailcoagrid();
        var gs = me.getGriddetail();
        var totalpayment = f.down("[name=total_payment]").getValue();
        var ps = me.localStore.selectedUnit;
        if(state == 'update') {
            
            f.setLoading("Loading jurnal");
                me.tools.ajax({
                    params: {
                        template_id: 2,
                        amount:totalpayment,
                               kasbank_id:kasbank_id
                        
                    },
                    success: function(data, model) {
                      
                       g.getStore().load({
                           params:{
                               template_id:2,
                               amount:totalpayment,
                               kasbank_id:kasbank_id
                           },
                           callback: function(rec, op) {
                                f.setLoading(false);
                                g.attachModel(op);
                               me.setSumdetail();
                            }
                          
                        

                       });
                          
                        
                    }
                }).read('generatetemplatecoa');
                        
        }
        else { 
           
            if(totalpayment!== '0.00') {
                          
                 f.setLoading("Loading jurnal template");
                me.tools.ajax({
                    params: {
                        template_id: template,
                        
                    },
                    success: function(data, model) {
                       f.setLoading(false);
                      
                      
                      var data =[];
                    var dataAmount = [];
                    gs.getStore().data.each(function(record){
                    var recordArray =+ record.get("paymenttype_paymenttype_id");
                    var recordArray2 =+ record.get("payment").toFixed(2);
                    data.push(recordArray);
                    dataAmount.push(recordArray2);
                    });
                    var data_template = data.join();
                    var data_template_amount = dataAmount.join();
                       g.getStore().load({
                           params:{
                               template_id:data_template,
                               amount:totalpayment,
                               kasbank_id:me.kasbank_id,
                               amount_template:data_template_amount
                           },
                            callback : function(records, operation, success) {
                                me.setSumdetail();
                               // console.log('returned');
                            }
                       });
                          
                        
                    }
                }).read('generatetemplatecoa');      
                          
                        
               
               // g.getView().refresh();
                me.sumTotalfdar('update');
        } else {
            me.tools.alert.warning("Payment masih kosong.");
        }
    }
    },
    
    
    destroydetail: function() {
        var me = this;
        var fa = me.getFormdata();
        var g = me.getDetailcoagrid();
        //g.getStore().removeAll();
        var records = g.getSelectionModel().getSelection();
        for (var i = records.length-1; i>=0; i--) {
            var row = g.getStore().indexOf(records[i]);
            var id = records[i]['data']["coa_config_detail_id"];
            
            if(id){
                fa.deletedCoa.push(id);
            }
            
            g.getStore().removeAt(row);
            me.setSumdetail();
        
        }
   },
   
       formDataDetail: function(param) {
        var me = this;
        var fa = me.getFormdata();
        var fd = me.getFormcoadetail();
        var totalpayment = fa.down("[name=total_payment]").getValue();
        if(totalpayment !== '0.00') {
            var w = me.instantWindow('FormCoadetail', 500, 'Add detail Coa Account ', param, 'coadetailaccwininstpayment');
            var f = me.getFormcoadetail();
            f.down('[name=amount_hidden]').setValue(totalpayment);
            //f.down('[name=amount]').setValue(totalpayment);
            //f.down('[name=persen]').setValue(100);
            me.tools.ajax({
                params: {},
                success: function(data, model) {

                    me.tools.wesea(data.glcoa, f.down("[name=coa_id]")).comboBox(false);       
                    me.afterDataDetailInit(param,f);
                    f.setLoading(false);  
                }
            }).read('init');  
        } else {
            me.tools.alert.warning("Payment masih kosong.");
        }
    },
    
        afterDataDetailInit: function(param,f) {
        var me = this;
        if(param == 'update') {
            var g = me.getDetailcoagrid();
            f.kosongGa = g.getSelectedRow(); //getSelectedRow untuk ambil row yang di klik user ,hanya 1
            f.loadRecord(g.getSelectedRecord()); //getSelectedRecord fungsi extjs
        }
    },
    
       coaChange: function() {
       var me = this;
       var f = me.getFormcoadetail();
       var selected = me.tools.comboHelper(f.down("[name=coa_id]")).getField('coa_id','coa');
       var selectedName = me.tools.comboHelper(f.down("[name=coa_id]")).getField('coa_id','name');
       var selectedType = me.tools.comboHelper(f.down("[name=coa_id]")).getField('coa_id','type');
       f.down("[name=coa_name]").setValue(selectedName);
       f.down("[name=code]").setValue(selected);
       //f.down("[name=type]").setValue(selectedType);
       },
   
       savedetail: function() {
        var me = this;
        var form = me.getFormdata();
        var f = me.getFormcoadetail();
        var value = f.getValues();
        var g = me.getDetailcoagrid();
        var persen = value["persen"];
        function sums(numbers) {
        return numbers.reduce(function(a,b) {
          return a + b
        });
       }
        if(f.kosongGa > -1) {
           var rec = g.getStore().getAt(f.kosongGa); 
            if(isNaN(parseFloat(persen)) ) {
               me.tools.alert.warning("Persen Harus angka.");
               return true;
           } else {
           rec.beginEdit();
           rec.set(value);
           rec.endEdit();
                var data =[];
                g.getStore().data.each(function(record){
                 var recordArray =+ parseFloat(record.get("amount"));
                    data.push(recordArray);
                });
                 //var sum = data.reduce(function(pv, cv) { return pv + cv; }, 0);
                  var total = sums(data).toFixed(2);
                var total = Ext.util.Format.number(total, '0,000.00');
               // form.down("[name=paymentcashier_sum_amount]").setValue(total);
       }
        }
        else {
           if(isNaN(parseFloat(persen)) ) {
               me.tools.alert.warning("Persen Harus angka.");
               return true;
           }
           else {
          
//             console.log(g.getStore().data[0]['amount']);
             g.getStore().add(value);  
             var sum = 0; 
             var data =[];
                g.getStore().data.each(function(record){
                var recordArray =+ parseFloat(record.get("amount")); 
                data.push(recordArray);
                });
                
                //var sum = data.reduce(function(pv, cv) { return pv + cv; }, 0);
                var total = sums(data).toFixed(2);
                var total = Ext.util.Format.number(total, '0,000.00');
               // form.down("[name=paymentcashier_sum_amount]").setValue(total);
                
             
           }
           
        }
         me.setSumdetail();
        f.up('window').close();  
    },
   
    sumTotalfdar: function(state) {
        var me = this;
        var form = me.getFormdata();
        var f = me.getFormcoadetail();
        var g = me.getDetailcoagrid();
        
        function sums(numbers) {
        return numbers.reduce(function(a,b) {
          return a + b
        });
        }
        //console.log("Jalan");
        //if(state === 'update') {
       // g.getStore().load();
   
           if(g.getStore().getCount()!==0) {   
            var data =[];
                g.getStore().data.each(function(record){
                var recordArray =+ record.get("amount");
                data.push(recordArray);
                });
               
                var sum = data.reduce(function(pv, cv) { return pv + cv; }, 0);
               var total = sums(data).toFixed(2);
               var total = Ext.util.Format.number(total, '0,000.00');
//               form.down("[name=paymentcashier_sum_amount]").setValue(total);  
            } 
       // }
    },

    getSum: function(total,num) {
        return total + num;
    },
   
    hitungAmount: function() {
        var me = this;
        var fa = me.getFormdata();
        var fd = me.getFormcoadetail();
        var totalpayment = fa.down("[name=total_payment]").getValue();
        var persen = fd.down("[name=persen]").getValue();
        var tofix = parseFloat(totalpayment.replace(/,/g , "")).toFixed(2);
        var hasil = persen / 100 * tofix ;
        var amount = fd.down("[name=amount]").setValue(hasil.toFixed(2));
    },
    
    loadComboBoxStore: function (el) {
        var me, store, index, itemForms, result, widget, storedata, dynamicdata, xtypeform;
        me = this;

        try {
//            var itemForms = el.getForm().getFields().items;
//            for (var x in itemForms) {
//                if (itemForms[x].getXTypes().indexOf("combobox") > -1) {
//                    if (itemForms[x].getStore().storeId != "ext-empty-store") {
//                        itemForms[x].getStore().load({params: {start: 0, limit: 0}});
//                        //console.log(itemForms[x].getStore());
//                    }
//                }
//
//            }        

            //console.log(el);
            // console.log('test aja');
            itemForms = el.getForm().getFields().items;
            for (var index in itemForms) {
                xtypeform = el.getForm().getFields().items[index].xtype;
                result = xtypeform.substr(xtypeform.length - 9);

                if (result.indexOf("combogrid") > -1) {
                    widget = Ext.widget(xtypeform);
                    store = widget.store.storeId;
                    dynamicdata = widget.dynamicdata;
                    // console.log(me.getStore(store).load());
                    //if(dynamicdata < 1){
                    me.getStore(store).load();
                    //}                   
                }

                if (result.indexOf("combobox") > -1) {
                    widget = Ext.widget(xtypeform);
                    store = widget.store.storeId;
                    dynamicdata = widget.dynamicdata;
                    //console.log(me.getStore(store).load());
                    //if(dynamicdata < 1){
                    me.getStore(store).load();
                    //}    
                }
            }
//                     
//            Ext.each(me.stores, function (item, index) {
//                if(index > 0){
//                     store = me.getStore(item);
//                     store.load();
//                }               
//            });
        } catch (err) {
            //console.log(err);
        }
    },
    
    setSumIntransaction: function (store) {
        var me, form, amountheader, sum,total;
        me = this;
        form = me.getFormdata();
        if (me.is_out == '0') {
            amountheader = accounting.unformat(form.down('[name=total_payment]').getValue());
        } else {
            amountheader = 0;
        }     
        sum = 0;
        store.each(function (record, index) {                   
              if(record.get('type')=='I'){
                   sum+=record.get('amount');
            }
        }); 
        total = parseFloat(amountheader) + parseFloat(sum);
        return total;
    },    
    setSumOuttransaction: function (store) {
        var me, form, amountheader,sum,total,store;
        me = this;
        form = me.getFormdata();
       
        if (me.is_out == '0') {
            amountheader = accounting.unformat(form.down('[name=total_payment]').getValue());
        } else {
            amountheader = 0;
        }
      
        sum = 0;
        store.each(function (record, index) {
            
            if(record.get('type')=='O'){                
                sum+=record.get('amount');
            }
        });      
        total = parseFloat(amountheader) + parseFloat(sum);
        return total;
    },     
    setTotaldetail: function (store) {
        var me, form, amountheader, sum_in, sum_out, total;
        me = this;
        sum_in = sum_out = 0;
        store.each(function (record, index) {
            console.log(record.get('amount'));
            if (record.get('type') == 'I') {
                sum_in += record.get('amount');
            }
            if (record.get('type') == 'O') {
                sum_out += record.get('amount');
            }
        });

        if (me.is_out == '0') {
             total = parseFloat(sum_out) - parseFloat(sum_in);
        }else{
            total = parseFloat(sum_in) - parseFloat(sum_out);
        }
       
        return total;

    }, 		

    setSumdetail: function () {
        var me, store, form, totalheader, totaldetail, balance, msgdata, status, voucher_no, stateform = '';
        me = this;
        form = me.getFormdata();
        store = me.getDetailcoagrid().getStore();
        //store.clearFilter(true);
        stateform = form.up('window').state.toLowerCase();
        totalheader = accounting.unformat(form.down('[name=total_payment]').getValue());



	total_in = me.setSumIntransaction(store);
        total_out = me.setSumOuttransaction(store);     
        
     
        
        totaldetail = me.setTotaldetail(store);


//        if (totaldetail < 1 && stateform == 'update') {
//            totaldetail = me.paramcoadetail.totaldetail;
//        }

        voucher_no = (form.down('[name=voucher_no]').getValue() == 'undefined') ? 'test' : form.down('[name=voucher_no]').getValue();
        balance = totalheader - totaldetail;
//        if(me.is_out == '0') {
//             balance = (parseFloat(total_in)-parseFloat(total_out)); 
//        }
//        else {
//           balance = (parseFloat(total_out)-parseFloat(total_in));
//        }


        me.setValue(me, 'totaldetail', accounting.formatMoney(totaldetail));
        me.setValue(me, 'totalheader', accounting.formatMoney(totalheader));
        me.setValue(me, 'balance', accounting.formatMoney(balance));

  
       
        me.formatCurrencyFormdata(me, form);
    },

     unformatCurrencyFormdata: function (controller, form) {
        var me, form, itemform, xtypeform, widget, itemname, oldvalue, newvalue;
        me = controller;
        itemform = form.getForm().getFields().items;
        for (var index in itemform) {
            xtypeform = form.getForm().getFields().items[index].xtype;
            if (xtypeform == 'xmoneyfield') {
                itemname = form.getForm().getFields().items[index].name;
                oldvalue = form.down("[name=" + itemname + "]").getValue();
                newvalue = accounting.unformat(oldvalue);
                form.down("[name=" + itemname + "]").setValue(newvalue);
            }
        }
    },
    formatCurrencyFormdata: function (controller, form) {
        var me, form, itemform, xtypeform, widget, itemname, oldvalue, newvalue, paramform;
        me = controller;
        itemform = form.getForm().getFields().items;
        for (var index in itemform) {
            xtypeform = form.getForm().getFields().items[index].xtype;
            if (xtypeform == 'xmoneyfield') {
                itemname = form.getForm().getFields().items[index].name;
                oldvalue = form.down("[name=" + itemname + "]").getValue();
                newvalue = accounting.formatMoney(oldvalue);
                form.down("[name=" + itemname + "]").setValue(newvalue);
            }
        }
    },
    setLower: function (controller, selector) {
        var value = this.getValue(controller, selector, 'value');
        this.setValue(controller, selector, value.toLowerCase());
    },
    setValue: function (controller, selector, value) {
        controller.getFormdata().down("[name=" + selector + "]").setValue(value);
    },
    
});