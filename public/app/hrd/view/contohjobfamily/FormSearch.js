Ext.define('Hrd.view.contohjobfamily.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.contohjobfamilyformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'contoh_pekerjaan',
                    fieldLabel:'Job Role'
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Job Family',
                    name: 'jobfamily_id',
                    displayField: 'jobfamily',
                    valueField: 'jobfamily_id',
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});