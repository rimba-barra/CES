Ext.define('Hrd.view.division.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.divisionformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'division',
                    fieldLabel:'Division Name'
                },
                {
                    name:'code',
                    fieldLabel:'Code'
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});