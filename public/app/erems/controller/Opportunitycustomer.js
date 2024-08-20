Ext.define('Erems.controller.Opportunitycustomer', {
    extend: 'Erems.library.template.controller.Controllerwb',
    alias: 'controller.Opportunitycustomer',
    views: ['opportunitycustomer.Panel', 'opportunitycustomer.Grid', 'opportunitycustomer.FormSearch', 'opportunitycustomer.FormData'],
    //  stores: ['Opportunitycustomer'],
    //models: ['Opportunitycustomer'],
    requires: ['Erems.library.ComboLoader','Erems.library.ModuleTools','Erems.library.box.Config','Erems.library.box.tools.Tools','Erems.template.ComboBoxFields'],
    refs: [
        {
            ref: 'grid',
            selector: 'opportunitycustomergrid'
        },
        {
            ref: 'formsearch',
            selector: 'opportunitycustomerformsearch'
        },
        {
            ref: 'formdata',
            selector: 'opportunitycustomerformdata'
        }
    ],
    controllerName: 'opportunitycustomer',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: ['fd_cb_purpose', 'fd_cb_religion'],
    bindPrefixName: 'Opportunitycustomer',
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
            'opportunitycustomerpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'opportunitycustomergrid': {
                afterrender: this.gridAfterRender,
                // afterrender: this.dataReset,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'opportunitycustomergrid toolbar button[action=create]': {
                click: function(el) {
                    //   this.formDataShow(el,'create','create');
                }
            },
            'opportunitycustomergrid toolbar button[action=update]': {
                click: function(el) {
                    //  this.formDataShow(el,'update','update');
                }
            },            
            'opportunitycustomergrid toolbar button[action=excel_all]': {
                click: function(){
                    me.saveExcelAll();
                }
            },
            'opportunitycustomergrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'opportunitycustomergrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'opportunitycustomergrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.insActionColumnClick
            },
            'opportunitycustomerformsearch button[action=search]': {
                click: this.dataSearch
            },
            'opportunitycustomerformsearch button[action=reset]': {
                click: this.dataReset
            },
            'opportunitycustomerformdata': {
                afterrender: this.formDataAfterRender
            },
            'opportunitycustomerformdata button[action=save]': {
                click: this.mainDataSave
            },
            'opportunitycustomerformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'opportunitycustomerformdata #fd_photo': {
                change: function(fld, a) {
                    me.formDataUploadImage(fld, a, 'mode');
                }
            },
            'opportunitycustomerformdata #fd_name': {
                keyup: me.createUsername
            },
            'opportunitycustomerformdata #fd_birthdate': {
                select: me.createUsername
            },
            'opportunitycustomerformdata [name=name]': {
                blur: me.nameAddressOnBlur
            },
            'opportunitycustomerformdata [name=address]': {
                blur: me.nameAddressOnBlur
            },
            /* BROWSE CONTROL */
            'opportunitycustomerbrowsepanel': {
                beforerender: me.browsepanelBeforeRender
            },
            'opportunitycustomerbrowsepanel button[action=select]': {
                click: me.browsegridSelection
            },
            'opportunitycustomerbrowsegrid': {
                afterrender: me.browsegridAfterRender
            }
            /* END BROWSE CONTROL */



        });
    },
    nameAddressOnBlur:function(){
        var me = this;
        var f = me.getFormdata();
        
        if(f.down("[name=is_change_ktpaddress]").checked){
            f.down("[name=KTP_name]").setValue(f.down("[name=name]").getValue());
             f.down("[name=KTP_address]").setValue(f.down("[name=address]").getValue());
        }
        
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
                    idProperty: 'opportunitycustomer_id'
                });





            },
            create: function() {

                /* request model from zend */



                me.tools.ajax({
                    params: {
                        // purchaseletter_id: plId
                    },
                    success: function(data, model) {

                        /* start edited by ahmad riadi */
                        var otherdata;
                        me.fillFormComponents(data, f);
                        me.localStore.detail.load({
                            callback: function(rec, op) {
                                me.attachModel(op, me.localStore.detail);

                            }
                        });
                        otherdata = data.others[0][0];
                        f.down("[name=addname]").setValue(otherdata.addname+" ( Will add )");
                        f.down("[name=Addon]").setValue(otherdata.Addon+" ( Will add )");                       
                        /* end edited by ahmad riadi */

                        f.setLoading(false);
                    }
                }).read('detail');
            },
            update: function() {
                //var rec = me.getGrid().getSelectedRecord();
                var rec = me.getGrid().getSelectedRecord();
                var idCustomer = typeof rec === "undefined" ? 0 : rec.get("opportunitycustomer_id");

                me.tools.ajax({
                    params: {
                    },
                    success: function(data, model) {

                        me.fillFormComponents(data, f);


                        me.localStore.detail.load({
                            params: {
                                opportunitycustomer_id: idCustomer
                            },
                            callback: function(rec, op) {

                               /* start edited by ahmad riadi */
                                var data;
                                me.attachModel(op, me.localStore.detail);
                                var rec = me.localStore.detail.getAt(0);
                                data = rec.data;
                                if(data.Modion==''){
                                    rec.data.Modion = rec.data.Currentdate+" ( Will edit )";
                                    rec.data.modiname = rec.data.Currentusername+" ( Will edit )";
                                }
                                /* end edited by ahmad riadi */
                                me.getFormdata().loadRecord(rec);

                                //me.refreshPhotoInfo(rec.get("photo"));
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
    
    saveExcelAll: function() {
        var me = this;
        var p = me.getGrid();
        var params = me.getFormsearch().getValues();
        params["page"] = me.getGrid().getStore().currentPage;
//        params["smscategory_id"] = me.getFormsearch().down("[name=smscategory_id]").getValue();
        p.setLoading("Please wait...");
        me.tools.ajax({
            params: params,
            success: function(data, model) {
                p.setLoading(false);
                var url = data['others'][0][0]['URL'];
                if (url) {
                    Ext.Msg.show({
                        title: 'Info',
                        msg: '<a href="' + url + '" target="blank">Download file</a>',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function() {

                        }
                    });
                }
               

            }
        }).read('saveexcelall');
    },
    fillFormComponents: function(data, form) {
        var me = this;
        me.tools.wesea(data.purpose, form.down("[name=purpose_" + me.cbf.purpose.v + "]")).comboBox();
        me.tools.wesea(data.religion, form.down("[name=religion_" + me.cbf.religion.v + "]")).comboBox();
        me.tools.wesea(data.education, form.down("[name=education_" + me.cbf.education.v + "]")).comboBox();
        me.tools.wesea(data.city, form.down("[name=city_" + me.cbf.city.v + "]")).comboBox();
        me.tools.wesea(data.city, form.down("[name=company_" + me.cbf.city.v + "]")).comboBox();
        me.tools.wesea(data.downline, form.down("[name=downline_id]")).comboBox();
        //citraclub_id

    }

});