Ext.define('Erems.view.masterbankkpr.browse.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    alias:'widget.masterbankkprbrowseformsearch',
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
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});