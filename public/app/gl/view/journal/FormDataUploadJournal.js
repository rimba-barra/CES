Ext.define('Gl.view.journal.FormDataUploadJournal', {
    extend: 'Gl.library.template.view.FormData',
    alias: 'widget.formdatauploadjournal',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'padding:5px 5px 0',
    initComponent: function () {
        var me = this; 
        var fileexample = 'contohformatimportdata/module gl/contoh_csv_upload_journal.csv';
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
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
                    accept: 'csv'
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

