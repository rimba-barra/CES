Ext.define('Erems.view.batasplafon.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    alias:'widget.batasplafonformsearch',
    requires: ['Erems.template.ComboBoxFields'],
    initComponent: function() {
        var me = this;
        var cbf = new Erems.template.ComboBoxFields();
        
        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype:'combobox',
                    name: 'plafon_plafon_id',
                    displayField: cbf.plafon.d,
                    valueField: cbf.plafon.v,
                    // editable:false,
                    fieldLabel:'Plafon',
                    typeAhead: true,
                    queryMode: 'local',
                    lastQuery: '',
                    forceSelection:true,
                    listeners:{
                        beforequery: function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
                },
                {
                    xtype: 'numberfield',
                    name: 'persen_desc',
                    fieldLabel: 'Percent',
                    width:200,
                    value: 0,
                    allowBlank: false,
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
