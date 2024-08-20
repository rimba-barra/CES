Ext.define('Hrd.view.contohjobfamily.FormData', {
    alias: 'widget.contohjobfamilyformdata',
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
                    name:'contoh_jobfamily_id'
                },
                {
                    fieldLabel:'Job Role',
                    width:400,
                    name:'contoh_pekerjaan'
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Job Family',
                    name: 'jobfamily_id',
                    width:400,
                    displayField: 'jobfamily',
                    valueField: 'jobfamily_id',
                }
                
                
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});