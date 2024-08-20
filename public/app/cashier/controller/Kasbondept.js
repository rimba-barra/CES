//default dataflow = Out
//realisasi menjadi kas atau bank ada di kasir ketika posting
Ext.define('Cashier.controller.Kasbondept', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.CoadeptvouchercomboboxV2',
        'Cashier.library.template.combobox.Currencycombobox',
        'Cashier.library.template.combobox.Departmentcombobox',
        'Cashier.library.template.combobox.Employeehodcombobox',
        'Cashier.library.template.combobox.Cashflowcombobox',
        'Cashier.library.BrowseCashier',
        'Cashier.library.template.combobox.Inoutcombobox',
        'Cashier.library.template.combobox.Typecashboncombobox',
        'Cashier.library.template.combobox.Projectptforcashboncombobox',
        'Cashier.library.template.combobox.Statusnewcombobox',
        'Cashier.library.template.combobox.Voucherprefixcombobox',
        'Cashier.library.template.combobox.Employeehrdcombobox',
        'Cashier.library.template.combobox.Ptusercombobox',
        'Cashier.library.template.combobox.Voucherprefixbankcombobox',
        'Cashier.library.template.combobox.Kasbondeptapprovecombobox',
        'Cashier.library.template.combobox.Subglcombobox',
        'Cashier.library.template.combobox.Projectcombobox',
        'Cashier.library.template.combobox.Groupcashbontypecombobox',
        'Cashier.library.box.Config',
        'Cashier.library.box.tools.EventSelector',
        'Cashier.library.box.tools.Tools',
        'Cashier.library.template.combobox.Rewardcombobox',
        'Cashier.library.template.combobox.Kasbonreffcombobox',
    ],
    alias: 'controller.Kasbondept',
    views: [
        'kasbondept.Panel',
        'kasbondept.Grid',
        'kasbondept.Griddetail',
        'kasbondept.Gridsubdetail',
        'kasbondept.FormSearch',
        'kasbondept.FormData',
        'kasbondept.FormDataDetail',
        'kasbondept.FormDataSubDetail',
        'kasbondept.FormTracking',
        'kasbondept.Griddecvdept',
        'kasbondept.Griddetaillog',
        'kasbondept.Gridattachmentdetail',
        'kasbondept.FormDataUploadAttachment',
        'kasbondept.FormShortcutAttachment',
        'kasbondept.Gridshortcutattachment',
        'kasbondept.FormUploadShortcutAttachment'

    ],
    stores: [
        'Kasbondept',
        'Kasbondeptdetail',
        'Kasbondeptsubdetail',
        'Ptbyuser',
        'Employee',
        'Employeehod',
        'Department',
        'CoadeptcomboV2',
        'Currency',
        'Cashflow',
        'Typecashbon',
        'Inout',
        'Subgl',
        'Project',
        'Kasbondeptdecvdept',
        'Kasbondeptdetaillog',
        'Groupcashbontype',
        'Kasbondeptattachmentdetail',
        'Kasbondeptshortcutattachment',
        'Rewardcombo',
        'Kasbonreffcombo'
    ],
    models: [
        'Kasbondept',
        'Kasbondeptdetail',
        'Kasbondeptsubdetail',
        'Currency',
        'Kasbondeptdecvdept',
        'Kasbondeptdetaillog',
        'Groupcashbontype',
        'Kasbondeptattachmentdetail',
        'Kasbondeptshortcutattachment',
        'Reward',
        'Kasbonreff',
    ],
    refs: [
        {ref: 'grid', selector: 'kasbondeptgrid'},
        {ref: 'griddetail', selector: 'kasbondeptgriddetail'},
        {ref: 'gridsubdetail', selector: 'kasbondeptgridsubdetail'},
        {ref: 'formsearch', selector: 'kasbondeptformsearch'},
        {ref: 'formdata', selector: 'kasbondeptformdata'},
        {ref: 'formdatadetail', selector: 'kasbondeptdetailformdata'},
        {ref: 'formdatasubdetail', selector: 'kasbondeptsubdetailformdata'},
        {ref: 'formtracking', selector: 'kasbondeptformtracking'},
        {ref: 'griddecvdept', selector: 'kasbondeptgriddecvdept'},
        {ref: 'griddetaillog', selector: 'kasbondeptgriddetaillog'},
        {ref: 'gridattachmentdetail', selector: 'kasbondeptgridattachmentdetail'},
        {ref: 'formdatauploadattachment', selector: 'formdatauploadattachment'},
        {ref: 'formshortcutattachment', selector: 'kasbondeptformshortcutattachment'},
        {ref: 'gridshortcutattachment', selector: 'kasbondeptgridshortcutattachment'},
        {ref: 'formuploadshortcutattachment', selector: 'formuploadshortcutattachment'},
    ],
    controllerName: 'kasbondept',
    fieldName: 'voucher_no',
    fieldconfirmdetail: 'description',
    fieldconfirmsubdetail: 'subcode',
    bindPrefixName: 'Kasbondept',
    formWidth: 800,
    state: null,
    statedetail: null,
    statesubdetail: null,
    urlcommon: 'cashier/common/create',
    urldata: 'cashier/kasbondept/',
    urlrequest: 'cashier/kasbondept/create',
    urldetail: 'cashier/kasbondept/detail',
    urlsubdetail: 'cashier/kasbondept/subdetail',
    senddata: null,
    info: null,
    coa: null,
    messagedata: null,
    valueform: null,
    pt_id: 0,
    manager_id: 0,
    employee_id: 0,
    department_id: 0,
    tipekasbondept_id: 0,
    prefixdept: null,
    flaggeneratevoucherno: 0,
    approveby_id: 0,
    dateNow: new Date(),
    idheaderfield: 'kasbondept_id',
    iddetailfield: 'kasbondeptdetail_id',
    idheadervalue: 0,
    iddetailvalue: 0,
    coa_id: 0,
    kelsub_id: 0,
    balancecoa: 0,
    validdetail: 0,
    winId:null,
    win:null,
    subgl: null,
    loadingrequest: new Ext.LoadMask(Ext.getBody(), {msg: "Please wait..."}),
    messageoscashbon:null,
    kkbornot: null,
    is_shortcut : 0,
    last_project_id: apps.project,
    max_row_voucher: 7, 
    is_over_target : 0,
    amount_reward : 0,
    reference_cashbon : 0,
    getMe: function(){
       var me = this;
       return _Apps.getController(me.bindPrefixName);
    },
    init: function (application) {
        var me = this;
        this.control({
            'kasbondeptpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'kasbondeptgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange,
                select: this.gridSelected,
            },
            'kasbondeptgrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    me.BodyLoading();
                }
            },
            'kasbondeptgrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
              'kasbondeptgrid toolbar button[action=copycashbon]': {
                click: function () {
                    this.copyCashbon(0);
                }
            },
            'kasbondeptgrid toolbar button[action=trackingcashbon]': {
                click: function () {
                    this.trackingCashbon();
                }
            },
            'kasbondeptgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'kasbondeptgrid toolbar button[action=printdata]': {
                click: this.dataPrintdata
            },
            'kasbondeptgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },

            'kasbondeptformsearch': {
                afterrender: function () {
                    me.setStoreFormsearch(function() {
                        var fs;
                        fs = me.getFormsearch();

                        setTimeout(function(){ 
                             fs.down("[name=project_id]").setValue(parseInt(apps.project));
                             fs.down("[name=pt_id]").setValue(parseInt(apps.pt));
                        }, 3000);
                    });
                },
            },
            'kasbondeptformsearch button[action=search]': {
                click: this.dataSearch
            },
            'kasbondeptformsearch button[action=reset]': {
                click: this.dataReset
            },
             'kasbondeptformsearch [name=pt_id]': {
                 'select': function (that, newValue, oldValue, eOpts) {
                    var me, form, rowdata;
                    me = this;
                    form = me.getFormsearch();
                    rowdata = form.down('[name=pt_id]').valueModels[0]['raw'];
                    if (form) {
                        form.down('[name=project_id]').setValue(rowdata.project_id);
                       
                    }
                  me.setDeptFormSearch();
                },
            },
            'kasbondeptformsearch [name=amount] ': {
                'keyup': function (event) {
                    me = this;
                    var fd = me.getFormsearch();
                    me._formatCurrency(fd.down('[name=amount]'));
                },
                'blur': function() { 
                    me = this;
                    var fd = me.getFormsearch();
                    me._formatCurrency(fd.down('[name=amount]'), "blur");
                },
                focus: function() {
                    me = this;
                    var fd = me.getFormsearch();
                    var amount = parseInt(fd.down('[name=amount]').getValue());
                    if(amount == 0 || isNaN(amount)){
                        fd.down('[name=amount]').setValue('');
                    }
                }
            },
            'kasbondeptformdata': {
                afterrender: function () {
                    var me, form;
                    me = this;
                    form = me.getFormdata();
                    me.formDataAfterRender(form, 'formdata');
                },
                boxready: function () {
                    var me, form;
                    me = this;
                    form = me.getFormdata();
                    me.setFormdataready(form, 'formdata');
                },
                destroy: function () {
                    var me;
                    me = this;
                    me.setDefaultBeforeLoadForm();
                }
            },
            'kasbondeptformtracking': {
                afterrender: function () {
                    var me, form;
                    me = this;
                    form = me.getFormtracking();
                    me.formDataAfterRender(form, 'formtracking');
                },
                boxready: function () {
                    var me, form;
                    me = this;
                    form = me.getFormtracking();
                    me.setFormdataready(form, 'formtracking');
                },
              
            },
            'kasbondeptformdata [name=kasbondepttab] ': {
                'tabchange': function (p, eOpts) {
                    var me, pd, form, tabPanel, name, rowdetail;
                    me = this;
                    me.checkTabsubcoa();
                },
            },
            'kasbondeptformdata [name=pt_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this;
                    rowdata = record[0]['data'];
                    me.pt_id = rowdata.pt_id;
                    if (form) {
                        form.down('[name=projectname]').setValue(rowdata.projectname);
                        form.down('[name=ptname]').setValue(rowdata.ptname);
                    }
                      me.getEmployeebypt();
                },
                'change': function (that, newValue, oldValue, eOpts) {
                    var me, form, rowdata;
                    me = this;
                    form = me.getFormdata();
                    rowdata = form.down('[name=pt_id]').valueModels[0]['raw'];
                    me.pt_id = rowdata.pt_id;
                    me.project_id = rowdata.project_id;
                    if (form) {
                        form.down('[name=projectname]').setValue(rowdata.projectname);
                        form.down('[name=ptname]').setValue(rowdata.ptname);
                    }
                    me.setStoreDeptuserPt();
                    me.getGroupcashbontype(rowdata.project_id,rowdata.pt_id);
                    me.setReward();
                    me.getReference_cashbon();
                  
                }
            },
            'kasbondeptformdata [name=department_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this;
                    form = me.getFormdata();
                    rowdata = record[0]['data'];
                    me.prefixdept = rowdata.code;
                    me.department_id = rowdata.department_id;
                    //me.setVal(form, 'approveby_id', 99);
                    //me.setStoreApproveby(form);
                    if (me.reference_cashbon == 1) {
                        form.down("[name=kasbondept_reference_id]").setValue(0);
                        form.down("[name=kasbondept_reference_id]").setVisible(true);
                        me.setStoreReferenceCashbon();
                    }else{
                        form.down("[name=kasbondept_reference_id]").setVisible(false);
                    }
                },
                'change': function (that, newValue, oldValue, eOpts) {
                    var me, form, rowdata;
                    me = this;
                    form = me.getFormdata();
                    if (form.down('[name=department_id]').valueModels[0] !== undefined) {
                        rowdata = form.down('[name=department_id]').valueModels[0]['raw'];
                        me.prefixdept = rowdata.code;
                    }
                    me.generateVoucherno(form);
                },
            },
            'kasbondeptformdata [name=made_by]': {
                change: function (form = '') {
                    var me = this;
                    me.gethod(form);
                }
            },
            'kasbondeptformdata [name=approveby_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this;
                    form = me.getFormdata();
                    rowdata = record[0]['data'];
                    me.approveby_id = rowdata.employee_id;
                    //me.setVal(form, 'approvename', rowdata.employee_name);
                },
                'change': function (that, newValue, oldValue, eOpts) {
                    var me, form, rowdata;
                    me = this;
                    form = me.getFormdata();
                    if (form.down('[name=approveby_id]').valueModels[0] !== undefined) {
                        rowdata = form.down('[name=approveby_id]').valueModels[0]['raw'];
                        me.approveby_id = rowdata.employee_id;
                      //  me.setVal(form, 'approvename', rowdata.employee_name);
                    }

                },
            },    
             'kasbondeptformdata [name=tipekasbondept_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this;
                    form = me.getFormdata();
                    rowdata = record[0]['data'];
                    me.tipekasbondept_id = rowdata.tipekasbondept_id;
                    //me.setVal(form, 'approvename', rowdata.employee_name);
                },
                'change': function (that, newValue, oldValue, eOpts) {
                    var me, form, rowdata;
                    me = this;
                    form = me.getFormdata();
                    if (form.down('[name=tipekasbondept_id]').valueModels[0] !== undefined) {
                        rowdata = form.down('[name=tipekasbondept_id]').valueModels[0]['raw'];
                        me.tipekasbondept_id = rowdata.tipekasbondept_id;
                      //  me.setVal(form, 'approvename', rowdata.employee_name);
                    }

                },
            },
            'kasbondeptformdata [name=kasbondept_reference_id]':{
                'select' : function (g, record, item, e, eOpts) {
                    var me = this,
                        fd = me.getFormdata(),
                        department_id = fd.down("[name=department_id]").getValue();

                    if (department_id == null || department_id == 0) {
                        me.buildWarningAlert('Silahkan pilih department terlebih dahulu.');
                        fd.down("[name=kasbondept_reference_id]").setValue(0);
                        return 0;
                    }

                    me.getDataCashbonReference(record);
                }
            },
            'kasbondeptformdata button[action=add_notes]': {
                toggle: function (e, state) {
                    var me = this;
                    me.changeApprovalNotes(state);
                }
            },                    
            'kasbondeptformdata [name=purchaseletter_reward_id]': {
                select: function (e, state) {
                    var me = this;
                    me.generatereward();
                }
            },
            'kasbondeptformdata [name=voucher_date]' : {
                change: function () {
                    var me, form;
                    me = this;
                    form = me.getFormdata();
                    me.generateVoucherno(form);
                }
            }, 
            'kasbondeptformdata button[action=save]': {
                click: this.dataSavecustome
            },
            'kasbondeptformdata button[action=cancel]': {
                click: this.formDataClose
            },
             'kasbondeptdetailformdata toolbar button[action=cancel]': {
                click: function () {
                    var me = this;
                    this.formDataClose2();
                }
            },
            //====================================START DETAIL=============================================    

            'kasbondeptgriddetail': {
                selectionchange: this.cellgridDetail,
                itemdblclick: this.griddetailitemdoubleclick,
            },
            'kasbondeptgriddetail actioncolumn': {
                click: function (view, cell, row, col, e) {
                    me.gridActionColumndetailclick(view, cell, row, col, e);
                }
            },
            /* START  GRID AREA */
            'kasbondeptgriddetail toolbar button[action=create]': {
                click: function () {
                    // SEFTIAN ALFREDO, 15/09/2021 
                    // BUAT BUTTON ADD NEW DI DETAIL COA
                    var storeDetail, counterDetail;

                    storeDetail = Ext.data.StoreManager.lookup('Kasbondeptdetail');
                    counterDetail = storeDetail.getCount();

                    if(counterDetail >= me.max_row_voucher){
                        me.buildWarningAlert('Maksimum baris voucher = ' + me.max_row_voucher);
                        return 0;
                    }
                    // ################################################

                    me.paramdetail.stateform = 'create';
                    me.GenerateFormdata(me.paramdetail);
                }
            },
            'kasbondeptgriddetail toolbar button[action=update]': {
                click: function () {
                    me.paramdetail.stateform = 'update';
                    me.GenerateFormdata(me.paramdetail);
                }
            },
            'kasbondeptgriddetail toolbar button[action=destroy]': {
                click: function () {
                    me.fieldName = 'remarks';
                    this.dataDestroydetailwithflag();
                }
            },
            'kasbondeptdetailformdata [name=amount] ': {
                'keyup': function (event) {
                    me = this;
                    var fd = me.getFormdatadetail();
                    me._formatCurrency(fd.down('[name=amount]'));
                },
                'blur': function() { 
                    me = this;
                    var fd = me.getFormdatadetail();
                    me._formatCurrency(fd.down('[name=amount]'), "blur");
                },
                focus: function() {
                    me = this;
                    var fd = me.getFormdatadetail();
                    var amount = parseInt(fd.down('[name=amount]').getValue());
                    if(amount == 0 || isNaN(amount)){
                        fd.down('[name=amount]').setValue('');
                    }
                }
            },
        
            'kasbondeptsubdetailformdata [name=amount] ': {
                'keyup': function (event) {
                    me = this;
                    var fd = me.getFormdatasubdetail();
                    me._formatCurrency(fd.down('[name=amount]'));
                },
                'blur': function() { 
                    me = this;
                    var fd = me.getFormdatasubdetail();
                    me._formatCurrency(fd.down('[name=amount]'), "blur");
                },
                focus: function() {
                    me = this;
                    var fd = me.getFormdatasubdetail();
                    var amount = parseInt(fd.down('[name=amount]').getValue());
                    if(amount == 0 || isNaN(amount)){
                        fd.down('[name=amount]').setValue('');
                    }
                }
            },
            /* END GRID AREA */

            /* START FORM AREA */
            'kasbondeptdetailformdata': {
                afterrender: function () {
                    var me, form;
                    me = this;
                    form = me.getFormdatadetail();
                    me.formDataAfterRender(form, 'formdetail');
                },
            },
//            'kasbondeptdetailformdata': {
//                afterrender: this.formDataDetailAfterRender
//            },
            
            'kasbondeptdetailformdata [name=coa_id]': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form,f, project_id;
                    me = this;
                    form = me.getFormdatadetail();
                    f = me.getFormdata('kasbondeptformdata');
                    valueModels = f.down("[name=pt_id]").valueModels[0];
                    project_id = valueModels.data.project_id;
                    pd = me.paramdetail;
                    rowdata = record[0]['data'];
                    me.coa = rowdata.coa;
                    me.coa_id = rowdata.coa_id;
                    me.paramdetail.rowdetailtmp = rowdata;
                    me.kelsub_id = rowdata.kelsub_id;
                    var detailgridsub = me.getGridsubdetail(); 
                    pd.rowdata = {data:rowdata};
                    pd.data = rowdata;
                    
