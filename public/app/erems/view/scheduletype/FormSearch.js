Ext.define('Erems.view.scheduletype.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    alias:'widget.scheduletypeformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
               
                {
                    xtype: 'textfield',
                    itemId: 'fsms_name',
                    name: 'scheduletype',
                    fieldLabel: 'Schedule type',
                    enforceMaxLength: true,
                    maskRe: /[^\`"\']/,
                    maxLength: 50
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