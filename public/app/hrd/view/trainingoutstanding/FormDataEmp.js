Ext.define('Hrd.view.trainingoutstanding.FormDataEmp', {
    alias: 'widget.trainingoutstandingformdataemp',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.view.trainingoutstanding.GridTrans'],
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
                    name:'employee_id'
                },
                {
                    xtype: 'textfield',
                    name:'employee_name',
                    width: 400,
                    fieldLabel:'Employee Name',
                    readonly: true
                },
                // {
                //     xtype: 'trainingoutstandingtransgrid',
                //     height: 180,
                //     flex: 2,
                //     style: 'padding: 10 0 10 0'
                // },
                
            ],
            // dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});