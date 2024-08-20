Ext.define('Hrd.view.masterkategorisk.FormData', {
    alias: 'widget.masterkategoriskformdata',
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
                    name:'masterkategorisk_id'
                },
                {
                    fieldLabel:'Name',
                    width:400,
                    name:'name'
                }
                
                
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});