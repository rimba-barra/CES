Ext.define('Cashier.view.vdapprove.FormDataDesc', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.vdapprovedescformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 300,
    bodyBorder: true,
    bodyPadding: 10,
    uniquename: '_voucherapprovedatadesc',
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
                    id: 'hideparam' + me.uniquename,
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'statedata',
                    id: 'statedata' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'voucher_id',
                    id: 'voucher_id' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'voucherdesc_id',
                    id: 'voucherdesc_id' + me.uniquename,
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
                            name: 'indexdata',
                            id: 'indexdata' + me.uniquename,
                            fieldLabel: 'Index',
                            width: 200,
                            readOnly: true,
                            allowBlank: false,
                        },
                        {
                            xtype: 'numberfield',
                            anchor: '100%',
                            fieldLabel: 'Posting No.',
                            itemId: 'fd_posting_no' + me.uniquename,
                            id: 'posting_no' + me.uniquename,
                            name: 'posting_no',
                            emptyText: 'Manual Input',
                            value: 0,
                            maxLength: 3,
                            width: 200,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: true,
                            readOnly: false,
                            allowBlank: false,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Receipt No.',
                            itemId: 'fd_receipt_no' + me.uniquename,
                            id: 'receipt_no' + me.uniquename,
                            name: 'receipt_no',
                            value: 0,
                            maxLength: 3,
                            width: 200,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: true,
                            readOnly: false,
                            allowBlank: false,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Code.',
                            itemId: 'fd_code' + me.uniquename,
                            id: 'code' + me.uniquename,
                            name: 'code',
                            emptyText: 'Manual Input',
                            width: 180,
                            maxLength: 10,
                            readOnly: false,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'textareafield',
                            fieldLabel: 'Description',
                            itemId: 'fd_description' + me.uniquename,
                            id: 'description' + me.uniquename,
                            name: 'description',
                            emptyText: '',
                            width: 600,
                            grow: true,
                            readOnly: false,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                    ]
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

