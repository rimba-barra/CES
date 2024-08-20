Ext.define('Cashier.view.jupload.FormDataUpload', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.juploadformdataupload',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'padding:5px 5px 0',
    initComponent: function () {
        var me = this; 
        var fileexample = 'contohformatimportdata/module cashier/contoh_csv_upload_journal.csv';
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                
//                {
//                    xtype: 'hiddenfield',
//                    name: 'project_id'
//                },
//                {
//                    xtype: 'hiddenfield',
//                    name: 'pt_id'
//                },
                {
                    xtype: 'hiddenfield',
                    name: 'mode_read'
                },
                {
                xtype: 'filefield',
                id: 'form-file',
                emptyText: 'Select an CSV',
                fieldLabel: 'CSV File',
                name: 'file-path',
                buttonText: '',
                buttonConfig: {
                    iconCls: 'icon-plus'
                    },
                fileInputAttributes: {
                    accept: 'txt'
                    }
                },
                {
                    xtype: 'displayfield',
                    id: 'sample',
                    fieldLabel: '<a target="_blank" href="'+fileexample+'">Download sample</a>'    
                }

                ],
            buttons: [{
                text: 'Upload',
                action: 'upload'
            },{
                text: 'Reset',
                handler: function() {
                    this.up('form').getForm().reset();
                }
            }],
            dockedItems: null 
        });

        me.callParent(arguments);
    }
});

