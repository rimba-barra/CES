Ext.define('Erems.controller.Verification', {
    extend   : 'Erems.library.template.controller.Controller2',
    requires : ['Erems.library.Browse',
        'Erems.library.box.Config',
        'Erems.library.box.tools.Tools',
        'Erems.template.ComboBoxFields',
        'Erems.library.box.tools.EventSelector',
        'Erems.library.ModuleTools'
    ],
    alias : 'controller.Verification',
    views : ['verification.Panel', 'verification.Grid', 'verification.FormSearch', 'verification.FormData'],
    refs  : [
        {
            ref      : 'panel',
            selector : 'verificationpanel'
        },
        {
            ref      : 'grid',
            selector : 'verificationgrid'
        },
        {
            ref      : 'formsearch',
            selector : 'verificationformsearch'
        },
        {
            ref      : 'formdata',
            selector : 'verificationformdata'
        },
        {
            ref      : 'formdataprocess',
            selector : 'verificationformdataprocess'
        },
        {
            ref      : 'gridcustomer',
            selector : 'verificationcustomergrid'
        }
    ],
    controllerName : 'verification',
    fieldName      : 'verification_id',
    bindPrefixName : 'Verification',
    localStore     : {
        detail       : null,
        selectedUnit : null,
        customer     : null
    },
    browseHandler : null,
    cbf           : null,
    mt            : null,
    formWidth     : 800,
    formxWinId    : 'win-posisiwinId',
    browseHandler : null,
    constructor   : function (configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Erems.library.box.Config({
            _controllerName: me.controllerName
        });

        me.cbf = new Erems.template.ComboBoxFields();
    },
    init : function (application) {
        var me = this;

        me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
        var events = new Erems.library.box.tools.EventSelector();

        this.control({
            'verificationpanel': {
                afterrender  : this.panelAfterRender,
                beforerender : me.mainPanelBeforeRender
            },
            'verificationgrid': {
                afterrender     : this.gridAfterRender,
                itemdblclick    : this.gridItemDblClick,
                itemcontextmenu : this.gridItemContextMenu,
                selectionchange : this.gridSelectionChange
            },
            'verificationgrid toolbar button[action=create]': {
                click: function () {
                    this.formDataShow('create');
                }
            },
            'verificationgrid toolbar button[action=update]': {
                click: function () {
                    this.formDataShow('update');
                }
            },
            'verificationgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'verificationgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'verificationgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'verificationformsearch button[action=search]': {
                click: this.dataSearch
            },
            'verificationformsearch button[action=reset]': {
                click: this.dataReset
            },
            'verificationformdata': {
                afterrender: this.formDataAfterRender,
                beforerender: function (el) {}
            },
            'verificationformdata button[action=save]': {
                click: this.mainDataSave
            },
            'verificationformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'verificationformdata button[action=browse_unit]': {
                click: this.verapBrowseUnit
            },
            'verificationunitgrid button[action=select]': {
                click: this.verapUnitSelect
            },
            'verificationformdata button[action=approve]': {
                click: function () {
                    me.verapApprove();
                }
            },
            'verificationgrid combobox[name=sort_by]': {
                select: function () {
                    me.refreshGridData();
                }
            },
            'verificationgrid combobox[name=sort_type]': {
                select: function () {
                    me.refreshGridData();
                }
            },
        });
    },
    refreshGridData :function(){
        var me = this;
   
        me.getGrid().getStore().getProxy().setExtraParam("sort_by", me.getGrid().down("[name=sort_by]").getValue());
        me.getGrid().getStore().getProxy().setExtraParam("sort_type", me.getGrid().down("[name=sort_type]").getValue());
        me.getGrid().getStore().loadPage(1);
    },
    verapApprove : function () {
        var me = this;
        var f = me.getFormdata();
        f.setLoading("Please wait..");
        me.tools.ajax({
            params: {
                verification_id: f.down("[name=verification_id]").getValue()
            },
            success: function (data, model) {
                f.setLoading(false);
                var sukses = data.others[0][0]["STATUS"];
                if (sukses) {
                    f.up("window").close();
                    me.tools.alert.info("Approved.");
                    me.getGrid().getStore().load();
                } else {
                    me.tools.alert.warning("Error when processing.");
                }

            }
        }).read('approve');
    },
    verapBrowseUnit : function (el) {
        var me = this;
        var browse = new Erems.library.Browse();
        browse.init({
            controller: me,
            view: 'UnitGrid',
            el: el,
            localStore: "selectedUnit",
            mode_read: "selectedunit"
        });
        browse.showWindow();
    },
    verapUnitSelect : function () {
        var me = this;
        var f = me.getFormdata();
        if (me.browseHandler) {
            me.browseHandler.selectItemFinalData = function (rec) {

                return {
                    purchaseletter_id: rec.get("purchaseletter_purchaseletter_id")
                };
            };
            me.browseHandler.selectItem(function () {

                var ps = me.localStore.selectedUnit; // purchaseletter detail Store
                var psRec = ps.getAt(0);

                //console.log(psRec);
                //return false;


                var vs = f.getValues();
                for (var i in vs) {
                    var el = f.down("[name=" + i + "]");
                    if (el && psRec.get(i)) {
                        el.setValue(psRec.get(i));
                    }
                }
                f.down("[name=unit_unit_id]").setValue(psRec.get("unit_id"));
                f.down("[name=unit_unit_number]").setValue(psRec.get("unit_number"));
                f.down("[name=unit_land_size]").setValue(psRec.get("land_size"));
                f.down("[name=unit_long]").setValue(psRec.get("long"));
                f.down("[name=unit_building_size]").setValue(psRec.get("building_size"));
                f.down("[name=unit_width]").setValue(psRec.get("width"));
                f.down("[name=unit_kelebihan]").setValue(psRec.get("kelebihan"));
                f.down("[name=unit_floor]").setValue(psRec.get("floor"));
                f.down("[name=unitstatus_status]").setValue(psRec.get("unitstatus_status"));
                 f.down("[name=unit_progress]").setValue(psRec.get("progress"));



                /*
                 if (psRec) {
                 me.getFormdata().loadRecord(psRec);
                 me.getFormdata().down("[name=unit_unit_id]").setValue(psRec.get("unit_id"));
                 me.getFormdata().down("[name=unit_unit_number]").setValue(psRec.get("unit_number"));
                 
                 } else {
                 console.log("[Error] Tidak ada data.");
                 }
                 */


            });
        }
    },
    dataSearch : function () {
        var me = this;

        var form = me.getFormsearch().getForm();
        var fields = me.getFormsearch().getValues();
        me.getGrid().doInit();
        var store = me.getGrid().getStore();
        for (var x in fields)
        {

            store.getProxy().setExtraParam(x, fields[x]);
        }
        me.getGrid().getStore().getProxy().setExtraParam("sort_by", me.getGrid().down("[name=sort_by]").getValue());
        me.getGrid().getStore().getProxy().setExtraParam("sort_type", me.getGrid().down("[name=sort_type]").getValue());

        //  store.getProxy().setExtraParam("smscategory_id", me.getFormsearch().down("[name=smscategory_id]").getValue());
        me.loadPage(store);

    },
    fdar : function () {
        var me = this;
        return me.altFdar(me);
    },
    mainDataSave : function () {
        var me = this;

        var f = me.getFormdata();
        var ereg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        var validEmail = ereg.test(f.down("[name=approved_by]").getValue());
        if (!validEmail) {
            me.tools.alert.warning("Email approved by tidak valid.");
            return;
        }




        me.tools.iNeedYou(me).save(function () {
            me.insSave({
                form: me.getFormdata(),
                grid: me.getGrid(),
                //  store: me.localStore.detail,
                finalData: function (data) {
                    //   console.log(data);
                    // data["unit_unit_number"] = f.down("[name=unit_number]").getValue();

                    for (var i in data) {
                        var el = me.getFormdata().down("[name=" + i + "]");
                        if (el) {
                            // console.log(el);
                            if (el.xtype === "xmoneyfield2") {
                                data[i] = el.nilaiAsli;
                            }
                        }
                    }
                    return data;
                },
                sync: true,
                callback: {
                    create: function (store, form, grid) {

                    }
                }
            });
        });
    },
    altFdar : function (controller) {
        var me = this;
        var f = controller.getFormdata();
        var x = {
            init: function () {
                controller.setActiveForm(f);


            },
            create: function () {
                var that = this;
                f.editedRow = -1;
                f.down("[action=approve]").hide();
                
                f.down("#boxHargadasar").setVisible(false);

                me.tools.ajax({
                    params: {},
                    success: function (data, model) {

                        console.log(data);
                        /*
                        var isUserApprove = data.others[0][0]['APPROVALUSER'];
                        if (isUserApprove) {
                            f.down("[action=approve]").show();
                            // f.down("[action=save]").hide();
                        }
                        */
                        var date = moment(new Date()).format("YYYY-MM-DD");
                        f.down("[name=verification_date]").setValue(date);
                        f.down("[name=submitted_by]").setValue(data.others[0][0]['USER_EMAIL']);
                        f.down("[name=approved_by]").setValue(data.others[0][0]['USERAPPROVE_EMAIL']);

                    }
                }).read('detail');

                
                f.down("[action=save]").show();


            },
            update: function () {
                var that = this;
                f.editedRow = controller.getGrid().getSelectedRow();
                var rec = controller.getGrid().getSelectedRecord();

                if (rec) {
                    // f.loadRecord(rec);
                    var vs = f.getValues();
                    for (var i in vs) {

                        var el = f.down("[name=" + i + "]");
                        if (el) {
                            el.setValue(rec.get(i));
                        }
                        if (el.getXType() === 'xmoneyfield2') {
                            el.nilaiAsli = el.getValue();
                            el.setValue(accounting.formatMoney(el.getValue()));

                        }
                    }

                }

                if (!rec.get("is_approve")) {
                    me.tools.ajax({
                        params: {},
                        success: function (data, model) {

                            console.log(data);
                            var isUserApprove = data.others[0][0]['APPROVALUSER'];
                            if (isUserApprove) {
                                f.down("[action=approve]").show();
                                // f.down("[action=save]").hide();
                            }
                            //  f.setLoading(false);
                            //    me.tools.wesea(data.smscategory, f.down("[name=smscategory_id]")).comboBox();
                            //  me.tools.wesea(data.bank, f.down("[name=bank_bank_id]")).comboBox();

                        }
                    }).read('detail');

                } else {
                    f.down("[action=save]").hide();
                }

                if(f.down('[name=diskonhargadasar_nilai]').getValue() == 0){
                    f.down("#boxHargadasar").setVisible(false);
                }


            }

        };
        return x;
    },
    gridSelectionChange : function(){
        var me = this;
        var formGrid = me.getGrid(), row = formGrid.getSelectionModel().getSelection();
        var disabled_delete = true;
        var disabled_edit   = true;

        if (row[0]) {
            disabled_edit = false;

            if(row[0].data.is_approve != 1){
                disabled_delete = false;
            }
        }
        formGrid.down('#btnDelete').setDisabled(disabled_delete);
        formGrid.down('#actioncolumn').items[1].disabled = disabled_delete;
        formGrid.down('#btnEdit').setDisabled(disabled_edit);
    },
    gridActionColumnClick: function (view, cell, row, col, e) {
        var me = this;
        var record = me.getGrid().getStore().getAt(row);
        var m = e.getTarget().className.match(/\bact-(\w+)\b/);

        if (m) {
            if(m[1] == 'VerificationDelete'){
                if(record.get('is_approve') == 1){
                    Ext.Msg.alert('Info', 'This record cannot deleted !');
                    return;
                }
                else{
                    me.dataDestroy();    
                }
            }
            else if(m[1] == 'destroy'){
                me.dataDestroy();
            }
            else if(m[1] == 'update'){
                me.formDataShow('update');
            }
        }
    },
});