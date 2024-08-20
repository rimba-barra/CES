Ext.define('Cashier.view.vdposting.FormLookupvouhcer', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.vdpostingformlookupvoucher',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 550,
    bodyBorder: true,
    bodyPadding: 10,
    uniquename: '_vdpostingformlookupvoucher',
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    requires: ['Cashier.view.vdposting.Gridlookupvoucher'],
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
                    id: 'hideparam' + me.uniquename,
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
                    id: 'pt_id' + me.uniquename,
                    name: 'pt_id',
                },
                 {
                    xtype: 'hiddenfield',
                    id: 'prefix_id' + me.uniquename,
                    name: 'prefix_id',
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
                    id: 'dataflow' + me.uniquename,
                    name: 'dataflow',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'made_by' + me.uniquename,
                    name: 'made_by',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'amount' + me.uniquename,
                    name: 'amount',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'description' + me.uniquename,
                    name: 'description',
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    style: 'background-color: #88ade8;',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit',
                        padding: '10 10 10 10', //(top, right, bottom, left).
                    },
                    items: [
                        {
                            xtype: 'label',
                            forId: 'lbltotal',
                            name: 'lbltotal',
                            text: 'Total : ',
                            width: 120,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,

                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'label',
                            forId: 'lbloption',
                            name: 'lbloption',
                            text: 'Option Selection Posting Voucher',
                            width: 200,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '450',
                        },
                        {
                            xtype: 'button',
                            action: 'ok',
                            itemId: 'btnOk',
                            width: 75,
                            iconCls: '',
                            text: 'Ok',
                            iconCls: 'icon-save',
                        },
                        {
                            xtype: 'button',
                            action: 'cancel',
                            itemId: 'btnCancel',
                            width: 75,
                            iconCls: '',
                            text: 'Cancel',
                            iconCls: 'icon-cancel',
                        },
                    ]
                },
                {
                    // Fieldset in Column 1
                    xtype: 'fieldset',
                    title: 'Option Selection Posting Voucher',
                    collapsible: false,
                    defaults: {anchor: '100%'},
                    layout: 'vbox',
                    padding: '0 0 0 10', //(top, right, bottom, left).
                    items: [

                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit',
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
                                    width: '20',
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Tgl Vch. Cashier',
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
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit',
                            },
                            items: [
                                 {
                                    xtype: 'voucherprefixcombobox',
                                    fieldLabel: 'Prefix Cashier',
                                    itemId: 'fd_voucherprefix_id' + me.uniquename,
                                    id: 'voucherprefix_id' + me.uniquename,
                                    name: 'voucherprefix_id',
                                    emptyText: '',
                                    width: 250,
                                    readOnly: false,
                                    allowBlank: false,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10',
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
                                    width: '5',
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
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit',
                            },
                            items: [
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
                                {
                                    xtype: 'splitter',
                                    width: '20',
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
                                {
                                    xtype: 'splitter',
                                    width: '70',
                                },
                                {
                                    xtype: 'departmentcombobox',
                                    fieldLabel: 'Department',
                                    itemId: 'fd_department_id' + me.uniquename,
                                    id: 'department_id' + me.uniquename,
                                    name: 'department_id',
                                    width: 300,
                                    emptyText: 'Department',
                                    readOnly: false,
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
                                layout: 'fit',
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
                                {
                                    xtype: 'splitter',
                                    width: '70',
                                },
                                {
                                    xtype: 'vendornotecombobox',
                                    fieldLabel: 'Note of Vendor',
                                    itemId: 'fd_vendor_note' + me.uniquename,
                                    id: 'vendor_note' + me.uniquename,
                                    name: 'vendor_note',
                                    anchor: '50%',
                                    width: 300,
                                    emptyText: 'Select Vendor Note',
                                    readOnly: false,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                            ]
                        },
                        {
                            xtype: 'label',
                            forId: 'lblntracuti',
                            text: 'Check for Process',
                        },
                        {
                            xtype: 'vdpostinggridlookupselected',
                            height: 270,
                            width: 900,
                            style: 'padding: 10 0 10 0'
                        }
                    ]

                },
            ],
            dockedItems: {

            }
        });

        me.callParent(arguments);
    }
});

