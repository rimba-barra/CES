Ext.define('Hrd.view.personalhistory.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.personalhistoryformsearch',
    requires: ['Hrd.template.combobox.Department', 'Hrd.view.personalhistory.GridEmployee'],
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