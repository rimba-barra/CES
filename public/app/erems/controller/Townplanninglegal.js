Ext.define('Erems.controller.Townplanninglegal', {
    extend: 'Erems.library.template.controller.Controller2',
    alias: 'controller.Townplanninglegal',
    requires: ['Erems.library.DetailtoolAll',,'Erems.library.Browse', 'Erems.library.box.Config', 'Erems.library.box.tools.Tools', 'Erems.template.ComboBoxFields', 'Erems.library.box.tools.EventSelector'],
    views: ['townplanninglegal.Panel', 'townplanninglegal.Grid', 'townplanninglegal.FormSearch', 'townplanninglegal.FormData', 'townplanninglegal.browseunit.SUnitPanel', 'townplanninglegal.browseunit.SUnitGrid', 'townplanninglegal.browseunit.SUnitFormSearch'],
    refs: [
        {
            ref: 'grid',
            selector: 'townplanninglegalgrid'
        },
        {
            ref: 'formsearch',
            selector: 'townplanninglegalformsearch'
        },
        {
            ref: 'formdata',
            selector: 'townplanninglegalformdata'
        },
        {
            ref: 'panel',
            selector: 'townplanninglegalpanel'
        },
        {
            ref: 'gridhistory',
            selector: 'townplanninglegalgridunithistory'
        }
    ],
    controllerName: 'townplanninglegal',
    fieldName: 'unit_number',
    bindPrefixName: 'Townplanninglegal',
    localStore: {
        detail: null,
        unit: null,
    },
    cbf: null,
    mt: null,
    tools: null,
    myConfig: null,
    formWidth: 800,
    TownPlanningWithoutPT: 0, 
    constructor: function (configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Erems.library.box.Config({
            _controllerName: me.controllerName
        });

        me.cbf = new Erems.template.ComboBoxFields();
    },
    init: function (application) {
        var me = this;

        if (typeof Mustache === "undefined") {
            Ext.Loader.injectScriptElement(document.URL + 'app/erems/library/mustache.min.js', function () {

                if (typeof ApliJs === "undefined") {
                    Ext.Loader.injectScriptElement(document.URL + 'app/erems/js/ApliJs.js?_dc=' + Ext.Date.now(), function () {

                        console.log("[INFO] ApliJs loaded.");

                    }, function () {
                        // error load file
                    });
                }


            }, function () {
                //  me.tools.alert.warning("Error load Prolibs.js file.");
            });

        }

        me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
        var events = new Erems.library.box.tools.EventSelector();

        this.control({
            'townplanninglegalpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: me.panelAfterRender

            },
            'townplanninglegalgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange,
                listeners: {
                    load: function() {
                        me.jqueryBinding();
                    }
                }
            },
            'townplanninglegalgrid toolbar button[action=create]': {
                click: function () {
                    this.formDataShow('create');
                }
            },
            'townplanninglegalgrid toolbar button[action=update]': {
                click: function () {
                    this.formDataShow('update');
                }
            },
            'townplanninglegalgrid toolbar button[action=destroy]': {
                click: function () {
                    this.dataDestroy();
                }
            },
            'townplanninglegalgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'townplanninglegalgrid toolbar button[action=updatePT]': {
                click: this.formUpdatePTdanTanah
            },
            'townplanninglegalgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'townplanninglegalformsearch': {
                afterrender: me.formSearchAfterRender
            },
            'townplanninglegalformsearch button[action=search]': {
                click: this.dataSearch
            },
            'townplanninglegalformsearch button[action=reset]': {
                click: this.dataReset
            },
            'townplanninglegalformdata': {
                afterrender: this.formDataAfterRender
            },
            'townplanninglegalformdata button[action=save]': {
                click: function () {
                    // me.mainDataSave();
                    me.mainUpdatePT();
                }
            },
            'townplanninglegalformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'townplanninglegalformdata #fd_number_check': {
                change: me.formDataCheckBoxNumberChange
            },
            'townplanninglegalformdata #fd_cb_type': {
                // change: me.formDataTypeComboBoxChange
                select: me.formDataTypeComboBoxChange
            },
            'townplanninglegalformdata #fd_number_start': {
                change: me.formDataNumberStartChange
            },
            'townplanninglegalformdata button[action=add_cluster]': {
                click: function () {
                    me.addCluster();
                }
            },
            'townplanninglegalformdata button[action=add_category]': {
                click: function () {
                    me.addCategory();
                }
            },
            'townplanninglegalformdata button[action=add_type]': {
                click: function () {
                    me.addType();
                }
            },
            'townplanninglegalformdata button[action=add_block]': {
                click: function () {
                    me.addBlock();
                }
            },
            'townplanninglegalformdata button[action=add_position]': {
                click: function () {
                    me.addPosition();
                }
            },
            'townplanninglegalformdata button[action=add_side]': {
                click: function () {
                    me.addSide();
                }
            },
            'townplanninglegalformdata button[action=add_purpose]': {
                click: function () {
                    me.addPurpose();
                }
            },
            //  
            'sunitpanel': {
                beforerender: me.sunitpanelBeforeRender
            },
            'sunitgridpl button[action=select]': {
                click: me.selectunitgridSelection
            },
            'sunitgridpl': {
                afterrender: me.selectunitgridAfterRender
            },
            /* BROWSE CONTROL */
            'townplanninglegalbrowsepanel': {
                beforerender: me.browsepanelBeforeRender
            },
            'townplanninglegalbrowsepanel button[action=select]': {
                click: me.browsegridSelection
            },
            'townplanninglegalbrowsegrid': {
                afterrender: me.browsegridAfterRender
            },
            'townplanninglegalbrowseformsearch button[action=search]': {
                click: me.browseSearch
            },
            /* END BROWSE CONTROL */
            'townplanninglegalformdata [name=cluster_cluster_id]': {
                select: function (el, val) {
                    me.seFi.cb('cluster_code', el, 'code', val);
                    me.filterBlockData();
                    me.updateTypeInfo();
                },
            },
            'townplanninglegalformdata [name=cluster_code]': {
                blur: function (el, e) {
                    me.textFieldCodeOnKeyUpBase({form: me.getFormdata(), codeTextField: 'cluster_code', idTextField: 'cluster_cluster_id', codeField: 'code'});
                },
            },
            'townplanninglegalformdata [name=productcategory_productcategory_id]': {
                select: function (el, val) {
                    me.seFi.cb('productcategory_code', el, 'code', val);
                    me.updateTypeCb();
                }
            },
            'townplanninglegalformdata [name=productcategory_code]': {
                blur: function (el, e) {
                    me.textFieldCodeOnKeyUpBase({form: me.getFormdata(), codeTextField: 'productcategory_code', idTextField: 'productcategory_productcategory_id', codeField: 'code'});
                },
            },
            'townplanninglegalformdata [name=type_type_id]': {
                select: function (el, val) {
                    me.seFi.cb('type_code', el, 'code', val);
                    me.updateTypeInfo();
                }
            },
            'townplanninglegalformdata [name=type_code]': {
                blur: function (el, e) {
                    me.textFieldCodeOnKeyUpBase({form: me.getFormdata(), codeTextField: 'type_code', idTextField: 'type_type_id', codeField: 'code'});
                    me.updateTypeInfo();
                },
            },
            'townplanninglegalformdata [name=block_block_id]': {
                select: function (el, val) {
                    me.seFi.cb('block_code', el, 'code', val);
                }
            },
            'townplanninglegalformdata [name=block_code]': {
                blur: function (el, e) {
                    me.textFieldCodeOnKeyUpBase({form: me.getFormdata(), codeTextField: 'block_code', idTextField: 'block_block_id', codeField: 'code'});
                },
            },
            'townplanninglegalformdata [name=position_position_id]': {
                select: function (el, val) {
                    me.seFi.cb('position_code', el, 'code', val);
                }
            },
            'townplanninglegalformdata [name=position_code]': {
                blur: function (el, e) {
                    me.textFieldCodeOnKeyUpBase({form: me.getFormdata(), codeTextField: 'position_code', idTextField: 'position_position_id', codeField: 'code'});
                },
            },
            'townplanninglegalformdata [name=side_side_id]': {
                select: function (el, val) {
                    me.seFi.cb('side_code', el, 'code', val);
                }
            },
            'townplanninglegalformdata [name=side_code]': {
                blur: function (el, e) {
                    me.textFieldCodeOnKeyUpBase({form: me.getFormdata(), codeTextField: 'side_code', idTextField: 'side_side_id', codeField: 'code'});
                },
            },
            'townplanninglegalformdata [name=purpose_purpose_id]': {
                select: function (el, val) {
                    me.seFi.cb('purpose_code', el, 'code', val);
                }
            },
            'townplanninglegalformdata [name=purpose_code]': {
                blur: function (el, e) {
                    me.textFieldCodeOnKeyUpBase({form: me.getFormdata(), codeTextField: 'purpose_code', idTextField: 'purpose_purpose_id', codeField: 'code'});
                },
            },
            'townplanninglegalformdata [name=tanahcode_pt_id]': { // added by rico 04042023
                select: function (el, val) {
                    me.get_pt(val, 'tanahcode_pt_id');
                }
            },
            'townplanninglegalformdata [name=tanahcode2_pt_id]': { // added by rico 04042023
                select: function (el, val) {
                    me.get_pt(val, 'tanahcode2_pt_id');
                }
            },
        });
    },
    textFieldCodeOnKeyUpBase: function (params) {
        var me = this;
        var f = !params.form ? me.getFormdata() : params.form;
        var val = f.down("[name=" + params.codeTextField + "]").getValue();
        var combo = f.down("[name=" + params.idTextField + "]");
        combo.getStore().clearFilter(true);
        combo.getStore().filterBy(function (rec, id) {

            if (rec.raw[params.codeField].toLowerCase().includes(val.toLowerCase())) {
                return true;
            } else {
                return false;
            }
        });
        if (combo.getStore().getCount() > 0) {
            me.tools.comboHelper(combo).setFirstValue();
        }

    },
    filterBlockData: function () {
        var me = this;
        var f = me.getFormdata();
        var b = f.down("[name=block_block_id]");
        var c = f.down("[name=cluster_cluster_id]");
        var bs = b.getStore();
        b.setValue("");
        bs.clearFilter(true);
        bs.filter("cluster_cluster_id", c.getValue());
    },
    updateTypeInfo: function () {
        var me = this;
        var f = me.getFormdata();
        var t = f.down("[name=type_type_id]");
        var i = t.getStore().findExact('type_id', t.getValue());
        if (i > -1) {

        }
      
        var rec = t.getStore().getAt(i);
        if (rec) {
           // console.log(rec);
            for (var x in rec.data) {
                var el = f.down("[name=" + x + "]");
                if (el) {
                    el.setValue(rec.data[x]);
                }
            }
            f.down("[name=type_code]").setValue(rec.get("code"));
        }else{
           // console.log("[TYPE] tidak ada record");
        }
    },
    updatePositionCb: function () {
        var me = this;
        var f = me.getFormdata();
        var c = me.tools.intval(f.down("[name=cluster_cluster_id]").getValue());
        var s = f.down("[name=position_position_id]").getStore();
        if (c > 0) {
            s.filterBy(function (rec, id) {

                if (rec.get("cluster_id") === c) {
                    return true;
                } else {
                    return false;
                }
            });
        }

        /// set default value
        if (s.getCount() > 0) {
            f.down("[name=position_position_id]").setValue(s.getAt(0).get("position_id"));
        } else {
            f.down("[name=position_position_id]").setValue("");
        }
    },
    updateBlockCb: function () {
        var me = this;
        var f = me.getFormdata();
        var c = me.tools.intval(f.down("[name=cluster_cluster_id]").getValue());
        var s = f.down("[name=block_block_id]").getStore();
        if (c > 0) {
            s.filterBy(function (rec, id) {

                if (rec.get("cluster_id") === c) {
                    return true;
                } else {
                    return false;
                }
            });
        }

        /// set default value
        if (s.getCount() > 0) {
            f.down("[name=block_block_id]").setValue(s.getAt(0).get("block_id"));
        } else {
            f.down("[name=block_block_id]").setValue("");
        }
    },
    updateTypeCb: function () {
        var me = this;
        var f = me.getFormdata();
        var c = me.tools.intval(f.down("[name=cluster_cluster_id]").getValue());
        var pc = me.tools.intval(f.down("[name=productcategory_productcategory_id]").getValue());
        var s = f.down("[name=type_type_id]").getStore();
        if (pc > 0 && c > 0) {
            s.filterBy(function (rec, id) {

                if (rec.get("cluster_id") === c && rec.get("productcategory_id") === pc) {
                    return true;
                } else {
                    return false;
                }
            });
        } else if (pc > 0) {
            s.filterBy(function (rec, id) {

                if (rec.get("productcategory_id") === pc) {
                    return true;
                } else {
                    return false;
                }
            });
        } else if (c > 0) {
            s.filterBy(function (rec, id) {

                if (rec.get("cluster_id") === c) {
                    return true;
                } else {
                    return false;
                }
            });
        }

        /// set default value
        if (s.getCount() > 0) {
            f.down("[name=type_type_id]").setValue(s.getAt(0).get("type_id"));
          
            me.updateTypeInfo();
        } else {
            f.down("[name=type_type_id]").setValue("");
        }
    },
    panelAfterRender: function (configs) {
        this.callParent(arguments);
        var me = this;

        ApliJs.applicationName = "erems";
        
        var p = me.getPanel();
        p.setLoading("Please wait");
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                me.TownPlanningWithoutPT = data.others[0][0].TownPlanningWithoutPT; // added by rico 08032023

                me.getGrid().down("#btnUpdatePT").setVisible(me.TownPlanningWithoutPT); // added by rico 08032023

                me.fillFormSearchComponents(data, me.getFormsearch());
                p.setLoading(false);
            }
        }).read('detail');
    },
    fillFormSearchComponents: function (data, f) {
        var me = this;
        me.tools.wesea(data.unitstatus, f.down("[name=unitstatus_unitstatus_id]")).comboBox(true);
        me.tools.wesea(data.cluster, f.down("[name=cluster_cluster_id]")).comboBox(true);
        me.tools.wesea(data.block, f.down("[name=block_block_id]")).comboBox(true);
    },
    formDataCheckBoxNumberChange: function (el, val) {
        //#fd_cb_type

        var me = this;
        var f = me.getFormdata();
        var ne = f.down("[name=number_end]");
        var ng = f.down("[name=mode_number_generator]");
        ne.setReadOnly(!val);
        ng.setReadOnly(!val);
        if (!val) {
            ne.setValue("");
            ng.setValue(0);
        }
    },
    addCategory: function () {
        this.tools.iNeedYou(this).showWindow('Masterproductcategory', {title: 'Create New Product Category'});
    },
    addCluster: function () {
        var me = this;
        this.tools.iNeedYou(this).showWindow('Mastercluster', {title: 'Create New Cluster'});
    },
    addType: function () {
        this.tools.iNeedYou(this).showWindow('Mastertype', {title: 'Create New Type'});
    },
    addBlock: function () {
        this.tools.iNeedYou(this).showWindow('Masterblock', {title: 'Create New Block'});
    },
    addPosition: function () {
        this.tools.iNeedYou(this).showWindow('Masterposisi', {title: 'Create New Position'});
    },
    addSide: function () {
        this.tools.iNeedYou(this).showWindow('Masterside', {title: 'Create New Side'});
    },
    addPurpose: function () {
        this.tools.iNeedYou(this).showWindow('Masterpurpose', {title: 'Create New Purpose'});
    },
    afterAddNewFromOutside: function (controllerId) {
        var me = this;
        var f = me.getFormdata();
        var win = Ext.getCmp(_Apps.getController(controllerId).formxWinId);
        if (win) {
            win.close();
        }
        f.setLoading("Refreshing...");
        me.tools.ajax({
            params: {},
            success: function (data, model) {


                me.fillFormComponents(data, f);
                f.setLoading(false);
            }
        }).read('detail');
    },
    mainDataSave: function (mode) {
        var me = this;
        var m = typeof mode !== "undefined" ? mode : "";
        var f = me.getFormdata();
        var vs = f.getValues();
        var unitId = me.tools.intval(vs.unit_id);
        if (unitId > 0) { // untuk mode update saja
            var msgValidasi = "";
            var valid = false;
            if (vs.unithistory_description.length == 0) {
                msgValidasi = "Catatan perubahan harus diisi.";
                // f.down("[name=unithistory_description]").f.focus();
            } else if (vs.unithistory_instruksi_order.length == 0) {
                msgValidasi = "Instruksi order catatan perubahan harus diisi.";
                //  f.down("[name=unithistory_instruksi_order]").fieldEl.dom.focus();
            } else {
                valid = true;
            }
            if (!valid) {
                me.tools.alert.warning(msgValidasi);
                return;
            }
        }
        me.insSave({
            form: me.getFormdata(),
            grid: me.getGrid(),
            // store: me.localStore.detail,
            finalData: function (data) {
                var f = me.getFormdata();
                data["gambar_rumah"] = $("#tpFormID input[name=gambar_rumah]").val();
                data["lebar_jalan"] = $("#tpFormID input[name=lebar_jalan]").val();
                data["is_readystock"] = $("#tpFormID input[name=is_readystock]").prop('checked')?1:0;
               // console.log($("#tpFormID input[name=is_ready]").prop('checked'));
                return data;
            },
            sync: true,
            callback: {
                create: function (store, form, grid) {

                }
            }
        });
    },
    fdar: function () {
        var me = this;
        var f = me.getFormdata();
        var x = {
            init: function () {
                me.setActiveForm(me.getFormdata());
            },
            create: function () {
                f.setLoading("Please wait.. loading components");
                me.tools.ajax({
                    params : {},
                    success: function (data, model) {
                        var currentPt = me.tools.intval(data.others[0][0]["CURRENTPTID"]);

                        var rec = me.getGrid().getSelectedRecord();
                        me.fillFormComponents(data, f);

                        f.down("[name=tanahcode_pt_id]").setValue(rec.get('tanahcode_pt_id'));
                        f.down("[name=tanahcode2_pt_id]").setValue(rec.get('tanahcode2_pt_id'));
                        f.down("[name=pt_pt_id]").setValue(rec.get('pt_pt_id') != "" ? rec.get('pt_pt_id') : currentPt);

                        f.setLoading(false);
                    }
                }).read('detail');

                f.down("[action=save]").show();
            },
            update: function () {
//                 var rec = me.getGrid().getSelectedRecord();
//                 var plId = rec.get("spk_id");
//                 f.editedRow = me.getGrid().getSelectedRow();
//                 f.setLoading("Loading...");
//                 f.down("[name=number_check]").setDisabled(true);
//                 me.tools.ajax({
//                     params: {},
//                     success: function (data, model) {
// 
//                         if (rec.get("unitstatus_status") === "PLANNING") {
//                             f.down("[action=save]").show();
//                         } else {
//                             var vs = f.getForm().getValues();
//                             for (var i in vs) {
//                                 var el = f.down("[name=" + i + "]");
//                                 if (el) {
//                                     el.setReadOnly(true);
//                                 }
//                             }
//                         }
// 
//                         me.fillFormComponents(data, f);
//                         f.loadRecord(rec);
//                         f.down("[name=progress_text]").setValue(rec.get("progress"));
//                         f.setLoading(false);
//                         f.down("#catatanPerubahanPanelId").show();
//                         f.down("[name=unithistory_person_in_charge]").setValue(data.others[0][0]["USER_FULLNAME"]);
//                         var guh = me.getGridhistory();
//                         guh.doInit();
//                         guh.getStore().getProxy().setExtraParam('mode_read', 'history');
//                         guh.getStore().getProxy().setExtraParam('unit_id', me.getGrid().getSelectedRecord().get("unit_id"));
//                         guh.getStore().loadPage(1, {
//                             callback: function (rec, operation, success) {
//                                 if (!guh.getStore().modelExist) {
// 
//                                     guh.attachModel(operation);
//                                 }
// 
//                                 var pg = guh.down("pagingtoolbar");
//                                 if (pg) {
//                                     pg.getStore().load();
//                                 }
// 
//                                 if (guh.getStore().getCount() > 0) {
//                                     var topRec = guh.getStore().getAt(0);
//                                     // f.down("[name=unithistory_person_in_charge]").setValue(topRec.get("person_in_charge"));
//                                     //   f.down("[name=unithistory_description]").setValue(topRec.get("description"));
//                                     //   f.down("[name=unithistory_instruksi_order]").setValue(topRec.get("instruksi_order"));
// 
//                                 }
//                             }
//                         });
// 
//                         var viewParams = {
//                             lebar_jalan: rec.get("lebar_jalan"),
//                             gambar_rumah: rec.get("gambar_rumah"),
//                             is_readychecked:rec.get("is_readystock")>0?"checked":""
//                         };
//                         ApliJs.loadHtmlB(me, me.getFormdata().down("#TPOtherInformationID"), 'sby_form_other', viewParams);
//                         me.getFormdata().down("#TPOtherInformationID").toggleCollapse(true);
//                     }
//                 }).read('detail');
            }
        };
        return x;
    },
    fillFormComponents: function (data, form) {
        var me = this;
        me.tools.wesea(data.pt, form.down("[name=pt_pt_id]")).comboBox();
        me.tools.wesea(data.tanahcode, form.down("[name=tanahcode_pt_id]")).comboBox();
        me.tools.wesea(data.tanahcode2, form.down("[name=tanahcode2_pt_id]")).comboBox();
    },
