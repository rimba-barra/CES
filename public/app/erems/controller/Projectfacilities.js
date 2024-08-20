Ext.define('Erems.controller.Projectfacilities', {
    extend: 'Erems.library.template.controller.Controller2',
    alias: 'controller.Projectfacilities',
    views: ['projectfacilities.Panel', 'projectfacilities.Grid', 'projectfacilities.FormSearch', 'projectfacilities.FormData'],
    // stores: ['Projectfacilities', 'Projectfacilitiesimage'],
    // models: ['Projectfacilities', 'Projectfacilitiesimage'],
    requires: ['Erems.library.box.Config', 'Erems.library.box.tools.Tools', 'Erems.template.ComboBoxFields', 'Erems.library.box.tools.EventSelector'],
    refs: [
        {
            ref: 'mainpanel',
            selector: 'projectfacilitiespanel'
        },
        {
            ref: 'grid',
            selector: 'projectfacilitiesgrid'
        },
        {
            ref: 'formsearch',
            selector: 'projectfacilitiesformsearch'
        },
        {
            ref: 'formdata',
            selector: 'projectfacilitiesformdata'
        },
        {
            ref: 'formimage',
            selector: 'projectfacilitiesformaddimage'
        },
        {
            ref: 'gridimage',
            selector: 'projectfacilitiesgallerygrid'
        }
    ],
    constructor: function(configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Erems.library.box.Config({
            _controllerName: me.controllerName
        });

        me.cbf = new Erems.template.ComboBoxFields();
    },
    init: function(application) {
        var me = this;
        me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});

        var events = new Erems.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        this.control('projectfacilitiesformdata button[action=addimage]', {
            click: function() {
                me.addImage();
            }
        });
        this.control('projectfacilitiesgrid toolbar button[action=create]', {
            click: function(el, form) {
               var ft    = me.getFormdata();
               // var combo = ft.down("[name=facilitiestype_facilitiestype_id]");
               // combo.select(combo.getStore().getAt(0));
            }
        });
        this.control('projectfacilitiesformaddimage #fd_photo', {
            change: function(fld, a) {
                me.formDataUploadImage(fld, a, 'mode');
            }
        });
        this.control('projectfacilitiesformdata #projectfacilities_layermap', {
            change: function(fld, a) {
                me.formDataUploadImage(fld, a, 'main');
            }
        });
        this.control('projectfacilitiesformaddimage button[action=save]', {
            click: me.addImageToGrid
        });
        this.control('projectfacilitiesformdata #pfImagesGalleryGrid actioncolumn', {
                click: this.insActionColumnClick
        });
    },
    controllerName: 'projectfacilities',
    fieldName: 'projectfacilities',
    galleryImageGridid: 'fmpfgg_grid',
    bindPrefixName: 'Projectfacilities',
    myConfig: null,
    tools: null,
    localStore: {
        detail: null
    },
    insACC: function(view, action, row) {
        var me = this;
        var grid = view.up("grid");
        var store = grid.getStore();
        switch (grid.itemId) {
            case "pfImagesGalleryGrid":
                if (action === "destroy") {
                 
                    me.tools.gridHelper(me.getGrid()).maindetailUpdateDeletedRows(me.getFormdata(),store.getAt(row).get("projectfacilities_images_id"));
                    store.removeAt(row);
                }else if(action==="update"){ 
                    me.addImage(true);
                    var fi = me.getFormimage();
                    var rec = store.getAt(row)
                    fi.loadRecord(rec);
                    fi.editedRow = row;
                    me.refreshPhotoInfoDetail(rec.get("image"));
                }   
                break;
        }
    },
   
    addImageToGrid: function() {
        var me        = this;
        var f         = me.getFormimage();
        var editedRow = f.editedRow;
        var gd        = me.getImagelistgrid();
        var vs        = f.getValues();
        var items     = gd.getStore().data.items;

        if((vs.title != '' && vs.title != null && vs.title != undefined) && (vs.image != '' && vs.image != null && vs.image != undefined)){
            if (editedRow > -1) {           
                var rec = gd.getStore().getAt(editedRow); 
                rec.beginEdit();
                rec.set(vs);
                rec.endEdit();
            } else {
                gd.getStore().add(vs);
            }

            if(vs.is_default == 1){
                for(var i=0;i<items.length;i++){
                    if(items[i].data['title'] != vs.title){
                        items[i].data['is_default'] = 0;

                        var records = gd.getStore().getAt(i);
                        records.beginEdit();
                        records.set(records.data);
                        records.endEdit();
                    }
                }
            }
            gd.getView().refresh();
            f.up("window").close();
        }else{
            Ext.Msg.show({
                title: 'Failure',
                msg: 'Title and Image must be filled.',
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
        }

    /*    var me      = this;
        var fi      = me.getFormimage();
        var store   = me.getImagelistgrid().getStore();
        var vs      = fi.getValues();

        if(vs.title != "" && vs.image != ""){
            if(fi.editedRow > -1){
                var rec = store.getAt(fi.editedRow);
                // check default value
                var vs = fi.getValues();
                
                rec.beginEdit();
                rec.set(vs);
                rec.endEdit();
            }else{
                //edited by hadi 15082019
                // if(vs.description != ""){
                    store.add(fi.getValues());
                // }
                // store.add(fi.getValues());
                // end
            }
            fi.up("window").close();
        }else{
            Ext.Msg.show({
                title: 'Failure',
                msg: 'Error: Title and Image are required.',
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
        }*/
        
    },
    addImage: function(isUpdate) {
        var me = this;
        var update = isUpdate?true:false;
        me.instantWindow('FormAddImage', 400, update?'Update Image Information ':'Add Image Information', update?'update':'create', 'projecfactaddImage');
        var ftName = '';
        if (me.getFormdata().down("[name=facilitiestype_facilitiestype_id]").getValue()) {
            ftName = me.tools.comboHelper(me.getFormdata().down("[name=facilitiestype_facilitiestype_id]")).getText(me.cbf.facilitiestype);

        }
        var fi = me.getFormimage();
        fi.down("[name=facilitiestype_facilitiestype]").setValue(ftName);
    },
    refreshPhotoInfo: function(imageName) {
        var me = this;
        var form = me.getFormdata();
        form.down("[name=layer_img]").setValue(imageName);
        me.mt.customerPhoto(form.down("#projectfacilities_layermapimage"), imageName, me.myConfig.IMG_FOLDER_PF, '230px 200px');
    },
    refreshPhotoInfoDetail: function(imageName) {
        var me = this;
        var form = me.getFormimage();
        form.down("[name=image]").setValue(imageName);
        me.mt.customerPhoto(form.down("#photo_image"), imageName, me.myConfig.IMG_FOLDER_PF, '355px 200px');
    },
    formDataUploadImage: function(fld, a, mode) {
        var me = this;
        var form = fld.up("form");
        me.uploadImage({
            form: form,
            callback: {
                success: function(imageName) {
                    if(mode==="main"){
                         me.refreshPhotoInfo(imageName);
                    }else{
                         me.refreshPhotoInfoDetail(imageName);
                    }
                },
                failure: function() {
                }
            }
        });
    },
    mainDataSave: function() {
        var me = this;
        me.insSave({
            form: me.getFormdata(),
            grid: me.getGrid(),
           // store: me.localStore.detail,
            finalData: function(data) {
                //data["pricetype_id"] = data["pricetype_pricetype_id"];
                data["detail"] = me.tools.gridHelper(me.getImagelistgrid()).getJson();
                return data;
            },
            sync: true,
            callback: {
                create: function(store, form, grid) {
                }
            }
        });
    },
    fdar: function() {
        var me = this;
        var f = me.getFormdata();
        me.mt = new Erems.library.ModuleTools();

        var x = {
            init: function() {
                me.setActiveForm(me.getFormdata());
                f.setLoading(true, true);
            },
            create: function() {
                me.tools.ajax({
                    params: {
                        // purchaseletter_id: plId
                    },
                    success: function(data, model) {
                        me.fillFormComponents(data, f);
                        
                        me.tools.ajax({
                            params: {},
                            success: function(datail, modelil) {
                                //pfImagesGalleryGrid
                                me.tools.wesea({data: datail, model: modelil}, me.getFormdata().down('#pfImagesGalleryGrid')).grid();
                                f.setLoading(false);
                            }
                        }).read('imageslist');
                    }
                }).read('detail');
            },
            update: function() {
                var rec = me.getGrid().getSelectedRecord()
                var row = me.getGrid().getSelectedRow();
                f.editedRow = row;
                var plId = rec.get("projectfacilities_id");
                f.setLoading("Request detail information...");
                me.tools.ajax({
                    params: {
                        projectfacilities_id: 0
                    },
                    success: function(data, model) {
                        console.log(rec);
                        me.fillFormComponents(data, f);
                        f.loadRecord(me.getGrid().getSelectedRecord());

                        me.refreshPhotoInfo(rec.get("layer_img"));
                        f.setLoading("Request images list...");
                        me.tools.ajax({
                            params: {
                                projectfacilities_id: plId
                            },
                            success: function(datail, modelil) {
                                //pfImagesGalleryGrid
                                me.tools.wesea({data: datail, model: modelil}, me.getFormdata().down('#pfImagesGalleryGrid')).grid();
                                f.setLoading(false);
                            }
                        }).read('imageslist');
                    }
                }).read('detail');
            }
        };
        return x;
    },
    getImagelistgrid:function(){
        return this.getFormdata().down("#pfImagesGalleryGrid");
    },
    fillFormComponents: function(data, form) {
        var me = this;
        me.tools.wesea(data.facilitiestype, form.down("[name=facilitiestype_facilitiestype_id]")).comboBox();
        form.down("[name=facilitiestype_facilitiestype_id]").setValue(data.facilitiestype.data[0].facilitiestype_id);
        //citraclub_id
    },
});