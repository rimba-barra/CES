Ext.define('Erems.view.followup.PreviewFormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.followuppreviewformdata',
    //requires: [],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 400,
    bodyBorder: true,
    //bodyPadding: 10,
    bodyStyle: 'background-color:white',
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
                   xtype:'hiddenfield',
                   name:'url'
                },
            {
                    xtype:'panel',
                    id:'textPreviewID',
                
                    html:' '
            }],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function() {
        var x = [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            layout: {
                padding: 6,
                type: 'hbox'
            },
            items: [
            {
                xtype: 'button',
                action: 'print',
                itemId: 'btnPrint',
                padding: 5,
                width: 75,
                iconCls: 'icon-print',
                text: 'Print'
            },
            {
                xtype: 'button',
                action: 'cancel',
                itemId: 'btnCancel',
                padding: 5,
                width: 75,
                iconCls: 'icon-cancel',
                text: 'Cancel',
                handler: function() {
                    this.up('window').close();
                }
            }
            ]
        }
        ];
        return x;
    },
});