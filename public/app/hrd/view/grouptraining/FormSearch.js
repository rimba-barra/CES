Ext.define('Hrd.view.grouptraining.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.grouptrainingformsearch',
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
                    name:'code',
                    fieldLabel:'Code'
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});