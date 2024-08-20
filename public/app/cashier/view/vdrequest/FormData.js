Ext.define('Cashier.view.vdrequest.FormData', {
    extend        : 'Cashier.library.template.view.FormData',
    alias         : 'widget.vdrequestformdata',
    frame         : true,
    autoScroll    : true,
    anchorSize    : 100,
    height        : 650,
    bodyBorder    : true,
    bodyPadding   : 10,
    uniquename    : '_voucherrequest',
    bindPrefixName: 'VDRequest',
    bodyStyle     : 'border-top:none;border-left:none;border-right:none;',
    initComponent : function () {
        var me          = this;
        var fileexample = 'contohformatimportdata/module cashier/contoh_csv_upload_voucher_dept.csv';
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' ',
                labelClsExtra : 'small',
                fieldStyle    : 'margin-bottom:3px;',
                anchor        : '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name : 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    id   : 'voucher_id' + me.uniquename,
                    name : 'voucher_id',
                },
                {
                    xtype: 'hiddenfield',
                    id   : 'kasbank_id' + me.uniquename,
                    name : 'kasbank_id',
                },
                {
                    xtype: 'hiddenfield',
                    id   : 'vendorcode' + me.uniquename,
                    name : 'vendorcode',
                },
                {
                    xtype: 'hiddenfield',
                    id   : 'status' + me.uniquename,
                    name : 'status',
                },
                {
                    xtype: 'hiddenfield',
                    id   : 'prefixdept' + me.uniquename,
                    name : 'prefixdept',
                },
                {
                    xtype: 'hiddenfield',
                    id   : 'approvename' + me.uniquename,
                    name : 'approvename',
                },
                {
                    xtype: 'hiddenfield',
                    id   : 'projectname' + me.uniquename,
                    name : 'projectname',
                },
                {
                    xtype: 'hiddenfield',
                    id   : 'project_id' + me.uniquename,
                    name : 'project_id',
                },
                {
                    xtype: 'hiddenfield',
                    id   : 'ptname',
                    name : 'ptname',
                },
                {
                    xtype: 'hiddenfield',
                    id   : 'input_noteofvendor',
                    name : 'input_noteofvendor',
                },
                {
                    xtype: 'hiddenfield',
                    id   : 'komisiklaim_ids',
                    name : 'komisiklaim_ids',
                },
                {
                    xtype: 'hiddenfield',
                    id   : 'purchaseletter_reward_ids',
                    name : 'purchaseletter_reward_ids',
                },
                {
                    xtype: 'hiddenfield',
                    id   : 'komisiklaim_amount',
                    name : 'komisiklaim_amount',
                },
                {
                    xtype: 'hiddenfield',
                    id   : 'reward_amount',
                    name : 'reward_amount',
                },
                {
                    xtype: 'hiddenfield',
                    id   : 'is_upload',
                    name : 'is_upload',
                    value: 0
                },
                {
                    xtype: 'hiddenfield',
                    id   : 'kasbondept_id_fixed',
                    name : 'kasbondept_id_fixed',
                    value: 0
                },
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    align     : 'right',
                    bodyBorder: false,
                    defaults  : {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'splitter',
                            width: 430,
                        },
                        {
                            xtype  : 'button',
                            text   : 'From Upload',
                            action : 'openupload',
                            itemId : 'btnUploadCsv',
                            iconCls: 'icon-excel',
                            padding: 5,
                            width  : 100
                        },
                        {
                            xtype  : 'button',
                            text   : 'Upload Detail',
                            action : 'openupload2',
                            itemId : 'btnUploadCsv2',
                            iconCls: 'icon-excel',
                            padding: 5,
                            width  : 100,
                            hidden : true
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype  : 'button',
                            width  : 150,
                            padding: 5,
                            text   : 'Voucher from EREMS',
                            iconCls: 'icon-search',
                            menu   : [
                                {
                                    xtype     : 'button',
                                    action    : 'create_komisi',
                                    bindAction: me.bindPrefixName + 'Komisi',
                                    itemId    : 'btnKomisi',
                                    name      : 'btn_komisi',
                                    width     : 120,
                                    padding   : 5,
                                    text      : 'Voucher Komisi',
                                    margin    : '5 5 5 5',
                                },
                                {
                                    xtype     : 'button',
                                    action    : 'create_reward',
                                    bindAction: me.bindPrefixName + 'Reward',
                                    itemId    : 'btnReward',
                                    name      : 'btn_reward',
                                    width     : 120,
                                    padding   : 5,
                                    text      : 'Voucher Reward',
                                    margin    : '5 5 5 5',
                                },
                            ]
                        }
                    ]
                },        
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    align     : 'right',
                    bodyBorder: false,
                    defaults  : {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype           : 'ptusercombobox',
                            fieldLabel      : 'Pt/Company',
                            itemId          : 'fd_pt_id' + me.uniquename,
                            id              : 'pt_id_b123',
                            name            : 'pt_id',
                            width           : 350,
                            emptyText       : 'Pt / Company',
                            readOnly        : false,
                            allowBlank      : false,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            rowdata         : null
                        },
                        {
                            xtype: 'splitter',
                            width: '80'
                        },
                        {
                            xtype           : 'label',
                            forId           : 'lblstatus' + me.uniquename,
                            text            : 'Status',
                            width           : 100,
                            allowBlank      : false,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            rowdata         : null
                        },
                        {
                            xtype: 'label',
                            forId: 'lblstatus',
                            text : '',
                            style: {
                                color: '#ff0000'
                            },
                            itemId          : 'fd_lblstatus' + me.uniquename,
                            id              : 'lblstatus__b123',
                            name            : 'lblstatus',
                            width           : 350,
                            allowBlank      : false,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            rowdata         : null
                        },
                    ]
                },
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    align     : 'right',
                    bodyBorder: false,
                    defaults  : {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype           : 'departmentcombobox',
                            fieldLabel      : 'Department',
                            itemId          : 'fd_department_id' + me.uniquename,
                            id              : 'department_id' + me.uniquename,
                            name            : 'department_id',
                            width           : 350,
                            emptyText       : 'Department',
                            readOnly        : false,
                            allowBlank      : false,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            rowdata         : null
                        },
                        {
                            xtype: 'splitter',
                            width: '80'
                        },
                        {
                            xtype           : 'datefield',
                            fieldLabel      : 'Reg Date',
                            itemId          : 'fd_voucher_date' + me.uniquename,
                            id              : 'voucher_date' + me.uniquename,
                            name            : 'voucher_date',
                            format          : 'd-m-Y',
                            submitFormat    : 'Y-m-d',
                            width           : 350,
                            emptyText       : 'Manual Input',
                            allowBlank      : false,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            rowdata         : null
                        },
                    ]
                },
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    align     : 'right',
                    id        : 'row_approval_formdata',
                    bodyBorder: false,
                    defaults  : {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype           : 'employeehrdcombobox',
                            fieldLabel      : 'Approve By',
                            itemId          : 'fd_approveby_id' + me.uniquename,
                            id              : 'approveby_id' + me.uniquename,
                            name            : 'approveby_id',
                            width           : 350,
                            emptyText       : 'Approve By',
                            readOnly        : false,
                            allowBlank      : true,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            forceSelection  : true,
                            rowdata         : null
                        },
                        {
                            xtype: 'splitter',
                            width: '80'
                        },
                        {
                            xtype           : 'employeehrdcombobox',
                            fieldLabel      : 'Approve Tax By',
                            itemId          : 'fd_approvetaxby_id' + me.uniquename,
                            id              : 'approvetaxby_id' + me.uniquename,
                            name            : 'approvetaxby_id',
                            width           : 350,
                            emptyText       : 'Approve Tax By',
                            readOnly        : false,
                            allowBlank      : true,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            forceSelection  : true,
                            rowdata         : null
                        },
                        {
                            xtype: 'splitter',
                            width: '80'
                        },
                        {
                            xtype           : 'textfield',
                            fieldLabel      : 'Reg No.',
                            itemId          : 'fd_voucher_no' + me.uniquename,
                            id              : 'voucher_no' + me.uniquename,
                            name            : 'voucher_no',
                            emptyText       : 'Auto Value',
                            hidden          : true,
                            width           : 350,
                            readOnly        : true,
                            allowBlank      : false,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            rowdata         : null
                        },
                    ]
                },
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    align     : 'right',
                    bodyBorder: false,
                    defaults  : {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype           : 'projectptcombobox',
                            name            : 'cashbon_pt_id',
                            fieldLabel      : 'From Project',
                            displayField    : 'ptname',
                            valueField      : 'projectpt_id',
                            width           : 350,
                            allowBlank      : false,
                            readOnly        : false,
                            enforceMaxLength: true,
                        },
                        {
                            xtype: 'splitter',
                            width: '80'
                        },
                        {
                            xtype           : 'datefield',
                            fieldLabel      : 'Due Date',
                            itemId          : 'fd_due_date' + me.uniquename,
                            id              : 'due_date' + me.uniquename,
                            name            : 'due_date',
                            format          : 'd-m-Y',
                            submitFormat    : 'Y-m-d',
                            width           : 350,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            rowdata         : null,
                            allowBlank      : false,
                        },
                    ]
                },
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    align     : 'right',
                    bodyBorder: false,
                    defaults  : {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype      : 'fieldcontainer',
                            fieldLabel : 'Data flow',
                            defaultType: 'radiofield',
                            defaults   : {
                                flex: 1
                            },
                            layout: 'hbox',
                            items : [
                                {
                                    boxLabel  : 'IN TRANS',
                                    name      : 'dataflow',
                                    inputValue: 'I',
                                    id        : 'radio1_b123',
                                    allowBlank: false,
                                    checked   : false,
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    boxLabel  : 'OUT TRANS',
                                    name      : 'dataflow',
                                    inputValue: 'O',
                                    id        : 'radio2_b123',
                                    allowBlank: false,
                                    checked   : true,
                                }
                            ]
                        },
                        {
                            xtype: 'splitter',
                            width: '150'
                        },
                        {
                            xtype           : 'purchaselettercombobox',
                            fieldLabel      : 'PL No.',
                            itemId          : 'fd_purchaseletter_id' + me.uniquename,
                            id              : 'purchaseletter_id' + me.uniquename,
                            name            : 'purchaseletter_id',
                            anchor          : '50%',
                            width           : 350,
                            emptyText       : 'Cari Purchaseletter',
                            allowBlank      : true,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            rowdata         : null,
                            queryMode       : 'remote',
                            minChars        : 2,
                            forceSelection  : true,
                            typeAhead       : false
                        }
                    ]
                },
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    align     : 'right',
                    bodyBorder: false,
                    defaults  : {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype           : 'tipevendorvouchercombobox',
                            fieldLabel      : 'Type',
                            itemId          : 'fd_type_vendor' + me.uniquename,
                            id              : 'type_vendor' + me.uniquename,
                            name            : 'type_vendor',
                            width           : 350,
                            emptyText       : 'Select Type Data Vendor',
                            readOnly        : false,
                            allowBlank      : false,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            rowdata         : null,
                            forceSelection  : true,
                            typeAhead       : false
                        },
                        {
                            xtype: 'splitter',
                            width: '80'
                        },
                        {
                            xtype     : 'fieldcontainer',
                            layout    : 'hbox',
                            align     : 'right',
                            bodyBorder: false,
                            defaults  : {
                                layout: 'fit'
                            },
                            items: [
                                {
                                    xtype         : 'combobox',
                                    itemId        : 'fd_jenis_spkorsop_id'+me.uniquename,
                                    id            : 'fd_jenis_spkorsop_id'+me.uniquename,
                                    name          : 'jenis_spkorsop_id',
                                    fieldLabel    : '',
                                    allowBlank    : false,
                                    forceSelection: true,
                                    emptyText     : '',
                                    queryMode     : 'local',
                                    displayField  : 'description',
                                    valueField    : 'status',
                                    width         : 80,
                                    store         : new Ext.data.JsonStore({
                                        fields: ['status', 'description'],
                                        data  : [
                                            {status: 1, description: 'SPK'},
                                            {status: 2, description: 'SOP'},
                                        ]
                                    }),
                                },
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                {
                                    xtype           : 'textfield',
                                    fieldLabel      : '',
                                    itemId          : 'fd_spk' + me.uniquename,
                                    id              : 'spk' + me.uniquename,
                                    name            : 'spk',
                                    anchor          : '50%',
                                    width           : 250,
                                    allowBlank      : true,
                                    enforceMaxLength: true,
                                    enableKeyEvents : true,
                                    rowdata         : null,
                                    minChars        : 2,
                                    forceSelection  : true,
                                    typeAhead       : false,
                                },
                            ]
                        },
                    ]
                },
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    align     : 'right',
                    bodyBorder: false,
                    defaults  : {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype           : 'paymentmethodcombobox',
                            fieldLabel      : 'Payment Type',
                            name            : 'paymentmethod_id',
                            width           : 350,
                            emptyText       : 'Select Payment Type',
                            readOnly        : false,
                            allowBlank      : false,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            rowdata         : null,
                            forceSelection  : true,
                            typeAhead       : false,
                            value           : 7
                        }
                    ]
                },
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    align     : 'right',
                    name      : 'container_vendor',
                    bodyBorder: false,
                    defaults  : {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype           : 'vendorcombobox',
                            fieldLabel      : 'Vendor/Partner',
                            itemId          : 'fd_vendor_id' + me.uniquename,
                            id              : 'vendor_id' + me.uniquename,
                            name            : 'vendor_id',
                            width           : 350,
                            emptyText       : 'Ketik / Cari Vendor/Partner...',
                            allowBlank      : true,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            queryMode       : 'remote',
                            minChars        : 1,
                            rowdata         : null,
                                      // forceSelection: true,
                            typeAhead  : true,
                            hideTrigger: true,
                            listeners  : {
                                keyup: function (field) {
                                    var c            = 0;
                                    var searchString = field.getValue();
                                    if(searchString == null){
                                        return false;
                                    }
                                    if (searchString.length > 0) {

                                        this.store.filterBy(function (record, id) {
                                            if (record.get('vendorname').toLowerCase().indexOf(field.getValue()) > -1) {
                                                return true;
                                                this.store.clearFilter(true);
                                            } else if (record.get('vendorcode').toLowerCase().indexOf(field.getValue()) > -1) {
                                                return true;
                                                this.store.clearFilter(true);
                                            } else if (record.get('address').toLowerCase().indexOf(field.getValue()) > -1) {
                                                return true;
                                                this.store.clearFilter(true);
                                            } else {
                                                return false;
                                                this.store.clearFilter(true);
                                            }
                                        });
                                    }

                                },
                                buffer: 300,
                            },
                        },
                        {
                            xtype  : 'button',
                            action : 'create_vendor',
                            itemId : 'btnCreateVendor',
                            id     : 'btnCreateVendor',
                            width  : 25,
                            iconCls: 'icon-add',
                            text   : '',
                            tooltip: 'Buat baru Vendor/Partner'
                        },
                    ]
                },
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    align     : 'right',
                    name      : 'container_customer',
                    bodyBorder: false,
                    defaults  : {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype           : 'customercombobox',
                            fieldLabel      : 'Customer',
                            itemId          : 'fd_customer_id' + me.uniquename,
                            id              : 'customer_id' + me.uniquename,
                            name            : 'customer_id',
                            width           : 350,
                            emptyText       : 'Ketik / Cari Customer...',
                            allowBlank      : true,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            queryMode       : 'remote',
                            minChars        : 1,
                            rowdata         : null,
                            forceSelection  : true,
                            typeAhead       : true,
                            listeners       : {
                                keyup: function (field) {
                                    var c            = 0;
                                    var searchString = field.getValue();
                                    if (searchString.length > 0) {

                                        this.store.filterBy(function (record, id) {
                                            if (record.get('customername').toLowerCase().indexOf(field.getValue()) > -1) {
                                                return true;
                                                this.store.clearFilter(true);
                                            } else if (record.get('customercode').toLowerCase().indexOf(field.getValue()) > -1) {
                                                return true;
                                                this.store.clearFilter(true);
                                            } else if (record.get('address').toLowerCase().indexOf(field.getValue()) > -1) {
                                                return true;
                                                this.store.clearFilter(true);
                                            } else {
                                                return false;
                                                this.store.clearFilter(true);
                                            }
                                        });
                                    }

                                },
                                buffer: 300,
                            },
                        }
                    ]
                },
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    align     : 'right',
                    bodyBorder: false,
                    name      : 'container_notevendor',
                    defaults  : {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype           : 'vendornotecombobox',
                            fieldLabel      : 'Note',
                            itemId          : 'fd_vendor_note' + me.uniquename,
                            id              : 'vendor_note' + me.uniquename,
                            name            : 'vendor_note',
                            anchor          : '50%',
                            width           : 350,
                            emptyText       : 'Select Vendor/Partner Note',
                            readOnly        : false,
                            allowBlank      : true,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            forceSelection  : true,
                            rowdata         : null,
                            listeners       : {
                                 render: function(c) {
                                  Ext.QuickTips.register({
                                    target    : c.getEl(),
                                    text      : 'Jika Vendor note tidak muncul pada pilihan, maka harap <b>Create Note Vendor/Partner</b>',
                                    enabled   : true,
                                    showDelay : 20,
                                    trackMouse: true,
                                    autoShow  : true
                                  });
                                }
                            } 
                        },
                        {
                            xtype: 'hiddenfield',
                            id   : 'vendornote_id' + me.uniquename,
                            name : 'vendornote_id',
                        },
                        {
                            xtype    : 'button',
                            action   : 'create_note_vendor',
                            itemId   : 'btnCreateNoteVendor',
                            width    : 25,
                            iconCls  : 'icon-add',
                            text     : '',
                            listeners: {
                                 render: function(c) {
                                  Ext.QuickTips.register({
                                    target    : c.getEl(),
                                    text      : 'Buat baru Note Vendor/Partner',
                                    enabled   : true,
                                    showDelay : 20,
                                    trackMouse: true,
                                    autoShow  : true
                                  });
                                }
                            } 
                        },
                        {
                            xtype    : 'button',
                            action   : 'clear_note_vendor',
                            text     : '',
                            iconCls  : 'icon-delete',
                            width    : 25,
                            listeners: {
                                render: function(c) {
                                    Ext.QuickTips.register({
                                        target    : c.getEl(),
                                        text      : 'Hapus Data Note Vendor',
                                        enabled   : true,
                                        showDelay : 20,
                                        trackMouse: true,
                                        autoShow  : true
                                    });
                                }
                            }
                        },
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    layout: 'hbox',
                    name  : 'vendor_bankacc_id_container1',
                    items : [
                        {
                            xtype : 'fieldcontainer',
                            layout: 'hbox',
                            items : [
                                {
                                    xtype     : 'vendoraccnocombobox',
                                    name      : 'vendor_bankacc_id',
                                    fieldLabel: 'Bank Acc. No.',
                                    width     : 350,
                                    displayTpl: Ext.create('Ext.XTemplate',
                                        '<tpl for=".">',
                                            '{bank_account_no}',
                                        '</tpl>'
                                    ),
                                },
                                {
                                    xtype    : 'button',
                                    action   : 'create_bankacc',
                                    text     : '',
                                    iconCls  : 'icon-add',
                                    width    : 25,
                                    listeners: {
                                        render: function(c) {
                                            Ext.QuickTips.register({
                                                target    : c.getEl(),
                                                text      : 'Buat baru Data Rekening Vendor',
                                                enabled   : true,
                                                showDelay : 20,
                                                trackMouse: true,
                                                autoShow  : true
                                            });
                                        }
                                    }
                                },
                                {
                                    xtype    : 'button',
                                    action   : 'clear_bankacc',
                                    text     : '',
                                    iconCls  : 'icon-delete',
                                    width    : 25,
                                    listeners: {
                                        render: function(c) {
                                            Ext.QuickTips.register({
                                                target    : c.getEl(),
                                                text      : 'Hapus Data Rekening Vendor',
                                                enabled   : true,
                                                showDelay : 20,
                                                trackMouse: true,
                                                autoShow  : true
                                            });
                                        }
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'splitter',
                            width: '25'
                        },
                        {
                            xtype     : 'textfield',
                            readOnly  : true,
                            width     : 350,
                            name      : 'vendor_bank_name',
                            fieldLabel: 'Bank Name'
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    layout: 'hbox',
                    name  : 'vendor_bankacc_id_container2',
                    items : [
                        {
                            xtype : 'fieldcontainer',
                            layout: 'vbox',
                            items : [
                                {
                                    xtype     : 'textfield',
                                    readOnly  : true,
                                    fieldLabel: 'Bank Acc. Name',
                                    name      : 'vendor_bank_account_name',
                                    width     : 350
                                },
                                {
                                    xtype     : 'textareafield',
                                    readOnly  : true,
                                    fieldLabel: 'Bank Acc. Notes',
                                    name      : 'remarks',
                                    width     : 350
                                },
                            ]
                        },
                        {
                            xtype: 'splitter',
                            width: '80'
                        },
                        {
                            xtype     : 'textfield',
                            readOnly  : true,
                            name      : 'vendor_bank_currency',
                            fieldLabel: 'Account Currency',
                            width     : 350
                        }
                    ]
                },
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    align     : 'right',
                    bodyBorder: false,
                    defaults  : {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype            : 'xmoneyfield',
                            minValue         : 0,
                            itemId           : 'fs_amount' + me.uniquename,
                            name             : 'amount',
                            id               : 'amount' + me.uniquename,
                            fieldLabel       : 'Amount',
                            emptyText        : 'Manual Input',
                            width            : 350,
                            hideTrigger      : true,
                            keyNavEnabled    : false,
                            mouseWheelEnabled: false,
                            readOnly         : true,
                            allowBlank       : false,
                            enableKeyEvents  : true,
                            enforceMaxLength : true,
                            maxLength        : 30,
                            fieldStyle       : 'background-color:#eee;background-image: none;'
                        },
                        {
                            xtype: 'splitter',
                            width: '80'
                        },
                        {
                            xtype           : 'currencycombobox',
                            fieldLabel      : 'Currency',
                            itemId          : 'fd_currency_word' + me.uniquename,
                            id              : 'currency_word' + me.uniquename,
                            name            : 'currency_word',
                            anchor          : '50%',
                            width           : 350,
                            emptyText       : 'Select Currency',
                            readOnly        : false,
                            allowBlank      : true,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            rowdata         : null
                        },
                        {
                            xtype            : 'xmoneyfield',
                            minValue         : 0,
                            itemId           : 'fs_initamount' + me.uniquename,
                            name             : 'initamount',
                            id               : 'initamount' + me.uniquename,
                            fieldLabel       : 'First Amount',
                            emptyText        : 'Auto',
                            width            : 350,
                            hideTrigger      : true,
                            hidden           : true,
                            keyNavEnabled    : false,
                            mouseWheelEnabled: false,
                            readOnly         : false,
                            allowBlank       : false,
                            enableKeyEvents  : true,
                            enforceMaxLength : true,
                            maxLength        : 30,
                            fieldStyle       : 'background-color:#eee;background-image: none;'
                        },
                    ]
                },
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    align     : 'right',
                    bodyBorder: false,
                    defaults  : {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text : '',
                            style: {
                                color: '#ff0000'
                            },
                            itemId          : 'fd_title_amount_real' + me.uniquename,
                            id              : 'title_amount_real',
                            name            : 'title_amount_real',
                            width           : 350,
                            allowBlank      : false,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            rowdata         : null
                        },
                        {
                            xtype: 'splitter',
                            width: '80'
                        },
                        {
                            xtype: 'label',
                            text : '',
                            style: {
                                color: '#ff0000'
                            },
                            itemId          : 'fd_amount_real' + me.uniquename,
                            id              : 'amount_real',
                            name            : 'amount_real',
                            width           : 350,
                            allowBlank      : false,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            rowdata         : null
                        },
                    ]
                },
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    align     : 'right',
                    bodyBorder: false,
                    defaults  : {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype           : 'textareafield',
                            itemId          : 'fdms_description' + me.uniquename,
                            id              : 'description' + me.uniquename,
                            name            : 'description',
                            fieldLabel      : 'Description',
                            fieldStyle      : 'text-transform:uppercase',
                            allowBlank      : false,
                            enforceMaxLength: true,
                            grow            : true,
                            width           : 780,
                        },
                    ]
                },
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    align     : 'right',
                    bodyBorder: false,
                    defaults  : {
                        layout: 'fit'
                    },
                    items: [
                        {xtype: 'tbspacer', height: 5, width: 105},
                        {
                            xtype         : 'checkboxfield',
                            itemId        : 'is_pjk',
                            name          : 'is_pjk',
                            boxLabel      : 'TKB / PJK ?',
                            inputValue    : '1',
                            uncheckedValue: '0',
                            width         : 100
                        },
                        {
                            xtype         : 'checkboxfield',
                            itemId        : 'is_pajak',
                            name          : 'is_pajak',
                            boxLabel      : 'Pajak ?',
                            inputValue    : '1',
                            uncheckedValue: '0',
                            width         : 75
                        },
                        {
                            xtype         : 'checkboxfield',
                            itemId        : 'is_reward',
                            name          : 'is_reward',
                            boxLabel      : 'Reward ?',
                            inputValue    : '1',
                            uncheckedValue: '0',
                            width         : 100
                        },
                    ]
                },
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    align     : 'right',
                    bodyBorder: false,
                    defaults  : {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype           : 'kasbondepthasapplycombobox',
                            fieldLabel      : 'Kasbon No',
                            itemId          : 'fd_kasbondept_id' + me.uniquename,
                            id              : 'kasbondept_id' + me.uniquename,
                            name            : 'kasbondept_id',
                            hideTrigger     : true,
                            anchor          : '50%',
                            width           : 350,
                            emptyText       : 'Ketik Nomor / Deskripsi Kasbon...',
                            queryMode       : 'remote',
                            readOnly        : false,
                            allowBlank      : true,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            forceSelection  : true,
                            rowdata         : null,
                            listeners       : {
                                render: function(c) {
                                    Ext.QuickTips.register({
                                    target    : c.getEl(),
                                    text      : 'Untuk PJK, harap <b>ketik nomer kasbon</b> atau pencarian berdasarkan deskripsi kasbon.<br>Pastikan kasbon anda sudah <b>direalisasi</b>.',
                                    enabled   : true,
                                    showDelay : 20,
                                    trackMouse: true,
                                    autoShow  : true
                                });
                                }
                            } 
                        },
                        {
                            xtype: 'splitter',
                            width: '80'
                        },
                        {
                            xtype           : 'xmoneyfield',
                            itemId          : 'fdms_remainingkasbon' + me.uniquename,
                            id              : 'remainingkasbon' + me.uniquename,
                            name            : 'remainingkasbon',
                            fieldLabel      : ' Remaining Kasbon',
                            allowBlank      : false,
                            enforceMaxLength: true,
                            readOnly        : true,
                            grow            : true,
                            width           : 350,
                            hidden          : true
                        }
                    ]
                },
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    align     : 'right',
                    bodyBorder: false,
                    defaults  : {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype           : 'xmoneyfield',
                            itemId          : 'fdms_valuekasbon' + me.uniquename,
                            id              : 'valuekasbon' + me.uniquename,
                            name            : 'valuekasbon',
                            fieldLabel      : ' Value Kasbon',
                            allowBlank      : false,
                            enforceMaxLength: true,
                            readOnly        : true,
                            grow            : true,
                            width           : 350,
                            hidden          : true
                        }
                    ]
                },

                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    align     : 'right',
                    bodyBorder: false,
                    defaults  : {
                        layout: 'fit'
                    },
                    items: [

                    ]
                },
                {
                xtype      : 'fieldset',
                title      : 'UPLOAD VOUCHER',
                collapsible: false,
                defaults   : {anchor: '93%'},
                layout     : 'vbox',
                name       : 'uploadcontainer',
                hidden     : true,
                padding    : '10 0 0 10',
                items      : [
                    {
                        xtype       : 'filefield',
                        id          : 'form-file',
                        emptyText   : 'Select an CSV',
                        fieldLabel  : 'CSV File',
                        name        : 'file-path',
                        allowBlank  : true,
                        buttonText  : '',
                        buttonConfig: {
                            iconCls: 'icon-plus'
                            },
                        fileInputAttributes: {
                            accept: 'csv'
                            }
                    },
                    {
                        xtype     : 'displayfield',
                        id        : 'sample',
                        fieldLabel: '<a target="_blank" href="'+fileexample+'">Download sample</a>'
                    },
                    {
                        xtype     : 'fieldcontainer',
                        fieldLabel: 'Grouping',
                        padding   : '0 0 0 20px',
                        layout    : 'hbox',
                        items     : [
                            {
                                boxLabel  : 'Yes',
                                xtype     : 'radiofield',
                                name      : 'groupingdata',
                                inputValue: 1,
                                id        : 'gr_groupingdatayes'
                            },
                            {
                                xtype: 'splitter',
                                width: '50'
                            },
                            {
                                boxLabel  : 'No',
                                xtype     : 'radiofield',
                                name      : 'groupingdata',
                                inputValue: 0,
                                id        : 'gr_groupingdatano',
                                checked   : true
                            }
                        ]
                    }
                ]
                },
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    bodyBorder: false,
                    defaults  : {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype    : 'tabpanel',
                            itemId   : 'voucherrequesttab',
                            name     : 'voucherrequesttab',
                            width    : '100%',
                            height   : 350,
                            activeTab: 0,
                            defaults : {layout: 'fit'},
                            items    : [
                                {
                                    title   : 'DETAIL COA',
                                    xtype   : 'vdrequestgriddetail',
                                    name    : 'gridtabdetail',
                                    id      : 'gridtabdetail',
                                    readOnly: false,
                                    width   : 750,
                                    height  : 300,
                                },
                                {
                                    title   : 'MULTI KASBON',
                                    xtype   : 'vdrequestgridkasbondetail',
                                    name    : 'gridtabkasbondetail',
                                    id      : 'gridtabkasbondetail',
                                    readOnly: false,
                                    width   : 750,
                                    height  : 300,
                                },
                                {
                                    title   : 'ATTACHMENTS',
                                    xtype   : 'vdrequestgridattachmentdetail',
                                    name    : 'gridtabattachmentdetail',
                                    id      : 'gridtabattachmentdetail',
                                    readOnly: false,
                                    width   : 750,
                                    height  : 300,
                                },
                                {
                                    title   : 'APPROVAL',
                                    xtype   : 'vdrequestgridapprovaldetail',
                                    name    : 'gridapprovaldetail',
                                    id      : 'gridapprovaldetail',
                                    readOnly: false,
                                    width   : 750,
                                    height  : 300,
                                }
                            ],
                        }
                    ]
                },
            ],
            dockedItems: me.generateDockedItem()
        });
        me.callParent(arguments);
    },
    generateDockedItem: function () {
        var x = [
            {
                xtype  : 'toolbar',
                dock   : 'bottom',
                ui     : 'footer',
                padding: '0 0 0 0',
                layout : {
                    padding: 6,
                    type   : 'hbox',
                },
                items: [
                    {
                        xtype     : 'fieldcontainer',
                        layout    : 'vbox',
                        align     : 'right',
                        bodyBorder: false,
                        defaults  : {
                            layout: 'fit'
                        },
                        items: [
                            {
                                xtype     : 'fieldcontainer',
                                layout    : 'hbox',
                                align     : 'right',
                                bodyBorder: false,
                                defaults  : {
                                    layout: 'fit'
                                },
                                items: [
                                    {
                                        xtype: 'splitter',
                                        width: '20'
                                    },
                                    {
                                        xtype            : 'xmoneyfield',
                                        anchor           : '100%',
                                        itemId           : 'fd_totaldetail_1qwe',
                                        id               : 'totaldetail_1qwe',
                                        name             : 'totaldetail',
                                        fieldLabel       : 'Total Detail',
                                        emptyText        : 'Auto Value',
                                        width            : 350,
                                        value            : 0,
                                        hideTrigger      : true,
                                        keyNavEnabled    : false,
                                        mouseWheelEnabled: false,
                                        enforceMaxLength : true,
                                        readOnly         : true,
                                        allowBlank       : false,
                                        enableKeyEvents  : true,
                                        rowdata          : null
                                    },
                                    {
                                        xtype: 'splitter',
                                        width: '80'
                                    },
                                    {
                                        xtype            : 'xmoneyfield',
                                        anchor           : '100%',
                                        itemId           : 'fd_balance_1qwe',
                                        id               : 'balance_1qwe',
                                        name             : 'balance',
                                        fieldLabel       : 'Balance',
                                        emptyText        : 'Auto Value',
                                        value            : 0,
                                        width            : 350,
                                        hideTrigger      : true,
                                        keyNavEnabled    : false,
                                        mouseWheelEnabled: false,
                                        enforceMaxLength : true,
                                        readOnly         : true,
                                        allowBlank       : false,
                                        enableKeyEvents  : true,
                                        rowdata          : null},
                                ]
                            },
                            {xtype: 'tbspacer', height: 5},
                            {
                                xtype     : 'fieldcontainer',
                                layout    : 'hbox',
                                align     : 'right',
                                bodyBorder: false,
                                defaults  : {
                                    layout: 'fit'
                                },
                                items: [
                                    {
                                        xtype  : 'button',
                                        text   : 'Upload & Save',
                                        action : 'upload',
                                        padding: 5,
                                        iconCls: 'icon-save',
                                        hidden : true,
                                        width  : 120
                                    },
                                    {
                                        xtype: 'splitter',
                                        width: '600'
                                    },
                                    {
                                        xtype  : 'button',
                                        action : 'save',
                                        itemId : 'btnSave',
                                        padding: 5,
                                        width  : 75,
                                        iconCls: 'icon-save',
                                        text   : 'Save'
                                    },
                                    {
                                        xtype  : 'button',
                                        action : 'cancel',
                                        itemId : 'btnCancel',
                                        padding: 5,
                                        width  : 75,
                                        iconCls: 'icon-cancel',
                                        text   : 'Cancel',
                                        handler: function () {
                                            this.up('window').close();
                                        }
                                    },
                                ]
                            },
                        ]
                    },
                ]
            }
        ];
        return x;
    }
});

