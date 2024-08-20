Ext.define('Erems.view.masterformula.FormSearch', {
    extend: 'Erems.library.template.view.FormSearch',
    alias: 'widget.masterformulaformsearch',
    requires:[
              'Erems.library.template.component.Pricetypecombobox'
            ],
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'textfield',
                    itemId: 'fsms_code',
                    name: 'code',
                    fieldLabel: 'Code',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50
                },
                {
                    xtype: 'pricetypecombobox',
                    itemId: 'fs_pricetype_id',
                    name: 'pricetype_id',
                    fieldLabel: 'Price type',
                    maxLength: 50,
                    anchor:'-50'
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});