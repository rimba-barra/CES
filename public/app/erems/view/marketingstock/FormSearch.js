Ext.define('Erems.view.marketingstock.FormSearch',{
    extend        :'Erems.library.template.view.FormSearch',
    alias         :'widget.marketingstockformsearch',
    initComponent : function() {
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
                    xtype        : 'combobox',   
                    name         : 'cluster_id',
                    fieldLabel   : 'Cluster',
                    displayField : cbf.cluster.d,
                    valueField   : cbf.cluster.v,
                    anchor       :'-15',
                    queryMode    : 'local',
                    renderTo     : Ext.getBody(),
                    listeners    : {
                        beforequery: function (record) {
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
                },
                {
                    xtype           : 'combobox',   
                    name            : 'block_id',
                    fieldLabel      : 'Block name',
                    displayField    : cbf.block.d,
                    valueField      : cbf.block.v,
                    anchor          :'-15',
                    queryMode    : 'local',
                    renderTo     : Ext.getBody(),
                    listeners    : {
                        beforequery: function (record) {
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
                },
                {
                    xtype           : 'combobox',   
                    name            : 'type_id',
                    fieldLabel      : 'Type',
                    displayField    : cbf.type.d,
                    valueField      : cbf.type.v,
                    anchor          :'-15',
                    queryMode    : 'local',
                    renderTo     : Ext.getBody(),
                    listeners    : {
                        beforequery: function (record) {
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
                },
                {
                    xtype           : 'combobox',   
                    name            : 'position_id',
                    fieldLabel      : 'Position',
                    displayField    : cbf.position.d,
                    valueField      : cbf.position.v,
                    anchor          :'-15',
                    queryMode    : 'local',
                    renderTo     : Ext.getBody(),
                    listeners    : {
                        beforequery: function (record) {
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
                },
                {
                    xtype           : 'combobox',   
                    name            : 'productcategory_id',
                    fieldLabel      : 'Product Category',
                    displayField    : cbf.productcategory.d,
                    valueField      : cbf.productcategory.v,
                    anchor          :'-15',
                    queryMode    : 'local',
                    renderTo     : Ext.getBody(),
                    listeners    : {
                        beforequery: function (record) {
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
                },
                {
                    xtype           : 'combobox',   
                    name            : 'side_id',
                    fieldLabel      : 'Side direction',
                    displayField    : cbf.side.d,
                    valueField      : cbf.side.v,
                    anchor          :'-15',
                    queryMode    : 'local',
                    renderTo     : Ext.getBody(),
                    listeners    : {
                        beforequery: function (record) {
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
                },
                {
                    xtype           : 'combobox',   
                    name            : 'purpose_id',
                    fieldLabel      : 'Purpose use',
                    displayField    : cbf.purpose.d,
                    valueField      : cbf.purpose.v,
                    anchor          :'-15',
                    queryMode    : 'local',
                    renderTo     : Ext.getBody(),
                    listeners    : {
                        beforequery: function (record) {
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
                },
                {
                    xtype           : 'combobox',
                    name            : 'unitstatus_id',
                    fieldLabel      : 'Unit Status',
                    displayField    : cbf.unitstatus.d,
                    valueField      : cbf.unitstatus.v,
                    anchor          :'-15',
                    queryMode    : 'local',
                    renderTo     : Ext.getBody(),
                    listeners    : {
                        beforequery: function (record) {
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