Ext.define('Hrd.view.competencycategory.FormData', {
    alias           : 'widget.competencycategoryformdata',
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
                name        : 'competency_category_id'
            }, {
                xtype       : 'textfield',
                name        : 'code',
                fieldLabel  : 'Code',
                size        : 30
            }, {
                xtype       : 'textfield',
                name        : 'competency_category',
                fieldLabel  : 'Competency Category',
                size        : 30
            }, {
                xtype       : 'textareafield',
                name        : 'description',
                rows        : '10',
                cols        : '40',
                fieldLabel  : 'Description'
            }],
            
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }

});