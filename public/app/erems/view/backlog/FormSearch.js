Ext.define('Erems.view.backlog.FormSearch', {
    extend: 'Erems.library.template.view.FormSearch',
    alias: 'widget.backlogformsearch',
    requires: [
        'Erems.library.template.component.Clustercombobox'
    ],
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Unit Number',
                    itemId: 'unit_number',
                    name: 'unit_unit_number'
                },
                {
                    xtype: 'clustercombobox',
                    itemId: 'fs_cluster_id',
                    name: 'cluster_cluster',
                    anchor:'-15',
                    forceSelection:true,
                    listeners:{
                        beforequery: function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
