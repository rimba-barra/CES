Ext.define('Cashier.view.voucher.FormData', {
    extend                  : 'Cashier.library.template.view.FormData',
    alias                   : 'widget.voucherformdata',
    frame                   : true,
    autoScroll              : true,
    anchorSize              : 100,
    bodyBorder              : true,
    bodyPadding             : 10,
    closable                : false,
    bodyStyle               : 'border-top:none;border-left:none;border-right:none;',
    deletedRows             : [],
    deletedOtherPaymentRows : [],
    deletedArPaymentRows    : [],
    deletedsubRows          : [],
    deletedLocalstoreSubRows: [],
    editedRow               : -1,
    deletedRowsWithoutID    : 0,
    id                      : 'formdatavoucherID',
    itemId                  : 'formdatavoucherID',
    rowData                 : null,
    width                   : 1000,
    height                  : 700,
    initComponent           : function () {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                labelAlign    : 'left',
                labelSeparator: ' ',
                labelClsExtra : 'small',
                fieldStyle    : 'margin-bottom:3px;',
                anchor        : '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name : 'is_pickar',
                    value: 0
                },
                {
                    xtype: 'hiddenfield',
                    name : 'master_undangan_id'
                },{
                    xtype: 'hiddenfield',
                    name : 'nama_vendor_first'
                },{
                    xtype: 'hiddenfield',
                    name : 'nama_pt'
                },{
                    xtype: 'hiddenfield',
                    name : 'unit_cluster'
                },{
                    xtype: 'hiddenfield',
                    name : 'unit_mh_type'
                },{
                    xtype: 'hiddenfield',
                    name : 'kpr_parsial'
                },{
                    xtype: 'hiddenfield',
                    name : 'is_f9'
                },{
                    xtype: 'hiddenfield',
                    name : 'kelsub_id'
                },{
                    xtype: 'hiddenfield',
                    name : 'kasbank_reff_id'
                },{
                    xtype: 'hiddenfield',
                    name : 'kasbank_reff_ids'
                },{
                    xtype: 'hiddenfield',
                    name : 'receipt_id'
                },{
                    xtype: 'hiddenfield',
                    name : 'subgl_id'
                },{
                    xtype: 'hiddenfield',
                    name : 'is_temp_realized'
                },
                {
                    xtype: 'hiddenfield',
                    name : 'subholding_id'
                },
                {
                    xtype: 'hiddenfield',
                    name : 'first_amount'
                },
                {
                    xtype: 'hiddenfield',
                    name : 'unit_unit_id'
                },
                {
                    xtype: 'hiddenfield',
                    name : 'saved_pt_pt_id'
                },
        //                {
        //                    xtype: 'hiddenfield',
        //                    name: 'saved_project_project_id'
        //                },
        //                {
        //                    xtype: 'hiddenfield',
        //                    name: 'saved_department_id'
        //                },
                {
                    xtype: 'hiddenfield',
                    name : 'purchaseletter_purchaseletter_id'
                },
                {
                    xtype: 'hiddenfield',
                    name : 'purchaseletter_customer_id'
                },
                {
                    xtype: 'hiddenfield',
                    name : 'payment_payment_id'
                },
                {
                    xtype: 'hiddenfield',
                    name : 'payment_paymentflag_id'
                },
                {
                    xtype: 'hiddenfield',
                    name : 'voucher_voucher_id'
                },
                {
                    xtype: 'hiddenfield',
                    name : 'kasbank_id'
                },
                {
                    xtype: 'hiddenfield',
                    name : 'cheque_cheque_id'
                },
                {
                    xtype: 'hiddenfield',
                    name : 'payment_denda'
                },
                {
                    xtype: 'hiddenfield',
                    name : 'vendor_vendor_id'
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
                            xtype         : 'combobox',
                            name          : 'dataflow',
                            fieldLabel    : 'Voucher Type',
                            queryMode     : 'local',
                            valueField    : 'status',
                            allowBlank    : false,
                            forceSelection: true,
                            msgTarget     : "side",
                            blankText     : 'This should not be blank!',
                            displayField  : 'description',
                            width         : 300,
                            store         : new Ext.data.JsonStore({
                                fields: ['status', 'description'],
                                data  : [
                                    {status: 'I', description: 'CASH IN'},
                                    {status: 'O', description: 'CASH OUT'},
                                ]
                            }),
                        },
                        {
                            xtype: 'splitter',
                            width: '40'
                        },
                        {
                            xtype     : 'textfield',
                            name      : 'voucher_no',
                            id        : 'voucher_no',
                            fieldLabel: 'Voucher No.',
                            align     : 'right',
                            readOnly  : true,
                            hidden    : true,
                            width     : 250,
                        },
                        {
                            xtype: 'splitter',
                            width: '30'
                        },
                        {
                            xtype     : 'textfield',
                            name      : 'payment_receipt_no',
                            id        : 'payment_receipt_no',
                            fieldLabel: 'Receipt No.',
                            align     : 'right',
                            width     : 250,
                        },
                        {
                            xtype   : 'button',
                            id      : 'btnbrowsereceiptid',
                            itemId  : 'btnbrowsereceiptid',
                            action  : 'browsereceiptid',
                            padding : 5,
                            width   : 30,
                            height  : 25,
                            iconCls : 'icon-search',
                            text    : '',
                            hidden  : true,
                            disabled: false,
                            tooltip : 'Browse Kwitansi'
                        },
                        {
                            xtype   : 'button',
                            id      : 'btngeneratekwitansinumber',
                            itemId  : 'btngeneratekwitansinumber',
                            action  : 'generatekwitansinumber',
                            padding : 5,
                            width   : 30,
                            height  : 25,
                            iconCls : 'icon-refresh',
                            text    : '',
                            hidden  : true,
                            disabled: false,
                            tooltip : 'Generate Kwitansi',
                        },
                        {
                            xtype   : 'button',
                            id      : 'btnbrowseremovereceiptid',
                            itemId  : 'btnbrowseremovereceiptid',
                            action  : 'browseremovereceiptid',
                            padding : 5,
                            width   : 30,
                            height  : 25,
                            iconCls : 'icon-delete',
                            text    : '',
                            hidden  : true,
                            disabled: false,
                            tooltip : 'Remove Kwitansi',
                        },
                        {
                            xtype: 'tbspacer',
                            flex : 1
                        },
                        {
                            xtype  : 'button',
                            width  : 150,
                            padding: 5,
                            text   : 'Voucher from copy',
                            iconCls: 'icon-search',
                            itemId : 'btnListCopy',
                            id     : 'btnListCopy',
                            menu   : [
                                {
                                    xtype     : 'button',
                                    itemId    : 'btnCopyVoucher',
                                    action    : 'browsevoucher',
                                    padding   : 5,
                                    width     : 135,
                                    height    : 25,
                                    iconCls   : 'icon-search',
                                    text      : 'Copy Voucher',
                                    fieldLabel: 'Copy Voucher',
                                    title     : 'Copy voucher cash',
                                    hidden    : true,
                                },
                                {
                                    xtype     : 'button',
                                    itemId    : 'btnCopyProjectLoan',
                                    action    : 'browseprojectloan',
                                    padding   : 5,
                                    width     : 135,
                                    height    : 25,
                                    iconCls   : 'icon-search',
                                    text      : 'Copy Pettycash Loan',
                                    fieldLabel: 'Copy Pettycash Loan',
                                    title     : 'Copy Pettycash Loan',
                                    hidden    : true,
                                }
                            ]
                        },
                        {
                            xtype: 'splitter',
                            width: '30'
                        },
                        {
                            xtype : 'label',
                            forId : 'myFieldId',
                            id    : 'dataflowId',
                            itemId: 'dataflowId',
                            text  : ' IN',
                            style : {
                                color   : '#ff0000',
                                fontSize: '30px',
                                size    : '30px',
                                position: 'relative',
                                margin  : '-5 0 0 0'
                            },
                        }
                    ]
                },
                {
                    xtype: 'splitter',
                    width: '650'
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
                            xtype           : 'textfield',
                            name            : 'voucherID',
                            fieldLabel      : 'Voucher ID',
                            enforceMaxLength: true,
                            maskRe          : /[^\`\"\']/,
                            anchor          : '-5',
                            width           : '300',
                            readOnly        : true,
                            allowBlank      : false,
                            fieldStyle      : 'background-color:#eee;background-image: none;'

                        },
                        {
                            xtype: 'splitter',
                            width: '40'
                        },
                        {
                            xtype           : 'datefield',
                            fieldLabel      : 'Kwitansi Date',
                            name            : 'kwitansi_date',
                            format          : 'd-m-Y',
                            submitFormat    : 'Y-m-d',
                            width           : 250,
                            emptyText       : 'Manual Input',
                            allowBlank      : false,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            rowdata         : null,
                            msgTarget       : "side",
                            blankText       : 'This should not be blank!',
                            hideTrigger     : false,
                            onDownArrow     : Ext.emptyFn,
                            listeners       : {
                                render: function () {
                                    var picker = this.getPicker();
                                    picker.on("select", function () {
                                        this.hide();
                                    });
                                            //  this.triggerCell.hide();
                                    this.inputCell.on("click", function () {
                                        if (picker.hidden)
                                            picker.show();
                                        else
                                            picker.hide();
                                    });
                                }
                            }
                        },
                        {
                            xtype           : 'datefield',
                            fieldLabel      : 'Due Date',
                            name            : 'duedate',
                            format          : 'd-m-Y',
                            submitFormat    : 'Y-m-d',
                            width           : 250,
                            emptyText       : 'Manual Input',
                            allowBlank      : false,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            rowdata         : null,
                            hidden          : true,
                            msgTarget       : "side",
                            blankText       : 'This should not be blank!',
                            hideTrigger     : false,
                            onDownArrow     : Ext.emptyFn,
                            listeners       : {
                                render: function () {
                                    var picker = this.getPicker();
                                    picker.on("select", function () {
                                        this.hide();
                                    });
                                            //  this.triggerCell.hide();
                                    this.inputCell.on("click", function () {
                                        if (picker.hidden)
                                            picker.show();
                                        else
                                            picker.hide();
                                    });
                                }
                            }
                        },
                        {
                            xtype: 'tbspacer',
                            flex : 1
                        },
                        {
                            xtype     : 'textfield',
                            name      : 'coa_coa',
                            fieldLabel: 'COA',
                            width     : 250,
                            readOnly  : true,
                            fieldStyle: 'background-color:#eee;background-image: none;color:#000',
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
                            xtype           : 'datefield',
                            fieldLabel      : 'Date',
                            itemId          : 'fd_accept_date',
                            id              : 'accept_date_1111',
                            name            : 'kasbank_date',
                            format          : 'd-m-Y',
                            submitFormat    : 'Y-m-d',
                            width           : 300,
                            emptyText       : 'Auto Value',
                            allowBlank      : true,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            rowdata         : null,
                            readOnly        : true,
                            fieldStyle      : 'margin-right:50px;background-color:#eee;background-image: none;'

                        },
                        {
                            xtype: 'splitter',
                            width: '40'
                        },
                        {
                            xtype     : 'xmoneyfield',
                            name      : 'amount',
                            fieldLabel: 'Total',
                            align     : 'right',
                            style     : 'text-align:left',
                            readOnly  : true,
                            anchor    : '-5',
                            width     : 250,
                            allowBlank: false,
                            msgTarget : "side",
                            blankText : 'This should not be blank!',
                            fieldStyle: 'background-color:#eee;background-image: none;text-align:right;align:right'

                        },
                        {
                            xtype: 'tbspacer',
                            flex : 1
                        },
                        {
                            xtype           : 'datefield',
                            fieldLabel      : 'Realization Date',
                            name            : 'realization_date',
                            format          : 'd-m-Y',
                            submitFormat    : 'Y-m-d',
                            width           : 250,
                            emptyText       : 'Manual Input',
                            allowBlank      : true,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            rowdata         : null,
                            hidden          : true,
                            readOnly        : true,
                            fieldStyle      : 'background-color:#BADDB4;background-image: none;color:#fff',
                        },
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
                            xtype           : 'combobox',
                            name            : 'pt_pt_id',
                            fieldLabel      : 'Company',
                            displayField    : 'name',
                            valueField      : 'pt_id',
                            width           : 300,
                            forceSelection  : true,
                            allowBlank      : false,
                            enforceMaxLength: true,
                        },
                        {
                            xtype: 'splitter',
                            width: '40'
                        },
                        {
                            xtype           : 'combobox',
                            name            : 'voucherprefix_voucherprefix_id',
                            fieldLabel      : 'Kas/Bank',
                            displayField    : 'description',
                            valueField      : 'voucherprefix_id',
                            id              : 'formdatavoucherprefix_voucherprefix_id',
                            itemId          : 'formdatavoucherprefix_voucherprefix_id',
                            width           : 250,
                            req             : 'req',
                            forceSelection  : false,
                            readOnly        : false,
                            enforceMaxLength: true,
                            queryMode       : 'local',
                            rowdata         : null,
                            msgTarget       : "side",
                            blankText       : 'This should not be blank!',
                            matchFieldWidth : false,
                            tpl             : Ext.create('Ext.XTemplate',
                                    '<table class="x-grid-table" width="350px" >',
                                    '<tr class="x-grid-row">',
                                    '<th width="300px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                                    '<th width="350px"><div class="x-column-header x-column-header-inner">Description</div></th>',
                                    '</tr>',
                                    '<tpl for=".">',
                                    '<tr class="x-boundlist-item">',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{coa_coa}</div></td>',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{description}</div></td>',
                                    '</tr>',
                                    '</tpl>',
                                    '</table>'
                                    ),
                        },
                        {
                            xtype: 'tbspacer',
                            flex : 1
                        },
                        {
                            xtype     : 'textfield',
                            name      : 'realization_by',
                            fieldLabel: 'Realization by',
                            width     : '250',
                            hidden    : true,
                            readOnly  : true,
                            fieldStyle: 'background-color:#BADDB4;background-image: none;color:#fff',
                        },
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
                            xtype           : 'combobox',
                            name            : 'project_project_id',
                            fieldLabel      : 'Project',
                            displayField    : 'project_name',
                            valueField      : 'project_project_id',
                            width           : 300,
                            queryMode       : 'local',
                            allowBlank      : false,
                            msgTarget       : "side",
                            enforceMaxLength: true,
                            blankText       : 'This should not be blank!',
                        },
                        {
                            xtype: 'splitter',
                            width: '40'
                        },
                        {
                            xtype     : 'textfield',
                            name      : 'bank_name',
                            fieldLabel: 'Bank or Provider',
                            width     : 250,
                            hidden    : true
                        },
                        {
                            xtype     : 'textfield',
                            name      : 'cheque_cheque_no',
                            emptyText : 'Cheque',
                            fieldLabel: 'Cek/Giro',
                            width     : 250,
                            hidden    : true,
                            readOnly  : true,
                        },
                        {
                            xtype  : 'button',
                            itemId : 'btnbrowseCheque',
                            action : 'browseCheque',
                            padding: 5,
                            width  : 30,
                            height : 25,
                            iconCls: 'icon-search',
                            text   : '',
                            hidden : true,
                        },
                        {
                            xtype: 'tbspacer',
                            flex : 1
                        },
                        {
                            xtype           : 'datefield',
                            fieldLabel      : 'Posting Date',
                            name            : 'posting_date',
                            format          : 'd-m-Y',
                            submitFormat    : 'Y-m-d',
                            width           : 250,
                            allowBlank      : true,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            rowdata         : null,
                            hidden          : true,
                            readOnly        : true,
                            fieldStyle      : 'background-color:#F1C9BA;background-image: none;color:#fff',
                        },
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
                            xtype         : 'combobox',
                            name          : 'department_department_id',
                            fieldLabel    : 'Department',
                            displayField  : 'name',
                            valueField    : 'department_id',
                            width         : 300,
                            allowBlank    : false,
                            forceSelection: true,
                            msgTarget     : "side",
                            blankText     : 'This should not be blank!',
                            queryMode     : 'local',
                            tpl           : Ext.create('Ext.XTemplate',
                                    '<table class="x-grid-table" width="300px" >',
                                    '<tr class="x-grid-row">',
                                    '<th width="15px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                                    '<th width="80px"><div class="x-column-header x-column-header-inner">Department</div></th>',
                                    '</tr>',
                                    '<tpl for=".">',
                                    '<tr class="x-boundlist-item">',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{name}</div></td>',
                                    '</tr>',
                                    '</tpl>',
                                    '</table>'
                                    ),
                        },
                        {
                            xtype: 'splitter',
                            width: '40'
                        },
                        {
                            xtype           : 'datefield',
                            fieldLabel      : 'Payment Date',
                            name            : 'payment_date',
                            id              : 'fd_payment_date',
                            format          : 'd-m-Y',
                            submitFormat    : 'Y-m-d',
                            width           : 250,
                            emptyText       : 'Manual Input',
                            allowBlank      : true,
                            enforceMaxLength: true,
                            enableKeyEvents : true,
                            rowdata         : null,
                            hidden          : true,
                            hideTrigger     : false,
                            onDownArrow     : Ext.emptyFn,
                            listeners       : {
                                render: function () {
                                    var picker = this.getPicker();
                                    picker.on("select", function () {
                                        this.hide();
                                    });
                                    this.inputCell.on("click", function () {
                                        if (picker.hidden)
                                            picker.show();
                                        else
                                            picker.hide();
                                    });
                                }
                            }
                        },
                        {
                            xtype       : 'datefield',
                            width       : 250,
                            fieldLabel  : 'Payment Date',
                            name        : 'tmp_payment_date',
                            format      : 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            readOnly    : true,
                            hidden      : true,
                            hideTrigger : false,
                        },
                        {
                            xtype: 'tbspacer',
                            flex : 1
                        },
                        {
                            xtype     : 'textfield',
                            name      : 'posting_by',
                            fieldLabel: 'Posting by',
                            width     : 250,
                            hidden    : true,
                            readOnly  : true,
                            fieldStyle: 'background-color:#F1C9BA;background-image: none;color:#fff',
                        },
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
                            xtype       : 'combobox',
                            name        : 'payment_paymentmethod_id',
                            fieldLabel  : 'Payment Type',
                            width       : 300,
                            valueField  : 'paymentmethod_id',
                            allowBlank  : true,
                            displayField: 'paymentmethod',
                        },
                        {
                            xtype: 'splitter',
                            width: '40'
                        },
                        {
                            xtype         : 'combobox',
                            itemId        : 'fd_jenis_spkorsop_id'+me.uniquename,
                            id            : 'fd_jenis_spkorsop_id'+me.uniquename,
                            name          : 'jenis_spkorsop_id',
                            fieldLabel    : '',
                            allowBlank    : true,
                            forceSelection: true,
                            emptyText     : '',
                            queryMode     : 'local',
                            displayField  : 'description',
                            valueField    : 'status',
                            width         : 100,
                            store         : new Ext.data.JsonStore({
                                fields: ['status', 'description'],
                                data  : [
                                    {status: 1, description: 'SPK'},
                                    {status: 2, description: 'SOP'},
                                ]
                            }),
                        },
                        {
                            xtype           : 'textfield',
                            fieldLabel      : '',
                            itemId          : 'fd_spk' + me.uniquename,
                            id              : 'spk' + me.uniquename,
                            name            : 'spk',
                            anchor          : '50%',
                            width           : 150,
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
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    bodyBorder: false,
                    defaults  : {
                        layout: 'fit'
                    },
                      // width: 300,
                    items: [
                        {
                            xtype         : 'combobox',
                            name          : 'datatype',
                            queryMode     : 'local',
                            valueField    : 'status',
                            allowBlank    : false,
                            forceSelection: true,
                            width         : 90,
                            displayField  : 'description',
                            store         : new Ext.data.JsonStore({
                                fields: ['status', 'description'],
                                data  : [
                                    {status: '0', description: 'Customer'},
                                    {status: '1', description: 'Supplier'},
                                    {status: '2', description: 'Unit'},
                                    {status: '3', description: 'Tenant'},
                                ]
                            }),
                        },
                        {
                            xtype: 'splitter',
                            width: '15'
                        },
                        {
                            xtype     : 'textfield',
                            name      : 'customer_name',
                            width     : 195,
                            readOnly  : true,
                            allowBlank: false,
                            msgTarget : "side",
                            blankText : 'This should not be blank!',
                        },
                        {
                            xtype   : 'button',
                            itemId  : 'btnbrowseData',
                            action  : 'browseData',
                            padding : 5,
                            width   : 30,
                            height  : 25,
                            iconCls : 'icon-search',
                            text    : '',
                            disabled: true
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype     : 'textfield',
                            name      : 'vendor_no_rekening',
                            fieldLabel: 'No.Rek',
                            width     : '250',
                            hidden    : true,
                            allowBlank: true,
                            fieldStyle: 'background-color:#eee;background-image: none;'
                        },
                        {
                            xtype: 'splitter',
                            width: '30'
                        },
                        {
                            xtype     : 'textfield',
                            name      : 'kasbondept_no',
                            fieldLabel: 'Kasbon Dept No',
                            width     : '250',
                            hidden    : true,
                            allowBlank: true,
                            fieldStyle: 'background-color:#eee;background-image: none;'
                        },
                        {
                            xtype: 'splitter',
                            width: '30'
                        },
                        {
                            xtype     : 'textfield',
                            name      : 'unit_unit_number',
                            fieldLabel: 'Unit',
                            width     : '250',
                            hidden    : true,
                            readOnly  : true,
                            allowBlank: true,
                            fieldStyle: 'background-color:#eee;background-image: none;'
                        },
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
                            xtype     : 'textfield',
                            name      : 'subgl_code',
                            fieldLabel: 'Sub Kas/Bank',
                            width     : '300',
                            readOnly  : true,
                            allowBlank: true,
                            msgTarget : "side",
                            blankText : 'This should not be blank!',
                            hidden    : true,
                        },
                        {
                            xtype   : 'button',
                            id      : 'btnbrowseSub',
                            itemId  : 'btnbrowseSub',
                            action  : 'browseSub',
                            padding : 5,
                            width   : 30,
                            height  : 25,
                            iconCls : 'icon-search',
                            text    : '',
                            hidden  : true,
                            disabled: false
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
                    items: [{
                            xtype     : 'textfield',
                            name      : 'kasbank_reff_voucher_id',
                            fieldLabel: 'Link Voucher',
                            width     : '300',
                            readOnly  : true,
                            allowBlank: true,
                            msgTarget : "side",
                            blankText : 'This should not be blank!',
                            hidden    : true,
                        },
                        {
                            xtype   : 'button',
                            id      : 'btnbrowsereffvcr',
                            itemId  : 'btnbrowsereffvcr',
                            action  : 'browsereffvcr',
                            padding : 5,
                            width   : 30,
                            height  : 25,
                            iconCls : 'icon-search',
                            text    : '',
                            hidden  : true,
                            disabled: false
                        },
                        {
                            xtype   : 'button',
                            id      : 'deletelink',
                            itemId  : 'deletelink',
                            action  : 'deletelink',
                            padding : 5,
                            width   : 30,
                            height  : 25,
                            iconCls : 'icon-delete',
                            text    : '',
                            hidden  : true,
                            disabled: false
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
                            xtype : 'fieldcontainer',
                            layout: 'vbox',
                            items : [
                                {
                                    xtype     : 'fieldcontainer',
                                    layout    : 'hbox',
                                    bodyBorder: false,
                                    defaults  : {
                                        layout: 'fit'
                                    },
                                    items: [
                                        {
                                            xtype           : 'combobox',
                                            name            : 'vendor_bankacc_id',
                                            fieldLabel      : 'Vendor Bank Acc No',
                                            displayField    : 'bank_account_no',
                                            valueField      : 'vendor_bankacc_id',
                                            width           : 300,
                                            allowBlank      : true,
                                            forceSelection  : true,
                                            msgTarget       : "side",
                                            queryMode       : 'local',
                                            enforceMaxLength: true,
                                            matchFieldWidth : false,
                                            tpl             : Ext.create('Ext.XTemplate',
                                                    '<table class="x-grid-table" width="300px" >',
                                                    '<tr class="x-grid-row">',
                                                    '<th width="300px"><div class="x-column-header x-column-header-inner">Bank Account No</div></th>',
                                                    '<th width="350px"><div class="x-column-header x-column-header-inner">Bank Account Name</div></th>',
                                                    '</tr>',
                                                    '<tpl for=".">',
                                                    '<tr class="x-boundlist-item">',
                                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{bank_account_no}</div></td>',
                                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{bank_account_name}</div></td>',
                                                    '</tr>',
                                                    '</tpl>',
                                                    '</table>'
                                                    ),
                                        },
                                        {
                                            xtype   : 'button',
                                            id      : 'btnbrowsereffrek',
                                            itemId  : 'btnbrowsereffrek',
                                            action  : 'btnbrowsereffrek',
                                            padding : 5,
                                            width   : 30,
                                            height  : 25,
                                            iconCls : 'icon-add',
                                            text    : '',
                                            hidden  : true,
                                            disabled: false,
                                            style : {
                                                margin  : '8 0 0 0'
                                            },
                                        },             
                                        {
                                            xtype: 'splitter',
                                            width: '10'
                                        },
                                        {
                                            xtype     : 'textfield',
                                            name      : 'vendor_bank_name',
                                            fieldLabel: 'Vendor Bank Name ',
                                            anchor    : '-5',
                                            width     : '250',
                                            readOnly  : true,
                                            allowBlank: true,
                                            hidden    : true
                                        },
                                    ]
                                },
                                
                            ]
                        },
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
                            xtype     : 'textfield',
                            name      : 'vendor_bank_account_name',
                            fieldLabel: 'Vendor Bank Account Name ',
                            readOnly  : true,
                            allowBlank: true,
                            hidden    : true,
                            width     : 300,
                        },
                        {
                            xtype: 'splitter',
                            width: '40'
                        },
                        {
                            xtype     : 'textfield',
                            name      : 'vendor_bank_currency',
                            fieldLabel: 'Vendor Bank Currency ',
                            readOnly  : true,
                            allowBlank: true,
                            hidden    : true,
                            width     : 250,
                        },
                        {
                            xtype: 'splitter',
                            width: '30'
                        },
                        {
                            xtype     : 'textfield',
                            name      : 'remarks',
                            fieldLabel: 'Vendor Bank. Notes ',
                            width     : 250,
                            readOnly  : true,
                            allowBlank: true,
                            hidden    : true
                        },
                    ]
                },
                {
                    xtype     : 'textareafield',
                    fieldLabel: 'Notes',
                    anchor    : '-5',
                    name      : 'description',
                    width     : 300,
                    allowBlank: false,
                    fieldStyle: 'text-transform: uppercase',
                    height    : 40,

                },
                {
                    xtype     : 'textareafield',
                    fieldLabel: 'Notes Kwitansi',
                    anchor    : '-5',
                    name      : 'receipt_notes',
                    width     : 300,
                    allowBlank: true,
                    hidden    : true,
                    fieldStyle: 'text-transform: uppercase',
                    height    : 40,

                },
                {
                    xtype     : 'textfield',
                    fieldLabel: 'Cashback Kasbon No.',
                    anchor    : '-5',
                    name      : 'cashbackcashbonno',
                    width     : 100,
                    readOnly  : true,
                    allowBlank: true,
                    hidden    : true,
                    fieldStyle: 'text-transform: uppercase',
                    height    : 40,

                },
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    bodyBorder: false,
                    defaults  : {
                        layout: 'fit'
                    },
                    width: 250,
                    items: [
                        {
                            xtype       : 'combobox',
                            name        : 'currency_word',
                            fieldLabel  : 'Currency',
                            width       : 300,
                            valueField  : 'currency_word',
                            allowBlank  : true,
                            displayField: 'currency_word',
                        },
                    ]
                },
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    bodyBorder: false,
                    defaults  : {
                        layout: 'fit'
                    },
                    width: 250,
                    items: [
                        {
                            xtype       : 'combobox',
                            name        : 'artype_id',
                            fieldLabel  : 'AR',
                            width       : 300,
                            valueField  : 'artype_id',
                            readOnly    : true,
                            allowBlank  : true,
                            hidden      : true,
                            displayField: 'artype',
                        },
                    ]
                },
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    bodyBorder: false,
                    defaults  : {
                        layout: 'hbox'
                    },
                    items: [
                        {
                            xtype    : 'tabpanel',
                            itemId   : 'panelDetailCoa',
                            name     : 'panel',
                            activeTab: 0,
                            region   : 'center',
                            layout   : 'hbox',
                            flex     : 1,
                            id       : 'TabVoucherId',
                            items    : [
                                {
                                    xtype   : 'detailvouchergrid',
                                    closable: false,
                                    name    : 'detailvouchergrid',
                                    title   : 'Detail Voucher ',
                                    flex    : 1,
                                    itemId  : 'tabDetailVoucher',
                                },
                                {
                                    xtype   : 'voucherardetailgrid',
                                    closable: false,
                                    name    : 'voucherardetail',
                                    title   : ' Account Receivable ',
                                    itemId  : 'tabAr',
                                    flex    : 1
                                },
                                {
                                    xtype   : 'voucherescrowdetailgrid',
                                    closable: false,
                                    hidden  : true,
                                    name    : 'voucherescrowdetail',
                                    title   : ' Account Receivable Escrow ',
                                    flex    : 1,
                                    itemId  : 'tabEscrow'
                                },
                                {
                                    xtype   : 'voucherotherpaymentgrid',
                                    closable: false,
                                    hidden  : true,
                                    name    : 'voucherotherpayment',
                                    title   : ' Others Payment',
                                    flex    : 1,
                                    itemId  : 'tabOthers'
                                }
                                ,{
                                    xtype   : 'vouchercashbonpaymentgrid',
                                    closable: false,
                                    hidden  : true,
                                    name    : 'vouchercashbonpayment',
                                    title   : 'Cashbon Payment',
                                    flex    : 1,
                                    itemId  : 'tabCashbon'
                                }
                                ,{
                                    xtype   : 'voucherattachmentdetailgrid',
                                    closable: false,
                                    hidden  : false,
                                    name    : 'voucherattachmentdetail',
                                    title   : 'Attachment',
                                    flex    : 1,
                                    itemId  : 'tabAttachment'
                                }
                                ,{
                                    xtype   : 'vouchernonlinkgrid',
                                    closable: false,
                                    hidden  : true,
                                    name    : 'vouchernonlink',
                                    title   : 'Non Link',
                                    flex    : 1,
                                    itemId  : 'tabNonlink'
                                }
                                ,{
                                    xtype   : 'voucherapprovaldetailgrid',
                                    closable: false,
                                    hidden  : true,
                                    name    : 'voucherapprovaldetail',
                                    title   : 'Approval Voucher Dept',
                                    flex    : 1,
                                    itemId  : 'tabApprovalDetail'
                                }
                                ,{
                                    xtype   : 'fieldcontainer',
                                    closable: false,
                                    hidden  : true,
                                    name    : 'formdatabankapproval',
                                    title   : 'Bank Approval',
                                    flex    : 1,
                                    itemId  : 'tabBankApproval',
                                    
                                    items: [
                                        {
                                            xtype     : 'textfield',
                                            name      : 'bank_trans_no',
                                            id        : 'bank_trans_no',
                                            itemId    : 'bank_trans_no',
                                            fieldLabel: 'Bank Trans No',
                                            width     : '100',
                                            allowBlank: true,
                                            readOnly  : true,
                                            hidden    : true,
                                        },
                                        {
                                            xtype     : 'textfield',
                                            name      : 'bank_reff_no',
                                            id        : 'bank_reff_no',
                                            itemId    : 'bank_reff_no',
                                            fieldLabel: 'Bank Reff No',
                                            width     : '100',
                                            allowBlank: true,
                                            readOnly  : true,
                                            hidden    : true,
                                        }
                                        ,
                                        {
                                            xtype     : 'fieldcontainer',
                                            layout    : 'hbox',
                                            bodyBorder: false,
                                            width     : 500,
                                            items     : [
                                                {
                                                    xtype           : 'combobox',
                                                    name            : 'fp_approver_0',
                                                    fieldLabel      : 'FC',
                                                    id              : 'fp_approver_0',
                                                    itemId          : 'fp_approver_0',
                                                    displayField    : 'user_fullname',
                                                    valueField      : 'user_id',
                                                    width           : '300',
                                                    queryMode       : 'local',
                                                    hidden          : true,
                                                    allowBlank      : true,
                                                    readOnly        : true,
                                                    msgTarget       : "side",
                                                    enforceMaxLength: true,
                                                    blankText       : 'This should not be blank!',
                                                },
                                                {
                                                    xtype : 'label',
                                                    forId : 'fp_approver_0_status',
                                                    id    : 'fp_approver_0_status',
                                                    itemId: 'fp_approver_0_status',
                                                    text  : ' ',
                                                    hidden: true,
                                                    style : {
                                                        color   : '#93c47d',
                                                        fontSize: '14px',
                                                        size    : '14px',
                                                        position: 'relative',
                                                        margin  : '0 -10 0 0'
                                                    },
                                                }
                                            ]
                                        }
                                        ,
                                        {
                                            xtype     : 'fieldcontainer',
                                            layout    : 'hbox',
                                            bodyBorder: false,
                                            width     : 500,
                                            items     : [
                                                {
                                                    xtype           : 'combobox',
                                                    name            : 'fp_approver_1',
                                                    fieldLabel      : 'Approver 1',
                                                    id              : 'fp_approver_1',
                                                    itemId          : 'fp_approver_1',
                                                    displayField    : 'user_fullname',
                                                    valueField      : 'user_id',
                                                    width           : '300',
                                                    queryMode       : 'local',
                                                    hidden          : true,
                                                    allowBlank      : true,
                                                    readOnly        : true,
                                                    msgTarget       : "side",
                                                    enforceMaxLength: true,
                                                    blankText       : 'This should not be blank!',
                                                },
                                                {
                                                    xtype : 'label',
                                                    forId : 'fp_approver_1_status',
                                                    id    : 'fp_approver_1_status',
                                                    itemId: 'fp_approver_1_status',
                                                    text  : ' ',
                                                    hidden: true,
                                                    style : {
                                                        color   : '#93c47d',
                                                        fontSize: '14px',
                                                        size    : '14px',
                                                        position: 'relative',
                                                        margin  : '0 -10 0 0'
                                                    },
                                                }
                                            ]
                                        },
                                        {
                                            xtype     : 'fieldcontainer',
                                            layout    : 'hbox',
                                            bodyBorder: false,
                                            width     : 500,
                                            items     : [
                                                {
                                                    xtype           : 'combobox',
                                                    name            : 'fp_approver_2',
                                                    fieldLabel      : 'Approver 2',
                                                    id              : 'fp_approver_2',
                                                    itemId          : 'fp_approver_2',
                                                    displayField    : 'user_fullname',
                                                    valueField      : 'user_id',
                                                    width           : '300',
                                                    queryMode       : 'local',
                                                    hidden          : true,
                                                    allowBlank      : true,
                                                    readOnly        : true,
                                                    msgTarget       : "side",
                                                    enforceMaxLength: true,
                                                    blankText       : 'This should not be blank!',
                                                },
                                                {
                                                    xtype : 'label',
                                                    forId : 'fp_approver_2_status',
                                                    id    : 'fp_approver_2_status',
                                                    itemId: 'fp_approver_2_status',
                                                    text  : ' ',
                                                    hidden: true,
                                                    style : {
                                                        color   : '#93c47d',
                                                        fontSize: '14px',
                                                        size    : '14px',
                                                        position: 'relative',
                                                        margin  : '0 -10 0 0'
                                                    },
                                                }
                                            ]
                                        },
                                        {
                                            xtype     : 'fieldcontainer',
                                            layout    : 'hbox',
                                            bodyBorder: false,
                                            width     : 500,
                                            items     : [
                                                {
                                                    xtype           : 'combobox',
                                                    name            : 'fp_approver_3',
                                                    fieldLabel      : 'Approver 3',
                                                    id              : 'fp_approver_3',
                                                    itemId          : 'fp_approver_3',
                                                    displayField    : 'user_fullname',
                                                    valueField      : 'user_id',
                                                    width           : '300',
                                                    queryMode       : 'local',
                                                    hidden          : true,
                                                    allowBlank      : true,
                                                    readOnly        : true,
                                                    msgTarget       : "side",
                                                    enforceMaxLength: true,
                                                    blankText       : 'This should not be blank!',
                                                },
                                                {
                                                    xtype : 'label',
                                                    forId : 'fp_approver_3_status',
                                                    id    : 'fp_approver_3_status',
                                                    itemId: 'fp_approver_3_status',
                                                    text  : ' ',
                                                    hidden: true,
                                                    style : {
                                                        color   : '#93c47d',
                                                        fontSize: '14px',
                                                        size    : '14px',
                                                        position: 'relative',
                                                        margin  : '0 -10 0 0'
                                                    },
                                                }
                                            ]
                                        },
                                        {
                                            xtype     : 'fieldcontainer',
                                            layout    : 'hbox',
                                            bodyBorder: false,
                                            width     : 500,
                                            items     : [
                                                {
                                                    xtype           : 'combobox',
                                                    name            : 'fp_approver_4',
                                                    fieldLabel      : 'Approver 4',
                                                    id              : 'fp_approver_4',
                                                    itemId          : 'fp_approver_4',
                                                    displayField    : 'user_fullname',
                                                    valueField      : 'user_id',
                                                    width           : '300',
                                                    queryMode       : 'local',
                                                    hidden          : true,
                                                    allowBlank      : true,
                                                    readOnly        : true,
                                                    msgTarget       : "side",
                                                    enforceMaxLength: true,
                                                    blankText       : 'This should not be blank!',
                                                },
                                                {
                                                    xtype : 'label',
                                                    forId : 'fp_approver_4_status',
                                                    id    : 'fp_approver_4_status',
                                                    itemId: 'fp_approver_4_status',
                                                    text  : ' ',
                                                    hidden: true,
                                                    style : {
                                                        color   : '#93c47d',
                                                        fontSize: '14px',
                                                        size    : '14px',
                                                        position: 'relative',
                                                        margin  : '0 -10 0 0'
                                                    },
                                                }
                                            ]
                                        },
                                        {
                                            xtype     : 'fieldcontainer',
                                            layout    : 'hbox',
                                            bodyBorder: false,
                                            width     : 500,
                                            items     : [
                                                {
                                                    xtype           : 'combobox',
                                                    name            : 'fp_approver_5',
                                                    fieldLabel      : 'Approver 5',
                                                    id              : 'fp_approver_5',
                                                    itemId          : 'fp_approver_5',
                                                    displayField    : 'user_fullname',
                                                    valueField      : 'user_id',
                                                    width           : '300',
                                                    queryMode       : 'local',
                                                    hidden          : true,
                                                    allowBlank      : true,
                                                    readOnly        : true,
                                                    msgTarget       : "side",
                                                    enforceMaxLength: true,
                                                    blankText       : 'This should not be blank!',
                                                },
                                                {
                                                    xtype : 'label',
                                                    forId : 'fp_approver_5_status',
                                                    id    : 'fp_approver_5_status',
                                                    itemId: 'fp_approver_5_status',
                                                    text  : ' ',
                                                    hidden: true,
                                                    style : {
                                                        color   : '#93c47d',
                                                        fontSize: '14px',
                                                        size    : '14px',
                                                        position: 'relative',
                                                        margin  : '0 -10 0 0'
                                                    },
                                                }
                                            ]
                                        },
                                        {
                                            xtype     : 'fieldcontainer',
                                            layout    : 'hbox',
                                            bodyBorder: false,
                                            width     : 500,
                                            items     : [
                                                {
                                                    xtype           : 'combobox',
                                                    name            : 'fp_approver_6',
                                                    fieldLabel      : 'Approver 6',
                                                    id              : 'fp_approver_6',
                                                    itemId          : 'fp_approver_6',
                                                    displayField    : 'user_fullname',
                                                    valueField      : 'user_id',
                                                    width           : '300',
                                                    queryMode       : 'local',
                                                    hidden          : true,
                                                    allowBlank      : true,
                                                    readOnly        : true,
                                                    msgTarget       : "side",
                                                    enforceMaxLength: true,
                                                    blankText       : 'This should not be blank!',
                                                },
                                                {
                                                    xtype : 'label',
                                                    forId : 'fp_approver_6_status',
                                                    id    : 'fp_approver_6_status',
                                                    itemId: 'fp_approver_6_status',
                                                    text  : ' ',
                                                    hidden: true,
                                                    style : {
                                                        color   : '#93c47d',
                                                        fontSize: '14px',
                                                        size    : '14px',
                                                        position: 'relative',
                                                        margin  : '0 -10 0 0'
                                                    },
                                                }
                                            ]
                                        },
                                        {
                                            xtype     : 'fieldcontainer',
                                            layout    : 'hbox',
                                            bodyBorder: false,
                                            width     : 500,
                                            items     : [
                                                {
                                                    xtype           : 'combobox',
                                                    name            : 'fp_approver_7',
                                                    fieldLabel      : 'Approver 7',
                                                    id              : 'fp_approver_7',
                                                    itemId          : 'fp_approver_7',
                                                    displayField    : 'user_fullname',
                                                    valueField      : 'user_id',
                                                    width           : '300',
                                                    queryMode       : 'local',
                                                    hidden          : true,
                                                    allowBlank      : true,
                                                    readOnly        : true,
                                                    msgTarget       : "side",
                                                    enforceMaxLength: true,
                                                    blankText       : 'This should not be blank!',
                                                },
                                                {
                                                    xtype : 'label',
                                                    forId : 'fp_approver_7_status',
                                                    id    : 'fp_approver_7_status',
                                                    itemId: 'fp_approver_7_status',
                                                    text  : ' ',
                                                    hidden: true,
                                                    style : {
                                                        color   : '#93c47d',
                                                        fontSize: '14px',
                                                        size    : '14px',
                                                        position: 'relative',
                                                        margin  : '0 -10 0 0'
                                                    },
                                                }
                                            ]
                                        },
                                        {
                                            xtype     : 'fieldcontainer',
                                            layout    : 'hbox',
                                            bodyBorder: false,
                                            width     : 500,
                                            items     : [
                                                {
                                                    xtype           : 'combobox',
                                                    name            : 'fp_approver_8',
                                                    fieldLabel      : 'Approver 8',
                                                    id              : 'fp_approver_8',
                                                    itemId          : 'fp_approver_8',
                                                    displayField    : 'user_fullname',
                                                    valueField      : 'user_id',
                                                    width           : '300',
                                                    queryMode       : 'local',
                                                    hidden          : true,
                                                    allowBlank      : true,
                                                    readOnly        : true,
                                                    msgTarget       : "side",
                                                    enforceMaxLength: true,
                                                    blankText       : 'This should not be blank!',
                                                },
                                                {
                                                    xtype : 'label',
                                                    forId : 'fp_approver_8_status',
                                                    id    : 'fp_approver_8_status',
                                                    itemId: 'fp_approver_8_status',
                                                    text  : ' ',
                                                    hidden: true,
                                                    style : {
                                                        color   : '#93c47d',
                                                        fontSize: '14px',
                                                        size    : '14px',
                                                        position: 'relative',
                                                        margin  : '0 -10 0 0'
                                                    },
                                                }
                                            ]
                                        },
                                        {
                                            xtype     : 'fieldcontainer',
                                            layout    : 'hbox',
                                            bodyBorder: false,
                                            width     : 500,
                                            items     : [
                                                {
                                                    xtype           : 'combobox',
                                                    name            : 'fp_releaser_1',
                                                    fieldLabel      : 'Releaser 1',
                                                    id              : 'fp_releaser_1',
                                                    itemId          : 'fp_releaser_1',
                                                    displayField    : 'user_fullname',
                                                    valueField      : 'user_id',
                                                    width           : '300',
                                                    queryMode       : 'local',
                                                    hidden          : true,
                                                    allowBlank      : true,
                                                    readOnly        : true,
                                                    msgTarget       : "side",
                                                    enforceMaxLength: true,
                                                    blankText       : 'This should not be blank!',
                                                },
                                                {
                                                    xtype : 'label',
                                                    forId : 'fp_releaser_1_status',
                                                    id    : 'fp_releaser_1_status',
                                                    itemId: 'fp_releaser_1_status',
                                                    text  : ' ',
                                                    hidden: true,
                                                    style : {
                                                        color   : '#93c47d',
                                                        fontSize: '14px',
                                                        size    : '14px',
                                                        position: 'relative',
                                                        margin  : '0 -10 0 0'
                                                    },
                                                }
                                            ]
                                        },
                                        {
                                            xtype     : 'fieldcontainer',
                                            layout    : 'hbox',
                                            bodyBorder: false,
                                            width     : 500,
                                            items     : [
                                                {
                                                    xtype           : 'combobox',
                                                    name            : 'fp_releaser_2',
                                                    fieldLabel      : 'Releaser 2',
                                                    id              : 'fp_releaser_2',
                                                    itemId          : 'fp_releaser_2',
                                                    displayField    : 'user_fullname',
                                                    valueField      : 'user_id',
                                                    width           : '300',
                                                    queryMode       : 'local',
                                                    hidden          : true,
                                                    allowBlank      : true,
                                                    readOnly        : true,
                                                    msgTarget       : "side",
                                                    enforceMaxLength: true,
                                                    blankText       : 'This should not be blank!',
                                                },
                                                {
                                                    xtype : 'label',
                                                    forId : 'fp_releaser_2_status',
                                                    id    : 'fp_releaser_2_status',
                                                    itemId: 'fp_releaser_2_status',
                                                    text  : ' ',
                                                    hidden: true,
                                                    style : {
                                                        color   : '#93c47d',
                                                        fontSize: '14px',
                                                        size    : '14px',
                                                        position: 'relative',
                                                        margin  : '0 -10 0 0'
                                                    },
                                                }
                                            ]
                                        },
                                    ]
                                }
                            ]
                        },
                    ]
                },
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    bodyBorder: false,
                    defaults  : {
                        layout: 'fit'
                    },
                    width: 300,
                    items: [
                        {
                            xtype            : 'xmoneyfield',
                            name             : 'sum_total_detail',
                            width            : 110,
                            hidden           : true,
                            emptyText        : 'SUM TOTAL ',
                            hideTrigger      : true,
                            keyNavEnabled    : false,
                            mouseWheelEnabled: false,
                            readOnly         : true,
                            allowBlank       : true,
                            enableKeyEvents  : true,
                            enforceMaxLength : true,
                            maxLength        : 50,                                               flex: 3, id: 'sum_total_detail',
                            fieldLabel       : 'Total Detail',
                            fieldStyle       : 'margin-left:-30px;text-align:right;align:right',
                        },
                        {
                            xtype: 'splitter',
                            flex : 2
                        },
                        {
                            xtype            : 'xmoneyfield',
                            name             : 'sum_tagihan',
                            width            : 112,
                            hidden           : false,
                            emptyText        : 'SUM PAY',
                            hideTrigger      : true,
                            keyNavEnabled    : false,
                            mouseWheelEnabled: false,
                            readOnly         : true,
                            allowBlank       : true,
                            enableKeyEvents  : true,
                            enforceMaxLength : true,
                            maxLength        : 50,              flex: 3, id: 'sum_tagihan',
                            fieldLabel       : 'Total Tagihan',
                            fieldStyle       : 'margin-left:-30px;text-align:right;align:right'
                        },
                        {
                            xtype            : 'xmoneyfield',
                            name             : 'sum_pay',
                            width            : 112,
                            hidden           : false,
                            emptyText        : 'SUM PAY',
                            hideTrigger      : true,
                            keyNavEnabled    : false,
                            mouseWheelEnabled: false,
                            readOnly         : true,
                            allowBlank       : true,
                            enableKeyEvents  : true,
                            enforceMaxLength : true,
                            maxLength        : 50,            flex: 3, id: 'sum_pay',
                            fieldLabel       : 'Total Pay',
                            fieldStyle       : 'margin-left:-30px;text-align:right;align:right'
                        },
                        {
                            xtype            : 'xmoneyfield',
                            name             : 'sum_final',
                            width            : 110,
                            hidden           : false,
                            emptyText        : 'SUM FINAL',
                            hideTrigger      : true,
                            keyNavEnabled    : false,
                            mouseWheelEnabled: false,
                            readOnly         : true,
                            allowBlank       : true,
                            enableKeyEvents  : true,
                            enforceMaxLength : true,
                            maxLength        : 50,            flex: 3, id: 'sum_final',
                            fieldLabel       : 'Total Final',
                            fieldStyle       : 'margin-left:-30px;text-align:right;align:right'
                        },
                    ]
                },
            ],
        });

        me.callParent(arguments);
    },
    generateDockedItem: function () {
        var me = this;
        var x  = [
            {
                xtype : 'toolbar',
                dock  : 'bottom',
                ui    : 'footer',
                layout: {
                    padding: 6,
                    type   : 'hbox'
                },
                items: [
                    {
                        xtype     : 'button',
                        action    : 'savenew',
                        itemId    : 'btnSaveNew',
                        padding   : 5,
                        width     : 105,
                        iconCls   : 'icon-save',  text: 'Save & New',
                        bindAction: me.bindPrefixName + 'Create'
                    },
                    {
                        xtype  : 'button',
                        action : 'saveprint',
                        itemId : 'btnSavePrint',
                        padding: 5,
                        width  : 105,
                        iconCls: 'icon-print',
                        text   : 'Save & Print'
                    },
                    {
                        xtype     : 'button',
                        action    : 'save',
                        itemId    : 'btnSave',
                        padding   : 5,
                        width     : 75,        iconCls: 'icon-save',
                        text      : 'Save',
                        bindAction: me.bindPrefixName + 'Create'
                    },
                    {
                        xtype: 'splitter',
                        width: '5'
                    },
                    {
                        xtype : 'label',
                        forId : 'labelPpndtpId',
                        id    : 'labelPpndtpId',
                        itemId: 'labelPpndtpId',
                        text  : '',
                        style : {
                            color   : '#ff0000',
                            fontSize: '30px',
                            size    : '30px',
                            position: 'relative',
                            margin  : '-5 0 0 0'
                        },
                    },
                    {
                        xtype: 'tbspacer',
                        flex : 1
                    },
                    {
                        xtype  : 'button',
                        action : 'cancel',
                        itemId : 'btnCancel',
                        padding: 5,
                        width  : 75,
                        iconCls: 'icon-cancel',
                        text   : 'Close',
                        handler: function () {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    },
});

