Ext.define('Erems.view.marketingstock.SelectUnitFormSearch', {
    extend        : 'Erems.library.template.view.FormSearch',
    alias         : 'widget.selectunitformsearch',
    initComponent : function() {
        var me = this;

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults : me.generateDefaults(),
            items    : [
                {
                    fieldLabel : 'Unit Number',
                    xtype      : 'textfield',
                    name       : 'unit_number'
                },
                {
                    xtype        : 'combobox',
                    fieldLabel   : 'Cluster',
                    displayField : cbf.cluster.d,
                    valueField   : cbf.cluster.v,
                    name         : 'cluster_cluster_id'
                },
                {
                    xtype        : 'combobox',
                    fieldLabel   : 'Block',
                    displayField : cbf.block.d,
                    valueField   : cbf.block.v,
                    name         : 'block_block_id'
                },
                {
                    xtype        : 'combobox',
                    fieldLabel   : 'Type',
                    displayField : cbf.type.d,
                    valueField   : cbf.type.v,
                    name         : 'type_type_id'
                },
                {
                    xtype        : 'combobox',
                    fieldLabel   : 'Position',
                    displayField : cbf.position.d,
                    valueField   : cbf.position.v,
                    name         : 'position_position_id'
                },
                {
                    xtype        : 'combobox',
                    fieldLabel   : 'Product Category',
                    displayField : cbf.productcategory.d,
                    valueField   : cbf.productcategory.v,
                    name         : 'productcategory_productcategory_id'
                },
                {
                    xtype        : 'combobox',
                    fieldLabel   : 'Side Direction',
                    displayField : cbf.side.d,
                    valueField   : cbf.side.v,
                    name         : 'side_side_id'
                },
            ],
            dockedItems : me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});