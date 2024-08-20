Ext.define('Erems.view.popupfakturtagihan.FormSearch', {
    extend        : 'Erems.library.template.view.FormSearch',
    alias         : 'widget.popupfakturtagihanformsearch',
    initComponent : function () {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype      : 'textfield',
                    itemId     : 'fs_unit_number',
                    name       : 'unit_number',
                    fieldLabel : 'Unit Number'
                },
                {
                    xtype  : 'clustercombobox',
                    itemId : 'fs_cluster_id',
                    name   : 'cluster_id',
                    anchor :'-15',
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