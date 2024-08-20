Ext.define('Erems.view.utilitytypeb.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    requires:[],
    alias:'widget.utilitytypebformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'textfield',
                   
                    name: 'utilitytype',
                    fieldLabel: 'Name',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 20
                },
                {
                    xtype: 'textfield',
                    
                    name: 'description',
                    fieldLabel: 'Description',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 100
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
