Ext.define('Cashier.view.vendor.FormDataEmail', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.vendoremailformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 230,
    bodyBorder: true,
    bodyPadding: 10,
    kosongGa: -1,
    selectedIndex: null,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' : ',
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
                    name: 'vendor_id',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'vendor_email_id',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'active',
                    value: 1
                },
                {
                    xtype: 'textfield',
                    name: 'seq_no',
                    fieldLabel: 'Sequence',
                    emptyText: 'Auto Generated',
                    anchor: '50%',
                    readOnly: true,
                    labelWidth: 150
                },
                {
                    xtype: 'textfield',
                    name: 'email',
                    allowBlank: false,
                    fieldLabel: 'Email Address',
                    anchor: '99%',
                    labelWidth: 150,
                    margin: '0 0 5 0',
                    vtype: 'email'
                },
                {
                    xtype: 'textareafield',
                    name: 'remarks',
                    allowBlank: true,
                    fieldLabel: 'Notes',
                    anchor: '99%',
                    labelWidth: 150
                }
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

