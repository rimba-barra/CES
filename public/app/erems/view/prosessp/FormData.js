Ext.define('Erems.view.prosessp.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.prosesspformdata',
    requires: [
        'Erems.library.template.view.MoneyField'
    ],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 600,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'padding:5px 5px 0',
    fieldNamePrefix: 'customer_',
    editedRow: -1,
    defaults: {
        border: false,
        xtype: 'panel',
        flex: 1,
        layout: ''

    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype:'textfield',
                    fieldLabel:'Teset'
                }
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});