//                    if (me.kelsub_id !== 0) {
//                        me.setReadonly(form, 'amount', true);
//                    } else {
//                        me.setReadonly(form, 'amount', false);
//                    }
                    form.down("[name=coa_id]").setRawValue(rowdata.coa);
                    me.setVal(form, 'coaname', rowdata.coaname);
                    me.setVal(form, 'kelsub_id', rowdata.kelsub_id);
                    me.setVal(form, 'kelsub', rowdata.kelsub);
                    me.setVal(form, 'kelsubdesc', rowdata.kelsubdesc);
                    
                    var io = form.down("[name=indexdata]").getValue();

                    //load cashflow
                    me.setStoreCashflow(rowdata.coa_id,0);
                    
                    if (form.getForm().isValid()) {
                        grid = me.getGriddetail();
                        store = grid.getStore();
                        row = form.getForm().getValues();
                        row[me.idheaderfield] = me.idheadervalue;

                        pd.row = row;
                        me.Checkdatadetail();
                        var ina  = grid.getSelectionModel().getSelection()[0];
                        switch (pd.stateform) {
                            case 'create':
                                if (pd.checkdata == false) {
                                    store.removeAt(store.find('indexdata', io));
//                                    me.getGriddetail().getStore().removeAt();
                                    //console.log(ina);
                                    row['statedata'] = 'create';
                                    row['project_id'] = project_id;
                                    row['pt_id'] = me.pt_id;
                                    row['coa_id'] = me.coa_id;
                                    row['coa'] = me.coa;
                                    row['kelsub_id'] = me.kelsub_id;
                                    
                                   // row['nomorindex'] = io;
                                    row[me.idheaderfield] = me.idheadervalue;
                                   
                                    store.add(row);
                                    store.commitChanges();
                                } else {
                                    me.buildWarningAlert("Sorry code = " + me.coa + " ,already exist in this transaction");
                                }
                                break;
                            case 'update':
                                indexdata = grid.getSelectionModel().getSelection()[0];
                                getindex = store.indexOf(indexdata);
                                record = store.getAt(getindex);
                                record.beginEdit();
                                row['statedata'] = 'update';
                                row['coa_id'] = me.coa_id;
                                row['coa'] = me.coa;
                                //row['nomorindex'] = getindex;
                                row[me.idheaderfield] = me.idheadervalue;
                                record.set(row);
                                record.endEdit();
                                store.commitChanges();
                                break;
                        }
                        store.filter('deleted', false);

                        totaldetail = 0;
                        store.each(function(record) {
                            df = record.data.dataflow;
                            detailamount = record.data.amount;
                            if(df=='O'){
                                totaldetail = totaldetail - detailamount;
                            }else{
                                totaldetail = totaldetail + detailamount;
                            }
                        });
                        pd.totaldetail = totaldetail;
                        //pd.totaldetail = store.sum('amount');
                        me.setSumdetail();
                        me.setDatadetailAftersave();
                    }
                    
                    
                    //semy1
                    if (me.kelsub_id !== 0) {
//                        var substore = Ext.data.StoreManager.lookup('VDRequestsubdetail');
//                        me.getSubdata(substore,rowdata);
                        var datadetail = pd.rowdata['data'];
                        storesub = me.getGridsubdetail().getStore();
                        storesub.clearFilter(true);
                            storesub.filterBy(function(rec, id) {
                            if(rec.get('coa_id') === datadetail.coa_id && rec.get('indexsubdata') === datadetail.indexdata && rec.get('deleted') == false  ) {
                                return true;
                            }
                            else {
                                return false;
                            }
                        });   
                        store.filter('deleted', false);

                        me.setReadonly(form, 'amount', true);
                        detailgridsub.setVisible(true);
                        detailgridsub.down('toolbar button[action=create]').setDisabled(false);
                        form.down("[name=amount]").setValue(0);
                    } else {
                        //form.down("[name=amount]").setValue(0);
                        me.setReadonly(form, 'amount', false);
                        detailgridsub.setVisible(false);
                        detailgridsub.down('toolbar button[action=create]').setDisabled(true);
                    }
                    
                },
            },
            'kasbondeptdetailformdata button[action=save]': {
                'click': function (me, e, eOpts) {
                    var me, form, grid;
                    me = this;
                    form = me.getFormdatadetail();
                    grid = me.getGriddetail();
                    me.dataSaveDetailstore(form, grid);
                },
            },

            /* START  GRID AREA */

            //====================================END DETAIL===============================================      


            //====================================START SUB DETAIL===============================================      
            /* START  GRID AREA */
            'kasbondeptgridsubdetail': {
                afterrender: this.Gridsubafterrender,
                selectionchange: this.cellgridSubDetail,
                itemdblclick: this.gridsubdetailitemdoubleclick,
                select: this.gridSubDetailSelected,
            },
            'kasbondeptgridsubdetail toolbar button[action=create]': {
                click: function () {
                    var me, form, pd, state, store, rowdata, counter, amount;
                    me = this;
                    me.paramsubdetail.stateform = 'create';
                    me.GenerateFormdata(me.paramsubdetail);

                }
            },
            'kasbondeptgridsubdetail toolbar button[action=update]': {
                click: function () {
                    me.paramsubdetail.stateform = 'update';
                    me.GenerateFormdata(me.paramsubdetail);
                }
            },
            'kasbondeptgridsubdetail toolbar button[action=destroy]': {
                click: function () {
                    this.dataDestroysubdetailwithflag();
                }
            },
            'kasbondeptgridsubdetail actioncolumn': {
                click: function (view, cell, row, col, e) {
                    me.gridActionColumnsubdetailclick(view, cell, row, col, e);
                }
            },
            'kasbondeptsubdetailformdata': {
                afterrender: this.formDataSubDetailAfterRender
            },
            'kasbondeptsubdetailformdata [name=subgl_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this;
                    form = me.getFormdatasubdetail();
                    rowdata = record[0]['data'];
                    form.down("[name=subcode]").setValue(rowdata.subcode);
                    form.down("[name=code1]").setValue(rowdata.code1);
                    form.down("[name=code2]").setValue(rowdata.code2);
                    form.down("[name=code3]").setValue(rowdata.code3);
                    form.down("[name=code4]").setValue(rowdata.code4);
                },
            },
            'kasbondeptsubdetailformdata button[action=save]': {
                'click': function (me, e, eOpts) {
                    var me, checkbalance;
                    me = this;
                    me.dataSaveSubDetailstore();
                },
            },
             'kasbondeptgridattachmentdetail button[action=create]': {
                click: function () {
                    this.FormUploadAttachmentShow();
                }
            },
            'kasbondeptgrid toolbar button[action=upload]': {
                click: function () {
                    this.FormUploadKasbondeptShow('upload');
                }
            },
             'formdatauploadattachment': {
                afterrender: this.formDataAttachmentAfterrender
            },
             'formuploadshortcutattachment': {
                afterrender: this.formUploadShortcutAfterrender
            },
             'kasbondeptformshortcutattachment': {
                boxready: function () {
                    var me, form;
                    me = this;
                    form = me.getFormshortcutattachment();
                    me.setFormdataready(form, 'formshortcutattachment');
                },
               /* destroy: function () {
                    var me;
                    me = this;
                    me.setDefaultBeforeLoadForm();
                }*/
            },
            'formdatauploadattachment button[action=upload]': {
                click: function () {
                    this.UploadAttachment();
                }
            },
            'formuploadshortcutattachment button[action=upload]': {
                click: function () {
                   this.ShortcutUploadAttachment();
                }
            },
             'kasbondeptgridattachmentdetail button[action=read]': {
                click: function () {
                    var shortcut = 0;
                    this.FormUploadAttachmentRead(shortcut);
                }
            },
            'kasbondeptgridattachmentdetail button[action=destroy]': {
                click: function () {
                    this.dataDestroyattachmentdetailwithflag();
                }
            },
            'kasbondeptgridattachmentdetail button[action=view]': {
                click: function () {
                    this.gridattachmentitemdoubleclick;
                }
            },
            'kasbondeptgridattachmentdetail': {
                itemdblclick: this.gridattachmentitemdoubleclick,
            },
            'kasbondeptgridshortcutattachment button[action=create]': {
                click: function () {
                    this.FormShortcutAttachmentShow();
                }
            },
              'kasbondeptgridshortcutattachment button[action=read]': {
                click: function () {
                    var shortcut = 1;
                    this.FormUploadAttachmentRead(shortcut);
                }
            },
             'kasbondeptgridshortcutattachment button[action=destroy]': {
                click: function () {
                    this.dataDestroyShortcutAttachment();
                }
            },
            

            //====================================END SUB DETAIL===============================================      

        });
    },
    setDefaultBeforeLoadForm: function () {
        var me;
        me = this;
        me.project_id = 0;
        me.pt_id = 0;
        me.manager_id = 0;
        me.employee_id = 0;
        me.department_id = 0;
        me.approveby_id = 0;
        me.kelsub_id = 0;
        me.state = null;
        me.statedetail = null;
        me.statesubdetail = null;
        me.senddata = null;
        me.prefixdept = null;
        me.coa_id = 0;
        me.coa = null;
        me.idheadervalue = 0;
        me.iddetailvalue = 0;
        me.balancecoa = 0;
        me.validdetail = 0;
        me.subgl = null;
        me.messagedata = null;
        me.valueform = null;
        me.tipekasbondept_id = 0;

        //clean data detail
        me.paramdetail.iddetail = 0;
        me.paramdetail.stateform = null;
        me.paramdetail.formaction = null;
        me.paramdetail.formproperties = null;
        me.paramdetail.iddetail = 0;
        me.paramdetail.store = null;
        me.paramdetail.data = null;
        me.paramdetail.grid = null;
        me.paramdetail.row = null;
        me.paramdetail.form = null;
        me.paramdetail.checkdata = false;
        me.paramdetail.object = null;
        me.paramdetail.rowdata = null;
        me.paramdetail.action = null;
        me.paramdetail.rowdetailtmp = null;
        me.paramdetail.counter = 0;
        me.paramdetail.flagkelsub = 0;

        me.paramsubdetail.iddetail = 0;
        me.paramsubdetail.store = null;
        me.paramsubdetail.data = null;
        me.paramsubdetail.record = null;
        me.paramsubdetail.grid = null;
        me.paramsubdetail.row = null;
        me.paramsubdetail.object = null;
        me.paramsubdetail.rowdata = null;
        me.paramsubdetail.action = null;
        me.paramsubdetail.counter = 0;
        me.paramsubdetail.flagkelsub = 0;
        me.paramsubdetail.totalsubdetail = 0;


    },
    paramdetail: {
        //start formgeneate
        fromlocation: 'Cashier.view.kasbondept.FormDataDetail',
        formtitle: 'Form Detail',
        formicon: 'icon-form-add',
        formid: 'win-kasbondeptdetailformdata',
        formlayout: 'fit',
        formshadow: 'frame',
        formmask: 'Loading...',
        formwidth: 700,
        formtimeout: 0,
        stateform: null,
        formaction: null,
        formproperties: null,
        formwindows: null,
        //end formgeneate
        //start properties form
        iddetail: 0,
        store: null,
        data: null,
        record: null,
        grid: null,
        row: null,
        form: null,
        checkdata: false,
        object: null,
        rowdata: null,
        action: null,
        counter: 0,
        flagkelsub: 0,
        rowdetailtmp: null,
        //start properties form
    },
    paramsubdetail: {
        //start formgeneate
        fromlocation: 'Cashier.view.kasbondept.FormDataSubDetail',
        formtitle: 'Form Sub Detail',
        formicon: 'icon-form-add',
        formid: 'win-kasbondeptsubdetailformdata',
        formlayout: 'fit',
        formshadow: 'frame',
        formmask: 'Loading...',
        formwidth: 700,
        formtimeout: 0,
        stateform: null,
        formaction: null,
        formproperties: null,
        formwindows: null,
        //end formgeneate
        //start properties form
        iddetail: 0,
        store: null,
        data: null,
        record: null,
        grid: null,
        row: null,
        form: null,
        checkdata: false,
        object: null,
        rowdata: null,
        action: null,
        counter: 0,
        flagkelsub: 0,
        totalsubdetail: 0,
        //start properties form
    },
    dataSavecustome: function () {
        var me, state, form, formdata, addingRecord, vp, vps, x, store, storedesc, storedetail, storesubdetail,
                valuedata, idProperty, rec, paramdata, rowdata, resjsonheader, rowjsonheader, validheader, paramheader,
                idProperty, counterdesc, counterdetail, countersubdetail, msgheader, restotal, duedate, validation,
                datamadeby,voucherno_deptout,voucherno_deptin,voucherno_deptout_kp,storeattachmentdetail,counterattachmentdetail;


        me                      = this;
        storedetail             = Ext.data.StoreManager.lookup('Kasbondeptdetail');
        storeattachmentdetail   = Ext.data.StoreManager.lookup('Kasbondeptattachmentdetail');
        counterdetail           = storedetail.getCount();
        counterattachmentdetail = storeattachmentdetail.getCount();

            form          = me.getFormdata();
            formdata      = me.getFormdata().getForm();
        var foverride     = me.getFormdata('kasbondeptdetailformdata');
            stateoverride = foverride.up('window').state.toLowerCase();

        // SEFTIAN ALFREDO, 15/09/21
        if(counterdetail > me.max_row_voucher){
            me.buildWarningAlert('Maksimum baris voucher = ' + me.max_row_voucher);
            return 0;
        }
        // BLABLABLABAL

        var purchaseletter_reward_id = form.down("[name=purchaseletter_reward_id]").getValue();
        var am = form.down('[name=amount]').getValue().replace(/,/g, '');
        var v_amount = parseFloat(am);

        if (purchaseletter_reward_id > 0) {
            if (v_amount > parseFloat(me.amount_reward) && me.is_over_target == 0) {
                me.buildWarningAlert('Nilai Reward Harus Cair Sebesar Rp '+accounting.formatMoney(me.amount_reward));
                return 0;
            }
        }

        if (formdata.isValid()) {
            resetTimer();
            if (stateoverride == 'create') {
                me.flaggeneratevoucherno = '1';
                me.generateVoucherno(form);
            
            
                if(!me.prefixdept) {
                    Ext.Msg.alert('Info','Voucher number not generated, please select your department again.');
                    return false;
                }

            }

            me.unformatCurrencyFormdata(me, form);
            store = me.getGrid().getStore();
            valuedata = formdata.getValues();

            if (valuedata['purchaseletter_reward_id'] == "" || valuedata['purchaseletter_reward_id'] == null) {
                valuedata['purchaseletter_reward_id'] = 0;
            }

            valuedata['project_id'] = form.down("[name=pt_id]").valueModels[0].data.project_id;
            // console.log(valuedata);return;
            form.up('window').body.mask('Saving data, please wait ...');
                       
                       
            if (typeof(form.down("[name=made_by]").getValue()) =='number') {
                valuedata['other_made_by'] = '';
                valuedata['made_by']       = me.getVal(form,'made_by','value');
            }else{                
                valuedata['other_made_by'] = me.getVal(form,'made_by','value');
                valuedata['made_by']       = parseInt(0);
            }            
            
            state = foverride.up('window').state.toLowerCase();
            switch (state) {
                case 'create':
                    store.add(valuedata);
                    addingRecord = true;
                    valuedata['hideparam'] = state;
                    me.valueform = valuedata;
                    break;
                case 'update':
                    idProperty = store.getProxy().getReader().getIdProperty();
                    rec = store.getById(parseInt(formdata.findField(idProperty).getValue(), 10));
                    rec.beginEdit();
                    rec.set(valuedata);
                    rec.endEdit();
                    valuedata['hideparam'] = state;
                    me.valueform = valuedata;
                    break;
                default:
                    return;
            }

            counterdetail = storedetail.getCount();

            Ext.Ajax.request({
                url: me.urldata + state,
                method: 'POST',
                params: {
                    data: Ext.encode(valuedata)
                },
                success: function (response) {
                    resjsonheader        = Ext.JSON.decode(response.responseText);
                    rowjsonheader        = resjsonheader.data;
                    validheader          = resjsonheader.success;
                    paramheader          = resjsonheader.parameter;
                    msgheader            = resjsonheader.msg;
                    restotal             = resjsonheader.total;
                    me.idheadervalue     = rowjsonheader.idheader;
                    voucherno_deptout    = rowjsonheader.voucherno_deptout;
                    voucherno_deptin     = rowjsonheader.voucherno_deptin;
                    voucherno_deptout_kp = rowjsonheader.voucherno_deptout_kp;



                    if (validheader == 'true') {
                        if (counterdetail > 0) {
                            me.Savedetail(me, state);
                        }
                          if (counterattachmentdetail > 0) {
                            me.Saveattachmentdetail(me, state);
                        }
                        store.commitChanges();
                       
                        if(state == 'create'){
                            if(voucherno_deptout != 'EMPTY' && voucherno_deptin != 'EMPTY'){
                                 me.messagedata = 'Data Save Successfully.<br/> Voucher '+ voucherno_deptout + ' and '+ voucherno_deptin +' Have Been Generated.<br/> Please check on Menu Voucher Dept Request';
                            }else if (voucherno_deptout_kp != 'EMPTY'){
                            	 me.messagedata = 'Data Save Successfully.<br/> Voucher '+ voucherno_deptout_kp + ' Have Been Generated.<br/> Please check on Menu Voucher Dept Request';
                            }else{
                                 me.messagedata = msgheader;
                            }
                        }else{
                                me.messagedata = msgheader;   
                        }

                        me.alertFormdataSuccess(state);

                        
                    } else {
                        me.messagedata = msgheader;
                        me.alertFormdataFailed();
                    }

                    me.flaggeneratevoucherno = '0';
                },
                failure: function (response) {
                    me.messagedata = 'data error';
                    me.alertFormdataFailed();
                    me.getFormdata().up('window').close();
                }
            });
        }
    },
    Savedetail: function (that, state) {
        var me, storedetail, counterdetail, iddetail, statedatadetail, datadetail, actiondetail,
                resjsondetail, rowjsondetail, validdetail, msgdetail, parameterdetail, kelsub_id,
                storesubdetail, countersubdetail;

        me = that;
        storedetail = Ext.data.StoreManager.lookup('Kasbondeptdetail');
        storedetail.clearFilter(true);
        counterdetail = storedetail.getCount();

        storesubdetail = Ext.data.StoreManager.lookup('Kasbondeptsubdetail');
        countersubdetail = storesubdetail.getCount();



        var i = 0;
        if (counterdetail > 0) {
            storedetail.each(function (record, index) {
                i = index + 1;
                iddetail = record.get("kasbondeptdetail_id");
                statedatadetail = record.get("statedata");


                if (state == 'create' && statedatadetail == 'create') {
                    actiondetail = 'create';
                } else if (state == 'create' && statedatadetail == 'update') {
                    actiondetail = 'create';
                } else if (state == 'update' && statedatadetail == 'create') {
                    actiondetail = 'create';
                } else if (state == 'update' && statedatadetail == 'update') {
                    actiondetail = 'update';
                }

                datadetail = record['data'];
                datadetail[me.idheaderfield] = me.idheadervalue;
                datadetail['parametersql'] = actiondetail;
                datadetail['hideparam'] = 'detail' + actiondetail;

                if (me.urldetail !== me.urldetail + statedatadetail) {
                    var executedata = 0;
                    if (statedatadetail == 'create' || statedatadetail == 'update') {
                        executedata = 1;
                    }
                    if (statedatadetail == 'delete' && iddetail !== 0) {
                        executedata = 1;
                        actiondetail = 'delete';
                    }

                    if (executedata == 1) {
                        Ext.Ajax.request({
                            url: me.urldetail + actiondetail,
                            method: 'POST',
                            params: {
                                data: Ext.encode(datadetail)
                            },
                            success: function (response) {
                                var coa_id, indexdata;
                                resjsondetail = Ext.JSON.decode(response.responseText);
                                rowjsondetail = resjsondetail.data;
                                validdetail = resjsondetail.success;
                                parameterdetail = resjsondetail.parameter;
                                msgdetail = resjsondetail.msg;
                                me.iddetailvalue = rowjsondetail.iddetail;

                                if (parameterdetail == 'detailcreate') {
                                    kelsub_id = rowjsondetail[6][0].kelsub_id;
                                    coa_id = rowjsondetail[6][0].coa_id;
                                    indexdata = rowjsondetail[6][0].indexdata;
                                } else if (parameterdetail == 'detailupdate') {
                                    kelsub_id = rowjsondetail[4][0].kelsub_id;
                                    coa_id = rowjsondetail[4][0].coa_id;
                                    indexdata = rowjsondetail[4][0].indexdata;
                                }



                                if (kelsub_id !== 0 && countersubdetail > 0) {


                                    var iddetailsub, statesubdetail, storedata,
                                            actionsubdetail, datasubdetail;

                                    storesubdetail.clearFilter(true);
                                    storesubdetail.filterBy(function (rec, id) {
                                        storedata = rec['data'];
                                        if (state == 'create' && storedata.statedata == 'create') {
                                            iddetail = indexdata;
                                        } else if (state == 'create' && storedata.statedata == 'update') {
                                            iddetail = indexdata;
                                        } else if (state == 'update' && storedata.statedata == 'update') {
                                            iddetail = me.iddetailvalue;
                                        } else if (state == 'update' && storedata.statedata == 'create') {
                                            iddetail = me.iddetailvalue;
                                        } else {
                                            iddetail = me.iddetailvalue;
                                        }
                                        if (storedata.coa_id == coa_id && storedata.kasbondeptdetail_id == iddetail) {
                                            return true;
                                        } 
                                        else if (storedata.coa_id == coa_id && storedata.indexsubdata == indexdata) {
                                            return true;
                                        } 
                                        else {
                                            return false;
                                        }
                                    });



                                    storesubdetail.each(function (record, index) {
                                        iddetailsub = record.get("kasbondeptsubdetail_id");
                                        statesubdetail = record.get("statedata");

                                        if (state == 'create' && statesubdetail == 'create') {
                                            actionsubdetail = 'create';
                                        } else if (state == 'create' && statesubdetail == 'update') {
                                            actionsubdetail = 'create';
                                        } else if (state == 'update' && statesubdetail == 'create') {
                                            actionsubdetail = 'create';
                                        } else if (state == 'update' && statesubdetail == 'update') {
                                            actionsubdetail = 'update';
                                        }

                                        datasubdetail = record['data'];
                                        datasubdetail[me.idheaderfield] = me.idheadervalue;
                                        datasubdetail[me.iddetailfield] = me.iddetailvalue;
                                        datasubdetail['parametersql'] = statesubdetail;
                                        datasubdetail['hideparam'] = 'subdetail' + statesubdetail;

                                        if (me.urlsubdetail !== me.urlsubdetail + statesubdetail) {
                                            executedata = 0;
                                            if (statesubdetail == 'create' || statesubdetail == 'update') {
                                                executedata = 1;
                                            }
                                            if (statesubdetail == 'delete' && iddetailsub !== 0) {
                                                executedata = 1;
                                                actionsubdetail = 'delete';
                                            }

                                            if (executedata == 1) {
                                                Ext.Ajax.request({
                                                    url: me.urlsubdetail + actionsubdetail,
                                                    method: 'POST',
                                                    params: {
                                                        data: Ext.encode(datasubdetail)
                                                    },
                                                    success: function (response) {
                                                        var resjsonsubdetail, rowjsonsubdetail, validsubdetail, parametersubdetail, msgsubdetail;

                                                        resjsonsubdetail = Ext.JSON.decode(response.responseText);
                                                        rowjsonsubdetail = resjsonsubdetail.data;
                                                        validsubdetail = resjsonsubdetail.success;
                                                        parametersubdetail = resjsonsubdetail.parameter;
                                                        msgsubdetail = resjsonsubdetail.msg;

                                                    },
                                                    failure: function (response) {
                                                        me.messagedata = 'data error';
                                                        me.alertFormdataFailed();
                                                        me.getFormdata().up('window').close();
                                                    }
                                                });
                                            }

                                        }
                                    });
                                }
                            },
                            failure: function (response) {
                                me.messagedata = 'data error';
                                me.alertFormdataFailed();
                                me.getFormdata().up('window').close();
                            }
                        });
                    }
                }
            });
        }
    },
    setDataAftersave: function () {
        var me, store, counter;
        me = this;
        store = me.getGrid().getStore();
        counter = store.getCount();
        if (counter) {
            var index = counter - 1;
            if (index == 0) {
                me.getGrid().getSelectionModel().select(index, true);
            } else {
                me.getGrid().getSelectionModel().deselectAll();
                me.getGrid().getSelectionModel().select(index, true);
            }
        }
    },
    alertFormdataSuccess: function (state) {
        var me, form, store;
        me = this;
        me.getGrid().getStore().reload();
        form = me.getFormdata();
        form.up('window').body.unmask();
        Ext.Msg.show({
            title: 'Success',
            msg: me.messagedata,
            icon: Ext.Msg.INFO,
            buttons: Ext.Msg.OK,
            fn: function () {
                me.formDataClose();
               /* if(state=='create') {
                 me.sendRequestmail(state);
                }
                if(state=='update') {
                 me.sendRequestmail(state);
                }*/
            }
        });
    },
    alertFormdataFailed: function () {
        var me, form, store;
        me = this;
        me.getGrid().getStore().reload();
        form = me.getFormdata();
        form.up('window').body.unmask();
        //me.clearallStore();
        Ext.Msg.show({
            title: 'Failure',
            msg: 'Error: ' + me.messagedata,
            icon: Ext.Msg.ERROR,
            buttons: Ext.Msg.OK,
             fn: function () {
                me.formDataClose();
            }
        });
    },
    gridSelectionChange: function () {
        var me = this;
        var grid = me.getGrid(),
                row = grid.getSelectionModel().getSelection();

    },
    gridSelected: function () {
        var me, grid, store, counter, record, row;
        me = this;
        grid = me.getGrid();
        store = grid.getStore();
        counter = store.getCount();
        if (counter > 0) {
            record = grid.getSelectionModel().getSelection()[0];
            //console.log(record);
            row = record['data'];
            if (row.status == '1' || row.status == '2') {
                grid.down('#btnEdit').setDisabled(false);
                grid.down('#btnDelete').setDisabled(false);
            } else {
                grid.down('#btnEdit').setDisabled(true);
                grid.down('#btnDelete').setDisabled(true);
            }
            //grid.down('#btnPrintvoucher').setDisabled(false);
        }
    },
    gridattachmentitemdoubleclick: function () {
        var me, p,shortcut;
        me = this.getMe();
        shortcut = 0;
        me.FormUploadAttachmentRead(shortcut);
    },
    Gridsubafterrender: function () {
        var me;
        me = this;
    },
    cellgridSubDetail: function () {
        var me, p, form = '';
        me = this;
        form = me.getFormdata();
        p = me.paramsubdetail;
        me.gridSelectionChangesubdetail();
        p.grid = me.getGridsubdetail();
        p.object = p.grid.getSelectionModel().getSelection();
        p.data = '';
        for (var i = 0; i <= p.object.length - 1; i++) {
            p.data = p.object[i];
        }
        if (p.data !== '') {
            // pd.rowdata = pd.data['data'];
            p.rowdata = p.data;
        }
    },
    gridsubdetailitemdoubleclick: function () {
        var me, p;
        me = this;
        p = me.paramsubdetail;
        p.action = 'update';
        me.actiondataSubDetail();
    },
    gridActionColumnsubdetailclick: function (view, cell, row, col, e) {
        var me, p, grid, action = '';
        me = this;
        p = me.paramsubdetail;
        grid = me.getGridsubdetail();
        grid.getSelectionModel().select(row);
        p.action = e.getTarget().className.match(/\bact-(\w+)\b/)[1];
        p.rowdata = grid.getStore().getAt(row);
        me.actiondataSubDetail();
    },
    actiondataSubDetail: function () {
        var me, p, returndata;
        me = this;
        p = me.paramsubdetail;
        me.cellgridSubDetail();
        switch (p.action) {
            case 'update':
                me.paramsubdetail.stateform = 'update';
                me.GenerateFormdata(me.paramsubdetail);
                break;
            case 'destroy':
                me.dataDestroysubdetailwithflag();
                break;
            default:
                returndata = "No action selected";
        }
    },
    gridSubDetailSelected: function () {
        var me, grid, counter, psd, store, record, row, formheader, formdetail, formsubdetail;
        me = this;
        psd = me.paramsubdetail;
        grid = me.getGridsubdetail();
        store = grid.getStore();
        counter = store.getCount();
        formheader = me.getFormdata();
        formdetail = me.getFormdatadetail();
        formsubdetail = me.getFormdatasubdetail();
        if (counter > 0) {
            psd.rowdata = grid.getSelectionModel().getSelection()[0];
            psd.row = psd.rowdata['data'];
        }
    },
    dataDestroysubdetailwithflag: function () {
        var me, rows, confirmmsg, successmsg, failmsg,
                record, recordcounttext, store, selectedRecord, msg, successcount
                , parameter, pesan, dataconfirm;

        me = this;

        dataconfirm = me.fieldconfirmsubdetail;

        rows = me.getGridsubdetail().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            store = Ext.data.StoreManager.lookup('Kasbondeptsubdetail');

            if (rows.length == 1) {
                selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(dataconfirm) + ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }

            Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
                if (btn == 'yes') {
                    resetTimer();
                    msg = function () {
                        me.getGridsubdetail().up('window').mask('Deleting data, please wait ...');
                    };
                    for (var i = 0; i < rows.length; i++) {
                        record = rows[i];
                        record.set("deleted", true);
                        record.set("statedata", 'delete');
                        store.clearFilter(true);
                        store.filter(me.iddetailfield, me.iddetailvalue);
                        store.filter('deleted', false);
                    }
                    me.setSumsubdetail();
                }

            });

        }
    },
