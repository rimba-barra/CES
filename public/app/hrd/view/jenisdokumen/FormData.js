Ext.define('Hrd.view.jenisdokumen.FormData', {
    alias: 'widget.jenisdokumenformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: [],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'jenisdocument_id'
                },
		/*
                {
                    fieldLabel: 'Index No',
                    name: 'index_no'
                }, 
		*/
		{
                    xtype: 'numberfield',
                    name: 'index_no',
                    fieldLabel: 'Index No',
                    width: 180,
                    hideTrigger: true,
                    keyNavEnabled: false,
                    mouseWheelEnabled: false,
                    readOnly: false,
                    allowBlank: false,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                },		
              
                {
                    fieldLabel: 'Kode',
                    name: 'code'
                },
		/*               
                {
                    fieldLabel: 'Keterangan',
                    name: 'description'
                }*/
		{
                    xtype: 'textareafield',
                    fieldLabel: 'Keterangan',
                    name: 'description',
                    grow: true,
                    anchor: '100%',
                    allowBlank: false,
                },

            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});