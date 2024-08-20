Ext.define('Erems.view.popupdendasystem.FormSearch', {
    extend        : 'Erems.library.template.view.FormSearch',
    alias         : 'widget.popupdendasystemformsearch',
    initComponent : function () {
        var me = this;

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype      : 'textfield',
                    itemId     : 'fs_unit_number',
                    name       : 'unit_number',
                    fieldLabel : 'Unit Number',
                    enableKeyEvents : true,
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
                {
                    xtype  : 'blockcombobox',
                    itemId : 'fs_block_id',
                    name   : 'block_id',
                    anchor :'-15',
                    listeners:{
                        beforequery: function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
                },
                {
                    xtype      : 'textfield',
                    itemId     : 'fs_customer_name',
                    name       : 'customer_name',
                    fieldLabel : 'Customer Name',
                    enableKeyEvents : true,
                },
                {
                    xtype          : 'checkboxfield',
                    itemId         : 'btnCheckAllData',
                    name           : 'check_all_data',
                    fieldLabel     : 'All Data',
                    checked        : false,
                    inputValue     : '1',
                    uncheckedValue : '0'
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});