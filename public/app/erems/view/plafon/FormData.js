Ext.define('Erems.view.plafon.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.plafonformdata',
    // requires: ['Erems.library.template.component.Facilitiestypecombobox'],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    editedRow: -1,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                //labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_id',
                    name: 'plafon_id'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_code',
                    name: 'plafon',
                    fieldLabel: 'Plafon',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50,
                    anchor: '-5'
                },
               
                {
                    xtype: 'numberfield',
                    name: 'persen_desc',
                    fieldLabel: 'Percent',
                    width:200,
                    value: 0,
                    minValue: 1,
                    maxValue:100,
                    allowBlank: false,
                },
                {
                    xtype: 'checkboxfield',
                    fieldLabel: 'Default',
                    name: 'is_default',
                    inputValue: '1',
                    uncheckedValue: '0',
                    width: 20
                }, ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

