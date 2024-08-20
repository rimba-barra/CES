Ext.define('Cashier.view.payment.Formviewdata', {
    extend: 'Ext.form.Panel',
    alias: 'widget.paymentformview',
    autoScroll: false,
    bodyBorder: false,
    border: false,
    bodyPadding: 0,
    bodyStyle: 'background-color:#dfe8f5;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'label',
                    forId: 'previewdata',
                    text: 'PREVIEW DATA',
                    margin: '0 0 0 10'
                },
                {xtype: 'tbspacer', height: 10},
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    id: 'hideparam_qwe',
                    itemId: 'hideparam_qwe',
                    value: 'viewdata'
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Transaction Type',
                    bodyBorder: false,
                    border: false,
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'inoutcombobox',
                            fieldLabel: '',
                            itemId: 'fs_dataflow_1111',
                            id: 'dataflow_1111',
                            name: 'dataflow',
                            width: 100,
                            emptyText: 'Auto Value',
                            enforceMaxLength: true,
                            enableKeyEvents: true
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: '',
                    bodyBorder: false,
                    border: false,
                    defaults: {
                        flex: 4
                    },
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'xmoneyfield',
                            minValue: 0,
                            itemId: 'fs_amount',
                            name: 'amount',
                            id: 'amount_111',
                            fieldLabel: 'Amount',
                            emptyText: 'Auto Value',
                            width: 400,
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
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Cheque / Giro No.',
                            itemId: 'fs_chequegiro_no',
                            id: 'chequegiro_no_1111',
                            name: 'chequegiro_no',
                            emptyText: 'Auto Value',
                            readOnly: false,
                            width: 400,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Cheque Giro Date',
                            itemId: 'fs_chequegiro_date',
                            id: 'chequegiro_date_1111',
                            name: 'chequegiro_date',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 400,
                            emptyText: 'Auto Value',
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Description',
                            itemId: 'fs_description',
                            id: 'description_111',
                            name: 'description',
                            emptyText: 'Auto Value',
                            readOnly: false,
                            width: 400,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'departmentcombobox',
                            fieldLabel: 'Departement',
                            itemId: 'fs_department_id_1111',
                            id: 'department_id_1111',
                            name: 'department_id',
                            emptyText: '',
                            width: 400,
                            readOnly: false,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'paymentgridview',
                            itemId: 'fs_paymentgridview',
                            id: 'paymentgridview_fs',
                            name: 'paymentgridview',
                            title: 'Vendor Data',
                            width: '100%',
                            height: 200,
                            padding: '20px 0 0 20px',
                        },
                        {
                            xtype: 'fieldcontainer',
                            bodyBorder: false,
                            border: false,
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Made By',
                                    itemId: 'fs_made_by_1111',
                                    id: 'made_by_11111',
                                    name: 'made_by',
                                    width: 220,
                                    emptyText: 'Auto Value',
                                    enforceMaxLength: true,
                                    enableKeyEvents: true
                                },
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Made Date',
                                    itemId: 'fs_addon',
                                    id: 'addon_1111',
                                    name: 'addon',
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    width: 220,
                                    emptyText: 'Auto Value',
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            bodyBorder: false,
                            border: false,
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Approved ',
                                    itemId: 'fs_approveby_1111',
                                    id: 'approveby_11111',
                                    name: 'approveby',
                                    width: 220,
                                    emptyText: 'Auto Value',
                                    enforceMaxLength: true,
                                    enableKeyEvents: true
                                },
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Approve Date',
                                    itemId: 'fs_approvedate',
                                    id: 'approvedate_1111',
                                    name: 'approvedate',
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    width: 220,
                                    emptyText: 'Auto Value',
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                            ]
                        },
                    ]
                },
                {
                    // Fieldset in Column 1
                    xtype: 'fieldset',
                    title: 'Payment Status',
                    collapsible: false,
                    defaults: {anchor: '100%'},
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Payment Date',
                            itemId: 'fd_chequegiro_payment_date_ws',
                            id: 'chequegiro_payment_date_sss',
                            name: 'chequegiro_payment_date',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 200,
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
                            xtype: 'button',
                            action: 'pay',
                            itemId: 'btnPay',
                            padding: 5,
                            width: 75,
                            icon: 'app/main/images/icons/payment.png',
                            text: 'Pay'
                        },
                    ]
                },
            ],
        });
        me.callParent(arguments);
    },
});
