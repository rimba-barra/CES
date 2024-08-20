Ext.define('Hrd.view.leavesubmission.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.leavesubmissionformsearch',
    requires: [],
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