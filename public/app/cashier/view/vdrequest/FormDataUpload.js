Ext.define('Cashier.view.vdrequest.FormDataUpload', {
    extend       : 'Cashier.library.template.view.FormData',
    alias        : 'widget.vdrequestformdataupload',
    frame        : true,
    autoScroll   : true,
    anchorSize   : 100,
    bodyBorder   : true,
    bodyPadding  : 10,
    bodyStyle    : 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me          = this;
        var fileexample = 'contohformatimportdata/module cashier/contoh_upload_detail_voucher.csv';
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' ',
                labelClsExtra : 'small',
                fieldStyle    : 'margin-bottom:3px;',
                anchor        : '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name : 'hideparam'
                },
                {
                    xtype: 'hiddenfield',
                    name : 'u_project_id',
                },
                {
                    xtype: 'hiddenfield',
                    name : 'u_pt_id',
                },
                {
                    xtype       : 'filefield',
                    id          : 'form-file2',
                    emptyText   : 'Select csv/txt file',
                    fieldLabel  : 'File',
                    name        : 'file-path2',
                    buttonText  : '',
                    buttonConfig: {
                        iconCls: 'icon-plus'
                    },
                    fileInputAttributes: {
                        accept: 'txt'
                    }
                },
                {
                    xtype     : 'displayfield',
                    name      : 'sample2',
                    id        : 'sample2',
                    itemId    : 'sample2',
                    fieldLabel: '<a target="_blank" href="'+fileexample+'">Download sample</a>'
                },
                {
                    xtype         : 'checkboxfield',
                    itemId        : 'is_deletedetail',
                    name          : 'is_deletedetail',
                    boxLabel      : 'Delete Detail ?',
                    inputValue    : '1',
                    uncheckedValue: '0',
                    width         : 100,
                    checked       : true
                },
                ],
            buttons: [{
                text  : 'Upload',
                action: 'uploadcsv'
            },{
                text   : 'Reset',
                handler: function() {
                    this.up('form').getForm().reset();
                }
            }],
            dockedItems: null
        });

        me.callParent(arguments);
    }
});

