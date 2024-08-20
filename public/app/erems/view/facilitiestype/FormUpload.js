Ext.define('Erems.view.facilitiestype.FormUpload', {
    extend: 'Ext.form.Panel',
    alias: 'widget.facilitiestypeformupload',
    width: 500,
    frame: true,
    title: 'File Upload Form',
    bodyPadding: '10 10 0',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                anchor: '100%',
                allowBlank: false,
                msgTarget: 'side',
                labelWidth: 50
            },
            items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Name'
                }, {
                    xtype: 'filefield',
                    id: 'form-file',
                    emptyText: 'Select an image',
                    fieldLabel: 'Photo',
                    name: 'photo-path',
                    buttonText: '',
                    buttonConfig: {
                        iconCls: 'upload-icon'
                    }
                }],
            buttons: [{
                    text: 'Save',
                    handler: function() {
                        var form = this.up('form').getForm();
                        // if (form.isValid()) {
                        form.submit({
                            url: 'erems/facilitiestype/read',
                            waitMsg: 'Uploading your photo...',
                            success: function(f,a) {
                                var result = a.result,
                                data = result.data,
                                name = data.name,
                                size = data.size,
                                message = Ext.String.format('<b>Message:</b> {0}<br/>' +
                                    '<b>FileName:</b> {1}<br/>' +
                                    '<b>FileSize:</b> {2} bytes',
                                    result.msg, name, size);
 
                            Ext.Msg.alert('Success', message);
                            },
                            failure: function(f,a) {
                                 Ext.Msg.alert('Failure', a.result.msg);
                            }
                        });
                        // }
                    }
                }, {
                    text: 'Reset',
                    handler: function() {
                        this.up('form').getForm().reset();
                    }
                }]
        });
        me.callParent(arguments);
    }


});


