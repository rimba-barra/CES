Ext.define('Erems.view.popuphargadatastock.FormSearch', {
    extend        : 'Erems.library.template.view.FormSearch',
    alias         : 'widget.popuphargadatastockformsearch',
    initComponent : function () {
        var me = this;
        
        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype            : 'textfield',
                    itemId           : 'fs_unit_number',
                    name             : 'unit_number',
                    fieldLabel       : 'Unit number',
                    enforceMaxLength : true,
                    maskRe           : /[^\`\"\']/,
                    maxLength        : 20,
                    anchor           : '-170'
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
                    xtype  : 'typecombobox',
                    itemId : 'fs_type_id',
                    name   : 'type_id',
                    anchor :'-15',
                    listeners:{
                        beforequery: function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
                },
                {
                    xtype  : 'positioncombobox',
                    itemId : 'fs_position_id',
                    name   : 'position_id',
                    anchor :'-15',
                    listeners:{
                        beforequery: function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
                },
                {
                    xtype  : 'productcategorycombobox',
                    itemId : 'fs_productcategory_id',
                    name   : 'productcategory_id',
                    anchor :'-15',
                    listeners:{
                        beforequery: function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
                },
                {
                    xtype  : 'sidecombobox',
                    itemId : 'fs_side_id',
                    name   : 'side_id',
                    anchor :'-15',
                    listeners:{
                        beforequery: function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
                },
                {
                    xtype  : 'purposecombobox',
                    itemId : 'fs_purpose_id',
                    name   : 'purpose_id',
                    anchor :'-15',
                    listeners:{
                        beforequery: function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
                },
                {
                    xtype  : 'unitstatuscombobox',
                    itemId : 'fs_unitstatus_id',
                    name   : 'unitstatus_id',
                    anchor :'-15',
                    listeners:{
                        beforequery: function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
                },
                me.createFieldRange({fieldLabel:'Progress',textName:'progress',rangeSeparator:'s/d',tailText:''})
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});