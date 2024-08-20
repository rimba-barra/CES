Ext.define('Cashier.view.vdposting.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.vdpostingformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 500,
    bodyBorder: true,
    bodyPadding: 10,
    uniquename: '_voucherposting',
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    id: 'project_id' + me.uniquename,
                    name: 'project_id',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'voucher_id' + me.uniquename,
                    name: 'voucher_id',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'voucher_id' + me.uniquename,
                    name: 'voucher_id',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'kasbank_id' + me.uniquename,
                    name: 'kasbank_id',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'status' + me.uniquename,
                    name: 'status',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'prefixdept' + me.uniquename,
                    name: 'prefixdept',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'postingname' + me.uniquename,
                    name: 'postingname',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'projectname',
                    name: 'projectname',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'vendorcode',
                    name: 'vendorcode',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'coa_id' + me.uniquename,
                    name: 'coa_id',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'fixed_coa' + me.uniquename,
                    name: 'fixed_coa',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'prefix_id' + me.uniquename,
                    name: 'prefix_id',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'kasbondept_id' + me.uniquename,
                    name: 'kasbondept_id',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'ptname',
                    name: 'ptname',
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'ptusercombobox',
                            fieldLabel: 'Pt/Company',
                            itemId: 'fd_pt_id' + me.uniquename,
                            id: 'pt_id' + me.uniquename,
                            name: 'pt_id',
                            width: 350,
                            emptyText: 'Pt / Company',
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '80'
                        },
                        {
                            xtype: 'label',
                            forId: 'lblstatus',
                            text: 'Status',
                            width: 100,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'label',
                            forId: 'lblstatus',
                            text: '',
                            style: {
                                color: '#ff0000'
                            },
                            itemId: 'fd_lblstatus' + me.uniquename,
                            id: 'lblstatus' + me.uniquename,
                            name: 'lblstatus',
                            width: 100,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'departmentcombobox',
                            fieldLabel: 'Department',
                            itemId: 'fd_department_id' + me.uniquename,
                            id: 'department_id' + me.uniquename,
                            name: 'department_id',
                            width: 350,
                            emptyText: 'Department',
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '80'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Reg Date',
                            itemId: 'fd_voucher_date' + me.uniquename,
                            id: 'voucher_date' + me.uniquename,
                            name: 'voucher_date',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 250,
                            emptyText: 'Manual Input',
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'employeehrdcombobox',
                            fieldLabel: 'Approve By',
                            itemId: 'fd_approveby' + me.uniquename,
                            id: 'approveby_id' + me.uniquename,
                            name: 'approveby_id',
                            width: 350,
                            emptyText: 'Approve By',
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '80'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Reg No',
                            itemId: 'fd_voucher_no' + me.uniquename,
                            id: 'voucher_no' + me.uniquename,
                            name: 'voucher_no',
                            emptyText: 'Auto Value',
                            width: 250,
                            readOnly: true,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Data flow',
                            defaultType: 'radiofield',
                            defaults: {
                                flex: 2
                            },
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel: 'IN TRANS',
                                    name: 'dataflow',
                                    inputValue: 'I',
                                    id: 'radio1_b123',
                                    allowBlank: false,
                                    checked: false,
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    boxLabel: 'OUT TRANS',
                                    name: 'dataflow',
                                    inputValue: 'O',
                                    id: 'radio2_b123',
                                    allowBlank: false,
                                    checked: true,
                                }
                            ]
                        },
                        {
                            xtype: 'splitter',
                            width: '150'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Due Date',
                            itemId: 'fd_due_date' + me.uniquename,
                            id: 'due_date' + me.uniquename,
                            name: 'due_date',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 260,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'tipevendorvouchercombobox',
                            fieldLabel: 'Type Vendor',
                            itemId: 'fd_type_vendor' + me.uniquename,
                            id: 'type_vendor' + me.uniquename,
                            name: 'type_vendor',
                            width: 300,
                            emptyText: 'Select Type Data Vendor',
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            forceSelection: false,
                            typeAhead: false,
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'vendorcombobox',
                            fieldLabel: 'Vendor',
                            itemId: 'fd_vendor_id' + me.uniquename,
                            id: 'vendor_id' + me.uniquename,
                            name: 'vendor_id',
                            width: 350,
                            emptyText: 'Select Vendor',
                            readOnly: false,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                    ]
                },
                 {
                    xtype: 'currencycombobox',
                    fieldLabel: 'Currency',
                    itemId: 'fd_currency_word' + me.uniquename,
                    id: 'currency_word' + me.uniquename,
                    name: 'currency_word',
                    anchor: '50%',
                    width: 300,
                    emptyText: 'Select Currency',
                    readOnly: true,
                    allowBlank: true,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'xmoneyfield',
                            minValue: 0,
                            itemId: 'fs_amount' + me.uniquename,
                            name: 'amount',
                            id: 'amount' + me.uniquename,
                            fieldLabel: 'Amount',
                            emptyText: 'Manual Input',
                            width: 350,
                            // Remove spinner buttons, and arrow key and mouse wheel listeners
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            readOnly: false,
                            allowBlank: false,
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maxLength: 30,
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'textareafield',
                            itemId: 'fdms_description' + me.uniquename,
                            id: 'description' + me.uniquename,
                            name: 'description',
                            fieldLabel: 'Description',
                            allowBlank: false,
                            enforceMaxLength: true,
                            grow: true,
                            width: 750,
                        },
                    ]
                },
                {
                    // Fieldset in Column 1
                    xtype: 'fieldset',
                    id: 'fieldsetkasbondept' + me.uniquename,
                    name: 'fieldsetkasbondept',
                    title: 'Cashbon Department Information',
                    collapsible: false,
                    defaults: {anchor: '100%'},
                    layout: 'vbox',
                    padding: '10 0 0 10', //(top, right, bottom, left).
                    items: [
                        {
                            xtype: 'splitter',
                            width: '10'
                        },

                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'CA Dept No.',
                                    itemId: 'fd_kasbondept_no' + me.uniquename,
                                    id: 'kasbondept_no' + me.uniquename,
                                    name: 'kasbondept_no',
                                    emptyText: 'Auto Value',
                                    width: 250,
                                    readOnly: true,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'splitter',
                                    width: '250'
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'CA Dept Date',
                                    itemId: 'fd_kasbondept_date' + me.uniquename,
                                    id: 'kasbondept_date' + me.uniquename,
                                    name: 'kasbondept_date',
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    width: 250,
                                    emptyText: 'Manual Input',
                                    readOnly: true,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                            ]
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'xmoneyfield',
                                    fieldLabel: 'CA Dept Amount Request',
                                    itemId: 'fd_kasbondept_amount' + me.uniquename,
                                    id: 'kasbondept_amount' + me.uniquename,
                                    name: 'kasbondept_amount',
                                    emptyText: 'Auto Value',
                                    width: 250,
                                    readOnly: true,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'splitter',
                                    width: '250'
                                },
                                {
                                    xtype: 'textareafield',
                                    fieldLabel: 'CA Dept Description',
                                    itemId: 'fd_kasbondept_description' + me.uniquename,
                                    id: 'kasbondept_description' + me.uniquename,
                                    name: 'kasbondept_description',
                                    width: 250,
                                    emptyText: 'Auto Value',
                                    allowBlank: true,
                                    readOnly: true,

                                },
                            ]
                        },
                    ]
                },
                {
                    // Fieldset in Column 1
                    xtype: 'fieldset',
                    title: 'FOR CASHIER',
                    collapsible: false,
                    defaults: {anchor: '100%'},
                    layout: 'vbox',
                    padding: '10 0 0 10', //(top, right, bottom, left).
                    items: [
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Cashier Voucher Date',
                                    itemId: 'fd_cashier_voucher_date' + me.uniquename,
                                    id: 'cashier_voucher_date' + me.uniquename,
                                    name: 'cashier_voucher_date',
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    width: 250,
                                    emptyText: 'Manual Input',
                                    allowBlank: false,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'statuscombobox',
                                    fieldLabel: 'Cash / Bank',
                                    itemId: 'fd_kasbank' + me.uniquename,
                                    id: 'kasbank',
                                    name: 'kasbank',
                                    width: 250,
                                    emptyText: 'Cash / Bank',
                                    readOnly: false,
                                    allowBlank: false,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'splitter',
                                    width: '250'
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Cheque Giro Date',
                                    itemId: 'fd_chequegiro_date' + me.uniquename,
                                    id: 'chequegiro_date' + me.uniquename,
                                    name: 'chequegiro_date',
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    width: 250,
                                    emptyText: 'Manual Input',
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                            ]
                        },

                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [

                                {
                                    xtype: 'voucherprefixcombobox',
                                    fieldLabel: 'Prefix - Voucher No.',
                                    itemId: 'fd_voucherprefix_id' + me.uniquename,
                                    id: 'voucherprefix_id' + me.uniquename,
                                    name: 'voucherprefix_id',
                                    emptyText: '',
                                    width: 250,
                                    readOnly: false,
                                    allowBlank: false,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null,
                                    matchFieldWidth: false,
                                    tpl: Ext.create('Ext.XTemplate',
                                            '<table class="x-grid-table" width="500px" >',
                                            '<tr class="x-grid-row">',
                                            '<th width="100px"><div class="x-column-header x-column-header-inner">Prefix</div></th>',
                                            '<th width="100px"><div class="x-column-header x-column-header-inner">Coa</div></th>',
                                            '<th width="500px"><div class="x-column-header x-column-header-inner">Description</div></th>',
                                            '</tr>',
                                            '<tpl for=".">',
                                            '<tr class="x-boundlist-item">',
                                            '<td ><div class="x-grid-cell x-grid-cell-inner">{prefix}</div></td>',
                                            '<td ><div class="x-grid-cell x-grid-cell-inner">{coa}</div></td>',
                                            '<td ><div class="x-grid-cell x-grid-cell-inner">{coaname}</div></td>',
                                            '</tr>',
                                            '</tpl>',
                                            '</table>'
                                            ),
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: '',
                                    itemId: 'fd_coa' + me.uniquename,
                                    id: 'coa' + me.uniquename,
                                    name: 'coa',
                                    emptyText: 'Auto Value',
                                    width: 134,
                                    readOnly: true,
                                    allowBlank: true,
                                },
                                {
                                    xtype: 'splitter',
                                    width: '108'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Cheque Giro No.',
                                    itemId: 'fd_chequegiro_no' + me.uniquename,
                                    id: 'chequegiro_no' + me.uniquename,
                                    name: 'chequegiro_no',
                                    emptyText: 'Auto Value',
                                    width: 250,
                                    readOnly: false,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'textareafield',
                                    itemId: 'fdms_cashier_note' + me.uniquename,
                                    id: 'cashier_note' + me.uniquename,
                                    name: 'cashier_note',
                                    fieldLabel: 'Cashier Note',
                                    allowBlank: false,
                                    enforceMaxLength: true,
                                    grow: true,
                                    width: 400,
                                },
                                {
                                    xtype: 'splitter',
                                    width: '100'
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: 'vbox',
                                    bodyBorder: false,
                                    defaults: {
                                        layout: 'fit'
                                    },
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            fieldLabel: 'Handover Cheque /Giro',
                                            itemId: 'fd_chequegiro_handover_date' + me.uniquename,
                                            id: 'chequegiro_handover_date' + me.uniquename,
                                            name: 'chequegiro_handover_date',
                                            format: 'd-m-Y',
                                            submitFormat: 'Y-m-d',
                                            width: 250,
                                            emptyText: 'Manual Input',
                                            allowBlank: true,
                                            enforceMaxLength: true,
                                            enableKeyEvents: true,
                                            rowdata: null
                                        },
                                        {
                                            xtype: 'splitter',
                                            width: '10'
                                        },
                                        {
                                            xtype: 'splitter',
                                            width: '10'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Cashier Voucher No.',
                                            itemId: 'fd_cashier_voucher_no' + me.uniquename,
                                            id: 'cashier_voucher_no' + me.uniquename,
                                            name: 'cashier_voucher_no',
                                            emptyText: 'Auto Value',
                                            width: 250,
                                            readOnly: true,
                                            allowBlank: false,
                                            enforceMaxLength: true,
                                            enableKeyEvents: true,
                                            rowdata: null
                                        },
                                    ]
                                },
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'tabpanel',
                            itemId: 'voucherrequesttab',
                            name: 'voucherrequesttab',
                            width: 750,
                            height: 200,
                            activeTab: 0,
                            defaults: {layout: 'fit'},
                            items: [
                                {
                                    title: 'DETAIL COA',
                                    xtype: 'vdpostinggriddetail',
                                    name: 'gridtabdetail',
                                    id: 'gridtabdetail',
                                    readOnly: false,
                                },
                                {
                                    title: 'DETAIL SUB COA',
                                    xtype: 'vdpostinggridsubdetail',
                                    name: 'gridtabsubdetail',
                                    id: 'gridtabsubdetail',
                                    readOnly: false,
                                },
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
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                padding: '0 0 0 0',
                layout: {
                    padding: 6,
                    type: 'hbox',
                },
                items: [
                    {
                        xtype: 'fieldcontainer',
                        layout: 'vbox',
                        align: 'right',
                        bodyBorder: false,
                        defaults: {
                            layout: 'fit'
                        },
                        items: [
                            {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                align: 'right',
                                bodyBorder: false,
                                defaults: {
                                    layout: 'fit'
                                },
                                items: [
                                    {
                                        xtype: 'splitter',
                                        width: '20'
                                    },
                                    {
                                        xtype: 'xmoneyfield',
                                        anchor: '100%',
                                        itemId: 'fd_totaldetail_1qwe',
                                        id: 'totaldetail_1qwe',
                                        name: 'totaldetail',
                                        fieldLabel: 'Total Detail',
                                        emptyText: 'Auto Value',
                                        width: 240,
                                        value: 0,
                                        hideTrigger: true,
                                        keyNavEnabled: false,
                                        mouseWheelEnabled: false,
                                        enforceMaxLength: true,
                                        readOnly: true,
                                        allowBlank: false,
                                        enableKeyEvents: true,
                                        rowdata: null
                                    },
                                    {
                                        xtype: 'splitter',
                                        width: '20'
                                    },
                                    {
                                        xtype: 'xmoneyfield',
                                        anchor: '100%',
                                        itemId: 'fd_balance_1qwe',
                                        id: 'balance_1qwe',
                                        name: 'balance',
                                        fieldLabel: 'Balance',
                                        emptyText: 'Auto Value',
                                        value: 0,
                                        width: 240,
                                        hideTrigger: true,
                                        keyNavEnabled: false,
                                        mouseWheelEnabled: false,
                                        enforceMaxLength: true,
                                        readOnly: true,
                                        allowBlank: false,
                                        enableKeyEvents: true,
                                        rowdata: null},
                                ]
                            },
                            {xtype: 'tbspacer', height: 5},
                            {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                align: 'right',
                                bodyBorder: false,
                                defaults: {
                                    layout: 'fit'
                                },
                                items: [
                                    {
                                        xtype: 'button',
                                        action: 'detaildesc',
                                        itemId: 'btnDetailDesc',
                                        padding: 5,
                                        width: 150,
                                        iconCls: 'icon-plus',
                                        text: 'Detail Description'
                                    },
                                    {
                                        xtype: 'splitter',
                                        width: '400'
                                    },
                                    {
                                        xtype: 'button',
                                        action: 'posting',
                                        itemId: 'btnPosting',
                                        padding: 5,
                                        width: 75,
                                        iconCls: '',
                                        text: 'Posting'
                                    },
                                    {
                                        xtype: 'button',
                                        action: 'save',
                                        itemId: 'btnSave',
                                        padding: 5,
                                        width: 75,
                                        iconCls: 'icon-save',
                                        text: 'Save'
                                    },
                                    {
                                        xtype: 'button',
                                        action: 'cancel',
                                        itemId: 'btnCancel',
                                        padding: 5,
                                        width: 75,
                                        iconCls: 'icon-cancel',
                                        text: 'Cancel',
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

