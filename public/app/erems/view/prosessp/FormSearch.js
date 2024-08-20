Ext.define('Erems.view.prosessp.FormSearch', {
    extend: 'Erems.library.template.view.FormSearch',
    alias: 'widget.prosesspformsearch',
    requires: ['Erems.template.ComboBoxFields'],
    initComponent: function() {
        var me = this;

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {
                xtype: 'combobox',
                labelWidth:75,
                width:'100%'
            },
            items: [
                {
                    xtype:'combobox',
                    name: 'jenis_sp',
                    store: new Ext.data.ArrayStore({
                        fields: [
                            'number',
                            'text'
                        ],
                        data: [[9999, 'ALL'],[1, 'SP 1'],[2, 'SP 2'],[3, 'SP 3'],[4, 'SP 4']]
                    }),
                    fieldLabel: 'Jenis SP',
                    displayField: 'text',
                    valueField: 'number',
                    value:9999
                },
                
                {
                    xtype:'textfield',
                    name:'unit_number',
                    fieldLabel:'Unit Number'
                }
               
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});