Ext.define('Hrd.view.mhasilkerja.FormData', {
    alias: 'widget.mhasilkerjaformdata',
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
                    name: 'hasilkerja_item_id'
                },
//                {
//                    fieldLabel: 'Index No',
//                    name: 'index_no'
//                },
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
                    xtype: 'textfield',
                    fieldLabel: 'Penilaian',
                    name: 'hasilkerja_item',
                    grow: true,
                    anchor: '100%',
                    allowBlank: false,
                },
//                {
//                    fieldLabel: 'Bobot (%)',
//                    name: 'bobot',
//                    allowBlank: false,
//                },
                {
                    xtype: 'numberfield',
                    name: 'bobot',
                    fieldLabel: 'Bobot (%)',
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
                    xtype: 'textareafield',
                    fieldLabel: 'Description',
                    name: 'description',
                    grow: true,
                    anchor: '100%'
				}
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});