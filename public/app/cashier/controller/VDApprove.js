Ext.define('Cashier.controller.VDApprove', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.VDApprove',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptusercombobox',
        'Cashier.library.template.combobox.Deptprefixcombobox',
        'Cashier.library.template.combobox.Departmentcombobox',
        'Cashier.library.template.combobox.Coadeptvouchercombobox',
        'Cashier.library.template.combobox.Employeehrdcombobox',
        'Cashier.library.template.combobox.Vendorcombobox',
        'Cashier.library.template.combobox.Subglcombobox',
        'Cashier.library.template.combobox.Statusvouchercombobox',
        'Cashier.library.template.combobox.Jenisusahacombobox',
        'Cashier.library.template.combobox.Vendornotecombobox',
        'Cashier.library.template.combobox.Inoutcombobox',
        'Cashier.library.template.combobox.Kasbondepthasapplycombobox',
        'Cashier.library.template.combobox.Tipevendorvouchercombobox',
        'Cashier.library.template.combobox.Currencycombobox',
        'Cashier.library.template.combobox.Cashflowcombobox',
        'Cashier.library.box.Config',
        'Cashier.library.box.tools.EventSelector',
        'Cashier.library.box.tools.Tools'
    ],
    views: [
        'vdapprove.Panel',
        'vdapprove.Grid',
        'vdapprove.GridApprove',
        'vdapprove.Griddetail',
        'vdapprove.Griddesc',
        'vdapprove.Gridsubdetail',
        'vdapprove.FormSearch',
        'vdapprove.FormData',
        'vdapprove.FormContentDesc',
        'vdapprove.FormDataDesc',
        'vdapprove.FormDataDetail',
        'vdapprove.FormDataSubDetail',
        'vdapprove.Gridattachmentdetail',
        'vdapprove.Gridapprovaldetail',
        'vdapprove.FormDataPreviewAttachment'
    ],
    stores: [
        'VDApprove',
        'VDApproveNew',
        'VDApprovedetail',
        'VDApprovedesc',
        'VDApprovesubdetail',
        'Ptbyuser',
        'Deptprefixcombo',
        'Coadeptcombo',
        'Department',
        'Employee',
        'Vendorcombo',
        'Subgl',
        'Statusvoucher',
        'Tipevendorvoucher',
        'VDApproveattachmentdetail',
        'VDApproveapprovaldetail',
        'Currency',
        'Inout'
    ],
    models: [
        'VDApprove',
        'VDApprovenew',
        'VDApprovedetail',
        'VDApprovedesc',
        'VDApprovesubdetail',
        'VDApproveattachmentdetail',
        'VDApproveapprovaldetail',
        'Currency',
    ],
    refs: [
        {ref: 'grid', selector: 'vdapprovegrid'},
        {ref: 'gridapprove', selector: 'vdapprovegridnew'},
        {ref: 'griddetail', selector: 'vdapprovegriddetail'},
        {ref: 'griddesc', selector: 'vdapprovegriddesc'},
        {ref: 'gridsubdetail', selector: 'vdapprovegridsubdetail'},
        {ref: 'formsearch', selector: 'vdapproveformsearch'},
        {ref: 'formdata', selector: 'vdapproveformdata'},
        {ref: 'formcontentdesc', selector: 'vdapprovedescformcontent'},
        {ref: 'formdatadesc', selector: 'vdapprovedescformdata'},
        {ref: 'formdatadetail', selector: 'vdapprovedetailformdata'},
        {ref: 'formdatasubdetail', selector: 'vdapprovesubdetailformdata'},
        {ref: 'gridattachmentdetail', selector: 'vdapprovegridattachmentdetail'},
        {ref: 'gridapprovaldetail', selector: 'vdapprovegridapprovaldetail'},
        {ref: 'formrevisionnotes', selector: 'vdapproveformrevisionnotes'},
        {ref: 'formdatapreviewattachment', selector: 'formdatapreviewattachment'}
    ],
    controllerName: 'vdapprove',
    formWidth: 840,
    state: null,
    fieldName: 'voucher_no',
    fieldconfirmdetail: 'coaname',
    fieldconfirmdesc: 'description',
    fieldconfirmsubdetail: 'subcode',
    bindPrefixName: 'VDApprove',
    urldata: 'cashier/vdapprove/',
    urldesc: 'cashier/vdapprove/desc',
    urldetail: 'cashier/vdapprove/detail',
    urlsubdetail: 'cashier/vdapprove/subdetail',
    urlcommon: 'cashier/common/create',
    gridId: 0,
    is_desc: 1,
    is_desc2: 1,
    urlrequest: null, senddata: null, info: null, messagedata: null, dateNow: new Date(),
    flaggeneratevoucherno: 0, valueform: null,
    idheaderfield: 'voucher_id', iddetailfield: 'voucherdetail_id', idheadervalue: 0, iddetailvalue: 0,
    manager_id: 0, employee_id: 0, pt_id: 0, department_id: 0, prefixdept: null, subgl: null, in_out: 'O',
    kelsub_id: 0, balancecoa: 0, validdetail: 0, addby: 0, report: null, win: null, winId: null, isFromApproved: 0,
    loadingapprove: new Ext.LoadMask(Ext.getBody(), {msg: "Please wait..."}),
    rolepajak: ["1099","3250"],
    init: function (application) {

        var me = this.getMe();
        
        var events = new Cashier.library.box.tools.EventSelector();
        me.tools = new Cashier.library.box.tools.Tools({config: me.myConfig});

        this.control({
            'vdapprovepanel ': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    this.panelAfterRender();
                    panel.up('window').maximize();
                    panel.up('window').setTitle("Approval - Voucher Department");
                },
            },
            'vdapprovegridnew gridcolumn ': {
                headerclick: function (en) {
                    //console.log(en);
                    var ab = en.ownerCt.itemId;
                    if (ab === 'vdapprovegridnewId') {
                        if (me.gridId === 1) {
                            var store = Ext.data.StoreManager.lookup('VDApproveNew');
                        } else {
                            var store = Ext.data.StoreManager.lookup('VDApprove');
                        }
                        if (me.is_desc === 1) {
                            store.removeAll();
                            store.reload({
                                params: {
                                    "hideparam": 'approve_only',
                                    "desc": me.is_desc,
                                    "project_id": apps.project,
                                    "start": 0,
                                    "limit": 25,
                                },
                                callback: function (records, operation, success) {
                                    me.is_desc = 0;
                                }
                            });
                        } else {
                            store.removeAll();
                            store.reload({
                                params: {
                                    "hideparam": 'approve_only',
                                    "desc": me.is_desc,
                                    "project_id": apps.project,
                                    "start": 0,
                                    "limit": 25,
                                },
                                callback: function (records, operation, success) {
                                    me.is_desc = 1;
                                }
                            });
                        }




                    }

                    // console.log(en.ownerCt.itemId);
                }
            },
            'vdapprovepanel [name=panel]': {
                tabchange: function (tabPanel, tab) {
                    if (tab.xtype === 'vdapprovegridnew') {
                        var store = Ext.data.StoreManager.lookup('VDApproveNew');
                        store.removeAll();
                        store.reload();
                        me.gridId = 1;
                    } else {
                        me.gridId = 0;
                    }

                }

            },
//            'vdapprovegridnew': {
//                afterrender: this.gridAfterRender,
//                itemdblclick: this.gridItemDblClick,
//                itemcontextmenu: this.gridItemContextMenu,
//                selectionchange: this.gridSelectionChange,
//                select: this.gridSelected2,
//            },
            'vdapprovegrid': {
                afterrender: this.gridAfterRender,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange,
                select: this.gridSelected,
                itemdblclick: this.gridItemDblClick,
            },
            'vdapprovegridnew': {
                afterrender: this.gridAfterRender,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange,
                select: this.gridSelected,
                itemdblclick: this.gridItemDblClick,
            },
//            'vdapprovegridnew': {
//              afterrender: this.gridAfterRender,
//                itemdblclick: this.gridItemDblClick,
//                itemcontextmenu: this.gridItemContextMenu,
//                selectionchange: this.gridSelectionChange,
//                select: this.gridSelected,  
//            },
            'vdapprovegrid,vdapprovegridnew toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'vdapprovegrid,vdapprovegridnew toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                    me.isFromApproved = 1;
                }
            },
            'vdapprovegrid,vdapprovegridnew toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'vdapprovegrid,vdapprovegridnew toolbar button[action=print]': {
                click: this.dataPrint
            },
            'vdapprovegrid,vdapprovegridnew actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'vdapproveformsearch': {
                afterrender: function () {
                    var me = this.getMe();
                    me.initPT();
                    me.setStoreFormsearch();
                    setTimeout(function(){ 
                        if(me.pt_id>0){
                            me.getFormsearch().down("[name=pt_id]").setValue(me.pt_id);
                        }
                    }, 3000);
                },
            },
            'vdapproveformsearch button[action=search]': {
                click: this.dataSearch
            },
            'vdapproveformsearch button[action=reset]': {
                click: this.dataReset
            },
            'vdapproveformsearch [name=pt_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this.getMe();
                    rowdata = record[0]['data'];
                    me.pt_id = rowdata.pt_id;
                    me.project_id = rowdata.project_id;
                    me.setStoreDeptFormsearch();
                },
                'change': function (that, newValue, oldValue, eOpts) {
                    var me, rowdata, form;
                    me = this.getMe();
                    form = me.getFormsearch();
                    if(form.down('[name=pt_id]').getValue()>0){
                        rowdata = form.down('[name=pt_id]').valueModels[0]['raw'];
                        me.project_id = rowdata.project_id;
                        me.pt_id = rowdata.pt_id;
                    }

                }
            },
            'vdapproveformdata': {
                afterrender: this.formDataAfterRender,
                boxready: function () {
                    me.setFormdataready();
                }
            },
            'vdapproveformdata [name=pt_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this.getMe();
                    rowdata = record[0]['data'];
                    me.pt_id = rowdata.pt_id;
                    me.setVal(form, 'projectname', rowdata.projectname);
                    me.setVal(form, 'ptname', rowdata.ptname);
                },
                'change': function (that, newValue, oldValue, eOpts) {
                    var me, form, rowdata;
                    me = this.getMe();
                    form = me.getFormdata();
                    rowdata = form.down('[name=pt_id]').valueModels[0]['raw'];
                    me.pt_id = rowdata.pt_id;
                    me.setVal(form, 'projectname', rowdata.projectname);
                    me.setVal(form, 'ptname', rowdata.ptname);
                }
            },
            'vdapproveformdata [name=department_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this.getMe();
                    rowdata = record[0]['data'];
                    me.prefixdept = rowdata.code;
                    me.department_id = rowdata.department_id;
                    me.setValue(me, 'approveby_id', null);
                    me.setStoreApproveby();
                },
                'change': function (that, newValue, oldValue, eOpts) {
                    var me, form, rowdata;
                    me = this.getMe();
                    form = me.getFormdata();
                    if (form.down('[name=department_id]').valueModels[0] !== undefined) {
                        rowdata = form.down('[name=department_id]').valueModels[0]['raw'];
                        me.prefixdept = rowdata.code;
                    }
                    //me.generateVoucherno();
                },
            },
            'vdapproveformdata [name=approveby_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this.getMe();
                    form = me.getFormdata();
                    rowdata = record[0]['data'];
                    me.approveby_id = rowdata.employee_id;
                    me.setVal(form, 'approvename', rowdata.employee_name);
                },
                'change': function (that, newValue, oldValue, eOpts) {
                    var me, form, rowdata;
                    me = this.getMe();
                    form = me.getFormdata();
                    if (form.down('[name=approveby_id]').valueModels[0] !== undefined) {
                        rowdata = form.down('[name=approveby_id]').valueModels[0]['raw'];
                        me.approveby_id = rowdata.employee_id;
                        me.setVal(form, 'approvename', rowdata.employee_name);
                    }

                },
            },
            'vdapproveformdata [name=type_vendor] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this.getMe();
                    form = me.getFormdata();
                    me.setStoreVendorbytypedata(form);
                },
                'change': function (that, newValue, oldValue, eOpts) {
                    var me, form;
                    me = this.getMe();
                    form = me.getFormdata();
                    me.setStoreVendorbytypedata(form);
                },
            },
            'vdapproveformdata #radio1_b123 ': {
                'change': function (that, newValue, oldValue, eOpts) {
                    var me;
                    me = this.getMe();
                    if (newValue == true) {
                        me.in_out = 'I';
                    } else {
                        me.in_out = 'O';
                    }
                },
            },
            'vdapproveformdata #radio2_b123 ': {
                'change': function (that, newValue, oldValue, eOpts) {
                    var me;
                    me = this.getMe();
                    if (newValue == true) {
                        me.in_out = 'O';
                    } else {
                        me.in_out = 'I';
                    }
                },
            },
            'vdapproveformdata [name=voucherrequesttab] ': {
                'tabchange': function (p, eOpts) {
                    var me, pd, form, tabPanel, name, rowdetail;
                    me = this.getMe();
                    me.checkTabsubcoa();
                },
            },
            'vdapproveformdata button[action=detaildesc]': {
                click: function () {
                    var me, form, state;
                    me = this.getMe();
                    form = me.getFormdata();
                    state = form.up('window').state.toLowerCase();
                    me.paramcontentdesc.stateform = state;
                    me.GenerateFormdata(me.paramcontentdesc);
                },
            },
            'vdapproveformdata button[action=save]': {
                click: this.dataSavecustome
            },
            'vdapproveformdata button[action=approve]': {
                click: this.Approve
            },
            'vdapproveformdata button[action=revise]': {
                click: this.revise
            },
            'vdapproveformdata button[action=approvepajak]': {
                click: this.Approvepajak
            },
            'vdapproveformdata button[action=unapprove]': {
                click: this.Unapprove
            },
            'vdapproveformdata button[action=reject]': {
                click: this.Reject
            },
            'vdapproveformdata button[action=pending]': {
                click: this.Pending
            },
            'vdapproveformdata button[action=openreject]': {
                click: this.Openreject
            },
            'vdapproveformdata button[action=openpending]': {
                click: this.Openpending
            },
            'vdapproveformdata button[action=test]': {
                click: this.BtnTest
            },
            'vdapproveformdata button[action=cancel]': {
                click: function () {
                    var me = this.getMe();
                    this.formDataClose();
                }
            },
            //====================================START DETAIL=============================================    

            /* START  GRID AREA */
            'vdapprovegriddetail': {
                selectionchange: this.cellgridDetail,
                //afterrender: this.griddetailAfterRender,
                itemdblclick: this.griddetailitemdoubleclick,
                //select: this.gridDetailSelected,
            },
            'vdapprovegriddetail toolbar button[action=create]': {
                click: function () {
                    var me, form, store, amount;
                    me = this.getMe();
                    me.paramdetail.stateform = 'create';
                    me.GenerateFormdata(me.paramdetail);
                }
            },
            'vdapprovegriddetail toolbar button[action=update]': {
                click: function () {
                    me.paramdetail.stateform = 'update';
                    me.GenerateFormdata(me.paramdetail);
                }
            },
            'vdapprovegriddetail toolbar button[action=destroy]': {
                click: function () {
                    me.fieldName = 'description';
                    this.dataDestroydetailwithflag();
                }
            },
            'vdapprovegriddetail actioncolumn': {
                click: function (view, cell, row, col, e) {
                    me.gridActionColumndetailclick(view, cell, row, col, e);
                }
            },
            /* START  GRID AREA */


            /* START FORM AREA */
            'vdapprovedetailformdata': {
                afterrender: this.formDataDetailAfterRender
            },
            'vdapprovedetailformdata [name=coa_id]': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, pd, form;
                    me = this.getMe();
                    pd = me.paramdetail;
                    form = me.getFormdatadetail();
                    rowdata = record[0]['data'];
                    me.coa = rowdata.coa;
                    pd.rowdetailtmp = rowdata;
                    me.kelsub_id = rowdata.kelsub_id;
                    if (me.kelsub_id !== 0) {
                        me.setReadonly(form, 'amount', true);
                    } else {
                        me.setReadonly(form, 'amount', false);
                    }
                    form.down("[name=coaname]").setValue(rowdata.coaname);
                    form.down("[name=kelsub_id]").setValue(rowdata.kelsub_id);
                    form.down("[name=kelsub]").setValue(rowdata.kelsub);
                    form.down("[name=kelsubdesc]").setValue(rowdata.kelsubdesc);
                },
            },
            'vdapprovedetailformdata button[action=save]': {
                'click': function (me, e, eOpts) {
                    var me, checkbalance;
                    me = this.getMe();
                    me.dataSaveDetailstore();
                },
            },
            /* END FORM AREA */

            //====================================END DETAIL===============================================      


            //====================================START DESC===============================================      
            'vdapprovedescformcontent': {
                afterrender: function () {
                    var me;
                    me = this.getMe();
                    me.FormcontentdescAfterrender();
                },
            },
            'vdapprovegriddesc': {
                selectionchange: this.cellgridDesc,
                itemdblclick: this.griddescitemdoubleclick,
            },
            'vdapprovegriddesc toolbar button[action=create]': {
                click: function () {
                    var me;
                    me = this.getMe();
                    me.paramdesc.stateform = 'create';
                    me.GenerateFormdata(me.paramdesc);
                }
            },
            'vdapprovegriddesc toolbar button[action=update]': {
                click: function () {
                    me.paramdesc.stateform = 'update';
                    me.GenerateFormdata(me.paramdesc);
                }
            },
            'vdapprovegriddesc toolbar button[action=destroy]': {
                click: function () {
                    me.fieldconfirmdesc = 'description';
                    this.dataDestroydescwithflag();
                }
            },
            'vdapprovegriddesc actioncolumn': {
                click: function (view, cell, row, col, e) {
                    me.gridActionColumndescclick(view, cell, row, col, e);
                }
            },
            'vdapprovedescformdata': {
                afterrender: function () {
                    this.FormDataDescAfterrender();
                },
            },
            'vdapprovedescformdata button[action=save]': {
                'click': function (me, e, eOpts) {
                    var me;
                    me = this.getMe();
                    me.dataSaveDescstore();
                },
            },
            'vdapprovedescformcontent button[action=save]': {
                click: function () {
                    var me, store, counter;
                    me = this.getMe();
                    me.getFormcontentdesc().up('window').close();
                }
            },
            'vdapprovedescformcontent button[action=cancel]': {
                click: function () {
                    var me, store, counter;
                    me = this.getMe();
                    store = me.getGriddesc().getStore();
                    counter = store.getCount();
                    if (counter > 0) {
                        store.removeAll();
                    }
                    me.getFormcontentdesc().up('window').close();
                }
            },
            //====================================END DESC===============================================      



            //====================================START SUB DETAIL===============================================      
            /* START  GRID AREA */
            'vdapprovegridsubdetail': {
                afterrender: this.Gridsubafterrender,
                selectionchange: this.cellgridSubDetail,
                itemdblclick: this.gridsubdetailitemdoubleclick,
                select: this.gridSubDetailSelected,
            },
            'vdapprovegridsubdetail toolbar button[action=create]': {
                click: function () {
                    var me, form, pd, state, store, rowdata, counter, amount;
                    me = this.getMe();
                    pd = me.paramdetail;
                    rowdata = pd.rowdata['data'];
                    me.paramsubdetail.stateform = 'create';
                    me.GenerateFormdata(me.paramsubdetail);
                }
            },
            'vdapprovegridsubdetail toolbar button[action=update]': {
                click: function () {
                    me.paramsubdetail.stateform = 'update';
                    me.GenerateFormdata(me.paramsubdetail);
                }
            },
            'vdapprovegridsubdetail toolbar button[action=destroy]': {
                click: function () {
                    this.dataDestroysubdetailwithflag();
                }
            },
            'vdapprovegridsubdetail actioncolumn': {
                click: function (view, cell, row, col, e) {
                    me.gridActionColumnsubdetailclick(view, cell, row, col, e);
                }
            },
            'vdapprovesubdetailformdata': {
                afterrender: this.formDataSubDetailAfterRender
            },
            'vdapprovesubdetailformdata [name=subgl_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this.getMe();
                    form = me.getFormdatasubdetail();
                    rowdata = record[0]['data'];
                    form.down("[name=subcode]").setValue(rowdata.subcode);
                    form.down("[name=code1]").setValue(rowdata.code1);
                    form.down("[name=code2]").setValue(rowdata.code2);
                    form.down("[name=code3]").setValue(rowdata.code3);
                    form.down("[name=code4]").setValue(rowdata.code4);
                },
            },
            'vdapprovesubdetailformdata button[action=save]': {
                'click': function (me, e, eOpts) {
                    var me, checkbalance;
                    me = this.getMe();
                    me.dataSaveSubDetailstore();
                },
            },
            'vdapprovegridattachmentdetail button[action=read]': {
                click: function () {
                    this.FormUploadAttachmentRead();
                }
            },
            'vdapprovegridattachmentdetail': {
                itemdblclick: this.gridattachmentitemdoubleclick,
            },
            'formdatapreviewattachment [action=download]': {
                click: function() {
                    var me = this;
                    var link = me.getFormdatapreviewattachment().down("[name=download_link]").getValue();
                    var filename = me.getFormdatapreviewattachment().down("[name=file_name]").getValue();

                    var a = document.createElement('A');
                    a.href = link;
                    a.target = '_blank';
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
            }
            
            //====================================END SUB DETAIL===============================================      
        });
    },
    //=====================================================START METHOD DETAIL====================================
    paramdetail: {
        //start formgeneate
        fromlocation: 'Cashier.view.vdapprove.FormDataDetail',
        formtitle: 'Form Detail', formicon: 'icon-form-add',
        formid: 'win-vdapprovedetailformdata', formlayout: 'fit',
        formshadow: 'frame', formmask: 'Loading...',
        formwidth: 500, formtimeout: 0,
        stateform: null, formaction: null, formproperties: null, formwindows: null,
        //end formgeneate
        //start properties form
        iddetail: 0, store: null, data: null, record: null, grid: null, row: null, form: null,
        checkdata: false, object: null, rowdata: null, action: null, counter: 0, flagkelsub: 0,
        rowdetailtmp: null,
        //start properties form
    },
    paramcontentdesc: {
        //start formgeneate
        fromlocation: 'Cashier.view.vdapprove.FormContentDesc',
        formtitle: 'Form Content Description Detail', formicon: 'icon-form-add',
        formid: 'win-vdapprovedescformcontent', formlayout: 'fit',
        formshadow: 'frame', formmask: 'Loading...',
        formwidth: 800, formtimeout: 0,
        stateform: null, formaction: null, formproperties: null, formwindows: null,
        //end formgeneate

    },
    paramdesc: {
        //start formgeneate
        fromlocation: 'Cashier.view.vdapprove.FormDataDesc',
        formtitle: 'Form Description Detail', formicon: 'icon-form-add',
        formid: 'win-vdapprovedescformdata', formlayout: 'fit',
        formshadow: 'frame', formmask: 'Loading...',
        formwidth: 600, formtimeout: 0,
        stateform: null, formaction: null, formproperties: null, formwindows: null,
        //end formgeneate
        //start properties form
        iddetail: 0, store: null, data: null, record: null, grid: null, row: null, form: null,
        checkdata: false, object: null, rowdata: null, action: null, counter: 0, flagkelsub: 0,
        totalsubdetail: 0,
        //start properties form
    },
    paramsubdetail: {
        //start formgeneate
        fromlocation: 'Cashier.view.vdapprove.FormDataSubDetail',
        formtitle: 'Form Sub Detail', formicon: 'icon-form-add',
        formid: 'win-vdapprovesubdetailformdata', formlayout: 'fit',
        formshadow: 'frame', formmask: 'Loading...',
        formwidth: 700, formtimeout: 0,
        stateform: null, formaction: null, formproperties: null, formwindows: null,
        //end formgeneate
        //start properties form
        iddetail: 0, store: null, data: null, record: null, grid: null, row: null, form: null,
        checkdata: false, object: null, rowdata: null, action: null, counter: 0, flagkelsub: 0,
        totalsubdetail: 0,
        //start properties form
    },
    getMe: function(){
       var me = this;
       return _Apps.getController(me.bindPrefixName);
    },
    initPT: function () {
        //INIT PT jika kosong, default ke session
        var me = this.getMe();
        if(me.pt_id==0 || me.pt_id==''){
            me.pt_id = apps.pt;
        }
        if(me.project_id==0 || me.project_id==''){
            me.project_id = apps.project;
        }
        if(parseInt(me.project_id) !== parseInt(apps.project)){
            me.pt_id = apps.pt;
            me.project_id = apps.project;
        }

        me.pt_id = parseInt(me.pt_id);
        me.project_id = parseInt(me.project_id);
        me.loadingapprove = new Ext.LoadMask(Ext.getBody(), {msg: "Please wait..."});
    },
    Gridsubafterrender: function () {
        var me;
        me = this.getMe();
    },
    /* METHOD START FOR GRID HERE */
    cellgridDetail: function () {
        var me, pd, form, statehead, lengthkelsub = '';
        me = this.getMe();
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
                form.down('[name=gridtabsubdetail]').setDisabled(true);
            } else {
                form.down('[name=gridtabsubdetail]').setDisabled(false);
                if (pd.row.statedata !== 'create' && statehead !== 'create') {
                    me.iddetailvalue = pd.row.voucherdetail_id;
                    //console.log(me.iddetailvalue);
                    me.getDatasubdetail();
                } else {
                    if (statehead == 'create') {
                        me.iddetailvalue = pd.row.indexdata;
                    } else {
                        me.iddetailvalue = pd.row.voucherdetail_id;
                    }

                    //me.getSubdata();
                }
            }
        }
    },
    getSubdata: function (storesub, datadetail) {
        var me, datasub, count;
        me = this.getMe();
        storesub.clearFilter(true);
        count = storesub.getCount();
        if (count !== 0) {
            storesub.filterBy(function (rec, id) {
                datasub = rec['data'];
                if (datasub.coa_id == datadetail.coa_id && datasub.voucherdetail_id == me.iddetailvalue) {
                    return true;
                } else {
                    return false;
                }
            });
        }
    },
    cellgridDesc: function () {
        var me, p, form;
        me = this.getMe();
        form = me.getFormdata();
        p = me.paramdesc;
        me.gridSelectionChangedesc();
        p.grid = me.getGriddesc();
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
    cellgridSubDetail: function () {
        var me, p, form = '';
        me = this.getMe();
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
    gridActionColumndetailclick: function (view, cell, row, col, e) {
        var me, pd, grid, action = '';
        me = this.getMe();
        pd = me.paramdetail;
        grid = me.getGriddetail();
        grid.getSelectionModel().select(row);
        pd.action = e.getTarget().className.match(/\bact-(\w+)\b/)[1];
        pd.rowdata = grid.getStore().getAt(row);
        me.actiondataDetail();
    },
    gridActionColumndescclick: function (view, cell, row, col, e) {
        var me, p, grid, action = '';
        me = this.getMe();
        p = me.paramdesc;
        grid = me.getGriddesc();
        grid.getSelectionModel().select(row);
        p.action = e.getTarget().className.match(/\bact-(\w+)\b/)[1];
        p.rowdata = grid.getStore().getAt(row);
        me.actiondataDesc();
    },
    gridActionColumnsubdetailclick: function (view, cell, row, col, e) {
        var me, p, grid, action = '';
        me = this.getMe();
        p = me.paramsubdetail;
        grid = me.getGridsubdetail();
        grid.getSelectionModel().select(row);
        p.action = e.getTarget().className.match(/\bact-(\w+)\b/)[1];
        p.rowdata = grid.getStore().getAt(row);
        me.actiondataSubDetail();
    },
    gridDescSelected: function () {
        var me, grid, counter, p, store, record, row;
        me = this.getMe();
        p = me.paramdesc;
        grid = me.getGridsubdetail();
        store = grid.getStore();
        counter = store.getCount();
        if (counter > 0) {
            p.rowdata = grid.getSelectionModel().getSelection()[0];
        }
    },
    gridSubDetailSelected: function () {
        var me, grid, counter, pd, store, record, row, formheader, formdetail, formsubdetail;
        me = this.getMe();
        pd = me.paramsubdetail;
        grid = me.getGridsubdetail();
        store = grid.getStore();
        counter = store.getCount();
        formheader = me.getFormdata();
        formdetail = me.getFormdatadetail();
        formsubdetail = me.getFormdatasubdetail();
        if (counter > 0) {
            pd.rowdata = grid.getSelectionModel().getSelection()[0];
            pd.row = pd.rowdata['data'];
        }
    },
    griddetailitemdoubleclick: function () {
        var me, pd;
        me = this.getMe();
        pd = me.paramdetail;
        pd.action = 'update';
        me.actiondataDetail();
    },
    griddescitemdoubleclick: function () {
        var me, p;
        me = this.getMe();
        p = me.paramdesc;
        p.action = 'update';
        me.actiondataDesc();
    },
    gridsubdetailitemdoubleclick: function () {
        var me, p;
        me = this.getMe();
        p = me.paramsubdetail;
        p.action = 'update';
        me.actiondataSubDetail();
    },
    actiondataDetail: function () {
        var me, pd, returndata;
        me = this.getMe();
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
    actiondataDesc: function () {
        var me, p, returndata;
        me = this.getMe();
        p = me.paramdesc;
        me.cellgridDesc();
        switch (p.action) {
            case 'update':
                me.paramdesc.stateform = 'update';
                me.GenerateFormdata(me.paramdesc);
                break;
            case 'destroy':
                me.dataDestroydescwithflag();
                break;
            default:
                returndata = "No action selected";
        }
    },
    actiondataSubDetail: function () {
        var me, p, returndata;
        me = this.getMe();
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
    getDatadetail: function () {
        var me, pd, counter, form, rowdata, lengthkelsub, store, grid, rawjson = '';
        me = this.getMe();
        pd = me.paramdetail;
        form = me.getFormdata();
        pd.grid = me.getGriddetail();
        pd.store = me.getStore("VDApprovedetail");
        pd.store.load({
            params: {
                "hideparam": 'default',
                "voucher_id": me.getValue(me, 'voucher_id', 'value'),
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                counter = me.getStore("VDApprovedetail").getCount();
                rawjson = me.getStore("VDApprovedetail").proxy.getReader().jsonData;

                if (counter > 0) {
                    rowdata = records[0]['data'];
                    pd.grid.getSelectionModel().select(0, true);
                    lengthkelsub = parseFloat(rowdata.kelsub.length);
                    if (lengthkelsub > 0) {
                        form.down('[name=gridtabsubdetail]').setDisabled(false);
                    } else {
                        form.down('[name=gridtabsubdetail]').setDisabled(true);
                    }
                    pd.totaldetail = rawjson.totalamount;
                    me.setVal(form, 'amount', me.Mask(rawjson.totalamount));
                    me.setVal(form, 'totaldetail', me.Mask(rawjson.totalamount));
                    me.setSumdetail();
                }
            }
        });
    },
    getDatadesc: function () {
        var me, pd, p, counter, form, rowdata = '';
        me = this.getMe();
        p = me.paramdesc;
        form = me.getFormdata();
        p.grid = me.getGriddesc();
        p.store = p.grid.getStore();
        p.store.load({
            params: {
                "hideparam": 'default',
                "voucher_id": me.idheadervalue,
                "start": 0,
                "limit": 100,
            },
            callback: function (records, operation, success) {
                counter = p.store.getCount();
                p.counter = counter;
            }
        });
    },
    getDatasubdetail: function () {
        var me, pd, p, counter, form, rowdata = '';
        me = this.getMe();
        pd = me.paramdetail;
        p = me.paramsubdetail;
        rowdata = pd.rowdata['data'];
        form = me.getFormdata();
        p.grid = me.getGridsubdetail();
        p.store = p.grid.getStore();
        p.store.load({
            params: {
                "hideparam": 'default',
                "voucher_id": rowdata.voucher_id,
                "voucherdetail_id": rowdata.voucherdetail_id,
                "start": 0,
                "limit": 100,
            },
            callback: function (records, operation, success) {
                counter = p.store.getCount();
                p.counter = counter;
            }
        });
    },
    /* METHOD END FOR GRID HERE */

    /* METHOD START FORM */
    indexDetail: function () {
        var me, form, store, counter;
        me = this.getMe();
        store = me.getGriddetail().getStore();
        counter = store.getCount();
        return counter + 1;
    },
    indexDesc: function () {
        var me, form, store, counter;
        me = this.getMe();
        store = me.getGriddesc().getStore();
        counter = store.getCount();
        store.clearFilter();
        return counter + 1;
    },
    indexSubDetail: function () {
        var me, form, store, counter;
        me = this.getMe();
        store = me.getGridsubdetail().getStore();
        store.clearFilter(true);
        store.filter('deleted', false);
        counter = store.getCount();
        store.clearFilter();
        return counter + 1;
    },
    formDataDetailAfterRender: function () {
        var me, pd, action, counter, sort, form, desc;
        me = this.getMe();
        pd = me.paramdetail;
        form = me.getFormdatadetail();
        desc = me.getFormdata().down('[name=description]').getValue();
        me.setStoreCoaDept();
        switch (pd.stateform) {
            case 'create':
                counter = me.indexDetail();
                pd.iddetail = 0;
                me.iddetailvalue = counter;
                if (me.in_out == 'I') {
                    form.down("[name=dataflow]").setValue('O');
                } else {
                    form.down("[name=dataflow]").setValue('I');
                }
                form.down("[name=remarks]").setValue(desc);
                form.down("[name=indexdata]").setValue(counter);
                break;
            case 'update':
                //onsole.log(pd.rowdata);
                form.loadRecord(pd.rowdata);
                pd.iddetail = pd.rowdata['data'].voucherdetail_id;
                me.iddetailvalue = pd.rowdata['data'].voucherdetail_id;
                me.coa = pd.rowdata['data'].coa;
                me.kelsub_id = pd.rowdata['data'].kelsub_id;
                if (me.kelsub_id !== 0) {
                    me.setReadonly(form, 'amount', true);
                } else {
                    me.setReadonly(form, 'amount', false);
                }
                /*
                 if (me.in_out == 'I') {
                 form.down("[name=dataflow]").setValue('O');
                 } else {
                 form.down("[name=dataflow]").setValue('I');
                 }*/
                break;
            default:
        }
        me.formatCurrencyFormdata(me, form);
    },
    FormcontentdescAfterrender: function () {
        var me, p, action, store, counter, sort, state, form, desc;
        me = this.getMe();
        p = me.paramcontentdesc;
        form = me.getFormdata();
        store = me.getGriddesc().getStore();
        state = form.up('window').state.toLowerCase();
        counter = store.getCount();
        switch (state) {
            case 'create':
                if (counter > 0) {
                    store.removeAll();
                }
                break;
            case 'update':
                me.getDatadesc();
                break;
        }
    },
    FormDataDescAfterrender: function () {
        var me, p, action, countdata, counter, state, form, rowdata;
        me = this.getMe();
        p = me.paramdesc;
        form = me.getFormdatadesc();
        switch (p.stateform) {
            case 'create':
                counter = me.indexDesc();
                me.setVal(form, 'voucher_id', me.idheadervalue);
                me.setVal(form, 'indexdata', counter);
                break;
            case 'update':
                form.loadRecord(p.rowdata);
                break;
        }
    },
    formDataSubDetailAfterRender: function () {
        var me, pd, p, rowdata, action, state, counter, sort, form, desc;
        me = this.getMe();
        pd = me.paramdetail;
        p = me.paramsubdetail;
        rowdata = pd.rowdata['data'];
        me.kelsub_id = rowdata.kelsub_id;
        me.balancecoa = rowdata.amount;
        form = me.getFormdatasubdetail();
        state = me.getFormdata().up('window').state.toLowerCase();
        switch (p.stateform) {
            case 'create':
                counter = me.indexSubDetail();
                me.setVal(form, 'voucher_id', me.idheadervalue);
                me.setVal(form, 'voucherdetail_id', me.iddetailvalue);
                me.setVal(form, 'coa_id', rowdata.coa_id);
                me.setVal(form, 'kelsub_id', rowdata.kelsub_id);
                me.setVal(form, 'kelsub', rowdata.kelsub);
                me.setVal(form, 'indexdata', counter);
                break;
            case 'update':
                me.iddetailvalue = rowdata.voucherdetail_id;
                form.loadRecord(p.rowdata);
                break;
            default:
        }
        me.setStoreSubcode();
        me.formatCurrencyFormdata(me, form);
    },
    /* METHOD END FORM */

    /* START CALCULATE DATA */

    setTotaldetail: function (store) {
        var me, form, amountheader, sum_in, sum_out, total;
        me = this.getMe();
        sum_in = sum_out = 0;
        store.each(function (record, index) {
            if (record.get('dataflow') == 'I') {
                sum_in += record.get('amount');
            }
            if (record.get('dataflow') == 'O') {
                sum_out += record.get('amount');
            }
        });
        if (me.in_out == 'I') {
            total = parseFloat(sum_out) - parseFloat(sum_in);
        } else {
            total = parseFloat(sum_in) - parseFloat(sum_out);
        }
        return total;
    },
    setSumdetail: function () {
        var me, pd, store_h, store_d, form, amount, totaldetail,
                balance, msgdata, status, voucher_no;
        me = this.getMe();
        pd = me.paramdetail;
        form = me.getFormdata();
        store_d = me.getGriddetail().getStore();
        if (store_d.getCount() > 0) {
            store_d.filter('deleted', false);
            //totaldetail = store_d.sum('amount');
            totaldetail = me.setTotaldetail(store_d);
        } else {
            totaldetail = pd.totaldetail;
        }

        me.Mask(me.setVal(form, 'amount', totaldetail));
        amount = me.unMask(me.getVal(form, 'amount', 'value'));
        balance = parseFloat(amount) - parseFloat(totaldetail);
        me.setVal(form, 'totaldetail', parseFloat(totaldetail));
        me.setVal(form, 'balance', parseFloat(balance));
        store_d.clearFilter(true);
        store_d.filter('voucher_id', me.idheadervalue);
        store_d.filter('deleted', false);
        me.formatCurrencyFormdata(me, form);
    },
    setSumsubdetail: function () {
        var me, pd, p, store, store_h, storedetail, form, amount, totaldetail,
                balance, totalsubdetail, msgdata, status, gridsubdetail,
                getindexdetail, recorddetail, rowdetail, state, flagdetail;
        me = this.getMe();
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

        me.getSubdata(store, pd.rowdata['data']);
        store.clearFilter(true);
        store.filter('deleted', false);
        store.filter(me.iddetailfield, me.iddetailvalue);
    },
    /* END CALCULATE DATA */

    //=====================================================END METHOD DETAIL====================================
    panelAfterRender: function () {
        var me = this.getMe();
        me.senddata = {
            "hideparam": 'getemployee',
        }
        me.urlrequest = 'cashier/vdapprove/read';
        me.AjaxRequest();
    },
    checkTabsubcoa: function () {
        var me, pd, form, tabPanel, name, rowdetail;
        me = this.getMe();
        pd = me.paramdetail;
        form = me.getFormdata();
        rowdetail = pd.rowdata;
        tabPanel = form.down("[name=voucherrequesttab]").getActiveTab();
        name = tabPanel.name;
        if (name == 'gridtabsubdetail') {
            if (rowdetail !== null) {
                me.Tabsubcoa(rowdetail);
            } else {
                form.down('[name=gridtabsubdetail]').setDisabled(true);
                me.buildWarningAlert("Please select item on grid detail coa...!");
            }
        }
    },
    Tabsubcoa: function (rowdetail) {
        var me, storedetail, countdetail, pd, state, form,
                gridsubdetail, storesub, countersub, datasub, datadetail;
        me = this.getMe();
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
                me.iddetailvalue = datadetail.voucherdetail_id;
                me.getDatasubdetail();
            } else {
                me.iddetailvalue = datadetail.indexdata;
                me.getSubdata(storesub, datadetail);
            }
        }
    },
    setFormdataready: function () {
        var me, store, state, form, griddetail, gridsubdetail, storedetail;
        me = this.getMe();
        form = me.getFormdata();
        state = form.up('window').state.toLowerCase();
        switch (state) {
            case 'create':
                me.idheadervalue = 0;
                storedetail = me.getGriddetail().getStore();
                if (storedetail.getCount() > 0) {
                    storedetail.removeAll();
                }
                me.setLabel(me, 'lblstatus', 'OPEN', true);
                me.setValue(me, 'status', '1');
                me.setVal(form, 'voucher_date', me.dateNow);
                me.setStorePtuser();
                me.setStoreDeptuser();
                me.setStoreApproveby();
                //me.generateVoucherno();
                break;
            case 'update':
                me.idheadervalue = me.getValue(me, 'voucher_id', 'value');
                if (me.gridId == 1) {
                    grid = me.getGridapprove();
                } else {
                    grid = me.getGrid();
                }
                selectedrow = grid.getSelectionModel().getSelection()[0];
                
                storedetail = me.getGriddetail().getStore();
                if (storedetail.getCount() > 0) {
                    storedetail.removeAll();
                }
                me.getStorePtuser();
                me.getDatadetail();
                me.getDataattachmentdetail();
                me.getDataapprovaldetail();
                me.setSumdetail();

                /* set visibilities button approve pajak & approve hod */
                var tax_approver = selectedrow.data['tax_approver'].split(',');
                
                if (tax_approver.includes(apps.uid)) {
                    form.down('#btnApprovepajak').setVisible(true);
                    form.down('#btnApprove').setVisible(false);
                    form.down('#btnUnapprove').setVisible(false);
                    form.down('#btnOpenreject').setVisible(false);
                    form.down('#btnOpenpending').setVisible(false);
                } else {
                    form.down('#btnApprovepajak').setVisible(false);
                    form.down('#btnApprove').setVisible(true);
                    form.down('#btnUnapprove').setVisible(false);
                    form.down('#btnOpenreject').setVisible(true);
                    form.down('#btnOpenpending').setVisible(true);
                }

                // var hod_approver = selectedrow.data['hod_approver'].split(',');
                // if (hod_approver.includes(apps.uid)) {
                //     form.down('#btnApprove').setVisible(true);
                //     form.down('#btnUnapprove').setVisible(true);
                //     form.down('#btnReject').setVisible(true);
                //     form.down('#btnPending').setVisible(true);
                // } else {
                //     form.down('#btnApprove').setVisible(false);
                //     form.down('#btnUnapprove').setVisible(false);
                //     form.down('#btnReject').setVisible(false);
                //     form.down('#btnPending').setVisible(false);
                // }

                break;
            case 'read':
                me.idheadervalue = me.getValue(me, 'voucher_id', 'value');
                storedetail = me.getGriddetail().getStore();
                if (storedetail.getCount() > 0) {
                    storedetail.removeAll();
                }
                me.getDatadetail();
                me.getDataattachmentdetail();
                me.getDataapprovaldetail();
                me.setSumdetail();
                break;
        }
    },
    getStorePtuser: function () {
        var me, store, form;
        me = this.getMe();
        form = me.getFormdata();
        store = me.getStore("Ptbyuser");
        store.reload({
            params: {
                "hideparam": 'getptbyuser',
                "project_id": apps.project,
                "start": 0,
                "limit": 10,
            },
            callback: function (records, operation, success) {
                var group_name = records[0].raw.group_name;
                if (group_name == "Voucher Department Approval Pajak") {
                    form.down('#btnApprove').setVisible(false);
                    form.down('#btnUnapprove').setVisible(false);
                    form.down('#btnApprovepajak').setVisible(true);
                }
            }
        });
    },
    setStorePtuser: function () {
        var me, store, form;
        me = this.getMe();
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
                store.each(function (record)
                {
                    if (record.data['project_id'] == apps.project && record.data['pt_id'] == apps.pt) {
                        me.setVal(form, 'pt_id', record.data['pt_id']);
                    }
                });
            }
        });
    },
    setStoreDeptuser: function () {
        var me, store, form;
        me = this.getMe();
        form = me.getFormdata();
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
    },
    setStoreApproveby: function () {
        var me, store, form;
        me = this.getMe();
        form = me.getFormdata();
        store = me.getStore("Employee");
        store.reload({
            params: {
                "hideparam": 'getemployee',
            },
            callback: function (records, operation, success) {
                //store.clearFilter(true);
                //store.filter("department_id", me.department_id);
                store.each(function (record)
                {
                    if (record.data['employee_id'] == me.manager_id) {
                        me.setVal(form, 'approveby_id', record.data['employee_id']);
                    }
                });
            }
        });
    },
    setStoreCoaDept: function () {
        var me, store, form;
        me = this.getMe();
        form = me.getFormdata();
        store = me.getStore("Coadeptcombo");
        store.load({
            params: {
                "hideparam": 'getcoabyprojectptdept',
                "project_id": apps.project,
                "pt_id": me.getVal(form, 'pt_id', 'value'),
                "department_id": me.getVal(form, 'department_id', 'value')
            },
            callback: function (records, operation, success) {

            }
        });
    },
    setStoreSubcode: function () {
        var me, store, form;
        me = this.getMe();
        form = me.getFormdata();
        store = me.getStore("Subgl");
        store.load({
            params: {
                "hideparam": 'getsubglbykelsub',
                "project_id": apps.project,
                "pt_id": me.getVal(form, 'pt_id', 'value'),
                "kelsub_id": me.kelsub_id
            },
            callback: function (records, operation, success) {

            }
        });
    },
    generateVoucherno: function () {
        var me, form, state;
        me = this.getMe();
        form = me.getFormdata();
        state = form.up('window').state.toLowerCase();
        switch (state) {
            case 'create':
                me.senddata = {
                    "hideparam": 'generatevoucherrequest',
                    "project_id": apps.project,
                    "pt_id": (me.pt_id == 0) ? apps.pt : me.pt_id,
                    "module": 'VOUCHERREQUEST',
                    "prefix": me.prefixdept,
                    "flag": me.flaggeneratevoucherno,
                }
                me.urlrequest = me.urlcommon;
                me.AjaxRequest();
                break;
        }
    },
    dataSaveDetailstore: function () {
        var me, pd, form, grid, store, record, row, indexdata, getindex = '';
        me = this.getMe();
        pd = me.paramdetail;
        form = me.getFormdatadetail();
        if (form.getForm().isValid()) {
            grid = me.getGriddetail();
            store = grid.getStore();
            row = form.getForm().getValues();
            row[me.idheaderfield] = me.idheadervalue;
            pd.row = row;
            me.Checkdatadetail();
            switch (pd.stateform) {
                case 'create':
                    if (pd.checkdata == false) {
                        row['statedata'] = 'create';
                        row['project_id'] = apps.project;
                        row['pt_id'] = me.pt_id;
                        row['coa'] = me.coa;
                        row['kelsub_id'] = me.kelsub_id;
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
                    row[me.idheaderfield] = me.idheadervalue;
                    record.set(row);
                    record.endEdit();
                    store.commitChanges();
                    break;
            }
            store.filter('deleted', false);
            pd.totaldetail = store.sum('amount');
            me.setSumdetail();
            me.setDatadetailAftersave();
            form.up('window').close();
        }
    },
    setDatadetailAftersave: function () {
        var me, store, counter;
        me = this.getMe();
        store = me.getGriddetail().getStore();
        counter = store.getCount();
        if (counter) {
            var index = counter - 1;
            if (index == 0) {
                me.getGriddetail().getSelectionModel().select(index, true);
            } else {
                me.getGriddetail().getSelectionModel().deselectAll();
                me.getGriddetail().getSelectionModel().select(index, true);
            }
        }
    },
    dataSaveDescstore: function () {
        var me, p, form, grid, store, record, row, indexdata, getindex = '';
        me = this.getMe();
        p = me.paramdesc;
        form = me.getFormdatadesc();
        if (form.getForm().isValid()) {
            grid = me.getGriddesc();
            store = me.getStore('VDApprovedesc');
            row = form.getForm().getValues();
            row[me.idheaderfield] = me.idheadervalue;
            p.row = row;
            me.Checkdatadesc();
            switch (p.stateform) {
                case 'create':
                    if (p.checkdata == false) {
                        row['statedata'] = 'create';
                        row['project_id'] = apps.project;
                        row['pt_id'] = me.pt_id;
                        row[me.idheadefield] = me.idheadervalue;
                        store.add(row);
                        store.commitChanges();
                    } else {
                        me.buildWarningAlert("Sorry code = " + me.coa + " ,already exist in this transaction");
                    }
                    break;
                case 'update':
                    getindex = store.indexOf(p.rowdata);
                    record = store.getAt(getindex);
                    record.beginEdit();
                    row['statedata'] = 'update';
                    row[me.idheadefield] = me.idheadervalue;
                    record.set(row);
                    record.endEdit();
                    store.commitChanges();
                    break;
            }
            form.up('window').close();
            me.setDataDescAftersave();
        }
    },
    setDataDescAftersave: function () {
        var me, store, counter;
        me = this.getMe();
        store = me.getGriddesc().getStore();
        counter = store.getCount();
        if (counter) {
            var index = counter - 1;
            if (index == 0) {
                me.getGriddesc().getSelectionModel().select(index, true);
            } else {
                me.getGriddesc().getSelectionModel().deselectAll();
                me.getGriddesc().getSelectionModel().select(index, true);
            }
        }
    },
    dataSaveSubDetailstore: function () {
        var me, p, pd, form, grid, store, record, row, indexdata, getindex = '';
        me = this.getMe();
        p = me.paramsubdetail;
        pd = me.paramdetail;
        form = me.getFormdatasubdetail();
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
                        row['project_id'] = apps.project;
                        row['pt_id'] = me.pt_id;
                        row['deleted'] = false;
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
            me.getSubdata(store, pd.rowdata['data']);
            store.filter('deleted', false);
            p.totalsubdetail = store.sum('amount');
            me.setSumsubdetail();
            me.setDataSubDetailAftersave();
            form.up('window').close();
            //console.log(Ext.data.StoreManager.lookup('VDApprovesubdetail'));
        }
    },
    setDataSubDetailAftersave: function () {
        var me, store, counter;
        me = this.getMe();
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
    Checkdatadetail: function () {
        var me, status, returndata, pd, grid, store, filter = '';
        me = this.getMe();
        pd = me.paramdetail;
        pd.checkdata = false;
        grid = me.getGriddetail();
        store = grid.getStore();
        store.each(function (record)
        {
            if (record.data['voucher_id'] == pd.row.voucher_id &&
                    record.data['coa_id'] == pd.row.coa_id &&
                    record.data['indexdata'] == pd.row.indexdata
                    )
            {
                pd.checkdata = true;
            }
        });
    },
    Checkdatadesc: function () {
        var me, status, returndata, p, grid, store, filter = '';
        me = this.getMe();
        p = me.paramdesc;
        p.checkdata = false;
        grid = me.getGriddetail();
        store = grid.getStore();
        store.each(function (record)
        {
            if (record.data['voucher_id'] == p.row.voucher_id &&
                    record.data['indexdata'] == p.row.indexdata &&
                    record.data['posting_no'] == p.row.posting_no &&
                    record.data['receipt_no'] == p.row.receipt_no &&
                    record.data['code'] == p.row.code
                    )
            {
                p.checkdata = true;
            }
        });
    },
    Checksubdatadetail: function () {
        var me, status, returndata, p, grid, store, filter = '';
        me = this.getMe();
        p = me.paramsubdetail;
        p.checkdata = false;
        grid = me.getGridsubdetail();
        store = grid.getStore();
        store.each(function (record)
        {
            if (record.data['voucher_id'] == p.row.voucher_id &&
                    record.data['voucherdetail_id'] == p.row.voucherdetail_id &&
                    record.data['coa_id'] == p.row.coa_id &&
                    record.data['kelsub_id'] == p.row.kelsub_id &&
                    record.data['subgl_id'] == p.row.subgl_id &&
                    record.data['indexdata'] == p.row.indexdata
                    )
            {
                p.checkdata = true;
            }
        });
    },
    Checkbalanceheaderdetail: function () {
        var me, pd, formheader, formdetail, storedetail, countdetail,
                amount, totaldetail, amountdetail, balance, flagbalance, message;
        me = this.getMe();
        pd = me.paramdetail;
        formheader = me.getFormdata();
        formdetail = me.getFormdatadetail();
        storedetail = me.getGriddetail().getStore();
        amount = me.unMask(me.getVal(formheader, 'amount', 'value'));
        amountdetail = me.unMask(me.getVal(formdetail, 'amount', 'value'));
        countdetail = storedetail.getCount();
        if (countdetail > 0) {
            totaldetail = storedetail.sum("amount");
        } else {
            totaldetail = 0;
        }

        if (pd.stateform == 'create') {
            balance = parseFloat(amount) - (totaldetail + parseFloat(amountdetail));
        } else {
            balance = parseFloat(amount) - parseFloat(amountdetail);
        }
        if (balance < 0) {
            flagbalance = 0;
            message = 'Total detail coa more greater than Amount header';
        } else {
            flagbalance = 1;
            message = 'data normal';
        }
        return {"flagbalance": flagbalance, "message": message}
    },
    Checkbalanceheaderdetailsub: function () {
        var me, p, formheader, formdetail, formsubdetail, storesubdetail, countsubdetail,
                amount, pd, totalsubdetail, amountsubdetail, balance, flagbalance, message,
                gridsubdetail;
        me = this.getMe();
        pd = me.paramdetail;
        p = me.paramsubdetail;
        formheader = me.getFormdata();
        formdetail = me.getFormdatadetail();
        formsubdetail = me.getFormdatasubdetail();
        gridsubdetail = me.getGridsubdetail();
        storesubdetail = gridsubdetail.getStore();
        countsubdetail = storesubdetail.getCount();
        amountsubdetail = me.unMask(me.getVal(formsubdetail, 'amount', 'value'));
        amount = me.balancecoa;
        if (countsubdetail > 0) {
            storesubdetail.clearFilter(true);
            storesubdetail.filter(me.idheaderfield, me.idheadervalue);
            storesubdetail.filter(me.iddetailfield, me.iddetailvalue);
            storesubdetail.filter('deleted', false);
            totalsubdetail = storesubdetail.sum("amount");
            storesubdetail.clearFilter(true);
        } else {
            totalsubdetail = 0;
        }

        if (p.stateform == 'create') {
            balance = parseFloat(amount) - (totalsubdetail + parseFloat(amountsubdetail));
        } else {
            balance = parseFloat(amount) - parseFloat(amountsubdetail);
        }

        if (balance < 0) {
            flagbalance = 0;
            message = 'Total sub detail coa more greater than Amount in Coa';
        } else {
            flagbalance = 1;
            message = 'data normal';
        }
        return {"flagbalance": flagbalance, "message": message}
    },
    dataSavecustome: function () {
        var me, state, form, formdata, addingRecord, vp, vps, x, store, storedesc, storedetail, storesubdetail,
                valuedata, idProperty, rec, paramdata, rowdata, resjsonheader, rowjsonheader, validheader, paramheader,
                idProperty, counterdesc, counterdetail, countersubdetail, msgheader, restotal, grid;
        me = this.getMe();
        if (me.gridId === 1) {
            grid = me.getGridapprove();
        } else {
            grid = me.getGrid();
        }


        me = this.getMe();
        storedesc = Ext.data.StoreManager.lookup('VDApprovedesc');
        storedetail = Ext.data.StoreManager.lookup('VDApprovedetail');
        counterdesc = storedesc.getCount();
        counterdetail = storedetail.getCount();
        form = me.getFormdata();
        formdata = me.getFormdata().getForm();
        if (formdata.isValid()) {
            resetTimer();
            if (me.state == 'create') {
                me.flaggeneratevoucherno = '1';
                //me.generateVoucherno();
            }

            me.unformatCurrencyFormdata(me, form);
            store = grid.getStore();
            valuedata = formdata.getValues();
            form.up('window').body.mask('Saving data, please wait ...');
            state = form.up('window').state.toLowerCase();
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

            counterdesc = storedesc.getCount();
            counterdetail = storedetail.getCount();
            Ext.Ajax.request({
                url: me.urldata + state,
                method: 'POST',
                params: {
                    data: Ext.encode(valuedata)
                },
                success: function (response) {
                    resjsonheader = Ext.JSON.decode(response.responseText);
                    rowjsonheader = resjsonheader.data;
                    validheader = resjsonheader.success;
                    paramheader = resjsonheader.parameter;
                    msgheader = resjsonheader.msg;
                    restotal = resjsonheader.total;
                    me.idheadervalue = rowjsonheader.idheader;
                    if (validheader == 'true') {
                        if (counterdesc > 0) {
                            me.Savedesc(me, state);
                        }
                        if (counterdetail > 0) {
                            me.Savedetail(me, state);
                        }
                        store.commitChanges();
                        me.messagedata = msgheader;
                        me.alertFormdataSuccessNoMail();
                    } else {
                        me.messagedata = msgheader;
                        me.alertFormdataFailed();
                    }
                },
                failure: function (response) {
                    me.messagedata = 'data error';
                    me.alertFormdataFailed();
                    me.getFormdata().up('window').close();
                }
            });
        }
    },
    setDataAftersave: function () {
        var me, store, grid, counter;
        me = this.getMe();
        if (me.gridId === 1) {
            grid = me.getGridapprove();
        } else {
            grid = me.getGrid();
        }
        store = grid.getStore();
        counter = store.getCount();
        if (counter) {
            var index = counter - 1;
            if (index == 0) {
                grid.getSelectionModel().select(index, true);
            } else {
                grid.getSelectionModel().deselectAll();
                grid.getSelectionModel().select(index, true);
            }
        }
    },
    Savedesc: function (that, state) {
        var me, store, counter, id, statedata, data, action,
                resjson, rowjson, valid, msg, parameter;
        me = that;
        store = me.getStore('VDApprovedesc');
        store.clearFilter(true);
        if (state == 'create') {
            store.filter(me.idheaderfield, '0');
        } else {
            store.filter(me.idheaderfield, me.idheadervalue);
        }

        counter = store.getCount();
        if (counter > 0) {
            store.each(function (record, index) {
                var i = index + 1;
                id = record.get("voucherdesc_id");
                statedata = record.get("statedata");
                if (state == 'create' && statedata == 'create') {
                    action = 'create';
                } else if (state == 'create' && statedata == 'update') {
                    action = 'create';
                } else if (state == 'update' && statedata == 'create') {
                    action = 'create';
                } else if (state == 'update' && statedata == 'update') {
                    action = 'update';
                }

                data = record['data'];
                data[me.idheaderfield] = me.idheadervalue;
                data['parametersql'] = action;
                data['hideparam'] = 'desc' + action;
                if (me.urldesc !== me.urldesc + statedata) {
                    var executedata = 0;
                    if (statedata == 'create' || statedata == 'update') {
                        executedata = 1;
                    }
                    if (statedata == 'delete' && id !== 0) {
                        executedata = 1;
                        action = 'delete';
                    }

                    if (executedata == 1) {
                        Ext.Ajax.request({
                            url: me.urldesc + action,
                            method: 'POST',
                            params: {
                                data: Ext.encode(data)
                            },
                            success: function (response) {
                                resjson = Ext.JSON.decode(response.responseText);
                                rowjson = resjson.data;
                                valid = resjson.success;
                                parameter = resjson.parameter;
                                msg = resjson.msg;
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
    Savedetail: function (that, state) {
        var me, storedetail, counterdetail, iddetail, statedatadetail, datadetail, actiondetail,
                resjsondetail, rowjsondetail, validdetail, msgdetail, parameterdetail, kelsub_id,
                storesubdetail, countersubdetail;
        me = that;
        storedetail = Ext.data.StoreManager.lookup('VDApprovedetail');
        storedetail.clearFilter(true);
        counterdetail = storedetail.getCount();
        storesubdetail = Ext.data.StoreManager.lookup('VDApprovesubdetail');
        countersubdetail = storesubdetail.getCount();
        var i = 0;
        if (counterdetail > 0) {
            storedetail.each(function (record, index) {
                i = index + 1;
                iddetail = record.get("voucherdetail_id");
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
                                try {
                                  resjsondetail = Ext.JSON.decode(response.responseText);
                                }
                                catch(err) {
                                    me.messagedata = 'Details are not saved';
                                    me.alertFormdataFailed();
                                }
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
                                        if (storedata.coa_id == coa_id && storedata.voucherdetail_id == iddetail) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    });
                                    storesubdetail.each(function (record, index) {
                                        iddetailsub = record.get("vouchersubdetail_id");
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
                                                        try {
                                                          resjsonsubdetail = Ext.JSON.decode(response.responseText);
                                                        }
                                                        catch(err) {
                                                            me.messagedata = 'SubDetails are not saved';
                                                            me.alertFormdataFailed();
                                                        }
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
    alertFormdataSuccess: function () {
        var me, form, store, grid;
        me = this.getMe();
        if (me.gridId === 1) {
            grid = me.getGridapprove();
        } else {
            grid = me.getGrid();
        }
        grid.getStore().reload();
        form = me.getFormdata();
        form.up('window').body.unmask();
        Ext.Msg.show({
            title: 'Success',
            msg: me.messagedata,
            icon: Ext.Msg.INFO,
            buttons: Ext.Msg.OK,
            fn: function () {
                me.formDataClose();
                me.sendRequestmail();
            }
        });
    },
    alertFormdataSuccessNoMail: function () {
        var me, form, store, grid;
        me = this.getMe();
        if (me.gridId === 1) {
            grid = me.getGridapprove();
        } else {
            grid = me.getGrid();
        }
        grid.getStore().reload();
        form = me.getFormdata();
        form.up('window').body.unmask();
        Ext.Msg.show({
            title: 'Success',
            msg: me.messagedata,
            icon: Ext.Msg.INFO,
            buttons: Ext.Msg.OK,
            fn: function () {
                me.formDataClose();
            }
        });
    },
    alertFormdataFailed: function () {
        var me, form, store, grid;
        me = this.getMe();
        if (me.gridId === 1) {
            grid = me.getGridapprove();
        } else {
            grid = me.getGrid();
        }
        grid.getStore().reload();
        form = me.getFormdata();
        form.up('window').body.unmask();
        me.clearallStore();
        Ext.Msg.show({
            title: 'Failure',
            msg: 'Error: ' + me.messagedata,
            icon: Ext.Msg.ERROR,
            buttons: Ext.Msg.OK
        });
    },
    formDataClose: function () {
        var me = this.getMe();
        me.getFormdata().up('window').close();
        me.clearallStore();
    },
    clearallStore: function () {
        var me;
        me = this.getMe();
        //me.getGriddetail().getStore().removeAll();
    },
    dataDestroysubdetailwithflag: function () {
        var me, rows, confirmmsg, successmsg, failmsg,
                record, recordcounttext, store, selectedRecord, msg, successcount
                , parameter, pesan, dataconfirm;
        me = this.getMe();
        dataconfirm = me.fieldconfirmsubdetail;
        rows = me.getGridsubdetail().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            store = Ext.data.StoreManager.lookup('VDApprovesubdetail');
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
    fdar: function () {
        var me = this.getMe();
        var x = {
            init: function () {
                /// init here
            },
            create: function () {
                /// create here  

            },
            update: function () {
                var formvalue = me.getFormdata().getForm().getValues();
                for (var i in formvalue) {
                    var el = me.getFormdata().down("[name=" + i + "]");
                    if (el) {
                        if (el.absoluteReadOnly) {
                            el.setReadOnly(true);
                        }
                    }
                }

                // me.getFormdata().down("[name=coacode]").setReadOnly(true);

                if (me.gridId == 1) {
                    var grid = me.getGridapprove();
                } else {
                    var grid = me.getGrid();
                }
                
                var store = grid.getStore();
                var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                me.getFormdata().loadRecord(record);
                /// update here
            },
            read: function () { //========= added on march 15th 2016 by Tirtha
                if (me.gridId === 1) {
                    var grid = me.getGridapprove();
                } else {
                    var grid = me.getGrid();
                }
                var store = grid.getStore();
                var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                me.getFormdata().loadRecord(record);
                me.getFormdata().getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
                me.getFormdata().down('#btnSave').setDisabled(true);
            }
        };
        return x;
    },
    formDataAfterRender: function (el) {
        var me, form, state, grid, store, record, counter, row;
        me = this.getMe();
        me.storeProcess = me.createSpProcessObj(me.storeProcess);
        me.loadingapprove = new Ext.LoadMask(Ext.getBody(), {msg: "Please wait..."});
        me.fdar().init();
        me.loadComboBoxStore(el);
        form = me.getFormdata();
        state = el.up('window').state;
        if (me.gridId === 1) {
            grid = me.getGridapprove();
        } else {
            grid = me.getGrid();
        }
        if (state == 'create') {
            me.fdar().create();
            me.getFormdata().down("[name=status]").setValue('1');
        } else if (state == 'update') {
            me.fdar().update();
            me.setReadonly(form, 'pt_id', true);
            me.setReadonly(form, 'department_id', true);
            me.setReadonly(form, 'approveby_id', true);
            me.setReadonly(form, 'voucher_date', true);
            
            form.down('#btnOpenreject').setVisible(true);
            form.down('#btnOpenpending').setVisible(true);

            form.down('#btnCancel').setVisible(false);
            store = grid.getStore();
            record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
            counter = store.getCount();
            if (counter > 0) {
                row = record['data'];
                me.in_out = row.dataflow;
            }

            var rec = grid.getSelectedRecord();
            if (moment(rec.get('voucher_date')).format("DD-MM-YYYY") == "01-01-1900") {
                form.down("[name=voucher_date]").setValue('');
            }
            me.setStoreVendorRead();
            me.getFormdata().down('[name=rejectreason]').setDisabled(false);
            me.getFormdata().down('[name=approval_notes]').setDisabled(false);
            me.setReadonly(form, 'rejectreason', false);
            me.setReadonly(form, 'approval_notes', false);

            me.isFromApproved = 0;

        } else if (state == 'read') { //========= added on march 15th 2016 by Tirtha
            me.fdar().read();
            store = grid.getStore();
            record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
            counter = store.getCount();
            if (counter > 0) {
                row = record['data'];
                me.in_out = row.dataflow;
            }
            me.setStoreVendorRead();
            me.getFormdata().down('[name=rejectreason]').setDisabled(false);
            me.getFormdata().down('[name=approval_notes]').setDisabled(false);
            me.setReadonly(form, 'rejectreason', false);
            me.setReadonly(form, 'approval_notes', false);
        }

        if (me.in_out == "I") {
            form.down("[name=vendor_bankacc_id_container1]").setVisible(false);
            form.down("[name=vendor_bankacc_id_container2]").setVisible(false);
        } else {
            form.down("[name=vendor_bankacc_id_container1]").setVisible(true);
            form.down("[name=vendor_bankacc_id_container2]").setVisible(true);
        }

        me.setStatus();
    },
    setStatus: function () {
        var me, form, status;
        me = this.getMe();
        form = me.getFormdata();
        status = form.down("[name=status]").getValue();
        if (status == '1') {
            form.down("[name=lblstatus]").setText("OPEN", true);
            me.getFormdata().down('#btnUnapprove').setVisible(false);
            me.getFormdata().down('#btnReject').setVisible(false);
        } else {
            if (status == '2') {
                form.down("[name=lblstatus]").setText("APPROVE", true);
                me.getFormdata().down('#btnApprove').setVisible(false);
                me.getFormdata().down('#btnRevise').setVisible(false);
            } else if (status == '3') {
                form.down("[name=lblstatus]").setText("POSTING", true);
                me.getFormdata().down('#btnApprove').setVisible(false);
                me.getFormdata().down('#btnUnapprove').setVisible(false);
                me.getFormdata().down('#btnRevise').setVisible(false);
            }else if (status == '6') {
                form.down("[name=lblstatus]").setText("PENDING", true);
                me.getFormdata().down('#btnApprove').setVisible(true);
                me.getFormdata().down('#btnOpenreject').setVisible(true);
                me.getFormdata().down('#btnUnapprove').setVisible(false);
                me.getFormdata().down('[name=rejectreason]').setDisabled(false);
                me.getFormdata().down('#btnRevise').setVisible(false);
            }else if (status == '7') {
                form.down("[name=lblstatus]").setText("REJECTED", true);
                me.getFormdata().down('#btnApprove').setVisible(false);
                me.getFormdata().down('#btnUnapprove').setVisible(false);
                me.getFormdata().down('#btnRevise').setVisible(false);
            }else{
                form.down("[name=lblstatus]").setText("ON APPROVAL", true);
                me.getFormdata().down('#btnOpenreject').setVisible(true);
                me.getFormdata().down('#btnOpenpending').setVisible(true);

                if (form.down("[name=hod_approve_status]").getValue() == "APPROVED") {
                    me.getFormdata().down('#btnRevise').setVisible(true);
                } else {
                    me.getFormdata().down('#btnRevise').setVisible(false);
                }
            }

            me.getFormdata().getForm().getFields().each(function (field) {
                field.setReadOnly(true);
            });

            if(status == '5' || status == '2' || status == '6'){
                me.setReadonly(form, 'rejectreason', false);
                me.setReadonly(form, 'approval_notes', false);
            }

            me.getFormdata().down('#btnSave').setDisabled(true);
            //me.getFormdata().down('#btnDetailDesc').setDisabled(true);
            //me.getFormdata().down('#btnDetailDesc').setDisabled(true);
            //me.getFormdata().down('#voucherrequesttab').setDisabled(true);
            me.getGridsubdetail().down('toolbar').setDisabled(true);
            me.getGridsubdetail().down('actioncolumn').setVisible(false);
            //me.getGridsubdetail().down('[action=destroy]').setDisabled(true);
            me.getGriddetail().down('toolbar').setDisabled(true);
            me.getGriddetail().down('actioncolumn').setVisible(false);
            //  me.getGriddetail().down('[action=update]').setDisabled(true);
            // me.getGriddetail().down('[action=destroy]').setDisabled(true);
        }

        if (me.gridId === 1) {
            me.getFormdata().down('#btnApprove').setVisible(false);
        } 
        
    },
    // gridSelectionChange: function () {
    //     var me = this.getMe();
    //     if (me.gridId === 1) {
    //         var grid = me.getGridapprove();
    //     } else {
    //         var grid = me.getGrid();
    //     }
    //     var row = grid.getSelectionModel().getSelection();
    // },
    gridSelected: function () {
        var me, grid, store, counter, record, row;
        me = this;
        if (me.gridId === 1) {
            grid = me.getGridapprove();
        } else {
            grid = me.getGrid();
        }
        store = grid.getStore();
        counter = store.getCount();
        if (counter > 0) {
            record = grid.getSelectionModel().getSelection()[0];
            // row = record['data'];
        }
    },
    gridSelectionChange: function () {
        var me, grid, store, counter, record, row;
        me = this.getMe().getMe();
        if (me.gridId === 1) {
            grid = me.getGridapprove();
        } else {
            grid = me.getGrid();

            store = grid.getStore();
            counter = grid.getSelectionModel().getSelection().length;
            if (counter == 1) {
                record = grid.getSelectionModel().getSelection()[0];
                row = record['data'];
                me.addby = row.addby;
                if (row.status == '1' || row.status == '5' || row.status == '2' || row.status == '6') {
                    grid.down('#btnEdit').setDisabled(false);
                    if (me.gridId !== 1) {
                        grid.down('#btnDelete').setDisabled(false);
                    }                
                }else {
                    grid.down('#btnEdit').setDisabled(true);
                    if (me.gridId !== 1) {
                        grid.down('#btnDelete').setDisabled(true);
                    } 
                }
                grid.down('#btnPrintvoucher').setDisabled(false);
            } else {
                grid.down('#btnEdit').setDisabled(true);
                if (me.gridId !== 1) {
                    grid.down('#btnDelete').setDisabled(true);
                } 
                grid.down('#btnPrintvoucher').setDisabled(true);
            }
        }
        
    },
    sendRequestmail: function () {
        var me, data;
        me = this.getMe();
        data = me.valueform;
        data['voucher_id'] = me.idheadervalue;
        data['addby'] = me.addby;
        //data['hideparam'] = 'approve'; //obsolete
        data['hideparam'] = 'approvesby';
        me.senddata = data;
        me.urlrequest = me.urldata + 'update';
        me.AjaxRequest(f);
    },
    execAction: function (el, action, me) {

        if (!action) {
            action = '';
        }
        if (!me) {
            me = this.getMe();
        }
        switch (action) {
            case me.bindPrefixName + 'Create':
            case me.bindPrefixName + 'Update':
            case me.bindPrefixName + 'Read':
                me.formDataShow(el, acts[action], action);
                break;
            case 'show':
                me.formDataShow(el, action);
                break;
            case me.bindPrefixName + 'Delete':
                Ext.Msg.alert('Warning', "Role Anda Tidak Dapat Melakukan Aksi Ini");
                return 0;
                me.dataDestroy(el);
                break;
            case me.bindPrefixName + 'Printvoucher':
                Ext.Msg.alert('Warning', "Role Anda Tidak Dapat Melakukan Aksi Ini");
                return 0;
                me.printVoucherdata();
                break;
            case me.bindPrefixName + 'Approve':
                //me.Approve(); //obsolete
                me.Approvesby();
                break;
            case me.bindPrefixName + 'Approvesby':
                me.Approvesby();
                break;
            case me.bindPrefixName + 'Approvepajak':
                me.Approvepajak();
                break;
            case me.bindPrefixName + 'Unapprove':
                me.Unapprove();
                break;
        }
    },
    Approvesby: function () {
        var me;
        me = this.getMe();
        // if(me.rolepajak.includes(apps.gid)){
        //     me.tools.alert.warning("Role Anda Tidak Dapat Melakukan Approval Ini");
        //     return 0;
        // }

        if (me.gridId == 1) {
            var gridSelected = me.getGridapprove().getSelectionModel().getSelection();
        } else {
            var gridSelected = me.getGrid().getSelectionModel().getSelection();
        }
        var hod_approver = gridSelected[0].data.hod_approver.split(',');
        
        if (!hod_approver.includes(apps.uid)) {
            me.tools.alert.warning("Role Anda Tidak Dapat Melakukan Approval Ini");
            return false;
        }

        me.MessageConfirm('approvesby', 'Are you sure want to approve this voucher ? ', ' Confirm Your Approval');
    },
    Approve: function () {
        var me;
        me = this.getMe();

        if (me.gridId == 1) {
            var gridSelected = me.getGridapprove().getSelectionModel().getSelection();
        } else {
            var gridSelected = me.getGrid().getSelectionModel().getSelection();
        }
        var hod_approver = gridSelected[0].data.hod_approver.split(',');
        
        if (!hod_approver.includes(apps.uid)) {
            me.tools.alert.warning("Role Anda Tidak Dapat Melakukan Approval Ini");
            return false;
        }
        //me.MessageConfirm('approve', 'Are you sure want to approve ?', ' Confirm Your Approval');
        me.MessageConfirm('approvesby', 'Are you sure want to approve ?', ' Confirm Your Approval');
    },
    Approvepajak: function () {
        var me;
        me = this.getMe();

        if (me.gridId == 1) {
            var gridSelected = me.getGridapprove().getSelectionModel().getSelection();
        } else {
            var gridSelected = me.getGrid().getSelectionModel().getSelection();
        }
        
        var hod_approve_status = gridSelected[0].data.hod_approve_status;
        
        if (hod_approve_status == "ON APPROVAL") {
            me.tools.alert.warning("Voucher masih dalam approval HOD");
            return false;
        }

        var tax_approver = gridSelected[0].data.tax_approver.split(',');
        
        if (!tax_approver.includes(apps.uid)) {
            me.tools.alert.warning("Role Anda Tidak Dapat Melakukan Approval Ini");
            return false;
        }
        me.MessageConfirm('approvepajak', 'Are you sure want to approve tax ?', ' Confirm Your Approval');
    },
    Unapprove: function () {
        var me;
        me = this.getMe();

        //unapprove is disable
        me.tools.alert.warning("Role Anda Tidak Dapat Melakukan Batal Approval");
        return 0;

        if(me.rolepajak.includes(apps.gid)){
            me.tools.alert.warning("Role Anda Tidak Dapat Melakukan Approval Ini");
            return 0;
        }
        me.MessageConfirm('unapprove', 'Are you sure want to unapprove ?', ' Confirm Your Unapprove');
    },
    Openreject: function () {
        var me;
        me = this.getMe();
        //me.getFormdata().down('#btnApprove').setVisible(false);
        me.getFormdata().down('#btnOpenreject').setVisible(false);
        me.getFormdata().down('#btnReject').setVisible(true);
        me.getFormdata().down('#btnApprove').setVisible(false);
        me.getFormdata().down('#btnCancel').setVisible(true);
        me.getFormdata().down('#btnRevise').setVisible(true);
        me.getFormdata().down('#btnOpenpending').setVisible(false);
        me.getFormdata().down('[name=rejectreason]').setVisible(true);
        me.getFormdata().down('[name=approval_notes]').setVisible(false);
    },
    Openpending: function () {
        var me;
        me = this.getMe();
        //me.getFormdata().down('#btnApprove').setVisible(false);
        me.getFormdata().down('#btnOpenreject').setVisible(false);
        me.getFormdata().down('#btnReject').setVisible(false);
        me.getFormdata().down('#btnPending').setVisible(true);
        me.getFormdata().down('#btnCancel').setVisible(true);
        me.getFormdata().down('#btnOpenpending').setVisible(false);
        me.getFormdata().down('#btnApprove').setVisible(false);
        me.getFormdata().down('#btnRevise').setVisible(false);
    },
    Reject: function () {
        var me;
        me = this.getMe();
        if(me.rolepajak.includes(apps.gid)){
            me.tools.alert.warning("Role Anda Tidak Dapat Melakukan Reject");
            return 0;
        }
        if (me.getFormdata().down('[name=rejectreason]').getValue() == "") {
            Ext.Msg.alert('Warning', 'Harap isi Reject reason / Alasan di-reject');
            return 0;
        }

        me.MessageConfirm('reject', 'Are you sure want to reject this voucher ?', ' Confirmation ');
    },
    Pending: function () {
        var me;
        me = this.getMe();
        if(me.rolepajak.includes(apps.gid)){
            me.tools.alert.warning("Role Anda Tidak Dapat Melakukan Pending");
            return 0;
        }
        me.MessageConfirm('pending', 'Are you sure want to pending this voucher ?', ' Confirmation ');
    },
    MessageConfirm: function (flag, msg, title) {
        var me, record, row, data, grid;
        me = this.getMe();
        resetTimer();
        me.loadingapprove = new Ext.LoadMask(Ext.getBody(), {msg: "Please wait..."});
        form = me.getFormdata();
        if (me.gridId === 1) {
            grid = me.getGridapprove();
        } else {
            grid = me.getGrid();
        }
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
                    if (form) {
                        data['rejectreason'] = form.down('[name=rejectreason]').getValue();
                        data['approval_notes'] = form.down("[name=approval_notes]").getValue();
                    }

                    me.senddata = data;
                    me.loadingapprove.show();
                    me.urlrequest = me.urldata + 'update';
                    me.AjaxRequest();
                }
            },
            icon: Ext.Msg.QUESTION
        });
    },
    AjaxRequest: function () {
        var me, grid;
        me = this.getMe();
        if (me.gridId === 1) {
            grid = me.getGridapprove();
        } else {
            grid = me.getGrid();
        }
        Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
            timeout: 45000000,
            params: {
                data: Ext.encode(me.senddata)
            },
            success: function (response) {
                if(response) {
                    try {
                        me.info = Ext.JSON.decode(response.responseText);
                        me.setSuccessEvent();
                    } catch(e) {
                        me.loadingapprove.hide();
                        Ext.Msg.alert('Warning', 'Request Failed');
                        return false;
                    }
                    grid.getStore().reload();
                }
            },
            failure: function (response) {
                me.getFormdata().up('window').close();
            }
        });
    },
    setSuccessEvent: function () {
        var me, state, form, data, grid;
        me = this.getMe();
        data = me.info.data;
        form = me.getFormdata();
        if (me.gridId === 1) {
            grid = me.getGridapprove();
        } else {
            grid = me.getGrid();
        }

        if (me.info.success == false) {
            me.loadingapprove.hide();
            //me.buildFailedAlert("Failed.");
        }

        switch (me.info.parameter) {
            case null:

                if (form) {
                    state = form.up('window').state.toLowerCase();
                } else {
                    state = '';
                }

                if (state == 'create') {
                    me.manager_id = data['manager_id'];
                    me.employee_id = data['employee_id'];
                    me.department_id = data['department_id'];
                }
                break;
            case 'default':
                break;
            case 'generatevoucherrequest':
                form.down("[name=voucher_no]").setValue(data);
                break;
            case 'sendrequestmail':
                me.loadingapprove.hide();
                grid.getStore().reload();
                break;
            case 'approve':
                me.loadingapprove.hide();
                grid.getStore().reload();
                if (me.getFormdata()) {
                    me.getFormdata().up('window').close();
                }
                break;
            case 'approvesby':
                me.loadingapprove.hide();
                grid.getStore().reload();
                if (me.getFormdata()) {
                    Ext.Msg.alert('Info', 'Approved.');
                    me.getFormdata().up('window').close();
                }
                //me.getFormdata().up('window').close();
                break;
            case 'reject':
                me.loadingapprove.hide();
                grid.getStore().reload();
                me.getFormdata().up('window').close();
                break;
            case 'pending':
                me.loadingapprove.hide();
                grid.getStore().reload();
                me.getFormdata().up('window').close();
                break;
            case 'approvepajak':
                me.loadingapprove.hide();
                grid.getStore().reload();
                if (me.getFormdata()) {
                    me.getFormdata().up('window').close();
                }
                break;
            case 'unapprove':
                me.loadingapprove.hide();
                grid.getStore().reload();
                if (me.getFormdata()) {
                    me.getFormdata().up('window').close();
                }
                //me.getFormdata().up('window').close();
                break;
            case 'report':
                value = me.info.data;
                me.createWindows();
                me.submitReport(value);
                break;
        }
    },
    dataSearch: function () {
        resetTimer();
        var me = this.getMe();
        var grid;
        var form = me.getFormsearch().getForm();
        if (me.gridId === 1) {
            grid = me.getGridapprove();
        } else {
            grid = me.getGrid();
        }
        var store = grid.getStore();
        me.getFormsearch().down("[name=hideparam]").setValue('search'); // added on april 2016, ahmad riadi    
        var fields = me.getFormsearch().getValues();
        if (me.gridId === 1) {
            fields['hideparam'] = 'approve_only';
        }
        fields['project_id'] = me.project_id;
        for (var x in fields)
        {
            store.getProxy().setExtraParam(x, fields[x]);
        }
        me.loadPage(store);
    },
    printVoucherdata: function () {
        var me, checked, grid, record, row, data, reportfile;
        me = this.getMe();
        if (me.gridId === 1) {
            grid = me.getGridapprove();
        } else {
            grid = me.getGrid();
        }
        checked = grid.down("toolbar [name=checkusecopyva]").getValue();
        record = grid.getSelectionModel().getSelection()[0];
        row = record['data'];
//	console.log('preprinted');
//		 console.log('print data');	
//	         console.log(apps.project);
//		 console.log(apps.pt);

        Ext.Msg.confirm('Print Voucher', "Print Data Voucher dengan Pre Printed ?", function (btn) {
            if (btn == 'yes') {
                //console.log('preprinted');

                if (row.approve_user_id > 0) {

                    if (checked == true) {
                        if (apps.project == 1 && apps.pt == 1) {
                            reportfile = 'Vouchertransaction_kp_with_copy_preprinted';
                        } else {
                            reportfile = 'Vouchertransactionwithcopy';
                        }
                    } else {
                        if (apps.project == 1 && apps.pt == 1) {
                            reportfile = 'Vouchertransaction_kp_preprinted_v3';
                        } else {
                            reportfile = 'Vouchertransaction';
                        }
                    }

                } else {
                    reportfile = 'Vouchertransaction_kp_preprinted_un';
                }


                me.report = reportfile;
                record = grid.getSelectionModel().getSelection()[0];
                row = record['data'];
                data = row;
                me.setforAjax(data, 'report');
            } else {

                if (row.approve_user_id > 0) {

                    if (checked == true) {
                        if (apps.project == 1 && apps.pt == 1) {
                            reportfile = 'Vouchertransaction_kp_with_copy';
                        } else {
                            reportfile = 'Vouchertransactionwithcopy';
                        }
                    } else {
                        if (apps.project == 1 && apps.pt == 1) {
                            reportfile = 'Vouchertransaction_kp';
                        } else {
                            reportfile = 'Vouchertransaction';
                        }
                    }

                } else {
                    reportfile = 'Vouchertransaction_kp_preprinted_un';
                }
                me.report = reportfile;
                record = grid.getSelectionModel().getSelection()[0];
                row = record['data'];
                data = row;
                me.setforAjax(data, 'report');
            }

        });
    },
    printVoucherdata_old: function () {
        var me, checked, grid, record, row, data, reportfile;
        me = this.getMe();
        if (me.gridId === 1) {
            grid = me.getGridapprove();
        } else {
            grid = me.getGrid();
        }
        checked = grid.down("toolbar [name=checkusecopyva]").getValue();
        if (checked == true) {
            reportfile = 'Vouchertransactionwithcopy';
        } else {
            reportfile = 'Vouchertransaction';
        }
        me.report = reportfile;
        record = grid.getSelectionModel().getSelection()[0];
        row = record['data'];
        data = row;
        me.setforAjax(data, 'report');
    },
    printVoucherdata_old2: function () {
        var me, checked, grid, record, row, data, reportfile;
        me = this.getMe();
        if (me.gridId === 1) {
            grid = me.getGridapprove();
        } else {
            grid = me.getGrid();
        }
        checked = grid.down("toolbar [name=checkusecopyva]").getValue();
        if (checked == true) {
            if (apps.project == '1' && apps.pt == '1') {
                reportfile = 'Vouchertransaction_kp_with_copy';
            } else {
                reportfile = 'Vouchertransactionwithcopy'
            }
        } else {
            if (apps.project == '1' && apps.pt == '1') {
                reportfile = 'Vouchertransaction_kp';
            } else {
                reportfile = 'Vouchertransaction'
            }
        }
        me.report = reportfile;
        record = grid.getSelectionModel().getSelection()[0];
        row = record['data'];
        data = row;
        me.setforAjax(data, 'report');
    },
    setforAjax: function (data, parameter) {
        var me;
        me = this.getMe();
        data['hideparam'] = parameter;
        me.urlrequest = 'cashier/vdrequest/print';
        me.senddata = data;
        me.AjaxRequest();
    },
    createWindows: function () {
        var me = this.getMe();
        me.winId = 'reportvoucherdepartmentapprovewindows';
        me.instantWindow('Panel', 800, 'Result ', 'state-report', me.winId, 'masterreport');
        me.win = desktop.getWindow(me.winId);
    },
    submitReport: function (value) {
        var me, report, html;
        me = this.getMe();
        report = 'transaction_voucher/' + me.report;
        html = me.Reportviewerjs(value, report);
        me.win.down("#MyReportPanel").body.setHTML(html);
        $("#Reportform").submit();
    },
    setStoreVendorbytypedata: function (form) {
        var me, store, form, state, type_vendor;
        me = this.getMe();
        form = me.getFormdata();
        state = form.up('window').state.toLowerCase();
        type_vendor = form.down('[name=type_vendor]').getValue();
        if (form != '') {
            store = me.getStore("Vendorcombo");
            store.clearFilter(true);
            if (type_vendor == 'internal' || type_vendor == 'external') {
                store.filterBy(function (record) {
                    if (record.data.type_vendor === type_vendor) {
                        return true;
                    } else {
                        return false;
                    }
                });
            } else {
                store.reload();
            }
        }
    },
    setStoreVendorRead: function () {
        var me, store, form;
        me = this.getMe();

        form = me.getFormdata();
        
        var vendor_id = form.down("[name=vendor_id]").getValue();

        store = me.getStore('Vendorcombo');
        store.load({
            params: {
                "hideparam": 'getvendorbyid',
                "iddata": vendor_id
            },
            callback: function (records, operation, success) {
            }
        });
    },
    setStoreDeptFormsearch: function () {
        var me, store, form;
        me = this.getMe();
        form = me.getFormsearch();
        store = me.getStore("Department");
        store.reload({
            params: {
                "hideparam": 'getdepartmentbyprojectpt',
                "pt_id" : me.pt_id,
                "project_id" : me.project_id
            },
            callback: function (records, operation, success) {
                store.each(function (record)
                {
                    if (record.data['department_id'] == me.department_id) {
                        me.setVal(form, 'department_id', record.data['department_id']);
                    }
                });
            }
        });
    },
    FormUploadAttachmentRead: function (action) {
        var me, p, psa, pmsa = '';
        var me = this.getMe().getMe();
        var grid = me.getGridattachmentdetail();
        
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
        var form = me.getFormdata();
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

                    var contentType = 'application/pdf';
                    var blob = me.b64toBlob(base64src, contentType);
                    var blobUrl = URL.createObjectURL(blob);

                    var html='<embed scrolling="no" src="'+blobUrl+'" type="application/pdf" width="100%" height="100%">';

                    Ext.create("Ext.Window",{
                        title     : 'Attachment Viewer : ' + record.get("filename"),
                        width     : 1280,
                        height    : 700,
                        closable  : true,
                        html      : html,
                        autoScroll: true,
                        modal     : true,
                        constrain : true
                    }).show();  

                }else{
                    var html='<div style="style="display: block; min-height: 700; width: 1280px; min-width: 1280px">';
                        html = html+'<img src="'+base64src+'" alt="<br>Preview is not supported for this file format." style="overflow: auto; display: block; height: auto; width: 100%"></div>';
                        html = html+'<div><a style="padding: 10px; float: right;" target="_blank" href="'+downloadsrc+'" download>Download</a></div>';
                    
                    me.instantWindow('FormDataPreviewAttachment', 1280, 'Preview Attachment', 'create', '', me.controllerName, 700);
                    me.formdatapreviewattachmentAfterrender(ext, base64src, downloadsrc, resjson.data.filename);
                }

                // Ext.create("Ext.Window",{
                //     title : 'Attachment Viewer : ' + record.get("filename"),
                //     width : 700,                            
                //     height: 500,
                //     closable : true,                           
                //     html : html,  
                //     autoScroll: true,                       
                //     modal : true
                // }).show();

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
    b64toBlob: function (b64Data, contentType='', sliceSize=512) {
        var byteCharacters = atob(b64Data.replace(/^[^,]+,/, ''));
        var byteArrays = [];
      
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
      
            var byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
      
            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
      
        var blob = new Blob(byteArrays, {type: contentType});
        return blob;
    },
    formdatapreviewattachmentAfterrender: function(ext, srcfile, downloadSrc, filename) {
        var me = this;
        
        me.getFormdatapreviewattachment().down("[name=attachment_preview]").setSrc(srcfile);
        me.getFormdatapreviewattachment().down("[name=file_name]").setValue(filename);
        me.getFormdatapreviewattachment().down("[name=download_link]").setValue(srcfile);
    },
    getDataattachmentdetail: function () {
        var me, pd, counter, form, rowdata, lengthkelsub, store, grid, rawjson = '', storeattachmentdetail;
        me = this.getMe().getMe();
        pd = me.paramdetail;
        form = me.getFormdata();
        pd.grid = me.getGriddetail();
        pd.store = me.getStore("VDApproveattachmentdetail");
        pd.store.load({
            params: {
                "hideparam": 'attachmentdetail',
                "voucher_id": me.getValue(me, 'voucher_id', 'value'),
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                try {
                    counter = pd.store.getCount();
                    rawjson = pd.store.proxy.getReader().jsonData;
                }
                catch(err) {
                  console.log(err.message);
                }
            }
        });
    },
    getDataapprovaldetail: function () {
        var me, pd, counter, form, rowdata, lengthkelsub, store, grid, rawjson = '', storeapprovaldetail;
        me = this.getMe().getMe();
        pd = me.paramdetail;
        form = me.getFormdata();
        pd.grid = me.getGriddetail();
        pd.store = me.getStore("VDApproveapprovaldetail");
        pd.store.load({
            params: {
                "hideparam": 'approvaldetail',
                "voucher_id": me.getValue(me, 'voucher_id', 'value'),
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                try {
                    counter = pd.store.getCount();
                    rawjson = pd.store.proxy.getReader().jsonData;
                }
                catch(err) {
                  console.log(err.message);
                }
            }
        });
    },
    gridattachmentitemdoubleclick: function () {
        var me, p;
        me = this.getMe().getMe();
        me.FormUploadAttachmentRead('read');
    },
    revise: function() {
        
        var me = this;
        var fd = me.getFormdata();

        var gridSelected = me.getGrid().getSelectionModel().getSelection();
        var hod_approve_status = gridSelected[0].data.hod_approve_status;
        var tax_approver = gridSelected[0].data.tax_approver.split(',');
        var hod_approver = gridSelected[0].data.hod_approver.split(',');
        
        if (tax_approver.includes(apps.uid)) {
            if (hod_approve_status == "ON APPROVAL") {
                me.tools.alert.warning("Voucher masih dalam approval HOD");
                return false;
            }
        }        

        if (fd.down("[name=approval_notes]").getValue() == "") {
            Ext.Msg.alert("Info", "Approval Notes must be filled.");
            return false;
        }

        var record = me.getGrid().getSelectionModel().getSelection()[0];
        var row = record['data'];
        var data = row;
        data['hideparam'] = 'revise';
        data['approval_notes'] = fd.down("[name=approval_notes]").getValue();
        
        Ext.Msg.confirm("Confirmation", "Are you sure ?", function(btn) {
            if (btn == 'yes') {
                fd.setLoading("Please Wait...");
                Ext.Ajax.request({
                    url: 'cashier/vdapprove/update',
                    params: {
                        data: Ext.encode(data)
                    },
                    success: function(response) {
                        fd.setLoading(false);
                        var res = Ext.JSON.decode(response.responseText);
                        if (res.success == true) {
                            Ext.Msg.alert("Info", "Success");
                        } else {
                            Ext.Msg.alert("Info", "An error has occurred");
                        }
                        fd.up('window').close();
                        me.getGrid().getStore().reload();
                    }
                })
            }
        })
    }
});