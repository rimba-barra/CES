Ext.define('Erems.library.component.FormUploadImage', {
    extend: 'Ext.form.Panel',
    bodyStyle: 'background:none;border:0',
    alias: 'widget.componentformuploadimage',
    requires:['Erems.library.Config'],
    fileFieldLabel: 'Layer map images',
    myIdElement: 'idelement',
    prefixImageName: 'contoh_',
    urlUpload: 'erems/projectfacilities/upload',
    myConfig:null,
    controllerName:'',
    initComponent: function() {

        var me = this;
        me.myConfig = new Erems.library.Config();
        Ext.applyIf(me, {
            items: [{
                    xtype: 'filefield',
                    itemId: me.myIdElement + '_id',
                    name: 'addimage',
                    fieldLabel: me.fileFieldLabel,
                    emptyText: 'Select an image',
                    buttonText: 'Browse',
                    listeners: {
                        change:function(fld,a){
                            me.formDataUploadImage(fld,a);
                        }
                    }
                }]

        });

        me.callParent(arguments);
    },
    formDataUploadImage: function(fld, a) {
        var me = this;
        var form = fld.up('form');
        var dataForm = form.getValues();
        form.submit({
            url: form.urlUpload,
            waitMsg: 'Uploading image...',
            params:{
                image_folder:me.myConfig.getImageFolder(me.controllerName)
            },
            success: form.successUpload,
            failure: function(f, a) {
                //  me.dataSave(me,dataForm);
                Ext.Msg.show({
                    title: 'Fail',
                    msg: 'Error',
                    icon: Ext.Msg.INFO,
                    buttons: Ext.Msg.OK
                });
            }
        });

    },
    successUpload: function(fld, a) {
       // dataForm['icon'] = a.result.imageName;
       var me = this;
        var form = fld.up('form');
        fld.up('fieldcontainer').down('#projectfacilities_layermapimage').el.setStyle({backgroundImage: 'url('+me.myConfig.getImageFolder(me.controllerName)+''+ dataForm['icon'] + ')', backgroundSize: '322px 200px'});
        form.successMsgBox();
        // me.dataSave(me,dataForm);
    },
    successMsgBox:function(){
        Ext.Msg.show({
            title: 'Success',
            msg: 'Image uploaded',
            icon: Ext.Msg.INFO,
            buttons: Ext.Msg.OK
        });
    }
    
});


