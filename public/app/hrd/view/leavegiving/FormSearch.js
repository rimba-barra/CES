Ext.define('Hrd.view.leavegiving.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.leavegivingformsearch',
    requires: ['Hrd.template.combobox.Department', 'Hrd.view.leavegiving.GridEmployee'],
    collapsed: false,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            
            items: [
                me.templateNameAndDepartment()
                
            ],
            dockedItems: []
        });

        me.callParent(arguments);
    }
});