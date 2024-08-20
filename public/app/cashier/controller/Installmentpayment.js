Ext.define('Cashier.controller.Installmentpayment', {
    extend: 'Cashier.library.template.controller.Controller2',
    alias: 'controller.Installmentpayment',
    requires: [
        'Cashier.library.ModuleTools',
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
    views: ['installmentpayment.Panel', 'installmentpayment.Grid', 'installmentpayment.FormSearch', 'installmentpayment.FormData', 'installmentpayment.PaymentDetailGrid'],
    stores: [
         'Deptprefixcombo',
         'Ptbyuser',
         'Grouptransaction'
        
    ],
    refs: [
        {
            ref: 'grid',
            selector: 'installmentpaymentgrid'
        },
        {
            ref: 'formsearch',
            selector: 'installmentpaymentformsearch'
        },
        {
            ref: 'formdata',
            selector: 'installmentpaymentformdata'
        },
        {
            ref: 'tagihangrid',
            selector: 'installmentpaymentpaymentdetailgrid'
        },
        {
            ref: 'panel',
            selector: 'installmentpaymentpanel'
        },
        {
            ref: 'forminvi',
            selector: 'installmentpaymentformdatainvisible'
        },
        {
            ref: 'formdos',
            selector: 'installmentpaymentdospreviewformdata'
        },
        {
            ref: 'detailcoagrid',
            selector: 'installmentpaymentcoadetailgrid'
            
        },
        {
            ref: 'formcoadetail',
            selector: 'installmentpaymentformcoadetail'
        }
    ],
    controllerName: 'installmentpayment',
    templateCoa:'1', //1 installment payment sesuai ID table mh_coa_config cashier
    templateModuleName:'Installment Payment', 
    is_out:0, //jika TRANSAKSI OUT 1. JIKA IN 0
    fieldName: 'payment_id',
    formWidth: 800,
    fillForm: null,
    unitFormula: null,
    paymentFunc: null,
    browseHandler: null,
    sumTagihan: 0,
    urlcommon: 'cashier/common/create',
    urlrequest: 'cashier/tcash/create',
    urlheader: 'cashier/tcash/',
    urldetail: 'cashier/tcash/coadetail',
    urlvendor: 'cashier/tcash/vendor',
    urlcia: 'cashier/tcash/outtransbon',
    dateNow: new Date(),
    flaggeneratevoucherno: 0,
    prefix_voucher:null,
    prefix:null,
    state: null,
    accept_date: null,
    pt_id: 0,
    kasbank_id : 0,
    storeProcess: 'Installmentpaymentdetail',
    stData: {},
    bindPrefixName: 'Installmentpayment',
    localStore: {
        selectedUnit: null,
        customer: null,
        price: null,
        detail: null
    },
    tagihanDefaultValue: false,
    tools: null,
    myConfig: null,
    cbf: null,
    mt: null,
    stList: null, // list of schedule type
    effectedSch: [], // list schedule id yang dibayar
    formxWinId: 'win-instalpaymentwinId',
    paymentId: 0,
    myParams: null,
    constructor: function(configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Cashier.library.box.Config({
            _controllerName: me.controllerName
        });

        me.cbf = new Cashier.template.ComboBoxFields();
    },
    xyReport: null,
    printOutData: null,
    globalParams: null,
    globalParamsForm: null,
    selectedPurchaseletter:null,
    init: function(application) {
        var me = this;

        me.tools = new Cashier.library.box.tools.Tools({config: me.myConfig});
        var events = new Cashier.library.box.tools.EventSelector();

        this.control({
            'installmentpaymentpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'installmentpaymentgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'installmentpaymentgrid toolbar button[action=create]': {
                click: function() {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'installmentpaymentgrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'installmentpaymentgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'installmentpaymentgrid toolbar button[action=print]': {
                click: this.mainPrint
            },
            'installmentpaymentgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'installmentpaymentformsearch button[action=search]': {
                click: this.dataSearch
            },
            'installmentpaymentformsearch button[action=reset]': {
                click: this.dataReset
            },
            'installmentpaymentformdata': {
                afterrender: this.formDataAfterRender,
                boxready:function(){
                    var me;
                    me=this;
                   
                }

            },
            'installmentpaymentformdata button[action=save]': {
                click: this.mainDataSave
            },
            'installmentpaymentformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'installmentpaymentformdata button[action=fullpayment]': {
                click: function() {
                    me.fullPayment();
                }
            },
            'installmentpaymentformdata button[action=browse_unit]': {
                click: me.selectUnitGridShow
            },
            'installmentpaymentformdata textfield[name=admin_fee]': {
                keyup: function() {
                    me.hitungTotalPayment();
                }
            },
            'installmentpaymentformdata textfield[name=receipt_no]': {
                keyup: function() {
                    me.receiptNoOnKeyUp();
                }
            },
            'installmentpaymentformdata datefield[name=payment_date]': {
                select: function() {
                    me.paymentDateOnChange();
                }
            },
            'installmentpaymentformdata datefield[name=cair_date]': {
                select: function() {
                    me.paymentCairDateOnChange();
                }
            },
            'installmentpaymentformdata [name=paymentmethod_paymentmethod_id]': {
                select: function() {
                    me.paymentmethodOnChange();
                }
            },
            'installmentpaymentformdata [name=payment]': {
                blur: function(el) {
                    me.paymentTextFieldOnBlur();
                }

            },
            'installmentpaymentformdata [name=adm_fee]': {
                keyup: me.hitungTotalPayment

            },
            'installmentpaymentformdata [name=is_reference_rejected]': {
                change: me.checkReference

            },
            'installmentpaymentformdata [name=cdn]': {
                change: function() {
                    me.paymentTextFieldOnBlur();
                },
                

            },
            'installmentpaymentunitgrid button[action=select]': {
                click: this.unitSelect
            },
            'installmentpaymentgrid button[action=printx]': {
                click: this.showPdf
            },
            'installmentpaymentgrid button[action=printvoucher]': {
                click: this.showVoucherPdf
            },
            'installmentpaymentformdata [name=reference_no]': {
                blur: function() {
                    me.generateNote();
                }

            },
            'installmentpaymentgrid button[action=fontselect]': {
                click: this.showFontPdf
            },
            'installmentpaymentgrid button[action=printhtml]': {
                click: this.showPrintHtml
            },
            'installmentpaymentgrid button[action=printdos]': {
                click: this.showPrintDosPreview
            },
            'installmentpaymentdospreviewformdata button[action=print]': {
                click: this.printDos
            },
            'installmentpaymentformsearch [name=cluster_id]': {
                select: function() {
                    me.searchClusterOnSelect();
                }
            },
            'installmentpaymentformdata [name=paymentcashier_prefix_id] ': {
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
            'installmentpaymentformdata [name=paymentcashier_prefix_id_bank] ': {
                'select': function (g, record, item, index, e, eOpts) {
                   
                    var me, rowdata, form, countlength;
                    me = this;
                    form = me.getFormdata();
                    rowdata = record[0]['data'];
                    form.down("[name=paymentcashier_thcoa_id]").setValue(rowdata.coa_id);
                    form.down("[name=paymentcashier_voucherprefix_id]").setValue(rowdata.prefix_id);
                    //console.log(rowdata);
                    me.is_fixed = rowdata.is_fixed;
                    me.fixed_coa_id = rowdata.fixed_coa_id;
                    me.fixed_coa = rowdata.fixed_coa;
                    me.fixed_account_desc = rowdata.fixed_account_desc;
                    me.prefix_voucher = rowdata.temp_prefix;
                    me.prefix = rowdata.prefix;
                    countlength = me.fixed_coa.length;
                    me.generateVouchernoBank();

                },
            },
            'installmentpaymentformdata [name=paymentcashier_accept_date] ': {
                'change': function (that, newValue, oldValue, eOpts) {
                    var form = me.getFormdata();
                    me.accept_date = me.formatDate(form.down('[name=paymentcashier_accept_date]').getValue());
                   // me.setValue(me, 'kasbank_date', me.accept_date);
                    me.generateTransno();
                },
            },//
            'installmentpaymentformdata [name=pt_id] ': {
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
            'installmentpaymentformdata [name=paymentcashier_kasbank] ': {
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
                         //me.tools.alert.warning("Pilih unit terlebih dahulu");
                         form.down("[name=paymentcashier_kasbank]").reset();
                    }
                    
                },
            },
            'installmentpaymentcoadetailgrid toolbar [action=generate]' : {
                click: function () {
                    me.generateCoa(me.templateCoa);
                }
                
            },
             'installmentpaymentcoadetailgrid toolbar button[action=destroy]' : {
                click: function(el, act) {
                    me.destroydetail();
                }
                
            },
             'installmentpaymentcoadetailgrid toolbar [action=create]' : {
               click: function(el, act) {
                    me.formDataDetail('create');
                }
                
            },
             'installmentpaymentcoadetailgrid toolbar [action=update]' : {
               click: function(el, act) {
                    me.formDataDetail('update');
                }
                
            },
             'installmentpaymentformcoadetail [name=coa_id]' : {
              select: function() {
                    me.coaChange();
                }
                
            },
            'installmentpaymentformcoadetail button[action=save]': {
                click: function(el, act) {
                    me.savedetail();
                }
            },
            
            'installmentpaymentformcoadetail textfield[name=persen]': {
                blur: function(el, act) {
                    me.hitungAmount();
                }
            },
           
            
        });
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
    showPrintDos:function(){


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
                    
                    window.open(url);

                }


            }
        }).read('printdos');
    },
    showPrintHtml:function(){
       var me = this;
       
       var data = {
          customer:'NAMA CUSTOMER' ,
          terbilang:'CONTOH TERBILANG',
          note:'TEST NOTE',
          amount:'',
          
       };
       
       var html = "";
       html += '<table>'+
  '<tr>'+
    '<td>&nbsp;</td>'+
    '<td colspan="2" height="115">&nbsp;</td>'+
  '</tr>   '+
  '<tr>'+
    '<td width="150">&nbsp;</td>'+
    '<td colspan="2" height="55" width="300">'+ data['customer']+'</td>'+
  '</tr>';
                        
                       
                           
                            html +='<tr>'+
                                    '<td width="150">&nbsp;</td>'+
                                    '<td colspan="2" height="50"  width="400">'+data['terbilang']+'</td>'+
                                    '</tr>';
                        
                        
                            html +='<tr>'+
                                    '<td width="150">&nbsp;</td>'+
                                    '<td colspan="2" height="80" width="400">'+data['note']+'</td>'+
                                   '</tr>';
                        




                        
  html +=' <tr>'+
    '<td width="80">&nbsp;</td>'+
    '<td width="380" height="43">' +data['amount']+'</td>'+
       '<td>'+data['date']+'</td>'+
  '</tr>';
  
  
 
  
 
  
html +='</table>';
       
       
      
        var mywindow = window.open('', 'PRINT', 'height=400,width=600');
      

        mywindow.document.write('<html><head><title>Print Kwitansi</title>');
        mywindow.document.write('</head><body >');
        //  mywindow.document.write('<h1>' + document.title + '</h1>');
      //   mywindow.document.write(document.getElementById(elem).innerHTML);
        mywindow.document.write(html);
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/
        setTimeout(window.close, 10);
    },
    showFontPdf:function(){
        var me = this;
        var p = me.getPanel();

        p.setLoading("Please wait..");

        me.tools.ajax({
            params: {},
            success: function(data, model) {

                p.setLoading(false);
                var url = data['others'][0][0]['URL'];
                //   var display = data['others'][0][0]['DISPLAY'];
                if (url) {
                    
                    window.open(url);

                }


            }
        }).read('fontpdf');
    },
    paymentCairDateOnChange: function() {
        var me = this;
        me.paymentTextFieldOnBlur();
    },
    directPrint: function() {
        var me = this;
        var p = me.getPanel();

        var rec = me.getGrid().getSelectedRecord();
        if (!rec) {
            return false;
        }




        var myWindow = window.open('', '', 'width=400,height=200');
        myWindow.document.write("<a href='" + document.URL + "app/erems/uploads/pdf/kwitansipayment/payment_1_1.pdf' target='blank'>Download file</a>");
        myWindow.focus();


        return true;


        p.setLoading("Please wait..");
        me.tools.ajax({
            params: {
                payment_id: rec.get('payment_id')
            },
            success: function(data, model) {

                //console.log(data);


                p.setLoading(false);



            }
        }).read('printpdf');


    },
    showPdfOld: function() {
        var me = this;
        var p = me.getPanel();
        p.setLoading("Please wait..");
        var rec = me.getGrid().getSelectedRecord();
        if (!rec) {
            return false;
        }

        me.tools.ajax({
            params: {
                payment_id: rec.get('payment_id')
            },
            success: function(data, model) {




                p.setLoading(false);
                var url = data['others'][0][0]['URL'];
                var display = data['others'][0][0]['DISPLAY'];
                if (url) {

                    var myWindow = window.open('', '', 'width=600,height=300');
                    var html = "<div style='margin-bottom:10px;border:1px solid black;'>" + display['name'] + "</div>";
                    html += "<div style='margin-bottom:10px;border:1px solid black;'>";
                    for (var i in display['terbilang']) {
                        html += "<div>" + display['terbilang'][i] + "</div>";
                    }
                    html += "</div>";
                    html += "<div style='margin-bottom:10px;border:1px solid black;'>";
                    for (var i in display['note']) {
                        html += "<div >" + display['note'][i] + "</div>";
                    }
                    html += "</div>";
                    html += "<div style='margin-bottom:10px;border:1px solid black;'>" + display['amount'] + "</div>";
                    html += "<div style='margin-bottom:10px;border:1px solid black;'>" + display['date'] + "</div>";
                    myWindow.document.write("<a href='" + url + "' target='blank'>Download file</a><br/>" + html);
                    myWindow.focus();


                }


            }
        }).read('printpdf');

    },
    showVoucherPdf: function() {
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
                    window.open(url);

                }


            }
        }).read('printvoucherpdf');

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

                    /*
                     
                     
                     
                     */
                    window.open(url);

                }


            }
        }).read('printpdf');

    },
    receiptNoOnKeyUp: function() {
        var me = this;
        var f = me.getFormdata();
        f.down("[name=payment_no]").setValue(f.down("[name=receipt_no]").getValue());
    },
    paymentDateOnChange: function() {
        var me = this;
        var f = me.getFormdata();
        var v = f.down("[name=payment_date]").getValue();
        f.down("[name=duedate]").setValue(v);
        f.down("[name=cair_date]").setValue(v);
    },
    // added 26 Mei 2015
    tempTagihan: null,
    fullPayment: function() {
        var me = this;
        var f = me.getFormdata();
        var s = me.getTagihangrid().getStore();
        var lastAmount = 0;
        if (!me.tempTagihan) {
            me.tempTagihan = {};
            for (var i = 0; i < s.getCount(); i++) {
                me.tempTagihan[i] = s.getAt(i).data;
            }

        }

        for (var i = 0; i < s.getCount(); i++) {
            var rec = s.getAt(i);
            rec.reject();
        }



        for (var i = 0; i < s.getCount(); i++) {
            if (s.getAt(i).get('remaining_balance') > 0 && lastAmount === 0) {
                lastAmount = s.getAt(i).get('remaining_balance');
            }
        }
        f.down("[name=payment]").setValue(accounting.formatMoney(lastAmount));
        me.paymentTextFieldOnBlur();
        //;
    },
    /// added 27 February 
    paymentmethodOnChange: function() {

        var me = this;
        var f = me.getFormdata();
        var selected = f.down("[name=paymentmethod_paymentmethod_id]").getValue();
        var pDate = f.down("[name=payment_date]").getValue();
        var ad = null;
        var bd = null;
        /*if (selected === me.myParams.cash) {
         ad = new Date();
         bd = new Date();
         } else {
         ad = '';
         bd = '';
         }
         */

        ad = pDate;
        bd = pDate;

        f.down("[name=cair_date]").setValue(ad);
        f.down("[name=duedate]").setValue(bd);

    },
    /*@implement this method for xyReport Class*/
    xyReportProcessParams: function(reportData) {
        var me = this;
        var groupBy = reportData.params["Groupby"];
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
                    //console.log(data);
                    me.printOutData = data['others'][0][0]['DATA'];
                    //console.log(me.printOutData);
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
                // global params
                me.globalParams = data['others'][0][0]['GLOBALPARAMSPARAMS'];

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
        var sg = me.getTagihangrid();
        var f = me.getFormdata();
        var g = me.getDetailcoagrid();
        var payment = accounting.unformat(f.down("[name=payment]").getValue());
        var row =[];
        var vs = f.getValues();
        var cdn = vs["cdn"];
        var ok = 0;
        var balance = f.down("[name=balance]").getValue();
        if(me.state=='update') {
            ok=1;
        }
        
           
            var lebih = payment - me.sumTagihan;
            if(me.state=='create') {
            if(sg.getStore().getCount()<0) {
                 me.tools.alert.warning("Tidak ada schedule yang harus dibayar");
            }
            else if(me.sumTagihan === 0) { //
                me.tools.alert.warning("Tidak ada tagihan lagi yang harus dibayar");
            }
            else if(payment === 0) {
                me.tools.alert.warning("Silahkan isi payment terlebih dahulu");
            }
            else  if(g.getStore().getCount() == 0) {
                me.tools.alert.warning("Detail jurnal masih kosong, silahkan generate template atau isi detail jurnal");
            }
            else if(balance !== '0.00') {
                me.tools.alert.warning("Detail jurnal belum balance");
            }
            else if(payment > me.sumTagihan) {
              
                if(cdn == '3') {
                    me.tools.alert.warning("Kelebihan bayar "+accounting.formatMoney(lebih));
                }
                else {
                    ok = 1;  
                }
                
            } 
            else {
                 ok = 1;
            }
            }
            
            if(ok === 1) {
            me.insSave({
            form: me.getFormdata(),
            grid: me.getGrid(),
            store: me.localStore.detail,
            finalData: function(data) {
                data["purchaseletter_purchaseletter_id"] = data["purchaseletter_id"];
                data["payment"] = accounting.unformat(data["payment"]);
                data["admin_fee"] = accounting.unformat(data["admin_fee"]);
                data["detail"] = me.tools.gridHelper(me.getTagihangrid()).getJson();
                data["paymentmethod_paymentmethod_id"] = me.getFormdata().down("[name=paymentmethod_paymentmethod_id]").getValue();
                data["detailcoa"] = me.getDetailcoagrid().getJson(); 
                data["deletedCoa"] = me.getFormdata().deletedCoa;
                data["is_out"] = me.is_out;
                data["prefix_voucher"] = me.prefix_voucher;
            //console.log(data);
                return data;
            },
                sync: true,
                callback: function(success) {
                   ok = 0;
                }
            });
            }
        
            
       
            
       
    },
    hitungTotalPayment: function() {
        var me = this;
        var f = me.getFormdata();
        var total = 0;
        var adminFee = accounting.unformat(f.down("[name=admin_fee]").getValue());
        var totalPay = accounting.unformat(f.down("[name=payment]").getValue());
        total = adminFee + totalPay;
        f.down("[name=total_payment]").setValue(accounting.formatMoney(total));
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
               
               // me.tools.wesea(records, form.down("[name=paymentmethod_paymentmethod_id]")).comboBox();
//               var prefixselected = me.tools.comboHelper(form.down("[name=paymentcashier_prefix_id]")).getField('prefix_id','coa');
//               form.down("[name=paymentcashier_prefix_id]").setValue(prefixselected);
            }
              //form.down('[name=paymentcashier_prefix_id]').setValue();
            }
        });
    },
    setStorePrefixBank: function (bank) {
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
                if(bank) {
                   
                      var prefixselecteds = me.tools.comboHelper(form.down("[name=paymentcashier_prefix_id_bank]")).getField('prefix_id','coa');
                         form.down("[name=paymentcashier_prefix_id_bank]").setValue(prefixselecteds);
              
                } 
                
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
                       

                });
            }
        });
    },
    readtemplatemodelcreate: function() {
        var me = this;
        me.tools.ajax({
            params: {},
            success: function(data, model) {     
            }
        }).read('init'); 
    },
    fdar: function() {
        var me = this;
        var f = me.getFormdata();
        
        
        me.loadComboBoxStore();
        me.mt = new Cashier.library.ModuleTools();
        f.down("[name=is_out]").setValue(me.is_out);
        //alert( f.down("[name=is_out]").getValue());
        //
        var x = {
            init: function() {
                me.setActiveForm(f);
                var sg = me.getTagihangrid();
                sg.doInit();

                me.localStore.detail = me.instantStore({
                    id: me.controllerName + 'IPDetailStore',
                    extraParams: {
                        mode_read: 'maindetail'
                    },
                    idProperty: 'payment_id'
                });

                /*  var cb = ["paymentmethod_paymentmethod_id"];
                 for (var c in cb) {
                 f.down("[name=" + cb[c] + "]").bindPrefixName = me.controllerName;
                 f.down("[name=" + cb[c] + "]").doInit(true, function() {
                 f.setLoading(false);
                 
                 });
                 }*/

            },
            create: function() {
            var state = 'create';
            me.state = null;
            me.state = 'create';
            me.setStorePtuser();
            f.down("[name=paymentcashier_accept_date]").setValue(me.dateNow);
            me.prefix_voucher = null;
            //me.readtemplatemodelcreate();
            f.deletedRows = [];
            f.deletedCoa = [];
                me.tools.ajax({
                    params: {
                        // purchaseletter_id: plId
                    },
                    success: function(data, model) {

                        me.fillFormComponents(data, f);

                        me.globalParamsForm = data['others'][0][0]['GLOBALPARAMS'];

                        me.myParams = {
                            'cash': data['others'][0][0]['PAYMENTMETHOD_CASH'],
                            'ptname': data['others'][0][0]['PT_NAME'],
                            'paymentteks': data['others'][0][0]['PAYMENT_TEKS']
                        };

                        me.stList = data.scheduletype.data;
                        // me.tools.wesea(data.schedule, me.getSchedulegrid()).grid();

                        me.localStore.detail.load({
                            params: {
                                payment_id: 0
                            },
                            callback: function(rec, op) {
                                me.attachModel(op, me.localStore.detail, false);

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
                var state = 'update';
                var kasbank_id = 0;
                var paymentId = 0;
                var isBank = null;
                me.state = null;
                 me.state = 'update';
                me.setStorePtuser();
                f.deletedCoa = [];
                
                me.prefix_voucher = null;
                //console.log(me.getGrid().getSelectedRecord());
                if (me.getGrid()) {
                    paymentId = me.getGrid().getSelectedRecord().get("payment_id");
                    me.paymentId = paymentId;
                    kasbank_id = me.getGrid().getSelectedRecord().get("paymentcashier_th_kasbank_id");
                    f.editedRow = me.getGrid().getSelectedRow();
                    isBank = me.getGrid().getSelectedRecord().get("paymentcashier_kasbank");
                } else {
                    paymentId = me.paymentId;
                    kasbank_id = me.kasbank_id;
                }
                
                //f.down("button[action=save]").setDisabled(true);
                f.deletedRows = [];
                /// disable components
                var vs = f.getForm().getValues();
                for (var i in vs) {
                    var el = f.down("[name=" + i + "]");
                    if (el) {
                        el.setReadOnly(true);
                    }
                }
                f.down("[name=paymentmethod_paymentmethod_id]").setReadOnly(true);
                f.down("[name=is_referencerejected]").setReadOnly(true);
                f.down("[name=denda]").setReadOnly(true);
                f.down("[name=total_payment]").setReadOnly(true);
                f.down("#cdnID").setReadOnly(true);
                f.down("[name=note]").setReadOnly(false);
                f.down("[name=receipt_no]").setReadOnly(false);
                //
                /// end disable components


                /// enable due date dan tanggal cair
                /// added 1 Juni 2016
                f.down("[name=duedate]").setReadOnly(false);
                f.down("[name=cair_date]").setReadOnly(false);
                f.down("[name=reference_no]").setReadOnly(false);



                me.tools.ajax({
                    params: {
                        // purchaseletter_id: plId
                    },
                    success: function(data, model) {

                        me.myParams = {
                            'cash': data['others'][0][0]['PAYMENTMETHOD_CASH'],
                            'ptname': data['others'][0][0]['PT_NAME'],
                            'paymentteks': data['others'][0][0]['PAYMENT_TEKS']
                        };

                        me.globalParamsForm = data['others'][0][0]['GLOBALPARAMS'];

                        me.fillFormComponents(data, f);
                        me.stList = data.scheduletype.data;
                        
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
                                /*  var sg = me.getTagihangrid();
                                 sg.getStore().load({
                                 params: {
                                 payment_id: paymentId,
                                 data_request: "paymentdetail"
                                 },
                                 callback: function(rec, op) {
                                 sg.attachModel(op);
                                 }
                                 });*/
                                f.setLoading("Loading schedule...");
                                me.tools.ajax({
                                    params: {
                                        payment_id: paymentId,
                                    },
                                    success: function(data, model) {


                                        me.tools.wesea({
                                            data: data,
                                            model: model
                                        }, me.getTagihangrid()).grid();

                                        f.down("[name=payment_id]").setValue(paymentId);
                                        f.setLoading(false);

                                    }
                                }).read('tagihanpayment');
                                f.down("[name=note]").setValue(rec.get("note"));

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

                                // add 20170206
                                var paymentMethodPencairan = me.tools.intval(data['others'][0][0]['PAYMENTMETHOD_PENCAIRAN']);
                               // console.log(rec);
                                if(rec.get("paymentmethod_paymentmethod_id")===paymentMethodPencairan){
                                    f.down("[name=cair_date]").setReadOnly(true);
                                    f.down("[name=duedate]").setReadOnly(true);
                                     f.down("[action=fullpayment]").setDisabled(true);
                                }

                                //add by david
                                var ied     = data['others'][0][0]['INSTALLMENT_EDIT_DATE'];
                                var pmethod = f.down("[name=paymentmethod_paymentmethod_id]").getValue();

                                // 5 = pencairan
                                if(ied==1 && pmethod==5){
                                    f.down("[name=cair_date]").setReadOnly(false);
                                    f.down("[name=duedate]").setReadOnly(false);
                                    f.down("[action=fullpayment]").setDisabled(false);         
                                }
                                //end by david
                       if(kasbank_id) {
                          me.generateCoa(me.templateCoa,state,kasbank_id,paymentId);   
                       }
                       
                   
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
                            me.setStorePrefixBank('update');
                          
                        }
                        
                       
                         
                      
                            if(isBank === 'BANK') {
                           me.fieldHide(me, 'paymentcashier_prefix_id', true);
                           me.fieldShow(me, 'paymentcashier_prefix_id_bank', true); 
                           me.fieldShow(me, 'paymentcashier_chequegiro_no', true); 
                           me.fieldShow(me, 'paymentcashier_chequegiro_date', true); 
                           f.down("[name=paymentcashier_prefix_id_bank]").setReadOnly(false);
                           f.down("[name=paymentcashier_grouptrans_id]").setReadOnly(false);
                           //f.down("[name=voucher_no]").setValue('');
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
                       
                       // 
                       // 
                                    
                                    
                            }
                        });
                        
                     


                        f.setLoading(false);
                    }
                }).read('detail');



            }
        };
        return x;
    },
    fillFormComponents: function(data, form) {
        var me = this;
        me.tools.wesea(data.paymentmethod, form.down("[name=paymentmethod_paymentmethod_id]")).comboBox();

    },
    generateNote: function() {
        var me = this;

        var stText = '';
        /// get list schedule type yang dibayar
        var s = me.getTagihangrid().getStore();
        var pay = 0;
        var rb = 0;
        var rbNew = 0;
        var payBaru = 0;
        var a = 0; // amount
        for (var i in me.effectedSch) {
            var rec = s.getAt(me.effectedSch[i]);
            var addText = "";
            pay = 0;
            rb = 0;
            //console.log(rec);
            if (rec) {
                payBaru = me.tools.floatval(rec.get("payment_payment"));
                rbNew = me.tools.floatval(rec.get("remaining_balance"));
                a = me.tools.floatval(rec.get("amount"));





                /// jika dia membayar tapi tidak melunasi maka TAMBAHAN SEBAGIAN
                /// jika dia membayar full dari 0 maka tidak ada text [x]
                // jika dia membayar full yang sudah terbayar maka TAMBAHAN
                // jika dia membayar tapi tidak melunasi dari yang sudah terbayar makan SEBAGIAN


                // cek nilai tagihan sebelum edit
                // console.log( me.tagihanDefaultValue);
                for (var j in me.tagihanDefaultValue) {
                    if (me.tagihanDefaultValue[j]['id'] === rec.get("schedule_id")) {
                        pay = me.tagihanDefaultValue[j]['pay'];
                    }
                }




                if (rbNew === 0) {
                    if (pay === 0) {
                        addText = "";

                    } else {
                        addText = me.myParams.paymentteks.TAMBAHAN;
                    }

                } else {
                    if (pay === 0) {
                        addText = me.myParams.paymentteks.SEBAGIAN;
                    } else {
                        addText = me.myParams.paymentteks.TAMBAHAN_SEBAGIAN;
                    }

                }


                stText += addText + " " + rec.get("scheduletype_description") + " " + rec.get("termin") + ", ";

            }

        }
        var f = me.getFormdata();

        var isAddReferenceToNote = me.tools.intval(me.globalParamsForm.PAYMENT_REFERENCENO_ADDTONOTES);

        //paymentmethod_paymentmethod_id
        var str = ' ' + stText + ' ';
        str += ' ' + f.down("[name=type_name]").getValue();
        str += ' ' + me.tools.comboHelper(f.down("[name=paymentmethod_paymentmethod_id]")).getText(me.cbf.paymentmethod) + ' . ';
        if (isAddReferenceToNote > 0) {
            str += ' ' + f.down("[name=reference_no]").getValue() + ' ';
        }
        str += ' ' + me.getDateString(f.down("[name=payment_date]").getValue()) + ' ';
        str += ' Rp. ' + accounting.formatMoney(f.down("[name=payment]").getValue()) + ',- ';
        str += ' ' + f.down("[name=cluster_cluster]").getValue();
        str += ' ' + f.down("[name=unit_unit_number]").getValue();
        str += ' ' + me.selectedPurchaseletter.pt_name;

        f.down("[name=note]").setValue(str);

    },
   
    getDateString: function(date) {
        var d = new Date(date);
        var str = '';
        str += d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
        return str;
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
    paymentTextFieldOnBlur: function() {
        var me = this;
        var f = me.getFormdata();
        if (f.editedRow > -1) { // just for add new record
            return false;
        }
        var pay = toFloat(f.down("[name=payment]").getValue());

        var s = me.getTagihangrid().getStore();
        var jt = s.getCount(); // jumlah tagihan
        var sisa = 0;
        var payValue = 0; /// nilai payment di grid
        var flagTry = false;
        var lastRow = -1;
        me.effectedSch = []; // reset list schedule id yang dibayar
        var totalDenda = 0;
        if (jt > 0) { /// jika ada nilai payment dan ada tagihan

            //tagihanDefaultValue

            if (!me.tagihanDefaultValue) {
                me.tagihanDefaultValue = [];
                for (var i = 0; i < jt; i++) {
                    me.tagihanDefaultValue.push({
                        rb: me.xFormatFloat(s.getAt(i).get("remaining_balance")),
                        pay: me.xFormatFloat(s.getAt(i).get("payment_payment")),
                        denda: me.xFormatFloat(s.getAt(i).get("denda")),
                        id: me.tools.intval(s.getAt(i).get("schedule_id")),
                    });
                }

            } else {
                flagTry = true;
            }


            for (var i = 0; i < jt; i++) {





                var rec = s.getAt(i);







                var rb = flagTry ? me.tagihanDefaultValue[i]["rb"] : me.xFormatFloat(rec.get("remaining_balance"));


                payValue = 0;

                var payTagihan = 0;
                if (pay > 0) {
                    if (rb > pay) {


                        rb = rb - pay;
                        payValue = pay;
                        pay = 0;

                    } else {

                        payValue = rb;
                        pay = pay - rb;
                        rb = 0;
                    }
                    if (me.tools.floatval(me.tagihanDefaultValue[i]["rb"]) > 0) {
                        me.effectedSch.push(i);
                        lastRow = i;
                    }


                }

                var finalPay = me.tagihanDefaultValue[i]["pay"];
                var finalRb = me.tagihanDefaultValue[i]["rb"];
                var denda = 0;



                payValue = me.xFormatFloat(payValue);
                // update grid
                //if (payValue > 0 || (payValue == 0 && rb == 0)) {
                if (payValue > 0 || (payValue == 0 && rb == 0)) {
                    finalPay = payValue + me.tagihanDefaultValue[i]["pay"];
                    finalRb = rb;
                    denda = me.hitungDenda(payValue, rec, f.down("[name=cair_date]").getValue(), me.tagihanDefaultValue[i]["denda"]);

                } else {
                    denda = me.tagihanDefaultValue[i]["denda"];
                }




                totalDenda += denda;


                rec.beginEdit();
                rec.set({
                    payment_payment: finalPay,
                    remaining_balance: finalRb,
                    denda: denda
                });
                rec.endEdit();
                rec = null;



            }




        }
        s = null;
        me.hitungCdn(lastRow);
        me.hitungTotalPayment();
        me.generateNote();
        // me.hitungTotalDenda();
        f.down("[name=denda]").setValue(accounting.formatMoney(totalDenda));

    },
    hitungTotalDenda: function() {
        var me = this;

    },
    hitungDenda: function(payment, rec, paymentDate, currentDenda) {
        var me = this;
        // hari keterlambatan = Payment date - due date + 1
        //(Denda_permil / 1000) * nilai payment * hari keterlambatan


        var totalHariTerlambat = me.tools.diffDays(paymentDate, rec.get("duedate"));




        var denda = 0;
        if (paymentDate > rec.get("duedate")) {
            var toleransi = me.tools.intval(me.globalParams['BATAS_TOLERANSI']);



            if (totalHariTerlambat > toleransi) {
                var dendaPermil = me.tools.floatval(me.globalParams['DENDA_PERMIL']);
                denda = (dendaPermil / 1000) * payment * (totalHariTerlambat);


                ///
                if (rec.get('termin') === 43) {
                    //console.log(currentDenda);
                    //console.log(denda);
                }

                ///

                denda = currentDenda + denda;
            }
        } else {
            denda = currentDenda;
        }




        return denda;

    },
    hitungCdn: function(lastRow) {
        var me = this;
        var f = me.getFormdata();
        var vs = f.getValues();
        var cdn = vs["cdn"];
        var s = me.getTagihangrid().getStore();
        if (cdn < 3) {
            if (cdn === 1) { // kurang bayar diabaikan
                var rec = s.getAt(lastRow);
                f.down("[name=cdn_value]").setValue(rec.get("remaining_balance"));
                rec.beginEdit();
                rec.set({
                    remaining_balance: 0
                });
                rec.endEdit();

            } else if (cdn === 2) { /// lebih bayar diabaikan
                if (me.effectedSch.length > 1) { // jika schedule yang terbayar lebih dari 1 row
                    var rec = s.getAt(lastRow);
                    f.down("[name=cdn_value]").setValue(rec.get("payment_payment"));
                    rec.beginEdit();
                    rec.set({
                        payment_payment: me.tagihanDefaultValue[lastRow]['pay'],
                        remaining_balance: me.tagihanDefaultValue[lastRow]['rb']
                    });
                    rec.endEdit();
                
                 }else if (me.effectedSch.length === 1) { // jika schedule yang terbayar : 1 row
                    var rec = s.getAt(lastRow);
                   // console.log(rec);
                    f.down("[name=cdn_value]").setValue(accounting.unformat(f.down("[name=payment]").getValue())-rec.get("payment_payment"));
                    /*
                    rec.beginEdit();
                    rec.set({
                        payment_payment: me.tagihanDefaultValue[lastRow]['pay'],
                        remaining_balance: me.tagihanDefaultValue[lastRow]['rb']
                    });
                    rec.endEdit();
                    */
               }


            }

        } else {
            f.down("[name=cdn_value]").setValue(0);
        }

        f.down("[name=cdn_value]").setValue(accounting.formatMoney(f.down("[name=cdn_value]").getValue()));

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
    resetTagihan: function() {
        var me = this;
        var sg = me.getTagihangrid();
        // clear first
        sg.getStore().loadData([], false);
        me.tagihanDefaultValue = false;

        me.effectedSch = [];
    },
    loadTagihan: function(purchaseLetterId) {
        var me = this;
        var sg = me.getTagihangrid();
        me.resetTagihan();
        me.sumTagihan = 0;
        me.tools.ajax({
            params: {
                purchaseletter_id: purchaseLetterId
            },
            success: function(data, model) {


                me.tools.wesea({
                    data: data,
                    model: model
                }, me.getTagihangrid()).grid();
                
                 
                var sum = 0;
                        sg.getStore().data.each(function(record){
                        sum+= parseFloat(record.get('remaining_balance'));
                        });
                
                me.sumTagihan = sum;

            }
        }).read('tagihantagihan');


    },
    unitSelect: function() {
        var me = this;
        var f = me.getFormdata();
         
        if (me.browseHandler) {
            me.browseHandler.selectItemFinalData = function(rec) {
                //console.log("TEST BROWSE");
                // me.pt_id  = apps.pt_id;
               
                 
                return {
                  //  purchaseletter_id: rec.get("purchaseletter_purchaseletter_id")
                   purchaseletter_id: rec.get("purchaseletter_id"),
                   template_id:me.templateCoa
                  
                };
            };
            me.selectedPurchaseletter = null;
            me.browseHandler.selectItem(function() {

                var ps = me.localStore.selectedUnit; // purchaseletter detail Store
                var psRec = ps.getAt(0);
                if (psRec) {
                    me.selectedPurchaseletter = psRec.data;
                    me.getFormdata().loadRecord(psRec);
                    //psRec.get("purchaseletter_id")
                    me.loadTagihan(psRec.get("purchaseletter_id"));
                    me.mt.customerPhoto(f.down("#photo_image"), psRec.get("customer_photo"), me.myConfig.IMG_FOLDER);
                    me.generateNote();
                    me.tempTagihan = null;
                    me.pt_id = f.down('[name=pt_pt_id]').getValue();
                    f.down('[name=voucher_no]').setValue('');
                    f.down('[name=paymentcashier_prefix_id]').reset();
                    f.down('[name=paymentcashier_kasbank]').reset();
                    var g = me.getDetailcoagrid();
                    g.getStore().removeAll();
                } else {
                    //console.log("[Error] Tidak ada data purchaseletter");
                }
             
                

            });
        }
          
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
    
    generateCoa: function (template,state,kasbank_id,paymentId) {
        var me = this;
        var f = me.getFormdata();
        var g = me.getDetailcoagrid();
        var totalpayment = f.down("[name=total_payment]").getValue();
        var ps = me.localStore.selectedUnit;
        
        if(state == 'update') {
            
            
            
            f.setLoading("Loading jurnal");
                me.tools.ajax({
                    params: {
                        template_id: me.templateCoa,
                        amount:totalpayment,
                        kasbank_id:kasbank_id,
                        payment_id:paymentId
                        
                    },
                    success: function(data, model) {
                      
                       g.getStore().load({
                           params:{
                               template_id:me.templateCoa,
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
        
        if(totalpayment!== '0.00'  ) {
                f.setLoading("Loading jurnal ");
                me.tools.ajax({
                    params: {
                        template_id: template,
                        
                    },
                    success: function(data, model) {
                       f.setLoading(false);
                       g.getStore().load({
                           params:{
                               template_id:template,
                               amount:totalpayment,
                               kasbank_id:me.kasbank_id
                           },
                          callback : function(records, operation, success) {
                                me.setSumdetail();
                               
                            }
                        

                       });
                       
                       if(!data) {
                           me.tools.alert.warning("Template Installment Payment masih kosong");
                       }
                        
                    }
                }).read('generatetemplatecoa');
               // g.getView().refresh();
               
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
         value['amount'] = parseFloat(value['amount']);
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
          return a + b;
        });
        }

           if(g.getStore().getCount()!==0) {   
            var data =[];
                g.getStore().data.each(function(record){
                var recordArray =+ record.get("amount");
                data.push(recordArray);
                });
                var sum = data.reduce(function(pv, cv) { return pv + cv; }, 0);
               var total = sums(data).toFixed(2);
               var total = Ext.util.Format.number(total, '0,000.00');
              
            }

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