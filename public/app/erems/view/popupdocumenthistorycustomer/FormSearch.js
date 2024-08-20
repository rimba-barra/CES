Ext.define('Erems.view.popupdocumenthistorycustomer.FormSearch', {
    extend        : 'Erems.library.template.view.FormSearch',
    alias         : 'widget.popupdocumenthistorycustomerformsearch',
    initComponent : function () {
        var me = this;

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'textfield',
                    itemId: 'fsms_name',
                    name: 'name',
                    fieldLabel: 'User Download',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});