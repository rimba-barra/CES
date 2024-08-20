Ext.define('Erems.view.townplanning.browseunit.SUnitFormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    requires: ['Erems.library.template.component.Typecombobox',
        'Erems.library.template.component.Productcategorycombobox',
        'Erems.library.template.component.Clustercombobox',
        'Erems.library.template.component.Blockcombobox',
        'Erems.library.template.component.Purposecombobox'],
    alias:'widget.sunitformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'textfield',
                    itemId: 'fs_unit_number',
                    name: 'unit_number',
                    fieldLabel: 'Kavling number',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 5,
                    anchor:'-170'
                },{
                    xtype: 'clustercombobox',
                    itemId: 'fs_cluster_id',
                    name: 'cluster_id',
                    anchor:'-15'

                },
                {
                    xtype: 'blockcombobox',
                    itemId: 'fs_block_id',
                    name: 'block_id',
                    anchor:'-15'

                },{
                    xtype: 'typecombobox',
                    itemId: 'fs_type_id',
                    name: 'type_id',
                    anchor:'-15'

                },{
                    xtype: 'productcategorycombobox',
                    itemId: 'fs_produccategory_id',
                    name: 'productcategory_id',
                    anchor:'-15'

                },{
                    xtype: 'purposecombobox',
                    itemId: 'fs_purpose_id',
                    name: 'purpose_id',
                    anchor:'-15'

                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});