Ext.define('Erems.view.projectfacilities.FormSearch', {
    extend: 'Erems.library.template.view.FormSearch',
   // requires:['Erems.library.template.component.Facilitiestypecombobox'],
    alias: 'widget.projectfacilitiesformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'textfield',
                    itemId: 'projectfacilities_code',
                    name: 'code',
                    fieldLabel: 'Code',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50
                },
                {
                    xtype: 'textfield',
                    itemId: 'projectfacilities_projectfacilities',
                    name: 'projectfacilities',
                    fieldLabel: 'Facilities',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50
                },
                {
                    xtype: 'textfield',
                    itemId: 'projectfacilities_description',
                    name: 'description',
                    fieldLabel: 'Description',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50
                }
               /* {
                    xtype: 'facilitiestypecombobox',
                    itemId: 'projectfacilities_facilitiestype',
                    name: 'facilitiestype_id',
                  
                    fieldLabel: 'Facilities Type'
                 
                }*/
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
