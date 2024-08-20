Ext.define('Erems.view.masterkomisi.FormSearch', {
    extend: 'Erems.library.template.view.FormSearch',
    alias: 'widget.masterkomisiformsearch',
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
