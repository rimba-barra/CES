Ext.define('Hrd.view.firstdayform.FormData', {
    alias: 'widget.firstdayformformdata',
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
                    name:'firstdayform_id'
                },
                {
                    fieldLabel:'Question',
                    width:400,
                    name:'question'
                },
                {
                    xtype: 'checkbox',
                    boxLabel: 'Active',
                    fieldLabel:'&nbsp;',
                    name: 'question_active',
                    uncheckedValue: '0',
                    inputValue: '1',
                    checked: true
                },
                {   
                    xtype: 'numberfield',
                    fieldLabel:'Sort',
                    width:200,
                    name:'sort'
                },
                
                
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});