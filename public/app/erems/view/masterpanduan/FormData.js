Ext.define('Erems.view.masterpanduan.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.masterpanduanformdata',
    requires: ['Erems.template.ComboBoxFields'],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    editedRow: -1,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function() {
        var me = this;

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
            },
            items: [{
                    xtype: 'hiddenfield',
                    name: 'panduan_id'
                }, {
                    xtype: 'textfield',
                    name: 'menu',
                    fieldLabel: 'Menu',
                    anchor: '-5'
                }, {
                    xtype      : 'xnotefieldEST',
                    height     : 60,
                    name       : 'description',
                    fieldLabel : 'Description',
                    anchor     : '-5'
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'fd_file_text',
                    name: 'filename'
                },
                {
                    xtype: 'filefield',
                    fieldLabel: 'File',
                    itemId: 'fd_file',
                    name: 'file_browse',
                    anchor: '-5'
                },
                {
                    xtype: 'panel',
                    height: 170,
                    bodyStyle: 'background:none',
                    itemId: 'file_image',
                    html: '',
                    anchor: '-5'
                }

            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});