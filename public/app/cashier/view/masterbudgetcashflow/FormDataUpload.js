Ext.define('Cashier.view.masterbudgetcashflow.FormDataUpload', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.masterbudgetcashflowformdataupload',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    deletedRows: [],
    editedRow :-1,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'mode_read'
                },
                {
                    xtype: 'filefield',
                    id: 'form-file',
                    emptyText: 'Browse csv/xls/xlsx file',
                    fieldLabel: 'Browse File',
                    name: 'file-path',
                    buttonText: '',
                    buttonConfig: {
                        iconCls: 'icon-plus'
                    },
                    fileInputAttributes: {
                        accept: 'txt'
                    }
                }
            ],
            buttons: [
                {
                    text: 'Submit',
                    action: 'upload'
                },
                {
                    text: 'Cancel',
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

