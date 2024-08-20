Ext.define('Erems.view.mastergaransi.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    alias:'widget.mastergaransiformsearch',
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
                    maskRe: /[^\`"\']/,
                    maxLength: 50
                },
                {
                    xtype      : 'xnamefieldEST',
                    itemId     : 'fsms_name',
                    name       : 'guaranteetype',
                    fieldLabel : 'Guarantee Type',
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_description',
                    name: 'description',
                    fieldLabel: 'Description',
                    enforceMaxLength: true,
                    maskRe: /[^\`"\']/,
                    maxLength: 50
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});