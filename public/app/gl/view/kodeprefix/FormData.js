Ext.define('Gl.view.kodeprefix.FormData', {
    extend: 'Gl.library.template.view.FormData',
    alias: 'widget.kodeprefixformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                //labelAlign: 'top',
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
                    itemId: 'fdms_prefix_id',
                    name: 'prefix_id'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_prefix',
                    name: 'prefix',
                    fieldLabel: 'Prefix',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50,
                    anchor: '-5',
                    enableKeyEvents: true,
                    absoluteReadOnly: true,
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_description',
                    name: 'description',
                    fieldLabel: 'Description',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50,
                    anchor: '-5'
                },
                {
                    xtype: 'checkboxfield',
                    anchor: '100%',
                    fieldLabel: '',
                    boxLabel: 'Cash Flow',
                    itemId: 'fdms_is_cashflow',
                    name: 'is_cashflow',
                    checked: true,
                    inputValue: '1',
                    uncheckedValue: '0',
                    //readOnly: true
                },
                {
                    xtype: 'checkboxfield',
                    anchor: '100%',
                    fieldLabel: '',
                    boxLabel: 'Cashier',
                    itemId: 'fdms_is_cashier',
                    name: 'is_cashier',
                    checked: false,
                    inputValue: '1',
                    uncheckedValue: '0',
                    //readOnly: true
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_openmonth',
                    name: 'openmonth',
                    fieldLabel: 'Open Month',
                    allowBlank: true,
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 2,
                    anchor: '-5',
                    enableKeyEvents: true
            },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

