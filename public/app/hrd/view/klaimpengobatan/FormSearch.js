Ext.define('Hrd.view.klaimpengobatan.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.klaimpengobatanformsearch',
    requires: ['Hrd.template.ComboBoxFields'],
    initComponent: function() {
        var me = this;

        var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    name:'year',
                    fieldLabel:'Year'
                }
            ],
            dockedItems:[]
        });

        me.callParent(arguments);
    }
});