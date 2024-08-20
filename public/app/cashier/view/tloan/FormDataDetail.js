Ext.define('Cashier.view.tloan.FormDataDetail', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.tloandetailformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 300,
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
                    name: 'statedata',
                     id: 'statedata_wasddssa',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'loan_id',
                    id: 'loan_id_qaadff',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'loanpayment_id',
                    id: 'loanpayment_id_qaadff',
                },
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
                            xtype: 'textfield',
                            fieldLabel: 'No.',
                            itemId: 'fd_payment_no',
                            id: 'payment_no_as',
                            name: 'payment_no',
                            emptyText: 'Auto Number',
                            width: 190,
                            readOnly: true,
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
                            xtype: 'datefield',
                            fieldLabel: 'Payment Date',
                            itemId: 'fd_payment_date255',
                            id: 'payment_date_24',
                            name: 'payment_date',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 300,
                            readOnly: false,
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
                            xtype: 'paymenttypecombobox',
                            fieldLabel: 'Payment Type',
                            itemId: 'fd_type_qe',
                            id: 'type_qad',
                            name: 'type',
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
                            xtype: 'xmoneyfield',
                            minValue: 0,
                            itemId: 'fs_amount_skilm',
                            name: 'amount',
                            id: 'amount_skilm',
                            fieldLabel: 'Amount',
                            emptyText: 'Manual Input',
                            width: 300,
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
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'textareafield',
                            itemId: 'fdms_description_wcvsdf',
                            id: 'description_wsdfghj',
                            name: 'description',
                            fieldLabel: 'Description',
                            allowBlank: true,
                            enforceMaxLength: true,
                            grow: true,
                            width: 784,
                        },
                    ]
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

