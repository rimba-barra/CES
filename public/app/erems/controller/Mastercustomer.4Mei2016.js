Ext.define('Erems.controller.Mastercustomer', {
    extend: 'Erems.library.template.controller.Controllerwb',
    alias: 'controller.Mastercustomer',
    views: ['mastercustomer.Panel', 'mastercustomer.Grid', 'mastercustomer.FormSearch', 'mastercustomer.FormData'],
    //  stores: ['Mastercustomer'],
    //models: ['Mastercustomer'],
    requires: ['Erems.library.ComboLoader','Erems.library.ModuleTools'],
    refs: [
        {
            ref: 'grid',
            selector: 'mastercustomergrid'
        },
        {
            ref: 'formsearch',
            selector: 'mastercustomerformsearch'
        },
        {
            ref: 'formdata',
            selector: 'mastercustomerformdata'
        }
    ],
    controllerName: 'mastercustomer',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: ['fd_cb_purpose', 'fd_cb_religion'],
    bindPrefixName: 'Mastercustomer',
    localStore: {
        detail: null
    },
    validationItems: [{name: 'name', msg: 'Name is empty'}

    ],
    comboLoader: null,
    cbf: null,
    mt:null,
    formxWinId: 'win-customerwinId',
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
        this.control({
            'mastercustomerpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'mastercustomergrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'mastercustomergrid toolbar button[action=create]': {
                click: function(el) {
                    //   this.formDataShow(el,'create','create');
                }
            },
            'mastercustomergrid toolbar button[action=update]': {
                click: function(el) {
                    //  this.formDataShow(el,'update','update');
                }
            },
            'mastercustomergrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'mastercustomergrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'mastercustomergrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.insActionColumnClick
            },
            'mastercustomerformsearch button[action=search]': {
                click: this.dataSearch
            },
            'mastercustomerformsearch button[action=reset]': {
                click: this.dataReset
            },
            'mastercustomerformdata': {
                afterrender: this.formDataAfterRender
            },
            'mastercustomerformdata button[action=save]': {
                click: this.mainDataSave
            },
            'mastercustomerformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'mastercustomerformdata #fd_photo': {
                change: function(fld, a) {
                    me.formDataUploadImage(fld, a, 'mode');
                }
            },
            'mastercustomerformdata #fd_name': {
                keyup: me.createUsername
            },
            'mastercustomerformdata #fd_birthdate': {
                select: me.createUsername
            },
            'mastercustomerformdata [name=name]': {
                blur: me.nameAddressOnBlur
            },
            'mastercustomerformdata [name=address]': {
                blur: me.nameAddressOnBlur
            },
            /* BROWSE CONTROL */
            'mastercustomerbrowsepanel': {
                beforerender: me.browsepanelBeforeRender
            },
            'mastercustomerbrowsepanel button[action=select]': {
                click: me.browsegridSelection
            },
            'mastercustomerbrowsegrid': {
                afterrender: me.browsegridAfterRender
            }
            /* END BROWSE CONTROL */



        });
    },
    nameAddressOnBlur:function(){
        var me = this;
        var f = me.getFormdata();
        f.down("[name=KTP_name]").setValue(f.down("[name=name]").getValue());
         f.down("[name=KTP_address]").setValue(f.down("[name=address]").getValue());
    },
    createUsername: function(ele) {
        var me = this;
        var form = me.getFormdata();

        var cName = form.down('#fd_name').getValue();
        var birthd = form.down('#fd_birthdate').getValue();
        var mbirth, dbirth;
        var newCName = '';
        var cNameArr = '';
        if (cName.length >= 8 && birthd != null) {
            cNameArr = cName.replace(/ /g, "");
            if (cNameArr.length > 8) {
                birthd = Ext.Date.format(birthd, "d m y").split(" ");
                mbirth = birthd[1];
                dbirth = birthd[0];
                newCName = cNameArr.substr(0, 8) + '' + dbirth + '' + mbirth;
                form.down('#fd_username').setValue(newCName);
                form.down('[name=password]').setValue('pass12345');
            }
        }



    },
    formDataUploadImage: function(fld, a, mode) {

        var me = this;
        var form = fld.up("form");
        me.uploadImage({
            form: form,
            callback: {
                success: function(imageName) {
                    me.refreshPhotoInfo(imageName);
                },
                failure: function() {

                }
            }
        });


    },
    mainDataSave: function() {
        var me = this;
        me.tools.iNeedYou(me).save();
     /*   me.insSave({
            form: me.getFormdata(),
            grid: me.getGrid(),
            store: me.localStore.detail,
            finalData: function(data) {
                return data;
            },
            sync: true,
            callback: {
                create: function(store, form, grid) {
                    // me.getGriddetail();

                }
            }
        });*/
    },
    refreshPhotoInfo: function(imageName) {
        var me = this;
        var form = me.getFormdata();
         form.down("[name=photo]").setValue(imageName);
         me.mt.customerPhoto(form.down("#photo_image"),imageName,me.myConfig.IMG_FOLDER);
    },
    fdar: function() {



        var me = this;
        var f = me.getFormdata();
        me.mt = new Erems.library.ModuleTools();
        var x = {
            init: function() {
                me.setActiveForm(f);

                me.localStore.detail = me.instantStore({
                    id: me.controllerName + 'PLDetailStore',
                    extraParams: {
                        mode_read: 'maindetail'
                    },
                    idProperty: 'customer_id'
                });





            },
            create: function() {

                /* request model from zend */



                me.tools.ajax({
                    params: {
                        // purchaseletter_id: plId
                    },
                    success: function(data, model) {

                        me.fillFormComponents(data, f);


                        me.localStore.detail.load({
                            callback: function(rec, op) {
                                me.attachModel(op, me.localStore.detail);

                            }
                        });

                        f.setLoading(false);
                    }
                }).read('detail');
            },
            update: function() {
                //var rec = me.getGrid().getSelectedRecord();
                var rec = me.getGrid().getSelectedRecord();
                var idCustomer = typeof rec === "undefined" ? 0 : rec.get("customer_id");

                me.tools.ajax({
                    params: {
                    },
                    success: function(data, model) {

                        me.fillFormComponents(data, f);


                        me.localStore.detail.load({
                            params: {
                                customer_id: idCustomer
                            },
                            callback: function(rec, op) {

                                me.attachModel(op, me.localStore.detail);
                                var rec = me.localStore.detail.getAt(0);

                                me.getFormdata().loadRecord(rec);
                                me.refreshPhotoInfo(rec.get("photo"));
                                me.getFormdata().editedRow = me.getGrid().getSelectedRow();
                            }
                        });

                        f.setLoading(false);
                    }
                }).read('detail');







                // me.getFormdata().loadRecord(rec);


            }
        };
        return x;
    },
    fillFormComponents: function(data, form) {
        var me = this;
        me.tools.wesea(data.purpose, form.down("[name=purpose_" + me.cbf.purpose.v + "]")).comboBox();
        me.tools.wesea(data.religion, form.down("[name=religion_" + me.cbf.religion.v + "]")).comboBox();
        me.tools.wesea(data.education, form.down("[name=education_" + me.cbf.education.v + "]")).comboBox();
        me.tools.wesea(data.city, form.down("[name=city_" + me.cbf.city.v + "]")).comboBox();
        me.tools.wesea(data.city, form.down("[name=company_" + me.cbf.city.v + "]")).comboBox();
        //citraclub_id

    }

});