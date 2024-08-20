Ext.define('Cashier.view.subvouchersetup.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.subvouchersetupformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 240,
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
                    name: 'subvoucher_id',
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
                            fieldLabel: 'Code',
                            itemId: 'fd_subvoucher_code',
                            id: 'subvoucher_code',
                            name: 'subvoucher_code',
                            width: 200,
                            maxLength: 10,
                            emptyText: 'Code',
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
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            itemId: 'fd_active',
                            name: 'active',
                            boxLabel: 'Active',
                            padding: '0 0 0 0',
                            margin: '0 0 0 0',
                            boxLabelCls: 'x-form-cb-label small',
                            inputValue: '1',
                            uncheckedValue: '0',
                            checked: true
                        },
                    ]
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Name',
                    itemId: 'fd_subvoucher_name',
                    id: 'subvoucher_name',
                    name: 'subvoucher_name',
                    maxLength: 50,
                    emptyText: 'Name',
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Description',
                    itemId: 'fd_subvoucher_desc',
                    id: 'subvoucher_desc',
                    name: 'subvoucher_desc',
                    maxLength: 255,
                    emptyText: 'Description',
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