//    dataDestroy: function() {
//        var me = this;
//        var rows = me.getGrid().getSelectionModel().getSelection();
//        if (rows.length < 1) {
//            Ext.Msg.alert('Info', 'No record selected !');
//            return;
//        } else {
//            var rec = me.getGrid().getSelectedRecord();
//            console.log(rec);
//            
//
//            var temp = rows;
//            rows = [];
//            rows.push(temp[0]);
//            temp = null;
//            console.log(rows[0]);
//            var unitStatus = rows[0].get("unitstatus_status");
//            unitStatus = !unitStatus ? "" : unitStatus;
//            if (unitStatus.length > 0) {
//                if (unitStatus !== "PLANNING") {
//                    me.tools.alert.warning("Unit dalam status :" + unitStatus + " tidak bisa dihapus.");
//                    return;
//                }
//
//            }
//
//
//            var confirmmsg, successmsg, failmsg;
//            var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
//            var store = me.getGrid().getStore();
//            if (rows.length == 1) {
//                var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(me.fieldName) + ']';
//                confirmmsg = 'Delete ' + selectedRecord + ' ?';
//                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
//            } else {
//                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
//                failmsg = 'Error: Unable to delete data.';
//            }
//            Ext.Msg.confirm('Delete Data', confirmmsg, function(btn) {
//                if (btn == 'yes') {
//                    resetTimer();
//                    var msg = function() {
//                        me.getGrid().up('window').mask('Deleting data, please wait ...');
//                    };
//                    for (var i = 0; i < rows.length; i++) {
//
//                        store.remove(rows[i]);
//                    }
//
//                    store.on('beforesync', msg);
//                    store.sync({
//                        success: function(s) {
//                            me.getGrid().up('window').unmask();
//                            var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
//                            var successmsg = (rows.length == 1 ? selectedRecord : (successcount != rows.length ? successcount + ' of ' : '') + recordcounttext) + ' deleted successfully.';
//                            store.un('beforesync', msg);
//                            store.reload();
//                            Ext.Msg.show({
//                                title: 'Success',
//                                msg: successmsg,
//                                icon: Ext.Msg.INFO,
//                                buttons: Ext.Msg.OK
//                            });
//                        },
//                        failure: function() {
//                            me.getGrid().up('window').unmask();
//                            store.un('beforesync', msg);
//                            store.reload();
//                            Ext.Msg.show({
//                                title: 'Failure',
//                                msg: failmsg + ' The data may have been used.',
//                                icon: Ext.Msg.ERROR,
//                                buttons: Ext.Msg.OK
//                            });
//                        }
//                    });
//                }
//            });
//        }
//    },

