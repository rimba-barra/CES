Ext.define('Hrd.view.parametertlk.FormData', {
    alias: 'widget.parametertlkformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: [],
    frame: true,
    autoScroll: true,
    editedRow:-1,
    deletedData:{},
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults:{
                xtype:'textfield'
            },
            items: [
                {
                    xtype:'hiddenfield',
                    name:'parametertlk_id'
                },
                {
                    fieldLabel:'Code',
                    name:'code'
                },
                {
                    fieldLabel:'Project Name',
                    name:'name'
                }
                
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});