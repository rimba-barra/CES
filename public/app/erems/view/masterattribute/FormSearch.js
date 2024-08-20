Ext.define('Erems.view.masterattribute.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    requires:['Erems.library.template.component.Atttypecombobox'],
    alias:'widget.masterattributeformsearch',
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
                },{
                    xtype: 'atttypecombobox',
                    itemId: 'fs_masterattribute_atttype',
                    name: 'atttype_id',
                  
                    fieldLabel: 'Attribute type',
                    anchor:'-100'
                 
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_name',
                    name: 'attribute',
                    fieldLabel: 'Attribute Name',
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
