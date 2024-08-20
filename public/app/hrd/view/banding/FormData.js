Ext.define('Hrd.view.banding.FormData', {
    alias           : 'widget.bandingformdata',
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
                name        : 'banding_id'
            }, {
                xtype		: 'numberfield',
                name		: 'index_no',
                fieldLabel  : 'Index No',
                readOnly	: false,
                allowBlank	: false
            }, {
                xtype       : 'textfield',
                name        : 'code',
                fieldLabel  : 'Code',
                size        : 30,
                allowBlank	: false
            }, {
                xtype       : 'textfield',
                name        : 'banding',
                fieldLabel  : 'Banding',
                size        : 30,
                allowBlank	: false
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