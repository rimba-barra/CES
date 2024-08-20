Ext.define('Erems.view.openticket.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    alias:'widget.openticketformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
               
                {
                    xtype: 'textfield',
                    itemId: 'fsms_name',
                    name: 'subject',
                    fieldLabel: 'Subject Name',
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
