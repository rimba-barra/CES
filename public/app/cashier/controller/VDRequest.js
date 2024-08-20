Ext.define('Cashier.controller.VDRequest', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.VDRequest',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptusercombobox',
        'Cashier.library.template.combobox.Deptprefixcombobox',
        'Cashier.library.template.combobox.Departmentcombobox',
        'Cashier.library.template.combobox.Coadeptvouchercombobox',
        'Cashier.library.template.combobox.Employeehrdcombobox',
        'Cashier.library.template.combobox.Vendorcombobox',
        'Cashier.library.template.combobox.Customercombobox',
        'Cashier.library.template.combobox.Subglcombobox',
        'Cashier.library.template.combobox.Statusvouchercombobox',
        'Cashier.library.template.combobox.Jenisusahacombobox',
        'Cashier.library.template.combobox.Vendornotecombobox',
        'Cashier.library.template.combobox.Inoutcombobox',
        'Cashier.library.template.combobox.Kasbondepthasapplycombobox',
        'Cashier.library.template.combobox.Kasbondepthasapplylocalcombobox',
        'Cashier.library.template.combobox.Tipevendorvouchercombobox',
        'Cashier.library.template.combobox.Currencycombobox',
        'Cashier.library.template.combobox.Cashflowcombobox',
        'Cashier.library.template.combobox.Purchaselettercombobox',
        'Cashier.library.template.combobox.Tipepajakcombobox',
        'Cashier.library.template.combobox.Tipepajakpphcombobox',
        'Cashier.library.template.combobox.Tipepajakpersentasecombobox',
        'Cashier.library.template.combobox.Tipepajakpersentaseppncombobox',
        'Cashier.library.template.combobox.Tipepajakpersentasepphcombobox',
        'Cashier.library.template.combobox.Ptprojectcombobox',
        'Cashier.library.template.combobox.Projectcombobox',
        'Cashier.library.box.Config',
        'Cashier.library.box.tools.EventSelector',
        'Cashier.library.box.tools.Tools',
        'Cashier.library.BrowseCashier',
        'Cashier.library.template.combobox.Vendoraccnocombobox',
        'Cashier.library.template.combobox.Paymentmethodcombobox',
        'Cashier.library.template.combobox.Listapprovalcombobox',
        'Cashier.library.template.combobox.Vouchermakercombobox',
        'Cashier.library.template.combobox.Projectptcombobox',
        'Cashier.library.BrowseCashierV2'
    ],
    views: [
        'vdrequest.Panel',
        'vdrequest.Grid',
        'vdrequest.Gridkasbondetail',
        'vdrequest.Gridattachmentdetail',
        'vdrequest.Gridapprovaldetail',
        'vdrequest.Griddetail',
        'vdrequest.Griddesc',
        'vdrequest.Gridsubdetail',
        'vdrequest.FormSearch',
        'vdrequest.FormData',
        'vendor.FormData',
        'vdrequest.FormDataBank',
        'vdrequest.FormContentDesc',
        'vdrequest.FormDataDesc',
        'vdrequest.FormDataDetail',
        'vdrequest.FormDataSubDetail',
        'vdrequest.KomisiGrid',
        'vdrequest.KasbonGrid',
        'vdrequest.FormDataCopyVoucher',
        'vdrequest.FormDataUploadAttachment',
        'vdrequest.FormDataCheckingVoucher',
        'vdrequest.FormDataPreviewAttachment',
        'vdrequest.FormDataApprovalDetail',
        'vdrequest.FormTracking',
        'vdrequest.Griddetaillog',
        'vdrequest.RewardGrid',
        'vdrequest.FormDataUpload',
    ],
    stores: [
        'VDRequest',
        'VDRequestdetail',
        'VDRequestdesc',
        'VDRequestsubdetail',
        'Ptbyuser',
        'Deptprefixcombo',
        'Coadeptcombo',
        'Coadeptcomboall',
        'Tipepajakcombo',
        'Tipepajakcombopph',
        'Tipepajakcomboppnpersentase',
        'Tipepajakcombopphpersentase',
        'Department',
        'Employee',
        'Vendorcombo',
        'Customercombo',
        'Vendornoteb',
        'Subgl',
        'Statusvoucher',
        'Jenisusahacombo',
        'Inout',
        'Kasbondeptcomboapply',
        'Kasbondeptcomboapplylocal',
        'Tipevendorvoucher',
        'Currency',
        'Cashflow',
        'Purchaseletter',
        'VDRequestkasbondetail',
        'VDRequestattachmentdetail',
        'VDRequestapprovaldetail',
        'VDRequestlistapproval',
        'Project',
        'Ptbyuser',
        'Pt',
        'Vendorbank2',
        'Paymentmethod',
        'Vouchermaker',
        'VDRequestdetaillog',
        'Projectpt'
    ],
    models: [
        'VDRequest',
        'VDRequestdetail',
        'VDRequestdesc',
        'VDRequestsubdetail',
        'Currency',
        'Vendornoteb',
        'VDRequestkasbondetail',
        'VDRequestattachmentdetail',
        'VDRequestapprovaldetail',
        'VDRequestlistapproval',
        'Project',
        'Pt',
        'Vendorbank',
        'Paymentmethod',
        'Vouchermaker',
        'VDRequestdetaillog',
        'Projectpt'
    ],
    refs: [
        { ref: 'grid', selector: 'vdrequestgrid' },
        { ref: 'panel', selector: 'vdrequestpanel' },
        { ref: 'griddetail', selector: 'vdrequestgriddetail' },
        { ref: 'gridkasbondetail', selector: 'vdrequestgridkasbondetail' },
        { ref: 'gridattachmentdetail', selector: 'vdrequestgridattachmentdetail' },
        { ref: 'gridapprovaldetail', selector: 'vdrequestgridapprovaldetail' },
        { ref: 'griddesc', selector: 'vdrequestgriddesc' },
        { ref: 'gridsubdetail', selector: 'vdrequestgridsubdetail' },
        { ref: 'formsearch', selector: 'vdrequestformsearch' },
        { ref: 'formdata', selector: 'vdrequestformdata' },
        { ref: 'formdatavendor', selector: 'vendorformdata' },
        { ref: 'formcontentdesc', selector: 'vdrequestdescformcontent' },
        { ref: 'formdatadesc', selector: 'vdrequestdescformdata' },
        { ref: 'formdatadetail', selector: 'vdrequestdetailformdata' },
        { ref: 'formdatasubdetail', selector: 'vdrequestsubdetailformdata' },
        { ref: 'formdataapprovaldetail', selector: 'vdrequestformdataapprovaldetail' },
        { ref: 'komisigrid', selector: 'vdrequestkomisigrid' },
        { ref: 'kasbongrid', selector: 'vdrequestkasbongrid' },
        { ref: 'formdatauploadattachment', selector: 'formdatauploadattachment' },
        { ref: 'formdatacopyvoucher', selector: 'formdatacopyvoucher' },
        { ref: 'formdatacheckingvoucher', selector: 'formdatacheckingvoucher' },
        { ref: 'formdatabank', selector: 'vdrequestformdatabank' },
        { ref: 'formdatapreviewattachment', selector: 'formdatapreviewattachment' },
        { ref: 'formtracking', selector: 'vdrequestformtracking' },
        { ref: 'griddetaillog', selector: 'vdrequestgriddetaillog' },
        { ref: 'rewardgrid', selector: 'vdrequestrewardgrid' },
        { ref: 'formdataupload', selector: 'vdrequestformdataupload' },
    ],
    controllerName            : 'vdrequest',
    formWidth                 : 840,
    state                     : null,
    statereal                 : null,
    fieldName                 : 'voucher_no',
    fieldconfirmdetail        : 'coaname',
    fieldconfirmdesc          : 'description',
    fieldconfirmsubdetail     : 'subcode',
    bindPrefixName            : 'VDRequest',
    urldata                   : 'cashier/vdrequest/',
    urldataapprove            : 'cashier/vdapprove/',
    urldesc                   : 'cashier/vdrequest/desc',
    urldetail                 : 'cashier/vdrequest/detail',
    urlsubdetail              : 'cashier/vdrequest/subdetail',
    urlcommon                 : 'cashier/common/create',
    urlcommonread             : 'cashier/common/read',
    nomorindex                : 0,
    nomorindexsub             : 0,
    urlrequest                : null,
    senddata                  : null,
    info                      : null,
    messagedata               : null,
    dateNow                   : new Date(),
    flaggeneratevoucherno     : 0,
    valueform                 : null,
    idheaderfield             : 'voucher_id',
    iddetailfield             : 'voucherdetail_id',
    idheadervalue             : 0,
    iddetailvalue             : 0,
    idheaderfield2            : 'kasbondept_id',
    iddetailfield2            : 'kasbondeptdetail_id',
    idheadervalue2            : 0,
    iddetailvalue2            : 0,
    iddetailfield_v           : 'indexdataheader',
    iddetailvalue_v           : 0,
    up                        : null,
    manager_id                : 0,
    usertax_id                : 0,
    employee_id               : 0,
    user_id                   : 0,
    pt_id                     : apps.pt,
    department_id             : 0,
    department_name           : '',
    department_code           : '',
    prefixdept                : null,
    subgl                     : null,
    in_out                    : 'O',
    kelsub_id                 : 0,
    balancecoa                : 0,
    validdetail               : 0,
    report                    : null,
    win                       : null,
    winId                     : null,
    loadingrequest            : new Ext.LoadMask(Ext.getBody(), { msg: "Please wait..." }),
    project_id                : apps.project,
    initamount                : 0,
    remainingkasbon           : 0,
    remainingkasboninit       : 0,
    valuekasbon               : 0,
    loadingapprove            : new Ext.LoadMask(Ext.getBody(), { msg: "Please wait..." }),
    vendor_id                 : 0,
    vendorname                : '',
    type_pph                  : 0,
    tipenotevoucher           : 1,
    last_project_id           : apps.project,
    subholding_id             : 0,
    checkusecopyvd            : false,
    type_vendor               : 'all',
    lastindexdata             : 1,
    idxloading                : 0,
    idxendloading             : 0,
    is_multi_kasbon           : 0,
    endloading                : false,
    approveby_id              : 0,
    coa_id_int                : 0,
    rolepajak                 : ["1099", "3250"],
    kasbondept_id             : 0,
    cashbon_no                : "",
    acts                      : acts,
    is_userpajak              : false,
    deletedsub_ids            : [],
    status_approve            : [2, 3, 4],
    dataflow                  : 'O',
    localStore                : {
        subdetailcoa: [],
        substore    : []
    },
    allowed_dept         : [],
    is_cgg           : false,
    messagetkb       : null,
    flaggeneratepajak: 0,
    duedate_days     : 14,
    is_deletedetail  : 1,
    is_over_target   : 0,
    global_param     : {
        'DUEDATE_DAYS': {
            'default': 14,
            'name'   : 'DUEDATE_DAYS',
            'value'  : '0'
        },
        'approval_rules': {
            'default': 'self_approve',
            'name'   : 'approval_rules',
            'value'  : ''
        },
        'vendor_create': {
            'default': '1',
            'name'   : 'vendor_create',
            'value'  : ''
        },
        'vendor_autofill': {
            'default': '1',
            'name'   : 'vendor_autofill',
            'value'  : ''
        },
        'MAX_ROW_VOUCHER': {
            'default': 1000,
            'name'   : 'MAX_ROW_VOUCHER',
            'value'  : '0'
        },
        'coa_pajak': {
            'default': '',
            'name'   : 'coa_pajak',
            'value'  : ''
        },
        'hod_approve_dept_exclusion': {
            'default': [],
            'name'   : 'hod_approve_dept_exclusion',
            'value'  : []
        },
        'is_vd_send_to_finance': {
            'default': 0,
            'name'   : 'vd_send_to_finance',
            'value'  : ''
        },
        'TRACKING_VOUCHER_TAX': {
            'default': [],
            'name'   : 'TRACKING_VOUCHER_TAX',
            'value'  : []
        },
        'TRACKING_VOUCHER_TREASURY': {
            'default': [],
            'name'   : 'TRACKING_VOUCHER_TREASURY',
            'value'  : []
        },
        'TRACKING_VOUCHER_HEADFINANCE': {
            'default': [],
            'name'   : 'TRACKING_VOUCHER_HEADFINANCE',
            'value'  : []
        },
        'TRACKING_VOUCHER_COLLECTION': {
            'default': [],
            'name'   : 'TRACKING_VOUCHER_COLLECTION',
            'value'  : []
        },
        'TRACKING_VOUCHER_FC': {
            'default': [],
            'name'   : 'TRACKING_VOUCHER_FC',
            'value'  : []
        },
        'getnofaktur': {
            'default': 0,
            'name'   : 'no_faktur',
            'value'  : ''
        }
    },
    constructor: function (configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Cashier.library.box.Config({
            _controllerName: me.controllerName
        });

    },
    getMe: function () {
        var me = this;
        return _Apps.getController(me.bindPrefixName);
    },
    initPT: function (callback = null) {
        //INIT PT jika kosong, default ke session
        var me = this.getMe();
        if (me.pt_id == 0 || me.pt_id == '') {
            me.pt_id = parseInt(apps.pt);
        }
        if (me.project_id == 0 || me.project_id == '') {
            me.project_id = parseInt(apps.project);
        }
        if (parseInt(me.project_id) !== parseInt(apps.project)) {
            me.pt_id = parseInt(apps.pt);
            me.project_id = parseInt(apps.project);
        }
        me.last_project_id = parseInt(me.project_id);
        if (typeof callback == 'function') {
            callback();
        }
    },
    init: function (application) {
        var me = this.getMe();
        var events = new Cashier.library.box.tools.EventSelector();

        me.tools = new Cashier.library.box.tools.Tools({ config: me.myConfig });

        //init PT from Start menu
        me.initPT();

        //rolepajak
        if (me.rolepajak.includes(apps.gid)) {
            me.is_userpajak = true;
        } else {
            me.is_userpajak = false;
        }

        this.control({
            'vdrequestpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender : function (panel) {
                    this.panelAfterRender();
                    panel.up('window').maximize();
                    panel.up('window').setTitle("Voucher Department Request");
                },
            },
            'vdrequestgrid': {
                afterrender : this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                selectionchange: this.gridSelectionChange,
                select         : this.gridSelected,
                boxready       : function (panel) {
                    this.assignShortcut("alt+a", "btnAddNewVdrequest");
                },
                'itemcontextmenu' : function (that, record, item, index, e, eOpts) {
                    e.stopEvent();
                }
            },
            'vdrequestgrid toolbar button[action=create]': {
                click: function () {
                    me.state     = 'create';
                    me.statereal = 'create';
                    this.formDataShow('create');
                }
            },
            'vdrequestgrid toolbar button[action=update]': {
                click: function () {
                    var me = this.getMe();
                    if (!me.checkAuthority(me.bindPrefixName + 'Update', me)) {
                        return 0;
                    }

                    me.state     = 'create';
                    me.statereal = 'update';
                    this.formDataShow('update');
                }
            },
            'vdrequestgrid toolbar button[action=destroy]': {
                click: function () {
                    var me = this.getMe();
                    if (!me.checkAuthority(me.bindPrefixName + 'Delete', me)) {
                        return 0;
                    }
                    this.dataDestroy;
                }
            },
            'vdrequestgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'vdrequestgrid toolbar button[action=copyvoucher]': {
                click: function () {
                    var me = this.getMe();
                    if (!me.checkAuthority(me.bindPrefixName + 'Update', me)) {
                        return 0;
                    }
                    this.copyVoucher(0);
                }
            },
            'vdrequestgrid toolbar button[action=pindahptvoucher]': {
                click: function () {
                    var me = this.getMe();
                    if (!me.checkAuthority(me.bindPrefixName + 'Update', me)) {
                        return 0;
                    }
                    this.copyVoucher(1);
                }
            },
            'vdrequestgrid toolbar button[action=needrevise]': {
                click: this.needRevise
            },
            'vdrequestgrid toolbar button[action=unsent]': {
                click: this.unsentFinance
            },
            'vdrequestgrid toolbar button[action=unreceive]': {
                click: this.unreceivefinance
            },
            'vdrequestgrid toolbar button[action=unapprove]': {
                click: this.uncheckapprove
            },
            'vdrequestgrid toolbar button[action=upload]': {
                click: function () {
                    this.FormUploadVdrequestShow('upload');
                }
            },
            'vdrequestgriddetail toolbar button[action=generatepajak]': {
                click: function () {
                    this.getPajakCoa();
                }
            },
            'vdrequestgriddetail toolbar button[action=generatekasbon]': {
                click: function () {
                    var me = this.getMe();

                    Ext.Msg.confirm('Confirm', "Apakah akan input detail realisasi sesuai dari kasbon ?<br/> jika ya, tolong di cek terlebih dahulu nilainya sebelum di simpan.", function (btn) {
                        if (btn == 'yes') {
                            var store            = me.getStore('VDRequestkasbondetail');
                                me.idxloading    = 0;
                                me.idxendloading = 0;
                            store.each(function (record, index) {
                                me.generateDetailfromkasbon(record.data, 1);
                                me.idxloading = me.idxloading + 1;
                            });
                        }
                    });

                }
            },
            /*'vdrequestgrid toolbar button[action=check]': {
                click: function () {
                    var me = this;
                    var grid = me.getGrid();
                    var rows = grid.getSelectionModel().getSelection();
                    console.log(rows);

                    if (rows.length == 0) {
                        me.buildWarningAlert("No data selected.");
                        return 0;
                    }

                    if (rows.length == 1 && rows[0].data.status != 2) {
                        me.buildWarningAlert("Status data must be \"APPROVAL\".");
                        return 0;
                    } 

                    if (rows.length > 1) {
                        me.buildWarningAlert("Please select 1 data only.");
                        return 0;
                    }

                    me.instantWindow('FormDataCheckingVoucher', 500, 'Checking Voucher', 'create', '');
                }
            },*/
            'vdrequestgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'vdrequestformsearch': {
                boxready: function (panel) {
                    var me = this.getMe();
                    $("#vdrequestformsearchID input[name='voucher_no']").focus();
                    $("#vdrequestformsearchID").keyup(function (e) {
                        if (e.which == 13) {
                            e.preventDefault();
                            me.dataSearch();
                            return false;
                        }
                    });
                },
                afterrender: function () {
                    me.setStoreFormsearch(function () {
                        var fs = me.getFormsearch(),
                            storevendor = me.getStore('Vendorcombo');

                        setTimeout(function () {
                            fs.down("[name=pt_id]").setValue(parseInt(me.pt_id));

                            fs.down("[name=vendor_id]").on('keyup', function (e, t, eOpts) {
                                var pt_id = (me.getVal(fs, 'pt_id', 'value') != '' ? me.getVal(fs, 'pt_id', 'value') : me.pt_id);
                                storevendor.proxy.extraParams = {
                                    "hideparam"  : 'getvendor',
                                    "project_id" : me.project_id,
                                    "pt_id"      : pt_id,
                                    "type_vendor": ""
                                }
                            });
                        }, 3000);
                    });
                },
            },
            'vdrequestformsearch [name=pt_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me            = this.getMe();
                    rowdata       = record[0]['data'];
                    me.pt_id      = rowdata.pt_id;
                    me.project_id = rowdata.project_id;
                    me.setStoreDeptFormsearch();
                    //get subholding too
                    me.getApprovalRules();
                    me.setStoreVoucherMakerFormsearch();
                },
                'change': function (that, newValue, oldValue, eOpts) {
                    var me, rowdata, form;
                    me = this.getMe();
                    form = me.getFormsearch();

                    if (typeof form.down('[name=pt_id]').valueModels[0] !== "undefined") {
                        rowdata       = form.down('[name=pt_id]').valueModels[0]['raw'];
                        me.project_id = rowdata.project_id;
                        me.pt_id      = rowdata.pt_id;
                    }

                }
            },
            'vdrequestformsearch [name=owner]': {
                'select': function (g, record) {
                    var me, fs, val;
                    me = this.getMe();
                    fs = me.getFormsearch();
                    val = record[0].data.field1;
                    if (val == "Others") {
                        fs.down("[name=addby]").setVisible(true);
                    } else {
                        fs.down("[name=addby]").setValue("");
                        fs.down("[name=addby]").setVisible(false);
                    }
                }
            },
            'vdrequestformsearch button[action=search]': {
                click: this.dataSearch
            },
            'vdrequestformsearch button[action=reset]': {
                click: this.dataReset
            },
            'vdrequestformdata': {
                afterrender: this.formDataAfterRender,
                beforedestroy: this.formDataBeforeDestroy,
                boxready: function () {
                    me.setFormdataready();
                }
            },
            'vdrequestformdata [name=pt_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this.getMe();
                    form = me.getFormdata();
                    rowdata = record[0]['data'];
                    me.project_id = rowdata.project_id;
                    me.pt_id = rowdata.pt_id;
                    if (form) {
                        form.down('[name=projectname]').setValue(rowdata.projectname);
                        form.down('[name=ptname]').setValue(rowdata.ptname);
                        form.down('[name=project_id]').setValue(rowdata.project_id);
                        state = form.up('window').state.toLowerCase();
                        if (state == 'create') {
                            form.down('[name=approveby_id]').setValue(0);
                            form.down('[name=department_id]').setValue(0);
                        }
                        localStorage.setItem("current_pt_id", rowdata.pt_id);
                    }
                    var state = form.up('window').state.toLowerCase();
                    var department_id = form.down("[name=department_id]").getValue();
                    if (department_id > 0) {
                        // BUAT OTOMATIS NGISI TAB APPROVAL
                        if (me.global_param['approval_rules']['value'] == 'hod_approve') {
                            if (state == 'create') {
                                me.getListApproval(function () {
                                    console.log('callback');
                                });
                            }
                        }
                    }
                },
                'change': function (that, newValue, oldValue, eOpts) {
                    var me, form, rowdata;
                    me = this.getMe();
                    form = me.getFormdata();
                    rowdata = form.down('[name=pt_id]').valueModels[0]['raw'];
                    me.project_id = rowdata.project_id;
                    me.pt_id = rowdata.pt_id;
                    if (form) {
                        form.down('[name=projectname]').setValue(rowdata.projectname);
                        form.down('[name=ptname]').setValue(rowdata.ptname);
                        form.down('[name=project_id]').setValue(rowdata.project_id);
                        state = form.up('window').state.toLowerCase();
                        if (state == 'create') {
                            form.down('[name=approveby_id]').setValue(0);
                            form.down('[name=department_id]').setValue(0);
                        }
                    }

                    form.down('[name=department_id]').setDisabled(true);
                    me.getApprovalRules();
                    me.getAllowDepartmentAccess();
                    me.setStoreDeptuserPt();
                    me.getDefaultEmployee(function () {
                        form.down('[name=approveby_id]').setValue(me.approveby_id);
                    });
                    me.getVendorCreate();
                    me.getVendorAutofill();
                    me.getMaxRowVoucher();
                    me.getCoaPajak();

                    if (that.value) {
                        // me.getForproject(function () {
                        // var pt = form.down('[name=pt_id]').getValue();
                        // form.down('[name=cashbon_pt_id]').setValue(pt);
                        if (state === 'create') {
                            var projectpt_id = form.down('[name=pt_id]').valueModels[0].data.projectpt_id;
                            form.down('[name=cashbon_pt_id]').setValue(parseInt(projectpt_id));
                        }
                        if (state !== 'create') {
                            me.setStoreKashbondepthasapply();
                        }

                        me.setStoreVendorPt();
                        // });
                    }
                    me.getPTCGG();
                }

            },
            'vdrequestformdata [name=department_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this.getMe();
                    rowdata = record[0]['data'];
                    me.prefixdept = rowdata.code;
                    form = me.getFormdata();
                    form.down("[name=kasbondept_id]").setDisabled(false);
                    me.department_id = rowdata.department_id;
                    rowdata = record[0]['data'];
                    me.prefixdept = rowdata.code;
                    me.department_id = rowdata.department_id;

                    //me.setStoreKashbondepthasapply();
                    //me.setValue(me, 'approveby_id', 99);
                    //sekalian enable add ya
                    var griddetail = me.getGriddetail();
                    var department_id = form.down("[name=department_id]").getValue();
                    if (department_id !== '') {
                        griddetail.down('#btnAdd').setDisabled(false);
                    }
                    // SEFTIAN ALFREDO 24/11/2021
                    var state = form.up('window').state.toLowerCase();
                    var department_id = form.down("[name=department_id]").getValue();
                    if (department_id > 0) {
                        griddetail.down('#btnAdd').setDisabled(false);
                        // BUAT OTOMATIS NGISI TAB APPROVAL
                        if (me.global_param['approval_rules']['value'] == 'hod_approve') {
                            if (state == 'create') {
                                me.getListApproval(function () {
                                    console.log('callback');
                                });
                            }
                        }
                    }
                },
                'change': function (that, newValue, oldValue, eOpts) {
                    console.log('change');
                    var me, form, rowdata;
                    me = this.getMe();
                    form = me.getFormdata();
                    if (form.down('[name=department_id]').valueModels[0] !== undefined) {
                        rowdata = form.down('[name=department_id]').valueModels[0]['raw'];
                        me.prefixdept = rowdata.code;
                    }

                    me.setStoreApproveby();

                    form.down("[name=kasbondept_id]").setDisabled(false);
                    me.generateVoucherno();
                    me.setStoreKashbondepthasapply();
                    //sekalian enable add ya
                    var griddetail = me.getGriddetail();
                    var department_id = form.down("[name=department_id]").getValue();
                    var state = form.up('window').state.toLowerCase();
                    if (department_id !== '') {
                        griddetail.down('#btnAdd').setDisabled(false);
                        // BUAT OTOMATIS NGISI TAB APPROVAL
                        /*if ( me.global_param['approval_rules']['value'] == 'hod_approve' ) {
                            if ( state == 'create' ) {
                                me.getListApproval(function () {
                                    console.log('callback');
                                });
                            }
                        }*/
                    }
                },
            },
            'vdrequestformdata [name=dataflow]': {
                change: function (el) {
                    var me = this;
                    var fd = me.getFormdata();
                    var tipevendor = me.getStore('Tipevendorvoucher');

                    if (el.checked == true) {
                        me.dataflow = el.inputValue;
                        if (el.inputValue == "O") {
                            fd.down("[name=vendor_bankacc_id_container1]").setVisible(true);
                            fd.down("[name=vendor_bankacc_id_container2]").setVisible(true);
                            tipevendor.clearFilter();
                            tipevendor.filterBy(function (rec) {
                                if (rec['data'].type_vendor == 'customer') {
                                    return false;
                                }else{
                                    return true;
                                }
                            });
                        } else {
                            fd.down("[name=vendor_bankacc_id_container1]").setVisible(false);
                            fd.down("[name=vendor_bankacc_id_container2]").setVisible(false);
                            tipevendor.clearFilter();
                            tipevendor.load();
                        }
                    }
                }
            },
            'vdrequestformdata [name=approveby_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this.getMe();
                    form = me.getFormdata();
                    rowdata = record[0]['data'];
                    me.approveby_id = rowdata.employee_id;
                    me.setVal(form, 'approvename', rowdata.employee_name);
                },
                'change': function (that, newValue, oldValue, eOpts) {
                    if (that.value) {
                        var me, form, rowdata;
                        me = this.getMe();
                        form = me.getFormdata();
                        if (form.down('[name=approveby_id]').valueModels[0] !== undefined) {
                            rowdata = form.down('[name=approveby_id]').valueModels[0]['raw'];
                            me.approveby_id = rowdata.employee_id;
                            me.setVal(form, 'approvename', rowdata.employee_name);
                        }

                    }

                },
            },
            'vdrequestformdata [name=paymentmethod_id]': {
                change: function (el, oldValue, newValue) {
                    var me = this;
                    var form = me.getFormdata();
                    var value = me.getFormdata().down("[name=paymentmethod_id]").getValue();

                    if (value == 1) {
                        form.down("[name=vendor_bankacc_id_container1]").setVisible(false);
                        form.down("[name=vendor_bankacc_id_container2]").setVisible(false);
                        form.down('[name=vendor_bankacc_id]').setValue('');
                        form.down('[name=vendor_bank_name]').setValue('');
                        form.down('[name=vendor_bank_account_name]').setValue('');
                        form.down('[name=vendor_bank_currency]').setValue('');
                    } else {
                        form.down("[name=vendor_bankacc_id_container1]").setVisible(true);
                        form.down("[name=vendor_bankacc_id_container2]").setVisible(true);
                        form.down('[name=vendor_bankacc_id]').setValue('');
                        form.down('[name=vendor_bank_name]').setValue('');
                        form.down('[name=vendor_bank_account_name]').setValue('');
                        form.down('[name=vendor_bank_currency]').setValue('');
                    }
                }
            },
            'vdrequestformdata [name=type_vendor] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this.getMe();
                    form = me.getFormdata();
                    form.down('[name=vendor_id]').setValue(0);
                    me.setStoreVendorbytypedata(form);
                },
                'change': function (that, newValue, oldValue, eOpts) {
                    var me, form;
                    me = this.getMe();
                    form = me.getFormdata();
                    me.setStoreVendorbytypedata(form);
                },
            },
            'vdrequestformdata [name=vendor_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this.getMe();
                    form = me.getFormdata();
                    form.down('[name=input_noteofvendor]').setValue('');
                    form.down('[name=vendor_bankacc_id]').setValue('');
                    form.down('[name=vendor_bank_name]').setValue('');
                    form.down('[name=vendor_bank_account_name]').setValue('');
                    form.down('[name=vendor_bank_currency]').setValue('');
                    form.down('[name=vendor_bankacc_id]').getStore().removeAll();
                    // SET NOTE OF VENDOR
                    me.setStoreVendornote(form);
                    // SET BANK OF VENDOR
                    me.getDatavendorbankacc();
                },
                /* 'change': function (that, newValue, oldValue, eOpts) {
                    var me, form;
                    me = this.getMe();
                    form = me.getFormdata();
                    form.down('[name=input_noteofvendor]').setValue('');
                    form.down('[name=vendor_bankacc_id]').setValue('');
                    form.down('[name=vendor_bank_name]').setValue('');
                    form.down('[name=vendor_bank_account_name]').setValue('');
                    form.down('[name=vendor_bank_currency]').setValue('');
                    form.down('[name=vendor_bankacc_id]').getStore().removeAll();
                    if(isNaN(oldValue)){
                        //me.setStoreVendorPtLiveSearch(oldValue);
                    }else{
                        me.setStoreVendornote(form);
                        me.getDatavendorbankacc();
                    }

                }, */
            },
            'vdrequestformdata [name=vendor_note] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this.getMe();
                    form = me.getFormdata();
                    rowdata = record[0]['data'];
                    me.setVal(form, 'vendor_note', rowdata.note);
                    me.setVal(form, 'input_noteofvendor', rowdata.note);
                    me.setVal(form, 'vendornote_id', rowdata.vendornote_id);
                },
            },
            'vdrequestformdata [name=vendor_bankacc_id]': {
                change: function (el) {
                    var me = this;
                    var fd = me.getFormdata();

                    if (typeof fd.down("[name=vendor_bankacc_id]").valueModels[0] !== "undefined") {
                        var bank_name = fd.down("[name=vendor_bankacc_id]").valueModels[0].data.bank_name;
                        var bank_account_name = fd.down("[name=vendor_bankacc_id]").valueModels[0].data.bank_account_name;
                        var bank_currency = fd.down("[name=vendor_bankacc_id]").valueModels[0].data.currency_name;
                        var remarks = fd.down("[name=vendor_bankacc_id]").valueModels[0].data.remarks;

                        fd.down("[name=vendor_bank_name]").setValue(bank_name);
                        fd.down("[name=vendor_bank_account_name]").setValue(bank_account_name);
                        fd.down("[name=vendor_bank_currency]").setValue(bank_currency);
                        fd.down("[name=remarks]").setValue(remarks);
                    } else {
                        fd.down("[name=vendor_bank_name]").setValue('');
                        fd.down("[name=vendor_bank_account_name]").setValue('');
                        fd.down("[name=vendor_bank_currency]").setValue('');
                        fd.down("[name=remarks]").setValue('');
                    }
                }
            },
            'vdrequestformdata [name=is_pajak]': {
                change: function (el) {
                    var me = this.getMe();
                    var form = me.getFormdata();
                    var department_id = form.down("[name=department_id]").getValue();
                    var is_pajak = form.down("[name=is_pajak]").getValue();

                    var state = form.up('window').state.toLowerCase();
                    if (me.global_param['approval_rules']['value'] == 'hod_approve') {
                        if (state == 'create') {
                            if (department_id == "" || department_id == null) {
                                me.buildWarningAlert("Please select department first.");
                                form.down("[name=is_pajak]").setValue(0);
                                return false;
                            }
                            /*me.getListApproval(function () {
                                console.log('callback');
                            });*/
                            if (is_pajak) {
                                me.addTaxApprove();
                            } else {
                                me.removeTaxApprove();
                            }
                        } else {
                            if (is_pajak) {
                                me.addTaxApprove();
                            } else {
                                me.removeTaxApprove();
                            }
                        }
                    }
                }
            },
            'vdrequestformdata [action=create_bankacc]': {
                click: function () {
                    var me = this;
                    var fd = me.getFormdata();
                    var vendor_id = fd.down("[name=vendor_id]").getValue();

                    if (vendor_id == "" || vendor_id == null) {
                        me.buildWarningAlert("Please select vendor first.");
                        return false;
                    }
                    me.instantWindow('FormDataBank', '600', 'Add New Bank Account', 'create', '');
                }
            },
            'vdrequestformdata [action=clear_bankacc]': {
                click: function () {
                    var me = this,
                        fd = me.getFormdata();

                    fd.down("[name=vendor_bankacc_id]").setValue(0);
                    fd.down("[name=vendor_bank_name]").setValue('');
                    fd.down("[name=vendor_bank_account_name]").setValue('');
                    fd.down("[name=vendor_bank_currency]").setValue('');
                    fd.down("[name=remarks]").setValue('');
                }
            },
            'vdrequestformdata [name=voucher_date] ': {
                'change': function (that, newValue, oldValue, eOpts) {
                    var me;
                    me = this.getMe();
                    me.generateVoucherno();
                    me.getBatasduedate();
                },
            },
            'vdrequestformdata #radio1_b123 ': {
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
            'vdrequestformdata #radio2_b123 ': {
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
            'vdrequestformdata [name=voucherrequesttab] ': {
                'tabchange': function (p, eOpts) {
                    var me, pd, form, tabPanel, name, rowdetail;
                    me = this.getMe();
                    me.checkTabsubcoa();
                },
            },
            //            'vdrequestformdata [name=cashbon_pt_id] ': {
            //                change: function (val) {
            //                    var me = this.getMe();
            //                    if (val.value) {
            //                        me.getForproject();
            //                    }
            //                }
            //            },
            'vdrequestformdata [name=kasbondept_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this.getMe();
                    form = me.getFormdata();
                    rowdata = record[0]['data'];

                    form.down("[name=remainingkasbon]").setVisible(true);
                    form.down("[name=valuekasbon]").setVisible(true);
                    form.down('[name=komisiklaim_ids]').setValue('');

                    me.remainingkasbon = rowdata.remainingkasbon;
                    if (rowdata.remainingkasbon > 0) {
                        me.initamount = rowdata.remainingkasbon;
                    } else {
                        me.initamount = rowdata.amount;
                    }

                    Ext.Msg.confirm('Confirm', "Apakah akan input detail realisasi sesuai dari kasbon ?<br/> jika ya, tolong di cek terlebih dahulu nilainya sebelum di simpan.", function (btn) {
                        if (btn == 'yes') {
                            me.generateDetailfromkasbon(rowdata, 0);
                        } else {
                            me.cashbonSelectDropdown(rowdata, false);
                        }
                    });


                }
            },
            'vdrequestformdata button[action=detaildesc]': {
                click: function () {
                    var me, form, state;
                    me = this.getMe();
                    form = me.getFormdata();
                    state = form.up('window').state.toLowerCase();
                    me.paramcontentdesc.stateform = state;
                    me.GenerateFormdata(me.paramcontentdesc);
                },
            },
            'vdrequestformdata button[action=openupload]': {
                click: function () {
                    var me, form, state;
                    me = this.getMe();
                    form = me.getFormdata();
                    form.down("[name=amount]").setValue(0);

                    var kasbondept_id = parseInt(form.down("[name=kasbondept_id]").getValue());

                    if (kasbondept_id == 0 || kasbondept_id == null || isNaN(kasbondept_id) == true) {
                        form.down("[name=remainingkasbon]").setValue(0);
                        form.down("[name=valuekasbon]").setValue(0);
                        form.down("[name=totaldetail]").setValue(0);
                        form.down("[name=initamount]").setValue(0);
                    }

                    form.down("[name=is_upload]").setValue(1);
                    form.down("[name=voucherrequesttab]").setVisible(false);
                    form.down("[name=uploadcontainer]").setVisible(true);
                    form.down("button[action=save]").setVisible(false);
                    form.down("button[action=upload]").setVisible(true);
                    form.down("button[action=openupload]").setDisabled(true);
                    form.down("button[action=create_komisi]").setDisabled(true);

                    var storedetail = Ext.data.StoreManager.lookup('VDRequestdetail');
                    storedetail.removeAll();

                },
            },
            'vdrequestformdata button[action=openupload2]': {
                click: function () {
                    var me, form, state;
                    me = this.getMe();
                    me.instantWindow('FormDataUpload', 500, 'Upload CSV', 'create', '', me.controllerName, '200');
                }
            },
            'vdrequestformdata button[action=upload]': {
                click: this.dataSavecustome
            },
            'vdrequestformdata button[action=save]': {
                click: this.dataSavecustome
                // click: this.mainDataSaveCustome
            },
            //            'vdrequestformdata button[action=test]': {
            //                click: this.BtnTest
            //            },
            'vdrequestformdata button[action=cancel]': {
                click: function () {
                    var me = this.getMe();
                    this.formDataClose();
                }
            },
            'vdrequestformdata button[action=test]': {
                click: function () {
                    var substores = Ext.data.StoreManager.lookup('VDRequestsubdetail');
                }
            },
            'vdrequestdetailformdata toolbar button[action=cancel]': {
                click: function () {
                    var me = this.getMe();
                    this.formDataClose2();
                }
            },
            'formdatacheckingvoucher': {
                afterrender: function () {
                    var me = this.getMe();
                    me.formDataCheckingAfterRender();
                }
            },
            'formdatacheckingvoucher button[action=ok]': {
                click: function () {
                    var getform = me.getFormdatacheckingvoucher();
                    var form = getform.getForm();

                    //console.log(form.getValues());
                    var addingRecord = false;
                    if (!me.finalValidation()) {
                        return false;
                    }

                    var vp = me.validationProcess();
                    var vps = false; // validation prosess status
                    if (typeof vp === 'object') {
                        vps = vp.status;
                        if (!vps) {

                            Ext.MessageBox.alert('Alert', vp.msg, function () {
                                var x = me.getFormdatacheckingvoucher().down('[name=' + vp.field + ']');
                                if (x !== null) {
                                    x.markInvalid(vp.msg);
                                    x.focus();
                                }

                            });
                        }
                    } else if (typeof vp === 'boolean') {
                        vps = vp;
                    }


                    if (form.isValid() && vps) {

                        var fida = me.getFinalData(form.getValues());
                        var temp_id = fida.voucher_id.split(',');
                        var message = 'Report : <br />';
                        getform.setLoading("Please wait...");
                        for (var i = 0; i < temp_id.length; i++) {

                            fida['hideparam'] = 'inputcheckingdata';
                            fida['voucher_id'] = temp_id[i];


                            Ext.Ajax.request({
                                url: 'cashier/vdrequest/create',
                                params: {
                                    data: Ext.encode(fida)
                                },
                                success: function (response) {
                                    try {
                                        var data = Ext.JSON.decode(response.responseText);
                                        message += data.msg + '<br />';
                                        Ext.Msg.show({
                                            title: 'INFO',
                                            msg: message,
                                            buttons: Ext.Msg.OK,
                                            icon: Ext.Msg.INFO
                                        });
                                        /*if (data.msg == 'failed, approval data already exist') {
                                            me.buildFailedAlert(data.msg);
                                        } else {
                                        }*/
                                        getform.setLoading(false);
                                        getform.up('panel').close();
                                    } catch (err) {
                                        console.log(err);
                                    }
                                }
                            })

                        }
                        /*fida['hideparam'] = 'inputcheckingdata';

                        getform.setLoading("Please wait...");
                        Ext.Ajax.request({
                            url: 'cashier/vdrequest/create',
                            params: {
                                data: Ext.encode(fida)
                            },
                            success: function (response) {
                                var data = Ext.JSON.decode(response.responseText);
                                if (data.msg == 'failed, approval data already exist') {
                                    me.buildFailedAlert(data.msg);
                                } else {
                                    me.buildSuccessAlert(data.msg);
                                }
                                getform.setLoading(false);
                                getform.up('panel').close();
                            }
                        })*/
                    }
                }
            },
            'formdatacheckingvoucher button[action=cancel]': {
                click: function () {
                    var me = this;
                    var f = me.getFormdatacheckingvoucher();

                    f.up('panel').close();
                }
            },
            'vdrequestformdatabank': {
                afterrender: function () {
                    var me = this;
                    var f = me.getFormdatabank();
                    var fd = me.getFormdata();

                    f.down("[name=bank_id]").getStore().load();
                    f.down("[name=currency]").getStore().load();

                    f.down("[name=vendor_id]").setValue(fd.down("[name=vendor_id]").getValue());
                    f.down("[name=vendor_bankacc_id]").setValue('0');
                }
            },
            'vdrequestformdatabank [action=save]': {
                click: function () {

                    var me = this;
                    var fd = me.getFormdata();
                    var f = me.getFormdatabank();

                    f.setLoading("Validating data...");
                    Ext.Ajax.request({
                        url: 'cashier/vdrequest/read',
                        params: {
                            'hideparam': 'checkaccountnumber',
                            'bank_account_no': f.down("[name=bank_account_no]").getValue(),
                            'vendor_id': f.down("[name=vendor_id]").getValue()
                        },
                        success: function (response) {
                            var data = Ext.JSON.decode(response.responseText);
                            f.setLoading(false);
                            if (data.data.account_exists > 0) {
                                me.buildWarningAlert("Account number already exists.");
                                return false;
                            } else {
                                me.dataSaveBankstore();
                            }
                        }
                    })
                }
            },
            //====================================START DETAIL=============================================    

            /* START  GRID AREA */
            'vdrequestgriddetail': {
                selectionchange: this.cellgridDetail,
                //afterrender: this.griddetailAfterRender,
                itemdblclick: this.griddetailitemdoubleclick,
                //select: this.gridDetailSelected,
            },
            'vdrequestgriddetail toolbar button[action=create]': {
                click: function () {
                    var me, form, store, amount, storedetail, storekasbondetail, counterdetail, counterkasbondetail;
                    me                       = this.getMe();
                    me.paramdetail.stateform = 'create';

                    //validate
                        storedetail         = Ext.data.StoreManager.lookup('VDRequestdetail');
                        storekasbondetail   = Ext.data.StoreManager.lookup('VDRequestkasbondetail');
                        counterdetail       = storedetail.getCount();
                        counterkasbondetail = storekasbondetail.getCount();
                    var department_id       = me.getFormdata().down("[name=department_id]").getValue();
                    if (department_id == '' || department_id == 0) {
                        me.buildWarningAlert('Silahkan Pilih Department terlebih dahulu');
                        return 0;
                    }
                    // console.log(counterdetail);
                    // console.log(me.global_param['MAX_ROW_VOUCHER']['value']);
                    if (counterdetail >= me.global_param['MAX_ROW_VOUCHER']['value']/*  && counterkasbondetail == 0 */) {
                        me.buildWarningAlert('Maksimum baris voucher = ' + me.global_param['MAX_ROW_VOUCHER']['value']);
                        return 0;
                    }

                    me.GenerateFormdata(me.paramdetail);
                }
            },
            'vdrequestgriddetail toolbar button[action=update]': {
                click: function () {
                    this.griddetailitemdoubleclick();
                    //me.paramdetail.stateform = 'update';
                    //me.GenerateFormdata(me.paramdetail);
                }
            },
            'vdrequestgriddetail toolbar button[action=destroy]': {
                click: function () {
                    me.fieldName = 'description';
                    this.dataDestroydetailwithflag();
                }
            },
            'vdrequestgriddetail actioncolumn': {
                click: function (view, cell, row, col, e) {
                    me.gridActionColumndetailclick(view, cell, row, col, e);
                }
            },
            /* START  GRID AREA */

            'vdrequestgridkasbondetail toolbar button[action=create]': {
                click: function () {
                    this.browseCashbon();
                    //me.paramdetail.stateform = 'update';
                    //me.GenerateFormdata(me.paramdetail);
                }
            },

            'vdrequestgridkasbondetail toolbar button[action=destroy]': {
                click: function () {
                    me.fieldName = 'description';
                    this.dataDestroykasbondetailwithflag();
                }
            },

            //attachment
            'vdrequestgridattachmentdetail button[action=create]': {
                click: function () {
                    this.FormUploadAttachmentShow();
                }
            },
            'vdrequestgridattachmentdetail button[action=read]': {
                click: function () {
                    this.FormUploadAttachmentRead();
                }
            },
            'vdrequestgridattachmentdetail button[action=destroy]': {
                click: function () {
                    var me = this;
                    var mainGrid = me.getGrid();
                    var state = me.getFormdata().up('window').state;

                    if (state == 'update' || state == 'read') {
                        var selectedRecord = mainGrid.getSelectionModel().getSelection()[0];
                        var status = selectedRecord['data'].status;

                        if (me.status_approve.includes(parseInt(status)) && me.getGridattachmentdetail().approval_rules == "hod_approve") {
                            this.dataDestroyattachmentdetailwithflagDirect();
                        } else {
                            this.dataDestroyattachmentdetailwithflag();
                        }
                    } else {
                        this.dataDestroyattachmentdetailwithflag();
                    }
                }
            },
            'vdrequestgridattachmentdetail button[action=view]': {
                click: function () {
                    this.gridattachmentitemdoubleclick;
                }
            },
            'vdrequestgridattachmentdetail': {
                itemdblclick: this.gridattachmentitemdoubleclick,
                afterrender: this.gridattachmentdetailAfterrender
            },

            'formdatauploadattachment': {
                afterrender: this.formDataAttachmentAfterrender
            },
            'formdatauploadattachment button[action=upload]': {
                click: function () {
                    this.UploadAttachment();
                }
            },
            'formdatauploadattachment button[action=uploadandsave]': {
                click: function () {
                    this.directUploadAttachment();
                }
            },
            // list approval
            'vdrequestgridapprovaldetail': {
                selectionchange: this.cellgridListApproval,
                itemdblclick: this.gridlistapprovalitemdoubleclick
            },
            'vdrequestgridapprovaldetail toolbar button[action=refresh]': {
                click: function () {
                    me.getListApproval(function () {
                        console.log('callback');
                    });
                }
            },
            'vdrequestgridapprovaldetail toolbar button[action=update]': {
                click: function () {
                    this.gridlistapprovalitemdoubleclick();
                }
            },
            'vdrequestgridapprovaldetail toolbar button[action=destroy]': {
                click: function () {
                    this.dataDestroyapprovaldetailwithflag();
                }
            },
            'vdrequestgridapprovaldetail toolbar button[action=trackingapproval]': {
                click: function () {
                    me.instantWindow('FormTracking', '800', 'Log', 'read', '');
                    // this.formTrackingShow('read');
                }
            },
            'vdrequestformdataapprovaldetail': {
                afterrender: this.formDataListApproverAfterRender,
            },
            'vdrequestformdataapprovaldetail [name=approval_by]': {
                'change': function () {
                    var me = this.getMe();
                    me.setUserEmail();
                }
            },
            'vdrequestformdataapprovaldetail button[action=save]': {
                'click': function (me, e, eOpts) {
                    var me;
                    me = this.getMe();
                    me.dataSaveListApprovalstore();
                },
            },

            'vdrequestformtracking': {
                afterrender: function () {
                    var me, form;
                    me = this.getMe();
                    form = me.getFormtracking();
                    me.formTrackingAfterRender();
                },
                boxready: function () {
                    var me, fh, form, state;
                    me = this.getMe();
                    fh = me.getFormdata();
                    form = me.getFormtracking();
                    state = fh.up('window').state;
                    if (state != 'create') {
                        me.setFormtrackingready();
                    }
                },

            },

            /* START FORM AREA */
            'vdrequestdetailformdata': {
                afterrender: this.formDataDetailAfterRender,
                boxready: function (panel) {
                    //add new sc
                    this.assignShortcut("alt+a", "btnAddNewSubDetailVdrequest");
                }
            },
            'vdrequestdetailformdata [name=setupcashflow_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this.getMe();
                    rowdata = record[0]['data'];
                    form = me.getFormdatadetail();
                    form.down('[name=cashflowtype]').setValue(rowdata.cashflowtype);
                },
                'change': function (that, newValue, oldValue, eOpts) {

                    var me, form, rowdata;
                    me = this.getMe();
                    form = me.getFormdatadetail();
                    if (that.value) {
                        if (form.down('[name=setupcashflow_id]').valueModels[0] !== undefined) {
                            rowdata = form.down('[name=setupcashflow_id]').valueModels[0]['raw'];
                            me.setVal(form, 'cashflowtype', rowdata.cashflowtype);
                        } else {
                            me.setVal(form, 'cashflowtype', '');
                        }
                    } else {
                        me.setVal(form, 'cashflowtype', '');
                    }

                },
            },
            'vdrequestdetailformdata [name=checkpph]': {
                change: function (cb, newValue, oldValue, eOpts) {
                    var me, rowdata, pd, form;
                    me = this.getMe();
                    form = me.getFormdatadetail();
                    if (cb.value === true) {
                        form.down("[name=tipepajakdetailpph_id]").setReadOnly(false);
                        form.down("[name=persentasepph]").setReadOnly(false);
                    } else {
                        form.down("[name=tipepajakdetailpph_id]").setReadOnly(true);
                        form.down("[name=persentasepph]").setReadOnly(true);
                        me.setVal(form, 'persentasepph', '');
                        me.setVal(form, 'tipepajakdetailpph_id', 0);
                        form.down("[name=is_pphprogresif]").setValue(0);
                    }
                }
            },
            'vdrequestdetailformdata [name=checkppn]': {
                change: function (cb, newValue, oldValue, eOpts) {
                    var me, rowdata, pd, form;
                    me = this.getMe();
                    form = me.getFormdatadetail();
                    if (cb.value === true) {
                        form.down("[name=tipepajakdetailppn_id]").setReadOnly(false);
                        form.down("[name=persentaseppn]").setReadOnly(false);
                        form.down("[name=no_faktur]").setReadOnly(false);
                        if (me.global_param['getnofaktur']['value'] == 1) {
                            if (me.getFormdata().down('[name=dataflow]').getValue()) {
                                form.down("[name=no_faktur]").allowBlank = true;
                            } else {
                                if (me.is_cgg) {
                                    form.down("[name=no_faktur]").allowBlank = false;
                                } else {
                                    form.down("[name=no_faktur]").allowBlank = true;
                                }
                            }
                        } else {
                            form.down("[name=no_faktur]").allowBlank = true;
                        }
                    } else {
                        form.down("[name=tipepajakdetailppn_id]").setReadOnly(true);
                        form.down("[name=persentaseppn]").setReadOnly(true);
                        form.down("[name=no_faktur]").setReadOnly(true);
                        form.down("[name=no_faktur]").allowBlank = true;
                        me.setVal(form, 'persentaseppn', '');
                        me.setVal(form, 'tipepajakdetailppn_id', 0);
                        form.down("[name=is_ppnprogresif]").setValue(0);
                        form.down("[name=no_faktur]").setValue('');
                    }
                }
            },
            'vdrequestdetailformdata [name=tipepajakdetailppn_id]': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, pd, form;
                    me = this.getMe();
                    form = me.getFormdatadetail();
                    rowdata = record[0]['data'];
                    var n = rowdata.tipepajakdetail.includes("Progresif");
                    if (n) {
                        form.down("[name=is_ppnprogresif]").setValue(1);
                        form.down("[name=persentaseppn]").setValue('10');
                        form.down("[name=persentaseppn]").setVisible(false);
                    } else {
                        form.down("[name=is_ppnprogresif]").setValue(0);
                        form.down("[name=persentaseppn]").setValue('0');
                        form.down("[name=persentaseppn]").setVisible(true);

                        me.setVal(form, 'persentaseppn', '');
                        storeppnpersentase = me.getStore("Tipepajakcomboppnpersentase");
                        storeppnpersentase.filterBy(function (rec, id) {
                            if (rec.get('tipepajakdetail_id') === rowdata.tipepajakdetail_id) {
                                // SET DEFAULT PPN 11% KALAU SUDAH TANGGAL 1 APRIL KEATAS
                                if (me.dateNow > new Date('2022-03-31 23:59:59')) {
                                    if (rec.get('persentase') == '11.00') {
                                        form.down("[name=persentaseppn]").setValue('11.00');
                                    }
                                }
                                return true;
                            }
                            else {
                                return false;
                            }
                        });
                    }
                },
                change: function (cb, newValue, oldValue, eOpts) {
                    var me, rowdata, pd, form;
                    me = this.getMe();
                    form = me.getFormdatadetail();
                    var tipepajakdetailppn = form.down('[name=tipepajakdetailppn_id]').getRawValue();
                    if (tipepajakdetailppn.includes("Progresif")) {
                        form.down("[name=is_ppnprogresif]").setValue(1);
                        form.down('[name=persentaseppn]').setVisible(false);
                    } else {
                        form.down("[name=is_ppnprogresif]").setValue(0);
                        form.down('[name=persentaseppn]').setVisible(true);
                    }
                }
            },
            'vdrequestdetailformdata [name=tipepajakdetailpph_id]': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, pd, form;
                    me = this.getMe();
                    form = me.getFormdatadetail();
                    rowdata = record[0]['data'];

                    var n = rowdata.tipepajakdetail.includes("Progresif");
                    if (n) {
                        form.down("[name=is_pphprogresif]").setValue(1);
                        form.down("[name=persentasepph]").setValue('10');
                        form.down("[name=persentasepph]").setVisible(false);
                    } else {
                        form.down("[name=is_pphprogresif]").setValue(0);
                        form.down("[name=persentasepph]").setValue('0');
                        form.down("[name=persentasepph]").setVisible(true);

                        me.setVal(form, 'persentasepph', '');
                        storepphpersentase = me.getStore("Tipepajakcombopphpersentase");
                        storepphpersentase.filterBy(function (rec, id) {
                            if (rec.get('tipepajakdetail_id') === rowdata.tipepajakdetail_id) {
                                return true;
                            }
                            else {
                                return false;
                            }
                        });

                    }
                },
                change: function (cb, newValue, oldValue, eOpts) {
                    var me, rowdata, pd, form;
                    me = this.getMe();
                    form = me.getFormdatadetail();
                    var tipepajakdetailpph = form.down('[name=tipepajakdetailpph_id]').getRawValue();
                    if (tipepajakdetailpph.includes("Progresif")) {
                        form.down("[name=is_pphprogresif]").setValue(1);
                        form.down('[name=persentasepph]').setVisible(false);
                    } else {
                        form.down("[name=is_pphprogresif]").setValue(0);
                        form.down('[name=persentasepph]').setVisible(true);
                    }
                }
            },
            'vdrequestdetailformdata [name=no_faktur]': {
                'keyup': function (event) {
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    var val = me._formatNumber2(fd.down('[name=no_faktur]').getValue());
                    fd.down("[name=no_faktur]").setValue(val);
                },
                'blur': function () {
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    var val = me._formatNumber2(fd.down('[name=no_faktur]').getValue());
                    fd.down("[name=no_faktur]").setValue(val);
                },
                focus: function () {
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    var val = me._formatNumber2(fd.down('[name=no_faktur]').getValue());
                    fd.down("[name=no_faktur]").setValue(val);
                }
            },
            'vdrequestdetailformdata [name=coa_id]': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, pd, form;
                        me              = this.getMe();
                        pd              = me.paramdetail;
                        p               = me.paramsubdetail;
                        form            = me.getFormdatadetail();
                        rowdata         = record[0]['data'];
                        me.coa          = rowdata.coa;
                        me.coa_id       = rowdata.coa_id;
                        pd.rowdetailtmp = rowdata;
                    var detailgridsub   = me.getGridsubdetail();
                        me.kelsub_id    = rowdata.kelsub_id;
                        pd.rowdata      = { data: rowdata };
                        pd.data         = rowdata;
                    form.down("[name=coa_id]").setRawValue(rowdata.coa);
                    form.down("[name=coaname]").setValue(rowdata.coaname);
                    form.down("[name=kelsub_id]").setValue(rowdata.kelsub_id);
                    form.down("[name=kelsub]").setValue(rowdata.kelsub);
                    form.down("[name=kelsubdesc]").setValue(rowdata.kelsubdesc);
                    var io = form.down("[name=indexdata]").getValue();

                    //load cashflow
                    me.setStoreCashflow(rowdata.coa_id, 0);

                    if (form.getForm().isValid()) {
                        grid = me.getGriddetail();
                        store = grid.getStore();
                        row = form.getForm().getValues();
                        row[me.idheaderfield] = me.idheadervalue;
                        pd.row = row;
                        me.Checkdatadetail();
                        var ina = grid.getSelectionModel().getSelection()[0];
                        switch (pd.stateform) {
                            case 'create':
                                if (pd.checkdata == false) {
                                    store.removeAt(store.find('indexdata', io));

                                    row['statedata']  = 'create';
                                    row['project_id'] = me.project_id;
                                    row['pt_id']      = me.pt_id;
                                    row['coa_id']     = me.coa_id;
                                    row['coa']        = me.coa;
                                    row['kelsub_id']  = me.kelsub_id;
                                    row['indexdata']  = io;

                                    // row['nomorindex'] = io;
                                    row[me.idheaderfield] = me.idheadervalue;
                                    me.iddetailvalue_v = me.iddetailvalue;

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
                                row['coa_id']    = me.coa_id;
                                row['coa']       = me.coa;
                                //row['nomorindex'] = getindex;
                                row[me.idheaderfield] = me.idheadervalue;

                                //record.set(row);
                                //record.endEdit();
                                //store.commitChanges();
                                if (me.kelsub_id !== 0) {
                                    me.dataValidateSubDetailstore();
                                }

                                break;
                        }
                        store.filter('deleted', false);
                        var sumamount = 0;
                        store.each(function (record, index) {
                            sumamount = sumamount + parseFloat(record.get("amount").replace(/,/g, ''));
                        });
                        pd.totaldetail = sumamount;
                        //pd.totaldetail = store.sum('amount');
                        me.setSumdetail();
                        me.setDatadetailAftersave();
                    }


                    //semy1

                    if (me.kelsub_id !== 0) {

                        var datadetail = pd.rowdata['data'];
                        p.totalsubdetail = form.down("[name=amount]").getValue();

                        if (pd.stateform == "update") {
                            var datadetailb = indexdata.data;
                            if (typeof datadetail.indexdata == "undefined") {
                                datadetail.indexdata = datadetailb.indexdata;
                            }
                        }

                        storesub = me.getGridsubdetail().getStore();
                        storesub.clearFilter(true);
                        storesub.filterBy(function (rec, id) {
                            //if (rec.get('coa_id') === datadetail.coa_id && rec.get('indexsubdata') === datadetail.indexdata && rec.get('deleted') == false) {
                            if (rec.get('indexsubdata') === datadetail.indexdata && rec.get('deleted') == false) {
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
                        me.setSumsubdetailSimple();
                    } else {
                        //form.down("[name=amount]").setValue(0);
                        me.setReadonly(form, 'amount', false);
                        detailgridsub.setVisible(false);
                        detailgridsub.down('toolbar button[action=create]').setDisabled(true);
                    }
                },
                'change': function (a, val) {
                    var me = this.getMe();
                    me.coa_id_int = val;
                },
                'blur': function (a, val) {
                    var me = this.getMe();
                    form = me.getFormdatadetail();
                    if ((typeof me.coa_id_int) == "string") {
                        form.down("[name=coa_id]").setValue(null);
                        me.buildWarningAlert("Sorry typing COA is not allowed, please select from the dropdown");
                    }
                }
            },
            'vdrequestdetailformdata button[action=save]': {
                'click': function (me, e, eOpts) {
                    var me, checkbalance;
                    me = this.getMe();
                    me.dataSaveDetailstore();
                },
            },
            'vdrequestdetailformdata button[action=cancel]': {
                'click': function (me, e, eOpts) {
                    var me, checkbalance;
                    me = this.getMe();
                    me.dataCancelDetailstore();
                },
            },
            'vdrequestdetailformdata [name=amount] ': {
                'keyup': function (event) {
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    me._formatCurrency(fd.down('[name=amount]'));
                },
                'blur': function () {
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    me._formatCurrency(fd.down('[name=amount]'), "blur");
                },
                focus: function () {
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    var amount = parseInt(fd.down('[name=amount]').getValue());
                    if (amount == 0 || isNaN(amount)) {
                        fd.down('[name=amount]').setValue('');
                    }
                }
            },
            'vdrequestsubdetailformdata [name=amount] ': {
                'keyup': function (event) {
                    me = this.getMe();
                    var fd = me.getFormdatasubdetail();
                    me._formatCurrency(fd.down('[name=amount]'));
                },
                'blur': function () {
                    me = this.getMe();
                    var fd = me.getFormdatasubdetail();
                    me._formatCurrency(fd.down('[name=amount]'), "blur");
                },
                focus: function () {
                    me = this.getMe();
                    var fd = me.getFormdatasubdetail();
                    var amount = parseInt(fd.down('[name=amount]').getValue());
                    if (amount == 0 || isNaN(amount)) {
                        fd.down('[name=amount]').setValue('');
                    }
                }
            },
            /* END FORM AREA */

            //====================================END DETAIL===============================================      


            //====================================START COPY VOUCHER===============================================

            'formdatacopyvoucher': {
                afterrender: function () {

                    var me = this.getMe();
                    var f = me.getFormdatacopyvoucher();

                    this.loadProject();

                    var last_closing_date = Ext.JSON.decode(me.mindatecopyvoucher());
                    var minvoucherdate = Ext.Date.add(new Date(last_closing_date.data[0].last_closing_date), Ext.Date.DAY, 1);

                    f.down("[name=voucher_date]").setMinValue(minvoucherdate);
                }
            },
            'formdatacopyvoucher [name=project_id]': {
                change: function () {
                    this.loadPtbyProject();
                }
            },
            'formdatacopyvoucher [action=save]': {
                click: function () {
                    var me = this.getMe();

                    me.processcopyvoucher();
                }
            },

            //=====================================END COPY VOUCHER================================================ 


            //====================================START DESC===============================================      
            'vdrequestdescformcontent': {
                afterrender: function () {
                    var me;
                    me = this.getMe();
                    me.FormcontentdescAfterrender();
                },
            },
            'vdrequestgriddesc': {
                selectionchange: this.cellgridDesc,
                itemdblclick: this.griddescitemdoubleclick,
            },
            'vdrequestgriddesc toolbar button[action=create]': {
                click: function () {
                    var me;
                    me = this.getMe();
                    me.paramdesc.stateform = 'create';
                    me.GenerateFormdata(me.paramdesc);
                }
            },
            'vdrequestgriddesc toolbar button[action=update]': {
                click: function () {
                    me.paramdesc.stateform = 'update';
                    me.GenerateFormdata(me.paramdesc);
                }
            },
            'vdrequestgriddesc toolbar button[action=destroy]': {
                click: function () {
                    me.fieldconfirmdesc = 'description';
                    this.dataDestroydescwithflag();
                }
            },
            'vdrequestgriddesc actioncolumn': {
                click: function (view, cell, row, col, e) {
                    me.gridActionColumndescclick(view, cell, row, col, e);
                }
            },
            'vdrequestdescformdata': {
                afterrender: function () {
                    this.FormDataDescAfterrender();
                },
            },
            'vdrequestdescformdata button[action=save]': {
                'click': function (me, e, eOpts) {
                    var me;
                    me = this.getMe();
                    me.dataSaveDescstore();
                },
            },
            'vdrequestdescformcontent button[action=save]': {
                click: function () {
                    var me, store, counter;
                    me = this.getMe();
                    me.getFormcontentdesc().up('window').close();
                }
            },
            'vdrequestdescformcontent button[action=cancel]': {
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
            'vdrequestgridsubdetail': {
                afterrender: this.Gridsubafterrender,
                selectionchange: this.cellgridSubDetail,
                itemdblclick: this.gridsubdetailitemdoubleclick,
                select: this.gridSubDetailSelected,
            },
            'vdrequestgridsubdetail toolbar button[action=create]': {
                click: function () {
                    var me, form, pd, state, store, rowdata, counter, amount;
                    me = this.getMe();
                    pd = me.paramdetail;
                    rowdata = pd.rowdata['data'];
                    me.paramsubdetail.stateform = 'create';
                    me.GenerateFormdata(me.paramsubdetail);
                }
            },
            'vdrequestgridsubdetail toolbar button[action=update]': {
                click: function () {
                    this.gridsubdetailitemdoubleclick();
                }
            },
            'vdrequestgridsubdetail toolbar button[action=destroy]': {
                click: function () {
                    this.dataDestroysubdetailwithflag();
                }
            },
            'vdrequestgridsubdetail actioncolumn': {
                click: function (view, cell, row, col, e) {
                    me.gridActionColumnsubdetailclick(view, cell, row, col, e);
                }
            },
            'vdrequestsubdetailformdata': {
                afterrender: this.formDataSubDetailAfterRender
            },
            'vdrequestsubdetailformdata [name=subgl_id] ': {
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
            'vdrequestsubdetailformdata button[action=save]': {
                'click': function (me, e, eOpts) {
                    var me, checkbalance;
                    me = this.getMe();
                    me.dataSaveSubDetailstore();
                },
            },
            //====================================END SUB DETAIL===============================================      
            'vdrequestformdata button[action=create_vendor]': {
                click: function () {
                    var me;
                    me = this.getMe();
                    var form = me.getFormdata();
                    var c_pt_id = form.down('[name=pt_id]').getValue();
                    localStorage.setItem("current_pt_id", c_pt_id);
                    if (me.global_param['vendor_create']['value'] == '0') {
                        me.buildWarningAlert("Limited Access!");
                        return false;
                    }
                    me.FormDataCustomeShow('create', 700, 'Create Vendor ', 'Cashier.view.vendor.FormData', 'vendor');
                }
            },
            'vdrequestformdata button[action=create_note_vendor]': {
                click: function () {
                    var me;
                    me = this.getMe();
                    me.createNoteVendor(false, '');
                }
            },
            'vdrequestformdata button[action=clear_note_vendor]': {
                click: function () {
                    var me            = this.getMe(),
                        f             = me.getFormdata(),
                        vendor_note   = f.down("[name=vendor_note]").getValue(),
                        vendornote_id = f.down("[name=vendornote_id]").getValue();
                        
                    me.setVal(f, 'vendor_note', '');
                    me.setVal(f, 'input_noteofvendor', '');
                    me.setVal(f, 'vendornote_id', 0);
                }
            },
            'vdrequestkomisigrid ': {
                selectionchange: function () {
                    me.gridSelectionChangeCommissionGrid(me);
                },
                afterrender: function () {
                    var me = this.getMe();
                    console.log(me.getKomisigrid());
                }
            },
            'vdrequestformdata button[action=create_komisi]': {
                click: function () {
                    var me;
                    me = this.getMe();
                    me.browseCommission();
                }
            },
            'vdrequestformdata button[action=create_reward]': {
                click: function () {
                    var me;
                    me = this.getMe();
                    me.browseReward();
                }
            },
            'vdrequestkomisigrid button[action=select]': {
                click: function (v) {
                    var me = this.getMe();
                    me.commissionSelect(v);
                }
            },
            'vdrequestrewardgrid button[action=select]': {
                click: function (v) {
                    var me = this.getMe();
                    me.rewardSelect(v);
                }
            },
            'vdrequestkasbongrid button[action=select]': {
                click: function (v) {
                    var me = this.getMe();
                    me.cashbonSelect(v);
                }
            },
            'vdrequestkasbongrid': {
                afterrender: this.gridKasbondetailAfterRender
            },
            'vendorformdata': {
                destroy: function () {
                    Ext.data.StoreManager.lookup('Vendorcombo').reload();
                }
            },
            'formdatapreviewattachment [action=download]': {
                click: function () {
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
            },
            'vdrequestformdataupload button[action=uploadcsv]': {
                click: function () {
                    var me = this;
                    me.UploadDetailVoucher();
                }
            }
        });
    },
    formDataBeforeDestroy: function () {
        var me;
        me = this.getMe();
        //clean data main component
        me.flaggeneratevoucherno = 0;
        me.idheadervalue         = 0;
        me.iddetailvalue         = 0;
        me.project_id            = 0;
        me.pt_id                 = 0;
        me.subgl                 = null;
        me.kelsub_id             = 0;
        me.balancecoa            = null;
        me.validdetail           = 0;
        me.report                = null;
        //clean data detail
        me.paramdetail.iddetail       = 0;
        me.paramdetail.indexdata      = 0;
        me.paramdetail.stateform      = null;
        me.paramdetail.formaction     = null;
        me.paramdetail.formproperties = null;
        me.paramdetail.iddetail       = 0;
        me.paramdetail.store          = null;
        me.paramdetail.data           = null;
        me.paramdetail.grid           = null;
        me.paramdetail.row            = null;
        me.paramdetail.form           = null;
        me.paramdetail.checkdata      = false;
        me.paramdetail.object         = null;
        me.paramdetail.rowdata        = null;
        me.paramdetail.action         = null;
        me.paramdetail.counter        = 0;
        me.paramdetail.flagkelsub     = 0;
        me.paramdetail.rowdetailtmp   = 0;
        //clean data sub detail
        me.paramsubdetail.totalsubdetail = 0;
        me.paramsubdetail.iddetail       = 0;
        me.paramsubdetail.store          = null;
        me.paramsubdetail.data           = null;
        me.paramsubdetail.grid           = null;
        me.paramsubdetail.row            = null;
        me.paramsubdetail.form           = null;
        me.paramsubdetail.checkdata      = false;
        me.paramsubdetail.object         = null;
        me.paramsubdetail.rowdata        = null;
        //clean data description
        me.paramdesc.totalsubdetail = 0;
        me.paramdesc.iddetail       = 0;
        me.paramdesc.store          = null;
        me.paramdesc.data           = null;
        me.paramdesc.grid           = null;
        me.paramdesc.row            = null;
        me.paramdesc.form           = null;
        me.paramdesc.checkdata      = false;
        me.paramdesc.object         = null;
        me.paramdesc.rowdata        = null;
    },
    //=====================================================START METHOD DETAIL====================================
    paramdetail: {
        //start formgeneate
        fromlocation: 'Cashier.view.vdrequest.FormDataDetail',
        formtitle   : 'Form Detail',                           formicon   : 'icon-form-add',
        formid      : 'win-vdrequestdetailformdata',           formlayout : 'fit',
        formshadow  : 'frame',                                 formmask   : 'Loading...',
        formwidth   : 700,                                     formtimeout: 0,
        stateform   : null,                                    formaction : null,            formproperties: null, formwindows: null,
        //end formgeneate
        //start properties form
        iddetail    : 0,     store        : null, data        : null, record: null, grid   : null, row       : null, form: null,
        checkdata   : false, object       : null, rowdata     : null, action: null, counter: 0,    flagkelsub: 0,
        rowdetailtmp: null,  kasbondept_id: [],   changeamount: null
        //start properties form
    },
    paramcontentdesc: {
        //start formgeneate
        fromlocation: 'Cashier.view.vdrequest.FormContentDesc',
        formtitle   : 'Form Content Description Detail',        formicon   : 'icon-form-add',
        formid      : 'win-vdrequestdescformcontent',           formlayout : 'fit',
        formshadow  : 'frame',                                  formmask   : 'Loading...',
        formwidth   : 800,                                      formtimeout: 0,
        stateform   : null,                                     formaction : null,            formproperties: null, formwindows: null,
        //end formgeneate

    },
    paramdesc: {
        //start formgeneate
        fromlocation: 'Cashier.view.vdrequest.FormDataDesc',
        formtitle   : 'Form Description Detail',             formicon   : 'icon-form-add',
        formid      : 'win-vdrequestdescformdata',           formlayout : 'fit',
        formshadow  : 'frame',                               formmask   : 'Loading...',
        formwidth   : 600,                                   formtimeout: 0,
        stateform   : null,                                  formaction : null,            formproperties: null, formwindows: null,
        //end formgeneate
        //start properties form
        iddetail      : 0,     store : null, data   : null, record: null, grid   : null, row       : null, form: null,
        checkdata     : false, object: null, rowdata: null, action: null, counter: 0,    flagkelsub: 0,
        totalsubdetail: 0,
        //start properties form
    },
    paramsubdetail: {
        //start formgeneate
        fromlocation: 'Cashier.view.vdrequest.FormDataSubDetail',
        formtitle   : 'Form Sub Detail',                          formicon   : 'icon-form-add',
        formid      : 'win-vdrequestsubdetailformdata',           formlayout : 'fit',
        formshadow  : 'frame',                                    formmask   : 'Loading...',
        formwidth   : 600,                                        formtimeout: 0,
        stateform   : null,                                       formaction : null,            formproperties: null, formwindows: null,
        //end formgeneate
        //start properties form
        iddetail      : 0,     store                 : null, data   : null, record: null, grid   : null, row       : null, form: null,
        checkdata     : false, object                : null, rowdata: null, action: null, counter: 0,    flagkelsub: 0,
        totalsubdetail: 0,     kasbondeptsubdetail_id: []
        //start properties form
    },
    paramcopyvoucher: {
        //start formgeneate
        fromlocation: 'Cashier.view.vdrequest.FormDataCopyVoucher',
        formtitle   : 'Form Copy Voucher Department',               formicon   : 'icon-form-add',
        formid      : 'win-formdatacopyvoucher',                    formlayout : 'fit',
        formshadow  : 'frame',                                      formmask   : 'Loading...',
        formwidth   : 500,                                          formtimeout: 0,
        stateform   : 'copy',                                       formaction : null,            formproperties: null, formwindows: null, mode: null
        //end formgeneate

    },
    paramdetailapproval: {
        //start formgeneate
        fromlocation: 'Cashier.view.vdrequest.FormDataApprovalDetail',
        formtitle   : 'Form Detail Approval',                          formicon   : 'icon-form-edit',
        formid      : 'win-vdrequestdetailformdataapproval',           formlayout : 'fit',
        formshadow  : 'frame',                                         formmask   : 'Loading...',
        formwidth   : 500,                                             formtimeout: 0,
        stateform   : null,                                            formaction : null,             formproperties: null, formwindows: null,
        //end formgeneate
        //start properties form
        iddetail : 0,     store : null, data   : null, record: null, grid   : null, row         : null, form: null,
        checkdata: false, object: null, rowdata: null, action: null, counter: 0,    rowdetailtmp: null,
        //start properties form  
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
                ids.push(rows[i].data.voucher_id);
            }

            for (var i = 0; i < rows.length; i++) {
                // if (rows[i].data.uploadapi_id != null || rows[i].data.uploadapi_id > 0) {
                if (rows[i].data.uploadapi_id != "" /*|| rows[i].data.uploadapi_id != null*/) {
                    Ext.Msg.alert('Warning', 'Ini adalah voucher [' + rows[i].data.datasource.split('-')[0] + '], tidak dapat dihapus!');
                    return false;
                }

                if (rows[i].data.status > 1) {
                    Ext.Msg.alert('Warning', 'Voucher dengan nomor ' + rows[i].data.voucher_no + ' telah diapprove, tidak dapat dihapus!');
                    return false;
                }
            }

            // penambahan reason delete by krisna
            Ext.Msg.confirm('Delete Data', confirmmsg + '<br><br>Reason <br><textarea type="text" id="reasondeletevdrequest" name="reasondeletevdrequest"></textarea>', function (btn) {
                if (btn == 'yes') {
                    if ($('#reasondeletevdrequest').val().length < 5) {
                        me.buildWarningAlert('Masukan alasan kenapa voucher dihapus minimal 5 karakter');
                        return false;
                    }
                    resetTimer();
                    var msg = function () {
                        me.getGrid().up('window').mask('Deleting data, please wait ...');
                    };
                    for (var i = 0; i < rows.length; i++) {
                        rows[i].data.reason_delete = $('#reasondeletevdrequest').val();
                        store.remove(rows[i]);
                    }

                    store.on('beforesync', msg);
                    store.sync({
                        success: function (s) {
                            me.getGrid().up('window').unmask();
                            var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
                            var successmsg = (rows.length == 1 ? selectedRecord : (successcount != rows.length ? successcount + ' of ' : '') + recordcounttext) + ' deleted successfully.';
                            store.un('beforesync', msg);
                            store.reload();

                            Ext.Ajax.request({
                                url: 'cashier/vdrequest/update',
                                params: {
                                    data: Ext.encode({
                                        hideparam: 'updatereasondelete',
                                        voucher_id: ids.join(','),
                                        reasondelete: $('#reasondeletevdrequest').val(),
                                        pt_id: null
                                    })
                                }
                            })

                            if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
                                Ext.StoreManager.lookup(me.stores[0]).load({ params: { limit: 0 } });
                            }
                            Ext.Msg.show({
                                title: 'Success',
                                msg: successmsg,
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK
                            });
                        },
                        failure: function (batch, options) {
                            // added on april 2016, ahmad riadi
                            var parameter = (batch.proxy.getReader().jsonData.param ? batch.proxy.getReader().jsonData.param : 'no');
                            var pesan = (batch.proxy.getReader().jsonData.msg ? batch.proxy.getReader().jsonData.msg : 'Unable to save data.');
                            if (parameter == 'used') {
                                failmsg = pesan;
                            } else {
                                failmsg = failmsg + ' The data may have been used.';
                            }

                            me.getGrid().up('window').unmask();
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
    Gridsubafterrender: function () {
        var me;
        me = this.getMe();
    },
    /* METHOD START FOR GRID HERE */
    cellgridDetail: function () {
        var me,        pd, form, statehead, lengthkelsub = '';
            me        = this.getMe();
            form      = me.getFormdata();
            statehead = form.up('window').state.toLowerCase();
            pd        = me.paramdetail;
        me.gridSelectionChangedetail();
        pd.grid   = me.getGriddetail();
        pd.object = pd.grid.getSelectionModel().getSelection();
        pd.data   = '';
        for (var i = 0; i <= pd.object.length - 1; i++) {
            pd.data = pd.object[i];
        }
        var detailgridsubs = me.getGridsubdetail();
        if (pd.data !== '') {
            pd.rowdata = pd.data;
            pd.row = pd.rowdata['data'];
            if (pd.row.kelsub_id == 0) {
                // form.down('[name=gridtabsubdetail]').setDisabled(true);
                //detailgridsub.setVisible(false);
                ////var detailgridsubs = me.getGridsubdetail(); 
                //detailgridsub.down('toolbar button[action=create]').setDisabled(true);
            } else {
                // form.down('[name=gridtabsubdetail]').setDisabled(false);
                //detailgridsubs.setVisible(true);
                // detailgridsubs.down('toolbar button[action=create]').setDisabled(false);
                if (pd.row.statedata !== 'create' && statehead !== 'create') {
                    me.iddetailvalue = pd.row.voucherdetail_id;
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
        me   = this.getMe();
        form = me.getFormdata();
        p    = me.paramdesc;
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
    gridSelectionChangesubdetail: function () {
        var me   = this.getMe();
        var grid = me.getGridsubdetail(),
            row  = grid.getSelectionModel().getSelection();
        grid.down('#btnEdit').setDisabled(row.length != 1);
        grid.down('#btnDelete').setDisabled(row.length < 1);
    },
    cellgridSubDetail: function () {
        var me,   p, form = '';
            me   = this.getMe();
            form = me.getFormdata();
            p    = me.paramsubdetail;
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
        var me,   pd, grid, action = '';
            me   = this.getMe();
            pd   = me.paramdetail;
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
    gridattachmentitemdoubleclick: function () {
        var me, p;
        me = this.getMe();
        me.FormUploadAttachmentRead('read');
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
                me.remainingkasbon = 'changed';
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
        me       = this.getMe();
        pd       = me.paramdetail;
        form     = me.getFormdata();
        pd.grid  = me.getGriddetail();
        pd.store = me.getStore("VDRequestdetail");
        pd.store.load({
            params: {
                "hideparam" : 'default',
                "voucher_id": me.getValue(me, 'voucher_id', 'value'),
                "start"     : 0,
                "limit"     : 1000,
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
                              //form.down('[name=gridtabsubdetail]').setDisabled(false);
                        } else {
                            //form.down('[name=gridtabsubdetail]').setDisabled(true);
                        }
                        pd.totaldetail = rawjson.totalamount;
                        me.setVal(form, 'amount', me.Mask(rawjson.totalamount));
                        me.setVal(form, 'totaldetail', me.Mask(rawjson.totalamount));
                        me.setSumdetail();
                    }
                }
                catch (err) {
                    console.log(err.message);
                }
            }
        });
    },
    getDatakasbondetail: function () {
        var me,       pd, counter, form, rowdata, lengthkelsub, store, grid, rawjson = '', storekasbondetail;
            me       = this.getMe();
            pd       = me.paramdetail;
            form     = me.getFormdata();
            pd.grid  = me.getGriddetail();
            pd.store = me.getStore("VDRequestkasbondetail");
        pd.store.load({
            params: {
                "hideparam" : 'kasbondetail',
                "voucher_id": me.getValue(me, 'voucher_id', 'value'),
                "start"     : 0,
                "limit"     : 1000,
            },
            callback: function (records, operation, success) {
                try {
                    counter = pd.store.getCount();
                    rawjson = pd.store.proxy.getReader().jsonData;
                    if (counter > 0) {
                        rowdata = records[0]['data'];
                        pd.grid.getSelectionModel().select(0, true);
                        form.down("[name=is_pjk]").setValue(1);
                    }
                    if (counter == 1) {
                        form.down('[name=kasbondept_id]').setValue(rowdata.kasbondept_id);
                          //me.setStoreKashbondepthasapply();
                    }
                    if (counter > 1) {
                        form.down('[name=kasbondept_id]').setReadOnly(true);
                    }

                    storekasbondetail = Ext.data.StoreManager.lookup('VDRequestkasbondetail');
                    if (storekasbondetail.getCount() > 0 && me.kasbondept_id == 0) {
                        form.down("[name=kasbondept_id]").setDisabled(true);
                        form.down('[name=kasbondept_id]').setReadOnly(true);
                    }
                    if (storekasbondetail.getCount() == 1 && me.kasbondept_id > 0) {
                        form.down("[name=kasbondept_id]").setDisabled(false);
                        form.down('[name=kasbondept_id]').setReadOnly(false);
                    }
                }
                catch (err) {
                    console.log(err.message);
                }
            }
        });

    },
    getDataattachmentdetail: function () {
        var me,       pd, counter, form, rowdata, lengthkelsub, store, grid, rawjson = '', storeattachmentdetail;
            me       = this.getMe();
            pd       = me.paramdetail;
            form     = me.getFormdata();
            pd.grid  = me.getGriddetail();
            pd.store = me.getStore("VDRequestattachmentdetail");
        pd.store.load({
            params: {
                "hideparam" : 'attachmentdetail',
                "voucher_id": me.getValue(me, 'voucher_id', 'value'),
                "start"     : 0,
                "limit"     : 1000,
            },
            callback: function (records, operation, success) {
                try {
                    counter = pd.store.getCount();
                    rawjson = pd.store.proxy.getReader().jsonData;
                }
                catch (err) {
                    console.log(err.message);
                }
            }
        });
    },
    getDataapprovaldetail: function () {
        var me,       pd, counter, form, rowdata, lengthkelsub, store, grid, rawjson = '', storeapprovaldetail, state;
            me       = this.getMe();
            pd       = me.paramdetail;
            form     = me.getFormdata();
            state    = form.up('window').state.toLowerCase();
            pd.grid  = me.getGriddetail();
            pd.store = me.getStore("VDRequestapprovaldetail");
        pd.store.load({
            params: {
                "hideparam" : 'approvaldetail',
                "voucher_id": me.getValue(me, 'voucher_id', 'value'),
                "start"     : 0,
                "limit"     : 1000,
            },
            callback: function (records, operation, success) {
                try {
                    counter = pd.store.getCount();
                    rawjson = pd.store.proxy.getReader().jsonData;

                    if (state == 'update') {
                        if (counter == 0 && me.global_param['approval_rules']['value'] == 'hod_approve') {
                            var gridapprovaldetail = me.getGridapprovaldetail();

                            gridapprovaldetail.down("#btnRefresh").setDisabled(false);

                            me.getListApproval(function () {
                                console.log('callback');
                            });
                        }
                    }
                }
                catch (err) {
                    console.log(err.message);
                }
            }
        });
    },
    getDatadesc: function () {
        var me,      pd, p, counter, form, rowdata = '';
            me      = this.getMe();
            p       = me.paramdesc;
            form    = me.getFormdata();
            p.grid  = me.getGriddesc();
            p.store = p.grid.getStore();
        p.store.load({
            params: {
                "hideparam" : 'default',
                "voucher_id": me.idheadervalue,
                "start"     : 0,
                "limit"     : 100,
            },
            callback: function (records, operation, success) {
                counter   = p.store.getCount();
                p.counter = counter;
            }
        });
    },
    getDatasubdetail: function () {
        var me,      pd, p, counter, form, rowdata = '';
            me      = this.getMe();
            pd      = me.paramdetail;
            p       = me.paramsubdetail;
            rowdata = pd.rowdata['data'];
            form    = me.getFormdata();
            p.grid  = me.getGridsubdetail();
          //p.store = p.grid.getStore();
        Ext.StoreManager.lookup('VDRequestsubdetail').load({
            params: {
                "hideparam"       : 'default',
                "voucher_id"      : rowdata.voucher_id,
                "voucherdetail_id": rowdata.voucherdetail_id,
                "start"           : 0,
                "limit"           : 100,
            },
            callback: function (records, operation, success) {
                  //counter = p.store.getCount();
                counter   = Ext.StoreManager.lookup('VDRequestsubdetail').getCount();
                p.counter = counter;

                    storesub     = Ext.StoreManager.lookup('VDRequestsubdetail');
                var substoredata = me.localStore.substore;

                  //yang deleted dari db tidak perlu ditampilkan
                storesub.each(function (record, index) {
                    if (me.deletedsub_ids.includes(record.get('vouchersubdetail_id'))) {
                        record.set("deleted", true);
                        record.set("statedata", 'delete');
                    }
                });

                var vsd_ids = [];
                  //kumpulkan yang teredit dari database
                var vouchersubdetail_id;
                substoredata.forEach(function (item, index) {
                    vouchersubdetail_id = parseInt(item.vouchersubdetail_id);
                    if (vouchersubdetail_id > 0) {
                        vsd_ids.push(vouchersubdetail_id);
                    }

                });

                storesub.add(substoredata);

                storesub.filterBy(function (rec, id) {

                    if (rec.get('statedata') == "view") {
                          //jika database tergantikan tak perlu dimunculkan
                        if (vsd_ids.includes(rec.get('vouchersubdetail_id'))) {
                            return false;
                        }
                    }

                    if (rec.get('indexsubdata') === rowdata.indexdata || rec.get('voucherdetail_id') == rowdata.voucherdetail_id) {
                        return true;
                    }
                    else {
                        return false;
                    }
                });

                storesub.filter("deleted", false);

            }
        });
    },
      /* METHOD END FOR GRID HERE */

      /* METHOD START FORM */
    indexDetail: function () {
        var me, form, store, counter;
            me      = this.getMe();
            store   = me.getGriddetail().getStore();
            counter = store.getCount();
        var i       = store.sum('indexdata');
        return i;
          //        if(i===0) {
          //            return counter + 1;
          //        }
          //        else {
          //            return i ;
          //        }

    },
    indexDesc: function () {
        var me, form, store, counter;
        me      = this.getMe();
        store   = me.getGriddesc().getStore();
        counter = store.getCount();
        store.clearFilter();
        return counter + 1;
    },
    indexSubDetail: function () {
        var me, form, store, counter;
            me         = this.getMe();
        var pd         = me.paramdetail;
        var datadetail = pd.rowdata['data'];
            storesub   = me.getGridsubdetail().getStore();
        storesub.clearFilter(true);
        counter = storesub.getCount();
        storesub.filterBy(function (rec, id) {
            if (rec.get('coa_id') === datadetail.coa_id && rec.get('indexsubdata') === datadetail.indexdata) {
                return true;
            }
            else {
                return false;
            }
        });
        storesub.filter('deleted', false);
        counter = storesub.getCount();
          //        store = me.getGridsubdetail().getStore();
          //        store.clearFilter(true);
          //        store.filter('deleted', false);
          //        counter = store.getCount();
          //        store.clearFilter();
        return counter + 1;
    },
        //kasbondeptdetail_id
    indexSubDetail3: function () {
        var me, form, store, counter;
            me         = this.getMe();
        var pd         = me.paramdetail;
        var datadetail = pd.rowdata['data'];
            storesub   = me.getGridsubdetail().getStore();
        storesub.clearFilter(true);
        counter = storesub.getCount();
        storesub.filterBy(function (rec, id) {
            if (rec.get('kasbondeptdetail_id') === datadetail.kasbondeptdetail_id) {
                return true;
            }
            else {
                return false;
            }
        });
        storesub.filter('deleted', false);
        counter = storesub.getCount();
        return counter + 1;
    },
    indexSubDetail2: function () {
        var me, form, store, counter;
            me         = this.getMe();
        var pd         = me.paramdetail;
        var datadetail = pd.rowdata['data'];
            storesub   = me.getGridsubdetail().getStore();
        storesub.clearFilter(true);
        counter = storesub.getCount();
        storesub.filterBy(function (rec, id) {
            if (rec.get('voucherdetail_id') === datadetail.voucherdetail_id) {
                return true;
            }
            else {
                return false;
            }
        });
        storesub.filter('deleted', false);
        counter = storesub.getCount();
        return counter + 1;
    },
    formDataDetailAfterRender: function () {
        var me, pd, action, counter, sort, form, desc, kasbondept_id, dataflow;
        me            = this.getMe();
        pd            = me.paramdetail;
        formheader    = me.getFormdata();
        form          = me.getFormdatadetail();
        desc          = me.getFormdata().down('[name=description]').getValue();
        dataflow      = me.getFormdata().down('[name=dataflow]').getValue();
        kasbondept_id = me.getFormdata().down('[name=kasbondept_id]').getValue();
        me.setStoreCoaDept();
        me.setStoreTipePajak();
        me.setStoreCashflow(0, 0);
        var detailgridsub    = me.getGridsubdetail();
        var detailgridkasbon = me.getGridkasbondetail();
        detailgridsub.setVisible(false);
        var storesub    = me.getGridsubdetail().getStore();
        var storedetail = Ext.data.StoreManager.lookup('VDRequestdetail');

        var countkasbondetail = detailgridkasbon.getStore().getCount();

        detailgridsub.setLoading(true);

        substoredata = me.localStore.substore;

        storesub.loadData([], false);

        storesub.add(substoredata);

        form.down('button[action=save]').setDisabled(false);

          /*show multi kasbon dropdown*/
        if (countkasbondetail > 0) {
            me.cashbonLoadStore();
            form.down("[name=kasbondept_id]").setVisible(true);
            me.is_multi_kasbon = 1;
            if (parseInt(kasbondept_id) > 0) {
                me.is_multi_kasbon = 0;
            }
        } else {
            form.down("[name=kasbondept_id]").setValue(0);
            form.down("[name=kasbondept_id]").setVisible(false);
        }

        if (pd.stateform == 'create') {
            form.down("[name=kasbondept_id]").setValue(kasbondept_id);
        }

        if (me.global_param['getnofaktur']['value'] == 1 && !formheader.down("[name=dataflow]").getValue()) {
            form.down("[name=no_faktur]").setVisible(true);
        } else {
            form.down("[name=no_faktur]").setVisible(false);
        }
        switch (pd.stateform) {
            case 'create': 
                var store = me.getGriddetail().getStore();

                var counter;
                var counters = [];

                counter = store.getCount() + 1;

                store.each(function (record, index) {
                    counters.push(record.data.indexdata);
                });

                if (counters.length > 0) {
                    counter = Math.max.apply(Math, counters) + 1;
                }

                if (counter == 0) {
                    counter = 1;
                }

                  //counter = store.getCount() + 1;

                pd.iddetail      = 0;
                me.iddetailvalue = counter;
                if (me.in_out == 'I') {
                    form.down("[name=dataflow]").setValue('O');
                } else {
                    form.down("[name=dataflow]").setValue('I');
                }
                form.down("[name=remarks]").setValue(desc);
                form.down("[name=indexdata]").setValue(counter);

                  //autofocus
                form.down("[name=coa_id]").focus();

                if (me.type_pph > 0) {
                    form.down("[name=checkpph]").setValue(1);
                    form.down("[name=tipepajakdetailpph_id]").setValue(me.type_pph);
                }
                if (me.is_multi_kasbon == 0) {
                    form.down("[name=kasbondept_id]").setValue(kasbondept_id);
                }
                break;
            case 'update': 

                form.loadRecord(pd.rowdata);
                pd.iddetail  = pd.rowdata['data'].voucherdetail_id;
                pd.indexdata = pd.rowdata['data'].indexdata;

                var row_voucherdetail_id = pd.rowdata['data'].voucherdetail_id;
                if (row_voucherdetail_id == 0) {
                    me.iddetailfield_v = 'indexdataheader';
                    me.iddetailvalue_v = pd.rowdata['data'].indexdata;
                } else {
                    me.iddetailfield_v = 'voucherdetail_id';
                    me.iddetailvalue_v = pd.rowdata['data'].voucherdetail_id;
                }

                me.iddetailvalue = pd.rowdata['data'].voucherdetail_id;
                me.coa_id        = pd.rowdata['data'].coa_id;
                me.coa           = pd.rowdata['data'].coa;
                me.kelsub_id     = pd.rowdata['data'].kelsub_id;

                  //disable edit coa tax
                    me.coa    = pd.rowdata['data'].coa;
                var coapajaks = me.global_param['coa_pajak']['value'];
                if (!coapajaks.includes(me.coa) && me.is_userpajak) {
                    form.down('button[action=save]').setDisabled(true);
                      //me.buildWarningAlert("Tidak bisa Ubah Selain Coa Pajak");
                }

                  //int to string issue
                var persentaseppn = parseInt(pd.rowdata['data'].persentaseppn);
                  // form.down("[name=persentaseppn]").setValue(persentaseppn.toString());

                if (pd.rowdata['data'].subcashierdesc == "pajak" || pd.rowdata['data'].subcashier_id == 999) {
                    me.setReadonly(form, 'tipepajakdetailppn_id', true);
                    me.setReadonly(form, 'tipepajakdetailpph_id', true);
                    me.setReadonly(form, 'persentaseppn', true);
                    me.setReadonly(form, 'persentasepph', true);
                    me.setReadonly(form, 'checkppn', true);
                    me.setReadonly(form, 'checkpph', true);
                }

                  //If unchecked
                if (pd.rowdata['data'].checkppn == false) {
                    me.setVal(form, 'persentaseppn', '');
                    me.setVal(form, 'tipepajakdetailppn_id', 0);
                }
                if (pd.rowdata['data'].checkpph == false) {
                    me.setVal(form, 'persentasepph', '');
                    me.setVal(form, 'tipepajakdetailpph_id', 0);
                }

                me.setStoreCashflow(me.coa_id, pd.rowdata['data'].setupcashflow_id);

                if (me.kelsub_id !== 0) {

                      //semy4

                    var datadetail = pd.rowdata['data'];
                    if (datadetail.voucherdetail_id) {
                        var vid      = datadetail.voucherdetail_id;
                        var headerid = '1';
                    } else {
                        var vid      = datadetail.kasbondeptdetail_id;
                        var headerid = '2';
                    }


                    //FILTER YANG BENAR
                    storesub.clearFilter(true);
                    storesub.filterBy(function (rec, id) {
                        if (rec.get('indexsubdata') === datadetail.indexdata) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    });

                    if (datadetail.voucherdetail_id !== 0) {
                        storesub.filterBy(function (rec, id) {
                            if (rec.get('voucherdetail_id') === datadetail.voucherdetail_id) {
                                return true;
                            }
                            else {
                                return false;
                            }
                        });
                    }
                    storesub.filter("deleted", false);

                    //------

                    me.setReadonly(form, 'amount', true);
                    detailgridsub.setVisible(true);
                    detailgridsub.down('toolbar button[action=create]').setDisabled(false);
                } else {
                    me.setReadonly(form, 'amount', false);
                    detailgridsub.setVisible(false);
                    detailgridsub.down('toolbar button[action=create]').setDisabled(true);
                }
                /* di non aktifkan karena supaya update sesuai datanya
                 if (me.in_out == 'I') {
                 form.down("[name=dataflow]").setValue('O');
                 } else {
                 form.down("[name=dataflow]").setValue('I');
                 }*/
                break;
            default: 
        }

        me.formatCurrencyFormdata(me, form);
        detailgridsub.setLoading(false);
    },
    FormcontentdescAfterrender: function () {
        var me, p, action, store, counter, sort, state, form, desc;
        me      = this.getMe();
        p       = me.paramcontentdesc;
        form    = me.getFormdata();
        store   = me.getGriddesc().getStore();
        state   = form.up('window').state.toLowerCase();
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
        me   = this.getMe();
        p    = me.paramdesc;
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
    formDataAttachmentAfterrender: function () {
        var me, p, action, countdata, counter, state, form, rowdata;
        me    = this.getMe();
        form  = me.getFormdatauploadattachment();
        state = me.getFormdata().up('window').state;

        if (state == 'update' || state == 'read') {
            var mainGrid       = me.getGrid();
            var selectedRecord = mainGrid.getSelectionModel().getSelection()[0];
            var status         = selectedRecord['data'].status;

            if (me.status_approve.includes(parseInt(status)) && me.getGridattachmentdetail().approval_rules == "hod_approve") {
                Ext.getCmp("btnUploadAndSaveFormAttachment").setVisible(true);
                Ext.getCmp("prefix-description").setVisible(true);
                Ext.getCmp("btnUploadFormAttachment").setVisible(false);
                Ext.getCmp("title-file").setWidth(253);
            } else {
                Ext.getCmp("btnUploadAndSaveFormAttachment").setVisible(false);
                Ext.getCmp("prefix-description").setVisible(false);
                Ext.getCmp("btnUploadFormAttachment").setVisible(true);
                Ext.getCmp("title-file").setWidth(328);
            }
        } else {
            Ext.getCmp("btnUploadAndSaveFormAttachment").setVisible(false);
            Ext.getCmp("prefix-description").setVisible(false);
            Ext.getCmp("btnUploadFormAttachment").setVisible(true);
            Ext.getCmp("title-file").setWidth(328);
        }

        form.down("[name=file-path-attachment]").on('change', function (inputFile, value) {
            var fileSize = inputFile.fileInputEl.dom.files[0].size;
                fileSize = fileSize / 1000000;
            if (fileSize > 5) { //Limit 2 MB
                me.buildWarningAlert("Ukuran File Yang Diizinkan : 5 MB !");
                form.getForm().reset();
                return 0;
            }
        });
    },
    formDataSubDetailAfterRender: function () {
        console.log('sub detail showed up');
        var me, pd, p, rowdata, action, state, counter, sort, form, desc;
        me            = this.getMe();
        pd            = me.paramdetail;
        p             = me.paramsubdetail;
        rowdata       = pd.rowdata['data'];
        me.kelsub_id  = rowdata.kelsub_id;
        me.balancecoa = rowdata.amount;
        form          = me.getFormdatasubdetail();
        formdet       = me.getFormdatadetail();
        formd         = me.getFormdata();
        state         = me.getFormdata().up('window').state.toLowerCase();

        store      = me.getStore("Subgl");
        storesubgl = me.getStore("Subgl");

          //onrender
        store.proxy.extraParams = {
            "hideparam" : 'getsubglbykelsub',
            "project_id": me.project_id,
            "pt_id"     : me.getVal(formd, 'pt_id', 'value'),
            "kelsub_id" : me.kelsub_id
        }

          //onkeyup
        form.down("[name=subgl_id]").on('keyup', function (e, t, eOpts) {
            store.proxy.extraParams = {
                "hideparam" : 'getsubglbykelsub',
                "project_id": me.project_id,
                "pt_id"     : me.getVal(formd, 'pt_id', 'value'),
                "kelsub_id" : me.kelsub_id
            }
        });

        if (rowdata['kelsub'] == 'B') {
            form.down("[name=is_refund]").setVisible(true);
        } else {
            form.down("[name=is_refund]").setVisible(false);
        }

        switch (p.stateform) {
            case 'create': 

                  /** new counter **/

                var storesub = me.getGridsubdetail().getStore();

                var counter;
                var counters = [];

                counter = storesub.getCount() + 1;

                storesub.each(function (record, index) {
                    counters.push(record.data.indexdata);
                });

                if (counters.length > 0) {
                    counter = Math.max.apply(Math, counters) + 1;
                }

                var remarks = me.getVal(formdet, 'remarks', 'value');

                me.setVal(form, 'voucher_id', me.idheadervalue);
                me.setVal(form, 'voucherdetail_id', me.iddetailvalue);
                me.setVal(form, 'coa_id', rowdata.coa_id);
                me.setVal(form, 'kelsub_id', rowdata.kelsub_id);
                me.setVal(form, 'kelsub', rowdata.kelsub);
                me.setVal(form, 'indexdata', counter);
                me.setVal(form, 'indexsubdata', counter);
                me.setVal(form, 'indexdataheader', rowdata.indexdata);
                me.setVal(form, 'remarks', remarks);


                  //autofocus
                form.down("[name=indexdata]").focus();
                form.down("[name=subgl_id]").focus();
                setTimeout(function () {
                    form.down("[name=subgl_id]").focus();
                }, 200);

                break;
            case 'update': 

                me.iddetailvalue = rowdata.voucherdetail_id;

                if (me.iddetailvalue === undefined || me.iddetailvalue === null) {
                    me.iddetailvalue = p.rowdata.get('voucherdetail_id');
                }

                form.loadRecord(p.rowdata);

                form.setLoading('Loading data...');
                  //onloaddropdown
                storesubgl.load({
                    params: {
                        "hideparam" : 'getsubglbykelsub',
                        "project_id": me.project_id,
                        "pt_id"     : me.getVal(formd, 'pt_id', 'value'),
                        "kelsub_id" : me.kelsub_id,
                        "query"     : p.rowdata.get('code1')
                    },
                    callback: function (records, operation, success) {
                        me.setVal(form, 'subgl_id', p.rowdata.get('subgl_id'));
                        form.setLoading(false);
                    }
                });

                break;
            default: 
        }


          //SUPAYA SAAT ADD NEW TIDAK HILANG

        var substoredata = me.localStore.substore;

        var vsd_ids = [];
        //kumpulkan yang teredit dari database
        var vouchersubdetail_id;
        substoredata.forEach(function (item, index) {
            vouchersubdetail_id = parseInt(item.vouchersubdetail_id);
            if (vouchersubdetail_id > 0) {
                vsd_ids.push(vouchersubdetail_id);
            }

        });

        var storesub = me.getGridsubdetail().getStore();

        storesub.clearFilter(true);
        storesub.filterBy(function (rec, id) {
            if (rec.get('indexsubdata') === rowdata.indexdata) {
                return true;
            }
            else {
                return false;
            }
        });

        if (rowdata.voucherdetail_id !== 0) {
            storesub.filterBy(function (rec, id) {
                if (rec.get('statedata') == "view") {
                    //jika database tergantikan tak perlu dimunculkan
                    if (vsd_ids.includes(rec.get('vouchersubdetail_id'))) {
                        return false;
                    }
                }
                if (rec.get('voucherdetail_id') === me.iddetailvalue) {
                    return true;
                }
                else {
                    return false;
                }


            });
        }
        storesub.filter("deleted", false);


        if (p.stateform == 'create') {
            me.setStoreSubcode();
        }
        me.formatCurrencyFormdata(me, form);
    },
    /* METHOD END FORM */

    setTotaldetail: function (store) {
        var me, form, amountheader, sum_in, sum_out, total;
        me = this.getMe();
        sum_in = sum_out = 0;
        store.each(function (record, index) {
            if (record.get('dataflow') == 'I') {
                var am = record.get('amount').replace(/,/g, '');
                sum_in += parseFloat(am);
            }
            if (record.get('dataflow') == 'O') {
                var am = record.get('amount').replace(/,/g, '');
                sum_out += parseFloat(am);
            }
        });
        if (me.in_out == 'I') {
            total = parseFloat(sum_out) - parseFloat(sum_in);
        } else {
            total = parseFloat(sum_in) - parseFloat(sum_out);
        }

        return total;
    },
    /* START CALCULATE DATA */
    setSumdetail: function () {
        var me, pd, store_h, store_d, form, amount, totaldetail,
            balance, msgdata, status, voucher_no, is_reward;
        me = this.getMe();
        pd = me.paramdetail;
        form = me.getFormdata();
        store_d = me.getGriddetail().getStore();
        if (store_d.getCount() > 0) {
            store_d.filter('voucher_id', me.idheadervalue);
            store_d.filter('deleted', false);
            //totaldetail = store_d.sum('amount');
            totaldetail = me.setTotaldetail(store_d);
        } else {
            totaldetail = pd.totaldetail;
        }

        me.Mask(me.setVal(form, 'amount', totaldetail));
        amount = me.unMask(me.getVal(form, 'amount', 'value'));
        valuekasbon = me.unMask(me.getVal(form, 'valuekasbon', 'value'));
        remainingkasbon = me.unMask(me.getVal(form, 'remainingkasbon', 'value'));
        kasbondept_id = me.unMask(me.getVal(form, 'kasbondept_id', 'value'));
        kasbondept_id = parseInt(kasbondept_id);
        is_reward = form.down("[name=is_reward]").getValue();

        var amountcanuse = parseFloat(me.remainingkasboninit) + parseFloat(me.initamount);

        if (parseFloat(me.remainingkasboninit) == parseFloat(valuekasbon)) {
            amountcanuse = valuekasbon;
        }

        if (parseFloat(me.remainingkasboninit) == 0) {
            amountcanuse = valuekasbon;
        }

        balance = parseFloat(amount) - parseFloat(totaldetail);

          //Remaining Validation
        if (me.remainingkasbon > 0) {
            remaining = me.remainingkasbon;
        }
        if (me.remainingkasbon == 0 || me.remainingkasbon == null) {
            remaining = 0;
        }
        if (me.remainingkasbon == 'changed') {
            remaining = parseFloat(me.initamount) + amountcanuse;
            remaining = amountcanuse - amount;
        }
        if (typeof remaining == "undefined") {
            remaining = 0;
        }

        var _remainingkasbon = parseFloat(remaining);

        me.setVal(form, 'remainingkasbon', parseFloat(remaining));
        me.setVal(form, 'totaldetail', parseFloat(totaldetail));
        me.setVal(form, 'balance', parseFloat(balance));
        store_d.clearFilter(true);
        store_d.filter('voucher_id', me.idheadervalue);
        store_d.filter('deleted', false);

          //multikasbon false
        if (me.is_multi_kasbon == 0 && kasbondept_id > 0) {
            var store_k = me.getStore('VDRequestkasbondetail');
            store_k.each(function (record, index) {
                var remainingkasbon = accounting.unformat(record.get("remaining_amount"));
                var pay_amount      = parseFloat(totaldetail);
                var final_amount    = parseFloat(remainingkasbon) - parseFloat(totaldetail);
                record.set("pay_amount", pay_amount);
                record.set("final_amount", final_amount);
                var _final_amount = parseFloat(final_amount);
                if (_final_amount !== _remainingkasbon) {
                    me.setVal(form, 'remainingkasbon', _final_amount);
                }
            });
        }

        if (is_reward) {
            var data_kasbon = [];
            if (store_d.getCount() > 0) {
                store_d.each(function (record, index) {
                    if (record.data.kasbondept_id > 0) {
                        var obj = {
                            kasbondept_id: record.data.kasbondept_id,
                            amount       : parseFloat(accounting.unformat(record.data.amount))
                        }

                        data_kasbon.push(obj);
                    }
                });
            }
            if (data_kasbon.length > 0) {
                var store_k = me.getStore('VDRequestkasbondetail');
                store_k.each(function (record, index) {
                    for (var i = 0; i < data_kasbon.length; i++) {
                        if (record.get('kasbondept_id') == data_kasbon[i].kasbondept_id) {
                            var remainingkasbon = accounting.unformat(record.get("remaining_amount"));
                            var pay_amount      = data_kasbon[i].amount;
                            var final_amount    = parseFloat(remainingkasbon) - pay_amount;
                            record.set("pay_amount", pay_amount);
                            record.set("final_amount", final_amount);
                        }
                    }
                });
            }
        }

        me.formatCurrencyFormdata(me, form);
    },

    setSumdetailSimple: function () {
        var me, pd, store_h, store_d, form, amount, totaldetail,
            balance, msgdata, status, voucher_no;
        me      = this.getMe();
        pd      = me.paramdetail;
        form    = me.getFormdata();
        store_d = me.getGriddetail().getStore();
        if (store_d.getCount() > 0) {
            totaldetail = me.setTotaldetail(store_d);
        } else {
            totaldetail = pd.totaldetail;
        }

        me.Mask(me.setVal(form, 'amount', totaldetail));
        me.Mask(me.setVal(form, 'totaldetail', totaldetail));

        me.formatCurrencyFormdata(me, form);

    },
    setSumsubdetail: function () {
        var me, pd, p, store, store_h, storedetail, form, amount, totaldetail,
            balance, totalsubdetail, msgdata, status, gridsubdetail,
            getindexdetail, recorddetail, rowdetail, state, flagdetail;
        me            = this.getMe();
        pd            = me.paramdetail;
        gridsubdetail = me.getGridsubdetail();
        p             = me.paramsubdetail;
        form          = me.getFormdatasubdetail();
        amount        = amount = me.balancecoa;
        store         = gridsubdetail.getStore();
        storedetail   = me.getGriddetail().getStore();
        me.getSubdata(store, pd.rowdata['data']);

        if (store.getCount() > 0) {
            store.filter('deleted', false);

            var sumamount = 0;
            store.each(function (record, index) {
                if (record.get("deleted") == false) {
                    sumamount = sumamount + parseFloat(record.get("amount").replace(/,/g, ''));
                }
            });

            totalsubdetail = sumamount;
        } else {
            totalsubdetail = p.totalsubdetail;
        }


        me.Mask(gridsubdetail.down('[name=balancecoa]').setValue(totalsubdetail));
        amount  = me.unMask(gridsubdetail.down('[name=balancecoa]').getValue());
        balance = parseFloat(amount) - parseFloat(totalsubdetail);
        me.Mask(gridsubdetail.down('[name=balancecoa]').setValue(balance));
        rowdetail = {};

        getindexdetail = storedetail.indexOf(pd.rowdata);
        recorddetail   = storedetail.getAt(getindexdetail);
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

        formdetail = me.getFormdatadetail();

        formdetail.down('[name=amount]').setValue(accounting.formatMoney(totalsubdetail));
        me.getSubdata(store, pd.rowdata['data']);
        store.clearFilter(true);
        store.filter('deleted', false);
        store.filter(me.iddetailfield_v, me.iddetailvalue_v);
    },
    setSumsubdetailSimple: function () {
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

            var sumamount = 0;
            store.each(function (record, index) {
                sumamount = sumamount + parseFloat(record.get("amount").replace(/,/g, ''));
            });

            totalsubdetail = sumamount;

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

        store.clearFilter();
        me.setSumdetail();

        formdetail = me.getFormdatadetail();
        formdetail.down('[name=amount]').setValue(accounting.formatMoney(totalsubdetail));
        me.getSubdata(store, pd.rowdata['data']);
        store.clearFilter(true);
        store.filter('deleted', false);
        store.filter(me.iddetailfield_v, me.iddetailvalue_v);
    },
    /* END CALCULATE DATA */

    //=====================================================END METHOD DETAIL====================================
    panelAfterRender: function () {
        var me = this.getMe();
        me.getPTCGG();
        me.getSettingGlobalParam('formsearch');
    },
    checkTabsubcoa: function () {
        var me, pd, form, tabPanel, name, rowdetail;
        me = this.getMe();
        pd = me.paramdetail;
        form = me.getFormdata();
        rowdetail = pd.rowdata;
        tabPanel = form.down("[name=voucherrequesttab]").getActiveTab();
        name     = tabPanel.name;
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
        me            = this.getMe();
        datadetail    = rowdetail['data'];
        pd            = me.paramdetail;
        form          = me.getFormdata();
        state         = form.up('window').state.toLowerCase();
        gridsubdetail = me.getGridsubdetail();
        storesub      = gridsubdetail.getStore();
        countersub    = storesub.getCount();
        gridsubdetail.down('[name=coa]').setValue(datadetail.coa);
        gridsubdetail.down('[name=coaname]').setValue(datadetail.coaname);
        gridsubdetail.down('[name=balancecoa]').setValue(datadetail.amount);
        if (countersub > 0) {
            if (state !== 'create' && datadetail.statedata !== 'create') {
                me.iddetailvalue = datadetail.voucherdetail_id;
                  // me.getDatasubdetail();
            } else {
                me.iddetailvalue = datadetail.indexdata;
                me.getSubdata(storesub, datadetail);
            }
        }
    },
    setFormdataready: function () {
        var me, store, state, form, griddetail, gridsubdetail, storedetail,
        me    = this.getMe();
        form  = me.getFormdata();
        state = form.up('window').state.toLowerCase();

        griddetail = me.getGriddetail();
        griddetail.down('#btnGenerate').setDisabled(true);

          //assign sc
        me.assignShortcut("alt+a", "btnAddNewDetailVdrequest");
        form.down("[name=cashbon_pt_id]").getStore().load();

        switch (state) {
            case 'create': 
                me.idheadervalue = 0;
                griddetail       = me.getGriddetail();
                storedetail      = me.getGriddetail().getStore();
                if (storedetail.getCount() > 0) {
                    storedetail.removeAll();
                }
                me.setLabel(me, 'lblstatus', 'OPEN / DRAFT', true);
                me.setValue(me, 'status', '1');
                me.setVal(form, 'voucher_date', me.dateNow);
                me.setStorePtuser();
                  // me.getAllowDepartmentAccess();
                  // me.setStoreDeptuser();
                  //me.setStoreApproveby(); <--tidak perlu                
                  //me.generateVoucherno(); <--setelah pilih dept aja

                  //disable add sebelum department terisi
                griddetail.down('#btnAdd').setDisabled(true);

                break;
            case 'update': 
                var gridheader    = me.getGrid();
                var storeheader   = gridheader.getStore();
                var recordheader  = storeheader.getAt(storeheader.indexOf(gridheader.getSelectionModel().getSelection()[0]));
                var counterheader = storeheader.getCount();
                if (counterheader > 0) {
                    var rowheader = recordheader['data'];
                    me.setValCombo(form, 'vendor_note', rowheader.vendor_note, rowheader.vendor_note);
                }

                me.idheadervalue = me.getValue(me, 'voucher_id', 'value');
                storedetail      = me.getGriddetail().getStore();
                if (storedetail.getCount() > 0) {
                    storedetail.removeAll();
                }
                me.getDatadetail();
                me.getDatakasbondetail();
                me.getDataattachmentdetail();
                me.getDataapprovaldetail();
                me.setSumdetail();
                break;
            case 'read': 
                me.idheadervalue = me.getValue(me, 'voucher_id', 'value');
                storedetail      = me.getGriddetail().getStore();
                if (storedetail.getCount() > 0) {
                    storedetail.removeAll();
                }
                me.getDatadetail();
                me.getDatakasbondetail();
                me.getDataattachmentdetail();
                me.getDataapprovaldetail();
                me.setSumdetail();
                break;
        }
    },
    setStorePtuser: function () {
        var me         = this.getMe(),
            store      = me.getStore('Ptbyuser'),
            form       = me.getFormdata(),
            formsearch = me.getFormsearch(),
            pt_id_fs   = formsearch.down("[name=pt_id]").getValue();

        if (pt_id_fs > 0) {
            var rawPt = formsearch.down("[name=pt_id]").valueModels[0].raw;
            if (me.project_id != rawPt.project_id || me.pt_id != pt_id_fs) {
                me.project_id = parseInt(rawPt.project_id);
                me.pt_id      = parseInt(pt_id_fs);
            }
        }

        store.each(function (record) {
            if (record.data['project_id'] == me.project_id && record.data['pt_id'] == me.pt_id) {
                me.setVal(form, 'pt_id', record.data['pt_id']);
            }
        });
    },
    setStoreDeptuser: function () {
        var me, store, form;
        me    = this.getMe();
        form  = me.getFormdata();
        store = me.getStore("Department");

        store.reload({
            params: {
                "hideparam" : 'getdepartment',
                "user_id"   : apps.uid,
                "project_id": me.project_id,
                "pt_id"     : me.pt_id
            },
            callback: function (records, operation, success) {
                store.filterBy(function (rec, id) {
                    if (me.allowed_dept.includes(rec.get('department_id'))) {
                        return true;
                    }
                    else {
                        return false;
                    }
                });

                store.each(function (record) {
                    if (record.data['department_id'] == me.department_id || record.data['code'] == me.department_code) {
                        me.setVal(form, 'department_id', record.data['department_id']);
                        me.setVal(form, 'prefixdept', record.data['prefixdept']);
                        me.prefixdept = record.data['code'];

                        if (me.global_param['approval_rules']['value'] == 'hod_approve') {
                            me.getListApproval(function () {
                                console.log('callback');
                            });
                        }
                    }
                });
            }
        });
    },
    setStoreApproveby: function () {
        var me, store, form;
        me = this.getMe();
        form = me.getFormdata();
        state = form.up('window').state.toLowerCase();

        store = me.getStore("Employee");
        store.reload({
            params: {
                "hideparam": 'getemployee',
            },
            callback: function (records, operation, success) {
                //store.clearFilter(true);
                //store.filter("department_id", me.department_id);
                store.each(function (record) {
                    if (record.data['employee_id'] == me.manager_id) {
                        if (state == 'create') {
                            me.approveby_id = record.data['employee_id'];
                            me.setVal(form, 'approveby_id', record.data['employee_id']);
                            me.setVal(form, 'approvetaxby_id', me.usertax_id);
                        } else {
                            me.setVal(form, 'approveby_id', me.approveby_id);
                        }

                    }
                });
            }
        });
    },
    setStoreCoaDept: function () {
        var me, store, form;
        me    = this.getMe();
        form  = me.getFormdata();
        store = me.getStore("Coadeptcombo");
        store.load({
            params: {
                "hideparam"    : 'getcoabyprojectptdept',
                "project_id"   : me.project_id,
                "pt_id"        : me.getVal(form, 'pt_id', 'value'),
                "department_id": me.getVal(form, 'department_id', 'value')
            },
            callback: function (records, operation, success) {

            }
        });
    },
    setStoreTipePajak: function () {
        var me, store, form, state;
        me                 = this.getMe();
        form               = me.getFormdata();
        state              = form.up('window').state.toLowerCase();
        store              = me.getStore("Tipepajakcombo");
        storepph           = me.getStore("Tipepajakcombopph");
        storeppnpersentase = me.getStore("Tipepajakcomboppnpersentase");
        storepphpersentase = me.getStore("Tipepajakcombopphpersentase");

        store.load({
            params: {
                "hideparam"    : 'gettipepajak',
                "project_id"   : me.project_id,
                "pt_id"        : me.getVal(form, 'pt_id', 'value'),
                "department_id": me.getVal(form, 'department_id', 'value')
            },
            callback: function (records, operation, success) {
                store.clearFilter();
                store.filterBy(function (rec, id) {
                    if (rec.get('tipepajak') === "PPN") {
                        return true;
                    }
                    else {
                        return false;
                    }
                });

                console.log(state);
                if (state == 'create') {
                    var dataflow = form.down("[name=dataflow]").getValue();
                    if (dataflow) {
                        var havePPNMasukan = 0;
                        store.each(function (rec, idx) {
                            if (rec.get('tipepajakdetail') == 'PPN MASUKAN') {
                                havePPNMasukan = 1;
                            }
                        });

                        if (havePPNMasukan == 1) {
                              // store.filter('tipepajakdetail', 'PPN MASUKAN');
                            store.clearFilter();
                            store.filterBy(function (rec, id) {
                                if (rec.get('tipepajakdetail') == "PPN MASUKAN") {
                                    return true;
                                }
                                else {
                                    return false;
                                }
                            });
                        }
                    } else {
                        store.clearFilter();
                        store.filterBy(function (rec, id) {
                            if (rec.get('tipepajak') === 'PPN' && rec.get('tipepajakdetail') != "PPN MASUKAN") {
                                return true;
                            }
                            else {
                                return false;
                            }
                        });
                    }
                }
            }
        });

        storepph.load({
            params: {
                "hideparam"    : 'gettipepajak',
                "project_id"   : me.project_id,
                "pt_id"        : me.getVal(form, 'pt_id', 'value'),
                "department_id": me.getVal(form, 'department_id', 'value')
            },
            callback: function (records, operation, success) {
                storepph.filterBy(function (rec, id) {
                    if (rec.get('tipepajak') === "PPH") {
                        return true;
                    }
                    else {
                        return false;
                    }
                });
            }
        });

        storeppnpersentase.load({
            params: {
                "hideparam"    : 'gettipepajakpersentase',
                "project_id"   : me.project_id,
                "pt_id"        : me.getVal(form, 'pt_id', 'value'),
                "department_id": me.getVal(form, 'department_id', 'value')
            },
            callback: function (records, operation, success) {
                storeppnpersentase.filterBy(function (rec, id) {
                    if (rec.get('tipepajak') === "PPN") {
                        return true;
                    }
                    else {
                        return false;
                    }
                });
            }
        });


        storepphpersentase.load({
            params: {
                "hideparam"    : 'gettipepajakpersentase',
                "project_id"   : me.project_id,
                "pt_id"        : me.getVal(form, 'pt_id', 'value'),
                "department_id": me.getVal(form, 'department_id', 'value')
            },
            callback: function (records, operation, success) {
                storepphpersentase.filterBy(function (rec, id) {
                    if (rec.get('tipepajak') === "PPH") {
                        return true;
                    }
                    else {
                        return false;
                    }
                });
            }
        });


    },
    setStoreCashflow: function (coa_id, setupcashflow_id) {
        var me, store, form;
        me    = this.getMe();
        form  = me.getFormdata();
        formd = me.getFormdatadetail();
        store = me.getStore("Cashflow");
        store.load({
            params: {
                "hideparam"    : 'getsetupcashflow',
                "project_id"   : me.project_id,
                "pt_id"        : me.getVal(form, 'pt_id', 'value'),
                "department_id": me.getVal(form, 'department_id', 'value'),
                "coa_id"       : coa_id
            },
            callback: function (records, operation, success) {
                if (typeof records !== 'undefined' && records.length > 0) {
                    if (setupcashflow_id > 0) {
                        me.setVal(formd, 'setupcashflow_id', setupcashflow_id);
                    } else {
                        if (coa_id > 0) {
                            for (var i = 0; i < records.length; i++) {
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
    setStoreSubcode: function () {
        var me, store, form;
        me    = this.getMe();
        form  = me.getFormdata();
        store = me.getStore("Subgl");
        store.load({
            params: {
                "hideparam" : 'getsubglbykelsub',
                "project_id": me.project_id,
                "pt_id"     : me.getVal(form, 'pt_id', 'value'),
                "kelsub_id" : me.kelsub_id
            },
            callback: function (records, operation, success) {

            }
        });
    },
    setStoreVendornote: function (form) {
        var me, store, form, state;
        me    = this.getMe();
        form  = me.getFormdata();
        state = form.up('window').state.toLowerCase();
        if (true) {
            var input_noteofvendor = form.down('[name=input_noteofvendor]').getValue();
            form.setLoading('Get Vendor Note');
            try {
                var vendor_id = form.down('[name=vendor_id]').getValue();
            }
            catch (err) {
                console.log(err.message);
                var vendor_id = 0;
            }
            store = me.getStore("Vendornoteb");
            if (vendor_id > 0) {
                store.load({
                    params: {
                        "hideparam": 'default',
                        "vendor_id": vendor_id,
                        "limit"    : 100
                    },
                    callback: function (records, operation, success) {
                        if (state == 'create') {
                            me.setVal(form, 'vendor_note', '');
                            if (input_noteofvendor !== '') {
                                me.setVal(form, 'vendor_note', input_noteofvendor);
                            }
                        } else {
                            if (records.length > 0) {
                                var vendornote_id = parseInt(form.down("[name=vendornote_id]").getValue());
                                if (records[0].data.vendornote_id == vendornote_id) {
                                    me.setVal(form, 'vendor_note', records[0].data.note);
                                }
                            }
                        }
                        form.setLoading(false);

                    }
                });
            } else {
                form.setLoading(false);
            }

        }

        var rowdata;
        try {
            rowdata = form.down('[name=vendor_id]').valueModels[0].raw;
            if (state == 'create' && me.global_param['vendor_autofill']['value'] == '1') {
                if (form.down("[name=description]").getValue() == "") {
                    form.down('[name=description]').setValue(rowdata.vendorname + ' : ');
                }
            }
            me.type_pph = rowdata.type_pph;
        }
        catch (err) {
            console.log(err.message);
        }

    },
    setStoreVendorbytypedata: function (form) {
        var me, store, form, state, type_vendor;
        me             = this.getMe();
        form           = me.getFormdata();
        state          = form.up('window').state.toLowerCase();
        type_vendor    = form.down('[name=type_vendor]').getValue();
        me.type_vendor = type_vendor;
        localStorage.setItem("current_type_vendor", type_vendor);

        if (type_vendor == 'customer') {
            form.down('[name=container_vendor]').hide();
            form.down('[name=container_notevendor]').hide();
            form.down('[name=container_customer]').show();
            form.down("[name=vendor_bankacc_id_container1]").setVisible(false);
            form.down("[name=vendor_bankacc_id_container2]").setVisible(false);
        } else {
            form.down('[name=container_vendor]').show();
            form.down('[name=container_notevendor]').show();
            form.down('[name=container_customer]').hide();
            form.down("[name=vendor_bankacc_id_container1]").setVisible(true);
            form.down("[name=vendor_bankacc_id_container2]").setVisible(true);
        }

        if (form != '' && me.pt_id > 0) {

            if (type_vendor == 'customer') {
                store = me.getStore("Customercombo");
                store.load({
                    params: {
                        "hideparam" : 'getcustomer',
                        "project_id": me.project_id,
                        "pt_id"     : me.pt_id,
                    },
                    callback: function (records, operation, success) {
                    }
                });
            } else {
                store = me.getStore("Vendorcombo");
                store.load({
                    params: {
                        "hideparam"  : 'getvendor',
                        "project_id" : me.project_id,
                        "pt_id"      : me.pt_id,
                        "type_vendor": me.type_vendor
                    },
                    callback: function (records, operation, success) {
                    }
                });

                  //store.clearFilter(true);
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



        }
    },
    generateVoucherno: function () {
        var me, form, state, voucher_date;
        me           = this.getMe();
        form         = me.getFormdata();
        state        = form.up('window').state.toLowerCase();
        voucher_date = me.formatDate(me.getVal(form, 'voucher_date', 'value'));
        switch (state) {
            case 'create': 

                me.senddata = {
                    "hideparam" : 'generatevoucherrequest',
                    "project_id": (me.project_id == 0) ? apps.project: me.project_id,
                    "param_date": voucher_date,
                    "pt_id"     : (me.pt_id == 0) ? apps.pt          : me.pt_id,
                    "module"    : 'VOUCHERREQUEST',
                    "prefix"    : me.prefixdept,
                    "flag"      : me.flaggeneratevoucherno,
                }
                me.urlrequest = me.urlcommon;

                if (me.prefixdept !== null) {
                    me.AjaxRequestNoClose();
                }


                break;
        }
    },
    getPajakCoa: function () {
        var me, form, state, voucher_date, resjson;
        me            = this.getMe();
        form          = me.getFormdata();
        state         = form.up('window').state.toLowerCase();
        voucher_date  = me.formatDate(me.getVal(form, 'voucher_date', 'value'));
        department_id = me.getVal(form, 'department_id', 'value');
        vendor_id     = me.getVal(form, 'vendor_id', 'value');
        if (vendor_id == '' || vendor_id == 0 || vendor_id == null) {
            Ext.Msg.alert('Warning', 'Vendor field cannot be empty');
            return 0;
        }

        me.senddata = {
            "hideparam"    : 'getpajakcoa',
            "project_id"   : (me.project_id == 0) ? apps.project: me.project_id,
            "pt_id"        : (me.pt_id == 0) ? apps.pt          : me.pt_id,
            "department_id": department_id,
            "vendor_id"    : vendor_id
        }
        me.urlrequest = me.urlcommon;

        form.setLoading('Please wait');
        Ext.Ajax.request({
            url    : me.urlrequest,
            method : 'POST',
            timeout: 45000000,
            params : {
                data: Ext.encode(me.senddata)
            },
            success: function (response) {

                resjson = Ext.JSON.decode(response.responseText);
                resjson = resjson.data;
                form.down("[name=is_pajak]").setValue(1);
                if (me.subholding_id == 4) {
                    me.generatePajakSh3b(resjson);
                } else {
                    me.generatePajak(resjson);
                }
                form.setLoading(false);
            },
            failure: function (response) {
                me.alertFormdataFailed();
                form.setLoading(false);
                form.down("[name=is_pajak]").setValue(0);
                me.messagedata = 'data error';
                throw me.messagedata;
                  //form.up('window').close();
            }
        });
    },
    getPajakProgresif: function (tipepajakdetail_id, initamount) {
        var me, form, state, voucher_date, resjson;
            me     = this.getMe();
            form   = me.getFormdata();
            state  = form.up('window').state.toLowerCase();
        var amount = 0;

        me.senddata = {
            "hideparam"         : 'getpajakprogresif',
            "project_id"        : (me.project_id == 0) ? apps.project: me.project_id,
            "pt_id"             : (me.pt_id == 0) ? apps.pt          : me.pt_id,
            "tipepajakdetail_id": tipepajakdetail_id,
            "initamount"        : initamount
        }
        me.urlrequest = me.urlcommon;
        form.setLoading('Please wait');
        Ext.Ajax.request({
            async  : false,
            url    : me.urlrequest,
            method : 'POST',
            timeout: 45000000,
            params : {
                data: Ext.encode(me.senddata)
            },
            success: function (response) {
                resjson = Ext.JSON.decode(response.responseText);
                resjson = resjson.data;
                form.setLoading(false);
                amount = resjson[0].amount;
            },
            failure: function (response) {
                me.alertFormdataFailed();
                form.setLoading(false);
                form.down("[name=is_pajak]").setValue(0);
                me.messagedata = 'data error';
                throw me.messagedata;
            }
        });
        return amount;
    },
    dataSaveDetailstore: function () {
            //semy2
        var me,            pd, form, grid, store, record, row, indexdata, getindex = '';
            me            = this.getMe();
            pd            = me.paramdetail;
            form          = me.getFormdatadetail();
        var is_valid      = 1;
        var is_invalid    = 0;
        var amount_before = pd.row.amount;
        if (form.getForm().isValid()) {
            grid                  = me.getGriddetail();
            store                 = grid.getStore();
            row                   = form.getForm().getValues();
            row[me.idheaderfield] = me.idheadervalue;
            if (pd.data.data === undefined || pd.data.data === null) {
                var kelsub_id = 0;
                var kelsub_id = parseInt(form.down("[name=kelsub_id]").getValue());
                if (isNaN(kelsub_id)) {
                    kelsub_id = 0;
                }
            } else {
                var kelsub_id = pd.data.data.kelsub_id;
            }

            var isppn = form.down("[name=checkppn]").getValue();
            var ispph = form.down("[name=checkpph]").getValue();

            if (kelsub_id > 0) {
                    is_valid   = 1;
                var countstore = me.getGridsubdetail().getStore().getCount();
                if (countstore == 0) {
                    me.buildWarningAlert("Sub detail is empty");
                    return 0;
                }
                gridsubstore = me.getGridsubdetail().getStore();
                gridsubstore.filter('deleted', false);
                gridsubstore.each(function (record, index) {
                    if (kelsub_id !== record.get("kelsub_id")) {
                        me.buildWarningAlert("Invalid Sub");
                        is_valid   = 0;
                        is_invalid = is_invalid + 1;
                        return 0;
                    } else {
                        is_valid = 1;
                    }

                    if (record.get("subgl_id") == 0) {
                        me.buildWarningAlert("Sub Code Kosong : Rp " + record.get("amount"));
                        is_valid   = 0;
                        is_invalid = is_invalid + 1;
                        return 0;
                    }

                });
                if (is_valid == 0) {
                    is_invalid = is_invalid + 1;
                    return 0;
                }
            }

            if (is_invalid > 0) {
                return 0;
                throw me.messagedata;
            }


            var is_pphprogresif = 0;
            var is_ppnprogresif = 0;

            if (form.down("[name=is_pphprogresif]").getValue() == 1) {
                is_pphprogresif = 1;
            }
            if (form.down("[name=is_ppnprogresif]").getValue() == 1) {
                is_ppnprogresif = 1;
            }
            if (isppn > 0 && is_ppnprogresif == 1) {
                var tipepajakdetailppn_id = form.down("[name=tipepajakdetailppn_id]").getValue();
                var persentaseppn         = form.down("[name=persentaseppn]").getValue();
                if (tipepajakdetailppn_id == "" || tipepajakdetailppn_id == null) {
                    me.buildWarningAlert("Isi tipe PPN Progresif tidak valid");
                    return 0;
                }
            }
            if (ispph > 0 && is_pphprogresif == 1) {
                var tipepajakdetailpph_id = form.down("[name=tipepajakdetailpph_id]").getValue();
                var persentasepph         = form.down("[name=persentasepph]").getValue();
                if (tipepajakdetailpph_id == "" || tipepajakdetailpph_id == null) {
                    me.buildWarningAlert("Isi tipe PPH Progresif tidak valid");
                    return 0;
                }
            }
            if (isppn > 0 && is_ppnprogresif == 0) {
                var tipepajakdetailppn_id = form.down("[name=tipepajakdetailppn_id]").getValue();
                var persentaseppn         = form.down("[name=persentaseppn]").getValue();
                if (tipepajakdetailppn_id == "" || persentaseppn == "" || persentaseppn == 0 || persentaseppn == null) {
                    me.buildWarningAlert("Isi tipe PPN tidak valid");
                    return 0;
                }
            }
            if (ispph > 0 && is_pphprogresif == 0) {
                var tipepajakdetailpph_id = form.down("[name=tipepajakdetailpph_id]").getValue();
                var persentasepph         = form.down("[name=persentasepph]").getValue();
                if (tipepajakdetailpph_id == "" || persentasepph == "" || persentasepph == 0 || persentasepph == null) {
                    me.buildWarningAlert("Isi tipe PPH tidak valid");
                    return 0;
                }
            }

              /* boleh 0
            if(row['amount']==0){
                me.buildWarningAlert("Amount cannot be 0");
                return 0;
            }
            */

            if (row['kasbondept_id'] > 0) {
                  //kasbon no
                var raw_kasbondept_id  = form.down("[name=kasbondept_id]").valueModels[0]['raw'];
                var data_kasbondept_id = form.down("[name=kasbondept_id]").valueModels[0]['data'];
                  // var cashbon_no = raw_kasbondept_id.cashbon_no;
                var cashbon_no = raw_kasbondept_id.cashbon_no + ' (' + data_kasbondept_id.made_by_name + ')';
            } else {
                var cashbon_no = '';
                var tkb        = me.getFormdata().down("[name=is_pjk]").getValue();
                if (tkb == 1) {
                    me.buildWarningAlert("No Cashbon tidak boleh kosong. Silahkan periksa kembali");
                    return 0;
                }
            }


            pd.row = row;
            me.Checkdatadetail();
            switch (pd.stateform) {
                case 'create': 

                    if (pd.checkdata == false) {
                        if (isppn > 0 || ispph > 0) {
                            me.flaggeneratepajak = 1;
                        }

                        indexdata = grid.getSelectionModel().getSelection()[0];
                        getindex  = store.indexOf(indexdata);
                        record    = store.getAt(getindex);
                        record.beginEdit();
                        row['statedata']       = 'create';
                        row['coa_id']          = me.coa_id;
                        row['coa']             = me.coa;
                        row['cashbon_no']      = cashbon_no;
                        row['typetransdetail'] = row['dataflow'];
                          //row['indexdata'] = me.kelsub_id;
                        row[me.idheaderfield] = me.idheadervalue;
                        record.set(row);
                        record.endEdit();
                        store.commitChanges();
                    } else {
                        me.buildWarningAlert("Sorry code = " + me.coa + " ,already exist in this transaction");
                    }
                    break;
                case 'update': 

                    if ((amount_before != row['amount']) && (isppn || ispph)) {
                        pd.changeamount = 1;
                    }

                    indexdata = grid.getSelectionModel().getSelection()[0];
                    getindex  = store.indexOf(indexdata);
                    record    = store.getAt(getindex);
                    record.beginEdit();
                    row['statedata']       = 'update';
                    row['coa_id']          = me.coa_id;
                    row['coa']             = me.coa;
                    row['cashbon_no']      = cashbon_no;
                    row['typetransdetail'] = row['dataflow'];
                    row[me.idheaderfield]  = me.idheadervalue;
                    record.set(row);
                    record.endEdit();
                    store.commitChanges();
                    break;
            }

            store.filter('deleted', false);
            var sumamount = 0;
            store.each(function (record, index) {
                sumamount = sumamount + parseFloat(record.get("amount").replace(/,/g, ''));
            });
            pd.totaldetail = sumamount;
              //pd.totaldetail = store.sum('amount');

              //MARKED AS SAVE
            me.remainingkasbon = 'changed';

            me.setSumdetail();

              // var statehead = me.getFormdata().up('window').state.toLowerCase();
            if ( /*statehead == 'create' && */me.global_param['approval_rules']['value'] == 'hod_approve') {
                me.getListApproval(function () {
                    console.log('callback');
                });
            }

              //me.setDatadetailAftersave();
            form.up('window').close();
            grid.down('#btnGenerate').setDisabled(false);
        }


    },
    dataCancelDetailstore: function () {
          //semy2
        var me,   pd, form, grid, store, record, row, indexdata, getindex = '';
            me   = this.getMe();
            pd   = me.paramdetail;
            form = me.getFormdatadetail();
        if (form.getForm().isValid()) {
            grid                  = me.getGriddetail();
            store                 = grid.getStore();
            row                   = form.getForm().getValues();
            row[me.idheaderfield] = me.idheadervalue;
            pd.row                = row;
            me.Checkdatadetail();
            switch (pd.stateform) {
                case 'create': 

                    if (pd.checkdata == false) {

                        indexdata = grid.getSelectionModel().getSelection()[0];
                        getindex  = store.indexOf(indexdata);

                        record = store.getAt(getindex);
                        store.removeAt(getindex);

                    }

                    break;
            }

            store.filter('deleted', false);
            var sumamount = 0;
            store.each(function (record, index) {
                sumamount = sumamount + parseFloat(record.get("amount").replace(/,/g, ''));
            });
            pd.totaldetail = sumamount;
              //pd.totaldetail = store.sum('amount');
            me.setSumdetail();
              //me.setDatadetailAftersave();
            form.up('window').close();
        }
    },
    setDatadetailAftersave: function () {
          //semy5
        var me, store, counter, form, state;
        me         = this.getMe();
        store      = me.getGriddetail().getStore();
        counter    = store.getCount();
        form       = me.getFormdatadetail();
        formheader = me.getFormdata();

        if (typeof form == "undefined") {
            state = 'create';
        } else {
            state = form.up('window').state.toLowerCase();
        }

        if (counter) {
            var index = counter - 1;
            if (index == 0) {
                me.getGriddetail().getSelectionModel().select(index, true);
            } else {

                if (state == 'create') {
                    me.getGriddetail().getSelectionModel().deselectAll();
                    me.getGriddetail().getSelectionModel().select(index, true);
                } else {
                      //grid.getSelectionModel().select(index, true);
                      //me.getGriddetail().getSelectionModel().selectAll();
                }

            }
              // FINALISASI BAGIAN REWARD (SEMENTARA)
            if (formheader.down("[name=is_reward]").getValue()) {
                var amount_harus_cair = 0;
                var desc_header       = '';
                store.each(function (record) {
                    var amount   = accounting.unformat(record.get("amount"));
                    var dataflow = record.get('dataflow');
                    var remarks = record.get('remarks');
                    if (dataflow == 'I') {
                        amount_harus_cair += amount;
                    } else {
                        amount_harus_cair -= amount;
                    }
                    if (!remarks.includes('PPN') && !remarks.includes('PPH')) {
                        desc_header += remarks + '\n';
                    }
                });
                formheader.down("[name=reward_amount]").setValue(amount_harus_cair);
            }
        }
    },
    dataSaveDescstore: function () {
        var me,   p, form, grid, store, record, row, indexdata, getindex = '';
            me   = this.getMe();
            p    = me.paramdesc;
            form = me.getFormdatadesc();
        if (form.getForm().isValid()) {
            grid                  = me.getGriddesc();
            store                 = me.getStore('VDRequestdesc');
            row                   = form.getForm().getValues();
            row[me.idheaderfield] = me.idheadervalue;
            p.row                 = row;
            me.Checkdatadesc();
            switch (p.stateform) {
                case 'create': 
                    if (p.checkdata == false) {
                        row['statedata']     = 'create';
                        row['project_id']    = me.project_id;
                        row['pt_id']         = me.pt_id;
                        row[me.idheadefield] = me.idheadervalue;
                        store.add(row);
                        store.commitChanges();
                    } else {
                        me.buildWarningAlert("Sorry code = " + me.coa + " ,already exist in this transaction");
                    }
                    break;
                case 'update': 
                    getindex = store.indexOf(p.rowdata);
                    record   = store.getAt(getindex);
                    record.beginEdit();
                    row['statedata']     = 'update';
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
        me      = this.getMe();
        store   = me.getGriddesc().getStore();
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
            p  = me.paramsubdetail;
            pd = me.paramdetail;

        formdetail = me.getFormdatadetail();
        form       = me.getFormdatasubdetail();
        if (form.getForm().isValid()) {
            grid  = me.getGridsubdetail();
            store = grid.getStore();
            row   = form.getForm().getValues();

              /* boleh 0
            if(row['amount']==0){
                me.buildWarningAlert("Sub amount cannot be 0");
                return 0;
            }
            */

              /*Jika Kelsub Tidak Valid*/
            var storesub        = me.getGridsubdetail().getStore();
            var kelsub_idbefore = 0;
            var kelsub_before   = '';
            var isvalidkelsub   = 1;
            var kelsub_id_      = parseInt(form.down("[name=kelsub_id]").getValue());
            var subgl_id_       = parseInt(form.down("[name=subgl_id]").getValue());
            var kelsub_id_h     = parseInt(formdetail.down("[name=kelsub_id]").getValue());


            storesub.filter('deleted', false);

            storesub.each(function (record, id) {
                kelsub_idbefore = record.get('kelsub_id');
                kelsub_before   = record.get('kelsub');
            });

            storesub.each(function (record, id) {
                if (kelsub_idbefore !== record.get('kelsub_id')) {
                    isvalidkelsub = 0;
                }
                if (kelsub_id_ !== record.get('kelsub_id')) {
                    isvalidkelsub = 0;
                }
            });

            if (isvalidkelsub == 0) {

                storesub.each(function (record, id) {
                    if (record.get("kelsub_id") !== kelsub_id_h) {

                          //taruh di temp
                        if (record.get("vouchersubdetail_id") > 0) {
                            me.deletedsub_ids.push(record.get("vouchersubdetail_id"));
                        }
                        record.set("deleted", true);
                        record.set("statedata", 'delete');

                        var storeselected = record.data;
                          // Delete yang new
                        var substoredata = me.localStore.substore;
                        substoredata.forEach(function (item, index) {
                            if (storeselected.indexdata == item.indexdata && storeselected.indexsubdata == item.indexsubdata) {
                                if (index > -1) {
                                    substoredata.splice(index, 1);
                                }
                            }
                        });

                    }
                });
                if (me.paramdetail.stateform == 'update') {
                    me.iddetailvalue_v = me.iddetailvalue;
                }
                me.buildWarningAlert("Detail Kel Sub " + kelsub_before + " masih ada. Klik Save lagi untuk menghapus semua Sub " + kelsub_before);
                return 0;
            }

            p.row = row;
            me.Checksubdatadetail();

            switch (p.stateform) {
                case 'create': 

                    if (p.checkdata == false) {
                        var kasbondeptdetailid = pd.rowdata['data'].kasbondeptdetail_id;

                        row['statedata']    = 'create';
                        row['project_id']   = me.project_id;
                        row['pt_id']        = me.pt_id;
                        row['deleted']      = false;
                        row['indexsubdata'] = pd.rowdata['data'].indexdata;
                        row['kelsub_id']    = kelsub_id_h;
                        row['subgl_id']     = subgl_id_;
                        if (kasbondeptdetailid) {
                            row['kasbondeptdetail_id'] = kasbondeptdetailid;
                        }
                        row[me.iddetailfield] = me.iddetailvalue;
                          // row[me.iddetailvalue] = pd.rowdata['data'].voucherdetail_id;
                        if (row["indexdataheader"] == '') {
                            row["indexdataheader"] = pd.indexdata;
                        }
                        if (typeof pd.rowdata['data'].indexdata === "undefined") {
                            row['indexsubdata'] = pd.indexdata;
                        }

                        substoredata = me.localStore.substore;
                          //push last
                        substoredata = substoredata.push(row);

                        store.add(row);
                        store.commitChanges();

                    } else {
                        me.buildWarningAlert("Sorry data already exist in this transaction");
                    }
                    break;
                case 'update': 

                    getindex = store.indexOf(p.rowdata);
                    record   = store.getAt(getindex);
                    record.beginEdit();
                    row['statedata']      = 'update';
                    row['deleted']        = false;
                    row[me.iddetailfield] = me.iddetailvalue;

                    substoredata = me.localStore.substore;

                      //case 1;
                      //add baru lalu edit
                    substoredata.forEach(function (item, index) {
                        if (row.indexdata == item.indexdata && row.indexsubdata == item.indexsubdata) {
                            substoredata[index] = row;
                        }
                    });

                      //case 2;
                      //jika edit dari database

                    var countupdate = 0;
                    store.each(function (item, index) {
                        if (item.get('vouchersubdetail_id') > 0) {
                            if (row.voucherdetail_id == item.get('voucherdetail_id') &&
                                parseInt(row.vouchersubdetail_id) == item.get('vouchersubdetail_id')) {

                                countupdate = 0;
                                substoredata.forEach(function (item, index) {
                                    if (row.voucherdetail_id == item.voucherdetail_id && row.vouchersubdetail_id == item.vouchersubdetail_id) {
                                        substoredata[index] = row;
                                        countupdate         = countupdate + 1;
                                    }
                                });
                                if (countupdate == 0) {
                                    substoredata[substoredata.length] = row;
                                }

                            }
                        }
                    });


                    record.set(row);
                    record.endEdit();
                    store.commitChanges();
                    break;
            }

              //p.totalsubdetail = store.sum('amount');
            var sumamount = 0;
            store.each(function (record, index) {
                sumamount = sumamount + parseFloat(record.get("amount").replace(/,/g, ''));
            });
            p.totalsubdetail = sumamount;

            formdetail.down('[name=amount]').setValue(p.totalsubdetail);

            me.formatCurrencyFormdata(me, formdetail);
              //me.setSumsubdetailSimple();
            me.setDataSubDetailAftersave();
            form.up('window').close();

        }
    },
    dataValidateSubDetailstore: function () {
        var me, p, pd, form, grid, store, record, row, indexdata, getindex = '';
            me = this.getMe();

        p  = me.paramsubdetail;
        pd = me.paramdetail;

        formdetail = me.getFormdatadetail();

        if (true) {
            grid  = me.getGridsubdetail();
            store = grid.getStore();
              //row = form.getForm().getValues();

              /*Jika Kelsub Tidak Valid*/
            var storesub        = me.getGridsubdetail().getStore();
            var kelsub_idbefore = 0;
            var kelsub_before   = '';
            var isvalidkelsub   = 1;
            var kelsub_id_      = parseInt(formdetail.down("[name=kelsub_id]").getValue());
            var kelsub_id_h     = parseInt(formdetail.down("[name=kelsub_id]").getValue());
            var kelsub          = formdetail.down("[name=kelsub]").getValue();
            storesub.filter('deleted', false);
            var counter = storesub.getCount();

            storesub.each(function (record, id) {
                kelsub_idbefore = record.get('kelsub_id');
                kelsub_before   = record.get('kelsub');
            });

            storesub.each(function (record, id) {
                if (kelsub_idbefore !== record.get('kelsub_id')) {
                    isvalidkelsub = 0;
                }
                if (kelsub_id_ !== record.get('kelsub_id')) {
                    isvalidkelsub = 0;
                }
            });

            if (isvalidkelsub == 0 && counter > 0) {

                Ext.Msg.show({
                    title     : "Konfirmasi",
                    msg       : "Sub Coa dengan detail berbeda. Apakah anda ingin menghapus detail sub " + kelsub_before + " ?",
                    width     : 300,
                    closable  : false,
                    buttons   : Ext.Msg.YESNO,
                    buttonText: 
                    {
                        yes: 'YES',
                        no : 'NO'
                    },
                    multiline: false,
                    fn       : function (buttonValue, inputText, showConfig) {
                        if (buttonValue == 'yes') {

                            storesub.each(function (record, id) {
                                if (record.get("kelsub_id") !== kelsub_id_h) {

                                      //taruh di temp
                                    if (record.get("vouchersubdetail_id") > 0) {
                                        me.deletedsub_ids.push(record.get("vouchersubdetail_id"));
                                    }
                                    record.set("deleted", true);
                                    record.set("statedata", 'delete');

                                    var storeselected = record.data;
                                      // Delete yang new
                                    var substoredata = me.localStore.substore;
                                    substoredata.forEach(function (item, index) {
                                        if (storeselected.indexdata == item.indexdata && storeselected.indexsubdata == item.indexsubdata) {
                                            if (index > -1) {
                                                substoredata.splice(index, 1);
                                            }
                                        }
                                    });

                                }
                            });
                            if (me.paramdetail.stateform == 'update') {
                                me.iddetailvalue_v = me.iddetailvalue;
                            }

                            me.dataValidateSubDetailstore();


                        } else {

                              //reset sub                       
                            storesub.each(function (record, id) {
                                if (record.get("kelsub_id") !== kelsub_id_h) {
                                    record.beginEdit();
                                    console.log(record);
                                    record.set("kelsub_id", kelsub_id_h);
                                    record.set("kelsub", kelsub);
                                    record.set("subgl_id", 0);
                                    record.set("subcode", "");
                                    record.set("code", "");
                                    record.set("code1", "");
                                    record.set("code2", "");
                                    record.set("code3", "");
                                    record.set("code4", "");
                                    record.endEdit();
                                    storesub.commitChanges();
                                }
                            });

                            if (me.paramdetail.stateform == 'update') {
                                me.iddetailvalue_v = me.iddetailvalue;
                            }

                            me.dataValidateSubDetailstore();

                        }
                    },
                    icon: Ext.Msg.QUESTION
                });

            }
        }
    },
    setDataSubDetailAftersave: function () {
        var me, store, counter;
        me      = this.getMe();
        store   = me.getGridsubdetail().getStore();
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
        var me,           status, returndata, pd, grid, store, filter = '';
            me           = this.getMe();
            pd           = me.paramdetail;
            pd.checkdata = false;
            grid         = me.getGriddetail();
            store        = grid.getStore();
        store.each(function (record) {
            if (record.data['voucher_id'] == pd.row.voucher_id &&
                record.data['coa_id']    == pd.row.coa_id &&
                record.data['indexdata'] == pd.row.indexdata
            ) {
                pd.checkdata = true;
            }
        });
    },
    Checkdatadesc: function () {
        var me,          status, returndata, p, grid, store, filter = '';
            me          = this.getMe();
            p           = me.paramdesc;
            p.checkdata = false;
            grid        = me.getGriddetail();
            store       = grid.getStore();
        store.each(function (record) {
            if (record.data['voucher_id'] == p.row.voucher_id &&
                record.data['indexdata']  == p.row.indexdata &&
                record.data['posting_no'] == p.row.posting_no &&
                record.data['receipt_no'] == p.row.receipt_no &&
                record.data['code']       == p.row.code
            ) {
                p.checkdata = true;
            }
        });
    },
    Checksubdatadetail: function () {
        var me,          status, returndata, p, grid, store, filter = '';
            me          = this.getMe();
            p           = me.paramsubdetail;
            p.checkdata = false;
            grid        = me.getGridsubdetail();
            store       = grid.getStore();
        store.each(function (record) {
            if (record.data['voucher_id'] == p.row.voucher_id &&
                record.data['voucherdetail_id'] == p.row.voucherdetail_id &&
                record.data['coa_id']           == p.row.coa_id &&
                record.data['kelsub_id']        == p.row.kelsub_id &&
                record.data['subgl_id']         == p.row.subgl_id &&
                record.data['indexdata']        == p.row.indexdata
            ) {
                p.checkdata = true;
            }
        });
    },
    Checkbalanceheaderdetail: function () {
        var me, pd, formheader, formdetail, storedetail, countdetail,
            amount, totaldetail, amountdetail, balance, flagbalance, message;
        me           = this.getMe();
        pd           = me.paramdetail;
        formheader   = me.getFormdata();
        formdetail   = me.getFormdatadetail();
        storedetail  = me.getGriddetail().getStore();
        amount       = me.unMask(me.getVal(formheader, 'amount', 'value'));
        amountdetail = me.unMask(me.getVal(formdetail, 'amount', 'value'));
        countdetail  = storedetail.getCount();
        if (countdetail > 0) {

              //totaldetail = storedetail.sum("amount");
            var sumamount = 0;
            storedetail.each(function (record, index) {
                sumamount = sumamount + parseFloat(record.get("amount").replace(/,/g, ''));
            });
            totaldetail = sumamount;

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
            message     = 'Total detail coa more greater than Amount header';
        } else {
            flagbalance = 1;
            message     = 'data normal';
        }
        return { "flagbalance": flagbalance, "message": message }
    },
    Checkbalanceheaderdetailsub: function () {
        var me, p, formheader, formdetail, formsubdetail, storesubdetail, countsubdetail,
            amount, pd, totalsubdetail, amountsubdetail, balance, flagbalance, message,
            gridsubdetail;
        me              = this.getMe();
        pd              = me.paramdetail;
        p               = me.paramsubdetail;
        formheader      = me.getFormdata();
        formdetail      = me.getFormdatadetail();
        formsubdetail   = me.getFormdatasubdetail();
        gridsubdetail   = me.getGridsubdetail();
        storesubdetail  = gridsubdetail.getStore();
        countsubdetail  = storesubdetail.getCount();
        amountsubdetail = me.unMask(me.getVal(formsubdetail, 'amount', 'value'));
        amount          = me.balancecoa;
        if (countsubdetail > 0) {
            storesubdetail.clearFilter(true);
            storesubdetail.filter(me.idheaderfield, me.idheadervalue);
            storesubdetail.filter(me.iddetailfield, me.iddetailvalue);
            storesubdetail.filter('deleted', false);

              // totalsubdetail = storesubdetail.sum("amount");
            var sumamount = 0;
            storesubdetail.each(function (record, index) {
                sumamount = sumamount + parseFloat(record.get("amount").replace(/,/g, ''));
            });
            totalsubdetail = sumamount;

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
            message     = 'Total sub detail coa more greater than Amount in Coa';
        } else {
            flagbalance = 1;
            message     = 'data normal';
        }
        return { "flagbalance": flagbalance, "message": message }
    },
    dataSavecustome: function () {
        var me                 = this.getMe(),
            form               = me.getFormdata(),
            formdata           = form.getForm(),
            state              = form.up('window').state.toLowerCase(),
            is_upload          = parseInt(form.down('[name=is_upload]').getValue()),
            error              = false,
            errorpajak         = 0,
            reasonnoattachment = '',
            flag_noattachment,
            paramdata,
            rowdata,
            duedate,
            validation,
            store,
            storedesc                 = Ext.data.StoreManager.lookup('VDRequestdesc'),
            storedetail               = Ext.data.StoreManager.lookup('VDRequestdetail'),
            storesubdetail            = Ext.data.StoreManager.lookup('VDRequestsubdetail'),
            storekasbondetail         = Ext.data.StoreManager.lookup('VDRequestkasbondetail'),
            storeattachmentdetail     = Ext.data.StoreManager.lookup('VDRequestattachmentdetail'),
            storelistapproval         = Ext.data.StoreManager.lookup('VDRequestapprovaldetail'),
            counterdesc               = storedesc.getCount(),
            counterdetail             = storedetail.getCount(),
            countersubdetail          = storesubdetail.getCount(),
            counterkasbondetail       = storekasbondetail.getCount(),
            counterattachmentdetail   = storeattachmentdetail.getCount(),
            counterlistapproval       = storelistapproval.getCount(),
            storedep                  = me.getStore("Department"),
            is_depvalid               = 0,
            komisiklaim_ids           = parseInt(form.down('[name=komisiklaim_ids]').getValue()),
            purchaseletter_reward_ids = parseInt(form.down('[name=purchaseletter_reward_ids]').getValue()),
            department_id             = form.down('[name=department_id]').getValue(),
            kasbondept_id             = parseInt(form.down('[name=kasbondept_id]').getValue()),
            kasbondept_id_fixed       = parseInt(form.down('[name=kasbondept_id]').getValue()),
            is_pjk                    = form.down("[name=is_pjk]").getValue(),
            paymentmethod_id          = me.getFormdata().down("[name=paymentmethod_id]").getValue(),
            vendor_bankacc_id         = me.getFormdata().down("[name=vendor_bankacc_id]").getValue(),
            dataflow                  = "O",
            type_vendor               = form.down('[name=type_vendor]').getValue(),
            customer_id               = parseInt(form.down('[name=customer_id]').getValue()),
            vendor_id                 = parseInt(form.down('[name=vendor_id]').getValue()),
            am                        = form.down('[name=amount]').getValue().replace(/,/g, ''),
            komisiklaim_amount        = form.down('[name=komisiklaim_amount]').getValue().replace(/,/g, ''),
            v_amount                  = parseFloat(am),
            komisiklaim_amount        = parseFloat(komisiklaim_amount),
            reward_amount             = form.down('[name=reward_amount]').getValue().replace(/,/g, ''),
            reward_amount             = parseFloat(reward_amount),
            linerestrictprojects      = [3, 4034, 4036, 4065, 11119],
            error_checkbudget         = 0,
            msg_checkbudget           = '',
            voucher_date              = form.down("[name=voucher_date]").getValue(),
            month_name                = voucher_date.toLocaleString('default', { month: 'long' }),
            storedetailarr            = [],
            storekasbondetailarr      = [],
            flag_sub                  = 0,
            msg_sub                   = '';
        
        storedep.each(function (record) {
            if (record.data['department_id'] == department_id) {
                is_depvalid = 1;
            }
        });

        if (is_depvalid == 0) {
            me.buildWarningAlert('Invalid Department!');
            me.setStoreDeptuserPt();
            return 0;
        }

        if (is_pjk === true && counterkasbondetail == 0) {
            me.buildWarningAlert('Tidak ada kasbon yang ditebus. <br>Harap cek tab Multi Kasbon / field Kasbon No.');
            return 0;
        }

        // DIUBAH VALIDASI COUNTER KASBON GAK HARUS = 0; LIAT AJA COMMENT SEBELUMNYA
        if (counterdetail > me.global_param['MAX_ROW_VOUCHER']['value']/* && counterkasbondetail==0*/) {
            me.buildWarningAlert('Maksimum baris voucher = ' + me.global_param['MAX_ROW_VOUCHER']['value']);
            return 0;
        }

        for (var i = 0; i < counterkasbondetail; i++) {
            if (parseInt(storekasbondetail.data.items[i].data.pay_amount) == 0 || storekasbondetail.data.items[i].data.pay_amount == '' || storekasbondetail.data.items[i].data.pay_amount == null) {
                if (me.getFormdata().down("[name=project_id]").getValue() != 3016) {
                    me.buildWarningAlert("Amount Pay from Multi Kasbon tab must be greater than 0.");
                    return false;
                }
            }
        }

        if (Ext.getCmp("radio1_b123").checked === true) {
            dataflow = "I";
        } else {
            dataflow = "O";
        }

        if ((state == 'create' || state == 'update') && dataflow == "O" && me.global_param['approval_rules']['value'] == "hod_approve" && (paymentmethod_id == 7 || paymentmethod_id == 2)) {
            if (vendor_bankacc_id == '' || vendor_bankacc_id == null || vendor_bankacc_id == 0) {
                me.buildWarningAlert("Bank Acc. No. must be filled.");
                return false;
            }
        }

          //validasi cutomer / vendor
        if (type_vendor == 'customer') {
            form.down('[name=vendor_id]').setValue(0);
            if (customer_id == 0 || isNaN(customer_id)) {
                me.buildWarningAlert('Customer harus diisi!');
                return 0;
            }
        } else {
            form.down('[name=customer_id]').setValue(0);
            if (vendor_id == 0 || isNaN(vendor_id)) {
                me.buildWarningAlert('Vendor harus diisi!');
                return 0;
            }
        }

        if (komisiklaim_ids > 0) {

            if (v_amount !== komisiklaim_amount) {
                me.buildWarningAlert('Nilai Komisi Harus Cair Sebesar Rp ' + accounting.formatMoney(komisiklaim_amount));
                return 0;
            }

        }

        if (purchaseletter_reward_ids > 0) {

            if (v_amount > reward_amount && me.is_over_target == 0) {
                me.buildWarningAlert('Nilai Reward Harus Cair Sebesar Rp ' + accounting.formatMoney(reward_amount));
                return 0;
            }

        }

        if (counterdetail == 0 && is_upload == 0) {
            me.buildWarningAlert('No details inserted!');
            return 0;
        }

        if (am < 0) {
            me.buildWarningAlert('Amount should be a positive value!');
            return 0;
        }
        
        /*Cek Multiline Description
        Berlaku untuk proyek: 
        - Citra Raya (project_id 3)
        - Citra Maja Raya (project_id 4034)
        - Citra Garden City Malang (project_id 4036)
        */
        if (linerestrictprojects.includes(me.project_id)) {

            var totallines = 0;
            storedetail.each(function (record, index) {
                var remarks    = record.get("remarks");
                var lines      = remarks.split(/\r\n|\r|\n/);
                    totallines = totallines + lines.length;
            });
            if (totallines > 7 && me.is_multi_kasbon == 0) {
                me.buildWarningAlert('Deskripsi terhitung : ' + totallines + ' baris.<br>Baris deskripsi yang diizinkan adalah 7 baris.');
                return 0;
            }

        }
        
        /*Validate multikasbon*/
        storedetail.each(function (record, index) {
            kasbondept_id   = record.get("kasbondept_id");
            statedatadetail = record.get("statedata");
            if (statedatadetail !== 'delete' && kasbondept_id > 0) {
                storedetailarr.push({
                    kasbondept_id: kasbondept_id,
                    amount       : accounting.unformat(record.get("amount")),
                    cashbon_no   : record.get("cashbon_no"),
                    dataflow     : record.get("dataflow"),
                    deleted      : record.get("deleted")
                });
            }
        });

        storekasbondetail.each(function (record, index) {
            kasbondept_id   = record.get("kasbondept_id");
            statedatadetail = record.get("statedata");
            if (statedatadetail !== 'delete' && kasbondept_id > 0) {
                storekasbondetailarr.push({
                    kasbondept_id: kasbondept_id,
                    pay_amount   : accounting.unformat(record.get("pay_amount")),
                    cashbon_no   : (record.get("cashbon_no") == "") ? record.get("voucher_no"): record.get("cashbon_no"),
                    deleted      : record.get("deleted")
                });
            }
        });


        storekasbondetailarr.forEach(function (rec) {
            var amountdetail = 0,
                amountkasbon = rec.pay_amount,
                cashbon_no   = rec.cashbon_no,
                t_amountdetail,
                idexist = 0;
            storedetailarr.forEach(function (recb) {
                if (recb.kasbondept_id == rec.kasbondept_id) {
                    if (recb.dataflow == me.in_out) {
                        t_amountdetail = recb.amount * -1;
                    } else {
                        t_amountdetail = recb.amount;
                    }
                    amountdetail = amountdetail + t_amountdetail;
                    idexist      = 1;
                }
            });
            if (idexist == 0) {
                me.buildWarningAlert(cashbon_no + ' Tidak ada di Grid Voucher');
                error = true;
                return 0;
            }
            if (amountkasbon != amountdetail) {
                me.buildWarningAlert('Total pemakaian amount <br> - ' + cashbon_no
                    + ' tidak sama dengan amount pay : ' + accounting.formatMoney(amountkasbon));
                error = true;
                return 0;
            }
        });

        if (kasbondept_id_fixed == 0 || isNaN(kasbondept_id_fixed)) {
            storedetailarr.forEach(function (recb) {
                var idexist = 0;
                if (recb.cashbon_no !== "") {
                    storekasbondetailarr.forEach(function (rec) {
                        if (recb.kasbondept_id == rec.kasbondept_id) {
                            idexist = 1;
                        }
                    });
                    if (idexist == 0) {
                        me.buildWarningAlert(recb.cashbon_no + ' Tidak ada di Grid Multi Kasbon');
                        error = true;
                        return 0;
                    }
                }
            });
        }

          // SEFTIAN ALFREDO 21/12/2021
        if ((me.project_id == 1 || me.global_param['approval_rules']['value'] == 'hod_approve') && counterattachmentdetail == 0) {
            flag_noattachment = true;
        }

        if (me.global_param['approval_rules']['value'] == 'hod_approve') {

            if (counterlistapproval == 0) {

                var filtered = me.global_param['hod_approve_dept_exclusion']['value'].filter(function (el) {
                    return (el == department_id);
                });

                if (filtered.length == 0) {
                    me.buildWarningAlert('Tidak ada data di Grid Approval. Silahkan periksa kembali');
                    error = true;
                    me.getFormdata().down("[name=voucherrequesttab]").setActiveTab(3);
                    return 0;
                }
            }else{
                var is_pajak = form.down("[name=is_pajak]").getValue(),
                    flag_tax = 0;
                
                    storelistapproval.each( function (record) {
                    if (record.get('approval_type') == 'tax_approve') {
                        flag_tax = 1
                    }
                });

                if (is_pajak == 1 && flag_tax == 0) {
                    console.log('Voucher ini membutuhkan approval pajak. Silahkan cek terlebih dahulu pada Tab Approval');
                    /* me.buildWarningAlert('Voucher ini membutuhkan approval pajak. Silahkan cek terlebih dahulu pada Tab Approval');
                    return 0; */
                }
            }            
        }

          // VALIDASI GENERATE PAJAK
        storedetail.each(function (record, idx) {
            var result_budget,
                checkppn         = record.get('checkppn'),
                checkpph         = record.get('checkpph'),
                amount           = accounting.unformat(record.get("amount")),
                cashflowtype     = record.get('cashflowtype'),
                setupcashflow_id = record.get('setupcashflow_id');

            if (state == 'create') {
                if (me.flaggeneratepajak == 1 && (checkppn || checkpph)) {
                    errorpajak++;
                      // console.log('BUAT BARU BELUM GENERATE');
                }
            } else {
                var coapajaks = me.global_param['coa_pajak']['value'];

                if ((checkppn || checkpph) && !coapajaks.includes(record.get('coa'))) {
                      // console.log('EDIT BELUM GENERATE');
                    errorpajak++;
                } else {
                    errorpajak = 0;
                }

                if (me.paramdetail.changeamount > 0) {
                      // console.log('GANTI AMOUNT');
                    errorpajak++;
                }
            }

            result_budget = me.checkbudgetcf(setupcashflow_id, amount);

            if (result_budget.result == 1) {
                error_checkbudget++;
                msg_checkbudget = msg_checkbudget + 'Casflow ' + cashflowtype + ' pada budget' + result_budget.msg + ' bulan ' + month_name + ' sudah melebihi batas. <br>';
            }
        });
        if (errorpajak > 0) {
            me.buildWarningAlert('Silahkan generate pajak terlebih dahulu');
            return 0;
        }

        // VALIDASI SUB
        /* var localstore = me.localStore.substore;
        storedetail.each(function (rec) {
            if (rec.get('kelsub_id') > 0) {
                var point                = false,
                    amountdetail         = accounting.unformat(rec.get("amount")),
                    amountsub            = 0,
                    vouchersubdetail_ids = [];

                if (state == 'create') {
                    console.log(rec);
                    if (localstore.length > 0) {
                        
                        localstore.forEach( function (val, idx) {
                            if (rec.get('indexdata') == val.indexdataheader) {
                                point = true;
                                amountsub += parseFloat(accounting.unformat(val.amount));
                                vouchersubdetail_ids.push(parseInt(val.vouchersubdetail_id));
                            }
                        });
                    }
                    
                    if (point == false) {
                        flag_sub = 1;
                        msg_sub = msg_sub + 'Sub untuk detail ('+ rec.get('indexdata') + '. ' + rec.get('coa') + ' ' + rec.get('coaname') + ' ' + rec.get('remarks') + ') tidak tersedia. Silahkan cek kembali detail tsb. <br>';
                    }else{
                        if (amountdetail != amountsub) {
                            flag_sub = 1;
                            msg_sub = msg_sub + 'Sub untuk detail ('+ rec.get('indexdata') + '. ' + rec.get('coa') + ' ' + rec.get('coaname') + ' ' + rec.get('remarks') + ') jumlah amountnya berbeda. Silahkan cek kembali detail tsb. <br>';
                        }else{
                            console.log('success');
                        }
                    }
                }else{
                    console.log(rec);
                    if (localstore.length > 0) {

                        localstore.forEach( function (val, idx) {
                            console.log(val);

                            if (val.statedata == 'create' && rec.get('indexdata') == val.indexdataheader) {
                                point = true;
                                amountsub += parseFloat(accounting.unformat(val.amount));
                                vouchersubdetail_ids.push(parseInt(val.vouchersubdetail_id));
                            }

                            if (val.statedata == 'update' && rec.get('voucherdetail_id') == val.voucherdetail_id) {
                                point = true;
                                amountsub += parseFloat(accounting.unformat(val.amount));
                                vouchersubdetail_ids.push(parseInt(val.vouchersubdetail_id));
                            }
                        });
                    }

                    if (rec.get('voucherdetail_id') > 0) {
                        Ext.Ajax.request({
                            url   : 'cashier/vdrequest/subdetailread',
                            method: 'POST',
                            async : false,
                            params: {
                                voucherdetail_id: rec.get('voucherdetail_id'),
                                voucher_id      : rec.get('voucher_id'),
                                page            : 1,
                                start           : 0,
                                limit           : 25,
                                hideparam       : 'default'
                            },
                            success: function (response) {
                                var data = Ext.JSON.decode(response.responseText);
                                var record_sub = data.data;

                                console.log(record_sub);
                                if (record_sub.length > 0) {
                                    record_sub.forEach( function (val, idx) {
                                        console.log(val, vouchersubdetail_ids);
                                        if (val.statedata == 'view' && !vouchersubdetail_ids.includes(val.vouchersubdetail_id)) {
                                        
                                            if (rec.get('voucherdetail_id') == val.voucherdetail_id) {
                                                point = true;
                                                amountsub += parseFloat(accounting.unformat(val.amount));
                                            }
                                        }
                                    });   
                                }
                            }
                        });                        
                    }

                    console.log(amountdetail, amountsub);

                    if (point == false) {
                        flag_sub = 1;
                        msg_sub += 'Sub untuk detail ('+ rec.get('indexdata') + '. ' + rec.get('coa') + ' ' + rec.get('coaname') + ' ' + rec.get('remarks') + ') tidak tersedia. Silahkan cek kembali detail tsb. <br>';
                    }else{
                        if (amountdetail != amountsub) {
                            flag_sub = 1;
                            msg_sub += 'Sub untuk detail ('+ rec.get('indexdata') + '. ' + rec.get('coa') + ' ' + rec.get('coaname') + ' ' + rec.get('remarks') + ') jumlah amountnya berbeda. Silahkan cek kembali detail tsb. <br>';
                        }else{
                            console.log('success');
                        }
                    }
                }
            }
        }); */

        if (flag_sub > 0) {
            console.log(msg_sub);
            // me.buildWarningAlert(msg_sub);
            // return 0;
        }

        if (error) {
            return 0;
        }

        if (error_checkbudget > 0) {
            Ext.Msg.confirm('Confirmation', msg_checkbudget + 'Lanjutkan ? ', function (btnBudget) {
                if (btnBudget == 'yes') {
                    if (me.project_id == 1 || me.global_param['approval_rules']['value'] == 'hod_approve') {

                        if (flag_noattachment && state == 'create') {

                            Ext.Msg.show({
                                title  : "WARNING",
                                buttons: Ext.Msg.YESNO,
                                icon   : Ext.Msg.WARNING,
                                msg    : "Apakah anda ingin menyertakan attachment?",
                                modal  : true,
                                fn     : function (btn) {
                                    if (btn == 'yes') {
                                        me.getFormdata().down("[name=voucherrequesttab]").setActiveTab(2);
                                        return 0;
                                    } else {
                                        var confirmBox = Ext.Msg.confirm({
                                            title   : "Reason",
                                            buttons : Ext.Msg.YESNO,
                                            icon    : Ext.Msg.INFO,
                                            msg     : 'Berikan Alasan<br><textarea type="text" id="reasonnoattachment" name="reasonnoattachment"></textarea>',
                                            closable: true,
                                            fn      : function (btn) {
                                                if (btn == 'yes') {
                                                    reasonnoattachment = $('#reasonnoattachment').val();

                                                    if (reasonnoattachment != '') {
                                                        if (reasonnoattachment.length < 5) {
                                                            var errorBox = Ext.Msg.show({
                                                                title: 'WARNING',
                                                                msg: 'Masukan alasan kenapa voucher tanpa attachment minimal 5 karakter',
                                                                buttons: Ext.Msg.OK,
                                                                icon: Ext.Msg.WARNING
                                                            });

                                                            Ext.Function.defer( function () {
                                                                errorBox.zIndexManager.bringToFront(errorBox);
                                                            }, 100);
                                                            return false;
                                                        }else{
                                                            if (formdata.isValid()) {
                                                                me.processSavecustome(state, form, formdata, is_upload, reasonnoattachment);
                                                            }
                                                        }
                                                    } else {
                                                        me.getFormdata().down("[name=voucherrequesttab]").setActiveTab(2);
                                                        return 0;
                                                    }
                                                } else {
                                                    me.getFormdata().down("[name=voucherrequesttab]").setActiveTab(2);
                                                    return 0;
                                                }
                                            }
                                        });

                                        Ext.Function.defer(function () {
                                            confirmBox.zIndexManager.bringToFront(confirmBox);
                                        }, 100);
                                    }
                                }
                            });

                        } else {

                            if (formdata.isValid()) {
                                me.processSavecustome(state, form, formdata, is_upload, reasonnoattachment);
                            }
                        }

                    } else {
                        if (formdata.isValid()) {
                            me.processSavecustome(state, form, formdata, is_upload, reasonnoattachment);
                        }
                    }
                }
            });
        } else {
            if (me.project_id == 1 || me.global_param['approval_rules']['value'] == 'hod_approve') {

                if (flag_noattachment && state == 'create') {

                    Ext.Msg.show({
                        title  : "WARNING",
                        buttons: Ext.Msg.YESNO,
                        icon   : Ext.Msg.WARNING,
                        msg    : "Apakah anda ingin menyertakan attachment?",
                        modal  : true,
                        fn     : function (btn) {
                            if (btn == 'yes') {
                                me.getFormdata().down("[name=voucherrequesttab]").setActiveTab(2);
                                return 0;
                            } else {
                                var confirmBox = Ext.Msg.confirm({
                                    title   : "Reason",
                                    buttons : Ext.Msg.YESNO,
                                    icon    : Ext.Msg.INFO,
                                    msg     : 'Berikan Alasan<br><textarea type="text" id="reasonnoattachment" name="reasonnoattachment"></textarea>',
                                    closable: true,
                                    fn      : function (btn) {
                                        if (btn == 'yes') {
                                            reasonnoattachment = $('#reasonnoattachment').val();

                                            if (reasonnoattachment != '') {
                                                if (reasonnoattachment.length < 5) {
                                                    var errorBox = Ext.Msg.show({
                                                        title: 'WARNING',
                                                        msg: 'Masukan alasan kenapa voucher tanpa attachment minimal 5 karakter',
                                                        buttons: Ext.Msg.OK,
                                                        icon: Ext.Msg.WARNING
                                                    });

                                                    Ext.Function.defer( function () {
                                                        errorBox.zIndexManager.bringToFront(errorBox);
                                                    }, 100);
                                                    return false;
                                                }else{
                                                    if (formdata.isValid()) {
                                                        me.processSavecustome(state, form, formdata, is_upload, reasonnoattachment);
                                                    }
                                                }
                                            } else {
                                                me.getFormdata().down("[name=voucherrequesttab]").setActiveTab(2);
                                                return 0;
                                            }
                                        } else {
                                            me.getFormdata().down("[name=voucherrequesttab]").setActiveTab(2);
                                            return 0;
                                        }
                                    }
                                });

                                Ext.Function.defer(function () {
                                    confirmBox.zIndexManager.bringToFront(confirmBox);
                                }, 100);
                            }
                        }
                    });

                } else {

                    if (formdata.isValid()) {
                        me.processSavecustome(state, form, formdata, is_upload, reasonnoattachment);
                    }
                }

            } else {
                if (formdata.isValid()) {
                    me.processSavecustome(state, form, formdata, is_upload, reasonnoattachment);
                }
            }
        }
    },
    processSavecustome: function (state, form, formdata, is_upload, reasonnoattachment = null) {
        var me                      = this.getMe(),
            store                   = me.getGrid().getStore()
            storedesc               = Ext.data.StoreManager.lookup('VDRequestdesc'),
            storedetail             = Ext.data.StoreManager.lookup('VDRequestdetail'),
            storekasbondetail       = Ext.data.StoreManager.lookup('VDRequestkasbondetail'),
            storeattachmentdetail   = Ext.data.StoreManager.lookup('VDRequestattachmentdetail'),
            storelistapproval       = Ext.data.StoreManager.lookup('VDRequestapprovaldetail'),
            counterdesc             = storedesc.getCount(),
            counterdetail           = storedetail.getCount(),
            counterkasbondetail     = storekasbondetail.getCount(),
            counterattachmentdetail = storeattachmentdetail.getCount(),
            counterlistapproval     = storelistapproval.getCount(),
            valuedata               = formdata.getValues(),
            addingRecord            = false,
            idProperty              = store.getProxy().getReader().getIdProperty(),
            rec                     = store.getById(parseInt(formdata.findField(idProperty).getValue(), 10));

        resetTimer();
        if (me.statereal == 'create') {
            me.flaggeneratevoucherno = '1';
            me.generateVoucherno();

            if (!me.prefixdept) {
                Ext.Msg.alert('Info', 'Voucher number not generated, please select your department again.');
                return false;
            }

        }

        me.unformatCurrencyFormdata(me, form);
        valuedata['remainingkasbon'] = parseFloat(valuedata['remainingkasbon']);
        valuedata["project_id"]         = me.project_id;
        valuedata["reasonnoattachment"] = reasonnoattachment;
        if (is_upload == 1) {
            valuedata["cashier_note"] = 'upload';
        }

        valuedata['vendor_bank_account_no'] = '';
        if (typeof form.down("[name=vendor_bankacc_id]").valueModels[0] != 'undefined') {
            valuedata['vendor_bank_account_no'] = form.down("[name=vendor_bankacc_id]").valueModels[0].data.bank_account_no;
        }

        form.up('window').body.mask('Saving data, please wait ...');
        state = form.up('window').state.toLowerCase();
        switch (state) {
            case 'create': 
                  //duedate = me.getFormdata().down("[name=due_date]").getValue();
                  //validation = me.checkRangedate(me.dateNow, duedate);
                  //if (validation == 'notvalid') {
                  //    me.buildWarningAlert('Due Date Cannot Backdate..');
                  //    return false;
                  //}
                store.add(valuedata);
                addingRecord           = true;
                valuedata['hideparam'] = state;
                me.valueform           = valuedata;
                break;
            case 'update': 
                rec.beginEdit();
                rec.set(valuedata);
                rec.endEdit();
                valuedata['hideparam'] = state;
                me.valueform           = valuedata;
                break;
            default: 
                return;
        }

        Ext.Ajax.request({
            url   : me.urldata + state,
            method: 'POST',
            params: {
                data: Ext.encode(valuedata)
            },
            success: function (response) {
                var resjsonheader    = Ext.JSON.decode(response.responseText);
                var rowjsonheader    = resjsonheader.data;
                var validheader      = resjsonheader.success;
                var paramheader      = resjsonheader.parameter;
                var msgheader        = resjsonheader.msg;
                var restotal         = resjsonheader.total;
                    me.idheadervalue = rowjsonheader.idheader;
                if (validheader == 'true' && is_upload == 0) {
                    if (counterdesc > 0) {
                        me.Savedesc(me, state);
                    }
                    if (counterdetail > 0) {
                        me.Savedetail(me, state);
                    }
                    if (counterkasbondetail > 0) {
                        me.Savekasbondetail(me, state);
                    }
                    if (counterattachmentdetail > 0) {
                        me.Saveattachmentdetail(me, state);
                    }
                    if (counterlistapproval > 0) {
                        me.Saveapproval(me, state);
                    }
                    store.commitChanges();
                    me.messagedata = msgheader;
                    //me.alertFormdataSuccess();
                    me.alertFormdataSuccessSync(valuedata.status);
                } else if (validheader == 'true' && is_upload == 1) {
                    store.commitChanges();
                    me.messagedata = msgheader;
                    me.UploadVdrequest();
                } else {
                    me.messagedata = msgheader;
                    me.alertFormdataFailed();
                }
            },
            failure: function (response) {
                me.messagedata = 'data error';
                me.alertFormdataFailed();
                throw me.messagedata;
            }
        });
    },
    setDataAftersave: function () {
        var me, store, counter;
        me      = this.getMe();
        store   = me.getGrid().getStore();
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
    Savedesc: function (that, state) {
        var me, store, counter, id, statedata, data, action,
            resjson, rowjson, valid, msg, parameter;
        me    = that;
        store = me.getStore('VDRequestdesc');
        store.clearFilter(true);
        if (state == 'create') {
            store.filter(me.idheaderfield, '0');
        } else {
            store.filter(me.idheaderfield, me.idheadervalue);
        }

        counter = store.getCount();
        if (counter > 0) {
            store.each(function (record, index) {
                var i         = index + 1;
                    id        = record.get("voucherdesc_id");
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

                data                   = record['data'];
                data[me.idheaderfield] = me.idheadervalue;
                data['parametersql']   = action;
                data['hideparam']      = 'desc' + action;
                if (me.urldesc !== me.urldesc + statedata) {
                    var executedata = 0;
                    if (statedata == 'create' || statedata == 'update') {
                        executedata = 1;
                    }
                    if (statedata == 'delete' && id !== 0) {
                        executedata = 1;
                        action      = 'delete';
                    }

                    if (executedata == 1) {
                        Ext.Ajax.request({
                            url   : me.urldesc + action,
                            method: 'POST',
                            async : false,
                            params: {
                                data: Ext.encode(data)
                            },
                            success: function (response) {
                                resjson   = Ext.JSON.decode(response.responseText);
                                rowjson   = resjson.data;
                                valid     = resjson.success;
                                parameter = resjson.parameter;
                                msg       = resjson.msg;
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
    Savedetail: function (that, state) {
        var me, storedetail, counterdetail, iddetail, statedatadetail, datadetail, actiondetail,
            resjsondetail, rowjsondetail, validdetail, msgdetail, parameterdetail, kelsub_id,
            storesubdetail, countersubdetail, iddetail_fixed;
        me          = that;
        storedetail = Ext.data.StoreManager.lookup('VDRequestdetail');
        storedetail.clearFilter(true);
        counterdetail  = storedetail.getCount();
        storesubdetail = Ext.data.StoreManager.lookup('VDRequestsubdetail');
          //countersubdetail = storesubdetail.getCount();

          //JIKA CREATE / UPDATE
        var upstate = me.getFormdata().up('window').state.toLowerCase();

        if (upstate == 'create') {
            storesubdetail.removeAll();
            substoredata = me.localStore.substore;
            for (index = 0; index < substoredata.length; ++index) {
                storesubdetail.add(substoredata[index]);
            }
        } else {
            substoredata = me.localStore.substore;
            for (index = 0; index < substoredata.length; ++index) {
                storesubdetail.add(substoredata[index]);
            }
        }

          //count again after fill
        countersubdetail = storesubdetail.getCount();

        var i = 0;
        if (counterdetail > 0) {

            storedetail.each(function (record, index) {
                i                     = index + 1;
                iddetail              = record.get("voucherdetail_id");
                indexdataheader_fixed = record.get("indexdataheader");
                statedatadetail       = record.get("statedata");
                if (state == 'create' && statedatadetail == 'create') {
                    actiondetail = 'create';
                } else if (state == 'create' && statedatadetail == 'update') {
                    actiondetail = 'create';
                } else if (state == 'update' && statedatadetail == 'create') {
                    actiondetail = 'create';
                } else if (state == 'update' && statedatadetail == 'update') {
                    actiondetail = 'update';
                }

                if (iddetail == 0) {
                    actiondetail = 'create';
                }

                datadetail                   = record['data'];
                datadetail[me.idheaderfield] = me.idheadervalue;
                datadetail['parametersql']   = actiondetail;
                datadetail['hideparam']      = 'detail' + actiondetail;


                if (me.urldetail !== me.urldetail + statedatadetail) {
                    var executedata = 0;
                    if (statedatadetail == 'create' || statedatadetail == 'update') {
                        executedata = 1;
                    }
                    if (statedatadetail == 'delete' && iddetail !== 0) {
                        executedata  = 1;
                        actiondetail = 'delete';
                    }

                    if (executedata == 1) {

                        Ext.Ajax.request({
                            url   : me.urldetail + actiondetail,
                            method: 'POST',
                            async : false,
                            params: {
                                data: Ext.encode(datadetail)
                            },
                            success: function (response) {
                                var coa_id, indexdata;
                                try {
                                    resjsondetail = Ext.JSON.decode(response.responseText);

                                    rowjsondetail = resjsondetail.data;
                                    validdetail   = resjsondetail.success;

                                    if (validdetail == "false" || validdetail == false) {
                                        me.messagedata = resjsondetail.msg;
                                        me.alertFormdataFailed();
                                        throw me.messagedata;
                                    }

                                }
                                catch (err) {
                                    me.messagedata = 'Details are not saved';
                                    me.alertFormdataFailed();
                                    throw me.messagedata;
                                }

                                if (typeof resjsondetail.data === "undefined") {
                                    if (typeof resjsondetail.success === "undefined") {
                                        me.alertFormdataFailed();
                                        throw me.messagedata;
                                    } else {
                                        if (resjsondetail.success == "false") {
                                            me.alertFormdataFailed();
                                            throw me.messagedata;
                                        }
                                    }
                                }

                                    rowjsondetail    = resjsondetail.data;
                                    validdetail      = resjsondetail.success;
                                    parameterdetail  = resjsondetail.parameter;
                                    msgdetail        = resjsondetail.msg;
                                var voucherdetail_id = 0;

                                if (typeof rowjsondetail === "undefined") {
                                    me.iddetailvalue = 0;
                                } else {
                                    me.iddetailvalue = rowjsondetail.iddetail;
                                    voucherdetail_id = rowjsondetail.iddetail;
                                }

                                if (parameterdetail == 'detailcreate') {
                                    kelsub_id = rowjsondetail[6][0].kelsub_id;
                                    coa_id    = rowjsondetail[6][0].coa_id;
                                    indexdata = rowjsondetail[6][0].indexdata;
                                } else if (parameterdetail == 'detailupdate') {
                                    kelsub_id = rowjsondetail[4][0].kelsub_id;
                                    coa_id    = rowjsondetail[4][0].coa_id;
                                    indexdata = rowjsondetail[4][0].indexdata;
                                }

                                if (parameterdetail == 'detailcreate' || parameterdetail == 'detailupdate') {
                                    if (kelsub_id !== 0 && countersubdetail == 0) {
                                        me.messagedata = 'data error, sub ' + datadetail['coa'] + ' invalid';
                                        me.alertFormdataFailed();
                                        throw me.messagedata;
                                    }
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

                                        if (storedata.voucherdetail_id == iddetail) {
                                            return true;
                                        } else if (storedata.indexsubdata == indexdata) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    });

                                    //heres

                                    var indexdatas = [];
                                    var isloop = 0;

                                    storesubdetail.each(function (record, index) {

                                        iddetailsub = record.get("vouchersubdetail_id");
                                        indexdata_f = record.get("indexdata");
                                        statesubdetail = record.get("statedata");

                                        if (indexdatas.includes(indexdata_f)) {
                                            isloop = 1;
                                        } else {
                                            if (statesubdetail !== 'delete') {
                                                indexdatas.push(indexdata_f);
                                            }
                                        }

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

                                        /*iddetailsub = 0 maka create*/
                                        if (iddetailsub == 0) {
                                            actionsubdetail = 'create';
                                            datasubdetail['hideparam'] = 'subdetail' + actionsubdetail;
                                        }
                                        if (statesubdetail == "create" && iddetailsub > 0) {
                                            actionsubdetail = 'create';
                                            datasubdetail['hideparam'] = 'subdetail' + actionsubdetail;
                                        }

                                        if (me.urlsubdetail !== me.urlsubdetail + statesubdetail) {
                                            executedata = 0;
                                            if (statesubdetail == 'create' || statesubdetail == 'update') {
                                                executedata = 1;
                                            }
                                            if (statesubdetail == 'delete' && iddetailsub !== 0) {
                                                executedata = 1;
                                                actionsubdetail = 'delete';
                                            }

                                            //jika tidak sama maka jangan execute
                                            if (statesubdetail == 'create') {
                                                if (isloop == 1) {
                                                    executedata = 0;
                                                }
                                            }

                                            if (executedata == 1) {

                                                Ext.Ajax.request({
                                                    url: me.urlsubdetail + actionsubdetail,
                                                    method: 'POST',
                                                    async: false,
                                                    params: {
                                                        data: Ext.encode(datasubdetail)
                                                    },
                                                    success: function (response) {
                                                        var resjsonsubdetail, rowjsonsubdetail, validsubdetail, parametersubdetail, msgsubdetail;
                                                        try {
                                                            resjsonsubdetail = Ext.JSON.decode(response.responseText);
                                                            rowjsonsubdetail = resjsonsubdetail.data;
                                                            validsubdetail = resjsonsubdetail.success;
                                                            if (validsubdetail == "false") {
                                                                me.messagedata = resjsonsubdetail.msg;
                                                                me.resjsonsubdetail();
                                                                me.alertFormdataFailed();
                                                                throw me.messagedata;
                                                            }
                                                        }
                                                        catch (err) {
                                                            me.messagedata = 'SubDetails are not saved';
                                                            me.alertFormdataFailed();
                                                            throw me.messagedata;
                                                        }
                                                        rowjsonsubdetail = resjsonsubdetail.data;
                                                        validsubdetail = resjsonsubdetail.success;
                                                        parametersubdetail = resjsonsubdetail.parameter;
                                                        msgsubdetail = resjsonsubdetail.msg;
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
    Savekasbondetail: function (that, state) {
        var me, storekasbondetail, counterkasbondetail, iddetail, statedatadetail, datadetail, actiondetail,
            resjsondetail, rowjsondetail, validdetail, msgdetail, parameterdetail, kelsub_id,
            storesubdetail, countersubdetail;
        me                = that;
        storekasbondetail = Ext.data.StoreManager.lookup('VDRequestkasbondetail');
        storekasbondetail.clearFilter(true);
        counterkasbondetail = storekasbondetail.getCount();
          //JIKA CREATE / UPDATE
        var upstate = me.getFormdata().up('window').state.toLowerCase();

        var i = 0;
        if (counterkasbondetail > 0) {

            storekasbondetail.each(function (record, index) {
                i               = index + 1;
                iddetail        = record.get("kasbon_payment_id");
                statedatadetail = record.get("statedata");
                if (iddetail > 0 && statedatadetail == "") {
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

                if (iddetail == 0) {
                    actiondetail = 'create';
                }

                datadetail                   = record['data'];
                datadetail[me.idheaderfield] = me.idheadervalue;
                datadetail['parametersql']   = actiondetail;
                datadetail['hideparam']      = 'detailkasbon' + actiondetail;


                if (me.urldetail !== me.urldetail + statedatadetail) {
                    var executedata = 0;
                    console.log('statedatadetail');
                    if (statedatadetail == 'create' || statedatadetail == 'update') {
                        executedata = 1;
                    }
                    if (statedatadetail == 'delete' && iddetail !== 0) {
                        executedata  = 1;
                        actiondetail = 'delete';
                    }

                    if (executedata == 1) {
                        Ext.Ajax.request({
                            url   : me.urldetail + actiondetail,
                            method: 'POST',
                            async : false,
                            params: {
                                data: Ext.encode(datadetail)
                            },
                            success: function (response) {
                                var coa_id, indexdata;
                                try {
                                    resjsondetail = Ext.JSON.decode(response.responseText);

                                    rowjsondetail = resjsondetail.data;
                                    validdetail   = resjsondetail.success;


                                    if (validdetail == "false" || validdetail == false) {
                                        me.messagedata = resjsondetail.msg;
                                        me.alertFormdataFailed();
                                        throw me.messagedata;
                                    } else {
                                        console.log(rowjsondetail);
                                        if (rowjsondetail[7] != null && rowjsondetail[8] != null) {
                                            me.messagetkb = 'Voucher untuk kelebihan tebus kasbon telah dibuat dengan nomor ' + rowjsondetail[7][0].voucher_in + ' dan ' + rowjsondetail[8][0].voucher_out;
                                        }
                                    }

                                }
                                catch (err) {
                                    console.log(err);
                                    me.messagedata = 'Cashbon details are not saved';
                                    me.alertFormdataFailed();
                                    throw me.messagedata;
                                }

                                if (typeof resjsondetail.data === "undefined") {
                                    if (typeof resjsondetail.success === "undefined") {
                                        me.alertFormdataFailed();
                                        throw me.messagedata;
                                    } else {
                                        if (resjsondetail.success == "false") {
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
    Saveattachmentdetail: function (that, state) {
        var me, storeattachmentdetail, counterattachmentdetail, iddetail, statedatadetail, datadetail, actiondetail,
            resjsondetail, rowjsondetail, validdetail, msgdetail, parameterdetail, kelsub_id,
            storesubdetail, countersubdetail;
        me                    = that;
        storeattachmentdetail = Ext.data.StoreManager.lookup('VDRequestattachmentdetail');
        storeattachmentdetail.clearFilter(true);
        counterattachmentdetail = storeattachmentdetail.getCount();
          //JIKA CREATE / UPDATE
        var upstate = me.getFormdata().up('window').state.toLowerCase();

        var i = 0;
        if (counterattachmentdetail > 0) {

            storeattachmentdetail.each(function (record, index) {
                i               = index + 1;
                iddetail        = record.get("attachment_id");
                statedatadetail = record.get("statedata");
                if (iddetail > 0 && statedatadetail == "") {
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

                if (iddetail == 0) {
                    actiondetail = 'create';
                }

                datadetail                   = record['data'];
                datadetail[me.idheaderfield] = me.idheadervalue;
                datadetail['parametersql']   = actiondetail;
                datadetail['hideparam']      = 'detailattachment' + actiondetail;


                if (me.urldetail !== me.urldetail + statedatadetail) {
                    var executedata = 0;
                    console.log('statedatadetail');
                    if (statedatadetail == 'create' || statedatadetail == 'update') {
                        executedata = 1;
                    }
                    if (statedatadetail == 'delete' && iddetail !== 0) {
                        executedata  = 1;
                        actiondetail = 'delete';
                    }

                    if (executedata == 1) {
                        Ext.Ajax.request({
                            url   : me.urldetail + actiondetail,
                            method: 'POST',
                            async : false,
                            params: {
                                data: Ext.encode(datadetail)
                            },
                            success: function (response) {
                                var coa_id, indexdata;
                                try {
                                    resjsondetail = Ext.JSON.decode(response.responseText);

                                    rowjsondetail = resjsondetail.data;
                                    validdetail   = resjsondetail.success;

                                    if (validdetail == "false" || validdetail == false) {
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

                                if (typeof resjsondetail.data === "undefined") {
                                    if (typeof resjsondetail.success === "undefined") {
                                        me.alertFormdataFailed();
                                        throw me.messagedata;
                                    } else {
                                        if (resjsondetail.success == "false") {
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
    getBatasduedate: function () {
        var me           = this.getMe(),
            form         = me.getFormdata(),
            state        = form.up('window').state.toLowerCase(),
            voucher_date = me.formatDate(me.getVal(form, 'voucher_date', 'value'));

        if (state == 'create') {
            var duedate = me.customeAdddate(voucher_date, me.global_param['DUEDATE_DAYS']['value']);
            form.down("[name=due_date]").setValue(duedate);
        }
    },
    AjaxRequestV2: function () {
        var me;
        me = this.getMe();

        Ext.Ajax.request({
            url    : me.urlrequest,
            method : 'POST',
            timeout: 45000000,
            async  : false,
            params : {
                data: Ext.encode(me.senddata)
            },
            success: function (response) {
                if (response) {
                    try {
                        me.info = Ext.JSON.decode(response.responseText);
                        me.setSuccessEvent();
                    } catch (e) {
                        me.loadingapprove.hide();
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
    AjaxRequestV2Multi: function () {
        var me;
        me = this.getMe();

        Ext.Ajax.request({
            url    : me.urlrequest,
            method : 'POST',
            timeout: 45000000,
            async  : false,
            params : {
                data: Ext.encode(me.senddata)
            },
            success: function (response) {
                if (response) {
                    console.log('Ajax Multi Success');
                    me.loadingapprove.hide();
                }
            },
            failure: function (response) {
                me.alertFormdataFailed();
                  // me.loadingapprove.hide();                
                me.getFormdata().up('window').close();
                  //me.messagedata = 'data error';
                  //throw me.messagedata;
            }
        });
    },
    AjaxRequest: function (f, callback) {
        var me;
        me = this.getMe();
        var form;
        if (f) {
            form = f;
        } else {
            form = me.getFormdata();
        }
        form.setLoading('Please wait');
        Ext.Ajax.request({
            url    : me.urlrequest,
            method : 'POST',
            timeout: 45000000,
            params : {
                data: Ext.encode(me.senddata)
            },
            success: function (response) {

                if (response.responseText.includes("Belum ada")) {
                    form.setLoading(false);
                    Ext.Msg.alert('Error', response.responseText);
                    form.up('window').close();
                    return false;
                }

                try {
                    me.info = Ext.JSON.decode(response.responseText);
                    me.setSuccessEvent(callback);
                    form.setLoading(false);
                    me.loadingapprove.hide();
                    if (typeof callback === "function") {
                        callback();
                    }
                }
                catch (err) {
                    Ext.Msg.alert('Error', 'Request Failed.');
                    me.loadingapprove.hide();
                    form.up('window').close();
                }

            },
            failure: function (response) {
                me.alertFormdataFailed();
                form.setLoading(false);
                me.loadingapprove.hide();
                  //me.messagedata = 'data error';
                  //throw me.messagedata;
                form.up('window').close();
            }
        });

    },
    AjaxRequestNoClose: function (f, callback) {
        var me;
        me = this.getMe();
        var form;
        if (f) {
            form = f;
        } else {
            form = me.getFormdata();
        }
        form.setLoading('Please wait');
        Ext.Ajax.request({
            url    : me.urlrequest,
            method : 'POST',
            timeout: 45000000,
            params : {
                data: Ext.encode(me.senddata)
            },
            success: function (response) {

                if (response.responseText.includes("Belum ada")) {
                    form.setLoading(false);
                    Ext.Msg.alert('Error', response.responseText);
                    form.up('window').close();
                    return false;
                }

                try {
                    me.info = Ext.JSON.decode(response.responseText);
                    form.setLoading(false);
                    me.setSuccessEvent(callback);
                    if (typeof callback === "function") {
                        callback();
                    }
                }
                catch (err) {
                    console.log(err);
                    form.setLoading(false);
                      //Ext.Msg.alert('Error', 'Request Failed.');
                      //form.up('window').close();
                }

            },
            failure: function (response) {
                me.alertFormdataFailed();
                form.setLoading(false);
                me.messagedata = 'data error';
                throw me.messagedata;
                  //form.up('window').close();
            }
        });
    },
    setSuccessEvent: function (callback) {
        var me, value, data, form, voucher_date, duedate, state;
        me = this.getMe();
        value;
        data = me.info.data;
        form = me.getFormdata();
        grid = me.getGrid();
        switch (me.info.parameter) {
            case null: 
                if (typeof form != 'undefined') {
                    state = form.up('window').state.toLowerCase();
                    if (state == 'create') {
                        me.manager_id      = data['manager_id'];
                        me.employee_id     = data['employee_id'];
                        me.department_id   = data['department_id'];
                        me.usertax_id      = data['usertax_id'];
                        me.department_name = data['department_name'];
                        me.department_code = data['department_code'];
                        if (me.department_id > 0) {
                            me.setDefaultDeptuserPt();
                        }
                    }
                }
                if (typeof callback === "function") {
                    callback();
                }
                break;
            case 'default': 
                break;
            case 'approvesby': 
                me.loadingapprove.hide();
                me.getGrid().getStore().reload();
                break;
            case 'approvepajak': 
                me.loadingapprove.hide();
                me.getGrid().getStore().reload();
                break;
            case 'copyvoucher': 
                me.loadingapprove.hide();
                Ext.Msg.alert('Copied Successfully', data[2][0].MSG);
                me.getGrid().getStore().reload();
                me.getFormdatacopyvoucher().up('window').close();
                me.processAfterCopyVoucher(data);
                break;
            case 'pindahptvoucher': 
                me.loadingapprove.hide();
                Ext.Msg.alert('Moved Successfully', data[2][0].MSG);
                me.getGrid().getStore().reload();
                break;
            case 'unapprove': 
                me.loadingapprove.hide();
                grid.getStore().reload();
                break;
            case 'generatevoucherrequest': 
                form.down("[name=voucher_no]").setValue(data);
                break;
            case 'sendrequestmail': 
                me.loadingrequest.hide();
                me.getGrid().getStore().reload();
                break;
            case 'report': 
                value = me.info.data;
                me.createWindows();
                me.submitReport(value);
                break;
            case 'global_param': 
                if (data.name == 'DUEDATE_DAYS') {
                    voucher_date = me.formatDate(me.getVal(form, 'voucher_date', 'value'));
                    duedate      = me.customeAdddate(voucher_date, parseInt(data.value));
                    me.setVal(form, 'due_date', duedate);
                }
                if (data.name == 'approval_rules') {
                    me.global_param['approval_rules']['value'] = data.value;
                    me.subholding_id                           = data.subholding_id;
                    if (form) {
                        var state = form.up('window').state.toLowerCase();
                        if (state == 'create') {
                            me.getStore('VDRequestapprovaldetail').removeAll();
                        }
                    }
                }
                if (data.name == 'vendor_create') {
                    me.global_param['vendor_create']['value'] = data.value;
                }
                if (data.name == 'vendor_autofill') {
                    me.global_param['vendor_autofill']['value'] = data.value;
                }
                if (data.name == 'MAX_ROW_VOUCHER') {
                    me.global_param['MAX_ROW_VOUCHER']['value'] = parseInt(data.value);
                }
                if (data.name == 'coa_pajak') {
                    me.global_param['coa_pajak']['value'] = data.value;
                }
                if (data.name == 'vd_send_to_finance') {
                    me.global_param['is_vd_send_to_finance']['value'] = parseInt(data.value);
                }
                break;
            case 'global_paramV2': 
                if (data !== null && data.name == 'DUEDATE_DAYS') {
                    voucher_date = me.formatDate(me.getVal(form, 'voucher_date', 'value'));
                    duedate      = me.customeAdddate(voucher_date, parseInt(data.value));
                    me.setVal(form, 'due_date', duedate);
                }
                if (data !== null && data.name == 'MAX_ROW_VOUCHER') {
                    me.global_param['MAX_ROW_VOUCHER']['value'] = parseInt(data.value);
                }
                break;
            case 'vd_send_to_finance': 
                me.loadingapprove.hide();
                grid.getStore().reload();
                break;
            case 'receivefinance': 
                me.loadingapprove.hide();
                grid.getStore().reload();
                break;
            case 'needrevise': 
                me.loadingapprove.hide();
                grid.getStore().reload();
                break;
            case 'getdeptaccessbyuser': 
                me.loadingapprove.hide();
                me.getStore('Department').clearFilter(true);
                me.allowed_dept = [];
                if (me.info.total > 0) {
                    for (var i = 0; i < data.length; i++) {
                        me.allowed_dept.push(data[i].department_id);
                    }
                }
                break;
            case 'is_cgg':
                if (data > 0) {
                    me.is_cgg = true;
                } else {
                    me.is_cgg = false;
                }
                break;
            case 'tracking_voucherV2':
                if (data.length > 0) {
                    var tracking_voucher_tax = [];
                    var tracking_voucher_treasury = [];
                    var tracking_voucher_collection = [];
                    var tracking_voucher_headfinance = [];
                    var tracking_voucher_fc = [];
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].name == 'TRACKING_VOUCHER_TAX') {
                            tracking_voucher_tax.push(parseInt(data[i].value));
                            me.tracking_voucher.tax = tracking_voucher_tax;
                        }
                        if (data[i].name == 'TRACKING_VOUCHER_TREASURY') {
                            tracking_voucher_treasury.push(parseInt(data[i].value));
                            me.tracking_voucher.treasury = tracking_voucher_treasury;
                        }
                        if (data[i].name == 'TRACKING_VOUCHER_COLLECTION') {
                            tracking_voucher_collection.push(parseInt(data[i].value));
                            me.tracking_voucher.collection = tracking_voucher_collection;
                        }
                        if (data[i].name == 'TRACKING_VOUCHER_HEADFINANCE') {
                            tracking_voucher_headfinance.push(parseInt(data[i].value));
                            me.tracking_voucher.headfinance = tracking_voucher_headfinance;
                        }
                        if (data[i].name == 'TRACKING_VOUCHER_FC') {
                            tracking_voucher_fc.push(parseInt(data[i].value));
                            me.tracking_voucher.fc = tracking_voucher_fc;
                        }
                    }
                }
                break;
        }
    },
    alertFormdataSuccess: function () {
        var me, form, store;
        me = this.getMe();

        form.up('window').body.unmask();
        Ext.Msg.show({
            title  : 'Success',
            msg    : me.messagedata,
            icon   : Ext.Msg.INFO,
            buttons: Ext.Msg.OK,
            fn     : function () {
                me.formDataClose();
                  //me.sendRequestmail();
                me.updateAmountValidate();
            }
        });
    },
    alertFormdataSuccessSync: function (status) {
        var me, form, store, title, icon;
        me = this.getMe();

        form = me.getFormdata();

        if (status == false) {
            me.messagedata = me.messagedata + "<br>Data Cancelled";
            title          = 'Warning';
            icon           = Ext.Msg.WARNING;
        } else {
            me.messagedata = me.messagedata + ", Data Synced.";
            title          = 'Success';
            icon           = Ext.Msg.INFO;

            if (me.messagetkb) {
                me.messagedata = me.messagedata + '<br>' + me.messagetkb + '<br>';
                me.messagetkb  = null;
            }
        }


        form.up('window').body.unmask();
        Ext.Msg.show({
            title  : title,
            msg    : me.messagedata,
            icon   : icon,
            buttons: Ext.Msg.OK,
            fn     : function () {
                me.formDataClose();
                  //me.sendRequestmail();
                  //Approval jika SBY
                if (me.pt_id !== 1) {
                    state = form.up('window').state.toLowerCase();

                    if (state !== 'create') {
                        if (status == 2) {
                            me.autoApproval();
                        }
                    }

                }
            }
        });

        me.updateAmountValidate();
        me.getGrid().getStore().reload();
        me.flaggeneratepajak        = 0;
        me.paramdetail.changeamount = null;

    },
    alertFormdataFailed: function () {
        var me, form, store;
        me = this.getMe();
        me.getGrid().getStore().reload();
        form = me.getFormdata();
        form.up('window').body.unmask();
        me.clearallStore();
        Ext.Msg.show({
            title  : 'Failure',
            msg    : 'Error: ' + me.messagedata,
            icon   : Ext.Msg.ERROR,
            buttons: Ext.Msg.OK
        });
    },
    formDataClose: function () {
        var me = this.getMe();
        me.getFormdata().up('window').close();
          //me.clearallStore();
    },
    formDataClose2: function () {
        var me = this.getMe();
        me.getFormdatadetail().up('window').close();
        me.clearallStore2();
    },
    clearallStore: function () {
        var me;
        me = this.getMe();
          //me.getGriddetail().getStore().removeAll();
    },
    clearallStore2: function () {
        var me;
        me = this.getMe();
        if (me.up == null) {
            me.getGridsubdetail().getStore().removeAll();
        }
    },
    dataDestroysubdetailwithflag: function () {
        var me, rows, confirmmsg, successmsg, failmsg,
            record, recordcounttext, store, selectedRecord, msg, successcount
            , parameter, pesan, dataconfirm, p;
        me          = this.getMe();
        dataconfirm = me.fieldconfirmsubdetail;
        p           = me.paramsubdetail;
        pd          = me.paramdetail;
        rows        = me.getGridsubdetail().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            store           = Ext.data.StoreManager.lookup('VDRequestsubdetail');
            if (rows.length == 1) {
                var storeselected  = store.getAt(store.indexOf(rows[0])).data;
                    selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(dataconfirm) + ']';
                    confirmmsg     = 'Delete ' + selectedRecord + ' ?';
                    failmsg        = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg    = 'Error: Unable to delete data.';
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

                          //taruh di temp
                        if (record.get("vouchersubdetail_id") > 0) {
                            me.deletedsub_ids.push(record.get("vouchersubdetail_id"));
                        }

                        store.clearFilter(true);

                        store.filter(me.iddetailfield_v, me.iddetailvalue_v);
                        store.filter('deleted', false);

                        var sumamount = 0;
                        store.each(function (record, index) {
                            sumamount = sumamount + parseFloat(record.get("amount").replace(/,/g, ''));
                        });
                        p.totalsubdetail = sumamount;

                          /*Delete yang new*/
                        substoredata = me.localStore.substore;
                        substoredata.forEach(function (item, index) {
                            if (storeselected.indexdata == item.indexdata && storeselected.indexsubdata == item.indexsubdata) {
                                if (index > -1) {
                                    substoredata.splice(index, 1);
                                }
                            }
                        });

                    }

                      //set juga saat delete
                    var row_voucherdetail_id = pd.rowdata['data'].voucherdetail_id;
                    if (row_voucherdetail_id == 0) {
                        me.iddetailfield_v = 'indexdataheader';
                        me.iddetailvalue_v = pd.rowdata['data'].indexdata;
                    }

                    me.setSumsubdetail();

                }

            });
        }
    },
    setUserDepartment: function () {
        var me = this;

        Ext.Ajax.request({
            url   : 'cashier/common/read',
            params: {
                hideparam: 'getemployeedatabyuserid',
                user_id  : apps.uid
            },
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);

                me.department_id   = info.data[0].department_id;
                me.department_name = info.data[0].department;
                me.department_code = info.data[0].deptcode;
            }
        })
    },
    formDataAfterRender: function (el) {
        var me, form, grid, store, record, counter, row, pd;
        me = this.getMe();
        me.storeProcess = me.createSpProcessObj(me.storeProcess);
        me.fdar().init();
        pd = me.paramdetail;

        //first init
        me.deletedsub_ids = [];

        //INI GAK PENTING
        //me.loadComboBoxStore(el);
        me.setUserDepartment();
        var storePaymentMethod = me.getFormdata().down("[name=paymentmethod_id]").getStore();
        storePaymentMethod.load({
            callback: function () {
                storePaymentMethod.filterBy(function (rec) {
                    if (rec.get("paymentmethod") == "CASH" ||
                        rec.get("paymentmethod") == "TRANSFER" ||
                        rec.get("paymentmethod") == "CEK/GIRO") {
                        return true;
                    }
                });
            }
        });

        form = me.getFormdata();
        var state = el.up('window').state;
        //form.down("[name=department_id]").setReadOnly(true);

        //init
        me.localStore.substore = [];

        me.statereal = state;

        if (me.global_param['approval_rules']['value'] == 'hod_approve') {
            Ext.getCmp('row_approval_formdata').setVisible(false);
        } else {
            Ext.getCmp('row_approval_formdata').setVisible(true);
        }

        form.down("[name=currency_word]").getStore().load();

        if (state == 'create') {

            Ext.StoreManager.lookup('VDRequestdetail').removeAll();
            Ext.StoreManager.lookup('VDRequestsubdetail').removeAll();
            Ext.StoreManager.lookup('VDRequestdesc').removeAll();
            Ext.StoreManager.lookup('VDRequestkasbondetail').removeAll();
            Ext.StoreManager.lookup('VDRequestattachmentdetail').removeAll();
            Ext.StoreManager.lookup('VDRequestapprovaldetail').removeAll();

            me.fdar().create();
            form.down("[name=status]").setValue('1');
            form.down("[name=type_vendor]").setValue('all');
            form.down("[name=currency_word]").setValue('Rupiah');
            form.down("[name=kasbondept_id]").setDisabled(true);
            form.down("[name=paymentmethod_id]").setValue(7);

            if (apps.subholdingId != 2) {
                form.down("[name=due_date]").setValue(new Date());
            }

            //load PL Combo
            store = me.getStore("Purchaseletter");
            form.down("[name=purchaseletter_id]").on('keyup', function (e, t, eOpts) {
                store.proxy.extraParams = {
                    "hideparam": 'getpurchaseletter',
                    "project_id": me.project_id,
                    "pt_id": me.getVal(form, 'pt_id', 'value')
                }
            });

            form.down("[name=jenis_spkorsop_id]").setValue(1);

            var tipevendor = me.getStore('Tipevendorvoucher'),
                dataflow = form.down("[name=dataflow]").getValue();
            if (dataflow == false) {
                tipevendor.clearFilter();
                tipevendor.filterBy(function (rec) {
                    if (rec['data'].type_vendor == 'customer') {
                        return false;
                    }else{
                        return true;
                    }
                });
            }


        } else if (state == 'update' || state == 'read') {
            try {

                Ext.StoreManager.lookup('Kasbondeptcomboapply').removeAll();

                if (state == 'read') { //========= added on march 15th 2016 by Tirtha
                    me.fdar().read();
                } else {
                    me.fdar().update();
                }

                grid = me.getGrid();
                store = grid.getStore();
                record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                counter = store.getCount();
                if (counter > 0) {
                    row = record['data'];
                    me.in_out = row.dataflow;
                    me.kasbondept_id = 0;
                    me.cashbon_no = "";
                    if (row.kasbondept_id > 0) {
                        me.kasbondept_id = row.kasbondept_id;
                        me.cashbon_no = row.cashbon_no;
                        form.down("[name=kasbondept_id_fixed]").setValue(row.kasbondept_id);
                        //me.setStoreKashbondepthasapply();
                    }
                    if (row.for_projectpt_id || row.for_projectpt_id > 0) {
                        form.down("[name=cashbon_pt_id]").setValue(parseInt(row.for_projectpt_id));
                    } else {
                        form.down("[name=cashbon_pt_id]").setValue(parseInt(apps.projectpt));
                    }
                    //me.DestroyKashbondepthasapply();
                }

            }
            catch (err) {
                Ext.Msg.alert('Info', 'Rendering failed, please reload.');
                window.location.reload();
            }

            //set multikasbon disable add
            var gridkasbondetail = me.getGridkasbondetail();

            me.setReadonly(form, 'pt_id', true);
            me.setReadonly(form, 'department_id', true);
            me.setReadonly(form, 'kasbondept_id', true);
            form.down('#btnKomisi').setDisabled(true);
            form.down('#btnReward').setDisabled(true);

            var kasbondept_id = parseInt(form.down("[name=kasbondept_id]").getValue());
            if (kasbondept_id == 0 || kasbondept_id == null || isNaN(kasbondept_id) == true) {
                me.setReadonly(form, 'kasbondept_id', false);
            }

            if (kasbondept_id > 0) {
                me.is_multi_kasbon = 0;
                gridkasbondetail.down('[action=create]').setDisabled(false);
                gridkasbondetail.down('[action=destroy]').setDisabled(true);
                form.down("[name=is_pjk]").setValue(1);
            }

            // var purchaseletter_reward_ids = form.down("[name=purchaseletter_reward_ids]").getValue();
            // if (purchaseletter_reward_ids != "") {
            //     form.down("[name=is_reward]").setValue(1);
            // }

            //gridkasbondetail.down('[action=create]').setDisabled(true);
            //gridkasbondetail.down('[action=destroy]').setDisabled(true);

            //me.setReadonly(form, 'approveby_id', true);
            //me.setReadonly(form, 'voucher_date', true);
            grid = me.getGrid();
            store = grid.getStore();
            record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
            if (record == null || record == false || record.length < 1) {
                Ext.Msg.alert('Warning', 'Please select data.');
                return 0;
            }
            counter = store.getCount();
            if (counter > 0) {
                row = record['data'];
                me.in_out = row.dataflow;
                me.remainingkasbon = row.remainingkasbon;
                me.remainingkasboninit = row.remainingkasbon;
                me.valuekasbon = row.valuekasbon;
                me.initamount = row.amount;
                form.down("[name=valuekasbon]").setValue(row.valuekasbon);
                form.down("[name=purchaseletter_id]").setValue(row.purchaseletter_id);
                //form.down("[name=komisiklaim_amount]").setValue(row.amount);
                form.down("[name=amount]").setValue(row.amount);
                pd.totaldetail = row.amount;
                form.down("[name=approveby_id]").setValue(row.approveby_id);
                if (row.approveby_id > 0) {
                    me.approveby_id = row.approveby_id;
                }

                me.setValCombo(form, 'vendor_note', 0, row.vendor_note);
                //me.DestroyKashbondepthasapply();
                var storevndr = me.getStore('Vendorcombo');
                var storecstr = me.getStore('Customercombo');

                me.vendor_id = parseInt(row.vendor_id);
                me.vendorname = row.vendorname;
                row.vendor_id = parseInt(row.vendor_id);
                row.customer_id = parseInt(row.customer_id);

                form.down("[name=vendor_id]").setValue(row.vendor_id);
                form.down("[name=customer_id]").setValue(row.customer_id);
                form.down("[name=approveby_id]").setValue(row.approveby_id);

                if (row.vendor_id > 0) {
                    form.down("[name=container_customer]").hide();
                    form.down("[name=container_vendor]").show();
                    form.down("[name=container_notevendor]").show();
                    storevndr.load({
                        params: {
                            "query": row.vendorname,
                            "hideparam": 'getvendor',
                            "project_id": row.project_id,
                            "pt_id": row.pt_id,
                            "type_vendor": ""
                        },
                        callback: function (records, operation, success) {
                            form.down("[name=vendor_id]").setValue(row.vendor_id);
                            me.setStoreVendornote(form);
                            if (row.vendor_bankacc_id > 0) {
                                me.getDatavendorbankacc(row.vendor_bankacc_id);
                            }
                        }
                    });
                }

                if (row.customer_id > 0) {
                    form.down("[name=type_vendor]").setValue('customer');
                    form.down("[name=container_vendor]").hide();
                    form.down("[name=container_notevendor]").hide();
                    form.down("[name=container_customer]").show();
                    storecstr.load({
                        params: {
                            "query": row.customername,
                            "hideparam": 'getcustomer',
                            "project_id": row.project_id,
                            "pt_id": row.pt_id,
                        },
                        callback: function (records, operation, success) {
                            form.down("[name=customer_id]").setValue(row.customer_id);
                        }
                    });
                }

                form.down("[name=vendor_id]").setValue(row.vendor_id);
                form.down("[name=customer_id]").setValue(row.customer_id);
                form.down("[name=approveby_id]").setValue(row.approveby_id);

                if (!row.jenis_spkorsop_id) {
                    form.down("[name=jenis_spkorsop_id]").setValue(1);
                }

                /* Ext.StoreManager.lookup('VDRequestdetail').load({
                    params: {
                        "hideparam"       : 'default',
                        "voucher_id"      : row.voucher_id,
                        "start"           : 0,
                        "limit"           : 100,
                    },
                    callback : function (rec_detail) {

                        for (let index = 0; index < rec_detail.length; index++) {

                            Ext.StoreManager.lookup('VDRequestsubdetail').load({
                                params: {
                                    "hideparam"       : 'default',
                                    "voucher_id"      : rec_detail[index].data.voucher_id,
                                    "voucherdetail_id": rec_detail[index].data.voucherdetail_id,
                                    "start"           : 0,
                                    "limit"           : 100,
                                },
                                callback : function (rec_sub) {
                                    for (let index2 = 0; index2 < rec_sub.length; index2++) {
                                        me.localStore.substore.push(rec_sub[index2])
                                    }
                                }
                            });
                        }
                    }
                }) */

            }
            var rec = grid.getSelectedRecord();
            if (moment(rec.get('voucher_date')).format("DD-MM-YYYY") == "01-01-1900") {
                form.down("[name=voucher_date]").setValue('');
            }

            //show remaining kasbon
            var kasbondept_id = form.down("[name=kasbondept_id]").getValue();
            if (kasbondept_id > 0) {
                form.down("[name=remainingkasbon]").setVisible(true);
                form.down("[name=valuekasbon]").setVisible(true);
                me.setReadonly(form, 'kasbondept_id', true);
            }

            //load PL Combo
            store = me.getStore("Purchaseletter");
            form.down("[name=purchaseletter_id]").on('keyup', function (e, t, eOpts) {
                store.proxy.extraParams = {
                    "hideparam": 'getpurchaseletter',
                    "project_id": row.project_id,
                    "pt_id": row.pt_id
                }
            });
            store.load({
                params: {
                    "query": row.purchaseletter_id,
                    "hideparam": 'getpurchaseletter',
                    "project_id": row.project_id,
                    "pt_id": row.pt_id
                },
                callback: function (records, operation, success) {
                    form.down("[name=purchaseletter_id]").setValue(row.purchaseletter_id);
                }
            });

            if (state == 'update') {
                var komisiklaim_ids = parseInt(form.down('[name=komisiklaim_ids]').getValue());
                if (komisiklaim_ids > 0) {
                    me.getTotalCommission();
                }
            }

            me.getGridattachmentdetail().approval_rules = me.global_param['approval_rules']['value'];
            me.getAmountReal();
        }
        me.setStatus(row);
    },
    setStatus: function (data) {
        var me, form, status;
        me = this.getMe();
        form = me.getFormdata();

        if (data === undefined) {
            var voucher_id = 0
        } else {
            var voucher_id = data.voucher_id;
        }
        var status = 0;

        Ext.Ajax.request({
            url: 'cashier/common/read',
            params: {
                'voucher_id': voucher_id,
                'hideparam': 'getstatusvoucher'
            },
            success: function (response) {
                var res = Ext.JSON.decode(response.responseText);
                try {
                    status = res.data[0].status;
                } catch (err) {
                    status = 1;
                }
                //                 status = form.down("[name=status]").getValue();
                if (status == '1') {
                    form.down("[name=lblstatus]").setText("OPEN / DRAFT", true);
                }
                else if (status == '2') {

                    var filtered = me.global_param['hod_approve_dept_exclusion']['value'].filter(function (el) {
                        return (el == data.department_id);
                    });

                    form.down("[name=lblstatus]").setText("APPROVED", true);
                    if (me.global_param['approval_rules']['value'] == "hod_approve" && filtered.length == 0) {
                        me.getFormdata().down('#btnSave').setDisabled(true);
                    }

                    // SEFTIAN ALFREDO 09/02/2022 - VALIDASI UNTUK TIDAK DAPAT EDIT DAN PRINT KALO RECEIVE DATE SUDAH TERISI
                    if (data.receive_date && data.receive_date != '') {
                        me.getFormdata().getForm().getFields().each(function (field) {
                            field.setReadOnly(true);
                        });
                        me.getGriddetail().down('toolbar').setDisabled(true);
                        me.getGridapprovaldetail().down('#btnEdit').setDisabled(true);
                        me.getGridapprovaldetail().down('#btnDelete').setDisabled(true);
                        me.getFormdata().down('#btnSave').setDisabled(true);
                    }

                    me.getFormdata().down('#btnSave').setDisabled(true);
                    me.getGriddetail().down('toolbar').setDisabled(true);
                    me.getGridkasbondetail().down('toolbar').setDisabled(true);
                    me.getGridattachmentdetail().down('toolbar').setDisabled(true);
                    me.getGridapprovaldetail().down('#btnEdit').setDisabled(true);
                    me.getGridapprovaldetail().down('#btnDelete').setDisabled(true);

                } else if (me.is_userpajak && status == 5) {
                    me.getFormdata().down('#btnSave').setDisabled(false);
                }
                else {
                    if (status == '3') {
                        form.down("[name=lblstatus]").setText("PAID", true);
                    }
                    me.getFormdata().getForm().getFields().each(function (field) {
                        field.setReadOnly(true);
                    });
                    me.getFormdata().down('#btnSave').setDisabled(true);
                    me.getFormdata().down('#btnUploadCsv').setDisabled(true);
                    //me.getFormdata().down('#btnDetailDesc').setDisabled(true);
                    //me.getFormdata().down('#btnDetailDesc').setDisabled(true);
                    //me.getFormdata().down('#voucherrequesttab').setDisabled(true);
                    me.getGriddetail().down('toolbar').setDisabled(true);
                    me.getGriddetail().down('actioncolumn').setVisible(false);
                    me.getGridapprovaldetail().down('#btnEdit').setDisabled(true);
                    me.getGridapprovaldetail().down('#btnDelete').setDisabled(true);
                }
            }
        })
    },
    gridSelectionChange: function () {
        var me = this.getMe();
        var grid = me.getGrid();
        var row = grid.getSelectionModel().getSelection();

        if (row.length > 1) {
            grid.down('#btnEdit').setDisabled(true);

            for (i = 0; i < row.length; i++) {
                if (row[i].data.status == 1) {
                    grid.down('#btnDelete').setDisabled(false);
                    grid.down('#btnReceivefinance').setDisabled(true);
                    grid.down('#btnCheckapproval').setDisabled(true);
                    grid.down('#btnNeedrevise').setDisabled(true);
                    grid.down('#btnUnsent').setDisabled(true);
                    grid.down('#btnUnreceive').setDisabled(true);
                    grid.down('#btnUnapprove').setDisabled(true);
                } else if (row[i].data.status == 2) {
                    grid.down('#btnDelete').setDisabled(true);

                    if (!row[i].data.send_date && !row[i].data.receive_date) {
                        grid.down('#btnReceivefinance').setDisabled(true);
                        grid.down('#btnCheckapproval').setDisabled(true);
                        grid.down('#btnNeedrevise').setDisabled(true);
                        grid.down('#btnUnsent').setDisabled(true);
                    } else if (row[i].data.send_date && !row[i].data.receive_date) {
                        grid.down('#btnUnsent').setDisabled(false);
                        grid.down('#btnReceivefinance').setDisabled(false);
                        grid.down('#btnCheckapproval').setDisabled(true);
                        grid.down('#btnNeedrevise').setDisabled(true);
                    } else if (row[i].data.send_date && row[i].data.receive_date) {
                        grid.down('#btnUnsent').setDisabled(true);
                        grid.down('#btnReceivefinance').setDisabled(true);
                        grid.down('#btnCheckapproval').setDisabled(false);
                        grid.down('#btnNeedrevise').setDisabled(false);
                    }
                } else {
                    grid.down('#btnEdit').setDisabled(true);
                    grid.down('#btnDelete').setDisabled(true);
                    grid.down('#btnReceivefinance').setDisabled(true);
                    grid.down('#btnCheckapproval').setDisabled(true);
                    grid.down('#btnNeedrevise').setDisabled(true);
                    grid.down('#btnUnsent').setDisabled(true);
                    grid.down('#btnUnreceive').setDisabled(true);
                    grid.down('#btnUnapprove').setDisabled(true);
                }
            }

            if (me.global_param['TRACKING_VOUCHER_TAX']['value'].includes(apps.uid) || me.global_param['TRACKING_VOUCHER_TREASURY']['value'].includes(apps.uid) || me.global_param['TRACKING_VOUCHER_HEADFINANCE']['value'].includes(apps.uid)) {
                grid.down('#btnUnapprove').setDisabled(false);
            }
        } else {
            if (row.length == 0) {
                grid.down('#btnEdit').setDisabled(true);
                grid.down('#btnDelete').setDisabled(true);
                grid.down('#btnReceivefinance').setDisabled(true);
                grid.down('#btnCheckapproval').setDisabled(true);
                grid.down('#btnNeedrevise').setDisabled(true);
                grid.down('#btnUnsent').setDisabled(true);
                grid.down('#btnUnreceive').setDisabled(true);
                grid.down('#btnUnapprove').setDisabled(true);
            } else {

                if (row[0].data.status == 1) {
                    grid.down('#btnEdit').setDisabled(false);
                    grid.down('#btnDelete').setDisabled(false);

                    grid.down('#btnReceivefinance').setDisabled(true);
                    grid.down('#btnCheckapproval').setDisabled(true);
                    grid.down('#btnNeedrevise').setDisabled(true);
                    grid.down('#btnUnsent').setDisabled(true);
                    grid.down('#btnUnreceive').setDisabled(true);
                    grid.down('#btnUnapprove').setDisabled(true);
                } else if (row[0].data.status == 2) {
                    grid.down('#btnEdit').setDisabled(true);
                    grid.down('#btnDelete').setDisabled(true);

                    if (!row[0].data.send_date && !row[0].data.receive_date) {
                        grid.down('#btnNeedrevise').setDisabled(true);
                        grid.down('#btnUnsent').setDisabled(true);
                        grid.down('#btnUnreceive').setDisabled(true);
                        grid.down('#btnReceivefinance').setDisabled(true);
                        grid.down('#btnCheckapproval').setDisabled(true);
                    } else if (row[0].data.send_date && !row[0].data.receive_date) {
                        grid.down('#btnUnsent').setDisabled(false);
                        grid.down('#btnReceivefinance').setDisabled(false);
                        grid.down('#btnUnreceive').setDisabled(true);
                        grid.down('#btnCheckapproval').setDisabled(true);
                        grid.down('#btnNeedrevise').setDisabled(true);
                    } else if (row[0].data.send_date && row[0].data.receive_date) {
                        grid.down('#btnUnsent').setDisabled(true);
                        grid.down('#btnReceivefinance').setDisabled(true);
                        grid.down('#btnCheckapproval').setDisabled(false);
                        grid.down('#btnNeedrevise').setDisabled(false);
                        grid.down('#btnUnreceive').setDisabled(false);
                    }
                } else {
                    grid.down('#btnEdit').setDisabled(true);
                    grid.down('#btnDelete').setDisabled(true);
                    grid.down('#btnReceivefinance').setDisabled(true);
                    grid.down('#btnCheckapproval').setDisabled(true);
                    grid.down('#btnNeedrevise').setDisabled(true);
                    grid.down('#btnUnsent').setDisabled(true);
                    grid.down('#btnUnreceive').setDisabled(true);
                    grid.down('#btnUnapprove').setDisabled(true);
                }


                if (me.global_param['TRACKING_VOUCHER_TAX']['value'].includes(apps.uid) || me.global_param['TRACKING_VOUCHER_TREASURY']['value'].includes(apps.uid) || me.global_param['TRACKING_VOUCHER_HEADFINANCE']['value'].includes(apps.uid)) {
                    grid.down('#btnUnapprove').setDisabled(false);
                }

            }
        }
    },
    gridSelected: function () {
        var me, grid, store, counter, record, row;
        me = this.getMe();
        grid = me.getGrid();
        store = grid.getStore();
        counter = store.getCount();
        if (counter > 0) {
            record = grid.getSelectionModel().getSelection()[0];
            row = record['data'];
            if (row.status == '1' /*|| row.status == '2' */) {
                grid.down('#btnEdit').setDisabled(false);
                grid.down('#btnDelete').setDisabled(false);
            } else {
                grid.down('#btnEdit').setDisabled(true);
                grid.down('#btnDelete').setDisabled(true);
            }

            // SEFTIAN ALFREDO 09/02/2022 - VALIDASI UNTUK TIDAK DAPAT EDIT DAN PRINT KALO RECEIVE DATE SUDAH TERISI
            if (row.receive_date && row.receive_date != '') {
                grid.down('#btnPrintvoucher').setDisabled(true);
            } else {
                grid.down('#btnPrintvoucher').setDisabled(false);
            }

            if (row.approve_user_id > 0) {
                //grid.down('#btnPrintvoucher').setDisabled(false);
            }
            else {
                //grid.down('#btnPrintvoucher').setDisabled(true); 
            }
        }
    },
    generatePajak: function (data) {
        var me, grid, store, counter, record, row,
            amountppn, amountpph, persentaseppn, persentasepph, amount, checkppn, checkpph, dataflow, keterangan, keterangan_tambahan_ppn, keterangan_tambahan_pph;
        me = this.getMe();
        storedetail = me.getGriddetail().getStore();

        amountppn = 0; amountpph = 0, totalpajak = 0;
        checkppn = false; checkpph = false;
        keterangan = ''; keterangan_tambahan_ppn = ''; keterangan_tambahan_pph = '';

        var vendorname = me.getFormdata().down("[name=vendor_id]").valueModels[0].data.vendorname;
        var desc_header = me.getFormdata().down("[name=description]").getValue();

        var coapajak = [];
        var deleted = [];
        var pajakdatas = [];
        var coapajakfinal = [];
        var pajakdatasfinal = [];

        for (i = 0; i < data.length; i++) {
            var d = data[i];
            coapajak.push(d.coa);
        }

        for (i = 0; i <= storedetail.getCount(); i++) {
            storedetail.each(function (rec) {
                if (coapajak.includes(rec.get("coa"))) {
                    rec.set("deleted", true);
                    rec.set("statedata", 'delete');
                    deleted.push(storedetail.indexOf(rec));
                }
            });
        }

        storedetail.clearFilter(true);
        storedetail.filter('deleted', false);


        /*
        for (i = 0; i < deleted.length; i++) {
            var d = deleted[i];
            for (i = 0; i < deleted.length; i++) {
                storedetail.removeAt(d);
            }
        }

        */

        //return 0;

        var indexdata = 1;

        var totalamountppn = 0;
        var totalamountpph = 0;

        /*SUB nya isi ulang*/

        var substoredata = me.localStore.substore;
        var substoredatanew = [];
        substoredata.forEach(function (item, index) {
            if (typeof item.subcashierdesc === 'undefined') {
                substoredatanew.push(item);
            }
        });

        //maks indexdata
        arrs = [];
        storedetail.each(function (rec) {
            arrs.push(rec.get("indexdata"));
            indexdata = Math.max.apply(null, arrs);
        });

        var containkasbondeptids = 0;
        storedetail.each(function (rec) {
            persentaseppn = parseFloat(rec.get("persentaseppn")).toFixed(2);
            persentasepph = parseFloat(rec.get("persentasepph")).toFixed(2);
            // console.log(persentasepph);
            tipepajakdetailppn_id = parseInt(rec.get("tipepajakdetailppn_id"));
            tipepajakdetailpph_id = parseInt(rec.get("tipepajakdetailpph_id"));
            is_ppnprogresif = parseInt(rec.get("is_ppnprogresif"));
            is_pphprogresif = parseInt(rec.get("is_pphprogresif"));
            checkppn = rec.get("checkppn");
            checkpph = rec.get("checkpph");
            keterangan = rec.get("remarks");
            // console.log(keterangan);

            // console.log(tipepajakdetailppn_id);
            // console.log(tipepajakdetailpph_id);

            kasbondept_id = rec.get("kasbondept_id");
            kasbondept_no = rec.get("cashbon_no");

            amountppn = 0; amountpph = 0;

            var totalamount = accounting.unformat(rec.get("amount"));
            var checkpajak = 0;
            var is_progresif = is_ppnprogresif + is_pphprogresif;

            //Progressive Calc
            if (is_ppnprogresif == 1 && checkppn) {
                amountppn = me.getPajakProgresif(tipepajakdetailppn_id, totalamount);
                amountppn = parseFloat(amountppn);
                totalamountppn = totalamountppn + amountppn;
                checkpajak = 1;
            }
            if (is_pphprogresif == 1 && checkpph) {
                amountpph = me.getPajakProgresif(tipepajakdetailpph_id, totalamount);
                amountpph = parseFloat(amountpph);
                totalamountpph = totalamountpph + amountpph;
                checkpajak = 1;
            }
            //Strandard Calc
            if (persentaseppn > 0 && checkppn && is_ppnprogresif !== 1) {
                amount = totalamount * (persentaseppn / 100);
                amountppn = amountppn + amount;
                totalamountppn = totalamountppn + amountppn;
                checkpajak = 1;
            }
            if (persentasepph > 0 && checkpph && is_pphprogresif !== 1) {
                amount = totalamount * (persentasepph / 100);
                amountpph = amountpph + amount;
                totalamountpph = totalamountpph + amountpph;
                checkpajak = 1;
            }

            containkasbondeptids = containkasbondeptids + parseInt(rec.get("kasbondept_id"));

            if (checkpajak > 0) {
                for (i = 0; i < data.length; i++) {
                    var d = data[i];
                    if (d.tipepajakdetail_id === rec.get("tipepajakdetailppn_id")) {
                        indexdata = indexdata + 1;
                        if (d.pengali > 0) {
                            dataflow = "I";
                        } else {
                            dataflow = me.in_out; // PPH sebagai Pengurang
                        }

                        if (me.in_out == 'I') {
                            dataflow = "O";
                        }

                        if (d.statusround == 'roundup') {
                            //Round Auto : Pembulatan ke atas/bawah 
                            amountppn = Math.round(amountppn);
                            totalamountppn = Math.round(totalamountppn);
                        }
                        if (d.statusround == 'round') {
                            //Round (Remove Decimal)
                            amountppn = Math.round(amountppn);
                            totalamountppn = Math.round(totalamountppn);
                        }
                        var keterangan_presentase = persentaseppn;

                        if (d.name == 'PPN MASUKAN') {
                            d.name = 'PPN';
                        }

                        switch (me.subholding_id) {
                            case 1: // SH1
                                if (me.is_cgg) { //CGG
                                    keterangan_tambahan_ppn = desc_header + ' - ' + d.name + ' - ' + '(' + persentaseppn + '%) '
                                } else {
                                    keterangan_tambahan_ppn = d.name + ' - ' + '(' + persentaseppn + '%) '
                                }
                                break;
                            case 2: // SH2

                                break;
                            case 3: // SH3A
                                if (me.project_id == 6 || me.project_id == 1002 || me.project_id == 4053) {
                                    keterangan_tambahan_ppn = d.name + ' - (' + persentaseppn + '%) - ' + keterangan;
                                } else {
                                    keterangan_tambahan_ppn = d.name + ' - ' + keterangan;
                                }
                                break;
                            case 4: // SH3B

                                break;

                            default:
                                keterangan_tambahan_ppn = d.name;
                                break;
                        }

                        // if ( me.project_id == 6 || me.project_id == 1002 || me.project_id == 4053 ) {
                        //     if ( d.name == 'PPN MASUKAN' ) {
                        //         keterangan_tambahan_ppn = 'PPN ' + ' ('+keterangan_presentase+'%) - ' + keterangan;
                        //     }else{
                        //         keterangan_tambahan_ppn = d.name + ' ('+keterangan_presentase+'%) - ' + keterangan;
                        //     }
                        // }else{
                        //     if ( d.name == 'PPN MASUKAN' ) {
                        //         keterangan_tambahan_ppn = 'PPN';
                        //     }else{
                        //         keterangan_tambahan_ppn = d.name;
                        //     }
                        // }

                        keterangan_tambahan_ppn = keterangan_tambahan_ppn + rec.get('no_faktur');

                        var pajakdata = {
                            voucher_id: me.idheadervalue, voucherdetail_id: 0, coa_id: d.coa_id, coa: d.coa, coaname: d.coa_name,
                            kelsub_id: d.kelsub_id, kelsub: d.kelsub, kelsubdesc: d.kelsub, subcashier_id: 999, subcashierdesc: "pajak", indexdata: indexdata, dataflow: dataflow,
                            amount: Math.round(amountppn), remarks: keterangan_tambahan_ppn, deleted: !1, hideparam: "default", statedata: "create", kasbondept_id: rec.get("kasbondept_id"),
                            kasbondeptdetail_id: 0, typetransdetail: dataflow, setupcashflow_id: d.setupcashflow_id, cashflowtype: d.cashflowtype, checkppn: !1, checkpph: !1,
                            tipepajakdetailppn_id: 0, tipepajakdetailpph_id: 0, persentaseppn: "", persentasepph: "", balancecoa: "", cashbon_no: rec.get("cashbon_no")
                        };
                        totalpajak = totalpajak + amountppn;
                        pajakdatas.push(pajakdata);
                        coapajakfinal.push(d.coa);

                        var row = {
                            amount: Math.round(totalamountppn), coa_id: d.coa_id, code1: d.subgl_code, code2: "", code3: "", code4: "",
                            deleted: false, hideparam: "default", indexdata: "1", indexdataheader: indexdata, indexsubdata: indexdata,
                            kelsub: d.kelsub,
                            kelsub_id: d.kelsub_id, project_id: me.project_id, pt_id: me.pt_id, remarks: keterangan_tambahan_ppn, statedata: "create", subcode: d.subgl_code,
                            subgl_id: d.subgl_id, voucher_id: "0", voucherdetail_id: indexdata, vouchersubdetail_id: "", subcashierdesc: "pajak"
                        };

                        substoredatanew.push(row);

                    }
                }
                for (i = 0; i < data.length; i++) {
                    var d = data[i];
                    if (d.tipepajakdetail_id === rec.get("tipepajakdetailpph_id")) {
                        indexdata = indexdata + 1;
                        if (d.pengali > 0) {
                            dataflow = "I";
                        } else {
                            dataflow = me.in_out; // PPH sebagai Pengurang
                        }
                        if (d.statusround == 'roundup') {
                            //Round Auto : Pembulatan ke atas/bawah 
                            amountpph = Math.trunc(amountpph);
                            totalamountpph = Math.trunc(totalamountpph);
                        }
                        if (d.statusround == 'round') {
                            //Round (Remove Decimal)
                            amountpph = Math.trunc(amountpph);
                            totalamountpph = Math.trunc(totalamountpph);
                        }
                        var keterangan_presentase = persentasepph;

                        switch (me.subholding_id) {
                            case 1: // SH1
                                if (me.is_cgg) { //CGG
                                    keterangan_tambahan_pph = desc_header + ' - ' + d.name + ' - ' + ' (' + persentasepph + '%) '
                                } else {
                                    keterangan_tambahan_pph = d.name + ' - ' + ' (' + persentasepph + '%) '
                                }
                                break;
                            case 2: // SH2

                                break;
                            case 3: // SH3A
                                if (me.project_id == 6 || me.project_id == 1002 || me.project_id == 4053) {
                                    keterangan_tambahan_pph = d.name + ' - (' + persentasepph + '%) - ' + keterangan;
                                } else {
                                    keterangan_tambahan_pph = d.name + ' - ' + keterangan;
                                }
                                break;
                            case 4: // SH3B

                                break;

                            default:
                                keterangan_tambahan_pph = d.name;
                                break;
                        }

                        // if ( me.project_id == 6 || me.project_id == 1002 || me.project_id == 4053 ) {
                        //     keterangan_tambahan_pph = d.name + ' ('+keterangan_presentase+'%) - ' + keterangan;;
                        // }else if( me.is_cgg ){
                        //     keterangan_tambahan_pph = d.name + ' ('+keterangan_presentase+'%)';
                        // }else{
                        //     keterangan_tambahan_pph = d.name;
                        // }

                        var pajakdata = {
                            voucher_id: me.idheadervalue, voucherdetail_id: 0, coa_id: d.coa_id, coa: d.coa, coaname: d.coa_name,
                            kelsub_id: d.kelsub_id, kelsub: d.kelsub, kelsubdesc: d.kelsub, subcashier_id: 999, subcashierdesc: "pajak", indexdata: indexdata, dataflow: dataflow,
                            amount: amountpph, remarks: keterangan_tambahan_pph, deleted: !1, hideparam: "default", statedata: "create", kasbondept_id: rec.get("kasbondept_id"),
                            kasbondeptdetail_id: 0, typetransdetail: dataflow, setupcashflow_id: d.setupcashflow_id, cashflowtype: d.cashflowtype, checkppn: !1, checkpph: !1,
                            tipepajakdetailppn_id: 0, tipepajakdetailpph_id: 0, persentaseppn: "", persentasepph: "", balancecoa: "", cashbon_no: rec.get("cashbon_no")
                        };
                        totalpajak = totalpajak + amountpph;
                        pajakdatas.push(pajakdata);
                        coapajakfinal.push(d.coa);

                        var row = {
                            amount: totalamountpph, coa_id: d.coa_id, code1: d.subgl_code, code2: "", code3: "", code4: "",
                            deleted: false, hideparam: "default", indexdata: "1", indexdataheader: indexdata, indexsubdata: indexdata,
                            kelsub: d.kelsub,
                            kelsub_id: d.kelsub_id, project_id: me.project_id, pt_id: me.pt_id, remarks: keterangan_tambahan_pph, statedata: "create", subcode: d.subgl_code,
                            subgl_id: d.subgl_id, voucher_id: "0", voucherdetail_id: indexdata, vouchersubdetail_id: "", subcashierdesc: "pajak"
                        };

                        substoredatanew.push(row);

                    }
                }

            }

        });

        me.localStore.substore = substoredatanew;

        if (totalpajak == 0) {
            me.tools.alert.warning("Tidak Ada Pajak Di-Generate");
            var form = me.getFormdata();
            form.down("[name=is_pajak]").setValue(0);
            return 0;
        }

        if (containkasbondeptids > 0) {
            for (i = 0; i < pajakdatas.length; i++) {
                pajakdatas[i].amount = accounting.formatMoney(pajakdatas[i].amount);
                storedetail.add(pajakdatas[i]);
            }
        } else {
            var uniquecoapajakfinal = coapajakfinal.filter(function (item, pos) {
                return coapajakfinal.indexOf(item) == pos;
            });

            var pajakdatafinal = [];
            var idxdata = [];

            for (i = 0; i < uniquecoapajakfinal.length; i++) {
                pajakdatafinal[uniquecoapajakfinal[i]] = { amount: 0 };

                for (il = 0; il < pajakdatas.length; il++) {
                    if (idxdata.includes(pajakdatas[il].indexdata) == false) {
                        if (uniquecoapajakfinal[i] == pajakdatas[il].coa) {
                            idxdata.push(pajakdatas[il].indexdata);
                            pajakdatas[il].amount = pajakdatafinal[uniquecoapajakfinal[i]].amount + pajakdatas[il].amount;
                            pajakdatafinal[uniquecoapajakfinal[i]] = pajakdatas[il];
                        }
                    }
                }

            }

            for (i = 0; i < uniquecoapajakfinal.length; i++) {
                pajakdatafinal[uniquecoapajakfinal[i]].amount = accounting.formatMoney(pajakdatafinal[uniquecoapajakfinal[i]].amount);
                storedetail.add(pajakdatafinal[uniquecoapajakfinal[i]]);
            }
        }


        me.setSumdetailSimple();
        me.setSumdetail();

        storedetail.commitChanges();

        me.getGriddetail().getView().refresh();
        me.getGriddetail().down('#btnGenerate').setDisabled(true);
        me.flaggeneratepajak = 0;
        me.paramdetail.changeamount = 0;

    },
    sendRequestmail: function () {
        var me, data;
        me = this.getMe();
        data = me.valueform;
        data['voucher_id'] = me.idheadervalue;
        data['hideparam'] = 'sendrequestmail';
        me.senddata = data;
        me.urlrequest = me.urldata + 'create';
        me.AjaxRequest();
    },
    updateAmountValidate: function () {
        var me, data;
        me = this.getMe();
        data = me.valueform;
        data['voucher_id'] = me.idheadervalue;
        data['hideparam'] = 'validateamount';
        data['approval_rules'] = me.global_param['approval_rules']['value'];

        me.senddata = data;
        me.urlrequest = me.urldata + 'create';
        me.AjaxRequest();
    },
    updateAmountValidateUpload: function (f) {
        var me, data;
        me = this.getMe();
        data = {
            "voucher_id": me.idheadervalue,
            "hideparam": 'validateamount',
            "project_id": me.project_id,
            "pt_id": me.pt_id,
            "kasbank_id": 0
        };
        me.senddata = data;
        me.urlrequest = me.urldata + 'create';
        me.AjaxRequest(f);
        f.up('window').body.unmask();
        f.up('window').close();
    },
    autoApproval: function () {
        var me, data;
        me = this.getMe();
        data = me.valueform;
        data['voucher_id'] = me.idheadervalue;
        data['hideparam'] = 'approvesby';
        me.senddata = data;
        me.urlrequest = me.urldataapprove + 'update';
        me.AjaxRequest();
    },
    setforAjaxCopyVoucher: function () {
        var me, data;
        me = this.getMe();
        data = me.valueform;
        data['voucher_id'] = me.idheadervalue;
        data['hideparam'] = 'copyvoucher';
        me.senddata = data;
        me.urlrequest = me.urldataapprove + 'update';
        me.AjaxRequest();
    },
    checkAuthority: function (action, me) {
        /*Jika @restrictuserview == 0*/

        if (me.tools === undefined || me.tools === null) {
            me.tools = new Cashier.library.box.tools.Tools({ config: me.myConfig });
        }

        var bfx = me.bindPrefixName;

        if (action == bfx + 'Create') {
            return 1;
        }

        var records, record, row, data;
        records = me.getGrid().getSelectionModel().getSelection();
        if (records.length == 0) {
            me.tools.alert.warning("No data selected.");
            return 0;
        }


        if (action == bfx + 'Delete' || action == bfx + 'Approvesby' || action == bfx + 'Update' || action == bfx + 'Copyvoucher') {
            var i;
            var rec;
            for (i = 0; i < records.length; i++) {
                rec = records[i];
                if (rec.data.addby !== apps.uid) {
                    //jika holding 1 bisa edit voucher user lain
                    var subholding_id = parseInt(apps.subholdingId);
                    //console.log(subholding_id);

                    if (me.is_userpajak && rec.data.is_pajak == 1) {
                        //user pajak boleh edit
                        return 1;
                    }
                    if (me.subholding_id === 1 || subholding_id === 1) {
                        return 1;
                    } else {
                        if (me.project_id == 4037) {
                            return 1;
                        } else {
                            if (apps.uid == 25460) {
                                return 1;
                            }else{
                                me.tools.alert.warning("Voucher dibuat oleh " + rec.data.createdby + ", aksi tidak diijinkan.");
                                return 0;
                            }
                        }
                    }
                } else {
                    return 1;
                }
            }

            record = me.getGrid().getSelectionModel().getSelection()[0];
            row = record['data'];
            data = row;
            if (data.addby !== apps.uid) {
                if (apps.uid == 25460) {
                    return 1;
                }else{
                    me.tools.alert.warning("Voucher dibuat oleh " + data.createdby + ", aksi tidak diijinkan.");
                    return 0;
                }
            } else {
                return 1;
            }
        } else {
            return 1;
        }
    },
    execAction: function (el, action, me) {
        if (!action) {
            action = '';
        }
        if (!me) {
            me = this.getMe();
        }

        if (!me.checkAuthority(action, me)) {
            return 0;
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
                me.dataDestroy(el);
                break;
            case me.bindPrefixName + 'Printvoucher':
                me.printVoucherdata();
                // me..getFormdata().setLoading(false);
                break;
            case me.bindPrefixName + 'Copyvoucher':
                me.copyVoucher(0);
                break;
            case me.bindPrefixName + 'Import':
                break;
            case me.bindPrefixName + 'Generate':
                break;
            case me.bindPrefixName + 'Approvepajak':
                //validate
                record = me.getGrid().getSelectionModel().getSelection()[0];
                row = record['data'];
                if (row.status == 7) {
                    me.tools.alert.warning("Voucher ini " + row.voucher_no + " <br>Sudah berstatus Reject");
                    return 0;
                }
                me.Approvepajak();
                break;
            case me.bindPrefixName + 'Approvesby':
                //validate
                record = me.getGrid().getSelectionModel().getSelection()[0];
                row = record['data'];
                me.Approvesby(row);
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
                            me.AjaxRequest(me.getPanel());
                        }

                    },
                    icon: Ext.Msg.QUESTION
                });
                break;
            case me.bindPrefixName + 'SendFinance':
                //validate
                if (me.global_param['is_vd_send_to_finance']['value'] != 1) {
                    me.tools.alert.warning("You cannot send this voucher to finance. Please contact administrator.");
                    return 0;
                }
                record = me.getGrid().getSelectionModel().getSelection()[0];
                if (record.get('status') != 2) {
                    me.tools.alert.warning("Status data must be \"APPROVAL\".");
                    return 0;
                }
                if (record.get('send_date') != null) {
                    me.tools.alert.warning("Voucher has been sent to finance.");
                    return 0;
                }
                me.sendToFinance();
                break;
            case me.bindPrefixName + 'Check':
                //validate
                if (me.global_param['approval_rules']['value'] != "self_approve") {
                    me.tools.alert.warning("You cannot check this voucher because not self approve");
                    return 0;
                }
                console.log(apps.uid);
                console.log(me.global_param);
                if (!me.global_param['TRACKING_VOUCHER_TAX']['value'].includes(apps.uid) &&
                    !me.global_param['TRACKING_VOUCHER_TREASURY']['value'].includes(apps.uid) &&
                    !me.global_param['TRACKING_VOUCHER_COLLECTION']['value'].includes(apps.uid) &&
                    !me.global_param['TRACKING_VOUCHER_HEADFINANCE']['value'].includes(apps.uid) &&
                    !me.global_param['TRACKING_VOUCHER_FC']['value'].includes(apps.uid)) {
                    me.tools.alert.warning("You cannot check this voucher. Please contact administrator");
                    return 0;
                }

                record = me.getGrid().getSelectionModel().getSelection();
                var error = false;

                for (var i = 0; i < record.length; i++) {

                    if (record[i].data.status != 2) {
                        me.tools.alert.warning("Status data must be \"APPROVAL\".");
                        return 0;
                    }

                    if (record[i].data.send_date == null) {
                        me.tools.alert.warning("You haven't sent this voucher yet.");
                        return 0;
                    }

                    if (record[i].data.receive_date == null) {
                        me.tools.alert.warning("Voucher haven't received by finance.");
                        return 0;
                    }

                }
                me.instantWindow('FormDataCheckingVoucher', 500, 'Checking Voucher', 'create', '');
                break
            case me.bindPrefixName + 'ReceiveFinance':
                if (me.global_param['is_vd_send_to_finance']['value'] != 1) {
                    me.tools.alert.warning("You cannot send this voucher to finance. Please contact administrator.");
                    return 0;
                }
                me.receiveFinance();

                break
            case me.bindPrefixName + 'Unapprovesby':
                record = me.getGrid().getSelectionModel().getSelection()[0];
                row = record['data'];

                var filtered = me.global_param['hod_approve_dept_exclusion']['value'].filter(function (el) {
                    return (el = row.department_id)
                });

                if (me.global_param['approval_rules']['value'] == "hod_approve" && filtered.length == 0) {
                    me.tools.alert.warning("Voucher ini " + row.voucher_no + " <br>Hanya Bisa Di UnApprove Oleh Atasan Anda");
                    return 0;
                }

                if (row.status != 2) {
                    me.tools.alert.warning("Voucher ini " + row.voucher_no + " <br> tidak berstatus <b>APPROVED</b>");
                    return 0;
                }

                me.unapprovesby();
                break;
        }
    },
    copyVoucher: function (mode) {
        var me, checked, grid, record, row, data, reportfile;
        me = this.getMe();
        grid = me.getGrid();
        record = grid.getSelectionModel().getSelection()[0];

        if (typeof record === 'undefined') {
            me.tools.alert.warning("Pilih data yang akan di-Copy");
            return 0;
        }

        if (mode === 1) {
            var status = parseInt(record.get('status'));
            if (status > 1) {
                me.tools.alert.warning("Status voucher harus dalam posisi <b>Open</b>");
                return 0;
            }
        }


        var voucher_id = record.get("voucher_id");
        row = record['data'];

        store = me.getStore("Ptbyuser");

        var pt_id = 0;
        var ptname = '';
        var project_id = parseInt(me.project_id);
        var opt = '';
        var projectname = '';

        if (project_id === 0 || project_id == null) {
            me.project_id = me.last_project_id;
            project_id = me.last_project_id;
        } else {
            me.last_project_id = project_id;
        }

        store.each(function (record, id) {
            if (record.get('project_id') === project_id) {
                pt_id = record.get('pt_id');
                ptname = record.get('ptname');
                projectname = record.get('projectname') + '<br>';
                opt = opt + '<option value="' + pt_id + '">' + ptname + '</option>';
            }
        });

        if (mode === 0) {
            var title = 'Copy voucher : ' + record.get("voucher_no");

            me.paramcopyvoucher.formtitle = title;
            me.paramcopyvoucher.mode = mode;
            me.GenerateFormdata(me.paramcopyvoucher);

        } else {
            var title = 'Pindah ke PT : ' + record.get("voucher_no");

            var mb = Ext.MessageBox.show({
                title: title,
                msg: projectname + '<select id="copyvoucher_pt_id" class="x-form-field x-form-required-field x-form-text">' + opt + '</select>',
                buttons: Ext.MessageBox.OKCANCEL,
                fn: function (btn) {
                    if (btn == 'ok') {
                        var copyvoucher_pt_id = Ext.get('copyvoucher_pt_id').getValue();

                        var project_id_selected = parseInt(record.get("project_id"));

                        if (project_id_selected !== project_id) {
                            me.tools.alert.warning("Project Tidak Boleh Berbeda");
                            return 0;
                        }

                        row = record['data'];
                        me.valueform = row;
                        me.valueform.pt_id_new = copyvoucher_pt_id;
                        me.valueform.project_id_old = project_id;

                        me.MessageConfirm('pindahptvoucher', 'Are you sure want to move data to ' + projectname + ' ?', ' Confirm Your Action');

                    }
                }
            });
        }
    },
    createNoteVendor: function (direct, notes) {
        var me = this.getMe();
        var f = me.getFormdata();
        var vendor_id = f.down('[name=vendor_id]').getValue();
        f.down('[name=hideparam]').setValue('createvendornote');
        if (vendor_id == 0 || vendor_id == '' || vendor_id == null) {
            me.tools.alert.warning("Please Select Vendor / Partner.");
            return 0;
        }
        if (direct) {
            if (notes == '' || notes == null) {
                return 0;
            }
            if (notes == "Bank: ; No. Rekening: ; Nama Rekening: ; Email: ") { //kosong
                return 0;
            }
            f.setLoading('Saving note...');
            var nov = notes;
            f.down('[name=input_noteofvendor]').setValue(nov);
            me.tools.ajax({
                params: {
                    module: ''
                },
                form: f,
                success: function (data, info) {
                    try {
                        f.down('[name=vendor_note]').setValue(nov);
                    } catch (err) {
                        me.tools.alert.warning("Failed to create Note of Vendor.");
                    }
                    f.setLoading(false);
                    f.down('[name=hideparam]').setValue('default');
                },
                callback: function (info) {
                    me.setStoreVendornote(f);
                }
            }).create('createvendornote');
        } else {
            Ext.Msg.show(
                {
                    title: 'Add Note Vendor:',
                    width: 350,
                    buttons: Ext.Msg.OKCANCEL,
                    msg: '<textarea style="width:100%" id="text_noteofvendor" name="text_noteofvendor" rows="4" cols="50" autofocus></textarea>',
                    fn: function (button) {
                        if (button == "ok") {
                            f.setLoading('Saving note...');
                            var nov = document.getElementById('text_noteofvendor').value;
                            f.down('[name=input_noteofvendor]').setValue(nov);
                            me.tools.ajax({
                                params: {
                                    module: ''
                                },
                                form: f,
                                success: function (data, info) {
                                    try {
                                        f.down('[name=vendor_note]').setValue(nov);
                                    } catch (err) {
                                        me.tools.alert.warning("Failed to create Note of Vendor.");
                                    }
                                    f.setLoading(false);
                                    f.down('[name=hideparam]').setValue('default');
                                },
                                callback: function (info) {
                                    me.setStoreVendornote(f);
                                }
                            }).create('createvendornote');
                        }
                    }
                });
        }
    },
    printVoucherdata: function () {
        var me, checked, grid, record, row, data, reportfile;
        me = this.getMe();
        grid = me.getGrid();
        checked = grid.down("toolbar [name=checkusecopyvd]").getValue();
        me.checkusecopyvd = checked;
        records = grid.getSelectionModel().getSelection();

        //jika multi
        var voucher_ids = '';
        var dataflow = '';
        var allowforceprint = 0;

        //console.log(me.acts.VDRequestPrintvouchersuper);
        if (typeof me.acts.VDRequestPrintvouchersuper == "undefined") {
            allowforceprint = 0;
        } else {
            allowforceprint = 1;
        }

        if (records.length == 1) {

            var row = records[0].data;

            //jika voucher sudah diproses, realisasi/paid, maka tidak dapat dicetak
            if (row.status > 2 && allowforceprint == 0) {
                Ext.Msg.show({
                    title: 'Cetak Gagal',
                    msg: row.voucher_no + ' : Sudah diproses, harap cek Voucher Status. <br>Hub. team Finance untuk melakukan cetak ulang. <br> <br> action : VDRequestPrintvouchersuper',
                    icon: Ext.Msg.WARNING,
                    buttons: Ext.Msg.OK
                });
                return 0;
            }

        }

        if (records.length > 1) {
            for (i = 0; i < records.length; i++) {
                var row = records[i].data;
                if (i == 0) {
                    dataflow = row.dataflow;
                }
                if (i > 0) {
                    if (dataflow !== row.dataflow) {
                        Ext.Msg.show({
                            title: 'Cetak Gagal',
                            msg: row.voucher_no + ' Dataflow (' + row.dataflow + ') tidak seragam',
                            icon: Ext.Msg.WARNING,
                            buttons: Ext.Msg.OK
                        });
                        return 0;
                    }
                }
                if (row.status == 1) {
                    Ext.Msg.show({
                        title: 'Cetak Gagal',
                        msg: row.voucher_no + ' belum dilakukan self-approval',
                        icon: Ext.Msg.WARNING,
                        buttons: Ext.Msg.OK
                    });
                    return 0;
                }

                if (row.status > 2 && allowforceprint == 0) {
                    Ext.Msg.show({
                        title: 'Cetak Gagal',
                        msg: row.voucher_no + ' : Sudah diproses, harap cek Voucher Status. <br>Hub. team Finance untuk melakukan cetak ulang. <br> <br> action : VDRequestPrintvouchersuper',
                        icon: Ext.Msg.WARNING,
                        buttons: Ext.Msg.OK
                    });
                    return 0;
                }

                voucher_ids = voucher_ids + row.voucher_id + '~';
            }
        }

        //jika multi , maka multi approve
        if (records.length > 1) {
            for (i = 0; i < records.length; i++) {
                var row = records[i].data;
                if (i == 0) {
                    dataflow = row.dataflow;
                }
                me.ApproveAutoMulti(records[i]);
            }
        }

        //go
        record = grid.getSelectionModel().getSelection()[0];
        row = record['data'];

        if (records.length > 1) {
            row["is_multi"] = 1;
            row["voucher_ids"] = voucher_ids;
        } else {
            row["is_multi"] = 0;
            row["voucher_ids"] = row.voucher_id;
        }

        var old_vendornote = row['vendor_note'];
        var new_vendornote = row['vendor_note'] + ' ' + row['vendor_bank_name'] + ' ' + row['vendor_bank_account_no'] + ' ' + row['vendor_bank_account_name'];

        row['vendor_note'] = new_vendornote;

        if (me.global_param['approval_rules']['value'] !== "hod_approve") {
            if (row.status == 1) {
                Ext.Msg.show({
                    title: 'Cetak Gagal',
                    msg: 'Harap lakukan self-approval terlebih dahulu',
                    icon: Ext.Msg.WARNING,
                    buttons: Ext.Msg.OK
                });
                return 0;
            }
        }

        //if(row.approve_user_id > 0) {


        var mb = Ext.MessageBox.show({
            title: 'Mode catatan voucher : ',
            msg: '<select id="notevoucher" class="x-form-field x-form-required-field x-form-text"><option value="1">Description Voucher</option><option value="2">Description Voucher & Note of Vendor</option><option value="3">Note of Vendor</option><option value="4">Blank</option></select>',
            buttons: Ext.MessageBox.OKCANCEL,
            fn: function (btn) {
                if (btn == 'ok') {
                    if (Ext.get('notevoucher').getValue() == "1") {
                        me.tipenotevoucher = 1;
                    } else if (Ext.get('notevoucher').getValue() == "2") {
                        me.tipenotevoucher = 2;
                    } else if (Ext.get('notevoucher').getValue() == "3") {
                        me.tipenotevoucher = 3;
                    } else if (Ext.get('notevoucher').getValue() == "4") {
                        me.tipenotevoucher = 4;
                    }

                    Ext.Msg.confirm('Print Voucher', "Print Data Voucher dengan Pre Printed ?", function (btn) {
                        if (btn == 'yes') {

                            if (row.approve_user_id > 0) {
                                if (checked == true) {
                                    if (me.global_param['approval_rules']['value'] == "hod_approve") {
                                        reportfile = 'Vouchertransaction_kp_with_copy_preprinted';
                                    } else {
                                        reportfile = 'Vouchertransactionwithcopy'
                                    }
                                } else {

                                    if (row.dataflow === "I") {
                                        reportfile = 'VoucherIn'
                                    } else {
                                        reportfile = 'Voucher'
                                    }

                                }
                            }
                            else {
                                if (row.dataflow === "I") {
                                    reportfile = 'VoucherIn'
                                } else {
                                    reportfile = 'Voucher'
                                }
                            }
                            me.report = reportfile;

                            row["tipenotevoucher"] = me.tipenotevoucher;
                            row['vendor_note'] = old_vendornote;
                            data = row;


                            /* 02/06/2019 sync dilakukan saat print */
                            if (me.global_param['approval_rules']['value'] !== "hod_approve") {
                                //lakukan autosync
                                if (row.status == 2) {
                                    // me.syncApprovePrint();
                                }

                            }
                            me.setforAjax(data, 'report', me.getPanel());

                        } else {

                            if (row.approve_user_id > 0) {
                                reportfile = 'Vouchertransaction_kp_preprinted_v3';
                            }
                            else {
                                reportfile = 'Vouchertransaction_kp_preprinted_un';
                            }

                            me.report = reportfile;
                            record = me.getGrid().getSelectionModel().getSelection()[0];
                            row = record['data'];
                            row['vendor_note'] = old_vendornote;
                            data = row;

                            if (me.global_param['approval_rules']['value'] !== "hod_approve") {
                                //lakukan autosync
                                if (row.status == 2) {
                                    // me.syncApprovePrint();
                                }

                            }
                            me.setforAjax(data, 'report', me.getPanel());

                        }

                    });
                }
            }
        });

        //set defaults

        var projects = [39, 54, 5101];

        setTimeout(function () {
            if (projects.includes(me.project_id)) {
                $('#notevoucher').val('1').trigger('change');
            } else {
                $('#notevoucher').val('3').trigger('change');
            }
        }, 100);

    },
    setforAjax: function (data, parameter, f) {
        var me;
        me = this.getMe();
        data['hideparam'] = parameter;
        me.urlrequest = 'cashier/vdrequest/print';
        me.senddata = data;
        me.AjaxRequest(f);
    },
    createWindows: function () {
        var me = this.getMe();
        me.winId = 'reportvoucherdepartmentrequestwindows';
        me.instantWindow('Panel', 800, 'Result ', 'state-report', me.winId, 'masterreport');
        me.win = desktop.getWindow(me.winId);
    },
    submitReport: function (value) {
        var me, report, html;
        me = this.getMe();
        report = 'transaction_voucher/' + me.report;
        if (value.is_multi == 1) {
            me.report = 'multiprint/' + me.report
        }
        if (value.voucherdept_tpl == 'default') {
            report = 'transaction_voucher/' + me.report;
        } else {
            var voucherdept_tpl = value.voucherdept_tpl;
            if (value.is_multi == 1) {
                voucherdept_tpl = 'multiprint/' + voucherdept_tpl;
            }
            report = 'transaction_voucher/' + voucherdept_tpl;
            if (me.checkusecopyvd == true) {
                report = 'transaction_voucher/' + 'vcopy_' + value.voucherdept_tpl;
            }
        }

        html = me.Reportviewerjs(value, report);
        me.win.down("#MyReportPanel").body.setHTML(html);
        $("#Reportform").submit();
    },
    getDefaultEmployee: function (callback) {
        console.log('load default emp');
        var me;
        me = this.getMe();
        me.senddata = {
            "hideparam": 'getemployee',
        }
        me.urlrequest = 'cashier/vdrequest/read';
        me.AjaxRequest(me.getPanel(), callback);
    },
    getApprovalRules: function (callback) {
        var me, form, state, voucher_date;
        me = this.getMe();
        me.senddata = {
            "hideparam": 'global_param', //sesuai global param
            "globalname": 'approval_rules',
            "project_id": me.project_id,
            "param_date": null,
            "pt_id": me.pt_id,
        }
        me.urlrequest = me.urlcommon;
        me.AjaxRequestNoClose(me.getPanel(), function () {
            if (me.global_param['approval_rules']['value'] != "self_approve") {
                Ext.getCmp('row_approval_formdata').setVisible(false);
                Ext.getCmp("btnCheckapproval").setVisible(false);
            } else {
                Ext.getCmp('row_approval_formdata').setVisible(true);
                Ext.getCmp("btnCheckapproval").setVisible(true);
            }
        });
    },
    getVendorCreate: function (callback) {
        var me, form, state, voucher_date;
        me = this.getMe();
        me.senddata = {
            "hideparam": 'global_param', //sesuai global param
            "globalname": 'vendor_create',
            "project_id": me.project_id,
            "param_date": null,
            "pt_id": me.pt_id,
        }
        me.urlrequest = me.urlcommon;
        me.AjaxRequestNoClose(me.getPanel(), function () {
            if (me.global_param['vendor_create']['value'] == '0') {
                Ext.getCmp('btnCreateVendor').setVisible(false);
            } else {
                Ext.getCmp('btnCreateVendor').setVisible(true);
            }
        });
    },
    getCoaPajak: function (callback) {
        var me, form, state, voucher_date;
        me = this.getMe();
        me.senddata = {
            "hideparam": 'global_param', //sesuai global param
            "globalname": 'coa_pajak',
            "project_id": me.project_id,
            "param_date": null,
            "pt_id": me.pt_id,
        }
        me.urlrequest = me.urlcommon;
        me.AjaxRequestNoClose(me.getPanel(), callback);
    },
    getDeptHODApprovalExclusion: function (callback) {
        var me, form, state, voucher_date;
        me = this.getMe();
        me.senddata = {
            "hideparam": 'global_param', //sesuai global param
            "globalname": 'hod_approve_dept_exclusion',
            "project_id": me.project_id,
            "pt_id": me.pt_id,
        }
        me.urlrequest = me.urlcommon;
        me.AjaxRequestNoClose(me.getPanel(), function () {
            me.hod_approve_dept_exclusion = me.info.data.value.split(',');
        });
    },
    getVendorAutofill: function (callback) {
        var me, form, state, voucher_date;
        me = this.getMe();
        me.senddata = {
            "hideparam": 'global_param', //sesuai global param
            "globalname": 'vendor_autofill',
            "project_id": me.project_id,
            "param_date": null,
            "pt_id": me.pt_id,
        }
        me.urlrequest = me.urlcommon;
        me.AjaxRequestNoClose(me.getPanel(), callback);
    },
    getMaxRowVoucher: function (callback) {
        var me, form, state, voucher_date, project_id, pt_id;
        me = this.getMe();
        form = me.getFormdata();
        me.senddata = {
            "hideparam": 'global_param', //sesuai global param
            "globalname": 'MAX_ROW_VOUCHER',
            "project_id": project_id,
            "param_date": null,
            "pt_id": pt_id,
        }
        me.urlrequest = me.urlcommon;
        me.AjaxRequestNoClose(me.getPanel(), callback);
    },
    // SEFTIAN ALFREDO 19/11/2021
    getSendToFinance: function (callback) {
        var me;
        me = this.getMe();
        me.senddata = {
            "hideparam": 'global_param',
            "globalname": 'vd_send_to_finance',
            "project_id": me.project_id,
            "pt_id": me.pt_id,

        }
        me.urlrequest = me.urlcommon;
        me.AjaxRequestNoClose(me.getPanel(), callback);
    },
    getAllowDepartmentAccess: function (callback) {
        var me;
        me = this.getMe();
        me.senddata = {
            "hideparam": 'getdeptaccessbyuser',
            "user_id": apps.uid,
            "project_id": me.project_id,
            "pt_id": me.pt_id,

        }
        me.urlrequest = me.urlcommon;
        me.AjaxRequestNoClose(me.getPanel(), callback);
    },
    // SEFTIAN ALFREDO 09/02/2022 - CHECKING VOUCHER USING GLOBAL PARAM
    getTrackingVoucherTax: function (callback) {
        var me;
        me = this.getMe();
        me.senddata = {
            "hideparam": 'tracking_voucher',
            "globalname": 'TRACKING_VOUCHER_TAX',
            "project_id": me.project_id,
            "param_date": null,
            "pt_id": me.pt_id,

        }
        me.urlrequest = me.urlcommon;
        me.AjaxRequestNoClose(me.getPanel(), callback);
    },
    getTrackingVoucherTreasury: function (callback) {
        var me;
        me = this.getMe();
        me.senddata = {
            "hideparam": 'tracking_voucher',
            "globalname": 'TRACKING_VOUCHER_TREASURY',
            "project_id": me.project_id,
            "param_date": null,
            "pt_id": me.pt_id,

        }
        me.urlrequest = me.urlcommon;
        me.AjaxRequestNoClose(me.getPanel(), callback);
    },
    getTrackingVoucherCollection: function (callback) {
        var me;
        me = this.getMe();
        me.senddata = {
            "hideparam": 'tracking_voucher',
            "globalname": 'TRACKING_VOUCHER_COLLECTION',
            "project_id": me.project_id,
            "param_date": null,
            "pt_id": me.pt_id,

        }
        me.urlrequest = me.urlcommon;
        me.AjaxRequestNoClose(me.getPanel(), callback);
    },
    getTrackingVoucherHeadFinance: function (callback) {
        var me;
        me = this.getMe();
        me.senddata = {
            "hideparam": 'tracking_voucher',
            "globalname": 'TRACKING_VOUCHER_HEADFINANCE',
            "project_id": me.project_id,
            "param_date": null,
            "pt_id": me.pt_id,

        }
        me.urlrequest = me.urlcommon;
        me.AjaxRequestNoClose(me.getPanel(), callback);
    },
    getPTCGG: function (callback) {
        var me;
        me = this.getMe();
        me.senddata = {
            "hideparam": 'is_cgg',
            "project_id": me.project_id,
            "pt_id": me.pt_id,
        }
        me.urlrequest = me.urlcommon;
        me.AjaxRequestNoClose(me.getPanel(), callback);
    },
    getCheckerApproval: function (callback) {
        var me;
        me = this.getMe();
        me.senddata = {
            "hideparam": 'tracking_voucherV2',
            "globalname": 'TRACKING_VOUCHER_',
            "project_id": me.project_id,
            "pt_id": me.pt_id,

        }
        me.urlrequest = me.urlcommon;
        me.AjaxRequestNoClose(me.getPanel(), callback);
    },
    setStoreKashbondepthasapply: function () {
        var me, store, state, form, in_out, cash_bank, kasbondept, kasbongiro, voucherprefix_id;
        me = this.getMe();

        //init
        me.localStore.substore = [];

        form = me.getFormdata();
        in_out = me.in_out;
        state = form.up('window').state.toLowerCase();
        store = me.getStore('Kasbondeptcomboapply');
        if (state == 'create') {
            form.down("[name=kasbondept_id]").setValue('');
        }
        var ckasbondept_id = form.down('[name=kasbondept_id_fixed]').getValue()
        ckasbondept_id = parseInt(ckasbondept_id);

        if (ckasbondept_id > 0) {

            if (state == 'update' || state == 'read') {

                store.load({
                    params: {
                        "query": me.cashbon_no,
                        "hideparam": "getdataapplyposting",
                        "project_id": me.project_id,
                        "pt_id": me.pt_id,
                        "department_id": me.getVal(form, 'department_id', 'value'),
                        "dataflow": in_out,
                        "status": 3,
                        "limit": 1,
                        "ckasbondept_id": ckasbondept_id
                    },
                    callback: function (records, operation, success) {
                        form.down("[name=kasbondept_id]").setValue(ckasbondept_id);
                    }
                });


            }
            form.down("[name=is_pjk]").setValue(1);
        } else {
            store.proxy.extraParams = {
                "hideparam": "getdataapplyposting",
                "project_id": me.project_id,
                "pt_id": me.pt_id,
                "department_id": me.getVal(form, 'department_id', 'value'),
                "dataflow": in_out,
                "status": 3,
                "limit": 10
            }
        }

        form.down("[name=kasbondept_id]").on('keyup', function (e, t, eOpts) {
            store.proxy.extraParams = {
                "hideparam": "getdataapplyposting",
                "project_id": me.project_id,
                "pt_id": me.pt_id,
                "department_id": me.getVal(form, 'department_id', 'value'),
                "dataflow": in_out,
                "status": 3,
                "limit": 10
            }
        });

        if (state == 'create') {
            //removeall when create
            storedetail = me.getGriddetail().getStore();
            if (storedetail.getCount() > 0) {
                storedetail.removeAll();
                form.down("[name=amount]").setValue(0);
            }
        }


    },
    DestroyKashbondepthasapply: function () {
        var me, store, state, form, in_out, cash_bank, kasbondept, kasbongiro, voucherprefix_id;
        me = this.getMe();
        form = me.getFormdata();
    },
    generateDetailfromkasbon: function (rowdata, is_multi) {
        var me, form, status, store, storedetail, storesubdetail, storekasbondeptsubdetail, data, datasub, griddetail, substoredata;
        me = this.getMe();
        form = me.getFormdata();
        griddetail = me.getGriddetail();
        status = me.getVal(form, 'status', 'value');
        var kasbondeptdetail_id = 0;
        var localsubstore = [];
        var indexdata = 0;
        var btn = 'yes';

        //set is_pjk = 1
        form.down("[name=is_pjk]").setValue(1);
        //add to localstore

        var kasbondeptdetailidx = [];
        if (status == '1' || status == '2') {
            if (btn == 'yes') {
                storedetail = me.getStore('VDRequestdetail');
                storesubdetail = me.getStore('VDRequestsubdetail');
                store = me.getStore('Kasbondeptpostingdetail');
                form.setLoading('Create data detail ' + rowdata.voucher_no + ', please wait ...');

                /*Clean if is multi*/
                if (storedetail.getCount() > 0 && is_multi == 1) {
                    storedetail.each(function (rec) {
                        rec.set("deleted", true);
                        rec.set("statedata", 'delete');
                    });
                    storedetail.clearFilter(true);
                    storedetail.filter('deleted', false);
                    //sstoredetail.removeAll();       
                }

                if (is_multi == 0) {
                    me.cashbonSelectDropdown(rowdata, true);
                }

                /*disable dropdown*/
                form.down("[name=kasbon]")
                store.load({
                    params: {
                        "hideparam": 'default',
                        "kasbondept_id": rowdata.kasbondept_id,
                    },
                    callback: function (records, operation, success) {
                        me.up = 1;

                        //clear
                        me.localStore.substore = [];

                        if (store.getCount() > 0) {

                            if (storedetail.getCount() > 0 && is_multi == 0) {
                                storedetail.each(function (rec) {
                                    rec.set("deleted", true);
                                    rec.set("statedata", 'delete');
                                });
                                storedetail.clearFilter(true);
                                storedetail.filter('deleted', false);
                                storedetail.removeAll();
                                storesubdetail.removeAll();
                            }

                            me.paramdetail.kasbondept_id = [];
                            store.each(function (record, index) {

                                if (is_multi == 1) {
                                    index = me.lastindexdata;
                                    me.lastindexdata = index + 1;
                                }

                                data = record['data'];
                                data['statedata'] = 'create';

                                data[me.idheaderfield] = me.idheadervalue;
                                data[me.idheaderfield2] = me.idheadervalue2;
                                data['indexdata'] = index + 1;
                                indexdata = index + 1;
                                data['indexdataheader'] = me.idheadervalue;
                                kasbondeptdetail_id = data['kasbondeptdetail_id'];
                                me.paramdetail.kasbondept_id.push(data['kasbondeptdetail_id']);

                                kasbondeptdetailidx[kasbondeptdetail_id] = indexdata;

                                data['indexsubdata'] = data['indexdata'];
                                data['kasbondept_id'] = rowdata.kasbondept_id;
                                data['cashbon_no'] = rowdata.voucher_no + ' (' + rowdata.made_by_name + ')';
                                data['voucher_no'] = rowdata.voucher_no;
                                data['typetransdetail'] = rowdata.dataflow;
                                data['remarks'] = data['description'];

                                storedetail.add(data);
                                storedetail.commitChanges();
                                storedetail.filter('deleted', false);

                                if (is_multi == 0) {
                                    form.down("[name=description]").setValue(data.description);
                                }

                                var sumamount = 0;

                                var dataflow = '';

                                if (rowdata.remainingkasbon > 0) {
                                    var sumamount = rowdata.remainingkasbon;
                                } else {
                                    var sumamount = rowdata.amount;
                                }

                                me.paramdetail.totaldetail = sumamount;

                                me.valuekasbon = sumamount;
                                me.initamount = sumamount;

                                form.down("[name=valuekasbon]").setValue(sumamount);

                                //MARKED AS CHANGED
                                me.remainingkasbon = 'changed';
                                //me.paramdetail.totaldetail = storedetail.sum('amount');
                                me.setSumdetail();
                                if (parseInt(data['kelsub_id']) > 0) {
                                    storesubdetail = me.getStore('VDRequestsubdetail');
                                    storekasbondeptsubdetail = me.getStore('Kasbondeptpostingsubdetail');
                                    storekasbondeptsubdetail.load({
                                        params: {
                                            "hideparam": 'default',
                                            "kasbondept_id": rowdata.kasbondept_id,
                                            "kasbondeptdetail_id": parseInt(data['kasbondeptdetail_id']),
                                            "limit": 1000
                                        },
                                        callback: function (records, operation, success) {
                                            if (storekasbondeptsubdetail.getCount() > 0) {
                                                var i = 0;
                                                storekasbondeptsubdetail.each(function (recordsub, indexsub) {

                                                    i = i + 1;

                                                    datasub = recordsub['data'];
                                                    datasub['statedata'] = 'create';
                                                    data[me.idheaderfield] = me.idheadervalue;
                                                    //data[me.idheaderfield2] = me.idheadervalue2;
                                                    datasub[me.iddetailfield] = data['indexdata'];
                                                    datasub['indexsubdata'] = kasbondeptdetailidx[parseInt(datasub['kasbondeptdetail_id'])];
                                                    datasub['indexdataheader'] = kasbondeptdetailidx[parseInt(datasub['kasbondeptdetail_id'])];
                                                    datasub['indexdata'] = i;
                                                    datasub['kasbondept_id'] = rowdata.kasbondept_id;
                                                    //datasub[me.iddetailfield2] = data['kasbondeptdetail_id'];
                                                    me.paramsubdetail.kasbondeptsubdetail_id.push(datasub['kasbondeptsubdetail_id']);
                                                    me.localStore.substore.push(datasub);
                                                    storesubdetail.add(datasub);
                                                    storesubdetail.commitChanges();
                                                });
                                            }
                                        }
                                    });

                                }


                            });
                            me.setDatadetailAftersave();
                        }

                        me.idxendloading = me.idxendloading + 1;
                        form.setLoading(false);
                        if (is_multi == 1) {
                            form.setLoading('Create data detail ' + rowdata.voucher_no + ', please wait ...');
                        }
                        if (is_multi == 1 && (me.idxloading == me.idxendloading)) {
                            form.setLoading(false);
                        }
                    }
                });
                griddetail.up('window').body.unmask();
            }
        }
    },
    setStoreVendor: function () {
        var me, store, form;
        me = this.getMe();
        form = me.getFormdata();
        form.setLoading(true);

        if (me.pt_id > 0) {
            store = me.getStore('Vendorcombo');
            store.load({
                params: {
                    "hideparam": 'getvendor',
                    "project_id": me.project_id,
                    "pt_id": me.pt_id,
                    "type_vendor": me.type_vendor
                },
                callback: function (records, operation, success) {
                }
            });
        }
        form.setLoading(false);
    },
    getForproject: function (callback) {
        var me = this.getMe();
        var f = me.getFormdata();
        f.setLoading('Please wait...');
        var pt_id = f.down('[name=pt_id]').getValue();
        me.tools.ajax({
            params: {
                module: 'global',
                pt_id: pt_id
            },
            form: f,
            success: function (data) {
                try {
                    me.tools.weseav2(data.pt, f.down("[name=cashbon_pt_id]")).comboBox();
                    if (typeof callback === "function") {
                        callback();
                    }
                } catch (err) {
                    me.tools.alert.warning("Failed to get projectpt.");
                }
                f.setLoading(false);
            }
        }).read('getprojectpt');
    },
    setStoreVendorPt: function () {
        var me, store, form;
        me = this.getMe();
        form = me.getFormdata();
        store = me.getStore('Vendorcombo');

        if (me.vendor_id > 0) {
            var vendorname = me.vendorname;
        } else {
            var vendorname = '';
        }

        if (me.pt_id > 0) {
            store.load({
                params: {
                    "query": vendorname,
                    "hideparam": 'getvendor',
                    "project_id": me.project_id,
                    "pt_id": me.pt_id,
                    "type_vendor": me.type_vendor
                },
                callback: function (records, operation, success) {
                }
            });

            form.down("[name=vendor_id]").on('keyup', function (e, t, eOpts) {
                store.proxy.extraParams = {
                    "hideparam": 'getvendor',
                    "project_id": me.project_id,
                    "pt_id": me.pt_id,
                    "type_vendor": me.type_vendor
                }
            });
        }

    },

    setStoreVendorPtLiveSearch: function (val) {
        var me, store, form;
        me = this.getMe();

        if (me.pt_id > 0) {
            store = me.getStore('Vendorcombo');
            store.load({
                params: {
                    "term": val,
                    "hideparam": 'getvendor',
                    "project_id": me.project_id,
                    "pt_id": me.pt_id,
                    "type_vendor": me.type_vendor
                },
                callback: function (records, operation, success) {
                }
            });
        }

    },

    setStoreDeptuserPt: function () {
        var me, store, form;
        me = this.getMe();
        form = me.getFormdata();
        form.setLoading(true);
        /*me.getAllowDepartmentAccess();*/
        store = me.getStore("Department");

        store.reload({
            params: {
                "hideparam": 'getdepartmentbyprojectpt',
                "user_id": apps.uid,
                "pt_id": me.pt_id,
                "project_id": me.project_id
            },
            callback: function (records, operation, success) {
                store.filterBy(function (rec, id) {
                    if (me.allowed_dept.includes(rec.get('department_id'))) {
                        return true;
                    }
                    else {
                        return false;
                    }
                });

                var department_id = 0;
                try {
                    department_id = form.down('[name=department_id]').getValue();
                }
                catch (err) {
                    department_id = 0;
                }
                if (department_id == "") { //kalau kosong aja
                    /*if (store.getCount() == 1) {
                        var deptid = store.data.items[0].data.department_id;
                        me.setVal(form, 'department_id', deptid);
                    } else {*/
                    store.each(function (record) {
                        if (record.data['department_id'] == me.department_id) {
                            me.setVal(form, 'department_id', record.data['department_id']);
                            me.setVal(form, 'prefixdept', record.data['prefixdept']);
                            me.prefixdept = record.data['code'];
                        } else if (record.data['department'] == me.department_name) {
                            me.setVal(form, 'department_id', record.data['department_id']);
                            me.setVal(form, 'prefixdept', record.data['prefixdept']);
                            me.prefixdept = record.data['code'];
                        } else if (record.data['code'] == me.department_code) {
                            me.setVal(form, 'department_id', record.data['department_id']);
                            me.setVal(form, 'prefixdept', record.data['prefixdept']);
                            me.prefixdept = record.data['code'];
                        }
                    });
                    // }
                }

                form.down('[name=department_id]').setDisabled(false);

            }
        });
        form.setLoading(false);
    },
    setDefaultDeptuserPt: function () {
        var me, store, form;
        me = this.getMe();
        form = me.getFormdata();
        form.setLoading(true);
        store = me.getStore("Department");
        var department_id = 0;
        try {
            department_id = form.down('[name=department_id]').getValue();
        }
        catch (err) {
            department_id = 0;
        }
        if (department_id == "") { //kalau kosong aja
            store.each(function (record) {
                if (record.data['department_id'] == me.department_id) {
                    me.setVal(form, 'department_id', record.data['department_id']);
                    me.setVal(form, 'prefixdept', record.data['prefixdept']);
                    me.prefixdept = record.data['code'];
                } else if (record.data['department'] == me.department_name) {
                    me.setVal(form, 'department_id', record.data['department_id']);
                    me.setVal(form, 'prefixdept', record.data['prefixdept']);
                    me.prefixdept = record.data['code'];
                } else if (record.data['code'] == me.department_code) {
                    me.setVal(form, 'department_id', record.data['department_id']);
                    me.setVal(form, 'prefixdept', record.data['prefixdept']);
                    me.prefixdept = record.data['code'];
                }
            });
        } else {
            if (!me.allowed_dept.includes(department_id)) {
                // console.log('false');
                me.setVal(form, 'department_id', 0);
                me.getGriddetail().down('#btnAdd').setDisabled(true);
            }/*else{
                console.log('true');
            }*/
        }
        form.setLoading(false);
    },
    Approvesby: function (data) {
        var me;
        me = this.getMe();

        var filtered = me.global_param['hod_approve_dept_exclusion']['value'].filter(function (el) {
            return (el == data.department_id);
        });

        if (me.global_param['approval_rules']['value'] == "hod_approve" && filtered.length == 0) {
            me.tools.alert.warning("Voucher ini " + data.voucher_no + " <br>Hanya Bisa Di-Approve Oleh Atasan Anda");
            return 0;
        }

        if (data.status > 1) {
            me.tools.alert.warning("Voucher ini " + row.voucher_no + " <br>telah di <b>APPROVED</b>");
            return 0;
        }

        me.MessageConfirm('approvesby', 'Jika voucher di <i>approve</i> maka <b>tidak akan bisa diubah dan dihapus</b>,<br> Apakah anda yakin ?', ' Confirm Your Approval');
    },
    Approvepajak: function () {
        var me;
        me = this.getMe();
        if (me.is_userpajak) {
            me.MessageConfirm('approvepajak', 'Are you sure want to approve tax ?', ' Confirm Your Approval');
        } else {
            me.tools.alert.warning("Role Anda Tidak Dapat Melakukan Approval Pajak");
            return 0;
        }
    },
    Approvesbyauto: function () {
        var me;
        me = this.getMe();
        me.MessageConfirm('approvesby', 'Jika voucher di <i>approve</i> maka <b>tidak akan bisa diubah dan dihapus</b>,<br> Apakah anda yakin ?', ' Confirm Your Approval');
    },
    sendToFinance: function () {
        var me;
        me = this.getMe();
        me.MessageConfirm('vd_send_to_finance', 'Are you sure want to send this ?', ' Requesting Confirmation');
    },
    receiveFinance: function () {
        var me;
        me = this.getMe();
        var ids = [];
        var rows = me.getGrid().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            var confirmmsg, successmsg, failmsg, failed, responsemsg;
            var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            failmsg = 'Voucher dengan nomor <br />';
            failed = false;

            for (var i = 0; i < rows.length; i++) {
                if (!rows[i].data.send_date) {
                    failmsg += '- ' + rows[i].data.voucher_no + '<br />';
                    failed = true;
                }
            }
            if (failed) {
                failmsg += 'belum di kirim. Silahkan periksa kembali.';
                me.tools.alert.warning(failmsg);
                return 0;
            }

            for (var i = 0; i < rows.length; i++) {
                if (rows[i].data.receive_date) {
                    failmsg += '- ' + rows[i].data.voucher_no + '<br />';
                    failed = true;
                }
            }
            if (failed) {
                failmsg += 'sudah di terima. Silahkan periksa kembali.';
                me.tools.alert.warning(failmsg);
                return 0;
            }

            for (var i = 0; i < rows.length; i++) {
                ids.push(rows[i].data.voucher_id);
            }

            if (rows.length == 1) {
                var selectedRecord = '[' + rows[0].data.voucher_no + ']';
                confirmmsg = 'Receive ' + selectedRecord + ' ?';
            } else {
                confirmmsg = 'This action will receive ' + recordcounttext + '.<br />Continue ?';
            }

            Ext.Msg.confirm('Receive Voucher', confirmmsg, function (btn) {
                if (btn == 'yes') {
                    resetTimer();
                    var msg = function () {
                        me.getGrid().up('window').mask('Processing data, please wait ...');
                    };
                    responsemsg = 'Report : <br />';
                    for (var i = 0; i < rows.length; i++) {
                        var sendData = rows[i].data;
                        sendData['hideparam'] = 'receivefinance';

                        Ext.Ajax.request({
                            url: me.urldata + 'update',
                            method: 'POST',
                            async: false,
                            timeout: 45000000,
                            params: {
                                data: Ext.encode(sendData)
                            },
                            success: function (response) {
                                try {
                                    var decodeResponse = Ext.JSON.decode(response.responseText);
                                    console.log(decodeResponse);
                                    responsemsg += '[' + decodeResponse.data[3][0].voucher_no + '] ' + decodeResponse.msg + '<br />';
                                    Ext.Msg.show({
                                        title: 'INFO',
                                        msg: responsemsg,
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.Msg.INFO
                                    });
                                    me.getGrid().up('window').unmask();
                                    me.getGrid().getStore().reload();
                                } catch (err) {
                                    console.log(err);
                                }
                            }
                        });
                    }
                }
            });
        }
        // me.MessageConfirm('receivefinance', 'Receive this voucher by finance ?', ' Requesting Confirmation');
    },
    // SEFTIAN ALFREDO 09/02/2022 - TOMBOL UNTUK RESET SEND DAN RECEIVE DATE
    needRevise: function () {
        var me, grid, record, confirmmsg, successmsg, failmsg, failed, responsemsg;
        me = this.getMe();
        grid = me.getGrid();
        record = grid.getSelectionModel().getSelection()[0];

        if (typeof record == 'undefined') {
            me.tools.alert.warning("Select 1 voucher.");
            return 0;
        }

        if (record.data.status != 2) {
            me.tools.alert.warning("Status data must be \"APPROVAL\".");
            return 0;
        }

        var selectedRecord = '[' + record.data.voucher_no + ']';
        confirmmsg = 'Revise ' + selectedRecord + ' ?';

        Ext.Msg.confirm('Requesting Confirmation', confirmmsg + '<br><br>Reason <br><textarea type="text" id="reasonneedrevise" name="reasonneedrevise"></textarea>', function (btn) {
            if (btn == 'yes') {
                resetTimer();
                var msg = function () {
                    me.getGrid().up('window').mask('Processing data, please wait ...');
                };
                responsemsg = 'Report : <br />';
                var sendData = record.data;
                sendData['hideparam'] = 'needrevise';
                sendData['reasondelete'] = $('#reasonneedrevise').val();
                sendData['user_id'] = apps.uid;
                Ext.Ajax.request({
                    url: me.urldata + 'update',
                    method: 'POST',
                    async: false,
                    timeout: 45000000,
                    params: {
                        data: Ext.encode(sendData)
                    },
                    success: function (response) {
                        try {
                            var decodeResponse = Ext.JSON.decode(response.responseText);
                            console.log(decodeResponse);
                            responsemsg += '[' + decodeResponse.data[3][0].voucher_no + '] ' + decodeResponse.msg + '<br />';
                            Ext.Msg.show({
                                title: 'INFO',
                                msg: responsemsg,
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.INFO
                            });
                            me.getGrid().up('window').unmask();
                            me.getGrid().getStore().reload();
                        } catch (err) {
                            console.log(err);
                        }
                    }
                });
            }
        });

        // me.MessageConfirm('needrevise', 'Revise this voucher ?', ' Requesting Confirmation');
    },
    unsentFinance: function () {
        var me = this.getMe(),
            ids = [],
            grid = me.getGrid(),
            rows = grid.getSelectionModel().getSelection(),
            confirmmsg, successmsg, failmsg, failed, responsemsg, recordcounttext;

        if (rows.length < 1) {
            me.buildWarningAlert("Silahkan pilih minimal 1 data");
            return false;
        } else {
            recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            failmsg = 'Voucher dengan nomor <br>';
            failed = false;

            for (var i = 0; i < rows.length; i++) {
                if (!rows[i].data.send_date) {
                    failmsg += '- ' + rows[i].data.voucher_no + '<br />';
                    failed = true;
                }
            }
            if (failed) {
                failmsg += 'belum di kirim. Silahkan periksa kembali.';
                me.tools.alert.warning(failmsg);
                return 0;
            }

            for (var i = 0; i < rows.length; i++) {
                ids.push(rows[i].data.voucher_id);
            }

            if (rows.length == 1) {
                var selectedRecord = '[' + rows[0].data.voucher_no + ']';
                confirmmsg = 'Unsent ' + selectedRecord + ' ?';
            } else {
                confirmmsg = 'This action will unsent ' + recordcounttext + '.<br />Continue ?';
            }

            Ext.Msg.confirm('Unsent Voucher', confirmmsg, function (btn) {
                if (btn == 'yes') {
                    resetTimer();
                    var msg = function () {
                        me.getGrid().up('window').mask('Processing data, please wait ...');
                    };
                    responsemsg = 'Report : <br />';
                    for (var i = 0; i < rows.length; i++) {
                        var sendData = rows[i].data;
                        sendData['hideparam'] = 'unsentfinance';

                        Ext.Ajax.request({
                            url: me.urldata + 'update',
                            method: 'POST',
                            async: false,
                            timeout: 45000000,
                            params: {
                                data: Ext.encode(sendData)
                            },
                            success: function (response) {
                                try {
                                    var decodeResponse = Ext.JSON.decode(response.responseText);
                                    console.log(decodeResponse);
                                    responsemsg += '[' + decodeResponse.data[3][0].voucher_no + '] ' + decodeResponse.msg + '<br />';
                                    Ext.Msg.show({
                                        title: 'INFO',
                                        msg: responsemsg,
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.Msg.INFO
                                    });
                                    me.getGrid().up('window').unmask();
                                    me.getGrid().getStore().reload();
                                } catch (err) {
                                    console.log(err);
                                }
                            }
                        });
                    }
                }
            });

        }
    },
    unreceivefinance: function () {
        var me;
        me = this.getMe();
        var ids = [];
        var rows = me.getGrid().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            var confirmmsg, successmsg, failmsg, failed, responsemsg;
            var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            failmsg = 'Voucher dengan nomor <br />';
            failed = false;

            for (var i = 0; i < rows.length; i++) {
                if (!rows[i].data.send_date) {
                    failmsg += '- ' + rows[i].data.voucher_no + '<br />';
                    failed = true;
                }
            }
            if (failed) {
                failmsg += 'belum di kirim. Silahkan periksa kembali.';
                me.tools.alert.warning(failmsg);
                return 0;
            }

            for (var i = 0; i < rows.length; i++) {
                if (!rows[i].data.receive_date) {
                    failmsg += '- ' + rows[i].data.voucher_no + '<br />';
                    failed = true;
                }
            }
            if (failed) {
                failmsg += 'belum di terima. Silahkan periksa kembali.';
                me.tools.alert.warning(failmsg);
                return 0;
            }

            for (var i = 0; i < rows.length; i++) {
                ids.push(rows[i].data.voucher_id);
            }

            if (rows.length == 1) {
                var selectedRecord = '[' + rows[0].data.voucher_no + ']';
                confirmmsg = 'Unreceive ' + selectedRecord + ' ?';
            } else {
                confirmmsg = 'This action will unreceive ' + recordcounttext + '.<br />Continue ?';
            }

            Ext.Msg.confirm('Unreceive Voucher', confirmmsg, function (btn) {
                if (btn == 'yes') {
                    resetTimer();
                    var msg = function () {
                        me.getGrid().up('window').mask('Processing data, please wait ...');
                    };
                    responsemsg = 'Report : <br />';
                    for (var i = 0; i < rows.length; i++) {
                        var sendData = rows[i].data;
                        sendData['hideparam'] = 'unreceivefinance';

                        Ext.Ajax.request({
                            url: me.urldata + 'update',
                            method: 'POST',
                            async: false,
                            timeout: 45000000,
                            params: {
                                data: Ext.encode(sendData)
                            },
                            success: function (response) {
                                try {
                                    var decodeResponse = Ext.JSON.decode(response.responseText);
                                    console.log(decodeResponse);
                                    responsemsg += '[' + decodeResponse.data[3][0].voucher_no + '] ' + decodeResponse.msg + '<br />';
                                    Ext.Msg.show({
                                        title: 'INFO',
                                        msg: responsemsg,
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.Msg.INFO
                                    });
                                    me.getGrid().up('window').unmask();
                                    me.getGrid().getStore().reload();
                                } catch (err) {
                                    console.log(err);
                                }
                            }
                        });
                    }
                }
            });
        }
    },
    uncheckapprove: function () {
        var me;
        me = this.getMe();
        var ids = [];
        var rows = me.getGrid().getSelectionModel().getSelection();
        console.log(rows);
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            var confirmmsg, successmsg, failmsg, failed, responsemsg;
            var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            failmsg = 'Voucher dengan nomor <br />';
            failed = false;

            for (var i = 0; i < rows.length; i++) {
                if (!rows[i].data.send_date) {
                    failmsg += '- ' + rows[i].data.voucher_no + '<br />';
                    failed = true;
                }
            }
            if (failed) {
                failmsg += 'belum di kirim. Silahkan periksa kembali.';
                me.tools.alert.warning(failmsg);
                return 0;
            }

            for (var i = 0; i < rows.length; i++) {
                if (!rows[i].data.receive_date) {
                    failmsg += '- ' + rows[i].data.voucher_no + '<br />';
                    failed = true;
                }
            }
            if (failed) {
                failmsg += 'belum di terima. Silahkan periksa kembali.';
                me.tools.alert.warning(failmsg);
                return 0;
            }

            for (var i = 0; i < rows.length; i++) {
                var sendData = rows[i].data;
                sendData['hideparam'] = 'checkhasapprove';
                sendData['user_id'] = apps.uid;


                if (me.global_param['TRACKING_VOUCHER_TAX']['value'].length != 0 && me.global_param['TRACKING_VOUCHER_TAX']['value'].includes(parseInt(apps.uid))) {
                    sendData['approval_type'] = 'TRACKING_VOUCHER_TAX';
                }

                if (me.global_param['TRACKING_VOUCHER_TREASURY']['value'].length != 0 && me.global_param['TRACKING_VOUCHER_TREASURY']['value'].includes(parseInt(apps.uid))) {
                    sendData['approval_type'] = 'TRACKING_VOUCHER_TREASURY';
                }

                if (me.global_param['TRACKING_VOUCHER_COLLECTION']['value'].length != 0 && me.global_param['TRACKING_VOUCHER_COLLECTION']['value'].includes(parseInt(apps.uid))) {
                    sendData['approval_type'] = 'TRACKING_VOUCHER_COLLECTION';
                }

                if (me.global_param['TRACKING_VOUCHER_HEADFINANCE']['value'].length != 0 && me.global_param['TRACKING_VOUCHER_HEADFINANCE']['value'].includes(parseInt(apps.uid))) {
                    sendData['approval_type'] = 'TRACKING_VOUCHER_HEADFINANCE';
                }

                if (me.global_param['TRACKING_VOUCHER_FC']['value'].length != 0 && me.global_param['TRACKING_VOUCHER_FC']['value'].includes(parseInt(apps.uid))) {
                    sendData['approval_type'] = 'TRACKING_VOUCHER_FC';
                }

                Ext.Ajax.request({
                    url: me.urldata + 'read',
                    method: 'POST',
                    async: false,
                    timeout: 45000000,
                    params: sendData,
                    success: function (response) {
                        try {
                            var decodeResponse = Ext.JSON.decode(response.responseText);
                            console.log(decodeResponse);
                            if (decodeResponse.data == null) {
                                failmsg += '- ' + rows[i].data.voucher_no + '<br />';
                                failed = true;
                            }
                        } catch (err) {
                            console.log(err);
                        }
                    }
                });
            }
            if (failed) {
                failmsg += 'belum di check approval. Silahkan periksa kembali.';
                me.tools.alert.warning(failmsg);
                return 0;
            }

            for (var i = 0; i < rows.length; i++) {
                ids.push(rows[i].data.voucher_id);
            }

            if (rows.length == 1) {
                var selectedRecord = '[' + rows[0].data.voucher_no + ']';
                confirmmsg = 'Unapprove ' + selectedRecord + ' ?';
            } else {
                confirmmsg = 'This action will unapprove ' + recordcounttext + '.<br />Continue ?';
            }

            Ext.Msg.confirm('Unapprove Voucher', confirmmsg, function (btn) {
                if (btn == 'yes') {
                    resetTimer();
                    var msg = function () {
                        me.getGrid().up('window').mask('Processing data, please wait ...');
                    };
                    responsemsg = 'Report : <br />';
                    for (var i = 0; i < rows.length; i++) {
                        var sendData = rows[i].data;
                        sendData['hideparam'] = 'uncheckapprove';
                        sendData['user_id'] = apps.uid;

                        if (me.global_param['TRACKING_VOUCHER_TAX']['value'].length != 0 && me.global_param['TRACKING_VOUCHER_TAX']['value'].includes(parseInt(apps.uid))) {
                            sendData['approval_type'] = 'TRACKING_VOUCHER_TAX';
                        }

                        if (me.global_param['TRACKING_VOUCHER_TREASURY']['value'].length != 0 && me.global_param['TRACKING_VOUCHER_TREASURY']['value'].includes(parseInt(apps.uid))) {
                            sendData['approval_type'] = 'TRACKING_VOUCHER_TREASURY';
                        }

                        if (me.global_param['TRACKING_VOUCHER_COLLECTION']['value'].length != 0 && me.global_param['TRACKING_VOUCHER_COLLECTION']['value'].includes(parseInt(apps.uid))) {
                            sendData['approval_type'] = 'TRACKING_VOUCHER_COLLECTION';
                        }

                        if (me.global_param['TRACKING_VOUCHER_HEADFINANCE']['value'].length != 0 && me.global_param['TRACKING_VOUCHER_HEADFINANCE']['value'].includes(parseInt(apps.uid))) {
                            sendData['approval_type'] = 'TRACKING_VOUCHER_HEADFINANCE';
                        }

                        if (me.global_param['TRACKING_VOUCHER_FC']['value'].length != 0 && me.global_param['TRACKING_VOUCHER_FC']['value'].includes(parseInt(apps.uid))) {
                            sendData['approval_type'] = 'TRACKING_VOUCHER_FC';
                        }

                        Ext.Ajax.request({
                            url: me.urldata + 'update',
                            method: 'POST',
                            async: false,
                            timeout: 45000000,
                            params: {
                                data: Ext.encode(sendData)
                            },
                            success: function (response) {
                                try {
                                    var decodeResponse = Ext.JSON.decode(response.responseText);
                                    console.log(decodeResponse);
                                    responsemsg += '[' + decodeResponse.data[5][0].voucher_no + '] ' + decodeResponse.msg + '<br />';
                                    Ext.Msg.show({
                                        title: 'INFO',
                                        msg: responsemsg,
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.Msg.INFO
                                    });
                                    me.getGrid().up('window').unmask();
                                    me.getGrid().getStore().reload();
                                } catch (err) {
                                    console.log(err);
                                }
                            }
                        });
                    }
                }
            });

        }
    },
    MessageConfirm: function (flag, msg, title) {
        var me, record, row, data, grid;
        me = this.getMe();
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
                    me.loadingapprove.show();
                    if (flag == 'approvesby') {
                        me.urlrequest = me.urldataapprove + 'update';
                    } else if (flag == 'approvepajak') {
                        me.urlrequest = me.urldataapprove + 'update';
                    } else if (flag == 'vd_send_to_finance') {
                        me.urlrequest = me.urldata + 'update';
                    } else {
                        me.urlrequest = me.urldata + 'update';
                    }
                    me.AjaxRequestV2();
                }
            },
            icon: Ext.Msg.QUESTION
        });
    },
    MessageConfirmAuto: function (flag, msg, title) {

        var me, record, row, data, grid;
        me = this.getMe();
        form = me.getFormdata();
        grid = me.getGrid();

        record = grid.getSelectionModel().getSelection()[0];
        row = record['data'];
        data = row;
        data['hideparam'] = flag;
        me.senddata = data;
        me.loadingapprove.show();
        if (flag == 'approvesby') {
            me.urlrequest = me.urldataapprove + 'update';
        } else {
            me.urlrequest = me.urldata + 'update';
        }

        if (me.global_param['approval_rules']['value'] == "hod_approve") {
            return 0;
        } else {
            me.AjaxRequestV2();
        }



    },
    ApproveAutoMulti: function (myrecord) {
        var me, record, row, data, grid;
        var flag = 'approvesby';
        me = this.getMe();
        form = me.getFormdata();
        grid = me.getGrid();

        record = myrecord;
        row = record['data'];
        data = row;
        data['hideparam'] = flag;
        me.senddata = data;
        me.loadingapprove.show();
        if (flag == 'approvesby') {
            me.urlrequest = me.urldataapprove + 'update';
        } else {
            me.urlrequest = me.urldata + 'update';
        }

        if (me.global_param['approval_rules']['value'] == "hod_approve") {
            return 0;
        } else {
            me.AjaxRequestV2Multi();
        }



    },
    setStoreDeptFormsearch: function () {
        var me, store, form;
        me = this.getMe();
        form = me.getFormsearch();
        store = me.getStore("Department");
        store.reload({
            params: {
                "hideparam": 'getdepartmentbyprojectpt',
                "user_id": apps.uid,
                "pt_id": me.pt_id,
                "project_id": me.project_id
            },
            callback: function (records, operation, success) {
                store.each(function (record) {
                    if (record.data['department_id'] == me.department_id) {
                        me.setVal(form, 'department_id', record.data['department_id']);
                    }
                });
            }
        });
    },
    dataSearch: function () {
        resetTimer();
        var me = this.getMe(),
            grid = me.getGrid(),
            store = grid.getStore(),
            fs = me.getFormsearch(),
            form = fs.getForm(),
            pt = fs.down("[name=pt_id]").getValue();

        if (pt == undefined) {
            fs.down("[name=pt_id]").setValue(parseInt(me.pt_id));
        }
        fs.down("[name=hideparam]").setValue('default');
        var fields = me.getFormsearch().getValues();
        fields['project_id'] = me.project_id;
        for (var x in fields) {
            store.getProxy().setExtraParam(x, fields[x]);
        }
        me.loadPage(store);
    },
    //ovveride , also delete sub
    dataDestroydetailwithflag: function () {

        var me, rows, ph, pd, confirmmsg, successmsg, failmsg,
            record, recordcounttext, store, selectedRecord, msg, successcount
            , parameter, pesan, dataconfirm, ph, pd;
        me = this.getMe();
        ph = me.paramheader;
        pd = me.paramdetail;
        dataconfirm = me.fieldconfirmdetail;

        me.getGriddetail().down('#btnGenerate').setDisabled(false);

        rows = me.getGriddetail().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            store = me.getGriddetail().getStore();

            if (rows.length == 1) {

                var coa_ = store.getAt(store.indexOf(rows[0])).get("coa");
                var coapajaks = me.global_param['coa_pajak']['value'];
                if (!coapajaks.includes(coa_) && me.is_userpajak) {
                    me.buildWarningAlert("Tidak bisa Ubah Selain Coa Pajak");
                    return 0;
                }

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
                        me.getGriddetail().up('window').mask('Deleting data, please wait ...');
                    };

                    for (var i = 0; i < rows.length; i++) {
                        record = rows[i];
                        record.set("deleted", true);
                        record.set("statedata", 'delete');
                        store.clearFilter(true);
                        store.filter(me.idheaderfield, me.idheadervalue);

                        substore = me.localStore.substore;
                        substore.forEach(function (item, index) {
                            indexdata = record.data.indexdata;
                            if (item.indexsubdata == indexdata) {
                                indexdatadeleted.push(indexdata);
                            }
                        });

                        store.filter('deleted', false);
                    }

                    //delete sub

                    substore.forEach(function (item, index) {
                        var n = indexdatadeleted.includes(item.indexsubdata);
                        if (n == false) {
                            substorenew.push(item);
                        }
                    });

                    //init new substore
                    me.localStore.substore = [];
                    me.localStore.substore = substorenew;

                    me.setSumdetail();
                }

            });

        }
    },
    browseCommission: function (el, cb) {
        var ps;
        var me = this.getMe();
        var f = me.getFormdata();

        //accessbutton
        //acts ini adalah variable semua action

        var access = acts['VDRequestKomisi'];
        if (access == null) {
            me.tools.alert.warning("Maaf, akses dibatasi.");
            return 0;
        }

        var department_id = me.getVal(f, 'department_id', 'value');

        if (department_id == null || department_id == '' || department_id == 0) {
            me.tools.alert.warning("Pilih Departemen.");
            return 0;
        }

        var localstore = 'selectedData';
        var view = 'KomisiGrid';
        var browse = new Cashier.library.BrowseCashier();
        browse.init({
            controller: me,
            view: view,
            el: el,
            localStore: localstore,
            mode_read: "datalist",
            bukaFormSearch: true,
            pt: f.down("[name=pt_id]").valueModels[0].data.projectpt_id,
            project: me.project_id,
            limit: 500
        });
        browse.showWindow(function () {
            Ext.getCmp('ptCmsId').setValue(parseInt(f.down("[name=pt_id]").valueModels[0].data.projectpt_id));

            if (me.subholding_id == 1) {
                Ext.getCmp('ptCmsId').setReadOnly(false);
            } else {
                Ext.getCmp('ptCmsId').setReadOnly(true);
            }
        }, function () {

        });
    },
    gridSelectionChangeCommissionGrid: function (c) {
        var me = this.getMe();
        var grid = me.getKomisigrid();
        var row = grid.getSelectionModel().getSelection();
        var rec = grid.getSelectedRecord();
        var c = grid.getSelectionModel().getCount();
        if (c > 0 && c <= 200) {
            grid.down('[action=select]').setDisabled(false);
        } else {
            grid.down('[action=select]').setDisabled(true);
        }
    },
    generateCommission: function (data) {
        var me, grid, store, counter, record, row,
            amountppn, amountpph, persentaseppn, persentasepph, amount, checkppn, checkpph, dataflow;
        me = this.getMe();

        storedetail = me.getGriddetail().getStore();

        amountppn = 0; amountpph = 0, totalpajak = 0;
        checkppn = false; checkpph = false;

        var coapajak = [];
        var deleted = [];
        var pajakdatas = [];
        var coapajakfinal = [];
        var pajakdatasfinal = [];

        console.log(data);

        /*var form = me.getFormdata();
        var storecoa = me.getStore('Coadeptcomboall');
        storecoa.load({
            params: {
                "hideparam": 'getcoaall',
                "project_id": me.project_id,
                "pt_id": me.getVal(form, 'pt_id', 'value'),
                "department_id": me.getVal(form, 'department_id', 'value')
            },
            callback: function (records, operation, success) {
                for (i = 0; i < data.length; i++) {
                    var d = data[i];

                    storecoa.each(function(rec) {
                        if ( rec.get('coa') == d.coa ) {
                            d.coa_id = rec.get('coa_id');
                            
                            storedetail.each(function(rec2) {
                                if ( rec2.get('coa') == d.coa ) {
                                    rec2.set('coa_id', d.coa_id);
                                }
                            });
                        }
                    });

                }
            }
        });*/

        for (i = 0; i < data.length; i++) {
            var d = data[i];
            coapajak.push(d.coa);
        }

        storedetail.each(function (rec) {
            if (coapajak.includes(rec.get("coa"))) {
                rec.set("deleted", true);
                rec.set("statedata", 'delete');
                deleted.push(storedetail.indexOf(rec));
            }
        });

        storedetail.clearFilter(true);
        storedetail.filter('deleted', false);

        var indexdata = 1;

        var totalamountppn = 0;
        var totalamountpph = 0;

        /*SUB nya isi ulang*/

        var substoredata = me.localStore.substore;
        var substoredatanew = [];
        substoredata.forEach(function (item, index) {
            if (typeof item.subcashierdesc === 'undefined') {
                substoredatanew.push(item);
            }
        });

        //maks indexdata
        arrs = [];
        storedetail.each(function (rec) {
            arrs.push(rec.get("indexdata"));
            indexdata = Math.max.apply(null, arrs);
        });



        persentaseppn = 0;
        persentasepph = 0;
        checkppn = 1;
        checkpph = 1;

        amountppn = 0; amountpph = 0;

        var totalamount = 0;
        var amountformatted = '';
        var totalamountppn = totalamountppn + amountppn;
        var totalamountpph = totalamountpph + amountpph;

        var checkpajak = 1;

        var komisiharuscair = 0;
        var description_header = '';

        if (checkpajak > 0) {

            for (i = 0; i < data.length; i++) {
                var d = data[i];
                if (true) {
                    indexdata = indexdata + 1;
                    if (d.pengali > 0) {
                        dataflow = "I";
                    } else {
                        dataflow = me.in_out; // PPH sebagai Pengurang
                    }

                    if (d.detail_description == 'PPHI' || d.detail_description == 'PPHP' || d.detail_description == 'PPH') {
                        dataflow = me.in_out;
                    }

                    var remarks = d.remarks;

                    if (description_header == '') {
                        description_header = remarks;
                    } else {
                        description_header = description_header + ', ' + remarks;
                    }

                    amountppn = d.amount;
                    amountformatted = accounting.formatMoney(amountppn);

                    var pajakdata = {
                        voucher_id: me.idheadervalue, voucherdetail_id: 0, coa_id: d.coa_id, coa: d.coa, coaname: d.coa_name,
                        kelsub_id: d.kelsub_id, kelsub: d.kelsub, kelsubdesc: d.kelsub, subcashier_id: 999, subcashierdesc: "komisi", indexdata: indexdata, dataflow: dataflow,
                        amount: amountformatted, remarks: remarks, deleted: !1, hideparam: "default", statedata: "create", kasbondept_id: 0,
                        kasbondeptdetail_id: 0, typetransdetail: dataflow, setupcashflow_id: d.setupcashflow_id, cashflowtype: d.cashflowtype, checkppn: !1, checkpph: !1,
                        tipepajakdetailppn_id: 0, tipepajakdetailpph_id: 0, persentaseppn: "", persentasepph: "", balancecoa: ""
                    };
                    totalpajak = totalpajak + amountppn;
                    pajakdatas.push(pajakdata);
                    coapajakfinal.push(d.coa);

                    var row = {
                        amount: amountformatted, coa_id: d.coa_id, code1: d.subgl_code, code2: "", code3: "", code4: "",
                        deleted: false, hideparam: "default", indexdata: "1", indexdataheader: indexdata, indexsubdata: indexdata,
                        kelsub: d.kelsub,
                        kelsub_id: d.kelsub_id, project_id: me.project_id, pt_id: me.pt_id, remarks: remarks, statedata: "create", subcode: d.subgl_code,
                        subgl_id: d.subgl_id, voucher_id: "0", voucherdetail_id: indexdata, vouchersubdetail_id: "", subcashierdesc: "komisi"
                    };

                    substoredatanew.push(row);

                    if (d.detail_description == 'COMMISSION') {
                        komisiharuscair = komisiharuscair + parseFloat(d.komisiharuscair);
                    }

                }
            }

        }

        console.log(substoredatanew);

        me.localStore.substore = substoredatanew;

        if (totalpajak == 0) {
            me.tools.alert.warning("Tidak Ada Komisi Di-Generate, <br>Cek pada data atau Master Coa Config");
            return 0;
        }

        var uniquecoapajakfinal = coapajakfinal.filter(function (item, pos) {
            return coapajakfinal.indexOf(item) == pos;
        });


        var pajakdatafinal = [];
        var idxdata = [];

        storedetail.add(pajakdatas);

        var form = me.getFormdata();
        var storevndr = me.getStore('Vendorcombo');

        storevndr.load({
            params: {
                "query": d.vendorname,
                "hideparam": 'getvendor',
                "project_id": me.project_id,
                "pt_id": me.pt_id,
                "type_vendor": ""
            },
            callback: function (records, operation, success) {
                form.down("[name=vendor_id]").setValue(d.vendor_id);
                me.createNoteVendor(true, d.vendor_note);
                me.getDatavendorbankacc();
            }
        });

        //form.down("[name=vendor_id]").setValue(d.vendor_id);

        /*
        for (i = 0; i < uniquecoapajakfinal.length; i++) {
            pajakdatafinal[uniquecoapajakfinal[i]] = {amount:0};

            for (il = 0; il < pajakdatas.length; il++) {
                if(idxdata.includes(pajakdatas[il].indexdata)==false) {
                 if(uniquecoapajakfinal[i]==pajakdatas[il].coa){
                    idxdata.push(pajakdatas[il].indexdata);
                    pajakdatas[il].amount = pajakdatafinal[uniquecoapajakfinal[i]].amount + pajakdatas[il].amount;
                    pajakdatafinal[uniquecoapajakfinal[i]] = pajakdatas[il];
                 }
                }
            }
    
        }

        for (i = 0; i < uniquecoapajakfinal.length; i++) {
            pajakdatafinal[uniquecoapajakfinal[i]].amount = accounting.formatMoney(pajakdatafinal[uniquecoapajakfinal[i]].amount);
            storedetail.add(pajakdatafinal[uniquecoapajakfinal[i]]);
        }

        */


        me.setSumdetailSimple();

        storedetail.commitChanges();

        me.getGriddetail().getView().refresh();
        me.getGriddetail().down('#btnGenerate').setDisabled(true);

        //var amount = form.down("[name=amount]").getValue();
        form.down("[name=komisiklaim_amount]").setValue(komisiharuscair);
        form.down("[name=description]").setValue(description_header);

    },
    getTotalCommission: function () {
        var me, form, state, voucher_date, resjson;
        me = this.getMe();
        form = me.getFormdata();
        state = form.up('window').state.toLowerCase();
        voucher_date = me.formatDate(me.getVal(form, 'voucher_date', 'value'));
        department_id = me.getVal(form, 'department_id', 'value');
        vendor_id = me.getVal(form, 'vendor_id', 'value');
        voucher_id = me.getVal(form, 'voucher_id', 'value');
        komisiklaim_ids = me.getVal(form, 'komisiklaim_ids', 'value');
        form.down('[name=kasbondept_id]').setDisabled(true);
        form.down('button[action=openupload]').setDisabled(true);

        me.senddata = {
            "hideparam": 'gettotalkomisi',
            "project_id": (me.project_id == 0) ? apps.project : me.project_id,
            "pt_id": (me.pt_id == 0) ? apps.pt : me.pt_id,
            "komisiklaimids": komisiklaim_ids,
            "voucher_id": voucher_id,
        }
        me.urlrequest = me.urlcommon;

        form.setLoading('Please wait');
        Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
            timeout: 45000000,
            params: {
                data: Ext.encode(me.senddata)
            },
            success: function (response) {

                resjson = Ext.JSON.decode(response.responseText);
                resjson = resjson.data;
                var totalkomisi = parseFloat(resjson.TOTAL);
                if (totalkomisi > 0) {
                    form.down("[name=komisiklaim_amount]").setValue(totalkomisi);
                }
                form.setLoading(false);
            },
            failure: function (response) {
                me.alertFormdataFailed();
                form.setLoading(false);
                me.messagedata = 'data error';
                throw me.messagedata;
                //form.up('window').close();
            }
        });
    },
    getCommission: function (komisiklaimids, komisipenerimainit) {
        var me, form, state, voucher_date, resjson;
        me = this.getMe();
        form = me.getFormdata();
        state = form.up('window').state.toLowerCase();
        voucher_date = me.formatDate(me.getVal(form, 'voucher_date', 'value'));
        department_id = me.getVal(form, 'department_id', 'value');
        vendor_id = me.getVal(form, 'vendor_id', 'value');
        form.down('[name=kasbondept_id]').setDisabled(true);
        form.down('button[action=openupload]').setDisabled(true);
        var project_id_send = Ext.getCmp('ptCmsId').valueModels[0].data.project_project_id;
        var pt_id_send = Ext.getCmp('ptCmsId').valueModels[0].data.pt_id;

        me.senddata = {
            "hideparam": 'getkomisibreakdown',
            // "project_id": (me.project_id == 0) ? apps.project : me.project_id,
            "project_id": project_id_send,
            // "pt_id": (me.pt_id == 0) ? apps.pt : me.pt_id,
            "pt_id": pt_id_send,
            "project_id_from": (me.project_id == 0) ? apps.project : me.project_id,
            "pt_id_from": (me.pt_id == 0) ? apps.pt : me.pt_id,
            "department_id_from": department_id,
            "department_id": department_id,
            "vendor_id": vendor_id,
            "vendor_name": komisipenerimainit,
            "komisiklaimids": komisiklaimids
        }
        me.urlrequest = me.urlcommon;

        form.setLoading('Please wait');
        Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
            timeout: 45000000,
            params: {
                data: Ext.encode(me.senddata)
            },
            success: function (response) {

                resjson = Ext.JSON.decode(response.responseText);
                resjson = resjson.data;
                //form.down("[name=is_pajak]").setValue(1);
                me.generateCommission(resjson);
                form.setLoading(false);
            },
            failure: function (response) {
                me.alertFormdataFailed();
                form.setLoading(false);
                form.down("[name=is_pajak]").setValue(0);
                me.messagedata = 'data error';
                throw me.messagedata;
                //form.up('window').close();
            }
        });
    },
    commissionSelect: function (el) {
        var me = this.getMe();
        var f = me.getFormdata();
        var grid = me.getKomisigrid();
        var row = grid.getSelectionModel().getSelection();
        var rec = grid.getSelectedRecord();
        var komisiklaimids = '';
        var komisipenerimainit = '';
        for (i = 0; i < row.length; i++) {
            if (i == 0) {
                komisipenerimainit = row[i].data.sales_name;
            } else {
                if (row[i].data.sales_name !== komisipenerimainit) {
                    me.buildWarningAlert("1 Voucher hanya untuk 1 penerima yang sama");
                    return 0;
                }
            }
        }
        for (i = 0; i < row.length; i++) {
            komisiklaimids += row[i].data.komisi_klaim_id + "~";
        }
        f.down('[name=komisiklaim_ids]').setValue(komisiklaimids);
        this.getCommission(komisiklaimids, komisipenerimainit);
        el.up('window').destroy();
    },
    FormUploadAttachmentShow: function (action) {
        var me, p, psa, pmsa = '';
        var me = this.getMe();
        var w = me.instantWindow('FormDataUploadAttachment', 500, 'Upload Attachment', 'create', 'win-attachmentvdrequestformdata');
    },
    FormUploadAttachmentRead: function (action) {
        var me, p, psa, pmsa = '';
        var me = this.getMe();
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

        // start cek attachment API
        var datasource = me.getGrid().getSelectionModel().getSelection()[0].data['datasource'];
        console.log(datasource);
        // end cek attachment API

        // start cek attachment API
        var datasource = me.getGrid().getSelectionModel().getSelection()[0].data['datasource'];
        console.log(datasource);
        // end cek attachment API

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
                var downloadSrc = decodeURIComponent(resjson.data.signedUrl);
                var attLinkAPI = record.get("path");

                if ((datasource != null || datasource != "") && (record.get("filename").includes("API") || record.get("path").includes("https://storage.googleapis.com/"))) {

                    ext = resjson.data.filename.split('.').pop();
                    if (ext == 'pdf') {
                        var html = '<embed scrolling="no" src="' + attLinkAPI + '#zoom=100%" type="application/pdf" width="100%" height="100%">';
                        Ext.create("Ext.Window", {
                            title: 'Attachment Viewer : ' + record.get("filename"),
                            width: 1280,
                            height: 700,
                            closable: true,
                            html: html,
                            autoScroll: true,
                            modal: true,
                            constrain: true
                        }).show();
                    } else if (ext == 'doc' || ext == 'docx' || ext == 'xls' || ext == 'xlsx') {
                        Ext.Msg.show({
                            title: 'Download Attachment?',
                            buttons: Ext.Msg.YESNO,
                            icon: Ext.Msg.INFO,
                            msg: 'File akan di download?',
                            modal: true,
                            fn: function (btn) {
                                if (btn == 'yes') {
                                    var win = window.open(attLinkAPI, '_blank');
                                    win.focus();
                                }
                                return false;
                            }
                        });

                    } else {
                        var html = '<div style="style="display: block; min-height: 700; width: 1280px; min-width: 1280px">';
                        html = html + '<img src="' + attLinkAPI + '" alt="<br>Preview is not supported for this file format." style="overflow: auto; display: block; height: auto; width: 100%"></div>';
                        html = html + '<div><a style="padding: 10px; float: right;" target="_blank" href="' + attLinkAPI + '" download>Download</a></div>';

                        me.instantWindow('FormDataPreviewAttachment', 1280, 'Preview Attachment', 'create', '', me.controllerName, 700);
                        me.formdatapreviewattachmentAfterrender(ext, attLinkAPI, attLinkAPI, record.get("filename"));
                    }
                } else {
                    if (ext == 'pdf') {

                        var contentType = 'application/pdf';
                        var blob = me.b64toBlob(base64src, contentType);
                        var blobUrl = URL.createObjectURL(blob);

                        console.log(blobUrl);

                        var html = '<embed scrolling="no" src="' + blobUrl + '#zoom=100%" type="application/pdf" width="100%" height="100%">';

                        Ext.create("Ext.Window", {
                            title: 'Attachment Viewer : ' + record.get("filename"),
                            width: 1280,
                            height: 700,
                            closable: true,
                            html: html,
                            autoScroll: true,
                            modal: true,
                            constrain: true
                            // maximizable: true,
                            // maximized  : true
                        }).show();
                    } else {
                        var html = '<div><a style="padding: 10px; float: right;" target="_blank" href="' + downloadSrc + '" download>Download</a></div>';

                        me.instantWindow('FormDataPreviewAttachment', 1280, 'Preview Attachment', 'create', '', me.controllerName, 700);
                        me.formdatapreviewattachmentAfterrender(ext, base64src, downloadSrc, resjson.data.filename);
                    }
                }
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
    b64toBlob: function (b64Data, contentType = '', sliceSize = 512) {
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

        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    },
    formdatapreviewattachmentAfterrender: function (ext, srcfile, downloadSrc, filename) {
        var me = this;

        me.getFormdatapreviewattachment().down("[name=attachment_preview]").setSrc(srcfile);
        me.getFormdatapreviewattachment().down("[name=file_name]").setValue(filename);
        me.getFormdatapreviewattachment().down("[name=download_link]").setValue(srcfile);
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

            for (var i = 0; i < rows.length; i++) {
                if (apps.uid != rows[i].data.addby) {
                    Ext.Msg.alert('Warning', 'File hanya boleh dihapus oleh user ' + rows[i].data.user_fullname);
                    return false;
                }
            }

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
    DownloadAttachment: function () {
        alert("aaaa");
    },
    UploadAttachment: function () {
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
        if (true) {

            var vdrequest_id = 0;

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
                    url: 'cashier/vdrequest/create',
                    waitMsg: 'Processing data...',
                    params: {
                        data: Ext.encode(senddata)
                    },
                    success: function (fp, o) {

                        var dt = o.result.data;
                        var emsg = '';
                        var msg = '';
                        var errormsg = dt.error;
                        var voucher_id = 0;

                        var arrayLength = Object.keys(errormsg).length;

                        if (arrayLength > 0) {
                            for (var i = 0; i < arrayLength; i++) {
                                if (typeof errormsg[i] !== "undefined") {
                                    emsg = emsg + errormsg[i] + '<br>';
                                }
                            }
                            emsg = emsg + 'Proses Upload Dibatalkan!';
                            Ext.Msg.alert('Warning', emsg);
                            form.up('window').close();
                            me.messagedata = emsg;
                            Ext.Msg.alert('Warning', me.messagedata);
                            return false;
                        } else {
                            //insert to grid
                            var store = me.getStore('VDRequestattachmentdetail');
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
                                link: '<a onclick="me.DownloadAttachment()">' + dt.filename + '</a>'
                            };
                            store.add(rowdata);
                            store.commitChanges();

                            me.messagedata = 'Uploaded Successfully.';
                            form.up('window').close();
                            Ext.Msg.alert('Info', dt.message);
                        }

                        try {

                            //nanti isinya sama dengan atas

                        } catch (err) {
                            Ext.Msg.alert('Warning', '[1] Processing failed !');
                            form.up('window').close();
                            return false;
                        }
                    },
                    failure: function (fp, o) {
                        Ext.Msg.alert('Warning', '[2] Processing failed !');
                        form.up('window').close();
                        return false;
                    }
                });
            }
            catch (err) {
                Ext.Msg.alert('Warning', '[3] Processing failed !');
                return false;
            }

        }
    },
    directUploadAttachment: function () {
        var me = this.getMe();
        var formdata = this.getFormdata();
        var form = this.getFormdatauploadattachment();
        var groupingdata = 0;
        var filetitle = form.down("[name=file-title]").getValue();
        var prefix_description = form.down("[name=prefix_description]").getValue();
        var filename = form.down("[name=file-path-attachment]").getValue();
        if (filename == "" || filename == null) {
            Ext.Msg.alert('Warning', 'Please select files to upload');
            return false;
        }
        if (filetitle == "" || filetitle == null) {
            Ext.Msg.alert('Warning', 'Please fill Description');
            return false;
        }
        if (true) {

            var vdrequest_id = 0;

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
                    url: 'cashier/vdrequest/create',
                    waitMsg: 'Processing data...',
                    params: {
                        data: Ext.encode(senddata)
                    },
                    success: function (fp, o) {

                        var dt = o.result.data;
                        var emsg = '';
                        var msg = '';
                        var errormsg = dt.error;
                        var voucher_id = 0;

                        var arrayLength = Object.keys(errormsg).length;

                        if (arrayLength > 0) {
                            for (var i = 0; i < arrayLength; i++) {
                                if (typeof errormsg[i] !== "undefined") {
                                    emsg = emsg + errormsg[i] + '<br>';
                                }
                            }
                            emsg = emsg + 'Proses Upload Dibatalkan!';
                            Ext.Msg.alert('Warning', emsg);
                            form.up('window').close();
                            me.messagedata = emsg;
                            Ext.Msg.alert('Warning', me.messagedata);
                            return false;
                        } else {
                            //insert to grid
                            var store = me.getStore('VDRequestattachmentdetail');
                            var rowdata = {
                                hideparam: 'detailattachmentcreate',
                                parametersql: 'create',
                                voucher_id: me.idheadervalue,
                                filename: dt.filename,
                                filesize: dt.filesize,
                                remarks: prefix_description + ' ' + filetitle,
                                description: prefix_description + ' ' + filetitle,
                                path: dt.path,
                                addon: dt.addon,
                                deleted: false,
                                link: '<a onclick="me.DownloadAttachment()">' + dt.filename + '</a>',
                                is_additional: 1
                            };

                            me.getFormdatauploadattachment().setLoading("Saving data...");
                            Ext.Ajax.request({
                                url: 'cashier/vdrequest/detailcreate',
                                params: {
                                    data: Ext.encode(rowdata)
                                },
                                success: function (response) {
                                    var info = Ext.JSON.decode(response.responseText);
                                    me.getFormdatauploadattachment().setLoading(false);
                                    if (info.success == 'true') {
                                        form.up('window').close();
                                        Ext.Msg.alert('Info', info.msg);
                                        me.getGridattachmentdetail().getStore().reload();
                                    } else {
                                        form.up('window').close();
                                        Ext.Msg.alert('Info', info.msg);
                                        me.getGridattachmentdetail().getStore().reload();
                                    }
                                }
                            })
                        }

                        try {

                            //nanti isinya sama dengan atas

                        } catch (err) {
                            Ext.Msg.alert('Warning', '[1] Processing failed !');
                            form.up('window').close();
                            return false;
                        }
                    },
                    failure: function (fp, o) {
                        Ext.Msg.alert('Warning', '[2] Processing failed !');
                        form.up('window').close();
                        return false;
                    }
                });
            }
            catch (err) {
                Ext.Msg.alert('Warning', '[3] Processing failed !');
                return false;
            }

        }
    },
    UploadVdrequest: function () {
        var form = this.getFormdata();
        var groupingdata = 0;
        var groupingdata = form.down("[name=groupingdata]").getValue();
        var me = this.getMe();
        var vdrequest_id = 0;

        var senddata = form.getValues();
        var valuedata = senddata;
        me.valueform = senddata;
        /*ini untuk cari tau yang invalid*/
        //console.log(form.query("field{isValid()==false}"));

        //ovveride
        senddata["hideparam"] = 'upload';
        senddata["voucher_id"] = me.idheadervalue;
        senddata["cashier_note"] = 'upload';
        senddata["groupingdata"] = groupingdata;

        if (true) {
            try {
                form.submit({
                    url: 'cashier/vdrequest/create',
                    waitMsg: 'Processing data...',
                    params: {
                        data: Ext.encode(senddata)
                    },
                    success: function (fp, o) {

                        var dt = o.result.data;
                        var emsg = '';
                        var msg = '';
                        var errormsg = dt.error;
                        var voucher_id = dt.voucher_id;

                        var arrayLength = Object.keys(errormsg).length;

                        if (arrayLength > 0) {
                            for (var i = 0; i < arrayLength; i++) {
                                if (typeof errormsg[i] !== "undefined") {
                                    emsg = emsg + errormsg[i] + '<br>';
                                }
                            }
                            emsg = emsg + 'Transaksi Dibatalkan';
                            Ext.Msg.alert('Warning', emsg);
                            form.up('window').close();
                            me.messagedata = emsg;
                            me.alertFormdataSuccessSync(false);
                            return false;
                        } else {
                            me.messagedata = 'Uploaded Successfully.';
                            me.alertFormdataSuccessSync(valuedata.status);
                        }

                        try {

                            //nanti isinya sama dengan atas

                        } catch (err) {
                            Ext.Msg.alert('Warning', '[1] Processing failed !');
                            form.up('window').close();
                            return false;
                        }
                    },
                    failure: function (fp, o) {
                        Ext.Msg.alert('Warning', '[2] Processing failed !');
                        form.up('window').close();
                        return false;
                    }
                });
            }
            catch (err) {
                Ext.Msg.alert('Warning', '[3] Processing failed !');
                return false;
            }

        }
    },
    browseCashbon: function (el, cb) {
        var ps;
        var me = this.getMe();
        var f = me.getFormdata();

        var department_id = me.getVal(f, 'department_id', 'value');

        if (department_id == null || department_id == '' || department_id == 0) {
            me.tools.alert.warning("Pilih Departemen.");
            return 0;
        }

        var localstore = 'selectedData';
        var view = 'KasbonGrid';
        var browse = new Cashier.library.BrowseCashier();
        browse.init({
            controller: me,
            view: view,
            el: el,
            localStore: localstore,
            mode_read: "datalist",
            bukaFormSearch: true,
            pt: me.pt_id,
            project: me.project_id,
            department_id: department_id
        });
        browse.showWindow(function () {
            Ext.getCmp('ptCmsId').setValue(me.pt_id);
            Ext.getCmp('ptCmsId').setReadOnly(true);
        }, function () {

        });
    },
    gridSelectionChangeCashbonGrid: function (c) {
        var me = this.getMe();
        var grid = me.getKomisigrid();
        var row = grid.getSelectionModel().getSelection();
        var rec = grid.getSelectedRecord();
        var c = grid.getSelectionModel().getCount();
        if (c > 0 && c <= 10) {
            grid.down('[action=select]').setDisabled(false);
        } else {
            grid.down('[action=select]').setDisabled(true);
        }
    },
    cashbonSelect: function (el) {
        var store, me;
        var me = this.getMe();
        var f = me.getFormdata();
        var griddetail = me.getGriddetail();
        var grid = me.getKasbongrid();
        var row = grid.getSelectionModel().getSelection();
        var rec = grid.getSelectedRecord();
        store = me.getStore('VDRequestkasbondetail');
        storecb = me.getStore('Kasbondeptcomboapplylocal');
        f.down("[name=kasbondept_id]").setDisabled(true);
        griddetail.down("[action=generatekasbon]").setVisible(true);
        me.is_multi_kasbon = 1;

        //set is_pjk = 1
        f.down("[name=is_pjk]").setValue(1);

        var kasbondept_ids = [];

        store.each(function (record, index) {
            kasbondept_ids.push(record.get("kasbondept_id"));
        });

        for (i = 0; i < row.length; i++) {
            var data = row[i].data;
            var remains = parseInt(data.remainingkasbon);
            var nn = kasbondept_ids.includes(data.kasbondept_id);
            if (remains == 0 || isNaN(remains)) {
                me.buildWarningAlert(data.voucher_no + " Remaining sudah habis.");
                return 0;
            }
            if (nn) {
                me.buildWarningAlert(data.voucher_no + " sudah ada dalam Datalist.");
                return 0;
            }
        }

        for (i = 0; i < row.length; i++) {
            var data = row[i].data;
            var rowdata = {
                hideparam: 'create',
                statedata: 'create',
                kasbondept_id: data.kasbondept_id,
                kasbon_date: data.voucher_date_f,
                cashbon_no: data.voucher_no,
                voucher_no: data.voucher_no,
                remarks: data.description,
                amount: data.amount,
                remaining_amount: data.remainingkasbon,
                remainingkasbon: data.remainingkasbon,
                pay_amount: data.remainingkasbon,
                final_amount: 0,
                deleted: false,
                is_multi_kasbon: true,
                made_by_name: data.made_by_name
            };
            store.add(rowdata);
            store.commitChanges();
            me.cashbonLoadStore();
        }
        el.up('window').destroy();
    },
    cashbonSelectDropdown: function (row, is_deletedetail, is_reward = false) {
        //Khusus cara lama
        var store, me;
        var me = this.getMe();
        var f = me.getFormdata();
        var grid = me.getKasbongrid();
        storedetail = me.getStore('VDRequestdetail');
        store = me.getStore('VDRequestkasbondetail');
        storecb = me.getStore('Kasbondeptcomboapplylocal');
        //set is_pjk = 1
        f.down("[name=is_pjk]").setValue(1);

        //set multikasbon disable add
        var gridkasbondetail = me.getGridkasbondetail();
        gridkasbondetail.down('[action=create]').setDisabled(true);
        gridkasbondetail.down('[action=destroy]').setDisabled(true);
        me.is_multi_kasbon = 0;

        //tidak boleh row edit
        var g = me.getGridkasbondetail();
        g.on('beforeedit', function (editor, e) {
            if (e.record.get('is_multi_kasbon') === false) {
                g.getPlugin('rowEditing').editor.form.findField('pay_amount').disable();
            }
            else {
                g.getPlugin('rowEditing').editor.form.findField('pay_amount').enable();
            }
        });

        //delete all detail first
        storedetail.each(function (rec) {
            rec.set("deleted", true);
            rec.set("statedata", 'delete');
        });
        storedetail.clearFilter(true);
        storedetail.filter('deleted', false);

        //delete all first
        store.each(function (record, index) {
            record.set("deleted", true);
            record.set("statedata", 'delete');
            record.set("hideparam", 'detailkasbondelete');
            store.clearFilter(true);
            store.filter('deleted', false);
        });

        //add new 1 row
        var data = row;
        var rowdata = {
            hideparam: 'create',
            statedata: 'create',
            kasbondept_id: data.kasbondept_id,
            kasbon_date: data.voucher_date_f,
            cashbon_no: data.voucher_no,
            voucher_no: data.voucher_no,
            remarks: data.description,
            amount: data.amount,
            remaining_amount: data.remainingkasbon,
            remainingkasbon: data.remainingkasbon,
            pay_amount: data.remainingkasbon,
            final_amount: 0,
            deleted: false,
            is_multi_kasbon: false,
            made_by_name: data.made_by_name
        };
        store.add(rowdata);
        store.commitChanges();
        me.cashbonLoadStore();
    },
    cashbonLoadStore: function (el) {
        var store, me;
        var me = this.getMe();
        var f = me.getFormdata();
        var grid = me.getKasbongrid();
        store = me.getStore('VDRequestkasbondetail');
        storecb = me.getStore('Kasbondeptcomboapplylocal');
        if (me.is_multi_kasbon === 1) {
            f.down("[name=kasbondept_id]").setDisabled(true);
        }
        storecb.removeAll();
        store.each(function (record, index) {
            var rowdata = {
                hideparam: 'create',
                statedata: 'create',
                kasbon_date: record.get("voucher_date"),
                kasbondept_id: record.get("kasbondept_id"),
                cashbon_no: record.get("voucher_no"),
                voucher_no: record.get("voucher_no"),
                remarks: record.get("remarks"),
                amount: accounting.formatMoney(record.get("amount")),
                remaining_amount: accounting.formatMoney(record.get("remaining_amount")),
                remainingkasbon: accounting.formatMoney(record.get("remaining_amount")),
                pay_amount: accounting.formatMoney(record.get("pay_amount")),
                final_amount: 0,
                deleted: false,
                made_by_name: record.get("made_by_name"),
            };
            storecb.add(rowdata);
        });
    },
    dataDestroykasbondetailwithflag: function () {

        var me, rows, ph, pd, confirmmsg, successmsg, failmsg,
            record, recordcounttext, store, selectedRecord, msg, successcount
            , parameter, pesan, dataconfirm, ph, pd;
        me = this.getMe();
        ph = me.paramheader;
        pd = me.paramdetail;
        dataconfirm = 'voucher_no';

        //me.getGridkasbondetail().down('#btnGenerate').setDisabled(false);

        rows = me.getGridkasbondetail().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            store = me.getGridkasbondetail().getStore();

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
                        me.getGridkasbondetail().up('window').mask('Deleting data, please wait ...');
                    };

                    for (var i = 0; i < rows.length; i++) {
                        record = rows[i];
                        record.set("deleted", true);
                        record.set("statedata", 'delete');
                        record.set("hideparam", 'detailkasbondelete');

                        store.clearFilter(true);
                        store.filter('deleted', false);

                    }

                }

            });

        }
    },
    gridKasbondetailAfterRender: function () {
        var p, psa, pmsa, me = '';
        me = this.getMe();

        var g = me.getGridkasbondetail();
        store = g.getStore();
        var form = me.getFormdata();
        g.on({
            scope: this,
            edit: function (roweditor, event) {

                var rec = event.record;
                var amount = accounting.unformat(event.record.get("amount"));
                var remainingkasbon = accounting.unformat(event.record.get("remaining_amount"));
                var pay_amount = accounting.unformat(event.record.get("pay_amount"));
                var final_amount = remainingkasbon - pay_amount;

                /* 24/2/2021 => lepas validasi

                if(pay_amount > remainingkasbon){
                     me.buildWarningAlert("Amount Pay harus kurang dari Remaining");
                     pay_amount = remainingkasbon;
                     rec.set("pay_amount", pay_amount);
                     g.getView().refresh();
                     return 0;
                }
                */

                rec.set("final_amount", final_amount);

                g.getView().refresh();
            },
            beforeedit: function (a, b) {

            }
        });

    },
    loadPtbyProject: function () {

        var me = this.getMe();
        projectid = me.getFormdatacopyvoucher().down("[name=project_id]").getValue();


        if (projectid != null) {
            projectid = me.getFormdatacopyvoucher().down("[name=project_id]").getValue();
        } else {
            projectid = apps.project;
        }

        var f = me.getFormdatacopyvoucher();
        storecoa = me.getFormdatacopyvoucher().down("[name=pt_id]").getStore();
        storecoa.load({
            params: {
                "hideparam": 'getptbyuserproject',
                "start": 0,
                "limit": 1000000,
                "project_id": projectid,
                "user_id": apps.uid
            },
            callback: function (records, operation, success) {
                if (records[0]) {
                    me.getFormdatacopyvoucher().down("[name=pt_id]").setValue(parseInt(apps.pt));
                }
            }
        });
    },
    loadProject: function () {

        var me = this.getMe();
        var f = me.getFormdatacopyvoucher();
        var storeproject = f.down("[name=project_id]").getStore();
        storeproject.load({
            params: {
                "hideparam": 'projectpt',
                "project_id": apps.project,
                "start": 0,
                "limit": 1000000,
            }, callback: function (recordscode, operationcode, successcode) {
                if (successcode) {
                    if (recordscode[0]) {
                        var firstdatacode = recordscode[0]['data'];
                        f.down("[name=project_id]").setValue(parseInt(apps.project));
                        me.loadPtbyProject();
                    }
                }
            }
        });
    },
    mindatecopyvoucher: function () {
        return Ext.Ajax.request({
            url: 'cashier/common/read',
            method: 'POST',
            params: {
                hideparam: 'getlastmonthclosing'
            },
            async: false
        }).responseText;
    },
    processcopyvoucher: function () {

        var me = this.getMe();
        var f = me.getFormdatacopyvoucher();
        var copyvoucher_pt_id = f.down('[name=pt_id]').getValue();
        var project_id_selected = f.down('[name=project_id]').getValue();
        var projectname = f.down('[name=project_id]').getRawValue();
        var grid = me.getGrid();
        var record = grid.getSelectionModel().getSelection()[0];

        if (project_id_selected !== me.last_project_id) {
            me.tools.alert.warning("Project Tidak Boleh Berbeda");
            return 0;
        }

        var row = record['data'];
        me.valueform = row;
        me.valueform.pt_id_new = copyvoucher_pt_id;
        me.valueform.project_id_old = me.last_project_id;
        me.valueform.voucher_date_new = f.down("[name=voucher_date]").getSubmitData().voucher_date;

        var form = f.getForm();

        //console.log(form.getValues());
        var addingRecord = false;
        if (!me.finalValidation()) {
            return false;
        }

        var vp = me.validationProcess();
        var vps = false; // validation prosess status
        if (typeof vp === 'object') {
            vps = vp.status;
            if (!vps) {

                Ext.MessageBox.alert('Alert', vp.msg, function () {
                    var x = me.getFormdata().down('[name=' + vp.field + ']');
                    if (x !== null) {
                        x.markInvalid(vp.msg);
                        x.focus();
                    }

                });
            }
        } else if (typeof vp === 'boolean') {
            vps = vp;
        }

        // me.processAfterCopyVoucher(me.valueform);return;

        if (form.isValid() && vps) {
            me.MessageConfirm('copyvoucher', 'Are you sure want to copy ?', ' Confirm Your Action');
        }
    },
    assignShortcut: function (keys, target_id) {
        var me = this.getMe();
        //add new sc
        //shortcut.remove(keys);
        shortcut.add(keys, function (e) {
            e.preventDefault();
            if (me.checkActiveWindow(target_id)) {
                $("#" + target_id).click();
            }
            return false;
        }, {
            'type': 'keydown',
            'propagate': true,
            'target': document
        });
    },
    checkActiveWindow: function (target_id) {
        var me = this;
        var allWindows = Ext.ComponentQuery.query('window'),
            hasAny = false;

        var ret = false;
        Ext.each(allWindows, function (win) {
            windowId = win.getId();
            active = win.active;

            //console.log(win);
            //Shortcut Management Handling
            //console.log(target_id);
            //console.log(active);

            if (target_id == "btnAddNewVdrequest" && windowId == "WINDOW-mnuVDRequest" && active == true) {
                ret = true;
            }
            if (target_id == "btnAddNewDetailVdrequest" && windowId == "win-holidayformdata" && active == true) {
                ret = true;
            }
            if (target_id == "btnAddNewSubDetailVdrequest" && windowId == "win-vdrequestdetailformdata" && active == true) {
                ret = true;
            }


        });

        return ret;
    },
    getDatavendorbankacc: function (default_id = 0) {
        var me = this;
        var fd = me.getFormdata();
        var vendor_id = fd.down("[name=vendor_id]").getValue();
        var bankaccStore = fd.down("[name=vendor_bankacc_id]").getStore();

        fd.setLoading("Load Vendor Bank Account...");
        bankaccStore.load({
            params: {
                'vendor_id': vendor_id,
                'limit': 1000,
                'page': 1,
                'start': 0
            },
            callback: function (records, operation, success) {
                fd.setLoading(false);
                // BAGIAN AUTOCOMPLETE VENDOR BANK
                if (default_id > 0) {
                    fd.down("[name=vendor_bankacc_id]").setValue(default_id);
                } else {
                    if (records.length > 0) {
                        fd.down("[name=vendor_bankacc_id]").setValue(records[0].data.vendor_bankacc_id);
                        fd.down("[name=vendor_bank_name]").setValue(records[0].data.bank_name);
                        fd.down("[name=vendor_bank_account_name]").setValue(records[0].data.bank_account_name);
                        fd.down("[name=vendor_bank_currency]").setValue(records[0].data.currency_word);
                        fd.down("[name=remarks]").setValue(records[0].data.remarks);
                    }
                }
            }
        });
        fd.setLoading(false);
    },
    dataSaveBankstore: function () {
        var me, pd = '';
        me = this;
        state = me.getFormdatabank().up('window').state;
        var f = me.getFormdatabank();
        var fd = me.getFormdata();
        var form = me.getFormdatabank().getForm();
        if (form.isValid()) {
            var bankstore = me.getStore('Vendorbank');
            var row = form.getValues();
            row['vendor_id'] = fd.down("[name=vendor_id]").getValue();
            row['statedata'] = 'create';
            row['bank_name'] = me.getFormdatabank().down("[name=bank_id]").getRawValue();
            row['currency_word'] = me.getFormdatabank().down("[name=currency]").getRawValue();
            row['active'] = 1;

            f.setLoading("Saving data bank account...");
            Ext.Ajax.request({
                url: 'cashier/vendor/vendorbankcreate',
                params: {
                    hideparam: 'default',
                    data: Ext.encode(row)
                },
                success: function (response) {
                    f.setLoading(false);
                    var data = Ext.JSON.decode(response.responseText);
                    if (data.success == 'true') {
                        me.buildSuccessAlert(data.msg);
                        me.getDatavendorbankacc(data.last_id);
                    } else {
                        me.buildFailedAlert(data.msg);
                    }
                    me.getFormdatabank().up('window').close();
                }
            })
        }
    },
    gridattachmentdetailAfterrender: function () {
        var me = this;
        var maingrid = me.getGrid();
        var selectedRecord = maingrid.getSelectionModel().getSelection()[0];
        var state = me.getFormdata().up('window').state;

        if (state == 'update' || state == 'read') {
            var status = selectedRecord['data'].status;

            if (me.status_approve.includes(parseInt(status)) && me.getGridattachmentdetail().approval_rules == "hod_approve") {
                Ext.getCmp("btnAddattachment").setText("Add Additional Attachment");
            } else {
                Ext.getCmp("btnAddattachment").setText("Add Attachment");
            }
        }
    },
    dataDestroyattachmentdetailwithflagDirect: function () {
        var me = this;
        var ids = [];
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

            for (var i = 0; i < rows.length; i++) {

                if (rows[i].data.is_additional == null || rows[i].data.is_additional == 0) {
                    me.buildFailedAlert("Only additional attachments can be removed");
                    return false;
                } else {
                    ids.push(rows[i].data.attachment_id);
                }
            }
            ids = ids.join(',');

            Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
                if (btn == 'yes') {

                    me.getGridattachmentdetail().setLoading("Deleting attachment...");
                    Ext.Ajax.request({
                        url: 'cashier/vdrequest/detaildelete',
                        params: {
                            data: Ext.encode({
                                attachment_id: ids,
                                hideparam: 'detailattachmentdelete'
                            })
                        },
                        success: function (response) {
                            var info = Ext.JSON.decode(response.responseText);
                            if (info.success == 'true') {
                                me.buildSuccessAlert("Attachment has been deleted.");
                            } else {
                                me.buildFailedAlert("Failed to delete attachment.");
                            }
                            me.getGridattachmentdetail().setLoading(false);
                            me.getGridattachmentdetail().getStore().reload();
                        }
                    })

                }

            });

        }
    },
    cellgridListApproval: function () {
        var me, pda, form, statehead, grid, row;
        me = this.getMe();
        form = me.getFormdata();
        statehead = form.up('window').state.toLowerCase();
        pda = me.paramdetailapproval;
        grid = me.getGridapprovaldetail();
        row = grid.getSelectionModel().getSelection();
        grid.down('#btnEdit').setDisabled(row.length != 1 || row[0].data.approval_status == 'A' || row[0].data.approval_status == 'C');
        grid.down('#btnDelete').setDisabled(row.length != 1 || row[0].data.approval_status == 'A' || row[0].data.approval_status == 'C');

        pda.grid = me.getGridapprovaldetail();
        pda.object = pda.grid.getSelectionModel().getSelection();
        pda.data = '';
        for (var i = 0; i <= pda.object.length - 1; i++) {
            pda.data = pda.object[i];
        }
        if (pda.data !== '') {
            pda.rowdata = pda.data;
            pda.row = pda.rowdata['data'];
        }
    },
    gridlistapprovalitemdoubleclick: function () {
        var me, pda;
        me = this.getMe();
        pda = me.paramdetailapproval;
        pda.action = 'update';
        me.actiondataListApproval();
    },
    actiondataListApproval: function () {
        var me, pda, grid, row, returndata;
        me = this.getMe();
        pda = me.paramdetailapproval;
        me.cellgridListApproval();
        grid = me.getGridapprovaldetail();
        row = grid.getSelectionModel().getSelection();
        if (row[0].data.approval_status == 'A' || row[0].data.approval_status == 'C') {
            me.buildWarningAlert('Anda tidak dapat melakukan perubahan ataupun menghapus data ini.');
            return 0;
        }
        switch (pda.action) {
            case 'update':
                me.paramdetailapproval.stateform = 'update';
                me.GenerateFormdata(me.paramdetailapproval);
                break;
            case 'destroy':
                me.dataDestroyapprovaldetailwithflag();
                break;
            default:
                returndata = "No action selected";
        }
    },
    formDataListApproverAfterRender: function () {
        var me, pda, form;
        me = this.getMe();
        pda = me.paramdetailapproval;
        form = me.getFormdataapprovaldetail();
        me.getListApprovalByDepartment();
        var storedetail = Ext.data.StoreManager.lookup('VDRequestlistapproval');
        form.loadRecord(pda.rowdata);
    },
    setUserEmail: function () {
        var me, form, formapprovaldetail, store;
        me = this.getMe();
        form = me.getFormdata();
        formapprovaldetail = me.getFormdataapprovaldetail();
        store = me.getStore('VDRequestlistapproval');
        formapprovaldetail.down('[name=user_email]').setValue(formapprovaldetail.down('[name=approval_by]').rawValue);
    },
    dataSaveListApprovalstore: function () {
        var me, form, statehead, pda, formapprovaldetail, grid, store, record, row, indexdata, getindex = '';
        me = this.getMe();
        pda = me.paramdetailapproval;
        form = me.getFormdata();
        statehead = form.up('window').state;
        formapprovaldetail = me.getFormdataapprovaldetail();
        var is_valid = 1;
        var is_invalid = 0;
        if (formapprovaldetail.getForm().isValid()) {
            grid = me.getGridapprovaldetail();
            store = grid.getStore();
            row = formapprovaldetail.getForm().getValues();
            row[me.idheaderfield] = me.idheadervalue;
            pda.row = row;
            indexdata = grid.getSelectionModel().getSelection()[0];
            getindex = store.indexOf(indexdata);
            record = store.getAt(getindex);
            record.beginEdit();
            row['statedata'] = 'create';
            row['approval_by'] = me.getVal(formapprovaldetail, 'approval_by', 'value');
            row['user_email'] = me.getVal(formapprovaldetail, 'user_email', 'value');
            row[me.idheaderfield] = me.idheadervalue;
            record.set(row);
            record.endEdit();
            store.commitChanges();
            store.filter('deleted', false);
            formapprovaldetail.up('window').close();
            console.log(record);
        }
    },
    // SEFTIAN ALFREDO 21/11/2021
    getListApproval: function (callback) {
        var me, pda, counter, form, rowdata, store, grid, rawjson = '';
        me = this.getMe();
        pda = me.paramdetailapproval;
        form = me.getFormdata();
        var project_id = form.down("[name=project_id]").getValue();
        var pt_id = form.down("[name=pt_id]").getValue();
        var is_pajak = form.down("[name=is_pajak]").getValue();
        var amount = form.down("[name=amount]").getValue();
        pda.grid = me.getGridapprovaldetail();
        pda.store = me.getStore("VDRequestapprovaldetail");
        pda.store.load({
            params: {
                'hideparam': 'getlistapproval',
                "project_id": project_id,
                "pt_id": pt_id,
                "department_id": me.getVal(form, 'department_id', 'value'),
                "amount": (amount ? amount : 0),
                "is_pajak": (is_pajak ? 1 : 0),
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                try {
                    counter = pda.store.getCount();
                    rawjson = pda.store.proxy.getReader().jsonData;
                }
                catch (err) {
                    console.log(err.message);
                }
            }
        });
    },
    getListApprovalByDepartment: function () {
        var me, form, store, pda;
        me = this.getMe();
        form = me.getFormdata();
        var project_id = form.down("[name=project_id]").getValue();
        var pt_id = form.down("[name=pt_id]").getValue();
        store = me.getStore('VDRequestlistapproval');
        pda = me.paramdetailapproval;
        store.load({
            params: {
                "hideparam": 'getlistapprovalbydepartment',
                "project_id": project_id,
                "pt_id": pt_id,
                "department_id": me.getVal(form, 'department_id', 'value'),
                "sequence": pda.row.sequence,
                "voucher_groupapprover_id": pda.row.voucher_groupapprover_id,
                "approval_type": pda.row.approval_type,
            },
            callback: function (records, operation, success) {
            }
        });
    },
    addTaxApprove: function () {
        var me, form, store;
        me = this.getMe();
        form = me.getFormdata();
        var project_id = form.down("[name=project_id]").getValue();
        var pt_id = form.down("[name=pt_id]").getValue();
        store = me.getStore('VDRequestapprovaldetail');

        var sendparams = {
            "hideparam": 'gettaxapprovalbydepartment',
            "project_id": project_id,
            "pt_id": pt_id,
            "department_id": me.getVal(form, 'department_id', 'value'),
        };

        Ext.Ajax.request({
            url: me.urldetail + 'read',
            timeout: 45000000,
            method: 'POST',
            params: sendparams,
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);
                var addData = info.data[0];
                store.loadData([], true);
                store.add(addData);
            }
        });
    },
    removeTaxApprove: function () {
        var me, store;
        me = this.getMe();
        store = me.getStore('VDRequestapprovaldetail');
        store.removeAt(store.find('approval_type', 'tax_approve'));
    },
    dataDestroyapprovaldetailwithflag: function () {
        var me, pda, rows, store, storeCount, record, getindex;
        var hodCount = 0;

        me = this.getMe();
        pda = me.paramdetailapproval;

        rows = me.getGridapprovaldetail().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return false;
        }

        store = me.getStore('VDRequestapprovaldetail');
        storeCount = store.getCount();

        store.each(function (rec, index) {
            if (rec.get('approval_type') == 'hod_approve') {
                hodCount++;
            }
        });

        if (hodCount == 1 && rows[0].data.approval_type == 'hod_approve') {
            Ext.Msg.alert('Info', 'Min 1 HOD Approver Needed');
            return false;
        }

        getindex = store.indexOf(rows[0]);

        Ext.Msg.confirm('Delete Data', 'Are you sure want to delete ?', function (btn) {
            if (btn == 'yes') {
                resetTimer();
                msg = function () {
                    me.getGridapprovaldetail().up('window').mask('Deleting data, please wait ...');
                };
                if (rows[0].data.approval_type == 'tax_approve') {
                    me.getFormdata().down("[name=is_pajak]").setValue(0);
                }
                store.removeAt(getindex);
            }

        });
    },
    Saveapproval: function (that, state) {
        var me, upstate, form, storeapproval, counterapproval, dataapproval, dataupdate;
        me = that;
        form = me.getFormdata();
        upstate = form.up('window').state.toLowerCase();

        storeapproval = Ext.data.StoreManager.lookup('VDRequestapprovaldetail');
        storeapproval.clearFilter(true);
        counterapproval = storeapproval.getCount();

        var department_id = form.down("[name=department_id]").getValue();
        var is_pajak = form.down("[name=is_pajak]").getValue();

        if (counterapproval > 0) {

            if (state == 'update') {
                dataupdate = {};
                dataupdate['parametersql'] = 'update';
                dataupdate['hideparam'] = 'detailapprovalupdate';
                dataupdate['project_id'] = me.project_id;
                dataupdate['pt_id'] = me.pt_id;
                dataupdate['voucher_id'] = me.idheadervalue;

                Ext.Ajax.request({
                    url: me.urldetail + 'update',
                    method: 'POST',
                    async: false,
                    params: {
                        data: Ext.encode(dataupdate)
                    },
                    success: function (response) {
                        console.log(response);
                    }
                });
            }

            storeapproval.each(function (record, index) {
                var i = index + 1;

                dataapproval = record['data'];
                if (index == 0) {
                    dataapproval['flag'] = 'first';
                } else {
                    dataapproval['flag'] = '';
                }

                dataapproval['parametersql'] = 'create';
                dataapproval['hideparam'] = 'detailapprovalcreate';
                dataapproval['project_id'] = me.project_id;
                dataapproval['pt_id'] = me.pt_id;
                dataapproval['is_pajak'] = is_pajak;
                dataapproval['department_id'] = department_id;
                dataapproval['voucher_id'] = me.idheadervalue;

                Ext.Ajax.request({
                    url: me.urldetail + 'create',
                    method: 'POST',
                    async: false,
                    params: {
                        data: Ext.encode(dataapproval)
                    },
                    success: function (response) {
                        console.log(response);
                    }
                });

            });
        }

    },
    // SEFTIAN ALFREDO 09/02/2022 - CHECKING APPROVAL USING GLOBALPARAM
    formDataCheckingAfterRender: function () {
        var me, row, form, ids, vids;
        me = this.getMe();
        row = me.getGrid().getSelectionModel().getSelection();
        form = me.getFormdatacheckingvoucher();
        ids = [];
        vids = [];

        if (row.length == 0) {
            me.buildWarningAlert("No data selected.");
            return 0;
        }

        for (var i = 0; i < row.length; i++) {
            ids.push(row[i].data.voucher_id);
            vids.push(row[i].data.vid);
        }

        me.getFormdatacheckingvoucher().down("[name=voucher_id]").setValue(ids.join(','));
        me.getFormdatacheckingvoucher().down("[name=project_id]").setValue(row[0].data.project_id);
        me.getFormdatacheckingvoucher().down("[name=pt_id]").setValue(row[0].data.pt_id);
        me.getFormdatacheckingvoucher().down("[name=regno]").setValue(vids.join(', '));

        if (me.global_param['TRACKING_VOUCHER_TAX']['value'].length != 0 && me.global_param['TRACKING_VOUCHER_TAX']['value'].includes(apps.uid)) {
            form.down("[name=approval_type]").setValue("TRACKING_VOUCHER_TAX");
            form.down("[name=role]").setValue("Tax");
        }

        if (me.global_param['TRACKING_VOUCHER_TREASURY']['value'].length != 0 && me.global_param['TRACKING_VOUCHER_TREASURY']['value'].includes(apps.uid)) {
            form.down("[name=approval_type]").setValue("TRACKING_VOUCHER_TREASURY");
            form.down("[name=role]").setValue("Treasury");
        }

        if (me.global_param['TRACKING_VOUCHER_COLLECTION']['value'].length != 0 && me.global_param['TRACKING_VOUCHER_COLLECTION']['value'].includes(apps.uid)) {
            form.down("[name=approval_type]").setValue("TRACKING_VOUCHER_COLLECTION");
            form.down("[name=role]").setValue("Collection");
        }

        if (me.global_param['TRACKING_VOUCHER_HEADFINANCE']['value'].length != 0 && me.global_param['TRACKING_VOUCHER_HEADFINANCE']['value'].includes(apps.uid)) {
            form.down("[name=approval_type]").setValue("TRACKING_VOUCHER_HEADFINANCE");
            form.down("[name=role]").setValue("Head Finance");
        }

        if (me.global_param['TRACKING_VOUCHER_FC']['value'].length != 0 && me.global_param['TRACKING_VOUCHER_FC']['value'].includes(apps.uid)) {
            form.down("[name=approval_type]").setValue("TRACKING_VOUCHER_FC");
            form.down("[name=role]").setValue("Finance Controller");
        }
    },
    setStoreVoucherMakerFormsearch: function () {
        var me, store, form;
        me = this.getMe();
        form = me.getFormsearch();
        store = me.getStore("Vouchermaker");
        store.proxy.extraParams = {
            "hideparam": 'getvouchermaker',
            "project_id": me.project_id,
            "pt_id": me.pt_id,
        }
        store.reload({
            params: {
                "hideparam": 'getvouchermaker',
                "pt_id": me.pt_id,
                "project_id": me.project_id
            },
            callback: function (records, operation, success) {
                /*store.each(function (record)
                {
                    if (record.data['department_id'] == me.department_id) {
                        me.setVal(form, 'department_id', record.data['department_id']);
                    }
                });*/
            }
        });

    },
    formTrackingShow: function (el, act, action) {
        var me = this.getMe();
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
                title: 'Tracking Voucher Department',
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
    formTrackingAfterRender: function () {
        var me, grid, store, record, counter;
        me = this.getMe();
        me.ftar().init();
        // me.loadComboBoxStore(form);
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

    },
    ftar: function () {
        var me, grid, store, record, counter;
        me = this.getMe();
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
            read: function () {
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
    setFormtrackingready: function () {
        var me, ft, grid, store;
        me = this.getMe();
        ft = me.getFormtracking();
        grid = me.getGriddetaillog();
        store = grid.getStore();
        var voucher_id = me.getFormdata().down('[name=voucher_id]').getValue();
        store.load({
            params: {
                "hideparam": 'detaillog',
                "voucher_id": voucher_id,
                "start": 0,
                "limit": 25,
            },
            callback: function (records, operation, success) {
                /*counter = pd.store.getCount();
                rawjson = pd.store.proxy.getReader().jsonData;
                if (counter > 0) {
                    rowdata = records[0]['data'];
                    pd.grid.getSelectionModel().select(0, true);
                }*/
            }
        });
    },
    generatePajakSh3b: function (data) {
        var me, grid, store, counter, record, row,
            amountppn, amountpph, persentaseppn, persentasepph, amount, checkppn, checkpph, dataflow, keterangan, keterangan_tambahan_ppn, keterangan_tambahan_pph;
        me = this.getMe();
        storedetail = me.getGriddetail().getStore();

        amountppn = 0; amountpph = 0, totalpajak = 0;
        checkppn = false; checkpph = false;
        keterangan = ''; keterangan_tambahan_ppn = ''; keterangan_tambahan_pph = '';

        var coapajak = [];
        var deleted = [];
        var pajakdatas = [];
        var coapajakfinal = [];
        var pajakdatasfinal = [];

        for (i = 0; i < data.length; i++) {
            var d = data[i];
            coapajak.push(d.coa);
        }

        for (i = 0; i <= storedetail.getCount(); i++) {
            storedetail.each(function (rec) {
                if (coapajak.includes(rec.get("coa"))) {
                    rec.set("deleted", true);
                    rec.set("statedata", 'delete');
                    deleted.push(storedetail.indexOf(rec));
                }
            });
        }

        storedetail.clearFilter(true);
        storedetail.filter('deleted', false);


        /*
        for (i = 0; i < deleted.length; i++) {
            var d = deleted[i];
            for (i = 0; i < deleted.length; i++) {
                storedetail.removeAt(d);
            }
        }

        */

        //return 0;

        var indexdata = 1;

        var totalamountppn = 0;
        var totalamountpph = 0;

        /*SUB nya isi ulang*/

        var substoredata = me.localStore.substore;
        var substoredatanew = [];
        substoredata.forEach(function (item, index) {
            if (typeof item.subcashierdesc === 'undefined') {
                substoredatanew.push(item);
            }
        });
        // maks indexdata
        arrs = [];
        storedetail.each(function (rec) {
            arrs.push(rec.get("indexdata"));
            indexdata = Math.max.apply(null, arrs);
        });

        var containkasbondeptids = 0;
        storedetail.each(function (rec) {
            persentaseppn = parseFloat(rec.get("persentaseppn")).toFixed(2);
            persentasepph = parseFloat(rec.get("persentasepph")).toFixed(2);
            tipepajakdetailppn_id = parseInt(rec.get("tipepajakdetailppn_id"));
            tipepajakdetailpph_id = parseInt(rec.get("tipepajakdetailpph_id"));
            is_ppnprogresif = parseInt(rec.get("is_ppnprogresif"));
            is_pphprogresif = parseInt(rec.get("is_pphprogresif"));
            checkppn = rec.get("checkppn");
            checkpph = rec.get("checkpph");
            keterangan = rec.get("remarks");

            kasbondept_id = rec.get("kasbondept_id");
            kasbondept_no = rec.get("cashbon_no");

            amountppn = 0; amountpph = 0;

            var totalamount = accounting.unformat(rec.get("amount"));
            var checkpajak = 0;
            var is_progresif = is_ppnprogresif + is_pphprogresif;

            //Progressive Calc
            if (is_ppnprogresif == 1 && checkppn) {
                amountppn = me.getPajakProgresif(tipepajakdetailppn_id, totalamount);
                amountppn = parseFloat(amountppn);
                totalamountppn = totalamountppn + amountppn;
                checkpajak = 1;
            }
            if (is_pphprogresif == 1 && checkpph) {
                amountpph = me.getPajakProgresif(tipepajakdetailpph_id, totalamount);
                amountpph = parseFloat(amountpph);
                totalamountpph = totalamountpph + amountpph;
                checkpajak = 1;
            }
            //Strandard Calc
            if (persentaseppn > 0 && checkppn && is_ppnprogresif !== 1) {
                amount = totalamount * (persentaseppn / 100);
                amountppn = amountppn + amount;
                totalamountppn = totalamountppn + amountppn;
                checkpajak = 1;
            }
            if (persentasepph > 0 && checkpph && is_pphprogresif !== 1) {
                amount = totalamount * (persentasepph / 100);
                amountpph = amountpph + amount;
                totalamountpph = totalamountpph + amountpph;
                checkpajak = 1;
            }

            containkasbondeptids = containkasbondeptids + parseInt(rec.get("kasbondept_id"));

            if (checkpajak > 0) {
                for (i = 0; i < data.length; i++) {
                    var d = data[i];
                    if (d.tipepajakdetail_id === rec.get("tipepajakdetailppn_id")) {
                        indexdata = indexdata + 1;
                        if (d.pengali > 0) {
                            dataflow = "I";
                        } else {
                            dataflow = me.in_out; // PPH sebagai Pengurang
                        }

                        if (me.in_out == 'I') {
                            dataflow = "O";
                        }

                        if (d.statusround == 'roundup') {
                            //Round Auto : Pembulatan ke atas/bawah 
                            amountppn = Math.round(amountppn);
                            totalamountppn = Math.round(totalamountppn);
                        }
                        if (d.statusround == 'round') {
                            //Round (Remove Decimal)
                            amountppn = Math.round(amountppn);
                            totalamountppn = Math.round(totalamountppn);
                        }
                        var keterangan_presentase = persentaseppn;

                        if (me.project_id == 6) {
                            if (d.name == 'PPN MASUKAN') {
                                keterangan_tambahan_ppn = 'PPN ' + ' (' + keterangan_presentase + '%) - ' + keterangan;
                            } else {
                                keterangan_tambahan_ppn = d.name + ' (' + keterangan_presentase + '%) - ' + keterangan;
                            }
                        } else {
                            if (d.name == 'PPN MASUKAN') {
                                keterangan_tambahan_ppn = 'PPN' + ' - ' + keterangan;
                            } else {
                                keterangan_tambahan_ppn = d.name + ' - ' + keterangan;
                            }
                        }

                        var pajakdata = {
                            voucher_id: me.idheadervalue, voucherdetail_id: 0, coa_id: d.coa_id, coa: d.coa, coaname: d.coa_name,
                            kelsub_id: d.kelsub_id, kelsub: d.kelsub, kelsubdesc: d.kelsub, subcashier_id: 999, subcashierdesc: "pajak", indexdata: indexdata, dataflow: dataflow,
                            amount: Math.round(amountppn), remarks: keterangan_tambahan_ppn, deleted: !1, hideparam: "default", statedata: "create", kasbondept_id: rec.get("kasbondept_id"),
                            kasbondeptdetail_id: 0, typetransdetail: dataflow, setupcashflow_id: d.setupcashflow_id, cashflowtype: d.cashflowtype, checkppn: !1, checkpph: !1,
                            tipepajakdetailppn_id: 0, tipepajakdetailpph_id: 0, persentaseppn: "", persentasepph: "", balancecoa: "", cashbon_no: rec.get("cashbon_no")
                        };
                        totalpajak = totalpajak + amountppn;
                        pajakdatas.push(pajakdata);
                        coapajakfinal.push(d.coa);

                        var row = {
                            amount: Math.round(amountppn), coa_id: d.coa_id, code1: d.subgl_code, code2: "", code3: "", code4: "",
                            deleted: false, hideparam: "default", indexdata: "1", indexdataheader: indexdata, indexsubdata: indexdata,
                            kelsub: d.kelsub,
                            kelsub_id: d.kelsub_id, project_id: me.project_id, pt_id: me.pt_id, remarks: d.name, statedata: "create", subcode: d.subgl_code,
                            subgl_id: d.subgl_id, voucher_id: "0", voucherdetail_id: indexdata, vouchersubdetail_id: "", subcashierdesc: "pajak"
                        };

                        substoredatanew.push(row);

                    }
                }
                for (i = 0; i < data.length; i++) {
                    var d = data[i];
                    if (d.tipepajakdetail_id === rec.get("tipepajakdetailpph_id")) {
                        indexdata = indexdata + 1;
                        if (d.pengali > 0) {
                            dataflow = "I";
                        } else {
                            dataflow = me.in_out; // PPH sebagai Pengurang
                        }
                        if (d.statusround == 'roundup') {
                            //Round Auto : Pembulatan ke atas/bawah 
                            amountpph = Math.trunc(amountpph);
                            totalamountpph = Math.trunc(totalamountpph);
                        }
                        if (d.statusround == 'round') {
                            //Round (Remove Decimal)
                            amountpph = Math.trunc(amountpph);
                            totalamountpph = Math.trunc(totalamountpph);
                        }
                        var keterangan_presentase = persentasepph;

                        if (me.project_id == 6) {
                            keterangan_tambahan_pph = d.name + ' (' + keterangan_presentase + '%) - ' + keterangan;
                        } else if (me.is_cgg) {
                            keterangan_tambahan_pph = d.name + ' (' + keterangan_presentase + '%)' + ' - ' + keterangan;
                        } else {
                            keterangan_tambahan_pph = d.name + ' - ' + keterangan;
                        }

                        var pajakdata = {
                            voucher_id: me.idheadervalue, voucherdetail_id: 0, coa_id: d.coa_id, coa: d.coa, coaname: d.coa_name,
                            kelsub_id: d.kelsub_id, kelsub: d.kelsub, kelsubdesc: d.kelsub, subcashier_id: 999, subcashierdesc: "pajak", indexdata: indexdata, dataflow: dataflow,
                            amount: Math.trunc(amountpph), remarks: keterangan_tambahan_pph, deleted: !1, hideparam: "default", statedata: "create", kasbondept_id: rec.get("kasbondept_id"),
                            kasbondeptdetail_id: 0, typetransdetail: dataflow, setupcashflow_id: d.setupcashflow_id, cashflowtype: d.cashflowtype, checkppn: !1, checkpph: !1,
                            tipepajakdetailppn_id: 0, tipepajakdetailpph_id: 0, persentaseppn: "", persentasepph: "", balancecoa: "", cashbon_no: rec.get("cashbon_no")
                        };
                        totalpajak = totalpajak + amountpph;
                        pajakdatas.push(pajakdata);
                        coapajakfinal.push(d.coa);

                        var row = {
                            amount: Math.trunc(amountpph), coa_id: d.coa_id, code1: d.subgl_code, code2: "", code3: "", code4: "",
                            deleted: false, hideparam: "default", indexdata: "1", indexdataheader: indexdata, indexsubdata: indexdata,
                            kelsub: d.kelsub,
                            kelsub_id: d.kelsub_id, project_id: me.project_id, pt_id: me.pt_id, remarks: d.name, statedata: "create", subcode: d.subgl_code,
                            subgl_id: d.subgl_id, voucher_id: "0", voucherdetail_id: indexdata, vouchersubdetail_id: "", subcashierdesc: "pajak"
                        };

                        substoredatanew.push(row);

                    }
                }

            }

        });

        me.localStore.substore = substoredatanew;

        if (totalpajak == 0) {
            me.tools.alert.warning("Tidak Ada Pajak Di-Generate");
            var form = me.getFormdata();
            form.down("[name=is_pajak]").setValue(0);
            return 0;
        }

        if (containkasbondeptids > 0) {
            for (i = 0; i < pajakdatas.length; i++) {
                pajakdatas[i].amount = accounting.formatMoney(pajakdatas[i].amount);
                storedetail.add(pajakdatas[i]);
            }
        } else {
            var uniquecoapajakfinal = coapajakfinal.filter(function (item, pos) {
                return coapajakfinal[pos];
            });

            var pajakdatafinal = [];
            var idxdata = [];

            for (i = 0; i < uniquecoapajakfinal.length; i++) {
                // inisialisasi amount tiap coa pajak

                // looping buat ngisi amount nya
                for (il = 0; il < pajakdatas.length; il++) {

                    if (idxdata.includes(pajakdatas[il].indexdata) == false) {

                        if (uniquecoapajakfinal[i] == pajakdatas[il].coa) {
                            idxdata.push(pajakdatas[il].indexdata);
                            pajakdatas[il].amount = pajakdatas[il].amount;
                            pajakdatafinal.push(pajakdatas[il]);
                        }
                    }

                }

            }

            for (i = 0; i < pajakdatafinal.length; i++) {
                pajakdatafinal[i].amount = accounting.formatMoney(pajakdatafinal[i].amount);
                storedetail.add(pajakdatafinal[i]);
            }
        }


        me.setSumdetailSimple();
        me.setSumdetail();

        storedetail.commitChanges();

        me.getGriddetail().getView().refresh();
        me.getGriddetail().down('#btnGenerate').setDisabled(true);
        me.flaggeneratepajak = 0;
        me.paramdetail.changeamount = 0;

    },
    unapprovesby: function () {
        var me, rows, record;
        me = this;
        rows = me.getGrid().getSelectionModel().getSelection();
        record = rows[0].data;
        var print_counter = record.print_counter;
        var confirmmsg = 'Voucher akan di <i>unapprove</i>, apakah anda yakin ?';

        if (print_counter > 0) {
            confirmmsg = 'Anda sudah melakukan cetak voucher, ' + confirmmsg;
        }

        Ext.Msg.confirm('Unapprove Data', confirmmsg + '<br><br>Reason <br><textarea type="text" id="reasonunapprove" name="reasonunapprove" cols="75"></textarea>', function (btn) {
            if (btn == 'yes') {
                if ($('#reasonunapprove').val().length < 5) {
                    me.buildWarningAlert('Masukan alasan kenapa voucher diunapprove minimal 5 karakter');
                    return false;
                }
                resetTimer();
                var msg = function () {
                    me.getGrid().up('window').mask('Unapprove data, please wait ...');
                };

                var sendparams = {
                    voucher_id: record.voucher_id,
                    project_id: record.project_id,
                    pt_id: record.pt_id,
                    reasonunapprove: $('#reasonunapprove').val(),
                    amount: record.amount,
                    voucher_no: record.voucher_no,
                    hideparam: 'unapprovesby'
                };

                Ext.Ajax.request({
                    url: me.urldata + 'update',
                    method: 'POST',
                    async: false,
                    params: {
                        data: Ext.encode(sendparams)
                    },
                    success: function (response) {
                        var data = Ext.JSON.decode(response.responseText);
                        if (data.success == 'true') {
                            me.buildSuccessAlert(data.msg);
                        } else {
                            me.buildFailedAlert("Failed to unapprove.");
                        }
                        me.getGrid().setLoading(false);
                        me.getGrid().getStore().reload();

                    }
                });
            }
        });
    },
    syncApprovePrint: function () {
        var me, record, row, data, grid;
        me = this.getMe();
        form = me.getFormdata();
        grid = me.getGrid();
        record = grid.getSelectionModel().getSelection()[0];
        row = record['data'];
        data = row;
        data['hideparam'] = 'approvesby';
        me.senddata = data;
        me.loadingapprove.show();
        me.urlrequest = me.urldataapprove + 'update';
        me.AjaxRequestV2();
    },

    getSettingGlobalParam: function (form = null) {
        var me = this.getMe(),
            fs = me.getFormsearch(),
            fd = me.getFormdata(),
            f = (form == 'formsearch' ? me.getFormsearch() : me.getFormdata()),
            project_id = me.project_id,
            pt_id = me.pt_id,
            list_params_key = '',
            list_params_name = '';

        for (key in me.global_param) {
            list_params_key = list_params_key + key + '~';
            list_params_name = list_params_name + me.global_param[key].name + '~';
        }

        Ext.Ajax.request({
            url: 'cashier/vdrequest/read',
            params: {
                'hideparam': 'getsettingglobalparam',
                'project_id': project_id,
                'pt_id': pt_id,
                'list_params': list_params_key,
                'list_params_name': list_params_name,
            },
            success: function (response) {
                var data = Ext.JSON.decode(response.responseText);
                if (data.msg == 'Success') {
                    for (var i = 0; i < data.data.length; i++) {
                        var parameter = data.data[i].parameter;
                        var value = data.data[i].value;
                        switch (parameter) {
                            case 'DUEDATE_DAYS':
                                me.duedate_days = (value ? parseInt(value) : me.global_param[parameter]['default']);
                                me.global_param[parameter]['value'] = (value ? parseInt(value) : me.global_param[parameter]['default']);
                                break;
                            case 'MAX_ROW_VOUCHER':
                                me.max_row_voucher = (value ? parseInt(value) : me.global_param[parameter]['default']);
                                me.global_param[parameter]['value'] = (value ? parseInt(value) : me.global_param[parameter]['default']);
                                break;
                            case 'approval_rules':
                                me.approval_rules = (value ? value : me.global_param[parameter]['default']);
                                me.global_param[parameter]['value'] = (value ? value : me.global_param[parameter]['default']);
                                break;
                            case 'vendor_create':
                                me.vendor_create = (value ? value : me.global_param[parameter]['default']);
                                me.global_param[parameter]['value'] = (value ? value : me.global_param[parameter]['default']);
                                break;
                            case 'vendor_autofill':
                                me.vendor_autofill = (value ? value : me.global_param[parameter]['default']);
                                me.global_param[parameter]['value'] = (value ? value : me.global_param[parameter]['default']);
                                break;
                            case 'coa_pajak':
                                me.coapajaks = (value ? value : me.global_param[parameter]['default']);
                                me.global_param[parameter]['value'] = (value ? value : me.global_param[parameter]['default']);
                                break;
                            case 'hod_approve_dept_exclusion':
                                me.hod_approve_dept_exclusion = (value ? value.split(',') : me.global_param[parameter]['default']);
                                me.global_param[parameter]['value'] = (value ? value.split(',') : me.global_param[parameter]['default']);
                                break;
                            case 'is_vd_send_to_finance':
                                me.is_vd_send_to_finance = (value ? parseInt(value) : me.global_param[parameter]['default']);
                                me.global_param[parameter]['value'] = (value ? parseInt(value) : me.global_param[parameter]['default']);
                                break;
                            case 'TRACKING_VOUCHER_TAX':
                                me.global_param[parameter]['value'] = (value ? value.split(',') : me.global_param[parameter]['default']);
                                break;
                            case 'TRACKING_VOUCHER_TREASURY':
                                me.global_param[parameter]['value'] = (value ? value.split(',') : me.global_param[parameter]['default']);
                                break;
                            case 'TRACKING_VOUCHER_HEADFINANCE':
                                me.global_param[parameter]['value'] = (value ? value.split(',') : me.global_param[parameter]['default']);
                                break;
                            case 'TRACKING_VOUCHER_COLLECTION':
                                me.global_param[parameter]['value'] = (value ? value.split(',') : me.global_param[parameter]['default']);
                                break;
                            case 'TRACKING_VOUCHER_FC':
                                me.global_param[parameter]['value'] = (value ? value.split(',') : me.global_param[parameter]['default']);
                                break;
                            case 'getnofaktur':
                                me.no_faktur = (value ? parseInt(value) : me.global_param[parameter]['default']);
                                me.global_param[parameter]['value'] = (value ? parseInt(value) : me.global_param[parameter]['default']);
                                break;

                            default:
                                break;
                        }
                    }
                // console.log(me.global_param);
                }
            }
        });
    },

    getAmountReal: function () {
        var me, fd, grid, store, record, voucher_id;
        me = this.getMe();
        fd = me.getFormdata();
        grid = me.getGrid();
        store = grid.getStore();
        record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
        voucher_id = record.data.voucher_id;

        Ext.Ajax.request({
            url: 'cashier/vdrequest/read',
            params: {
                'hideparam': 'getamountreal',
                'project_id': record.data.project_id,
                'pt_id': record.data.pt_id,
                'voucher_id': voucher_id
            },
            success: function (response) {
                var data = Ext.JSON.decode(response.responseText);
                if (data.msg == 'success') {
                    if (data.data) {
                        var result = data.data.split(' ');
                        var nominal = result[0];
                        var currency = result[1];
                        fd.down("[name=title_amount_real]").setText('Amount sebelum perubahan');
                        fd.down("[name=amount_real]").setText(accounting.formatMoney(nominal) + ' ' + currency);
                    }
                }
            }
        });
    },

    mainDataSaveCustome: function () {
        var me = this.getMe(),
            linerestrictprojects = [3, 4034, 4036, 4065, 11119],
            is_deptvalid = 0,
            error = 0,
            errorpajak = 0,
            errormsg = '',
            flag_noattachment = false,
            form = me.getFormdata(),
            formdata = form.getForm(),
            storedept = me.getStore('Department'),
            storeheader = me.getGrid().getStore(),
            storedetail = Ext.data.StoreManager.lookup('VDRequestdetail'),
            counterdetail = storedetail.getCount(),
            storekasbondetail = Ext.data.StoreManager.lookup('VDRequestkasbondetail'),
            counterkasbondetail = storekasbondetail.getCount(),
            storeattachmentdetail = Ext.data.StoreManager.lookup('VDRequestattachmentdetail'),
            counterattachmentdetail = storeattachmentdetail.getCount(),
            storeapprovaldetail = Ext.data.StoreManager.lookup('VDRequestapprovaldetail'),
            counterapprovaldetail = storeapprovaldetail.getCount(),
            storesubdetail = Ext.data.StoreManager.lookup('VDRequestsubdetail'),
            countersubdetail = storesubdetail.getCount(),
            state = form.up("window").state.toLowerCase(),
            project_id = form.down("[name=project_id]").getValue(),
            dataflow = 'O',
            vendor_bankacc_id = form.down("[name=vendor_bankacc_id]").getValue(),
            paymentmethod_id = form.down("[name=paymentmethod_id]").getValue(),
            type_vendor = form.down("[name=type_vendor]").getValue(),
            customer_id = form.down("[name=customer_id]").getValue(),
            vendor_id = form.down("[name=vendor_id]").getValue(),
            amount = form.down("[name=amount]").getValue(),
            am = amount.replace(/,/g, ''),
            v_amount = parseFloat(am),
            komisiklaim_ids = parseInt(form.down("[name=komisiklaim_ids]").getValue()),
            komisiklaim_amount = parseFloat(form.down("[name=komisiklaim_amount]").getValue().replace(/,/g, '')),
            is_upload = parseInt(form.down("[name=is_upload]").getValue()),
            valuedata = formdata.getValues();

        // SET DATAFLOW
        if (Ext.getCmp("radio1_b123").checked === true) {
            dataflow = "I";
        } else {
            dataflow = "O";
        }

        // VALIDASI DEPARTMENT
        var department_id = form.down("[name=department_id]").getValue();
        storedept.each(function (record) {
            if (record.data['department_id'] == department_id) {
                is_deptvalid = 1;
            }
        });

        if (is_deptvalid == 0) {
            errormsg = 'Invalid department! <br>';
            error++;
        }

        if (am < 0) {
            errormsg = errormsg + 'Nilai amount harus positif. <br>';
            error++;
        }

        // VALIDASI TEBUS KASBON
        var is_pjk = form.down("[name=is_pjk]").getValue();
        if (is_pjk && counterkasbondetail == 0) {
            errormsg = errormsg + 'Tidak ada kasbon yang ditebus. Harap cek tab Multi Kasbon / field Kasbon No. <br>';
            error++;
        }

        if (counterkasbondetail > 0) {
            storekasbondetail.data.items.forEach(function (item, index) {
                // console.log(item.data);
                if ((parseInt(item.data.pay_amount) == 0 || item.data.pay_amount == '' || item.data.pay_amount == null) && project_id != 3016) {
                    errormsg = errormsg + '<i>Amount pay</i> pada tab multi kasbon (' + item.data.cashbon_no + ') harus lebih dari 0. <br>';
                    error++;
                }
            });
        }

        // VALIDARI JUMLAH DETAIL VOUCHER
        if (counterdetail > me.global_param['MAX_ROW_VOUCHER']['value']) {
            errormsg = errormsg + 'Maksimum baris voucher = ' + me.global_param['MAX_ROW_VOUCHER']['value'] + '. <br>';
            error++;
        }

        // VALIDASI VENDOR / CUSTOMER HARUS DIISI
        if (type_vendor == 'customer') {
            form.down("[name=vendor_id]").setValue(0);
            if (customer_id == 0 || isNaN(customer_id)) {
                errormsg = errormsg + 'Customer harus diisi. <br>';
                error++;
            }
        } else {
            form.down("[name=customer_id]").setValue(0);
            if (vendor_id == 0 || isNaN(vendor_id)) {
                errormsg = errormsg + 'Vendor harus diisi. <br>';
                error++;
            }
        }

        // VALIDASI VENDOR BANK ACC HARUS DIISI
        if (dataflow == 'O' && me.global_param['approval_rules']['value'] == 'hod_approve' && (paymentmethod_id == 2 || paymentmethod_id == 7)) {
            if (vendor_bankacc_id == '' || vendor_bankacc_id == null || vendor_bankacc_id == 0) {
                errormsg = errormsg + 'Bank Account No harus diisi.';
                error++;
            }
        }

        // VALIDASI NILAI KOMISI
        if (komisiklaim_ids > 0) {
            if (v_amount !== komisiklaim_amount) {
                errormsg = errormsg + 'Nilai komisi harus cair sebesar Rp. ' + accounting.formatMoney(komisiklaim_amount) + '. <br>';
                error++;
            }
        }

        // VALIDASI UPLOAD VOUCHER DETAIL
        if (counterdetail == 0 && is_upload == 0) {
            errormsg = errormsg + 'Tidak ada detail voucher. <br>';
            error++;
        }

        /*Cek Multiline Description, berlaku untuk proyek:
             - Citra Raya (project_id 3)
             - Citra Maja Raya (project_id 4034)
             - Citra Garden City Malang (project_id 4036)
     */
        if (linerestrictprojects.includes(project_id)) {

            var totallines = 0;
            storedetail.each(function (record, index) {
                var remarks = record.get("remarks");
                var lines = remarks.split(/\r\n|\r|\n/);
                totallines = totallines + lines.length;
            });

            if (totallines > 7 && me.is_multi_kasbon == 0) {
                errormsg = errormsg + 'Deskripsi terhitung : ' + totallines + ' baris. Baris deskripsi yang diizinkan adalah 7 baris. <br>';
                error++;
            }

        }

        // VALIDASI MULTI KASBON
        var storedetailarr = [];
        storedetail.each(function (record, index) {
            kasbondept_id = record.get("kasbondept_id");
            statedatadetail = record.get("statedata");
            if (statedatadetail !== 'delete' && kasbondept_id > 0) {
                storedetailarr.push({
                    kasbondept_id: kasbondept_id,
                    amount: accounting.unformat(record.get("amount")),
                    cashbon_no: record.get("cashbon_no"),
                    dataflow: record.get("dataflow"),
                    deleted: record.get("deleted")
                });
            }
        });

        var storekasbondetailarr = [];
        storekasbondetail.each(function (record, index) {
            kasbondept_id = record.get("kasbondept_id");
            statedatadetail = record.get("statedata");
            if (statedatadetail !== 'delete' && kasbondept_id > 0) {
                storekasbondetailarr.push({
                    kasbondept_id: kasbondept_id,
                    pay_amount: accounting.unformat(record.get("pay_amount")),
                    cashbon_no: (record.get("cashbon_no") == "") ? record.get("voucher_no") : record.get("cashbon_no"),
                    deleted: record.get("deleted")
                });
            }
        });


        storekasbondetailarr.forEach(function (rec) {
            var amountdetail = 0;
            var amountkasbon = rec.pay_amount;
            var cashbon_no = rec.cashbon_no;
            var t_amountdetail;
            var idexist = 0;
            storedetailarr.forEach(function (recb) {
                if (recb.kasbondept_id == rec.kasbondept_id) {
                    if (recb.dataflow == me.in_out) {
                        t_amountdetail = recb.amount * -1;
                    } else {
                        t_amountdetail = recb.amount;
                    }
                    amountdetail = amountdetail + t_amountdetail;
                    idexist = 1;
                }
            });
            if (idexist == 0) {
                errormsg = errormsg + cashbon_no + ' Tidak ada di Grid Voucher. <br>';
                error++;
            }
            if (amountkasbon != amountdetail) {
                errormsg = errormsg + 'Total pemakaian amount <br> - ' + cashbon_no
                    + ' tidak sama dengan amount pay : ' + accounting.formatMoney(amountkasbon) + '. <br>';
                error++;
            }
        });

        if (kasbondept_id_fixed == 0 || isNaN(kasbondept_id_fixed)) {
            storedetailarr.forEach(function (recb) {
                var idexist = 0;
                if (recb.cashbon_no !== "") {
                    storekasbondetailarr.forEach(function (rec) {
                        if (recb.kasbondept_id == rec.kasbondept_id) {
                            idexist = 1;
                        }
                    });
                    if (idexist == 0) {
                        errormsg = errormsg + recb.cashbon_no + ' Tidak ada di Grid Multi Kasbon. <br>';
                        error++;
                    }
                }
            });
        }

        // VALIDASI ATTACHMENT HARUS DIISI
        if ((project_id == 1 || me.global_param['approval_rules']['value'] == 'hod_approve') && counterattachmentdetail == 0) {
            flag_noattachment = true;
        }

        // VALIDASI LIST APPROVAL
        if (me.global_param['approval_rules']['value'] == 'hod_approve' && counterlistapproval == 0) {
            var filtered = me.global_param['hod_approve_dept_exclusion']['value'].filter(function (el) {
                return (el == department_id);
            });

            if (filtered.length == 0) {
                errormsg = errormsg + 'Tidak ada data di Grid Approval. Silahkan periksa kembali. <br>';
                error++;
            }
        }

        // VALIDASI GENERATE PAJAK
        storedetail.each(function (record, idx) {
            var checkppn = record.get('checkppn');
            var checkpph = record.get('checkpph');

            if (state == 'create') {
                if (me.flaggeneratepajak == 1 && (checkppn || checkpph)) {
                    errorpajak++;
                }
            } else {
                var coapajaks = me.global_param['coa_pajak']['value'];

                if ((checkppn || checkpph) && !coapajaks.includes(record.get('coa'))) {
                    errorpajak++;
                } else {
                    errorpajak = 0;
                }

                if (me.paramdetail.changeamount > 0) {
                    errorpajak++;
                }
            }
        });

        if (errorpajak > 0) {
            errormsg = errormsg + 'Silahkan generate pajak terlebih dahulu. <br>';
            error++;
        }

        if (error > 0) {
            me.buildWarningAlert(errormsg);
            return false;
        }

        if (is_upload == 1) {
            valuedata["cashier_note"] = 'upload';
        }

        valuedata['vendor_bank_account_no'] = '';
        if (typeof form.down("[name=vendor_bankacc_id]").valueModels[0] != 'undefined') {
            valuedata['vendor_bank_account_no'] = form.down("[name=vendor_bankacc_id]").valueModels[0].data.bank_account_no;
        }
        valuedata['project_id'] = project_id;

        valuedata['detail'] = [];
        storedetail.data.items.forEach(function (item, index) {
            valuedata['detail'].push(item.data);
        });

        for (var i = 0; i < valuedata['detail'].length; i++) {
            valuedata['detail'][i]['subdetail'] = [];
            for (var j = 0; j < me.localStore.substore.length; j++) {
                if (valuedata['detail'][i].indexdata == me.localStore.substore[j].indexdataheader) {
                    valuedata['detail'][i]['subdetail'].push(me.localStore.substore[j]);
                }
            }
        }

        valuedata['kasbondetail'] = [];
        storekasbondetail.data.items.forEach(function (item, index) {
            valuedata['kasbondetail'].push(item);
        });

        valuedata['attachmentdetail'] = [];
        storeattachmentdetail.data.items.forEach(function (item, index) {
            valuedata['attachmentdetail'].push(item);
        });

        valuedata['approvaldetail'] = [];
        storeapprovaldetail.data.items.forEach(function (item, index) {
            valuedata['approvaldetail'].push(item);
        });

        if (project_id == 1 || me.global_param['approval_rules']['value'] == 'hod_approve') {

            if (flag_noattachment && state == 'create') {

                Ext.Msg.show({
                    title: 'WARNING',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.WARNING,
                    msg: 'Apakah anda ingin menyertakan <i>attachment</i>?',
                    modal: true,
                    fn: function (btn) {
                        if (btn == 'yes') {
                            form.down("[name=voucherrequesttab]").setActiveTab(2);
                            return false;
                        } else {

                            var confirmBox = Ext.Msg.confirm({
                                title: 'Reason',
                                buttons: Ext.Msg.YESNO,
                                icon: Ext.Msg.INFO,
                                msg: 'Berikan Alasan<br><textarea type="text" id="reasonnoattachment" name="reasonnoattachment"></textarea>',
                                closable: true,
                                fn: function (btn) {
                                    if (btn == 'yes') {
                                        reasonnoattachment = $('#reasonnoattachment').val();

                                        if (reasonnoattachment != '') {
                                            valuedata['reasonnoattachment'] = reasonnoattachment
                                            me.processSave(storeheader, valuedata, state, form, formdata);
                                        } else {
                                            form.down("[name=voucherrequesttab]").setActiveTab(2);
                                            return false;
                                        }

                                    } else {
                                        form.down("[name=voucherrequesttab]").setActiveTab(2);
                                        return false;
                                    }
                                }
                            });

                            Ext.Function.defer(function () {
                                confirmBox.zIndexManager.bringToFront(confirmBox);
                            }, 100);
                        }
                    }
                });

            } else {
                me.processSave(storeheader, valuedata, state, form, formdata);
            }

        } else {
            me.processSave(storeheader, valuedata, state, form, formdata);
        }
    },

    processSave: function (storeheader, valuedata, state, form, formdata) {
        var me = this.getMe();
        if (formdata.isValid()) {
            resetTimer();
            if (me.statereal == 'create') {
                me.flaggeneratevoucherno = '1';
                me.generateVoucherno();

                if (!me.prefixdept) {
                    Ext.Msg.alert('Info', 'Voucher number not generated, please select your department again.');
                    return false;
                }

            }
            me.unformatCurrencyFormdata(me, form);
            switch (state) {
                case 'create':
                    storeheader.add(valuedata);
                    addingRecord = true;
                    valuedata['hideparam'] = state;
                    me.valueform = valuedata;
                    break;
                case 'update':
                    idProperty = storeheader.getProxy().getReader().getIdProperty();
                    rec = storeheader.getById(parseInt(formdata.findField(idProperty).getValue(), 10));
                    rec.beginEdit();
                    rec.set(valuedata);
                    rec.endEdit();
                    valuedata['hideparam'] = state;
                    me.valueform = valuedata;
                    break;
                default:
                    return;
            }

            Ext.Ajax.request({
                url: me.urldata + state,
                method: 'POST',
                params: {
                    data: Ext.encode(valuedata)
                },
                success: function (response) {
                    respone = Ext.JSON.decode(response.responseText);
                    console.log(response);
                }
            });

        }
    },

    browseReward: function (el, cb) {
        var me            = this.getMe(),
            view          = 'RewardGrid',
            browse        = new Cashier.library.BrowseCashierV2(),
            f             = me.getFormdata(),
            department_id = me.getVal(f, 'department_id', 'value');

        if (department_id == null || department_id == '' || department_id == 0) {
            me.tools.alert.warning("Pilih Departemen.");
            return 0;
        }

        browse.init({
            controller: me,
            view      : view,
            el        : el,
            projectpt : f.down("[name=pt_id]").valueModels[0].data.projectpt_id,
            project   : me.project_id,
            pt        : me.pt_id
        });
        browse.showWindow(function () {
            Ext.getCmp('reward_pt_id').setValue(parseInt(f.down("[name=pt_id]").valueModels[0].data.projectpt_id));
            Ext.getCmp('reward_pt_id').setReadOnly(true);
        }, function () {

        });
    },

    rewardSelect: function (el) {
        var me                      = this.getMe(),
            f                       = me.getFormdata(),
            grid                    = me.getRewardgrid(),
            griddetail              = me.getGriddetail(),
            storedetail             = griddetail.getStore(),
            row                     = grid.getSelectionModel().getSelection(),
            purchaseletterrewardids = '',
            description_header      = '',
            final_data              = [],
            reward_amount           = 0,
            code                    = [],
            over_target             = [],
            indexdata               = (storedetail.getCount() > 0 ? storedetail.getCount() : 1),
            project_id              = Ext.getCmp('reward_pt_id').valueModels[0].data.project_project_id,
            pt_id                   = Ext.getCmp('reward_pt_id').valueModels[0].data.pt_id,
            pattern                 = '',
            department_id           = f.down("[name=department_id]").getValue(),
            senddata                = [],
            amount_harus_cair       = 0;

        for (i = 0; i < row.length; i++) {
            purchaseletterrewardids += row[i].data.purchaseletter_reward_id + '~';
            code.push(row[i].data.code);
            over_target.push(row[i].data.is_over_target);
        }

        if (code.every(val => val === code[0]) == false) {
            me.tools.alert.warning("Hanya bisa pick untuk reward yang sama.");
            return 0;
        }

        if (over_target.every(val => val === over_target[0]) == false) {
            me.tools.alert.warning("Hanya bisa pick untuk reward yang memiliki over target yang sama.");
            return 0;
        }

        me.is_over_target = (over_target[0] == 1 ? 1 : 0);

        pattern = code[0] + '-reward';
        f.setLoading('Please Wait ...');
        Ext.Ajax.request({
            url: 'cashier/vdrequest/read',
            method: 'POST',
            async: false,
            timeout: 45000000,
            params: {
                project_id               : project_id,
                pt_id                    : pt_id,
                purchaseletter_reward_ids: purchaseletterrewardids,
                list_params              : pattern,
                hideparam                : 'breakdownreward'
            },
            success: function (response) {
                resjson = Ext.JSON.decode(response.responseText);
                if (resjson.success == 1) {
                    var tmp_data = resjson.data;
                    if (tmp_data.length > 0) {
                        var kasbondept_id                = [];
                        var purchaseletter_reward_id_arr = [];
                        var purchaseletter_reward_ids    = '';
                        var desc_header                  = '';
                        f.down('[name=purchaseletter_reward_ids]').setValue(purchaseletterrewardids);
                        f.down('button[action=openupload]').setDisabled(true);
                        f.down('[name=kasbondept_id]').setDisabled(true);
                        f.down('[name=is_pjk]').setValue('0')

                        for (var i = 0; i < tmp_data.length; i++) {
                            var record = tmp_data[i];
                            if (record.kasbondept_id > 0) {
                                kasbondept_id.push(record.kasbondept_id);
                            } else {
                                purchaseletter_reward_id_arr.push(record.purchaseletter_reward_id);
                            }
                        }

                        if (storedetail.getCount() > 0) {
                            storedetail.loadData([], false);
                        }

                        purchaseletter_reward_ids = purchaseletter_reward_id_arr.join('~');

                        // GENERATE DETAIL REWARD PAKE COA CONFIG 
                        Ext.Ajax.request({
                            url: 'cashier/vdrequest/read',
                            method: 'POST',
                            timeout: 45000000,
                            params: {
                                project_id               : project_id,
                                pt_id                    : pt_id,
                                purchaseletter_reward_ids: purchaseletter_reward_ids,
                                list_params              : pattern,
                                hideparam                : 'generatereward'
                            },
                            success: function (response) {
                                resjson = Ext.JSON.decode(response.responseText);
                                if (resjson.success == 1) {
                                    var tmp_data = resjson.data;

                                    var substoredata    = me.localStore.substore;
                                    var substoredatanew = [];
                                    substoredata.forEach(function (item, index) {
                                        if (typeof item.subcashierdesc === 'undefined') {
                                            substoredatanew.push(item);
                                        }
                                    });

                                    for (var i = 0; i < tmp_data.length; i++) {
                                        reward_amount      = parseFloat(tmp_data[i].amount_harus_cair);
                                        description_header = tmp_data[i].description_header;

                                        if (!tmp_data[i].remarks.includes('PPN') && !tmp_data[i].remarks.includes('PPH')) {
                                            desc_header += tmp_data[i].remarks + '\n';
                                        }

                                        var amount       = tmp_data[i].amount;
                                        var amountFormat = accounting.formatMoney(amount);

                                        var obj_data = {
                                            voucher_id           : 0,
                                            voucherdetail_id     : 0,
                                            coa_id               : tmp_data[i].coa_id,
                                            coa                  : tmp_data[i].coa,
                                            coaname              : tmp_data[i].coaname,
                                            kelsub_id            : tmp_data[i].kelsub_id,
                                            kelsub               : tmp_data[i].kelsub,
                                            kelsubdesc           : tmp_data[i].kelsub,
                                            subcashier_id        : 999,
                                            subcashierdesc       : 'reward',
                                            indexdata            : indexdata,
                                            dataflow             : tmp_data[i].dataflow,
                                            amount               : amountFormat,
                                            remarks              : tmp_data[i].remarks,
                                            deleted              : !1,
                                            hideparam            : 'default',
                                            statedata            : 'create',
                                            kasbondept_id        : 0,
                                            kasbondeptdetail_id  : 0,
                                            typetransdetail      : tmp_data[i].dataflow,
                                            setupcashflow_id     : 0,
                                            cashflowtype         : '',
                                            checkppn             : !1,
                                            checkpph             : !1,
                                            tipepajakdetailppn_id: 0,
                                            tipepajakdetailpph_id: 0,
                                            persentaseppn        : '',
                                            persentasepph        : '',
                                            balancecoa           : ''
                                        }

                                        final_data.push(obj_data);

                                        var row = {
                                            amount          : amountFormat,
                                            coa_id          : tmp_data[i].coa_id,
                                            code1           : '',
                                            code2           : '',
                                            code3           : '',
                                            code4           : '',
                                            deleted         : false,
                                            hideparam       : 'default',
                                            statedata       : 'create',
                                            indexdata       : 1,
                                            indexdataheader : indexdata,
                                            indexsubdata    : indexdata,
                                            kelsub_id       : tmp_data[i].kelsub_id,
                                            kelsub          : tmp_data[i].kelsub,
                                            remarks         : tmp_data[i].remarks,
                                            subcashierdesc  : 'reward',
                                            voucher_id      : 0,
                                            voucherdetail_id: indexdata
                                        }
                                        substoredatanew.push(row);
                                        indexdata = indexdata + 1;
                                    }

                                    me.localStore.substore = substoredatanew;

                                    storedetail.add(final_data);
                                    storedetail.commitChanges();
                                    storedetail.filter('deleted', false);
                                    me.setSumdetailSimple();
                                    griddetail.getView().refresh();
                                    griddetail.down('#btnGenerate').setDisabled(true);
                                    f.down("[name=is_reward]").setValue('1');
                                    f.down("[name=description]").setValue(desc_header);
                                    f.setLoading(false);
                                    me.setDatadetailAftersave();

                                    // GENERATE DETAIL REWARD BUAT YANG PAKE KASBON
                                    if (kasbondept_id.length > 0) {
                                        setTimeout(function () {
                                            var rowdatakasbon = [];
                                            for (var j = 0; j < kasbondept_id.length; j++) {
                                                Ext.Ajax.request({
                                                    url: 'cashier/kasbondept/read',
                                                    method: 'POST',
                                                    async: false,
                                                    timeout: 45000000,
                                                    params: {
                                                        project_id    : project_id,
                                                        pt_id         : pt_id,
                                                        department_id : department_id,
                                                        kasbondept_id : kasbondept_id[j],
                                                        ckasbondept_id: kasbondept_id[j],
                                                        hideparam     : 'getdataapplyposting'
                                                    },
                                                    success: function (responseKasbondept) {
                                                        resjsonkasbondept = Ext.JSON.decode(responseKasbondept.responseText);
                                                        if (resjsonkasbondept.success) {
                                                            rowdatakasbon.push(resjsonkasbondept.data[0]);
                                                        }
                                                    }
                                                });
                                            }
                                            me.generateRewardByCashbon(rowdatakasbon);
                                        }, 1000);
                                    } else {
                                        me.getStore('VDRequestkasbondetail').loadData([], false);
                                    }
                                } else {
                                    me.buildFailedAlert(resjson.msg);
                                    return false;
                                }
                            }
                        });



                    }
                } else {
                    f.setLoading(false);
                    me.buildFailedAlert(resjson.msg);
                    return false;
                }
            }
        });

        el.up('window').destroy();
    },

    generateRewardByCashbon: function name(rowdata) {
        var me                       = this.getMe(),
            form                     = me.getFormdata(),
            storedetail              = me.getStore('VDRequestdetail'),
            storesubdetail           = me.getStore('VDRequestsubdetail'),
            storekasbondetail        = me.getStore('VDRequestkasbondetail'),
            storekasbondeptposting   = me.getStore('Kasbondeptpostingdetail'),
            storekasbondeptsubdetail = me.getStore('Kasbondeptpostingsubdetail'),
            storecb                  = me.getStore('Kasbondeptcomboapplylocal'),
            griddetail               = me.getGriddetail(),
            gridkasbondetail         = me.getGridkasbondetail(),
            kasbondeptdetail_id      = 0,
            indexdata                = (storedetail.getCount() > 0 ? storedetail.getCount() + 1 : 1),
            datakasbondept           = [],
            datadetail               = [],
            datasubdetail            = [],
            kasbondeptdetailidx      = [],
            desc_header              = (form.down("[name=description]").getValue() == "" ? "" : form.down("[name=description]").getValue());

        form.setLoading('Please Wait ...');
        // SET IS PJK JADI CHECK
        form.down('[name=is_pjk]').setValue(1);

        // DISABLE BUTTON DI GRID
        gridkasbondetail.down('[action=create]').setDisabled(true);
        gridkasbondetail.down('[action=destroy]').setDisabled(true);
        gridkasbondetail.on('beforeedit', function (editor, e) {
            gridkasbondetail.getPlugin('rowEditing').editor.form.findField('pay_amount').disable();
        });

        // DELETE ROW AWAL KASBON DETAIL 
        storekasbondetail.loadData([], false);

        // BAGIAN ADD KE GRID KASBONDETAIL
        for (var i = 0; i < rowdata.length; i++) {
            var t_datakasbondept = {
                hideparam       : 'create',
                statedata       : 'create',
                kasbondept_id   : rowdata[i].kasbondept_id,
                kasbon_date     : rowdata[i].voucher_date_f,
                cashbon_no      : rowdata[i].voucher_no,
                voucher_no      : rowdata[i].voucher_no,
                remarks         : rowdata[i].description,
                amount          : rowdata[i].amount,
                remaining_amount: rowdata[i].remainingkasbon,
                remainingkasbon : rowdata[i].remainingkasbon,
                pay_amount      : rowdata[i].remainingkasbon,
                final_amount    : 0,
                deleted         : false,
                is_multi_kasbon : false,
                made_by_name    : rowdata[i].made_by_name
            };
            datakasbondept.push(t_datakasbondept);
        }
        storekasbondetail.add(datakasbondept);
        storekasbondetail.commitChanges();
        me.cashbonLoadStore();

        for (var j = 0; j < rowdata.length; j++) {
            var storedetail = me.getStore('VDRequestdetail'),
                storekasbondeptposting = me.getStore('Kasbondeptpostingdetail');

            storekasbondeptposting.load({
                params: {
                    "hideparam"    : 'default',
                    "kasbondept_id": rowdata[j].kasbondept_id
                },
                callback: function (records, operation, success) {
                    me.localStore.substore = [];

                    if (storekasbondeptposting.getCount() > 0) {
                        me.paramdetail.kasbondept_id = [];
                        storekasbondeptposting.each(function (record, index) {
                            var rec_detail = record['data'];
                            var raw_detail = record['raw'];

                            if (!rec_detail.description.includes('PPN') && !rec_detail.description.includes('PPH')) {
                                desc_header += rec_detail.description + '\n';
                            }

                            datadetail = record['data'];

                            datadetail['statedata']       = 'create';
                            datadetail[me.idheaderfield]  = me.idheadervalue;
                            datadetail[me.idheaderfield2] = me.idheadervalue2;
                            datadetail['indexdata']       = indexdata;
                            datadetail['indexdataheader'] = indexdata;
                            kasbondeptdetail_id           = datadetail['kasbondeptdetail_id'];
                            me.paramdetail.kasbondept_id.push(datadetail['kasbondeptdetail_id']);
                            kasbondeptdetailidx[kasbondeptdetail_id] = indexdata;

                            datadetail['indexsubdata']    = datadetail['indexdata'];
                            datadetail['kasbondept_id']   = raw_detail.kasbondept_id;
                            datadetail['cashbon_no']      = raw_detail.voucher_no + ' (' + raw_detail.made_by_name + ')';
                            datadetail['voucher_no']      = raw_detail.voucher_no;
                            datadetail['typetransdetail'] = rec_detail.dataflow;
                            datadetail['remarks']         = datadetail['description'];

                            storedetail.add(datadetail);
                            storedetail.commitChanges();
                            storedetail.filter('deleted', false);

                            if (raw_detail.remainingkasbon > 0) {
                                sumamount = raw_detail.remainingkasbon;
                            } else {
                                sumamount = raw_detail.amount;
                            }

                            me.paramdetail.totaldetail = sumamount;
                            me.valuekasbon             = sumamount;
                            me.initamount              = sumamount;
                            form.down("[name=valuekasbon]").setValue(sumamount);

                            me.setSumdetail();
                            if (parseInt(rec_detail.kelsub_id) > 0) {
                                var storesubdetail           = me.getStore('VDRequestsubdetail'),
                                    storekasbondeptsubdetail = me.getStore('Kasbondeptpostingsubdetail');

                                storekasbondeptsubdetail.load({
                                    params: {
                                        "hideparam"          : 'default',
                                        "kasbondept_id"      : rec_detail.kasbondept_id,
                                        "kasbondeptdetail_id": rec_detail.kasbondeptdetail_id,
                                        "limit"              : 1000
                                    },
                                    callback: function (record, operation, success) {
                                        if (storekasbondeptsubdetail.getCount() > 0) {
                                            var i = 0;
                                            storekasbondeptsubdetail.each(function (recordsub, indexsub) {
                                                i = i + 1;

                                                datasubdetail                = recordsub['data'];
                                                datasubdetail['statedata']   = 'create';
                                                datadetail[me.idheaderfield] = me.idheadervalue;
                                                datasub[me.iddetailfield]    = data['indexdata'];
                                                datasub['indexsubdata']      = kasbondeptdetailidx[parseInt(datasub['kasbondeptdetail_id'])];
                                                datasub['indexdataheader']   = kasbondeptdetailidx[parseInt(datasub['kasbondeptdetail_id'])];
                                                datasub['indexdata']         = i;
                                                datasub['kasbondept_id']     = rec_detail.kasbondept_id;
                                                me.paramsubdetail.kasbondeptsubdetail_id.push(datasub['kasbondeptsubdetail_id']);

                                                me.localStore.substore.push(datasub);
                                                storesubdetail.add(datasub);
                                                storesubdetail.commitChanges();
                                            });
                                        }
                                    }
                                });
                            }
                            indexdata++;
                        });
                        form.down("[name=description]").setValue(desc_header);
                        form.setLoading(false);
                        me.setDatadetailAftersave();
                    }
                }
            });
        }
    },

    getNoFaktur: function () {
        var me         = this.getMe(),
            project_id = me.project_id,
            pt_id      = me.pt_id;

        Ext.Ajax.request({
            url: 'cashier/vdrequest/read',
            params: {
                'hideparam': 'getnofaktur',
                'project_id': project_id,
                'pt_id': pt_id,
            },
            success: function (response) {
                var data = Ext.JSON.decode(response.responseText);
                if (data.success) {
                    me.no_faktur = data.data;
                } else {
                    me.no_faktur = 0;
                }
            }
        });
    },

    UploadDetailVoucher: function () {
        var me              = this.getMe(),
            griddetail      = me.getGriddetail(),
            storedetail     = griddetail.getStore(),
            gridsubdetail   = me.getGridsubdetail(),
            form            = me.getFormdataupload(),
            fh              = me.getFormdata(),
            fh_company      = fh.down("[name=pt_id]"),
            is_deletedetail = form.down("[name=is_deletedetail]").getValue();

        form.down("[name=u_project_id]").setValue(fh_company.valueModels[0].data.project_id);
        form.down("[name=u_pt_id]").setValue(fh_company.getValue());
        form.down("[name=hideparam]").setValue("upload");

        if (true) {
            form.submit({
                url: 'cashier/vdrequest/detailupload',
                waitMsg: 'Processing data...',
                success: function (fp, o) {
                    var dt  = o.result.data;
                    var dts = o.result.datasub;
                    if (is_deletedetail) {
                        storedetail.loadData([], false);
                    }
                    storedetail.add(dt[0]);
                    me.localStore.substore = dts[0];
                    me.setSumdetailSimple();
                    me.setDatadetailAftersave();
                    form.up('window').close();
                },
                failure: function (fp, o) {
                    if (o.result.data.msg) {
                        Ext.Msg.alert('Warning', o.result.data.msg);
                    } else {
                        Ext.Msg.alert('Warning', 'Processing failed !');
                    }
                }
            });
        }
    },

    checkbudgetcf: function (setupcashflow_id, amount) {
        var me           = this,
            fd           = me.getFormdata(),
            project_id   = fd.down("[name=project_id]").getValue(),
            pt_id        = fd.down("[name=pt_id]").getValue(),
            kasbank_date = fd.down("[name=voucher_date]").getValue(),
            result       = [];

        Ext.Ajax.request({
            url: 'cashier/voucher/read',
            method: 'POST',
            async: false,
            params: {
                project_id      : project_id,
                pt_id           : pt_id,
                setupcashflow_id: setupcashflow_id,
                amount          : amount,
                kasbank_date    : kasbank_date,
                mode_read       : 'checkbudgetcf'
            },
            success: function (response) {
                var data = Ext.JSON.decode(response.responseText);
                result = data.data;
            },
            failure: function (response) {

            }
        });

        return result;
    },

    processAfterCopyVoucher: function (record) {
        // console.log(record);return;
        var me             = this.getMe(),
            project_id     = record[3][0].project_id,
            pt_id          = record[3][0].pt_id,
            voucher_id     = record.idbefore,
            new_voucher_id = record.idheader,
            description    = record[3][0].cashier_note,
            user_id        = record[3][0].addby,
            path           = '',
            filename       = '';
            
        Ext.Ajax.request({
            url   : 'cashier/vdrequest/read',
            params: {
                'hideparam': 'getAttachmentByVoucherId',
                'voucher_id': voucher_id,
            },
            success: function (response) {
                var data = Ext.JSON.decode(response.responseText);

                if (data.data) {
                    for (var a = 0; a < data.data.length; a++) {
                        path     = data.data[a].path;
                        filename = data.data[a].filename;
                        
                        Ext.Ajax.request({
                            async  : true,
                            url    : 'cashier/common/read',
                            method : 'POST',
                            timeout: 45000000,
                            params : {
                                hideparam: 'getattachmentfile',
                                path     : path
                            },
                            success : function (response2) {
                                resjson = Ext.JSON.decode(response2.responseText);
                                resjson.data['hideparam']  = 'copyatt';
                                resjson.data['project_id'] = project_id;
                                resjson.data['pt_id']      = pt_id;
                                resjson.data['voucher_id'] = voucher_id;

                                Ext.Ajax.request({
                                    url   : 'cashier/vdrequest/create',
                                    method: 'POST',
                                    params: {
                                        data : Ext.encode(resjson.data)
                                    },
                                    success: function (response3) {
                                        resjson2 = Ext.JSON.decode(response3.responseText);

                                        var result_attachment = resjson2.data;

                                        delete result_attachment.addon;
                                        delete result_attachment.error;
                                        delete result_attachment.message;
                                        delete result_attachment.status;
                                        
                                        result_attachment['hideparam']     = 'detailattachmentcreate';
                                        result_attachment['project_id']    = project_id;
                                        result_attachment['pt_id']         = pt_id;
                                        result_attachment['voucher_id']    = new_voucher_id;
                                        result_attachment['description']   = description;
                                        result_attachment['user_id']       = user_id;
                                        result_attachment['is_additional'] = 0;

                                        Ext.Ajax.request({
                                            url   : 'cashier/vdrequest/detailcreate',
                                            method: 'POST',
                                            async : false,
                                            params: {
                                                data : Ext.encode(result_attachment)
                                            },
                                            success : function (response4) {
                                                resjson3 = Ext.JSON.decode(response4.responseText);
                                                console.log(resjson3);
                                            }
                                        });
                                    }
                                });
                                
                            }
                        });
                    }
                }
            }
        });
    }

});