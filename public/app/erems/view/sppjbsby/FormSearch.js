Ext.define('Erems.view.sppjbsby.FormSearch', {
    extend: 'Erems.library.template.view.FormSearch',
    alias: 'widget.sppjbsbyformsearch',
    initComponent: function () {
        var me = this;

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
           
            items: [
                
                {
                    xtype: 'textfield',
                    name: 'sppjb_no',
                    fieldLabel: 'Nomor SPPJB'
                },
               
               
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});