Ext.define('Erems.view.gantinama.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    alias:'widget.gantinamaformsearch',
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
                   
                },
                {
                    xtype: 'textfield',
                    name: 'purchaseletter_purchaseletter_no',
                    fieldLabel: 'Purchaseletter No',
                    enforceMaxLength: true,
                    maskRe: /[^\`"\']/,
                },
               
                {
                    xtype            : 'xnamefieldEST',
                    name             : 'customer_name',
                    fieldLabel       : 'Customer Name',
                    enforceMaxLength : true,
                   
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});