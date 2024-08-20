Ext.define('Cashier.view.vdapprove.FormDataPreviewAttachment', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.formdatapreviewattachment',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 500,
    bodyBorder: true,
    bodyPadding: 10,
    uniquename: '_vdrequestformdatapreviewattachment',
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [             
                {
                    xtype: 'image',
                    name: 'attachment_preview',
                    src: '',
                    alt: 'Preview is not available for this file format.'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'download_link'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'file_name'
                }
            ],
            buttons: [
                {
                    text: 'Download',
                    action: 'download'
                },
                {
                    text: 'Close Preview',
                    handler: function() {
                        this.up('window').close();
                    }
                }
            ],
            dockedItems: null
        });

        me.callParent(arguments);
    }
});

