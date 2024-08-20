Ext.define('Cashier.view.subaccountcode.FormDataUpload', {
    extend       : 'Cashier.library.template.view.FormData',
    alias        : 'widget.subaccountcodeformdataupload',
    autoScroll   : true,
    anchorSize   : 100,
    bodyBorder   : true,
    initComponent: function () {
        var me          = this;
        var fileexample = 'contohformatimportdata/module cashier/contoh_csv_upload_sub_account.csv';
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' ',
                labelClsExtra : 'small',
                        // fieldStyle: 'margin-bottom:3px;',
                      anchor: '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name : 'hideparam'
                },
                {
                    xtype     : 'textfield',
                    name      : 'lblProject',
                    fieldLabel: 'Projet Name',
                    readOnly  : true,
                    fieldStyle: 'background-color:#eee;background-image: none;',
                    value     : apps.projectname,
                    tooltip   : apps.projectname
                },
                {
                    xtype     : 'textfield',
                    name      : 'lblPt',
                    fieldLabel: 'PT Name',
                    readOnly  : true,
                    fieldStyle: 'background-color:#eee;background-image: none;',
                    value     : apps.ptname,
                    tooltip   : apps.ptname
                },
                {
                    xtype       : 'filefield',
                    id          : 'form-file',
                    emptyText   : 'Select csv file',
                    fieldLabel  : 'File',
                    name        : 'file-path',
                    buttonText  : '',
                    buttonConfig: {
                        iconCls: 'icon-plus'
                    },
                    fileInputAttributes: {
                        accept: 'csv'
                    }
                },
                {
                    xtype : 'displayfield',
                    name  : 'sample',
                    id    : 'sample',
                    itemId: 'sample',
                    fieldLabel: '<a target="_blank" href="'+fileexample+'">Download sample</a>'
                }

                ],
            buttons: [{
                text   : 'Upload',
                iconCls: 'icon-save',
                action : 'upload'
            },{
                text   : 'Reset',
                icon   : 'app/main/images/icons/cancel.png',
                handler: function() {
                    this.up('form').getForm().reset();
                }
            }],
            dockedItems: null
        });

        me.callParent(arguments);
    }
});

