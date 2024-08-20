Ext.define('Hrd.view.competencywawancara.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.competencywawancaraformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'pertanyaan_wawancara',
                    fieldLabel:'Interview Questions'
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Competency Name',
                    name: 'competency_name_id',
                    displayField: 'competency_name',
                    valueField: 'competency_name_id',
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Banding',
                    name: 'banding_id',
                    displayField: 'banding',
                    valueField: 'banding_id',
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Competency Level',
                    name: 'level_category_id',
                    displayField: 'level_category',
                    valueField: 'level_category_id',
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});