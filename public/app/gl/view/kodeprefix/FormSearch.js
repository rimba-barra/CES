Ext.define('Gl.view.kodeprefix.FormSearch', {
    extend: 'Gl.library.template.view.FormSearch',
    alias: 'widget.kodeprefixformsearch',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'search'
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Cash Flow',
                    defaultType: 'radiofield',
                    defaults: {
                        flex: 1
                    },
                    layout: 'hbox',
                    items: [
                        {
                            boxLabel: 'Yes',
                            name: 'is_cashflow',
                            inputValue: '1',
                            id: 'radio1'
                        },
                        {
                            boxLabel: 'No',
                            name: 'is_cashflow',
                            inputValue: '0',
                            id: 'radio2'
                        }
                    ]


                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Cashier',
                    defaultType: 'radiofield',
                    defaults: {
                        flex: 1
                    },
                    layout: 'hbox',
                    items: [
                        {
                            boxLabel: 'Yes',
                            name: 'is_cashier',
                            inputValue: '1',
                            id: 'radio3'
                        },
                        {
                            boxLabel: 'No',
                            name: 'is_cashier',
                            inputValue: '0',
                            id: 'radio4'
                        }
                    ]


                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_prefix',
                    name: 'prefix',
                    fieldLabel: 'Prefix',
                    enforceMaxLength: true,
                    maxLength: 50,
                    enableKeyEvents: true
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_openmonth',
                    name: 'openmonth',
                    fieldLabel: 'Open Month',
                    enforceMaxLength: true,
                    maxLength: 50,
                    enableKeyEvents: true
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_description',
                    name: 'description',
                    fieldLabel: 'Description',
                    enforceMaxLength: true,
                    maxLength: 50,
                    enableKeyEvents: true
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
