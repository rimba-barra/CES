Ext.define('Erems.view.masterreward.FormSearch', {
    extend: 'Erems.library.template.view.FormSearch',
    alias: 'widget.masterrewardformsearch',
    initComponent: function () {
        var me = this;

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
           
            items: [
                
                {
                    xtype: 'textfield',
                    name: 'code',
                    fieldLabel: 'Code'
                },
               
               
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
