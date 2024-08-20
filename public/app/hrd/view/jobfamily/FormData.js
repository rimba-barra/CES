Ext.define('Hrd.view.jobfamily.FormData', {
    alias           : 'widget.jobfamilyformdata',
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
                name        : 'jobfamily_id'
            }, {
                xtype       : 'textfield',
                name        : 'code',
                fieldLabel  : 'Code',
                size        : 30
            }, {
                xtype       : 'textfield',
                name        : 'jobfamily',
                fieldLabel  : 'Job Family',
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