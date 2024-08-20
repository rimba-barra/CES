Ext.define('Hrd.view.listperformancemanagement.FormData', {
    alias: 'widget.listperformancemanagementformdata',
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
                    xtype: 'hiddenfield',
                    name: 'employee_id',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'periode',
                },
                {
                    xtype        : 'combobox',
                    fieldLabel   : 'Update Status',                    
                    itemId       : 'fd_subholding',
                    name         : 'updatestatus_id',
                    displayField : 'updatestatus_name',
                    valueField   : 'updatestatus_sp',    
                    emptyText    : 'Select Update Status',
                anchor: '100%'
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});