//    indexSubDetail: function () {
//        var me, form, store, counter;
//        me = this;
//        store = me.getGridsubdetail().getStore();
//        store.clearFilter(true);
//        store.filter('deleted', false);
//        counter = store.getCount();
//        store.clearFilter();
//        return counter + 1;
//    },

    indexSubDetail: function () {
        var me, form, store, counter;
        me = this;
        var pd = me.paramdetail;
        var datadetail = pd.rowdata['data'];
        storesub = me.getGridsubdetail().getStore();
        storesub.clearFilter(true);
        counter = storesub.getCount();
   
            storesub.filterBy(function(rec, id) {
            if(rec.get('coa_id') === datadetail.coa_id && rec.get('indexsubdata') === datadetail.indexdata  ) {
                return true;
            }
            else {
                return false;
            }
        });    
        storesub.filter('deleted',false);
        counter = storesub.getCount();
        
//        store = me.getGridsubdetail().getStore();
//        store.clearFilter(true);
//        store.filter('deleted', false);
//        counter = store.getCount();
//        store.clearFilter();
        return counter + 1;
    },

    indexSubDetail2: function () {
        var me, form, store, counter;
        me = this;
        var pd = me.paramdetail;
        var datadetail = pd.rowdata['data'];
        storesub = me.getGridsubdetail().getStore();
        
        storesub.clearFilter(true);
        counter = storesub.getCount();
   
            storesub.filterBy(function(rec, id) {
            if(rec.get('kasbondeptdetail_id') === datadetail.kasbondeptdetail_id ) {
                return true;
            }
            else {
                return false;
            }
        });    
        storesub.filter('deleted',false);
        counter = storesub.getCount();
        return counter + 1;
    },
    formDataSubDetailAfterRender: function () {
        var me, pd, p, rowdata, action, state, counter, sort, form, desc, f, project_id;
        me = this;
        pd = me.paramdetail;
        p = me.paramsubdetail;
        rowdata = pd.rowdata['data'];
        me.kelsub_id = rowdata.kelsub_id;
        me.balancecoa = rowdata.amount;
        form = me.getFormdatasubdetail();
        formd = me.getFormdata();
        f = me.getFormdata('kasbondeptformdata');
        valueModels = f.down("[name=pt_id]").valueModels[0];
        project_id = valueModels.data.project_id;
        state = me.getFormdata().up('window').state.toLowerCase();
        
        store = me.getStore("Subgl");

        form.down("[name=subgl_id]").on('keyup' , function(e, t, eOpts){
          store.proxy.extraParams = {
                "hideparam": 'getsubglbykelsub',
                "project_id": project_id,
                "pt_id": me.getVal(formd, 'pt_id', 'value'),
                "kelsub_id": me.kelsub_id
            }
        });


        switch (p.stateform) {
            case 'create':
               //a console.log(rowdata);
                if(rowdata.kasbondept_id === 0) {
                    counter = me.indexSubDetail();
                  //  console.log('1');
                }
                else {
                    counter = me.indexSubDetail2();
                  //  console.log('2');
                }
                me.setVal(form, 'kasbondept_id', me.idheadervalue);
                me.setVal(form, 'kasbondeptdetail_id', me.iddetailvalue);
                me.setVal(form, 'coa_id', rowdata.coa_id);
                me.setVal(form, 'kelsub_id', rowdata.kelsub_id);
                me.setVal(form, 'kelsub', rowdata.kelsub);
                me.setVal(form, 'indexdata', counter);
                break;
            case 'update':
                me.iddetailvalue = rowdata.kasbondeptdetail_id;
                form.loadRecord(p.rowdata);
                break;
            default:
        }
        me.setStoreSubcode();
        me.formatCurrencyFormdata(me, form);
    },
    Checksubdatadetail: function () {
        var me, status, returndata, p, grid, store, filter = '';
        me = this;
        p = me.paramsubdetail;
        p.checkdata = false;
        grid = me.getGridsubdetail();
        store = grid.getStore();
        store.each(function (record)
        {
            if (record.data['kasbondept_id'] == p.row.kasbondept_id &&
                    record.data['kasbondeptdetail_id'] == p.row.kasbondeptdetail_id &&
                    record.data['coa_id'] == p.row.coa_id &&
                    record.data['kelsub_id'] == p.row.kelsub_id &&
                    record.data['subgl_id'] == p.row.subgl_id
                    )
            {
                p.checkdata = true;
            }
        });
    },
    dataSaveSubDetailstore: function () {
        var me, p, pd, form, grid, store, record, row, indexdata, getindex, f, project_id = '';
        me = this;
        p = me.paramsubdetail;
        pd = me.paramdetail;
        form = me.getFormdatasubdetail();
        formdetail = me.getFormdatadetail();
         f = me.getFormdata('kasbondeptformdata');
        valueModels = f.down("[name=pt_id]").valueModels[0];
        project_id = valueModels.data.project_id;
        if (form.getForm().isValid()) {
            grid = me.getGridsubdetail();
            store = grid.getStore();
            row = form.getForm().getValues();
            p.row = row;
            me.Checksubdatadetail();
            switch (p.stateform) {
                case 'create':
                    if (p.checkdata == false) {
                        row['statedata'] = 'create';
                        row['project_id'] = project_id;
                        row['pt_id'] = me.pt_id;
                        row['deleted'] = false;
                        row['indexsubdata'] = pd.rowdata['data'].indexdata;
                        row[me.iddetailfield] = me.iddetailvalue;
                        store.add(row);
                        store.commitChanges();
                    } else {
                        me.buildWarningAlert("Sorry data already exist in this transaction");
                    }
                    break;
                case 'update':
                    getindex = store.indexOf(p.rowdata);
                    record = store.getAt(getindex);
                    record.beginEdit();
                    row['statedata'] = 'update';
                    row['deleted'] = false;
                    row[me.iddetailfield] = me.iddetailvalue;
                    record.set(row);
                    record.endEdit();
                    store.commitChanges();
                    break;
            }
            // console.log(store);
            //me.getSubdata(store, pd.rowdata['data']);
            
           // store.filter('deleted', false);
            p.totalsubdetail = store.sum('amount');
            formdetail.down('[name=amount]').setValue(p.totalsubdetail);
          //  me.setSumsubdetail();
            me.setDataSubDetailAftersave();
            form.up('window').close();
        }
    },
    setDataSubDetailAftersave: function () {
        var me, store, counter;
        me = this;
        store = me.getGridsubdetail().getStore();
        counter = store.getCount();
        if (counter) {
            var index = counter - 1;
            if (index == 0) {
                me.getGridsubdetail().getSelectionModel().select(index, true);
            } else {
                me.getGridsubdetail().getSelectionModel().deselectAll();
                me.getGridsubdetail().getSelectionModel().select(index, true);
            }
        }
    },
    setStoreSubcode: function () {
        var me, store, form;
        me = this;
        form = me.getFormdata();
        valueModels = form.down("[name=pt_id]").valueModels[0];
        project_id = valueModels.data.project_id;
        store = me.getStore("Subgl");
        store.load({
            params: {
                "hideparam": 'getsubglbykelsub',
                "project_id": project_id,
                "pt_id": me.getVal(form, 'pt_id', 'value'),
                "kelsub_id": me.kelsub_id
            },
            callback: function (records, operation, success) {

            }
        });
    },
    getSubdata: function (storesub, datadetail) {
        var me, datasub, count;
        me = this;
        storesub.clearFilter(true);
        count = storesub.getCount();
        if (count !== 0) {
            storesub.filterBy(function (rec, id) {
                datasub = rec['data'];
                if (datasub.coa_id == datadetail.coa_id && datasub.kasbondeptdetail_id == me.iddetailvalue) {
                    return true;
                } else {
                    return false;
                }
            });
        }
    },
    setSumsubdetail: function () {
        var me, pd, p, store, store_h, storedetail, form, amount, totaldetail,
                balance, totalsubdetail, msgdata, status, gridsubdetail,
                getindexdetail, recorddetail, rowdetail, state, flagdetail;

        me = this;
        pd = me.paramdetail;
        gridsubdetail = me.getGridsubdetail();
        p = me.paramsubdetail;

        form = me.getFormdatasubdetail();
        amount = amount = me.balancecoa;
        store = gridsubdetail.getStore();
        storedetail = me.getGriddetail().getStore();
        me.getSubdata(store, pd.rowdata['data']);
        if (store.getCount() > 0) {
            store.filter('deleted', false);
            totalsubdetail = store.sum('amount');
        } else {
            totalsubdetail = p.totalsubdetail;
        }

        me.Mask(gridsubdetail.down('[name=balancecoa]').setValue(totalsubdetail));
        amount = me.unMask(gridsubdetail.down('[name=balancecoa]').getValue());
        balance = parseFloat(amount) - parseFloat(totalsubdetail);
        me.Mask(gridsubdetail.down('[name=balancecoa]').setValue(balance));

        rowdetail = {};
        getindexdetail = storedetail.indexOf(pd.rowdata);
        recorddetail = storedetail.getAt(getindexdetail);
        recorddetail.beginEdit();
        state = me.getFormdata().up('window').state.toLowerCase();

        if (state == 'update' && pd.rowdata['data'].statedata == 'update') {
            flagdetail = 'update';
        } else if (state == 'update' && pd.rowdata['data'].statedata == 'view') {
            flagdetail = 'update';
        } else if (state == 'update' && pd.rowdata['data'].statedata == 'create') {
            flagdetail = 'create';
        } else if (state == 'create' && pd.rowdata['data'].statedata == 'create') {
            flagdetail = 'create';
        }

        rowdetail['statedata'] = flagdetail;
        rowdetail['amount'] = totalsubdetail;
        recorddetail.set(rowdetail);
        recorddetail.endEdit();
        storedetail.commitChanges();
        store.clearFilter();
        me.setSumdetail();

        //console.log(me.iddetailfield);
        //console.log(me.iddetailvalue);
        formdetail = me.getFormdatadetail();
        formdetail.down('[name=amount]').setValue(totalsubdetail);
        me.getSubdata(store, pd.rowdata['data']);
        store.clearFilter(true);
        store.filter('deleted', false);
        store.filter(me.iddetailfield, me.iddetailvalue);

    },
    AjaxRequest: function (form = '') {
        var me;
        me = this;
        if (form != '') {
            Ext.Ajax.request({
                url: me.urlrequest,
                timeout: 45000000,
                method: 'POST',
                params: {
                    data: Ext.encode(me.senddata)
                },
                success: function (response) {

                    if(response.responseText.includes("Belum ada")){
                        Ext.Msg.alert('Error', response.responseText);
                        form.up('window').close();
                        return false;
                    }

                    try {
                        me.info = Ext.JSON.decode(response.responseText);
                        me.setSuccessEvent(form);
                    }
                    catch(err) {
                        Ext.Msg.alert('Error', 'Request Failed.');
                        form.up('window').close();
                    }


                },
                failure: function (response) {
                    form.up('window').close();
                }
            });
    }
    },
    setSuccessEvent: function (form = '') {
        var me, value, data, form, voucher_date, duedate, state;
        me = this;
        if (form != '') {
            data = me.info.data;
            switch (me.info.parameter) {
                case 'getemployee':
                    me.pt_id = data.pt_id;
                    me.employee_id = data.employee_id;
                    me.manager_id = data.manager_id;
                    me.department_id = data.department_id;
                    break;
                case 'gethod':
                    var f = me.getFormdata();
                    state = f.up('window').state.toLowerCase();
                    if (state != 'update'){
                        if (parseInt(f.down("[name=kasbondept_reference_id]").getValue()) == 0) {
                            f.down("[name=approveby_id]").setValue(data.manager_id);   
                        }
                    }
                    break;
                case 'generatecasbonrequest':
                    form.down("[name=voucher_no]").setValue(data); //nomor kasbon department
                    break;
                case 'global_param':
                    if(data.name == 'MAX_ROW_VOUCHER'){
                        me.max_row_voucher = parseInt(data.value);
                    }
                break;
                case 'sendrequestmail':
                    me.loadingrequest.hide();
                    me.getGrid().getStore().reload();
                 case 'getdataproject':
                    if(data == 1){
                          me.setReadonly(form, 'dataflow', true);
                         form.down('[name=dataflow]').setValue('I');
                    }else{
                        // SEFTIAN ALFREDO 26/10/21
                        state = form.up('window').state.toLowerCase();
                        if (state == 'create') {
                            form.down('[name=dataflow]').setValue('I');
                        }else{
                            if ( me.paramdetail.rowdata['data'].dataflow == 'O' ) {
                                form.down('[name=dataflow]').setValue('O');
                            }else{
                                form.down('[name=dataflow]').setValue('I');
                            }
                        }
                    }
                    break;
                break;
            }
    }

    },
    indexCreateData: function (grid = '') {
        var me, form, store, counter;
        me = this;
        if (grid != '') {
            store = grid.getStore();
            counter = store.getCount();
            return counter + 1;
        } else {
            return 1;
    }
    },

    setStatus: function () {
        var me, form, status;
        me = this;
        form = me.getFormdata();
        status = form.down("[name=status]").getValue();
        if (status == '1') {
            form.down("[name=lblstatus]").setText("OPEN", true);
        } else if (status == '2') {
            form.down("[name=lblstatus]").setText("APPROVED", true);
        } 
        else {
            if (status == '3') {
                form.down("[name=lblstatus]").setText("POSTING", true);
            }
            me.getFormdata().getForm().getFields().each(function (field) {
                field.setReadOnly(true);
            });
            me.getFormdata().down('#btnSave').setDisabled(true);
            me.getFormdata().down('#kasbondepttab').setDisabled(true);
        }
    },

    formDataAfterRender: function (form = '', flagform) {
        var me, record, row, state, description, formheader, grid, store, counter, griddetail;
        if (form != '') {
            var me = this;
            state = form.up('window').state.toLowerCase();
            if (flagform == 'formdata') {
                me.fdar().init();
                me.loadComboBoxStore(form);
                me.getMaxRowVoucher(form);
                switch (state) {
                    case 'create':
                        me.getDefaultEmployee(form);
                        Ext.StoreManager.lookup('Kasbondeptdetail').removeAll();
                        Ext.StoreManager.lookup('Kasbondeptsubdetail').removeAll();
                        me.fdar().create();
                        //form.down("[name=status]").setValue('1');
                        //AUTO APPROVED
                        form.down("[name=status]").setValue('2');
                        form.down("[name=currency_word]").setValue('Rupiah');
                        break;
                    case 'update':
                        me.fdar().update();
                        me.setReadonly(form, 'pt_id', true);
                        me.setReadonly(form, 'department_id', true);
                        //me.setReadonly(form, 'approveby_id', true);
                        me.setReadonly(form, 'voucher_date', true);
                        grid = me.getGrid();
                        store = grid.getStore();
                        record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                        counter = store.getCount();
                        if (counter > 0) {
                            row = record['data'];
                            if(parseInt(row.made_by) < 1) {
                                me.setVal(form,'made_by',row.other_made_by);
                            }
                            //console.log(row.made_by);
                            me.in_out = row.dataflow; 
                            //me.setValCombo(form,'vendor_note',0,row.vendor_note);
                        }
                        var approvalNotes = record.get('approval_notes');
                        // console.log(approvalNotes);
                        if ( approvalNotes && approvalNotes != '' ) {
                            form.down('button[action=add_notes]').setDisabled(false);
                            form.down('[name=approval_notes]').setVisible(true);
                        }
                        break;
                    case 'read':
                        me.fdar().read();
                        grid = me.getGrid();
                        store = grid.getStore();
                        record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                        counter = store.getCount();

                          var iscashback = record.get('is_cashback');
                          var cashbackby = record.get('cashbackby');

                          me.setVal(form,'made_by',record.get('made_by'));
                          me.setVal(form,'approveby_id',record.get('approveby_id'));

                           if (iscashback == 1){
                                form.down("[name=cashbackon]").setVisible(true);
                            }else if (iscashback == 0 && cashbackby != ""){
                               form.down("[name=uncashbackon]").setVisible(true); 
                            }

                        var approvalNotes = record.get('approval_notes');
                        // console.log(approvalNotes);
                        if ( approvalNotes && approvalNotes != '' ) {
                            form.down('[name=approval_notes]').setVisible(true);
                            form.down('button[action=add_notes]').setDisabled(true);
                        }else {
                            form.down('button[action=add_notes]').setDisabled(true);
                        }

                        if (record.get('purchaseletter_reward_id') > 0) {
                            me.getStore('Rewardcombo').load({
                                params : {
                                    "hideparam"               : 'getreward',
                                    "project_id"              : record.get('project_id'),
                                    "pt_id"                   : record.get('pt_id'),
                                    "query"                   : record.get('purchaseletter_reward_name'),
                                    "purchaseletter_reward_id": record.get('purchaseletter_reward_id')
                                },
                                callback: function (rec) {
                                    form.down("[name=purchaseletter_reward_id]").setValue(record.get('purchaseletter_reward_id'));
                                }
                            })
                        }

                        break;

                }
                me.setStatus();

            } else if (flagform == 'formdetail') {
                var detailgridsub = me.getGridsubdetail(); 
                griddetail = me.getGriddetail();
                formheader = me.getFormdata();
                me.setStoreCoaDept(formheader);
                 me.setStoreCashflow(0,0);
                description = me.getVal(formheader, 'description', 'value');
                var detailgridsub = me.getGridsubdetail(); 
                detailgridsub.setVisible(false);
                switch (state) {
                    case 'create':
                        counter = me.indexCreateData(griddetail);
                        me.paramdetail.iddetail = 0;
                        me.iddetailvalue = counter;
                        me.setVal(form, "indexdata", counter);
                       // me.setVal(form, 'dataflow', 'I');
                        me.setDataflow(form);
                        me.setVal(form, 'description', description);
                        break;
                    case 'update':

                        form.loadRecord(me.paramdetail.rowdata);
                        me.paramdetail.iddetail = me.paramdetail.rowdata['data'].kasbondeptdetail_id;
                        me.iddetailvalue = me.paramdetail.rowdata['data'].kasbondeptdetail_id;
                        me.coa_id = me.paramdetail.rowdata['data'].coa_id;
                        me.coa = me.paramdetail.rowdata['data'].coa;
                        me.kelsub_id = me.paramdetail.rowdata['data'].kelsub_id;
                        me.setStoreCashflow(me.coa_id, me.paramdetail.rowdata['data'].setupcashflow_id);
                        me.setDataflow(form);

//                        if (me.kelsub_id !== 0) {
//                            me.setReadonly(form, 'amount', true);
//                        } else {
//                            me.setReadonly(form, 'amount', false);
//                        }

                    if (me.kelsub_id !== 0) {
                     //semy4
                     
                     
                     //me.getSubdata(substore,pd.rowdata['data']);
                     //pd = me.paramdetail;
                     var pd = me.paramdetail;
                     var datadetail = pd.rowdata['data'];
                     var vid = datadetail.kasbondeptdetail_id;
                     //var detailgridsub = me.getGridsubdetail(); 
                     var storesub = Ext.data.StoreManager.lookup('Kasbondeptsubdetail');
                    // console.log(vid);
//                        console.log(datadetail);
                        
//                        console.log(me.iddetailvalue);

                    if(vid === 0) {
                       // console.log(datadetail);
                        //console.log('tdk ada');
//                        console.log(datadetail);
//                        console.log(storesub);
                        storesub.clearFilter(true);
                        count = storesub.getCount();
                            storesub.filterBy(function(rec, id) {
                            if(rec.get('coa_id') === datadetail.coa_id && rec.get('indexsubdata') === datadetail.indexdata  ) {
                                return true;
                            }
                            else {
                                return false;
                            }
                        });
                        storesub.filter("deleted",false);
                    }
                    else {
//                        console.log(storesub);
//                        console.log(datadetail);
                        storesub.clearFilter(true);
                        count = storesub.getCount();
                            storesub.filterBy(function(rec, id) {
                            if(rec.get('coa_id') === datadetail.coa_id && rec.get('kasbondeptdetail_id') === datadetail.kasbondeptdetail_id  ) {
                                return true;
                            }
                            else {
                                return false;
                            }
                        });
                        storesub.filter("deleted",false);
                    }
                   
  
                    me.setReadonly(form, 'amount', true);
                    detailgridsub.setVisible(true);
                    detailgridsub.down('toolbar button[action=create]').setDisabled(false);
                   
                } else {
                    me.setReadonly(form, 'amount', false);
                    detailgridsub.setVisible(false);
                    detailgridsub.down('toolbar button[action=create]').setDisabled(true);
                }
                        
                        if(me.paramdetail.rowdata['data'].dataflow == 'I'){
                            me.setVal(form, 'dataflow', 'I');
                        }else{
                            me.setVal(form, 'dataflow', 'O');
                        }

//                        if (me.in_out == 'I') {
//                            form.down("[name=dataflow]").setValue('O');
//                        } else {
//                            form.down("[name=dataflow]").setValue('I');
//                        }
                        break;

                }

            }else  if (flagform == 'formtracking') {
                me.ftar().init();
                me.loadComboBoxStore(form);
                switch (state) {
                    case 'create':
                      
                        break;
                    case 'update':
                     
                        break;
                    case 'read':
                        me.ftar().read();
                        me.formatCurrencyFormdata(me, me.getFormtracking());
                        grid = me.getGrid();
                        store = grid.getStore();
                        record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));

                        counter = store.getCount();

                       
                    
                        break;

                }
             

            }


    }
    },
    setFormdataready: function (form = '', flagform) {
        var me, store, state, form, griddetail, gridsubdetail, storedetail, storedecvdept,
                record, grid, gridattachment, storeattachment;
        me = this;
        if (form != '') {
            state = form.up('window').state.toLowerCase();
            if (flagform == 'formdata') {
                switch (state) {
                    case 'create':
                        me.idheadervalue = 0;
                        griddetail = me.getGriddetail();
                        storedetail = griddetail.getStore();
                        if (storedetail.getCount() > 0) {
                            storedetail.removeAll();
                        }
                        gridattachment = me.getGridattachmentdetail();
                        storeattachment = gridattachment.getStore();
                         if (storeattachment.getCount() > 0) {
                            storeattachment.removeAll();
                        }
                        me.setLabel(me, 'lblstatus', 'OPEN', true);
                        // me.setValue(me, 'status', '1');
                        // AUTO APPROVED
                        me.setValue(me, 'status', '2');
                        me.setVal(form, 'voucher_date', me.dateNow);
                        me.setStorePtuser(form);
                        me.setStoreDeptuser(form);
                       // me.setStoreApproveby(form);
                        me.generateVoucherno(form);
                       
                        break;
                    case 'update':
                        var gridheader = me.getGrid();
                        var storeheader = gridheader.getStore();
                        var recordheader = storeheader.getAt(storeheader.indexOf(gridheader.getSelectionModel().getSelection()[0]));
                        console.log(recordheader);
                        var counterheader = storeheader.getCount();
                        if (counterheader > 0) {
                            var rowheader = recordheader['data'];
                        }

                       // me.setStoreApproveby(form);

                        me.idheadervalue = me.getValue(me, 'kasbondept_id', 'value');
                        storedetail = me.getGriddetail().getStore();
                        if (storedetail.getCount() > 0) {
                            storedetail.removeAll();
                        }
                        me.getDatadetail();
                        me.setSumdetail();
                        me.getDatadetailAttachment();
                        //me.setVal(form, 'tipekasbondept_id', recordheader.get('tipekasbondept_id'));
                        // form.down("[name=kasbondept_reference_id]").setReadOnly(true);
                        break;
                    case 'read':
                        me.idheadervalue = me.getValue(me, 'kasbondept_id', 'value');
                        storedetail = me.getGriddetail().getStore();
                        gridattachment = me.getGridattachmentdetail();
                        storeattachment = gridattachment.getStore();
                         if (storeattachment.getCount() > 0) {
                            storeattachment.removeAll();
                        }
                        if (storedetail.getCount() > 0) {
                            storedetail.removeAll();
                        }
                        me.getDatadetail();
                        me.setSumdetail();
                        me.getDatadetailAttachment();
                        break;

                }
            }else if (flagform == 'formtracking'){
                  switch (state) {
                    case 'read':
                        var ft = me.getFormtracking();
                        me.idheadervalue = ft.down('[name=kasbondept_id]').getValue();

                        storedecvdept = me.getGriddecvdept().getStore();
                        if (storedecvdept.getCount() > 0) {
                            storedecvdept.removeAll();
                        }
                        me.getDatadecvdept();
                       me.getDataHistory();

                    break;



                  }




            }else if (flagform == 'formshortcutattachment'){
                     switch (state) {
                    case 'create':
                        var gridheader = me.getGrid();
                        var storeheader = gridheader.getStore();
                        var recordheader = storeheader.getAt(storeheader.indexOf(gridheader.getSelectionModel().getSelection()[0]));

                        var formshortcut = me.getFormshortcutattachment();
                        formshortcut.down('[name=kasbondept_id]').setValue(recordheader.get('kasbondept_id'));

                        me.getDataShortcutAttachment();
                    
                        break;
                    case 'update':
                        var gridheader = me.getGrid();
                        var storeheader = gridheader.getStore();
                        var recordheader = storeheader.getAt(storeheader.indexOf(gridheader.getSelectionModel().getSelection()[0]));
                     
                        //me.idheadervalue = me.getValue(me, 'kasbondept_id', 'value');
                      
                      
                        me.getDataShortcutAttachment();
                      
                        //me.setVal(form, 'tipekasbondept_id', recordheader.get('tipekasbondept_id'));
                        break;
                    case 'read':
                      
                        break;

                }



            }
    }

    },
    getDatadetail: function () {
        var me, pd, counter, form, rowdata, lengthkelsub, store, grid, rawjson = '';
        me = this.getMe();
        pd = me.paramdetail;
        form = me.getFormdata();
        pd.grid = me.getGriddetail();
        pd.store = me.getStore("Kasbondeptdetail");
        pd.store.load({
            params: {
                "hideparam": 'default',
                "kasbondept_id": me.getValue(me, 'kasbondept_id', 'value'),
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
            try {
                counter = pd.store.getCount();
                rawjson = pd.store.proxy.getReader().jsonData;
                if (counter > 0) {
                    rowdata = records[0]['data'];
                    pd.grid.getSelectionModel().select(0, true);
                    lengthkelsub = parseFloat(rowdata.kelsub.length);
                    if (lengthkelsub > 0) {
                       // form.down('[name=gridtabkasbondeptsubdetail]').setDisabled(false);
                    } else {
                       // form.down('[name=gridtabkasbondeptsubdetail]').setDisabled(true);
                    }
                    pd.totaldetail = rawjson.totalamount;
                    me.setVal(form, 'amount', me.Mask(rawjson.totalamount));
                    me.setVal(form, 'totaldetail', me.Mask(rawjson.totalamount));
                   
                }

            }
             catch(err) {
                  console.log(err.message);
                }
            }
        });

    },
    getDatadecvdept: function () {
        var me, pd, counter, form, rowdata, lengthkelsub, store, grid, rawjson = '';
        me = this;
        pd = me.paramdetail;
        form = me.getFormtracking();
        pd.grid = me.getGriddecvdept();
        pd.store = pd.grid.getStore();
        //var totaldetail = 0;
        var kasbondept_id = form.down('[name=kasbondept_id]').getValue();
        pd.store.load({
            params: {
                "hideparam": 'default',
                "kasbondept_id": kasbondept_id,
                "start": 0,
                "limit": 25,
            },
            callback: function (records, operation, success) {
                totaldetail = 0;
                 records.forEach(function (item) { 
                        totaldetail = totaldetail + item.data.amount;
                }); 
                
             me.setTotalAmount(totaldetail);
            }
        });


      
     

    },
     getDataHistory: function () {
        var me, pd, counter, form, rowdata, lengthkelsub, store, grid, rawjson = '';
        me = this;
        pd = me.paramdetail;
        form = me.getFormtracking();
        pd.grid = me.getGriddetaillog();
        pd.store = pd.grid.getStore();
        var kasbondept_id = form.down('[name=kasbondept_id]').getValue();
        pd.store.load({
            params: {
                "hideparam": 'default',
                "kasbondept_id": kasbondept_id,
                "start": 0,
                "limit": 25,
            },
            callback: function (records, operation, success) {
                counter = pd.store.getCount();
                rawjson = pd.store.proxy.getReader().jsonData;
                if (counter > 0) {
                    rowdata = records[0]['data'];
                    pd.grid.getSelectionModel().select(0, true);
                  /*  lengthkelsub = parseFloat(rowdata.kelsub.length);
                    pd.totaldetail = rawjson.totalamount;
                    me.setVal(form, 'amount', me.Mask(rawjson.totalamount));
                    me.setVal(form, 'totaldetail', me.Mask(rawjson.totalamount));
                    */
                }
            }
        });

    },
    getDatadetailAttachment: function () {
    
            var me, pd, counter, form, rowdata, lengthkelsub, storeattachment, gridattachment, rawjson, gridmain = '';
            me = this.getMe();
            pd = me.paramdetail;
            form = me.getFormdata();
            pd.gridattachment = me.getGriddetail();
            pd.storeattachment = me.getStore("Kasbondeptattachmentdetail");
            pd.storeattachment.load({
                params: {
                    "hideparam": 'attachment',
                    "kasbondept_id": me.getValue(me, 'kasbondept_id', 'value'),
                    "start": 0,
                    "limit": 1000,
                },
                callback: function (records, operation, success) {
                    counter = pd.storeattachment.getCount();
                    rawjson = pd.storeattachment.proxy.getReader().jsonData;
                }
            });
 

    },
    getDataShortcutAttachment: function () {
        var me, pd, counter, form, rowdata, lengthkelsub, store, grid, rawjson, kasbondept_id = '';
        me = this;
        pd = me.paramdetail;
        form = me.getFormshortcutattachment();
        pd.grid = me.getGridshortcutattachment();
        kasbondept_id = form.down('[name=kasbondept_id]').getValue();
        pd.store = pd.grid.getStore();
        pd.store.load({
            params: {
                "hideparam": 'attachment',
                "kasbondept_id": kasbondept_id,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                counter = pd.store.getCount();
                rawjson = pd.store.proxy.getReader().jsonData;
                if (counter > 0) {
                    rowdata = records[0]['data'];
                    pd.grid.getSelectionModel().select(0, true);
                  

                }
            }
        });

    },
    gridActionColumndetailclick: function (view, cell, row, col, e) {
        var me, pd, grid, action = '';
        me = this;
        pd = me.paramdetail;
        grid = me.getGriddetail();
        grid.getSelectionModel().select(row);
        pd.action = e.getTarget().className.match(/\bact-(\w+)\b/)[1];
        pd.rowdata = grid.getStore().getAt(row);
        me.actiondataDetail();
    },
    checkTabsubcoa: function () {
        var me, pd, form, tabPanel, name, rowdetail;
        me = this;
        pd = me.paramdetail;
        form = me.getFormdata();
        rowdetail = pd.rowdata;
        tabPanel = form.down("[name=kasbondepttab]").getActiveTab();
        name = tabPanel.name;
        if (name == 'gridtabkasbondeptsubdetail') {
            if (rowdetail !== null) {
                me.Tabsubcoa(rowdetail);
            } else {
                form.down('[name=gridtabkasbondeptsubdetail]').setDisabled(true);
                me.buildWarningAlert("Please select item on grid detail coa...!");
            }
        }
    },
    Tabsubcoa: function (rowdetail) {
        var me, storedetail, countdetail, pd, state, form,
                gridsubdetail, storesub, countersub, datasub, datadetail;
        me = this;
        datadetail = rowdetail['data'];
        pd = me.paramdetail;
        form = me.getFormdata();
        state = form.up('window').state.toLowerCase();
        gridsubdetail = me.getGridsubdetail();
        storesub = gridsubdetail.getStore();
        countersub = storesub.getCount();
        gridsubdetail.down('[name=coa]').setValue(datadetail.coa);
        gridsubdetail.down('[name=coaname]').setValue(datadetail.coaname);
        gridsubdetail.down('[name=balancecoa]').setValue(datadetail.amount);
        if (countersub > 0) {
            if (state !== 'create' && datadetail.statedata !== 'create') {
                me.iddetailvalue = datadetail.kasbondeptdetail_id;
                me.getDatasubdetail();
            } else {
                me.iddetailvalue = datadetail.indexdata;
                me.getSubdata(storesub, datadetail);
            }
        }
    },
    cellgridDetail: function () {
        var me, pd, form, statehead, lengthkelsub = '';
        me = this;
        form = me.getFormdata();
        statehead = form.up('window').state.toLowerCase();
        pd = me.paramdetail;
        me.gridSelectionChangedetail();
        pd.grid = me.getGriddetail();
        pd.object = pd.grid.getSelectionModel().getSelection();
        pd.data = '';
        for (var i = 0; i <= pd.object.length - 1; i++) {
            pd.data = pd.object[i];
        }

        if (pd.data !== '') {
            pd.rowdata = pd.data;
            pd.row = pd.rowdata['data'];
            if (pd.row.kelsub_id == 0) {
               // form.down('[name=gridtabkasbondeptsubdetail]').setDisabled(true);
            } else {
               // form.down('[name=gridtabkasbondeptsubdetail]').setDisabled(false);
                if (pd.row.statedata !== 'create' && statehead !== 'create') {
                    me.iddetailvalue = pd.row.kasbondeptdetail_id;
                    me.getDatasubdetail();
                } else {
                    if (statehead == 'create') {
                        me.iddetailvalue = pd.row.indexdata;
                    } else {
                        me.iddetailvalue = pd.row.kasbondeptdetail_id;
                    }
                }
            }
        }
    },
    getDatasubdetail: function () {
        var me, pd, p, counter, form, rowdata = '';
        me = this;
        pd = me.paramdetail;
        p = me.paramsubdetail;
        rowdata = pd.rowdata['data'];
        form = me.getFormdata();
        p.grid = me.getGridsubdetail();
        //p.store = p.grid.getStore();
         Ext.StoreManager.lookup('Kasbondeptsubdetail').load({
       
            params: {
                "hideparam": 'default',
                "kasbankdept_id": rowdata.kasbankdept_id,
                "kasbondeptdetail_id": rowdata.kasbondeptdetail_id,
                "start": 0,
                "limit": 100,
            },
            callback: function (records, operation, success) {
                counter = Ext.StoreManager.lookup('Kasbondeptsubdetail').getCount();
                p.counter = counter;
            }
        });
    },
    griddetailitemdoubleclick: function () {
        var me, pd;
        me = this;
        pd = me.paramdetail;
        pd.action = 'update';
        me.actiondataDetail();
    },
    actiondataDetail: function () {
        var me, pd, returndata;
        me = this;
        pd = me.paramdetail;
        me.cellgridDetail();
        switch (pd.action) {
            case 'update':
                me.paramdetail.stateform = 'update';
                me.GenerateFormdata(me.paramdetail);
                break;
            case 'destroy':
                me.dataDestroydetailwithflag();
                break;
            default:
                returndata = "No action selected";
        }
    },
    Checkdatadetail: function (grid = '') {
        var me, status, returndata, pd, grid, store, filter = '';
        me = this;
        pd = me.paramdetail;
        pd.checkdata = false;
        grid = me.getGriddetail();
        store = grid.getStore();
        store.each(function (record)
        {
            if (record.data['kasbondept_id'] == pd.row.kasbondept_id &&
                    record.data['coa_id'] == pd.row.coa_id &&
                    record.data['indexdata'] == pd.row.indexdata
                    )
            {
                pd.checkdata = true;
            }
        });
    },
    //semy2
    dataSaveDetailstore: function (form = '', grid = '') {
        var me, pd, form, grid, store, record, row, indexdata, state, getindex = '';
        me = this;
        pd = me.paramdetail;
        if (form != '' && grid != '') {
            if (form.getForm().isValid()) {
                store = grid.getStore();
                row = form.getForm().getValues();
                row[me.idheaderfield] = me.idheadervalue;
                pd.row = row;
                me.Checkdatadetail(grid);
                state = form.up('window').state.toLowerCase();
                switch (state) {
                    case 'create':
                        if (pd.checkdata == false) {
//                            row['statedata'] = 'create';
//                            row['project_id'] = apps.project;
//                            row['pt_id'] = me.pt_id;
//                            row['coa_id'] = me.coa_id;
//                            row['coa'] = me.coa;
//                            row['kelsub_id'] = me.kelsub_id;
//                            row[me.idheaderfield] = me.idheadervalue;
//                            store.add(row);
//                            store.commitChanges();
                            indexdata = grid.getSelectionModel().getSelection()[0];
                            getindex = store.indexOf(indexdata);
                            record = store.getAt(getindex);
                            record.beginEdit();
                            row['statedata'] = 'create';
                            row['coa_id'] = me.coa_id;
                            row['coa'] = me.coa;
                            row[me.idheaderfield] = me.idheadervalue;
                            //console.log(row);
                            record.set(row);
                            record.endEdit();
                            store.commitChanges();
                        } else {
                            me.buildWarningAlert("Sorry code = " + me.coa + " ,already exist in this transaction");
                        }
                        break;
                    case 'update':
                        indexdata = grid.getSelectionModel().getSelection()[0];
                        getindex = store.indexOf(indexdata);
                        record = store.getAt(getindex);
                        record.beginEdit();
                        row['statedata'] = 'update';
                        row['pt_id'] = me.pt_id;
                        row['coa_id'] = me.coa_id;
                        row['coa'] = me.coa;
                        row['kelsub_id'] = me.kelsub_id;
                        row[me.idheaderfield] = me.idheadervalue;
                        record.set(row);
                        record.endEdit();
                        store.commitChanges();
                        break;
                }
                store.filter('deleted', false);

                totaldetail = 0;
                store.each(function(record) {
                    df = record.data.dataflow;
                    detailamount = record.data.amount;
                    if(df=='O'){
                        totaldetail = totaldetail - detailamount;
                    }else{
                        totaldetail = totaldetail + detailamount;
                    }
                });


                //pd.totaldetail = store.sum('amount');
                pd.totaldetail = totaldetail;
                me.setSumdetail();
                //me.setDatadetailAftersave(grid);
                form.up('window').close();
            }

    }

    },
    setSumdetail: function () {
        var me, pd, store, formheader, amount, totaldetail,
                balance, msgdata, status, voucher_no, form, grid;

        me = this;
        pd = me.paramdetail;

        form = me.getFormdatadetail();
        grid = me.getGriddetail();
        formheader = me.getFormdata();
        store = grid.getStore();

        if (store.getCount() > 0) {
            store.filter('deleted', false);
            totaldetail = 0;
            store.each(function(record) {
                df = record.data.dataflow;
                detailamount = record.data.amount;
                if(df=='O'){
                    totaldetail = totaldetail - detailamount;
                }else{
                    totaldetail = totaldetail + detailamount;
                }

            });



            totaldetail = totaldetail;

        } else {
            totaldetail = 0;
        }
        me.Mask(me.setVal(formheader, 'amount', totaldetail));
        amount = me.unMask(me.getVal(formheader, 'amount', 'value'));
        balance = parseFloat(amount) - parseFloat(totaldetail);
        me.setVal(formheader, 'totaldetail', parseFloat(totaldetail));
        me.setVal(formheader, 'balance', parseFloat(balance));
        store.clearFilter(true);
        store.filter('kasbondept_id', me.idheadervalue);
        store.filter('deleted', false);
        me.formatCurrencyFormdata(me, formheader);



    },
    setDatadetailAftersave: function () {
        var me, grid, store, counter,state,form;
        me = this;
        grid = me.getGriddetail();
        form = me.getFormdatadetail();
        state = form.up('window').state.toLowerCase();

        store = grid.getStore();
        counter = store.getCount();
        if (counter) {
            var index = counter - 1;
            if (index == 0) {
                grid.getSelectionModel().select(index, true);
            } else {
                if (state == 'create'){
                    grid.getSelectionModel().deselectAll();
                    grid.getSelectionModel().select(index, true);
                }else{
                    //grid.getSelectionModel().select(index, true);
                    grid.getSelectionModel().selectAll();
                }
            }

        }
    },
     setStoreCashflow: function (coa_id, setupcashflow_id) {
        var me, store, form;
        me = this;
        form = me.getFormdata();
        formd = me.getFormdatadetail();
        store = me.getStore("Cashflow");
        store.load({
            params: {
                "hideparam": 'getsetupcashflow',
                "project_id": apps.project,
                "pt_id": me.getVal(form, 'pt_id', 'value'),
                "department_id": me.getVal(form, 'department_id', 'value'),
                "coa_id": coa_id
            },
            callback: function (records, operation, success) {
                if (typeof records !== 'undefined' && records.length > 0) {
                    if(setupcashflow_id>0){
                        me.setVal(formd, 'setupcashflow_id', setupcashflow_id);
                    }else{
                        if (coa_id>0) {
                            for(var i = 0; i < records.length; i++) {
                                if (records[i].data.coa_id == coa_id) {
                                    console.log(records[i].data);
                                    me.setVal(formd, 'setupcashflow_id', records[i].data.setupcashflow_id);
                                    break;
                                } else {
                                    me.setVal(formd, 'setupcashflow_id', 0);
                                }
                            }
                        }
                    }
                    
                }
            }
        });
    },
    getDefaultEmployee: function (form) {
        var me;
        me = this;
        me.senddata = {
            "hideparam": 'getemployee',
            "project_id": apps.project
        }
        me.urlrequest = 'cashier/kasbondept/read';
        me.AjaxRequest(form);
    },
    // SEFTIAN ALFREDO, 15/09/21
    getMaxRowVoucher: function (form) {
        var me,
        me = this;
        me.senddata = {
                    "hideparam": 'global_param', //sesuai global param
                    "globalname": 'MAX_ROW_VOUCHER',
                    "project_id": me.project_id,
                    "param_date": null,
                    "pt_id": me.pt_id,
                }
        me.urlrequest = me.urlcommon;
        me.AjaxRequest(form);
    },
    // #################################
    getEmployeebypt: function () {
        var me = this;
        var form = me.getFormdata();
        valueModels = form.down("[name=pt_id]").valueModels[0];
        var pt_id = form.down("[name=pt_id]").getValue();
        var project_id = valueModels.data.project_id;
        store = me.getStore('Employee');
        store.reload({
            params: {
                "hideparam": 'getemployeebypt',
                "start": 0,
                "limit": 1000000,
                "pt_id": pt_id,
                "project_id": project_id,
            },callback: function (records, operation, success) {
                    store.clearFilter(true);
                    me.setVal(form, 'made_by', '');
                   me.setVal(form, 'approveby_id', '');
                    me.setVal(form, 'department_id', '');
                   me.project_id = project_id;
                    store.each(function (record)
                    {
                        if (record.data['employee_id'] == me.manager_id) {
                            //me.setVal(form, 'approveby_id', record.data['employee_id']);
                        }
                    });
                }




        });
        store = me.getStore('Employeehod');
        store.reload({
            params: {
                "hideparam": 'getemployeehodbypt',
                "start": 0,
                "limit": 1000000,
                "pt_id": pt_id,
                "project_id": project_id,
            },callback: function (records, operation, success) {
                    store.clearFilter(true);
                    me.setVal(form, 'made_by', '');
                   me.setVal(form, 'approveby_id', '');
                    me.setVal(form, 'department_id', '');
                   me.project_id = project_id;
                    store.each(function (record)
                    {
                        if (record.data['employee_id'] == me.manager_id) {
                            //me.setVal(form, 'approveby_id', record.data['employee_id']);
                        }
                    });
                }

        });

    },
    gethod: function (form) {
        var me = this;
        var f = me.getFormdata();
        var id = f.down("[name=made_by]").getValue();
        var pt = f.down("[name=pt_id]").getValue();
        valueModels = f.down("[name=pt_id]").valueModels[0];
        var project_id = valueModels.data.project_id;
        me.senddata = {
            "hideparam": 'gethod',
            "project_id": project_id,
            "pt_id": pt,
            "employee_id": id
        }
        me.urlrequest = 'cashier/kasbondept/read';
        me.AjaxRequest(form);
    },
  setStoreApproveby: function (form = '') {
       var me, store, form, project_id, pt_id, dept_id;

        valueModels = form.down("[name=pt_id]").valueModels[0];
        pt_id = form.down("[name=pt_id]").getValue();
        dept_id = form.down("[name=department_id]").getValue();
        project_id = valueModels.data.project_id;

        if (form != '') {
            me = this;
            store = me.getStore("Employee");
            store.reload({
                params: {
                    "hideparam": 'getemployeebydept',
                    "project_id": project_id,
                    "pt_id": pt_id,
                    "department_id": dept_id,
                },
                callback: function (records, operation, success) {
                    store.clearFilter(true);
                    //store.filter("department_id", me.department_id);
                    store.each(function (record)
                    {
                        if (record.data['employee_id'] == me.manager_id) {
                            //me.setVal(form, 'approveby_id', record.data['employee_id']);
                        }
                    });
                }
            });
    } 

    }, 
    setStorePtuser: function (form = '') {
        var me, store, form;
        me = this;
        if (form != '') {
            store = me.getStore("Ptbyuser");
            store.reload({
                params: {
                    "hideparam": 'getptbyuser',
                    "project_id": apps.project,
                    "start": 0,
                    "limit": 1000,
                },
                callback: function (records, operation, success) {
                    store.each(function (record)
                    {
                        if (record.data['project_id'] == apps.project && record.data['pt_id'] == apps.pt) {

                            me.setVal(form, 'pt_id', record.data['pt_id']);
                        }
                    });
                }
            });
    }
    },
    setStoreDeptuser: function (form = '') {
        var me, store, form;
            me = this;
            if (form != '') {
                store = me.getStore("Department");
                store.reload({
                    params: {
                        "hideparam": 'getdepartment',
                    },
                    callback: function (records, operation, success) {
                        store.each(function (record)
                        {
                            if (record.data['department_id'] == me.department_id) {
                                me.setVal(form, 'department_id', record.data['department_id']);
                                me.setVal(form, 'prefixdept', record.data['prefixdept']);
                                me.prefixdept = record.data['code'];
                            }
                        });
                    }
                });
        }
    },
    setStoreDeptuserPt: function () {
        var me, store, form;
        me = this;
        form = me.getFormdata();
        store = me.getStore("Department");
        store.reload({
            params: {
                "hideparam": 'getdepartmentbyprojectpt',
                "pt_id" : me.pt_id,
                "project_id" : me.project_id,
                "user_id" : apps.uid
            },
            callback: function (records, operation, success) {
                store.each(function (record)
                {
                    if (record.data['department_id'] == me.department_id) {
                        me.setVal(form, 'department_id', record.data['department_id']);
                        me.setVal(form, 'prefixdept', record.data['prefixdept']);
                        me.prefixdept = record.data['code'];
                    }
                });
            }
        });
    },
     setDeptFormSearch: function () {
        var me, store, form, ptid, projectid;
        me = this;
        form = me.getFormsearch();
        ptid = form.down("[name=pt_id]").getValue();
        projectid = form.down("[name=project_id]").getValue();
        store = me.getStore("Department");
        store.reload({
            params: {
                "hideparam": 'getdepartmentbyprojectpt',
                "pt_id" : ptid,
                "project_id" : projectid,
                "user_id" : apps.uid
            },
            callback: function (records, operation, success) {
                store.each(function (record)
                {
                    if (record.data['department_id'] == me.department_id) {
                        me.setVal(form, 'department_id', record.data['department_id']);
                    }else{
                        me.setVal(form, 'department_id' , '');
                    }
                });
            }
        });
    },
    setStoreCoaDept: function (form = '') {
        var me, store, form, f, project_id;
        me = this;
        f = me.getFormdata();
        valueModels = f.down("[name=pt_id]").valueModels[0];
        project_id = valueModels.data.project_id;
        if (form != '') {
            store = me.getStore("CoadeptcomboV2");
            store.load({
                params: {
                    "hideparam": 'getcoabyprojectptdeptV2',
                    "project_id": project_id,
                    "pt_id": me.getVal(form, 'pt_id', 'value'),
                    "department_id": me.getVal(form, 'department_id', 'value')
                },
                callback: function (records, operation, success) {

                }
            });
    }

    },
    generateVoucherno: function (form = '') {
        var me, form, state, voucher_date;
        me = this;
      
        if (form != '') {
            state = form.up('window').state.toLowerCase();
            voucher_date = me.formatDate(me.getVal(form, 'voucher_date', 'value'));
            switch (state) {
                case 'create':
                    me.senddata = {
                        "hideparam": 'generatecasbonrequest',
                        "project_id": (me.project_id == 0) ? apps.project : me.project_id,
                        "param_date": voucher_date,
                        "pt_id": (me.pt_id == 0) ? apps.pt : me.pt_id,
                        "module": 'CASHBONREQUEST',
                        "prefix": me.prefixdept,
                        "flag": me.flaggeneratevoucherno,
                    }
                    me.urlrequest = me.urlcommon;
                    me.AjaxRequest(form);

                    break;
            }
    }

    },
    dataDestroydetailwithflag: function () {
        var me, rows, ph, pd, confirmmsg, successmsg, failmsg,
                record, recordcounttext, store, selectedRecord, msg, successcount
                , parameter, pesan, dataconfirm, ph, pd;

        me = this;
        ph = me.paramheader;
        pd = me.paramdetail;
        dataconfirm = me.fieldconfirmdetail;

        rows = me.getGriddetail().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            store = me.getGriddetail().getStore();

            if (rows.length == 1) {
                selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(dataconfirm) + ']'; 
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }

            Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
                if (btn == 'yes') {
                    resetTimer();
                    msg = function () {
                        me.getGriddetail().up('window').mask('Deleting data, please wait ...');
                    };
                    for (var i = 0; i < rows.length; i++) {
                        record = rows[i];
                        record.set("deleted", true);
                        record.set("statedata", 'delete');
                        store.clearFilter(true);
                        store.filter(me.idheaderfield, me.idheadervalue);
                        store.filter('deleted', false);
                    }
                    me.setSumdetail();
                }

            });

        }
    },
    dataPrintdata: function () {
        var me, grid, store, record, row, data;
        me = this;
        grid = me.getGrid();
        store = grid.getStore();
        record = me.getGrid().getSelectionModel().getSelection()[0];
        if (grid.getSelectionModel().getSelection().length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            row = record['data'];
            data = row;
            me.setforAjax(data,'report');
           
        }

    },
    setforAjax: function (data, parameter) {
        var me, info;
        me = this;
        data['hideparam'] = parameter;
        Ext.Ajax.request({
            url: 'cashier/kasbondept/read',
            timeout: 45000000,
            method: 'POST',
            params: {
                data: Ext.encode(data)
            },
            success: function (response) {
                info = Ext.JSON.decode(response.responseText);
                me.createWindows();
                if(parameter == 'report'){
                      me.submitReport(info.data);
                }else{
                     me.submitPrintExtension(info.data);
                }
              
            },
            failure: function (response) {

            }
        });
    },
    createWindows: function () {
        var me = this;
        me.winId ='reportkasbondepartmentrequestwindows';
        me.instantWindow('Panel', 800, 'Result ', 'state-report', me.winId, 'masterreport');
        me.win = desktop.getWindow(me.winId);
    },
    submitReport: function (value) {       
        var me, report, html, madeby, grid, row;
        me = this;
        grid = me.getGrid();
        row = grid.getSelectionModel().getSelection();
        var idprint = '';

        for (var i = 0; i < row.length; i++) {
            var kasbondept_id = row[i]['data']["kasbondept_id"];
           
           
            var id = row[i]['data']['kasbondept_id'];
            if (id != 0) {
                if ((i + 1) == row.length) {
                    idprint = idprint + id;
                   
                 
                } else {
                    idprint = idprint + id + '~';
                 
                   

                }
            }
        }

       
        if(value.cashbondept_tpl == 'default'){
            tpl = 'Kasbondeptv6';
        }else{
            tpl = value.cashbondept_tpl;
        }
        value.kasbondept_id = idprint;
        report = 'report_kasbondept/'+tpl;
        html = me.Reportviewerjs(value, report);
        me.win.down("#MyReportPanel").body.setHTML(html);
        $("#Reportform").submit();
    },

     submitPrintExtension: function (value) {       
        var me, report, html, madeby;
        me = this;
        if(value.made_by_name == value.employee_name){
            madeby = value.employee_name;
        }else if (value.made_by_name == '') {
            madeby = value.employee_name;
        }else if (value.employee_name == ''){   
            madeby = value.made_by_name;
        }else{
            madeby = value.made_by_name+'/'+value.employee_name;
        }

        value.madeandemployee = madeby;
   
        if(value.cashbondept_tpl == 'default'){
            tpl = 'Kasbondeptv6_extend';
        }else{
            tpl = value.cashbondept_tpl;
        }
        report = 'report_kasbondept/'+tpl;
        html = me.Reportviewerjs(value, report);
        me.win.down("#MyReportPanel").body.setHTML(html);
        $("#Reportform").submit();
    },
        
     indexDetail: function () {
        var me, form, store, counter;
        me = this;
        store = me.getGriddetail().getStore();
        counter = store.getCount();
        var i = store.sum('indexdata');
        return i + 1;
    },
    
       formDataClose2: function () {
        var me = this;
        me.getFormdatadetail().up('window').close();
        me.clearallStore2();
    },
    
        clearallStore2: function () {
        var me;
        me = this;
        //me.getGridsubdetail().getStore().removeAll();
    },
    
        gridSelectionChangesubdetail: function () {
        var me = this;
        var grid = me.getGridsubdetail(),
                row = grid.getSelectionModel().getSelection();
        grid.down('#btnEdit').setDisabled(row.length != 1);
        //grid.down('#btnDelete').setDisabled(row.length < 1);
    },
    
     sendRequestmail: function (state) {
        var me, data;
        me = this;
        data = me.valueform;
        data['kasbondept_id'] = me.idheadervalue;
        data['hideparam'] = 'sendrequestmail';
        if(state=='update'){
            data['description'] = '[UPDATED] '+data['description'];
        }
        me.senddata = data;
        me.urlrequest = me.urldata + 'create';
        me.AjaxRequest('email');
    },

   
    
    execAction: function (el, action, me) {
        if (!action) {
            action = '';
        }
        if (!me) {
            me = this;
        }
        
       switch (action) {
            case me.bindPrefixName + 'Create':
              me.checkKKB(el, acts[action], action);
               /* data = { 'hideparam' : 'checkoscashbon',
                 'project_id' : apps.project,
                 'pt_id' : apps.pt,
                 'user_id' :apps.uid, 
                }
                Ext.Ajax.request({
                    url: 'cashier/kasbondept/read',
                    timeout: 45000000,
                    method: 'POST',
                    params: {
                        data: Ext.encode(data)
                    },
                    success: function (response) {
                        info = Ext.JSON.decode(response.responseText);
                        if (info.msg == 'NO LIMIT' || info.msg == 'LIMIT AVAILABLE'){ // IF LIMIT CASHBON DOESN'T EXIST OR LESS THAN LIMIT

                             // me.formDataShow(el, acts[action], action);
                               //Ext.Msg.hide();
                                 me.messageoscashbon = info.msg;
                              
                        
                        }else{// SETTING LIMIT CASHBON EXIST
                            me.messageoscashbon = info.msg;
                            Ext.Msg.alert('Error', info.msg);
                             

                        }
                    }

            });
            */

           

           

                break;
            case me.bindPrefixName + 'Update':
            case me.bindPrefixName + 'Read':
                me.formDataShow(el, acts[action], action);
                break;
            case 'show':
                me.formDataShow(el, action);
                break;
            case me.bindPrefixName + 'Delete':
                me.dataDestroy(el);
                break;
            case me.bindPrefixName + 'Printvoucher':
                me.printVoucherdata();
                break;
            case me.bindPrefixName + 'Import':
                break;
            case me.bindPrefixName + 'Generate':
                break;
            case me.bindPrefixName + 'Copycashbon':
                me.copyCashbon(0);
                break;
            case me.bindPrefixName + 'Sendmail':
                Ext.Msg.show({
                    title: 'Send Approval Mail',
                    msg: 'Are sure want send approval mail?',
                    width: 300,
                    closable: false,
                    buttons: Ext.Msg.YESNO,
                    buttonText:
                            {
                                yes: 'YES',
                                no: 'NO'
                            },
                    multiline: false,
                    fn: function (buttonValue, inputText, showConfig) {
                        if (buttonValue == 'yes') {
                            var record, row, data;
                            me.loadingrequest.show();
                            record = me.getGrid().getSelectionModel().getSelection()[0];
                            row = record['data'];
                            data = row;
                            data['hideparam'] = 'sendrequestmail';
                            me.senddata = data;
                            me.urlrequest = me.urldata + 'create';
                            me.AjaxRequest('email');
                        }

                    },
                    icon: Ext.Msg.QUESTION
                });
                break;

        } 
    },
    BodyLoading : function(){
                var messagebox=  Ext.Msg.show({
                    title: 'Warning',
                    msg: 'Please Wait ....',
                    closable: true
                });
              
                Ext.Function.defer(function () {
                    messagebox.zIndexManager.bringToFront(messagebox);                
                 },100);
                //Ext.Msg.alert('Warning', returnmsg).setBodyStyle('z-index: 999999;');

    },
    checkKKB : function(el, acts, action){
        var me = this;
        var form = me.getFormdata();
      
         data = { 'hideparam' : 'checkpindahcoa',
                 'project_id' : apps.project,
                 'pt_id' : apps.pt,
                }
            Ext.Ajax.request({
                    url: 'cashier/kasbondept/read',
                    timeout: 45000000,
                    method: 'POST',
                    params: {
                        data: Ext.encode(data)
                    },
                    success: function (response) {
                        info = Ext.JSON.decode(response.responseText);
                        //console.log(info.msg);
                       // console.log(me.messageoscashbon);
                        if (info.msg == 'GO ON' || info.msg == 'NOT_KKB'){ // IF NOT KASBON KAS BESAR / MATCH WITH REQUIREMENT
                                if(info.msg == 'GO ON'){
                                    me.kkbornot = info.msg;
                                }


                               /* if(me.messageoscashbon == null){
                                     me.formDataShow(el, acts[action], action);
                                    Ext.Msg.hide();
                                }else if(info.msg == 'NOT_KKB' && me.messageoscashbon == 'NO LIMIT'){
                                     me.formDataShow(el, acts[action], action);
                                    Ext.Msg.hide();
                                }else if(info.msg == 'NOT_KKB' && me.messageoscashbon == 'LIMIT AVAILABLE'){
                                     me.formDataShow(el, acts[action], action);
                                    Ext.Msg.hide();
                                }else if(info.msg == 'GO ON' && me.messageoscashbon == 'LIMIT AVAILABLE'){
                                     me.formDataShow(el, acts[action], action);
                                    Ext.Msg.hide();
                                }else if(info.msg == 'GO ON' && me.messageoscashbon == 'NO LIMIT'){
                                     me.formDataShow(el, acts[action], action);
                                    Ext.Msg.hide();
                                } */

                               if(info.msg == 'NOT_KKB'){
                                     me.formDataShow(el, acts[action], action);
                                    Ext.Msg.hide();
                                }else if(info.msg == 'GO ON'){
                                     me.formDataShow(el, acts[action], action);
                                    Ext.Msg.hide();
                                }
                             
                        
                        }else{// HIT THE CONDITION
                         
                            Ext.Msg.show({
                                title: 'Error',
                                msg: info.msg,
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK,
                                fn: function () {
                                    me.formDataClose();
                                   
                                }
                            });

                        }
                    }

            });



    },
    dataSearch: function () {
        resetTimer();
        var me = this;
        var form = me.getFormsearch().getForm();
        var store = me.getGrid().getStore();

        me.getFormsearch().down("[name=hideparam]").setValue('default');  
         me.unformatCurrencyFormdata(me, me.getFormsearch());  
        var fields = me.getFormsearch().getValues();
        for (var x in fields)
        {
            store.getProxy().setExtraParam(x, fields[x]);
        }
        me.loadPage(store);
    },
    copyCashbon: function(mode){
       var me, checked, grid, record, row, data, reportfile, store;
       me = this;
       grid = me.getGrid();
       record = grid.getSelectionModel().getSelection()[0];


       if (typeof record === 'undefined') {
          Ext.Msg.alert('Error', 'Pilih data yang akan di-Copy');
          return 0;
       }

       if(mode===1){
            var status = parseInt(record.get('status'));
           if(status>1){
              me.tools.alert.warning("Status voucher harus dalam posisi <b>Open</b>");
              return 0;
           }
       }

       var kasbondept_id = record.get("kasbondept_id");
       row = record['data'];

       store = me.getStore("Ptbyuser");

       var pt_id = 0;
       var ptname = '';
       var project_id = me.project_id;
       var opt = '';
       var projectname = '';

       if(project_id === 0 || project_id==null){
            me.project_id = me.last_project_id;
            project_id = me.last_project_id;
       }else{
            me.last_project_id = project_id;
       }
       store.each(function(record,id){
            if(record.get('project_id')==project_id){
                pt_id = record.get('pt_id');
                ptname = record.get('ptname');
                projectname = record.get('projectname')+'<br>';
                opt = opt+'<option value="'+pt_id+'">'+ptname+'</option>';
            }
        });

       if(mode===0){
         var title = 'Copy Cashbon : '+record.get("voucher_no");
       }else{
         var title = 'Pindah ke PT : '+record.get("voucher_no");
       }

       var mb = Ext.MessageBox.show({
            title: title,
            msg: projectname+'<select id="copyvoucher_pt_id" class="x-form-field x-form-required-field x-form-text">'+opt+'</select>',
            buttons: Ext.MessageBox.OKCANCEL,
            fn: function (btn) {
                if (btn == 'ok') {
                    var copyvoucher_pt_id = Ext.get('copyvoucher_pt_id').getValue();

                    var project_id_selected = record.get("project_id");

                    if(project_id_selected != project_id){
                        Ext.Msg.alert('Error', 'Project Tidak Boleh Berbeda');
                      return 0;
                    }

                    row = record['data'];
                    me.valueform = row; 
                    me.valueform.pt_id_new = copyvoucher_pt_id;
                    me.valueform.project_id_old = project_id;

                    if(mode===0){
                      me.MessageConfirm('copycashbon', 'Are you sure want to copy ?', ' Confirm Your Action');
                    }else{
                      me.MessageConfirm('pindahptvoucher', 'Are you sure want to move data to '+projectname+' ?', ' Confirm Your Action');
                    }

                }
            }
        });
    },
     MessageConfirm: function (flag, msg, title) {
        var me, record, row, data, grid;
        me = this;
        form = me.getFormdata();
        grid = me.getGrid();
        Ext.Msg.show({
            title: title,
            msg: msg,
            width: 300,
            closable: false,
            buttons: Ext.Msg.YESNO,
            buttonText:
                    {
                        yes: 'YES',
                        no: 'NO'
                    },
            multiline: false,
            fn: function (buttonValue, inputText, showConfig) {
                if (buttonValue == 'yes') {
                    record = grid.getSelectionModel().getSelection()[0];
                    row = record['data'];
                    data = row;
                    data['hideparam'] = flag;
                    me.senddata = data;
                    me.loadingrequest.show();
                    me.urlrequest = me.urldata + 'update';
                    me.AjaxRequestV2();
                }
            },
            icon: Ext.Msg.QUESTION
        });
    },
     AjaxRequestV2: function () {
        var me;
        me = this;
        Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
            timeout: 45000000,
           // async: false, 
            params: {
                data: Ext.encode(me.senddata)
            },
            success: function (response) {
                if(response) {
                    try {
                        me.info = Ext.JSON.decode(response.responseText);
                        me.setSuccessEventV2();
                    } catch(e) {
                        me.loadingrequest.hide();
                        Ext.Msg.alert('Warning', 'Request Failed');
                        return false;
                    }
                }
            },
            failure: function (response) {
                me.alertFormdataFailed();
                me.getFormdata().up('window').close();
                //me.messagedata = 'data error';
                //throw me.messagedata;
            }
        });
    },

    setSuccessEventV2: function () {
        var me, value, data, form, voucher_date, duedate, state;
        me = this;
            data = me.info.data;
            switch (me.info.parameter) {
                case 'copycashbon':
                    me.loadingrequest.hide();
                    Ext.Msg.alert('Copied Successfully', data[2][0].MSG);
                    me.getGrid().getStore().reload();
                break;
                case 'extendcashbon':
                    me.loadingrequest.hide();
                    Ext.Msg.alert('Info', 'Extend Successfully');
                    me.getGrid().getStore().reload();
                break;
            }
   

    },
    trackingCashbon: function(){
    var me, checked, grid, record, row, data, reportfile, store;
       me = this;
       grid = me.getGrid();
       record = grid.getSelectionModel().getSelection()[0];

       if (typeof record === 'undefined') {
          Ext.Msg.alert('Error', 'Pilih data yang akan di-Tracking');
          return 0;
       }

        me.formTrackingShow('read');



    },
    formTrackingShow: function (el, act, action) {
        var me = this;
        var formtitle, formicon;

        var gfp = me.getFormProperties(action);
        var state = gfp.state;
        formtitle = gfp.formtitle;
        formicon = gfp.formicon;

        var winId = 'win-holidayformdata';
        var win = desktop.getWindow(winId);
        if (!win) {
            win = desktop.createWindow({
                id: winId,
                title: 'Tracking Cashbon',
                iconCls: formicon,
                resizable: false,
                minimizable: false,
                maximizable: false,
                width: 1010,
                renderTo: Ext.getBody(),
                constrain: true,
                constrainHeader: false,
                modal: true,
                layout: 'fit',
                shadow: 'frame',
                shadowOffset: 10,
                border: false,
                state: 'read',
                listeners: {
                    boxready: function () {
                        win.body.mask('Loading...');
                        var tm = setTimeout(function () {
                            win.add(Ext.create('Cashier.view.' + me.controllerName + '.FormTracking'));
                            win.center();
                            win.body.unmask();
                            clearTimeout(tm);
                        }, 1000);

                    }
                }

            });
        }
        win.show();
    },

     ftar: function () {
        var me = this;
        var x = {
            init: function () {
                /// init here
            },
            create: function () {
                /// create here  

            },
            update: function () {
             
                /// update here
            },
            read: function () { //========= added on march 15th 2016 by Tirtha
                var grid = me.getGrid();
                var store = grid.getStore();
                var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                me.getFormtracking().loadRecord(record);
                me.getFormtracking().getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
               //me.getFormtracking().down('#btnSave').setDisabled(true);
            },
          
        };
        return x;
    },

    setTotalAmount: function (totalamount) {
        var me, pd, store, formheader, amount, totaldetail,
                balance, msgdata, status, voucher_no, form, grid;

        me = this;

        form = me.getFormtracking();
        grid = me.getGriddecvdept();

         form.down('[name=amount_bayar]').setValue(accounting.formatMoney(totalamount));

       


    },

    setDataflow: function (form) {
        var me,formdata, project_id;
        me = this;
        formdata = me.getFormdata();
        project_id = formdata.down('[name=pt_id]').valueModels[0].data.project_id;
        me.senddata = {
            "hideparam": 'getdataproject',
            "project_id": project_id
        }
        me.urlrequest = 'cashier/kasbondept/read';
        me.AjaxRequest(form);
    },

      getGroupcashbontype: function (project_id, pt_id) {
        var me, store, form;
        me = this;
        store = me.getStore("Groupcashbontype");
        store.load({
            params: {
                "hideparam": 'getgroupcashbontype',
                "project_id": project_id,
                "pt_id": pt_id
            },
            callback: function (records, operation, success) {
                 store.each(function (record)
                {
                    if (record.data['tipekasbondept_id'] == me.tipekasbondept_id) {
                        me.setVal(form, 'tipekasbondept_id', record.data['tipekasbondept_id']);
                    }
                });
               
            }
        });
    },
     extendCashbon: function () {
        var me = this;
        var g = me.getGrid();
        var storeout = g.getStore();
       // var g = me.getPanel();
        var arr = [];
        var obj = [];
        var rows = me.getGrid().getSelectionModel().getSelection();
        var record = g.getSelectionModel().getSelection()[0];
        var allow = true;
        var allowmsg = '<ul>';
        var remainingkasbon = '';

         Ext.Ajax.request({
            async: true,
            url: 'cashier/kasbondept/read',
            method: 'POST',
            timeout: 45000000,
            params: {
                hideparam: 'remainingcashbonforextend',
                kasbondept_id: record['data'].kasbondept_id,
            },
            success: function (response) {
                resjson = Ext.JSON.decode(response.responseText);

                         if (record['data'].status_extend === "" && record['data'].kasbon_extension_id != 0) {
                            Ext.Msg.alert('Info', 'Cannot Process Cashbon Extension. <br/> Cashbon Extension is Still in Approval Process !');
                            return;
                        }else if (resjson.data == 0 || resjson.data <= 0 ){
                            Ext.Msg.alert('Info', 'This Cashbon Request Already Completed !');
                        }else {
                            if(allow==true){
                                

                                Ext.Msg.prompt('Reason for Extend', 'Please insert your reason:', function(boolean, text) {
                                 if(boolean == 'cancel'){
                                    return false;
                                 }else{
                                    if(text == ''){

                                           Ext.Msg.alert('Error', 'Reason must be filled!');
                                            return 0;

                                    }else{
                                        me.loadingrequest.show();

                                         me.senddata = {
                                            "hideparam": 'extendcashbon',
                                            "project_id": record['data'].project_id,
                                            "pt_id": record['data'].pt_id,
                                            "kasbondept_id": record['data'].kasbondept_id,
                                            "user_id": apps.uid,
                                            "voucher_no": record['data'].voucher_no,
                                            "amount" : record['data'].amount,
                                            "reason": text
                                        }
                                  
                                        me.urlrequest = 'cashier/kasbondept/update';
                                        me.AjaxRequestV2();

                                            



                                    }
                                  
                                 }

                                });
                            }
                            else{
                                me.tools.alert.warning(allowmsg);
                            }
                        }



               

            },
           
        });
       
      

        /////////////////////////////////////////////////////// 
      
    },

     gridActionColumnClick: function (view, cell, row, col, e, grid) {
        var me, record, m, grid, store;
        me = this;
        grid = me.getGrid();
        store = grid.getStore();
        record = store.getAt(row);
        m = e.getTarget().className.match(/\bact-(\w+)\b/);
        grid.getSelectionModel().select(row);
        row = record['data'];

        if (m) {
            switch (m[1]) {
                case me.bindPrefixName + 'Update':
                    me.formDataShow('update');
                    break;
                case me.bindPrefixName + 'Delete':
                    me.dataDestroy();
                    break;
                case me.bindPrefixName + 'Extend':
                    me.extendCashbon(row);
                    break;
                 case me.bindPrefixName + 'Preview':
                    me.formDataShow('read');
                    break;
                 case me.bindPrefixName + 'Attachment':
                    me.ShortcutAttachment();
                    break;
                 case me.bindPrefixName + 'PrintExtension':
                    me.PrintExtension();
                    break;
                
            }
        }
    },

    dataDestroy: function () {
        var me = this;
        var ids = [];
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

            for (var i = 0; i < rows.length; i++) {
                ids.push(rows[i].data.kasbondept_id);
            }

            Ext.Msg.confirm('Delete Data', confirmmsg + '<br><br>Reason <br><textarea type="text" id="reasondeletekasbondept" name="reasondeletekasbondept"></textarea>', function (btn) {
                if (btn == 'yes') {
                    if($('#reasondeletekasbondept').val().length < 5){
                        me.buildWarningAlert('Masukan alasan kenapa kasbon dihapus minimal 5 karakter');
                        return false;
                    }
                    resetTimer();
                    msg = function () {
                         me.loadingrequest.show();
                    };
                  
                    for (var i = 0; i < rows.length; i++) {
                        rows[i].data.reason_delete = $('#reasondeletekasbondept').val();
                        store.remove(rows[i]);
                    }

                    store.on('beforesync', msg);
                    store.sync({
                        success: function (s) {
                            me.getGrid().up('window').unmask();
                            var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
                            var successmsg = (rows.length == 1 ? selectedRecord : (rows.length + ' of ' + recordcounttext)) + ' deleted successfully.';
                            store.un('beforesync', msg);
                            store.reload();

                            Ext.Ajax.request({
                                url: 'cashier/kasbondept/update',
                                params: {
                                    data: Ext.encode({
                                        hideparam: 'updatereasondelete',
                                        kasbondept_id: ids.join(','),
                                        reasondelete: $('#reasondeletekasbondept').val(),
                                        pt_id: null
                                    })
                                }
                            })

                            if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
                                Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 0}});
                            }
                            Ext.Msg.show({
                                title: 'Success',
                                msg: successmsg,
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK
                            });
                            me.loadingrequest.hide();
                        },
                        failure: function (batch, options) {
                            // added on april 2016, ahmad riadi
                            var parameter = (batch.proxy.getReader().jsonData.param ? batch.proxy.getReader().jsonData.param : 'no');
                            var pesan = (batch.proxy.getReader().jsonData.msg ? batch.proxy.getReader().jsonData.msg : 'Unable to save data.');
                            if (parameter == 'used') {
                                failmsg = pesan;
                            } else {
                            	failmsg = pesan;
                                //failmsg = failmsg + ' The data may have been used.';
                            }

                            me.loadingrequest.hide();
                            store.un('beforesync', msg);
                            store.reload();
                            Ext.Msg.show({
                                title: 'Failure',
                                msg: failmsg,
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    });
                }
            });
        }
    },
    formDataAttachmentAfterrender: function () {
        var me, p, action, countdata, counter, state, form, rowdata;
        me = this.getMe();
        form = me.getFormdatauploadattachment();
        form.down("[name=file-path-attachment]").on('change' , function(inputFile, value){
            var fileSize = inputFile.fileInputEl.dom.files[0].size;
                fileSize = fileSize/1000000;
            if(fileSize>2){ //Limit 2 MB
                me.buildWarningAlert("Ukuran File Yang Diizinkan : 2 MB !");
                form.getForm().reset();
                return 0;
            }
        });
    },
    formUploadShortcutAfterrender: function () {
        var me, p, action, countdata, counter, state, form, rowdata;
        me = this.getMe();
        form = me.getFormuploadshortcutattachment();
        form.down("[name=file-path-attachment]").on('change' , function(inputFile, value){
            var fileSize = inputFile.fileInputEl.dom.files[0].size;
                fileSize = fileSize/1000000;
            if(fileSize>2){ //Limit 2 MB
                me.buildWarningAlert("Ukuran File Yang Diizinkan : 2 MB !");
                form.getForm().reset();
                return 0;
            }
        });
    },
     FormUploadAttachmentShow: function (action) {
        var me, p, psa, pmsa = '';
        var me = this.getMe();
        var r = Math.random().toString(36).substring(7);
        var w = me.instantWindow('FormDataUploadAttachment', 500, 'Upload Attachment', 'create', 'win-attachmentkasbondeptform'+r);
    },
    FormShortcutAttachmentShow: function (action) {
        var me, p, psa, pmsa = '';
        var me = this.getMe();
        var w = me.instantWindow('FormUploadShortcutAttachment', 500, 'Upload Attachment', 'create', 'win-attachmentkasbondeptformshortcutattachment');
    },
    UploadAttachment: function(){
        var me = this.getMe();
        var formdata = this.getFormdata();
        var form = this.getFormdatauploadattachment();
        var groupingdata = 0;
        var filetitle = form.down("[name=file-title]").getValue();
        var filename = form.down("[name=file-path-attachment]").getValue();
        if (filename == "" || filename == null) {
            Ext.Msg.alert('Warning', 'Please select files to upload');
            return false;
        }
        if (filetitle == "" || filetitle == null) {
            Ext.Msg.alert('Warning', 'Please fill Description');
            return false;
        }
        if(true){

            var kasbondept_id = 0;

            var senddata = form.getValues();

            //ovveride
            senddata["hideparam"] = 'uploadattachment';
            senddata["voucher_id"] = me.idheadervalue;
            senddata["cashier_note"] = 'uploadattachment';
            senddata["groupingdata"] = groupingdata;
            senddata["pt_id"] = me.pt_id;
            senddata["project_id"] = me.project_id;

            try {
                form.submit({
                    url: 'cashier/kasbondept/create',
                    waitMsg: 'Processing data...',
                    params: {
                        data: Ext.encode(senddata)
                    },
                    success: function(fp, o) {
                        
                            var dt = o.result.data;
                            var emsg = '';
                            var msg = '';
                            var errormsg = dt.error;
                            var voucher_id = 0;

                            var arrayLength = Object.keys(errormsg).length;

                            if(arrayLength>0){
                                for (var i = 0; i < arrayLength; i++) {
                                    if(typeof errormsg[i] !== "undefined"){
                                        emsg = emsg + errormsg[i] + '<br>';
                                    }
                                }
                                emsg = emsg + 'Proses Upload Dibatalkan!';
                                Ext.Msg.alert('Warning', emsg);
                                form.up('window').close();
                                me.messagedata = emsg;
                                Ext.Msg.alert('Warning', me.messagedata);
                                return false;
                            }else{
                                //insert to grid
                                var store = me.getStore('Kasbondeptattachmentdetail');
                                var rowdata = {
                                    hideparam: 'create',
                                    statedata: 'create',
                                    attachment_id: 0,
                                    filename: dt.filename,
                                    filesize: dt.filesize,
                                    remarks: filetitle,
                                    description: filetitle,
                                    path: dt.path,
                                    addon: dt.addon,
                                    deleted: false,
                                    link: '<a onclick="me.DownloadAttachment()">'+dt.filename+'</a>'
                                };
                                store.add(rowdata);
                                store.commitChanges();

                                me.messagedata = 'Uploaded Successfully.';
                                form.up('window').close();
                                Ext.Msg.alert('Info', dt.message);
                            }

                        try {

                            //nanti isinya sama dengan atas

                        } catch(err) {
                            Ext.Msg.alert('Warning', '[1] Processing failed !');
                            form.up('window').close();
                            return false;
                        }
                    },
                    failure: function(fp, o) {
                        Ext.Msg.alert('Warning', '[2] Processing failed !');
                        form.up('window').close();
                        return false;
                    }
                });
            }
            catch(err) {
                Ext.Msg.alert('Warning', '[3] Processing failed !');
                return false;
            }

        }
    },
    ShortcutUploadAttachment: function(){
        var me = this.getMe();
        var formdata = this.getFormshortcutattachment();
        var form = this.getFormuploadshortcutattachment();
        var gridShortcut = me.getGridshortcutattachment();
        var store = gridShortcut.getStore();
        var groupingdata = 0;
        var filetitle = form.down("[name=file-title]").getValue();
        var filename = form.down("[name=file-path-attachment]").getValue();
        if (filename == "" || filename == null) {
            Ext.Msg.alert('Warning', 'Please select files to upload');
            return false;
        }
        if (filetitle == "" || filetitle == null) {
            Ext.Msg.alert('Warning', 'Please fill Description');
            return false;
        }
        if(true){

            var kasbondept_id = formdata.down('[name=kasbondept_id]').getValue();

            var senddata = form.getValues();


            //ovveride
            senddata["hideparam"] = 'uploadattachment';
            senddata["voucher_id"] = me.idheadervalue;
            senddata["cashier_note"] = 'uploadattachment';
            senddata["groupingdata"] = groupingdata;
            senddata["pt_id"] = me.pt_id;
            senddata["project_id"] = me.project_id;


            try {
                form.submit({
                    url: 'cashier/kasbondept/create',
                    waitMsg: 'Processing data...',
                    params: {
                        data: Ext.encode(senddata)
                    },
                    success: function(fp, o) {
                        
                            var dt = o.result.data;
                            var emsg = '';
                            var msg = '';
                            var errormsg = dt.error;
                            var voucher_id = 0;

                            var arrayLength = Object.keys(errormsg).length;

                            if(arrayLength>0){
                                for (var i = 0; i < arrayLength; i++) {
                                    if(typeof errormsg[i] !== "undefined"){
                                        emsg = emsg + errormsg[i] + '<br>';
                                    }
                                }
                                emsg = emsg + 'Proses Upload Dibatalkan!';
                                Ext.Msg.alert('Warning', emsg);
                                form.up('window').close();
                                me.messagedata = emsg;
                                Ext.Msg.alert('Warning', me.messagedata);
                                return false;
                            }else{

                                 var rowdata = {
                                   // hideparam: 'create',
                                    //statedata: 'create',
                                    //attachment_id: 0,
                                    filename: dt.filename,
                                    filesize: dt.filesize,
                                    remarks: filetitle,
                                    description: filetitle,
                                    path: dt.path,
                                    addon: dt.addon,
                                    deleted: false,
                                    link: '<a onclick="me.DownloadAttachment()">'+dt.filename+'</a>',
                                    transaction_id: kasbondept_id,
                                };

                                me.SaveShortcutAttachment(rowdata,kasbondept_id);
                             

                                me.messagedata = 'Uploaded Successfully.';
                                form.up('window').close();
                                Ext.Msg.alert('Info', dt.message); 
                                store.reload();
                                
                            }

                        try {

                            //nanti isinya sama dengan atas

                        } catch(err) {
                            Ext.Msg.alert('Warning', '[1] Processing failed !');
                            form.up('window').close();
                            return false;
                        }
                    },
                    failure: function(fp, o) {
                        Ext.Msg.alert('Warning', '[2] Processing failed !');
                        form.up('window').close();
                        return false;
                    }
                });
            }
            catch(err) {
                Ext.Msg.alert('Warning', '[3] Processing failed !');
                return false;
            }

        }
    },
     Saveattachmentdetail: function (that, state) {
        var me, storeattachmentdetail, counterattachmentdetail, iddetail, statedatadetail, datadetail, actiondetail,
                resjsondetail, rowjsondetail, validdetail, msgdetail, parameterdetail, kelsub_id,
                storesubdetail, countersubdetail;
        me = that;
        storeattachmentdetail = Ext.data.StoreManager.lookup('Kasbondeptattachmentdetail');
        storeattachmentdetail.clearFilter(true);
        counterattachmentdetail = storeattachmentdetail.getCount();
        //JIKA CREATE / UPDATE
        var upstate = me.getFormdata().up('window').state.toLowerCase();

        var i = 0;
        if (counterattachmentdetail > 0) {

            storeattachmentdetail.each(function (record, index) {
                i = index + 1;
                iddetail = record.get("attachment_id");
                statedatadetail = record.get("statedata");
                if(iddetail>0 && statedatadetail==""){
                    statedatadetail = 'update';
                }
                actiondetail = statedatadetail;
                if (state == 'create' && statedatadetail == 'create') {
                    actiondetail = 'create';
                } else if (state == 'create' && statedatadetail == 'update') {
                    actiondetail = 'create';
                } else if (state == 'update' && statedatadetail == 'create') {
                    actiondetail = 'create';
                } else if (state == 'update' && statedatadetail == 'update') {
                    actiondetail = 'update';
                }

                if(iddetail==0){
                    actiondetail = 'create';
                }

                datadetail = record['data'];
                datadetail[me.idheaderfield] = me.idheadervalue;
                datadetail['parametersql'] = actiondetail;
                datadetail['hideparam'] = 'detailattachment' + actiondetail;


                if (me.urldetail !== me.urldetail + statedatadetail) {
                    var executedata = 0;
                    if (statedatadetail == 'create' || statedatadetail == 'update') {
                        executedata = 1;
                    }
                    if (statedatadetail == 'delete' && iddetail !== 0) {
                        executedata = 1;
                        actiondetail = 'delete';
                    }

                    if (executedata == 1) {
                        Ext.Ajax.request({
                            url: me.urldetail + actiondetail,
                            method: 'POST',
                            async: false, 
                            params: {
                                data: Ext.encode(datadetail)
                            },
                            success: function (response) {
                                var coa_id, indexdata;
                                try {
                                    resjsondetail = Ext.JSON.decode(response.responseText);
                                
                                    rowjsondetail = resjsondetail.data;
                                    validdetail = resjsondetail.success;

                                    if(validdetail == "false" || validdetail==false){
                                        me.messagedata = resjsondetail.msg;
                                        me.alertFormdataFailed();
                                        throw me.messagedata;
                                    }

                                }
                                catch (err) {
                                    me.messagedata = 'Attachment details are not saved';
                                    me.alertFormdataFailed();
                                    throw me.messagedata;
                                }

                                if(typeof resjsondetail.data === "undefined"){
                                    if(typeof resjsondetail.success === "undefined"){
                                        me.alertFormdataFailed();
                                        throw me.messagedata;
                                    }else{
                                        if(resjsondetail.success == "false"){
                                            me.alertFormdataFailed();
                                            throw me.messagedata;
                                        }
                                    }
                                }

                            },
                            failure: function (response) {
                                me.messagedata = 'data error';
                                me.alertFormdataFailed();
                                throw me.messagedata;
                            }
                        });
                    }
                }
            });
        }
    },
    SaveShortcutAttachment: function (rowdata,kasbondept_id) {
        var me, storeattachmentdetail, counterattachmentdetail, iddetail, statedatadetail, datadetail, actiondetail,
                resjsondetail, rowjsondetail, validdetail, msgdetail, parameterdetail, kelsub_id,
                storesubdetail, countersubdetail;
       
                datadetail = rowdata;
                datadetail['kasbondept_id'] = kasbondept_id;
                datadetail['parametersql'] = 'create';
                datadetail['hideparam'] = 'detailattachmentcreate';


                        Ext.Ajax.request({
                            url: 'cashier/kasbondept/detailcreate',
                            method: 'POST',
                            async: false, 
                            params: {
                                data: Ext.encode(datadetail)
                            },
                            success: function (response) {
                              //  var coa_id, indexdata;
                                try {
                                    resjsondetail = Ext.JSON.decode(response.responseText);
                                
                                    rowjsondetail = resjsondetail.data;
                                    validdetail = resjsondetail.success;

                                    if(validdetail == "false" || validdetail==false){
                                        me.messagedata = resjsondetail.msg;
                                        me.alertFormdataFailed();
                                        throw me.messagedata;
                                    }

                                }
                                catch (err) {
                                    me.messagedata = 'Attachment details are not saved';
                                    me.alertFormdataFailed();
                                    throw me.messagedata;
                                }

                                if(typeof resjsondetail.data === "undefined"){
                                    if(typeof resjsondetail.success === "undefined"){
                                        me.alertFormdataFailed();
                                        throw me.messagedata;
                                    }else{
                                        if(resjsondetail.success == "false"){
                                            me.alertFormdataFailed();
                                            throw me.messagedata;
                                        }
                                    }
                                }

                            },
                            failure: function (response) {
                                me.messagedata = 'data error';
                                me.alertFormdataFailed();
                                throw me.messagedata;
                            }
                        });
                 
    },
    FormUploadAttachmentRead: function (shortcut) {
        var me, p, psa, pmsa, grid, form = '';
        var me = this.getMe();
        if(shortcut == 0){
             grid = me.getGridattachmentdetail();
             form = me.getFormdata();
         }else{
             grid = me.getGridshortcutattachment();
             form = me.getFormshortcutattachment();
         }
       
        
        var rows = grid.getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } 
        if (rows.length > 1) {
            Ext.Msg.alert('Info', 'Please select 1 data !');
            return;
        } 

        var record = grid.getSelectionModel().getSelection()[0];
       
        var re = /(?:\.([^.]+))?$/;
        var ext = re.exec(record.get("filename"))[1]; 
        form.setLoading('Loading content...');
        Ext.Ajax.request({
            async: true,
            url: 'cashier/common/read',
            method: 'POST',
            timeout: 45000000,
            params: {
                hideparam: 'getattachmentfile',
                path: record.get("path")
            },
            success: function (response) {
                resjson = Ext.JSON.decode(response.responseText);
                var base64src = resjson.data.base64src;
                var downloadsrc = decodeURIComponent(resjson.data.signedUrl);
                if(ext=='pdf'){
                    var html='<embed scrolling="no" src="'+base64src+'" type="application/pdf" width="100%" height="100%">';
                }else{
                    var html='<div style="style="display: block; min-height: 600px; width: 700px; min-width: 700px">';
                        html = html+'<img src="'+base64src+'" style="overflow: auto; display: block; height: auto; width: 100%"></div>';
                        html = html+'<div><a style="padding: 10px; float: right;" target="_blank" href="'+downloadsrc+'" download>Download</a></div>';
                }

                Ext.create("Ext.Window",{
                    title : 'Attachment Viewer : ' + record.get("filename"),
                    width : 700,                            
                    height: 500,
                    closable : true,                           
                    html : html,  
                    autoScroll: true,                       
                    modal : true
                }).show();

                //Ext.Msg.alert('Attachment', '<div style="style="display: block; min-height: 500px; width: 700px; min-width: 700px"><img src="'+response+'" style="display: block; height: auto; width: 100%"></div><a target="_blank" href="'+response+'">Download</a>');
                form.setLoading(false);
            },
            failure: function (response) {
                me.alertFormdataFailed();
                form.setLoading(false);
                me.messagedata = 'data error';
                throw me.messagedata;
            }
        });

       
    },
    dataDestroyattachmentdetailwithflag: function () {

        var me, rows, ph, pd, confirmmsg, successmsg, failmsg,
                record, recordcounttext, store, selectedRecord, msg, successcount
                , parameter, pesan, dataconfirm, ph, pd;
        me = this.getMe();
        ph = me.paramheader;
        pd = me.paramdetail;
        dataconfirm = 'filename';

        //me.getGridattachmentdetail().down('#btnGenerate').setDisabled(false);

        rows = me.getGridattachmentdetail().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            store = me.getGridattachmentdetail().getStore();

            if (rows.length == 1) {
                selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(dataconfirm) + ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }

            var substore = [];
            var indexdatadeleted = [];
            var substorenew = [];
            var indexdata;

            Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
                if (btn == 'yes') {
                    resetTimer();
                    msg = function () {
                        me.getGridattachmentdetail().up('window').mask('Deleting data, please wait ...');
                    };

                    for (var i = 0; i < rows.length; i++) {
                        record = rows[i];
                        record.set("deleted", true);
                        record.set("statedata", 'delete');
                        record.set("hideparam", 'detailattachmentdelete');

                        store.clearFilter(true);
                        store.filter('deleted', false);

                    }

                }

            });

        }
    },
    ShortcutAttachment: function () {
        var me, p, psa, pmsa = '';
        var me = this.getMe();
        var w = me.instantWindow('FormShortcutAttachment', 805, 'File Attachment', 'create', 'win-attachmentkasbondeptformdata');
                
                
    },
    dataDestroyShortcutAttachment: function () {

        var me = this;
        var rows = me.getGridshortcutattachment().getSelectionModel().getSelection();
        var rec = me.getGridshortcutattachment().getSelectedRecord();
        var c = rec.data;
        var confirmmsg, successmsg, failmsg;
        var attachment_id = '';
        var row = {hideparam:'deleteshortcutattachment'};
        var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
        var store = me.getGridshortcutattachment().getStore();
         if (rows.length == 1) {
                var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get('filename') + ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            } 
        Ext.Msg.confirm('Delete Data', confirmmsg, function(btn) {
                if (btn == 'yes') {
                    resetTimer();
                      //var msg = function () {
                   
                    //};

                     for (var i = 0; i < rows.length; i++) {
                       
                        var id = rows[i]['data']['attachment_id'];
                        if (id != 0) {
                            if ((i + 1) == rows.length) {
                                attachment_id = attachment_id + id;
                             
                            } else {
                                attachment_id = attachment_id + id + '~';
                               

                            }
                        }
                    }
                    row['attachment_id'] = attachment_id;
                    row['pt_id'] = rows[0]['data']['pt_id'];
                    row['project_id'] = rows[0]['data']['project_id'];
                    //row['kasbondept_id'] = 0;


                     Ext.Ajax.request({
                                                url: 'cashier/common/create',
                                                timeout: 45000000,
                                                method: 'POST',
                                                params: {
                                                    data: Ext.encode(row)
                                                },
                                                success: function (response) {
                                                        info = Ext.JSON.decode(response.responseText);
                                                        var rowjsonheader = info.data;
                                                        var successmsg = info.msg;
                                                     

                                                       
                                                    
            
                                                     
                                                   
                                                          Ext.Msg.show({
                                                            title: 'Success',
                                                            msg: successmsg,
                                                            icon: Ext.Msg.INFO,
                                                            buttons: Ext.Msg.OK
                                                        });

                                                          store.reload();

                                                },
                                                failure: function (response) {
                                                     Ext.Msg.show({
                                                            title: 'Warning',
                                                            msg: 'Fail to Deleted!',
                                                            icon: Ext.Msg.INFO,
                                                            buttons: Ext.Msg.OK
                                                        });
                                                    store.reload();
                                                }
                                             
                                            });

                }
            });


    },

     PrintExtension: function () {
        var me, grid, store, record, row, data;
        me = this;
        grid = me.getGrid();
        store = grid.getStore();
        record = me.getGrid().getSelectionModel().getSelection()[0];
        if (grid.getSelectionModel().getSelection().length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            row = record['data'];
            data = row;
            me.setforAjax(data,'printextension');
           
        }
                
                
    },


    changeApprovalNotes: function (state) {
        var me = this;
        var f = this.getFormdata();

        if ( state ) {
            f.down('[name=approval_notes]').setVisible(true);
        }else{
            f.down('[name=approval_notes]').setVisible(false);
            f.down('[name=approval_notes]').setValue('');
        }
    },

    setReward : function(){
        var me    = this,
            form  = me.getFormdata(),
            store = me.getStore('Rewardcombo');
        
        store.load({
            "hideparam"               : 'getreward' ,
            "project_id"              : form.down("[name=pt_id]").valueModels[0].data.project_id ,
            "pt_id"                   : form.down("[name=pt_id]").getValue(),
            "purchaseletter_reward_id": 0
        });
        
        form.down("[name=purchaseletter_reward_id]").on('keyup', function (e, t, eOpts) {
            store.proxy.extraParams = {
                "hideparam"               : 'getreward',
                "project_id"              : form.down("[name=pt_id]").valueModels[0].data.project_id,
                "pt_id"                   : form.down("[name=pt_id]").getValue(),
                "purchaseletter_reward_id": 0
              }
        });
    },

    generatereward: function () {
        var me                       = this,
            form                     = me.getFormdata(),
            project_id               = form.down("[name=pt_id]").valueModels[0].data.project_id,
            pt_id                    = form.down("[name=pt_id]").getValue(),
            purchaseletter_reward_id = form.down("[name=purchaseletter_reward_id]").getValue(),
            griddetail               = me.getGriddetail(),
            storedetail              = griddetail.getStore(),
            final_data               = [],
            description_header       = '';
        
        form.setLoading('Create data detail, please wait...');
        Ext.Ajax.request({
            url   : 'cashier/kasbondept/read',
            method: 'POST',
            params: {
                project_id              : project_id,
                pt_id                   : pt_id,
                purchaseletter_reward_id: purchaseletter_reward_id,
                hideparam               : 'generatereward',
            },
            success : function (response) {
                var data = Ext.JSON.decode(response.responseText);
                if (data.success) {
                    var tmp_data = data.data

                    storedetail.loadData([], false);
                    
                    storedetail.clearFilter(true);
                    storedetail.filter('deleted', false);

                    for (var i = 0; i < tmp_data.length; i++) {
                        description_header = tmp_data[i].description;
                        me.is_over_target  = tmp_data[i].is_over_target;
                        me.amount_reward   = tmp_data[i].amount;

                        var obj_data = {
                            hideparam          : tmp_data[i].hideparam,
                            statedata          : tmp_data[i].statedata,
                            kelsub_id          : tmp_data[i].kelsub_id,
                            kasbondept_id      : tmp_data[i].kasbondept_id,
                            kasbondeptdetail_id: tmp_data[i].kasbondeptdetail_id,
                            indexdata          : tmp_data[i].indexdata,
                            tanggal_pakai      : tmp_data[i].tanggal_pakai,
                            coa_id             : tmp_data[i].coa_id,
                            coaname            : tmp_data[i].coaname,
                            kelsub             : tmp_data[i].kelsub,
                            kelsubdesc         : tmp_data[i].kelsubdesc,
                            dataflow           : tmp_data[i].dataflow,
                            setupcashflow_id   : tmp_data[i].setupcashflow_id,
                            amount             : accounting.formatMoney(tmp_data[i].amount),
                            description        : tmp_data[i].description,
                            remarks            : tmp_data[i].remarks,
                            coa                : tmp_data[i].coa,
                            balancecoa         : tmp_data[i].balancecoa
                        }

                        final_data.push(obj_data);
                    }

                    storedetail.add(final_data);
                    storedetail.commitChanges();        
                    storedetail.filter('deleted', false);
                    me.setSumdetail();                
                    griddetail.getView().refresh();
                    form.down("[name=description]").setValue(description_header);
                }
                form.setLoading(false);
            }
        });
    },

    getReference_cashbon: function () {
        var me         = this,
            fd         = me.getFormdata(),
            project_id = fd.down("[name=pt_id]").valueModels[0].data.project_id,
            pt_id      = fd.down("[name=pt_id]").getValue(),
            store      = me.getStore('Kasbonreffcombo');

        Ext.Ajax.request({
            url   : me.urldata + 'read',
            method: 'POST',
            async : false,
            params: {
                hideparam : 'getglobalparam',
                project_id: project_id,
                pt_id     : pt_id,
                name      : 'reference_cashbon',
                value     : 1
            },
            success: function (response) {
                resjson = Ext.JSON.decode(response.responseText);
                var result = resjson.data[0][0].result;

                if (result == 1) {
                    me.reference_cashbon = 1
                    // fd.down("[name=kasbondept_reference_id]").setVisible(true);
        
                    /* store.load({
                        "hideparam"    : 'getreferencecashbon',
                        "project_id"   : project_id,
                        "pt_id"        : pt_id,
                        "department_id": 0,
                        "kasbondept_id": 0
                    }); */
                    
                    /* fd.down("[name=kasbondept_reference_id]").on('keyup', function (e, t, eOpts) {
                        store.proxy.extraParams = {
                            "hideparam"    : 'getreferencecashbon',
                            "project_id"   : project_id,
                            "pt_id"        : pt_id,
                            "department_id": 0,
                            "kasbondept_id": 0
                        }
                    }); */
                    
                } else {
                    me.reference_cashbon = 0
                    // fd.down("[name=kasbondept_reference_id]").setVisible(false);
                }
            }
        });
    },

    setStoreReferenceCashbon: function () {
        var me            = this,
            fd            = me.getFormdata(),
            project_id    = fd.down("[name=pt_id]").valueModels[0].data.project_id,
            pt_id         = fd.down("[name=pt_id]").getValue(),
            department_id = fd.down("[name=department_id]").getValue();
            store         = me.getStore('Kasbonreffcombo');
        
            store.load({
                "hideparam"    : 'getreferencecashbon',
                "project_id"   : project_id,
                "pt_id"        : pt_id,
                "department_id": department_id,
                "kasbondept_id": 0
            });

            fd.down("[name=kasbondept_reference_id]").on('keyup', function (e, t, eOpts) {
                store.proxy.extraParams = {
                    "hideparam"    : 'getreferencecashbon',
                    "project_id"   : project_id,
                    "pt_id"        : pt_id,
                    "department_id": department_id,
                    "kasbondept_id": 0
                }
            });     
    },

    getDataCashbonReference: function (record) {
        var me             = this,
            fd             = me.getFormdata(),
            kasbondept_id  = record[0].data.kasbondept_id,
            griddetail     = me.getGriddetail(),
            storedetail    = griddetail.getStore(),
            gridsubdetail  = me.getGridsubdetail(),
            storesubdetail = Ext.data.StoreManager.lookup('Kasbondeptsubdetail'),
            detail         = [],
            subdetail      = [];
        
        fd.setLoading('Generate reference cashbon, please wait...');
        Ext.Ajax.request({
            url   : me.urldata + 'read',
            method: 'POST',
            async : false,
            params: {
                hideparam    : 'default',
                kasbondept_id: kasbondept_id
            },
            success: function (response) {
                resjson = Ext.JSON.decode(response.responseText);
                fd.down("[name=made_by]").setValue(parseInt(resjson.data[0].made_by));
                fd.down("[name=approveby_id]").setValue(parseInt(resjson.data[0].approveby_id));
                fd.down("[name=tipekasbondept_id]").setValue(resjson.data[0].tipekasbondept_id);
                fd.down("[name=amount]").setValue(resjson.data[0].amount);
                fd.down("[name=description]").setValue(resjson.data[0].description);
                fd.down("[name=po_no]").setValue(resjson.data[0].po_no);

                if (resjson.data[0].purchaseletter_reward_id > 0) {
                    me.getStore('Rewardcombo').load({
                        params : {
                            "hideparam"               : 'getreward',
                            "project_id"              : resjson.data[0].project_id,
                            "pt_id"                   : resjson.data[0].pt_id,
                            "query"                   : resjson.data[0].purchaseletter_reward_name,
                            "purchaseletter_reward_id": resjson.data[0].purchaseletter_reward_id
                        },
                        callback: function (rec) {
                            fd.down("[name=purchaseletter_reward_id]").setValue(resjson.data[0].purchaseletter_reward_id);
                        }
                    })
                }

                me.formatCurrencyFormdata(me, me.getFormdata());

                Ext.Ajax.request({
                    url   : me.urldetail + 'read',
                    method: 'POST',
                    async : false,
                    params: {
                        hideparam    : 'default',
                        kasbondept_id: kasbondept_id
                    },
                    success: function (response2) {
                        resjson2 = Ext.JSON.decode(response2.responseText);

                        for (var i = 0; i < resjson2.data.length; i++) {
                            data_detail = resjson2.data[i];
                            var kasbondeptdetail_id = data_detail.kasbondeptdetail_id;
    
                            var obj_detail = {
                                hideparam          : 'default',
                                statedata          : 'create',
                                kelsub_id          : data_detail.kelsub_id,
                                kasbondept_id      : 0,
                                kasbondeptdetail_id: 0,
                                indexdata          : data_detail.indexdata,
                                tanggal_pakai      : data_detail.tanggal_pakai,
                                coa_id             : data_detail.coa_id,
                                coa                : data_detail.coa,
                                coaname            : data_detail.coaname,
                                kelsub             : data_detail.kelsub,
                                kelsubdesc         : data_detail.kelsubdesc,
                                dataflow           : data_detail.dataflow,
                                setupcashflow_id   : data_detail.setupcashflow_id,
                                amount             : data_detail.amount,
                                description        : data_detail.description,
                                remarks            : data_detail.remarks,
                                subcashier_id      : data_detail.subcashier_id
                            }

                            detail.push(obj_detail);

                            // BAGIAN ISI DATA KE SUB NYA KALO ADA
                            Ext.Ajax.request({
                                url   : me.urlsubdetail + 'read',
                                method: 'POST',
                                async : false,
                                params: {
                                    hideparam          : 'default',
                                    kasbondeptdetail_id: kasbondeptdetail_id
                                },
                                success: function (response3) {
                                    resjson3 = Ext.JSON.decode(response3.responseText);
                                    var counter = resjson3.counter;

                                    if (counter > 0) {
                                        
                                        for (var j = 0; j < resjson3.data.length; j++) {
                                            var data_subdetail = resjson3.data[j];

                                            var obj_subdetail = {
                                                hideparam             : 'default',
                                                statedata             : 'create',
                                                kasbondept_id         : 0,
                                                kasbondeptdetail_id   : 0,
                                                kasbondeptsubdetail_id: 0,
                                                indexdata             : data_subdetail.indexdata,
                                                indexsubdata          : data_detail.indexdata,
                                                coa_id                : data_subdetail.coa_id,
                                                coa                   : data_subdetail.coa,
                                                coaname               : data_subdetail.coaname,
                                                subgl_id              : data_subdetail.subgl_id,
                                                subcode               : data_subdetail.subcode,
                                                subdesc               : data_subdetail.subdesc,
                                                code1                 : data_subdetail.code1,
                                                code2                 : data_subdetail.code2,
                                                code3                 : data_subdetail.code3,
                                                code4                 : data_subdetail.code4,
                                                kelsub_id             : data_subdetail.kelsub_id,
                                                kelsub                : data_subdetail.kelsub,
                                                kelsubdesc            : data_subdetail.keldesc,
                                                remarks               : data_subdetail.remarks,
                                                amount                : data_subdetail.amount,
                                            }

                                            subdetail.push(obj_subdetail);
                                        }
                                    }
                                }
                            })

                        }

                        storedetail.add(detail);
                        storedetail.commitChanges();        
                        storedetail.filter('deleted', false);
                        me.setSumdetail();
                        storesubdetail.add(subdetail);
                        storesubdetail.commitChanges();
                        storesubdetail.filter('deleted', false);
                        griddetail.getView().refresh();
                        fd.setLoading(false);
                    }
                })
            }
        });
    }
});