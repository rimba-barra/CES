Ext.define('Hrd.view.trainingcaption.FormData', {
    alias: 'widget.trainingcaptionformdata',
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
                    name:'trainingcaption_id'
                },
                {
                    xtype: 'textfield',
                    name:'caption',
                    width: 400,
                    fieldLabel:'Caption'
                },
                {
                    xtype: 'checkbox',
                    boxLabel: 'Lock Budget',
                    fieldLabel:'&nbsp;',
                    name: 'lockbudget',
                    uncheckedValue: '0',
                    inputValue: '1'
                },
                
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});