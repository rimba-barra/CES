Ext.define('Erems.view.masterpricelist.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    requires:[],
    alias:'widget.masterpricelistformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'textfield',
                    name: 'keterangan',
                    fieldLabel: 'Keterangan',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 150
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
