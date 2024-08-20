Ext.define('Hrd.view.masterworklocation.FormData', {
    alias: 'widget.masterworklocationformdata',
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
                    name:'worklocation_id'
                },
                {
                    fieldLabel:'Name',
                    width:450,
                    name:'worklocation'
                },
                {
                    xtype:'textareafield',
                    cols:50,
                    fieldLabel:'Description',
                    name:'description'
                },
                
                
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});