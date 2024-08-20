Ext.define('Erems.view.popupakadkredit.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    requires:[],
    alias:'widget.popupakadkreditformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'textfield',
                   
                    name: 'unit_number',
                    fieldLabel: 'Unit Number',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                   
                },
                {
                    xtype: 'textfield',
                    
                    name: 'name',
                    fieldLabel: 'Customer Name',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/
                },
                
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
