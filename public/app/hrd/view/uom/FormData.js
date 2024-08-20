Ext.define('Hrd.view.uom.FormData', {
    alias           : 'widget.uomformdata',
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
                name        : 'uom_id'
            }, {
                xtype       : 'textfield',
                name        : 'uom',
                fieldLabel  : 'UOM Name',
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