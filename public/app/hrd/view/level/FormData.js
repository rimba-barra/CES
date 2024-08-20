Ext.define('Hrd.view.level.FormData', {
    alias           : 'widget.levelformdata',
    extend          : 'Hrd.library.box.view.FormData',
    requires        : [],
    frame           : true,
    autoScroll      : true,
    editedRow       : -1,
    deletedData     : {},
    initComponent   :  function() {
        var me  = this;
        var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults    : {},
            items       : [{
                xtype       : 'hiddenfield',
                name        : 'level_id',
            }, {
                xtype       : 'combobox',
                name        : 'competency_name_id',
                fieldLabel  : 'Competency Name',
                displayField: 'competency_name',
                valueField  : 'competency_name_id'
            }, {
                xtype       : 'combobox',
                name        : 'level_category_id',
                fieldLabel  : 'Level Category',
                displayField: 'level_category',
                valueField  : 'level_category_id'              
            }, {
                xtype       : 'textfield',
                name        : 'code',
                fieldLabel  : 'Level Code'
            }, {
                xtype       : 'textareafield',
                name        : 'description',
                rows        : '10',
                cols        : '40',
                fieldLabel  : 'Description'
            }, {
                xtype       : 'textareafield',
                name        : 'sample_behaviour',
                rows        : '10',
                cols        : '40',
                fieldLabel  : 'Sample Behaviour'
            }],

            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});