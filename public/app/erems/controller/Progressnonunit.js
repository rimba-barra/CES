Ext.define('Erems.controller.Progressnonunit', {
    extend: 'Erems.library.template.controller.Controller2',
    alias: 'controller.Progressnonunit',
    requires: ['Erems.library.Browse', 'Erems.library.box.Config', 'Erems.library.box.tools.Tools', 'Erems.template.ComboBoxFields', 'Erems.library.box.tools.EventSelector'],
    views: ['progressnonunit.Panel', 'progressnonunit.Grid', 'progressnonunit.FormSearch', 'progressnonunit.FormData'],
    refs: [
        {
            ref: 'grid',
            selector: 'progressnonunitgrid'
        },
        {
            ref: 'formsearch',
            selector: 'progressnonunitformsearch'
        },
        {
            ref: 'formdata',
            selector: 'progressnonunitformdata'
        },
        {
            ref: 'gridmaindetail',
            selector: 'progressnongridmaindetail'
        },
        {
            ref: 'griddetail',
            selector: 'progressnonunitgriddetail'
        },
        {
            ref: 'gridimage',
            selector: 'progressnonunitgridimage'
        },
        {
            ref: 'formdatadetail',
            selector: 'progressnonunitformdatadetail'
        },
        {
            ref: 'formdataimage',
            selector: 'progressnonunitformdataimage'
        },
        {
            ref: 'formdatagallery',
            selector: 'progressnonunitformdatagallery'
        },
        {
            ref: 'panel',
            selector: 'progressnonunitpanel'
        }
    ],
    controllerName: 'progressnonunit',
    fieldName: 'spk_no',
    bindPrefixName: 'Progressnonunit',
    nomMaster: 'main_list',
    formWidth: 800,
    imageFolder: 'app/erems/uploads/progress_nonunit/',
    currentImgPos: 0,
    localStore: {
        /* YOUR LOCAL STORE HERE*/
        contractor: null,
        mainConstruction: null
    },
    nomIdProperty: 'spk_id',
    cbf: null,
    mt: null,
    tools: null,
    myConfig: null,
    constructor: function(configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Erems.library.box.Config({
            _controllerName: me.controllerName
        });

        me.cbf = new Erems.template.ComboBoxFields();
    },
    init: function(application) {
        var me = this
        me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
        var events = new Erems.library.box.tools.EventSelector();

        this.control({
            'progressnonunitpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'progressnonunitgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'progressnonunitgrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'progressnonunitgrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'progressnonunitgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'progressnonunitgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'progressnonunitgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'progressnonunitformsearch button[action=search]': {
                click: this.dataSearch
            },
            'progressnonunitformsearch button[action=reset]': {
                click: this.dataReset
            },
            'progressnonunitformdata': {
                afterrender: this.formDataAfterRender
            },
            'progressnonunitformdata button[action=save]': {
                click: this.dataSave
            },
            'progressnonunitformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'progressnonunitformsearch': {
                afterrender: this.nomformsearchAfterRender
            },
            'progressnonunitgriddetail toolbar button[action=create]': {
                click: function() {
                    me.showFormDetail();
                }
            },
            'progressnonunitgridimage toolbar button[action=addNewDetail]': {
                click: function() {
                    me.showFormImage();
                }
            },
            'progressnonunitformdataimage button[action=save]': {
                click: this.imageDataSave
            },
            'progressnonunitgriddetail actioncolumn': {
                click: this.insActionColumnClick
            },
            'progressnonunitgridimage actioncolumn': {
                click: this.insActionColumnClick
            },
            'progressnongridmaindetail actioncolumn': {
                click: this.insActionColumnClick
            },
            'progressnonunitformdatadetail button[action=save]': {
                click: this.mainDataSave
            },
            'progressnonunitformdatagallery button[action=next]': {
                click: function() {
                    me.moveImagesList('next');
                }
            },
            'progressnonunitformdatagallery button[action=previous]': {
                click: function() {
                    me.moveImagesList('previous');
                }
            }
        });
    },
    deleteImageFromGrid: function(row) {
        var me = this;
        var gu = me.getGridimage();
        var id = me.tools.intval(gu.getStore().getAt(row).get("constructionpicture_id"));
        if (id > 0) {

            me.tools.gridHelper(me.getGriddetail()).maindetailUpdateDeletedRows(me.getFormdatadetail(), gu.getStore().getAt(row).get("constructionpicture_id"));
        }
        gu.getStore().removeAt(row);
    },
    panelAfterRender: function(configs) {
        this.callParent(arguments);
        var me = this;
        var p = me.getPanel();

        var gm = me.getGridmaindetail();
        gm.doInit();

        me.localStore.contractor = me.instantStore({
            id: me.controllerName + 'ContractorInfo',
            extraParams: {
                mode_read: 'contractordetail'
            }
        });



        me.localStore.mainConstruction = me.instantStore({
            id: me.controllerName + 'MainConstruction',
            extraParams: {
                mode_read: 'maindetail'
            }
        });

        me.localStore.images = me.instantStore({
            id: me.controllerName + 'MainConstruction',
            extraParams: {
                mode_read: 'picture'
            }
        });

        p.setLoading("Please wait,loading components..");
        me.tools.ajax({
            params: {
                unit_id: 0
            },
            success: function(data, model) {

                me.tools.wesea({
                    data: data,
                    model: model
                }, gm).grid();


                p.setLoading("Please wait,loading  contractor components..");
                me.localStore.contractor.load({
                    params: {},
                    callback: function(recui, opui) {
                        me.attachModel(opui, me.localStore.contractor, false);
                        p.setLoading("Please wait,loading main components..");
                        me.localStore.mainConstruction.load({
                            params: {},
                            callback: function(recmc, opmc) {
                                me.attachModel(opmc, me.localStore.mainConstruction, false);

                                me.localStore.images.load({
                                    params: {},
                                    callback: function(recim, opim) {
                                        me.attachModel(opim, me.localStore.images, false);



                                        /// load form search data
                                        me.tools.ajax({
                                            params: {
                                                unit_id: 0
                                            },
                                            success: function(data, model) {
                                                me.fillFormSearchComponents(data, me.getFormsearch());
                                                p.setLoading(false);
                                                p.up("window").maximize();
                                            }
                                        }).read('detail');

                                        /// attach showGallery method to maingriddetail
                                        var gmd = me.getGridmaindetail();

                                        gmd.showGallery = function(row) {
                                            me.galleryShow(gmd.getStore(), row, 'spkunit');
                                        };







                                    }
                                });



                            }
                        });

                    }
                });

            }
        }).read('constructionspk');
    },
    fillFormSearchComponents: function(data, form) {
        var me = this;
        me.tools.wesea(data.contractor, form.down("[name=contractor_id]")).comboBox();
    

    },
    gridSelectionChange: function() {
        /* old code*/
        var me = this;
        var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
        grid.down('#btnEdit').setDisabled(row.length != 1);
        //grid.down('#btnDelete').setDisabled(row.length < 1);
        /* new code*/
        var rec = me.getGrid().getSelectedRecord();
        if (typeof rec !== "undefined") {
            me.getGrid().setDisabled(true);
            var store = me.getGridmaindetail().getStore();
            me.tools.ajax({
                params: {
                    spk_id: rec.get("spk_id"),
                    unit_id: 0
                },
                success: function(gid, gim) {

                    me.tools.wesea({
                        data: gid,
                        model: gim
                    }, me.getGridmaindetail()).grid();
                    me.getGrid().setDisabled(false);

                }
            }).read('constructionspk');

        } else {
            console.log("REC " + rec);
        }



    },
    galleryShow: function(store, row) {
        var me = this;
        me.showFormGallery();
        me.localStore.images.load({
            params: {
                construction_id: store.getAt(row).get("construction_id")
            },
            callback: function(rec) {
                me.currentImgPos = 0;
                me.updateGalleryPageInfo();
                me.fillGalleryInfo();
            }
        });
    },
    fillGalleryInfo: function() {
        var me = this;
        var index = me.currentImgPos;
        var rec = me.localStore.images.getAt(index);
        var form = me.getFormdatagallery();
        if (typeof rec !== "undefined") {
            console.log(rec);
            form.down('#photo_image').el.setStyle({backgroundImage: 'url(' + me.imageFolder + rec.get("images") + ')', backgroundSize: '300px 350px'});
            form.down('[name=description]').setValue(rec.get("description"));
        }

    },
    showFormGallery: function(state) {
        var s = typeof state === "undefined" ? "create" : state;
        var me = this;
        me.instantWindow('FormDataGallery', 500, 'Construction Progress', s, 'myWindowGallery');
        if (s === "create") {

        } else {


        }

    },
    updateGalleryPageInfo: function() {
        var me = this;
        var currentPage = me.currentImgPos;
        var totalRec = me.localStore.images.getCount();
        var page = currentPage + 1;
        page = page > totalRec ? totalRec : page;
        me.getFormdatagallery().down('#galleryPageInfo').setText("Page " + page + " of " + totalRec);

    },
    moveImagesList: function(mode) {
        var me = this;
        var totalRec = me.localStore.images.getCount();
        if (mode === "next" && me.currentImgPos < totalRec) {
            me.currentImgPos++;
        } else {
            if (me.currentImgPos > 0) {
                me.currentImgPos--;
            }

        }
        me.updateGalleryPageInfo();
        me.fillGalleryInfo();

    },
    mainDataSave: function() {
        var me = this;
        me.insSave({
            form: me.getFormdatadetail(),
            grid: me.getGriddetail(),
            store: me.localStore.mainConstruction,
            finalData: function(data) {
                data['spk_spk_id'] = me.getv("spk_spk_id");
                //data['unit_unit_id'] = me.getv("unit_unit_id");
                data['progressdetail'] = me.tools.gridHelper(me.getGridimage()).getJson();
                if (me.getFormdatadetail().editedRow > -1) {
                    data['deletedRows'] = me.getGriddetail().getStore().getAt(me.getFormdatadetail().editedRow).get("deletedRows");

                }
                return data;
            },
            sync: true,
            callback: {
                create: function(store, form, grid) {


                    me.loadDetail();
                },
                update: function(store, form, grid) {

                    me.loadDetail();
                }
            }
        });
    },
    refreshGridDetail: function(spkId, unitId) {
        var me = this;
        var f = me.getFormdata();
        var gpgd = me.getFormdata().down("#ProgressGridDetail");
        f.setLoading("Please wait, refresh construction list...");
        me.tools.ajax({
            params: {
                spk_id: spkId,
                unit_id: unitId
            },
            success: function(gpgdd, gpgdm) {

                me.tools.wesea({
                    data: gpgdd,
                    model: gpgdm
                }, gpgd).grid();
                f.setLoading(false);


            }
        }).read('constructionspkunit');
    },
    insACC: function(view, action, row) {
        var me = this;
        var grid = view.up("grid");
        var store = grid.getStore();
        switch (grid.itemId) {
            case "ProgressGridDetail":
                if (action == "destroy") {

                    /// check status spk
                    var rec = me.getGrid().getSelectedRecord();
                    if (rec) {
                        if (rec.get("status") !== "OPEN") {
                            return;
                        }
                    }

                    me.tools.ajax({
                        params: {construction_id: store.getAt(row).get("construction_id")},
                        success: function(data, model) {

                            var statusDelete = data.others[0][0]['STATUS'];

                            if (statusDelete) {
                                me.tools.alert.info("Progress Deleted");
                                store.removeAt(row);
                            }

                        }
                    }).read('deleteprogress');

                } else if (action == "update") {
                    me.showFormDetail('update', row);
                } else if (action == "gallery") {
                    me.galleryShow(store, row);
                }
                break;
            case "ProgressGridImage":
                if (action == "destroy") {

                    me.deleteImageFromGrid(row);
                    // me.deleteDetailInMaster(me.getGriddetail(), me.getGridimage(), row, me.getFormdatadetail().down("[name=construction_id]").getValue());
                    //store.removeAt(row);
                } else if (action == "update") {
                    me.showFormImage('update');
                    var form = me.getFormdataimage();
                    var rec = store.getAt(row)
                    form.loadRecord(rec);
                    form.editedRow = row;
                    form.down('#photo_image').el.setStyle({backgroundImage: 'url(' + me.imageFolder + rec.get("images") + ')', backgroundSize: '130px 150px'});
                    me.getFormdataimage().down("#photo_image").show();
                }
                break;
            case "ProgressNonUnitMainDetailGrid":
                if (action === "view") {
                    me.galleryShow(store, row);
                }
                break;
        }
    },
    imageDataSave: function() {
        var me = this;
        var file = me.getFormdataimage().down("[name=images]").getValue();
        var photoBrowse = me.getFormdataimage().down("[name=photo_browse]").getValue();
        if (photoBrowse.length > 0) {
            me.uploadImage({
                form: me.getFormdataimage(),
                callback: {
                    success: function(imageName) {
                        var store = me.getGridimage().getStore();
                        var data = {
                            images: imageName,
                            description: me.getFormdataimage().down("[name=description]").getValue()
                        };
                        if (me.getFormdataimage().editedRow > -1) {
                            var rec = store.getAt(me.getFormdataimage().editedRow);
                            rec.beginEdit();
                            rec.set(data);
                            rec.endEdit();
                        } else {
                            me.getGridimage().getStore().add(data);
                        }
                        me.getFormdataimage().up("window").close();

                    },
                    failure: function() {

                    }
                }
            });
        }
        if (file.length > 0 && photoBrowse.length == 0) {

            var store = me.getGridimage().getStore();
            var rec = store.getAt(me.getFormdataimage().editedRow);
            rec.beginEdit();
            rec.set({description: me.getFormdataimage().down("[name=description]").getValue()});
            rec.endEdit();
            me.getFormdataimage().up("window").close();
        }

    },
    showFormDetail: function(state, rowGrid) {
        var s = typeof state === "undefined" ? "create" : state;
        var row = typeof rowGrid === "undefined" ? -1 : rowGrid;
        var me = this;


        /// check status spk
        var rec = me.getGrid().getSelectedRecord();
        if (rec) {
            if (rec.get("status") !== "OPEN") {
                return;
            }
        }

        me.instantWindow('FormDataDetail', 500, 'Detail Progress', s, 'myWindow');
        var f = me.getFormdatadetail();
        var gd = me.getGriddetail();
        var gi = me.getGridimage();
        gi.doInit();




        if (s === "create") {
            f.setLoading("Please wait, loading image");
            f.editedRow = -1;
            me.tools.ajax({
                params: {
                    construction_id: 0
                },
                success: function(gid, gim) {

                    me.tools.wesea({
                        data: gid,
                        model: gim
                    }, gi).grid();
                    f.setLoading(false);


                }
            }).read('picture');

        } else {
            var form = me.getFormdatadetail();
            var rec = gd.getStore().getAt(row);
            form.loadRecord(rec);
            form.editedRow = row;

            f.setLoading("Please wait, loading image");
            me.tools.ajax({
                params: {
                    construction_id: rec.get("construction_id")
                },
                success: function(gid, gim) {

                    me.tools.wesea({
                        data: gid,
                        model: gim
                    }, gi).grid();
                    f.setLoading(false);


                }
            }).read('picture');
        }
    },
    /*  showFormDetail: function(state) {
     var s = typeof state === "undefined" ? "create" : state;
     var me = this;
     me.instantWindow('FormDataDetail', 500, 'Detail Progress', s, 'myWindow');
     var imageStore = me.getGridimage().getStore();
     if (!me.storeExist(imageStore)) {
     me.getGridimage().createStore(me, 'ProgressImageStore', 'constructionpicture_id', {
     mode_read: "picture"
     });
     me.nomBindingModel('image', me.getGridimage().getStore());
     }
     
     
     if (s === "create") {
     
     } else {
     
     }
     },*/
    showFormImage: function(state) {
        var s = typeof state === "undefined" ? "create" : state;
        var me = this;
        me.instantWindow('FormDataImage', 500, 'Picture', s, 'myWindowImage');
        if (s === "create") {
            me.getFormdataimage().down("#photo_image").hide();
        } else {


        }

    },
    fdar: function() {
        var me = this;




        var x = {
            init: function() {
                /* YOUR FORM DATA AFTER RENDER INIT HERE*/
                me.setActiveForm(me.getFormdata());

                /* set contractor store*/




            },
            create: function() {
                /* CREATE STATE HERE */
            },
            update: function() {
                /* UPDATE STATE HERE */
                var f = me.getFormdata();

                me.getGriddetail().getStore().loadData([], false);
                var rec = me.getGrid().getSelectedRecord();
                f.editedRow = me.getGrid().getSelectedRow();
                f.loadRecord(rec);
                f.down("[name=spk_spk_id]").setValue(rec.get("spk_id"));


                me.loadDetail(function() {

                    var status = rec.get("status");


                    if (status !== 'OPEN') {
                        me.getGriddetail().down("toolbar button[action=create]").setDisabled(true);

                    }


                    me.localStore.contractor.load({
                        params: {
                            contractor_id: rec.get("contractor_contractor_id")
                        },
                        callback: function(rec) {
                            var el = null;
                            for (var x in rec[0].data) {

                                el = f.down("[name=contractor_" + x + "]");

                                if (el !== null) {
                                    el.setValue(rec[0].data[x]);
                                }
                            }
                            f.setLoading(false);



                        }
                    });
                });






            }
        };
        return x;
    },
    loadDetail: function(callback) {
        var me = this;
        me.tools.ajax({
            params: {
                spk_id: me.getv("spk_spk_id"),
                unit_id: 0
            },
            success: function(gid, gim) {

                me.tools.wesea({
                    data: gid,
                    model: gim
                }, me.getGriddetail()).grid();

                if (typeof callback === 'function') {
                    callback();
                }


            }
        }).read('constructionspk');
    },
    nomFunctioninDataSearch: function() {

        var me = this;
        var grid = me.getGridmaindetail();
        if (!me.storeExist(grid.getStore())) {
            me.getGridmaindetail().createStore(me, me.controllerName + 'MainDetail', 'construction_id', {
                mode_read: "constructionspk"
            });

            var pt = grid.down("pagingtoolbar"); /// pagingtoolbar
            pt.bindStore(me.getGridmaindetail().getStore());
        } else {
            // console.log("[ERROR] MainDetail Store exist "+me.controllerName);
        }
        /* set images store for gallery*/
        me.localStore.images = me.instantStore({
            id: me.controllerName + 'ImagesGallery',
            extraParams: {
                mode_read: 'picture'
            }
        });


        var foo = {
            do: function() {
                me.nomBindingModel('contructionspk', me.getGridmaindetail().getStore());
                me.nomBindingModel('image', me.localStore.images);
            }
        };




        if (me.acmoDone) {

            foo.do();
        } else { /* jika tidak maka kita daftarkan function kita ke dalam antrian acmoArrayFunc*/

            this.acmoArrayFuncs.push(foo);

        }
    }




});