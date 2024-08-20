Ext.define('Hrd.view.ubahstatus.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.ubahstatusformsearch',
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
            dockedItems:[]
        });

        me.callParent(arguments);
    }
});