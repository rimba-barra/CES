Ext.define('Hrd.view.mastergaji.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.mastergajiformsearch',
    requires: ['Hrd.template.combobox.Department','Hrd.view.mastergaji.GridEmployee'],
    collapsed: false,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield',
                margin:'0 0 10 0'
            },
            items: [],
            dockedItems:[]
        });

        me.callParent(arguments);
    }
});