Ext.define('Hrd.view.trainingbudgetprogram.FormData', {
    alias: 'widget.trainingbudgetprogramformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.library.template.view.MoneyField'],
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
                    name:'trainingbudgetprogram_id'
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Periode',
                    name: 'periode',
                    store: 'Trainingperiode',
                    width:300,
                    displayField: 'periode',
                    valueField: 'periode',
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Caption',
                    name: 'trainingcaption_id',
                    width:300,
                    displayField: 'caption',
                    valueField: 'trainingcaption_id',
                },
                {
                    xtype: 'xmoneyfield',
                    name:'budget',
                    width:300,
                    fieldLabel:'Budget'
                },
                {
                    xtype: 'textareafield',
                    rows: '7',
                    readOnly: true,
                    fieldLabel:'Notes',
                    width:300,
                    name:'notes'
                },
                
                
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});