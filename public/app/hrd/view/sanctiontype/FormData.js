Ext.define('Hrd.view.sanctiontype.FormData', {
    alias: 'widget.sanctiontypeformdata',
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
                    name:'sanctiontype_id'
                },
                {
                    fieldLabel:'Sanction Type',
                    name:'sanctiontype'
                },
                {
                    fieldLabel:'Description',
                    name:'description'
                }
                
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});