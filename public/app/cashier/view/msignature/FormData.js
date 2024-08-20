Ext.define('Cashier.view.msignature.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.msignatureformdata',
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
                    name: 'signature_id',
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_signature_name',
                    name: 'signature_name',
                    fieldLabel: 'Signature Name',
                    allowBlank: false,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 100,
                },
                {
                    xtype: 'mddircombobox',
                    name: 'position',
                    fieldLabel: 'Position',
                    enableKeyEvents: true,
                    allowBlank: false,
                    enforceMaxLength: true,
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_max_range',
                    name: 'max_range',
                    fieldLabel: 'Maximal Range Amount ',
                    allowBlank: false,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 50,
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_signature_note',
                    name: 'signature_note',
                    fieldLabel: 'Note',
                    allowBlank: false,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 255,
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

