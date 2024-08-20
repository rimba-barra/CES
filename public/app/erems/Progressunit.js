Ext.define('Erems.controller.Progressunit', {
    extend: 'Erems.library.template.controller.Controller2',
    alias: 'controller.Progressunit',
    requires: ['Erems.library.Browse', 'Erems.library.box.Config', 'Erems.library.box.tools.Tools', 'Erems.template.ComboBoxFields', 'Erems.library.box.tools.EventSelector'],
    views: ['progressunit.Panel', 'progressunit.Grid', 'progressunit.FormSearch', 'progressunit.FormData'],
    refs: [
        {
            ref: 'grid',
            selector: 'progressunitgrid'
        },
        {
            ref: 'gridmaindetail',
            selector: 'progressgridmaindetail'
        },
        {
            ref: 'griddetail',
            selector: 'progressgriddetail'
        },
        {
            ref: 'gridimage',
            selector: 'progressgridimage'
        },
        {
            ref: 'gridspk',
            selector: 'progressgridspk'
        },
        //

        {
            ref: 'formsearch',
            selector: 'progressunitformsearch'
        },
        {
            ref: 'formdata',
            selector: 'progressunitformdata'
        },
        {
            ref: 'formdatadetail',
            selector: 'progressunitformdatadetail'
        },
        {
            ref: 'formdataimage',
            selector: 'progressunitformdataimage'
        },
        {
            ref: 'formdatagallery',
            selector: 'progressunitformdatagallery'
        },
        {
            ref: 'formdataspk',
            selector: 'progressunitformdataspk'
        },
        {
            ref: 'panel',
            selector: 'progressunitpanel'
        },
        {
            ref: 'gridtarget',
            selector: 'progressgridtarget'
        },
        {
            ref: 'gridcair',
            selector: 'progressgridpencairan'
        }
    ],
    controllerName: 'progressunit',
    fieldName: 'construction_id',
    bindPrefixName: 'Progressunit',
    formWidth: 800,
    nomMaster: 'main_list',
    nomIdProperty: 'construction_id',
    imageFolder: 'app/erems/uploads/progress_unit/',
    localStore: {
        spkList: null,
        mainConstruction: null,
        unitInfo: null,
        images: null
    },
    dae: {
        unit: null,
        cluster: null,
        block: null
    },
    currentSpkPos: 0,
    cbf: null,
    mt: null,
    tools: null,
    myConfig: null,
    isSendMail: false,
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
        this.control({
            'progressunitpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'progressunitgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'progressgridtarget': {
                afterrender: function(grid) {
                    me.gridTargetAfterRender(grid);
                },
            },
            'progressunitgrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'progressunitgrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'progressunitgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'progressunitgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'progressgridtarget toolbar button[action=generate]': {
                click: function() {
                    me.generateTarget();
                }
            },
            'progressunitgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'progressunitformsearch button[action=search]': {
                click: this.dataSearch
            },
            'progressunitformsearch button[action=reset]': {
                click: this.dataReset
            },
            'progressunitformdata': {
                afterrender: this.formDataAfterRender
            },
            'progressunitformdata button[action=save]': {
                click: function() {

                }
            },
            'progressunitformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'progressunitformdata button[action=next]': {
                click: function() {
                    me.moveSpkList('next');
                }
            },
            'progressunitformdata button[action=previous]': {
                click: function() {
                    me.moveSpkList('previous');
                }
            },
            'progressunitformdatagallery button[action=next]': {
                click: function() {
                    me.moveImagesList('next');
                }
            },
            'progressunitformdatagallery button[action=previous]': {
                click: function() {
                    me.moveImagesList('previous');
                }
            },
            'progressunitformdata button[action=show_spk]': {
                click: function() {
                    me.showFormSpk('create');
                }
            },
            //
            'progressunitformdata [name=unit_unit_id]': {
                select: function(el, val) {
                    me.unitOnSelect();
                }
            },
            'progressgriddetail toolbar button[action=create]': {
                click: function() {
                    me.showFormDetail();
                }
            },
            'progressgridimage toolbar button[action=addNewDetail]': {
                click: function() {
                    me.showFormImage();
                }
            },
            'progressunitformdatadetail button[action=save]': {
                click: this.mainDataSave
            },
            'progressgriddetail actioncolumn': {
                click: this.insActionColumnClick
            },
            'progressunitformdataimage button[action=save]': {
                click: this.imageDataSave
            },
            'progressgridimage actioncolumn': {
                click: this.insActionColumnClick
            },
            'progressgridmaindetail actioncolumn': {
                click: this.insActionColumnClick
            },
            'progressunitformdataspk toolbar button[action=select_spk]': {
                click: me.selectSPKFromList
            },
            'progressunitformsearch': {
                afterrender: this.progressunitformsearchAfterRender
            }
        });
    },
    gridTargetAfterRender: function(grid) {
        var me = this;




        grid.on('edit', function(editor, e) {

            e.record.commit();
            console.log(e.record.data);
            grid.setLoading("Please wait...");
            var p = e.record.data;
            p['unit_id'] = 0;
            p['spk_id'] = 0;
            me.tools.ajax({
                params: p,
                success: function(data, model) {

                    grid.setLoading(false);

                }
            }).read('updatetarget');
        });
    },
    generateTarget: function() {
        var me = this;
        var f = me.getFormdata();
        f.setLoading("Please wait...");
        me.tools.ajax({
            params: {
                spk_id: f.down("[name=spk_spk_id]").getValue(),
                unit_id: f.down("[name=unit_unit_id]").getValue(),
            },
            success: function(data, model) {
                console.log(data);
                var hasil = data['others'][0][0]['STATUS'];
                f.setLoading(false);
                if (!hasil) {
                    me.tools.alert.warning("Failed. Please try again");
                } else {
                    me.loadTargetList();
                }

            }
        }).read('generatetarget');
    },
    insActionColumnClick: function(view, cell, row, col, e) {
        var m = e.getTarget().className.match(/\bact-(\w+)\b/);
        if (m) {
            this.insACC(view, m[1], row);
        }





    },
    deleteImageFromGrid: function(row) {
        console.log("delete...");
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
        /// testing Mustache
        /* 
         console.log("testing mustache");
         
         $.getScript("app/erems/uploads/mustache/mustache.js", function() {
         
         
         // Here you can use anything you defined in the loaded script
         
         
         
         
         
         $.get("app/erems/email_template/test.html", function(data) {
         
         var person = {
         firstName: "Christophe",
         lastName: "Coenraets",
         blogURL: "http://coenraets.org",
         name:"Tommy"
         };
         
         
         var template = data;
         var html = Mustache.to_html(template, person);
         
         p.removeAll();
         p.add({
         html: html
         });
         
         p.doComponentLayout();
         
         });
         
         
         
         
         });
         
         
         
         return;
         
         /// end testing Mustache
         
         */


        var gm = me.getGridmaindetail();
        gm.doInit();
        /* set spklist store*/
        me.localStore.spkList = me.instantStore({
            id: me.controllerName + 'SpkList',
            extraParams: {
                mode_read: 'listspk'
            }
        });

        /* set unitinfo store*/
        me.localStore.unitInfo = me.instantStore({
            id: me.controllerName + 'UnitInfo',
            extraParams: {
                mode_read: 'unitinfo'
            }
        });

        me.localStore.mainConstruction = me.instantStore({
            id: me.controllerName + 'MainConstruction',
            extraParams: {
                mode_read: 'maindetail'
            }
        });

        me.localStore.images = me.instantStore({
            id: me.controllerName + 'ImagesGallery',
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


                p.setLoading("Please wait,loading  unitinformation components..");
                me.localStore.unitInfo.load({
                    params: {
                        unit_id: 0
                    },
                    callback: function(recui, opui) {
                        me.attachModel(opui, me.localStore.unitInfo, false);
                        p.setLoading("Please wait,loading spklist components..");
                        me.localStore.spkList.load({
                            params: {
                                spk_id: 0
                            },
                            callback: function(recsl, opsl) {
                                me.attachModel(opsl, me.localStore.spkList, false);
                                p.setLoading("Please wait,loading detail components..");
                                me.localStore.mainConstruction.load({
                                    params: {
                                        construction_id: 0
                                    },
                                    callback: function(recmc, opmc) {
                                        me.attachModel(opmc, me.localStore.mainConstruction, false);
                                        p.setLoading("Please wait,loading images components..");
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

                                                        var gp = data.others[0][0]['GLOBALPARAMSPARAMS'];
                                                        if (gp['PROGRESS_SEND_MAIL']) {
                                                            me.isSendMail = me.tools.intval(gp['PROGRESS_SEND_MAIL']);
                                                        }
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
                });

            }
        }).read('listspk');
    },
    fillFormSearchComponents: function(data, form) {
        var me = this;
        me.tools.wesea(data.cluster, form.down("[name=cluster_id]")).comboBox();
        me.tools.wesea(data.block, form.down("[name=block_id]")).comboBox();

    },
    progressunitformsearchAfterRender: function() {

        var me = this;
        var z = {
            do: function() {
                var ar = ['cluster_id', 'block_id', 'unit_id'];
                /*@model name*/
                var arx = ['cluster', 'block', 'unit'];
                for (var x in ar) {
                    var y = me.getFormsearch().down("[name='" + ar[x] + "']");

                    y.createStore(me, arx[x]);
                    y.getStore().load();
                }
            }
        };

        if (this.acmoDone) {
            z.do();
        } else {
            this.acmoArrayFuncs.push(z);
        }






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
            //store.getProxy().setExtraParam("unit_id", rec.get("unit_id"));
            /* store.load({
             params:{
             unit_id:rec.get("unit_id")
             },
             callback: function() {
             me.getGrid().setDisabled(false);
             }
             });*/

            me.tools.ajax({
                params: {
                    unit_id: rec.get("unit_id")
                },
                success: function(data, model) {

                    me.tools.wesea({
                        data: data,
                        model: model
                    }, me.getGridmaindetail()).grid();
                    me.getGrid().setDisabled(false);


                }
            }).read('listspk');
        }



    },
    selectSPKFromList: function() {
        var me = this;
        var rec = me.getGridspk().getSelectedRecord();
        if (typeof rec === "undefined") {
            Ext.Msg.alert("Alert", "Select 1 SPK First");
            // me.getFormdataspk().up("window").close();
        } else {
            me.fillSpkInfo(rec.index);
            // me.fillUnitInfo(id);
            me.currentSpkPos = rec.index;
            me.updatePageInfo();
            me.getFormdataspk().up("window").close();
        }
    },
    insACC: function(view, action, row) {
        var me = this;
        var grid = view.up("grid");
        var store = grid.getStore();

        switch (grid.itemId) {
            case "ProgressGridDetail":
                if (action == "destroy") {
                    var rec = store.getAt(row);
                    console.log(rec);
                    // store.removeAt(row);
                    // store.loadPage(1);
                    me.tools.ajax({
                        params: {construction_id: rec.get("construction_id")},
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
                    //  me.deleteDetailInMaster(me.getGriddetail(), me.getGridimage(), row, me.getFormdatadetail().down("[name=construction_id]").getValue());
                    me.deleteImageFromGrid(row);
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
            case "ProgressMainDetailGrid":
                if (action === "view") {
                    me.galleryShow(store, row);
                }
                break;
        }
    },
    galleryShow: function(store, row, mode) {
        var me = this;
        me.showFormGallery();
        var m = typeof mode === 'undefined' ? 'construction' : 'spkunit';
        var p = {
            construction_id: store.getAt(row).get("construction_id"),
            mode: m
        };
        if (m === "spkunit") {
            p["spk_id"] = store.getAt(row).get("spk_id");
            p["unit_id"] = me.getGrid().getSelectedRecord().get("unit_id");
        }
        me.localStore.images.load({
            params: p,
            callback: function(rec) {
                me.currentImgPos = 0;
                me.updateGalleryPageInfo();
                me.fillGalleryInfo();
            }
        });
    },
    //picturespkunit
    mainDataSave: function() {
        var me = this;
        me.insSave({
            form: me.getFormdatadetail(),
            grid: me.getGriddetail(),
            store: me.localStore.mainConstruction,
            finalData: function(data) {
                data['spk_spk_id'] = me.getv("spk_spk_id");
                data['unit_unit_id'] = me.getv("unit_unit_id");
                data['progressdetail'] = me.tools.gridHelper(me.getGridimage()).getJson();
                if (me.getFormdatadetail().editedRow > -1) {
                    data['deletedRows'] = me.getGriddetail().getStore().getAt(me.getFormdatadetail().editedRow).get("deletedRows");

                }
                return data;
            },
            sync: true,
            callback: {
                create: function(store, form, grid) {

                    me.loadTargetCair(me.getv("unit_unit_id"),me.getv("spk_spk_id"));
                    me.refreshGridDetail(me.getv("spk_spk_id"), me.getv("unit_unit_id"));
                },
                update: function(store, form, grid) {
                    me.loadTargetCair(me.getv("unit_unit_id"),me.getv("spk_spk_id"));
                    me.refreshGridDetail(me.getv("spk_spk_id"), me.getv("unit_unit_id"));
                    // me.getGridcair().getStore().loadPage(1);
                }
            }
        });
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
        me.instantWindow('FormDataDetail', 500, 'Detail Progress', s, 'myWindow');
        var f = me.getFormdatadetail();
        var fm = me.getFormdata();
        var gd = me.getGriddetail();
        var gi = me.getGridimage();
        gi.doInit();


        //// set unit information
        var arf = ['unit_unit_number', 'cluster_code', 'block_code', 'cluster_cluster', 'block_block'];
        for (var i in arf) {
            f.down("[name=" + arf[i] + "]").setValue(fm.down("[name=" + arf[i] + "]").getValue());
        }


        f.down("[name=send_mail]").setDisabled(me.isSendMail === 1 ? false : true);


        if (s === "create") {
            f.setLoading("Please wait, loading image");
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
    showFormImage: function(state) {
        var s = typeof state === "undefined" ? "create" : state;
        var me = this;
        me.instantWindow('FormDataImage', 500, 'Picture', s, 'myWindowImage');
        if (s === "create") {
            me.getFormdataimage().down("#photo_image").hide();
        } else {


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
    showFormSpk: function(state) {
        var s = typeof state === "undefined" ? "create" : state;
        var me = this;
        me.instantWindow('FormDataSpk', 500, 'SPK List', s, 'myWindowSpk');
        if (!me.storeExist(me.getGridspk().getStore())) {
            me.getGridspk().createStore(me, 'ProgressSPKStore', 'spk_id');
            me.nomBindingModel('spk', me.getGridspk().getStore());
        }
        var jumlah = me.localStore.spkList.getCount();
        for (var i = 0; i < jumlah; i++) {
            me.getGridspk().getStore().add(me.localStore.spkList.getAt(i));
        }

        if (s === "create") {

        } else {


        }

    },
    unitOnSelect: function() {
        var me = this;
        var f = me.getFormdata();
        var id = me.tools.intval(f.down('[name=unit_unit_id]').getValue());
        me.getActiveForm().up('window').body.mask('Loading data, please wait...');
        me.getGriddetail().getStore().loadData([], false);
        /*load spk list */

        if (me.localStore.spkList != null) {
            me.localStore.spkList.getProxy().setExtraParam("unit_id", id);
            me.localStore.spkList.load({
                callback: function(rec) {

                    if (me.localStore.spkList.getCount() > 0) {

                        me.getGriddetail().setDisabled(false);
                        me.refreshGridDetail(me.localStore.spkList.getAt(0).get("spk_id"), id);

                        me.fillSpkInfo(0);
                        me.fillUnitInfo(id);
                        me.currentSpkPos = 0;
                        me.updatePageInfo();

                    } else {
                        Ext.Msg.alert("Alert", "No SPK for this unit");
                        me.getActiveForm().up('window').body.unmask();
                    }


                }
            });
        } else {
            console.log("[Error] spk list store null");
        }
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
    fillUnitInfo: function(unitId) {
        var me = this;
        if (me.localStore.unitInfo != null) {
            me.localStore.unitInfo.load({
                params: {
                    unit_id: unitId
                },
                callback: function(rec) {

                    if (typeof rec === 'object') {
                        rec = me.localStore.unitInfo.getAt(0);
                        me.getFormdata().loadRecord(rec);
                    }


                }
            });
        } else {
            console.log("[Error] unit info store null");
        }
    },
    fillSpkInfo: function(pos) {
        var me = this;
        var rec = me.localStore.spkList.getAt(pos);

        me.getActiveForm().loadRecord(rec);
        me.setv("spk_spk_id_display", rec.get("spk_id"));
        me.setv("spk_spk_id", rec.get("spk_id"));
        /* load construction list*/
        var detailStore = me.getGriddetail().getStore();
        //  detailStore.getProxy().setExtraParam("unit_id", me.getv("unit_unit_id"));
        // detailStore.getProxy().setExtraParam("spk_id", me.getv("spk_spk_id"));
        detailStore.load({
            params: {
                unit_id: me.getv("unit_unit_id"),
                spk_id: me.getv("spk_spk_id")
            },
            callback: function(recb) {


                me.loadTargetCair(me.getv("unit_unit_id"), me.getv("spk_spk_id"));
                me.getActiveForm().up('window').body.unmask();
            }
        });
    },
    loadTargetCair: function(unitId, spkId) {

      

        var me = this;
        var gt = me.getGridtarget();
        var gc = me.getGridcair();

        gt.getStore().load({
            params: {
                //state:"load_default_attribute"
                unit_id: unitId,
                spk_id: spkId
            },
            callback: function(rec, op) {
                
                gt.attachModel(op);
            }
        });
        gc.getStore().load({
            params: {
                //state:"load_default_attribute"
                unit_id: unitId,
                spk_id: spkId
            },
            callback: function(rec, op) {
                gc.attachModel(op);
            }
        });

    },
    loadTargetList: function() {
        var me = this;
        var f = me.getFormdata();
        var gt = me.getGridtarget().getStore();
        gt.getProxy().setExtraParam('unit_id', f.down("[name=unit_unit_id]").getValue());
        gt.getProxy().setExtraParam('spk_id', f.down("[name=spk_spk_id]").getValue());
        gt.loadPage(1);
    },
    moveSpkList: function(mode) {
        var me = this;
        var pos = me.currentSpkPos;
        var totalRec = me.localStore.spkList.getCount();
        if (mode === 'next') {
            if (pos < totalRec) {
                pos++;
            }

        } else {
            if (pos > 0) {
                pos--;
            }

        }

        me.currentSpkPos = pos;
        me.updatePageInfo();
        me.fillSpkInfo(pos);
    },
    updatePageInfo: function() {
        var me = this;
        var totalRec = me.localStore.spkList.getCount();
        var page = me.currentSpkPos + 1;
        page = page > totalRec ? totalRec : page;
        me.getFormdata().down('#spkPageInfo').setText("Page " + (page) + " of " + totalRec);
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
    updateGalleryPageInfo: function() {
        var me = this;
        var currentPage = me.currentImgPos;
        var totalRec = me.localStore.images.getCount();
        var page = currentPage + 1;
        page = page > totalRec ? totalRec : page;
        me.getFormdatagallery().down('#galleryPageInfo').setText("Page " + page + " of " + totalRec);

    },
    fillGalleryInfo: function() {
        var me = this;
        var index = me.currentImgPos;
        var rec = me.localStore.images.getAt(index);
        var form = me.getFormdatagallery();
        if (typeof rec !== "undefined") {
            form.down('#photo_image').el.setStyle({backgroundImage: 'url(' + me.imageFolder + rec.get("images") + ')', backgroundSize: '300px 350px'});
            form.down('[name=description]').setValue(rec.get("description"));
        }

    },
    fdar: function() {

        var me = this;
        var gt = me.getGridtarget();
        var gc = me.getGridcair();
        var f = me.getFormdata();
        var x = {
            init: function() {


                me.setActiveForm(f);

                var gd = me.getGriddetail();
                gd.doInit();


                gt.doInit();
                gc.doInit();

                me.getFormdata().down("#ProgressGridDetail").setDisabled(true);



            },
            create: function() {

            },
            update: function() {




                var rec = me.getGrid().getSelectedRecord();
                me.getFormdata().down("[name=unit_unit_number]").setValue(rec.get("unit_number"));
                me.getFormdata().down("[name=unit_unit_id]").setValue(rec.get("unit_id"));
                me.unitOnSelect();

            }
        };
        return x;
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
    },
});