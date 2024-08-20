Ext.define('Hrd.view.competencywawancara.FormData', {
    alias: 'widget.competencywawancaraformdata',
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
                    name:'competency_wawancara_id'
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Competency Name',
                    name: 'competency_name_id',
                    width:400,
                    displayField: 'competency_name',
                    valueField: 'competency_name_id',
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Banding',
                    name: 'banding_id',
                    width:400,
                    displayField: 'banding',
                    valueField: 'banding_id',
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Competency Level',
                    name: 'level_category_id',
                    width:400,
                    displayField: 'level_category',
                    valueField: 'level_category_id',
                },
                {
                    xtype       : 'textareafield',
                    rows        : '5',
                    fieldLabel:'Interview Questions',
                    width:400,
                    name:'pertanyaan_wawancara'
                },
                
                
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});