///semy

    dataDestroy: function () {
        var me = this;
        var rows = me.getGrid().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            var unitStatus = rows[0].get("unitstatus_status");
            unitStatus = !unitStatus ? "" : unitStatus;
            if (unitStatus.length > 0) {
                if (unitStatus !== "PLANNING") {
                    me.tools.alert.warning("Unit dalam status :" + unitStatus + " tidak bisa dihapus.");
                    return;
                }
            }

            var confirmmsg, successmsg, failmsg;
            var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            var store = me.getGrid().getStore();
            if (rows.length == 1) {
                var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(me.fieldName) + ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }
            Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
                if (btn == 'yes') {
                    resetTimer();
                    var msg = function () {
                        me.getGrid().up('window').mask('Deleting data, please wait ...');
                    };
                    for (var i = 0; i < rows.length; i++) {

                        store.remove(rows[i]);
                    }

                    store.on('beforesync', msg);
                    store.sync({
                        success: function (s) {
                            me.getGrid().up('window').unmask();
                            var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
                            var successmsg = (rows.length == 1 ? selectedRecord : rows.length) + ' deleted successfully.';
                            store.un('beforesync', msg);
                            store.reload();

                            Ext.Msg.show({
                                title: 'Success',
                                msg: successmsg,
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK
                            });
                        },
                        failure: function () {
                            me.getGrid().up('window').unmask();
                            store.un('beforesync', msg);
                            store.reload();
                            Ext.Msg.show({
                                title: 'Failure',
                                msg: failmsg + ' The data may have been used.',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    });
                }
            });
        }
    },
    apliJsFuncsby_form_other: function () {
        var me = this;
        var x = {
            afterRender: function (tpl, params) {
                /*
                 if ($("#plFormID input[name='action']").val() === "update") {
                 
                 $("#plFormID select[name='downline_id']").val(params.downline_id);
                 }
                 */
                //$("#tpFormID input[name=lebar_jalan]").numeric();
           
               
                if (params.gambar_rumah.length > 0) {
                    $("#tpFormID .view_rumah").css("background-image", "url(app/erems/uploads/townplanninglegal/" + params.gambar_rumah + ")");
                }

                $('#tpFormID input[name=gambar_rumah_input]').on('change', function () {
                    var file_data = $('#tpFormID input[name=gambar_rumah_input]').prop('files')[0];
                    //console.log(file_data);
                    var form_data = new FormData();
                    form_data.append('file', file_data);
                    form_data.append('mode_read', 'uploadgambarrumah');

                    $.ajax({
                        url: 'erems/townplanninglegal/read/',
                        dataType: 'text', 
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: form_data,
                        type: 'post',
                        success: function (response) {
                            var json = jQuery.parseJSON(response);
                            var data = json.data.others[0][0];
                            if (data.STATUS) {
                                $("#tpFormID .view_rumah").css("background-image", "url(app/erems/uploads/townplanninglegal/" + data.MSG + ")");
                                $("#tpFormID input[name=gambar_rumah]").val(data.MSG);
                                //
                            } else {
                                me.tools.alert.warning(data.MSG);
                            }
                        }
                    });
                });
            }
        };
        return x;
    },
    gridAfterRender: function(configs) {
        this.callParent(arguments);
        var me = this;
          
        grid = me.getGrid();      
        grid.store.on('load', function(store, records, options){
            me.jqueryBinding();      
        });  
        me.getGrid().down("pagingtoolbar").getStore().reload();

        me.tools.ajax({
            params: {},
            success: function (data) {
                if(data.others[0][0].STATUS==1){
                     me.getGrid().getView().getGridColumns()[3].setVisible(true);
                     me.getGrid().getView().getGridColumns()[4].setVisible(true);
                }
            }
        }).read('isSh1Features'); 

        me.getGrid().down("pagingtoolbar").getStore().reload();
    },
    jqueryBinding: function(){
        var me = this;
        //inlineEdit
        me.checkboxInlineEdit('is_readystock');
        me.checkboxInlineEdit('is_readylegal');
        me.townplanninglegalLegalHideFeature();

    },
    checkboxInlineEdit: function(name){
        var me = this;
        $("input[name='"+name+"']").change(function(event) {
            val = $(this).is(":checked") ? 1 : 0;
            unit_id = $(this).attr('data');
            var p = me.getPanel();
            p.setLoading("Please wait");
            me.tools.ajax({
                params: {id: unit_id, collumn: name, value: val },
                success: function (data) {
                    p.setLoading(false);
                }
            }).read('inlineEdit'); 
        });
    },
    townplanninglegalLegalHideFeature: function(){
        var me=this;
        if($("#WINDOW-mnuTownPlanningLegal_header_hd-textEl").html()=="Town Planning (Legal)"){
            // $("#WINDOW-mnuTownPlanningLegal-body .x-toolbar.x-docked-top").hide();
            $("#WINDOW-mnuTownPlanningLegal input[name=is_readystock]").attr("disabled", true);
            me.getGrid().getView().getGridColumns()[25].setVisible(false); //hide edit delete
        }
    },
    gridItemDblClick: function(el) {
        var me = this;
        if($("#WINDOW-mnuTownPlanningLegal_header_hd-textEl").html()!=="Town Planning (Legal)"){
            btnEdit = el.up('panel').down('#btnEdit'),
            state = (btnEdit.isVisible() && !btnEdit.isDisabled() ? btnEdit.bindAction : 'show');
            me.execAction(el, state);
          }
    },
    gridSelectionChange: function() {
        var me = this;
        var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();

        if(grid.down('#btnUpdatePT') != null){ /// add by erwin.st 09112021 (pengecekan ada tombol edit atau tidak)
            if(row.length >= 1){
                for (var i = 0;i<row.length;i++) {
                    if(row[i].data.state_admistrative == 1){
                        grid.down('#btnUpdatePT').setDisabled(false);
                    }else{
                        grid.down('#btnUpdatePT').setDisabled(true);
                        break;
                    }
                }
            }else{
                grid.down('#btnUpdatePT').setDisabled(true);
            }
        }
    },
    formUpdatePTdanTanah: function(el, act, action){ // added by rico 08032023
        var me = this;
        var formtitle, formicon;

        var winId = 'win-holidayformdata';
        var win = desktop.getWindow(winId);
        if (!win) {
            win = desktop.createWindow({
                id              : winId,
                title           : 'Update PT dan Tanah',
                iconCls         : 'icon-form-edit',
                resizable       : false,
                minimizable     : false,
                maximizable     : false,
                width           : 500,
                renderTo        : Ext.getBody(),
                constrain       : true,
                constrainHeader : false,
                modal           : true,
                layout          : 'fit',
                shadow          : 'frame',
                shadowOffset    : 10,
                border          : false,
                state           : 'create',
                listeners       : {
                    boxready: function() {
                        win.body.mask('Loading...');
                        var tm = setTimeout(function() {
                            win.add(Ext.create('Erems.view.' + me.controllerName + '.FormData'));
                            win.center();
                            win.body.unmask();
                            clearTimeout(tm);
                        }, 1000);

                    }
                }

            });
        }
        win.show();
    },
    // added by rico 08032023
    mainUpdatePT: function(){ 
        var me      = this;
        var f       = me.getFormdata();
        var vs      = f.getValues();
        var grid    = me.getGrid();
        var rows    = grid.getSelectionModel().getSelection();
        var id      = [];
        var win     = desktop.getWindow('win-holidayformdata');
        var store = me.getGrid().getStore();

        for(var i=0;i<rows.length;i++){
            if(vs.is_cluster != 1){
                id.push(rows[i].data.unit_id);
            }else{
                id.push(rows[i].data.cluster_cluster_id);
            }
        }

        f.setLoading(true);

        if(vs.tanahcode_pt_id){
            me.tools.ajax({
                params: {
                    rows             : JSON.stringify(id), 
                    is_cluster       : vs.is_cluster,
                    pt_id            : vs.pt_pt_id,
                    tanahcode_pt_id  : vs.tanahcode_pt_id,
                    tanahcode2_pt_id : vs.tanahcode2_pt_id
                },
                success: function (data) {
                    Ext.Msg.show({
                        title   : 'Success',
                        msg     : "Success mengupdate PT dan Tanah..",
                        icon    : Ext.Msg.INFO,
                        buttons : Ext.Msg.OK
                    });

                    f.setLoading(false);

                    win.close();
                    store.reload();
                }
            }).read('updatePT');
        }else{
            Ext.Msg.show({
                title   : 'Alert',
                msg     : 'Kode Tanah tidak boleh kosong',
                icon    : Ext.Msg.WARNING,
                buttons : Ext.Msg.OK
            });

            f.setLoading(false);
        }
    },
    get_pt: function(data, name='tanahcode_pt_id'){
        var me      = this;
        var f       = me.getFormdata();
        var pt_id   = data[0].data.pt_id;

        me.tools.ajax({
            params: {
                pt_id: pt_id
            },
            success: function (data) {
                if((name == 'tanahcode_pt_id' || name == 'tanahcode2_pt_id') && data[0].tanahcode_induk_pt_id == 0){
                    f.down("[name=" + name + "]").setValue("");

                    Ext.Msg.show({
                        title   : 'Alert',
                        msg     : 'PT Induk belum di Set, silakan Hubungi IT',
                        icon    : Ext.Msg.WARNING,
                        buttons : Ext.Msg.OK
                    });
                }
                else{
                    if(name == 'tanahcode_pt_id'){
                        me.tools.ajax({
                            params  : { pt_id : data[0].tanahcode_induk_pt_id },
                            success : function (record) {
                                f.down("[name=pt_pt_id]").setValue(record[0].pt_id);
                            }
                        }).read('getPT');
                    }
                }
            }
        }).read('getPT');
    }
});