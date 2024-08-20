Ext.define('Cashier.view.mtest.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.mtestformdata',
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
                    name: 'test_id',
                },

                {
                    xtype: 'textfield',
                    itemId: 'fdms_test1',
                    name: 'test1',
                    fieldLabel: 'Test 1',
                    allowBlank: false,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 50,
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_test2',
                    name: 'test2',
                    fieldLabel: 'Test 2',
                    allowBlank: false,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 50,
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

