Ext.define('Hrd.view.scoringbsc.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.scoringbscformsearch',
    requires: [],
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'textfield',
                    name: 'year',
                    fieldLabel: 'Year',
                    readOnly: false,
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});