Ext.define('Hrd.view.grouppayroll.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.grouppayrollformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'grouppayroll',
                    fieldLabel:'Group Payroll Name'
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