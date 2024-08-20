Ext.define('Erems.view.hpptanah.FormSearch', {
    extend: 'Erems.library.template.view.FormSearch',
    alias: 'widget.hpptanahformsearch',
    initComponent: function () {
        var me = this;

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            items: [{
                    fieldLabel:'Unit Number',
                    name:'unit_unit_number',
                    enableKeyEvents: true
            }],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
