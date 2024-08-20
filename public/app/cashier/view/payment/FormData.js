Ext.define('Cashier.view.payment.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.paymentformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 500,
    bodyBorder: true,
    bodyPadding: 10,
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
                    name: 'kasbank_id',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'payment_id',
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
                            itemId: 'fd_pt_id_zxcc',
                            id: 'pt_id_ccc',
                            name: 'pt_id',
                            width: 500,
                            emptyText: 'Pt / Company',
                            readOnly: true,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'inoutcombobox',
                            fieldLabel: 'Data Flow',
                            itemId: 'fs_dataflow_111d1',
                            id: 'dataflow_111s1',
                            name: 'dataflow',
                            width: 200,
                            readOnly: true,
                            emptyText: 'Auto Value',
                            enforceMaxLength: true,
                            enableKeyEvents: true
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
                            xtype: 'datefield',
                            fieldLabel: 'Accept Date',
                            itemId: 'fd_accept_date',
                            id: 'accept_date_1111',
                            name: 'accept_date',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 300,
                            emptyText: 'Auto Value',
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Trans No',
                            itemId: 'fd_transno_111d1',
                            id: 'transno_111s1',
                            name: 'transno',
                            width: 180,
                            readOnly: true,
                            emptyText: 'Auto Value',
                            enforceMaxLength: true,
                            enableKeyEvents: true
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
                            xtype: 'voucherprefixcombobox',
                            fieldLabel: 'Prefix - Voucher No.',
                            itemId: 'fd_voucherprefix_qwer',
                            id: 'voucherprefix_id_qwer',
                            name: 'voucherprefix_id',
                            emptyText: '',
                            width: 300,
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '',
                            itemId: 'fd_voucher_no_qwer',
                            id: 'voucher_no_qwer',
                            name: 'voucher_no',
                            emptyText: 'Voucher No',
                            width: 190,
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
                            xtype: 'textfield',
                            fieldLabel: 'Cheque / Giro No.',
                            itemId: 'fs_chequegiro_no_1123',
                            id: 'chequegiro_no_1112',
                            name: 'chequegiro_no',
                            emptyText: 'Auto Value',
                            readOnly: false,
                            width: 720,
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
                            xtype: 'datefield',
                            fieldLabel: 'Chequegiro Date',
                            itemId: 'fd_chequegiro_date',
                            id: 'chequegiro_date_wwwwww',
                            name: 'chequegiro_date',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 300,
                            emptyText: 'Auto Value',
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'groupcombobox',
                            fieldLabel: 'Group Trans',
                            itemId: 'fd_grouptrans_id_wwwww',
                            id: 'grouptrans_id_eeess',
                            name: 'grouptrans_id',
                            emptyText: '',
                            width: 400,
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
                            xtype: 'textareafield',
                            itemId: 'fdms_description_wsd',
                            id: 'description_wsd',
                            name: 'description',
                            fieldLabel: 'Description',
                            allowBlank: true,
                            enforceMaxLength: true,
                            grow: true,
                            width: 720,
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
                            fieldLabel: 'Departement',
                            itemId: 'fd_department_id_wsc',
                            id: 'department_id_wsc',
                            name: 'department_id',
                            emptyText: '',
                            width: 500,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'accuredcombobox',
                            fieldLabel: 'Accured',
                            itemId: 'fd_chequegiro_accured_ws',
                            id: 'chequegiro_accured_sdd',
                            name: 'chequegiro_accured',
                            emptyText: '',
                            width: 180,
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
                            xtype: 'xmoneyfield',
                            minValue: 0,
                            itemId: 'fs_amount_sw',
                            name: 'amount',
                            id: 'amount_1s1',
                            fieldLabel: 'Amount',
                            emptyText: 'Auto Value',
                            width: 500,
                            // Remove spinner buttons, and arrow key and mouse wheel listeners
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            readOnly: false,
                            allowBlank: true,
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maxLength: 20,
                        },
                    ]
                },
                {
                    // Fieldset in Column 1
                    xtype: 'fieldset',
                    title: 'FOR DETAIL',
                    collapsible: false,
                    defaults: {anchor: '100%'},
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'paymentcoadetailgrid',
                            itemId: 'fd_paymentcoadetailgrid',
                            id: 'paymentcoadetailgrid_ww',
                            name: 'paymentcoadetailgrid',
                            title: 'Data Detail',
                            width: '98%',
                            height: 200,
                            padding: '20px 0 0 20px',
                        },
                    ]
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

