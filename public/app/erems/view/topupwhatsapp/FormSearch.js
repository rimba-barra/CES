Ext.define('Erems.view.topupwhatsapp.FormSearch', {
    extend: 'Erems.library.template.view.FormSearch',
    requires: ['Erems.template.ComboBoxFields'],
    alias: 'widget.topupwhatsappformsearch',
    initComponent: function() {
        var me = this;
        var cbf = new Erems.template.ComboBoxFields();
        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'textfield',
                    itemId: 'user_fullname',
                    name: 'user_fullname',
                    fieldLabel: 'User',
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
