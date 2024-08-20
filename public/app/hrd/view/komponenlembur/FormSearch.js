Ext.define('Hrd.view.komponenlembur.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.komponenlemburformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'komponenlembur',
                    fieldLabel:'Description'
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});