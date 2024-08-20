Ext.define('Erems.view.popupdenda.FormSearch', {
    extend: 'Erems.library.template.view.FormSearch',
    alias: 'widget.popupdendaformsearch',
    requires: [
        'Erems.library.template.component.Clustercombobox',
        'Erems.library.template.component.Pricetypecombobox'
    ],
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Unit Number',
                    itemId: 'fs_unit_number',
                    name: 'unit_number',
                    anchor:'-15'
                },
                {
                    xtype: 'clustercombobox',
                    itemId: 'fs_cluster_id',
                    name: 'cluster_id',
                    anchor:'-15',
                    forceSelection:true,
                    listeners:{
                        beforequery: function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
                },
                {
                    xtype: 'pricetypecombobox',
                    itemId: 'fs_pricetype_id',
                    name: 'pricetype_id',
                    anchor:'-15',
                    forceSelection:true,
                    listeners:{
                        beforequery: function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }

                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
