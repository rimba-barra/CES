Ext.define('Cashier.view.journal.FormDataUploadJournal', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.formdatauploadjournal',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'padding:5px 5px 0',
    initComponent: function () {
        var me = this; 
        var fileexample = 'contohformatimportdata/module gl/sample_upload_detail_jr.csv';
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
                emptyText: 'Select csv/txt file',
                fieldLabel: 'File',
                name: 'file-path',
                allowBlank: false,
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
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Grouping',
                    padding: '0 0 0 20px',
                    layout: 'hbox',
                    items: [
                        {
                            boxLabel: 'Yes',
                            xtype: 'radiofield',
                            name: 'groupingdata',
                            inputValue: 1,
                            id: 'gr_groupingdatayes'
                        },
                        {
                            xtype: 'splitter',
                            width: '50'
                        },
                        {
                            boxLabel: 'No',
                            xtype: 'radiofield',
                            name: 'groupingdata',
                            inputValue: 0,
                            id: 'gr_groupingdatano',
                            checked:true
                        }
                    ]
                },

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

