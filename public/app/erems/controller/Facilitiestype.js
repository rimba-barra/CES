Ext.define('Erems.controller.Facilitiestype', {
    extend: 'Erems.template.ControllerForMaster',
    alias: 'controller.Facilitiestype',
    controllerName: 'facilitiestype',
    fieldName: 'facilitiestype',
    bindPrefixName: 'Facilitiestype',
    constructor: function(configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Erems.library.box.Config({
            _controllerName: me.controllerName
        });

        me.cbf = new Erems.template.ComboBoxFields();
    },
    init: function(application) {
        this.callParent(arguments);
        var me = this;
        this.control(
            'facilitiestypegrid', {
                afterrender     : this.gridAfterRender
            },
            'facilitiestypeformdata filefield[name=icon_upload]', {
                change: function(fld, a) {
                    me.formDataUploadImage(fld, a, 'mode');
                }
            }
        );
    },
    formDataUploadImage: function(fld, a, mode) {

        var me = this;
        var form = fld.up("form");
        me.uploadImage({
            form: form,
            callback: {
                success: function(imageName) {

                    me.refreshImageInfo(imageName);



                },
                failure: function() {

                }
            }
        });


    },
    //
    refreshImageInfo: function(imageName) {
        var me = this;

        var form = me.getFormdata();
        form.down("[name=icon]").setValue(imageName);
        me.mt.customerPhoto(form.down("#photo_image"), imageName, me.myConfig.IMG_FOLDER_FT, '20px 20px');
    },
    fdarInit: function() {
        this.mt = new Erems.library.ModuleTools();
    },
    fdarUpdate: function(rec) {
        var me = this;
      
        me.refreshImageInfo(rec.get("icon"));
    }
});