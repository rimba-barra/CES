Ext.define('Hrd.view.absenttype.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.absenttypeformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'absenttype',
                    fieldLabel:'Absent Type'
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