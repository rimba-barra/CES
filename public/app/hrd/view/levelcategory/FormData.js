Ext.define('Hrd.view.levelcategory.FormData', {
    alias           : 'widget.levelcategoryformdata',
    extend          : 'Hrd.library.box.view.FormData',
    requires        : [],
    frame           : true,
    autoScroll      : true,
    editedRow       : -1,
    deletedData     : {},
    initComponent   : function() {
        var me  = this;
        var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults    : {},
            items       : [{
                xtype       : 'hiddenfield',
                name        : 'level_category_id'
            }, {
                xtype       : 'textfield',
                name        : 'code',
                fieldLabel  : 'Code',
                size        : 30
            }, {
                xtype       : 'textfield',
                name        : 'level_category',
                fieldLabel  : 'Competency Level',
                size        : 30
            // }, {
            //     xtype       : 'textareafield',
            //     name        : 'description',
            //     rows        : '10',
            //     cols        : '25',
            //     fieldLabel  : 'Description'
            }],
            
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }

});