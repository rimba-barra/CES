Ext.define('Erems.view.masterproductcategory.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    alias:'widget.masterproductcategoryformsearch',
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
                    xtype: 'textfield',
                    itemId: 'fsms_name',
                    name: 'productcategory',
                    fieldLabel: 'Product Category',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_description',
                    name: 'description',
                    fieldLabel: 'Description',
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
